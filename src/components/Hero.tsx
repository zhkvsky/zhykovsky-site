import { motion } from "framer-motion";
import { ArrowDown, FileDown, MapPin } from "lucide-react";
import { GlowButton, Magnetic } from "./Magnetic";
import { Marquee } from "./Marquee";
import { Sheet } from "./Section";
import { Gopher } from "./Gopher";

const EASE = [0.22, 1, 0.36, 1] as const;
const SKILLS = ["Go", "PostgreSQL", "Redis", "Docker", "gRPC", "Linux", "Nginx", "Git"];

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { delay: 0.12 * i, duration: 0.9, ease: EASE },
  }),
};

function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="w-7 shrink-0 select-none text-right text-white/30">{n}</span>
      <span className="whitespace-pre pl-4">{children}</span>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative px-4 pb-10 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-[1220px]">
        <Sheet className="px-6 py-12 md:px-12 md:py-16">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px]">
            <div className="bg-grid-dark absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_40%_40%,black,transparent)]" />
          </div>

          <div className="relative grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
            {/* ---- текст ---- */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mb-7 inline-flex items-center gap-3 rounded-full border border-line bg-paper px-4 py-2"
              >
                <span className="pulse-dot h-2 w-2 rounded-full bg-mint text-mint" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-mist">
                  Открыт к предложениям
                </span>
              </motion.div>

              <p className="mb-3 font-mono text-sm font-bold text-goblue">
                Кирилл Жуковский
              </p>

              <h1 className="font-display font-extrabold leading-[0.96] tracking-tight text-ink">
                <span className="block overflow-hidden pb-1">
                  <motion.span custom={0} variants={line} initial="hidden" animate="show" className="block text-[clamp(2.6rem,8vw,6.6rem)]">
                    ПИШУ
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <motion.span custom={1} variants={line} initial="hidden" animate="show" className="flex items-center gap-3 text-[clamp(2.6rem,8vw,6.6rem)]">
                    <span className="text-outline">НА</span>
                    <span className="text-goblue">GO</span>
                  </motion.span>
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
                className="mt-6 max-w-xl text-base font-medium leading-relaxed text-mist md:text-lg"
              >
                Студент 3 курса ТАУ,
                направление «Прикладная информатика». Пишу бэкенд на Go, 
                параллельно учусь в Т-Академии
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <Magnetic>
                  <GlowButton href="#projects" variant="dark">
                    Проекты
                    <ArrowDown className="h-4 w-4" />
                  </GlowButton>
                </Magnetic>
                <Magnetic>
                  <GlowButton href="#contact" variant="sun">
                    Резюме
                    <FileDown className="h-4 w-4" />
                  </GlowButton>
                </Magnetic>
                <span className="flex items-center gap-2 pl-1 font-mono text-xs font-bold text-mist">
                  <MapPin className="h-4 w-4 text-coral" />
                  Самара
                </span>
              </motion.div>

              <motion.dl
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.8 }}
                className="mt-10 flex flex-wrap gap-3"
              >
                {[
                  ["3", "курс"],
                  ["4.6", "средний балл"],
                  ["1 год", "на Go"],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-2xl border border-line bg-paper px-4 py-2">
                    <dt className="font-display text-base font-extrabold text-ink">{v}</dt>
                    <dd className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-mist">{l}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            {/* ---- терминал + маскот ---- */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: 1.5 }}
              transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
              className="relative hidden justify-self-center md:block lg:justify-self-end"
              data-hover
            >
              <div className="relative z-10 w-[380px] overflow-hidden rounded-3xl border border-line bg-ink shadow-lift xl:w-[410px]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-coral" />
                    <span className="h-3 w-3 rounded-full bg-sun" />
                    <span className="h-3 w-3 rounded-full bg-mint" />
                  </div>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-xs font-bold text-white">main.go</span>
                </div>
                <div className="space-y-1 px-4 py-5 font-mono text-[13px] font-medium leading-6 text-white">
                  <CodeLine n={1}>
                    <span className="text-viol">package</span> main
                  </CodeLine>
                  <CodeLine n={2}> </CodeLine>
                  <CodeLine n={3}>
                    <span className="text-viol">func</span> <span className="text-sky">main</span>() {"{"}
                  </CodeLine>
                  <CodeLine n={4}>
                    {"    "}db := <span className="text-sky">openPostgres</span>(cfg)
                  </CodeLine>
                  <CodeLine n={5}>
                    {"    "}<span className="text-viol">go</span> workers.<span className="text-sky">run</span>(ctx, <span className="text-coral">4</span>)
                  </CodeLine>
                  <CodeLine n={6}>
                    {"    "}srv.<span className="text-sky">route</span>(<span className="text-mint">"/orders"</span>, listOrders)
                  </CodeLine>
                  <CodeLine n={7}>
                    {"    "}srv.<span className="text-sky">listen</span>(<span className="text-mint">":8080"</span>)
                  </CodeLine>
                  <CodeLine n={8}>
                    {"}"}
                    <span className="animate-blink ml-2 inline-block h-4 w-2 translate-y-0.5 bg-goblue" />
                  </CodeLine>
                </div>
              </div>

              {/* маскот с ноутбуком выглядывает снизу карточки */}
              <motion.div
                initial={{ y: 120, rotate: -10 }}
                animate={{ y: 24, rotate: -3 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 70, damping: 13 }}
                className="absolute -bottom-24 -left-24 z-0 hidden w-[190px] lg:block"
              >
                <Gopher accessory="pad" className="h-auto w-full drop-shadow-sm" />
              </motion.div>
            </motion.div>
          </div>
        </Sheet>
      </div>

      {/* навыки */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="fade-x relative z-10 mx-auto mt-6 max-w-[1220px] overflow-hidden rounded-3xl border border-line bg-white/70 py-4 shadow-soft"
      >
        <Marquee duration={26}>
          {SKILLS.map((s) => (
            <span key={s} className="flex items-center">
              <span className="px-6 font-display text-base font-bold text-ink md:text-lg">{s}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-goblue" />
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
