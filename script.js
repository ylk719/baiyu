(function(){
    const setupFullscreenWebAppData = () => {
        const targetHead = window.parent ? window.parent.document.head : document.head;
        const metas = [
          { name: "apple-mobile-web-app-capable", content: "yes" },
          { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
          { name: "mobile-web-app-capable", content: "yes" },
          { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" } 
        ];
        metas.forEach(m => {
          let existingTag = targetHead.querySelector(`meta[name="${m.name}"]`);
          if (!existingTag) {
          existingTag = document.createElement('meta');
          existingTag.name = m.name;
          targetHead.appendChild(existingTag);
          }
          existingTag.content = m.content;
        });
    };
    setupFullscreenWebAppData();

    function bindUpload(boxId, fileId, isBg, callback) {
        const box = document.getElementById(boxId);
        const file = document.getElementById(fileId);
        if (box && file) {
          box.onclick = () => file.click();
          file.onchange = e => {
          let f = e.target.files[0];
          if (!f) return;
          let reader = new FileReader();
          reader.onload = ev => {
          if (isBg) box.style.backgroundImage = `url(${ev.target.result})`;
          if (callback) callback(ev.target.result);
          };
          reader.readAsDataURL(f);
          };
        }
    }
    bindUpload('censyCoverUpload', 'censyFileCover', true);
    bindUpload('censyAvatarUpload', 'censyFileAvatar', false, res => { document.getElementById('censyAvatarUpload').innerHTML = `<img src="${res}">`; });
    bindUpload('censyPhotoBox', 'censyPhotoFile', false, res => {
        const photoImg = document.getElementById('censyPhotoImg');
        const placeholder = document.querySelector('#censyPhotoBox .censy-placeholder');
        if(photoImg) { photoImg.src = res; photoImg.style.display = 'block'; }
        if(placeholder) placeholder.style.display = 'none';
    });
    bindUpload('censyPspScreenWrap', 'censyPspUpload', false, res => {
        const pspShowImg = document.getElementById('censyPspShowImg');
        const pspScreenText = document.querySelector('#censyPspScreenWrap .screen-text');
        if(pspShowImg) { pspShowImg.src = res; pspShowImg.style.display = 'block'; }
        if(pspScreenText) pspScreenText.style.display = 'none';
    });
    bindUpload('censyIscreenBox', 'censyIscreenUpload', false, res => {
        const img = document.getElementById('censyIscreenImg');
        const txt = document.querySelector('#censyIscreenBox .censy-iscreen-placeholder');
        if(img) { img.src = res; img.style.display = 'block'; }
        if(txt) txt.style.display = 'none';
    });
    bindUpload('censyIscreenBox2', 'censyIscreenUpload2', false, res => {
        const img = document.getElementById('censyIscreenImg2');
        const txt = document.querySelector('#censyIscreenBox2 .censy-iscreen-placeholder');
        if(img) { img.src = res; img.style.display = 'block'; }
        if(txt) txt.style.display = 'none';
    });
    bindUpload('censyP3Card1', 'censyP3Up1', false, res => {
        const img = document.getElementById('censyP3Img1');
        const txt = document.querySelector('#censyP3Card1 span');
        if(img) { img.src = res; img.style.display = 'block'; }
        if(txt) txt.style.display = 'none';
    });
    bindUpload('censyP3Card2', 'censyP3Up2', false, res => {
        const img = document.getElementById('censyP3Img2');
        const txt = document.querySelector('#censyP3Card2 span');
        if(img) { img.src = res; img.style.display = 'block'; }
        if(txt) txt.style.display = 'none';
    });
    bindUpload('censyP3Card3', 'censyP3Up3', false, res => {
        const img = document.getElementById('censyP3Img3');
        const txt = document.querySelector('#censyP3Card3 span');
        if(img) { img.src = res; img.style.display = 'block'; }
        if(txt) txt.style.display = 'none';
    });

    // === 新顶部卡片交互 ===
    // 封面图上传
    const neoCoverUpload = document.getElementById('neoCoverUpload');
    const neoCoverFile = document.getElementById('neoCoverFile');
    const neoCoverImg = document.getElementById('neoCoverImg');
    if (neoCoverUpload && neoCoverFile) {
        neoCoverUpload.addEventListener('click', () => neoCoverFile.click());
        neoCoverFile.addEventListener('change', (e) => {
            let f = e.target.files[0];
            if (!f) return;
            let reader = new FileReader();
            reader.onload = ev => {
                if (neoCoverImg) {
                    neoCoverImg.src = ev.target.result;
                    neoCoverImg.style.display = 'block';
                }
            };
            reader.readAsDataURL(f);
        });
    }

    // 头像上传
    const neoAvatarUpload = document.getElementById('neoAvatarUpload');
    const neoAvatarFile = document.getElementById('neoAvatarFile');
    const neoAvatarImg = document.getElementById('neoAvatarImg');
    if (neoAvatarUpload && neoAvatarFile) {
        neoAvatarUpload.addEventListener('click', () => neoAvatarFile.click());
        neoAvatarFile.addEventListener('change', (e) => {
            let f = e.target.files[0];
            if (!f) return;
            let reader = new FileReader();
            reader.onload = ev => {
                if (neoAvatarImg) {
                    neoAvatarImg.src = ev.target.result;
                    neoAvatarImg.style.display = 'block';
                }
            };
            reader.readAsDataURL(f);
        });
    }

    // 定位图标上传
    const neoLocIcon = document.getElementById('neoLocIcon');
    const neoLocIconFile = document.getElementById('neoLocIconFile');
    if (neoLocIcon && neoLocIconFile) {
        neoLocIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            neoLocIconFile.click();
        });
        neoLocIconFile.addEventListener('change', (e) => {
            let f = e.target.files[0];
            if (!f) return;
            let reader = new FileReader();
            reader.onload = ev => {
                neoLocIcon.innerHTML = `<img src="${ev.target.result}" style="width:14px;height:14px;object-fit:cover;border-radius:50%;">`;
            };
            reader.readAsDataURL(f);
        });
    }

    // 双击编辑文字功能
    function setupDoubleClickEdit(elementId) {
        const el = document.getElementById(elementId);
        if (!el) return;
        el.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            const originalText = this.innerText;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = originalText;
            input.style.cssText = `
                width: 100%;
                border: 1px solid #d0d0d4;
                outline: none;
                padding: 6px 10px;
                font-size: inherit;
                font-weight: inherit;
                color: inherit;
                text-align: center;
                background: #fafafa;
                border-radius: 8px;
                font-family: inherit;
                letter-spacing: inherit;
                box-sizing: border-box;
            `;
            this.innerHTML = '';
            this.appendChild(input);
            input.focus();
            input.select();

            const finishEdit = () => {
                const newText = input.value.trim() || originalText;
                this.innerText = newText;
            };

            input.addEventListener('blur', finishEdit);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    input.blur();
                }
                if (e.key === 'Escape') {
                    input.value = originalText;
                    input.blur();
                }
            });
            input.addEventListener('click', (e) => e.stopPropagation());
        });
    }

    setupDoubleClickEdit('neoUsername');
    setupDoubleClickEdit('neoUserid');
    setupDoubleClickEdit('neoSignature');
    setupDoubleClickEdit('neoLocation');
    setupDoubleClickEdit('neoFooterLabel');

    // 背景俄语文字双击编辑
    const neoRussianText = document.querySelector('.neo-russian-text');
    if (neoRussianText) {
        neoRussianText.style.cursor = 'text';
        neoRussianText.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            const textEls = this.querySelectorAll('text');
            const originalTexts = Array.from(textEls).map(t => t.textContent);
            const originalY = Array.from(textEls).map(t => t.getAttribute('y'));
            const originalX = Array.from(textEls).map(t => t.getAttribute('x'));

            const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
            foreignObject.setAttribute('x', '120');
            foreignObject.setAttribute('y', '48');
            foreignObject.setAttribute('width', '170');
            foreignObject.setAttribute('height', '65');

            const div = document.createElement('div');
            div.style.cssText = 'display:flex;flex-direction:column;gap:4px;align-items:flex-end;';

            const input1 = document.createElement('input');
            input1.type = 'text';
            input1.value = originalTexts[0];
            input1.style.cssText = 'width:100%;border:1px solid #aaa;background:rgba(255,255,255,0.9);padding:2px 4px;font-family:Georgia,serif;font-style:italic;font-size:13px;color:#555;outline:none;text-align:right;';

            const input2 = document.createElement('input');
            input2.type = 'text';
            input2.value = originalTexts[1];
            input2.style.cssText = 'width:100%;border:1px solid #aaa;background:rgba(255,255,255,0.9);padding:2px 4px;font-family:Georgia,serif;font-style:italic;font-size:16px;color:#555;outline:none;text-align:right;';

            div.appendChild(input1);
            div.appendChild(input2);
            foreignObject.appendChild(div);

            textEls.forEach(t => t.style.display = 'none');
            this.appendChild(foreignObject);
            input1.focus();
            input1.select();

            const finishEdit = () => {
                textEls[0].textContent = input1.value || originalTexts[0];
                textEls[1].textContent = input2.value || originalTexts[1];
                textEls.forEach(t => t.style.display = 'block');
                foreignObject.remove();
            };

            input2.addEventListener('blur', finishEdit);
            input2.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') input2.blur();
                if (e.key === 'Escape') {
                    input1.value = originalTexts[0];
                    input2.value = originalTexts[1];
                    input2.blur();
                }
            });
            input1.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') input2.focus();
            });
        });
    }

    // === PVC证件卡交互 ===
    const pvcAvatarBox = document.getElementById('pvcAvatarBox');
    const pvcAvatarFile = document.getElementById('pvcAvatarFile');
    const pvcAvatarImg = document.getElementById('pvcAvatarImg');
    if (pvcAvatarBox && pvcAvatarFile) {
        pvcAvatarBox.addEventListener('click', () => pvcAvatarFile.click());
        pvcAvatarFile.addEventListener('change', (e) => {
            let f = e.target.files[0];
            if (!f) return;
            let reader = new FileReader();
            reader.onload = ev => {
                if (pvcAvatarImg) {
                    pvcAvatarImg.src = ev.target.result;
                    pvcAvatarImg.style.display = 'block';
                }
            };
            reader.readAsDataURL(f);
        });
    }

    // PVC卡片文字双击编辑
    function setupPvcDoubleClickEdit(elementId) {
        const el = document.getElementById(elementId);
        if (!el) return;
        el.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            const originalText = this.innerText;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = originalText;
            input.style.cssText = `
                width: 100%;
                border: 1px solid #d0d0d4;
                outline: none;
                padding: 2px 4px;
                font-size: 9px;
                color: #a0a0a8;
                background: #fafafa;
                border-radius: 4px;
                font-family: inherit;
                letter-spacing: inherit;
                box-sizing: border-box;
            `;
            this.innerHTML = '';
            this.appendChild(input);
            input.focus();
            input.select();

            const finishEdit = () => {
                const newText = input.value.trim() || originalText;
                this.innerText = newText;
            };

            input.addEventListener('blur', finishEdit);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') input.blur();
                if (e.key === 'Escape') {
                    input.value = originalText;
                    input.blur();
                }
            });
            input.addEventListener('click', (e) => e.stopPropagation());
        });
    }

    setupPvcDoubleClickEdit('pvcText1');
    setupPvcDoubleClickEdit('pvcText2');
    setupPvcDoubleClickEdit('pvcText3');

    // === 雪花主题卡片交互 ===
    // 头像上传
    const snowAvatar = document.getElementById('snowAvatar');
    const snowAvatarFile = document.getElementById('snowAvatarFile');
    const snowAvatarImg = document.getElementById('snowAvatarImg');
    if (snowAvatar && snowAvatarFile) {
        snowAvatar.addEventListener('click', () => snowAvatarFile.click());
        snowAvatarFile.addEventListener('change', (e) => {
            let f = e.target.files[0];
            if (!f) return;
            let reader = new FileReader();
            reader.onload = ev => {
                if (snowAvatarImg) {
                    snowAvatarImg.src = ev.target.result;
                    snowAvatarImg.style.display = 'block';
                }
            };
            reader.readAsDataURL(f);
        });
    }

    // 四个按钮图标上传
    function setupSnowIconUpload(iconId, fileId, imgId) {
        const iconEl = document.getElementById(iconId);
        const fileEl = document.getElementById(fileId);
        const imgEl = document.getElementById(imgId);
        if (!iconEl || !fileEl) return;
        iconEl.addEventListener('click', (e) => {
            e.stopPropagation();
            fileEl.click();
        });
        fileEl.addEventListener('change', (e) => {
            let f = e.target.files[0];
            if (!f) return;
            let reader = new FileReader();
            reader.onload = ev => {
                if (imgEl) {
                    imgEl.src = ev.target.result;
                    imgEl.style.display = 'block';
                }
            };
            reader.readAsDataURL(f);
        });
    }

    setupSnowIconUpload('snowIcon1', 'snowIconFile1', 'snowIconImg1');
    setupSnowIconUpload('snowIcon2', 'snowIconFile2', 'snowIconImg2');
    setupSnowIconUpload('snowIcon3', 'snowIconFile3', 'snowIconImg3');
    setupSnowIconUpload('snowIcon4', 'snowIconFile4', 'snowIconImg4');

    // 双击编辑文字
    function setupSnowDoubleClickEdit(elementId, fontSize, color) {
        const el = document.getElementById(elementId);
        if (!el) return;
        el.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            const originalText = this.innerText;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = originalText;
            input.style.cssText = `
                width: 100%;
                border: 1px solid #d0d0d4;
                outline: none;
                padding: 4px 8px;
                font-size: ${fontSize || '16px'};
                color: ${color || '#5a5a60'};
                background: rgba(255,255,255,0.9);
                border-radius: 8px;
                font-family: inherit;
                letter-spacing: inherit;
                box-sizing: border-box;
            `;
            this.innerHTML = '';
            this.appendChild(input);
            input.focus();
            input.select();

            const finishEdit = () => {
                const newText = input.value.trim() || originalText;
                this.innerText = newText;
            };

            input.addEventListener('blur', finishEdit);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') input.blur();
                if (e.key === 'Escape') {
                    input.value = originalText;
                    input.blur();
                }
            });
            input.addEventListener('click', (e) => e.stopPropagation());
        });
    }

    setupSnowDoubleClickEdit('snowText1', '16px', '#5a5a60');
    setupSnowDoubleClickEdit('snowText2', '16px', '#5a5a60');
    setupSnowDoubleClickEdit('snowText3', '16px', '#5a5a60');
    setupSnowDoubleClickEdit('snowText4', '16px', '#5a5a60');
    setupSnowDoubleClickEdit('snowDivider', '14px', '#b0b0b8');
    setupSnowDoubleClickEdit('snowBottomText', '18px', '#2a2a30');

    const pagesContainer = document.getElementById('censyPagesContainer');
    const dots = document.querySelectorAll('#censyPageDots .censy-dot');
    if (pagesContainer && dots.length > 0) {
        pagesContainer.addEventListener('scroll', () => {
          const scrollLeft = pagesContainer.scrollLeft;
          const width = pagesContainer.offsetWidth;
          if(width === 0) return;
          const index = Math.round(scrollLeft / width);
          dots.forEach((dot, i) => { if (i === index) dot.classList.add('active'); else dot.classList.remove('active'); });
        });
    }

    const settingsBtn = document.getElementById('censySettingsDockBtn');
    const settingsPanel = document.getElementById('censySettingsPanel');
    const closeSettings = document.getElementById('censyCloseSettings');
    const bgBtn = document.getElementById('censyBgBtn');
    const globalBgUpload = document.getElementById('censyGlobalBgUpload');
    const phoneMain = document.getElementById('censyPhoneMain');
    const iconList = document.getElementById('censyIconList');
    const globalIconUpload = document.getElementById('censyGlobalIconUpload');
    let currentIconTarget = null;

    function populateAppList() {
        if(!iconList) return;
        iconList.innerHTML = '';
        const allApps = document.querySelectorAll('.censy-app-item, .censy-dock-item');
        allApps.forEach(app => {
          const nameEl = app.querySelector('.censy-app-name, .censy-dock-name');
          const iconWrap = app.querySelector('.censy-app-icon, .censy-dock-icon');
          if(nameEl && iconWrap) {
          const appName = nameEl.innerText || nameEl.textContent;
          if(appName === "设置") return; 
          const div = document.createElement('div');
          div.className = 'censy-settings-app-item';
          div.innerHTML = `<span>${appName}</span><button>更换</button>`;
          div.onclick = () => { currentIconTarget = iconWrap; globalIconUpload.click(); };
          iconList.appendChild(div);
          }
        });
    }

    if(settingsBtn && settingsPanel && closeSettings) {
        settingsBtn.addEventListener('click', () => { settingsPanel.classList.add('show'); populateAppList(); });
        closeSettings.addEventListener('click', () => { settingsPanel.classList.remove('show'); });
    }
    if(bgBtn && globalBgUpload && phoneMain) {
        bgBtn.addEventListener('click', () => globalBgUpload.click());
        globalBgUpload.addEventListener('change', (e) => {
          let f = e.target.files[0];
          if(!f) return;
          let reader = new FileReader();
          reader.onload = ev => { phoneMain.style.backgroundImage = `url(${ev.target.result})`; };
          reader.readAsDataURL(f);
        });
    }
    if(globalIconUpload) {
        globalIconUpload.addEventListener('change', (e) => {
          let f = e.target.files[0];
          if(!f || !currentIconTarget) return;
          let reader = new FileReader();
          reader.onload = ev => { currentIconTarget.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;display:block;">`; };
          reader.readAsDataURL(f);
        });
    }
})();

/* ============================================
   Meituan Food Delivery App
   ============================================ */

