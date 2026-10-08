import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { GraduationCap, Code2, ServerCog, BadgeCheck } from "lucide-react";
import { SectionHeading, Reveal, Sheet } from "./Section";
import { GopherPeek } from "./Gopher";

function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 3, suffix: "", label: "курс обучения" },
  { value: 4.6, decimals: 1, suffix: "", label: "средний балл" },
  { value: 5, suffix: "", label: "проектов в портфолио" },
  { value: 1, suffix: " год", label: "пишу на Go" },
];

const FEATURES = [
  {
    icon: GraduationCap,
    bg: "bg-sun",
    title: "Учёба",
    text: "ТАУ, 3 курс. Прикладная информатика, Разработка цифровых программных продуктов. ",
  },
  {
    icon: Code2,
    bg: "bg-goblue",
    title: "Разработка",
    text: "Основной язык - Go. Пишу REST API, работаю с базой и постепенно собираю более серьёзные backend-проекты.",
  },
  {
    icon: ServerCog,
    bg: "bg-viol",
    title: "Инфраструктура",
    text: "На данный момент изучаю Docker и CI/CD.",
  },
];

export function About() {
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section id="about" className="relative px-4 py-10 md:px-8 md:py-14">
      <div className="relative mx-auto max-w-[1220px]">
        <GopherPeek
          accessory="cap"
          text="Третий курс, прикладная информатика. До конца выпуска - 1,5 года."
          side="right"
          offset="-top-28"
          accent="bg-sun text-ink"
        />
        <Sheet className="px-6 py-12 md:px-12 md:py-16">
          <SectionHeading
            index="01"
            label="Обо мне"
            title="Коротко о том, кто я и чем занимаюсь"
          />

          <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            {/* портрет */}
            <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0">
              <div className="absolute -inset-3 rotate-[-3deg] rounded-[28px] bg-sun" />
              <div className="absolute -inset-3 rotate-[2deg] rounded-[28px] bg-goblue/50" />
              <div className="group relative overflow-hidden rounded-[26px] border-4 border-white bg-white shadow-lift" data-hover>
                {photoOk ? (
                  <img
                    src="images/portrait.jpg"
                    alt="Кирилл Жуковский"
                    loading="lazy"
                    onError={() => setPhotoOk(false)}
                    className="aspect-[4/5] w-full object-cover"
                  />
                ) : (
                  <div className="grid aspect-[4/5] w-full place-items-center bg-gradient-to-br from-goblue/30 via-paper to-sun/40">
                    <span className="font-display text-6xl font-extrabold text-ink">КЖ</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-ink/80 to-transparent px-5 py-4 pt-12">
                  <div>
                    <p className="font-display text-base font-bold text-white">Кирилл Жуковский</p>
                    <p className="font-mono text-xs font-bold text-white/70">Самара · Go</p>
                  </div>
                  <BadgeCheck className="h-6 w-6 text-sun" />
                </div>
              </div>
            </Reveal>

            {/* текст */}
            <div>
              <Reveal delay={0.05}>
                <p className="font-display text-lg font-semibold leading-snug text-ink md:text-[24px] md:leading-[1.4]">
                  Меня зовут Кирилл. Учусь на прикладной информатике
                  и пишу бэкенд на Go.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-2xl font-medium leading-relaxed text-mist">
                  Пишу на Go и постепенно ухожу в backend. Учусь на 3 курсе прикладной информатики, параллельно прохожу программу Backend Go-разработка в Т-Академии.
                </p>
                <p className="mt-4 max-w-2xl font-medium leading-relaxed text-mist">
Сейчас много разбираюсь с тем, что происходит за HTTP-запросом: API, PostgreSQL, конкурентность, Docker и всё, что помогает собрать работающий backend, а не просто написать пару функций.
                </p>
                <p className="mt-4 max-w-2xl font-medium leading-relaxed text-mist">
Ищу стажировку или первую работу в backend разработке. Хочу попасть в команду, где можно писать настоящий код, разбираться в чужих решениях и постепенно брать на себя больше ответственности.
                </p>
              </Reveal>

              <div className="mt-10 space-y-3">
                {FEATURES.map((f, i) => (
                  <Reveal key={f.title} delay={0.06 * i}>
                    <div
                      className="group flex gap-5 rounded-3xl border border-line bg-paper p-5 transition-colors duration-200 hover:border-goblue md:p-6"
                      data-hover
                    >
                      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white ${f.bg}`}>
                        <f.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-[15px] font-bold text-ink">{f.title}</h3>
                        <p className="mt-1.5 text-sm font-medium leading-relaxed text-mist">{f.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* цифры */}
          <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={0.05 * i} className="h-full">
                <div className="flex h-full flex-col justify-between gap-5 rounded-3xl border border-line bg-paper p-6 transition-colors duration-200 hover:border-goblue md:p-7">
                  <span className="font-display text-3xl font-extrabold text-ink md:text-4xl">
                    <Counter to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
                  </span>
                  <span className="text-sm font-bold text-mist">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Sheet>
      </div>
    </section>
  );
}
