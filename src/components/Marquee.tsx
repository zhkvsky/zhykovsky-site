import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export function Marquee({
  children,
  duration = 28,
  reverse = false,
  className,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "marquee-paused group relative flex w-full overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "animate-marquee flex w-max shrink-0 items-center",
          reverse && "marquee-reverse"
        )}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
