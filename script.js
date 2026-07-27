/* ========== Starry Background ========== */
(function () {
  const canvas = document.getElementById('starsCanvas');
  const ctx = canvas.getContext('2d');

  let stars = [];
  const STAR_COUNT = 120;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.2 + 0.6,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        // Cross-shaped star probability
        isCross: Math.random() < 0.15,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const now = Date.now();

    for (const star of stars) {
      const opacity = star.opacity + Math.sin(now * star.twinkleSpeed + star.twinkleOffset) * 0.25;
      const alpha = Math.max(0.15, Math.min(0.9, opacity));

      ctx.save();
      ctx.globalAlpha = alpha;

      if (star.isCross && star.r > 1.5) {
        // Cross-shaped star
        const cx = star.x;
        const cy = star.y;
        const size = star.r * 2.5;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        // Vertical bar
        ctx.ellipse(cx, cy, star.r * 0.5, size, 0, 0, Math.PI * 2);
        ctx.fill();
        // Horizontal bar
        ctx.beginPath();
        ctx.ellipse(cx, cy, size, star.r * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        // Center glow
        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, star.r * 1.8);
        glow.addColorStop(0, 'rgba(255,255,255,0.9)');
        glow.addColorStop(0.5, 'rgba(255,255,255,0.3)');
        glow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, star.r * 1.8, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Round star with glow
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 2.5);
        glow.addColorStop(0, 'rgba(255,255,255,0.9)');
        glow.addColorStop(0.4, 'rgba(255,255,255,0.4)');
        glow.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  function animate() {
    drawStars();
    requestAnimationFrame(animate);
  }

  resize();
  createStars();
  animate();

  window.addEventListener('resize', () => {
    resize();
    createStars();
  });
})();

/* ========== Page Switching ========== */
(function () {
  const wrapper = document.getElementById('pageWrapper');
  const indicator = document.getElementById('pageIndicator');
  const dots = indicator.querySelectorAll('.dot');
  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');

  let currentPage = 0;
  let isScrolling = false;

  function updateIndicator(pageIndex) {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === pageIndex);
    });
  }

  function updatePageActive(pageIndex) {
    page1.classList.toggle('active', pageIndex === 0);
    page2.classList.toggle('active', pageIndex === 1);
  }

  function switchToPage(pageIndex) {
    if (currentPage === pageIndex || isScrolling) return;
    currentPage = pageIndex;
    isScrolling = true;

    updateIndicator(pageIndex);
    updatePageActive(pageIndex);

    wrapper.scrollTo({
      left: pageIndex * wrapper.clientWidth,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isScrolling = false;
    }, 400);
  }

  // Scroll listener for native swipe
  wrapper.addEventListener('scroll', () => {
    if (isScrolling) return;

    const scrollLeft = wrapper.scrollLeft;
    const pageWidth = wrapper.clientWidth;
    const newPage = Math.round(scrollLeft / pageWidth);

    if (newPage !== currentPage) {
      currentPage = newPage;
      updateIndicator(newPage);
      updatePageActive(newPage);
    }
  }, { passive: true });

  // Touch swipe detection
  let touchStartX = 0;
  let touchStartY = 0;

  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  wrapper.addEventListener('touchend', (e) => {
    if (isScrolling) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const dx = touchStartX - touchEndX;
    const dy = touchStartY - touchEndY;

    // Only trigger horizontal swipe if horizontal movement > vertical
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0 && currentPage === 0) {
        switchToPage(1);
      } else if (dx < 0 && currentPage === 1) {
        switchToPage(0);
      }
    }
  });

  // Indicator dot click
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const pageIndex = parseInt(dot.dataset.page);
      switchToPage(pageIndex);
    });
    dot.style.pointerEvents = 'auto';
  });

  // Initialize
  updatePageActive(0);
})();

/* ========== Heart Button Toggle ========== */
(function () {
  document.querySelectorAll('.heart-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('liked');

      // Add a little burst animation
      btn.style.transform = 'scale(1.2)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
    });
  });
})();

/* ========== Selector Pill Toggle ========== */
(function () {
  document.querySelectorAll('.top-selectors').forEach((group) => {
    const pills = group.querySelectorAll('.selector-pill');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  });
})();

/* ========== Dock Item Toggle ========== */
(function () {
  document.querySelectorAll('.dock-bar').forEach((dock) => {
    const items = dock.querySelectorAll('.dock-item');
    items.forEach((item) => {
      item.addEventListener('click', () => {
        items.forEach((i) => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  });
})();