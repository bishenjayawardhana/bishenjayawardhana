/**
 * CURSOR TRACKER MODULE
 * Tracks cursor position with high performance and updates CSS variables for dynamic spotlight.
 */

(function () {
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight * 0.35;
  let currentX = targetX;
  let currentY = targetY;

  // Track real mouse events
  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  // Smooth lerp loop for organic floating feel
  function updateCursor() {
    currentX += (targetX - currentX) * 0.15;
    currentY += (targetY - currentY) * 0.15;

    document.documentElement.style.setProperty('--mouse-x', `${currentX.toFixed(1)}px`);
    document.documentElement.style.setProperty('--mouse-y', `${currentY.toFixed(1)}px`);

    requestAnimationFrame(updateCursor);
  }

  requestAnimationFrame(updateCursor);
})();
