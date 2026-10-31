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
        <text x="15" y="10" class="lang-name">${item.lang} ${item.percent < 0.1 ? '&lt;0.1%' : item.percent.toFixed(1) + '%'}</text>
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

  await generateStats(token, repos, outDir);
}

async function generateStats(token, repos, outDir) {
  const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

  const gqlQuery = `
    query {
      viewer {
        name
        login
        contributionsCollection {
          totalCommitContributions
          restrictedContributionsCount
          totalPullRequestContributions
          totalIssueContributions
          totalRepositoryContributions
        }
        repositoriesContributedTo(first: 1, contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
          totalCount
        }
        pullRequests(first: 1) {
          totalCount
        }
        issues(first: 1) {
          totalCount
        }
      }
    }
  `;

  let commits = 701;
  let prs = 12;
  let issues = 4;
  let contributedTo = repos.length || 12;

  try {
    const gqlRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Profile-Stats-Generator'
      },
      body: JSON.stringify({ query: gqlQuery })
    });
    if (gqlRes.ok) {
      const gqlData = await gqlRes.json();
      const v = gqlData && gqlData.data && gqlData.data.viewer;
      if (v) {
        const cc = v.contributionsCollection || {};
        commits = (cc.totalCommitContributions || 0) + (cc.restrictedContributionsCount || 0);
        prs = (v.pullRequests && v.pullRequests.totalCount) || cc.totalPullRequestContributions || 0;
        issues = (v.issues && v.issues.totalCount) || cc.totalIssueContributions || 0;
        contributedTo = (v.repositoriesContributedTo && v.repositoriesContributedTo.totalCount) || repos.length || 0;
      }
    }
  } catch (e) {
    console.warn('GraphQL stats fallback used:', e.message);
  }

  const score = commits * 1.5 + prs * 2 + issues * 1 + totalStars * 4 + contributedTo * 0.5;
  const percentile = Math.max(1, Math.min(99, Math.round(100 / (1 + Math.pow(score / 250, 0.85)))));
  const circumference = 2 * Math.PI * 40;
  const dashOffset = ((percentile / 100) * circumference).toFixed(2);

  const statsSvg = `<svg width="450" height="175" viewBox="0 0 450 175" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>Bishen's GitHub Stats</title>
  <style>
    .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #70a5fd; }
    .stat { font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #38bdae; }
    .bold { font-weight: 700; }
    .icon { fill: #bf91f3; }
    .rank-text { font: 800 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: #38bdae; }
    .rank-sub { font: 600 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: #70a5fd; }
  </style>
  <rect x="0.5" y="0.5" rx="4.5" height="174" stroke="#e4e2e2" width="449" fill="#1a1b27" />
  <g transform="translate(25, 35)">
    <text x="0" y="0" class="header">Bishen's GitHub Stats</text>
  </g>
  <g transform="translate(25, 55)">
    <g transform="translate(0, 0)">
      <svg class="icon" viewBox="0 0 16 16" width="16" height="16" x="0" y="0">
        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"/>
      </svg>
      <text x="25" y="12.5" class="stat bold">Total Stars Earned:</text>
      <text x="215" y="12.5" class="stat bold">${totalStars}</text>
    </g>
    <g transform="translate(0, 23)">
      <svg class="icon" viewBox="0 0 16 16" width="16" height="16" x="0" y="0">
        <path fill-rule="evenodd" d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"/>
      </svg>
      <text x="25" y="12.5" class="stat bold">Total Commits (last year):</text>
      <text x="215" y="12.5" class="stat bold">${commits}</text>
    </g>
    <g transform="translate(0, 46)">
      <svg class="icon" viewBox="0 0 16 16" width="16" height="16" x="0" y="0">
        <path fill-rule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
      </svg>
      <text x="25" y="12.5" class="stat bold">Total PRs:</text>
      <text x="215" y="12.5" class="stat bold">${prs}</text>
    </g>
    <g transform="translate(0, 69)">
      <svg class="icon" viewBox="0 0 16 16" width="16" height="16" x="0" y="0">
        <path fill-rule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z"/>
      </svg>
      <text x="25" y="12.5" class="stat bold">Total Issues:</text>
      <text x="215" y="12.5" class="stat bold">${issues}</text>
    </g>
    <g transform="translate(0, 92)">
      <svg class="icon" viewBox="0 0 16 16" width="16" height="16" x="0" y="0">
        <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
      </svg>
      <text x="25" y="12.5" class="stat bold">Contributed to:</text>
      <text x="215" y="12.5" class="stat bold">${contributedTo}</text>
    </g>
  </g>
  <g transform="translate(365, 97.5)">
    <circle cx="0" cy="0" r="40" stroke="#70a5fd" stroke-width="5" stroke-opacity="0.2" fill="none" />
    <circle cx="0" cy="0" r="40" stroke="#70a5fd" stroke-width="5" stroke-dasharray="${circumference.toFixed(2)}" stroke-dashoffset="${dashOffset}" stroke-linecap="round" fill="none" transform="rotate(-90)" />
    <text x="0" y="-2" text-anchor="middle" dominant-baseline="central" class="rank-sub">Top</text>
    <text x="0" y="13" text-anchor="middle" dominant-baseline="central" class="rank-text">${percentile}%</text>
  </g>
</svg>`;

  fs.writeFileSync(path.join(outDir, 'stats.svg'), statsSvg, 'utf8');
  console.log('Successfully generated dist/stats.svg!');
}

generate().catch(console.error);
