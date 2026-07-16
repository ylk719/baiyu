const slider = document.getElementById('slider');
const dots = document.querySelectorAll('.dot');
let pageWidth = window.innerWidth;

// 滑动同步小圆点
slider.addEventListener('scroll', () => {
    const index = Math.round(slider.scrollLeft / pageWidth);
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
});

// 电脑端鼠标拖拽滑动
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.clientX;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => isDown = false);
slider.addEventListener('mouseup', () => isDown = false);
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = (e.clientX - startX) * 1.2;
    slider.scrollLeft = scrollLeft - walk;
});

// 鼠标滚轮横向翻页
slider.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
        slider.scrollBy({ left: pageWidth, behavior: 'smooth' });
    } else {
        slider.scrollBy({ left: -pageWidth, behavior: 'smooth' });
    }
});

// 键盘左右箭头切换
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') slider.scrollBy({ left: pageWidth, behavior: 'smooth' });
    if (e.key === 'ArrowLeft') slider.scrollBy({ left: -pageWidth, behavior: 'smooth' });
});

window.addEventListener('resize', () => {
    pageWidth = window.innerWidth;
});

// ========== 设置面板 + 更换壁纸 ==========
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closePanel = document.getElementById('closePanel');
const wallpaperInput = document.getElementById('wallpaper-input');
const saveBtn = document.getElementById('saveBtn');
let tempWallpaper = '';

settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsPanel.classList.add('show');
});

closePanel.addEventListener('click', () => {
    settingsPanel.classList.remove('show');
});
document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) && e.target !== settingsBtn) {
        settingsPanel.classList.remove('show');
    }
});

wallpaperInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        tempWallpaper = ev.target.result;
        document.body.style.backgroundImage = `url(${tempWallpaper})`;
    };
    reader.readAsDataURL(file);
});

saveBtn.addEventListener('click', () => {
    if (!tempWallpaper) {
        alert('请先选择一张照片');
        return;
    }
    localStorage.setItem('custom_wallpaper', tempWallpaper);
    settingsPanel.classList.remove('show');
});

window.addEventListener('load', () => {
    const savedWallpaper = localStorage.getItem('custom_wallpaper');
    if (savedWallpaper) {
        document.body.style.backgroundImage = `url(${savedWallpaper})`;
        tempWallpaper = savedWallpaper;
    }
});