// 美团APP数据 - Ins风格高级版
const mtData = {
    categories: [
        { id: 'all', name: '全部', icon: '🍽️', color: '#FF6B6B' },
        { id: 'rice', name: '米饭', icon: '🍚', color: '#E8A87C' },
        { id: 'noodle', name: '面食', icon: '🍜', color: '#C38D9E' },
        { id: 'snack', name: '小吃', icon: '🍢', color: '#E27D60' },
        { id: 'drink', name: '饮品', icon: '🥤', color: '#85DCBA' },
        { id: 'dessert', name: '甜品', icon: '🍰', color: '#F8B195' },
        { id: 'fastfood', name: '快餐', icon: '🍔', color: '#F67280' },
        { id: 'hotpot', name: '火锅', icon: '🍲', color: '#C06C84' },
        { id: 'bbq', name: '烧烤', icon: '🍖', color: '#6C5B7B' },
        { id: 'seafood', name: '海鲜', icon: '🦐', color: '#355C7D' }
    ],
    stores: [
        { id: 1, name: '慢食光 · 精致简餐', category: 'rice', rating: 4.9, orders: 2856, deliveryTime: 28, deliveryFee: 4, minOrder: 25, banner: 'linear-gradient(135deg, #FFF5EB 0%, #FFE4CC 100%)', tag: '品牌认证', desc: '甄选优质食材，慢工出细活', distance: '1.2km' },
        { id: 10, name: '饭香门第', category: 'rice', rating: 4.6, orders: 2345, deliveryTime: 30, deliveryFee: 4, minOrder: 22, banner: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 100%)', tag: '经济实惠', desc: '家常味道，温暖你的胃', distance: '1.0km' },
        { id: 13, name: '米之味 · 煲仔饭', category: 'rice', rating: 4.7, orders: 1876, deliveryTime: 35, deliveryFee: 5, minOrder: 28, banner: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)', tag: '锅巴香脆', desc: '广式煲仔饭，锅巴金黄香脆', distance: '1.6km' },
        { id: 14, name: '盖饭之王', category: 'rice', rating: 4.5, orders: 3241, deliveryTime: 25, deliveryFee: 3, minOrder: 18, banner: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', tag: '分量足', desc: '量大实惠，管饱又好吃', distance: '0.7km' },
        { id: 15, name: '咖喱博士', category: 'rice', rating: 4.8, orders: 1567, deliveryTime: 32, deliveryFee: 5, minOrder: 30, banner: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)', tag: '日式咖喱', desc: '日式咖喱，浓郁香醇', distance: '2.0km' },
        { id: 16, name: '隆江猪脚饭', category: 'rice', rating: 4.6, orders: 2890, deliveryTime: 22, deliveryFee: 3, minOrder: 20, banner: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', tag: '肥瘦相间', desc: '正宗隆江猪脚饭，软烂入味', distance: '0.9km' },
        { id: 17, name: '三文鱼丼饭屋', category: 'rice', rating: 4.9, orders: 987, deliveryTime: 38, deliveryFee: 6, minOrder: 45, banner: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', tag: '新鲜刺身', desc: '新鲜三文鱼，日式丼饭', distance: '2.8km' },
        { id: 2, name: '面道 · 手作拉面', category: 'noodle', rating: 4.8, orders: 1923, deliveryTime: 32, deliveryFee: 5, minOrder: 20, banner: 'linear-gradient(135deg, #F5F0EB 0%, #E8DFD5 100%)', tag: '人气爆款', desc: '传承三代的手工面条技艺', distance: '0.8km' },
        { id: 11, name: '一碗阳春', category: 'noodle', rating: 4.5, orders: 1456, deliveryTime: 28, deliveryFee: 4, minOrder: 18, banner: 'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)', tag: '清淡爽口', desc: '一碗好面，简单纯粹', distance: '1.4km' },
        { id: 18, name: '兰州牛肉面', category: 'noodle', rating: 4.7, orders: 2345, deliveryTime: 25, deliveryFee: 4, minOrder: 22, banner: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)', tag: '一清二白', desc: '正宗兰州拉面，汤鲜面筋', distance: '1.1km' },
        { id: 19, name: '重庆小面', category: 'noodle', rating: 4.6, orders: 1876, deliveryTime: 28, deliveryFee: 4, minOrder: 18, banner: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)', tag: '麻辣鲜香', desc: '地道重庆味，麻辣过瘾', distance: '1.3km' },
        { id: 20, name: '老北京炸酱面', category: 'noodle', rating: 4.5, orders: 1234, deliveryTime: 30, deliveryFee: 5, minOrder: 25, banner: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)', tag: '地道老北京', desc: '酱香浓郁，面条劲道', distance: '1.7km' },
        { id: 21, name: '螺蛳粉研究所', category: 'noodle', rating: 4.8, orders: 3456, deliveryTime: 22, deliveryFee: 3, minOrder: 20, banner: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 100%)', tag: '臭香四溢', desc: '正宗柳州螺蛳粉，酸笋够味', distance: '0.6km' },
        { id: 22, name: '武汉热干面', category: 'noodle', rating: 4.4, orders: 1567, deliveryTime: 20, deliveryFee: 3, minOrder: 15, banner: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)', tag: '芝麻酱香', desc: '武汉风味，芝麻酱浓郁', distance: '1.5km' },
        { id: 3, name: '巷子里的味道', category: 'snack', rating: 4.7, orders: 3241, deliveryTime: 22, deliveryFee: 3, minOrder: 15, banner: 'linear-gradient(135deg, #FFE8E8 0%, #FFD4D4 100%)', tag: '新店特惠', desc: '藏在巷子里的老味道', distance: '1.5km' },
        { id: 12, name: '炸物研究所', category: 'snack', rating: 4.8, orders: 2678, deliveryTime: 20, deliveryFee: 3, minOrder: 16, banner: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)', tag: '酥脆可口', desc: '金黄酥脆，一口满足', distance: '0.9km' },
        { id: 23, name: '关东煮小屋', category: 'snack', rating: 4.6, orders: 1890, deliveryTime: 18, deliveryFee: 2, minOrder: 12, banner: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', tag: '暖身暖胃', desc: '日式关东煮，汤鲜味美', distance: '0.5km' },
        { id: 24, name: '煎饼果子来一套', category: 'snack', rating: 4.7, orders: 2567, deliveryTime: 15, deliveryFee: 2, minOrder: 10, banner: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)', tag: '天津风味', desc: '正宗天津煎饼果子，薄脆香酥', distance: '0.4km' },
        { id: 25, name: '钵钵鸡', category: 'snack', rating: 4.5, orders: 1456, deliveryTime: 25, deliveryFee: 4, minOrder: 20, banner: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', tag: '藤椒麻辣', desc: '四川钵钵鸡，麻辣鲜香', distance: '1.2km' },
        { id: 26, name: '章鱼小丸子专门店', category: 'snack', rating: 4.8, orders: 2134, deliveryTime: 22, deliveryFee: 3, minOrder: 15, banner: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', tag: '章鱼足大', desc: '日式章鱼小丸子，木鱼花海苔', distance: '1.0km' },
        { id: 27, name: '臭豆腐大王', category: 'snack', rating: 4.3, orders: 1789, deliveryTime: 20, deliveryFee: 3, minOrder: 12, banner: 'linear-gradient(135deg, #F5F5F5 0%, #EEEEEE 100%)', tag: '闻臭吃香', desc: '长沙臭豆腐，外酥里嫩', distance: '0.8km' },
        { id: 4, name: '茶研社', category: 'drink', rating: 4.9, orders: 4562, deliveryTime: 18, deliveryFee: 2, minOrder: 12, banner: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', tag: '网红打卡', desc: '原叶鲜萃，天然好味道', distance: '0.6km' },
        { id: 28, name: '喜茶同款', category: 'drink', rating: 4.8, orders: 3892, deliveryTime: 20, deliveryFee: 3, minOrder: 15, banner: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)', tag: '芝士奶盖', desc: '浓郁芝士奶盖，茶香四溢', distance: '0.7km' },
        { id: 29, name: '蜜雪冰城', category: 'drink', rating: 4.6, orders: 5678, deliveryTime: 15, deliveryFee: 1, minOrder: 8, banner: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)', tag: '性价比高', desc: '你爱我我爱你，蜜雪冰城甜蜜蜜', distance: '0.3km' },
        { id: 30, name: '瑞幸咖啡', category: 'drink', rating: 4.7, orders: 4321, deliveryTime: 22, deliveryFee: 3, minOrder: 18, banner: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', tag: '年轻首选', desc: 'luckin coffee，专业咖啡新鲜式', distance: '0.9km' },
        { id: 31, name: '古茗茶饮', category: 'drink', rating: 4.8, orders: 3456, deliveryTime: 18, deliveryFee: 2, minOrder: 12, banner: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 100%)', tag: '鲜果茶', desc: '每天一杯，喝不腻的好茶', distance: '0.5km' },
        { id: 32, name: '沪上阿姨', category: 'drink', rating: 4.6, orders: 2890, deliveryTime: 20, deliveryFee: 2, minOrder: 10, banner: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 100%)', tag: '血糯米', desc: '现煮五谷茶，好喝又健康', distance: '1.1km' },
        { id: 33, name: 'COCO都可', category: 'drink', rating: 4.5, orders: 3123, deliveryTime: 16, deliveryFee: 2, minOrder: 12, banner: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)', tag: '经典奶茶', desc: '经典好味道，珍珠奶茶', distance: '0.8km' },
        { id: 5, name: '蜜时 · 法式甜点', category: 'dessert', rating: 4.8, orders: 1678, deliveryTime: 35, deliveryFee: 6, minOrder: 30, banner: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 100%)', tag: '甄选好店', desc: '来自巴黎的甜蜜滋味', distance: '2.1km' },
        { id: 34, name: '好利来', category: 'dessert', rating: 4.9, orders: 2345, deliveryTime: 28, deliveryFee: 5, minOrder: 35, banner: 'linear-gradient(135deg, #FFE0B2 0%, #FFCC80 100%)', tag: '品牌连锁', desc: '甜品界的爱马仕，半熟芝士', distance: '1.5km' },
        { id: 35, name: '鲍师傅糕点', category: 'dessert', rating: 4.7, orders: 1890, deliveryTime: 30, deliveryFee: 5, minOrder: 28, banner: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)', tag: '肉松小贝', desc: '肉松小贝，一口爆浆', distance: '1.8km' },
        { id: 36, name: '满记甜品', category: 'dessert', rating: 4.6, orders: 1456, deliveryTime: 32, deliveryFee: 6, minOrder: 32, banner: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)', tag: '港式甜品', desc: '香港经典甜品，杨枝甘露', distance: '2.0km' },
        { id: 37, name: '元祖蛋糕', category: 'dessert', rating: 4.8, orders: 987, deliveryTime: 40, deliveryFee: 8, minOrder: 50, banner: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', tag: '精致蛋糕', desc: '精致生日蛋糕，送礼首选', distance: '2.5km' },
        { id: 38, name: '甜丫丫西点', category: 'dessert', rating: 4.5, orders: 1678, deliveryTime: 25, deliveryFee: 4, minOrder: 20, banner: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 100%)', tag: '平价西点', desc: '好吃不贵的西点面包', distance: '1.2km' },
        { id: 39, name: '鲜芋仙', category: 'dessert', rating: 4.7, orders: 1234, deliveryTime: 28, deliveryFee: 5, minOrder: 25, banner: 'linear-gradient(135deg, #F1F8E9 0%, #DCEDC8 100%)', tag: '芋圆Q弹', desc: '台式芋圆甜品，Q弹爽口', distance: '1.6km' },
        { id: 6, name: 'BURGER LAB', category: 'fastfood', rating: 4.6, orders: 2134, deliveryTime: 25, deliveryFee: 5, minOrder: 28, banner: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)', tag: '人气新品', desc: '手工现做美式汉堡', distance: '1.8km' },
        { id: 40, name: '麦当劳', category: 'fastfood', rating: 4.8, orders: 6789, deliveryTime: 20, deliveryFee: 4, minOrder: 20, banner: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', tag: '全球连锁', desc: 'I\'m lovin\' it', distance: '0.8km' },
        { id: 41, name: '肯德基', category: 'fastfood', rating: 4.7, orders: 5678, deliveryTime: 22, deliveryFee: 4, minOrder: 22, banner: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)', tag: '原味鸡', desc: '有了肯德基，生活好滋味', distance: '1.0km' },
        { id: 42, name: '德克士', category: 'fastfood', rating: 4.5, orders: 3456, deliveryTime: 25, deliveryFee: 4, minOrder: 20, banner: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)', tag: '脆皮炸鸡', desc: '脆皮炸鸡，咔滋咔滋', distance: '1.3km' },
        { id: 43, name: '华莱士', category: 'fastfood', rating: 4.4, orders: 4567, deliveryTime: 18, deliveryFee: 2, minOrder: 15, banner: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', tag: '性价比高', desc: '国货汉堡品牌，实惠好吃', distance: '0.6km' },
        { id: 44, name: '塔斯汀 · 中国汉堡', category: 'fastfood', rating: 4.6, orders: 2890, deliveryTime: 22, deliveryFee: 3, minOrder: 18, banner: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', tag: '中国汉堡', desc: '中国汉堡，手擀现烤', distance: '0.9km' },
        { id: 45, name: '赛百味', category: 'fastfood', rating: 4.5, orders: 1678, deliveryTime: 20, deliveryFee: 5, minOrder: 25, banner: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', tag: '健康轻食', desc: '新鲜蔬菜三明治，健康选择', distance: '1.5km' },
        { id: 7, name: '麻辣空间', category: 'hotpot', rating: 4.9, orders: 3892, deliveryTime: 45, deliveryFee: 8, minOrder: 68, banner: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', tag: '品牌连锁', desc: '正宗川味，麻辣鲜香', distance: '2.5km' },
        { id: 46, name: '海底捞火锅', category: 'hotpot', rating: 4.9, orders: 5678, deliveryTime: 50, deliveryFee: 10, minOrder: 88, banner: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', tag: '服务好', desc: '服务至上，快乐火锅', distance: '3.0km' },
        { id: 47, name: '呷哺呷哺', category: 'hotpot', rating: 4.7, orders: 3456, deliveryTime: 40, deliveryFee: 7, minOrder: 58, banner: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 100%)', tag: '一人一锅', desc: '一人一锅，干净卫生', distance: '2.0km' },
        { id: 48, name: '小龙坎老火锅', category: 'hotpot', rating: 4.8, orders: 4123, deliveryTime: 48, deliveryFee: 9, minOrder: 78, banner: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', tag: '正宗川味', desc: '地道老火锅，麻辣鲜香', distance: '2.8km' },
        { id: 49, name: '大斌家串串火锅', category: 'hotpot', rating: 4.6, orders: 2890, deliveryTime: 35, deliveryFee: 6, minOrder: 48, banner: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)', tag: '串串火锅', desc: '串串香火锅，想吃什么拿什么', distance: '1.8km' },
        { id: 50, name: '潮汕牛肉火锅', category: 'hotpot', rating: 4.7, orders: 2345, deliveryTime: 42, deliveryFee: 8, minOrder: 68, banner: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', tag: '新鲜牛肉', desc: '潮汕风味，现切鲜牛肉', distance: '2.3km' },
        { id: 51, name: '椰子鸡火锅', category: 'hotpot', rating: 4.8, orders: 1876, deliveryTime: 45, deliveryFee: 8, minOrder: 78, banner: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', tag: '清淡养生', desc: '海南椰子鸡，清甜鲜美', distance: '2.6km' },
        { id: 8, name: '烟火烤物', category: 'bbq', rating: 4.7, orders: 1567, deliveryTime: 38, deliveryFee: 6, minOrder: 35, banner: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)', tag: '深夜食堂', desc: '炭火慢烤，人间烟火', distance: '1.9km' },
        { id: 52, name: '木屋烧烤', category: 'bbq', rating: 4.8, orders: 3456, deliveryTime: 35, deliveryFee: 6, minOrder: 40, banner: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', tag: '连锁品牌', desc: '把烧烤做到极致', distance: '1.5km' },
        { id: 53, name: '烤匠麻辣烤鱼', category: 'bbq', rating: 4.7, orders: 2890, deliveryTime: 40, deliveryFee: 7, minOrder: 58, banner: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)', tag: '烤鱼专家', desc: '专注烤鱼，麻辣鲜香', distance: '2.0km' },
        { id: 54, name: '探鱼', category: 'bbq', rating: 4.6, orders: 2345, deliveryTime: 42, deliveryFee: 7, minOrder: 68, banner: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', tag: '文艺烤鱼', desc: '最文艺的烤鱼店', distance: '2.2km' },
        { id: 55, name: '很久以前羊肉串', category: 'bbq', rating: 4.9, orders: 3123, deliveryTime: 38, deliveryFee: 8, minOrder: 58, banner: 'linear-gradient(135deg, #FCE4EC 0%, #F8BBD9 100%)', tag: '草原羊肉', desc: '来自大草原的羊肉串', distance: '2.4km' },
        { id: 56, name: '丰茂烤串', category: 'bbq', rating: 4.7, orders: 2567, deliveryTime: 35, deliveryFee: 6, minOrder: 45, banner: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)', tag: '现穿现烤', desc: '现穿的烤串才够味', distance: '1.7km' },
        { id: 57, name: '何师烧烤', category: 'bbq', rating: 4.5, orders: 1890, deliveryTime: 32, deliveryFee: 5, minOrder: 38, banner: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', tag: '川味烧烤', desc: '四川风味，麻辣烧烤', distance: '1.4km' },
        { id: 9, name: '鲜入为主', category: 'seafood', rating: 4.8, orders: 987, deliveryTime: 50, deliveryFee: 12, minOrder: 88, banner: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', tag: '鲜活直达', desc: '每日新鲜直供海鲜', distance: '3.2km' },
        { id: 58, name: '盒马鲜生', category: 'seafood', rating: 4.9, orders: 4567, deliveryTime: 30, deliveryFee: 6, minOrder: 39, banner: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', tag: '新鲜直达', desc: '鲜美生活，盒马鲜生', distance: '1.2km' },
        { id: 59, name: '七欣天品蟹轩', category: 'seafood', rating: 4.7, orders: 2345, deliveryTime: 45, deliveryFee: 10, minOrder: 78, banner: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)', tag: '蟹肉煲', desc: '迷宗蟹，好吃到舔手指', distance: '2.5km' },
        { id: 60, name: '蟹都汇', category: 'seafood', rating: 4.6, orders: 1567, deliveryTime: 50, deliveryFee: 12, minOrder: 98, banner: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', tag: '大闸蟹', desc: '阳澄湖大闸蟹，膏满黄肥', distance: '3.0km' },
        { id: 61, name: '海鲜遇上面', category: 'seafood', rating: 4.5, orders: 1890, deliveryTime: 35, deliveryFee: 5, minOrder: 28, banner: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', tag: '海鲜焖面', desc: '海鲜焖面，鲜香浓郁', distance: '1.8km' },
        { id: 62, name: '船歌鱼水饺', category: 'seafood', rating: 4.8, orders: 2134, deliveryTime: 38, deliveryFee: 7, minOrder: 48, banner: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', tag: '鲅鱼水饺', desc: '青岛风味，鲅鱼水饺', distance: '2.0km' },
        { id: 63, name: '小龙虾研究院', category: 'seafood', rating: 4.7, orders: 3456, deliveryTime: 40, deliveryFee: 8, minOrder: 68, banner: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', tag: '麻辣小龙虾', desc: '小龙虾配啤酒，夏天的味道', distance: '1.5km' }
    ],
    menus: {
        1: {
            categories: [
                { id: 'signature', name: '招牌推荐' },
                { id: 'rice', name: '主食套餐' },
                { id: 'side', name: '小吃配菜' }
            ],
            items: [
                { id: 101, name: '慢炖红烧肉套餐', price: 38, image: '🍖', desc: '精选五花肉慢炖2小时，入口即化', sales: 856, tag: '招牌', category: 'signature' },
                { id: 102, name: '宫保鸡丁饭', price: 28, image: '🍗', desc: '经典川菜，花生酥脆，鸡肉嫩滑', sales: 623, tag: '热销', category: 'signature' },
                { id: 103, name: '鱼香肉丝饭', price: 26, image: '🍚', desc: '酸甜微辣，下饭神器', sales: 512, category: 'rice' },
                { id: 104, name: '麻婆豆腐饭', price: 22, image: '🍲', desc: '麻辣鲜香，豆腐嫩滑', sales: 445, category: 'rice' },
                { id: 105, name: '糖醋里脊饭', price: 32, image: '🍖', desc: '外酥里嫩，酸甜适口', sales: 398, tag: '新品', category: 'rice' },
                { id: 106, name: '时蔬沙拉', price: 18, image: '🥗', desc: '新鲜时令蔬菜，低脂健康', sales: 234, category: 'side' },
                { id: 107, name: '凉拌黄瓜', price: 12, image: '🥒', desc: '清脆爽口，解腻开胃', sales: 189, category: 'side' },
                { id: 108, name: '紫菜蛋花汤', price: 8, image: '🍲', desc: '清淡鲜美，营养暖胃', sales: 267, category: 'side' }
            ]
        },
        2: [
            { id: 201, name: '招牌豚骨拉面', price: 32, image: '🍜', desc: '12小时熬制浓汤，手工拉面', sales: 1024, tag: '招牌' },
            { id: 202, name: '秘制炸酱面', price: 25, image: '🍝', desc: '老北京风味，酱香浓郁', sales: 678, tag: '热销' },
            { id: 203, name: '山西刀削面', price: 26, image: '🍜', desc: '劲道爽滑，番茄汤底', sales: 534 },
            { id: 204, name: '四川担担面', price: 24, image: '🍜', desc: '麻辣鲜香，花生碎提香', sales: 456 },
            { id: 205, name: '阳春面', price: 16, image: '🍜', desc: '清汤挂面，简单纯粹', sales: 289 }
        ],
        3: [
            { id: 301, name: '秘制炸鸡块', price: 22, image: '🍗', desc: '外酥里嫩，秘制酱料', sales: 1567, tag: '招牌' },
            { id: 302, name: '黄金薯条', price: 15, image: '🍟', desc: '比利时进口，金黄酥脆', sales: 1234 },
            { id: 303, name: '烤串拼盘', price: 35, image: '🍢', desc: '5种烤串组合，一次满足', sales: 876, tag: '热销' },
            { id: 304, name: '章鱼小丸子', price: 25, image: '🍡', desc: '日式经典，木鱼花海苔', sales: 654 },
            { id: 305, name: '港式鸡蛋仔', price: 18, image: '🧇', desc: '外脆内软，奶香浓郁', sales: 543, tag: '新品' }
        ],
        4: [
            { id: 401, name: '琥珀珍珠奶茶', price: 22, image: '🧋', desc: '手煮珍珠，锡兰红茶底', sales: 2341, tag: '招牌' },
            { id: 402, name: '杨枝甘露', price: 28, image: '🥭', desc: '新鲜芒果，西柚西米', sales: 1876, tag: '热销' },
            { id: 403, name: '手打柠檬茶', price: 18, image: '🍋', desc: '香水柠檬，现打现做', sales: 1543 },
            { id: 404, name: '燕麦拿铁', price: 26, image: '☕', desc: '精品咖啡豆，燕麦奶', sales: 987 },
            { id: 405, name: '莓莓果茶', price: 24, image: '🍓', desc: '草莓蓝莓，满满果肉', sales: 876, tag: '新品' }
        ],
        5: [
            { id: 501, name: '经典提拉米苏', price: 38, image: '🍰', desc: '意式经典，马斯卡彭芝士', sales: 456, tag: '招牌' },
            { id: 502, name: '双层芝士蛋糕', price: 35, image: '🧀', desc: '北海道风味，绵密细腻', sales: 389, tag: '热销' },
            { id: 503, name: '法式马卡龙', price: 42, image: '🍪', desc: '六颗装，六种口味', sales: 234 },
            { id: 504, name: '闪电泡芙', price: 22, image: '🥐', desc: '香草卡仕达内馅', sales: 312 },
            { id: 505, name: '意式冰淇淋', price: 28, image: '🍦', desc: '三球装，口味任选', sales: 287, tag: '新品' }
        ],
        6: [
            { id: 601, name: '经典牛肉堡', price: 32, image: '🍔', desc: '澳洲牛肉饼，车达芝士', sales: 876, tag: '招牌' },
            { id: 602, name: '香辣鸡腿堡', price: 28, image: '🍔', desc: '香辣酥脆，过瘾满足', sales: 765, tag: '热销' },
            { id: 603, name: '黄金薯条（大）', price: 18, image: '🍟', desc: '酥脆可口，配番茄酱', sales: 654 },
            { id: 604, name: '冰爽可乐', price: 10, image: '🥤', desc: '冰镇可口可乐', sales: 543 },
            { id: 605, name: '麦香鸡块', price: 22, image: '🍗', desc: '5块装，外酥里嫩', sales: 432 }
        ],
        7: [
            { id: 701, name: '经典麻辣锅底', price: 78, image: '🍲', desc: '牛油锅底，麻辣鲜香', sales: 1567, tag: '招牌' },
            { id: 702, name: '番茄牛腩锅底', price: 68, image: '🍅', desc: '番茄熬制，酸甜开胃', sales: 1234, tag: '热销' },
            { id: 703, name: '精品肥牛卷', price: 48, image: '🥩', desc: '澳洲肥牛，薄切大片', sales: 987 },
            { id: 704, name: '手打虾滑', price: 38, image: '🦐', desc: '青虾手打，Q弹爽滑', sales: 876 },
            { id: 705, name: '蔬菜拼盘', price: 32, image: '🥬', desc: '六种时令蔬菜', sales: 543 }
        ],
        8: [
            { id: 801, name: '新疆羊肉串', price: 12, image: '🍖', desc: '新疆羊肉，孜然飘香', sales: 2341, tag: '招牌' },
            { id: 802, name: '秘制烤鸡翅', price: 16, image: '🍗', desc: '蜜汁腌制，外焦里嫩', sales: 1876, tag: '热销' },
            { id: 803, name: '蒜蓉烤茄子', price: 18, image: '🍆', desc: '蒜末小米辣，鲜香入味', sales: 987 },
            { id: 804, name: '炭烤玉米', price: 12, image: '🌽', desc: '甜糯玉米，刷秘制酱', sales: 765 },
            { id: 805, name: '烤韭菜', price: 10, image: '🥬', desc: '鲜嫩韭菜，烧烤必备', sales: 654 }
        ],
        9: [
            { id: 901, name: '清蒸鲈鱼', price: 88, image: '🐟', desc: '鲜活鲈鱼，鲜嫩无比', sales: 456, tag: '招牌' },
            { id: 902, name: '蒜蓉粉丝扇贝', price: 68, image: '🐚', desc: '扇贝6只，蒜香浓郁', sales: 389, tag: '热销' },
            { id: 903, name: '椒盐皮皮虾', price: 98, image: '🦐', desc: '鲜活皮皮虾，酥脆鲜香', sales: 234 },
            { id: 904, name: '清炒时令蔬', price: 32, image: '🥬', desc: '当日时蔬，清淡健康', sales: 187 },
            { id: 905, name: '海鲜粥', price: 58, image: '🍲', desc: '虾仁瑶柱，鲜美暖胃', sales: 276, tag: '新品' }
        ],
        10: [
            { id: 1001, name: '台式卤肉饭', price: 26, image: '🍖', desc: '台湾风味，肥而不腻', sales: 876, tag: '招牌' },
            { id: 1002, name: '日式咖喱鸡饭', price: 28, image: '🍛', desc: '咖喱浓郁，鸡肉嫩滑', sales: 765, tag: '热销' },
            { id: 1003, name: '黑椒牛柳饭', price: 32, image: '🥩', desc: '黑椒香浓，牛柳嫩滑', sales: 654 },
            { id: 1004, name: '红烧排骨饭', price: 30, image: '🍖', desc: '排骨酥烂，入味三分', sales: 543 },
            { id: 1005, name: '照烧鸡腿饭', price: 25, image: '🍗', desc: '日式照烧，甜咸适口', sales: 432 }
        ],
        11: [
            { id: 1101, name: '阳春面', price: 15, image: '🍜', desc: '清汤挂面，简单纯粹', sales: 567, tag: '招牌' },
            { id: 1102, name: '葱油拌面', price: 18, image: '🍝', desc: '香葱炸油，香气四溢', sales: 456, tag: '热销' },
            { id: 1103, name: '雪菜肉丝面', price: 22, image: '🍜', desc: '雪菜提鲜，肉丝滑嫩', sales: 345 },
            { id: 1104, name: '番茄鸡蛋面', price: 20, image: '🍅', desc: '家常味道，酸甜可口', sales: 389 }
        ],
        12: [
            { id: 1201, name: '招牌炸鸡', price: 28, image: '🍗', desc: '韩式甜辣，外酥里嫩', sales: 1234, tag: '招牌' },
            { id: 1202, name: '芝士薯条', price: 20, image: '🍟', desc: '金黄薯条，芝士拉丝', sales: 987, tag: '热销' },
            { id: 1203, name: '洋葱圈', price: 16, image: '🧅', desc: '金黄酥脆，洋葱清甜', sales: 567 },
            { id: 1204, name: '鸡米花', price: 18, image: '🍿', desc: '小巧可爱，一口一个', sales: 654 }
        ]
    },
    reviews: {
        1: [
            { user: '林小满', avatar: '🌸', rating: 5, content: '红烧肉真的绝了！肥而不腻，入口即化，配上米饭超级下饭。配送也很快，拿到手还是热乎的。', time: '2小时前', likes: 128, images: 3, tags: ['味道赞', '包装好', '配送快'] },
            { user: '陈吃吃', avatar: '🍑', rating: 5, content: '宫保鸡丁是我吃过最正宗的！花生特别脆，鸡肉嫩滑，辣度刚刚好。已经是回头客了～', time: '1天前', likes: 89, images: 2, tags: ['回头客', '味道赞'] },
            { user: '美食日记', avatar: '✨', rating: 4, content: '整体不错，鱼香肉丝很下饭。就是分量可以再多点就完美了，会再来的！', time: '3天前', likes: 45, images: 0, tags: ['分量足'] },
            { user: '小饭桶', avatar: '🍚', rating: 5, content: '糖醋里脊外酥里嫩，酸甜比例刚刚好，小朋友特别爱吃。包装也很用心，没有撒漏。', time: '5天前', likes: 67, images: 4, tags: ['包装好', '孩子爱吃'] }
        ],
        2: [
            { user: '面条爱好者', avatar: '🍜', rating: 5, content: '豚骨拉面太绝了！汤底浓郁，面条劲道，溏心蛋也很完美。一口下去幸福感爆棚～', time: '1小时前', likes: 156, images: 3, tags: ['汤底浓', '面条劲道', '回头客'] },
            { user: '食客小李', avatar: '🌙', rating: 4, content: '炸酱面味道不错，就是稍微有点咸，可能是我口味比较淡吧。整体还是推荐的！', time: '2天前', likes: 34, images: 1, tags: ['味道不错'] },
            { user: '碳水教父', avatar: '💪', rating: 5, content: '刀削面太好吃了！每一根都很有嚼劲，番茄汤底酸酸甜甜的，夏天吃也很开胃。', time: '4天前', likes: 78, images: 2, tags: ['面条劲道', '开胃'] }
        ],
        3: [
            { user: '炸鸡达人', avatar: '🍗', rating: 5, content: '这家炸鸡真的绝了！外皮酥脆到掉渣，里面的肉却很嫩很多汁。秘制酱料也超好吃！', time: '3小时前', likes: 234, images: 4, tags: ['外皮酥脆', '肉质嫩', '回头客'] },
            { user: '宵夜党', avatar: '🌃', rating: 5, content: '深夜来一份烤串拼盘太幸福了！每种串都很好吃，最爱的是烤鸡翅，外焦里嫩。', time: '1天前', likes: 145, images: 3, tags: ['深夜食堂', '种类多'] },
            { user: '甜口少女', avatar: '🎀', rating: 4, content: '鸡蛋仔好好吃！外脆内软，奶香很浓。就是有点小贵，偶尔吃吃还是可以的。', time: '2天前', likes: 56, images: 2, tags: ['口感好', '奶香浓'] }
        ],
        4: [
            { user: '奶茶续命', avatar: '🧋', rating: 5, content: '珍珠奶茶YYDS！珍珠Q弹有嚼劲，茶底也很清香，不是那种齁甜的感觉。无限回购！', time: '30分钟前', likes: 312, images: 2, tags: ['珍珠Q弹', '茶底香', '无限回购'] },
            { user: '芒果控', avatar: '🥭', rating: 5, content: '杨枝甘露太好喝了！芒果肉超多，西柚的微苦刚好中和甜味，非常清爽。', time: '5小时前', likes: 198, images: 3, tags: ['料足', '清爽'] },
            { user: '柠檬精', avatar: '🍋', rating: 4, content: '手打柠檬茶很解腻，香水柠檬味道很浓。就是冰块有点多，化了之后会淡。', time: '1天前', likes: 67, images: 1, tags: ['解腻', '味道浓'] },
            { user: '咖啡日常', avatar: '☕', rating: 5, content: '燕麦拿铁很丝滑，咖啡豆的香气很足。减脂期的福音，好喝不胖！', time: '2天前', likes: 89, images: 0, tags: ['口感丝滑', '减脂友好'] }
        ],
        5: [
            { user: '甜品控', avatar: '🍰', rating: 5, content: '提拉米苏太正宗了！马斯卡彭的口感绵密，咖啡酒的味道刚刚好，完全不腻。', time: '4小时前', likes: 167, images: 4, tags: ['口感绵密', '正宗', '回购'] },
            { user: '芝士就是力量', avatar: '🧀', rating: 5, content: '双层芝士蛋糕绝了！入口即化，芝士味很浓但不会腻。配杯红茶刚刚好～', time: '1天前', likes: 123, images: 2, tags: ['芝士香浓', '不腻'] },
            { user: '法式浪漫', avatar: '🌹', rating: 4, content: '马卡龙颜值很高，颜色很漂亮。甜度可以接受，配咖啡会更好。送礼也很合适！', time: '3天前', likes: 78, images: 3, tags: ['颜值高', '适合送礼'] }
        ],
        6: [
            { user: '汉堡发烧友', avatar: '🍔', rating: 5, content: '牛肉堡太扎实了！肉饼很厚，能吃出是好牛肉。面包胚也很松软，超级满足！', time: '2小时前', likes: 145, images: 3, tags: ['肉饼厚实', '面包松软', '分量足'] },
            { user: '快餐爱好者', avatar: '🍟', rating: 4, content: '鸡腿堡很酥脆，辣度刚刚好。薯条也很好吃，就是配送时间长了点会变软。', time: '1天前', likes: 56, images: 1, tags: ['酥脆', '性价比高'] }
        ],
        7: [
            { user: '火锅侠', avatar: '🌶️', rating: 5, content: '麻辣锅底太正宗了！麻辣鲜香，越煮越有味。肥牛卷品质也很好，推荐！', time: '3小时前', likes: 234, images: 4, tags: ['锅底正宗', '食材新鲜', '回头客'] },
            { user: '番茄党', avatar: '🍅', rating: 5, content: '番茄牛腩锅底超赞！牛腩炖得很烂，汤都可以直接喝。虾滑也很Q弹～', time: '1天前', likes: 178, images: 3, tags: ['汤好喝', '虾滑Q弹'] },
            { user: '养生达人', avatar: '🥬', rating: 4, content: '蔬菜拼盘很新鲜，种类也多。一个人点个锅底加蔬菜就够了，健康又好吃。', time: '2天前', likes: 45, images: 2, tags: ['食材新鲜', '健康'] }
        ],
        8: [
            { user: '撸串小王子', avatar: '🍖', rating: 5, content: '羊肉串太香了！孜然和辣椒面配得刚刚好，肉质也很嫩。宵夜必备！', time: '1小时前', likes: 267, images: 3, tags: ['味道正宗', '肉质嫩', '宵夜首选'] },
            { user: '深夜食客', avatar: '🌙', rating: 5, content: '烤鸡翅绝了！蜜汁腌制的很入味，外面焦焦的里面嫩嫩的。一个人能吃10串！', time: '6小时前', likes: 156, images: 2, tags: ['外焦里嫩', '入味'] },
            { user: '素食主义', avatar: '🥬', rating: 4, content: '烤茄子超好吃！蒜蓉给的很足，茄子也很嫩。烤韭菜也不错，推荐！', time: '1天前', likes: 67, images: 1, tags: ['蒜蓉足', '茄子嫩'] }
        ],
        9: [
            { user: '海鲜控', avatar: '🦐', rating: 5, content: '鲈鱼很新鲜！清蒸的做法最能体现鱼的鲜味，肉质很嫩。请客也很有面子～', time: '5小时前', likes: 123, images: 4, tags: ['新鲜', '肉质嫩', '上档次'] },
            { user: '扇贝爱好者', avatar: '🐚', rating: 5, content: '蒜蓉粉丝扇贝太好吃了！扇贝很大只，粉丝也吸满了汤汁。就是价格有点小贵。', time: '2天前', likes: 89, images: 3, tags: ['个头大', '味道好'] },
            { user: '养生girl', avatar: '🍲', rating: 4, content: '海鲜粥很鲜美，料也挺足的。冬天喝一碗暖暖的，舒服！', time: '3天前', likes: 56, images: 1, tags: ['鲜美', '暖胃'] }
        ],
        10: [
            { user: '卤肉饭狂魔', avatar: '🍖', rating: 5, content: '卤肉饭太正宗了！肥而不腻，酱汁拌米饭超级下饭。每次都能吃精光～', time: '2小时前', likes: 145, images: 2, tags: ['正宗', '下饭', '回头客'] },
            { user: '咖喱控', avatar: '🍛', rating: 4, content: '咖喱鸡饭味道不错，咖喱很浓郁，鸡肉也挺多的。要是有土豆胡萝卜就更好了。', time: '1天前', likes: 67, images: 1, tags: ['咖喱浓', '分量足'] }
        ],
        11: [
            { user: '清淡饮食', avatar: '🍜', rating: 5, content: '阳春面很清爽，汤头鲜美。不舒服的时候来一碗，胃里暖暖的很舒服。', time: '4小时前', likes: 78, images: 1, tags: ['清淡', '汤鲜'] },
            { user: '葱油面爱好者', avatar: '🧅', rating: 5, content: '葱油拌面太香了！葱油炸得刚刚好，拌开来满屋都是香味。简单但美味！', time: '1天前', likes: 92, images: 2, tags: ['葱香浓郁', '简单美味'] }
        ],
        12: [
            { user: '炸鸡少女', avatar: '🍗', rating: 5, content: '韩式炸鸡太绝了！甜辣酱的味道刚刚好，外皮酥脆里面多汁。追剧必备！', time: '3小时前', likes: 189, images: 3, tags: ['外皮酥脆', '酱汁好吃', '追剧必备'] },
            { user: '芝士控', avatar: '🧀', rating: 5, content: '芝士薯条太好吃了！芝士拉丝很长，薯条也很脆。就是吃多了会有点腻～', time: '1天前', likes: 112, images: 2, tags: ['芝士拉丝', '酥脆'] }
        ]
    }
};

// 美团APP状态
const mtState = {
    currentView: 'Home',
    currentCategory: 'all',
    currentStore: null,
    cart: [],
    addresses: [],
    coupons: [],
    orders: [],
    selectedAddress: null,
    selectedCoupon: null,
    deliveryTime: '尽快送达',
    paymentMode: 'self',
    otherPayMode: 'friend',
    recipientInfo: { name: '', phone: '', address: '' }
};

// 打开美团APP
function mtOpenApp() {
    const app = document.getElementById('mtAppMain');
    if (app) {
        app.classList.add('mt-show');
        mtInitApp();
    }
}

// 关闭美团APP
function mtCloseApp() {
    const app = document.getElementById('mtAppMain');
    if (app) {
        app.classList.remove('mt-show');
    }
}

// 初始化美团APP
function mtInitApp() {
    mtLoadData();
    mtRenderCategories();
    mtRenderStores();
    mtInitTabbar();
    mtInitBanner();
}

// 加载数据
function mtLoadData() {
    const saved = localStorage.getItem('mtData');
    if (saved) {
        const data = JSON.parse(saved);
        mtState.addresses = data.addresses || [];
        mtState.coupons = data.coupons || [];
        mtState.orders = data.orders || [];
        mtState.cart = data.cart || [];
    }
    
    if (mtState.addresses.length === 0) {
        mtState.addresses = [
            { id: 1, name: '张先生', phone: '138****8888', address: '北京市朝阳区建国路88号SOHO现代城A座1205室', isDefault: true },
            { id: 2, name: '李女士', phone: '139****6666', address: '北京市海淀区中关村大街1号海龙大厦5层508室', isDefault: false }
        ];
        mtState.selectedAddress = mtState.addresses[0];
    }
    
    if (!mtState.selectedAddress && mtState.addresses.length > 0) {
        mtState.selectedAddress = mtState.addresses.find(a => a.isDefault) || mtState.addresses[0];
    }
}

// 保存数据
function mtSaveData() {
    localStorage.setItem('mtData', JSON.stringify({
        addresses: mtState.addresses,
        coupons: mtState.coupons,
        orders: mtState.orders,
        cart: mtState.cart
    }));
}

// 渲染分类
function mtRenderCategories() {
    const grid = document.getElementById('mtCategoryGrid');
    if (!grid) return;
    
    const displayCats = mtData.categories.filter(c => c.id !== 'all');
    grid.innerHTML = displayCats.map(cat => `
        <div class="mt-category-item" onclick="mtOpenCategory('${cat.id}')">
            <div class="mt-category-icon" style="background: ${cat.color}15;">
                <span style="color: ${cat.color};">${cat.icon}</span>
            </div>
            <div class="mt-category-name">${cat.name}</div>
        </div>
    `).join('');
}

// 渲染店铺列表
function mtRenderStores() {
    const list = document.getElementById('mtStoreList');
    const catList = document.getElementById('mtCategoryStoreList');
    
    const stores = mtState.currentCategory === 'all' 
        ? mtData.stores 
        : mtData.stores.filter(s => s.category === mtState.currentCategory);
    
    const html = stores.map(store => `
        <div class="mt-store-item" onclick="mtOpenStore(${store.id})">
            <div class="mt-store-banner" style="background: ${store.banner};">
                <div class="mt-store-tag">${store.tag}</div>
            </div>
            <div class="mt-store-info-wrap">
                <div class="mt-store-name-row">
                    <span class="mt-store-name">${store.name}</span>
                    <div class="mt-store-rating">
                        <span class="mt-rating-star">★</span>
                        <span class="mt-rating-score">${store.rating}</span>
                    </div>
                </div>
                <div class="mt-store-desc">${store.desc}</div>
                <div class="mt-store-meta">
                    <span>月售${store.orders}+</span>
                    <span class="mt-dot">·</span>
                    <span>${store.distance}</span>
                    <span class="mt-dot">·</span>
                    <span>${store.deliveryTime}分钟</span>
                </div>
                <div class="mt-store-footer-row">
                    <span class="mt-fee-tag">起送¥${store.minOrder}</span>
                    <span class="mt-fee-tag">配送费¥${store.deliveryFee}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    if (list) list.innerHTML = html;
    if (catList) catList.innerHTML = html;
}

// 打开分类
function mtOpenCategory(categoryId) {
    mtState.currentCategory = categoryId;
    const category = mtData.categories.find(c => c.id === categoryId);
    
    if (categoryId === 'all') {
        mtSwitchView('Home');
    } else {
        document.getElementById('mtCategoryTitle').textContent = category.name;
        mtRenderStores();
        mtSwitchView('Category');
    }
}

// 打开店铺
function mtOpenStore(storeId) {
    const store = mtData.stores.find(s => s.id === storeId);
    if (!store) return;
    
    mtState.currentStore = store;
    
    document.getElementById('mtStoreName').textContent = store.name;
    document.getElementById('mtStoreRating').textContent = store.rating;
    document.getElementById('mtStoreOrders').textContent = `月售${store.orders}+`;
    document.getElementById('mtStoreDelivery').textContent = `配送约${store.deliveryTime}分钟`;
    
    const storeHeader = document.getElementById('mtStoreHeader');
    if (storeHeader) {
        storeHeader.style.background = store.banner;
    }
    
    const storeBanner = document.getElementById('mtStoreBanner');
    if (storeBanner) {
        storeBanner.style.background = store.banner;
    }
    
    mtState.cart = mtState.cart.filter(item => item.storeId === store.id);
    mtSaveData();
    
    mtRenderMenu();
    mtRenderReviews();
    mtRenderStoreInfo();
    mtUpdateCartBar();
    mtInitStoreTabs();
    
    mtSwitchView('Store');
}

// 初始化店铺Tab切换
function mtInitStoreTabs() {
    const tabs = document.querySelectorAll('.mt-store-tab');
    const sections = {
        menu: document.getElementById('mtMenuSection'),
        reviews: document.getElementById('mtReviewsSection'),
        info: document.getElementById('mtInfoSection')
    };
    
    tabs.forEach(tab => {
        tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            Object.values(sections).forEach(s => s.classList.remove('active'));
            sections[tab.dataset.tab].classList.add('active');
        };
    });
}

// 渲染菜单
function mtRenderMenu() {
    const catList = document.getElementById('mtMenuCategories');
    const itemList = document.getElementById('mtMenuItems');
    if (!catList || !itemList || !mtState.currentStore) return;
    
    const menuData = mtData.menus[mtState.currentStore.id];
    if (!menuData) return;
    
    let categories, items;
    if (Array.isArray(menuData)) {
        categories = [{ id: 'all', name: '全部' }];
        items = menuData.map(item => ({ ...item, category: 'all' }));
    } else {
        categories = menuData.categories || [];
        items = menuData.items || [];
    }
    
    if (!mtState.currentMenuCategory && categories.length > 0) {
        mtState.currentMenuCategory = categories[0].id;
    }
    
    catList.innerHTML = categories.map(cat => `
        <div class="mt-menu-cat-item ${cat.id === mtState.currentMenuCategory ? 'active' : ''}" 
             onclick="mtSelectMenuCategory('${cat.id}')"
             data-cat="${cat.id}">
            <span>${cat.name}</span>
        </div>
    `).join('');
    
    const filteredItems = mtState.currentMenuCategory === 'all' 
        ? items 
        : items.filter(item => item.category === mtState.currentMenuCategory);
    
    itemList.innerHTML = categories.map(cat => {
        const catItems = cat.id === 'all' ? items : items.filter(item => item.category === cat.id);
        if (catItems.length === 0) return '';
        
        return `
            <div class="mt-menu-cat-section" id="mtMenuCat_${cat.id}">
                <div class="mt-menu-cat-title">
                    <span class="mt-cat-line"></span>
                    <span class="mt-cat-name">${cat.name}</span>
                    <span class="mt-cat-line"></span>
                </div>
                ${catItems.map(item => {
                    const cartItem = mtState.cart.find(c => c.id === item.id);
                    const count = cartItem ? cartItem.count : 0;
                    
                    return `
                        <div class="mt-menu-item">
                            <div class="mt-menu-img">
                                <div class="mt-menu-img-inner">${item.image}</div>
                                ${item.tag ? `<span class="mt-menu-tag ${item.tag === '招牌' ? 'signature' : item.tag === '热销' ? 'hot' : 'new'}">${item.tag}</span>` : ''}
                            </div>
                            <div class="mt-menu-info">
                                <div class="mt-menu-name">${item.name}</div>
                                <div class="mt-menu-desc">${item.desc}</div>
                                <div class="mt-menu-sales">月售${item.sales || 0}</div>
                                <div class="mt-menu-bottom">
                                    <div class="mt-menu-price">
                                        <span class="mt-price-symbol">¥</span>
                                        <span class="mt-price-num">${item.price}</span>
                                    </div>
                                    <div class="mt-menu-actions">
                                        ${count > 0 ? `
                                            <button class="mt-act-btn minus" onclick="mtRemoveFromCart(${item.id})">
                                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                            </button>
                                            <span class="mt-count">${count}</span>
                                        ` : ''}
                                        <button class="mt-act-btn plus" onclick="mtAddToCart(${item.id})">
                                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }).join('');
}

function mtSelectMenuCategory(catId) {
    mtState.currentMenuCategory = catId;
    mtRenderMenu();
    
    const section = document.getElementById(`mtMenuCat_${catId}`);
    const itemList = document.getElementById('mtMenuItems');
    if (section && itemList) {
        itemList.scrollTo({
            top: section.offsetTop - 10,
            behavior: 'smooth'
        });
    }
}

// 渲染评价
function mtRenderReviews() {
    const list = document.getElementById('mtReviewsList');
    if (!list || !mtState.currentStore) return;
    
    const reviews = mtData.reviews[mtState.currentStore.id] || [];
    const store = mtState.currentStore;
    
    const avgRating = reviews.length 
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : store.rating;
    
    const tagCounts = {};
    reviews.forEach(r => {
        (r.tags || []).forEach(t => {
            tagCounts[t] = (tagCounts[t] || 0) + 1;
        });
    });
    
    const tagsHtml = Object.entries(tagCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([tag, count]) => `<span class="mt-review-tag">${tag} (${count})</span>`)
        .join('');
    
    list.innerHTML = `
        <div class="mt-reviews-summary">
            <div class="mt-rating-big">
                <span class="mt-rating-score-big">${avgRating}</span>
                <div class="mt-rating-stars">${'★'.repeat(Math.round(avgRating))}${'☆'.repeat(5 - Math.round(avgRating))}</div>
                <div class="mt-rating-total">共 ${reviews.length} 条评价</div>
            </div>
            <div class="mt-reviews-tags">
                ${tagsHtml}
            </div>
        </div>
        ${reviews.map(review => `
            <div class="mt-review-item">
                <div class="mt-review-header">
                    <div class="mt-review-avatar">${review.avatar || '👤'}</div>
                    <div class="mt-review-user-info">
                        <div class="mt-review-username">${review.user}</div>
                        <div class="mt-review-meta">
                            <span class="mt-review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                            <span class="mt-review-time">${review.time}</span>
                        </div>
                    </div>
                </div>
                <div class="mt-review-content">${review.content}</div>
                ${review.images && review.images > 0 ? `
                    <div class="mt-review-images">
                        ${Array(review.images).fill(0).map((_, i) => `
                            <div class="mt-review-img">
                                <div class="mt-review-img-placeholder">📷</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                ${review.tags && review.tags.length > 0 ? `
                    <div class="mt-review-tags">
                        ${review.tags.map(t => `<span class="mt-review-mini-tag">${t}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="mt-review-footer">
                    <div class="mt-review-like" onclick="mtLikeReview(${review.user})">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        <span>${review.likes || 0}</span>
                    </div>
                </div>
            </div>
        `).join('')}
    `;
}

// 点赞评价
function mtLikeReview(userName) {
    // 简单的视觉反馈
    event.currentTarget.classList.toggle('liked');
}

// 渲染商家信息
function mtRenderStoreInfo() {
    const content = document.getElementById('mtInfoContent');
    if (!content || !mtState.currentStore) return;
    
    const store = mtState.currentStore;
    
    content.innerHTML = `
        <div class="mt-store-info-card">
            <div class="mt-info-row">
                <div class="mt-info-label">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#999" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>配送地址</span>
                </div>
                <div class="mt-info-value">距您${store.distance}</div>
            </div>
            <div class="mt-info-row">
                <div class="mt-info-label">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#999" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>配送时间</span>
                </div>
                <div class="mt-info-value">约${store.deliveryTime}分钟</div>
            </div>
            <div class="mt-info-row">
                <div class="mt-info-label">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#999" stroke-width="1.5"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    <span>配送费</span>
                </div>
                <div class="mt-info-value">¥${store.deliveryFee}</div>
            </div>
            <div class="mt-info-row">
                <div class="mt-info-label">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#999" stroke-width="1.5"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/></svg>
                    <span>起送价</span>
                </div>
                <div class="mt-info-value">¥${store.minOrder}</div>
            </div>
        </div>
        
        <div class="mt-store-desc-card">
            <div class="mt-desc-title">商家介绍</div>
            <div class="mt-desc-text">${store.desc}。我们坚持选用优质食材，用心制作每一份美食，只为给您带来最好的用餐体验。</div>
        </div>
        
        <div class="mt-store-notice">
            <div class="mt-notice-title">温馨提示</div>
            <div class="mt-notice-item">• 高峰期配送可能延迟，请耐心等待</div>
            <div class="mt-notice-item">• 如有任何问题，请联系商家客服</div>
            <div class="mt-notice-item">• 感谢您的支持与信任</div>
        </div>
    `;
}

// 添加到购物车
function mtGetMenuItems(storeId) {
    const menuData = mtData.menus[storeId];
    if (!menuData) return [];
    if (Array.isArray(menuData)) return menuData;
    return menuData.items || [];
}

function mtAddToCart(itemId) {
    if (!mtState.currentStore) return;
    
    const menu = mtGetMenuItems(mtState.currentStore.id);
    const item = menu.find(m => m.id === itemId);
    if (!item) return;
    
    const cartItem = mtState.cart.find(c => c.id === itemId);
    if (cartItem) {
        cartItem.count++;
    } else {
        mtState.cart.push({ ...item, count: 1, storeId: mtState.currentStore.id });
    }
    
    mtSaveData();
    mtRenderMenu();
    mtUpdateCartBar();
    mtUpdateTabBadge();
}

// 从购物车移除
function mtRemoveFromCart(itemId) {
    const cartItem = mtState.cart.find(c => c.id === itemId);
    if (!cartItem) return;
    
    if (cartItem.count > 1) {
        cartItem.count--;
    } else {
        mtState.cart = mtState.cart.filter(c => c.id !== itemId);
    }
    
    mtSaveData();
    mtRenderMenu();
    mtUpdateCartBar();
    mtUpdateTabBadge();
}

// 更新购物车栏
function mtUpdateCartBar() {
    const total = mtState.cart.reduce((sum, item) => sum + item.price * item.count, 0);
    const count = mtState.cart.reduce((sum, item) => sum + item.count, 0);
    
    document.getElementById('mtCartTotal').textContent = `¥${total.toFixed(2)}`;
    document.getElementById('mtCartBadge').textContent = count;
}

// 更新标签徽章
function mtUpdateTabBadge() {
    const count = mtState.cart.reduce((sum, item) => sum + item.count, 0);
    document.getElementById('mtTabBadge').textContent = count;
}

// 切换视图
function mtSwitchView(viewName) {
    mtState.currentView = viewName;
    
    if (viewName === 'Home') {
        mtState.currentCategory = 'all';
        mtRenderStores();
    }
    
    document.querySelectorAll('.mt-view').forEach(view => {
        view.classList.remove('active');
    });
    
    const targetView = document.getElementById(`mtView${viewName}`);
    if (targetView) {
        targetView.classList.add('active');
    }
    
    const tabbar = document.querySelector('.mt-tabbar');
    const viewsWithTabbar = ['Home', 'Cart', 'Profile', 'Category'];
    if (tabbar) {
        if (viewsWithTabbar.includes(viewName)) {
            tabbar.style.display = 'flex';
            tabbar.style.visibility = 'visible';
            tabbar.classList.remove('mt-tabbar-hidden');
        } else {
            tabbar.style.display = 'none';
            tabbar.style.visibility = 'hidden';
            tabbar.classList.add('mt-tabbar-hidden');
        }
    }
    
    const body = document.querySelector('.mt-body');
    if (body) {
        if (viewsWithTabbar.includes(viewName)) {
            body.style.height = 'calc(100% - 44px - 60px)';
        } else {
            body.style.height = 'calc(100% - 44px)';
        }
    }
    
    document.querySelectorAll('.mt-tab-item').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.target === viewName) {
            tab.classList.add('active');
        }
    });
}

// 初始化tabbar
function mtInitTabbar() {
    document.querySelectorAll('.mt-tab-item').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.target;
            if (target === 'Home') {
                mtSwitchView('Home');
            } else if (target === 'Cart') {
                mtRenderCart();
                mtSwitchView('Cart');
            } else if (target === 'Profile') {
                mtSwitchView('Profile');
            }
        });
    });
}

// 初始化轮播图
function mtInitBanner() {
    let currentBanner = 0;
    const banners = document.querySelectorAll('.mt-banner-item');
    const dots = document.querySelectorAll('.mt-dot');
    
    setInterval(() => {
        banners[currentBanner].classList.remove('active');
        dots[currentBanner].classList.remove('active');
        currentBanner = (currentBanner + 1) % banners.length;
        banners[currentBanner].classList.add('active');
        dots[currentBanner].classList.add('active');
    }, 3000);
}

// 渲染购物车
function mtRenderCart() {
    const list = document.getElementById('mtCartList');
    const empty = document.getElementById('mtCartEmpty');
    
    if (mtState.cart.length === 0) {
        list.style.display = 'none';
        empty.style.display = 'flex';
        return;
    }
    
    list.style.display = 'flex';
    empty.style.display = 'none';
    
    list.innerHTML = mtState.cart.map(item => `
        <div class="mt-cart-item">
            <div class="mt-cart-item-img">
                <div class="mt-cart-img-inner">${item.image}</div>
            </div>
            <div class="mt-cart-item-info">
                <div class="mt-cart-item-name">${item.name}</div>
                <div class="mt-cart-item-desc">${item.desc || ''}</div>
                <div class="mt-cart-item-bottom">
                    <div class="mt-cart-item-price">
                        <span class="mt-price-symbol">¥</span>
                        <span class="mt-price-num">${item.price}</span>
                    </div>
                    <div class="mt-menu-actions">
                        <button class="mt-act-btn minus" onclick="mtRemoveFromCart(${item.id})">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                        <span class="mt-count">${item.count}</span>
                        <button class="mt-act-btn plus" onclick="mtAddToCart(${item.id})">
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 打开结算页面
function mtOpenCheckout() {
    if (mtState.cart.length === 0) {
        mtShowToast('购物车是空的');
        return;
    }
    
    mtRenderCheckout();
    mtSwitchView('Checkout');
}

// 渲染结算页面
function mtRenderCheckout() {
    // 渲染商品清单
    const items = document.getElementById('mtCheckoutItems');
    items.innerHTML = mtState.cart.map(item => `
        <div class="mt-checkout-item">
            <span class="mt-checkout-item-name">${item.name} x${item.count}</span>
            <span class="mt-checkout-item-price">¥${(item.price * item.count).toFixed(2)}</span>
        </div>
    `).join('');
    
    // 计算价格
    const subtotal = mtState.cart.reduce((sum, item) => sum + item.price * item.count, 0);
    const deliveryFee = 5;
    const discount = mtState.selectedCoupon ? mtState.selectedCoupon.discount : 0;
    const total = subtotal + deliveryFee - discount;
    
    document.getElementById('mtCheckoutSubtotal').textContent = `¥${subtotal.toFixed(2)}`;
    document.getElementById('mtCheckoutTotal').textContent = `¥${total.toFixed(2)}`;
    
    if (discount > 0) {
        document.getElementById('mtCheckoutDiscountRow').style.display = 'flex';
        document.getElementById('mtCheckoutDiscount').textContent = `-¥${discount.toFixed(2)}`;
    } else {
        document.getElementById('mtCheckoutDiscountRow').style.display = 'none';
    }
    
    // 渲染地址
    if (mtState.selectedAddress) {
        document.getElementById('mtCheckoutAddress').innerHTML = `
            <div class="mt-address-name">${mtState.selectedAddress.name} <span class="mt-address-phone">${mtState.selectedAddress.phone}</span></div>
            <div class="mt-address-detail">${mtState.selectedAddress.address}</div>
        `;
    }
    
    // 渲染优惠券
    if (mtState.selectedCoupon) {
        document.getElementById('mtCheckoutCoupon').textContent = mtState.selectedCoupon.name;
    }
}

// 选择地址
function mtSelectAddress() {
    mtRenderAddressList();
    mtOpenModal('mtModalAddress');
}

// 渲染地址列表
function mtRenderAddressList() {
    const list = document.getElementById('mtAddressList');
    
    if (mtState.addresses.length === 0) {
        list.innerHTML = '<div class="mt-empty-text">暂无地址</div>';
        return;
    }
    
    list.innerHTML = mtState.addresses.map((addr, idx) => `
        <div class="mt-address-item" onclick="mtChooseAddress(${idx})">
            <div class="mt-address-info">
                <div class="mt-address-name">${addr.name}</div>
                <div class="mt-address-detail">${addr.detail}</div>
            </div>
        </div>
    `).join('');
}

// 选择地址
function mtChooseAddress(idx) {
    mtState.selectedAddress = mtState.addresses[idx];
    mtCloseModal('mtModalAddress');
    mtRenderCheckout();
}

// 新增地址
function mtAddNewAddress() {
    mtOpenModal('mtModalAddressEdit');
}

// 保存地址
function mtSaveAddress() {
    const name = document.getElementById('mtAddressName').value;
    const phone = document.getElementById('mtAddressPhone').value;
    const detail = document.getElementById('mtAddressDetail').value;
    const isDefault = document.getElementById('mtAddressDefault').checked;
    
    if (!name || !phone || !detail) {
        mtShowToast('请填写完整信息');
        return;
    }
    
    const address = { name, phone, detail, isDefault };
    mtState.addresses.push(address);
    
    if (isDefault) {
        mtState.addresses.forEach(addr => {
            if (addr !== address) addr.isDefault = false;
        });
    }
    
    mtSaveData();
    mtCloseModal('mtModalAddressEdit');
    mtShowToast('地址添加成功');
    
    // 清空表单
    document.getElementById('mtAddressName').value = '';
    document.getElementById('mtAddressPhone').value = '';
    document.getElementById('mtAddressDetail').value = '';
    document.getElementById('mtAddressDefault').checked = false;
}

// 选择配送时间
function mtSelectDeliveryTime() {
    mtOpenModal('mtModalDeliveryTime');
    
    document.querySelectorAll('.mt-delivery-time-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.mt-delivery-time-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            mtState.deliveryTime = this.dataset.time;
            document.getElementById('mtCheckoutTime').textContent = mtState.deliveryTime;
            mtCloseModal('mtModalDeliveryTime');
        });
    });
}

// 选择优惠券
function mtSelectCoupon() {
    mtRenderCouponList();
    mtOpenModal('mtModalCoupon');
}

// 渲染优惠券列表
function mtRenderCouponList() {
    const list = document.getElementById('mtCouponList');
    const empty = document.getElementById('mtCouponEmpty');
    
    if (mtState.coupons.length === 0) {
        list.style.display = 'none';
        empty.style.display = 'block';
        return;
    }
    
    list.style.display = 'block';
    empty.style.display = 'none';
    
    list.innerHTML = mtState.coupons.map((coupon, idx) => `
        <div class="mt-coupon-item" onclick="mtChooseCoupon(${idx})">
            <div class="mt-coupon-amount">¥${coupon.discount}</div>
            <div class="mt-coupon-info">
                <div class="mt-coupon-name">${coupon.name}</div>
                <div class="mt-coupon-condition">满${coupon.condition}可用</div>
            </div>
        </div>
    `).join('');
}

// 选择优惠券
function mtChooseCoupon(idx) {
    mtState.selectedCoupon = mtState.coupons[idx];
    mtCloseModal('mtModalCoupon');
    mtRenderCheckout();
}

// 更新支付模式
function mtUpdatePaymentMode() {
    const mode = document.querySelector('input[name="mtPayment"]:checked').value;
    mtState.paymentMode = mode;
    
    if (mode === 'other') {
        document.getElementById('mtOtherPayOptions').style.display = 'block';
    } else {
        document.getElementById('mtOtherPayOptions').style.display = 'none';
        document.getElementById('mtRecipientInfo').style.display = 'none';
    }
}

// 更新代付模式
function mtUpdateOtherPayMode() {
    const mode = document.querySelector('input[name="mtOtherPay"]:checked').value;
    mtState.otherPayMode = mode;
    document.getElementById('mtRecipientInfo').style.display = 'block';
}

// 确认订单
function mtConfirmOrder() {
    if (!mtState.selectedAddress) {
        mtShowToast('请选择配送地址');
        return;
    }
    
    if (mtState.paymentMode === 'other') {
        const name = document.getElementById('mtRecipientName').value;
        const phone = document.getElementById('mtRecipientPhone').value;
        const address = document.getElementById('mtRecipientAddress').value;
        
        if (!name || !phone || !address) {
            mtShowToast('请填写收餐人信息');
            return;
        }
        
        mtState.recipientInfo = { name, phone, address };
    }
    
    // 显示密码输入框
    const total = document.getElementById('mtCheckoutTotal').textContent;
    document.getElementById('mtPasswordAmount').textContent = total;
    mtOpenModal('mtModalPassword');
}

// 确认支付
function mtConfirmPayment() {
    const password = document.getElementById('mtPasswordInput').value;
    
    if (password.length !== 6) {
        mtShowToast('请输入6位密码');
        return;
    }
    
    // 创建订单
    const order = {
        id: Date.now(),
        items: [...mtState.cart],
        address: mtState.selectedAddress,
        total: document.getElementById('mtCheckoutTotal').textContent,
        time: new Date().toLocaleString(),
        status: '已支付',
        paymentMode: mtState.paymentMode,
        recipientInfo: mtState.recipientInfo
    };
    
    mtState.orders.push(order);
    mtState.cart = [];
    mtState.selectedCoupon = null;
    
    mtSaveData();
    mtCloseModal('mtModalPassword');
    mtShowToast('支付成功');
    
    // 清空密码
    document.getElementById('mtPasswordInput').value = '';
    
    // 返回首页
    setTimeout(() => {
        mtSwitchView('Home');
    }, 1500);
}

// 打开订单列表
function mtOpenOrders() {
    mtRenderOrderList();
    mtOpenModal('mtModalOrders');
}

// 渲染订单列表
function mtRenderOrderList() {
    const list = document.getElementById('mtOrderList');
    const empty = document.getElementById('mtOrderEmpty');
    
    if (mtState.orders.length === 0) {
        list.style.display = 'none';
        empty.style.display = 'block';
        return;
    }
    
    list.style.display = 'block';
    empty.style.display = 'none';
    
    list.innerHTML = mtState.orders.map(order => `
        <div class="mt-order-item">
            <div class="mt-order-header">
                <span class="mt-order-id">订单号：${order.id}</span>
                <span class="mt-order-status">${order.status}</span>
            </div>
            <div class="mt-order-items">
                ${order.items.map(item => `
                    <div class="mt-order-item-row">
                        <span>${item.name} x${item.count}</span>
                        <span>¥${(item.price * item.count).toFixed(2)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="mt-order-footer">
                <span class="mt-order-time">${order.time}</span>
                <span class="mt-order-total">合计：${order.total}</span>
            </div>
        </div>
    `).join('');
}

// 打开地址管理
function mtOpenAddresses() {
    mtRenderAddressManageList();
    mtOpenModal('mtModalAddressManage');
}

// 渲染地址管理列表
function mtRenderAddressManageList() {
    const list = document.getElementById('mtAddressManageList');
    
    if (mtState.addresses.length === 0) {
        list.innerHTML = '<div class="mt-empty-text">暂无地址</div>';
        return;
    }
    
    list.innerHTML = mtState.addresses.map((addr, idx) => `
        <div class="mt-address-manage-item">
            <div class="mt-address-info">
                <div class="mt-address-name">${addr.name} ${addr.isDefault ? '<span class="mt-default-tag">默认</span>' : ''}</div>
                <div class="mt-address-detail">${addr.detail}</div>
                <div class="mt-address-phone">${addr.phone}</div>
            </div>
            <button class="mt-address-delete" onclick="mtDeleteAddress(${idx})">删除</button>
        </div>
    `).join('');
}

// 删除地址
function mtDeleteAddress(idx) {
    mtState.addresses.splice(idx, 1);
    mtSaveData();
    mtRenderAddressManageList();
    mtShowToast('地址已删除');
}

// 打开优惠券管理
function mtOpenCoupons() {
    mtRenderCouponManageList();
    mtOpenModal('mtModalCouponManage');
}

// 渲染优惠券管理列表
function mtRenderCouponManageList() {
    const list = document.getElementById('mtCouponManageList');
    const empty = document.getElementById('mtCouponManageEmpty');
    
    if (mtState.coupons.length === 0) {
        list.style.display = 'none';
        empty.style.display = 'block';
        return;
    }
    
    list.style.display = 'block';
    empty.style.display = 'none';
    
    list.innerHTML = mtState.coupons.map(coupon => `
        <div class="mt-coupon-manage-item">
            <div class="mt-coupon-amount">¥${coupon.discount}</div>
            <div class="mt-coupon-info">
                <div class="mt-coupon-name">${coupon.name}</div>
                <div class="mt-coupon-condition">满${coupon.condition}可用</div>
            </div>
        </div>
    `).join('');
}

// 打开设置
function mtOpenSettings() {
    mtOpenModal('mtModalSettings');
}

// 清除缓存
function mtClearCache() {
    localStorage.removeItem('mtData');
    mtState.addresses = [];
    mtState.coupons = [];
    mtState.orders = [];
    mtState.cart = [];
    mtShowToast('缓存已清除');
    mtCloseModal('mtModalSettings');
}

// 打开消息
function mtOpenMessages() {
    mtShowToast('消息功能开发中');
}

// 返回上一页
function mtBackToHome() {
    mtSwitchView('Home');
}

function mtBackFromStore() {
    if (mtState.currentCategory === 'all') {
        mtSwitchView('Home');
    } else {
        mtSwitchView('Category');
    }
}

function mtBackFromCart() {
    mtSwitchView('Home');
}

function mtBackFromCheckout() {
    mtSwitchView('Cart');
}

// 切换购物车
function mtToggleCart() {
    mtRenderCart();
    mtSwitchView('Cart');
}

// 打开模态框
function mtOpenModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('mt-show');
    }
}

// 关闭模态框
function mtCloseModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('mt-show');
    }
}

// 显示Toast
function mtShowToast(message) {
    const toast = document.getElementById('mtToast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('mt-show');
    
    setTimeout(() => {
        toast.classList.remove('mt-show');
    }, 2000);
}

// 店铺标签切换
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('mt-store-tab')) {
        const tab = e.target.dataset.tab;
        
        document.querySelectorAll('.mt-store-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        
        document.querySelectorAll('.mt-menu-section, .mt-reviews-section, .mt-info-section').forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(`mt${tab.charAt(0).toUpperCase() + tab.slice(1)}Section`).classList.add('active');
    }
});

// === Instagram 互动系统核心逻辑 ===
const IgData = {
    stories: [
        { id: 1, username: 'your_name', avatar: 'https://picsum.photos/100/100?10', hasStory: true, viewed: false },
        { id: 2, username: 'user_1', avatar: 'https://picsum.photos/100/100?11', hasStory: true, viewed: false },
        { id: 3, username: 'sarah_k', avatar: 'https://picsum.photos/100/100?12', hasStory: true, viewed: true },
        { id: 4, username: 'mike_j', avatar: 'https://picsum.photos/100/100?13', hasStory: true, viewed: false },
        { id: 5, username: 'emma_w', avatar: 'https://picsum.photos/100/100?14', hasStory: true, viewed: true }
    ],
    posts: [
        { id: 1, username: 'user_1', avatar: 'https://picsum.photos/100/100?11', image: 'https://picsum.photos/600/600?20', likes: 1234, liked: false, saved: false, text: '美好的一天开始了 ☀️ #morning #goodvibes', time: '2 HOURS AGO', comments: [{ id: 1, user: 'sarah_k', text: '太美了！' }] },
        { id: 2, username: 'sarah_k', avatar: 'https://picsum.photos/100/100?12', image: 'https://picsum.photos/600/600?21', likes: 892, liked: false, saved: false, text: '周末旅行 🌸', time: '5 HOURS AGO', comments: [] },
        { id: 3, username: 'mike_j', avatar: 'https://picsum.photos/100/100?13', image: 'https://picsum.photos/600/600?22', likes: 2567, liked: false, saved: false, text: '新的摄影作品 📷', time: '8 HOURS AGO', comments: [{ id: 2, user: 'emma_w', text: '拍得真好！' }] },
        { id: 4, username: 'emma_w', avatar: 'https://picsum.photos/100/100?14', image: 'https://picsum.photos/600/600?23', likes: 456, liked: false, saved: false, text: '下午茶时间 ☕', time: '1 DAY AGO', comments: [] }
    ],
    exploreImages: [
        'https://picsum.photos/200/200?30', 'https://picsum.photos/200/200?31', 'https://picsum.photos/200/200?32',
        'https://picsum.photos/200/200?33', 'https://picsum.photos/200/200?34', 'https://picsum.photos/200/200?35',
        'https://picsum.photos/200/200?36', 'https://picsum.photos/200/200?37', 'https://picsum.photos/200/200?38',
        'https://picsum.photos/200/200?39', 'https://picsum.photos/200/200?40', 'https://picsum.photos/200/200?41'
    ],
    reels: [
        { id: 1, username: 'creator_1', avatar: 'https://picsum.photos/100/100?50', desc: '热门舞蹈 #dance #viral' },
        { id: 2, username: 'creator_2', avatar: 'https://picsum.photos/100/100?51', desc: '搞笑视频 #funny' },
        { id: 3, username: 'creator_3', avatar: 'https://picsum.photos/100/100?52', desc: '美食制作 #food' }
    ],
    profile: { username: 'yura', avatar: 'https://picsum.photos/100/100?2', bio: '📍 Seoul | 🎨 Creator', posts: 12, followers: 1234, following: 567 },
    messages: [
        { id: 1, username: 'user_1', avatar: 'https://picsum.photos/100/100?11', preview: '最近怎么样？', time: '2h', unread: true },
        { id: 2, username: 'sarah_k', avatar: 'https://picsum.photos/100/100?12', preview: '周末一起出去玩吗？', time: '5h', unread: true },
        { id: 3, username: 'mike_j', avatar: 'https://picsum.photos/100/100?13', preview: '好的，回头见！', time: '1d', unread: false }
    ]
};
const IgUserData = { username: 'yura', avatar: 'https://picsum.photos/100/100?2' };

const igApp = document.getElementById('igAppMain');
const igEntry = document.getElementById('censyWechatEntry');
const igBackBtn = document.getElementById('igBackBtn');
const igTitle = document.getElementById('igTitle');

let currentIgChatId = null;
let igChatMessages = {};

// 5栏导航切换
function igSwitchTab(tabName) {
    document.querySelectorAll('.ig-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.ig-tab-item').forEach(v => v.classList.remove('active'));
    const tabEl = document.querySelector(`.ig-tab-item[data-target="${tabName}"]`);
    if(tabEl) tabEl.classList.add('active');
    const viewEl = document.getElementById(`igView${tabName}`);
    if(viewEl) viewEl.classList.add('active');

    if(tabName === 'Feed') {
        igRenderFeed();
    } else if(tabName === 'Search') {
        igRenderSearch();
    } else if(tabName === 'Reels') {
        igRenderReels();
    } else if(tabName === 'Shop') {
        igRenderShop();
    } else if(tabName === 'Profile') {
        igRenderProfile();
    }
}

// 入口绑定
if(igEntry) igEntry.addEventListener('click', () => { igApp.classList.add('ig-show'); igSwitchTab('Feed'); });
if(igBackBtn) igBackBtn.addEventListener('click', () => { igApp.classList.remove('ig-show'); });

// Tab点击事件
document.querySelectorAll('.ig-tab-item').forEach(item => {
    item.addEventListener('click', function() { igSwitchTab(this.dataset.target); });
});

// 弹窗控制
window.igOpenModal = (id) => document.getElementById(id).classList.add('show');
window.igCloseModal = (id) => document.getElementById(id).classList.remove('show');

// 首页Feed渲染
function igRenderFeed() {
    let feedEl = document.getElementById('wcFeedList');
    if(!feedEl) return;

    // 故事条
    let storiesHtml = '<div class="ig-stories-bar" style="display:flex;overflow-x:auto;padding:10px 0;gap:12px;border-bottom:1px solid #efefef;">';
    IgData.stories.forEach(s => {
        let ringClass = s.viewed ? 'ig-story-ring-viewed' : 'ig-story-ring-new';
        storiesHtml += `<div class="ig-story-item" onclick="igOpenStory(${s.id})" style="display:flex;flex-direction:column;align-items:center;cursor:pointer;min-width:66px;">
            <div class="${ringClass}" style="width:66px;height:66px;border-radius:50%;padding:2px;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);display:flex;align-items:center;justify-content:center;">
                <div style="width:58px;height:58px;border-radius:50%;border:3px solid #fff;background-image:url(${s.avatar});background-size:cover;background-position:center;"></div>
            </div>
            <span style="font-size:12px;margin-top:4px;max-width:66px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${s.username}</span>
        </div>`;
    });
    storiesHtml += '</div>';

    // 帖子流
    let postsHtml = '';
    IgData.posts.forEach(p => {
        let likeIcon = p.liked ? '❤️' : '🤍';
        let saveIcon = p.saved ? '📚' : '🔖';
        let commentsHtml = '';
        if(p.comments && p.comments.length > 0) {
            p.comments.forEach(c => {
                commentsHtml += `<div style="font-size:13px;margin-bottom:4px;"><strong>${c.user}</strong> ${c.text}</div>`;
            });
        }
        postsHtml += `<div class="ig-post" style="border-bottom:1px solid #efefef;padding-bottom:16px;margin-bottom:16px;">
            <div style="display:flex;align-items:center;padding:10px 12px;">
                <div style="width:32px;height:32px;border-radius:50%;background-image:url(${p.avatar});background-size:cover;margin-right:10px;"></div>
                <span style="font-weight:600;font-size:14px;flex:1;">${p.username}</span>
                <span style="font-size:20px;cursor:pointer;">⋯</span>
            </div>
            <div style="width:100%;aspect-ratio:1;background-image:url(${p.image});background-size:cover;background-position:center;"></div>
            <div style="padding:10px 12px;">
                <div style="display:flex;align-items:center;margin-bottom:8px;">
                    <span onclick="igToggleLike(${p.id})" style="font-size:24px;margin-right:12px;cursor:pointer;">${likeIcon}</span>
                    <span onclick="igOpenPostDetail(${p.id})" style="font-size:20px;margin-right:12px;cursor:pointer;">💬</span>
                    <span style="font-size:20px;margin-right:12px;cursor:pointer;">✈️</span>
                    <span onclick="igToggleSave(${p.id})" style="font-size:20px;margin-left:auto;cursor:pointer;">${saveIcon}</span>
                </div>
                <div style="font-weight:600;font-size:14px;margin-bottom:4px;">${p.likes.toLocaleString()} 次赞</div>
                <div style="font-size:14px;margin-bottom:4px;"><strong>${p.username}</strong> ${p.text}</div>
                <div onclick="igOpenPostDetail(${p.id})" style="font-size:14px;color:#8e8e8e;cursor:pointer;margin-bottom:4px;">查看全部 ${p.comments.length + 1} 条评论</div>
                ${commentsHtml}
                <div style="font-size:10px;color:#8e8e8e;text-transform:uppercase;">${p.time}</div>
            </div>
        </div>`;
    });

    feedEl.innerHTML = storiesHtml + postsHtml;
}

// 帖子互动
window.igToggleLike = (postId) => {
    let post = IgData.posts.find(p => p.id === postId);
    if(post) {
        post.liked = !post.liked;
        post.likes += post.liked ? 1 : -1;
        igRenderFeed();
    }
};

window.igToggleSave = (postId) => {
    let post = IgData.posts.find(p => p.id === postId);
    if(post) {
        post.saved = !post.saved;
        igRenderFeed();
    }
};

// 故事功能
window.igOpenStory = (storyId) => {
    let story = IgData.stories.find(s => s.id === storyId);
    if(!story) return;
    story.viewed = true;

    let modal = document.getElementById('igModalStory');
    if(!modal) {
        modal = document.createElement('div');
        modal.id = 'igModalStory';
        modal.className = 'ig-modal';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:9999;display:flex;align-items:center;justify-content:center;';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div style="position:relative;width:100%;max-width:400px;height:80vh;background:#000;border-radius:12px;overflow:hidden;">
            <div style="position:absolute;top:16px;left:16px;display:flex;align-items:center;z-index:10;">
                <div style="width:32px;height:32px;border-radius:50%;background-image:url(${story.avatar});background-size:cover;border:2px solid #fff;"></div>
                <span style="margin-left:8px;color:#fff;font-weight:600;">${story.username}</span>
            </div>
            <div style="width:100%;height:100%;background:linear-gradient(45deg,#405de6,#5851db,#833ab4,#c13584,#e1306c,#fd1d1d,#f56040,#f77737,#fcaf45);display:flex;align-items:center;justify-content:center;color:#fff;font-size:18px;text-align:center;padding:20px;">
                📸 故事内容
            </div>
            <div onclick="igCloseModal('igModalStory')" style="position:absolute;top:16px;right:16px;color:#fff;font-size:24px;cursor:pointer;z-index:10;">✕</div>
        </div>
    `;
    modal.style.display = 'flex';
    modal.onclick = (e) => { if(e.target === modal) igCloseModal('igModalStory'); };
};
window.igCloseModal = (id) => {
    let el = document.getElementById(id);
    if(el) el.style.display = 'none';
};

// 搜索探索渲染
function igRenderSearch() {
    let viewEl = document.getElementById('igViewSearch');
    if(!viewEl) return;
    let html = '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;padding:2px;">';
    IgData.exploreImages.forEach((img, i) => {
        html += `<div style="aspect-ratio:1;background-image:url(${img});background-size:cover;background-position:center;cursor:pointer;" onclick="igOpenExploreImage(${i})"></div>`;
    });
    html += '</div>';
    viewEl.innerHTML = html;
}

window.igOpenExploreImage = (index) => {
    let modal = document.getElementById('igModalExplore');
    if(!modal) {
        modal = document.createElement('div');
        modal.id = 'igModalExplore';
        modal.className = 'ig-modal';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9999;display:flex;align-items:center;justify-content:center;';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div style="position:relative;max-width:90%;max-height:90%;">
            <img src="${IgData.exploreImages[index]}" style="max-width:100%;max-height:90vh;object-fit:contain;">
            <div onclick="igCloseModal('igModalExplore')" style="position:absolute;top:-40px;right:0;color:#fff;font-size:24px;cursor:pointer;">✕</div>
        </div>
    `;
    modal.style.display = 'flex';
    modal.onclick = (e) => { if(e.target === modal) igCloseModal('igModalExplore'); };
};

// Reels渲染
function igRenderReels() {
    let viewEl = document.getElementById('igViewReels');
    if(!viewEl) return;
    let html = '<div style="height:100%;overflow-y:auto;">';
    IgData.reels.forEach((r, i) => {
        html += `<div style="height:100vh;position:relative;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:flex;align-items:center;justify-content:center;">
            <div style="text-align:center;color:#fff;">
                <div style="font-size:48px;margin-bottom:20px;">🎬</div>
                <div style="font-size:18px;font-weight:600;">@${r.username}</div>
                <div style="font-size:14px;margin-top:10px;opacity:0.9;">${r.desc}</div>
            </div>
            <div style="position:absolute;right:16px;bottom:100px;display:flex;flex-direction:column;align-items:center;gap:20px;">
                <div style="text-align:center;cursor:pointer;"><div style="font-size:28px;">❤️</div><span style="font-size:12px;">${Math.floor(Math.random()*10000)+1000}</span></div>
                <div style="text-align:center;cursor:pointer;"><div style="font-size:28px;">💬</div><span style="font-size:12px;">${Math.floor(Math.random()*500)+100}</span></div>
                <div style="text-align:center;cursor:pointer;"><div style="font-size:28px;">✈️</div><span style="font-size:12px;">分享</span></div>
            </div>
            <div style="position:absolute;bottom:20px;left:16px;display:flex;align-items:center;">
                <div style="width:36px;height:36px;border-radius:50%;background-image:url(${r.avatar});background-size:cover;border:2px solid #fff;margin-right:10px;"></div>
                <span style="color:#fff;font-weight:600;">${r.username}</span>
            </div>
        </div>`;
    });
    html += '</div>';
    viewEl.innerHTML = html;
}

// 购物页渲染
function igRenderShop() {
    let viewEl = document.getElementById('igViewShop');
    if(!viewEl) return;
    viewEl.innerHTML = `
        <div style="padding:20px;text-align:center;">
            <div style="font-size:48px;margin-bottom:20px;">🛍️</div>
            <div style="font-size:18px;font-weight:600;margin-bottom:10px;">Instagram Shop</div>
            <div style="color:#8e8e8e;font-size:14px;">发现你喜欢的产品</div>
        </div>
    `;
}

// 个人主页渲染
function igRenderProfile() {
    let viewEl = document.getElementById('igViewProfile');
    if(!viewEl) return;
    let p = IgData.profile;
    let html = `
        <div style="padding:16px;">
            <div style="display:flex;align-items:center;margin-bottom:16px;">
                <div style="width:77px;height:77px;border-radius:50%;background-image:url(${p.avatar});background-size:cover;margin-right:24px;border:2px solid #ddd;"></div>
                <div style="flex:1;display:flex;justify-content:space-around;text-align:center;">
                    <div><div style="font-weight:600;">${p.posts}</div><div style="font-size:14px;color:#8e8e8e;">帖子</div></div>
                    <div><div style="font-weight:600;">${p.followers.toLocaleString()}</div><div style="font-size:14px;color:#8e8e8e;">粉丝</div></div>
                    <div><div style="font-weight:600;">${p.following}</div><div style="font-size:14px;color:#8e8e8e;">关注</div></div>
                </div>
            </div>
            <div style="margin-bottom:16px;">
                <div style="font-weight:600;margin-bottom:4px;">${p.username}</div>
                <div style="font-size:14px;color:#262626;">${p.bio}</div>
            </div>
            <div style="display:flex;gap:8px;margin-bottom:16px;">
                <button style="flex:1;padding:8px;background:#0095f6;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;">编辑主页</button>
                <button style="flex:1;padding:8px;background:#efefef;border:none;border-radius:8px;font-weight:600;cursor:pointer;">分享主页</button>
            </div>
            <div style="display:flex;border-top:1px solid #efefef;">
                <div style="flex:1;text-align:center;padding:12px;border-bottom:2px solid #000;cursor:pointer;">📁 帖子</div>
                <div style="flex:1;text-align:center;padding:12px;color:#8e8e8e;cursor:pointer;">🏷️ 标签</div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:2px;">
                ${IgData.posts.map(p => `<div style="aspect-ratio:1;background-image:url(${p.image});background-size:cover;background-position:center;cursor:pointer;"></div>`).join('')}
            </div>
        </div>
    `;
    viewEl.innerHTML = html;
}

// DM私信功能
window.igOpenDM = () => {
    igRenderDMList();
    igOpenModal('igModalDM');
};

function igRenderDMList() {
    let modal = document.getElementById('igModalDM');
    if(!modal) {
        modal = document.createElement('div');
        modal.id = 'igModalDM';
        modal.className = 'ig-modal';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;z-index:9999;overflow-y:auto;';
        document.body.appendChild(modal);
    }
    let html = `
        <div style="position:sticky;top:0;background:#fff;border-bottom:1px solid #efefef;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;">
            <span style="font-weight:600;font-size:16px;">消息</span>
            <span onclick="igCloseModal('igModalDM')" style="font-size:24px;cursor:pointer;">✕</span>
        </div>
        <div style="padding:8px 0;">
    `;
    IgData.messages.forEach(m => {
        html += `<div onclick="igOpenChat(${m.id})" style="display:flex;align-items:center;padding:12px 16px;cursor:pointer;">
            <div style="width:56px;height:56px;border-radius:50%;background-image:url(${m.avatar});background-size:cover;margin-right:12px;"></div>
            <div style="flex:1;">
                <div style="font-weight:600;font-size:14px;">${m.username}</div>
                <div style="font-size:14px;color:#8e8e8e;">${m.preview} · ${m.time}</div>
            </div>
            ${m.unread ? '<div style="width:8px;height:8px;border-radius:50%;background:#0095f6;"></div>' : ''}
        </div>`;
    });
    html += '</div>';
    modal.innerHTML = html;
}

window.igOpenChat = (userId) => {
    currentIgChatId = userId;
    let user = IgData.messages.find(m => m.id === userId);
    if(!user) return;

    let modal = document.getElementById('igModalChat');
    if(!modal) {
        modal = document.createElement('div');
        modal.id = 'igModalChat';
        modal.className = 'ig-modal';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;z-index:10000;display:flex;flex-direction:column;';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div style="position:sticky;top:0;background:#fff;border-bottom:1px solid #efefef;padding:12px 16px;display:flex;align-items:center;">
            <span onclick="igCloseModal('igModalChat')" style="font-size:20px;cursor:pointer;margin-right:16px;">←</span>
            <div style="width:32px;height:32px;border-radius:50%;background-image:url(${user.avatar});background-size:cover;margin-right:10px;"></div>
            <span style="font-weight:600;">${user.username}</span>
        </div>
        <div id="igChatBody" style="flex:1;overflow-y:auto;padding:16px;">
            <div style="text-align:center;color:#8e8e8e;font-size:14px;">开始聊天</div>
        </div>
        <div style="padding:12px;border-top:1px solid #efefef;display:flex;align-items:center;gap:8px;">
            <input id="igChatInput" type="text" placeholder="发送消息..." style="flex:1;padding:10px 16px;border:1px solid #dbdbdb;border-radius:22px;font-size:14px;outline:none;">
            <button onclick="igSendMessage()" style="padding:10px 20px;background:#0095f6;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;">发送</button>
        </div>
    `;
    modal.style.display = 'flex';
    igRenderChatMessages();
};

function igRenderChatMessages() {
    let body = document.getElementById('igChatBody');
    if(!body) return;
    let msgs = igChatMessages[currentIgChatId] || [];
    if(msgs.length === 0) {
        body.innerHTML = '<div style="text-align:center;color:#8e8e8e;font-size:14px;">开始聊天</div>';
        return;
    }
    let html = '';
    let user = IgData.messages.find(m => m.id === currentIgChatId);
    msgs.forEach(m => {
        if(m.isMe) {
            html += `<div style="display:flex;justify-content:flex-end;margin-bottom:8px;"><div style="max-width:70%;padding:10px 14px;background:#efefef;border-radius:18px;font-size:14px;">${m.text}</div></div>`;
        } else {
            html += `<div style="display:flex;justify-content:flex-start;margin-bottom:8px;align-items:flex-end;">
                <div style="width:28px;height:28px;border-radius:50%;background-image:url(${user?.avatar});background-size:cover;margin-right:8px;"></div>
                <div style="max-width:70%;padding:10px 14px;background:#efefef;border-radius:18px;font-size:14px;">${m.text}</div>
            </div>`;
        }
    });
    body.innerHTML = html;
    body.scrollTop = body.scrollHeight;
}

window.igSendMessage = () => {
    let input = document.getElementById('igChatInput');
    if(!input || !input.value.trim() || !currentIgChatId) return;
    let txt = input.value.trim();
    if(!igChatMessages[currentIgChatId]) igChatMessages[currentIgChatId] = [];
    igChatMessages[currentIgChatId].push({ text: txt, isMe: true });
    input.value = '';
    igRenderChatMessages();

    // 模拟回复
    setTimeout(() => {
        let replies = ['好的~', '收到！', '嗯嗯', '哈哈', '在的呢', '说吧~', '👍', '❤️'];
        igChatMessages[currentIgChatId].push({ text: replies[Math.floor(Math.random()*replies.length)], isMe: false });
        igRenderChatMessages();
    }, 1000 + Math.random() * 500);
};

// 帖子详情弹窗
window.igOpenPostDetail = (postId) => {
    let post = IgData.posts.find(p => p.id === postId);
    if(!post) return;

    let modal = document.getElementById('igModalPostDetail');
    if(!modal) {
        modal = document.createElement('div');
        modal.id = 'igModalPostDetail';
        modal.className = 'ig-modal';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;z-index:9999;overflow-y:auto;';
        document.body.appendChild(modal);
    }
    let commentsHtml = '';
    post.comments.forEach(c => {
        commentsHtml += `<div style="display:flex;align-items:start;margin-bottom:12px;">
            <div style="width:32px;height:32px;border-radius:50%;background:#ddd;margin-right:10px;"></div>
            <div style="flex:1;"><strong>${c.user}</strong> ${c.text}</div>
        </div>`;
    });
    modal.innerHTML = `
        <div style="position:sticky;top:0;background:#fff;border-bottom:1px solid #efefef;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;">
            <span style="font-weight:600;font-size:16px;">帖子详情</span>
            <span onclick="igCloseModal('igModalPostDetail')" style="font-size:24px;cursor:pointer;">✕</span>
        </div>
        <div style="display:flex;flex-direction:column;">
            <div style="width:100%;aspect-ratio:1;background-image:url(${post.image});background-size:cover;background-position:center;"></div>
            <div style="padding:16px;">
                <div style="display:flex;align-items:center;margin-bottom:12px;">
                    <div style="width:32px;height:32px;border-radius:50%;background-image:url(${post.avatar});background-size:cover;margin-right:10px;"></div>
                    <span style="font-weight:600;">${post.username}</span>
                </div>
                <div style="font-weight:600;margin-bottom:4px;">${post.likes.toLocaleString()} 次赞</div>
                <div style="font-size:14px;margin-bottom:8px;"><strong>${post.username}</strong> ${post.text}</div>
                <div style="font-size:12px;color:#8e8e8e;text-transform:uppercase;margin-bottom:16px;">${post.time}</div>
                <div style="border-top:1px solid #efefef;padding-top:16px;">
                    <div style="font-weight:600;margin-bottom:12px;">评论</div>
                    ${commentsHtml}
                </div>
                <div style="display:flex;align-items:center;gap:8px;margin-top:16px;padding-top:16px;border-top:1px solid #efefef;">
                    <input id="igCommentInput" type="text" placeholder="添加评论..." style="flex:1;padding:10px 16px;border:1px solid #dbdbdb;border-radius:22px;font-size:14px;outline:none;">
                    <button onclick="igAddComment(${postId})" style="padding:10px 16px;background:#0095f6;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;">发布</button>
                </div>
            </div>
        </div>
    `;
    modal.style.display = 'block';
};

window.igAddComment = (postId) => {
    let input = document.getElementById('igCommentInput');
    if(!input || !input.value.trim()) return;
    let post = IgData.posts.find(p => p.id === postId);
    if(post) {
        post.comments.push({ id: Date.now(), user: IgUserData.username, text: input.value.trim() });
        input.value = '';
        igOpenPostDetail(postId);
    }
};

// 发帖功能
window.igOpenNewPost = () => {
    let modal = document.getElementById('igModalNewPost');
    if(!modal) {
        modal = document.createElement('div');
        modal.id = 'igModalNewPost';
        modal.className = 'ig-modal';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;z-index:9999;';
        document.body.appendChild(modal);
    }
    modal.innerHTML = `
        <div style="position:sticky;top:0;background:#fff;border-bottom:1px solid #efefef;padding:12px 16px;display:flex;align-items:center;justify-content:space-between;">
            <span onclick="igCloseModal('igModalNewPost')" style="font-size:20px;cursor:pointer;">✕</span>
            <span style="font-weight:600;">新帖子</span>
            <button onclick="igPublishPost()" style="padding:6px 12px;background:#0095f6;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;">发布</button>
        </div>
        <div style="padding:16px;">
            <div id="igNewPostPreview" onclick="document.getElementById('igNewPostFile').click()" style="width:100%;aspect-ratio:1;background:#f0f0f0;display:flex;align-items:center;justify-content:center;cursor:pointer;margin-bottom:16px;border-radius:8px;">
                <div style="text-align:center;color:#8e8e8e;">
                    <div style="font-size:48px;margin-bottom:8px;">📷</div>
                    <div>点击上传图片</div>
                </div>
            </div>
            <input type="file" id="igNewPostFile" accept="image/*" style="display:none;" onchange="igPreviewImage(this)">
            <textarea id="igNewPostText" placeholder="写标题..." style="width:100%;min-height:100px;padding:12px;border:1px solid #dbdbdb;border-radius:8px;font-size:14px;resize:none;outline:none;font-family:inherit;"></textarea>
        </div>
    `;
    modal.style.display = 'block';
};

let igNewPostImage = '';
window.igPreviewImage = (input) => {
    let file = input.files[0];
    if(!file) return;
    let reader = new FileReader();
    reader.onload = (e) => {
        igNewPostImage = e.target.result;
        let preview = document.getElementById('igNewPostPreview');
        if(preview) {
            preview.style.backgroundImage = `url(${igNewPostImage})`;
            preview.style.backgroundSize = 'cover';
            preview.style.backgroundPosition = 'center';
            preview.innerHTML = '';
        }
    };
    reader.readAsDataURL(file);
};

window.igPublishPost = () => {
    let text = document.getElementById('igNewPostText')?.value || '';
    let image = igNewPostImage || `https://picsum.photos/600/600?${Math.random()}`;
    IgData.posts.unshift({
        id: Date.now(),
        username: IgUserData.username,
        avatar: IgUserData.avatar,
        image: image,
        likes: 0,
        liked: false,
        saved: false,
        text: text || '新帖子 ✨',
        time: '刚刚',
        comments: []
    });
    IgData.profile.posts++;
    igNewPostImage = '';
    igCloseModal('igModalNewPost');
    igRenderFeed();
};

// 初始化完成
console.log('Instagram 交互系统已加载');

// ===========================================
// 商城APP完整交互系统
// ===========================================

const shopState = {
    currentCat: 'all',
    currentProductId: null,
    currentProductImgType: null,
    cartImgIndex: null,
    cardImgProductId: null,
    favorites: new Set(),
    cart: [],
    customProductImgs: {},
    userProfile: {
        name: '雾雾子',
        avatarColor: 1,
        avatarImg: '',
        desc: '✨ 热爱生活的收藏家'
    },
    selectedSpec: 0,
    selectedRoleId: null,
    buyNowData: null,
    buyNowSelectedCouponId: null,
    cartCheckoutSelectedCouponId: null,
    currentOrderType: null,
    currentCommentRating: 5,
    currentEditRoleId: null,
    currentEditRoleAvatar: ''
};

const shopProductsData = {
    women: [
        { id: 'w1', name: '雾紫色温柔针织开衫', price: 268, desc: '柔软亲肤马海毛混纺，宽松版型自带慵懒氛围感' },
        { id: 'w2', name: '奶白色蕾丝半身裙', price: 198, desc: '精致蕾丝刺绣，高腰设计显腿长' },
        { id: 'w3', name: '淡紫吊带连衣裙', price: 328, desc: '雪纺面料飘逸灵动，约会必备款' },
        { id: 'w4', name: '燕麦色羊毛大衣', price: 698, desc: '双面呢工艺，经典H版型显瘦不挑人' },
        { id: 'w5', name: '粉紫色碎花衬衫', price: 158, desc: '法式复古印花，通勤休闲都适配' },
        { id: 'w6', name: '米白色阔腿裤', price: 188, desc: '垂坠感雪纺面料，遮肉显高百搭' },
        { id: 'w7', name: '薰衣草紫针织背心', price: 128, desc: '软糯亲肤，单穿内搭都好看' },
        { id: 'w8', name: '奶杏色风衣外套', price: 458, desc: '经典双排扣设计，春秋百搭单品' },
        { id: 'w9', name: '豆沙粉毛衣套装', price: 298, desc: '毛衣+半裙两件套，温柔知性风' },
        { id: 'w10', name: '白色法式泡泡袖上衣', price: 168, desc: '宫廷风泡泡袖，甜美减龄' },
        { id: 'w11', name: '藕粉色西装外套', price: 388, desc: '宽松落肩版型，通勤知性又显瘦' },
        { id: 'w12', name: '雾蓝调高领打底衫', price: 138, desc: '莫代尔混纺面料，柔软贴身不扎人' },
        { id: 'w13', name: '米杏色西装阔腿裤', price: 228, desc: '垂感面料显瘦显高，职场百搭' },
        { id: 'w14', name: '丁香紫丝绒半裙', price: 248, desc: '微光泽丝绒面料，复古典雅' },
        { id: 'w15', name: '奶油色马海毛毛衣', price: 218, desc: '蓬松软糯，冬日温柔氛围感' }
    ],
    beauty: [
        { id: 'b1', name: '雾面哑光唇釉 #芋泥紫', price: 89, desc: '丝绒哑光质地，显白不挑皮' },
        { id: 'b2', name: '渐变腮红 #奶桃粉', price: 78, desc: '自然渐变显色，打造氛围感妆容' },
        { id: 'b3', name: '紫调眼影盘 12色', price: 168, desc: '低饱和莫兰迪色系，日常消肿' },
        { id: 'b4', name: '保湿精华水 150ml', price: 198, desc: '玻尿酸深层补水，敏感肌友好' },
        { id: 'b5', name: '烟酰胺美白精华', price: 268, desc: '提亮肤色淡化痘印，温和有效' },
        { id: 'b6', name: '奶油肌气垫BB霜', price: 158, desc: '遮瑕力强，持妆一整天不脱妆' },
        { id: 'b7', name: '睫毛打底膏', price: 68, desc: '纤长卷翘不晕染，睫毛精必备' },
        { id: 'b8', name: '定妆散粉 透明色', price: 128, desc: '柔焦磨皮效果，控油持妆' },
        { id: 'b9', name: '玫瑰花瓣面膜', price: 98, desc: '补水保湿提亮，熬夜急救' },
        { id: 'b10', name: '护手霜套装 3支', price: 88, desc: '滋润不油腻，三种香味' },
        { id: 'b11', name: '奶盖唇泥 #焦糖栗', price: 79, desc: '雾面哑光质地，浓郁显色一抹上色' },
        { id: 'b12', name: '修容盘 双色立体', price: 138, desc: '哑光高光阴影一体，新手友好' },
        { id: 'b13', name: '氨基酸洁面乳 120g', price: 78, desc: '温和不紧绷，敏感肌安心使用' },
        { id: 'b14', name: '玫瑰金十二色眼影', price: 188, desc: '珠光哑光结合，配色日常百搭' },
        { id: 'b15', name: '保湿睡眠面膜', price: 118, desc: '免洗过夜，第二天水润透亮' }
    ],
    accessories: [
        { id: 'a1', name: '珍珠蝴蝶结发夹', price: 58, desc: '精致珍珠点缀，温柔风必备' },
        { id: 'a2', name: '淡紫色链条斜挎包', price: 258, desc: '小巧精致，配色高级百搭' },
        { id: 'a3', name: '贝母锁骨项链', price: 128, desc: '简约气质款，显白显瘦' },
        { id: 'a4', name: '蕾丝防晒手套', price: 48, desc: '优雅蕾丝，防晒又好看' },
        { id: 'a5', name: '蝴蝶结丝带发圈', price: 32, desc: '甜美减龄，多种颜色可选' },
        { id: 'a6', name: '猫眼石耳环', price: 98, desc: '复古优雅，修饰脸型' },
        { id: 'a7', name: '毛绒贝雷帽', price: 78, desc: '软糯质感，秋冬搭配神器' },
        { id: 'a8', name: '丝巾 法式印花', price: 68, desc: '多种系法，提升整体精致度' },
        { id: 'a9', name: '星星月亮手链', price: 88, desc: '纤细精致，叠戴更好看' },
        { id: 'a10', name: '玳瑁框眼镜', price: 158, desc: '文艺复古，素颜神器' },
        { id: 'a11', name: '珍珠叠戴锁骨链', price: 148, desc: '双层珍珠设计，叠戴更显层次' },
        { id: 'a12', name: '奶白色云朵包', price: 288, desc: '软乎乎云朵造型，容量超惊喜' },
        { id: 'a13', name: '法式丝绒发箍', price: 68, desc: '复古丝绒材质，温柔显脸小' },
        { id: 'a14', name: '锆石耳钉套装', price: 88, desc: '六款不同造型，一周不重样' },
        { id: 'a15', name: '薰衣草紫帆布包', price: 138, desc: '大容量轻便，通勤上学百搭' }
    ],
    home: [
        { id: 'h1', name: '香薰蜡烛 薰衣草味', price: 128, desc: '助眠安神，营造温馨氛围' },
        { id: 'h2', name: '云朵抱枕 奶白色', price: 88, desc: '超柔软绒面，抱着超舒服' },
        { id: 'h3', name: '星空投影小夜灯', price: 108, desc: '浪漫星空，卧室氛围感神器' },
        { id: 'h4', name: '干花束 永生玫瑰', price: 158, desc: '永不凋谢，装饰家居好物' },
        { id: 'h5', name: '陶瓷马克杯 紫色', price: 68, desc: '马卡龙色系，喝水好心情' },
        { id: 'h6', name: '棉麻桌布 米白格子', price: 98, desc: 'ins风必备，拍照超好看' },
        { id: 'h7', name: '加湿器 迷你款', price: 138, desc: '静音设计，桌面补水神器' },
        { id: 'h8', name: '收纳盒 抽屉式三层', price: 78, desc: '化妆品首饰收纳，整洁有序' },
        { id: 'h9', name: '地毯 羊羔毛圆形', price: 168, desc: '柔软亲肤，卧室客厅都适用' },
        { id: 'h10', name: '挂墙相框 三联画', price: 118, desc: '简约北欧风，墙面装饰' },
        { id: 'h11', name: '奶白色毛绒地毯', price: 198, desc: '长绒软底，光脚踩上去超治愈' },
        { id: 'h12', name: 'ins风陶瓷花瓶', price: 88, desc: '不规则造型，插花摆件皆宜' },
        { id: 'h13', name: '薰衣草香薰喷雾', price: 78, desc: '助眠安神，睡前喷一喷超治愈' },
        { id: 'h14', name: '北欧风桌面收纳架', price: 128, desc: '双层收纳，化妆品文具都好放' },
        { id: 'h15', name: '渐变紫玻璃杯套装', price: 98, desc: '四只装，喝水喝饮料都好看' }
    ],
    men: [
        { id: 'm1', name: '简约纯棉T恤 白色', price: 128, desc: '重磅纯棉面料，版型挺括有型' },
        { id: 'm2', name: '休闲牛仔外套', price: 358, desc: '经典水洗牛仔，百搭不出错' },
        { id: 'm3', name: '商务休闲衬衫 浅灰', price: 228, desc: '免烫面料，通勤日常都适合' },
        { id: 'm4', name: '工装夹克 卡其色', price: 298, desc: '多口袋设计，机能风满满' },
        { id: 'm5', name: '针织毛衣 藏青色', price: 198, desc: '柔软羊毛混纺，保暖又有型' },
        { id: 'm6', name: '直筒休闲裤 黑色', price: 178, desc: '修身显瘦，百搭各种上衣' },
        { id: 'm7', name: '连帽卫衣 深灰色', price: 238, desc: '加绒加厚，冬季必备单品' },
        { id: 'm8', name: '风衣外套 卡其色', price: 498, desc: '经典英伦风，气场全开' },
        { id: 'm9', name: '运动套装 黑色', price: 328, desc: '速干面料，运动休闲两相宜' },
        { id: 'm10', name: '羽绒马甲 黑色', price: 368, desc: '轻薄保暖，叠穿百搭' },
        { id: 'm11', name: '商务休闲西裤 深灰', price: 258, desc: '抗皱免烫面料，垂感显瘦' },
        { id: 'm12', name: '宽松卫裤 燕麦色', price: 168, desc: '加绒保暖，居家外出都舒适' },
        { id: 'm13', name: '牛仔直筒裤 浅蓝', price: 198, desc: '复古水洗，宽松版型显腿直' },
        { id: 'm14', name: '羊毛针织开衫 雾灰', price: 328, desc: '柔软亲肤，春秋叠穿利器' },
        { id: 'm15', name: '机能风冲锋衣 黑色', price: 568, desc: '防风防泼水，户外通勤都适用' }
    ],
    menaccessories: [
        { id: 'ma1', name: '商务皮带 真皮黑色', price: 168, desc: '头层牛皮，自动扣简约大气' },
        { id: 'ma2', name: '机械腕表 复古棕', price: 598, desc: '进口机芯，复古罗马字盘显气质' },
        { id: 'ma3', name: '真皮短钱包 棕色', price: 188, desc: '头层牛皮，多卡位轻薄便携' },
        { id: 'ma4', name: '帆布腰带 军绿色', price: 88, desc: '日系复古针扣，休闲百搭' },
        { id: 'ma5', name: '商务领带 深蓝色', price: 128, desc: '真丝面料，温莎结挺括有型' },
        { id: 'ma6', name: '针织冷帽 燕麦色', price: 78, desc: '加厚保暖，秋冬街头风必备' },
        { id: 'ma7', name: '皮质手环 棕黑拼', price: 98, desc: '磁吸扣设计，硬朗又有细节' },
        { id: 'ma8', name: '商务公文包 黑色', price: 458, desc: '大容量分区，通勤商务两相宜' },
        { id: 'ma9', name: '钛钢项链 简约款', price: 158, desc: '不褪色不过敏，低调有质感' },
        { id: 'ma10', name: '棒球帽 经典黑', price: 88, desc: '纯棉刺绣，可调节大小' },
        { id: 'ma11', name: '商务墨镜 飞行员款', price: 268, desc: '偏光防紫外线，复古飞行员框' },
        { id: 'ma12', name: '真皮卡包 多卡位', price: 108, desc: '11卡位超薄，告别鼓囊钱包' },
        { id: 'ma13', name: '羊毛围巾 燕麦灰', price: 198, desc: '柔软亲肤，冬日保暖又显气质' },
        { id: 'ma14', name: '运动头带 三条装', price: 58, desc: '吸汗透气，健身运动必备' },
        { id: 'ma15', name: '钥匙扣 真皮挂绳', price: 68, desc: '可挂腰间，方便取用不丢钥匙' }
    ],
    menskincare: [
        { id: 'ms1', name: '男士控油洗面奶', price: 89, desc: '深层清洁，控油不紧绷' },
        { id: 'ms2', name: '男士保湿乳液', price: 128, desc: '清爽不油腻，补水保湿' },
        { id: 'ms3', name: '男士爽肤水', price: 98, desc: '收缩毛孔，二次清洁' },
        { id: 'ms4', name: '男士面膜 补水款', price: 118, desc: '密集补水，改善暗沉' },
        { id: 'ms5', name: '男士眼霜', price: 168, desc: '淡化黑眼圈，紧致眼周' },
        { id: 'ms6', name: '男士精华液', price: 198, desc: '抗老修护，提升气色' },
        { id: 'ms7', name: '男士面霜 冬天款', price: 148, desc: '深层滋养，告别干燥' },
        { id: 'ms8', name: '男士剃须泡沫', price: 68, desc: '绵密泡沫，顺滑剃须' },
        { id: 'ms9', name: '男士香水 木质调', price: 258, desc: '沉稳木质香，魅力加分' },
        { id: 'ms10', name: '男士护肤套装', price: 398, desc: '全套护肤，一步到位' },
        { id: 'ms11', name: '男士控油爽肤水', price: 108, desc: '收敛毛孔，控油持久不泛光' },
        { id: 'ms12', name: '男士防晒霜 SPF50', price: 138, desc: '清爽不假白，户外通勤都适用' },
        { id: 'ms13', name: '男士去角质凝胶', price: 88, desc: '温和去角质，皮肤更细腻' },
        { id: 'ms14', name: '男士唇膏 无色款', price: 58, desc: '滋润不油腻，告别起皮干裂' },
        { id: 'ms15', name: '男士修颜隔离霜', price: 168, desc: '隐形毛孔提亮肤色，素颜也精神' }
    ],
    digital: [
        { id: 'd1', name: '无线蓝牙耳机 白色', price: 299, desc: '主动降噪，音质超棒' },
        { id: 'd2', name: '机械键盘 青轴', price: 399, desc: 'RGB灯效，打字手感超棒' },
        { id: 'd3', name: '无线鼠标 静音款', price: 158, desc: '人体工学设计，办公游戏皆宜' },
        { id: 'd4', name: '智能手表 运动款', price: 599, desc: '心率监测，多种运动模式' },
        { id: 'd5', name: '充电宝 20000mAh', price: 188, desc: '大容量，双向快充' },
        { id: 'd6', name: '蓝牙音箱 便携款', price: 228, desc: '360°环绕音效，低音震撼' },
        { id: 'd7', name: '手机支架 桌面款', price: 68, desc: '可调节角度，解放双手' },
        { id: 'd8', name: '数据线 快充三合一', price: 48, desc: '一线三用，苹果安卓都支持' },
        { id: 'd9', name: '电竞游戏手柄', price: 268, desc: '震动反馈，手感一流' },
        { id: 'd10', name: '补光灯 主播款', price: 158, desc: '三色温可调，拍照录视频必备' },
        { id: 'd11', name: '降噪头戴式耳机', price: 699, desc: '主动降噪长续航，沉浸式听歌' },
        { id: 'd12', name: '迷你蓝牙键盘', price: 198, desc: '平板手机通用，轻便随身带' },
        { id: 'd13', name: '磁吸充电宝 10000mAh', price: 168, desc: '无线磁吸快充，告别线缆缠绕' },
        { id: 'd14', name: '桌面氛围灯 RGB', price: 138, desc: 'App智能调光，电竞桌面必备' },
        { id: 'd15', name: '智能体脂秤', price: 128, desc: '精准称重测体脂，健康管理好帮手' }
    ],
    womenshoes: [
        { id: 'ws1', name: '奶白色老爹鞋', price: 358, desc: '厚底增高显腿长，舒适百搭不磨脚' },
        { id: 'ws2', name: '法式玛丽珍鞋', price: 298, desc: '复古圆头小皮鞋，温柔淑女风必备' },
        { id: 'ws3', name: '燕麦色乐福鞋', price: 328, desc: '一脚蹬懒人鞋，通勤休闲都好穿' },
        { id: 'ws4', name: '细带凉鞋 米白色', price: 268, desc: '简约细带设计，显脚瘦又温柔' },
        { id: 'ws5', name: '帆布鞋 奶白色', price: 188, desc: '经典百搭款，四季都能穿' },
        { id: 'ws6', name: '切尔西短靴 驼色', price: 458, desc: '真皮材质，显脚小又百搭' },
        { id: 'ws7', name: '运动鞋 香芋紫', price: 388, desc: '轻量化设计，跑步逛街都舒适' },
        { id: 'ws8', name: '尖头平底鞋 裸色', price: 258, desc: '显腿长神器，职场通勤必备' },
        { id: 'ws9', name: '厚底松糕鞋 黑色', price: 338, desc: '小个子福音，增高5cm不显重' },
        { id: 'ws10', name: '毛毛拖鞋 米白色', price: 198, desc: '软糯温暖，居家外穿都好看' },
        { id: 'ws11', name: '马丁靴 8孔', price: 498, desc: '真皮牛皮，酷飒显瘦，四季可穿' },
        { id: 'ws12', name: '鱼嘴高跟鞋 裸色', price: 368, desc: '细跟8cm，优雅显气质' },
        { id: 'ws13', name: '豆豆鞋 焦糖色', price: 288, desc: '柔软舒适，开车逛街两不误' },
        { id: 'ws14', name: '高帮帆布鞋 奶白', price: 218, desc: '复古学院风，减龄又百搭' },
        { id: 'ws15', name: '芭蕾单鞋 缎面粉', price: 278, desc: '缎面蝴蝶结，温柔仙女风' }
    ],
    menshoes: [
        { id: 'ms1', name: '白色运动鞋 经典款', price: 398, desc: '百搭小白鞋，通勤休闲都能穿' },
        { id: 'ms2', name: '商务皮鞋 黑色', price: 598, desc: '头层牛皮，职场正式场合必备' },
        { id: 'ms3', name: '复古板鞋 灰绿色', price: 358, desc: '街头潮流风，搭配牛仔裤超好看' },
        { id: 'ms4', name: '切尔西靴 深棕色', price: 488, desc: '真皮材质，英伦风绅士感' },
        { id: 'ms5', name: '帆布鞋 黑色', price: 228, desc: '经典百搭，四季都能穿' },
        { id: 'ms6', name: '老爹鞋 灰白拼色', price: 428, desc: '厚底增高，潮流感十足' },
        { id: 'ms7', name: '乐福鞋 深棕色', price: 388, desc: '一脚蹬懒人鞋，商务休闲皆宜' },
        { id: 'ms8', name: '跑步鞋 黑色', price: 458, desc: '缓震透气，专业跑步体验' },
        { id: 'ms9', name: '马丁靴 黑色', price: 528, desc: '真皮牛皮，酷飒有型，工装风必备' },
        { id: 'ms10', name: '豆豆鞋 藏青色', price: 328, desc: '柔软舒适，开车休闲两不误' },
        { id: 'ms11', name: '高帮篮球鞋', price: 568, desc: '专业缓震护踝，实战打球利器' },
        { id: 'ms12', name: '帆布板鞋 米白色', price: 268, desc: '简约干净，日常通勤好选择' },
        { id: 'ms13', name: '工装靴 沙色', price: 498, desc: '大黄靴风格，硬汉户外风' },
        { id: 'ms14', name: '休闲皮鞋 酒红棕', price: 468, desc: '擦色工艺，复古绅士感' },
        { id: 'ms15', name: '拖鞋 室内外两用', price: 168, desc: '软底舒适，居家外穿都可以' }
    ],
    cars: [
        { id: 'car1', name: '特斯拉 Model S Plaid', price: 899000, desc: '纯电旗舰轿车，零百加速2.1秒，续航652公里' },
        { id: 'car2', name: '保时捷 911 Carrera', price: 1298000, desc: '经典后置后驱跑车，3.0T双涡轮，操控王者' },
        { id: 'car3', name: '奔驰 S500L 迈巴赫版', price: 2388000, desc: '顶级行政座驾，后排航空座椅，极致舒适' },
        { id: 'car4', name: '宝马 M4 Competition', price: 898000, desc: '双门性能轿跑，510马力直六，漂移神器' },
        { id: 'car5', name: '路虎揽胜 加长版', price: 1988000, desc: '全尺寸豪华SUV，全地形越野+顶级内饰' },
        { id: 'car6', name: '奥迪 RS6 Avant', price: 1428000, desc: '地表最强旅行车，4.0T V8，家用速度两不误' },
        { id: 'car7', name: '理想 L9 Max', price: 459800, desc: '家庭智能旗舰SUV，增程式无焦虑，后排娱乐屏' },
        { id: 'car8', name: '蔚来 ET7 行政版', price: 528000, desc: '智能电动旗舰轿车，换电3分钟，NAD自动驾驶' },
        { id: 'car9', name: '比亚迪 仰望U8', price: 1098000, desc: '国产硬派越野巅峰，水陆两栖，原地掉头' },
        { id: 'car10', name: '极氪 001 FR', price: 769000, desc: '纯电猎装超跑，四电机1265马力，坦克掉头' },
        { id: 'car11', name: '丰田 埃尔法 尊贵版', price: 928000, desc: 'MPV加价王，航空头等舱座椅，老板专属' },
        { id: 'car12', name: 'Jeep 牧马人 卢比肯', price: 569900, desc: '硬派越野标杆，可拆卸车顶，极限穿越利器' },
        { id: 'car13', name: '大众 高尔夫 GTI', price: 229800, desc: '钢炮鼻祖，2.0T前驱，驾驶乐趣拉满' },
        { id: 'car14', name: 'Mini Cooper JCW', price: 361800, desc: '英伦小钢炮，卡丁车操控，复古又可爱' },
        { id: 'car15', name: '五菱宏光 MINI EV', price: 49800, desc: '国民代步神车，好开好停，买菜接娃神器' }
    ],
    houses: [
        { id: 'h1', name: '汤臣一品 顶层复式', price: 288000000, desc: '上海陆家嘴江景顶豪，598平6居，俯瞰黄浦江' },
        { id: 'h2', name: '北京壹号院 湖景独栋', price: 168000000, desc: '朝阳公园旁独栋别墅，私家花园800平，地下酒窖' },
        { id: 'h3', name: '深圳湾一号 T7栋', price: 98000000, desc: '深圳湾超级总部海景大平层，420平4居，无敌海景' },
        { id: 'h4', name: '杭州绿城云栖玫瑰园', price: 68000000, desc: '中式合院别墅，江南园林风格，私家泳池庭院' },
        { id: 'h5', name: '广州侨鑫汇悦台', price: 52000000, desc: '珠江新城一线江景，365平五居，顶级物业配套' },
        { id: 'h6', name: '成都麓湖生态城 黑珍珠', price: 45000000, desc: '湖岛独栋别墅，三面环水，现代建筑美学' },
        { id: 'h7', name: '三亚亚特兰蒂斯·棠岸', price: 38000000, desc: '海景独栋度假别墅，私家海滩，酒店式服务' },
        { id: 'h8', name: '苏州桃花源 中式大宅', price: 58000000, desc: '纯正苏州园林宅邸，白墙黛瓦，曲径通幽' },
        { id: 'h9', name: '南京绿城玫瑰园 法式独栋', price: 32000000, desc: '法式宫廷风别墅，千平花园，室内电梯泳池' },
        { id: 'h10', name: '武汉天地 云廷二期', price: 25000000, desc: '汉口江滩一线江景大平层，280平4居，学区顶配' },
        { id: 'h11', name: '厦门建发养云 叠加别墅', price: 18000000, desc: '新中式叠墅，上下四层，私家庭院+地下影音室' },
        { id: 'h12', name: '重庆来福士广场 朝天阁', price: 22000000, desc: '两江交汇处地标豪宅，空中连廊观景，270°江景' },
        { id: 'h13', name: '西安中大国际九号', price: 16000000, desc: '高新核心区精装大平层，220平3居，顶级会所' },
        { id: 'h14', name: '青岛海信君澜 海景房', price: 12000000, desc: '浮山湾一线海景，200平四居，下楼即是沙滩' },
        { id: 'h15', name: '大理苍山小院 山景别墅', price: 6800000, desc: '苍山脚下白族风格院落，观洱海望雪山，避世秘境' }
    ]
};

const shopSpecsData = {
    women: [['S', 'M', 'L', 'XL'], ['均码'], ['S', 'M', 'L']],
    beauty: [['正装', '小样套装']],
    accessories: [['均码']],
    home: [['标准款', '加大款']],
    men: [['S', 'M', 'L', 'XL', 'XXL']],
    menaccessories: [['均码']],
    menskincare: [['正装', '旅行装']],
    digital: [['标准版', 'Pro版']],
    womenshoes: [['35', '36', '37', '38', '39', '40']],
    menshoes: [['38', '39', '40', '41', '42', '43', '44']],
    cars: [['标配版', '高配版', '顶配版']],
    houses: [['毛坯', '简装', '精装修']]
};

function shopGetProductsByCat(cat) {
    if (cat === 'all') {
        let all = [];
        for (let key in shopProductsData) {
            all = all.concat(shopProductsData[key]);
        }
        return all.slice(0, 10);
    }
    return shopProductsData[cat] || [];
}

function shopGetCatOfProduct(id) {
    for (let key in shopProductsData) {
        if (shopProductsData[key].find(p => p.id === id)) return key;
    }
    return 'women';
}

const shopCatLabels = {
    women: '女装服饰',
    beauty: '美妆护肤',
    accessories: '女生配饰',
    home: '居家好物',
    men: '男士服饰',
    menaccessories: '男生配饰',
    menskincare: '男士护肤',
    digital: '数码潮玩',
    womenshoes: '女生鞋子',
    menshoes: '男生鞋子',
    cars: '车子',
    houses: '房子'
};

function shopGenerateDescFromProduct(product, cat) {
    const desc = product.desc || '';
    const templates = {
        women: [
            `温柔的${desc.replace(/。/g, '')}，上身效果超出预期`,
            `${desc.replace(/。/g, '')}，版型宽松显瘦不挑身材`,
            `面料柔软亲肤，${desc.replace(/。/g, '')}`,
            `配色高级显白，${desc.replace(/。/g, '')}，日常通勤都好搭`
        ],
        beauty: [
            `${desc.replace(/。/g, '')}，上脸/上唇效果绝了`,
            `质地顺滑好推开，${desc.replace(/。/g, '')}`,
            `${desc.replace(/。/g, '')}，持妆/保湿效果超持久`,
            `味道高级好闻，${desc.replace(/。/g, '')}，回购无数次`
        ],
        accessories: [
            `${desc.replace(/。/g, '')}，细节精致有质感`,
            `搭配衣服超加分，${desc.replace(/。/g, '')}`,
            `${desc.replace(/。/g, '')}，做工精细不廉价`,
            `设计独特有巧思，${desc.replace(/。/g, '')}，谁戴谁好看`
        ],
        home: [
            `${desc.replace(/。/g, '')}，放在家里瞬间提升幸福感`,
            `质感满满颜值高，${desc.replace(/。/g, '')}`,
            `${desc.replace(/。/g, '')}，实用又好看，每天都想用`,
            `做工扎实有分量，${desc.replace(/。/g, '')}，朋友来都夸`
        ],
        men: [
            `${desc.replace(/。/g, '')}，穿上利落精神`,
            `面料挺括有型，${desc.replace(/。/g, '')}`,
            `${desc.replace(/。/g, '')}，版型正显气质，通勤休闲都适配`,
            `质感高级不廉价，${desc.replace(/。/g, '')}，送人也有面`
        ],
        menaccessories: [
            `${desc.replace(/。/g, '')}，低调有质感`,
            `细节处见品质，${desc.replace(/。/g, '')}`,
            `${desc.replace(/。/g, '')}，实用又有设计感`,
            `百搭不出错，${desc.replace(/。/g, '')}，男生必备单品`
        ],
        menskincare: [
            `${desc.replace(/。/g, '')}，用后清爽不油腻`,
            `温和不刺激，${desc.replace(/。/g, '')}`,
            `${desc.replace(/。/g, '')}，护肤一步到位`,
            `质地好吸收，${desc.replace(/。/g, '')}，皮肤状态越来越好`
        ],
        digital: [
            `${desc.replace(/。/g, '')}，性能给力体验超棒`,
            `颜值高又好用，${desc.replace(/。/g, '')}`,
            `${desc.replace(/。/g, '')}，续航/音质超出预期`,
            `做工扎实细节到位，${desc.replace(/。/g, '')}，性价比拉满`
        ],
        womenshoes: [
            `${desc.replace(/。/g, '')}，上脚显脚瘦又好看`,
            `舒适不磨脚，${desc.replace(/。/g, '')}`,
            `${desc.replace(/。/g, '')}，搭配裙子裤子都好看`,
            `版型正显腿长，${desc.replace(/。/g, '')}，出门必穿款`
        ],
        menshoes: [
            `${desc.replace(/。/g, '')}，上脚帅气有型`,
            `舒适好走路，${desc.replace(/。/g, '')}`,
            `${desc.replace(/。/g, '')}，搭配牛仔裤休闲裤都好看`,
            `做工扎实耐穿，${desc.replace(/。/g, '')}，男生鞋柜必备`
        ],
        cars: [
            `${desc.replace(/。/g, '')}，开出去回头率爆表`,
            `动力澎湃操控精准，${desc.replace(/。/g, '')}`,
            `${desc.replace(/。/g, '')}，内饰豪华配置拉满`,
            `坐进去就是享受，${desc.replace(/。/g, '')}， dream car实锤`
        ],
        houses: [
            `${desc.replace(/。/g, '')}，采光通透户型方正`,
            `地段优越配套齐全，${desc.replace(/。/g, '')}`,
            `${desc.replace(/。/g, '')}，物业服务贴心到位`,
            `住进来幸福感爆棚，${desc.replace(/。/g, '')}，理想中的家`
        ]
    };
    const catTpls = templates[cat] || templates.women;
    const pick = catTpls[Math.abs(product.id.charCodeAt(product.id.length - 1)) % catTpls.length];
    return pick.length > 50 ? pick.slice(0, 48) + '…' : pick;
}

function shopGetSpecsOfProduct(id) {
    const cat = shopGetCatOfProduct(id);
    const specs = shopSpecsData[cat];
    return specs ? specs[0] : ['标准款'];
}

function shopRenderProducts() {
    let products = shopGetProductsByCat(shopState.currentCat);
    products = shopFilterProductsByKeyword(products);
    const grid = document.getElementById('shopProductsGrid');
    grid.innerHTML = '';

    if (products.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: span 2; text-align: center; padding: 60px 20px;">
                <div style="font-size: 48px; margin-bottom: 12px;">🔍</div>
                <div style="font-size: 16px; font-weight: 600; color: #8a7aa0;">没有找到相关商品</div>
                <div style="font-size: 13px; color: #b8a8c8; margin-top: 4px;">试试其他关键词吧</div>
            </div>
        `;
        return;
    }

    products.forEach((p, idx) => {
        const card = document.createElement('div');
        card.className = 'shop-product-card';
        const isFav = shopState.favorites.has(p.id);
        const hasCustomImg = shopState.customProductImgs && shopState.customProductImgs[p.id];

        if (hasCustomImg) {
            card.innerHTML = `
                <div class="shop-prod-img-wrap" onclick="shopOpenProductDetail('${p.id}')">
                    <div class="shop-prod-img" style="background-image:url('${shopState.customProductImgs[p.id]}')"></div>
                </div>
                <div class="shop-prod-info" onclick="shopOpenProductDetail('${p.id}')">
                    <div class="shop-prod-name">${p.name}</div>
                    <div class="shop-prod-price">¥${p.price}</div>
                </div>
            `;
        } else {
            const cat = shopGetCatOfProduct(p.id);
            const descDetail = shopGenerateDescFromProduct(p, cat);
            card.innerHTML = `
                <div class="shop-prod-desc-wrap" onclick="shopOpenProductDetail('${p.id}')">
                    <div class="shop-prod-desc-title">${p.name}</div>
                    <div class="shop-prod-desc-text">${descDetail}</div>
                    <div class="shop-prod-desc-tag">${shopCatLabels[cat] || '精选好物'}</div>
                </div>
                <div class="shop-prod-info" onclick="shopOpenProductDetail('${p.id}')">
                    <div class="shop-prod-name">${p.name}</div>
                    <div class="shop-prod-price">¥${p.price}</div>
                </div>
            `;
        }
        grid.appendChild(card);
    });

    if (shopCurrentColorScheme) {
        shopApplyColorScheme(shopCurrentColorScheme);
    }
}

function shopBindCategoryClicks() {
    document.querySelectorAll('.shop-cat-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.shop-cat-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            shopState.currentCat = item.dataset.cat;
            shopRenderProducts();
        });
    });
}

function shopBindTabClicks() {
    document.querySelectorAll('.shop-tab-item').forEach(item => {
        item.addEventListener('click', () => {
            shopSwitchTab(item.dataset.target);
        });
    });
}

function shopSwitchTab(tabName) {
    document.querySelectorAll('.shop-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.shop-tab-item').forEach(v => v.classList.remove('active'));
    const tabEl = document.querySelector(`.shop-tab-item[data-target="${tabName}"]`);
    if(tabEl) tabEl.classList.add('active');
    const viewEl = document.getElementById(`shopView${tabName}`);
    if(viewEl) viewEl.classList.add('active');

    if(tabName === 'Cart') {
        shopRenderCart();
    }
}

function shopOpenProductDetail(productId) {
    shopState.currentProductId = productId;
    const cat = shopGetCatOfProduct(productId);
    const product = shopProductsData[cat].find(p => p.id === productId);
    if (!product) return;

    const specs = shopGetSpecsOfProduct(productId);
    shopState.selectedSpec = 0;
    shopState.selectedRoleId = null;
    shopUpdateRoleSelectText();

    document.getElementById('shopProductDetailName').textContent = product.name;
    document.getElementById('shopProductDetailPrice').textContent = '¥' + product.price;
    document.getElementById('shopProductDesc').textContent = product.desc;

    // 根据是否有自定义图片，显示图片版或文字描述版
    const hasCustomImg = shopState.customProductImgs && shopState.customProductImgs[productId];
    const imgBox = document.getElementById('shopProductImgBox');
    const descHero = document.getElementById('shopProductDescHero');
    const closeBtn = document.querySelector('#shopProductHero .shop-close-btn');

    if (hasCustomImg) {
        imgBox.style.display = 'block';
        descHero.style.display = 'none';
        document.getElementById('shopProductDetailImg').style.backgroundImage =
            `url('${shopState.customProductImgs[productId]}')`;
        if (closeBtn) closeBtn.style.color = '#fff';
    } else {
        imgBox.style.display = 'none';
        descHero.style.display = 'flex';
        document.getElementById('shopProductDescHeroTitle').textContent = product.name;
        document.getElementById('shopProductDescHeroText').textContent = shopGenerateDescFromProduct(product, cat);
        document.getElementById('shopProductDescHeroTag').textContent = shopCatLabels[cat] || '精选好物';
        if (closeBtn) closeBtn.style.color = '#5a4a6a';
    }

    const favBtn = document.getElementById('shopProductFavBtn');
    if (shopState.favorites.has(productId)) {
        favBtn.classList.add('favorited');
    } else {
        favBtn.classList.remove('favorited');
    }

    const specTagsEl = document.getElementById('shopSpecTags');
    specTagsEl.innerHTML = '';
    specs.forEach((spec, idx) => {
        const tag = document.createElement('div');
        tag.className = 'shop-spec-tag' + (idx === 0 ? ' active' : '');
        tag.textContent = spec;
        tag.onclick = () => {
            specTagsEl.querySelectorAll('.shop-spec-tag').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            shopState.selectedSpec = idx;
        };
        specTagsEl.appendChild(tag);
    });

    shopState.selectedSpec = 0;
    shopState.selectedRoleId = null;
    shopUpdateRoleSelectText();

    shopOpenModal('shopModalProduct');
    shopRenderComments(product.id);
}

function shopUpdateRoleSelectText() {
    const el = document.getElementById('shopRoleSelectText');
    if (!el) return;
    if (shopState.selectedRoleId) {
        const role = shopExtendedState.roles.find(r => r.id === shopState.selectedRoleId);
        if (role) {
            el.textContent = role.name;
            el.classList.add('selected');
            return;
        }
    }
    el.textContent = '点击选择角色';
    el.classList.remove('selected');
}

// 评论系统
function shopGenerateComments(productId) {
    const count = 10 + Math.floor(Math.random() * 6);
    const users = shopExtendedState.commentUsers;
    const templates = shopExtendedState.commentTemplates;
    const replyTpls = shopExtendedState.replyTemplates;
    const comments = [];

    for (let i = 0; i < count; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        const rating = 4 + Math.floor(Math.random() * 2);
        const text = templates[Math.floor(Math.random() * templates.length)];
        const daysAgo = Math.floor(Math.random() * 60) + 1;
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        const timeStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;

        const replies = [];
        const replyCount = Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : 0;
        for (let j = 0; j < replyCount; j++) {
            const replyUser = users[Math.floor(Math.random() * users.length)];
            replies.push({
                id: 'r' + i + '_' + j,
                user: replyUser.name,
                avatar: replyUser.avatar,
                text: replyTpls[Math.floor(Math.random() * replyTpls.length)],
                time: timeStr
            });
        }

        comments.push({
            id: 'c' + productId + '_' + i,
            user: user.name,
            avatar: user.avatar,
            rating,
            text,
            time: timeStr,
            replies
        });
    }

    shopExtendedState.productComments[productId] = comments;
    return comments;
}

function shopRenderComments(productId) {
    const listEl = document.getElementById('shopCommentList');
    const countEl = document.getElementById('shopCommentCount');
    let comments = shopExtendedState.productComments[productId];
    if (!comments) {
        comments = shopGenerateComments(productId);
    }

    countEl.textContent = comments.length;
    listEl.innerHTML = '';

    comments.forEach(comment => {
        const item = document.createElement('div');
        item.className = 'shop-comment-item';

        const stars = '★'.repeat(comment.rating) + '☆'.repeat(5 - comment.rating);

        let repliesHtml = '';
        if (comment.replies && comment.replies.length > 0) {
            repliesHtml = '<div class="shop-comment-replies">';
            comment.replies.forEach(reply => {
                repliesHtml += `
                    <div class="shop-comment-reply">
                        <div class="shop-comment-avatar">${reply.avatar}</div>
                        <div class="shop-comment-body">
                            <div class="shop-comment-name">${reply.user}</div>
                            <div class="shop-comment-text">${reply.text}</div>
                        </div>
                    </div>
                `;
            });
            repliesHtml += '</div>';
        }

        item.innerHTML = `
            <div class="shop-comment-avatar">${comment.avatar}</div>
            <div class="shop-comment-body">
                <div class="shop-comment-name">${comment.user}<span class="shop-comment-reply-btn" data-cid="${comment.id}">回复</span></div>
                <div class="shop-comment-stars">${stars}</div>
                <div class="shop-comment-text">${comment.text}</div>
                <div class="shop-comment-time">${comment.time}</div>
                ${repliesHtml}
            </div>
        `;
        listEl.appendChild(item);
    });

    listEl.querySelectorAll('.shop-comment-reply-btn').forEach(btn => {
        btn.onclick = (e) => {
            e.stopPropagation();
            const cid = btn.dataset.cid;
            const comment = comments.find(c => c.id === cid);
            if (!comment) return;
            shopShowReplyPrompt(productId, cid, comment.user);
        };
    });
}

function shopShowReplyPrompt(productId, commentId, replyToName) {
    const text = prompt('回复 @' + replyToName + '：');
    if (!text || !text.trim()) return;

    const comments = shopExtendedState.productComments[productId];
    const comment = comments.find(c => c.id === commentId);
    if (!comment) return;

    if (!comment.replies) comment.replies = [];
    comment.replies.push({
        id: 'r_self_' + Date.now(),
        user: shopState.userProfile.name,
        avatar: '🙂',
        replyTo: replyToName,
        text: text.trim(),
        time: '刚刚'
    });

    shopRenderComments(productId);
    shopShowToast('回复成功');
}

function shopRefreshComments() {
    if (!shopState.currentProductId) return;

    const refreshBtn = document.querySelector('.shop-comment-refresh');
    refreshBtn.classList.add('spinning');
    setTimeout(() => refreshBtn.classList.remove('spinning'), 600);

    shopExtendedState.productComments[shopState.currentProductId] = null;
    shopRenderComments(shopState.currentProductId);
}

// 写评价
function shopOpenWriteComment() {
    if (!shopState.currentProductId) return;
    const product = shopGetProductById(shopState.currentProductId);
    if (!product) return;

    shopState.currentCommentRating = 5;

    const prodEl = document.getElementById('shopWriteCommentProduct');
    const hasCustomImg = shopState.customProductImgs && shopState.customProductImgs[product.id];
    const cat = shopGetCatOfProduct(product.id);
    const descDetail = shopGenerateDescFromProduct(product, cat);
    
    let prodMediaHtml = '';
    if (hasCustomImg) {
        prodMediaHtml = `<div class="shop-writecomment-prod-img" style="background-image:url('${shopState.customProductImgs[product.id]}')"></div>`;
    } else {
        prodMediaHtml = `
            <div class="shop-writecomment-prod-desc">
                <div class="shop-writecomment-prod-desc-title">${product.name}</div>
                <div class="shop-writecomment-prod-desc-text">${descDetail}</div>
                <div class="shop-writecomment-prod-desc-tag">${shopCatLabels[cat] || '精选好物'}</div>
            </div>
        `;
    }
    
    prodEl.innerHTML = `
        ${prodMediaHtml}
        <div class="shop-writecomment-prod-info">
            <div class="shop-writecomment-prod-name">${product.name}</div>
            <div class="shop-writecomment-prod-spec">${product.desc}</div>
        </div>
    `;

    shopUpdateWriteCommentStars(5);
    document.getElementById('shopWriteCommentText').value = '';

    shopOpenModal('shopModalWriteComment');
}

function shopUpdateWriteCommentStars(rating) {
    shopState.currentCommentRating = rating;
    const stars = document.querySelectorAll('#shopWriteCommentStars .shop-star');
    stars.forEach((star, idx) => {
        if (idx < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function shopBindCommentStars() {
    const stars = document.querySelectorAll('#shopWriteCommentStars .shop-star');
    stars.forEach((star, idx) => {
        star.addEventListener('click', () => {
            shopUpdateWriteCommentStars(idx + 1);
        });
    });
}

function shopSubmitComment() {
    if (!shopState.currentProductId) return;
    const text = document.getElementById('shopWriteCommentText').value.trim();
    if (!text) {
        shopShowToast('请输入评价内容');
        return;
    }

    const productId = shopState.currentProductId;
    let comments = shopExtendedState.productComments[productId];
    if (!comments) comments = shopGenerateComments(productId);

    const newComment = {
        id: 'c_self_' + Date.now(),
        user: shopState.userProfile.name,
        avatar: '🙂',
        rating: shopState.currentCommentRating,
        text: text,
        time: '刚刚',
        replies: []
    };

    comments.unshift(newComment);
    shopRenderComments(productId);
    shopCloseModal('shopModalWriteComment');
    shopShowToast('评价发布成功');
}

// 角色系统
function shopOpenRoles() {
    shopRenderRoles();
    shopOpenModal('shopModalRoles');
}

function shopRenderRoles() {
    const listEl = document.getElementById('shopRoleList');
    listEl.innerHTML = '';

    if (shopExtendedState.roles.length === 0) {
        listEl.innerHTML = '<div style="text-align:center;padding:30px;color:#b8a8c8;font-size:13px;">还没有角色，点击下方添加吧</div>';
        return;
    }

    shopExtendedState.roles.forEach(role => {
        const card = document.createElement('div');
        card.className = 'shop-role-item' + (shopState.selectedRoleId === role.id ? ' selected' : '');

        const avatarStyle = role.avatar
            ? `background-image:url('${role.avatar}');background-size:cover;`
            : '';
        const avatarContent = role.avatar ? '' : role.name.charAt(0);

        card.innerHTML = `
            <div class="shop-role-avatar" style="${avatarStyle}">${avatarContent}</div>
            <div class="shop-role-info">
                <div class="shop-role-name">${role.name}</div>
                <div class="shop-role-desc">${role.desc || '暂无备注'}</div>
            </div>
            <div class="shop-role-delete" data-rid="${role.id}">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#a898c0" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </div>
        `;

        card.onclick = (e) => {
            if (e.target.closest('.shop-role-delete')) return;
            shopState.selectedRoleId = role.id;
            shopUpdateRoleSelectText();
            shopCloseModal('shopModalRoles');
            shopShowToast('已选择 ' + role.name);
        };

        card.querySelector('.shop-role-delete').onclick = (e) => {
            e.stopPropagation();
            shopDeleteRole(role.id);
        };

        listEl.appendChild(card);
    });
}

function shopOpenEditRole() {
    shopState.currentEditRoleId = null;
    shopState.currentEditRoleAvatar = '';
    document.getElementById('shopEditRoleName').value = '';
    document.getElementById('shopEditRoleDesc').value = '';
    const preview = document.getElementById('shopEditRoleAvatarPreview');
    preview.style.backgroundImage = '';
    preview.innerHTML = '<span class="shop-role-avatar-placeholder">点击上传</span>';
    shopOpenModal('shopModalEditRole');
}

function shopTriggerRoleAvatarUpload() {
    document.getElementById('shopRoleAvatarUpload').click();
}

function shopBindRoleAvatarUpload() {
    const input = document.getElementById('shopRoleAvatarUpload');
    if (!input) return;
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            shopState.currentEditRoleAvatar = ev.target.result;
            const preview = document.getElementById('shopEditRoleAvatarPreview');
            preview.style.backgroundImage = `url('${ev.target.result}')`;
            preview.innerHTML = '';
        };
        reader.readAsDataURL(file);
    });
}

function shopSaveRole() {
    const name = document.getElementById('shopEditRoleName').value.trim();
    const desc = document.getElementById('shopEditRoleDesc').value.trim();
    if (!name) {
        shopShowToast('请输入角色名称');
        return;
    }

    shopExtendedState.roles.push({
        id: 'r' + Date.now(),
        name,
        desc: desc || '',
        avatar: shopState.currentEditRoleAvatar || ''
    });

    shopRenderRoles();
    shopCloseModal('shopModalEditRole');
    shopShowToast('角色添加成功');
}

function shopDeleteRole(roleId) {
    shopExtendedState.roles = shopExtendedState.roles.filter(r => r.id !== roleId);
    if (shopState.selectedRoleId === roleId) {
        shopState.selectedRoleId = null;
        shopUpdateRoleSelectText();
    }
    shopRenderRoles();
    shopShowToast('已删除角色');
}

function shopToggleFavorite(productId, btnEl) {
    if (shopState.favorites.has(productId)) {
        shopState.favorites.delete(productId);
        shopShowToast('已取消收藏');
    } else {
        shopState.favorites.add(productId);
        shopShowToast('收藏成功');
    }

    if (btnEl) {
        btnEl.classList.toggle('favorited');
    }

    const favBtn = document.getElementById('shopProductFavBtn');
    if (shopState.favorites.has(productId)) {
        favBtn.classList.add('favorited');
    } else {
        favBtn.classList.remove('favorited');
    }

    shopUpdateFavCount();
}

function shopToggleFavoriteFromDetail() {
    if (!shopState.currentProductId) return;
    shopToggleFavorite(shopState.currentProductId, null);
    shopRenderProducts();
}

function shopUpdateFavCount() {
    document.getElementById('shopFavCount').textContent = shopState.favorites.size + ' 件';
}

function shopAddToCart() {
    if (!shopState.currentProductId) return;
    const productId = shopState.currentProductId;
    const cat = shopGetCatOfProduct(productId);
    const product = shopProductsData[cat].find(p => p.id === productId);
    if (!product) return;

    const specs = shopGetSpecsOfProduct(productId);
    const spec = specs[shopState.selectedSpec] || '标准款';
    const cartKey = productId + '_' + spec;

    const existing = shopState.cart.find(item => item.key === cartKey);
    if (existing) {
        existing.qty += 1;
    } else {
        shopState.cart.push({
            key: cartKey,
            id: productId,
            name: product.name,
            price: product.price,
            spec: spec,
            qty: 1,
            imgSeed: productId
        });
    }

    shopUpdateCartBadge();
    shopShowToast('已加入购物车');
}

function shopUpdateCartBadge() {
    const total = shopState.cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('shopCartBadge').textContent = total;
    document.getElementById('shopTabBadge').textContent = total;
}

function shopBuyNow() {
    if (!shopState.currentProductId) return;
    const productId = shopState.currentProductId;
    const cat = shopGetCatOfProduct(productId);
    const product = shopProductsData[cat].find(p => p.id === productId);
    if (!product) return;

    const specs = shopGetSpecsOfProduct(productId);
    const spec = specs[shopState.selectedSpec] || '标准款';
    const customImg = (shopState.customProductImgs && shopState.customProductImgs[productId]) ? shopState.customProductImgs[productId] : `https://picsum.photos/seed/${productId}/200/200`;

    shopState.buyNowData = {
        productId,
        name: product.name,
        price: product.price,
        spec,
        imgSeed: productId,
        customImg,
        qty: 1,
        roleId: shopState.selectedRoleId
    };

    shopState.buyNowSelectedCouponId = null;
    shopEnsureDefaultAddress();

    document.getElementById('shopBuyNowProduct').innerHTML = `
        <div class="shop-buynow-prod-img" style="background-image:url('${customImg}')"></div>
        <div class="shop-buynow-prod-info">
            <div class="shop-buynow-prod-name">${product.name}</div>
            <div class="shop-buynow-prod-spec">规格：${spec}</div>
            <div class="shop-buynow-prod-price">¥${product.price}</div>
        </div>
    `;

    shopRenderBuyNowCoupons(product.price);
    shopUpdateBuyNowPrice();
    shopUpdateBuyNowAddr();

    shopCloseModal('shopModalProduct');
    setTimeout(() => shopOpenModal('shopModalBuyNow'), 300);
}

function shopRenderBuyNowCoupons(totalPrice) {
    const listEl = document.getElementById('shopBuyNowCouponList');
    const hintEl = document.getElementById('shopBuyNowCouponHint');
    listEl.innerHTML = '';

    const cat = shopState.buyNowData ? shopGetCatOfProduct(shopState.buyNowData.productId) : null;

    const availableCoupons = shopExtendedState.coupons.filter(c => {
        const today = new Date().toISOString().split('T')[0];
        if (c.expiry < today) return false;
        // 分类专属券只有对应分类可用
        if (c.type === 'car') return cat === 'cars';
        if (c.type === 'house') return cat === 'houses';
        if (c.type === 'category') return cat === 'beauty';
        return true;
    });

    if (availableCoupons.length === 0) {
        listEl.innerHTML = '<div style="text-align:center;padding:20px;color:#b8a8c8;font-size:13px;">暂无可用优惠券</div>';
        hintEl.textContent = '暂无可用';
        return;
    }

    hintEl.textContent = availableCoupons.length + ' 张可用';

    availableCoupons.forEach(coupon => {
        const item = document.createElement('div');
        const canUse = totalPrice >= coupon.minAmount;
        item.className = 'shop-buynow-coupon-item' + (canUse ? '' : ' disabled') + (shopState.buyNowSelectedCouponId === coupon.id ? ' selected' : '');

        item.onclick = () => {
            if (!canUse) return;
            shopState.buyNowSelectedCouponId = shopState.buyNowSelectedCouponId === coupon.id ? null : coupon.id;
            shopRenderBuyNowCoupons(totalPrice);
            shopUpdateBuyNowPrice();
        };

        item.innerHTML = `
            <div class="shop-buynow-coupon-left">
                <div class="shop-buynow-coupon-amount">${coupon.amount}</div>
                <div class="shop-buynow-coupon-cond">满${coupon.minAmount}可用</div>
            </div>
            <div class="shop-buynow-coupon-right">
                <div class="shop-buynow-coupon-name">${coupon.name}</div>
                <div class="shop-buynow-coupon-exp">有效期至 ${coupon.expiry}</div>
            </div>
            <div class="shop-buynow-coupon-check"></div>
        `;
        listEl.appendChild(item);
    });
}

function shopUpdateBuyNowPrice() {
    if (!shopState.buyNowData) return;
    const original = shopState.buyNowData.price * shopState.buyNowData.qty;
    let discount = 0;

    if (shopState.buyNowSelectedCouponId) {
        const coupon = shopExtendedState.coupons.find(c => c.id === shopState.buyNowSelectedCouponId);
        if (coupon && original >= coupon.minAmount) {
            discount = coupon.amount;
        }
    }

    const final = Math.max(0, original - discount);
    document.getElementById('shopBuyNowOriginalPrice').textContent = '¥' + original;
    document.getElementById('shopBuyNowDiscount').textContent = '-¥' + discount;
    document.getElementById('shopBuyNowFinalPrice').textContent = '¥' + final;
}

function shopConfirmBuyNow() {
    if (!shopState.buyNowData) return;
    const addr = shopExtendedState.addresses.find(a => a.id === shopExtendedState.currentAddrId);
    if (!addr) {
        shopShowToast('请选择收货地址');
        return;
    }
    const data = shopState.buyNowData;
    const original = data.price * data.qty;
    let discount = 0;
    let usedCoupon = null;

    if (shopState.buyNowSelectedCouponId) {
        const coupon = shopExtendedState.coupons.find(c => c.id === shopState.buyNowSelectedCouponId);
        if (coupon && original >= coupon.minAmount) {
            discount = coupon.amount;
            usedCoupon = coupon;
        }
    }
    const finalTotal = Math.max(0, original - discount);

    const order = {
        id: 'O' + Date.now(),
        items: [{
            key: data.productId,
            id: data.productId,
            name: data.name,
            price: data.price,
            spec: data.spec,
            qty: data.qty,
            imgSeed: data.imgSeed,
            customImg: data.customImg
        }],
        total: original,
        discount,
        finalTotal,
        couponId: shopState.buyNowSelectedCouponId,
        addrId: shopExtendedState.currentAddrId,
        status: 'pending',
        createTime: new Date().toLocaleString('zh-CN'),
        roleId: data.roleId
    };

    shopExtendedState.orders.push(order);

    if (usedCoupon) {
        const idx = shopExtendedState.coupons.findIndex(c => c.id === usedCoupon.id);
        if (idx !== -1) {
            shopExtendedState.coupons.splice(idx, 1);
        }
    }

    shopState.buyNowData = null;
    shopState.buyNowSelectedCouponId = null;
    shopCloseModal('shopModalBuyNow');
    shopUpdateOrderBadges();
    shopShowToast('订单已创建，请前往待付款完成支付');
}

function shopRenderCart() {
    const listEl = document.getElementById('shopCartList');
    const emptyEl = document.getElementById('shopCartEmpty');
    const countEl = document.getElementById('shopCartCount');

    listEl.innerHTML = '';

    if (shopState.cart.length === 0) {
        emptyEl.classList.add('show');
        countEl.textContent = '0 件商品';
        
        const existingFooter = document.querySelector('.shop-cart-footer-wrap');
        if (existingFooter) existingFooter.remove();
        return;
    }

    emptyEl.classList.remove('show');
    const totalQty = shopState.cart.reduce((sum, item) => sum + item.qty, 0);
    countEl.textContent = totalQty + ' 件商品';

    shopState.cart.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'shop-cart-item';
        
        const hasCustomImg = shopState.customProductImgs && shopState.customProductImgs[item.id];
        const cat = shopGetCatOfProduct(item.id);
        const descDetail = shopGenerateDescFromProduct(item, cat);
        
        let mediaHtml = '';
        if (hasCustomImg) {
            mediaHtml = `
                <div class="shop-cart-img" style="background-image:url('${shopState.customProductImgs[item.id]}')" onclick="shopTriggerCartImgUpload(${idx})">
                    <div class="shop-cart-img-edit">
                        <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    </div>
                </div>
            `;
        } else {
            mediaHtml = `
                <div class="shop-cart-desc" onclick="shopTriggerCartImgUpload(${idx})">
                    <div class="shop-cart-desc-title">${item.name}</div>
                    <div class="shop-cart-desc-text">${descDetail}</div>
                    <div class="shop-cart-desc-tag">${shopCatLabels[cat] || '精选好物'}</div>
                    <div class="shop-cart-img-edit">
                        <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    </div>
                </div>
            `;
        }
        
        div.innerHTML = `
            ${mediaHtml}
            <div class="shop-cart-info">
                <div class="shop-cart-name">${item.name} · ${item.spec}</div>
                <div class="shop-cart-bottom">
                    <div class="shop-cart-price">¥${item.price}</div>
                    <div class="shop-cart-qty">
                        <div class="shop-qty-btn" onclick="shopChangeCartQty(${idx}, -1)">−</div>
                        <div class="shop-qty-num">${item.qty}</div>
                        <div class="shop-qty-btn" onclick="shopChangeCartQty(${idx}, 1)">+</div>
                    </div>
                </div>
                <div style="text-align:right;margin-top:6px;">
                    <span class="shop-cart-del" onclick="shopRemoveCartItem(${idx})">删除</span>
                </div>
            </div>
        `;
        listEl.appendChild(div);
    });

    shopRenderCartFooter();
}

function shopRenderCartFooter() {
    const cartView = document.getElementById('shopViewCart');
    let footer = cartView.querySelector('.shop-cart-footer');
    if (!footer) {
        footer = document.createElement('div');
        footer.className = 'shop-cart-footer';
        cartView.appendChild(footer);
    }

    const total = shopState.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    footer.innerHTML = `
        <div class="shop-cart-total">
            <span class="shop-total-label">合计</span>
            <span class="shop-total-price">¥${total}</span>
        </div>
    `;
}

function shopChangeCartQty(idx, delta) {
    const item = shopState.cart[idx];
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        shopState.cart.splice(idx, 1);
    }
    shopUpdateCartBadge();
    shopRenderCart();
}

function shopRemoveCartItem(idx) {
    shopState.cart.splice(idx, 1);
    shopUpdateCartBadge();
    shopRenderCart();
    shopShowToast('已删除');
}

function shopCheckout() {
    if (shopState.cart.length === 0) return;
    shopOpenCartCheckout();
}

// === 默认地址/地址显示 ===
function shopEnsureDefaultAddress() {
    if (shopExtendedState.currentAddrId) {
        const exists = shopExtendedState.addresses.find(a => a.id === shopExtendedState.currentAddrId);
        if (exists) return;
    }
    const def = shopExtendedState.addresses.find(a => a.isDefault);
    if (def) {
        shopExtendedState.currentAddrId = def.id;
    } else if (shopExtendedState.addresses.length > 0) {
        shopExtendedState.currentAddrId = shopExtendedState.addresses[0].id;
    } else {
        shopExtendedState.currentAddrId = null;
    }
}

function shopUpdateBuyNowAddr() {
    const addrTextEl = document.getElementById('shopBuyNowAddrText');
    if (!addrTextEl) return;
    const addr = shopExtendedState.addresses.find(a => a.id === shopExtendedState.currentAddrId);
    if (addr) {
        addrTextEl.textContent = `${addr.name} ${addr.phone} ${addr.region}${addr.detail}`;
        addrTextEl.classList.remove('empty');
    } else {
        addrTextEl.textContent = '请选择收货地址';
        addrTextEl.classList.add('empty');
    }
}

function shopUpdateCartCheckoutAddr() {
    const addrTextEl = document.getElementById('shopCartCheckoutAddrText');
    if (!addrTextEl) return;
    const addr = shopExtendedState.addresses.find(a => a.id === shopExtendedState.currentAddrId);
    if (addr) {
        addrTextEl.textContent = `${addr.name} ${addr.phone} ${addr.region}${addr.detail}`;
        addrTextEl.classList.remove('empty');
    } else {
        addrTextEl.textContent = '请选择收货地址';
        addrTextEl.classList.add('empty');
    }
}

// 地址下拉列表 - 立即购买
function shopToggleBuyNowAddrList(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('shopBuyNowAddrDropdown');
    const arrow = document.getElementById('shopBuyNowAddrArrow');
    const isOpen = dropdown.classList.contains('show');

    shopCloseAllAddrDropdowns();

    if (!isOpen) {
        shopRenderAddrDropdown('shopBuyNowAddrDropdownList', 'buynow');
        dropdown.classList.add('show');
        arrow.classList.add('open');
    }
}

// 地址下拉列表 - 购物车结算
function shopToggleCartAddrList(e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('shopCartAddrDropdown');
    const arrow = document.getElementById('shopCartAddrArrow');
    const isOpen = dropdown.classList.contains('show');

    shopCloseAllAddrDropdowns();

    if (!isOpen) {
        shopRenderAddrDropdown('shopCartAddrDropdownList', 'cart');
        dropdown.classList.add('show');
        arrow.classList.add('open');
    }
}

function shopCloseAllAddrDropdowns() {
    const bn = document.getElementById('shopBuyNowAddrDropdown');
    const ca = document.getElementById('shopCartAddrDropdown');
    const ba = document.getElementById('shopBuyNowAddrArrow');
    const caa = document.getElementById('shopCartAddrArrow');
    if (bn) bn.classList.remove('show');
    if (ca) ca.classList.remove('show');
    if (ba) ba.classList.remove('open');
    if (caa) caa.classList.remove('open');
}

function shopRenderAddrDropdown(listId, source) {
    const listEl = document.getElementById(listId);
    if (!listEl) return;
    listEl.innerHTML = '';

    if (shopExtendedState.addresses.length === 0) {
        listEl.innerHTML = '<div style="text-align:center;padding:20px;color:#b8a8c8;font-size:13px;">暂无地址，点击右上角添加</div>';
        return;
    }

    shopExtendedState.addresses.forEach(addr => {
        const item = document.createElement('div');
        const isSelected = addr.id === shopExtendedState.currentAddrId;
        item.className = 'shop-addr-dropdown-item' + (isSelected ? ' selected' : '');

        item.onclick = (e) => {
            e.stopPropagation();
            shopExtendedState.currentAddrId = addr.id;
            shopUpdateBuyNowAddr();
            shopUpdateCartCheckoutAddr();
            shopRenderAddrDropdown(listId, source);
            setTimeout(() => shopCloseAllAddrDropdowns(), 150);
            shopShowToast('地址已保存');
        };

        const defaultTag = addr.isDefault ? '<span class="shop-addr-dropdown-default-tag">默认</span>' : '';

        item.innerHTML = `
            <div class="shop-addr-dropdown-main">
                <div class="shop-addr-dropdown-name">${addr.name} ${addr.phone}${defaultTag}</div>
                <div class="shop-addr-dropdown-detail">${addr.region} ${addr.detail}</div>
            </div>
            <div class="shop-addr-dropdown-check">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#b888b8" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
        `;
        listEl.appendChild(item);
    });
}

// 点击页面其他地方关闭下拉
document.addEventListener('click', () => {
    shopCloseAllAddrDropdowns();
});

// === 订单角标 ===
function shopUpdateOrderBadges() {
    const counts = { pending: 0, shipping: 0, delivering: 0, review: 0 };
    shopExtendedState.orders.forEach(o => {
        if (counts.hasOwnProperty(o.status)) counts[o.status]++;
    });
    const badgeMap = {
        pending: 'shopBadgePending',
        shipping: 'shopBadgeShipping',
        delivering: 'shopBadgeDelivering',
        review: 'shopBadgeReview'
    };
    Object.keys(badgeMap).forEach(status => {
        const el = document.getElementById(badgeMap[status]);
        if (!el) return;
        if (counts[status] > 0) {
            el.textContent = counts[status] > 99 ? '99+' : counts[status];
            el.style.display = 'flex';
        } else {
            el.style.display = 'none';
        }
    });
}

// === 购物车结算弹窗（地址+优惠券） ===
function shopOpenCartCheckout() {
    if (shopState.cart.length === 0) return;

    shopState.cartCheckoutSelectedCouponId = null;
    shopEnsureDefaultAddress();

    // 渲染商品清单
    const itemsEl = document.getElementById('shopCartCheckoutItems');
    itemsEl.innerHTML = '';
    let totalCount = 0;
    shopState.cart.forEach(item => {
        const itemImg = (shopState.customProductImgs && shopState.customProductImgs[item.id]) ? shopState.customProductImgs[item.id] : `https://picsum.photos/seed/${item.imgSeed}/200/200`;
        const div = document.createElement('div');
        div.className = 'shop-cart-item-mini';
        div.innerHTML = `
            <div class="shop-cart-item-mini-img" style="background-image:url('${itemImg}')"></div>
            <div class="shop-cart-item-mini-info">
                <div>
                    <div class="shop-cart-item-mini-name">${item.name}</div>
                    <div class="shop-cart-item-mini-spec">规格：${item.spec}</div>
                </div>
                <div class="shop-cart-item-mini-bottom">
                    <div class="shop-cart-item-mini-price">¥${item.price}</div>
                    <div class="shop-cart-item-mini-qty">x${item.qty}</div>
                </div>
            </div>
        `;
        itemsEl.appendChild(div);
        totalCount += item.qty;
    });
    document.getElementById('shopCartCheckoutCount').textContent = totalCount + ' 件';

    const total = shopState.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    shopRenderCartCheckoutCoupons(total);
    shopUpdateCartCheckoutPrice();
    shopUpdateCartCheckoutAddr();

    shopOpenModal('shopModalCartCheckout');
}

function shopRenderCartCheckoutCoupons(totalPrice) {
    const listEl = document.getElementById('shopCartCheckoutCouponList');
    const hintEl = document.getElementById('shopCartCheckoutCouponHint');
    listEl.innerHTML = '';

    // 购物车中的分类
    const cartCats = new Set(shopState.cart.map(item => shopGetCatOfProduct(item.id)));

    const availableCoupons = shopExtendedState.coupons.filter(c => {
        const today = new Date().toISOString().split('T')[0];
        if (c.expiry < today) return false;
        // 分类专属券：购物车中包含对应分类商品才显示
        if (c.type === 'car') return cartCats.has('cars');
        if (c.type === 'house') return cartCats.has('houses');
        if (c.type === 'category') return cartCats.has('beauty');
        return true;
    });

    if (availableCoupons.length === 0) {
        listEl.innerHTML = '<div style="text-align:center;padding:20px;color:#b8a8c8;font-size:13px;">暂无可用优惠券</div>';
        hintEl.textContent = '暂无可用';
        return;
    }

    hintEl.textContent = availableCoupons.length + ' 张可用';

    availableCoupons.forEach(coupon => {
        const item = document.createElement('div');
        const canUse = totalPrice >= coupon.minAmount;
        item.className = 'shop-buynow-coupon-item' + (canUse ? '' : ' disabled') + (shopState.cartCheckoutSelectedCouponId === coupon.id ? ' selected' : '');

        item.onclick = () => {
            if (!canUse) return;
            shopState.cartCheckoutSelectedCouponId = shopState.cartCheckoutSelectedCouponId === coupon.id ? null : coupon.id;
            shopRenderCartCheckoutCoupons(totalPrice);
            shopUpdateCartCheckoutPrice();
        };

        item.innerHTML = `
            <div class="shop-buynow-coupon-left">
                <div class="shop-buynow-coupon-amount">${coupon.amount}</div>
                <div class="shop-buynow-coupon-cond">满${coupon.minAmount}可用</div>
            </div>
            <div class="shop-buynow-coupon-right">
                <div class="shop-buynow-coupon-name">${coupon.name}</div>
                <div class="shop-buynow-coupon-exp">有效期至 ${coupon.expiry}</div>
            </div>
            <div class="shop-buynow-coupon-check"></div>
        `;
        listEl.appendChild(item);
    });
}

function shopUpdateCartCheckoutPrice() {
    const original = shopState.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    let discount = 0;
    if (shopState.cartCheckoutSelectedCouponId) {
        const coupon = shopExtendedState.coupons.find(c => c.id === shopState.cartCheckoutSelectedCouponId);
        if (coupon && original >= coupon.minAmount) {
            discount = coupon.amount;
        }
    }
    const final = Math.max(0, original - discount);
    document.getElementById('shopCartCheckoutOriginalPrice').textContent = '¥' + original;
    document.getElementById('shopCartCheckoutDiscount').textContent = '-¥' + discount;
    document.getElementById('shopCartCheckoutFinalPrice').textContent = '¥' + final;
}

function shopConfirmCartCheckout() {
    if (shopState.cart.length === 0) return;
    const addr = shopExtendedState.addresses.find(a => a.id === shopExtendedState.currentAddrId);
    if (!addr) {
        shopShowToast('请选择收货地址');
        return;
    }

    const total = shopState.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    let discount = 0;
    let usedCoupon = null;

    if (shopState.cartCheckoutSelectedCouponId) {
        const coupon = shopExtendedState.coupons.find(c => c.id === shopState.cartCheckoutSelectedCouponId);
        if (coupon && total >= coupon.minAmount) {
            discount = coupon.amount;
            usedCoupon = coupon;
        }
    }

    // 优惠券减免金额按比例分摊到每件商品，每件商品生成一个独立订单
    const finalTotal = Math.max(0, total - discount);
    const ratio = total > 0 ? finalTotal / total : 0;
    const baseTime = Date.now();

    shopState.cart.forEach((item, idx) => {
        const itemTotal = item.price * item.qty;
        const itemFinal = Math.round(itemTotal * ratio * 100) / 100;
        const itemImg = (shopState.customProductImgs && shopState.customProductImgs[item.id]) ? shopState.customProductImgs[item.id] : `https://picsum.photos/seed/${item.imgSeed}/200/200`;

        const order = {
            id: 'O' + baseTime + '_' + idx,
            items: [{
                key: item.id,
                id: item.id,
                name: item.name,
                price: item.price,
                spec: item.spec,
                qty: item.qty,
                imgSeed: item.imgSeed,
                customImg: itemImg
            }],
            total: itemTotal,
            discount: Math.round((itemTotal - itemFinal) * 100) / 100,
            finalTotal: itemFinal,
            couponId: usedCoupon ? shopState.cartCheckoutSelectedCouponId : null,
            addrId: shopExtendedState.currentAddrId,
            status: 'pending',
            createTime: new Date().toLocaleString('zh-CN'),
            roleId: shopState.selectedRoleId
        };
        shopExtendedState.orders.push(order);
    });

    if (usedCoupon) {
        const idx = shopExtendedState.coupons.findIndex(c => c.id === usedCoupon.id);
        if (idx !== -1) {
            shopExtendedState.coupons.splice(idx, 1);
        }
    }

    shopState.cart = [];
    shopState.cartCheckoutSelectedCouponId = null;
    shopUpdateCartBadge();
    shopRenderCart();
    shopCloseModal('shopModalCartCheckout');
    shopUpdateOrderBadges();
    shopShowToast('订单已创建，请前往待付款完成支付');
}

function shopOpenFavorites() {
    shopRenderFavorites();
    shopOpenModal('shopModalFavorites');
}

function shopRenderFavorites() {
    const gridEl = document.getElementById('shopFavGrid');
    const emptyEl = document.getElementById('shopFavEmpty');
    gridEl.innerHTML = '';

    if (shopState.favorites.size === 0) {
        emptyEl.classList.add('show');
        shopUpdateFavCount();
        return;
    }

    emptyEl.classList.remove('show');
    shopUpdateFavCount();

    shopState.favorites.forEach(id => {
        const cat = shopGetCatOfProduct(id);
        const product = shopProductsData[cat].find(p => p.id === id);
        if (!product) return;

        const item = document.createElement('div');
        item.className = 'shop-fav-item';
        item.onclick = () => {
            shopCloseModal('shopModalFavorites');
            setTimeout(() => shopOpenProductDetail(id), 300);
        };
        item.innerHTML = `
            <div class="shop-fav-img" style="background-image:url('https://picsum.photos/seed/${id}/400/400')"></div>
            <div class="shop-fav-info">
                <div class="shop-fav-name">${product.name}</div>
                <div class="shop-fav-price">¥${product.price}</div>
            </div>
        `;
        gridEl.appendChild(item);
    });
}

function shopOpenLogistics(type) {
    const statusMap = {
        'pending': '待付款',
        'shipping': '待发货',
        'delivering': '运输中',
        'review': '待评价'
    };
    document.getElementById('shopOrderStatus').textContent = statusMap[type] || '运输中';

    const orderNo = 'MS' + Date.now().toString().slice(-12);
    document.getElementById('shopOrderNo').textContent = orderNo;

    const timelineEl = document.getElementById('shopLogisticsTimeline');
    const timelines = {
        'pending': [
            { time: '刚刚', text: '订单提交成功，请尽快付款', current: true },
            { time: '—', text: '等待买家付款', done: false }
        ],
        'shipping': [
            { time: '10分钟前', text: '订单已提交，正在备货', current: true },
            { time: '刚刚', text: '订单支付成功', done: true },
            { time: '2分钟前', text: '商家已接单', done: true }
        ],
        'delivering': [
            { time: '今天 14:30', text: '快件正在派送中，请保持电话畅通', current: true },
            { time: '今天 08:15', text: '快件已到达【XX市XX区营业点】', done: true },
            { time: '昨天 22:40', text: '快件已从【XX市转运中心】发出', done: true },
            { time: '昨天 18:20', text: '商家已发货', done: true },
            { time: '昨天 15:30', text: '订单支付成功', done: true }
        ],
        'review': [
            { time: '2天前', text: '交易完成，快来评价吧~', current: true },
            { time: '3天前', text: '已确认收货', done: true },
            { time: '4天前', text: '快件已签收', done: true },
            { time: '5天前', text: '商家已发货', done: true }
        ]
    };

    const tl = timelines[type] || timelines['delivering'];
    timelineEl.innerHTML = '';
    tl.forEach(item => {
        const div = document.createElement('div');
        div.className = 'shop-logistics-item' + (item.current ? ' current' : (item.done ? ' done' : ''));
        div.innerHTML = `
            <div class="shop-logistics-time">${item.time}</div>
            <div class="shop-logistics-text">${item.text}</div>
        `;
        timelineEl.appendChild(div);
    });

    const confirmBtn = document.getElementById('shopConfirmBtn');
    if (type === 'delivering') {
        confirmBtn.style.display = 'flex';
        confirmBtn.textContent = '确认收货';
        confirmBtn.onclick = () => {
            shopShowToast('确认收货成功');
            shopCloseModal('shopModalLogistics');
        };
    } else if (type === 'pending') {
        confirmBtn.style.display = 'flex';
        confirmBtn.textContent = '去付款';
        confirmBtn.onclick = () => {
            shopShowToast('付款成功');
            shopCloseModal('shopModalLogistics');
        };
    } else if (type === 'review') {
        confirmBtn.style.display = 'flex';
        confirmBtn.textContent = '立即评价';
        confirmBtn.onclick = () => {
            shopShowToast('评价成功，感谢您的反馈');
            shopCloseModal('shopModalLogistics');
        };
    } else {
        confirmBtn.style.display = 'none';
    }

    shopOpenModal('shopModalLogistics');
}

function shopOpenEditProfile() {
    document.getElementById('shopEditNameInput').value = shopState.userProfile.name;
    document.getElementById('shopEditDescInput').value = shopState.userProfile.desc || '';

    const avatarEl = document.getElementById('shopEditAvatar');
    const avatarImg = document.getElementById('shopEditAvatarImg');
    if (shopState.userProfile.avatarImg) {
        avatarImg.src = shopState.userProfile.avatarImg;
        avatarImg.style.display = 'block';
    } else {
        avatarImg.style.display = 'none';
    }

    document.querySelectorAll('.shop-color-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.color == shopState.userProfile.avatarColor);
        opt.onclick = () => {
            document.querySelectorAll('.shop-color-option').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            shopState.userProfile.avatarColor = opt.dataset.color;
            shopUpdateEditAvatarColor();
        };
    });

    shopUpdateEditAvatarColor();
    shopOpenModal('shopModalEditProfile');
}

function shopUpdateEditAvatarColor() {
    const colors = {
        '1': 'linear-gradient(135deg, #d8c8f0, #b8a0d8)',
        '2': 'linear-gradient(135deg, #f0d8e8, #e8b8d0)',
        '3': 'linear-gradient(135deg, #d8e8f0, #b0d0e0)',
        '4': 'linear-gradient(135deg, #e8e0d0, #d0c0a0)',
        '5': 'linear-gradient(135deg, #d0e8d8, #a8d0b8)',
        '6': 'linear-gradient(135deg, #f0e0d8, #e0c0b0)'
    };
    const avatarEl = document.getElementById('shopEditAvatar');
    if (!shopState.userProfile.avatarImg) {
        avatarEl.style.background = colors[shopState.userProfile.avatarColor];
    }
}

function shopSaveProfile() {
    const newName = document.getElementById('shopEditNameInput').value.trim();
    const newDesc = document.getElementById('shopEditDescInput').value.trim();

    if (newName) {
        shopState.userProfile.name = newName;
        document.getElementById('shopProfileName').firstChild.textContent = newName + ' ';
    }
    if (newDesc) {
        shopState.userProfile.desc = newDesc;
        const descEl = document.getElementById('shopProfileDesc');
        const svgEl = descEl.querySelector('svg');
        descEl.innerHTML = '';
        descEl.appendChild(document.createTextNode(newDesc + ' '));
        if (svgEl) descEl.appendChild(svgEl);
    }
    shopUpdateProfileAvatar();
    shopCloseModal('shopModalEditProfile');
    shopShowToast('资料修改成功');
}

function shopUpdateProfileAvatar() {
    const avatarEl = document.getElementById('shopProfileAvatar');
    const avatarImg = document.getElementById('shopAvatarImg');
    const colors = {
        '1': 'linear-gradient(135deg, #d8c8f0, #b8a0d8)',
        '2': 'linear-gradient(135deg, #f0d8e8, #e8b8d0)',
        '3': 'linear-gradient(135deg, #d8e8f0, #b0d0e0)',
        '4': 'linear-gradient(135deg, #e8e0d0, #d0c0a0)',
        '5': 'linear-gradient(135deg, #d0e8d8, #a8d0b8)',
        '6': 'linear-gradient(135deg, #f0e0d8, #e0c0b0)'
    };
    avatarEl.style.background = colors[shopState.userProfile.avatarColor];

    if (shopState.userProfile.avatarImg) {
        avatarImg.src = shopState.userProfile.avatarImg;
        avatarImg.style.display = 'block';
    } else {
        avatarImg.style.display = 'none';
    }
}

function shopTriggerAvatarUpload() {
    document.getElementById('shopAvatarFile').click();
}

function shopBindAvatarUpload() {
    const fileInput = document.getElementById('shopAvatarFile');
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            shopState.userProfile.avatarImg = ev.target.result;
            const editImg = document.getElementById('shopEditAvatarImg');
            editImg.src = ev.target.result;
            editImg.style.display = 'block';
        };
        reader.readAsDataURL(file);
        fileInput.value = '';
    });
}

function shopTriggerProductImgUpload() {
    shopState.currentProductImgType = 'detail';
    document.getElementById('shopProductImgFile').click();
}

function shopTriggerCardImgUpload(productId) {
    shopState.currentProductImgType = 'card';
    shopState.cardImgProductId = productId;
    document.getElementById('shopProductImgFile').click();
}

function shopTriggerCartImgUpload(idx) {
    shopState.currentProductImgType = 'cart';
    shopState.cartImgIndex = idx;
    document.getElementById('shopProductImgFile').click();
}

function shopBindProductImgUpload() {
    const fileInput = document.getElementById('shopProductImgFile');
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const imgUrl = ev.target.result;
            if (shopState.currentProductImgType === 'detail' && shopState.currentProductId) {
                shopState.customProductImgs[shopState.currentProductId] = imgUrl;
                // 上传后切换到图片显示模式
                const imgBox = document.getElementById('shopProductImgBox');
                const descHero = document.getElementById('shopProductDescHero');
                const closeBtn = document.querySelector('#shopProductHero .shop-close-btn');
                if (imgBox) imgBox.style.display = 'block';
                if (descHero) descHero.style.display = 'none';
                if (closeBtn) closeBtn.style.color = '#fff';
                document.getElementById('shopProductDetailImg').style.backgroundImage = `url('${imgUrl}')`;
                shopRenderProducts();
                shopRenderCart();
                shopRenderFavorites();
            } else if (shopState.currentProductImgType === 'card' && shopState.cardImgProductId) {
                shopState.customProductImgs[shopState.cardImgProductId] = imgUrl;
                shopRenderProducts();
                shopRenderFavorites();
                shopState.cardImgProductId = null;
            } else if (shopState.currentProductImgType === 'cart' && shopState.cartImgIndex !== null) {
                const item = shopState.cart[shopState.cartImgIndex];
                if (item) {
                    shopState.customProductImgs[item.id] = imgUrl;
                    shopRenderCart();
                    shopRenderProducts();
                    shopRenderFavorites();
                }
            }
            shopShowToast('图片更换成功');
        };
        reader.readAsDataURL(file);
        fileInput.value = '';
    });
}

function shopOpenModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function shopCloseModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
    if (modalId === 'shopModalProduct') {
        shopRenderProducts();
    }
}

function shopShowToast(msg) {
    const toast = document.getElementById('shopToast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 1800);
}

function shopOpenApp() {
    document.getElementById('shopAppMain').classList.add('shop-show');
    shopInit();
}

function shopCloseApp() {
    document.getElementById('shopAppMain').classList.remove('shop-show');
}

// ===========================================
// 商城APP扩展功能 - 优惠券/订单/地址/搜索/设置
// ===========================================

const shopExtendedState = {
    coupons: [
        { id: 'c1', name: '新人专享券', amount: 50, minAmount: 200, desc: '全场通用，新用户首次购买可用', expiry: '2026-12-31', type: 'newuser' },
        { id: 'c2', name: '满减优惠券', amount: 30, minAmount: 150, desc: '满150减30，部分商品可用', expiry: '2026-08-31', type: 'normal' },
        { id: 'c3', name: '会员折扣券', amount: 100, minAmount: 500, desc: '满500减100，会员尊享', expiry: '2026-12-31', type: 'vip' },
        { id: 'c4', name: '限时抢购券', amount: 20, minAmount: 99, desc: '满99减20，限时三天', expiry: '2026-07-05', type: 'flash' },
        { id: 'c5', name: '美妆专属券', amount: 80, minAmount: 300, desc: '美妆护肤专区可用', expiry: '2026-10-31', type: 'category' },
        { id: 'c6', name: '爱车专享券', amount: 5000, minAmount: 200000, desc: '购车满20万减5000，全车型可用', expiry: '2026-12-31', type: 'car' },
        { id: 'c7', name: '豪华车抵扣券', amount: 20000, minAmount: 800000, desc: '满80万减2万，保时捷/奔驰/宝马适用', expiry: '2026-09-30', type: 'car' },
        { id: 'c8', name: '新能源购车券', amount: 8000, minAmount: 300000, desc: '纯电车型专享，特斯拉/蔚来/极氪适用', expiry: '2026-12-31', type: 'car' },
        { id: 'c9', name: '安居购房券', amount: 50000, minAmount: 5000000, desc: '购房满500万减5万，全国房源通用', expiry: '2026-12-31', type: 'house' },
        { id: 'c10', name: '豪宅尊享券', amount: 200000, minAmount: 20000000, desc: '满2000万减20万，顶豪专属', expiry: '2026-09-30', type: 'house' },
        { id: 'c11', name: '海景房特惠券', amount: 100000, minAmount: 10000000, desc: '三亚/青岛海景房专享', expiry: '2026-12-31', type: 'house' }
    ],
    selectedCouponId: null,
    orders: [],
    addresses: [
        { id: 'a1', name: '张三', phone: '138****1234', region: '广东省深圳市南山区', detail: '科技园路88号创新大厦15楼', isDefault: true }
    ],
    currentAddrId: null,
    currentEditAddrId: null,
    searchKeyword: '',
    roles: [
        { id: 'r1', name: '男朋友', desc: '我的专属宝藏男孩', avatar: '' },
        { id: 'r2', name: '闺蜜', desc: '一辈子的好朋友', avatar: '' },
        { id: 'r3', name: '妈妈', desc: '最亲爱的妈妈', avatar: '' }
    ],
    productComments: {},
    commentUsers: [
        { name: '桃子味汽水', avatar: '🍑' },
        { name: '奶盖不加糖', avatar: '🧋' },
        { name: '云朵收藏家', avatar: '☁️' },
        { name: '月亮邮递员', avatar: '🌙' },
        { name: '饼干碎碎念', avatar: '🍪' },
        { name: '小熊抱蜂蜜', avatar: '🐻' },
        { name: '海盐芝士酱', avatar: '🧀' },
        { name: '草莓酸奶冻', avatar: '🍓' },
        { name: '抹茶拿铁君', avatar: '🍵' },
        { name: '奶油蘑菇汤', avatar: '🍄' },
        { name: '芒果西米露', avatar: '🥭' },
        { name: '芋泥啵啵啵', avatar: '🍠' },
        { name: '椰子小奶糕', avatar: '🥥' },
        { name: '柠檬气泡水', avatar: '🍋' },
        { name: '黑糖珍珠酱', avatar: '🖤' }
    ],
    commentTemplates: [
        '颜色比图片还好看！实物真的绝了，朋友都说很适合我~',
        '质量超出预期了，摸起来手感特别好，包装也很精致',
        '等了一周终于收到！完全没有失望，版型超正的，爱了爱了',
        '回购第二次了，第一次买了送给闺蜜她超喜欢，这次给自己也安排上',
        '客服小姐姐人超好，有问必答，物流也很快，两天就到了',
        '这个价格能买到这个品质真的很值，性价比很高，推荐！',
        '穿上/用上之后心情都变好了，温柔又有气质，绝绝子',
        '和我想象中的一样好看，细节处理得很到位，没有多余的线头',
        '拍照超上镜！发朋友圈好多人问链接，已经安利给室友了',
        '收到的时候包装很用心，打开还有香香的味道，仪式感拉满',
        '料子很舒服，贴身穿完全不扎，敏感肌表示很满意',
        '颜色很正，和详情页几乎没色差，这点真的太难得了',
        '日常通勤穿很合适，不张扬但又有小心机设计，喜欢',
        '之前一直纠结买不买，现在觉得早买早享受系列哈哈哈',
        '送给对象的生日礼物，ta说特别喜欢，眼光被夸了开心',
        '大小/容量刚刚好，出门带着很方便，实用性满分',
        '淡淡的香味很好闻，不是那种很冲的味道，高级感up',
        '做工很精细，走线整齐，感觉可以用很久的样子',
        '被小红书种草来的，果然没踩雷，跟风成功一次～',
        '本来担心不合适，结果试了下超惊喜，比想象中好看多了'
    ],
    replyTemplates: [
        '姐妹眼光真好！我也觉得超好看的',
        '对对对！我也是这么想的，太懂我了',
        '请问你是多大码呀？我正在纠结尺码',
        '想问下洗了之后会不会变形/掉色呀',
        '哈哈哈哈姐妹你描述得也太真实了吧',
        '啊被你种草了，已经加入购物车了',
        '请问你多少斤呀？参考一下上身效果',
        '同纠结了好久！看了你的评论果断下单',
        '+1 我也觉得，真的谁用谁知道',
        '你说得我更心动了，钱包要捂不住了'
    ]
};

function shopOpenCoupons() {
    shopRenderCoupons();
    shopOpenModal('shopModalCoupons');
}

function shopRenderCoupons() {
    const listEl = document.getElementById('shopCouponList');
    const emptyEl = document.getElementById('shopCouponEmpty');
    listEl.innerHTML = '';

    if (shopExtendedState.coupons.length === 0) {
        emptyEl.classList.add('show');
        return;
    }
    emptyEl.classList.remove('show');

    shopExtendedState.coupons.forEach(coupon => {
        const card = document.createElement('div');
        card.className = 'shop-coupon-card';
        if (shopExtendedState.selectedCouponId === coupon.id) {
            card.classList.add('active');
        }
        
        const today = new Date().toISOString().split('T')[0];
        if (coupon.expiry < today) {
            card.classList.add('disabled');
        }

        card.onclick = () => {
            if (card.classList.contains('disabled')) return;
            shopExtendedState.selectedCouponId = shopExtendedState.selectedCouponId === coupon.id ? null : coupon.id;
            shopRenderCoupons();
        };

        card.innerHTML = `
            <div class="shop-coupon-left">
                <div class="shop-coupon-amount">${coupon.amount}</div>
                <div class="shop-coupon-condition">满${coupon.minAmount}可用</div>
            </div>
            <div class="shop-coupon-right">
                <div class="shop-coupon-name">${coupon.name}</div>
                <div class="shop-coupon-desc">${coupon.desc}</div>
                <div class="shop-coupon-expiry">有效期至 ${coupon.expiry}</div>
            </div>
        `;
        listEl.appendChild(card);
    });
}

function shopOpenAddresses() {
    shopRenderAddresses();
    shopOpenModal('shopModalAddresses');
}

function shopRenderAddresses() {
    const listEl = document.getElementById('shopAddressList');
    const emptyEl = document.getElementById('shopAddressEmpty');
    listEl.innerHTML = '';

    if (shopExtendedState.addresses.length === 0) {
        emptyEl.classList.add('show');
        return;
    }
    emptyEl.classList.remove('show');

    shopExtendedState.addresses.forEach(addr => {
        const card = document.createElement('div');
        card.className = 'shop-addr-card' + (addr.isDefault ? ' default' : '') + (shopExtendedState.currentAddrId === addr.id ? ' active' : '');
        
        card.onclick = () => {
            shopExtendedState.currentAddrId = addr.id;
            shopRenderAddresses();
            shopCloseModal('shopModalAddresses');
            shopUpdateBuyNowAddr();
            shopUpdateCartCheckoutAddr();
            shopShowToast('已选择收货地址');
        };

        card.innerHTML = `
            <div class="shop-addr-header">
                <div class="shop-addr-name">${addr.name}</div>
                <div class="shop-addr-phone">${addr.phone}</div>
            </div>
            <div class="shop-addr-region">${addr.region}</div>
            <div class="shop-addr-detail">${addr.detail}</div>
            <div class="shop-addr-actions">
                <span class="shop-addr-action-btn" onclick="event.stopPropagation(); shopEditAddress('${addr.id}')">编辑</span>
                <span class="shop-addr-action-btn" onclick="event.stopPropagation(); shopDeleteAddress('${addr.id}')">删除</span>
            </div>
        `;
        listEl.appendChild(card);
    });
}

function shopAddNewAddress() {
    shopExtendedState.currentEditAddrId = null;
    document.getElementById('shopAddrModalTitle').textContent = '添加地址';
    document.getElementById('shopAddrName').value = '';
    document.getElementById('shopAddrPhone').value = '';
    document.getElementById('shopAddrRegion').value = '';
    document.getElementById('shopAddrDetail').value = '';
    document.getElementById('shopAddrDefault').checked = false;
    shopCloseModal('shopModalAddresses');
    setTimeout(() => shopOpenModal('shopModalEditAddress'), 300);
}

function shopEditAddress(addrId) {
    const addr = shopExtendedState.addresses.find(a => a.id === addrId);
    if (!addr) return;
    
    shopExtendedState.currentEditAddrId = addrId;
    document.getElementById('shopAddrModalTitle').textContent = '编辑地址';
    document.getElementById('shopAddrName').value = addr.name;
    document.getElementById('shopAddrPhone').value = addr.phone;
    document.getElementById('shopAddrRegion').value = addr.region;
    document.getElementById('shopAddrDetail').value = addr.detail;
    document.getElementById('shopAddrDefault').checked = addr.isDefault;
    shopCloseModal('shopModalAddresses');
    setTimeout(() => shopOpenModal('shopModalEditAddress'), 300);
}

// 地址数据持久化
const SHOP_ADDR_STORAGE_KEY = 'shop_addresses_v1';

function shopLoadAddresses() {
    try {
        const saved = localStorage.getItem(SHOP_ADDR_STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            if (Array.isArray(data) && data.length > 0) {
                shopExtendedState.addresses = data;
            }
        }
    } catch (e) {}
}

function shopSaveAddresses() {
    try {
        localStorage.setItem(SHOP_ADDR_STORAGE_KEY, JSON.stringify(shopExtendedState.addresses));
    } catch (e) {}
}

// Banner文字持久化
const SHOP_BANNER_STORAGE_KEY = 'shop_banner_text_v1';
const shopBannerDefaults = {
    tag: '✨ 新品首发',
    title: '雾感紫调\n限定系列',
    sub: '低饱和奶白 · 温柔高级感'
};

function shopLoadBannerText() {
    try {
        const saved = localStorage.getItem(SHOP_BANNER_STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            if (data && typeof data === 'object') {
                shopExtendedState.bannerText = {
                    tag: data.tag || shopBannerDefaults.tag,
                    title: data.title || shopBannerDefaults.title,
                    sub: data.sub || shopBannerDefaults.sub
                };
                return;
            }
        }
    } catch (e) {}
    shopExtendedState.bannerText = { ...shopBannerDefaults };
}

function shopSaveBannerText() {
    try {
        localStorage.setItem(SHOP_BANNER_STORAGE_KEY, JSON.stringify(shopExtendedState.bannerText));
    } catch (e) {}
}

function shopApplyBannerText() {
    const tagEl = document.getElementById('shopBannerTag');
    const titleEl = document.getElementById('shopBannerTitle');
    const subEl = document.getElementById('shopBannerSub');
    if (!shopExtendedState.bannerText) return;
    if (tagEl) tagEl.textContent = shopExtendedState.bannerText.tag;
    if (titleEl) titleEl.innerHTML = shopExtendedState.bannerText.title.replace(/\n/g, '<br/>');
    if (subEl) subEl.textContent = shopExtendedState.bannerText.sub;
}

function shopSetupBannerDoubleClick() {
    const items = [
        { id: 'shopBannerTag', key: 'tag', type: 'text', fontSize: '11px', color: '#7a5a9a' },
        { id: 'shopBannerTitle', key: 'title', type: 'textarea', fontSize: '22px', color: '#5a3a7a' },
        { id: 'shopBannerSub', key: 'sub', type: 'text', fontSize: '12px', color: '#9a8ab0' }
    ];

    items.forEach(item => {
        const el = document.getElementById(item.id);
        if (!el) return;
        el.style.cursor = 'text';
        el.addEventListener('dblclick', function(e) {
            e.stopPropagation();
            const originalText = shopExtendedState.bannerText[item.key];

            let input;
            if (item.type === 'textarea') {
                input = document.createElement('textarea');
                input.value = originalText;
                input.rows = 2;
                input.style.cssText = `
                    width: 100%;
                    border: 1px solid #c8b8e0;
                    outline: none;
                    padding: 6px 10px;
                    font-size: ${item.fontSize};
                    font-weight: 800;
                    color: ${item.color};
                    background: rgba(255,255,255,0.95);
                    border-radius: 8px;
                    font-family: inherit;
                    letter-spacing: -0.5px;
                    box-sizing: border-box;
                    resize: none;
                    text-align: left;
                    line-height: 1.2;
                `;
            } else {
                input = document.createElement('input');
                input.type = 'text';
                input.value = originalText;
                input.style.cssText = `
                    width: 100%;
                    border: 1px solid #c8b8e0;
                    outline: none;
                    padding: 4px 8px;
                    font-size: ${item.fontSize};
                    font-weight: inherit;
                    color: ${item.color};
                    background: rgba(255,255,255,0.95);
                    border-radius: 8px;
                    font-family: inherit;
                    letter-spacing: inherit;
                    box-sizing: border-box;
                `;
            }

            const originalDisplay = this.style.display;
            this.innerHTML = '';
            this.style.display = 'block';
            this.appendChild(input);
            input.focus();
            input.select();

            const finishEdit = () => {
                let newText = input.value.trim();
                if (!newText) newText = originalText;
                shopExtendedState.bannerText[item.key] = newText;
                shopSaveBannerText();
                shopApplyBannerText();
            };

            input.addEventListener('blur', finishEdit);
            input.addEventListener('keydown', (e) => {
                if (item.type === 'text' && e.key === 'Enter') {
                    input.blur();
                }
                if (e.key === 'Escape') {
                    shopExtendedState.bannerText[item.key] = originalText;
                    shopApplyBannerText();
                }
            });
            input.addEventListener('click', (e) => e.stopPropagation());
        });
    });
}

// =============== 调色盘功能 ===============
const SHOP_COLOR_STORAGE_KEY = 'shop_color_scheme_v1';
const shopColorPresets = {
    milk_tea: {
        primary: '#c8b098',
        primaryLight: '#dcc5a8',
        bg: '#faf7f5',
        bgGradient: ['#faf7f5', '#f5f0ec', '#f8f4f0', '#f0ece8'],
        accent: '#c88a60',
        cardBg: 'rgba(255,255,255,0.8)',
        textMain: '#4a4035',
        textSub: '#8a7d6d'
    },
    misty_purple: {
        primary: '#b898d8',
        primaryLight: '#d0b0e8',
        bg: '#f5f0f8',
        bgGradient: ['#f5f0f8', '#f0e8f5', '#f8f0f5', '#f0eef8'],
        accent: '#a86888',
        cardBg: 'rgba(255,255,255,0.75)',
        textMain: '#3e2f50',
        textSub: '#6b5a80'
    },
    soft_pink: {
        primary: '#e8b0b0',
        primaryLight: '#f0c8c8',
        bg: '#fef5f5',
        bgGradient: ['#fef5f5', '#fbe8e8', '#fef0f0', '#fbebec'],
        accent: '#d88080',
        cardBg: 'rgba(255,255,255,0.8)',
        textMain: '#5a3a3a',
        textSub: '#9a7070'
    },
    mint_green: {
        primary: '#a8d0c0',
        primaryLight: '#c0e0d0',
        bg: '#f0f8f4',
        bgGradient: ['#f0f8f4', '#e0f0e8', '#f0f8f0', '#e8f0ec'],
        accent: '#60a888',
        cardBg: 'rgba(255,255,255,0.8)',
        textMain: '#3a5045',
        textSub: '#6a8a7a'
    },
    sky_blue: {
        primary: '#a8c0d8',
        primaryLight: '#c0d4e8',
        bg: '#f0f4f8',
        bgGradient: ['#f0f4f8', '#e0e8f0', '#f0f4f8', '#e8edf0'],
        accent: '#6890b8',
        cardBg: 'rgba(255,255,255,0.8)',
        textMain: '#3a4a5a',
        textSub: '#6a7a8a'
    },
    warm_orange: {
        primary: '#e8c090',
        primaryLight: '#f0d0a8',
        bg: '#fef8ee',
        bgGradient: ['#fef8ee', '#fbeed8', '#fef5e8', '#fbefdc'],
        accent: '#d89050',
        cardBg: 'rgba(255,255,255,0.8)',
        textMain: '#5a4025',
        textSub: '#9a7a55'
    }
};

let shopCurrentColorScheme = null;

function shopOpenColorPalette() {
    if (shopCurrentColorScheme) {
        document.getElementById('shopColorPrimary').value = shopCurrentColorScheme.primary;
        document.getElementById('shopColorBg').value = shopCurrentColorScheme.bg;
        document.getElementById('shopColorAccent').value = shopCurrentColorScheme.accent;
    }
    shopUpdatePreviewCard();
    shopOpenModal('shopModalColorPalette');
}

function shopApplyColorPreset(presetName) {
    const preset = shopColorPresets[presetName];
    if (!preset) return;

    document.getElementById('shopColorPrimary').value = preset.primary;
    document.getElementById('shopColorBg').value = preset.bg;
    document.getElementById('shopColorAccent').value = preset.accent;

    shopCurrentColorScheme = { ...preset };
    shopApplyColorScheme(shopCurrentColorScheme);
    shopUpdatePreviewCard();
    shopShowToast('已应用' + (presetName === 'milk_tea' ? '奶杏米白' :
        presetName === 'misty_purple' ? '雾感紫调' :
        presetName === 'soft_pink' ? '柔粉蜜桃' :
        presetName === 'mint_green' ? '薄荷奶绿' :
        presetName === 'sky_blue' ? '天空奶蓝' : '暖阳蜜橘') + '色系');
}

function shopUpdateCustomColor() {
    const primary = document.getElementById('shopColorPrimary').value;
    const bg = document.getElementById('shopColorBg').value;
    const accent = document.getElementById('shopColorAccent').value;

    const primaryLight = shopLightenColor(primary, 15);

    shopCurrentColorScheme = {
        primary: primary,
        primaryLight: primaryLight,
        bg: bg,
        bgGradient: [bg, shopDarkenColor(bg, 3), shopLightenColor(bg, 2), shopDarkenColor(bg, 5)],
        accent: accent,
        cardBg: 'rgba(255,255,255,0.78)',
        textMain: shopGetContrastColor(bg),
        textSub: shopGetContrastColor(bg, 0.6)
    };

    shopApplyColorScheme(shopCurrentColorScheme);
    shopUpdatePreviewCard();
}

function shopLightenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function shopDarkenColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, (num >> 16) - amt);
    const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
    const B = Math.max(0, (num & 0x0000FF) - amt);
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}

function shopGetContrastColor(bgHex, alpha = 1) {
    const num = parseInt(bgHex.replace('#', ''), 16);
    const R = num >> 16;
    const G = (num >> 8) & 0x00FF;
    const B = num & 0x0000FF;
    const luminance = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
    if (luminance > 0.5) {
        return alpha === 1 ? '#4a4035' : 'rgba(74,64,53,' + alpha + ')';
    } else {
        return alpha === 1 ? '#f5f0e8' : 'rgba(245,240,232,' + alpha + ')';
    }
}

function shopApplyColorScheme(scheme) {
    const root = document.querySelector('.shop-app-container');
    if (!root) return;

    root.style.setProperty('--shop-primary', scheme.primary);
    root.style.setProperty('--shop-primary-light', scheme.primaryLight);
    root.style.setProperty('--shop-bg', scheme.bg);
    root.style.setProperty('--shop-accent', scheme.accent);
    root.style.setProperty('--shop-text-main', scheme.textMain);
    root.style.setProperty('--shop-text-sub', scheme.textSub);

    root.style.background = `linear-gradient(160deg, ${scheme.bgGradient[0]} 0%, ${scheme.bgGradient[1]} 30%, ${scheme.bgGradient[2]} 60%, ${scheme.bgGradient[3]} 100%)`;

    const topBar = root.querySelector('.shop-top-bar');
    if (topBar) {
        topBar.style.background = `linear-gradient(180deg, ${scheme.bg}F2 0%, ${scheme.bg}D9 70%, ${scheme.bg}00 100%)`;
    }

    const catItems = root.querySelectorAll('.shop-cat-item.active');
    catItems.forEach(item => {
        item.style.background = `linear-gradient(135deg, ${scheme.primary}, ${scheme.primaryLight})`;
        item.style.boxShadow = `0 6px 20px ${scheme.primary}59`;
    });

    const priceEls = root.querySelectorAll('.shop-prod-price, .shop-product-price');
    priceEls.forEach(el => {
        el.style.color = scheme.accent;
        el.style.webkitTextFillColor = scheme.accent;
    });

    const tabActive = root.querySelectorAll('.shop-tab-item.active');
    tabActive.forEach(el => {
        el.style.color = scheme.primary;
    });

    const specTags = root.querySelectorAll('.shop-spec-tag.active');
    specTags.forEach(el => {
        el.style.background = `linear-gradient(135deg, ${scheme.primary}66, ${scheme.primaryLight}66)`;
        el.style.borderColor = scheme.primary;
        el.style.color = scheme.primary;
    });

    const imgWraps = root.querySelectorAll('.shop-prod-img-wrap');
    imgWraps.forEach(el => {
        el.style.background = `linear-gradient(135deg, ${shopLightenColor(scheme.bg, 5)}, ${shopDarkenColor(scheme.bg, 8)})`;
    });

    const descWraps = root.querySelectorAll('.shop-prod-desc-wrap');
    descWraps.forEach(el => {
        el.style.background = `linear-gradient(145deg, ${shopLightenColor(scheme.bg, 3)} 0%, ${scheme.bg} 50%, ${shopDarkenColor(scheme.bg, 6)} 100%)`;
    });

    const descTitles = root.querySelectorAll('.shop-prod-desc-title, .shop-product-desc-hero-title');
    descTitles.forEach(el => {
        el.style.color = scheme.textMain;
    });

    const descTexts = root.querySelectorAll('.shop-prod-desc-text, .shop-product-desc-hero-text');
    descTexts.forEach(el => {
        el.style.color = scheme.textSub;
    });

    const descTags = root.querySelectorAll('.shop-prod-desc-tag, .shop-product-desc-hero-tag');
    descTags.forEach(el => {
        el.style.color = scheme.primary;
    });

    const heroDesc = root.querySelector('.shop-product-desc-hero');
    if (heroDesc) {
        heroDesc.style.background = `linear-gradient(145deg, ${shopLightenColor(scheme.bg, 3)} 0%, ${scheme.bg} 50%, ${shopDarkenColor(scheme.bg, 6)} 100%)`;
    }

    const productHero = root.querySelector('.shop-product-hero');
    if (productHero) {
        productHero.style.background = `linear-gradient(145deg, ${shopLightenColor(scheme.bg, 3)} 0%, ${scheme.bg} 50%, ${shopDarkenColor(scheme.bg, 6)} 100%)`;
    }

    const bannerCard = root.querySelector('.shop-banner-card');
    if (bannerCard) {
        bannerCard.style.background = `linear-gradient(135deg, ${shopLightenColor(scheme.bg, 5)} 0%, ${scheme.bg} 50%, ${shopDarkenColor(scheme.bg, 4)} 100%)`;
    }

    const favBtns = root.querySelectorAll('.shop-prod-fav-btn svg');
    favBtns.forEach(svg => {
        if (!svg.closest('.favorited')) {
            svg.style.stroke = shopLightenColor(scheme.primary, 25);
        }
    });

    const tabItems = root.querySelectorAll('.shop-tab-item:not(.active)');
    tabItems.forEach(el => {
        el.style.color = scheme.textSub;
    });

    const pageTitles = root.querySelectorAll('.shop-page-title, .shop-product-name');
    pageTitles.forEach(el => {
        el.style.color = scheme.textMain;
    });

    const pageSubs = root.querySelectorAll('.shop-page-sub, .shop-spec-label');
    pageSubs.forEach(el => {
        el.style.color = scheme.textSub;
    });

    const specTagsAll = root.querySelectorAll('.shop-spec-tag:not(.active)');
    specTagsAll.forEach(el => {
        el.style.color = scheme.textSub;
        el.style.borderColor = `${scheme.primary}22`;
    });
}

function shopUpdatePreviewCard() {
    const card = document.getElementById('shopColorPreviewCard');
    if (!card || !shopCurrentColorScheme) return;

    const badge = card.querySelector('.shop-preview-badge');
    const price = card.querySelector('.shop-preview-price');

    if (badge) {
        badge.style.background = `linear-gradient(135deg, ${shopCurrentColorScheme.primary}, ${shopCurrentColorScheme.primaryLight})`;
    }
    if (price) {
        price.style.color = shopCurrentColorScheme.accent;
    }
}

function shopSaveColorScheme() {
    if (!shopCurrentColorScheme) return;
    try {
        localStorage.setItem(SHOP_COLOR_STORAGE_KEY, JSON.stringify(shopCurrentColorScheme));
        shopShowToast('色系保存成功');
    } catch (e) {
        shopShowToast('保存失败');
    }
}

function shopResetColorScheme() {
    const defaultScheme = shopColorPresets.milk_tea;
    shopCurrentColorScheme = { ...defaultScheme };

    document.getElementById('shopColorPrimary').value = defaultScheme.primary;
    document.getElementById('shopColorBg').value = defaultScheme.bg;
    document.getElementById('shopColorAccent').value = defaultScheme.accent;

    shopApplyColorScheme(shopCurrentColorScheme);
    shopUpdatePreviewCard();
    try {
        localStorage.removeItem(SHOP_COLOR_STORAGE_KEY);
    } catch (e) {}
    shopShowToast('已恢复默认色系');
}

function shopLoadColorScheme() {
    try {
        const saved = localStorage.getItem(SHOP_COLOR_STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            if (data && typeof data === 'object') {
                shopCurrentColorScheme = data;
                shopApplyColorScheme(shopCurrentColorScheme);
                return;
            }
        }
    } catch (e) {}
    shopCurrentColorScheme = { ...shopColorPresets.milk_tea };
}

// =============== 个人资料背景图功能 ===============
const SHOP_PROFILE_BG_STORAGE_KEY = 'shop_profile_bg_v1';
let shopProfileBgImg = null;

function shopTriggerProfileBgUpload() {
    document.getElementById('shopProfileBgFile').click();
}

function shopBindProfileBgUpload() {
    const fileInput = document.getElementById('shopProfileBgFile');
    if (!fileInput) return;
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const imgUrl = ev.target.result;
            shopProfileBgImg = imgUrl;
            shopApplyProfileBg();
            shopSaveProfileBg();
            shopShowToast('资料卡背景更换成功');
        };
        reader.readAsDataURL(file);
        fileInput.value = '';
    });
}

function shopApplyProfileBg() {
    const bgEl = document.getElementById('shopProfileBg');
    if (!bgEl) return;
    if (shopProfileBgImg) {
        bgEl.style.backgroundImage = `url('${shopProfileBgImg}')`;
        bgEl.style.backgroundSize = 'cover';
        bgEl.style.backgroundPosition = 'center';
    }
}

function shopSaveProfileBg() {
    try {
        if (shopProfileBgImg) {
            localStorage.setItem(SHOP_PROFILE_BG_STORAGE_KEY, shopProfileBgImg);
        } else {
            localStorage.removeItem(SHOP_PROFILE_BG_STORAGE_KEY);
        }
    } catch (e) {}
}

function shopLoadProfileBg() {
    try {
        const saved = localStorage.getItem(SHOP_PROFILE_BG_STORAGE_KEY);
        if (saved) {
            shopProfileBgImg = saved;
            shopApplyProfileBg();
        }
    } catch (e) {}
}

// =============== Banner背景图功能 ===============
const SHOP_BANNER_BG_STORAGE_KEY = 'shop_banner_bg_v1';
let shopBannerBgImg = null;

function shopTriggerBannerBgUpload() {
    document.getElementById('shopBannerBgFile').click();
}

function shopBindBannerBgUpload() {
    const fileInput = document.getElementById('shopBannerBgFile');
    if (!fileInput) return;
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const imgUrl = ev.target.result;
            shopBannerBgImg = imgUrl;
            shopApplyBannerBg();
            shopSaveBannerBg();
            shopShowToast('横幅背景图更换成功');
        };
        reader.readAsDataURL(file);
        fileInput.value = '';
    });
}

function shopApplyBannerBg() {
    const bgEl = document.getElementById('shopBannerBg');
    if (!bgEl) return;
    if (shopBannerBgImg) {
        bgEl.style.backgroundImage = `url('${shopBannerBgImg}')`;
        bgEl.style.backgroundSize = 'cover';
        bgEl.style.backgroundPosition = 'center';
    } else {
        bgEl.style.backgroundImage = '';
        bgEl.style.backgroundSize = '';
        bgEl.style.backgroundPosition = '';
    }
}

function shopSaveBannerBg() {
    try {
        if (shopBannerBgImg) {
            localStorage.setItem(SHOP_BANNER_BG_STORAGE_KEY, shopBannerBgImg);
        } else {
            localStorage.removeItem(SHOP_BANNER_BG_STORAGE_KEY);
        }
    } catch (e) {}
}

function shopLoadBannerBg() {
    try {
        const saved = localStorage.getItem(SHOP_BANNER_BG_STORAGE_KEY);
        if (saved) {
            shopBannerBgImg = saved;
            shopApplyBannerBg();
        }
    } catch (e) {}
}

function shopSaveAddress() {
    const name = document.getElementById('shopAddrName').value.trim();
    const phone = document.getElementById('shopAddrPhone').value.trim();
    const region = document.getElementById('shopAddrRegion').value.trim();
    const detail = document.getElementById('shopAddrDetail').value.trim();
    const isDefault = document.getElementById('shopAddrDefault').checked;

    if (!name || !phone || !region || !detail) {
        shopShowToast('请填写完整信息');
        return;
    }

    let savedId;
    if (shopExtendedState.currentEditAddrId) {
        savedId = shopExtendedState.currentEditAddrId;
        const idx = shopExtendedState.addresses.findIndex(a => a.id === shopExtendedState.currentEditAddrId);
        if (idx !== -1) {
            shopExtendedState.addresses[idx] = {
                ...shopExtendedState.addresses[idx],
                name, phone, region, detail, isDefault
            };
        }
    } else {
        savedId = 'a' + Date.now();
        shopExtendedState.addresses.push({
            id: savedId,
            name, phone, region, detail, isDefault
        });
    }

    if (isDefault) {
        shopExtendedState.addresses.forEach(a => {
            a.isDefault = a.id === savedId;
        });
    }

    // 自动选中刚保存的地址，便于结算流程继续
    if (!shopExtendedState.currentAddrId) {
        shopExtendedState.currentAddrId = savedId;
    }

    shopSaveAddresses();

    shopCloseModal('shopModalEditAddress');
    shopShowToast('地址保存成功');
    shopUpdateBuyNowAddr();
    shopUpdateCartCheckoutAddr();
    shopOpenAddresses();
}

function shopDeleteAddress(addrId) {
    shopExtendedState.addresses = shopExtendedState.addresses.filter(a => a.id !== addrId);
    if (shopExtendedState.currentAddrId === addrId) {
        shopExtendedState.currentAddrId = null;
        shopEnsureDefaultAddress();
    }
    shopSaveAddresses();
    shopRenderAddresses();
    shopUpdateBuyNowAddr();
    shopUpdateCartCheckoutAddr();
    shopShowToast('地址已删除');
}

function shopOpenSettings() {
    shopOpenModal('shopModalSettings');
}

function shopTriggerBannerUpload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            document.querySelector('.shop-banner-bg').style.backgroundImage = `url('${ev.target.result}')`;
            document.querySelector('.shop-banner-bg').style.backgroundSize = 'cover';
            document.querySelector('.shop-banner-bg').style.backgroundPosition = 'center';
            shopShowToast('封面更换成功');
        };
        reader.readAsDataURL(file);
    };
    document.body.appendChild(fileInput);
    fileInput.click();
    setTimeout(() => fileInput.remove(), 1000);
}

function shopBindBannerClickUpload() {
    const banner = document.querySelector('.shop-banner-card');
    if (!banner) return;
    banner.style.cursor = 'pointer';
    let clickTimer = null;
    banner.addEventListener('click', (e) => {
        if (e.target.closest('.shop-banner-btn')) return;
        if (e.target.closest('#shopBannerTag') || e.target.closest('#shopBannerTitle') || e.target.closest('#shopBannerSub')) return;
        if (clickTimer) {
            clearTimeout(clickTimer);
            clickTimer = null;
            return;
        }
        clickTimer = setTimeout(() => {
            shopTriggerBannerUpload();
            clickTimer = null;
        }, 250);
    });
}

function shopClearCache() {
    shopState.favorites = new Set();
    shopState.cart = [];
    shopExtendedState.orders = [];
    shopExtendedState.selectedCouponId = null;
    shopUpdateCartBadge();
    shopRenderProducts();
    shopUpdateOrderBadges();
    shopShowToast('缓存已清空');
    shopCloseModal('shopModalSettings');
}

function shopOpenOrders(type) {
    shopState.currentOrderType = type;
    document.getElementById('shopOrdersTitle').textContent = {
        'pending': '待付款',
        'shipping': '待发货',
        'delivering': '待收货',
        'review': '待评价',
        'all': '全部订单'
    }[type] || '我的订单';

    shopRenderOrders(type);
    shopOpenModal('shopModalOrders');
}

function shopRefreshOrdersView() {
    const modal = document.getElementById('shopModalOrders');
    if (modal && modal.classList.contains('show') && shopState.currentOrderType) {
        shopRenderOrders(shopState.currentOrderType);
    }
}

function shopRenderOrders(type) {
    const listEl = document.getElementById('shopOrdersList');
    const emptyEl = document.getElementById('shopOrdersEmpty');
    listEl.innerHTML = '';

    // "全部订单" 显示已确认收货的商品（待评价 + 已完成）
    let filteredOrders;
    if (type === 'all') {
        filteredOrders = shopExtendedState.orders.filter(o => o.status === 'review' || o.status === 'completed');
    } else {
        filteredOrders = shopExtendedState.orders.filter(o => o.status === type);
    }

    if (filteredOrders.length === 0) {
        emptyEl.classList.add('show');
        return;
    }
    emptyEl.classList.remove('show');

    filteredOrders.forEach(order => {
        const card = document.createElement('div');
        card.className = 'shop-order-card';
        
        const statusMap = {
            'pending': '待付款',
            'shipping': '待发货',
            'delivering': '待收货',
            'review': '待评价',
            'completed': '已完成'
        };

        let itemsHtml = '';
        order.items.forEach(item => {
            const hasCustomImg = shopState.customProductImgs && shopState.customProductImgs[item.id];
            const cat = shopGetCatOfProduct(item.id);
            const descDetail = shopGenerateDescFromProduct(item, cat);
            
            let itemMediaHtml = '';
            if (hasCustomImg) {
                itemMediaHtml = `<div class="shop-order-item-img" style="background-image:url('${shopState.customProductImgs[item.id]}')"></div>`;
            } else {
                itemMediaHtml = `
                    <div class="shop-order-item-desc">
                        <div class="shop-order-item-desc-title">${item.name}</div>
                        <div class="shop-order-item-desc-text">${descDetail}</div>
                        <div class="shop-order-item-desc-tag">${shopCatLabels[cat] || '精选好物'}</div>
                    </div>
                `;
            }
            
            itemsHtml += `
                <div class="shop-order-item">
                    ${itemMediaHtml}
                    <div class="shop-order-item-info">
                        <div class="shop-order-item-name">${item.name}</div>
                        <div class="shop-order-item-spec">${item.spec}</div>
                        <div class="shop-order-item-bottom">
                            <div class="shop-order-item-price">¥${item.price}</div>
                            <div class="shop-order-item-qty">x${item.qty}</div>
                        </div>
                    </div>
                </div>
            `;
        });

        let actionsHtml = '';
        if (order.status === 'pending') {
            actionsHtml = `
                <div class="shop-order-actions">
                    <div class="shop-order-btn secondary" onclick="shopCancelOrder('${order.id}')">取消订单</div>
                    <div class="shop-order-btn primary" onclick="shopPayOrder('${order.id}')">立即付款</div>
                </div>
            `;
        } else if (order.status === 'shipping') {
            actionsHtml = `
                <div class="shop-order-actions">
                    <div class="shop-order-btn secondary" style="cursor:default;opacity:0.6;">商家备货中</div>
                </div>
            `;
        } else if (order.status === 'delivering') {
            actionsHtml = `
                <div class="shop-order-actions">
                    <div class="shop-order-btn secondary" style="cursor:default;opacity:0.6;">派送中·即将签收</div>
                </div>
            `;
        } else if (order.status === 'review') {
            actionsHtml = `
                <div class="shop-order-actions">
                    <div class="shop-order-btn primary" onclick="shopReviewOrder('${order.id}')">去评价</div>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="shop-order-header">
                <div class="shop-order-no">订单号：${order.id}</div>
                <div class="shop-order-status">${statusMap[order.status]}</div>
            </div>
            <div class="shop-order-items">${itemsHtml}</div>
            <div class="shop-order-footer">
                <div class="shop-order-total">合计：<span class="shop-order-total-price">¥${order.finalTotal}</span></div>
                ${actionsHtml}
            </div>
        `;
        listEl.appendChild(card);
    });
}

function shopPayOrder(orderId) {
    const order = shopExtendedState.orders.find(o => o.id === orderId);
    if (!order || order.status !== 'pending') return;
    order.status = 'shipping';
    shopShowToast('付款成功');
    shopRefreshOrdersView();
    shopUpdateOrderBadges();

    // 2秒后商家发货：待发货 → 待收货
    setTimeout(() => {
        const o = shopExtendedState.orders.find(o => o.id === orderId);
        if (o && o.status === 'shipping') {
            o.status = 'delivering';
            shopRefreshOrdersView();
            shopUpdateOrderBadges();
            // 待收货状态 2 秒后自动更新为待评价
            setTimeout(() => {
                const o2 = shopExtendedState.orders.find(o => o.id === orderId);
                if (o2 && o2.status === 'delivering') {
                    o2.status = 'review';
                    shopRefreshOrdersView();
                    shopUpdateOrderBadges();
                }
            }, 2000);
        }
    }, 2000);
}

function shopCancelOrder(orderId) {
    shopExtendedState.orders = shopExtendedState.orders.filter(o => o.id !== orderId);
    shopShowToast('订单已取消');
    shopRefreshOrdersView();
    shopUpdateOrderBadges();
}

function shopReviewOrder(orderId) {
    const order = shopExtendedState.orders.find(o => o.id === orderId);
    if (order) {
        order.status = 'completed';
        shopShowToast('评价成功，感谢您的反馈');
        shopRefreshOrdersView();
        shopUpdateOrderBadges();
    }
}

function shopBindSearch() {
    const searchInput = document.querySelector('.shop-search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            shopExtendedState.searchKeyword = e.target.value.trim();
            shopRenderProducts();
        });
    }
}

function shopFilterProductsByKeyword(products) {
    if (!shopExtendedState.searchKeyword) return products;
    const keyword = shopExtendedState.searchKeyword.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(keyword) || p.desc.toLowerCase().includes(keyword));
}

function shopInitExtended() {
    shopBindSearch();
}

function shopInit() {
    shopLoadAddresses();
    shopLoadBannerText();
    shopApplyBannerText();
    shopSetupBannerDoubleClick();
    shopLoadColorScheme();
    shopLoadBannerBg();
    shopBindBannerBgUpload();
    shopLoadProfileBg();
    shopBindProfileBgUpload();
    shopRenderProducts();
    shopBindCategoryClicks();
    shopBindTabClicks();
    shopBindAvatarUpload();
    shopBindProductImgUpload();
    shopBindCommentStars();
    shopBindRoleAvatarUpload();
    shopBindBannerClickUpload();
    shopInitExtended();
    shopEnsureDefaultAddress();
    shopUpdateOrderBadges();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('商城APP系统已加载');
});

// ============================================================
// === 手工屋·图纸库 横屏浏览系统 ===
// ============================================================

// 6 大分类 × 男/女 × 6 款式 = 72 个款式入口，每个款式 6 种图纸 = 432 个图纸槽位
const craftData = {
    categories: [
        {
            name: '服装',
            subs: [
                { name: '男士', items: ['T恤', '衬衫', '卫衣', '外套', '西装', '风衣'] },
                { name: '女士', items: ['吊带', '连衣裙', '衬衫', '卫衣', '半身裙', '外套'] }
            ]
        },
        {
            name: '包包',
            subs: [
                { name: '男士', items: ['双肩包', '公文包', '单肩包', '手拿包', '旅行包', '电脑包'] },
                { name: '女士', items: ['手提包', '单肩包', '斜挎包', '链条包', '双肩包', '手拿包'] }
            ]
        },
        {
            name: '鞋子',
            subs: [
                { name: '男士', items: ['运动鞋', '皮鞋', '板鞋', '休闲鞋', '靴子', '拖鞋'] },
                { name: '女士', items: ['高跟鞋', '平底鞋', '运动鞋', '靴子', '凉鞋', '单鞋'] }
            ]
        },
        {
            name: '宠物围兜',
            subs: [
                { name: '男士', items: ['经典款', '卡通款', '条纹款', '印花款', '拼色款', '节日款'] },
                { name: '女士', items: ['蕾丝款', '碎花款', '蝴蝶结款', '印花款', '拼色款', '节日款'] }
            ]
        },
        {
            name: '饰品',
            subs: [
                { name: '男士', items: ['项链', '手链', '戒指', '耳钉', '袖扣', '领带夹'] },
                { name: '女士', items: ['项链', '手链', '戒指', '耳环', '发饰', '胸针'] }
            ]
        },
        {
            name: '摆件',
            subs: [
                { name: '男士', items: ['飞机模型', '跑车模型', '船模', '动漫手办', '几何摆件', '武器摆件'] },
                { name: '女士', items: ['花瓶', '玩偶摆件', '装饰画框', '香薰瓶', '水晶球', '八音盒'] }
            ]
        }
    ]
};

const craftVarNames = ['种类一', '种类二', '种类三', '种类四', '种类五', '种类六'];

const craftState = {
    catIdx: null,
    subIdx: null,
    itemIdx: null,
    varIdx: null
};

function craftStorageKey(c, s, i, v) {
    return `craft_pattern_${c}_${s}_${i}_${v}`;
}

function craftGetPattern(c, s, i, v) {
    try {
        return localStorage.getItem(craftStorageKey(c, s, i, v));
    } catch (e) {
        return null;
    }
}

function craftSetPattern(c, s, i, v, dataUrl) {
    try {
        if (dataUrl) {
            localStorage.setItem(craftStorageKey(c, s, i, v), dataUrl);
        } else {
            localStorage.removeItem(craftStorageKey(c, s, i, v));
        }
        return true;
    } catch (e) {
        alert('存储空间已满，请先清除一些旧图纸再上传。');
        return false;
    }
}

function craftOpenViewer() {
    document.getElementById('craftViewerOverlay').classList.add('show');
    craftRenderAll();
}

function craftCloseViewer() {
    document.getElementById('craftViewerOverlay').classList.remove('show');
}

function craftRenderAll() {
    craftRenderCategories();
    craftRenderSubs();
    craftRenderItems();
    craftRenderVars();
    craftRenderSquare();
    craftRenderBreadcrumb();
}

function craftRenderCategories() {
    const wrap = document.getElementById('craftCategories');
    wrap.innerHTML = craftData.categories.map((c, i) =>
        `<div class="craft-chip ${craftState.catIdx === i ? 'active' : ''}" onclick="craftSelectCategory(${i})">${c.name}</div>`
    ).join('');
}

function craftSelectCategory(idx) {
    if (craftState.catIdx === idx) return;
    craftState.catIdx = idx;
    craftState.subIdx = null;
    craftState.itemIdx = null;
    craftState.varIdx = null;
    craftRenderAll();
}

function craftRenderSubs() {
    const wrap = document.getElementById('craftSubs');
    const section = document.getElementById('craftSubSection');
    if (craftState.catIdx === null) {
        wrap.innerHTML = '';
        section.style.display = 'none';
        return;
    }
    section.style.display = 'flex';
    const subs = craftData.categories[craftState.catIdx].subs;
    wrap.innerHTML = subs.map((s, i) =>
        `<div class="craft-chip ${craftState.subIdx === i ? 'active' : ''}" onclick="craftSelectSub(${i})">${s.name}</div>`
    ).join('');
}

function craftSelectSub(idx) {
    if (craftState.subIdx === idx) return;
    craftState.subIdx = idx;
    craftState.itemIdx = null;
    craftState.varIdx = null;
    craftRenderAll();
}

function craftRenderItems() {
    const wrap = document.getElementById('craftItems');
    const section = document.getElementById('craftItemSection');
    if (craftState.catIdx === null || craftState.subIdx === null) {
        wrap.innerHTML = '';
        section.style.display = 'none';
        return;
    }
    section.style.display = 'flex';
    const items = craftData.categories[craftState.catIdx].subs[craftState.subIdx].items;
    wrap.innerHTML = items.map((name, i) =>
        `<div class="craft-chip ${craftState.itemIdx === i ? 'active' : ''}" onclick="craftSelectItem(${i})">${name}</div>`
    ).join('');
}

function craftSelectItem(idx) {
    if (craftState.itemIdx === idx) return;
    craftState.itemIdx = idx;
    craftState.varIdx = null;
    craftRenderAll();
}

function craftRenderVars() {
    const wrap = document.getElementById('craftVars');
    const section = document.getElementById('craftVarSection');
    if (craftState.catIdx === null || craftState.subIdx === null || craftState.itemIdx === null) {
        wrap.innerHTML = '';
        section.style.display = 'none';
        return;
    }
    section.style.display = 'flex';
    wrap.innerHTML = craftVarNames.map((name, i) => {
        const hasPattern = !!craftGetPattern(craftState.catIdx, craftState.subIdx, craftState.itemIdx, i);
        return `<div class="craft-chip ${craftState.varIdx === i ? 'active' : ''}" onclick="craftSelectVar(${i})">${name}${hasPattern ? ' ✓' : ''}</div>`;
    }).join('');
}

function craftSelectVar(idx) {
    craftState.varIdx = idx;
    craftRenderAll();
}

function craftRenderSquare() {
    const square = document.getElementById('craftSquare');
    const img = document.getElementById('craftSquareImg');
    const placeholder = document.getElementById('craftSquarePlaceholder');
    const actions = document.getElementById('craftActions');

    if (craftState.catIdx === null || craftState.subIdx === null ||
        craftState.itemIdx === null || craftState.varIdx === null) {
        square.classList.remove('has-image', 'clickable');
        img.src = '';
        placeholder.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="M21 15l-5-5L5 21"/>
            </svg>
            <div>请按顺序选择<br>分类 → 款式 → 款式 → 种类</div>`;
        actions.style.display = 'none';
        return;
    }

    const patternData = craftGetPattern(craftState.catIdx, craftState.subIdx, craftState.itemIdx, craftState.varIdx);
    square.classList.add('clickable');

    if (patternData) {
        square.classList.add('has-image');
        img.src = patternData;
        placeholder.innerHTML = '';
    } else {
        square.classList.remove('has-image');
        img.src = '';
        placeholder.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <div>点击上传对应图纸</div>`;
    }
    actions.style.display = 'flex';
}

function craftRenderBreadcrumb() {
    const el = document.getElementById('craftBreadcrumb');
    if (craftState.catIdx === null) {
        el.textContent = '请选择分类';
        return;
    }
    const cat = craftData.categories[craftState.catIdx];
    const parts = [cat.name];
    if (craftState.subIdx !== null) parts.push(cat.subs[craftState.subIdx].name);
    if (craftState.itemIdx !== null) parts.push(cat.subs[craftState.subIdx].items[craftState.itemIdx]);
    if (craftState.varIdx !== null) parts.push(craftVarNames[craftState.varIdx]);
    el.textContent = parts.join(' › ');
}

function craftHandleSquareClick() {
    if (craftState.catIdx === null || craftState.subIdx === null ||
        craftState.itemIdx === null || craftState.varIdx === null) {
        return;
    }
    const existing = craftGetPattern(craftState.catIdx, craftState.subIdx, craftState.itemIdx, craftState.varIdx);
    if (!existing) {
        document.getElementById('craftFileUpload').click();
    }
}

function craftHandleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        alert('请上传图片文件');
        e.target.value = '';
        return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
        if (craftSetPattern(craftState.catIdx, craftState.subIdx, craftState.itemIdx, craftState.varIdx, ev.target.result)) {
            craftRenderSquare();
            craftRenderVars();
        }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
}

function craftClearPattern() {
    if (craftState.catIdx === null || craftState.subIdx === null ||
        craftState.itemIdx === null || craftState.varIdx === null) return;
    const existing = craftGetPattern(craftState.catIdx, craftState.subIdx, craftState.itemIdx, craftState.varIdx);
    if (!existing) return;
    if (confirm('确定清除当前图纸吗？')) {
        craftSetPattern(craftState.catIdx, craftState.subIdx, craftState.itemIdx, craftState.varIdx, null);
        craftRenderSquare();
        craftRenderVars();
    }
}

// 全局暴露
window.craftOpenViewer = craftOpenViewer;
window.craftCloseViewer = craftCloseViewer;
window.craftSelectCategory = craftSelectCategory;
window.craftSelectSub = craftSelectSub;
window.craftSelectItem = craftSelectItem;
window.craftSelectVar = craftSelectVar;

// 初始化事件绑定
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('craftCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', craftCloseViewer);

    const square = document.getElementById('craftSquare');
    if (square) square.addEventListener('click', craftHandleSquareClick);

    const fileInput = document.getElementById('craftFileUpload');
    if (fileInput) fileInput.addEventListener('change', craftHandleUpload);

    const uploadBtn = document.getElementById('craftUploadBtn');
    if (uploadBtn) uploadBtn.addEventListener('click', () => document.getElementById('craftFileUpload').click());

    const clearBtn = document.getElementById('craftClearBtn');
    if (clearBtn) clearBtn.addEventListener('click', craftClearPattern);

    // ESC 关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('craftViewerOverlay');
            if (overlay && overlay.classList.contains('show')) craftCloseViewer();
        }
    });

    // 编辑图纸按钮
    const editBtn = document.getElementById('craftEditBtn');
    if (editBtn) editBtn.addEventListener('click', craftOpenEditor);
});

/* ============================================================
 *  手工屋 · 图纸定制器（分部位填色 / 描边分区 / 布料设计）
 * ============================================================ */

const craftEditor = {
    canvas: null,
    ctx: null,
    baseImage: null,
    baseImageData: null,
    width: 500,
    height: 500,
    mode: 'select',
    currentColor: '#ff6b6b',
    currentPartIdx: -1,
    parts: [],
    drawingPoints: [],
    isDrawing: false,
    magicStart: null,
    magicRect: null,
    magicRectEl: null,
    fabricIdx: 0,
    designIdx: 0,
    fabricCustomIdx: -1,
    designCustomIdx: -1,
    fabricType: 'preset',
    designType: 'preset',
    customFabrics: [],
    customDesigns: [],
    catIdx: null,
    subIdx: null,
    itemIdx: null,
    varIdx: null,
    floodCanvas: null,
    floodCtx: null,
    fabricPatternCache: {},
    designPatternCache: {},
    previewMask: null,
    previewMode: false
};

const GRID_COLORS = [
    '#ff0000', '#ff4444', '#ff6b6b', '#ff8c8c', '#ffb3b3', '#ffe0e0',
    '#ff6600', '#ff8833', '#ffaa66', '#ffcc99', '#ffe6cc', '#fff4e6',
    '#ffff00', '#ffff44', '#ffff88', '#ffffbb', '#ffffdd', '#fffff0',
    '#00cc00', '#33dd33', '#66ee66', '#99ff99', '#ccffcc', '#eeffee',
    '#0099ff', '#33adff', '#66c2ff', '#99d6ff', '#ccebff', '#e6f5ff',
    '#9933ff', '#aa55ff', '#bb77ff', '#cc99ff', '#ddbbff', '#eeddff',
    '#ff3399', '#ff66b3', '#ff99cc', '#ffcce6', '#ffe6f2', '#fff4f9',
    '#ffffff', '#eeeeee', '#cccccc', '#999999', '#666666', '#000000'
];

const PRESET_FABRICS = [
    { name: '平纹', type: 'solid', color: '#ffffff' },
    { name: '细纹', type: 'lines', color1: '#ffffff', color2: '#f0f0f0' },
    { name: '格纹', type: 'grid', color1: '#ffffff', color2: '#e8e8e8' },
    { name: '斜纹', type: 'diagonal', color1: '#ffffff', color2: '#f5f5f5' },
    { name: '圆点', type: 'dots', color1: '#ffffff', color2: '#e0e0e0' },
    { name: '绒面', type: 'noise', color: '#f8f8f8' }
];

const PRESET_DESIGNS = [
    { name: '无设计', type: 'none' },
    { name: '条纹', type: 'stripes', color: 'rgba(0,0,0,0.2)' },
    { name: '波点', type: 'polka', color: 'rgba(0,0,0,0.15)' },
    { name: '格子', type: 'plaid', color: 'rgba(0,0,0,0.22)' },
    { name: '花纹', type: 'floral', color: 'rgba(0,0,0,0.18)' },
    { name: '几何', type: 'geo', color: 'rgba(0,0,0,0.15)' }
];

function craftEditorStorageKey() {
    return `craft_editor_${craftEditor.catIdx}_${craftEditor.subIdx}_${craftEditor.itemIdx}_${craftEditor.varIdx}`;
}

function craftOpenEditor() {
    if (craftState.catIdx === null || craftState.subIdx === null ||
        craftState.itemIdx === null || craftState.varIdx === null) return;
    craftEditor.catIdx = craftState.catIdx;
    craftEditor.subIdx = craftState.subIdx;
    craftEditor.itemIdx = craftState.itemIdx;
    craftEditor.varIdx = craftState.varIdx;

    const overlay = document.getElementById('craftEditorOverlay');
    overlay.classList.add('show');

    craftEditor.canvas = document.getElementById('craftEditorCanvas');
    craftEditor.ctx = craftEditor.canvas.getContext('2d');
    craftEditor.canvas.width = craftEditor.width;
    craftEditor.canvas.height = craftEditor.height;

    craftEditor.floodCanvas = document.createElement('canvas');
    craftEditor.floodCanvas.width = craftEditor.width;
    craftEditor.floodCanvas.height = craftEditor.height;
    craftEditor.floodCtx = craftEditor.floodCanvas.getContext('2d');

    craftLoadEditorState();
    craftInitColorPicker();
    craftInitFabricDesignGrids();
    craftInitEditorEvents();
    craftLoadBaseImage();
}

function craftCloseEditor() {
    document.getElementById('craftEditorOverlay').classList.remove('show');
    craftRenderSquare();
    craftRenderVars();
}

function craftLoadEditorState() {
    try {
        const key = craftEditorStorageKey();
        const saved = localStorage.getItem(key + '_parts');
        if (saved) craftEditor.parts = JSON.parse(saved);
        const customF = localStorage.getItem(key + '_customFabrics');
        if (customF) craftEditor.customFabrics = JSON.parse(customF);
        const customD = localStorage.getItem(key + '_customDesigns');
        if (customD) craftEditor.customDesigns = JSON.parse(customD);
    } catch (e) {
        craftEditor.parts = [];
        craftEditor.customFabrics = [];
        craftEditor.customDesigns = [];
    }
    craftEditor.currentPartIdx = -1;
    craftRenderPartsList();
}

function craftSaveEditorState() {
    try {
        const key = craftEditorStorageKey();
        localStorage.setItem(key + '_parts', JSON.stringify(craftEditor.parts));
        localStorage.setItem(key + '_customFabrics', JSON.stringify(craftEditor.customFabrics));
        localStorage.setItem(key + '_customDesigns', JSON.stringify(craftEditor.customDesigns));
    } catch (e) {}
}

function craftLoadBaseImage() {
    const patternData = craftGetPattern(craftEditor.catIdx, craftEditor.subIdx, craftEditor.itemIdx, craftEditor.varIdx);
    if (patternData) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            craftEditor.baseImage = img;
            const scale = Math.min(craftEditor.width / img.width, craftEditor.height / img.height) * 0.88;
            const drawW = img.width * scale;
            const drawH = img.height * scale;
            const offX = (craftEditor.width - drawW) / 2;
            const offY = (craftEditor.height - drawH) / 2;

            const tmpCanvas = document.createElement('canvas');
            tmpCanvas.width = craftEditor.width;
            tmpCanvas.height = craftEditor.height;
            const tmpCtx = tmpCanvas.getContext('2d');
            tmpCtx.fillStyle = '#ffffff';
            tmpCtx.fillRect(0, 0, craftEditor.width, craftEditor.height);
            tmpCtx.drawImage(img, offX, offY, drawW, drawH);
            craftEditor.baseImageData = tmpCtx.getImageData(0, 0, craftEditor.width, craftEditor.height);

            craftEditor.floodCtx.putImageData(craftEditor.baseImageData, 0, 0);
            craftEditor.fabricPatternCache = {};
            craftEditor.designPatternCache = {};
            craftRedrawCanvas();
        };
        img.src = patternData;
    } else {
        craftEditor.baseImage = null;
        craftEditor.baseImageData = null;
        craftRedrawCanvas();
    }
}

function craftRedrawCanvas() {
    const ctx = craftEditor.ctx;
    const w = craftEditor.width;
    const h = craftEditor.height;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    if (craftEditor.baseImageData) {
        ctx.putImageData(craftEditor.baseImageData, 0, 0);
    }

    for (let i = 0; i < craftEditor.parts.length; i++) {
        const p = craftEditor.parts[i];
        if (!p.points || p.points.length < 3) continue;

        ctx.save();
        ctx.beginPath();
        craftDrawPathFromPoints(ctx, p.points);
        ctx.closePath();
        ctx.clip();

        if (p.color) {
            ctx.globalCompositeOperation = 'multiply';
            ctx.fillStyle = p.color;
            ctx.fillRect(0, 0, w, h);
        }

        if (p.fabricType && p.fabricType !== 'none') {
            ctx.globalCompositeOperation = 'multiply';
            const pat = craftGetFabricPattern(p.fabricType, p.fabricIdx);
            if (pat) {
                ctx.fillStyle = pat;
                ctx.fillRect(0, 0, w, h);
            }
        }

        if (p.designType && p.designType !== 'none') {
            ctx.globalCompositeOperation = 'multiply';
            const pat = craftGetDesignPattern(p.designType, p.designIdx);
            if (pat) {
                ctx.fillStyle = pat;
                ctx.fillRect(0, 0, w, h);
            }
        }

        ctx.restore();
    }

    if (craftEditor.previewMode && craftEditor.previewMask) {
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = '#ff6b44';
        const imgData = ctx.createImageData(w, h);
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                if (craftEditor.previewMask[y * w + x]) {
                    const idx = (y * w + x) * 4;
                    imgData.data[idx] = 255;
                    imgData.data[idx + 1] = 107;
                    imgData.data[idx + 2] = 68;
                    imgData.data[idx + 3] = 100;
                }
            }
        }
        ctx.putImageData(imgData, 0, 0);
        ctx.restore();

        const previewPoints = craftMaskToPolygon(craftEditor.previewMask, w, h);
        const simplified = craftSimplifyPolygon(previewPoints, 2.0);
        if (simplified.length >= 3) {
            ctx.save();
            ctx.strokeStyle = '#ff6b44';
            ctx.lineWidth = 2.5;
            ctx.setLineDash([8, 5]);
            ctx.beginPath();
            craftDrawPathFromPoints(ctx, simplified);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        }
    }

    if (craftEditor.isDrawing && craftEditor.drawingPoints.length > 0) {
        ctx.save();
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        craftDrawPathFromPoints(ctx, craftEditor.drawingPoints);
        ctx.stroke();
        ctx.restore();
    }

    if (craftEditor.currentPartIdx >= 0 && craftEditor.mode === 'select') {
        const p = craftEditor.parts[craftEditor.currentPartIdx];
        if (p && p.points && p.points.length >= 3) {
            ctx.save();
            ctx.strokeStyle = '#ff8800';
            ctx.lineWidth = 2.5;
            ctx.setLineDash([6, 4]);
            ctx.beginPath();
            craftDrawPathFromPoints(ctx, p.points);
            ctx.closePath();
            ctx.stroke();
            ctx.restore();
        }
    }
}

function craftDrawPathFromPoints(ctx, points) {
    if (points.length < 2) return;
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
}

function craftGetCanvasPos(e) {
    const rect = craftEditor.canvas.getBoundingClientRect();
    const scaleX = craftEditor.canvas.width / rect.width;
    const scaleY = craftEditor.canvas.height / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

function craftPointInPolygon(pt, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i].x, yi = poly[i].y;
        const xj = poly[j].x, yj = poly[j].y;
        const intersect = ((yi > pt.y) !== (yj > pt.y)) &&
            (pt.x < (xj - xi) * (pt.y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

function craftInitEditorEvents() {
    const canvas = craftEditor.canvas;
    const wrap = canvas.parentElement;

    function onMouseDown(e) {
        const pos = craftGetCanvasPos(e);

        if (craftEditor.mode === 'magic') {
            e.preventDefault();
            craftEditor.magicStart = pos;
            craftEditor.magicRect = { x: pos.x, y: pos.y, w: 0, h: 0 };
            if (!craftEditor.magicRectEl) {
                craftEditor.magicRectEl = document.createElement('div');
                craftEditor.magicRectEl.className = 'craft-selection-rect';
                wrap.appendChild(craftEditor.magicRectEl);
            }
            craftUpdateMagicRect();
            craftEditor.magicRectEl.style.display = 'block';
            return;
        }

        if (craftEditor.mode === 'draw') {
            e.preventDefault();
            craftEditor.isDrawing = true;
            craftEditor.drawingPoints = [pos];
            craftRedrawCanvas();
            return;
        }
    }

    function onMouseMove(e) {
        const pos = craftGetCanvasPos(e);

        if (craftEditor.mode === 'magic' && craftEditor.magicStart) {
            craftEditor.magicRect = {
                x: Math.min(craftEditor.magicStart.x, pos.x),
                y: Math.min(craftEditor.magicStart.y, pos.y),
                w: Math.abs(pos.x - craftEditor.magicStart.x),
                h: Math.abs(pos.y - craftEditor.magicStart.y)
            };
            craftUpdateMagicRect();
            return;
        }

        if (craftEditor.mode === 'draw' && craftEditor.isDrawing) {
            craftEditor.drawingPoints.push(pos);
            craftRedrawCanvas();
            return;
        }
    }

    function onMouseUp(e) {
        if (craftEditor.mode === 'magic' && craftEditor.magicStart) {
            const rect = craftEditor.magicRect;
            craftEditor.magicStart = null;
            if (craftEditor.magicRectEl) {
                craftEditor.magicRectEl.style.display = 'none';
            }
            if (rect && rect.w > 10 && rect.h > 10) {
                craftMagicExtractRegion(rect);
            }
            return;
        }

        if (craftEditor.mode === 'draw' && craftEditor.isDrawing) {
            craftEditor.isDrawing = false;
            if (craftEditor.drawingPoints.length >= 10) {
                craftFinishDrawing();
            } else {
                craftEditor.drawingPoints = [];
                craftRedrawCanvas();
            }
            return;
        }
    }

    canvas.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    canvas.addEventListener('click', function(e) {
        if (craftEditor.mode !== 'select') return;
        const pos = craftGetCanvasPos(e);
        let found = -1;
        for (let i = craftEditor.parts.length - 1; i >= 0; i--) {
            if (craftEditor.parts[i].points && craftEditor.parts[i].points.length >= 3 &&
                craftPointInPolygon(pos, craftEditor.parts[i].points)) {
                found = i;
                break;
            }
        }
        craftEditor.currentPartIdx = found;
        if (found >= 0) {
            craftApplyColorToPart(found, craftEditor.currentColor);
        }
        craftRenderPartsList();
        craftRedrawCanvas();
        craftUpdateCurrentPartInfo();
    });

    document.getElementById('craftEditorClose').addEventListener('click', craftCloseEditor);

    document.querySelectorAll('.craft-mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.craft-mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            craftEditor.mode = this.dataset.mode;
            craftEditor.canvas.classList.remove('mode-select', 'mode-draw', 'mode-magic');
            craftEditor.canvas.classList.add('mode-' + craftEditor.mode);
            document.getElementById('craftDrawSection').style.display = craftEditor.mode === 'draw' ? 'flex' : 'none';
            document.getElementById('craftMagicSection').style.display = craftEditor.mode === 'magic' ? 'flex' : 'none';
            craftEditor.isDrawing = false;
            craftEditor.drawingPoints = [];
            craftEditor.magicStart = null;
            if (craftEditor.magicRectEl) craftEditor.magicRectEl.style.display = 'none';
            document.getElementById('craftPartNameInput').value = '';
            document.getElementById('craftMagicNameInput').value = '';
            craftRedrawCanvas();
        });
    });

    document.getElementById('craftFinishPart').addEventListener('click', craftFinishDrawing);
    document.getElementById('craftCancelPart').addEventListener('click', craftCancelDrawing);
    document.getElementById('craftMagicCancel').addEventListener('click', function() {
        craftEditor.magicStart = null;
        if (craftEditor.magicRectEl) craftEditor.magicRectEl.style.display = 'none';
    });

    document.getElementById('craftDeletePart').addEventListener('click', function() {
        if (craftEditor.currentPartIdx < 0) {
            alert('请先选择一个部位');
            return;
        }
        if (!confirm('确定删除该部位吗？')) return;
        craftEditor.parts.splice(craftEditor.currentPartIdx, 1);
        craftEditor.currentPartIdx = -1;
        craftRenderPartsList();
        craftRedrawCanvas();
        craftSaveEditorState();
        craftUpdateCurrentPartInfo();
    });

    document.getElementById('craftResetColor').addEventListener('click', function() {
        if (craftEditor.currentPartIdx < 0) {
            alert('请先选择一个部位');
            return;
        }
        craftEditor.parts[craftEditor.currentPartIdx].color = null;
        craftEditor.parts[craftEditor.currentPartIdx].fabricType = null;
        craftEditor.parts[craftEditor.currentPartIdx].fabricIdx = 0;
        craftEditor.parts[craftEditor.currentPartIdx].designType = null;
        craftEditor.parts[craftEditor.currentPartIdx].designIdx = 0;
        craftRenderPartsList();
        craftRedrawCanvas();
        craftSaveEditorState();
    });

    document.getElementById('craftEditorUpload').addEventListener('click', function() {
        document.getElementById('craftEditorFileUpload').click();
    });

    document.getElementById('craftEditorFileUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
            craftSetPattern(craftEditor.catIdx, craftEditor.subIdx, craftEditor.itemIdx, craftEditor.varIdx, ev.target.result);
            craftLoadBaseImage();
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    });

    document.getElementById('craftApplyToAll').addEventListener('click', function() {
        if (!craftEditor.baseImageData) {
            alert('请先上传图纸');
            return;
        }
        craftApplyOverallColor();
    });

    document.getElementById('craftAutoPartition').addEventListener('click', function() {
        craftAutoPartitionAll();
    });

    document.getElementById('craftClearAll').addEventListener('click', function() {
        if (!confirm('确定清空所有分区和颜色吗？')) return;
        craftEditor.parts = [];
        craftEditor.currentPartIdx = -1;
        craftRenderPartsList();
        craftRedrawCanvas();
        craftSaveEditorState();
        craftUpdateCurrentPartInfo();
    });

    document.getElementById('craftEditorSave').addEventListener('click', function() {
        craftSaveEditorResult();
    });

    document.getElementById('craftUploadFabric').addEventListener('click', function() {
        document.getElementById('craftFabricUpload').click();
    });

    document.getElementById('craftFabricUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
            craftEditor.customFabrics.push({ name: '自定义' + (craftEditor.customFabrics.length + 1), dataUrl: ev.target.result });
            craftSaveEditorState();
            craftInitFabricDesignGrids();
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    });

    document.getElementById('craftUploadDesign').addEventListener('click', function() {
        document.getElementById('craftDesignUpload').click();
    });

    document.getElementById('craftDesignUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(ev) {
            craftEditor.customDesigns.push({ name: '自定义' + (craftEditor.customDesigns.length + 1), dataUrl: ev.target.result });
            craftSaveEditorState();
            craftInitFabricDesignGrids();
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    });
}

