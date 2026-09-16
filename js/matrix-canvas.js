/* ============================================================
   MATRIX-CANVAS.JS — Phosphor-green falling character rain
   Anikethana Reddy J L — Dark Cyber-Terminal Portfolio
============================================================ */

(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]<>/\\|=+-_';
  const FONT_SIZE = 13;
  const GREEN = '#00ff41';
  const GREEN_DIM = '#003d0f';

  let cols = 0;
  let drops = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / FONT_SIZE);
    drops = Array.from({ length: cols }, () => Math.random() * -canvas.height / FONT_SIZE);
  }

  function draw() {
    // Fade trail
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < cols; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const y = drops[i] * FONT_SIZE;

      // Head of the stream — bright green
      ctx.fillStyle = GREEN;
      ctx.shadowBlur = 6;
      ctx.shadowColor = GREEN;
      ctx.fillText(char, i * FONT_SIZE, y);

      ctx.shadowBlur = 0;

      // Random reset
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i] += 0.5 + Math.random() * 0.5;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 40);
})();
