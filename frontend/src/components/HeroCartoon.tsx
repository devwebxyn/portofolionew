"use client";

// VOID desk scene: a friendly young developer typing at his workstation.
// Flat-cartoon SVG, calm purposeful motion only (blink, typing, screen glow, idle bob, steam).
// No floating boxes, no orbit rings, no scattered particles, no bounce-all-over.
// ponytail: decorative inline SVG/CSS loop; swap for a real video later if wanted.

export function HeroCartoon({ className }: { className?: string }) {
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-3xl border border-line bg-panel shadow-[0_30px_80px_rgba(0,0,0,0.55)] ${className ?? ""}`}
      aria-hidden
    >
      {/* grain */}
      <div className="grain pointer-events-none absolute inset-0 z-20" />

      <div
        className="absolute inset-0"
        style={{ animation: "hc-drift 36s ease-in-out infinite", transform: "scale(1.02)" }}
      >
        <svg viewBox="0 0 960 540" fill="none" className="h-full w-full">
          <defs>
            <linearGradient id="hc-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0b0c10" />
              <stop offset="1" stopColor="#07080b" />
            </linearGradient>
            <radialGradient id="hc-glow-lime" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#c8ff2e" stopOpacity="0.12" />
              <stop offset="1" stopColor="#c8ff2e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hc-glow-cyan" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#22e0ff" stopOpacity="0.09" />
              <stop offset="1" stopColor="#22e0ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hc-screen-glow" cx="0.5" cy="0.5" r="0.75">
              <stop offset="0" stopColor="#c8ff2e" stopOpacity="0.16" />
              <stop offset="0.55" stopColor="#22e0ff" stopOpacity="0.12" />
              <stop offset="1" stopColor="#22e0ff" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hc-lamp-light" cx="0.5" cy="1" r="0.6">
              <stop offset="0" stopColor="#c8ff2e" stopOpacity="0.1" />
              <stop offset="1" stopColor="#c8ff2e" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ===== BACKGROUND ===== */}
          <rect width="960" height="540" fill="url(#hc-bg)" />
          <circle cx="700" cy="270" r="320" fill="url(#hc-glow-lime)" />
          <circle cx="420" cy="250" r="260" fill="url(#hc-glow-cyan)" />

          {/* faint wall grid */}
          <g stroke="rgba(255,255,255,0.03)">
            {[64, 128, 192, 256, 320, 384, 448, 512, 576, 640, 704, 768, 832, 896].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="392" />
            ))}
            {[64, 128, 192, 256, 320].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="960" y2={y} />
            ))}
          </g>

          {/* floor */}
          <rect x="0" y="392" width="960" height="148" fill="#07080b" />
          <line x1="0" y1="392" x2="960" y2="392" stroke="rgba(255,255,255,0.05)" />

          {/* ===== CHARACTER (behind desk) ===== */}
          <g className="hc-bob">
            {/* arms reaching to keyboard */}
            <path d="M628 318 Q600 348 596 382" stroke="#171a21" strokeWidth="34" strokeLinecap="round" />
            <path d="M772 318 Q792 350 744 382" stroke="#171a21" strokeWidth="34" strokeLinecap="round" />
            {/* torso / hoodie */}
            <rect x="615" y="286" width="170" height="160" rx="36" fill="#171a21" stroke="rgba(255,255,255,0.07)" />
            <path d="M700 318 v118" stroke="#0e1014" strokeWidth="3" />
            <rect x="648" y="382" width="104" height="30" rx="15" fill="#0e1014" opacity="0.5" />
            {/* neck */}
            <rect x="680" y="276" width="40" height="24" rx="10" fill="#c9a179" />
            {/* head */}
            <rect x="638" y="176" width="124" height="116" rx="36" fill="#d8b48f" />
            {/* ears */}
            <rect x="632" y="222" width="16" height="26" rx="8" fill="#d8b48f" />
            <rect x="752" y="222" width="16" height="26" rx="8" fill="#d8b48f" />
            {/* hair */}
            <path
              d="M638 220 q0 -46 44 -46 h36 q44 0 44 46 v8 q-22 -18 -44 -14 q-20 4 -36 12 q-12 4 -18 2 q-14 -4 -26 0 z"
              fill="#191d24"
            />
            {/* face: eyes blink */}
            <g className="hc-blink">
              <ellipse cx="676" cy="244" rx="9" ry="11" fill="#0e1014" />
              <circle cx="673" cy="240" r="2.6" fill="rgba(242,244,248,0.9)" />
              <ellipse cx="724" cy="244" rx="9" ry="11" fill="#0e1014" />
              <circle cx="721" cy="240" r="2.6" fill="rgba(242,244,248,0.9)" />
            </g>
            {/* brows */}
            <path d="M662 226 q14 -8 28 -2" stroke="#191d24" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M710 224 q14 -6 28 2" stroke="#191d24" strokeWidth="3.5" strokeLinecap="round" />
            {/* smile */}
            <path d="M684 268 q16 12 32 0" stroke="#0e1014" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>

          {/* ===== DESK ===== */}
          <rect x="70" y="392" width="820" height="148" rx="18" fill="#111318" stroke="rgba(255,255,255,0.07)" />
          <rect x="70" y="392" width="820" height="7" rx="3.5" fill="rgba(255,255,255,0.05)" />
          <rect x="90" y="420" width="780" height="100" rx="10" fill="#0c0e12" opacity="0.6" />

          {/* ===== MONITOR ===== */}
          <g>
            <rect x="300" y="168" width="280" height="200" rx="16" fill="#0c0f15" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
            <rect x="308" y="176" width="264" height="184" rx="10" fill="#0a0d13" />
            {/* code lines (abstract) */}
            <rect x="322" y="196" width="92" height="10" rx="5" fill="rgba(200,255,46,0.75)" />
            <rect x="322" y="214" width="142" height="10" rx="5" fill="rgba(34,224,255,0.6)" />
            <rect x="322" y="232" width="110" height="10" rx="5" fill="rgba(242,244,248,0.25)" />
            <rect x="322" y="250" width="62" height="10" rx="5" fill="rgba(167,139,250,0.65)" />
            <rect x="322" y="268" width="40" height="10" rx="5" fill="rgba(200,255,46,0.45)" />
            <rect x="322" y="286" width="150" height="10" rx="5" fill="rgba(242,244,248,0.18)" />
            <rect x="322" y="304" width="82" height="10" rx="5" fill="rgba(34,224,255,0.4)" />
            {/* cursor blink */}
            <rect x="330" y="320" width="8" height="14" rx="2" fill="rgba(200,255,46,0.9)" className="hc-cursor" />
            {/* screen glow pulse */}
            <rect x="308" y="176" width="264" height="184" rx="10" fill="url(#hc-screen-glow)" className="hc-glow" />
            {/* stand */}
            <rect x="422" y="368" width="36" height="20" rx="6" fill="#0e1117" />
            <rect x="402" y="384" width="76" height="8" rx="4" fill="#14171e" />
          </g>

          {/* ===== KEYBOARD ===== */}
          <g>
            <rect x="552" y="400" width="216" height="34" rx="10" fill="#0e1016" stroke="rgba(255,255,255,0.1)" />
            <rect x="566" y="410" width="188" height="6" rx="3" fill="rgba(242,244,248,0.12)" />
            <rect x="566" y="421" width="188" height="6" rx="3" fill="rgba(242,244,248,0.12)" />
          </g>

          {/* ===== HANDS (typing loop) ===== */}
          <g className="hc-type">
            <rect x="588" y="372" width="26" height="22" rx="11" fill="#171a21" />
            <ellipse cx="600" cy="392" rx="17" ry="14" fill="#d8b48f" />
            <ellipse cx="600" cy="392" rx="17" ry="14" fill="#c9a179" opacity="0.25" />
            <rect x="726" y="372" width="26" height="22" rx="11" fill="#171a21" />
            <ellipse cx="740" cy="392" rx="17" ry="14" fill="#d8b48f" />
            <ellipse cx="740" cy="392" rx="17" ry="14" fill="#c9a179" opacity="0.25" />
          </g>

          {/* ===== PROPS ===== */}
          {/* coffee mug + steam */}
          <g>
            <rect x="176" y="344" width="52" height="50" rx="10" fill="#14161d" stroke="rgba(255,255,255,0.1)" />
            <path d="M228 356 q18 0 18 16 q0 16 -18 16" stroke="#14161d" strokeWidth="6" fill="none" />
            <rect x="184" y="350" width="36" height="5" rx="2.5" fill="#c8ff2e" opacity="0.7" />
            <path
              d="M196 336 q-4 -8 2 -14 q6 -6 -2 -14"
              stroke="rgba(242,244,248,0.35)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              className="hc-steam"
            />
            <path
              d="M210 334 q4 -8 -2 -14 q-6 -6 2 -14"
              stroke="rgba(242,244,248,0.3)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              className="hc-steam"
              style={{ animationDelay: "2.2s" }}
            />
          </g>

          {/* desk lamp */}
          <g>
            <rect x="104" y="392" width="44" height="8" rx="4" fill="#1a1d24" />
            <rect x="122" y="340" width="8" height="56" rx="4" fill="#1a1d24" />
            <path d="M126 340 h36 q10 0 10 10 v6" stroke="#1a1d24" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M168 356 l34 22 -10 14 -34 -22 z" fill="#21252e" />
            <path d="M168 356 l64 40 h-18 l-24 -14 z" fill="url(#hc-lamp-light)" className="hc-lamp" />
          </g>

          {/* plant */}
          <g>
            <rect x="816" y="352" width="48" height="42" rx="10" fill="#1a1d24" stroke="rgba(255,255,255,0.08)" />
            <path d="M840 352 q-6 -34 4 -54 q14 18 6 54" fill="#1e4a38" />
            <path d="M840 352 q8 -36 -2 -56 q-12 20 -4 56" fill="#24543f" />
            <path d="M840 352 q0 -40 -14 -52 q-6 22 2 52" fill="#1e4a38" />
            <path d="M840 352 q2 -42 16 -52 q6 22 -2 52" fill="#24543f" />
            <circle cx="846" cy="300" r="3" fill="#c8ff2e" opacity="0.55" />
          </g>

          {/* desk shadow */}
          <ellipse cx="480" cy="536" rx="360" ry="10" fill="#000" opacity="0.35" />
        </svg>
      </div>
    </div>
  );
}
