"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { startTimeline, type Engine } from "@/components/demos/engine";

type Controls = { paused: boolean; toggle(): void; replay(): void };

const TimelineContext = createContext<Controls | null>(null);

// Runs a demo's looping timeline (see engine.ts) over everything inside it. It
// starts the first time the demo scrolls into view, pauses while it is off screen,
// and the viewer can pause or replay it with <DemoControls>. Until it starts, the
// server-rendered first frame shows.
export function Timeline({
  loop,
  className,
  children,
}: {
  loop: number;
  className?: string;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(root);
    return () => {
      io.disconnect();
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (inView && !engineRef.current) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      engineRef.current = startTimeline(root, loop, reduced);
      setStarted(true);
    }
    const engine = engineRef.current;
    if (!engine) return;
    if (inView && !paused) engine.play();
    else engine.pause();
  }, [inView, paused, loop]);

  const controls: Controls = {
    paused,
    toggle: () => setPaused((p) => !p),
    replay: () => {
      engineRef.current?.restart();
      setPaused(false);
    },
  };

  return (
    <TimelineContext value={controls}>
      <div
        ref={rootRef}
        className={className}
        data-demo-idle={started ? undefined : ""}
        data-demo-paused={inView && !paused ? undefined : ""}
      >
        {children}
      </div>
    </TimelineContext>
  );
}

// Pause and replay buttons. Moving content that runs longer than five seconds
// needs a way to stop it (WCAG 2.2.2).
export function DemoControls({ name, className }: { name: string; className?: string }) {
  const controls = useContext(TimelineContext);
  if (!controls) return null;
  const button =
    "inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-card/70 px-3 py-1.5 text-[13px] font-medium text-ink transition-colors hover:border-ink";
  return (
    <div className={cn("flex gap-2", className)}>
      <button type="button" onClick={controls.toggle} className={button}>
        {controls.paused ? (
          <Play aria-hidden="true" className="size-3.5" />
        ) : (
          <Pause aria-hidden="true" className="size-3.5" />
        )}
        {controls.paused ? "Play" : "Pause"}
        <span className="sr-only"> the {name} demo</span>
      </button>
      <button type="button" onClick={controls.replay} className={button}>
        <RotateCcw aria-hidden="true" className="size-3.5" />
        Replay
        <span className="sr-only"> the {name} demo</span>
      </button>
    </div>
  );
}