function craftUpdateMagicRect() {
    if (!craftEditor.magicRectEl || !craftEditor.magicRect) return;
    const rect = craftEditor.magicRect;
    const canvasRect = craftEditor.canvas.getBoundingClientRect();
    const wrapRect = craftEditor.canvas.parentElement.getBoundingClientRect();
    const scaleX = canvasRect.width / craftEditor.canvas.width;
    const scaleY = canvasRect.height / craftEditor.canvas.height;
    const left = (canvasRect.left - wrapRect.left) + rect.x * scaleX;
    const top = (canvasRect.top - wrapRect.top) + rect.y * scaleY;
    craftEditor.magicRectEl.style.left = left + 'px';
    craftEditor.magicRectEl.style.top = top + 'px';
    craftEditor.magicRectEl.style.width = (rect.w * scaleX) + 'px';
    craftEditor.magicRectEl.style.height = (rect.h * scaleY) + 'px';
}

function craftMagicExtractRegion(rect) {
    if (!craftEditor.baseImageData) return;

    const startPt = craftFindStartPoint(rect);
    if (!startPt) {
        alert('未在选框内找到可识别区域，请调整选框位置');
        return;
    }

    const coloredMask = craftBuildColoredMask();

    const mask = craftFloodFill(startPt.x, startPt.y, {
        rect: rect,
        tolerance: 90,
        edgeThreshold: 110,
        extraBoundaryMask: coloredMask
    });

    if (!mask) {
        alert('未识别到有效区域，请调整选框位置');
        return;
    }

    let count = 0;
    for (let i = 0; i < mask.length; i++) if (mask[i]) count++;
    if (count < 100) {
        alert('识别区域过小，请框选更大范围');
        return;
    }

    craftEditor.previewMask = mask;
    craftEditor.previewMode = true;
    craftRedrawCanvas();

    const confirmed = confirm('识别到一个区域，确定添加为分区吗？');
    craftEditor.previewMode = false;
    craftEditor.previewMask = null;

    if (!confirmed) {
        craftRedrawCanvas();
        return;
    }

    const points = craftMaskToPolygon(mask, craftEditor.width, craftEditor.height);
    const simplified = craftSimplifyPolygon(points, 2.0);

    const nameInput = document.getElementById('craftMagicNameInput');
    const name = nameInput.value.trim() || ('部位' + (craftEditor.parts.length + 1));

    craftEditor.parts.push({
        name: name,
        points: simplified,
        color: null,
        fabricType: null,
        fabricIdx: 0,
        designType: null,
        designIdx: 0
    });

    craftEditor.currentPartIdx = craftEditor.parts.length - 1;
    nameInput.value = '';
    craftRenderPartsList();
    craftRedrawCanvas();
    craftSaveEditorState();
    craftUpdateCurrentPartInfo();
    craftUpdateFabricDesignSelection();

    craftEditor.mode = 'select';
    document.querySelectorAll('.craft-mode-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.craft-mode-btn[data-mode="select"]').classList.add('active');
    craftEditor.canvas.classList.remove('mode-magic');
    craftEditor.canvas.classList.add('mode-select');
    document.getElementById('craftMagicSection').style.display = 'none';
}

