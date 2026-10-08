import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GraduationCap,
  Hand,
  Mail,
  Rocket,
  ServerCog,
  Trophy,
} from "lucide-react";
import { cn } from "../utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

type SectionId = "top" | "about" | "stack" | "projects" | "journey" | "contact";

const STATES: Record<
  SectionId,
  { text: string; icon: typeof Hand; bubble: string; badge: string }
> = {
  top: {
    text: "Привет! Я Гоша — гид по этому сайту. Листай вниз!",
    icon: Hand,
    bubble: "bg-ink text-white",
    badge: "bg-sun text-ink",
  },
  about: {
    text: "Это Саша: 3 курс, GPA 4.8 и огромная любовь к горутинам",
    icon: GraduationCap,
    bubble: "bg-white text-ink border-2 border-ink/10",
    badge: "bg-goblue text-white",
  },
  stack: {
    text: "Стек: Go, Postgres, Redis, Docker. Каналы не блокирую, честно",
    icon: ServerCog,
    bubble: "bg-white text-ink border-2 border-ink/10",
    badge: "bg-viol text-white",
  },
  projects: {
    text: "Смотри, что собрано на Go: 12k RPS и аптайм 99.9%",
    icon: Trophy,
    bubble: "bg-white text-ink border-2 border-ink/10",
    badge: "bg-mint text-white",
  },
  journey: {
    text: "От hello world до продакшна за три года. Дальше — больше",
    icon: Rocket,
    bubble: "bg-white text-ink border-2 border-ink/10",
    badge: "bg-coral text-white",
  },
  contact: {
    text: "Напиши Саше — отвечает быстрее, чем стартует бинарь",
    icon: Mail,
    bubble: "bg-sun text-ink",
    badge: "bg-ink text-sun",
  },
};

const ORDER: SectionId[] = ["top", "about", "stack", "projects", "journey", "contact"];

/** Фиксированный маскот-компаньон: подпрыгивает и меняет реплику под активный блок */
export function GopherGuide() {
  const [active, setActive] = useState<SectionId>("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id as SectionId);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    ORDER.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const s = STATES[active];
  const Icon = s.icon;

  return (
    <a
      href="#contact"
      className="fixed bottom-4 right-4 z-[75] flex flex-col items-end gap-2 md:bottom-6 md:right-6"
      aria-label="Гоша — перейти к контактам"
      data-hover
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: -10, scale: 0.92 }}
          transition={{ duration: 0.35, ease: EASE }}
          className={cn(
            "max-w-[210px] rounded-2xl rounded-br-md px-4 py-3 text-[13px] font-semibold leading-snug shadow-[0_18px_40px_-14px_rgba(12,21,38,0.45)] md:max-w-[240px] md:text-sm",
            s.bubble
          )}
        >
          {s.text}
        </motion.div>
      </AnimatePresence>

      <motion.div
        key={`gopher-${active}`}
        initial={{ y: 70, scale: 0.5, rotate: -14 }}
        animate={{ y: 0, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 15 }}
        whileHover={{ scale: 1.08, rotate: -4 }}
        className="relative"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <img
            src="/images/gopher.png"
            alt="Гоша — маскот Go"
            draggable={false}
            className="h-20 w-20 rounded-[26px] border-4 border-white object-cover shadow-[0_18px_40px_-12px_rgba(12,21,38,0.4)] md:h-24 md:w-24"
          />
        </motion.div>
        <span
          className={cn(
            "absolute -left-2 -top-2 grid h-8 w-8 place-items-center rounded-full shadow-md",
            s.badge
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
      </motion.div>
    </a>
  );
}

/** Гоша, выглядывающий из-за края блока при скролле */
export function GopherPeek({
  text,
  side = "right",
  className,
}: {
  text: string;
  side?: "right" | "left";
  className?: string;
}) {
  const right = side === "right";
  return (
    <motion.div
      initial={{ x: right ? 140 : -140, opacity: 0, rotate: right ? 8 : -8 }}
      whileInView={{ x: 0, opacity: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 80, damping: 14 }}
      className={cn(
        "flex items-end gap-3",
        right ? "flex-row" : "flex-row-reverse",
        className
      )}
      data-hover
    >
      <div
        className={cn(
          "max-w-[260px] rounded-2xl border-2 border-ink/10 bg-white px-4 py-3 text-sm font-semibold leading-snug text-ink shadow-[0_18px_40px_-16px_rgba(12,21,38,0.35)]",
          right ? "rounded-br-md" : "rounded-bl-md"
        )}
      >
        {text}
      </div>
      <div className="animate-wiggle shrink-0">
        <img
          src="/images/gopher.png"
          alt="Гоша выглядывает"
          draggable={false}
          loading="lazy"
          className="h-20 w-20 rounded-[24px] border-4 border-white object-cover shadow-lg md:h-24 md:w-24"
        />
      </div>
    </motion.div>
  );
}
