// 自制手机桌面交互脚本
// 桌面端鼠标拖拽横向滑动（手机端原生触摸滑动由 CSS scroll-snap 处理）
(function () {
    var wrap = document.querySelector('.slide-wrap');
    if (!wrap) return;

    var isDown = false;        // 鼠标是否按下
    var startX = 0;            // 按下时的鼠标 X 坐标
    var startScroll = 0;       // 按下时的滚动位置
    var moved = false;         // 本次是否发生拖动（用于区分点击）

    // 鼠标按下：记录起点（在容器上按下）
    wrap.addEventListener('mousedown', function (e) {
        // 只响应主键（左键）
        if (e.button !== 0) return;
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

    // 鼠标悬停时提示可拖拽
    wrap.style.cursor = 'grab';

    // 桌面端滚轮横向滑动支持（仅把垂直滚轮转成横向，水平滚轮交给原生处理）
    wrap.addEventListener('wheel', function (e) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            wrap.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // ===== 分页指示器小圆圈 =====
    var dots = document.querySelectorAll('.page-dot');

    // 滚动时更新当前页圆圈高亮
    function updateDots() {
        var pageIndex = Math.round(wrap.scrollLeft / wrap.clientWidth);
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === pageIndex);
        });
    }
    wrap.addEventListener('scroll', updateDots);

    // 点击圆圈跳转到对应页
    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            var page = parseInt(dot.getAttribute('data-page'), 10);
            wrap.scrollTo({ left: page * wrap.clientWidth, behavior: 'smooth' });
        });
    });
})();
