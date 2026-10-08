import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/** Кнопка-«таблетка» с заливкой-sweep при наведении */
export function GlowButton({
  children,
  href,
  variant = "go",
  className,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  variant?: "go" | "sun" | "dark" | "ghost";
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 font-mono text-[13px] font-medium uppercase tracking-[0.14em] transition-all duration-300 active:scale-95";

  const styles = {
    go: "bg-goblue font-bold text-white shadow-[0_12px_30px_-10px_rgba(0,173,216,0.7)] hover:shadow-[0_16px_40px_-8px_rgba(0,173,216,0.8)]",
    sun: "bg-sun font-bold text-ink shadow-[0_12px_30px_-10px_rgba(255,200,0,0.8)] hover:shadow-[0_16px_40px_-8px_rgba(255,200,0,0.9)]",
    dark: "bg-ink font-bold text-white shadow-[0_12px_30px_-12px_rgba(12,21,38,0.6)]",
    ghost:
      "border-2 border-line bg-white/70 font-bold text-ink backdrop-blur hover:border-ink",
  } as const;

  const fill = {
    go: "bg-ink",
    sun: "bg-ink",
    dark: "bg-goblue",
    ghost: "bg-ink",
  } as const;

  const content = (
    <>
      {/* sweep fill */}
      <span
        className={cn(
          "absolute inset-0 translate-y-full rounded-full transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0",
          fill[variant]
        )}
      />
      <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 group-hover:text-white">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(base, styles[variant], className)} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button className={cn(base, styles[variant], className)} onClick={onClick}>
      {content}
    </button>
  );
}
