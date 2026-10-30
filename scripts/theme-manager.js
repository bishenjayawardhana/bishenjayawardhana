const fs = require('fs');
const path = require('path');

const THEMES = {
  'cyber-defense': {
    id: 'cyber-defense',
    name: 'Cyber Security & Systems Defense',
    accentName: 'Bubblegum Pink & Deep Blue',
    accent: '#fd91cc',
    accentSecondary: '#3b82f6',
    imageFile: 'cyber-defense-hero.jpg',
    snakeColors: {
      dark: '#061533,#0a295c,#0e3d8c,#1a5bc7,#fd91cc',
      snakeDark: '#fd91cc'
    }
  },
  'systems-velocity': {
    id: 'systems-velocity',
    name: 'High-Velocity Distributed Systems',
    accentName: 'Cantaloupe Orange & Electric Blue',
    accent: '#fc734d',
    accentSecondary: '#0297de',
    imageFile: 'systems-velocity-hero.jpg',
    snakeColors: {
      dark: '#071017,#0a2233,#025d8a,#0297de,#fc734d',
      snakeDark: '#fc734d'
    }
  },
  'cloud-architecture': {
    id: 'cloud-architecture',
    name: 'Digital Platform Architecture',
    accentName: 'Sky Blue & Radiant Hot Pink',
    accent: '#d83995',
    accentSecondary: '#0593c8',
    imageFile: 'cloud-architecture-hero.jpg',
    snakeColors: {
      dark: '#061d36,#093c6b,#0572a6,#0593c8,#d83995',
      snakeDark: '#d83995'
    }
  }
};

function getActiveTheme() {
  const themeList = ['cyber-defense', 'systems-velocity', 'cloud-architecture'];
  // Rotate every 6 hours based on UTC hour
  const hourSlot = Math.floor(Date.now() / (1000 * 60 * 60 * 6));
  const currentKey = themeList[hourSlot % themeList.length];
  return THEMES[currentKey];
}

function applyTheme(themeKey) {
  const theme = THEMES[themeKey] || getActiveTheme();
  console.log(`[Theme Manager] Applying active theme: ${theme.name} (Accent: ${theme.accentName})`);

  const assetsDir = path.join(__dirname, '..', 'assets');
  const distDir = path.join(__dirname, '..', 'dist');
  fs.mkdirSync(assetsDir, { recursive: true });
  fs.mkdirSync(distDir, { recursive: true });

  // 1. Copy the active high-resolution hero image
  const srcImage = path.join(assetsDir, theme.imageFile);
  if (fs.existsSync(srcImage)) {
    fs.copyFileSync(srcImage, path.join(assetsDir, 'active-hero.jpg'));
    fs.copyFileSync(srcImage, path.join(distDir, 'active-hero.jpg'));
    console.log(`[Theme Manager] Copied ${theme.imageFile} -> active-hero.jpg`);
  } else {
    console.warn(`[Theme Manager] Warning: ${srcImage} not found`);
  }

  // 2. Write theme config for postprocessing
  const themeConfig = {
    activeTheme: theme.id,
    themeName: theme.name,
    accent: theme.accent,
    accentSecondary: theme.accentSecondary,
    snakeColors: theme.snakeColors
  };
  fs.writeFileSync(path.join(assetsDir, 'theme-active.json'), JSON.stringify(themeConfig, null, 2), 'utf8');
  fs.writeFileSync(path.join(distDir, 'theme-active.json'), JSON.stringify(themeConfig, null, 2), 'utf8');

  console.log(`[Theme Manager] Active theme configured successfully.`);
}

const arg = process.argv[2] || 'auto';
if (arg === 'auto') {
  applyTheme();
} else if (THEMES[arg]) {
  applyTheme(arg);
} else {
  applyTheme();
}
