const fs = require('fs');
const path = require('path');

const THEMES = {
  solix: {
    id: 'solix',
    name: 'SOLIX — Cyber Security & Intelligence',
    accentName: 'Bubblegum Pink',
    bgDark: '#020817',
    bgCard: '#051336',
    royalGradStart: '#0e3a8a',
    royalGradEnd: '#04122e',
    accent: '#fd91cc',
    accentSecondary: '#3b82f6',
    textPrimary: '#ffffff',
    textMuted: '#93c5fd',
    subtext: '#bfdbfe',
    tagBg: '#0a1c42',
    tagBorder: '#1d4ed8',
    snakeColors: {
      dark: '#061533,#0a295c,#0e3d8c,#1a5bc7,#fd91cc',
      snakeDark: '#fd91cc',
      light: '#ebedf0,#9be9a8,#40c463,#30a14e,#ff4794',
      snakeLight: '#ff4794'
    },
    hero: {
      brand: 'BISHEN // SOLIX',
      eyebrow: '→ Threat Intelligence   → Security Operations   → Resilient Systems',
      h1_1: 'Enterprise Security',
      h1_2: 'Without Complexity.',
      sub1: 'Undergraduate at NSBM × Victoria University. Hardening full-stack architectures,',
      sub2: 'mitigating critical attack surfaces, and engineering the AutoIntel Store platform.',
      btn1: 'AutoIntel Store ↗',
      btn2: 'Explore Repositories ↓'
    },
    bento: {
      card1Title: 'Alerts by Scan Type',
      card2Title: 'Security Posture Score',
      card2Metric: '65',
      card2Status: 'OPTIMAL RESILIENCE',
      card2Pill: 'ZERO VULNERABILITIES FOUND',
      card3Title: 'Open vs. Resolved',
      card3PillText: 'AutoIntel Store: E-Commerce & Inventory'
    }
  },
  fluxedit: {
    id: 'fluxedit',
    name: 'FLUXEDIT — Midnight Precision & Velocity',
    accentName: 'Cantaloupe Orange & Electric Blue',
    bgDark: '#02070a',
    bgCard: '#071017',
    royalGradStart: '#025d8a',
    royalGradEnd: '#03141f',
    accent: '#fc734d',
    accentSecondary: '#0297de',
    textPrimary: '#ffffff',
    textMuted: '#8fa3bf',
    subtext: '#c4d7ed',
    tagBg: '#091c28',
    tagBorder: '#0297de',
    snakeColors: {
      dark: '#071017,#0a2233,#025d8a,#0297de,#fc734d',
      snakeDark: '#fc734d',
      light: '#ebedf0,#8dd5f8,#38a5e8,#0277bd,#fc734d',
      snakeLight: '#fc734d'
    },
    hero: {
      brand: 'BISHEN // FLUXEDIT',
      eyebrow: '→ Ultra-Fast Execution   → Scalable Systems   → High Availability',
      h1_1: 'Edit at the Speed',
      h1_2: 'of Thought.',
      sub1: 'Architecting resilient full-stack web platforms and backend APIs at scale.',
      sub2: 'Engineering the AutoIntel Store marketplace with high performance and zero lag.',
      btn1: 'Explore AutoIntel ↗',
      btn2: 'View System Architecture ↓'
    },
    bento: {
      card1Title: 'Execution Velocity',
      card2Title: 'Throughput Index',
      card2Metric: '87',
      card2Status: 'PEAK VELOCITY',
      card2Pill: '3X FASTER SYSTEMS PIPELINE',
      card3Title: 'Latency vs. Uptime',
      card3PillText: 'AutoIntel Store: High Availability'
    }
  },
  pelmatech: {
    id: 'pelmatech',
    name: 'PELMATECH — Digital Health & Modern Velocity',
    accentName: 'Sky Blue & Hot Pink',
    bgDark: '#031526',
    bgCard: '#04223d',
    royalGradStart: '#0593c8',
    royalGradEnd: '#02182c',
    accent: '#d83995',
    accentSecondary: '#0593c8',
    textPrimary: '#ffffff',
    textMuted: '#7dd3fc',
    subtext: '#bae6fd',
    tagBg: '#062d52',
    tagBorder: '#0593c8',
    snakeColors: {
      dark: '#061d36,#093c6b,#0572a6,#0593c8,#d83995',
      snakeDark: '#d83995',
      light: '#ebedf0,#a5f3fc,#38bdf8,#0284c7,#d83995',
      snakeLight: '#d83995'
    },
    hero: {
      brand: 'BISHEN // PELMATECH',
      eyebrow: '→ Digital Infrastructure   → Full-Stack Resilience   → Proactive Defense',
      h1_1: 'Your Personal',
      h1_2: 'Systems Companion.',
      sub1: 'Engineering seamless web platforms that combine high security with intuitive UX.',
      sub2: 'Building mission-critical platforms with strict typing, REST APIs, and automated CI/CD.',
      btn1: 'AutoIntel Store Platform ↗',
      btn2: 'System Health Dashboard ↓'
    },
    bento: {
      card1Title: 'Active Telemetry',
      card2Title: 'System Health Score',
      card2Metric: '99',
      card2Status: 'OPTIMAL COMPLIANCE',
      card2Pill: '100% SECURE & OPERATIONAL',
      card3Title: 'Performance vs. Load',
      card3PillText: 'AutoIntel Store: Production Grade'
    }
  }
};

