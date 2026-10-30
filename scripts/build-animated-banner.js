const fs = require('fs');
const path = require('path');

// Helper to generate stardust coordinates for SOLIX constellation arc
function generateSolixStars() {
  const stars = [];
  // Twin celestial arches
  for (let i = 0; i < 90; i++) {
    const angle = (i / 90) * Math.PI;
    const r1 = 300 + (Math.sin(i * 11) * 45);
    const cx1 = 425 + Math.cos(angle) * r1;
    const cy1 = 340 - Math.sin(angle) * (r1 * 0.65);
    const size = 0.8 + (Math.sin(i * 7) + 1) * 0.8;
    const op = 0.35 + (Math.cos(i * 5) + 1) * 0.3;
    const color = i % 7 === 0 ? '#fd91cc' : (i % 3 === 0 ? '#93c5fd' : '#ffffff');
    stars.push(`<circle cx="${cx1.toFixed(1)}" cy="${cy1.toFixed(1)}" r="${size.toFixed(1)}" fill="${color}" opacity="${op.toFixed(2)}" />`);
  }
  // Ambient star cluster
  for (let j = 0; j < 60; j++) {
    const rx = 50 + (j * 13.5) % 750;
    const ry = 40 + (j * 17.3) % 240;
    const s = 0.6 + (j % 3) * 0.5;
    const o = 0.25 + (j % 5) * 0.15;
    stars.push(`<circle cx="${rx.toFixed(1)}" cy="${ry.toFixed(1)}" r="${s.toFixed(1)}" fill="#ffffff" opacity="${o.toFixed(2)}" />`);
  }
  return stars.join('\n      ');
}

