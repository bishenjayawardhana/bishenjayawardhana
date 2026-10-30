const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const themeConfigFile = path.join(__dirname, '..', 'assets', 'theme-active.json');

let activeAccent = '#fd91cc';
if (fs.existsSync(themeConfigFile)) {
  try {
    const themeConfig = JSON.parse(fs.readFileSync(themeConfigFile, 'utf8'));
    if (themeConfig.accent) {
      activeAccent = themeConfig.accent;
    }
  } catch (e) {
    console.warn('[cleanSvg] Could not parse theme-active.json:', e.message);
  }
}

function cleanSvg(filename) {
  const filePath = path.join(distDir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`[cleanSvg] File not found: ${filePath}, skipping.`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove the bottom progress timeline rects (class="u ...")
  content = content.replace(/<rect class="u[^"]*"[^>]*>/g, '');

  // 2. Cleanly adjust viewBox and height to remove the empty bottom gap where the timeline was
  content = content.replace(/viewBox="-16 -32 880 192"/g, 'viewBox="-16 -24 880 148"');
  content = content.replace(/height="192"/g, 'height="148"');

  // 3. Harmonize snake color with active theme accent
  content = content.replace(/--cs:[^;]+;/g, `--cs:${activeAccent};`);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[cleanSvg] Successfully optimized, trimmed, and themed (${activeAccent}): ${filename}`);
}

cleanSvg('github-contribution-grid-snake.svg');
cleanSvg('github-contribution-grid-snake-dark.svg');
