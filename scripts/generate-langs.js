const fs = require('fs');
const path = require('path');

const COLORS = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  PHP: '#4F5D95',
  Python: '#3572A5',
  Shell: '#89e051',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c'
};

const EXCLUDE = new Set(['Batchfile', 'Dockerfile', 'Hack', 'PowerShell']);

async function generate() {
  const token = process.env.GITHUB_TOKEN || process.env.ACCESS_TOKEN;
  if (!token) {
    console.error('No token provided in GITHUB_TOKEN or ACCESS_TOKEN');
    process.exit(1);
  }

  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Profile-Langs-Generator'
  };

  const reposRes = await fetch('https://api.github.com/user/repos?affiliation=owner,collaborator&per_page=100', { headers });
  if (!reposRes.ok) {
    throw new Error(`Failed to fetch repos: ${reposRes.status} ${await reposRes.text()}`);
  }
  const repos = await reposRes.json();

  const languageTotals = {};

  for (const repo of repos) {
    try {
      const langRes = await fetch(repo.languages_url, { headers });
      if (langRes.ok) {
        const langs = await langRes.json();
        for (const [lang, bytes] of Object.entries(langs)) {
          if (!EXCLUDE.has(lang)) {
            languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
          }
        }
      }
    } catch (e) {
      console.warn(`Could not fetch languages for ${repo.full_name}:`, e.message);
    }
  }

  const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0);
  if (totalBytes === 0) {
    console.error('No language data found');
    return;
  }

  const sorted = Object.entries(languageTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([lang, bytes]) => ({
      lang,
      bytes,
      percent: ((bytes / totalBytes) * 100),
      color: COLORS[lang] || '#70a5fd'
    }));

  const barWidth = 250;
  let currentX = 0;
  const progressBars = sorted.map(item => {
    const w = ((item.percent / 100) * barWidth).toFixed(2);
    const rect = `        <rect mask="url(#rect-mask)" x="${currentX.toFixed(2)}" y="0" width="${w}" height="8" fill="${item.color}" />`;
    currentX += parseFloat(w);
    return rect;
  }).join('\n');

  const col1 = sorted.slice(0, 3);
  const col2 = sorted.slice(3, 6);

  const renderCol = (items, xOffset) => items.map((item, idx) => `      <g transform="translate(${xOffset}, ${idx * 25})">
        <circle cx="5" cy="6" r="5" fill="${item.color}" />
        <text x="15" y="10" class="lang-name">${item.lang} ${item.percent < 0.1 ? '<0.1%' : item.percent.toFixed(1) + '%'}</text>
      </g>`).join('\n');

  const svg = `<svg width="300" height="175" viewBox="0 0 300 175" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
  <style>
    .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #70a5fd; }
    .lang-name { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: #38bdae; }
  </style>
  <rect x="0.5" y="0.5" rx="4.5" height="174" stroke="#e4e2e2" width="299" fill="#1a1b27" />
  <g transform="translate(25, 35)">
    <text x="0" y="0" class="header">Most Used Languages</text>
  </g>
  <g transform="translate(25, 55)">
    <mask id="rect-mask">
      <rect x="0" y="0" width="${barWidth}" height="8" fill="white" rx="4"/>
    </mask>
${progressBars}
    <g transform="translate(0, 25)">
${renderCol(col1, 0)}
${renderCol(col2, 130)}
    </g>
  </g>
</svg>`;

  const outDir = path.join(__dirname, '..', 'dist');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'top-langs.svg'), svg, 'utf8');
  console.log('Successfully generated dist/top-langs.svg!');
}

generate().catch(console.error);
