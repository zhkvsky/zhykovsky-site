import { motion } from "framer-motion";
import { GraduationCap, Trophy, BookOpen, Code2, Sparkles, ArrowRight } from "lucide-react";
import { SectionHeading, Reveal, Sheet } from "./Section";
import { GlowButton, Magnetic } from "./Magnetic";
import { GopherPeek } from "./Gopher";
import { cn } from "../utils/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEMS = [
  {
    year: "2024",
    type: "Поступление",
    icon: GraduationCap,
    color: "bg-goblue",
    title: "Поступил на 1 курс",
    text: "Тольяттинская академия управления, направление «Прикладная информатика». Выбрал её за то, что рядом с домом, и за практику в программах.",
  },
  {
    year: "2024",
    type: "Первый код",
    icon: Code2,
    color: "bg-viol",
    title: "Первые проекты на Go",
    text: "Учебные сервисы для академии: расписание пар и каталог библиотеки. Потом попробовал Go и начал переписывать свои проекты на него.",
  },
  {
    year: "2025",
    type: "Т-Академия",
    icon: BookOpen,
    color: "bg-mint",
    title: "Начал программу «Backend Go-разработка»",
    text: "Учусь в Т-Академии (Т-Банк) параллельно с универом: проектирование API, очереди, observability, код-ревью. Много практики и проектов под руководством менторов.",
  },
  {
    year: "2026",
    type: "Диплом",
    icon: Trophy,
    color: "bg-sun",
    title: "Завершил курс «Алгоритмы и структуры данных»",
    text: "Курс от Т-Банка: хеш-таблицы, графы, сортировки — и их реализация на Go. Диплом о прохождении получен, задачи закрываю уверенно.",
  },
  {
    year: "2026",
    type: "Сейчас",
    icon: Sparkles,
    color: "bg-ink",
    title: "3 курс и поиск стажировки",
    text: "Дипломная работа — про обработку данных в реальном времени. Продолжаю учиться в Т-Академии и ищу стажировку, где можно писать Go под присмотром опытной команды.",
    highlight: true,
  },
];

export function Journey() {
  return (
    <section id="journey" className="relative px-4 py-10 md:px-8 md:py-14">
      <div className="relative mx-auto max-w-[1220px]">
        <GopherPeek
          accessory="map"
          text="Карта пройденного пути: универ, Т-Академия и мои проекты"
          side="left"
          offset="-top-28"
          accent="bg-white text-ink"
        />
        <Sheet tint className="px-6 py-12 md:px-12 md:py-16">
          <SectionHeading
            index="04"
            label="Путь"
            title="Как я дошёл до Go"
            right="Хроника с 2024 года, с поступлением в университет. Поступление, учёба, первые проекты — и всё, что вышло из этого."
          />

          <div className="relative">
            <div className="absolute left-[27px] top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-goblue via-sun to-viol md:block" />

            <div className="space-y-5">
              {ITEMS.map((item, i) => (
                <Reveal key={`${item.year}-${i}`} delay={0.04 * i}>
                  <div className="relative grid gap-4 md:grid-cols-[56px_110px_1fr] md:gap-7">
                    <div className="hidden md:block">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
                        className={cn("relative z-[2] grid h-14 w-14 place-items-center rounded-2xl text-white shadow-soft", item.color)}
                      >
                        <item.icon className="h-5 w-5" />
                      </motion.div>
                    </div>

                    <div className={cn("font-display text-2xl font-extrabold md:pt-3", item.highlight ? "text-goblue" : "text-ink/60")}>
                      {item.year}
                    </div>

                    <div
                      className={cn(
                        "rounded-3xl border p-7 transition-colors duration-200 md:p-8",
                        item.highlight
                          ? "border-ink bg-ink text-white shadow-lift"
                          : "border-line bg-white hover:border-goblue"
                      )}
                      data-hover
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span
                          className={cn(
                            "rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.1em]",
                            item.highlight ? "bg-sun text-ink" : "bg-paper text-mist"
                          )}
                        >
                          {item.type}
                        </span>
                        <item.icon className="h-4 w-4 text-goblue md:hidden" />
                      </div>
                      <h3 className={cn("font-display text-lg font-bold md:text-xl", item.highlight ? "text-white" : "text-ink")}>
                        {item.title}
                      </h3>
                      <p className={cn("mt-3 max-w-2xl text-sm font-medium leading-relaxed", item.highlight ? "text-white/70" : "text-mist")}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.08}>
            <div className="relative mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-sun p-8 md:flex-row md:items-center md:p-10">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink/60">
                  Что дальше
                </p>
                <h3 className="mt-3 max-w-lg font-display text-xl font-extrabold leading-snug text-ink md:text-2xl">
                  Ищу стажировку на Go-разработчика — напишите, отвечу быстро
                </h3>
              </div>
              <Magnetic>
                <GlowButton href="#contact" variant="dark">
                  Написать мне
                  <ArrowRight className="h-4 w-4" />
                </GlowButton>
              </Magnetic>
            </div>
          </Reveal>
        </Sheet>
      </div>
    </section>
  );
}