function craftFindStartPoint(rect) {
    const w = craftEditor.width;
    const h = craftEditor.height;
    const imgData = craftEditor.floodCtx.getImageData(0, 0, w, h);
    const data = imgData.data;

    const cx = Math.floor(rect.x + rect.w / 2);
    const cy = Math.floor(rect.y + rect.h / 2);

    const idx0 = (cy * w + cx) * 4;
    const b0 = (data[idx0] + data[idx0 + 1] + data[idx0 + 2]) / 3;
    if (b0 > 140 && b0 < 255) return { x: cx, y: cy };

    const step = Math.max(4, Math.floor(Math.min(rect.w, rect.h) / 15));
    for (let r = step; r < Math.min(rect.w, rect.h) / 2; r += step) {
        for (let angle = 0; angle < 360; angle += 30) {
            const rad = angle * Math.PI / 180;
            const x = Math.floor(cx + Math.cos(rad) * r);
            const y = Math.floor(cy + Math.sin(rad) * r);
            if (x < rect.x + 2 || x > rect.x + rect.w - 2 ||
                y < rect.y + 2 || y > rect.y + rect.h - 2) continue;
            if (x < 2 || x >= w - 2 || y < 2 || y >= h - 2) continue;
            const idx = (y * w + x) * 4;
            const b = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
            if (b > 140 && b < 250) return { x, y };
        }
    }

    for (let y = Math.floor(rect.y) + 5; y < rect.y + rect.h - 5; y += 8) {
        for (let x = Math.floor(rect.x) + 5; x < rect.x + rect.w - 5; x += 8) {
            const idx = (y * w + x) * 4;
            const b = (data[idx] + data[idx + 1] + data[idx + 2]) / 3;
            if (b > 140 && b < 250) return { x, y };
        }
    }

    return null;
}