function getActiveTheme() {
  const themeList = ['solix', 'fluxedit', 'pelmatech'];
  // Rotate every 6 hours automatically based on UTC timestamp
  const hourSlot = Math.floor(Date.now() / (1000 * 60 * 60 * 6));
  const currentKey = themeList[hourSlot % themeList.length];
  return THEMES[currentKey];
}

function generateHeroSvg(theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 430" width="850" height="430" fill="none">
  <defs>
    <radialGradient id="theme-aurora" cx="50%" cy="20%" r="80%" fx="50%" fy="10%">
      <stop offset="0%" stop-color="${theme.royalGradStart}" stop-opacity="0.85" />
      <stop offset="40%" stop-color="${theme.royalGradEnd}" stop-opacity="0.75" />
      <stop offset="100%" stop-color="${theme.bgDark}" />
    </radialGradient>

    <linearGradient id="btn-accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.accent}" />
      <stop offset="100%" stop-color="${theme.accentSecondary}" />
    </linearGradient>

    <linearGradient id="card-border" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.accentSecondary}" stop-opacity="0.6" />
      <stop offset="50%" stop-color="#30363d" stop-opacity="0.2" />
      <stop offset="100%" stop-color="${theme.accent}" stop-opacity="0.5" />
    </linearGradient>
  </defs>

  <style>
    .brand-title {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif;
      font-weight: 800;
      font-size: 13.5px;
      letter-spacing: 2px;
      fill: #ffffff;
    }
    .nav-link {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
      font-weight: 500;
      font-size: 11.5px;
      fill: ${theme.textMuted};
    }
    .eyebrow {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
      font-weight: 600;
      font-size: 11px;
      letter-spacing: 1.2px;
      fill: ${theme.textMuted};
    }
    .hero-h1 {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', sans-serif;
      font-weight: 800;
      font-size: 45px;
      letter-spacing: -1.2px;
      fill: #ffffff;
      text-anchor: middle;
    }
    .hero-sub {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
      font-weight: 400;
      font-size: 13.5px;
      line-height: 1.5;
      fill: ${theme.subtext};
      text-anchor: middle;
    }
    .btn-text-accent {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
      font-weight: 700;
      font-size: 12.5px;
      fill: #02070a;
      text-anchor: middle;
      letter-spacing: 0.2px;
    }
    .btn-text-glass {
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif;
      font-weight: 600;
      font-size: 12.5px;
      fill: #ffffff;
      text-anchor: middle;
      letter-spacing: 0.2px;
    }
  </style>

  <!-- Container Box -->
  <rect x="1" y="1" width="848" height="428" rx="20" fill="${theme.bgDark}" stroke="url(#card-border)" stroke-width="1.2" />
  <rect x="2" y="2" width="846" height="426" rx="19" fill="url(#theme-aurora)" />

  <!-- Stardust particles in background -->
  <g opacity="0.6">
    <circle cx="80" cy="90" r="1.2" fill="#ffffff" />
    <circle cx="140" cy="130" r="1.5" fill="#ffffff" opacity="0.8" />
    <circle cx="210" cy="70" r="1" fill="#ffffff" opacity="0.5" />
    <circle cx="310" cy="110" r="1.4" fill="${theme.accent}" opacity="0.9" />
    <circle cx="430" cy="65" r="1.5" fill="#ffffff" opacity="0.9" />
    <circle cx="560" cy="95" r="1.2" fill="#ffffff" opacity="0.7" />
    <circle cx="680" cy="80" r="1.5" fill="${theme.accent}" opacity="0.8" />
    <circle cx="760" cy="120" r="1.2" fill="#ffffff" opacity="0.5" />
    <circle cx="790" cy="60" r="1" fill="#ffffff" opacity="0.6" />
  </g>

  <!-- ==================== TOP NAVIGATION BAR ==================== -->
  <g transform="translate(36, 26)">
    <!-- Brand Logo Left -->
    <g transform="translate(0, 4)">
      <rect x="0" y="0" width="16" height="16" rx="4" fill="${theme.accent}" />
      <path d="M4 8 L8 4 L12 8 L8 12 Z" fill="${theme.bgDark}" />
      <text x="24" y="13" class="brand-title">${theme.hero.brand}</text>
    </g>

    <!-- Centered Nav Capsule -->
    <g transform="translate(240, 0)">
      <rect x="0" y="0" width="290" height="28" rx="14" fill="${theme.tagBg}" fill-opacity="0.8" stroke="${theme.tagBorder}" stroke-width="0.8" stroke-opacity="0.5" />
      <text x="20" y="18" class="nav-link">Threat Intel</text>
      <circle cx="95" cy="14" r="1.5" fill="${theme.accentSecondary}" />
      <text x="108" y="18" class="nav-link">Architecture</text>
      <circle cx="185" cy="14" r="1.5" fill="${theme.accentSecondary}" />
      <text x="198" y="18" class="nav-link">AutoIntel</text>
    </g>

    <!-- Top Right Action Pill -->
    <g transform="translate(635, 0)">
      <rect x="0" y="0" width="140" height="28" rx="14" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-width="0.8" stroke-opacity="0.2" />
      <circle cx="14" cy="14" r="3.5" fill="${theme.accent}" />
      <text x="25" y="18" font-family="-apple-system, sans-serif" font-weight="600" font-size="11" fill="#ffffff">VU Australia ↗</text>
    </g>
  </g>

  <!-- ==================== HERO CONTENT ==================== -->
  <g transform="translate(425, 115)">
    <text x="0" y="0" class="eyebrow" text-anchor="middle">
      ${theme.hero.eyebrow}
    </text>
  </g>

  <text x="425" y="172" class="hero-h1">${theme.hero.h1_1}</text>
  <text x="425" y="222" class="hero-h1">${theme.hero.h1_2}</text>

  <text x="425" y="265" class="hero-sub">${theme.hero.sub1}</text>
  <text x="425" y="287" class="hero-sub">${theme.hero.sub2}</text>

  <!-- ==================== CALL TO ACTION BUTTONS ==================== -->
  <g transform="translate(425, 335)">
    <g transform="translate(-180, 0)">
      <rect x="0" y="0" width="170" height="42" rx="21" fill="url(#btn-accent)" />
      <text x="85" y="26" class="btn-text-accent">${theme.hero.btn1}</text>
    </g>

    <g transform="translate(10, 0)">
      <rect x="0" y="0" width="170" height="42" rx="21" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-width="1" stroke-opacity="0.25" />
      <text x="85" y="26" class="btn-text-glass">${theme.hero.btn2}</text>
    </g>
  </g>

  <!-- Bottom Accent Line -->
  <line x1="150" y1="400" x2="700" y2="400" stroke="${theme.accentSecondary}" stroke-width="1" stroke-opacity="0.3" />
  <circle cx="425" cy="400" r="3" fill="${theme.accent}" />
