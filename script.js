/* ========== Starry Background ========== */
(function () {
  const canvas = document.getElementById('starsCanvas');
  const ctx = canvas.getContext('2d');
  const wrapper = document.getElementById('pageWrapper');

  let stars = [];
  const STAR_COUNT = 120;

  function resize() {
    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
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
        const cx = star.x;
        const cy = star.y;
        const size = star.r * 2.5;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.ellipse(cx, cy, star.r * 0.5, size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(cx, cy, size, star.r * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, star.r * 1.8);
        glow.addColorStop(0, 'rgba(255,255,255,0.9)');
        glow.addColorStop(0.5, 'rgba(255,255,255,0.3)');
        glow.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(cx, cy, star.r * 1.8, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 2.5);
        glow.addColorStop(0, 'rgba(255,255,255,0.9)');
        glow.addColorStop(0.4, 'rgba(255,255,255,0.4)');
        glow.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * 2.5, 0, Math.PI * 2);
        ctx.fill();

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

/* ========== Background Manager ========== */
const BG_GRADIENTS = {
  default: 'linear-gradient(180deg, #e8f4fd 0%, #d4eafc 35%, #c5e0f5 70%, #beddf5 100%)',
  pink:    'linear-gradient(180deg, #fce4ec 0%, #f8d0dc 35%, #f0c0d0 70%, #e8b8c8 100%)',
  lavender:'linear-gradient(180deg, #f0e8f8 0%, #e0d0f0 35%, #d0c0e8 70%, #c4b4e0 100%)',
  mint:    'linear-gradient(180deg, #e8f8f0 0%, #d0f0e0 35%, #c0e8d4 70%, #b4dcc8 100%)',
  peach:   'linear-gradient(180deg, #fef4e8 0%, #fce8d0 35%, #f8dcc0 70%, #f0d0b8 100%)',
  sky:     'linear-gradient(180deg, #e0f0fc 0%, #c8e4f8 35%, #b8d8f4 70%, #a8cce8 100%)',
  warm:    'linear-gradient(180deg, #fef8f0 0%, #fcf0e0 35%, #f8e8d0 70%, #f0dcc0 100%)',
  lilac:   'linear-gradient(180deg, #f4f0f8 0%, #e8e0f4 35%, #dcd0ec 70%, #d0c4e4 100%)',
};

function applyBackground(bgValue) {
  const wrapper = document.getElementById('pageWrapper');
  wrapper.style.background = bgValue;
  wrapper.style.backgroundSize = 'cover';
  wrapper.style.backgroundPosition = 'center';
  wrapper.style.backgroundRepeat = 'no-repeat';
  const preview = document.getElementById('bgPreviewFrame');
  if (preview) {
    preview.style.background = bgValue;
    preview.style.backgroundSize = 'cover';
    preview.style.backgroundPosition = 'center';
  }
}

function saveBackgroundPreset(key) {
  localStorage.setItem('app-bg-type', 'preset');
  localStorage.setItem('app-bg', key);
}

function saveBackgroundCustom(dataUrl) {
  localStorage.setItem('app-bg-type', 'custom');
  try {
    localStorage.setItem('app-bg-custom', dataUrl);
  } catch (err) {
    alert('图片太大，无法保存。请选择较小的图片。');
    return false;
  }
  return true;
}

function loadSavedBackground() {
  const type = localStorage.getItem('app-bg-type');
  if (type === 'custom') {
    const customImg = localStorage.getItem('app-bg-custom');
    if (customImg) {
      const bg = 'url(' + customImg + ') center/cover no-repeat';
      applyBackground(bg);
      return { type: 'custom', value: customImg };
    }
  }
  const presetKey = localStorage.getItem('app-bg') || 'default';
  if (BG_GRADIENTS[presetKey]) {
    applyBackground(BG_GRADIENTS[presetKey]);
    return { type: 'preset', value: presetKey };
  }
  applyBackground(BG_GRADIENTS.default);
  return { type: 'preset', value: 'default' };
}

function resetBackground() {
  localStorage.removeItem('app-bg-type');
  localStorage.removeItem('app-bg');
  localStorage.removeItem('app-bg-custom');
  applyBackground(BG_GRADIENTS.default);
}

/* ========== Page Switching ========== */
(function () {
  const wrapper = document.getElementById('pageWrapper');
  const indicator = document.getElementById('pageIndicator');
  const dots = indicator.querySelectorAll('.dot');
  const pages = document.querySelectorAll('.page');
  const TOTAL_PAGES = pages.length;

  let currentPage = 0;
  let isScrolling = false;

  function updateIndicator(pageIndex) {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === pageIndex);
    });
  }

  function updatePageActive(pageIndex) {
    pages.forEach((page, i) => {
      page.classList.toggle('active', i === pageIndex);
    });
  }

  function switchToPage(pageIndex) {
    if (currentPage === pageIndex || isScrolling) return;
    if (pageIndex < 0 || pageIndex >= TOTAL_PAGES) return;
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

  window.switchToPage = switchToPage;

  wrapper.addEventListener('scroll', () => {
    if (isScrolling) return;
    const scrollLeft = wrapper.scrollLeft;
    const pageWidth = wrapper.clientWidth;
    const newPage = Math.round(scrollLeft / pageWidth);

    if (newPage !== currentPage && newPage >= 0 && newPage < TOTAL_PAGES) {
      currentPage = newPage;
      updateIndicator(newPage);
      updatePageActive(newPage);
    }
  }, { passive: true });

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

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0 && currentPage < TOTAL_PAGES - 1) {
        switchToPage(currentPage + 1);
      } else if (dx < 0 && currentPage > 0) {
        switchToPage(currentPage - 1);
      }
    }
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const pageIndex = parseInt(dot.dataset.page);
      switchToPage(pageIndex);
    });
    dot.style.pointerEvents = 'auto';
  });

  updatePageActive(0);
})();