function craftBuildColoredMask() {
    const w = craftEditor.width;
    const h = craftEditor.height;
    const mask = new Uint8Array(w * h);

    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = w;
    tmpCanvas.height = h;
    const tmpCtx = tmpCanvas.getContext('2d');
    tmpCtx.fillStyle = '#ffffff';
    tmpCtx.fillRect(0, 0, w, h);
    if (craftEditor.baseImageData) {
        tmpCtx.putImageData(craftEditor.baseImageData, 0, 0);
    }

    for (let i = 0; i < craftEditor.parts.length; i++) {
        const p = craftEditor.parts[i];
        if (!p.points || p.points.length < 3 || !p.color) continue;
        tmpCtx.save();
        tmpCtx.beginPath();
        craftDrawPathFromPoints(tmpCtx, p.points);
        tmpCtx.closePath();
        tmpCtx.clip();
        tmpCtx.fillStyle = '#ff0000';
        tmpCtx.fillRect(0, 0, w, h);
        tmpCtx.restore();
    }

    const imgData = tmpCtx.getImageData(0, 0, w, h);
    const data = imgData.data;

    for (let i = 0; i < w * h; i++) {
        const idx = i * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        if (r > 200 && g < 100 && b < 100) {
            mask[i] = 1;
        }
    }

    return mask;
}