</svg>`;
}

function generateBentoSvg(theme) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 310" width="850" height="310" fill="none">
  <defs>
    <linearGradient id="glass-card" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#f0f6ff" stop-opacity="0.92" />
    </linearGradient>

    <linearGradient id="center-card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.accent}" />
      <stop offset="100%" stop-color="${theme.accentSecondary}" />
    </linearGradient>

    <filter id="center-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="${theme.accent}" flood-opacity="0.45" />
    </filter>

    <filter id="glass-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#020817" flood-opacity="0.5" />
    </filter>
  </defs>

  <style>
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
    .center-card-title {
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

  <!-- CARD 1: LEFT -->
  <g transform="translate(10, 20)" filter="url(#glass-shadow)">
    <rect width="275" height="260" rx="16" fill="url(#glass-card)" stroke="#dbeafe" stroke-width="1.2" />

    <g transform="translate(18, 18)">
      <rect width="24" height="24" rx="6" fill="#eff6ff" />
      <circle cx="12" cy="12" r="5" fill="${theme.accentSecondary}" />
      <text x="32" y="16" class="card-heading">${theme.bento.card1Title}</text>
    </g>

    <g transform="translate(18, 62)">
      <text x="0" y="10" class="metric-sub">SAST &amp; OWASP Defense</text>
      <text x="238" y="10" class="metric-sub" text-anchor="end" font-weight="700" fill="${theme.accentSecondary}">94%</text>
      <g transform="translate(0, 16)">
        <rect width="238" height="9" rx="4.5" fill="#e2e8f0" />
        <rect width="160" height="9" rx="4.5" fill="${theme.accentSecondary}" />
        <rect x="164" width="60" height="9" rx="4.5" fill="${theme.accent}" />
      </g>
    </g>

    <g transform="translate(18, 110)">
      <text x="0" y="10" class="metric-sub">DAST &amp; Network Traffic</text>
      <text x="238" y="10" class="metric-sub" text-anchor="end" font-weight="700" fill="${theme.accentSecondary}">88%</text>
      <g transform="translate(0, 16)">
        <rect width="238" height="9" rx="4.5" fill="#e2e8f0" />
        <rect width="130" height="9" rx="4.5" fill="${theme.accent}" />
        <rect x="134" width="85" height="9" rx="4.5" fill="${theme.accentSecondary}" />
      </g>
    </g>

    <g transform="translate(18, 158)">
      <text x="0" y="10" class="metric-sub">API Security &amp; OAuth 2.0</text>
      <text x="238" y="10" class="metric-sub" text-anchor="end" font-weight="700" fill="${theme.accentSecondary}">96%</text>
      <g transform="translate(0, 16)">
        <rect width="238" height="9" rx="4.5" fill="#e2e8f0" />
        <rect width="190" height="9" rx="4.5" fill="${theme.accentSecondary}" />
        <rect x="194" width="38" height="9" rx="4.5" fill="${theme.accent}" />
      </g>
    </g>

    <g transform="translate(18, 206)">
      <text x="0" y="10" class="metric-sub">Linux &amp; Kernel Hardening</text>
      <text x="238" y="10" class="metric-sub" text-anchor="end" font-weight="700" fill="${theme.accentSecondary}">91%</text>
      <g transform="translate(0, 16)">
        <rect width="238" height="9" rx="4.5" fill="#e2e8f0" />
        <rect width="145" height="9" rx="4.5" fill="${theme.accent}" />
        <rect x="149" width="70" height="9" rx="4.5" fill="${theme.accentSecondary}" />
      </g>
    </g>
  </g>

  <!-- CARD 2: RADIANT CENTER GAUGE -->
  <g transform="translate(300, 5)" filter="url(#center-shadow)">
    <rect width="250" height="290" rx="20" fill="url(#center-card)" />

    <g transform="translate(20, 20)">
      <circle cx="6" cy="6" r="4" fill="#ffffff" />
      <text x="16" y="9" class="center-card-title">${theme.bento.card2Title}</text>
      <g transform="translate(162, -4)">
        <rect width="38" height="22" rx="11" fill="#ffffff" fill-opacity="0.25" />
        <text x="19" y="15" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle" font-family="-apple-system, sans-serif">${theme.bento.card2Metric}</text>
      </g>
    </g>

    <g transform="translate(125, 175)">
      <path d="M -85 0 A 85 85 0 0 1 85 0" fill="none" stroke="#ffffff" stroke-width="4" stroke-opacity="0.35" stroke-linecap="round" />
      <path d="M -85 0 A 85 85 0 0 1 45 -72" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" />
      <path d="M -70 0 A 70 70 0 0 1 70 0" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2 6" stroke-opacity="0.5" />

      <text x="0" y="-12" class="gauge-number">${theme.bento.card2Metric}</text>
      <text x="0" y="10" fill="#ffffff" opacity="0.9" font-size="11" font-weight="600" text-anchor="middle" font-family="-apple-system, sans-serif">${theme.bento.card2Status}</text>

      <circle cx="0" cy="0" r="5" fill="#ffffff" />
      <line x1="0" y1="0" x2="36" y2="-58" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
    </g>

    <g transform="translate(25, 252)">
      <rect width="200" height="24" rx="12" fill="#ffffff" fill-opacity="0.2" />
      <text x="100" y="16" fill="#ffffff" font-size="10.5" font-weight="700" text-anchor="middle" font-family="-apple-system, sans-serif">${theme.bento.card2Pill}</text>
    </g>
  </g>

  <!-- CARD 3: RIGHT -->
  <g transform="translate(565, 20)" filter="url(#glass-shadow)">
    <rect width="275" height="260" rx="16" fill="url(#glass-card)" stroke="#dbeafe" stroke-width="1.2" />

    <g transform="translate(18, 18)">
      <rect width="24" height="24" rx="6" fill="#eff6ff" />
      <circle cx="12" cy="12" r="5" fill="${theme.accent}" />
      <text x="32" y="16" class="card-heading">${theme.bento.card3Title}</text>
    </g>

    <g transform="translate(18, 52)">
      <circle cx="4" cy="4" r="3.5" fill="${theme.accent}" />
      <text x="12" y="7" class="metric-sub" font-size="9.5">Hardened Assets</text>
      <circle cx="110" cy="4" r="3.5" fill="${theme.accentSecondary}" />
      <text x="118" y="7" class="metric-sub" font-size="9.5">Resolved Threats</text>
    </g>

    <g transform="translate(18, 70)">
      <rect width="238" height="120" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="0.8" />
      <line x1="0" y1="40" x2="238" y2="40" stroke="#e2e8f0" stroke-dasharray="3 3" />
      <line x1="0" y1="80" x2="238" y2="80" stroke="#e2e8f0" stroke-dasharray="3 3" />

      <path d="M 10 95 Q 60 40 120 70 T 228 30 L 228 110 L 10 110 Z" fill="${theme.accent}" fill-opacity="0.12" />
      <path d="M 10 95 Q 60 40 120 70 T 228 30" fill="none" stroke="${theme.accent}" stroke-width="2.5" stroke-linecap="round" />
      <path d="M 10 105 Q 60 80 120 45 T 228 18" fill="none" stroke="${theme.accentSecondary}" stroke-width="2" stroke-linecap="round" />

      <circle cx="160" cy="48" r="5" fill="${theme.accent}" stroke="#ffffff" stroke-width="2" />
      <line x1="160" y1="10" x2="160" y2="110" stroke="${theme.accent}" stroke-width="1" stroke-dasharray="2 2" stroke-opacity="0.6" />

      <rect x="135" y="16" width="50" height="18" rx="4" fill="#0c1e3d" />
      <text x="160" y="28" fill="#ffffff" font-size="9" font-weight="700" text-anchor="middle" font-family="-apple-system, sans-serif">98.2%</text>
    </g>

    <g transform="translate(18, 206)">
      <rect width="238" height="38" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1" />
      <text x="12" y="16" font-family="-apple-system, sans-serif" font-size="10.5" font-weight="700" fill="#1e40af">FLAGSHIP PLATFORM</text>
      <text x="12" y="30" font-family="-apple-system, sans-serif" font-size="9.5" fill="${theme.accentSecondary}">${theme.bento.card3PillText}</text>
      <text x="224" y="24" font-family="-apple-system, sans-serif" font-size="13" font-weight="700" fill="${theme.accentSecondary}" text-anchor="end">→</text>
    </g>
  </g>
</svg>`;
}