function buildHeroBannerSvg() {
  const solixStars = generateSolixStars();

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 430" width="850" height="430" fill="none">
  <defs>
    <!-- ==================== SOLIX DEFS ==================== -->
    <radialGradient id="solix-bg-glow" cx="50%" cy="38%" r="65%">
      <stop offset="0%" stop-color="#144fe6" stop-opacity="0.9" />
      <stop offset="45%" stop-color="#09318d" stop-opacity="0.8" />
      <stop offset="85%" stop-color="#041133" />
      <stop offset="100%" stop-color="#02081c" />
    </radialGradient>
    <radialGradient id="solix-floor-glow" cx="50%" cy="100%" r="55%">
      <stop offset="0%" stop-color="#e0f2fe" stop-opacity="0.32" />
      <stop offset="60%" stop-color="#38bdf8" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#09318d" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="solix-orb-pink" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fd91cc" stop-opacity="0.8" />
      <stop offset="70%" stop-color="#f43f5e" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#fd91cc" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="solix-orb-blue" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="40%" stop-color="#60a5fa" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0" />
    </radialGradient>

    <!-- ==================== FLUXEDIT DEFS ==================== -->
    <linearGradient id="flux-aurora-ray1" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#0297de" stop-opacity="0.65" />
      <stop offset="45%" stop-color="#0369a1" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#02070a" stop-opacity="0" />
    </linearGradient>
    <linearGradient id="flux-aurora-ray2" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.5" />
      <stop offset="60%" stop-color="#0284c7" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#02070a" stop-opacity="0" />
    </linearGradient>
    <radialGradient id="flux-orange-horizon" cx="50%" cy="92%" r="50%">
      <stop offset="0%" stop-color="#fff4ed" stop-opacity="0.95" />
      <stop offset="18%" stop-color="#fed7aa" stop-opacity="0.85" />
      <stop offset="40%" stop-color="#fc734d" stop-opacity="0.8" />
      <stop offset="70%" stop-color="#c2410c" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#02070a" stop-opacity="0" />
    </radialGradient>

    <!-- ==================== PELMATECH DEFS ==================== -->
    <linearGradient id="pelma-sky-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0593c6" />
      <stop offset="100%" stop-color="#026aa2" />
    </linearGradient>
    <radialGradient id="pelma-pink-streak" cx="42%" cy="55%" r="48%">
      <stop offset="0%" stop-color="#d83995" stop-opacity="0.95" />
      <stop offset="30%" stop-color="#ec4899" stop-opacity="0.75" />
      <stop offset="65%" stop-color="#fb923c" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#0593c6" stop-opacity="0" />
    </radialGradient>
    <pattern id="pelma-vertical-lines" width="4" height="40" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="40" stroke="#ffffff" stroke-width="0.7" stroke-opacity="0.12" />
    </pattern>

    <filter id="soft-blur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="18" />
    </filter>
  </defs>

  <style>
    /* Continuous 24-second Tri-Theme Carousel Animation */
    @keyframes cycle-theme-solix {
      0%, 28% { opacity: 1; visibility: visible; }
      33%, 95% { opacity: 0; visibility: hidden; }
      100% { opacity: 1; visibility: visible; }
    }
    @keyframes cycle-theme-fluxedit {
      0%, 28% { opacity: 0; visibility: hidden; }
      33%, 61% { opacity: 1; visibility: visible; }
      66%, 100% { opacity: 0; visibility: hidden; }
    }
    @keyframes cycle-theme-pelmatech {
      0%, 61% { opacity: 0; visibility: hidden; }
      66%, 95% { opacity: 1; visibility: visible; }
      100% { opacity: 0; visibility: hidden; }
    }

    .theme-layer-solix {
      animation: cycle-theme-solix 24s ease-in-out infinite;
    }
    .theme-layer-fluxedit {
      animation: cycle-theme-fluxedit 24s ease-in-out infinite;
    }
    .theme-layer-pelmatech {
      animation: cycle-theme-pelmatech 24s ease-in-out infinite;
    }

    /* Common Typography */
    .brand-text {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
      font-weight: 800;
      font-size: 14px;
      letter-spacing: 2px;
      fill: #ffffff;
    }
    .nav-pill-text {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
      font-weight: 500;
      font-size: 11.5px;
    }
    .solix-h1 {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
      font-weight: 800;
      font-size: 44px;
      letter-spacing: -1.2px;
      fill: #ffffff;
      text-anchor: middle;
    }
    .flux-h1-italic {
      font-family: Georgia, 'Playfair Display', 'Times New Roman', serif;
      font-style: italic;
      font-weight: 400;
      font-size: 46px;
      letter-spacing: 0px;
      fill: #ffffff;
    }
    .flux-h1-clean {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
      font-weight: 700;
      font-size: 44px;
      letter-spacing: -1px;
      fill: #ffffff;
    }
  </style>

  <!-- ========================================================================= -->
  <!-- THEME 1: SOLIX (DEEP BLUE + STARDUST CONSTELLATION + BUBBLEGUM PINK)      -->
  <!-- ========================================================================= -->
  <g class="theme-layer-solix">
    <!-- Solix Deep Blue Background -->
    <rect x="0" y="0" width="850" height="430" rx="20" fill="#030c24" />
    <rect x="0" y="0" width="850" height="430" rx="20" fill="url(#solix-bg-glow)" />

    <!-- Stardust Constellation Canopy -->
    <g>
      ${solixStars}
    </g>

    <!-- Bottom Soft Floor Illumination -->
    <rect x="0" y="180" width="850" height="250" fill="url(#solix-floor-glow)" opacity="0.8" />

    <!-- Ambient Glowing Orbs (Exact Solix Screenshot) -->
    <!-- Left Orb: Soft Cyan Orb -->
    <circle cx="210" cy="300" r="18" fill="url(#solix-orb-blue)" opacity="0.6" />
    <circle cx="210" cy="300" r="18" stroke="#ffffff" stroke-width="0.8" stroke-opacity="0.6" fill="none" />

    <!-- Right Orb: Hot Pink Orb -->
    <circle cx="600" cy="270" r="15" fill="url(#solix-orb-pink)" opacity="0.8" />
    <circle cx="600" cy="270" r="15" stroke="#ffffff" stroke-width="0.8" stroke-opacity="0.8" fill="none" />

    <!-- Top Nav Header -->
    <g transform="translate(40, 26)">
      <rect x="0" y="3" width="16" height="16" rx="4" fill="#fd91cc" />
      <path d="M4 8 L8 4 L12 8 L8 12 Z" fill="#030c24" />
      <text x="24" y="16" class="brand-text">BISHEN // SOLIX</text>

      <!-- Center Capsule Nav -->
      <g transform="translate(230, 0)">
        <rect width="280" height="28" rx="14" fill="#082357" fill-opacity="0.75" stroke="#1d4ed8" stroke-width="0.8" />
        <text x="20" y="18" class="nav-pill-text" fill="#93c5fd">Threat Intel</text>
        <circle cx="95" cy="14" r="1.5" fill="#3b82f6" />
        <text x="108" y="18" class="nav-pill-text" fill="#93c5fd">Architecture</text>
        <circle cx="185" cy="14" r="1.5" fill="#3b82f6" />
        <text x="198" y="18" class="nav-pill-text" fill="#93c5fd">AutoIntel</text>
      </g>

      <!-- Right Action Pill -->
      <g transform="translate(630, 0)">
        <rect width="140" height="28" rx="14" fill="#ffffff" fill-opacity="0.1" stroke="#ffffff" stroke-width="0.8" stroke-opacity="0.3" />
        <text x="70" y="18" font-family="-apple-system, sans-serif" font-weight="600" font-size="11.5" fill="#ffffff" text-anchor="middle">VU Australia ↗</text>
      </g>
    </g>

    <!-- Eyebrow with arrow breadcrumbs -->
    <text x="425" y="125" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="600" font-size="11" letter-spacing="1.2px" fill="#93c5fd">
      <tspan fill="#fd91cc">→</tspan> Threat Intelligence   <tspan fill="#fd91cc">→</tspan> Security Operations   <tspan fill="#fd91cc">→</tspan> Resilient Systems
    </text>

    <!-- Display Headline -->
    <text x="425" y="176" class="solix-h1">Enterprise Security</text>
    <text x="425" y="226" class="solix-h1">Without Complexity.</text>

    <!-- Subtitle -->
    <text x="425" y="268" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="13.5" fill="#bfdbfe">
      Undergraduate at NSBM × Victoria University. Engineering hardened full-stack systems,
    </text>
    <text x="425" y="288" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="13.5" fill="#bfdbfe">
      mitigating critical attack surfaces, and developing the AutoIntel Store platform.
    </text>

    <!-- Buttons -->
    <g transform="translate(425, 335)">
      <g transform="translate(-175, 0)">
        <rect width="165" height="42" rx="21" fill="#fd91cc" />
        <text x="82.5" y="26" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="700" font-size="12.5" fill="#030c24">AutoIntel Store ↗</text>
      </g>
      <g transform="translate(10, 0)">
        <rect width="165" height="42" rx="21" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-width="1" stroke-opacity="0.3" />
        <text x="82.5" y="26" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="600" font-size="12.5" fill="#ffffff">Get in Touch ↓</text>
      </g>
    </g>
  </g>

  <!-- ========================================================================= -->
  <!-- THEME 2: FLUXEDIT (MIDNIGHT + ELECTRIC BLUE AURORA + CANTALOUPE SUNRISE)  -->
  <!-- ========================================================================= -->
  <g class="theme-layer-fluxedit">
    <!-- Pitch Midnight Canvas -->
    <rect x="0" y="0" width="850" height="430" rx="20" fill="#02070a" />

    <!-- Vertical Electric Blue Auroral Beams -->
    <rect x="180" y="40" width="140" height="280" fill="url(#flux-aurora-ray1)" filter="url(#soft-blur)" />
    <rect x="360" y="20" width="130" height="300" fill="url(#flux-aurora-ray2)" filter="url(#soft-blur)" />
    <rect x="520" y="40" width="150" height="280" fill="url(#flux-aurora-ray1)" filter="url(#soft-blur)" />

    <!-- Starfield Speckles -->
    <g opacity="0.65">
      <circle cx="120" cy="80" r="1" fill="#ffffff" />
      <circle cx="280" cy="65" r="1.3" fill="#ffffff" />
      <circle cx="430" cy="45" r="1.5" fill="#fc734d" />
      <circle cx="580" cy="75" r="1.2" fill="#ffffff" />
      <circle cx="720" cy="90" r="1" fill="#ffffff" />
    </g>

    <!-- Lower Cantaloupe Orange Horizon Dome -->
    <rect x="100" y="160" width="650" height="270" fill="url(#flux-orange-horizon)" />

    <!-- Top Nav Header -->
    <g transform="translate(40, 26)">
      <path d="M0 4 H4 V16 H0 Z M6 0 H10 V20 H6 Z M12 6 H16 V14 H12 Z" fill="#0297de" />
      <text x="24" y="16" class="brand-text">BISHEN // FLUXEDIT</text>

      <g transform="translate(630, 0)">
        <rect width="140" height="28" rx="14" fill="#fc734d" />
        <text x="70" y="18" font-family="-apple-system, sans-serif" font-weight="700" font-size="11.5" fill="#02070a" text-anchor="middle">Get Started Free</text>
      </g>
    </g>

    <!-- Left / Right Stats on Flanks (FluxEdit Screenshot) -->
    <g transform="translate(70, 180)">
      <text x="0" y="0" font-family="-apple-system, sans-serif" font-weight="700" font-size="16" fill="#ffffff">3x</text>
      <text x="0" y="16" font-family="-apple-system, sans-serif" font-weight="400" font-size="10.5" fill="#8fa3bf">Faster Velocity</text>
      <text x="0" y="45" font-family="-apple-system, sans-serif" font-weight="700" font-size="16" fill="#ffffff">87%</text>
      <text x="0" y="61" font-family="-apple-system, sans-serif" font-weight="400" font-size="10.5" fill="#8fa3bf">Automation</text>
    </g>

    <g transform="translate(720, 180)">
      <text x="0" y="0" font-family="-apple-system, sans-serif" font-weight="700" font-size="16" fill="#ffffff">120K+</text>
      <text x="0" y="16" font-family="-apple-system, sans-serif" font-weight="400" font-size="10.5" fill="#8fa3bf">Ops Executed</text>
      <text x="0" y="45" font-family="-apple-system, sans-serif" font-weight="700" font-size="16" fill="#ffffff">2.4M</text>
      <text x="0" y="61" font-family="-apple-system, sans-serif" font-weight="400" font-size="10.5" fill="#8fa3bf">Data Streamed</text>
    </g>

    <!-- Headline (Clean Sans + Editorial Italic Serif) -->
    <g transform="translate(425, 175)" text-anchor="middle">
      <text x="0" y="0" class="flux-h1-clean">Edit at the Speed</text>
      <text x="0" y="50">
        <tspan class="flux-h1-clean">of </tspan><tspan class="flux-h1-italic">Thought.</tspan>
      </text>
    </g>

    <text x="425" y="270" text-anchor="middle" font-family="-apple-system, sans-serif" font-size="13.5" fill="#c4d7ed">
      Generate, engineer, and defend resilient systems using full-stack precision and real-time telemetry.
    </text>

    <!-- Radiant Beacon Button at the Horizon Summit -->
    <g transform="translate(425, 345)">
      <!-- Concentric Aura -->
      <circle cx="0" cy="0" r="32" fill="#ffffff" fill-opacity="0.15" />
      <circle cx="0" cy="0" r="24" fill="#fc734d" fill-opacity="0.4" />
      <circle cx="0" cy="0" r="18" fill="#fc734d" />
      <text x="0" y="4" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="700" font-size="9" fill="#02070a">RUN</text>
    </g>
  </g>

  <!-- ========================================================================= -->
  <!-- THEME 3: PELMATECH (SKY BLUE + VERTICAL STREAK + HOT PINK AURA)           -->
  <!-- ========================================================================= -->
  <g class="theme-layer-pelmatech">
    <!-- Sky Blue Canvas -->
    <rect x="0" y="0" width="850" height="430" rx="20" fill="url(#pelma-sky-bg)" />

    <!-- Center Blurred Hot Pink Silhouette Aura -->
    <ellipse cx="440" cy="240" rx="190" ry="170" fill="url(#pelma-pink-streak)" filter="url(#soft-blur)" />

    <!-- Fine Vertical Motion Streak Scanlines -->
    <rect x="0" y="0" width="850" height="430" rx="20" fill="url(#pelma-vertical-lines)" />

    <!-- Top Nav Header -->
    <g transform="translate(40, 26)">
      <circle cx="6" cy="10" r="6" fill="#ffffff" />
      <text x="22" y="16" class="brand-text">BISHEN // PELMATECH</text>

      <g transform="translate(630, 0)">
        <rect width="140" height="28" rx="14" fill="#ffffff" />
        <text x="70" y="18" font-family="-apple-system, sans-serif" font-weight="700" font-size="11.5" fill="#0593c6" text-anchor="middle">Try for Free ↗</text>
      </g>
    </g>

    <!-- Left Aligned Editorial Layout (Exact Pelmatech Screenshot) -->
    <g transform="translate(60, 190)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" font-weight="800" font-size="44px" fill="#ffffff">Your Personal</text>
      <text x="0" y="50" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif" font-weight="800" font-size="44px" fill="#ffffff">Systems Companion</text>

      <text x="0" y="88" font-family="-apple-system, sans-serif" font-size="13" fill="#ffffff" opacity="0.9">
        Meet your personal cybersecurity undergraduate and full-stack software engineer.
      </text>
      <text x="0" y="108" font-family="-apple-system, sans-serif" font-size="13" fill="#ffffff" opacity="0.9">
        Crafting modern digital health platforms, automotive marketplaces, and resilient APIs.
      </text>

      <!-- Pill Button -->
      <g transform="translate(0, 135)">
        <rect width="150" height="38" rx="19" fill="#ffffff" />
        <text x="75" y="24" text-anchor="middle" font-family="-apple-system, sans-serif" font-weight="700" font-size="12" fill="#0593c6">AutoIntel Store ↗</text>
      </g>
    </g>

    <!-- Floating Glass Telemetry Card on Right (Exact Pelmatech Screenshot) -->
    <g transform="translate(560, 120)">
      <rect width="230" height="230" rx="16" fill="#ffffff" fill-opacity="0.22" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.45" />

      <g transform="translate(20, 24)">
        <text x="0" y="0" font-family="-apple-system, sans-serif" font-size="11" font-weight="600" fill="#ffffff">Active Deployment</text>
        <text x="0" y="18" font-family="-apple-system, sans-serif" font-size="18" font-weight="800" fill="#ffffff">100% Secure</text>

        <!-- Mini Schedule / Task Bars -->
        <g transform="translate(0, 36)">
          <rect width="190" height="40" rx="8" fill="#ffffff" fill-opacity="0.25" />
          <text x="12" y="18" font-family="-apple-system, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">AutoIntel Store</text>
          <text x="12" y="32" font-family="-apple-system, sans-serif" font-size="9" fill="#ffffff" opacity="0.8">Active High Availability</text>
        </g>
        <g transform="translate(0, 86)">
          <rect width="190" height="40" rx="8" fill="#ffffff" fill-opacity="0.25" />
          <text x="12" y="18" font-family="-apple-system, sans-serif" font-size="10.5" font-weight="700" fill="#ffffff">Security Scans</text>
          <text x="12" y="32" font-family="-apple-system, sans-serif" font-size="9" fill="#ffffff" opacity="0.8">0 CVE Vulnerabilities</text>
        </g>
      </g>
    </g>
  </g>

  <!-- Exterior 1px Modern Frame -->
  <rect x="0.5" y="0.5" width="849" height="429" rx="20" stroke="#ffffff" stroke-width="1" stroke-opacity="0.15" fill="none" />
</svg>`;
}

function buildBentoGridSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 310" width="850" height="310" fill="none">
  <defs>
    <!-- Solix Card Surfaces -->
    <linearGradient id="glass-card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#f0f6ff" stop-opacity="0.92" />
    </linearGradient>

    <!-- Center Radiant Hot Pink Card (Solix) -->
    <linearGradient id="pink-card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff4794" />
      <stop offset="50%" stop-color="#fd6ca9" />
      <stop offset="100%" stop-color="#ff85be" />
    </linearGradient>

    <!-- Center Radiant Cantaloupe Card (FluxEdit) -->
    <linearGradient id="orange-card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fc734d" />
      <stop offset="100%" stop-color="#ea580c" />
    </linearGradient>

    <!-- Drop Shadows -->
    <filter id="pink-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#ff4794" flood-opacity="0.45" />
    </filter>
    <filter id="glass-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#020817" flood-opacity="0.5" />
    </filter>
  </defs>

  <style>
    /* Carousel Sync */
    @keyframes cycle-bento-solix {
      0%, 28% { opacity: 1; visibility: visible; }
      33%, 95% { opacity: 0; visibility: hidden; }
      100% { opacity: 1; visibility: visible; }
    }
    @keyframes cycle-bento-fluxedit {
      0%, 28% { opacity: 0; visibility: hidden; }
      33%, 61% { opacity: 1; visibility: visible; }
      66%, 100% { opacity: 0; visibility: hidden; }
    }
    @keyframes cycle-bento-pelmatech {
      0%, 61% { opacity: 0; visibility: hidden; }
      66%, 95% { opacity: 1; visibility: visible; }
      100% { opacity: 0; visibility: hidden; }
    }

    .bento-layer-solix {
      animation: cycle-bento-solix 24s ease-in-out infinite;
    }
    .bento-layer-fluxedit {
      animation: cycle-bento-fluxedit 24s ease-in-out infinite;
    }
    .bento-layer-pelmatech {
      animation: cycle-bento-pelmatech 24s ease-in-out infinite;
    }

    .card-heading {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
      font-weight: 700;
      font-size: 13.5px;
      fill: #0c1e3d;
    }
    .metric-sub {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
      font-weight: 500;
      font-size: 10px;
      fill: #5b739b;
    }
    .pink-card-title {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
      font-weight: 600;
      font-size: 11.5px;
      fill: #ffffff;
      opacity: 0.95;
    }
    .gauge-number {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
      font-weight: 800;
      font-size: 42px;
      fill: #ffffff;
      text-anchor: middle;
      letter-spacing: -1px;
    }
  </style>

  <!-- ==================== SOLIX BENTO (CARDS 1, 2, 3) ==================== -->
  <g class="bento-layer-solix">
    <!-- CARD 1: ALERTS BY SCAN TYPE (LEFT) -->
    <g transform="translate(10, 20)" filter="url(#glass-shadow)">
      <rect width="275" height="260" rx="16" fill="url(#glass-card)" stroke="#dbeafe" stroke-width="1.2" />
      <g transform="translate(18, 18)">
        <rect width="24" height="24" rx="6" fill="#eff6ff" />
        <path d="M12 6 L17 8.5 V13 C17 16 12 18 12 18 C12 18 7 16 7 13 V8.5 Z" fill="none" stroke="#2563eb" stroke-width="1.4" stroke-linejoin="round" />
        <text x="32" y="16" class="card-heading">Alerts by Scan Type</text>
      </g>
      <g transform="translate(18, 62)">
        <text x="0" y="10" class="metric-sub">SAST &amp; OWASP Defense</text>
        <text x="238" y="10" class="metric-sub" text-anchor="end" font-weight="700" fill="#2563eb">94%</text>
        <g transform="translate(0, 16)">
          <rect width="238" height="9" rx="4.5" fill="#e2e8f0" />
          <rect width="160" height="9" rx="4.5" fill="#2563eb" />
          <rect x="164" width="60" height="9" rx="4.5" fill="#ff4794" />
        </g>
      </g>
      <g transform="translate(18, 110)">
        <text x="0" y="10" class="metric-sub">DAST &amp; Network Traffic</text>
        <text x="238" y="10" class="metric-sub" text-anchor="end" font-weight="700" fill="#2563eb">88%</text>
        <g transform="translate(0, 16)">
          <rect width="238" height="9" rx="4.5" fill="#e2e8f0" />
          <rect width="130" height="9" rx="4.5" fill="#ff4794" />
          <rect x="134" width="85" height="9" rx="4.5" fill="#3b82f6" />
        </g>
      </g>
      <g transform="translate(18, 158)">
        <text x="0" y="10" class="metric-sub">API Security &amp; OAuth 2.0</text>
        <text x="238" y="10" class="metric-sub" text-anchor="end" font-weight="700" fill="#2563eb">96%</text>
        <g transform="translate(0, 16)">
          <rect width="238" height="9" rx="4.5" fill="#e2e8f0" />
          <rect width="190" height="9" rx="4.5" fill="#2563eb" />
          <rect x="194" width="38" height="9" rx="4.5" fill="#ff4794" />
        </g>
      </g>
      <g transform="translate(18, 206)">
        <text x="0" y="10" class="metric-sub">Linux &amp; Kernel Hardening</text>
        <text x="238" y="10" class="metric-sub" text-anchor="end" font-weight="700" fill="#2563eb">91%</text>
        <g transform="translate(0, 16)">
          <rect width="238" height="9" rx="4.5" fill="#e2e8f0" />
          <rect width="145" height="9" rx="4.5" fill="#ff4794" />
          <rect x="149" width="70" height="9" rx="4.5" fill="#2563eb" />
        </g>
      </g>
    </g>

    <!-- CARD 2: RADIANT PINK SPEEDOMETER GAUGE (CENTER) -->
    <g transform="translate(300, 5)" filter="url(#pink-shadow)">
      <rect width="250" height="290" rx="20" fill="url(#pink-card)" />
      <g transform="translate(20, 20)">
        <circle cx="6" cy="6" r="4" fill="#ffffff" />
        <text x="16" y="9" class="pink-card-title">Security Posture Score</text>
        <g transform="translate(162, -4)">
          <rect width="38" height="22" rx="11" fill="#ffffff" fill-opacity="0.25" />
          <text x="19" y="15" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle" font-family="-apple-system, sans-serif">65</text>
        </g>
      </g>
      <g transform="translate(125, 175)">
        <path d="M -85 0 A 85 85 0 0 1 85 0" fill="none" stroke="#ffffff" stroke-width="4" stroke-opacity="0.35" stroke-linecap="round" />
        <path d="M -85 0 A 85 85 0 0 1 45 -72" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" />
        <path d="M -70 0 A 70 70 0 0 1 70 0" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2 6" stroke-opacity="0.5" />
        <text x="0" y="-12" class="gauge-number">65</text>
        <text x="0" y="10" fill="#ffffff" opacity="0.9" font-size="11" font-weight="600" text-anchor="middle" font-family="-apple-system, sans-serif">OPTIMAL RESILIENCE</text>
        <circle cx="0" cy="0" r="5" fill="#ffffff" />
        <line x1="0" y1="0" x2="36" y2="-58" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
      </g>
      <g transform="translate(25, 252)">
        <rect width="200" height="24" rx="12" fill="#ffffff" fill-opacity="0.2" />
        <text x="100" y="16" fill="#ffffff" font-size="10.5" font-weight="700" text-anchor="middle" font-family="-apple-system, sans-serif">ZERO VULNERABILITIES FOUND</text>
      </g>
    </g>

    <!-- CARD 3: OPEN VS. RESOLVED (RIGHT) -->
    <g transform="translate(565, 20)" filter="url(#glass-shadow)">
      <rect width="275" height="260" rx="16" fill="url(#glass-card)" stroke="#dbeafe" stroke-width="1.2" />
      <g transform="translate(18, 18)">
        <rect width="24" height="24" rx="6" fill="#fdf2f8" />
        <circle cx="12" cy="12" r="5" fill="#ff4794" />
        <text x="32" y="16" class="card-heading">Open vs. Resolved</text>
      </g>
      <g transform="translate(18, 52)">
        <circle cx="4" cy="4" r="3.5" fill="#ff4794" />
        <text x="12" y="7" class="metric-sub" font-size="9.5">Hardened Assets</text>
        <circle cx="110" cy="4" r="3.5" fill="#2563eb" />
        <text x="118" y="7" class="metric-sub" font-size="9.5">Resolved Threats</text>
      </g>
      <g transform="translate(18, 70)">
        <rect width="238" height="120" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="0.8" />
        <line x1="0" y1="40" x2="238" y2="40" stroke="#e2e8f0" stroke-dasharray="3 3" />
        <line x1="0" y1="80" x2="238" y2="80" stroke="#e2e8f0" stroke-dasharray="3 3" />
        <path d="M 10 95 Q 60 40 120 70 T 228 30 L 228 110 L 10 110 Z" fill="#ff4794" fill-opacity="0.12" />
        <path d="M 10 95 Q 60 40 120 70 T 228 30" fill="none" stroke="#ff4794" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 10 105 Q 60 80 120 45 T 228 18" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" />
        <circle cx="160" cy="48" r="5" fill="#ff4794" stroke="#ffffff" stroke-width="2" />
        <line x1="160" y1="10" x2="160" y2="110" stroke="#ff4794" stroke-width="1" stroke-dasharray="2 2" stroke-opacity="0.6" />
        <rect x="135" y="16" width="50" height="18" rx="4" fill="#0c1e3d" />
        <text x="160" y="28" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle" font-family="-apple-system, sans-serif">98.2%</text>
      </g>
      <g transform="translate(18, 206)">
        <rect width="238" height="38" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1" />
        <text x="12" y="16" font-family="-apple-system, sans-serif" font-size="10.5" font-weight="700" fill="#1e40af">FLAGSHIP PLATFORM</text>
        <text x="12" y="30" font-family="-apple-system, sans-serif" font-size="9.5" fill="#3b82f6">AutoIntel Store: E-Commerce &amp; Inventory</text>
        <text x="224" y="24" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="#2563eb" text-anchor="end">→</text>
      </g>
    </g>
  </g>

  <!-- ==================== FLUXEDIT BENTO (CARDS 1, 2, 3) ==================== -->
  <g class="bento-layer-fluxedit">
    <g transform="translate(10, 20)" filter="url(#glass-shadow)">
      <rect width="275" height="260" rx="16" fill="#091421" stroke="#0297de" stroke-width="1.2" stroke-opacity="0.6" />
      <g transform="translate(18, 18)">
        <circle cx="12" cy="12" r="6" fill="#0297de" />
        <text x="32" y="16" class="card-heading" fill="#ffffff">Execution Velocity</text>
      </g>
      <g transform="translate(18, 62)">
        <text x="0" y="10" class="metric-sub" fill="#93c5fd">Architecture Latency</text>
        <text x="238" y="10" class="metric-sub" text-anchor="end" font-weight="700" fill="#fc734d">12ms</text>
        <g transform="translate(0, 16)">
          <rect width="238" height="9" rx="4.5" fill="#031c33" />
          <rect width="200" height="9" rx="4.5" fill="#0297de" />
        </g>
      </g>
      <g transform="translate(18, 110)">
        <text x="0" y="10" class="metric-sub" fill="#93c5fd">TypeScript Type Safety</text>
        <text x="238" y="10" class="metric-sub" text-anchor="end" font-weight="700" fill="#fc734d">100%</text>
        <g transform="translate(0, 16)">
          <rect width="238" height="9" rx="4.5" fill="#031c33" />
          <rect width="238" height="9" rx="4.5" fill="#fc734d" />
        </g>
      </g>
      <g transform="translate(18, 158)">
        <text x="0" y="10" class="metric-sub" fill="#93c5fd">API Throughput</text>
        <text x="238" y="10" class="metric-sub" text-anchor="end" font-weight="700" fill="#0297de">99.8%</text>
        <g transform="translate(0, 16)">
          <rect width="238" height="9" rx="4.5" fill="#031c33" />
          <rect width="215" height="9" rx="4.5" fill="#0297de" />
        </g>
      </g>
      <g transform="translate(18, 206)">
        <text x="0" y="10" class="metric-sub" fill="#93c5fd">Dockerized Services</text>
        <text x="238" y="10" class="metric-sub" text-anchor="end" font-weight="700" fill="#fc734d">Healthy</text>
        <g transform="translate(0, 16)">
          <rect width="238" height="9" rx="4.5" fill="#031c33" />
          <rect width="180" height="9" rx="4.5" fill="#fc734d" />
        </g>
      </g>
    </g>

    <!-- Center Orange Gauge (FluxEdit) -->
    <g transform="translate(300, 5)">
      <rect width="250" height="290" rx="20" fill="url(#orange-card)" />
      <g transform="translate(20, 20)">
        <circle cx="6" cy="6" r="4" fill="#ffffff" />
        <text x="16" y="9" class="pink-card-title">Throughput Index</text>
        <g transform="translate(162, -4)">
          <rect width="38" height="22" rx="11" fill="#ffffff" fill-opacity="0.25" />
          <text x="19" y="15" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle" font-family="-apple-system, sans-serif">87</text>
        </g>
      </g>
      <g transform="translate(125, 175)">
        <path d="M -85 0 A 85 85 0 0 1 85 0" fill="none" stroke="#ffffff" stroke-width="4" stroke-opacity="0.35" stroke-linecap="round" />
        <path d="M -85 0 A 85 85 0 0 1 55 -65" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" />
        <text x="0" y="-12" class="gauge-number">87</text>
        <text x="0" y="10" fill="#ffffff" opacity="0.9" font-size="11" font-weight="600" text-anchor="middle" font-family="-apple-system, sans-serif">PEAK VELOCITY</text>
        <circle cx="0" cy="0" r="5" fill="#ffffff" />
        <line x1="0" y1="0" x2="42" y2="-52" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
      </g>
      <g transform="translate(25, 252)">
        <rect width="200" height="24" rx="12" fill="#ffffff" fill-opacity="0.2" />
        <text x="100" y="16" fill="#ffffff" font-size="10.5" font-weight="700" text-anchor="middle" font-family="-apple-system, sans-serif">3X FASTER SYSTEMS PIPELINE</text>
      </g>
    </g>

    <g transform="translate(565, 20)" filter="url(#glass-shadow)">
      <rect width="275" height="260" rx="16" fill="#091421" stroke="#0297de" stroke-width="1.2" stroke-opacity="0.6" />
      <g transform="translate(18, 18)">
        <circle cx="12" cy="12" r="5" fill="#fc734d" />
        <text x="32" y="16" class="card-heading" fill="#ffffff">Latency vs. Load</text>
      </g>
      <g transform="translate(18, 70)">
        <rect width="238" height="120" rx="8" fill="#040c17" stroke="#0297de" stroke-width="0.8" stroke-opacity="0.4" />
        <path d="M 10 95 Q 60 40 120 70 T 228 30" fill="none" stroke="#fc734d" stroke-width="2.5" stroke-linecap="round" />
        <path d="M 10 105 Q 60 80 120 45 T 228 18" fill="none" stroke="#0297de" stroke-width="2" stroke-linecap="round" />
      </g>
      <g transform="translate(18, 206)">
        <rect width="238" height="38" rx="8" fill="#031c33" stroke="#0297de" stroke-width="1" />
        <text x="12" y="16" font-family="-apple-system, sans-serif" font-size="10.5" font-weight="700" fill="#38bdf8">AUTOINTEL STORE</text>
        <text x="12" y="30" font-family="-apple-system, sans-serif" font-size="9.5" fill="#fc734d">Optimized Relational Schema</text>
      </g>
    </g>
  </g>

  <!-- ==================== PELMATECH BENTO ==================== -->
  <g class="bento-layer-pelmatech">
    <g transform="translate(10, 20)">
      <rect width="275" height="260" rx="16" fill="#ffffff" fill-opacity="0.2" stroke="#ffffff" stroke-width="1.2" />
      <g transform="translate(18, 18)">
        <text x="0" y="16" font-family="-apple-system, sans-serif" font-weight="700" font-size="14" fill="#ffffff">Active Telemetry</text>
      </g>
      <g transform="translate(18, 62)">
        <text x="0" y="10" font-size="11" font-weight="600" fill="#ffffff">Systems Health</text>
        <rect y="18" width="238" height="8" rx="4" fill="#ffffff" fill-opacity="0.3" />
        <rect y="18" width="220" height="8" rx="4" fill="#ffffff" />
      </g>
      <g transform="translate(18, 110)">
        <text x="0" y="10" font-size="11" font-weight="600" fill="#ffffff">Application Security</text>
        <rect y="18" width="238" height="8" rx="4" fill="#ffffff" fill-opacity="0.3" />
        <rect y="18" width="210" height="8" rx="4" fill="#d83995" />
      </g>
    </g>

    <!-- Center Card Pelmatech -->
    <g transform="translate(300, 5)">
      <rect width="250" height="290" rx="20" fill="#d83995" />
      <g transform="translate(20, 20)">
        <text x="0" y="16" font-family="-apple-system, sans-serif" font-weight="700" font-size="14" fill="#ffffff">System Health</text>
      </g>
      <g transform="translate(125, 175)">
        <text x="0" y="-12" class="gauge-number">99</text>
        <text x="0" y="10" fill="#ffffff" font-size="11" font-weight="600" text-anchor="middle" font-family="-apple-system, sans-serif">100% OPERATIONAL</text>
      </g>
    </g>

    <g transform="translate(565, 20)">
      <rect width="275" height="260" rx="16" fill="#ffffff" fill-opacity="0.2" stroke="#ffffff" stroke-width="1.2" />
      <g transform="translate(18, 18)">
        <text x="0" y="16" font-family="-apple-system, sans-serif" font-weight="700" font-size="14" fill="#ffffff">Venture Spotlight</text>
      </g>
      <g transform="translate(18, 70)">
        <text x="0" y="20" font-family="-apple-system, sans-serif" font-weight="700" font-size="16" fill="#ffffff">AutoIntel Store</text>
        <text x="0" y="45" font-family="-apple-system, sans-serif" font-size="12" fill="#ffffff" opacity="0.9">E-Commerce &amp; Spare Parts Ecosystem</text>
      </g>
    </g>
  </g>
</svg>`;
}

const assetsDir = path.join(__dirname, '..', 'assets');
const distDir = path.join(__dirname, '..', 'dist');
fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(distDir, { recursive: true });

const hero = buildHeroBannerSvg();
const bento = buildBentoGridSvg();

fs.writeFileSync(path.join(assetsDir, 'hero-banner.svg'), hero, 'utf8');
fs.writeFileSync(path.join(distDir, 'hero-banner.svg'), hero, 'utf8');

fs.writeFileSync(path.join(assetsDir, 'bento-grid.svg'), bento, 'utf8');
fs.writeFileSync(path.join(distDir, 'bento-grid.svg'), bento, 'utf8');

console.log('Successfully compiled animated multi-theme SVGs (SOLIX, FLUXEDIT, PELMATECH) to assets/ and dist/!');
