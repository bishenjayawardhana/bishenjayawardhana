const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

function cleanSvg(filename) {
  const filePath = path.join(distDir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`[cleanSvg] File not found: ${filePath}, skipping.`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Remove the bottom progress timeline rects (class="u ...")
  content = content.replace(/<rect class="u[^"]*"[^>]*>/g, '');

  // Cleanly adjust viewBox and height to remove the empty bottom gap where the timeline was
  content = content.replace(/viewBox="-16 -32 880 192"/g, 'viewBox="-16 -24 880 148"');
  content = content.replace(/height="192"/g, 'height="148"');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[cleanSvg] Successfully optimized and trimmed: ${filename}`);
}

cleanSvg('github-contribution-grid-snake.svg');
cleanSvg('github-contribution-grid-snake-dark.svg');
