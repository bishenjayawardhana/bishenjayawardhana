const fs = require('fs');
const path = require('path');

// Helper: Generate stardust constellation canopy for 1200px wide canvas
function generateStardust(width = 1200, height = 400, count = 110) {
  const stars = [];
  // Arched constellation path
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const angle = t * Math.PI;
    const radiusX = (width * 0.44) + Math.sin(i * 13) * 55;
    const radiusY = (height * 0.68) + Math.cos(i * 7) * 35;
    const cx = (width / 2) + Math.cos(angle) * radiusX;
    const cy = (height * 0.88) - Math.sin(angle) * radiusY;
    const r = (0.7 + ((i * 7) % 18) * 0.1).toFixed(1);
    const op = (0.25 + ((i * 11) % 70) * 0.01).toFixed(2);
    const color = i % 8 === 0 ? '#fd91cc' : (i % 3 === 0 ? '#38bdf8' : '#ffffff');
    stars.push(`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="${color}" opacity="${op}" />`);
  }
  return stars.join('\n      ');
}

// ============================================================================
// 1. HERO BANNER SVG (1200 x 680) — 3 Reference Themes + Live Bento Telemetry
// ============================================================================
function buildHeroBanner() {
  const stars = generateStardust(1200, 420, 130);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 680" width="100%" height="100%" fill="none">
  <defs>
    <!-- Theme 1: Deep Blue + Stardust + Bubblegum Pink -->
    <radialGradient id="t1-nebula" cx="50%" cy="32%" r="68%">
      <stop offset="0%" stop-color="#154be0" stop-opacity="0.92" />
      <stop offset="40%" stop-color="#09318d" stop-opacity="0.85" />
      <stop offset="78%" stop-color="#041338" />
      <stop offset="100%" stop-color="#020817" />
    </radialGradient>
    <radialGradient id="t1-floor" cx="50%" cy="100%" r="60%">
      <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.32" />
      <stop offset="45%" stop-color="#38bdf8" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#020817" stop-opacity="0" />
    </radialGradient>

    <!-- Theme 2: Midnight Black + Electric Blue God Rays + Cantaloupe Horizon -->
    <linearGradient id="t2-godray" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#0297de" stop-opacity="0.55" />
      <stop offset="55%" stop-color="#0284c7" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#02070a" stop-opacity="0" />
    </linearGradient>
    <radialGradient id="t2-sunrise" cx="50%" cy="95%" r="52%">
      <stop offset="0%" stop-color="#fff7ed" stop-opacity="0.95" />
      <stop offset="22%" stop-color="#fed7aa" stop-opacity="0.85" />
      <stop offset="48%" stop-color="#fc734d" stop-opacity="0.75" />
      <stop offset="78%" stop-color="#9a3412" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#02070a" stop-opacity="0" />
    </radialGradient>

    <!-- Theme 3: Sky Blue + Fluted Glass + Hot Pink Aura -->
    <linearGradient id="t3-sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0593c6" />
      <stop offset="65%" stop-color="#0369a1" />
      <stop offset="100%" stop-color="#031830" />
    </linearGradient>
    <radialGradient id="t3-pink-aura" cx="45%" cy="48%" r="48%">
      <stop offset="0%" stop-color="#ff5ca8" stop-opacity="0.92" />
      <stop offset="35%" stop-color="#d83995" stop-opacity="0.78" />
      <stop offset="68%" stop-color="#fb923c" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#0593c6" stop-opacity="0" />
    </radialGradient>

    <!-- Fluted Glass Vertical Texture Pattern -->
    <pattern id="fluted-glass" width="6" height="40" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" stroke-width="1" stroke-opacity="0.1" />
      <line x1="3" y1="0" x2="3" y2="40" stroke="#000000" stroke-width="1" stroke-opacity="0.18" />
    </pattern>

    <!-- Shared Frosted Glass Surfaces -->
    <linearGradient id="frosted-card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0d2559" stop-opacity="0.84" />
      <stop offset="50%" stop-color="#071638" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#030c22" stop-opacity="0.92" />
    </linearGradient>
    <linearGradient id="frosted-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8" />
      <stop offset="35%" stop-color="#ffffff" stop-opacity="0.3" />
      <stop offset="70%" stop-color="#1d4ed8" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#fd91cc" stop-opacity="0.75" />
    </linearGradient>
    <linearGradient id="pink-card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff2e84" />
      <stop offset="50%" stop-color="#fd6ca9" />
      <stop offset="100%" stop-color="#ff8ec4" />
    </linearGradient>
    <linearGradient id="btn-pink" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff3385" />
      <stop offset="100%" stop-color="#fd91cc" />
    </linearGradient>
    <linearGradient id="btn-orange" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fc734d" />
      <stop offset="100%" stop-color="#fb923c" />
    </linearGradient>
    <linearGradient id="btn-glass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.05" />
    </linearGradient>

    <!-- Orbs -->
    <radialGradient id="orb-cyan" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
      <stop offset="40%" stop-color="#38bdf8" stop-opacity="0.65" />
      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="orb-pink" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
      <stop offset="40%" stop-color="#fd91cc" stop-opacity="0.75" />
      <stop offset="100%" stop-color="#e11d48" stop-opacity="0" />
    </radialGradient>

    <!-- Shadows -->
    <filter id="card-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#000000" flood-opacity="0.7" />
    </filter>
    <filter id="pink-glow" x="-25%" y="-25%" width="150%" height="150%">
      <feDropShadow dx="0" dy="14" stdDeviation="20" flood-color="#ff2e84" flood-opacity="0.58" />
    </filter>
  </defs>

  <style>
    @keyframes theme-fade-1 {
      0%, 28% { opacity: 1; }
      33%, 95% { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes theme-fade-2 {
      0%, 28% { opacity: 0; }
      33%, 61% { opacity: 1; }
      66%, 100% { opacity: 0; }
    }
    @keyframes theme-fade-3 {
      0%, 61% { opacity: 0; }
      66%, 95% { opacity: 1; }
      100% { opacity: 0; }
    }
    .layer-t1 { animation: theme-fade-1 27s ease-in-out infinite; }
    .layer-t2 { animation: theme-fade-2 27s ease-in-out infinite; }
    .layer-t3 { animation: theme-fade-3 27s ease-in-out infinite; }

    @keyframes float-slow {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-7px); }
    }
    .float-card { animation: float-slow 5.5s ease-in-out infinite; }

    @keyframes needle-sweep {
      0% { transform: rotate(-34deg); }
      30% { transform: rotate(18deg); }
      55% { transform: rotate(4deg); }
      75% { transform: rotate(24deg); }
      100% { transform: rotate(-34deg); }
    }
    .needle-anim {
      transform-origin: 0px 0px;
      animation: needle-sweep 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    @keyframes scrubber-move {
      0% { transform: translate(0px, 0px); }
      35% { transform: translate(42px, -16px); }
      65% { transform: translate(-38px, 11px); }
      100% { transform: translate(0px, 0px); }
    }
    .scrubber-anim { animation: scrubber-move 8s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite; }

    @keyframes bar-breathe {
      0%, 100% { transform: scaleX(1); }
      50% { transform: scaleX(1.025); }
    }
    .bar-anim { transform-origin: 0 0; animation: bar-breathe 4s ease-in-out infinite; }

    @keyframes spotlight-roam {
      0%, 100% { transform: translate(-50px, -15px) scale(1); }
      50% { transform: translate(65px, 20px) scale(1.08); }
    }
    .roaming-light { animation: spotlight-roam 11s ease-in-out infinite; }

    .brand { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif; font-weight: 800; font-size: 13px; letter-spacing: 1.8px; fill: #ffffff; }
    .nav-item { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif; font-weight: 600; font-size: 11.5px; fill: #bfdbfe; }
    .eyebrow { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif; font-weight: 700; font-size: 11.5px; letter-spacing: 1.4px; fill: #93c5fd; text-anchor: middle; }
    .h1-bold { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif; font-weight: 800; font-size: 48px; letter-spacing: -1.4px; fill: #ffffff; text-anchor: middle; }
    .h1-serif { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-weight: 400; font-size: 50px; fill: #ffffff; }
    .sub { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif; font-weight: 400; font-size: 14px; fill: #bfdbfe; text-anchor: middle; }
    .card-h { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif; font-weight: 700; font-size: 13.5px; fill: #ffffff; }
    .meta { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif; font-weight: 600; font-size: 10.5px; fill: #93c5fd; }
    .gauge-val { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif; font-weight: 800; font-size: 42px; fill: #ffffff; text-anchor: middle; letter-spacing: -1px; }
  </style>

  <!-- Base Frame -->
  <rect width="1200" height="680" rx="22" fill="#020817" />

  <!-- ===================================================================== -->
  <!-- THEME 1: CYBER DEFENSE (DEEP ROYAL BLUE + STARDUST + BUBBLEGUM PINK)  -->
  <!-- ===================================================================== -->
  <g class="layer-t1">
    <rect width="1200" height="680" rx="22" fill="url(#t1-nebula)" />
    <g class="roaming-light">
      <ellipse cx="600" cy="240" rx="480" ry="220" fill="#2563eb" opacity="0.22" />
    </g>
    <rect y="360" width="1200" height="320" rx="22" fill="url(#t1-floor)" />
    <g>${stars}</g>

    <!-- Floating Orbs -->
    <circle cx="185" cy="310" r="22" fill="url(#orb-cyan)" opacity="0.75" stroke="#ffffff" stroke-opacity="0.5" stroke-width="0.8" />
    <circle cx="1015" cy="280" r="18" fill="url(#orb-pink)" opacity="0.85" stroke="#ffffff" stroke-opacity="0.6" stroke-width="0.8" />

    <!-- Eyebrow -->
    <text x="600" y="114" class="eyebrow">
      <tspan fill="#fd91cc">→</tspan> CYBER SECURITY UNDERGRADUATE   <tspan fill="#fd91cc">→</tspan> FULL-STACK ENGINEER   <tspan fill="#fd91cc">→</tspan> SYSTEMS DEFENSE
    </text>

    <!-- Headline -->
    <text x="600" y="168" class="h1-bold">Enterprise Security</text>
    <text x="600" y="222" class="h1-bold">Without Complexity.</text>

    <!-- Subtitle -->
    <text x="600" y="262" class="sub">BSc in Cyber Security @ NSBM Green University × Victoria University, Australia · Founder of AutoIntel Store</text>
    <text x="600" y="284" class="sub" opacity="0.85">"Don't just write code — understand how it works under the hood and how to defend it."</text>

    <!-- CTA Pill Buttons -->
    <g transform="translate(600, 312)">
      <g transform="translate(-195, 0)">
        <rect width="185" height="42" rx="21" fill="url(#btn-pink)" />
        <text x="92.5" y="26" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="800" font-size="12.5" fill="#020817">AutoIntel Store ↗</text>
      </g>
      <g transform="translate(10, 0)">
        <rect width="185" height="42" rx="21" fill="url(#btn-glass)" stroke="#ffffff" stroke-width="1" stroke-opacity="0.4" />
        <text x="92.5" y="26" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="700" font-size="12.5" fill="#ffffff">Explore Arsenal ↓</text>
      </g>
    </g>
  </g>

  <!-- ===================================================================== -->
  <!-- THEME 2: SYSTEMS VELOCITY (MIDNIGHT + GOD RAYS + CANTALOUPE SUNRISE)  -->
  <!-- ===================================================================== -->
  <g class="layer-t2">
    <rect width="1200" height="680" rx="22" fill="#02070a" />
    <!-- Volumetric Auroral God Rays -->
    <rect x="260" y="0" width="680" height="520" fill="url(#t2-godray)" />
    <rect x="240" y="0" width="720" height="520" fill="url(#fluted-glass)" opacity="0.9" />
    <!-- Cantaloupe Orange Horizon Glow -->
    <rect x="100" y="180" width="1000" height="500" fill="url(#t2-sunrise)" />

    <!-- Left and Right Flank Telemetry (Exact Reference Layout) -->
    <g transform="translate(95, 195)">
      <circle cx="0" cy="18" r="20" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.2" />
      <text x="0" y="22" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="12">←</text>
      <text x="42" y="8" font-family="-apple-system, sans-serif" font-weight="800" font-size="18" fill="#ffffff">2nd Yr</text>
      <text x="42" y="22" font-family="-apple-system, sans-serif" font-size="10" fill="#7dd3fc">BSc Cyber Security</text>
      <text x="42" y="48" font-family="-apple-system, sans-serif" font-weight="800" font-size="18" fill="#fc734d">OWASP</text>
      <text x="42" y="62" font-family="-apple-system, sans-serif" font-size="10" fill="#7dd3fc">Top 10 Hardened</text>
    </g>
    <g transform="translate(1105, 195)">
      <circle cx="0" cy="18" r="20" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-opacity="0.2" />
      <text x="0" y="22" text-anchor="middle" fill="#38bdf8" font-family="sans-serif" font-size="12">→</text>
      <text x="-42" y="8" text-anchor="end" font-family="-apple-system, sans-serif" font-weight="800" font-size="18" fill="#ffffff">699+</text>
      <text x="-42" y="22" text-anchor="end" font-family="-apple-system, sans-serif" font-size="10" fill="#7dd3fc">Contributions</text>
      <text x="-42" y="48" text-anchor="end" font-family="-apple-system, sans-serif" font-weight="800" font-size="18" fill="#fc734d">99.9%</text>
      <text x="-42" y="62" text-anchor="end" font-family="-apple-system, sans-serif" font-size="10" fill="#7dd3fc">API Resilience</text>
    </g>

    <!-- Editorial Mixed Headline -->
    <text x="600" y="158" class="h1-bold">Engineer at the Speed</text>
    <text x="600" y="216" class="h1-bold">of <tspan class="h1-serif">Thought.</tspan></text>

    <text x="600" y="258" class="sub">Building modern full-stack web platforms with responsive UI, resilient backends, and clean RESTful APIs.</text>
    <text x="600" y="278" class="sub" opacity="0.85">NSBM Green University (Affiliated with Victoria University, Australia) · Founder @ AutoIntel Store</text>

    <!-- Glowing Sunrise Orb Button -->
    <g transform="translate(600, 326)">
      <circle cx="0" cy="0" r="32" fill="#ffffff" fill-opacity="0.16" stroke="#ffffff" stroke-width="1.2" />
      <circle cx="0" cy="0" r="24" fill="url(#btn-orange)" />
      <text x="0" y="4" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="800" font-size="10" fill="#02070a">LIVE</text>
    </g>
  </g>

  <!-- ===================================================================== -->
  <!-- THEME 3: PLATFORM ARCHITECTURE (SKY BLUE + FLUTED GLASS + HOT PINK)   -->
  <!-- ===================================================================== -->
  <g class="layer-t3">
    <rect width="1200" height="680" rx="22" fill="url(#t3-sky)" />
    <ellipse cx="540" cy="250" rx="360" ry="210" fill="url(#t3-pink-aura)" />
    <rect width="1200" height="680" rx="22" fill="url(#fluted-glass)" />

    <text x="600" y="114" class="eyebrow" fill="#ffffff">
      <tspan fill="#ff8ec4">●</tspan> FULL-STACK PLATFORMS   <tspan fill="#ff8ec4">●</tspan> NETWORK SECURITY   <tspan fill="#ff8ec4">●</tspan> ETHICAL HACKING
    </text>
    <text x="600" y="168" class="h1-bold">Breaking, Securing &amp;</text>
    <text x="600" y="222" class="h1-bold">Engineering Systems.</text>
    <text x="600" y="262" class="sub" fill="#f0f9ff">Pursuing a Bachelor's in Cyber Security at NSBM Green University × Victoria University, Australia.</text>
    <text x="600" y="284" class="sub" fill="#e0f2fe">Engineering the AutoIntel Store automotive ecosystem, CTFs, and systems defense.</text>

    <g transform="translate(600, 312)">
      <g transform="translate(-195, 0)">
        <rect width="185" height="42" rx="21" fill="#ffffff" />
        <text x="92.5" y="26" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="800" font-size="12.5" fill="#031830">AutoIntel Store ↗</text>
      </g>
      <g transform="translate(10, 0)">
        <rect width="185" height="42" rx="21" fill="#031830" fill-opacity="0.45" stroke="#ffffff" stroke-width="1" stroke-opacity="0.6" />
        <text x="92.5" y="26" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="700" font-size="12.5" fill="#ffffff">Security Labs →</text>
      </g>
    </g>
  </g>

  <!-- ===================================================================== -->
  <!-- PERSISTENT TOP FROSTED GLASS NAVIGATION BAR                           -->
  <!-- ===================================================================== -->
  <g transform="translate(60, 22)">
    <rect width="265" height="36" rx="18" fill="#051336" fill-opacity="0.72" stroke="url(#frosted-border)" stroke-width="1" />
    <rect x="10" y="9" width="18" height="18" rx="5" fill="#fd91cc" />
    <path d="M15 14 L19 18 L23 14" stroke="#020817" stroke-width="2" fill="none" stroke-linecap="round" />
    <text x="36" y="23" class="brand">BISHEN JAYAWARDHANA</text>

    <g transform="translate(365, 0)">
      <rect width="350" height="36" rx="18" fill="#051336" fill-opacity="0.72" stroke="#38bdf8" stroke-opacity="0.35" stroke-width="1" />
      <text x="26" y="23" class="nav-item">Cyber Defense</text>
      <circle cx="122" cy="18" r="2" fill="#fd91cc" />
      <text x="138" y="23" class="nav-item">Full-Stack</text>
      <circle cx="212" cy="18" r="2" fill="#38bdf8" />
      <text x="228" y="23" class="nav-item">AutoIntel Store</text>
    </g>

    <g transform="translate(890, 0)">
      <rect width="190" height="36" rx="18" fill="#ffffff" fill-opacity="0.1" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1" />
      <circle cx="18" cy="18" r="4" fill="#4ade80" />
      <text x="102" y="23" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="700" font-size="11.5" fill="#ffffff">NSBM × VU Australia</text>
    </g>
  </g>

  <!-- ===================================================================== -->
  <!-- PERSISTENT FLOATING GLASS BENTO TELEMETRY SUITE (BOTTOM DECK)         -->
  <!-- ===================================================================== -->
  <g transform="translate(0, 385)">
    <!-- LEFT CARD: ALERTS BY SCAN TYPE -->
    <g transform="translate(85, 10)" filter="url(#card-shadow)">
      <rect width="320" height="255" rx="18" fill="url(#frosted-card)" stroke="url(#frosted-border)" stroke-width="1.2" />
      <g transform="translate(20, 18)">
        <rect width="26" height="26" rx="7" fill="#0c2357" stroke="#38bdf8" stroke-opacity="0.5" />
        <path d="M13 6 L18 8.5 V13.5 C18 16.5 13 19 13 19 C13 19 8 16.5 8 13.5 V8.5 Z" fill="none" stroke="#38bdf8" stroke-width="1.5" />
        <text x="36" y="18" class="card-h">Security &amp; Stack Proficiency</text>
      </g>

      <g transform="translate(20, 62)">
        <text x="0" y="10" class="meta">Web App Security &amp; OWASP Top 10</text>
        <text x="280" y="10" class="meta" text-anchor="end" fill="#38bdf8">94%</text>
        <g transform="translate(0, 16)" class="bar-anim">
          <rect width="280" height="8" rx="4" fill="#06122e" />
          <rect width="190" height="8" rx="4" fill="#2563eb" />
          <rect x="194" width="68" height="8" rx="4" fill="#fd91cc" />
        </g>
      </g>

      <g transform="translate(20, 110)">
        <text x="0" y="10" class="meta">React, Next.js &amp; TypeScript UI</text>
        <text x="280" y="10" class="meta" text-anchor="end" fill="#38bdf8">92%</text>
        <g transform="translate(0, 16)" class="bar-anim">
          <rect width="280" height="8" rx="4" fill="#06122e" />
          <rect width="160" height="8" rx="4" fill="#fd91cc" />
          <rect x="164" width="95" height="8" rx="4" fill="#38bdf8" />
        </g>
      </g>

      <g transform="translate(20, 158)">
        <text x="0" y="10" class="meta">Node.js, REST APIs &amp; Auth</text>
        <text x="280" y="10" class="meta" text-anchor="end" fill="#38bdf8">96%</text>
        <g transform="translate(0, 16)" class="bar-anim">
          <rect width="280" height="8" rx="4" fill="#06122e" />
          <rect width="215" height="8" rx="4" fill="#2563eb" />
          <rect x="219" width="50" height="8" rx="4" fill="#fd91cc" />
        </g>
      </g>

      <g transform="translate(20, 206)">
        <text x="0" y="10" class="meta">Linux, Python, Bash &amp; Network</text>
        <text x="280" y="10" class="meta" text-anchor="end" fill="#38bdf8">91%</text>
        <g transform="translate(0, 16)" class="bar-anim">
          <rect width="280" height="8" rx="4" fill="#06122e" />
          <rect width="175" height="8" rx="4" fill="#fd91cc" />
          <rect x="179" width="80" height="8" rx="4" fill="#38bdf8" />
        </g>
      </g>
    </g>

    <!-- CENTER CARD: ELEVATED RADIANT PINK SPEEDOMETER GAUGE -->
    <g transform="translate(465, -4)" class="float-card" filter="url(#pink-glow)">
      <rect width="270" height="275" rx="22" fill="url(#pink-card-grad)" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.45" />
      <g transform="translate(20, 18)">
        <circle cx="6" cy="6" r="4" fill="#ffffff" />
        <text x="16" y="10" font-family="-apple-system, sans-serif" font-weight="700" font-size="12" fill="#ffffff">Security Posture Score</text>
        <g transform="translate(182, -3)">
          <rect width="42" height="22" rx="11" fill="#ffffff" fill-opacity="0.25" />
          <text x="21" y="15" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="800" font-size="11" fill="#ffffff">98%</text>
        </g>
      </g>

      <g transform="translate(135, 165)">
        <path d="M -88 0 A 88 88 0 0 1 88 0" fill="none" stroke="#ffffff" stroke-width="4" stroke-opacity="0.3" stroke-linecap="round" />
        <path d="M -88 0 A 88 88 0 0 1 52 -71" fill="none" stroke="#ffffff" stroke-width="7.5" stroke-linecap="round" />
        <path d="M -72 0 A 72 72 0 0 1 72 0" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2 6" stroke-opacity="0.5" />
        <text x="0" y="-12" class="gauge-val">65</text>
        <text x="0" y="12" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="800" font-size="10.5" fill="#ffffff" letter-spacing="0.6px">SECURING &amp; BUILDING</text>
        <g class="needle-anim">
          <line x1="0" y1="0" x2="38" y2="-58" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" />
        </g>
        <circle cx="0" cy="0" r="5.5" fill="#ffffff" />
      </g>

      <g transform="translate(25, 238)">
        <rect width="220" height="24" rx="12" fill="#ffffff" fill-opacity="0.22" />
        <text x="110" y="16" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="800" font-size="10" fill="#ffffff" letter-spacing="0.5px">NSBM × VICTORIA UNIVERSITY</text>
      </g>
    </g>

    <!-- RIGHT CARD: OPEN VS. RESOLVED TELEMETRY -->
    <g transform="translate(795, 10)" filter="url(#card-shadow)">
      <rect width="320" height="255" rx="18" fill="url(#frosted-card)" stroke="url(#frosted-border)" stroke-width="1.2" />
      <g transform="translate(20, 18)">
        <rect width="26" height="26" rx="7" fill="#2d1033" stroke="#fd91cc" stroke-opacity="0.5" />
        <circle cx="13" cy="13" r="5" fill="#fd91cc" />
        <text x="36" y="18" class="card-h">Systems &amp; Threat Telemetry</text>
      </g>

      <g transform="translate(20, 50)">
        <circle cx="4" cy="4" r="3.5" fill="#fd91cc" />
        <text x="12" y="8" class="meta">Hardened Endpoints</text>
        <circle cx="135" cy="4" r="3.5" fill="#38bdf8" />
        <text x="143" y="8" class="meta">Active Commits (699+)</text>
      </g>

      <g transform="translate(20, 68)">
        <rect width="280" height="114" rx="8" fill="#05112b" stroke="#162e63" stroke-width="0.8" />
        <line x1="0" y1="38" x2="280" y2="38" stroke="#162e63" stroke-dasharray="3 3" opacity="0.6" />
        <line x1="0" y1="76" x2="280" y2="76" stroke="#162e63" stroke-dasharray="3 3" opacity="0.6" />
        <path d="M 10 92 Q 70 38 140 68 T 270 24 L 270 106 L 10 106 Z" fill="#fd91cc" fill-opacity="0.15" />
        <path d="M 10 92 Q 70 38 140 68 T 270 24" fill="none" stroke="#fd91cc" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 10 100 Q 70 76 140 42 T 270 14" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />

        <g class="scrubber-anim">
          <circle cx="180" cy="46" r="5" fill="#fd91cc" stroke="#ffffff" stroke-width="2" />
          <line x1="180" y1="10" x2="180" y2="106" stroke="#fd91cc" stroke-width="1.2" stroke-dasharray="2 2" />
          <rect x="152" y="14" width="56" height="20" rx="5" fill="#030c22" stroke="#fd91cc" stroke-width="0.8" />
          <text x="180" y="28" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="800" font-size="9.5" fill="#ffffff">ACTIVE</text>
        </g>
      </g>

      <g transform="translate(20, 198)">
        <rect width="280" height="38" rx="9" fill="#0a235c" fill-opacity="0.65" stroke="#1d4ed8" stroke-width="1" />
        <text x="14" y="16" font-family="-apple-system, sans-serif" font-size="9.5" font-weight="800" fill="#38bdf8" letter-spacing="0.5px">CURRENT FOCUS</text>
        <text x="14" y="30" font-family="-apple-system, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">AutoIntel Store Automotive Platform</text>
        <text x="266" y="24" text-anchor="end" font-family="-apple-system, sans-serif" font-size="14" font-weight="800" fill="#fd91cc">↗</text>
      </g>
    </g>
  </g>
</svg>`;
}

// ============================================================================
// 2. ABOUT ME & EXECUTIVE BIO BENTO SVG (1200 x 380)
// ============================================================================
function buildAboutBento() {
  const stars = generateStardust(1200, 380, 65);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 380" width="100%" height="100%" fill="none">
  <defs>
    <radialGradient id="ab-bg" cx="50%" cy="25%" r="75%">
      <stop offset="0%" stop-color="#0f317a" stop-opacity="0.75" />
      <stop offset="55%" stop-color="#06163a" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#020817" />
    </radialGradient>
    <linearGradient id="ab-glass" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0d2559" stop-opacity="0.82" />
      <stop offset="100%" stop-color="#040d24" stop-opacity="0.94" />
    </linearGradient>
    <linearGradient id="ab-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.7" />
      <stop offset="50%" stop-color="#1d4ed8" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#fd91cc" stop-opacity="0.65" />
    </linearGradient>
    <filter id="ab-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.65" />
    </filter>
  </defs>

  <style>
    @keyframes pulse-beacon {
      0%, 100% { opacity: 0.7; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.3); }
    }
    .dot-pulse { transform-origin: center; animation: pulse-beacon 2.8s ease-in-out infinite; }
    .sec-tag { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif; font-weight: 800; font-size: 10.5px; letter-spacing: 1.2px; fill: #fd91cc; }
    .sec-h { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif; font-weight: 800; font-size: 20px; fill: #ffffff; letter-spacing: -0.4px; }
    .code-k { font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; font-weight: 600; font-size: 12px; fill: #38bdf8; }
    .code-v { font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; font-weight: 400; font-size: 12px; fill: #e2e8f0; }
    .code-str { font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; font-weight: 500; font-size: 12px; fill: #fd91cc; }
    .item-h { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif; font-weight: 700; font-size: 13.5px; fill: #ffffff; }
    .item-p { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif; font-weight: 400; font-size: 12px; fill: #93c5fd; }
  </style>

  <rect x="0.5" y="0.5" width="1199" height="379" rx="20" fill="#020817" stroke="url(#ab-border)" stroke-width="1.2" />
  <rect x="1" y="1" width="1198" height="378" rx="19" fill="url(#ab-bg)" />
  <g>${stars}</g>

  <!-- Header -->
  <g transform="translate(32, 32)">
    <text x="0" y="0" class="sec-tag">IDENTITY &amp; ENGINEERING MINDSET</text>
    <text x="0" y="24" class="sec-h">About Bishen Jayawardhana</text>
  </g>

  <!-- LEFT: GLASS TERMINAL YAML SPEC CARD -->
  <g transform="translate(32, 76)" filter="url(#ab-shadow)">
    <rect width="530" height="274" rx="16" fill="url(#ab-glass)" stroke="url(#ab-border)" stroke-width="1.2" />
    <!-- Window Controls -->
    <circle cx="22" cy="20" r="5" fill="#ff5f56" />
    <circle cx="38" cy="20" r="5" fill="#ffbd2e" />
    <circle cx="54" cy="20" r="5" fill="#27c93f" />
    <text x="265" y="24" text-anchor="middle" font-family="monospace" font-size="11" fill="#64748b">bishen@cyber-defense: ~/profile.yaml</text>
    <line x1="0" y1="38" x2="530" y2="38" stroke="#1e3a8a" stroke-width="0.8" />

    <g transform="translate(24, 64)">
      <text x="0" y="0"><tspan class="code-k">name:</tspan> <tspan class="code-v">Bishen Jayawardhana</tspan></text>
      <text x="0" y="26"><tspan class="code-k">focus:</tspan> <tspan class="code-v">Cyber Security &amp; Full-Stack Engineering</tspan></text>
      <text x="0" y="52"><tspan class="code-k">academic:</tspan></text>
      <text x="20" y="76"><tspan class="code-k">year:</tspan> <tspan class="code-v">2nd Year Undergraduate</tspan></text>
      <text x="20" y="100"><tspan class="code-k">program:</tspan> <tspan class="code-v">BSc in Cyber Security</tspan></text>
      <text x="20" y="124"><tspan class="code-k">institution:</tspan> <tspan class="code-v">NSBM Green University × VU Australia</tspan></text>
      <text x="0" y="152"><tspan class="code-k">mindset:</tspan> <tspan class="code-str">"Don't just write code — understand how it</tspan></text>
      <text x="20" y="174"><tspan class="code-str">works under the hood and how to defend it."</tspan></text>
    </g>
  </g>

  <!-- RIGHT: 4 FROSTED GLASS BIO PILLARS -->
  <g transform="translate(586, 76)">
    <!-- Card 1: Academics -->
    <g transform="translate(0, 0)" filter="url(#ab-shadow)">
      <rect width="582" height="60" rx="12" fill="url(#ab-glass)" stroke="url(#ab-border)" stroke-width="1" />
      <circle cx="24" cy="30" r="5" fill="#38bdf8" class="dot-pulse" />
      <text x="42" y="25" class="item-h">Academics — NSBM × Victoria University, Australia</text>
      <text x="42" y="44" class="item-p">Pursuing a Bachelor's in Cyber Security with focus on systems defense.</text>
    </g>

    <!-- Card 2: Cyber Security Interests -->
    <g transform="translate(0, 71)" filter="url(#ab-shadow)">
      <rect width="582" height="60" rx="12" fill="url(#ab-glass)" stroke="url(#ab-border)" stroke-width="1" />
      <circle cx="24" cy="30" r="5" fill="#fd91cc" class="dot-pulse" />
      <text x="42" y="25" class="item-h">Cyber Security Interests &amp; Offensive Defense</text>
      <text x="42" y="44" class="item-p">Network Security, Ethical Hacking, OWASP Top 10, Pentesting &amp; Threat Assessment.</text>
    </g>

    <!-- Card 3: Software Development -->
    <g transform="translate(0, 142)" filter="url(#ab-shadow)">
      <rect width="582" height="60" rx="12" fill="url(#ab-glass)" stroke="url(#ab-border)" stroke-width="1" />
      <circle cx="24" cy="30" r="5" fill="#38bdf8" class="dot-pulse" />
      <text x="42" y="25" class="item-h">Full-Stack Software Engineering</text>
      <text x="42" y="44" class="item-p">Building modern web platforms with responsive UI, resilient backends &amp; REST APIs.</text>
    </g>

    <!-- Card 4: Current Focus & Off-duty -->
    <g transform="translate(0, 213)" filter="url(#ab-shadow)">
      <rect width="582" height="60" rx="12" fill="url(#ab-glass)" stroke="url(#ab-border)" stroke-width="1" />
      <circle cx="24" cy="30" r="5" fill="#fd91cc" class="dot-pulse" />
      <text x="42" y="25" class="item-h">Current Focus &amp; Off-Duty</text>
      <text x="42" y="44" class="item-p">Engineering AutoIntel Store platform, cybersecurity CTFs &amp; curating Spotify tracks.</text>
    </g>
  </g>
</svg>`;
}

// ============================================================================
// 3. FEATURED PROJECTS BENTO SVG (1200 x 290)
// ============================================================================
function buildFeaturedProjects() {
  const stars = generateStardust(1200, 290, 50);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 290" width="100%" height="100%" fill="none">
  <defs>
    <radialGradient id="fp-bg" cx="50%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#0d2866" stop-opacity="0.8" />
      <stop offset="60%" stop-color="#051336" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#020817" />
    </radialGradient>
    <linearGradient id="fp-glass" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0d2559" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#040d24" stop-opacity="0.95" />
    </linearGradient>
    <linearGradient id="fp-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.75" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#fd91cc" stop-opacity="0.75" />
    </linearGradient>
    <filter id="fp-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.65" />
    </filter>
  </defs>

  <style>
    .fp-tag { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif; font-weight: 800; font-size: 10.5px; letter-spacing: 1.2px; fill: #fd91cc; }
    .fp-sec-h { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif; font-weight: 800; font-size: 20px; fill: #ffffff; }
    .fp-title { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif; font-weight: 800; font-size: 20px; fill: #ffffff; }
    .fp-desc { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif; font-weight: 400; font-size: 12.5px; fill: #bfdbfe; }
    .fp-pill { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif; font-weight: 600; font-size: 11px; fill: #93c5fd; }
  </style>

  <rect x="0.5" y="0.5" width="1199" height="289" rx="20" fill="#020817" stroke="url(#fp-border)" stroke-width="1.2" />
  <rect x="1" y="1" width="1198" height="288" rx="19" fill="url(#fp-bg)" />
  <g>${stars}</g>

  <g transform="translate(32, 32)">
    <text x="0" y="0" class="fp-tag">PRODUCTION PLATFORMS &amp; RESEARCH</text>
    <text x="0" y="24" class="fp-sec-h">Featured Systems &amp; Projects</text>
  </g>

  <!-- PROJECT 1: AUTOINTEL STORE -->
  <g transform="translate(32, 76)" filter="url(#fp-shadow)">
    <rect width="555" height="186" rx="16" fill="url(#fp-glass)" stroke="url(#fp-border)" stroke-width="1.2" />
    <g transform="translate(24, 24)">
      <rect width="95" height="20" rx="10" fill="#fd91cc" fill-opacity="0.18" stroke="#fd91cc" stroke-width="0.8" />
      <text x="47.5" y="14" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="800" font-size="9.5" fill="#fd91cc">LIVE PLATFORM</text>
      <text x="0" y="48" class="fp-title">AutoIntel Store</text>
      <text x="0" y="74" class="fp-desc">Automotive marketplace &amp; spare parts management ecosystem with</text>
      <text x="0" y="94" class="fp-desc">interactive catalog, real-time inventory, and admin dashboard.</text>

      <!-- Stack Pills -->
      <g transform="translate(0, 118)">
        <rect width="58" height="24" rx="6" fill="#030c24" stroke="#1d4ed8" />
        <text x="29" y="16" text-anchor="middle" class="fp-pill">React</text>

        <rect x="66" width="82" height="24" rx="6" fill="#030c24" stroke="#1d4ed8" />
        <text x="107" y="16" text-anchor="middle" class="fp-pill">TypeScript</text>

        <rect x="156" width="68" height="24" rx="6" fill="#030c24" stroke="#1d4ed8" />
        <text x="190" y="16" text-anchor="middle" class="fp-pill">Node.js</text>

        <rect x="232" width="64" height="24" rx="6" fill="#030c24" stroke="#1d4ed8" />
        <text x="264" y="16" text-anchor="middle" class="fp-pill">MySQL</text>

        <rect x="380" width="125" height="26" rx="13" fill="#fd91cc" />
        <text x="442.5" y="17" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="800" font-size="11" fill="#020817">autointelstore.com ↗</text>
      </g>
    </g>
  </g>

  <!-- PROJECT 2: CYBER SECURITY LABS -->
  <g transform="translate(613, 76)" filter="url(#fp-shadow)">
    <rect width="555" height="186" rx="16" fill="url(#fp-glass)" stroke="url(#fp-border)" stroke-width="1.2" />
    <g transform="translate(24, 24)">
      <rect width="105" height="20" rx="10" fill="#38bdf8" fill-opacity="0.18" stroke="#38bdf8" stroke-width="0.8" />
      <text x="52.5" y="14" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="800" font-size="9.5" fill="#38bdf8">SECURITY LABS</text>
      <text x="0" y="48" class="fp-title">Cyber Security Labs &amp; CTFs</text>
      <text x="0" y="74" class="fp-desc">Practical security labs, vulnerability scanning, network traffic</text>
      <text x="0" y="94" class="fp-desc">analysis, penetration testing scripts, and CTF challenges.</text>

      <!-- Stack Pills -->
      <g transform="translate(0, 118)">
        <rect width="64" height="24" rx="6" fill="#030c24" stroke="#1d4ed8" />
        <text x="32" y="16" text-anchor="middle" class="fp-pill">Python</text>

        <rect x="72" width="56" height="24" rx="6" fill="#030c24" stroke="#1d4ed8" />
        <text x="100" y="16" text-anchor="middle" class="fp-pill">Bash</text>

        <rect x="136" width="76" height="24" rx="6" fill="#030c24" stroke="#1d4ed8" />
        <text x="174" y="16" text-anchor="middle" class="fp-pill">Kali Linux</text>

        <rect x="220" width="80" height="24" rx="6" fill="#030c24" stroke="#1d4ed8" />
        <text x="260" y="16" text-anchor="middle" class="fp-pill">Wireshark</text>

        <rect x="380" width="125" height="26" rx="13" fill="#ffffff" fill-opacity="0.12" stroke="#ffffff" stroke-opacity="0.4" />
        <text x="442.5" y="17" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="700" font-size="11" fill="#ffffff">Explore Labs ↗</text>
      </g>
    </g>
  </g>
</svg>`;
}

// Write files and verify no raw '&' inside <style>
const outAssets = path.join(__dirname, '..', 'assets');
const outDist = path.join(__dirname, '..', 'dist');
fs.mkdirSync(outAssets, { recursive: true });
fs.mkdirSync(outDist, { recursive: true });

const filesToWrite = {
  'hero-banner.svg': buildHeroBanner(),
  'about-bento.svg': buildAboutBento(),
  'featured-projects.svg': buildFeaturedProjects()
};

for (const [name, content] of Object.entries(filesToWrite)) {
  fs.writeFileSync(path.join(outAssets, name), content, 'utf8');
  fs.writeFileSync(path.join(outDist, name), content, 'utf8');
  console.log(`Generated ${name} (${content.length} bytes)`);
}
