// Plays a looping demo timeline with the Web Animations API. The demo markup is
// plain server-rendered HTML; each animated element says what it does through
// data attributes, the same scheme as the Claude Design demos:
//
//   data-a   kind: fade | show | pop | slide | fill | grow | draw | type | count
//            | move | click | cursor | curtain
//   data-t   ms into the loop when it starts (default 0)
//   data-d   ms it takes (default 500)
//   data-e   ms when it goes away again (default: stays until the loop ends)
//   data-ease  CSS easing (default: a soft ease-out)
//   slide:   data-x / data-y, the start offset in px
//   move:    data-x / data-y, the end offset in px. Under reduced motion it jumps.
//   count:   data-to, data-from, data-dec, data-pre, data-suf
//   click:   data-at, the data-target name of the element it lands on
//   cursor:  data-path "ms:x,y;ms:@target;ms:@target:dx,dy;..."
//
// Positions are measured inside the closest [data-stage] element.
//
// With reduced motion the steps stay the same, but everything only fades:
// nothing slides, grows, draws or counts, and the cursor and taps are hidden.

const EASE = "cubic-bezier(.2,.7,.2,1)";

type Frames = [Keyframe, Keyframe];

const KINDS: Record<string, Frames> = {
  fade: [{ opacity: 0 }, { opacity: 1 }],
  show: [
    { opacity: 0, transform: "translateY(8px)" },
    { opacity: 1, transform: "none" },
  ],
  pop: [
    { opacity: 0, transform: "scale(.9)" },
    { opacity: 1, transform: "none" },
  ],
  fill: [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
  grow: [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
  type: [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }],
};

type Count = {
  el: HTMLElement;
  t: number;
  d: number;
  from: number;
  to: number;
  dec: number;
  pre: string;
  suf: string;
};

export type Engine = {
  play(): void;
  pause(): void;
  restart(): void;
  destroy(): void;
};

// Center of `el` in `stage` coordinates. Uses layout offsets, so it is unaffected
// by the scale() that fits the demo to its column.
function centerIn(el: HTMLElement, stage: HTMLElement): [number, number] {
  let x = el.offsetWidth / 2;
  let y = el.offsetHeight / 2;
  let node: HTMLElement | null = el;
  while (node && node !== stage) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return [x, y];
}

function resolvePoint(spec: string, stage: HTMLElement): [number, number] {
  if (!spec.startsWith("@")) {
    const [x, y] = spec.split(",").map(Number);
    return [x, y];
  }
  const [name, offset] = spec.slice(1).split(":");
  const target = stage.querySelector<HTMLElement>(`[data-target="${name}"]`);
  const [x, y] = target ? centerIn(target, stage) : [0, 0];
  const [dx, dy] = offset ? offset.split(",").map(Number) : [0, 0];
  return [x + dx, y + dy];
}

const formatCount = (v: number, c: Count) =>
  c.pre + (c.dec ? v.toFixed(c.dec) : Math.round(v).toLocaleString("en-US")) + c.suf;

export function startTimeline(root: HTMLElement, loop: number, reduced: boolean): Engine {
  const at = (ms: number) => Math.min(Math.max(ms / loop, 0), 1);
  const timing = { duration: loop, iterations: Infinity };
  const anims: Animation[] = [];
  const counts: Count[] = [];

  root.querySelectorAll<HTMLElement | SVGElement>("[data-a]").forEach((el) => {
    const ds = el.dataset;
    const kind = ds.a ?? "";
    const t = Number(ds.t ?? 0);
    let d = Number(ds.d ?? 500);
    const end = ds.e != null ? Number(ds.e) : loop;
    const stage = (el.closest("[data-stage]") as HTMLElement | null) ?? root;

    if (kind === "count") {
      counts.push({
        el: el as HTMLElement,
        t,
        d: reduced ? 0 : d,
        from: Number(ds.from ?? 0),
        to: Number(ds.to),
        dec: Number(ds.dec ?? 0),
        pre: ds.pre ?? "",
        suf: ds.suf ?? "",
      });
      return;
    }

    if (kind === "curtain") {
      // Covers the jump from the last frame back to the first.
      anims.push(
        el.animate(
          [
            { offset: 0, opacity: 1 },
            { offset: at(400), opacity: 0 },
            { offset: at(loop - 450), opacity: 0 },
            { offset: 1, opacity: 1 },
          ],
          timing,
        ),
      );
      return;
    }

    if (kind === "click" || kind === "cursor") {
      if (reduced) {
        (el as HTMLElement).style.display = "none";
        return;
      }
      if (kind === "click") {
        if (ds.at) {
          const [x, y] = resolvePoint(`@${ds.at}`, stage);
          el.style.left = `${x}px`;
          el.style.top = `${y}px`;
        }
        anims.push(
          el.animate(
            [
              { offset: 0, opacity: 0, transform: "scale(.3)" },
              { offset: at(t), opacity: 0, transform: "scale(.3)" },
              { offset: at(t + 120), opacity: 1, transform: "scale(.8)" },
              { offset: at(t + 520), opacity: 0, transform: "scale(1.6)" },
              { offset: 1, opacity: 0, transform: "scale(1.6)" },
            ],
            timing,
          ),
        );
        return;
      }
      const points = (ds.path ?? "").split(";").map((p) => {
        const i = p.indexOf(":");
        return [Number(p.slice(0, i)), ...resolvePoint(p.slice(i + 1), stage)] as const;
      });
      if (points.length === 0) return;
      const move = (x: number, y: number) => `translate(${x}px, ${y}px)`;
      const frames: Keyframe[] = [{ offset: 0, transform: move(points[0][1], points[0][2]), opacity: 0 }];
      for (const [ms, x, y] of points) {
        frames.push({ offset: at(ms), transform: move(x, y), opacity: 1, easing: "cubic-bezier(.45,0,.2,1)" });
      }
      const [, lastX, lastY] = points[points.length - 1];
      frames.push(
        { offset: at(end), transform: move(lastX, lastY), opacity: 0 },
        { offset: 1, transform: move(lastX, lastY), opacity: 0 },
      );
      anims.push(el.animate(frames, timing));
      return;
    }

    let frames: Frames | undefined = KINDS[kind];
    if (kind === "slide") {
      frames = [{ transform: `translate(${ds.x ?? 0}px, ${ds.y ?? 0}px)` }, { transform: "translate(0px, 0px)" }];
    } else if (kind === "move") {
      frames = [{ transform: "translate(0px, 0px)" }, { transform: `translate(${ds.x ?? 0}px, ${ds.y ?? 0}px)` }];
    } else if (kind === "draw" && el instanceof SVGGeometryElement) {
      const len = el.getTotalLength();
      el.style.strokeDasharray = String(len);
      frames = [{ strokeDashoffset: len }, { strokeDashoffset: 0 }];
    }
    if (!frames) return;
    if (reduced && kind === "move") d = 1;
    else if (reduced && kind !== "fade") frames = KINDS.fade;

    if (el instanceof SVGElement && (kind === "pop" || kind === "grow")) {
      el.style.transformBox = "fill-box";
      el.style.transformOrigin = kind === "grow" ? "center bottom" : "center";
    }

    const [from, to] = frames;
    const list: Keyframe[] =
      t === 0
        ? [{ offset: 0, ...to }]
        : [{ offset: 0, ...from }, { offset: at(t), ...from, easing: ds.ease ?? EASE }, { offset: at(t + d), ...to }];
    if (end < loop) list.push({ offset: at(end), ...to }, { offset: at(end + 250), ...from });
    const last = list[list.length - 1];
    if ((last.offset ?? 0) < 1) {
      const hold: Keyframe = { ...last, offset: 1 };
      delete hold.easing;
      list.push(hold);
    }
    anims.push(el.animate(list, { ...timing, fill: "both" }));
  });

  // One shared clock drives the counters, so they pause and restart with the rest.
  const clock = root.animate([], timing);
  anims.push(clock);

  let frame = 0;
  const tick = () => {
    const now = Number(clock.currentTime ?? 0) % loop;
    for (const c of counts) {
      const p = c.d === 0 ? (now >= c.t ? 1 : 0) : Math.min(Math.max((now - c.t) / c.d, 0), 1);
      const text = formatCount(c.from + (c.to - c.from) * (1 - Math.pow(1 - p, 3)), c);
      if (c.el.textContent !== text) c.el.textContent = text;
    }
    frame = requestAnimationFrame(tick);
  };
  const startTicking = () => {
    cancelAnimationFrame(frame);
    if (counts.length > 0) frame = requestAnimationFrame(tick);
  };
  startTicking();

  return {
    play() {
      anims.forEach((a) => a.play());
      startTicking();
    },
    pause() {
      anims.forEach((a) => a.pause());
      cancelAnimationFrame(frame);
    },
    restart() {
      anims.forEach((a) => {
        a.currentTime = 0;
      });
    },
    destroy() {
      cancelAnimationFrame(frame);
      anims.forEach((a) => a.cancel());
      // Put the final numbers back, so the HTML reads correctly again.
      counts.forEach((c) => (c.el.textContent = formatCount(c.to, c)));
    },
  };
}
