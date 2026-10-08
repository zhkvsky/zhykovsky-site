import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export type Accessory = "plain" | "pad" | "cap" | "helmet" | "flag" | "map";

const DATA_V: Record<Accessory, string> = {
  plain: "1",
  pad: "2",
  cap: "3",
  helmet: "4",
  flag: "5",
  map: "6",
};

/* ---------- общие defs (фильтр + градиент) — рендерятся один раз ---------- */

export function GopherDefs() {
  return (
    <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="gopher-sk" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
        </filter>
        <linearGradient id="gopher-bd" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5fcdf6" />
          <stop offset="1" stopColor="#3fb6ec" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- глобальное слежение за курсором для всех гоферов ---------- */

type Vec = { x: number; y: number };

type Reg = {
  svg: SVGSVGElement | null;
  tilt: SVGGElement | null;
  pL: SVGGElement | null;
  pR: SVGGElement | null;
  eyeL: SVGCircleElement | null;
  eyeR: SVGCircleElement | null;
  tL: Vec;
  tR: Vec;
  cL: Vec;
  cR: Vec;
  tx: number;
  ty: number;
  cx: number;
  cy: number;
};

const regs = new Set<Reg>();
let tracking = false;
let calm = false;

/** Вектор взгляда одного глаза на курсор (максимум 14 ед. смещения зрачка) */
function look(eye: SVGCircleElement | null, x: number, y: number): Vec {
  if (!eye) return { x: 0, y: 0 };
  const r = eye.getBoundingClientRect();
  if (!r.width) return { x: 0, y: 0 };
  const dx = x - (r.left + r.width / 2);
  const dy = y - (r.top + r.height / 2);
  const d = Math.hypot(dx, dy) || 1;
  const u = r.width / 60;
  const t = Math.min(1, d / (u * 45)) * 14;
  return { x: (dx / d) * t, y: (dy / d) * t };
}

function aimAll(x: number, y: number) {
  regs.forEach((g) => {
    g.tL = look(g.eyeL, x, y);
    g.tR = look(g.eyeR, x, y);
    const svg = g.svg;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    if (!r.width) return;
    g.tx = Math.max(-1, Math.min(1, (x - (r.left + r.width / 2)) / (window.innerWidth / 2)));
    g.ty = Math.max(-1, Math.min(1, (y - (r.top + r.height / 2)) / (window.innerHeight / 2)));
  });
}

function resetAll() {
  regs.forEach((g) => {
    g.tL = { x: 0, y: 0 };
    g.tR = { x: 0, y: 0 };
    g.tx = 0;
    g.ty = 0;
  });
}

function loop() {
  regs.forEach((g) => {
    const rest =
      Math.abs(g.tL.x - g.cL.x) +
      Math.abs(g.tL.y - g.cL.y) +
      Math.abs(g.tR.x - g.cR.x) +
      Math.abs(g.tR.y - g.cR.y) +
      Math.abs(g.tx - g.cx) +
      Math.abs(g.ty - g.cy);
    if (rest < 0.02) return; // уже на месте — DOM не трогаем
    g.cL.x += (g.tL.x - g.cL.x) * 0.22;
    g.cL.y += (g.tL.y - g.cL.y) * 0.22;
    g.cR.x += (g.tR.x - g.cR.x) * 0.22;
    g.cR.y += (g.tR.y - g.cR.y) * 0.22;
    g.pL?.setAttribute("transform", `translate(${g.cL.x.toFixed(2)} ${g.cL.y.toFixed(2)})`);
    g.pR?.setAttribute("transform", `translate(${g.cR.x.toFixed(2)} ${g.cR.y.toFixed(2)})`);
    if (!calm && g.tilt) {
      g.cx += (g.tx - g.cx) * 0.12;
      g.cy += (g.ty - g.cy) * 0.12;
      g.tilt.style.transform = `translate(${(g.cx * 5).toFixed(2)}px,${(g.cy * 2).toFixed(2)}px) rotate(${(g.cx * 4).toFixed(2)}deg)`;
    }
  });
  requestAnimationFrame(loop);
}

function startTracking() {
  if (tracking || typeof window === "undefined") return;
  tracking = true;
  calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf = 0;
  let px = 0;
  let py = 0;
  window.addEventListener(
    "pointermove",
    (e) => {
      px = e.clientX;
      py = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        aimAll(px, py);
      });
    },
    { passive: true }
  );
  document.addEventListener("pointerleave", resetAll);
  requestAnimationFrame(loop);
}

/* ---------- гофер ---------- */

