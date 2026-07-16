(() => {
  'use strict';

  // ===== 预设壁纸（使用高可靠图床，按 iPhone 14 比例裁剪） =====
  const PRESET_WALLPAPERS = [
    {
      id: 'w1',
      name: '粉紫天空',
      url: 'https://picsum.photos/seed/pinksky/1170/2532'
    },
    {
      id: 'w2',
      name: '深海蓝波',
      url: 'https://picsum.photos/seed/bluewave/1170/2532'
    },
    {
      id: 'w3',
      name: '远山晨雾',
      url: 'https://picsum.photos/seed/mountain/1170/2532'
    },
    {
      id: 'w4',
      name: '暗夜霓虹',
      url: 'https://picsum.photos/seed/neon/1170/2532'
    },
    {
      id: 'w5',
      name: '暖橙日落',
      url: 'https://picsum.photos/seed/sunset/1170/2532'
    },
    {
      id: 'w6',
      name: '墨绿森林',
      url: 'https://picsum.photos/seed/forest/1170/2532'
    }
  ];

  // 默认壁纸（首屏必须立即有图，避免黑屏）
  const DEFAULT_WALLPAPER = PRESET_WALLPAPERS[0].url;
  const STORAGE_KEY = 'ios_home_wallpaper_v2';

  // ===== DOM 元素 =====
  const wallpaperImg = document.getElementById('wallpaperImg');
  const pagesViewport = document.getElementById('pagesViewport');
  const pagesTrack = document.getElementById('pagesTrack');
  const pageDots = document.querySelectorAll('#pageDots .dot');
  const statusTime = document.getElementById('statusTime');

  const settingsApp = document.querySelector('.settings-app');
  const settingsModal = document.getElementById('settingsModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const btnSave = document.getElementById('btnSave');
  const btnCancel = document.getElementById('btnCancel');
  const wallpaperGrid = document.getElementById('wallpaperGrid');
  const customWallpaperInput = document.getElementById('customWallpaper');

  // ===== 状态 =====
  let currentPage = 0;
  const totalPages = 2;
  let selectedWallpaperUrl = null;
  let customWallpaperUrl = null;

  // ===== 初始化壁纸 =====
  function initWallpaper() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initialUrl = saved || DEFAULT_WALLPAPER;
    applyWallpaper(initialUrl);
  }

  function applyWallpaper(url) {
    if (!url) return;
    wallpaperImg.src = url;
    localStorage.setItem(STORAGE_KEY, url);
  }

  // ===== 时间更新 =====
  function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    statusTime.textContent = `${h}:${m}`;
  }

  // ===== 双页滑动逻辑（Pointer Events，同时兼容触摸与鼠标） =====
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let trackOffset = 0;
  let startTime = 0;
  const swipeThreshold = 60;

  function setTrackPosition(x, transition = false) {
    pagesTrack.style.transition = transition ? 'transform 0.32s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
    pagesTrack.style.transform = `translateX(${x}px)`;
  }

  function updatePageDots() {
    pageDots.forEach((dot, i) => dot.classList.toggle('active', i === currentPage));
  }

  function goToPage(page) {
    currentPage = Math.max(0, Math.min(page, totalPages - 1));
    trackOffset = -currentPage * pagesViewport.clientWidth;
    setTrackPosition(trackOffset, true);
    updatePageDots();
  }

  pagesViewport.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    currentX = e.clientX;
    startTime = Date.now();
    pagesTrack.setPointerCapture(e.pointerId);
    pagesTrack.style.transition = 'none';
  });

  pagesViewport.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    const delta = currentX - startX;
    // 限制边界拖拽阻力
    let dampedDelta = delta;
    if ((currentPage === 0 && delta > 0) || (currentPage === totalPages - 1 && delta < 0)) {
      dampedDelta = delta * 0.35;
    }
    setTrackPosition(trackOffset + dampedDelta, false);
  });

  pagesViewport.addEventListener('pointerup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    pagesTrack.releasePointerCapture(e.pointerId);

    const delta = currentX - startX;
    const elapsed = Date.now() - startTime;
    const velocity = Math.abs(delta) / Math.max(elapsed, 1);

    if (Math.abs(delta) > swipeThreshold || velocity > 0.6) {
      if (delta < 0 && currentPage < totalPages - 1) {
        goToPage(currentPage + 1);
      } else if (delta > 0 && currentPage > 0) {
        goToPage(currentPage - 1);
      } else {
        goToPage(currentPage);
      }
    } else {
      goToPage(currentPage);
    }
  });

  pagesViewport.addEventListener('pointercancel', () => {
    isDragging = false;
    goToPage(currentPage);
  });

  // 防止水平滑动时页面上下滚动
  pagesViewport.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

  // 窗口尺寸变化时重新定位
  window.addEventListener('resize', () => goToPage(currentPage));

  // ===== 设置壁纸弹窗 =====
  function renderWallpaperGrid() {
    wallpaperGrid.innerHTML = '';
    PRESET_WALLPAPERS.forEach((wp) => {
      const option = document.createElement('div');
      option.className = 'wallpaper-option';
      option.dataset.url = wp.url;
      option.innerHTML = `<img src="${wp.url}" alt="${wp.name}" loading="lazy">`;
      option.addEventListener('click', () => selectWallpaper(wp.url, option));
      wallpaperGrid.appendChild(option);
    });
  }

  function selectWallpaper(url, element) {
    selectedWallpaperUrl = url;
    customWallpaperUrl = null;
    document.querySelectorAll('.wallpaper-option').forEach((el) => el.classList.remove('selected'));
    if (element) element.classList.add('selected');
  }

  function openSettings() {
    selectedWallpaperUrl = null;
    customWallpaperUrl = null;
    renderWallpaperGrid();
    settingsModal.classList.add('open');
    settingsModal.setAttribute('aria-hidden', 'false');
  }

  function closeSettings() {
    settingsModal.classList.remove('open');
    settingsModal.setAttribute('aria-hidden', 'true');
  }

  settingsApp.addEventListener('click', (e) => {
    e.stopPropagation();
    openSettings();
  });

  modalBackdrop.addEventListener('click', closeSettings);
  btnCancel.addEventListener('click', closeSettings);

  btnSave.addEventListener('click', () => {
    const url = customWallpaperUrl || selectedWallpaperUrl;
    if (url) {
      applyWallpaper(url);
    }
    closeSettings();
  });

  // 自定义上传
  customWallpaperInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      customWallpaperUrl = event.target.result;
      selectedWallpaperUrl = null;
      document.querySelectorAll('.wallpaper-option').forEach((el) => el.classList.remove('selected'));
    };
    reader.readAsDataURL(file);
  });

  // ===== 启动 =====
  initWallpaper();
  updateTime();
  setInterval(updateTime, 1000);

  // 初始轨道位置
  setTrackPosition(0, false);
})();
