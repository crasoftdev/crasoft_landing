import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

// Lays a fixed-size demo out at its design size and scales it down to fit the
// column. Pure CSS: the wrapper is a size container, and tan(atan2(100cqw, W))
// is the ratio of its width to W. The aspect ratio reserves the space up front,
// so nothing shifts while the page loads.
export function FitScale({
  width,
  height,
  className,
  children,
}: {
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("relative w-full [container-type:inline-size]", className)}
      style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={
          {
            width,
            height,
            transform: `scale(tan(atan2(100cqw, ${width}px)))`,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
