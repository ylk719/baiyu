// 自制手机桌面交互脚本
// 滑动同步切换圆点激活状态 + 桌面端鼠标拖拽/滚轮横向滑动
(function () {
    var wrap = document.querySelector('.slide-wrap');
    if (!wrap) return;

    var dots = document.querySelectorAll('.dot');

    // 圆点高亮随滚动切换（注意：元素用 scrollLeft，不是 window 的 scrollX）
    function updateDots() {
        var pageIndex = Math.round(wrap.scrollLeft / wrap.clientWidth);
        dots.forEach(function (dot, idx) {
            dot.classList.toggle('active', idx === pageIndex);
        });
    }
    wrap.addEventListener('scroll', updateDots);

    // 点击圆点跳转到对应页
    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            var page = parseInt(dot.getAttribute('data-page'), 10);
            wrap.scrollTo({ left: page * wrap.clientWidth, behavior: 'smooth' });
        });
    });

    // ===== 桌面端鼠标拖拽横向滑动（手机端原生触摸滑动由 CSS scroll-snap 处理）=====
    var isDown = false;        // 鼠标是否按下
    var startX = 0;            // 按下时的鼠标 X 坐标
    var startScroll = 0;       // 按下时的滚动位置
    var moved = false;         // 本次是否发生拖动（用于区分点击）

    wrap.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return; // 只响应左键
        isDown = true;
        moved = false;
        startX = e.pageX;
        startScroll = wrap.scrollLeft;
        wrap.style.cursor = 'grabbing';
        wrap.style.scrollSnapType = 'none'; // 拖拽过程中关闭吸附，避免抖动
    });

    // 移动监听放到 document，避免鼠标移出容器时拖动中断
    document.addEventListener('mousemove', function (e) {
        if (!isDown) return;
        var dx = e.pageX - startX;
        if (Math.abs(dx) > 5) moved = true;
        wrap.scrollLeft = startScroll - dx;
    });

    // 抬起监听放到 document，确保在容器外松开也能正常结束
    document.addEventListener('mouseup', function () {
        if (!isDown) return;
        isDown = false;
        wrap.style.cursor = 'grab';
        wrap.style.scrollSnapType = 'x mandatory';

        var pageWidth = wrap.clientWidth;
        var pageIndex = Math.round(wrap.scrollLeft / pageWidth);
        wrap.scrollTo({ left: pageIndex * pageWidth, behavior: 'smooth' });
    });

    // 拖动时阻止图标点击事件（避免误触发 app）
    wrap.addEventListener('click', function (e) {
        if (moved) {
            e.preventDefault();
            e.stopPropagation();
            moved = false;
        }
    }, true);

    // 桌面端滚轮横向滑动支持（仅把垂直滚轮转成横向）
    wrap.addEventListener('wheel', function (e) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            wrap.scrollLeft += e.deltaY;
        }
    }, { passive: false });
})();
