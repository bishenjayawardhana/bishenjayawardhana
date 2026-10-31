/**
 * MAIN APP INITIALIZER
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('[Bishen Jayawardhana Portfolio] Initialized successfully with 3D interactive physics & cursor tracking.');

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
