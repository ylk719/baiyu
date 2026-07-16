(function() {
    const STORAGE_KEY = 'personal_homepage_data';

    function saveData(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save data:', e);
        }
    }

    function loadData() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.warn('Failed to load data:', e);
            return {};
        }
    }

    function bindImageUpload(inputId, imgId) {
        const input = document.getElementById(inputId);
        const img = document.getElementById(imgId);
        if (!input || !img) return;

        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            if (!file.type.startsWith('image/')) {
                alert('请选择图片文件');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(ev) {
                img.src = ev.target.result;
                const data = loadData();
                data[imgId] = ev.target.result;
                saveData(data);
            };
            reader.readAsDataURL(file);
        });
    }

    function setupEditableText(elementId, placeholder) {
        const el = document.getElementById(elementId);
        if (!el) return;

        el.setAttribute('contenteditable', 'true');
        el.setAttribute('data-placeholder', placeholder);

        const data = loadData();
        if (data[elementId] !== undefined) {
            el.textContent = data[elementId];
        }

        updateEmptyState(el);

        el.addEventListener('focus', function() {
            if (el.classList.contains('empty')) {
                el.textContent = '';
                el.classList.remove('empty');
            }
            const range = document.createRange();
            range.selectNodeContents(el);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        });

        el.addEventListener('blur', function() {
            const text = el.textContent.trim();
            const data = loadData();
            data[elementId] = text;
            saveData(data);
            updateEmptyState(el);
        });

        el.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && elementId !== 'signature') {
                e.preventDefault();
                el.blur();
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                const data = loadData();
                el.textContent = data[elementId] || '';
                updateEmptyState(el);
                el.blur();
            }
        });

        el.addEventListener('input', function() {
            if (el.textContent.trim() === '') {
                el.classList.add('empty');
            } else {
                el.classList.remove('empty');
            }
        });
    }

    function updateEmptyState(el) {
        if (el.textContent.trim() === '') {
            el.classList.add('empty');
        } else {
            el.classList.remove('empty');
        }
    }

    function restoreSavedData() {
        const data = loadData();

        const bannerImg = document.getElementById('bannerImage');
        if (bannerImg && data.bannerImage) {
            bannerImg.src = data.bannerImage;
        }

        const avatarImg = document.getElementById('avatarImage');
        if (avatarImg && data.avatarImage) {
            avatarImg.src = data.avatarImage;
        }
    }

    function init() {
        bindImageUpload('bannerUpload', 'bannerImage');
        bindImageUpload('avatarUpload', 'avatarImage');

        setupEditableText('username', '请输入用户名');
        setupEditableText('account', '@your_account');
        setupEditableText('signature', '写下你的个性签名...');
        setupEditableText('location', '📍 填写你的位置');

        restoreSavedData();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
