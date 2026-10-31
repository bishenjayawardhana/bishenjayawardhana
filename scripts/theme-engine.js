/**
 * THEME ENGINE MODULE
 * Manages live switching between the 3 luxury themes with smooth transitions.
 */

(function () {
  const THEMES = [
    { id: 'cyber-defense', name: 'Cyber Defense', class: '' },
    { id: 'systems-velocity', name: 'Systems Velocity', class: 'theme-systems-velocity' },
    { id: 'cloud-architecture', name: 'Cloud Architecture', class: 'theme-cloud-architecture' }
  ];

  let currentThemeIndex = 0;

  function applyTheme(index) {
    currentThemeIndex = index;
    const theme = THEMES[index];

    // Remove old classes
    THEMES.forEach(t => {
      if (t.class) document.body.classList.remove(t.class);
    });

    // Apply new class
    if (theme.class) {
      document.body.classList.add(theme.class);
    }

    // Update active pill button
    const pills = document.querySelectorAll('.theme-pill-btn');
    pills.forEach((pill, idx) => {
      if (idx === index) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    localStorage.setItem('bishen-active-theme', theme.id);
  }

  // Setup click listeners on theme switcher buttons
  window.addEventListener('DOMContentLoaded', () => {
    const pills = document.querySelectorAll('.theme-pill-btn');
    pills.forEach((pill, idx) => {
      pill.addEventListener('click', () => applyTheme(idx));
    });

    // Check localStorage
    const saved = localStorage.getItem('bishen-active-theme');
    if (saved) {
      const foundIdx = THEMES.findIndex(t => t.id === saved);
      if (foundIdx !== -1) applyTheme(foundIdx);
    }
  });

  window.ThemeEngine = { applyTheme };
})();
