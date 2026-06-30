(function () {
    'use strict';

    const pagesWrapper = document.getElementById('pagesWrapper');
    const dots = document.querySelectorAll('.dot');
    const fileInput = document.getElementById('fileInput');

    let currentPage = 0;
    const totalPages = 3;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchMoveX = 0;
    let touchMoveY = 0;
    let isDragging = false;
    let isHorizontalSwipe = null;

    let currentUploadTarget = null;

    function goToPage(index) {
        if (index < 0) index = 0;
        if (index > totalPages - 1) index = totalPages - 1;
        currentPage = index;
        pagesWrapper.style.transform = 'translateX(-' + (currentPage * 33.333) + '%)';
        updateDots();
    }

    function updateDots() {
        dots.forEach(function (dot, i) {
            if (i === currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            goToPage(i);
        });
    });

    function handleTouchStart(e) {
        if (e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchMoveX = touchStartX;
        touchMoveY = touchStartY;
        isDragging = true;
        isHorizontalSwipe = null;
        pagesWrapper.style.transition = 'none';
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        if (e.touches.length !== 1) return;

        const moveX = e.touches[0].clientX;
        const moveY = e.touches[0].clientY;
        const deltaX = moveX - touchStartX;
        const deltaY = moveY - touchStartY;

        if (isHorizontalSwipe === null) {
            if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
                isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
            }
        }

        if (isHorizontalSwipe) {
            e.preventDefault();
            touchMoveX = moveX;
            touchMoveY = moveY;

            const containerWidth = pagesWrapper.offsetWidth / 3;
            let offsetPercent = (deltaX / containerWidth) * 100;
            const baseTranslate = -(currentPage * 33.333);
            pagesWrapper.style.transform = 'translateX(calc(' + baseTranslate + '% + ' + offsetPercent + 'px * 0.3))';
        }
    }

    function handleTouchEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        pagesWrapper.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        if (isHorizontalSwipe) {
            const deltaX = touchMoveX - touchStartX;
            const threshold = window.innerWidth * 0.15;

            if (deltaX > threshold) {
                goToPage(currentPage - 1);
            } else if (deltaX < -threshold) {
                goToPage(currentPage + 1);
            } else {
                goToPage(currentPage);
            }
        }

        isHorizontalSwipe = null;
    }

    pagesWrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    pagesWrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
    pagesWrapper.addEventListener('touchend', handleTouchEnd);

    let mouseStartX = 0;
    let mouseStartY = 0;
    let mouseMoveX = 0;
    let isMouseDown = false;
    let isMouseHorizontalSwipe = null;

    pagesWrapper.addEventListener('mousedown', function (e) {
        isMouseDown = true;
        mouseStartX = e.clientX;
        mouseStartY = e.clientY;
        mouseMoveX = mouseStartX;
        isMouseHorizontalSwipe = null;
        pagesWrapper.style.transition = 'none';
    });

    document.addEventListener('mousemove', function (e) {
        if (!isMouseDown) return;

        const deltaX = e.clientX - mouseStartX;
        const deltaY = e.clientY - mouseStartY;

        if (isMouseHorizontalSwipe === null) {
            if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
                isMouseHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
            }
        }

        if (isMouseHorizontalSwipe) {
            e.preventDefault();
            mouseMoveX = e.clientX;
            const containerWidth = pagesWrapper.offsetWidth / 3;
            let offsetPercent = (deltaX / containerWidth) * 100;
            const baseTranslate = -(currentPage * 33.333);
            pagesWrapper.style.transform = 'translateX(calc(' + baseTranslate + '% + ' + deltaX + 'px * 0.3))';
        }
    });

    document.addEventListener('mouseup', function (e) {
        if (!isMouseDown) return;
        isMouseDown = false;
        pagesWrapper.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        if (isMouseHorizontalSwipe) {
            const deltaX = mouseMoveX - mouseStartX;
            const threshold = window.innerWidth * 0.15;

            if (deltaX > threshold) {
                goToPage(currentPage - 1);
            } else if (deltaX < -threshold) {
                goToPage(currentPage + 1);
            } else {
                goToPage(currentPage);
            }
        }

        isMouseHorizontalSwipe = null;
    });

    function handleUploadClick(e) {
        const target = e.currentTarget;
        const uploadId = target.getAttribute('data-upload-id');
        currentUploadTarget = uploadId;
        fileInput.value = '';
        fileInput.click();
    }

    const uploadableElements = document.querySelectorAll('.uploadable');
    uploadableElements.forEach(function (el) {
        el.addEventListener('click', handleUploadClick);
    });

    const changeBtn = document.querySelector('.change-btn');
    if (changeBtn) {
        changeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const uploadId = changeBtn.getAttribute('data-upload-id');
            currentUploadTarget = uploadId;
            fileInput.value = '';
            fileInput.click();
        });
    }

    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file || !currentUploadTarget) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            const imageUrl = event.target.result;
            applyImageToTarget(currentUploadTarget, imageUrl);
            try {
                localStorage.setItem('upload_' + currentUploadTarget, imageUrl);
            } catch (err) {
                console.warn('无法保存到localStorage', err);
            }
        };
        reader.readAsDataURL(file);
    });

    function applyImageToTarget(uploadId, imageUrl) {
        const targets = document.querySelectorAll('[data-upload-id="' + uploadId + '"]');
        targets.forEach(function (target) {
            if (target.tagName === 'IMG') {
                target.src = imageUrl;
            } else {
                let img = target.querySelector('img');
                if (!img) {
                    img = document.createElement('img');
                    img.src = imageUrl;
                    target.innerHTML = '';
                    target.appendChild(img);
                } else {
                    img.src = imageUrl;
                }
            }
        });
    }

    function loadSavedImages() {
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key && key.indexOf('upload_') === 0) {
                    const uploadId = key.replace('upload_', '');
                    const imageUrl = localStorage.getItem(key);
                    if (imageUrl) {
                        applyImageToTarget(uploadId, imageUrl);
                    }
                }
            }
        } catch (err) {
            console.warn('无法从localStorage读取', err);
        }
    }

    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeStr = hours + ':' + minutes;
        const timeEls = document.querySelectorAll('.time');
        timeEls.forEach(function (el) {
            el.textContent = timeStr;
        });
    }

    function fitToScreen() {
        var phoneContainer = document.querySelector('.phone-container');
        var pagesWrapper = document.querySelector('.pages-wrapper');
        var vh = window.innerHeight;
        var vw = window.innerWidth;

        var designWidth = 430;
        var page = document.querySelector('.page');
        var contentHeight = page ? page.scrollHeight : 800;

        var scaleY = vh / contentHeight;
        var scaleX = vw / designWidth;
        var scale = Math.min(scaleX, scaleY);

        if (scale >= 1) {
            phoneContainer.style.transform = 'scale(1)';
            phoneContainer.style.transformOrigin = 'top center';
        } else {
            phoneContainer.style.transform = 'scale(' + scale + ')';
            phoneContainer.style.transformOrigin = 'top center';
            var newHeight = contentHeight * scale;
            document.body.style.height = newHeight + 'px';
        }
    }

    function init() {
        updateDots();
        loadSavedImages();
        updateTime();
        setInterval(updateTime, 30000);

        var pages = document.querySelectorAll('.page');
        pages.forEach(function(page) {
            page.scrollTop = 0;
        });

        setTimeout(fitToScreen, 50);
        window.addEventListener('resize', fitToScreen);
        window.addEventListener('orientationchange', function() {
            setTimeout(fitToScreen, 200);
        });
    }

    init();
    window.__mainJsLoaded = true;
})();