function craftFloodFill(startX, startY, opts) {
    const imgData = craftEditor.floodCtx.getImageData(0, 0, craftEditor.width, craftEditor.height);
    const data = imgData.data;
    const w = craftEditor.width;
    const h = craftEditor.height;
    const tolerance = opts.tolerance || 60;
    const edgeThreshold = opts.edgeThreshold || 100;
    const rect = opts.rect || { x: 0, y: 0, w: w, h: h };
    const extraBoundary = opts.extraBoundaryMask || null;

    const startIdx = (Math.floor(startY) * w + Math.floor(startX)) * 4;
    const startR = data[startIdx];
    const startG = data[startIdx + 1];
    const startB = data[startIdx + 2];
    const startBrightness = (startR + startG + startB) / 3;

    const mask = new Uint8Array(w * h);
    const stack = [];
    stack.push([Math.floor(startX), Math.floor(startY)]);
    mask[Math.floor(startY) * w + Math.floor(startX)] = 1;

    let count = 0;
    const maxCount = w * h * 0.6;

    while (stack.length > 0 && count < maxCount) {
        const [x, y] = stack.pop();
        count++;

        if (x < rect.x || x > rect.x + rect.w || y < rect.y || y > rect.y + rect.h) continue;
        if (x < 1 || x >= w - 1 || y < 1 || y >= h - 1) continue;

        const pIdx = y * w + x;
        if (extraBoundary && extraBoundary[pIdx]) continue;

        const idx = pIdx * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        const brightness = (r + g + b) / 3;
        if (brightness < edgeThreshold) continue;

        const dr = Math.abs(r - startR);
        const dg = Math.abs(g - startG);
        const db = Math.abs(b - startB);
        const diff = Math.max(dr, dg, db);
        if (diff > tolerance && brightness > edgeThreshold) continue;

        mask[pIdx] = 1;

        const right = pIdx + 1;
        const left = pIdx - 1;
        const down = pIdx + w;
        const up = pIdx - w;

        if (!mask[right] && x + 1 < w - 1) {
            if (!extraBoundary || !extraBoundary[right]) {
                mask[right] = 1;
                stack.push([x + 1, y]);
            }
        }
        if (!mask[left] && x - 1 > 0) {
            if (!extraBoundary || !extraBoundary[left]) {
                mask[left] = 1;
                stack.push([x - 1, y]);
            }
        }
        if (!mask[down] && y + 1 < h - 1) {
            if (!extraBoundary || !extraBoundary[down]) {
                mask[down] = 1;
                stack.push([x, y + 1]);
            }
        }
        if (!mask[up] && y - 1 > 0) {
            if (!extraBoundary || !extraBoundary[up]) {
                mask[up] = 1;
                stack.push([x, y - 1]);
            }
        }
    }

    return mask;
}