export function Gopher({
  accessory = "plain",
  head = false,
  className,
}: {
  accessory?: Accessory;
  head?: boolean;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tiltRef = useRef<SVGGElement>(null);
  const pLRef = useRef<SVGGElement>(null);
  const pRRef = useRef<SVGGElement>(null);
  const eyeLRef = useRef<SVGCircleElement>(null);
  const eyeRRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    startTracking();
    const reg: Reg = {
      svg: svgRef.current,
      tilt: tiltRef.current,
      pL: pLRef.current,
      pR: pRRef.current,
      eyeL: eyeLRef.current,
      eyeR: eyeRRef.current,
      tL: { x: 0, y: 0 },
      tR: { x: 0, y: 0 },
      cL: { x: 0, y: 0 },
      cR: { x: 0, y: 0 },
      tx: 0,
      ty: 0,
      cx: 0,
      cy: 0,
    };
    regs.add(reg);
    return () => {
      regs.delete(reg);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      data-v={DATA_V[accessory]}
      viewBox={head ? "30 30 140 120" : "-30 -14 264 270"}
      className={cn("gopher overflow-visible", className)}
      role="img"
      aria-label="Гофер"
    >
      <g ref={tiltRef} className="g-tilt">
        <g filter="url(#gopher-sk)" stroke="#26363f" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round">
          {/* уши */}
          <circle cx="48" cy="52" r="13" fill="#4bbcee" />
          <circle cx="152" cy="50" r="13" fill="#4bbcee" />
          {/* лапки */}
          <ellipse cx="78" cy="242" rx="10" ry="5.5" fill="#f4e7ba" strokeWidth="2.2" />
          <ellipse cx="124" cy="242" rx="10" ry="5.5" fill="#f4e7ba" strokeWidth="2.2" />
          {/* тело */}
          <path
            d="M100 22C135 20 168 42 170 90C172 130 165 170 160 200C156 232 130 240 100 240C70 240 44 232 40 200C35 170 28 130 30 90C32 42 65 24 100 22Z"
            fill="url(#gopher-bd)"
          />
          {/* опущенные руки */}
          <g className="v v1 v3 v4 v5">
            <ellipse cx="38" cy="158" rx="5.5" ry="12" transform="rotate(-14 38 158)" fill="#f4e7ba" strokeWidth="2.2" />
          </g>
          <g className="v v1 v3 v4">
            <ellipse cx="162" cy="158" rx="5.5" ry="12" transform="rotate(14 162 158)" fill="#f4e7ba" strokeWidth="2.2" />
          </g>
          {/* глаза (белки) */}
          <circle ref={eyeLRef} cx="72" cy="88" r="30" fill="#fff" />
          <circle ref={eyeRRef} cx="128" cy="88" r="30" fill="#fff" />
          {/* нос и зубы */}
          <ellipse cx="100" cy="116" rx="8" ry="6" fill="#8b9299" strokeWidth="2.2" />
          <rect x="92.5" y="122" width="7.5" height="13" rx="3" fill="#f4e7ba" strokeWidth="2.2" />
          <rect x="100" y="122" width="7.5" height="13" rx="3" fill="#f4e7ba" strokeWidth="2.2" />

          {/* 2. приставка */}
          <g className="v v2">
            <rect x="48" y="160" width="104" height="46" rx="11" fill="#5b6472" />
            <rect x="78" y="166" width="44" height="34" rx="3" fill="#b9d6a0" strokeWidth="2" />
            <path d="M62 176h6v5h5v6h-5v5h-6v-5h-5v-6h5z" fill="#26363f" strokeWidth="1" />
            <circle cx="138" cy="180" r="4.5" fill="#d9302f" strokeWidth="1.6" />
            <circle cx="131" cy="190" r="4.5" fill="#f2b632" strokeWidth="1.6" />
            <ellipse cx="47" cy="186" rx="8" ry="7" fill="#f4e7ba" strokeWidth="2.2" />
            <ellipse cx="153" cy="186" rx="8" ry="7" fill="#f4e7ba" strokeWidth="2.2" />
          </g>

          {/* 3. шапочка бакалавра */}
          <g className="v v3">
            <path d="M70 20V38Q100 50 130 38V20Z" fill="#23272e" />
            <polygon points="100,-8 168,14 100,34 32,14" fill="#2f343d" />
            <circle cx="100" cy="13" r="3" fill="#f2b632" strokeWidth="1.5" />
            <path d="M100 13L154 19V44" fill="none" stroke="#f2b632" strokeWidth="2.6" />
            <rect x="149.5" y="44" width="9" height="13" rx="2" fill="#f2b632" strokeWidth="1.8" />
          </g>

          {/* 4. каска строителя */}
          <g className="v v4">
            <path d="M46 42C46 -8 154 -8 154 42Z" fill="#ffc21a" />
            <path d="M92 -2H108V42H92Z" fill="#ffd75a" strokeWidth="2" />
            <rect x="38" y="38" width="124" height="10" rx="5" fill="#f0a800" />
          </g>

          {/* 5. красный флажок */}
          <g className="v v5">
            <rect x="175" y="8" width="4.5" height="152" rx="2" fill="#7a5a3a" strokeWidth="2" />
            <path d="M179.5 10C196 5 210 20 228 14V42C210 48 196 34 179.5 40Z" fill="#e0262e" />
            <path d="M158 150Q171 146 176 130" fill="none" stroke="#26363f" strokeWidth="13" />
            <path d="M158 150Q171 146 176 130" fill="none" stroke="#4bbcee" strokeWidth="8" />
            <circle cx="177" cy="128" r="7" fill="#f4e7ba" strokeWidth="2.2" />
          </g>

          {/* 6. бумажная карта */}
          <g className="v v6">
            <polygon points="50,150 84,156 84,216 50,210" fill="#f2e6bf" strokeWidth="2" />
            <polygon points="84,156 116,150 116,210 84,216" fill="#e6d7a4" strokeWidth="2" />
            <polygon points="116,150 150,156 150,216 116,210" fill="#f2e6bf" strokeWidth="2" />
            <path d="M58 168Q80 184 96 176T142 196" fill="none" stroke="#4aa3d8" strokeWidth="3" />
            <path d="M58 204L88 186L110 196L138 170" fill="none" stroke="#d9302f" strokeWidth="2.2" strokeDasharray="3 4" />
            <path d="M133 165l10 10M143 165l-10 10" stroke="#d9302f" strokeWidth="2.5" />
            <circle cx="70" cy="196" r="5" fill="#6bb45a" strokeWidth="1.6" />
            <ellipse cx="48" cy="184" rx="8" ry="7" fill="#f4e7ba" strokeWidth="2.2" />
            <ellipse cx="152" cy="188" rx="8" ry="7" fill="#f4e7ba" strokeWidth="2.2" />
          </g>
        </g>

        {/* зрачки (вне фильтра, чтобы были чёткими и двигались) */}
        <g ref={pLRef}>
          <circle cx="72" cy="88" r="9.5" fill="#111" />
          <circle cx="69" cy="84.5" r="2.6" fill="#fff" />
        </g>
        <g ref={pRRef}>
          <circle cx="128" cy="88" r="9.5" fill="#111" />
          <circle cx="125" cy="84.5" r="2.6" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}

/** Морда гофера для навигации */
export function GopherHead({ className }: { className?: string }) {
  return <Gopher accessory="plain" head className={className} />;
}

/**
 * Гофер выглядывает из-за блока: маскот лежит слоем ПОД карточкой (z-0),
 * реплика — поверх (z-30). Нижняя часть тела прячется за блоком.
 */
export function GopherPeek({
  accessory,
  text,
  side = "right",
  offset = "-top-28",
  accent = "bg-white text-ink",
  className,
}: {
  accessory: Accessory;
  text: string;
  side?: "left" | "right";
  offset?: string;
  accent?: string;
  className?: string;
}) {
  const onRight = side === "right";
  return (
    <div
      className={cn(
        "pointer-events-none absolute hidden items-end gap-3 lg:flex",
        onRight ? "right-8 flex-row" : "left-8 flex-row-reverse",
        offset,
        className
      )}
    >
      {/* реплика — поверх листа */}
      <motion.div
        initial={{ opacity: 0, x: onRight ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 90, damping: 13, delay: 0.15 }}
        className={cn(
          "relative z-30 max-w-[230px] rounded-2xl px-4 py-3 text-[13px] font-semibold leading-snug shadow-soft",
          onRight ? "rounded-br-md" : "rounded-bl-md",
          accent
        )}
      >
        {text}
      </motion.div>

      {/* маскот — под листом, выглядывает из-за края */}
      <motion.div
        initial={{ y: 110, rotate: onRight ? 12 : -12 }}
        whileInView={{ y: 18, rotate: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 80, damping: 14 }}
        className="relative z-0 w-[150px] shrink-0 xl:w-[170px]"
      >
        <Gopher accessory={accessory} className="h-auto w-full" />
      </motion.div>
    </div>
  );
}
