"use client";

// Premium 16:9 cartoon motion scene — a cool robot (no typing) at a futuristic desk.
// Layers with parallax + camera drift, seamless CSS loops. No text, no logos.
// ponytail: decorative loop (SVG/CSS); swap for real video later if wanted.

export function HeroCartoon({ className }: { className?: string }) {
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-3xl border border-line bg-[#0B1220] shadow-[0_30px_80px_rgba(0,0,0,0.55)] ${className ?? ""}`}
      aria-hidden
    >
      {/* grain */}
      <div className="grain pointer-events-none absolute inset-0 z-20" />

      <div
        className="absolute inset-0"
        style={{ animation: "hc-drift 26s ease-in-out infinite", transform: "scale(1.04)" }}
      >
        <svg viewBox="0 0 960 540" fill="none" className="h-full w-full">
          <defs>
            <linearGradient id="hc-navy" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0E1829" />
              <stop offset="1" stopColor="#0A101E" />
            </linearGradient>
            <radialGradient id="hc-glow-blue" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#3B82F6" stopOpacity="0.28" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hc-glow-mint" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#6EE7B7" stopOpacity="0.2" />
              <stop offset="1" stopColor="#6EE7B7" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hc-core" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#6EE7B7" stopOpacity="0.95" />
              <stop offset="0.55" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hc-scan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#6EE7B7" stopOpacity="0" />
              <stop offset="0.5" stopColor="#6EE7B7" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hc-screen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6EE7B7" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
            <clipPath id="hc-visor"><rect x="730" y="248" width="82" height="30" rx="15" /></clipPath>
            <clipPath id="hc-lap"><rect x="520" y="330" width="230" height="150" rx="12" /></clipPath>
          </defs>

          {/* ===== BACKGROUND ===== */}
          <rect width="960" height="540" fill="url(#hc-navy)" />
          <circle cx="830" cy="150" r="250" fill="url(#hc-glow-blue)" />
          <circle cx="210" cy="420" r="260" fill="url(#hc-glow-mint)" />

          {/* dot grid */}
          <g fill="rgba(245,239,228,0.07)">
            {[60, 110, 160, 210, 260, 310, 360, 410, 460, 510, 560, 610, 660, 710, 760, 810, 860, 910].map((x) =>
              [60, 110, 160, 210, 260, 310, 360, 410, 460, 510].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />)
            )}
          </g>

          {/* circuit lines (parallax back) */}
          <g style={{ animation: "hc-drift 34s ease-in-out infinite", transform: "scale(1.03)" }}>
            <path
              d="M40 500 H180 L230 450 H320 M320 450 V400 M320 450 H390"
              stroke="#6EE7B7" strokeOpacity="0.35" strokeWidth="2"
              strokeLinecap="round" strokeDasharray="7 5"
              style={{ animation: "hc-dash 3s linear infinite" }}
            />
            <circle cx="180" cy="500" r="4" fill="#6EE7B7" opacity="0.6" />
            <circle cx="390" cy="450" r="4" fill="#6EE7B7" opacity="0.6" />
            <path
              d="M40 520 H250 L300 470 H330"
              stroke="#3B82F6" strokeOpacity="0.3" strokeWidth="1.5"
              strokeLinecap="round" strokeDasharray="5 6"
              style={{ animation: "hc-dash 4.2s linear infinite" }}
            />
          </g>

          {/* ===== DESK ===== */}
          <g>
            <rect x="120" y="424" width="720" height="116" rx="20" fill="#111C30" stroke="rgba(245,239,228,0.1)" strokeWidth="2" />
            <rect x="120" y="424" width="720" height="8" rx="4" fill="#F5EFE4" opacity="0.9" />
            <ellipse cx="480" cy="468" rx="300" ry="26" fill="#0A101E" opacity="0.5" />
          </g>

          {/* ===== LAPTOP (idle, code screen) ===== */}
          <g>
            <rect x="520" y="330" width="230" height="150" rx="12" fill="#070D1A" stroke="rgba(245,239,228,0.18)" strokeWidth="3" />
            <rect x="528" y="338" width="214" height="134" rx="8" fill="#0A1428" />
            <g clipPath="url(#hc-lap)">
              <rect x="536" y="352" width="60" height="9" rx="4.5" fill="#6EE7B7" style={{ animation: "ccode 4s ease-in-out infinite" }} />
              <rect x="536" y="370" width="96" height="9" rx="4.5" fill="#4C8DFF" style={{ animation: "ccode 4s ease-in-out infinite", animationDelay: "0.6s" }} />
              <rect x="536" y="388" width="78" height="9" rx="4.5" fill="rgba(245,239,228,0.35)" style={{ animation: "ccode 4s ease-in-out infinite", animationDelay: "1.2s" }} />
              <rect x="536" y="406" width="120" height="9" rx="4.5" fill="#FF8A3D" style={{ animation: "ccode 4s ease-in-out infinite", animationDelay: "1.8s" }} />
              <rect x="536" y="424" width="52" height="9" rx="4.5" fill="#6EE7B7" style={{ animation: "ccode 4s ease-in-out infinite", animationDelay: "2.4s" }} />
              <rect x="520" y="330" width="230" height="4" fill="url(#hc-screen)" opacity="0.85" style={{ animation: "cscan 3.4s ease-in-out infinite" }} />
            </g>
            <rect x="520" y="330" width="230" height="150" rx="12" style={{ animation: "cscreen 4.5s ease-in-out infinite" }} fill="none" />
            <path d="M506 482 h258 l12 16 h-282 z" fill="#0D1526" stroke="rgba(245,239,228,0.12)" strokeWidth="2" />
          </g>

          {/* ===== IoT SENSOR BOARD ===== */}
          <g>
            <rect x="360" y="452" width="104" height="58" rx="8" fill="#0E1B33" stroke="#2C3E63" strokeWidth="2" />
            <rect x="376" y="466" width="36" height="30" rx="3" fill="#0A1428" stroke="#3B82F6" strokeWidth="1.5" />
            <rect x="382" y="472" width="10" height="10" rx="2" fill="#1B2B4F" />
            <rect x="396" y="472" width="10" height="10" rx="2" fill="#1B2B4F" />
            <circle cx="448" cy="462" r="5" fill="#6EE7B7" style={{ animation: "hc-led 1.8s ease-in-out infinite" }} />
            <circle cx="448" cy="462" r="9" fill="#6EE7B7" opacity="0.15" style={{ animation: "hc-glow 1.8s ease-in-out infinite" }} />
            {[376, 390, 404, 418, 432, 446, 460, 474, 488, 502].map((x, i) => (
              <rect key={i} x={x} y="502" width="4" height="8" rx="1" fill="#2C3E63" />
            ))}
            <path d="M452 452 v-14" stroke="#2C3E63" strokeWidth="2.5" />
            <circle cx="452" cy="434" r="3" fill="#FF8A3D" />
            <path d="M464 470 H510" stroke="#4C8DFF" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="6 5" style={{ animation: "hc-dash 2.4s linear infinite" }} />
          </g>

          {/* ===== COOL ROBOT (hero, no typing) ===== */}
          <g style={{ animation: "hc-bob 3.8s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "center" }}>
            {/* legs / stand */}
            <path d="M728 460 v28 h14 v-28 z" fill="#16223A" stroke="#2C3E63" strokeWidth="2" />
            <path d="M798 460 v28 h14 v-28 z" fill="#16223A" stroke="#2C3E63" strokeWidth="2" />
            {/* orbit ring around head */}
            <g style={{ animation: "hc-spin 12s linear infinite", transformBox: "fill-box", transformOrigin: "center" }}>
              <circle cx="771" cy="272" r="86" fill="none" stroke="#6EE7B7" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 10" />
              <circle cx="857" cy="272" r="6" fill="#FF8A3D" />
            </g>
            {/* arms (sway, no typing) */}
            <g style={{ animation: "hc-arm 4.6s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "690px 330px" }}>
              <rect x="676" y="330" width="26" height="74" rx="13" fill="#1E2C44" stroke="#2C3E63" strokeWidth="2" />
              <circle cx="689" cy="410" r="13" fill="#182238" stroke="#6EE7B7" strokeWidth="2.5" />
            </g>
            <g style={{ animation: "hc-arm 4.6s ease-in-out infinite", transformBox: "fill-box", transformOrigin: "854px 330px", animationDelay: "0.25s" }}>
              <rect x="848" y="330" width="26" height="74" rx="13" fill="#1E2C44" stroke="#2C3E63" strokeWidth="2" />
              <circle cx="861" cy="410" r="13" fill="#182238" stroke="#6EE7B7" strokeWidth="2.5" />
            </g>
            {/* body */}
            <rect x="700" y="320" width="142" height="146" rx="32" fill="#16223A" stroke="#2C3E63" strokeWidth="2.5" />
            <rect x="712" y="334" width="118" height="6" rx="3" fill="#2C3E63" />
            <rect x="712" y="428" width="118" height="6" rx="3" fill="#2C3E63" />
            {/* chest screen (live bars) */}
            <rect x="726" y="362" width="90" height="54" rx="12" fill="#0A1428" stroke="#2C3E63" strokeWidth="2" />
            <rect x="736" y="374" width="10" height="10" rx="3" fill="#6EE7B7" className="hc-eq" />
            <rect x="752" y="374" width="10" height="10" rx="3" fill="#4C8DFF" className="hc-eq" style={{ animationDelay: "0.15s" }} />
            <rect x="768" y="374" width="10" height="10" rx="3" fill="#FF8A3D" className="hc-eq" style={{ animationDelay: "0.3s" }} />
            <rect x="736" y="392" width="34" height="8" rx="4" fill="#2C3E63" />
            <rect x="776" y="392" width="30" height="8" rx="4" fill="#2C3E63" />
            {/* core glow */}
            <circle cx="771" cy="330" r="26" fill="url(#hc-core)" style={{ animation: "hc-glow 2.6s ease-in-out infinite" }} />
            <circle cx="771" cy="330" r="10" fill="#6EE7B7" style={{ animation: "hc-led 1.4s ease-in-out infinite" }} />
            {/* neck */}
            <rect x="755" y="296" width="32" height="26" rx="8" fill="#2C3E63" />
            {/* head */}
            <rect x="718" y="232" width="106" height="76" rx="26" fill="#1E2C44" stroke="#2C3E63" strokeWidth="2.5" />
            {/* visor with scan */}
            <rect x="730" y="248" width="82" height="30" rx="15" fill="#0A1428" stroke="#3B82F6" strokeOpacity="0.6" strokeWidth="2" />
            <g clipPath="url(#hc-visor)">
              <rect x="718" y="256" width="106" height="14" fill="url(#hc-scan)" style={{ animation: "hc-sweep 3.2s ease-in-out infinite" }} />
            </g>
            {/* side vents */}
            <rect x="706" y="262" width="8" height="14" rx="4" fill="#2C3E63" />
            <rect x="828" y="262" width="8" height="14" rx="4" fill="#2C3E63" />
            {/* antenna */}
            <path d="M771 232 v-22" stroke="#2C3E63" strokeWidth="4" strokeLinecap="round" />
            <circle cx="771" cy="206" r="7" fill="#FF8A3D" style={{ animation: "hc-led 1.1s ease-in-out infinite" }} />
            <circle cx="771" cy="206" r="13" fill="#FF8A3D" opacity="0.15" style={{ animation: "hc-glow 1.1s ease-in-out infinite" }} />
          </g>

          {/* energy particles from core */}
          <g>
            <circle cx="771" cy="300" r="5" fill="#6EE7B7" style={{ animation: "hc-particle 4s ease-in-out infinite" }} />
            <circle cx="752" cy="318" r="4" fill="#4C8DFF" style={{ animation: "hc-particle 5s ease-in-out infinite", animationDelay: "1.2s" }} />
            <circle cx="794" cy="312" r="4" fill="#FF8A3D" style={{ animation: "hc-particle 4.6s ease-in-out infinite", animationDelay: "2.2s" }} />
          </g>

          {/* ===== FLOATING UI CARDS ===== */}
          <g style={{ animation: "hc-float 6s ease-in-out infinite" }}>
            <rect x="236" y="170" width="158" height="96" rx="14" fill="#F5EFE4" filter="drop-shadow(0 14px 22px rgba(0,0,0,0.35))" />
            <circle cx="262" cy="196" r="8" fill="#3B82F6" />
            <rect x="282" y="190" width="80" height="8" rx="4" fill="#1E2C44" opacity="0.75" />
            <rect x="282" y="204" width="54" height="7" rx="3.5" fill="#1E2C44" opacity="0.35" />
            <rect x="252" y="230" width="52" height="22" rx="6" fill="#6EE7B7" />
            <rect x="258" y="238" width="10" height="7" rx="3" fill="#0E1526" />
            <rect x="330" y="230" width="46" height="22" rx="6" fill="#FF8A3D" />
          </g>
          <g style={{ animation: "hc-float 7s ease-in-out infinite", animationDelay: "0.8s" }}>
            <rect x="424" y="120" width="128" height="84" rx="14" fill="#101C33" stroke="rgba(245,239,228,0.12)" strokeWidth="1.5" filter="drop-shadow(0 14px 22px rgba(0,0,0,0.35))" />
            <rect x="440" y="140" width="40" height="7" rx="3.5" fill="rgba(245,239,228,0.4)" />
            <rect x="440" y="156" width="60" height="7" rx="3.5" fill="rgba(245,239,228,0.18)" />
            <path d="M440 178 L468 170 L486 180 L516 166" stroke="#6EE7B7" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="516" cy="166" r="5" fill="#6EE7B7" />
            <circle cx="488" cy="190" r="7" fill="#FF8A3D" />
          </g>
          <g style={{ animation: "hc-float 5.6s ease-in-out infinite", animationDelay: "1.4s" }}>
            <rect x="168" y="292" width="132" height="74" rx="14" fill="#F5EFE4" filter="drop-shadow(0 14px 22px rgba(0,0,0,0.35))" />
            <rect x="186" y="312" width="44" height="8" rx="4" fill="#1E2C44" opacity="0.7" />
            <rect x="186" y="330" width="30" height="7" rx="3.5" fill="#1E2C44" opacity="0.35" />
            <rect x="252" y="310" width="30" height="18" rx="9" fill="#3B82F6" />
            <circle cx="268" cy="319" r="5" fill="#F5EFE4" />
            <circle cx="206" cy="344" r="9" fill="#FF8A3D" />
          </g>

          {/* sparkles */}
          <g fill="#F5EFE4">
            <path d="M120 90 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4z" opacity="0.8" style={{ animation: "ctwinkle 3s ease-in-out infinite" }} />
            <path d="M360 70 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="#6EE7B7" style={{ animation: "ctwinkle 3.6s ease-in-out infinite", animationDelay: "1s" }} />
            <circle cx="880" cy="96" r="4" fill="#FF8A3D" style={{ animation: "ctwinkle 2.8s ease-in-out infinite", animationDelay: "1.8s" }} />
            <circle cx="820" cy="40" r="3" fill="#4C8DFF" style={{ animation: "ctwinkle 3.2s ease-in-out infinite", animationDelay: "0.6s" }} />
          </g>
        </svg>
      </div>
    </div>
  );
}
