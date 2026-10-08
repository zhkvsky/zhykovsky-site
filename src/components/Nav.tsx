import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { GopherHead } from "./Gopher";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "Обо мне", href: "#about" },
  { label: "Стек", href: "#stack" },
  { label: "Проекты", href: "#projects" },
  { label: "Путь", href: "#journey" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[80] h-[4px] w-full origin-left bg-gradient-to-r from-goblue via-viol to-sun"
      />
      <header
        className={cn(
          "fixed left-0 top-0 z-[70] w-full transition-colors duration-300",
          scrolled ? "border-b border-line bg-white/90 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1220px] items-center justify-between px-5 py-3 md:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-transform duration-300 group-hover:-rotate-6">
              <GopherHead className="h-9 w-9" />
            </span>
            <span className="hidden font-mono text-xs font-bold uppercase tracking-[0.18em] text-mist sm:block">
              Жуковский<span className="text-goblue">.</span>Кирилл
            </span>
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-line bg-white/90 p-1.5 shadow-soft lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-[13px] font-bold text-mist transition-colors duration-200 hover:bg-sun hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Кнопка переключения темы */}
            <ThemeToggle />

            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-goblue sm:inline-flex"
            >
              Связаться
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white text-ink lg:hidden"
              aria-label="Меню"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-line bg-white lg:hidden"
            >
              <div className="flex flex-col gap-1 px-5 py-4">
                {[...LINKS, { label: "Контакты", href: "#contact" }].map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 font-display text-lg font-semibold text-ink transition-colors hover:bg-paper"
                  >
                    {l.label}
                    <ArrowUpRight className="h-5 w-5 text-goblue" />
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}