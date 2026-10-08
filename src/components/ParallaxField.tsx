import { useEffect } from "react";
import { cn } from "../utils/cn";

/**
 * Параллакс на CSS-переменной --sy: один rAF-слушатель скролла,
 * слои двигаются через transform без пересчётов в React.
 * Декор живёт ТОЛЬКО по краям экрана — белые листы секций перекрывают его,
 * поэтому фон и контент не сливаются.
 */

function Chip({
  className,
  children,
  rot = "0deg",
  delay = "0s",
}: {
  className?: string;
  children: React.ReactNode;
  rot?: string;
  delay?: string;
}) {
  return (
    <div
      className={cn(
        "animate-float-slow absolute whitespace-nowrap rounded-2xl border border-white bg-white/85 px-4 py-2.5 font-mono text-xs font-medium text-ink shadow-soft",
        className
      )}
      style={{ "--float-rot": rot, animationDelay: delay } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

function Field({ className }: { className?: string }) {
  return <div className={cn("absolute rounded-full", className)} />;
}

export function ParallaxField() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      document.documentElement.style.setProperty("--sy", String(window.scrollY));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* дальний план: мягкие цветовые поля без filter:blur */}
      <div className="px-layer absolute inset-0" style={{ "--px-rate": -0.03 } as React.CSSProperties}>
        <Field className="left-[-12%] top-[4%] h-[520px] w-[520px] bg-[radial-gradient(circle,rgba(0,173,216,0.28),transparent_65%)]" />
        <Field className="right-[-14%] top-[18%] h-[560px] w-[560px] bg-[radial-gradient(circle,rgba(255,197,61,0.32),transparent_65%)]" />
        <Field className="left-[30%] top-[46%] h-[520px] w-[520px] bg-[radial-gradient(circle,rgba(123,97,255,0.2),transparent_65%)]" />
        <Field className="right-[6%] top-[68%] h-[520px] w-[520px] bg-[radial-gradient(circle,rgba(255,122,102,0.22),transparent_65%)]" />
        <Field className="left-[-6%] top-[84%] h-[520px] w-[520px] bg-[radial-gradient(circle,rgba(34,192,138,0.2),transparent_65%)]" />

        <span className="text-ghost absolute left-[2%] top-[12%] select-none font-display text-[13vw] font-extrabold leading-none">
          GOROUTINES
        </span>
        <span className="text-ghost absolute right-[2%] top-[52%] select-none font-display text-[11vw] font-extrabold leading-none">
          POSTGRES
        </span>
        <span className="text-ghost absolute left-[8%] top-[82%] select-none font-display text-[12vw] font-extrabold leading-none">
          DEPLOY
        </span>
      </div>

      {/* средний план: плашки с кодом по краям (только широкие экраны) */}
      <div className="px-layer absolute inset-0 hidden xl:block" style={{ "--px-rate": -0.08 } as React.CSSProperties}>
        <Chip className="left-[2%] top-[14%]" rot="-5deg">
          <span className="rounded bg-ink px-1.5 py-0.5 font-bold text-white">go</span> func handler(w, r)
        </Chip>
        <Chip className="right-[2%] top-[10%]" rot="5deg" delay="1.4s">
          ch := make(<span className="font-bold text-goblue">chan</span> Job, 64)
        </Chip>
        <Chip className="left-[3%] top-[42%]" rot="4deg" delay="0.8s">
          <span className="font-bold text-mint">SELECT</span> count(*) FROM orders
        </Chip>
        <Chip className="right-[3%] top-[46%]" rot="-4deg" delay="2s">
          docker compose up -d
        </Chip>
        <Chip className="left-[2%] top-[72%]" rot="5deg" delay="1.1s">
          ctx, cancel := context.WithTimeout(…)
        </Chip>
        <Chip className="right-[2%] top-[78%]" rot="-5deg" delay="0.4s">
          errgroup.Wait()
        </Chip>
      </div>

      {/* ближний план: короткие статусы */}
      <div className="px-layer absolute inset-0 hidden lg:block" style={{ "--px-rate": -0.14 } as React.CSSProperties}>
        <Chip className="left-[1%] top-[26%]" rot="6deg" delay="0.2s">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-mint" />
          200 OK
        </Chip>
        <Chip className="right-[1%] top-[30%]" rot="-6deg" delay="2.4s">
          go vet
        </Chip>
        <Chip className="left-[1.5%] top-[58%]" rot="-4deg" delay="1.6s">
          404
        </Chip>
        <Chip className="right-[1.5%] top-[64%]" rot="5deg" delay="0.6s">
          <span className="rounded bg-sun px-1.5 py-0.5 font-bold text-ink">goroutine</span>
        </Chip>
      </div>
    </div>
  );
}
