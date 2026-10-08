import { useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, Send, MapPin } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { GithubIcon } from "./Projects";
import { Reveal, Sheet } from "./Section";
import { GopherPeek } from "./Gopher";
import { cn } from "../utils/cn";

const EMAIL = "zhykovsky1@yandex.ru";

function VkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.16 17.5c-5.65 0-8.88-3.87-9.01-10.33h2.83c.09 4.73 2.18 6.73 3.83 7.14V7.17h2.67v4.08c1.63-.18 3.35-2.06 3.93-4.08H20c-.29 1.75-.85 3.03-1.7 4.1-.72.9-1.77 1.8-2.6 2.4.98.45 1.98 1.1 2.75 2 1.06 1.22 1.58 2.36 1.66 3.83h-2.94c-.47-1.5-1.64-3.05-3.32-3.83-.26-.12-.55-.18-.85-.23V17.5h-.84Z" />
    </svg>
  );
}

const SOCIALS = [
  {
    icon: Send,
    bg: "bg-goblue",
    label: "Telegram",
    handle: "@freesdeas",
    href: "https://t.me/freesdeas",
    note: "отвечаю в течение дня",
  },
  {
    icon: GithubIcon,
    bg: "bg-ink",
    label: "GitHub",
    handle: "github.com/zhkvsky",
    href: "https://github.com/zhkvsky",
    note: "pet-проекты",
  },
  {
    icon: VkIcon,
    bg: "bg-viol",
    label: "ВКонтакте",
    handle: "vk.com/zhykovskiy",
    href: "https://vk.com/zhykovskiy",
    note: "если удобнее здесь",
  },
  {
    icon: Mail,
    bg: "bg-coral",
    label: "Почта",
    handle: EMAIL,
    href: `mailto:${EMAIL}`,
    note: "для официальных писем",
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* буфер недоступен */
    }
  };

  return (
    <footer id="contact" className="relative px-4 pb-10 pt-10 md:px-8 md:pb-14">
      <div className="relative mx-auto max-w-[1220px]">
        <GopherPeek
          accessory="plain"
          text="Отвечаю на все сообщения :)"
          side="right"
          offset="-top-28"
          accent="bg-white text-ink"
        />
        <Sheet className="sheet-dark overflow-hidden px-6 py-12 text-white md:px-12 md:py-16">
          <div className="mb-6 flex items-center gap-4 font-mono text-xs font-bold uppercase tracking-[0.22em] text-white/50">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-sun font-display text-[13px] font-bold text-ink">
              05
            </span>
            <span className="h-0.5 w-12 rounded-full bg-white/20" />
            <span>Контакты</span>
          </div>

          <Reveal>
            <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,3.6rem)] font-extrabold leading-[1.05] tracking-tight">
              Как со мной связаться
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-8 max-w-xl font-medium leading-relaxed text-white/70">
              Пишите в Telegram - отвечаю очень быстро :).
              Почту проверяю чуть реже.
            </p>
            <p className="mt-4 flex items-center gap-2 font-mono text-sm font-bold text-white/50">
              <MapPin className="h-4 w-4 text-sun" />
              Самара / Москва · рассматриваю удалённую работу
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <button
                  onClick={copyEmail}
                  className="group flex items-center gap-4 rounded-full bg-white px-6 py-3.5 font-mono text-base font-bold text-ink transition-colors duration-200 hover:bg-sun md:text-lg"
                  data-hover
                >
                  {EMAIL}
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-goblue text-white transition-transform duration-200 group-hover:rotate-12">
                    {copied ? (
                      <Check className="h-4 w-4" strokeWidth={3} />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </span>
                </button>
              </Magnetic>
              <span
                className={cn(
                  "rounded-full bg-mint/20 px-3 py-1 font-mono text-xs font-bold text-mint transition-opacity duration-200",
                  copied ? "opacity-100" : "opacity-0"
                )}
              >
                скопировано
              </span>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {SOCIALS.map((s, i) => (
              <Reveal key={s.label} delay={0.05 * i} className="h-full">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors duration-200 hover:bg-white/10"
                  data-hover
                >
                  <span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white", s.bg)}>
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-[15px] font-bold">{s.label}</span>
                    <span className="block truncate font-mono text-xs font-bold text-white/50">{s.handle}</span>
                  </span>
                  <span className="ml-auto shrink-0 text-right">
                    <span className="mb-1 block font-mono text-[11px] font-bold text-white/40">{s.note}</span>
                    <ArrowUpRight className="ml-auto h-5 w-5 text-white/50 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-sun" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center">
            <div>
              <p className="font-display text-sm font-bold">© 2026 Кирилл Жуковский</p>
            </div>
            <Magnetic>
              <a
                href="#top"
                className="group flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/60 transition-colors duration-200 hover:border-sun hover:text-sun"
                data-hover
              >
                Наверх
                <ArrowUp className="h-4 w-4" />
              </a>
            </Magnetic>
          </div>
        </Sheet>
      </div>
    </footer>
  );
}
