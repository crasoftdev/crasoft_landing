import type { LatLng } from "@/components/demos/routes";

// Turns lat/lng routes into SVG coordinates for the demo maps. Runs on the server,
// so the browser gets finished paths and no map library or tiles.

export type Point = [number, number];

// Web Mercator, as unit-square coordinates.
function mercator([lat, lng]: LatLng): Point {
  const sin = Math.sin((lat * Math.PI) / 180);
  return [(lng + 180) / 360, 0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)];
}

// A projection that fits `points` inside the box, centered, keeping the aspect.
export function fitProjection(
  points: LatLng[],
  box: { left: number; top: number; right: number; bottom: number },
) {
  const projected = points.map(mercator);
  const xs = projected.map((p) => p[0]);
  const ys = projected.map((p) => p[1]);
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const scale = Math.min((box.right - box.left) / (maxX - minX), (box.bottom - box.top) / (maxY - minY));
  const offX = box.left + ((box.right - box.left) - (maxX - minX) * scale) / 2;
  const offY = box.top + ((box.bottom - box.top) - (maxY - minY) * scale) / 2;
  return (ll: LatLng): Point => {
    const [x, y] = mercator(ll);
    return [offX + (x - minX) * scale, offY + (y - minY) * scale];
  };
}

export const toPath = (points: Point[]) =>
  "M" + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L");

// Splits a route at fraction `f` of its length: the driven part, the rest, the
// point itself, and a point a little ahead (for the heading).
export function splitRoute(points: LatLng[], f: number) {
  const dist = [0];
  for (let i = 1; i < points.length; i++) {
    const [a, b] = [points[i - 1], points[i]];
    dist.push(dist[i - 1] + Math.hypot(b[0] - a[0], (b[1] - a[1]) * Math.cos((b[0] * Math.PI) / 180)));
  }
  const target = dist[dist.length - 1] * f;
  let i = 1;
  while (i < dist.length - 1 && dist[i] < target) i++;
  const r = (target - dist[i - 1]) / (dist[i] - dist[i - 1] || 1);
  const [a, b] = [points[i - 1], points[i]];
  const at: LatLng = [a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r];
  return {
    at,
    done: [...points.slice(0, i), at],
    rest: [at, ...points.slice(i)],
    ahead: points[Math.min(i + 2, points.length - 1)],
  };
}

// Compass heading in degrees from a to b on screen (0 = up).
export const heading = (a: Point, b: Point) => (Math.atan2(b[0] - a[0], a[1] - b[1]) * 180) / Math.PI;

export const px = ([x, y]: Point) => ({ left: `${x.toFixed(1)}px`, top: `${y.toFixed(1)}px` });