function craftMaskToPolygon(mask, w, h) {
    let topY = -1, bottomY = -1;
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if (mask[y * w + x]) { topY = y; break; }
        }
        if (topY >= 0) break;
    }
    for (let y = h - 1; y >= 0; y--) {
        for (let x = 0; x < w; x++) {
            if (mask[y * w + x]) { bottomY = y; break; }
        }
        if (bottomY >= 0) break;
    }
    if (topY < 0 || bottomY < 0) return [];

    const points = [];
    const step = Math.max(1, Math.floor((bottomY - topY) / 100));

    for (let y = topY; y <= bottomY; y += step) {
        let leftX = -1, rightX = -1;
        for (let x = 0; x < w; x++) {
            if (mask[y * w + x]) { leftX = x; break; }
        }
        for (let x = w - 1; x >= 0; x--) {
            if (mask[y * w + x]) { rightX = x; break; }
        }
        if (leftX >= 0) points.push({ x: leftX, y: y });
    }

    for (let y = bottomY; y >= topY; y -= step) {
        let rightX = -1;
        for (let x = w - 1; x >= 0; x--) {
            if (mask[y * w + x]) { rightX = x; break; }
        }
        if (rightX >= 0) points.push({ x: rightX, y: y });
    }

    return points;
}

function craftSimplifyPolygon(points, tolerance) {
    if (points.length <= 2) return points;

    function perpendicularDistance(pt, lineStart, lineEnd) {
        const dx = lineEnd.x - lineStart.x;
        const dy = lineEnd.y - lineStart.y;
        const mag = Math.sqrt(dx * dx + dy * dy);
        if (mag === 0) return Math.sqrt((pt.x - lineStart.x) ** 2 + (pt.y - lineStart.y) ** 2);
        const pvx = pt.x - lineStart.x;
        const pvy = pt.y - lineStart.y;
        const t = (pvx * dx + pvy * dy) / (mag * mag);
        const closestX = lineStart.x + t * dx;
        const closestY = lineStart.y + t * dy;
        return Math.sqrt((pt.x - closestX) ** 2 + (pt.y - closestY) ** 2);
    }

    function rdp(pts, tol) {
        if (pts.length < 3) return pts;
        let maxDist = 0;
        let index = 0;
        const end = pts.length - 1;
        for (let i = 1; i < end; i++) {
            const d = perpendicularDistance(pts[i], pts[0], pts[end]);
            if (d > maxDist) { maxDist = d; index = i; }
        }
        if (maxDist > tol) {
            const rec1 = rdp(pts.slice(0, index + 1), tol);
            const rec2 = rdp(pts.slice(index), tol);
            return rec1.slice(0, -1).concat(rec2);
        } else {
            return [pts[0], pts[end]];
        }
    }

    return rdp(points, tolerance);
}

