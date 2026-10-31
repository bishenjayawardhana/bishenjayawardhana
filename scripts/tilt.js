/**
 * 3D CARD TILT & SPECULAR GLARE PHYSICS MODULE
 * Tilts glassmorphic cards in 3D perspective and reflects lighting dynamically.
 */

(function () {
  const cards = document.querySelectorAll('.glass-panel');

  cards.forEach((card) => {
    // Inject glare element if missing
    if (!card.querySelector('.glass-glare')) {
      const glare = document.createElement('div');
      glare.className = 'glass-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max tilt angle: 6 degrees
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      // Update card glare coordinates
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;

      card.style.setProperty('--card-mouse-x', `${glareX}%`);
      card.style.setProperty('--card-mouse-y', `${glareY}%`);
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
})();
