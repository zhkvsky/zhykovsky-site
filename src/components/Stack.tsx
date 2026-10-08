import { motion } from "framer-motion";
import { Container, Database, MessagesSquare, ServerCog, Languages, Check } from "lucide-react";
import { SectionHeading, Reveal, Sheet } from "./Section";
import { GopherPeek } from "./Gopher";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-3xl border border-line bg-paper p-7 transition-colors duration-200 hover:border-goblue md:p-8",
        className
      )}
      data-hover
    >
      {children}
    </div>
  );
}

function CardHead({
  icon: Icon,
  title,
  desc,
  bg,
}: {
  icon: typeof ServerCog;
  title: string;
  desc: string;
  bg: string;
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-4">
        <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white", bg)}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      </div>
      <p className="text-sm font-medium leading-relaxed text-mist">{desc}</p>
    </div>
  );
}

function Chip({ children, hot }: { children: ReactNode; hot?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 font-mono text-[12px] font-bold",
        hot ? "border-ink bg-ink text-sun" : "border-line bg-white text-ink"
      )}
    >
      {children}
    </span>
  );
}

const BARS = [
  { label: "Горутины, каналы, context", pct: 88 },
  { label: "HTTP API и middleware", pct: 84 },
  { label: "PostgreSQL и SQL", pct: 78 },
  { label: "Тесты и бенчмарки", pct: 68 },
];

const PIPELINE = ["go vet", "go test ./...", "docker build", "деплой по ssh"];

export function Stack() {
  return (
    <section id="stack" className="relative px-4 py-10 md:px-8 md:py-14">
      <div className="relative mx-auto max-w-[1220px]">
        <GopherPeek
          accessory="helmet"
          text="Собираю и выкладываю сам: сервер, Docker, CI"
          side="left"
          offset="-top-28"
          accent="bg-ink text-white"
        />
        <Sheet tint className="px-6 py-12 md:px-12 md:py-16">
          <SectionHeading
            index="02"
            label="Стек"
            title="Что знаю и чем пользуюсь"
            right="Go знаю лучше остального. С базами данных и инфраструктурой работаю уверенно, но расти есть куда — и я об этом знаю."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
            {/* Go */}
            <Reveal className="lg:col-span-7">
              <Card>
                <CardHead
                  icon={ServerCog}
                  bg="bg-goblue"
                  title="Go — основной язык"
                  desc="Пишу на стандартной библиотеке и лёгких обёртках: chi для роутинга, pgx для базы. Разбираюсь в том, как устроены горутины и отмена через context."
                />
                <div className="mt-8 space-y-4">
                  {BARS.map((b, i) => (
                    <div key={b.label}>
                      <div className="mb-1.5 flex justify-between font-mono text-[12px] font-bold text-mist">
                        <span>{b.label}</span>
                        <span className="text-goblue">{b.pct}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${b.pct}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 1.1, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full bg-goblue"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  <Chip hot>Go 1.22</Chip>
                  <Chip>chi</Chip>
                  <Chip>pgx</Chip>
                  <Chip>sqlc</Chip>
                  <Chip>testify</Chip>
                </div>
              </Card>
            </Reveal>

            {/* Базы данных */}
            <Reveal className="lg:col-span-5" delay={0.06}>
              <Card>
                <CardHead
                  icon={Database}
                  bg="bg-viol"
                  title="Базы данных"
                  desc="Проектирую схему, добавляю индексы, пишу SQL руками. Миграции веду сам, бэкапы настроены."
                />
                <div className="mt-7 rounded-2xl bg-ink p-4 font-mono text-[12px] font-medium leading-6 text-white">
                  <p>
                    <span className="text-sun">EXPLAIN</span> SELECT … FROM orders
                  </p>
                  <p className="text-white/60">Index Scan using orders_user_idx</p>
                  <p className="text-white/60">Planning 0.08 ms · Execution 1.9 ms</p>
                  <p>
                    rows: 240 · <span className="text-mint">индекс подобран</span>
                    <span className="animate-blink ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-goblue" />
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Chip>PostgreSQL</Chip>
                  <Chip>Redis</Chip>
                  <Chip>SQLite</Chip>
                </div>
              </Card>
            </Reveal>

            {/* Инфраструктура */}
            <Reveal className="lg:col-span-4" delay={0.04}>
              <Card>
                <CardHead
                  icon={Container}
                  bg="bg-ink"
                  title="Сборка и выкладка"
                  desc="Домашний сервер на Linux, Docker Compose и автоматические проверки при пуше."
                />
                <div className="mt-7 space-y-2.5">
                  {PIPELINE.map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                      className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-2.5 font-mono text-[13px] font-bold text-ink"
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-mint text-white">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {step}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Chip>Docker</Chip>
                  <Chip>Linux</Chip>
                  <Chip>GitHub Actions</Chip>
                </div>
              </Card>
            </Reveal>

            {/* API и фоновые задачи */}
            <Reveal className="lg:col-span-4" delay={0.1}>
              <Card>
                <CardHead
                  icon={MessagesSquare}
                  bg="bg-coral"
                  title="API и фоновые задачи"
                  desc="REST и gRPC, очереди и воркеры. Отдельно слежу за таймаутами и повторами — чтобы задачи не терялись."
                />
                <div className="mt-7 rounded-2xl border border-line bg-white p-4 font-mono text-[12px] font-medium leading-6 text-ink">
                  <p>POST /orders → очередь</p>
                  <p className="text-mist">воркеры: 4 · очередь: 0</p>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="my-2 h-1.5 origin-left rounded-full bg-goblue"
                  />
                  <p className="text-mist">повторы и таймауты настроены</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Chip>gRPC</Chip>
                  <Chip>NATS</Chip>
                  <Chip>WebSocket</Chip>
                </div>
              </Card>
            </Reveal>

            {/* Языки */}
            <Reveal className="lg:col-span-4" delay={0.14}>
              <Card>
                <CardHead
                  icon={Languages}
                  bg="bg-mint"
                  title="Языки и общение"
                  desc="Документацию читаю по-английски. Умею объяснить задачу и написать понятный код-ревью."
                />
                <div className="mt-7 space-y-3 font-mono text-[13px] font-bold">
                  <div className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-3">
                    <span>Английский</span>
                    <span className="rounded-md bg-goblue/15 px-2 py-0.5 text-goblue">B2</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-3">
                    <span>Русский</span>
                    <span className="rounded-md bg-sun/50 px-2 py-0.5 text-ink">родной</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-line bg-white px-4 py-3">
                    <span>Код-ревью</span>
                    <span className="rounded-md bg-viol/15 px-2 py-0.5 text-viol">регулярно</span>
                  </div>
                </div>
              </Card>
            </Reveal>
          </div>
        </Sheet>
      </div>
    </section>
  );
}
