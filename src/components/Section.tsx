import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Sheet({
  children,
  className,
  tint,
}: {
  children: ReactNode;
  className?: string;
  tint?: boolean;
}) {
  return (
    <div className={cn("sheet relative z-10", tint && "sheet-tint", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  right,
  className,
}: {
  index: string;
  label: string;
  title: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-5 flex items-center gap-4 font-mono text-xs font-bold uppercase tracking-[0.22em] text-mist"
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink font-display text-[13px] font-bold text-sun">
          {index}
        </span>
        <span className="h-0.5 w-12 rounded-full bg-ink/15" />
        <span>{label}</span>
      </motion.div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
          className="max-w-2xl font-display text-[clamp(1.8rem,4vw,3.3rem)] font-bold leading-[1.08] tracking-tight text-ink"
        >
          {title}
        </motion.h2>
        {right && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
            className="max-w-sm text-[15px] font-medium leading-relaxed text-mist"
          >
            {right}
          </motion.p>
        )}
      </div>
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
