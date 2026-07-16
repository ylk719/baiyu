const slider = document.getElementById('slider');
const dots = document.querySelectorAll('.dot');
let pageWidth = window.innerWidth;

// 滑动同步更新小圆点
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

// 键盘左右箭头切换页面
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') slider.scrollBy({ left: pageWidth, behavior: 'smooth' });
    if (e.key === 'ArrowLeft') slider.scrollBy({ left: -pageWidth, behavior: 'smooth' });
});

// 窗口大小变化重新计算页宽
window.addEventListener('resize', () => {
    pageWidth = window.innerWidth;
});