/* ========== Heart Button Toggle ========== */
(function () {
  document.querySelectorAll('.heart-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('liked');
      btn.style.transform = 'scale(1.2)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 200);
    });
  });
})();

/* ========== Dock Bar Navigation ========== */
(function () {
  document.querySelectorAll('.dock-bar').forEach((dock) => {
    const items = dock.querySelectorAll('.dock-item');
    items.forEach((item) => {
      item.addEventListener('click', () => {
        const label = item.querySelector('span').textContent.trim();
        let targetPage = 0;

        if (label === '主页') targetPage = 0;
        else if (label === '发现') targetPage = 1;
        else if (label === '设置') targetPage = 2;
        else if (label === '发布') return;

        // 更新所有 dock 栏的 active 状态
        document.querySelectorAll('.dock-bar').forEach((d) => {
          d.querySelectorAll('.dock-item').forEach((i) => {
            const l = i.querySelector('span').textContent.trim();
            i.classList.toggle('active', l === label);
          });
        });

        window.switchToPage(targetPage);
      });
    });
  });
})();

/* ========== Settings Back Button ========== */
(function () {
  const backBtn = document.getElementById('settingsBack');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.switchToPage(0);
      // 恢复 dock 到主页
      document.querySelectorAll('.dock-bar').forEach((d) => {
        d.querySelectorAll('.dock-item').forEach((i) => {
          const l = i.querySelector('span').textContent.trim();
          i.classList.toggle('active', l === '主页');
        });
      });
    });
  }
})();

/* ========== Settings: Preset Backgrounds ========== */
(function () {
  const presetItems = document.querySelectorAll('.preset-bg-item');

  // 初始化选中状态
  const saved = loadSavedBackground();
  if (saved.type === 'preset') {
    presetItems.forEach((item) => {
      item.classList.toggle('active', item.dataset.bg === saved.value);
    });
  }

  presetItems.forEach((item) => {
    item.addEventListener('click', () => {
      const bgKey = item.dataset.bg;
      const gradient = BG_GRADIENTS[bgKey];
      if (!gradient) return;

      applyBackground(gradient);
      saveBackgroundPreset(bgKey);

      presetItems.forEach((i) => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
})();

/* ========== Settings: Custom Background Upload ========== */
(function () {
  const uploadBtn = document.getElementById('uploadBgBtn');
  const resetBtn = document.getElementById('resetBgBtn');
  const bgFileInput = document.getElementById('bgFileInput');
  const presetItems = document.querySelectorAll('.preset-bg-item');

  if (uploadBtn && bgFileInput) {
    uploadBtn.addEventListener('click', () => {
      bgFileInput.value = '';
      bgFileInput.click();
    });

    bgFileInput.addEventListener('change', (e) => {
      if (!bgFileInput.files || !bgFileInput.files[0]) return;

      const file = bgFileInput.files[0];
      const reader = new FileReader();

      reader.onload = (ev) => {
        const dataUrl = ev.target.result;
        const bg = 'url(' + dataUrl + ') center/cover no-repeat';
        applyBackground(bg);

        const ok = saveBackgroundCustom(dataUrl);
        if (ok) {
          // 取消预设选中
          presetItems.forEach((i) => i.classList.remove('active'));
        }
      };

      reader.readAsDataURL(file);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetBackground();
      presetItems.forEach((item) => {
        item.classList.toggle('active', item.dataset.bg === 'default');
      });
    });
  }
})();

/* ========== Image Upload (Avatar + PhotoBook) ========== */
(function () {
  const fileInput = document.getElementById('fileInput');
  let currentTarget = null;

  document.querySelectorAll('[data-upload]').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.isContentEditable) return;
      e.stopPropagation();
      currentTarget = el;
      fileInput.value = '';
      fileInput.click();
    });
  });

  fileInput.addEventListener('change', (e) => {
    if (!currentTarget || !fileInput.files || !fileInput.files[0]) return;

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      const key = currentTarget.dataset.key;
      const type = currentTarget.dataset.upload;

      if (type === 'avatar') {
        currentTarget.innerHTML = '';
        currentTarget.style.backgroundImage = 'url(' + dataUrl + ')';
        currentTarget.style.backgroundSize = 'cover';
        currentTarget.style.backgroundPosition = 'center';
      } else if (type === 'photo') {
        currentTarget.style.backgroundImage = 'url(' + dataUrl + ')';
        currentTarget.style.backgroundSize = 'cover';
        currentTarget.style.backgroundPosition = 'center';
      }

      try {
        localStorage.setItem('img-' + key, dataUrl);
      } catch (err) {
        console.warn('图片太大，无法保存到本地存储');
      }
    };

    reader.readAsDataURL(file);
  });

  document.querySelectorAll('[data-upload]').forEach((el) => {
    const key = el.dataset.key;
    const saved = localStorage.getItem('img-' + key);
    if (saved) {
      const type = el.dataset.upload;
      if (type === 'avatar') {
        el.innerHTML = '';
        el.style.backgroundImage = 'url(' + saved + ')';
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      } else if (type === 'photo') {
        el.style.backgroundImage = 'url(' + saved + ')';
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      }
    }
  });
})();

/* ========== Text Editing (contenteditable) ========== */
(function () {
  document.querySelectorAll('[contenteditable="true"]').forEach((el) => {
    const key = el.dataset.key;

    const saved = localStorage.getItem('text-' + key);
    if (saved !== null) {
      el.textContent = saved;
    }

    el.addEventListener('blur', () => {
      localStorage.setItem('text-' + key, el.textContent.trim());
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        el.blur();
      }
    });

    el.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
})();