function applyTheme(themeKey) {
  const theme = THEMES[themeKey] || getActiveTheme();
  console.log(`[Theme Manager] Applying active theme: ${theme.name} (Accent: ${theme.accentName})`);

  const assetsDir = path.join(__dirname, '..', 'assets');
  const distDir = path.join(__dirname, '..', 'dist');
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.mkdirSync(distDir, { recursive: true });

  // 1. Generate Hero Banner
  const heroSvg = generateHeroSvg(theme);
  fs.writeFileSync(path.join(assetsDir, 'hero-banner.svg'), heroSvg, 'utf8');
  fs.writeFileSync(path.join(distDir, 'hero-banner.svg'), heroSvg, 'utf8');

  // 2. Generate Bento Grid
  const bentoSvg = generateBentoSvg(theme);
  fs.writeFileSync(path.join(assetsDir, 'bento-grid.svg'), bentoSvg, 'utf8');
  fs.writeFileSync(path.join(distDir, 'bento-grid.svg'), bentoSvg, 'utf8');

  // 3. Write Theme Config for Workflows
  const themeConfig = {
    activeTheme: theme.id,
    accent: theme.accent,
    accentSecondary: theme.accentSecondary,
    snakeColors: theme.snakeColors
  };
  fs.writeFileSync(path.join(assetsDir, 'theme-active.json'), JSON.stringify(themeConfig, null, 2), 'utf8');
  fs.writeFileSync(path.join(distDir, 'theme-active.json'), JSON.stringify(themeConfig, null, 2), 'utf8');

  console.log(`[Theme Manager] Successfully rendered hero-banner.svg and bento-grid.svg in ${theme.id} style to assets/ and dist/!`);
}

// CLI usage: node scripts/theme-manager.js [solix|fluxedit|pelmatech|auto]
const arg = process.argv[2] || 'auto';
if (arg === 'auto') {
  applyTheme();
} else if (THEMES[arg]) {
  applyTheme(arg);
} else {
  console.log(`Unknown theme '${arg}', fallback to auto.`);
  applyTheme();
}
