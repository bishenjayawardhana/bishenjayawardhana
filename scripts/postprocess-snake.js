const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

function cleanSvg(filename, isDarkOnly = false) {
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

  // Inject @media (prefers-color-scheme: dark) into the default snake SVG so that
  // IDE Markdown previews, img fallbacks, and dark-mode browsers automatically render
  // the dark contribution grid (#161b22 empty cells + dark green dots) while light-mode
  // viewers still see the crisp light theme (#ebedf0 empty cells).
  if (!isDarkOnly && !content.includes('prefers-color-scheme: dark')) {
    const darkMediaRule = '@media (prefers-color-scheme: dark){:root{--cb:#1b1f230a;--cs:#39d353;--ce:#161b22;--c0:#161b22;--c1:#0e4429;--c2:#006d32;--c3:#26a641;--c4:#39d353}}';
    content = content.replace('</style>', `${darkMediaRule}</style>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[cleanSvg] Successfully optimized and trimmed: ${filename}`);
}

cleanSvg('github-contribution-grid-snake.svg', false);
cleanSvg('github-contribution-grid-snake-dark.svg', true);