function craftApplyOverallColor() {
    if (!craftEditor.baseImageData) return;

    const color = craftEditor.currentColor;

    const w = craftEditor.width;
    const h = craftEditor.height;
    const cx = Math.floor(w / 2);
    const cy = Math.floor(h / 2);

    const startPt = craftFindStartPoint({ x: 0, y: 0, w, h });
    if (!startPt) {
        alert('无法识别图纸区域');
        return;
    }

    const mask = craftFloodFill(startPt.x, startPt.y, {
        rect: { x: 0, y: 0, w: w, h: h },
        tolerance: 100,
        edgeThreshold: 90
    });

    if (!mask) {
        alert('无法识别图纸区域');
        return;
    }

    const points = craftMaskToPolygon(mask, w, h);
    if (points.length < 10) {
        alert('无法识别图纸区域');
        return;
    }

    const simplified = craftSimplifyPolygon(points, 3.0);

    const name = '整体';
    const existingIdx = craftEditor.parts.findIndex(p => p.name === '整体');
    if (existingIdx >= 0) {
        craftEditor.parts[existingIdx].points = simplified;
        craftEditor.parts[existingIdx].color = color;
        craftEditor.currentPartIdx = existingIdx;
    } else {
        craftEditor.parts.unshift({
            name: name,
            points: simplified,
            color: color,
            fabricType: null,
            fabricIdx: 0,
            designType: null,
            designIdx: 0
        });
        craftEditor.currentPartIdx = 0;
    }

    craftRenderPartsList();
    craftRedrawCanvas();
    craftSaveEditorState();
    craftUpdateCurrentPartInfo();
    craftUpdateFabricDesignSelection();
}

function craftAutoPartitionAll() {
    if (!craftEditor.baseImageData) {
        alert('请先上传图纸');
        return;
    }

    if (!confirm('将自动识别图纸中的所有封闭区域并生成分区，确定继续吗？')) return;

    const w = craftEditor.width;
    const h = craftEditor.height;
    const regions = craftFindAllClosedRegions();

    if (regions.length === 0) {
        alert('未识别到有效区域');
        return;
    }

    const newParts = [];
    for (let i = 0; i < regions.length; i++) {
        const r = regions[i];
        const points = craftMaskToPolygon(r.mask, w, h);
        const simplified = craftSimplifyPolygon(points, 2.0);
        if (simplified.length < 10) continue;

        const name = craftAutoNameRegion(r, w, h, newParts);
        newParts.push({
            name: name,
            points: simplified,
            color: null,
            fabricType: null,
            fabricIdx: 0,
            designType: null,
            designIdx: 0,
            area: r.area,
            cx: r.cx,
            cy: r.cy
        });
    }

    newParts.sort((a, b) => a.cy - b.cy);

    for (let i = 0; i < newParts.length; i++) {
        delete newParts[i].area;
        delete newParts[i].cx;
        delete newParts[i].cy;
    }

    craftEditor.parts = newParts;
    craftEditor.currentPartIdx = newParts.length > 0 ? 0 : -1;

    craftRenderPartsList();
    craftRedrawCanvas();
    craftSaveEditorState();
    craftUpdateCurrentPartInfo();
    craftUpdateFabricDesignSelection();

    alert('已自动识别 ' + newParts.length + ' 个区域');
}

function craftFindAllClosedRegions() {
    const w = craftEditor.width;
    const h = craftEditor.height;
    const imgData = craftEditor.floodCtx.getImageData(0, 0, w, h);
    const data = imgData.data;

    const visited = new Uint8Array(w * h);
    const regions = [];

    const step = 12;

    for (let y = step; y < h - step; y += step) {
        for (let x = step; x < w - step; x += step) {
            const pIdx = y * w + x;
            if (visited[pIdx]) continue;

            const idx = pIdx * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const brightness = (r + g + b) / 3;

            if (brightness < 120) continue;
            if (brightness > 252) continue;

            const mask = new Uint8Array(w * h);
            const stack = [[x, y]];
            mask[pIdx] = 1;
            visited[pIdx] = 1;

            let area = 0;
            let sumX = 0;
            let sumY = 0;
            let count = 0;
            const maxCount = w * h * 0.3;

            while (stack.length > 0 && count < maxCount) {
                const [cx, cy] = stack.pop();
                count++;
                area++;
                sumX += cx;
                sumY += cy;

                const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
                for (const [nx, ny] of neighbors) {
                    if (nx < 1 || nx >= w - 1 || ny < 1 || ny >= h - 1) continue;
                    const nIdx = ny * w + nx;
                    if (visited[nIdx]) continue;
                    if (mask[nIdx]) continue;

                    const nDataIdx = nIdx * 4;
                    const nr = data[nDataIdx];
                    const ng = data[nDataIdx + 1];
                    const nb = data[nDataIdx + 2];
                    const nBright = (nr + ng + nb) / 3;

                    const dr = Math.abs(nr - r);
                    const dg = Math.abs(ng - g);
                    const db = Math.abs(nb - b);
                    const diff = Math.max(dr, dg, db);

                    if (nBright < 100) continue;
                    if (diff > 90 && nBright > 120) continue;

                    mask[nIdx] = 1;
                    visited[nIdx] = 1;
                    stack.push([nx, ny]);
                }
            }

            if (area > 500) {
                regions.push({
                    mask: mask,
                    area: area,
                    cx: sumX / area,
                    cy: sumY / area
                });
            }
        }
    }

    regions.sort((a, b) => b.area - a.area);
    return regions.slice(0, 20);
}

function craftAutoNameRegion(region, w, h, existingParts) {
    const cx = region.cx;
    const cy = region.cy;
    const area = region.area;

    const topThird = h * 0.33;
    const midThird = h * 0.66;

    const totalArea = w * h;
    const areaRatio = area / totalArea;

    let name = '部位' + (existingParts.length + 1);

    if (cy < topThird) {
        if (areaRatio > 0.08) {
            name = '上衣';
        } else if (cx < w * 0.4) {
            name = '左袖';
        } else if (cx > w * 0.6) {
            name = '右袖';
        } else {
            name = '领口';
        }
    } else if (cy < midThird) {
        if (areaRatio < 0.06) {
            name = '腰带';
        } else if (areaRatio > 0.15) {
            name = '腰裙';
        } else {
            name = '腰部';
        }
    } else {
        if (areaRatio > 0.12) {
            name = '下裙';
        } else if (cx < w * 0.45) {
            name = '左下摆';
        } else if (cx > w * 0.55) {
            name = '右下摆';
        } else {
            name = '裙摆';
        }
    }

    let count = 1;
    let baseName = name;
    while (existingParts.some(p => p.name === name)) {
        count++;
        name = baseName + count;
    }

    return name;
}

function craftFinishDrawing() {
    if (craftEditor.drawingPoints.length < 3) {
        alert('至少需要3个点才能形成一个区域');
        return;
    }
    const name = document.getElementById('craftPartNameInput').value.trim() || ('部位' + (craftEditor.parts.length + 1));
    craftEditor.parts.push({
        name: name,
        points: [...craftEditor.drawingPoints],
        color: null,
        fabricType: null,
        fabricIdx: 0,
        designType: null,
        designIdx: 0
    });
    craftEditor.isDrawing = false;
    craftEditor.drawingPoints = [];
    document.getElementById('craftPartNameInput').value = '';
    craftEditor.currentPartIdx = craftEditor.parts.length - 1;
    craftRenderPartsList();
    craftRedrawCanvas();
    craftSaveEditorState();
    craftUpdateCurrentPartInfo();
    craftEditor.canvas.classList.remove('mode-draw');
    craftEditor.canvas.classList.add('mode-select');
    craftEditor.mode = 'select';
    document.querySelectorAll('.craft-mode-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.craft-mode-btn[data-mode="select"]').classList.add('active');
    document.getElementById('craftDrawSection').style.display = 'none';
}

function craftCancelDrawing() {
    craftEditor.isDrawing = false;
    craftEditor.drawingPoints = [];
    document.getElementById('craftPartNameInput').value = '';
    craftRedrawCanvas();
}

function craftApplyColorToPart(idx, color) {
    if (idx < 0 || idx >= craftEditor.parts.length) return;
    craftEditor.parts[idx].color = color;
    craftSaveEditorState();
}

function craftRenderPartsList() {
    const list = document.getElementById('craftPartsList');
    if (craftEditor.parts.length === 0) {
        list.innerHTML = '<div class="craft-part-empty">暂无分区，请先分区</div>';
        return;
    }
    list.innerHTML = craftEditor.parts.map((p, i) => `
        <div class="craft-part-item ${craftEditor.currentPartIdx === i ? 'active' : ''}" data-idx="${i}">
            <div class="craft-part-color" style="background:${p.color || '#ffffff'}"></div>
            <div class="craft-part-name">${p.name}</div>
        </div>
    `).join('');
    list.querySelectorAll('.craft-part-item').forEach(item => {
        item.addEventListener('click', function() {
            const idx = parseInt(this.dataset.idx);
            craftEditor.currentPartIdx = idx;
            craftApplyColorToPart(idx, craftEditor.currentColor);
            craftUpdateFabricDesignSelection();
            craftRenderPartsList();
            craftRedrawCanvas();
            craftUpdateCurrentPartInfo();
        });
    });
}

function craftUpdateCurrentPartInfo() {
    const el = document.getElementById('craftCurrentPart');
    if (craftEditor.currentPartIdx >= 0 && craftEditor.parts[craftEditor.currentPartIdx]) {
        el.textContent = craftEditor.parts[craftEditor.currentPartIdx].name;
    } else {
        el.textContent = '未选择';
    }
}

function craftSaveEditorResult() {
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = craftEditor.width;
    tmpCanvas.height = craftEditor.height;
    const tmpCtx = tmpCanvas.getContext('2d');
    tmpCtx.fillStyle = '#ffffff';
    tmpCtx.fillRect(0, 0, craftEditor.width, craftEditor.height);
    if (craftEditor.baseImageData) {
        tmpCtx.putImageData(craftEditor.baseImageData, 0, 0);
    }
    const w = craftEditor.width;
    const h = craftEditor.height;
    for (let i = 0; i < craftEditor.parts.length; i++) {
        const p = craftEditor.parts[i];
        if (!p.points || p.points.length < 3) continue;
        tmpCtx.save();
        tmpCtx.beginPath();
        craftDrawPathFromPoints(tmpCtx, p.points);
        tmpCtx.closePath();
        tmpCtx.clip();
        if (p.color) {
            tmpCtx.globalCompositeOperation = 'multiply';
            tmpCtx.fillStyle = p.color;
            tmpCtx.fillRect(0, 0, w, h);
        }
        if (p.fabricType && p.fabricType !== 'none') {
            tmpCtx.globalCompositeOperation = 'multiply';
            const pat = craftGetFabricPattern(p.fabricType, p.fabricIdx);
            if (pat) { tmpCtx.fillStyle = pat; tmpCtx.fillRect(0, 0, w, h); }
        }
        if (p.designType && p.designType !== 'none') {
            tmpCtx.globalCompositeOperation = 'multiply';
            const pat = craftGetDesignPattern(p.designType, p.designIdx);
            if (pat) { tmpCtx.fillStyle = pat; tmpCtx.fillRect(0, 0, w, h); }
        }
        tmpCtx.restore();
    }
    const dataUrl = tmpCanvas.toDataURL('image/png');
    craftSetPattern(craftEditor.catIdx, craftEditor.subIdx, craftEditor.itemIdx, craftEditor.varIdx, dataUrl);
    craftSaveEditorState();
    alert('已保存！');
}

/* ===== 颜色选择器 ===== */

function craftInitColorPicker() {
    const gridPicker = document.getElementById('craftGridPicker');
    gridPicker.innerHTML = GRID_COLORS.map(c =>
        `<div class="craft-grid-color" style="background:${c}" data-color="${c}" title="${c}"></div>`
    ).join('');
    gridPicker.querySelectorAll('.craft-grid-color').forEach(el => {
        el.addEventListener('click', function() {
            craftSetColor(this.dataset.color);
            gridPicker.querySelectorAll('.craft-grid-color').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    document.querySelectorAll('.craft-color-mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.craft-color-mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const mode = this.dataset.cmode;
            document.getElementById('craftColorGrid').style.display = mode === 'grid' ? 'block' : 'none';
            document.getElementById('craftColorSpectrum').style.display = mode === 'spectrum' ? 'block' : 'none';
            document.getElementById('craftColorSlider').style.display = mode === 'slider' ? 'block' : 'none';
            if (mode === 'spectrum') craftDrawSpectrum();
        });
    });

    ['craftSliderR', 'craftSliderG', 'craftSliderB'].forEach((id, i) => {
        document.getElementById(id).addEventListener('input', function() {
            document.getElementById(id + 'Val').textContent = this.value;
            const r = parseInt(document.getElementById('craftSliderR').value);
            const g = parseInt(document.getElementById('craftSliderG').value);
            const b = parseInt(document.getElementById('craftSliderB').value);
            const hex = craftRgbToHex(r, g, b);
            craftSetColor(hex, false);
        });
    });

    craftDrawSpectrum();
    craftSetColor('#ff6b6b');
}

function craftDrawSpectrum() {
    const specCanvas = document.getElementById('craftSpectrumCanvas');
    const hueCanvas = document.getElementById('craftHueCanvas');
    if (!specCanvas || !hueCanvas) return;

    const sCtx = specCanvas.getContext('2d');
    const hCtx = hueCanvas.getContext('2d');
    const sw = specCanvas.width;
    const sh = specCanvas.height;
    const hw = hueCanvas.width;
    const hh = hueCanvas.height;

    const hueGrad = hCtx.createLinearGradient(0, 0, hw, 0);
    const hueStops = [0, 60, 120, 180, 240, 300, 360];
    const hueColors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff0000'];
    for (let i = 0; i < hueStops.length; i++) {
        hueGrad.addColorStop(hueStops[i] / 360, hueColors[i]);
    }
    hCtx.fillStyle = hueGrad;
    hCtx.fillRect(0, 0, hw, hh);

    const baseColor = craftEditor.currentColor;
    const rgb = craftHexToRgb(baseColor);
    const [h, s, v] = craftRgbToHsv(rgb.r, rgb.g, rgb.b);

    const rgbHue = craftHsvToRgb(h, 1, 1);
    const hueColor = `rgb(${rgbHue[0]}, ${rgbHue[1]}, ${rgbHue[2]})`;

    const gradH = sCtx.createLinearGradient(0, 0, sw, 0);
    gradH.addColorStop(0, '#ffffff');
    gradH.addColorStop(1, hueColor);
    sCtx.fillStyle = gradH;
    sCtx.fillRect(0, 0, sw, sh);

    const gradV = sCtx.createLinearGradient(0, 0, 0, sh);
    gradV.addColorStop(0, 'rgba(0,0,0,0)');
    gradV.addColorStop(1, '#000000');
    sCtx.fillStyle = gradV;
    sCtx.fillRect(0, 0, sw, sh);

    let isDraggingSpec = false;
    let isDraggingHue = false;

    specCanvas.onmousedown = function(e) {
        isDraggingSpec = true;
        craftPickSpectrum(e);
    };
    specCanvas.onmousemove = function(e) {
        if (isDraggingSpec) craftPickSpectrum(e);
    };
    document.addEventListener('mouseup', function() { isDraggingSpec = false; isDraggingHue = false; });

    hueCanvas.onmousedown = function(e) {
        isDraggingHue = true;
        craftPickHue(e);
    };
    hueCanvas.onmousemove = function(e) {
        if (isDraggingHue) craftPickHue(e);
    };
}

function craftPickSpectrum(e) {
    const canvas = document.getElementById('craftSpectrumCanvas');
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(canvas.width, (e.clientX - rect.left) * (canvas.width / rect.width)));
    const y = Math.max(0, Math.min(canvas.height, (e.clientY - rect.top) * (canvas.height / rect.height)));
    const s = x / canvas.width;
    const v = 1 - y / canvas.height;
    const rgb = craftHexToRgb(craftEditor.currentColor);
    const [h, , ] = craftRgbToHsv(rgb.r, rgb.g, rgb.b);
    const [r, g, b] = craftHsvToRgb(h, s, v);
    const hex = craftRgbToHex(r, g, b);
    craftSetColor(hex);
}

function craftPickHue(e) {
    const canvas = document.getElementById('craftHueCanvas');
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(canvas.width, (e.clientX - rect.left) * (canvas.width / rect.width)));
    const h = (x / canvas.width) * 360;
    const rgb = craftHexToRgb(craftEditor.currentColor);
    const [, s, v] = craftRgbToHsv(rgb.r, rgb.g, rgb.b);
    const [r, g, b] = craftHsvToRgb(h, Math.max(s, 0.5), Math.max(v, 0.9));
    const hex = craftRgbToHex(r, g, b);
    craftSetColor(hex);
    craftDrawSpectrum();
}

function craftSetColor(hex, applyToSelected = true) {
    craftEditor.currentColor = hex;
    document.getElementById('craftColorSwatch').style.background = hex;
    document.getElementById('craftColorHex').textContent = hex.toUpperCase();

    const rgb = craftHexToRgb(hex);
    document.getElementById('craftSliderR').value = rgb.r;
    document.getElementById('craftSliderG').value = rgb.g;
    document.getElementById('craftSliderB').value = rgb.b;
    document.getElementById('craftSliderRVal').textContent = rgb.r;
    document.getElementById('craftSliderGVal').textContent = rgb.g;
    document.getElementById('craftSliderBVal').textContent = rgb.b;

    const gridPicker = document.getElementById('craftGridPicker');
    gridPicker.querySelectorAll('.craft-grid-color').forEach(el => {
        el.classList.toggle('active', el.dataset.color.toLowerCase() === hex.toLowerCase());
    });

    if (applyToSelected && craftEditor.currentPartIdx >= 0) {
        craftApplyColorToPart(craftEditor.currentPartIdx, hex);
        craftRenderPartsList();
        craftRedrawCanvas();
    }
}

function craftHexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    return {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16)
    };
}

function craftRgbToHex(r, g, b) {
    r = Math.round(Math.max(0, Math.min(255, r)));
    g = Math.round(Math.max(0, Math.min(255, g)));
    b = Math.round(Math.max(0, Math.min(255, b)));
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function craftRgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;
    if (d !== 0) {
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return [h * 360, s, v];
}

function craftHsvToRgb(h, s, v) {
    h = h / 360;
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/* ===== 布料 / 设计 ===== */

function craftInitFabricDesignGrids() {
    const fabricPresetGrid = document.getElementById('craftFabricPresetGrid');
    const fabricCustomGrid = document.getElementById('craftFabricCustomGrid');
    const designPresetGrid = document.getElementById('craftDesignPresetGrid');
    const designCustomGrid = document.getElementById('craftDesignCustomGrid');
    if (!fabricPresetGrid || !designPresetGrid) return;

    fabricPresetGrid.innerHTML = PRESET_FABRICS.map((f, i) => {
        const bg = craftGetFabricPreview(f);
        return `<div class="craft-pattern-item" style="${bg}" data-fidx="${i}" title="${f.name}"></div>`;
    }).join('');
    fabricPresetGrid.querySelectorAll('.craft-pattern-item').forEach(el => {
        el.addEventListener('click', function() {
            if (craftEditor.currentPartIdx < 0) { alert('请先选择一个部位'); return; }
            const idx = parseInt(this.dataset.fidx);
            craftEditor.parts[craftEditor.currentPartIdx].fabricType = 'preset';
            craftEditor.parts[craftEditor.currentPartIdx].fabricIdx = idx;
            craftUpdateFabricDesignSelection();
            craftRedrawCanvas();
            craftSaveEditorState();
        });
    });

    if (craftEditor.customFabrics.length === 0) {
        fabricCustomGrid.innerHTML = '<div class="craft-pattern-empty">暂无自定义</div>';
    } else {
        fabricCustomGrid.innerHTML = craftEditor.customFabrics.map((f, i) => {
            return `<div class="craft-pattern-item" style="background-image:url(${f.dataUrl});background-size:cover;" data-fcidx="${i}" title="${f.name}"></div>`;
        }).join('');
        fabricCustomGrid.querySelectorAll('.craft-pattern-item').forEach(el => {
            el.addEventListener('click', function() {
                if (craftEditor.currentPartIdx < 0) { alert('请先选择一个部位'); return; }
                const idx = parseInt(this.dataset.fcidx);
                craftEditor.parts[craftEditor.currentPartIdx].fabricType = 'custom';
                craftEditor.parts[craftEditor.currentPartIdx].fabricIdx = idx;
                craftUpdateFabricDesignSelection();
                craftRedrawCanvas();
                craftSaveEditorState();
            });
        });
    }

    designPresetGrid.innerHTML = PRESET_DESIGNS.map((d, i) => {
        if (d.type === 'none') {
            return `<div class="craft-pattern-item none" data-didx="${i}" title="${d.name}">无</div>`;
        }
        const bg = craftGetDesignPreview(d);
        return `<div class="craft-pattern-item" style="${bg}" data-didx="${i}" title="${d.name}"></div>`;
    }).join('');
    designPresetGrid.querySelectorAll('.craft-pattern-item').forEach(el => {
        el.addEventListener('click', function() {
            if (craftEditor.currentPartIdx < 0) { alert('请先选择一个部位'); return; }
            const idx = parseInt(this.dataset.didx);
            if (PRESET_DESIGNS[idx].type === 'none') {
                craftEditor.parts[craftEditor.currentPartIdx].designType = null;
                craftEditor.parts[craftEditor.currentPartIdx].designIdx = 0;
            } else {
                craftEditor.parts[craftEditor.currentPartIdx].designType = 'preset';
                craftEditor.parts[craftEditor.currentPartIdx].designIdx = idx;
            }
            craftUpdateFabricDesignSelection();
            craftRedrawCanvas();
            craftSaveEditorState();
        });
    });

    if (craftEditor.customDesigns.length === 0) {
        designCustomGrid.innerHTML = '<div class="craft-pattern-empty">暂无自定义</div>';
    } else {
        designCustomGrid.innerHTML = craftEditor.customDesigns.map((d, i) => {
            return `<div class="craft-pattern-item" style="background-image:url(${d.dataUrl});background-size:cover;" data-dcidx="${i}" title="${d.name}"></div>`;
        }).join('');
        designCustomGrid.querySelectorAll('.craft-pattern-item').forEach(el => {
            el.addEventListener('click', function() {
                if (craftEditor.currentPartIdx < 0) { alert('请先选择一个部位'); return; }
                const idx = parseInt(this.dataset.dcidx);
                craftEditor.parts[craftEditor.currentPartIdx].designType = 'custom';
                craftEditor.parts[craftEditor.currentPartIdx].designIdx = idx;
                craftUpdateFabricDesignSelection();
                craftRedrawCanvas();
                craftSaveEditorState();
            });
        });
    }

    craftUpdateFabricDesignSelection();
}

function craftUpdateFabricDesignSelection() {
    const fabricPresetGrid = document.getElementById('craftFabricPresetGrid');
    const fabricCustomGrid = document.getElementById('craftFabricCustomGrid');
    const designPresetGrid = document.getElementById('craftDesignPresetGrid');
    const designCustomGrid = document.getElementById('craftDesignCustomGrid');

    fabricPresetGrid.querySelectorAll('.craft-pattern-item').forEach(e => e.classList.remove('active'));
    fabricCustomGrid.querySelectorAll('.craft-pattern-item').forEach(e => e.classList.remove('active'));
    designPresetGrid.querySelectorAll('.craft-pattern-item').forEach(e => e.classList.remove('active'));
    designCustomGrid.querySelectorAll('.craft-pattern-item').forEach(e => e.classList.remove('active'));

    if (craftEditor.currentPartIdx < 0) return;
    const p = craftEditor.parts[craftEditor.currentPartIdx];
    if (!p) return;

    if (p.fabricType === 'preset') {
        const el = fabricPresetGrid.querySelector(`[data-fidx="${p.fabricIdx}"]`);
        if (el) el.classList.add('active');
    } else if (p.fabricType === 'custom') {
        const el = fabricCustomGrid.querySelector(`[data-fcidx="${p.fabricIdx}"]`);
        if (el) el.classList.add('active');
    }

    if (p.designType === 'preset') {
        const el = designPresetGrid.querySelector(`[data-didx="${p.designIdx}"]`);
        if (el) el.classList.add('active');
    } else if (p.designType === 'custom') {
        const el = designCustomGrid.querySelector(`[data-dcidx="${p.designIdx}"]`);
        if (el) el.classList.add('active');
    } else if (!p.designType) {
        const el = designPresetGrid.querySelector(`[data-didx="0"]`);
        if (el) el.classList.add('active');
    }
}

function craftGetFabricPattern(type, idx) {
    const cacheKey = `f_${type}_${idx}`;
    if (craftEditor.fabricPatternCache[cacheKey]) return craftEditor.fabricPatternCache[cacheKey];

    let fabric;
    if (type === 'preset') {
        fabric = PRESET_FABRICS[idx];
    } else if (type === 'custom') {
        fabric = craftEditor.customFabrics[idx];
    }
    if (!fabric) return null;

    if (type === 'custom' && fabric.dataUrl) {
        const patCanvas = document.createElement('canvas');
        patCanvas.width = 100;
        patCanvas.height = 100;
        const patCtx = patCanvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = fabric.dataUrl;
        if (img.complete) {
            patCtx.drawImage(img, 0, 0, 100, 100);
            const pat = craftEditor.ctx.createPattern(patCanvas, 'repeat');
            craftEditor.fabricPatternCache[cacheKey] = pat;
            return pat;
        } else {
            return null;
        }
    }

    const patCanvas = document.createElement('canvas');
    patCanvas.width = 60;
    patCanvas.height = 60;
    const patCtx = patCanvas.getContext('2d');

    if (fabric.type === 'solid') {
        patCtx.fillStyle = fabric.color;
        patCtx.fillRect(0, 0, 60, 60);
    } else if (fabric.type === 'lines') {
        patCtx.fillStyle = fabric.color1;
        patCtx.fillRect(0, 0, 60, 60);
        patCtx.fillStyle = fabric.color2;
        for (let y = 0; y < 60; y += 6) {
            patCtx.fillRect(0, y, 60, 3);
        }
    } else if (fabric.type === 'grid') {
        patCtx.fillStyle = fabric.color1;
        patCtx.fillRect(0, 0, 60, 60);
        patCtx.strokeStyle = fabric.color2;
        patCtx.lineWidth = 1;
        for (let x = 0; x <= 60; x += 12) {
            patCtx.beginPath(); patCtx.moveTo(x, 0); patCtx.lineTo(x, 60); patCtx.stroke();
        }
        for (let y = 0; y <= 60; y += 12) {
            patCtx.beginPath(); patCtx.moveTo(0, y); patCtx.lineTo(60, y); patCtx.stroke();
        }
    } else if (fabric.type === 'diagonal') {
        patCtx.fillStyle = fabric.color1;
        patCtx.fillRect(0, 0, 60, 60);
        patCtx.fillStyle = fabric.color2;
        for (let i = -60; i < 60; i += 10) {
            patCtx.beginPath();
            patCtx.moveTo(i, 0);
            patCtx.lineTo(i + 60, 60);
            patCtx.lineTo(i + 65, 60);
            patCtx.lineTo(i + 5, 0);
            patCtx.closePath();
            patCtx.fill();
        }
    } else if (fabric.type === 'dots') {
        patCtx.fillStyle = fabric.color1;
        patCtx.fillRect(0, 0, 60, 60);
        patCtx.fillStyle = fabric.color2;
        for (let y = 6; y < 60; y += 12) {
            for (let x = 6; x < 60; x += 12) {
                patCtx.beginPath();
                patCtx.arc(x, y, 2.5, 0, Math.PI * 2);
                patCtx.fill();
            }
        }
    } else if (fabric.type === 'noise') {
        patCtx.fillStyle = fabric.color;
        patCtx.fillRect(0, 0, 60, 60);
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * 60;
            const y = Math.random() * 60;
            const a = Math.random() * 0.08;
            patCtx.fillStyle = `rgba(0,0,0,${a})`;
            patCtx.fillRect(x, y, 1, 1);
        }
    }

    const pat = craftEditor.ctx.createPattern(patCanvas, 'repeat');
    craftEditor.fabricPatternCache[cacheKey] = pat;
    return pat;
}

function craftGetDesignPattern(type, idx) {
    const cacheKey = `d_${type}_${idx}`;
    if (craftEditor.designPatternCache[cacheKey]) return craftEditor.designPatternCache[cacheKey];

    let design;
    if (type === 'preset') {
        design = PRESET_DESIGNS[idx];
    } else if (type === 'custom') {
        design = craftEditor.customDesigns[idx];
    }
    if (!design) return null;

    if (type === 'custom' && design.dataUrl) {
        const patCanvas = document.createElement('canvas');
        patCanvas.width = 100;
        patCanvas.height = 100;
        const patCtx = patCanvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = design.dataUrl;
        if (img.complete) {
            patCtx.drawImage(img, 0, 0, 100, 100);
            const pat = craftEditor.ctx.createPattern(patCanvas, 'repeat');
            craftEditor.designPatternCache[cacheKey] = pat;
            return pat;
        } else {
            return null;
        }
    }

    const patCanvas = document.createElement('canvas');
    patCanvas.width = 80;
    patCanvas.height = 80;
    const patCtx = patCanvas.getContext('2d');
    patCtx.fillStyle = 'rgba(255,255,255,0)';
    patCtx.clearRect(0, 0, 80, 80);

    if (design.type === 'stripes') {
        patCtx.fillStyle = design.color;
        for (let x = 0; x < 80; x += 12) {
            patCtx.fillRect(x, 0, 4, 80);
        }
    } else if (design.type === 'polka') {
        patCtx.fillStyle = design.color;
        for (let y = 10; y < 80; y += 20) {
            for (let x = 10; x < 80; x += 20) {
                patCtx.beginPath();
                patCtx.arc(x, y, 4, 0, Math.PI * 2);
                patCtx.fill();
            }
        }
    } else if (design.type === 'plaid') {
        patCtx.strokeStyle = design.color;
        patCtx.lineWidth = 1.5;
        for (let x = 0; x <= 80; x += 20) {
            patCtx.beginPath(); patCtx.moveTo(x, 0); patCtx.lineTo(x, 80); patCtx.stroke();
        }
        for (let y = 0; y <= 80; y += 20) {
            patCtx.beginPath(); patCtx.moveTo(0, y); patCtx.lineTo(80, y); patCtx.stroke();
        }
    } else if (design.type === 'floral') {
        patCtx.fillStyle = design.color;
        const centers = [[20, 20], [60, 60], [60, 20], [20, 60]];
        centers.forEach(([cx, cy]) => {
            for (let i = 0; i < 5; i++) {
                const angle = (i / 5) * Math.PI * 2;
                const px = cx + Math.cos(angle) * 5;
                const py = cy + Math.sin(angle) * 5;
                patCtx.beginPath();
                patCtx.arc(px, py, 3, 0, Math.PI * 2);
                patCtx.fill();
            }
            patCtx.beginPath();
            patCtx.arc(cx, cy, 2, 0, Math.PI * 2);
            patCtx.fill();
        });
    } else if (design.type === 'geo') {
        patCtx.fillStyle = design.color;
        for (let y = 0; y < 80; y += 16) {
            for (let x = 0; x < 80; x += 16) {
                patCtx.beginPath();
                patCtx.moveTo(x, y + 8);
                patCtx.lineTo(x + 8, y);
                patCtx.lineTo(x + 16, y + 8);
                patCtx.lineTo(x + 8, y + 16);
                patCtx.closePath();
                patCtx.fill();
            }
        }
    }

    const pat = craftEditor.ctx.createPattern(patCanvas, 'repeat');
    craftEditor.designPatternCache[cacheKey] = pat;
    return pat;
}

function craftGetFabricPreview(f) {
    if (f.type === 'custom' && f.dataUrl) {
        return `background-image:url(${f.dataUrl});background-size:cover;`;
    }
    if (f.type === 'solid') return `background:${f.color};`;
    if (f.type === 'lines') return `background:repeating-linear-gradient(0deg,${f.color1},${f.color1} 3px,${f.color2} 3px,${f.color2} 5px);`;
    if (f.type === 'grid') return `background:linear-gradient(${f.color2} 1px, transparent 1px),linear-gradient(90deg,${f.color2} 1px, transparent 1px),${f.color1};background-size:8px 8px;`;
    if (f.type === 'diagonal') return `background:repeating-linear-gradient(45deg,${f.color1},${f.color1} 4px,${f.color2} 4px,${f.color2} 8px);`;
    if (f.type === 'dots') return `background:radial-gradient(${f.color2} 1.5px, ${f.color1} 1.5px);background-size:8px 8px;`;
    if (f.type === 'noise') return `background:${f.color};`;
    return `background:#eee;`;
}

function craftGetDesignPreview(d) {
    if (d.type === 'custom' && d.dataUrl) {
        return `background-image:url(${d.dataUrl});background-size:cover;`;
    }
    if (d.type === 'stripes') return `background:repeating-linear-gradient(90deg,transparent,transparent 6px,${d.color} 6px,${d.color} 8px),#fff;`;
    if (d.type === 'polka') return `background:radial-gradient(${d.color} 2px, #fff 2px);background-size:12px 12px;`;
    if (d.type === 'plaid') return `background:linear-gradient(${d.color} 1px, transparent 1px),linear-gradient(90deg,${d.color} 1px, transparent 1px),#fff;background-size:12px 12px;`;
    if (d.type === 'floral') return `background:radial-gradient(circle at 30% 30%, ${d.color} 2px, transparent 3px),radial-gradient(circle at 70% 70%, ${d.color} 1.5px, transparent 2.5px),#fff;background-size:16px 16px;`;
    if (d.type === 'geo') return `background:linear-gradient(45deg, ${d.color} 25%, transparent 25%) 0 0 / 10px 10px,linear-gradient(-45deg, ${d.color} 25%, transparent 25%) 0 0 / 10px 10px,#fff;`;
    return `background:#eee;`;
}

/* ===== 与主流程对接 ===== */

function craftUpdateEditButton() {
    const editBtn = document.getElementById('craftEditBtn');
    if (!editBtn) return;
    const hasPattern = craftState.catIdx !== null && craftState.subIdx !== null &&
        craftState.itemIdx !== null && craftState.varIdx !== null &&
        !!craftGetPattern(craftState.catIdx, craftState.subIdx, craftState.itemIdx, craftState.varIdx);
    editBtn.style.display = hasPattern ? 'inline-block' : 'none';
}

const _origCraftRenderAll = craftRenderAll;
craftRenderAll = function() {
    _origCraftRenderAll();
    craftUpdateEditButton();
};
