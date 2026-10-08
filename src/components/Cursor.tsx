import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 1600, damping: 80, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1600, damping: 80, mass: 0.2 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-fine");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, [data-hover]"));
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.classList.remove("cursor-none-fine");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div style={{ x: ringX, y: ringY }} className="pointer-events-none fixed left-0 top-0 z-[100]">
        <motion.div
          animate={{ scale: pressed ? 0.7 : hovering ? 2 : 1, opacity: hovering ? 0.95 : 0.55 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="-ml-4 -mt-4 h-8 w-8 rounded-full border-2 border-goblue bg-goblue/10"
        />
      </motion.div>
      <motion.div style={{ x: dotX, y: dotY }} className="pointer-events-none fixed left-0 top-0 z-[101]">
        <motion.div
          animate={{ scale: pressed ? 2 : hovering ? 0.4 : 1 }}
          className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-ink"
        />
      </motion.div>
    </>
  );
}

const TRAIL_WORDS = ["go", "func", "chan", "defer", "select", "go run", "200 OK", "sql", "redis", "docker"];

type Crumb = { id: number; x: number; y: number; word: string; rot: number };

/** Ненавязчивый след из Go-слов за курсором */
export function GoTrail() {
  const [enabled, setEnabled] = useState(false);
  const [crumbs, setCrumbs] = useState<Crumb[]>([]);
  const last = useRef({ x: -999, y: -999, t: 0 });
  const idRef = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      if (now - last.current.t < 150 || Math.hypot(dx, dy) < 36) return;
      last.current = { x: e.clientX, y: e.clientY, t: now };

      const id = ++idRef.current;
      setCrumbs((prev) => [
        ...prev.slice(-6),
        {
          id,
          x: e.clientX,
          y: e.clientY,
          word: TRAIL_WORDS[(Math.random() * TRAIL_WORDS.length) | 0],
          rot: Math.random() * 16 - 8,
        },
      ]);
      window.setTimeout(() => setCrumbs((prev) => prev.filter((c) => c.id !== id)), 900);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[93] overflow-hidden">
      {crumbs.map((c) => (
        <motion.span
          key={c.id}
          initial={{ opacity: 0.4, y: 4, scale: 0.9 }}
          animate={{ opacity: 0, y: -34, scale: 1 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          style={{ left: c.x + 14, top: c.y + 10, rotate: c.rot }}
          className="absolute select-none whitespace-nowrap rounded-md bg-white/80 px-1.5 py-0.5 font-mono text-[11px] text-mist"
        >
          {c.word}
        </motion.span>
      ))}
    </div>
  );
}
