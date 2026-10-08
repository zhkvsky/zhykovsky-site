import { motion } from "framer-motion";
import { ArrowUpRight, Trophy, MessagesSquare, Database, SquareTerminal } from "lucide-react";
import { SectionHeading, Reveal, Sheet } from "./Section";
import { GopherPeek } from "./Gopher";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/* ---------- экраны проектов ---------- */

function ApiVisual() {
  const routes = [
    { m: "GET", p: "/orders", c: "200", t: "4ms", hot: false },
    { m: "POST", p: "/orders", c: "201", t: "9ms", hot: true },
    { m: "GET", p: "/orders/24", c: "200", t: "3ms", hot: false },
  ];
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-goblue/15 via-white to-sun/25 p-6">
      <div className="w-full max-w-sm rounded-3xl border border-line bg-white shadow-lift">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-goblue font-display text-[10px] font-extrabold text-white">O</span>
            <span className="font-mono text-[11px] font-bold text-ink">orderflow</span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-mint/15 px-2.5 py-1 font-mono text-[10px] font-bold text-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" /> запущен
          </span>
        </div>
        <div className="space-y-2 p-4">
          {routes.map((r) => (
            <div key={r.p + r.m} className="flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2 font-mono text-[10px] font-bold">
              <span className={cn("rounded-md px-1.5 py-0.5 text-white", r.hot ? "bg-viol" : "bg-goblue")}>{r.m}</span>
              <span className="text-ink">{r.p}</span>
              <span className="ml-auto text-mint">{r.c}</span>
              <span className="text-mist">{r.t}</span>
            </div>
          ))}
          <div className="flex h-20 items-end gap-1.5 rounded-xl border border-line bg-paper p-2">
            {[35, 60, 45, 80, 55, 92, 70, 88, 62, 76].map((h, i) => (
              <div key={i} style={{ height: `${h}%` }} className={cn("flex-1 rounded-t-md", i === 5 ? "bg-sun" : "bg-goblue/35")} />
            ))}
          </div>
          <p className="text-center font-mono text-[10px] font-bold text-mist">
            нагрузка k6: 2 000 запросов в секунду
          </p>
        </div>
      </div>
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-viol/15 via-white to-goblue/10 p-8">
      <div className="w-full max-w-[250px] space-y-2.5">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="max-w-[85%] rounded-2xl rounded-bl-md border border-line bg-white px-3.5 py-2.5 font-mono text-[11px] font-bold text-ink shadow-soft"
        >
          кто онлайн?
        </motion.div>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-goblue px-3.5 py-2.5 font-mono text-[11px] font-bold text-white shadow-soft"
        >
          42 человека, список живой
        </motion.div>
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="flex w-16 items-center justify-center gap-1 rounded-2xl rounded-bl-md border border-line bg-white px-3 py-3"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
              className="h-1.5 w-1.5 rounded-full bg-goblue"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function CacheVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sun/25 via-white to-coral/15 p-8">
      <div className="w-full max-w-[280px] rounded-2xl bg-ink p-4 font-mono text-[11px] font-medium leading-5 text-white shadow-lift">
        <p>
          <span className="text-sun">$</span> gocache set session:42
        </p>
        <p className="text-white/50">ok · 0.3 ms · ttl 1h</p>
        <p>
          <span className="text-sun">$</span> gocache get session:42
        </p>
        <p className="text-white/50">
          hit · <span className="text-coral">вытеснение LRU</span>
        </p>
        <p>
          <span className="text-sun">$</span>
          <span className="animate-blink ml-2 inline-block h-3.5 w-1.5 translate-y-0.5 bg-white/70" />
        </p>
      </div>
    </div>
  );
}

function MigrateVisual() {
  const rows = ["001_users", "002_orders", "003_indexes"];
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-mint/15 via-white to-goblue/10 p-8">
      <div className="w-full max-w-[280px] rounded-2xl border border-line bg-white p-4 shadow-lift">
        <p className="mb-3 font-mono text-[11px] font-bold text-ink">$ migrate up</p>
        <div className="space-y-2">
          {rows.map((r, i) => (
            <motion.div
              key={r}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.18, duration: 0.45 }}
              className="flex items-center gap-2 rounded-xl bg-paper px-3 py-2 font-mono text-[11px] font-bold text-ink"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-mint text-[10px] text-white">✓</span>
              {r}
            </motion.div>
          ))}
        </div>
        <p className="mt-3 rounded-xl bg-ink px-3 py-2 text-center font-mono text-[11px] font-bold text-sun">
          применено 14 миграций
        </p>
      </div>
      <SquareTerminal className="absolute bottom-4 right-5 h-14 w-14 text-ink/10" />
    </div>
  );
}

/* ---------- карточки ---------- */

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-[11px] font-bold text-mist transition-colors duration-200 group-hover:border-goblue/60 group-hover:text-goblue">
      {children}
    </span>
  );
}

function CardShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "group relative h-full overflow-hidden rounded-3xl border border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:border-goblue hover:shadow-lift",
        className
      )}
      data-hover
    >
      {children}
    </div>
  );
}

const SMALL_PROJECTS = [
  {
    id: "P.02",
    icon: MessagesSquare,
    color: "bg-viol",
    title: "GoChat",
    desc: "Чат в реальном времени на WebSocket: комнаты, список онлайн, история в PostgreSQL. Крутится на домашнем сервере, пользуется группа.",
    tags: ["Go", "WebSocket", "Redis"],
    visual: <ChatVisual />,
  },
  {
    id: "P.03",
    icon: Database,
    color: "bg-coral",
    title: "GoCache",
    desc: "Упрощённый аналог Redis: протокол RESP, время жизни ключей, вытеснение LRU. Писал, чтобы понять устройство кэша изнутри.",
    tags: ["Go", "RESP", "LRU"],
    visual: <CacheVisual />,
  },
  {
    id: "P.04",
    icon: SquareTerminal,
    color: "bg-mint",
    title: "Migrator",
    desc: "Консольная утилита для миграций PostgreSQL: накатить, откатить, проверить контрольные суммы. Использую во всех своих проектах.",
    tags: ["Go", "Cobra", "PostgreSQL"],
    visual: <MigrateVisual />,
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative px-4 py-10 md:px-8 md:py-14">
      <div className="relative mx-auto max-w-[1220px]">
        <GopherPeek
          accessory="flag"
          text="OrderFlow: 2 000 запросов в секунду — и это на ноутбуке"
          side="right"
          offset="-top-28"
          accent="bg-goblue text-white"
        />
        <Sheet className="px-6 py-12 md:px-12 md:py-16">
          <SectionHeading
            index="03"
            label="Проекты"
            title="Что довёл до работающего состояния"
            right="У каждого проекта есть репозиторий с кодом, инструкцией по запуску и описанием того, что я сделал и что осталось доделать."
          />

          <Reveal>
            <CardShell className="mb-4">
              <div className="grid lg:grid-cols-2">
                <div className="relative min-h-[320px] overflow-hidden rounded-t-[22px] lg:rounded-l-[22px] lg:rounded-tr-none">
                  <ApiVisual />
                </div>
                <div className="flex flex-col justify-between gap-8 p-8 md:p-10">
                  <div>
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-bold text-mist">P.01</span>
                      <span className="flex items-center gap-2 rounded-full bg-sun px-3 py-1 font-mono text-[11px] font-bold text-ink">
                        <Trophy className="h-3.5 w-3.5" />
                        Мой самый большой pet-проект
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-extrabold text-ink md:text-3xl">OrderFlow API</h3>
                    <p className="mt-4 max-w-md font-medium leading-relaxed text-mist">
                      API для заказов интернет-магазина: корзина, оформление,
                      статусы и админка. Go, chi, PostgreSQL, Redis.
                      Фоновые задачи — воркеры с повторами. Нагрузку мерил
                      через k6: 2 000 запросов в секунду на моём ноутбуке.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-2">
                      <Tag>Go</Tag>
                      <Tag>PostgreSQL</Tag>
                      <Tag>Redis</Tag>
                      <Tag>Docker</Tag>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="grid h-11 w-11 place-items-center rounded-full border border-line text-mist transition-colors duration-200 hover:border-ink hover:text-ink"
                        aria-label="Репозиторий на GitHub"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                      <a
                        href="#contact"
                        className="grid h-11 w-11 place-items-center rounded-full bg-goblue text-white transition-transform duration-200 hover:rotate-45"
                        aria-label="Спросить про проект"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardShell>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SMALL_PROJECTS.map((p, i) => (
              <Reveal key={p.id} delay={0.06 * i} className="h-full">
                <CardShell>
                  <div className="relative h-56 overflow-hidden border-b border-line">{p.visual}</div>
                  <div className="p-7">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-mist">{p.id}</span>
                      <div className={cn("grid h-9 w-9 place-items-center rounded-full text-white", p.color)}>
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-relaxed text-mist">{p.desc}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                </CardShell>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="group mt-8 flex w-full items-center justify-between gap-4 rounded-3xl border-2 border-dashed border-line bg-paper px-8 py-6 transition-colors duration-200 hover:border-goblue hover:bg-white md:px-12"
              data-hover
            >
              <span className="font-display text-base font-bold text-mist transition-colors duration-200 group-hover:text-ink md:text-lg">
                Остальные проекты и учебные задания — на GitHub
              </span>
              <span className="flex shrink-0 items-center gap-3 font-mono text-sm font-bold text-goblue">
                github.com/zhkvsky
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </a>
          </Reveal>
        </Sheet>
      </div>
    </section>
  );
}
