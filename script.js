const pagesWrapper = document.getElementById('pagesWrapper');
const indicators = document.querySelectorAll('.indicator');
let currentPage = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
let pageWidth = window.innerWidth;

function goToPage(pageIndex) {
    if (pageIndex < 0 || pageIndex > 1) return;
    currentPage = pageIndex;
    pagesWrapper.classList.remove('no-transition');
    pagesWrapper.style.transform = `translateX(-${currentPage * 50}%)`;
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentPage);
    });
}

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    currentX = startX;
    isDragging = true;
    pagesWrapper.classList.add('no-transition');
}

function handleTouchMove(e) {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    const offsetPercent = (diff / pageWidth) * 50;
    const baseOffset = -currentPage * 50;
    pagesWrapper.style.transform = `translateX(${baseOffset + offsetPercent}%)`;
}

function handleTouchEnd() {
    if (!isDragging) return;
    isDragging = false;
    const diff = currentX - startX;
    const threshold = pageWidth * 0.2;

    if (diff > threshold && currentPage > 0) {
        goToPage(currentPage - 1);
    } else if (diff < -threshold && currentPage < 1) {
        goToPage(currentPage + 1);
    } else {
        goToPage(currentPage);
    }
}

pagesWrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
pagesWrapper.addEventListener('touchmove', handleTouchMove, { passive: true });
pagesWrapper.addEventListener('touchend', handleTouchEnd, { passive: true });

let mouseStartX = 0;
let mouseCurrentX = 0;
let isMouseDown = false;

pagesWrapper.addEventListener('mousedown', (e) => {
    mouseStartX = e.clientX;
    mouseCurrentX = mouseStartX;
    isMouseDown = true;
    pagesWrapper.classList.add('no-transition');
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    mouseCurrentX = e.clientX;
    const diff = mouseCurrentX - mouseStartX;
    const offsetPercent = (diff / pageWidth) * 50;
    const baseOffset = -currentPage * 50;
    pagesWrapper.style.transform = `translateX(${baseOffset + offsetPercent}%)`;
});

document.addEventListener('mouseup', () => {
    if (!isMouseDown) return;
    isMouseDown = false;
    const diff = mouseCurrentX - mouseStartX;
    const threshold = pageWidth * 0.2;

    if (diff > threshold && currentPage > 0) {
        goToPage(currentPage - 1);
    } else if (diff < -threshold && currentPage < 1) {
        goToPage(currentPage + 1);
    } else {
        goToPage(currentPage);
    }
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        goToPage(index);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        goToPage(currentPage - 1);
    } else if (e.key === 'ArrowRight') {
        goToPage(currentPage + 1);
    }
});

window.addEventListener('resize', () => {
    pageWidth = window.innerWidth;
    goToPage(currentPage);
});
