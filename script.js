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

/* =====================================================================
   以下为基于 index.html 结构与 style.css 样式重建的函数
   - 美团APP容器 #mtAppMain: 添加/移除 mt-show
   - 商城APP容器 #shopAppMain: 添加/移除 shop-show
   - IG APP容器 #igAppMain: 添加/移除 ig-show
   - 美团弹窗 .mt-modal: 添加/移除 mt-show
   - 商城/IG 弹窗: 添加/移除 show
   - 手工艺 #craftViewerOverlay: 添加/移除 show
   - 页面切换 .mt-view / .shop-view: 添加/移除 active
   - 底部标签 .mt-tab-item / .shop-tab-item: 添加/移除 active
   ===================================================================== */

/* ----------------------- 美团 APP (mt) ----------------------- */

function mtOpenApp() {
    const el = document.getElementById('mtAppMain');
    if (el) el.classList.add('mt-show');
    if (typeof mtRenderReactApp === 'function') {
        setTimeout(mtRenderReactApp, 50);
    }
}

function mtCloseApp() {
    const el = document.getElementById('mtAppMain');
    if (el) el.classList.remove('mt-show');
    if (typeof mtUnmountReactApp === 'function') {
        mtUnmountReactApp();
    }
}

function mtCloseModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('mt-show');
}

function mtShowView(viewId) {
    document.querySelectorAll('.mt-view').forEach(v => v.classList.remove('active'));
    const v = document.getElementById(viewId);
    if (v) v.classList.add('active');
}

function mtSwitchTab(target) {
    document.querySelectorAll('.mt-tab-item').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-target') === target);
    });
}

function mtShowToast(msg) {
    const t = document.getElementById('mtToast');
    if (!t) { return; }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._mtToastTimer);
    t._mtToastTimer = setTimeout(() => t.classList.remove('show'), 2000);
}

function mtOpenCategory(catId) {
    const title = document.getElementById('mtCategoryTitle');
    if (title) title.textContent = '美食';
    mtShowView('mtViewCategory');
    mtSwitchTab('Home');
}

function mtOpenStore(storeId) {
    mtShowView('mtViewStore');
}

function mtBackFromStore() {
    mtShowView('mtViewCategory');
}

function mtBackFromCart() {
    mtShowView('mtViewHome');
    mtSwitchTab('Home');
}

function mtBackFromCheckout() {
    mtShowView('mtViewCart');
    mtSwitchTab('Cart');
}

function mtBackToHome() {
    mtShowView('mtViewHome');
    mtSwitchTab('Home');
}

function mtOpenCheckout() {
    mtShowView('mtViewCheckout');
}

function mtToggleCart() {
    const cart = document.getElementById('mtViewCart');
    if (cart && cart.classList.contains('active')) {
        mtShowView('mtViewHome');
        mtSwitchTab('Home');
    } else {
        mtShowView('mtViewCart');
        mtSwitchTab('Cart');
    }
}

function mtConfirmOrder() {
    const m = document.getElementById('mtModalPassword');
    if (m) m.classList.add('mt-show');
}

function mtConfirmPayment() {
    const m = document.getElementById('mtModalPassword');
    if (m) m.classList.remove('mt-show');
    const input = document.getElementById('mtPasswordInput');
    if (input) input.value = '';
    mtShowToast('支付成功');
    mtShowView('mtViewHome');
    mtSwitchTab('Home');
}

function mtOpenOrders() {
    const m = document.getElementById('mtModalOrders');
    if (m) m.classList.add('mt-show');
}

function mtOpenAddresses() {
    const m = document.getElementById('mtModalAddressManage');
    if (m) m.classList.add('mt-show');
}

function mtOpenCoupons() {
    const m = document.getElementById('mtModalCouponManage');
    if (m) m.classList.add('mt-show');
}

function mtOpenSettings() {
    const m = document.getElementById('mtModalSettings');
    if (m) m.classList.add('mt-show');
}

function mtOpenMessages() {
    mtShowToast('暂无新消息');
}

function mtSelectAddress(id) {
    const m = document.getElementById('mtModalAddress');
    if (m) m.classList.add('mt-show');
}

function mtSelectCoupon(id) {
    const m = document.getElementById('mtModalCoupon');
    if (m) m.classList.add('mt-show');
}

function mtSelectDeliveryTime(time) {
    const m = document.getElementById('mtModalDeliveryTime');
    if (m) m.classList.add('mt-show');
}

function mtSaveAddress() {
    const m = document.getElementById('mtModalAddressEdit');
    if (m) m.classList.remove('mt-show');
    mtShowToast('地址已保存');
}

function mtAddNewAddress() {
    const m = document.getElementById('mtModalAddressEdit');
    if (m) m.classList.add('mt-show');
}

function mtClearCache() {
    try { localStorage.removeItem('mtCache'); } catch (e) {}
    mtShowToast('缓存已清除');
}

/* ----------------------- 商城 APP (shop) ----------------------- */

let shopCartCount = 0;

function shopOpenApp() {
    const el = document.getElementById('shopAppMain');
    if (el) el.classList.add('shop-show');
}

function shopCloseApp() {
    const el = document.getElementById('shopAppMain');
    if (el) el.classList.remove('shop-show');
}

function shopCloseModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('show');
}

function shopOpenModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('show');
}

function shopShowToast(msg) {
    const t = document.getElementById('shopToast');
    if (!t) { return; }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._shopToastTimer);
    t._shopToastTimer = setTimeout(() => t.classList.remove('show'), 2000);
}

function shopSwitchTab(tabName) {
    document.querySelectorAll('.shop-view').forEach(v => v.classList.remove('active'));
    const view = document.getElementById('shopView' + tabName);
    if (view) view.classList.add('active');
    document.querySelectorAll('.shop-tab-item').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-target') === tabName);
    });
    if (tabName === 'Cart') {
        shopRefreshCartUI();
    }
}

function shopRefreshCartUI() {
    const badge = document.getElementById('shopTabBadge');
    if (badge) badge.textContent = shopCartCount;
    const count = document.getElementById('shopCartCount');
    if (count) count.textContent = shopCartCount + ' 件商品';
    const empty = document.getElementById('shopCartEmpty');
    if (empty) empty.classList.toggle('show', shopCartCount === 0);
}

function shopOpenColorPalette() {
    shopOpenModal('shopModalColorPalette');
}

const SHOP_COLOR_PRESETS = {
    milk_tea:    { primary: '#c8b098', primaryLight: '#dcc5a8', accent: '#c88a60' },
    misty_purple:{ primary: '#b8a8d0', primaryLight: '#d8c8e8', accent: '#9880b8' },
    soft_pink:   { primary: '#e8b8c8', primaryLight: '#f0d0d8', accent: '#d88898' },
    mint_green:  { primary: '#a8d0b8', primaryLight: '#c8e0d0', accent: '#7ab08c' },
    sky_blue:    { primary: '#a8c0d8', primaryLight: '#c8d8e8', accent: '#7898b8' },
    warm_orange: { primary: '#e8b888', primaryLight: '#f0d0a8', accent: '#c88848' }
};

function shopApplyColorPreset(preset) {
    const p = SHOP_COLOR_PRESETS[preset];
    if (!p) return;
    const root = document.getElementById('shopAppMain');
    if (root) {
        root.style.setProperty('--shop-primary', p.primary);
        root.style.setProperty('--shop-primary-light', p.primaryLight);
        root.style.setProperty('--shop-accent', p.accent);
    }
    try { localStorage.setItem('shopColorPreset', preset); } catch (e) {}
}

function shopResetColorScheme() {
    const root = document.getElementById('shopAppMain');
    if (root) {
        root.style.removeProperty('--shop-primary');
        root.style.removeProperty('--shop-primary-light');
        root.style.removeProperty('--shop-accent');
    }
    try { localStorage.removeItem('shopColorPreset'); } catch (e) {}
}

function shopSaveColorScheme() {
    shopCloseModal('shopModalColorPalette');
    shopShowToast('色系已保存');
}

function shopOpenEditProfile() {
    const nameEl = document.getElementById('shopProfileName');
    const descEl = document.getElementById('shopProfileDesc');
    const nameInput = document.getElementById('shopEditNameInput');
    const descInput = document.getElementById('shopEditDescInput');
    if (nameEl && nameInput) nameInput.value = nameEl.textContent.replace(/✨/g, '').trim();
    if (descEl && descInput) descInput.value = descEl.textContent.replace(/✨/g, '').trim();
    shopOpenModal('shopModalEditProfile');
}

function shopSaveProfile() {
    const nameInput = document.getElementById('shopEditNameInput');
    const descInput = document.getElementById('shopEditDescInput');
    const avatarImg = document.getElementById('shopEditAvatarImg');
    const nameEl = document.getElementById('shopProfileName');
    const descEl = document.getElementById('shopProfileDesc');
    if (nameInput && nameEl && nameInput.value.trim()) {
        nameEl.childNodes[0] && (nameEl.childNodes[0].nodeValue = nameInput.value.trim() + ' ');
    }
    if (descInput && descEl && descInput.value.trim()) {
        descEl.childNodes[0] && (descEl.childNodes[0].nodeValue = '✨ ' + descInput.value.trim() + ' ');
    }
    if (avatarImg && avatarImg.src) {
        const target = document.getElementById('shopAvatarImg');
        if (target) target.src = avatarImg.src;
    }
    shopCloseModal('shopModalEditProfile');
    shopShowToast('资料已保存');
}

function shopTriggerProfileBgUpload() {
    const f = document.getElementById('shopProfileBgFile');
    if (f) f.click();
}

function shopTriggerAvatarUpload() {
    const f = document.getElementById('shopAvatarFile');
    if (f) f.click();
}

function shopTriggerBannerUpload() {
    const f = document.getElementById('shopBannerBgFile');
    if (f) f.click();
}

function shopTriggerProductImgUpload() {
    const f = document.getElementById('shopProductImgFile');
    if (f) f.click();
}

function shopTriggerRoleAvatarUpload() {
    const f = document.getElementById('shopRoleAvatarUpload');
    if (f) f.click();
}

function shopOpenOrders(type) {
    shopOpenModal('shopModalOrders');
}

function shopOpenFavorites() {
    shopOpenModal('shopModalFavorites');
}

function shopOpenAddresses() {
    shopOpenModal('shopModalAddresses');
}

function shopOpenCoupons() {
    shopOpenModal('shopModalCoupons');
}

function shopOpenSettings() {
    shopOpenModal('shopModalSettings');
}

function shopOpenWriteComment() {
    shopOpenModal('shopModalWriteComment');
}

function shopRefreshComments() {
    shopShowToast('已刷新评价');
}

function shopSubmitComment() {
    shopCloseModal('shopModalWriteComment');
    shopShowToast('评价已发布');
}

function shopAddToCart() {
    shopCartCount++;
    shopRefreshCartUI();
    shopShowToast('已加入购物袋');
}

function shopBuyNow() {
    shopOpenModal('shopModalBuyNow');
}

function shopConfirmBuyNow() {
    shopCloseModal('shopModalBuyNow');
    shopShowToast('下单成功');
}

function shopConfirmCartCheckout() {
    shopCloseModal('shopModalCartCheckout');
    shopCartCount = 0;
    shopRefreshCartUI();
    shopShowToast('支付成功');
}

function shopToggleFavoriteFromDetail() {
    const btn = document.getElementById('shopProductFavBtn');
    if (btn) {
        btn.classList.toggle('favorited');
        shopShowToast(btn.classList.contains('favorited') ? '已收藏' : '已取消收藏');
    }
}

function shopOpenRoles() {
    shopOpenModal('shopModalRoles');
}

function shopOpenEditRole() {
    shopOpenModal('shopModalEditRole');
}

function shopSaveRole() {
    shopCloseModal('shopModalEditRole');
    shopShowToast('角色已保存');
}

function shopAddNewAddress() {
    shopOpenModal('shopModalEditAddress');
}

function shopSaveAddress() {
    shopCloseModal('shopModalEditAddress');
    shopShowToast('地址已保存');
}

function shopToggleBuyNowAddrList(event) {
    if (event && event.stopPropagation) event.stopPropagation();
    const dd = document.getElementById('shopBuyNowAddrDropdown');
    if (dd) dd.classList.toggle('show');
}

function shopToggleCartAddrList(event) {
    if (event && event.stopPropagation) event.stopPropagation();
    const dd = document.getElementById('shopCartAddrDropdown');
    if (dd) dd.classList.toggle('show');
}

function shopClearCache() {
    try {
        localStorage.removeItem('shopCache');
        localStorage.removeItem('shopCart');
        localStorage.removeItem('shopFavorites');
        localStorage.removeItem('shopOrders');
        localStorage.removeItem('shopAddresses');
        localStorage.removeItem('shopCoupons');
        localStorage.removeItem('shopRoles');
        localStorage.removeItem('shopProfile');
        localStorage.removeItem('shopComments');
        localStorage.removeItem('shopColorScheme');
        localStorage.removeItem('shopColorPreset');
    } catch (e) {}
    shopShowToast('缓存已清除');
    shopInit();
}

/* ======================= 商城APP完整功能 ======================= */

let shopCurrentProduct = null;
let shopCurrentCategory = 'all';
let shopCurrentSpec = null;
let shopCurrentRole = null;
let shopCurrentOrderTab = 'all';
let shopEditAddressId = null;
let shopEditRoleId = null;
let shopBuyNowCouponId = null;
let shopCartCouponId = null;
let shopCommentRating = 5;
let shopCommentProductId = null;

const SHOP_CATEGORY_NAMES = {
    all: '全部',
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

const shopProducts = [
    { id: 1, name: '雾感紫调连衣裙', price: 299, originalPrice: 399, category: 'women', emoji: '👗', desc: '温柔雾感紫调，修身显瘦版型，面料柔软亲肤', specs: ['S', 'M', 'L', 'XL'], sales: 1256 },
    { id: 2, name: '奶杏色针织开衫', price: 199, originalPrice: 259, category: 'women', emoji: '🧥', desc: '软糯奶杏色，百搭针织开衫，春秋必备单品', specs: ['均码'], sales: 892 },
    { id: 3, name: '丝绒哑光唇釉', price: 89, originalPrice: 128, category: 'beauty', emoji: '💄', desc: '丝绒哑光质地，持久显色不拔干，豆沙色超温柔', specs: ['豆沙色', '番茄红', '奶茶棕', '莓果色'], sales: 3567 },
    { id: 4, name: '烟酰胺美白精华', price: 159, originalPrice: 219, category: 'beauty', emoji: '🧴', desc: '5%烟酰胺浓度，温和美白，提亮肤色淡化痘印', specs: ['30ml', '50ml'], sales: 2341 },
    { id: 5, name: '珍珠耳环套装', price: 69, originalPrice: 99, category: 'accessories', emoji: '💎', desc: '精致珍珠耳环，百搭气质款，日常通勤都适合', specs: ['金色', '银色'], sales: 1876 },
    { id: 6, name: '碎花丝巾', price: 49, originalPrice: 79, category: 'accessories', emoji: '🧣', desc: '浪漫碎花图案，多种系法，增添穿搭层次感', specs: ['粉紫花', '米白花', '蓝调花'], sales: 987 },
    { id: 7, name: '香薰蜡烛礼盒', price: 128, originalPrice: 168, category: 'home', emoji: '🕯️', desc: '天然大豆蜡，多种香型可选，营造温馨氛围', specs: ['薰衣草', '雪松', '白桃乌龙', '海盐鼠尾草'], sales: 1543 },
    { id: 8, name: '陶瓷马克杯', price: 59, originalPrice: 89, category: 'home', emoji: '☕', desc: '手工陶瓷马克杯，奶fufu的颜色，喝水心情都变好', specs: ['奶白色', '淡粉色', '薄荷绿'], sales: 2134 },
    { id: 9, name: '商务休闲衬衫', price: 179, originalPrice: 239, category: 'men', emoji: '👔', desc: '免烫商务休闲衬衫，版型挺括，舒适透气', specs: ['M', 'L', 'XL', 'XXL'], sales: 765 },
    { id: 10, name: '纯棉T恤', price: 89, originalPrice: 129, category: 'men', emoji: '👕', desc: '100%纯棉面料，简约百搭款，多色可选', specs: ['白色', '黑色', '灰色', '藏蓝'], sales: 1876 },
    { id: 11, name: '皮质表带手表', price: 399, originalPrice: 599, category: 'menaccessories', emoji: '⌚', desc: '简约大气表盘，真皮表带，商务休闲都适配', specs: ['黑色皮带', '棕色皮带'], sales: 543 },
    { id: 12, name: '钛钢项链', price: 129, originalPrice: 179, category: 'menaccessories', emoji: '📿', desc: '钛钢材质不褪色，简约几何设计，潮流必备', specs: ['银色', '黑色'], sales: 678 },
    { id: 13, name: '男士控油洗面奶', price: 79, originalPrice: 109, category: 'menskincare', emoji: '🧼', desc: '深层清洁控油，男士专用，清爽不紧绷', specs: ['120g', '200g'], sales: 2345 },
    { id: 14, name: '男士保湿面霜', price: 139, originalPrice: 189, category: 'menskincare', emoji: '🥛', desc: '清爽不油腻，长效保湿，改善粗糙肤质', specs: ['50g'], sales: 1234 },
    { id: 15, name: '无线蓝牙耳机', price: 299, originalPrice: 399, category: 'digital', emoji: '🎧', desc: '主动降噪，超长续航，音质清晰，佩戴舒适', specs: ['白色', '黑色'], sales: 4567 },
    { id: 16, name: '便携充电宝', price: 149, originalPrice: 199, category: 'digital', emoji: '🔋', desc: '10000mAh大容量，快充支持，轻薄便携', specs: ['白色', '紫色', '绿色'], sales: 3210 },
    { id: 17, name: '玛丽珍单鞋', price: 259, originalPrice: 329, category: 'womenshoes', emoji: '👠', desc: '复古玛丽珍款式，粗跟好走，配裙子超好看', specs: ['35', '36', '37', '38', '39'], sales: 1456 },
    { id: 18, name: '小白鞋', price: 199, originalPrice: 269, category: 'womenshoes', emoji: '👟', desc: '百搭小白鞋，真皮材质，舒适耐穿', specs: ['35', '36', '37', '38', '39'], sales: 2789 },
    { id: 19, name: '工装靴', price: 359, originalPrice: 459, category: 'menshoes', emoji: '🥾', desc: '复古工装靴，牛皮材质，耐磨防滑', specs: ['39', '40', '41', '42', '43', '44'], sales: 876 },
    { id: 20, name: '运动跑鞋', price: 299, originalPrice: 399, category: 'menshoes', emoji: '👟', desc: '轻量缓震，透气网面，跑步健身都适合', specs: ['40', '41', '42', '43', '44'], sales: 1654 },
    { id: 21, name: '复古轿车模型', price: 599, originalPrice: 799, category: 'cars', emoji: '🚗', desc: '1:18仿真合金车模，细节精致，收藏摆件佳品', specs: ['酒红色', '黑色', '白色'], sales: 345 },
    { id: 22, name: 'SUV越野车模型', price: 699, originalPrice: 899, category: 'cars', emoji: '🚙', desc: '全开门设计，真实避震，越野爱好者必备', specs: ['军绿色', '银色', '黑色'], sales: 234 },
    { id: 23, name: '别墅模型摆件', price: 899, originalPrice: 1299, category: 'houses', emoji: '🏠', desc: '手工制作别墅模型，带灯光效果，超治愈', specs: ['欧式别墅', '日式小屋', '现代公寓'], sales: 187 },
    { id: 24, name: '花园小屋DIY套装', price: 399, originalPrice: 529, category: 'houses', emoji: '🏡', desc: 'DIY手工小屋，自己动手搭建满满的成就感', specs: ['森林小屋', '海边别墅', '田园牧歌'], sales: 567 }
];

function shopGetCart() {
    try {
        const data = localStorage.getItem('shopCart');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function shopSaveCart(cart) {
    try {
        localStorage.setItem('shopCart', JSON.stringify(cart));
    } catch (e) {}
}

function shopGetFavorites() {
    try {
        const data = localStorage.getItem('shopFavorites');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function shopSaveFavorites(favs) {
    try {
        localStorage.setItem('shopFavorites', JSON.stringify(favs));
    } catch (e) {}
}

function shopGetOrders() {
    try {
        const data = localStorage.getItem('shopOrders');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function shopSaveOrders(orders) {
    try {
        localStorage.setItem('shopOrders', JSON.stringify(orders));
    } catch (e) {}
}

function shopGetAddresses() {
    try {
        const data = localStorage.getItem('shopAddresses');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function shopSaveAddresses(addrs) {
    try {
        localStorage.setItem('shopAddresses', JSON.stringify(addrs));
    } catch (e) {}
}

function shopGetCoupons() {
    try {
        const data = localStorage.getItem('shopCoupons');
        if (data) return JSON.parse(data);
    } catch (e) {}
    return [
        { id: 1, name: '新人专享券', discount: 30, minAmount: 199, expire: '2026-12-31', used: false },
        { id: 2, name: '满减优惠券', discount: 50, minAmount: 399, expire: '2026-12-31', used: false },
        { id: 3, name: '美妆专享券', discount: 20, minAmount: 99, expire: '2026-08-31', used: false }
    ];
}

function shopSaveCoupons(coupons) {
    try {
        localStorage.setItem('shopCoupons', JSON.stringify(coupons));
    } catch (e) {}
}

function shopGetRoles() {
    try {
        const data = localStorage.getItem('shopRoles');
        if (data) return JSON.parse(data);
    } catch (e) {}
    return [
        { id: 1, name: '自己', desc: '送给最爱的自己', avatar: '' },
        { id: 2, name: '闺蜜', desc: '和你一起变美', avatar: '' },
        { id: 3, name: '妈妈', desc: '辛苦了妈妈', avatar: '' }
    ];
}

function shopSaveRoles(roles) {
    try {
        localStorage.setItem('shopRoles', JSON.stringify(roles));
    } catch (e) {}
}

function shopGetProfile() {
    try {
        const data = localStorage.getItem('shopProfile');
        if (data) return JSON.parse(data);
    } catch (e) {}
    return {
        name: '雾雾子',
        desc: '✨ 热爱生活的收藏家',
        avatar: '',
        bgColor: 'linear-gradient(135deg, #d8c8f0, #b8a0d8)'
    };
}

function shopSaveProfile(profile) {
    try {
        localStorage.setItem('shopProfile', JSON.stringify(profile));
    } catch (e) {}
}

function shopGetComments(productId) {
    try {
        const data = localStorage.getItem('shopComments');
        const all = data ? JSON.parse(data) : {};
        return all[productId] || [];
    } catch (e) {
        return [];
    }
}

function shopSaveComment(productId, comment) {
    try {
        const data = localStorage.getItem('shopComments');
        const all = data ? JSON.parse(data) : {};
        if (!all[productId]) all[productId] = [];
        all[productId].unshift(comment);
        localStorage.setItem('shopComments', JSON.stringify(all));
    } catch (e) {}
}

function shopGenerateOrderNo() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const rand = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return 'SH' + year + month + day + rand;
}

function shopRenderProducts() {
    const grid = document.getElementById('shopProductsGrid');
    if (!grid) return;
    
    const products = shopCurrentCategory === 'all' 
        ? shopProducts 
        : shopProducts.filter(p => p.category === shopCurrentCategory);
    
    if (products.length === 0) {
        grid.innerHTML = '<div style="text-align:center;padding:40px;color:#b8b0c8;">暂无商品</div>';
        return;
    }
    
    const favs = shopGetFavorites();
    
    grid.innerHTML = products.map(p => {
        const isFav = favs.includes(p.id);
        return `
            <div class="shop-product-card" onclick="shopOpenProductDetail(${p.id})">
                <div class="shop-prod-img-wrap">
                    <div class="shop-prod-img" style="display:flex;align-items:center;justify-content:center;font-size:60px;background:linear-gradient(135deg,#f8f5f9,#f0eaf5);">
                        ${p.emoji}
                    </div>
                    <div class="shop-prod-fav-btn ${isFav ? 'favorited' : ''}" onclick="event.stopPropagation(); shopToggleFavorite(${p.id})">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </div>
                </div>
                <div class="shop-prod-info">
                    <div class="shop-prod-name">${p.name}</div>
                    <div class="shop-prod-price">
                        <span class="shop-price-current">¥${p.price}</span>
                        <span class="shop-price-origin">¥${p.originalPrice}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function shopInitCategories() {
    const catBar = document.getElementById('shopCategoryBar');
    if (!catBar) return;
    
    const items = catBar.querySelectorAll('.shop-cat-item');
    items.forEach(item => {
        item.addEventListener('click', function() {
            const cat = this.getAttribute('data-cat');
            shopCurrentCategory = cat;
            items.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            shopRenderProducts();
        });
    });
}

function shopOpenProductDetail(productId) {
    const product = shopProducts.find(p => p.id === productId);
    if (!product) return;
    
    shopCurrentProduct = product;
    shopCurrentSpec = product.specs && product.specs.length > 0 ? product.specs[0] : null;
    shopCurrentRole = null;
    
    const imgBox = document.getElementById('shopProductImgBox');
    const descHero = document.getElementById('shopProductDescHero');
    const detailImg = document.getElementById('shopProductDetailImg');
    const heroTitle = document.getElementById('shopProductDescHeroTitle');
    const heroText = document.getElementById('shopProductDescHeroText');
    const heroTag = document.getElementById('shopProductDescHeroTag');
    const nameEl = document.getElementById('shopProductDetailName');
    const priceEl = document.getElementById('shopProductDetailPrice');
    const descEl = document.getElementById('shopProductDesc');
    const specTags = document.getElementById('shopSpecTags');
    const roleText = document.getElementById('shopRoleSelectText');
    const favBtn = document.getElementById('shopProductFavBtn');
    
    if (imgBox) imgBox.style.display = 'none';
    if (descHero) descHero.style.display = 'flex';
    
    if (heroTitle) heroTitle.textContent = product.name;
    if (heroText) heroText.textContent = product.desc;
    if (heroTag) heroTag.textContent = SHOP_CATEGORY_NAMES[product.category] || '商品';
    if (nameEl) nameEl.textContent = product.name;
    if (priceEl) priceEl.innerHTML = `¥${product.price} <span style="font-size:14px;font-weight:400;color:#b8a8c0;text-decoration:line-through;">¥${product.originalPrice}</span>`;
    if (descEl) descEl.textContent = product.desc;
    if (roleText) {
        roleText.textContent = '点击选择角色';
        roleText.classList.remove('selected');
    }
    
    if (specTags && product.specs) {
        specTags.innerHTML = product.specs.map((spec, idx) => `
            <div class="shop-spec-tag ${idx === 0 ? 'active' : ''}" onclick="shopSelectSpec('${spec}', this)">${spec}</div>
        `).join('');
    }
    
    const favs = shopGetFavorites();
    const isFav = favs.includes(product.id);
    if (favBtn) {
        favBtn.classList.toggle('favorited', isFav);
        const svg = favBtn.querySelector('svg');
        if (svg) {
            svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
        }
    }
    
    shopRenderComments(product.id);
    shopOpenModal('shopModalProduct');
}

function shopSelectSpec(spec, el) {
    shopCurrentSpec = spec;
    const tags = document.querySelectorAll('#shopSpecTags .shop-spec-tag');
    tags.forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
}

function shopToggleFavorite(productId) {
    let favs = shopGetFavorites();
    const index = favs.indexOf(productId);
    
    if (index > -1) {
        favs.splice(index, 1);
        shopShowToast('已取消收藏');
    } else {
        favs.push(productId);
        shopShowToast('已收藏');
    }
    
    shopSaveFavorites(favs);
    shopRenderProducts();
}

function shopToggleFavoriteFromDetail() {
    if (!shopCurrentProduct) return;
    
    let favs = shopGetFavorites();
    const index = favs.indexOf(shopCurrentProduct.id);
    const btn = document.getElementById('shopProductFavBtn');
    
    if (index > -1) {
        favs.splice(index, 1);
        if (btn) {
            btn.classList.remove('favorited');
            const svg = btn.querySelector('svg');
            if (svg) svg.setAttribute('fill', 'none');
        }
        shopShowToast('已取消收藏');
    } else {
        favs.push(shopCurrentProduct.id);
        if (btn) {
            btn.classList.add('favorited');
            const svg = btn.querySelector('svg');
            if (svg) svg.setAttribute('fill', 'currentColor');
        }
        shopShowToast('已收藏');
    }
    
    shopSaveFavorites(favs);
}

function shopAddToCart() {
    if (!shopCurrentProduct) {
        shopShowToast('请先选择商品');
        return;
    }
    
    const cart = shopGetCart();
    const cartItem = {
        id: Date.now(),
        productId: shopCurrentProduct.id,
        name: shopCurrentProduct.name,
        price: shopCurrentProduct.price,
        emoji: shopCurrentProduct.emoji,
        spec: shopCurrentSpec || '',
        quantity: 1,
        role: shopCurrentRole ? shopCurrentRole.name : null
    };
    
    const existIndex = cart.findIndex(item => 
        item.productId === cartItem.productId && 
        item.spec === cartItem.spec &&
        item.role === cartItem.role
    );
    
    if (existIndex > -1) {
        cart[existIndex].quantity++;
    } else {
        cart.push(cartItem);
    }
    
    shopSaveCart(cart);
    shopRefreshCartUI();
    shopShowToast('已加入购物袋');
}

function shopRefreshCartUI() {
    const cart = shopGetCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    shopCartCount = totalCount;
    
    const badge = document.getElementById('shopTabBadge');
    if (badge) badge.textContent = totalCount;
    
    const count = document.getElementById('shopCartCount');
    if (count) count.textContent = totalCount + ' 件商品';
    
    const empty = document.getElementById('shopCartEmpty');
    const list = document.getElementById('shopCartList');
    
    if (totalCount === 0) {
        if (empty) empty.classList.add('show');
        if (list) list.innerHTML = '';
    } else {
        if (empty) empty.classList.remove('show');
        shopRenderCartList();
    }
    
    shopUpdateOrderBadges();
}

function shopRenderCartList() {
    const list = document.getElementById('shopCartList');
    if (!list) return;
    
    const cart = shopGetCart();
    
    if (cart.length === 0) {
        list.innerHTML = '';
        return;
    }
    
    list.innerHTML = cart.map(item => `
        <div class="shop-cart-item">
            <div class="shop-cart-img" style="display:flex;align-items:center;justify-content:center;font-size:40px;background:linear-gradient(135deg,#f8f5f9,#f0eaf5);">
                ${item.emoji}
            </div>
            <div class="shop-cart-info">
                <div class="shop-cart-name">${item.name}</div>
                <div class="shop-cart-price">¥${item.price}</div>
                ${item.spec ? `<div style="font-size:12px;color:#a898b8;margin-top:2px;">规格：${item.spec}</div>` : ''}
                ${item.role ? `<div style="font-size:12px;color:#a898b8;margin-top:2px;">角色：${item.role}</div>` : ''}
                <div class="shop-cart-bottom">
                    <div class="shop-cart-qty">
                        <div class="shop-qty-btn minus" onclick="shopChangeCartQty(${item.id}, -1)">−</div>
                        <div class="shop-qty-num">${item.quantity}</div>
                        <div class="shop-qty-btn plus" onclick="shopChangeCartQty(${item.id}, 1)">+</div>
                    </div>
                    <div class="shop-cart-del" onclick="shopRemoveCartItem(${item.id})">删除</div>
                </div>
            </div>
        </div>
    `).join('');
    
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const existingFooter = document.querySelector('#shopViewCart .shop-cart-footer-wrap');
    if (!existingFooter) {
        const cartView = document.getElementById('shopViewCart');
        if (cartView) {
            const footer = document.createElement('div');
            footer.className = 'shop-cart-footer-wrap';
            footer.innerHTML = `
                <div class="shop-cart-footer" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#fff;border-top:1px solid #f0eaf5;margin:0;">
                    <div class="shop-cart-total">
                        <span class="shop-total-label">合计：</span>
                        <span class="shop-total-price" id="shopCartTotalPrice" style="font-size:20px;font-weight:800;background:linear-gradient(135deg,#a86888,#c880a0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">¥${totalPrice}</span>
                    </div>
                    <div class="shop-checkout-btn" onclick="shopOpenCartCheckout()" style="padding:10px 24px;background:linear-gradient(135deg,#b888a8,#d098b8);color:#fff;border-radius:20px;font-weight:600;font-size:14px;">
                        去结算 (${cart.reduce((s, i) => s + i.quantity, 0)})
                    </div>
                </div>
            `;
            cartView.appendChild(footer);
        }
    } else {
        const totalEl = document.getElementById('shopCartTotalPrice');
        if (totalEl) totalEl.textContent = '¥' + totalPrice;
        const checkoutBtn = existingFooter.querySelector('.shop-checkout-btn');
        if (checkoutBtn) {
            const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
            checkoutBtn.textContent = '去结算 (' + totalQty + ')';
        }
    }
}

function shopChangeCartQty(itemId, delta) {
    const cart = shopGetCart();
    const index = cart.findIndex(item => item.id === itemId);
    
    if (index === -1) return;
    
    cart[index].quantity += delta;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    shopSaveCart(cart);
    shopRefreshCartUI();
}

function shopRemoveCartItem(itemId) {
    const cart = shopGetCart();
    const newCart = cart.filter(item => item.id !== itemId);
    shopSaveCart(newCart);
    shopRefreshCartUI();
    shopShowToast('已删除');
}

function shopOpenCartCheckout() {
    const cart = shopGetCart();
    if (cart.length === 0) {
        shopShowToast('购物袋是空的哦');
        return;
    }
    
    shopCartCouponId = null;
    shopRenderCartCheckout();
    shopOpenModal('shopModalCartCheckout');
}

function shopRenderCartCheckout() {
    const cart = shopGetCart();
    const addresses = shopGetAddresses();
    const coupons = shopGetCoupons().filter(c => !c.used);
    
    const addrText = document.getElementById('shopCartCheckoutAddrText');
    const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
    
    if (defaultAddr && addrText) {
        addrText.textContent = defaultAddr.name + ' ' + defaultAddr.phone + ' ' + defaultAddr.region + defaultAddr.detail;
        addrText.classList.remove('empty');
    } else if (addrText) {
        addrText.textContent = '请选择收货地址';
        addrText.classList.add('empty');
    }
    
    const itemsContainer = document.getElementById('shopCartCheckoutItems');
    if (itemsContainer) {
        itemsContainer.innerHTML = cart.map(item => `
            <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #f5f0f8;">
                <div style="width:50px;height:50px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;background:linear-gradient(135deg,#f8f5f9,#f0eaf5);flex-shrink:0;">
                    ${item.emoji}
                </div>
                <div style="flex:1;min-width:0;">
                    <div style="font-size:14px;font-weight:600;color:#4a3a5a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${item.name}</div>
                    ${item.spec ? `<div style="font-size:12px;color:#a898b8;margin-top:2px;">${item.spec}</div>` : ''}
                    <div style="font-size:14px;font-weight:700;color:#c880a0;margin-top:4px;">¥${item.price} <span style="font-size:12px;font-weight:400;color:#a898b8;">x${item.quantity}</span></div>
                </div>
            </div>
        `).join('');
    }
    
    const countEl = document.getElementById('shopCartCheckoutCount');
    if (countEl) countEl.textContent = cart.reduce((s, i) => s + i.quantity, 0) + ' 件';
    
    const couponList = document.getElementById('shopCartCheckoutCouponList');
    if (couponList) {
        const originalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const availableCoupons = coupons.filter(c => originalPrice >= c.minAmount);
        
        if (availableCoupons.length === 0) {
            couponList.innerHTML = '<div style="text-align:center;padding:16px;color:#b8b0c8;font-size:13px;">暂无可用优惠券</div>';
        } else {
            couponList.innerHTML = availableCoupons.map(c => `
                <div class="shop-coupon-card ${shopCartCouponId === c.id ? 'selected' : ''}" onclick="shopSelectCartCoupon(${c.id})" style="display:flex;align-items:center;padding:10px;border:1px solid #e8e0f0;border-radius:10px;margin-bottom:8px;cursor:pointer;">
                    <div style="width:60px;text-align:center;">
                        <div style="font-size:20px;font-weight:800;color:#d080a0;">¥${c.discount}</div>
                        <div style="font-size:11px;color:#a898b8;">满${c.minAmount}可用</div>
                    </div>
                    <div style="flex:1;padding:0 10px;border-left:1px dashed #e0d8e8;">
                        <div style="font-size:14px;font-weight:600;color:#4a3a5a;">${c.name}</div>
                        <div style="font-size:11px;color:#b8a8c0;">${c.expire}到期</div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    shopUpdateCartCheckoutPrice();
}

function shopSelectCartCoupon(couponId) {
    if (shopCartCouponId === couponId) {
        shopCartCouponId = null;
    } else {
        shopCartCouponId = couponId;
    }
    shopRenderCartCheckout();
}

function shopUpdateCartCheckoutPrice() {
    const cart = shopGetCart();
    const originalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    let discount = 0;
    if (shopCartCouponId) {
        const coupons = shopGetCoupons();
        const coupon = coupons.find(c => c.id === shopCartCouponId);
        if (coupon && originalPrice >= coupon.minAmount) {
            discount = coupon.discount;
        }
    }
    
    const finalPrice = Math.max(0, originalPrice - discount);
    
    const origEl = document.getElementById('shopCartCheckoutOriginalPrice');
    const discEl = document.getElementById('shopCartCheckoutDiscount');
    const finalEl = document.getElementById('shopCartCheckoutFinalPrice');
    
    if (origEl) origEl.textContent = '¥' + originalPrice;
    if (discEl) discEl.textContent = '-¥' + discount;
    if (finalEl) finalEl.textContent = '¥' + finalPrice;
}

function shopConfirmCartCheckout() {
    const cart = shopGetCart();
    if (cart.length === 0) {
        shopShowToast('购物袋是空的');
        return;
    }
    
    const addresses = shopGetAddresses();
    const hasAddr = addresses.length > 0;
    if (!hasAddr) {
        shopShowToast('请先添加收货地址');
        return;
    }
    
    const orders = shopGetOrders();
    const now = new Date();
    const order = {
        id: shopGenerateOrderNo(),
        items: [...cart],
        totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        discount: shopCartCouponId ? (shopGetCoupons().find(c => c.id === shopCartCouponId)?.discount || 0) : 0,
        couponId: shopCartCouponId,
        status: 'shipping',
        createTime: now.toISOString(),
        address: addresses.find(a => a.isDefault) || addresses[0]
    };
    
    order.finalPrice = Math.max(0, order.totalPrice - order.discount);
    orders.unshift(order);
    shopSaveOrders(orders);
    
    if (shopCartCouponId) {
        const coupons = shopGetCoupons();
        const couponIdx = coupons.findIndex(c => c.id === shopCartCouponId);
        if (couponIdx > -1) {
            coupons[couponIdx].used = true;
            shopSaveCoupons(coupons);
        }
    }
    
    shopSaveCart([]);
    shopCartCouponId = null;
    shopCloseModal('shopModalCartCheckout');
    shopRefreshCartUI();
    shopShowToast('下单成功');
    shopSwitchTab('Profile');
}

function shopBuyNow() {
    if (!shopCurrentProduct) return;
    
    shopBuyNowCouponId = null;
    shopRenderBuyNow();
    shopOpenModal('shopModalBuyNow');
}

function shopRenderBuyNow() {
    if (!shopCurrentProduct) return;
    
    const addresses = shopGetAddresses();
    const coupons = shopGetCoupons().filter(c => !c.used);
    
    const addrText = document.getElementById('shopBuyNowAddrText');
    const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
    
    if (defaultAddr && addrText) {
        addrText.textContent = defaultAddr.name + ' ' + defaultAddr.phone + ' ' + defaultAddr.region + defaultAddr.detail;
        addrText.classList.remove('empty');
    } else if (addrText) {
        addrText.textContent = '请选择收货地址';
        addrText.classList.add('empty');
    }
    
    const productContainer = document.getElementById('shopBuyNowProduct');
    if (productContainer) {
        productContainer.innerHTML = `
            <div style="display:flex;gap:12px;padding:12px 0;">
                <div style="width:60px;height:60px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:32px;background:linear-gradient(135deg,#f8f5f9,#f0eaf5);flex-shrink:0;">
                    ${shopCurrentProduct.emoji}
                </div>
                <div style="flex:1;min-width:0;">
                    <div style="font-size:15px;font-weight:600;color:#4a3a5a;">${shopCurrentProduct.name}</div>
                    ${shopCurrentSpec ? `<div style="font-size:12px;color:#a898b8;margin-top:4px;">规格：${shopCurrentSpec}</div>` : ''}
                    ${shopCurrentRole ? `<div style="font-size:12px;color:#a898b8;margin-top:2px;">角色：${shopCurrentRole.name}</div>` : ''}
                    <div style="font-size:18px;font-weight:800;color:#c880a0;margin-top:6px;">¥${shopCurrentProduct.price}</div>
                </div>
            </div>
        `;
    }
    
    const couponList = document.getElementById('shopBuyNowCouponList');
    if (couponList) {
        const availableCoupons = coupons.filter(c => shopCurrentProduct.price >= c.minAmount);
        
        if (availableCoupons.length === 0) {
            couponList.innerHTML = '<div style="text-align:center;padding:16px;color:#b8b0c8;font-size:13px;">暂无可用优惠券</div>';
        } else {
            couponList.innerHTML = availableCoupons.map(c => `
                <div class="shop-coupon-card ${shopBuyNowCouponId === c.id ? 'selected' : ''}" onclick="shopSelectBuyNowCoupon(${c.id})" style="display:flex;align-items:center;padding:10px;border:1px solid #e8e0f0;border-radius:10px;margin-bottom:8px;cursor:pointer;">
                    <div style="width:60px;text-align:center;">
                        <div style="font-size:20px;font-weight:800;color:#d080a0;">¥${c.discount}</div>
                        <div style="font-size:11px;color:#a898b8;">满${c.minAmount}可用</div>
                    </div>
                    <div style="flex:1;padding:0 10px;border-left:1px dashed #e0d8e8;">
                        <div style="font-size:14px;font-weight:600;color:#4a3a5a;">${c.name}</div>
                        <div style="font-size:11px;color:#b8a8c0;">${c.expire}到期</div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    shopUpdateBuyNowPrice();
}

function shopSelectBuyNowCoupon(couponId) {
    if (shopBuyNowCouponId === couponId) {
        shopBuyNowCouponId = null;
    } else {
        shopBuyNowCouponId = couponId;
    }
    shopRenderBuyNow();
}

function shopUpdateBuyNowPrice() {
    if (!shopCurrentProduct) return;
    
    const originalPrice = shopCurrentProduct.price;
    let discount = 0;
    
    if (shopBuyNowCouponId) {
        const coupons = shopGetCoupons();
        const coupon = coupons.find(c => c.id === shopBuyNowCouponId);
        if (coupon && originalPrice >= coupon.minAmount) {
            discount = coupon.discount;
        }
    }
    
    const finalPrice = Math.max(0, originalPrice - discount);
    
    const origEl = document.getElementById('shopBuyNowOriginalPrice');
    const discEl = document.getElementById('shopBuyNowDiscount');
    const finalEl = document.getElementById('shopBuyNowFinalPrice');
    
    if (origEl) origEl.textContent = '¥' + originalPrice;
    if (discEl) discEl.textContent = '-¥' + discount;
    if (finalEl) finalEl.textContent = '¥' + finalPrice;
}

function shopConfirmBuyNow() {
    if (!shopCurrentProduct) return;
    
    const addresses = shopGetAddresses();
    if (addresses.length === 0) {
        shopShowToast('请先添加收货地址');
        return;
    }
    
    const orders = shopGetOrders();
    const now = new Date();
    const order = {
        id: shopGenerateOrderNo(),
        items: [{
            id: Date.now(),
            productId: shopCurrentProduct.id,
            name: shopCurrentProduct.name,
            price: shopCurrentProduct.price,
            emoji: shopCurrentProduct.emoji,
            spec: shopCurrentSpec || '',
            quantity: 1,
            role: shopCurrentRole ? shopCurrentRole.name : null
        }],
        totalPrice: shopCurrentProduct.price,
        discount: shopBuyNowCouponId ? (shopGetCoupons().find(c => c.id === shopBuyNowCouponId)?.discount || 0) : 0,
        couponId: shopBuyNowCouponId,
        status: 'shipping',
        createTime: now.toISOString(),
        address: addresses.find(a => a.isDefault) || addresses[0]
    };
    
    order.finalPrice = Math.max(0, order.totalPrice - order.discount);
    orders.unshift(order);
    shopSaveOrders(orders);
    
    if (shopBuyNowCouponId) {
        const coupons = shopGetCoupons();
        const couponIdx = coupons.findIndex(c => c.id === shopBuyNowCouponId);
        if (couponIdx > -1) {
            coupons[couponIdx].used = true;
            shopSaveCoupons(coupons);
        }
    }
    
    shopBuyNowCouponId = null;
    shopCloseModal('shopModalProduct');
    shopCloseModal('shopModalBuyNow');
    shopShowToast('下单成功');
    shopSwitchTab('Profile');
}

function shopOpenOrders(type) {
    shopCurrentOrderTab = type || 'all';
    
    const titleEl = document.getElementById('shopOrdersTitle');
    const titles = {
        all: '全部订单',
        pending: '待付款',
        shipping: '待发货',
        delivering: '待收货',
        review: '待评价'
    };
    if (titleEl) titleEl.textContent = titles[type] || '我的订单';
    
    shopRenderOrders();
    shopOpenModal('shopModalOrders');
}

function shopRenderOrders() {
    const listEl = document.getElementById('shopOrdersList');
    const emptyEl = document.getElementById('shopOrdersEmpty');
    if (!listEl) return;
    
    let orders = shopGetOrders();
    
    if (shopCurrentOrderTab !== 'all') {
        orders = orders.filter(o => o.status === shopCurrentOrderTab);
    }
    
    if (orders.length === 0) {
        listEl.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'flex';
        return;
    }
    
    if (emptyEl) emptyEl.style.display = 'none';
    
    const statusMap = {
        pending: { text: '待付款', color: '#e8a030' },
        shipping: { text: '待发货', color: '#6090d0' },
        delivering: { text: '待收货', color: '#70b080' },
        review: { text: '待评价', color: '#c880a0' },
        completed: { text: '已完成', color: '#a898b8' }
    };
    
    listEl.innerHTML = orders.map(order => {
        const status = statusMap[order.status] || { text: order.status, color: '#999' };
        const firstItem = order.items[0];
        const totalQty = order.items.reduce((s, i) => s + i.quantity, 0);
        
        return `
            <div style="background:#fff;border-radius:12px;margin-bottom:12px;padding:12px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <span style="font-size:12px;color:#a898b8;">订单号：${order.id}</span>
                    <span style="font-size:13px;font-weight:600;color:${status.color};">${status.text}</span>
                </div>
                <div style="display:flex;gap:10px;" onclick="shopOpenOrderDetail('${order.id}')">
                    <div style="width:60px;height:60px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:30px;background:linear-gradient(135deg,#f8f5f9,#f0eaf5);flex-shrink:0;">
                        ${firstItem.emoji}
                    </div>
                    <div style="flex:1;min-width:0;">
                        <div style="font-size:14px;font-weight:600;color:#4a3a5a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${firstItem.name}</div>
                        <div style="font-size:12px;color:#a898b8;margin-top:4px;">共${totalQty}件商品</div>
                        <div style="font-size:14px;font-weight:700;color:#c880a0;margin-top:6px;">实付 ¥${order.finalPrice}</div>
                    </div>
                </div>
                <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px;padding-top:10px;border-top:1px solid #f5f0f8;">
                    ${order.status === 'pending' ? `<div style="padding:6px 14px;border:1px solid #e0d8e8;border-radius:16px;font-size:12px;color:#7a6a8a;">取消订单</div><div style="padding:6px 14px;background:linear-gradient(135deg,#b888a8,#d098b8);color:#fff;border-radius:16px;font-size:12px;font-weight:600;">去付款</div>` : ''}
                    ${order.status === 'delivering' ? `<div style="padding:6px 14px;border:1px solid #e0d8e8;border-radius:16px;font-size:12px;color:#7a6a8a;" onclick="event.stopPropagation(); shopConfirmReceive('${order.id}')">确认收货</div>` : ''}
                    ${order.status === 'review' ? `<div style="padding:6px 14px;background:linear-gradient(135deg,#b888a8,#d098b8);color:#fff;border-radius:16px;font-size:12px;font-weight:600;" onclick="event.stopPropagation(); shopOpenOrderReview('${order.id}')">去评价</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function shopOpenOrderDetail(orderId) {
    const orders = shopGetOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const statusEl = document.getElementById('shopOrderStatus');
    const noEl = document.getElementById('shopOrderNo');
    const timelineEl = document.getElementById('shopLogisticsTimeline');
    const confirmBtn = document.getElementById('shopConfirmBtn');
    
    const statusMap = {
        pending: '待付款',
        shipping: '待发货',
        delivering: '运输中',
        review: '待评价',
        completed: '已完成'
    };
    
    if (statusEl) statusEl.textContent = statusMap[order.status] || order.status;
    if (noEl) noEl.textContent = order.id;
    
    if (timelineEl) {
        let timeline = [
            { time: order.createTime ? new Date(order.createTime).toLocaleString() : '刚刚', text: '订单提交', done: true }
        ];
        
        if (order.status !== 'pending') {
            timeline.push({ time: '已支付', text: '商家正在准备商品', done: true });
        }
        if (order.status === 'delivering' || order.status === 'review' || order.status === 'completed') {
            timeline.push({ time: '运输中', text: '包裹正在飞速向你赶来', done: true });
        }
        if (order.status === 'review' || order.status === 'completed') {
            timeline.push({ time: '已签收', text: '包裹已送达，期待您的好评', done: true });
        }
        
        timelineEl.innerHTML = timeline.map((item, idx) => `
            <div style="display:flex;gap:12px;padding-bottom:20px;position:relative;">
                <div style="width:10px;height:10px;border-radius:50%;background:${item.done ? '#b888a8' : '#e0d8e8'};flex-shrink:0;margin-top:5px;z-index:1;"></div>
                ${idx < timeline.length - 1 ? `<div style="position:absolute;left:4.5px;top:15px;bottom:0;width:1px;background:#f0eaf5;"></div>` : ''}
                <div style="flex:1;">
                    <div style="font-size:13px;font-weight:600;color:#4a3a5a;">${item.text}</div>
                    <div style="font-size:11px;color:#b8a8c0;margin-top:2px;">${item.time}</div>
                </div>
            </div>
        `).join('');
    }
    
    if (confirmBtn) {
        confirmBtn.style.display = order.status === 'delivering' ? 'block' : 'none';
        confirmBtn.onclick = function() {
            shopConfirmReceive(order.id);
        };
    }
    
    shopOpenModal('shopModalLogistics');
}

function shopConfirmReceive(orderId) {
    const orders = shopGetOrders();
    const index = orders.findIndex(o => o.id === orderId);
    
    if (index > -1) {
        orders[index].status = 'review';
        shopSaveOrders(orders);
        shopCloseModal('shopModalLogistics');
        shopRenderOrders();
        shopUpdateOrderBadges();
        shopShowToast('确认收货成功');
    }
}

function shopOpenOrderReview(orderId) {
    const orders = shopGetOrders();
    const order = orders.find(o => o.id === orderId);
    if (!order || order.items.length === 0) return;
    
    const firstItem = order.items[0];
    shopCommentProductId = firstItem.productId;
    shopCommentRating = 5;
    
    const productEl = document.getElementById('shopWriteCommentProduct');
    if (productEl) {
        productEl.innerHTML = `
            <div style="display:flex;gap:12px;align-items:center;">
                <div style="width:50px;height:50px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;background:linear-gradient(135deg,#f8f5f9,#f0eaf5);">
                    ${firstItem.emoji}
                </div>
                <div>
                    <div style="font-size:14px;font-weight:600;color:#4a3a5a;">${firstItem.name}</div>
                    ${firstItem.spec ? `<div style="font-size:12px;color:#a898b8;">规格：${firstItem.spec}</div>` : ''}
                </div>
            </div>
        `;
    }
    
    shopUpdateStarDisplay();
    shopOpenModal('shopModalWriteComment');
}

function shopRenderComments(productId) {
    const listEl = document.getElementById('shopCommentList');
    const countEl = document.getElementById('shopCommentCount');
    if (!listEl) return;
    
    const comments = shopGetComments(productId);
    
    if (countEl) countEl.textContent = comments.length;
    
    if (comments.length === 0) {
        listEl.innerHTML = '<div style="text-align:center;padding:24px;color:#b8b0c8;font-size:13px;">暂无评价，快来抢沙发吧~</div>';
        return;
    }
    
    listEl.innerHTML = comments.map(c => `
        <div class="shop-comment-item">
            <div class="shop-comment-avatar" style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#d8c8f0,#b8a0d8);display:flex;align-items:center;justify-content:center;color:#fff;font-size:14px;font-weight:600;flex-shrink:0;">
                ${c.userName ? c.userName.charAt(0) : '用'}
            </div>
            <div class="shop-comment-body" style="flex:1;min-width:0;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <span class="shop-comment-name" style="font-size:13px;font-weight:600;color:#4a3a5a;">${c.userName || '匿名用户'}</span>
                    <span class="shop-comment-time" style="font-size:11px;color:#b8a8c0;">${c.time || ''}</span>
                </div>
                <div class="shop-comment-stars" style="margin:4px 0;">
                    ${Array(5).fill(0).map((_, i) => `<span style="color:${i < c.rating ? '#f0c040' : '#e0d8e8'};font-size:12px;">★</span>`).join('')}
                </div>
                <div class="shop-comment-text" style="font-size:13px;color:#5a4a6a;line-height:1.6;">${c.content}</div>
            </div>
        </div>
    `).join('');
}

function shopOpenWriteComment() {
    if (!shopCurrentProduct) return;
    shopCommentProductId = shopCurrentProduct.id;
    shopCommentRating = 5;
    
    const productEl = document.getElementById('shopWriteCommentProduct');
    if (productEl && shopCurrentProduct) {
        productEl.innerHTML = `
            <div style="display:flex;gap:12px;align-items:center;">
                <div style="width:50px;height:50px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;background:linear-gradient(135deg,#f8f5f9,#f0eaf5);">
                    ${shopCurrentProduct.emoji}
                </div>
                <div>
                    <div style="font-size:14px;font-weight:600;color:#4a3a5a;">${shopCurrentProduct.name}</div>
                    ${shopCurrentSpec ? `<div style="font-size:12px;color:#a898b8;">规格：${shopCurrentSpec}</div>` : ''}
                </div>
            </div>
        `;
    }
    
    shopUpdateStarDisplay();
    shopOpenModal('shopModalWriteComment');
}

function shopUpdateStarDisplay() {
    const stars = document.querySelectorAll('#shopWriteCommentStars .shop-star');
    stars.forEach((star, idx) => {
        star.classList.toggle('active', idx < shopCommentRating);
    });
}

function shopInitCommentStars() {
    const starsContainer = document.getElementById('shopWriteCommentStars');
    if (!starsContainer) return;
    
    const stars = starsContainer.querySelectorAll('.shop-star');
    stars.forEach((star, idx) => {
        star.addEventListener('click', function() {
            shopCommentRating = idx + 1;
            shopUpdateStarDisplay();
        });
    });
}

function shopSubmitComment() {
    if (!shopCommentProductId) {
        shopShowToast('请选择商品');
        return;
    }
    
    const textEl = document.getElementById('shopWriteCommentText');
    const content = textEl ? textEl.value.trim() : '';
    
    if (!content) {
        shopShowToast('请输入评价内容');
        return;
    }
    
    const profile = shopGetProfile();
    const comment = {
        id: Date.now(),
        userName: profile.name || '匿名用户',
        rating: shopCommentRating,
        content: content,
        time: new Date().toLocaleDateString()
    };
    
    shopSaveComment(shopCommentProductId, comment);
    
    if (shopCurrentProduct && shopCurrentProduct.id === shopCommentProductId) {
        shopRenderComments(shopCommentProductId);
    }
    
    shopCloseModal('shopModalWriteComment');
    shopShowToast('评价已发布');
    
    if (textEl) textEl.value = '';
    
    const orders = shopGetOrders();
    const reviewOrder = orders.find(o => 
        o.status === 'review' && 
        o.items.some(i => i.productId === shopCommentProductId)
    );
    if (reviewOrder) {
        const idx = orders.findIndex(o => o.id === reviewOrder.id);
        if (idx > -1) {
            orders[idx].status = 'completed';
            shopSaveOrders(orders);
            shopUpdateOrderBadges();
        }
    }
}

function shopRefreshComments() {
    if (shopCurrentProduct) {
        const refreshBtn = document.querySelector('.shop-comment-refresh');
        if (refreshBtn) {
            refreshBtn.classList.add('spinning');
            setTimeout(() => {
                refreshBtn.classList.remove('spinning');
            }, 600);
        }
        shopRenderComments(shopCurrentProduct.id);
    }
    shopShowToast('已刷新评价');
}

function shopUpdateOrderBadges() {
    const orders = shopGetOrders();
    
    const counts = {
        pending: orders.filter(o => o.status === 'pending').length,
        shipping: orders.filter(o => o.status === 'shipping').length,
        delivering: orders.filter(o => o.status === 'delivering').length,
        review: orders.filter(o => o.status === 'review').length
    };
    
    const pendingBadge = document.getElementById('shopBadgePending');
    const shippingBadge = document.getElementById('shopBadgeShipping');
    const deliveringBadge = document.getElementById('shopBadgeDelivering');
    const reviewBadge = document.getElementById('shopBadgeReview');
    
    if (pendingBadge) {
        pendingBadge.style.display = counts.pending > 0 ? 'block' : 'none';
        pendingBadge.textContent = counts.pending;
    }
    if (shippingBadge) {
        shippingBadge.style.display = counts.shipping > 0 ? 'block' : 'none';
        shippingBadge.textContent = counts.shipping;
    }
    if (deliveringBadge) {
        deliveringBadge.style.display = counts.delivering > 0 ? 'block' : 'none';
        deliveringBadge.textContent = counts.delivering;
    }
    if (reviewBadge) {
        reviewBadge.style.display = counts.review > 0 ? 'block' : 'none';
        reviewBadge.textContent = counts.review;
    }
}

function shopOpenFavorites() {
    shopRenderFavorites();
    shopOpenModal('shopModalFavorites');
}

function shopRenderFavorites() {
    const favs = shopGetFavorites();
    const grid = document.getElementById('shopFavGrid');
    const empty = document.getElementById('shopFavEmpty');
    const countEl = document.getElementById('shopFavCount');
    
    const favProducts = shopProducts.filter(p => favs.includes(p.id));
    
    if (countEl) countEl.textContent = favProducts.length + ' 件';
    
    if (favProducts.length === 0) {
        if (grid) grid.innerHTML = '';
        if (empty) empty.style.display = 'flex';
        return;
    }
    
    if (empty) empty.style.display = 'none';
    
    if (grid) {
        grid.innerHTML = favProducts.map(p => `
            <div class="shop-product-card" style="width:calc(50% - 6px);" onclick="shopCloseModal('shopModalFavorites'); shopOpenProductDetail(${p.id})">
                <div class="shop-prod-img-wrap">
                    <div class="shop-prod-img" style="display:flex;align-items:center;justify-content:center;font-size:50px;background:linear-gradient(135deg,#f8f5f9,#f0eaf5);">
                        ${p.emoji}
                    </div>
                    <div class="shop-prod-fav-btn favorited" onclick="event.stopPropagation(); shopToggleFavorite(${p.id}); shopRenderFavorites();">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </div>
                </div>
                <div class="shop-prod-info">
                    <div class="shop-prod-name">${p.name}</div>
                    <div class="shop-prod-price">
                        <span class="shop-price-current">¥${p.price}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function shopOpenAddresses() {
    shopRenderAddresses();
    shopOpenModal('shopModalAddresses');
}

function shopRenderAddresses() {
    const addrs = shopGetAddresses();
    const listEl = document.getElementById('shopAddressList');
    const emptyEl = document.getElementById('shopAddressEmpty');
    
    if (addrs.length === 0) {
        if (listEl) listEl.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'flex';
        return;
    }
    
    if (emptyEl) emptyEl.style.display = 'none';
    
    if (listEl) {
        listEl.innerHTML = addrs.map(addr => `
            <div style="padding:12px;background:#fff;border-radius:10px;margin-bottom:8px;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                    <div style="flex:1;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span style="font-size:14px;font-weight:600;color:#4a3a5a;">${addr.name}</span>
                            <span style="font-size:13px;color:#7a6a8a;">${addr.phone}</span>
                            ${addr.isDefault ? '<span style="padding:2px 6px;background:#f0e8f8;color:#b888a8;border-radius:4px;font-size:10px;">默认</span>' : ''}
                        </div>
                        <div style="font-size:13px;color:#7a6a8a;margin-top:6px;line-height:1.5;">${addr.region} ${addr.detail}</div>
                    </div>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;padding-top:10px;border-top:1px solid #f5f0f8;">
                    <div style="display:flex;align-items:center;gap:4px;" onclick="shopSetDefaultAddress(${addr.id})">
                        <div style="width:16px;height:16px;border-radius:50%;border:2px solid ${addr.isDefault ? '#b888a8' : '#d0c8d8'};display:flex;align-items:center;justify-content:center;">
                            ${addr.isDefault ? '<div style="width:8px;height:8px;border-radius:50%;background:#b888a8;"></div>' : ''}
                        </div>
                        <span style="font-size:12px;color:#7a6a8a;">设为默认</span>
                    </div>
                    <div style="display:flex;gap:12px;">
                        <span style="font-size:12px;color:#a898b8;" onclick="shopEditAddress(${addr.id})">编辑</span>
                        <span style="font-size:12px;color:#d08090;" onclick="shopDeleteAddress(${addr.id})">删除</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function shopAddNewAddress() {
    shopEditAddressId = null;
    const titleEl = document.getElementById('shopAddrModalTitle');
    if (titleEl) titleEl.textContent = '添加地址';
    
    const nameEl = document.getElementById('shopAddrName');
    const phoneEl = document.getElementById('shopAddrPhone');
    const regionEl = document.getElementById('shopAddrRegion');
    const detailEl = document.getElementById('shopAddrDetail');
    const defaultEl = document.getElementById('shopAddrDefault');
    
    if (nameEl) nameEl.value = '';
    if (phoneEl) phoneEl.value = '';
    if (regionEl) regionEl.value = '';
    if (detailEl) detailEl.value = '';
    if (defaultEl) defaultEl.checked = false;
    
    shopCloseModal('shopModalAddresses');
    shopOpenModal('shopModalEditAddress');
}

function shopEditAddress(addrId) {
    const addrs = shopGetAddresses();
    const addr = addrs.find(a => a.id === addrId);
    if (!addr) return;
    
    shopEditAddressId = addrId;
    const titleEl = document.getElementById('shopAddrModalTitle');
    if (titleEl) titleEl.textContent = '编辑地址';
    
    const nameEl = document.getElementById('shopAddrName');
    const phoneEl = document.getElementById('shopAddrPhone');
    const regionEl = document.getElementById('shopAddrRegion');
    const detailEl = document.getElementById('shopAddrDetail');
    const defaultEl = document.getElementById('shopAddrDefault');
    
    if (nameEl) nameEl.value = addr.name;
    if (phoneEl) phoneEl.value = addr.phone;
    if (regionEl) regionEl.value = addr.region;
    if (detailEl) detailEl.value = addr.detail;
    if (defaultEl) defaultEl.checked = addr.isDefault;
    
    shopCloseModal('shopModalAddresses');
    shopOpenModal('shopModalEditAddress');
}

function shopSaveAddress() {
    const nameEl = document.getElementById('shopAddrName');
    const phoneEl = document.getElementById('shopAddrPhone');
    const regionEl = document.getElementById('shopAddrRegion');
    const detailEl = document.getElementById('shopAddrDetail');
    const defaultEl = document.getElementById('shopAddrDefault');
    
    const name = nameEl ? nameEl.value.trim() : '';
    const phone = phoneEl ? phoneEl.value.trim() : '';
    const region = regionEl ? regionEl.value.trim() : '';
    const detail = detailEl ? detailEl.value.trim() : '';
    const isDefault = defaultEl ? defaultEl.checked : false;
    
    if (!name) { shopShowToast('请输入收货人姓名'); return; }
    if (!phone) { shopShowToast('请输入手机号码'); return; }
    if (!region) { shopShowToast('请输入省市区'); return; }
    if (!detail) { shopShowToast('请输入详细地址'); return; }
    
    let addrs = shopGetAddresses();
    
    if (isDefault) {
        addrs = addrs.map(a => ({ ...a, isDefault: false }));
    }
    
    if (shopEditAddressId) {
        const index = addrs.findIndex(a => a.id === shopEditAddressId);
        if (index > -1) {
            addrs[index] = { ...addrs[index], name, phone, region, detail, isDefault };
        }
    } else {
        addrs.push({
            id: Date.now(),
            name,
            phone,
            region,
            detail,
            isDefault: isDefault || addrs.length === 0
        });
    }
    
    shopSaveAddresses(addrs);
    shopCloseModal('shopModalEditAddress');
    shopShowToast('地址已保存');
}

function shopDeleteAddress(addrId) {
    let addrs = shopGetAddresses();
    addrs = addrs.filter(a => a.id !== addrId);
    shopSaveAddresses(addrs);
    shopRenderAddresses();
    shopShowToast('已删除');
}

function shopSetDefaultAddress(addrId) {
    let addrs = shopGetAddresses();
    addrs = addrs.map(a => ({ ...a, isDefault: a.id === addrId }));
    shopSaveAddresses(addrs);
    shopRenderAddresses();
    shopShowToast('已设为默认');
}

function shopOpenCoupons() {
    shopRenderCoupons();
    shopOpenModal('shopModalCoupons');
}

function shopRenderCoupons() {
    const coupons = shopGetCoupons();
    const listEl = document.getElementById('shopCouponList');
    const emptyEl = document.getElementById('shopCouponEmpty');
    
    const availableCoupons = coupons.filter(c => !c.used);
    
    if (availableCoupons.length === 0) {
        if (listEl) listEl.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'flex';
        return;
    }
    
    if (emptyEl) emptyEl.style.display = 'none';
    
    if (listEl) {
        listEl.innerHTML = availableCoupons.map(c => `
            <div style="display:flex;margin-bottom:12px;background:#fff;border-radius:12px;overflow:hidden;">
                <div style="width:90px;background:linear-gradient(135deg,#f8e8f0,#f0d8e0);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px 0;">
                    <div style="font-size:28px;font-weight:800;color:#d080a0;">¥${c.discount}</div>
                    <div style="font-size:11px;color:#b888a8;margin-top:2px;">满${c.minAmount}可用</div>
                </div>
                <div style="flex:1;padding:12px 14px;display:flex;flex-direction:column;justify-content:space-between;">
                    <div>
                        <div style="font-size:14px;font-weight:600;color:#4a3a5a;">${c.name}</div>
                        <div style="font-size:11px;color:#b8a8c0;margin-top:4px;">有效期至 ${c.expire}</div>
                    </div>
                    <div style="font-size:11px;color:#a898b8;">全场通用</div>
                </div>
            </div>
        `).join('');
    }
}

function shopOpenRoles() {
    shopRenderRoles();
    shopOpenModal('shopModalRoles');
}

function shopRenderRoles() {
    const roles = shopGetRoles();
    const listEl = document.getElementById('shopRoleList');
    if (!listEl) return;
    
    listEl.innerHTML = roles.map(role => `
        <div class="shop-role-item ${shopCurrentRole && shopCurrentRole.id === role.id ? 'selected' : ''}" onclick="shopSelectRole(${role.id})" style="display:flex;align-items:center;gap:12px;padding:12px;background:#fff;border-radius:10px;margin-bottom:8px;cursor:pointer;">
            <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#d8c8f0,#b8a0d8);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:600;flex-shrink:0;">
                ${role.avatar ? `<img src="${role.avatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">` : role.name.charAt(0)}
            </div>
            <div style="flex:1;">
                <div style="font-size:14px;font-weight:600;color:#4a3a5a;">${role.name}</div>
                ${role.desc ? `<div style="font-size:12px;color:#a898b8;margin-top:2px;">${role.desc}</div>` : ''}
            </div>
            <div style="display:flex;gap:8px;" onclick="event.stopPropagation();">
                <span style="font-size:12px;color:#a898b8;" onclick="shopEditRole(${role.id})">编辑</span>
                <span style="font-size:12px;color:#d08090;" onclick="shopDeleteRole(${role.id})">删除</span>
            </div>
        </div>
    `).join('');
}

function shopSelectRole(roleId) {
    const roles = shopGetRoles();
    const role = roles.find(r => r.id === roleId);
    if (!role) return;
    
    shopCurrentRole = role;
    const roleText = document.getElementById('shopRoleSelectText');
    if (roleText) {
        roleText.textContent = role.name;
        roleText.classList.add('selected');
    }
    
    shopCloseModal('shopModalRoles');
    shopShowToast('已选择：' + role.name);
}

function shopOpenEditRole() {
    shopEditRoleId = null;
    const nameEl = document.getElementById('shopEditRoleName');
    const descEl = document.getElementById('shopEditRoleDesc');
    const previewEl = document.getElementById('shopEditRoleAvatarPreview');
    
    if (nameEl) nameEl.value = '';
    if (descEl) descEl.value = '';
    if (previewEl) {
        previewEl.innerHTML = '<span class="shop-role-avatar-placeholder">点击上传</span>';
    }
    
    shopCloseModal('shopModalRoles');
    shopOpenModal('shopModalEditRole');
}

function shopEditRole(roleId) {
    const roles = shopGetRoles();
    const role = roles.find(r => r.id === roleId);
    if (!role) return;
    
    shopEditRoleId = roleId;
    const nameEl = document.getElementById('shopEditRoleName');
    const descEl = document.getElementById('shopEditRoleDesc');
    const previewEl = document.getElementById('shopEditRoleAvatarPreview');
    
    if (nameEl) nameEl.value = role.name;
    if (descEl) descEl.value = role.desc || '';
    if (previewEl) {
        if (role.avatar) {
            previewEl.innerHTML = `<img src="${role.avatar}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
        } else {
            previewEl.innerHTML = '<span class="shop-role-avatar-placeholder">点击上传</span>';
        }
    }
    
    shopCloseModal('shopModalRoles');
    shopOpenModal('shopModalEditRole');
}

function shopSaveRole() {
    const nameEl = document.getElementById('shopEditRoleName');
    const descEl = document.getElementById('shopEditRoleDesc');
    const previewEl = document.getElementById('shopEditRoleAvatarPreview');
    
    const name = nameEl ? nameEl.value.trim() : '';
    const desc = descEl ? descEl.value.trim() : '';
    
    if (!name) {
        shopShowToast('请输入角色名称');
        return;
    }
    
    let avatar = '';
    if (previewEl) {
        const img = previewEl.querySelector('img');
        if (img) avatar = img.src;
    }
    
    let roles = shopGetRoles();
    
    if (shopEditRoleId) {
        const index = roles.findIndex(r => r.id === shopEditRoleId);
        if (index > -1) {
            roles[index] = { ...roles[index], name, desc, avatar };
        }
    } else {
        roles.push({
            id: Date.now(),
            name,
            desc,
            avatar
        });
    }
    
    shopSaveRoles(roles);
    shopCloseModal('shopModalEditRole');
    shopShowToast('角色已保存');
}

function shopDeleteRole(roleId) {
    let roles = shopGetRoles();
    roles = roles.filter(r => r.id !== roleId);
    shopSaveRoles(roles);
    shopRenderRoles();
    
    if (shopCurrentRole && shopCurrentRole.id === roleId) {
        shopCurrentRole = null;
        const roleText = document.getElementById('shopRoleSelectText');
        if (roleText) {
            roleText.textContent = '点击选择角色';
            roleText.classList.remove('selected');
        }
    }
    
    shopShowToast('已删除');
}

function shopUpdateCustomColor() {
    const primaryInput = document.getElementById('shopColorPrimary');
    const bgInput = document.getElementById('shopColorBg');
    const accentInput = document.getElementById('shopColorAccent');
    const previewCard = document.getElementById('shopColorPreviewCard');
    
    const primary = primaryInput ? primaryInput.value : '#c8b098';
    const bg = bgInput ? bgInput.value : '#faf7f5';
    const accent = accentInput ? accentInput.value : '#c88a60';
    
    if (previewCard) {
        previewCard.style.background = bg;
        previewCard.style.borderColor = primary;
        const badge = previewCard.querySelector('.shop-preview-badge');
        const title = previewCard.querySelector('.shop-preview-title');
        const price = previewCard.querySelector('.shop-preview-price');
        if (badge) {
            badge.style.background = accent;
        }
        if (title) {
            title.style.color = primary;
        }
        if (price) {
            price.style.color = accent;
        }
    }
    
    const root = document.getElementById('shopAppMain');
    if (root) {
        root.style.setProperty('--shop-primary', primary);
        root.style.setProperty('--shop-accent', accent);
    }
}

function shopSaveColorScheme() {
    const primaryInput = document.getElementById('shopColorPrimary');
    const bgInput = document.getElementById('shopColorBg');
    const accentInput = document.getElementById('shopColorAccent');
    
    const scheme = {
        primary: primaryInput ? primaryInput.value : '#c8b098',
        bg: bgInput ? bgInput.value : '#faf7f5',
        accent: accentInput ? accentInput.value : '#c88a60'
    };
    
    try {
        localStorage.setItem('shopColorScheme', JSON.stringify(scheme));
        localStorage.removeItem('shopColorPreset');
    } catch (e) {}
    
    shopCloseModal('shopModalColorPalette');
    shopShowToast('色系已保存');
}

function shopResetColorScheme() {
    const root = document.getElementById('shopAppMain');
    if (root) {
        root.style.removeProperty('--shop-primary');
        root.style.removeProperty('--shop-primary-light');
        root.style.removeProperty('--shop-accent');
    }
    
    const primaryInput = document.getElementById('shopColorPrimary');
    const bgInput = document.getElementById('shopColorBg');
    const accentInput = document.getElementById('shopColorAccent');
    
    if (primaryInput) primaryInput.value = '#c8b098';
    if (bgInput) bgInput.value = '#faf7f5';
    if (accentInput) accentInput.value = '#c88a60';
    
    try {
        localStorage.removeItem('shopColorScheme');
        localStorage.removeItem('shopColorPreset');
    } catch (e) {}
    
    shopShowToast('已恢复默认');
}

function shopOpenEditProfile() {
    const profile = shopGetProfile();
    
    const nameInput = document.getElementById('shopEditNameInput');
    const descInput = document.getElementById('shopEditDescInput');
    const avatarImg = document.getElementById('shopEditAvatarImg');
    const avatarDefault = document.querySelector('#shopEditAvatar .shop-avatar-default');
    
    if (nameInput) nameInput.value = profile.name || '';
    if (descInput) descInput.value = (profile.desc || '').replace(/✨/g, '').trim();
    if (avatarImg) {
        avatarImg.src = profile.avatar || '';
        avatarImg.style.display = profile.avatar ? 'block' : 'none';
    }
    if (avatarDefault) {
        avatarDefault.style.display = profile.avatar ? 'none' : 'flex';
    }
    
    shopOpenModal('shopModalEditProfile');
}

function shopSaveProfile() {
    const nameInput = document.getElementById('shopEditNameInput');
    const descInput = document.getElementById('shopEditDescInput');
    const avatarImg = document.getElementById('shopEditAvatarImg');
    
    const profile = shopGetProfile();
    
    if (nameInput && nameInput.value.trim()) {
        profile.name = nameInput.value.trim();
    }
    if (descInput && descInput.value.trim()) {
        profile.desc = '✨ ' + descInput.value.trim();
    }
    if (avatarImg && avatarImg.src && avatarImg.style.display !== 'none') {
        profile.avatar = avatarImg.src;
    }
    
    shopSaveProfile(profile);
    shopApplyProfileToUI();
    
    shopCloseModal('shopModalEditProfile');
    shopShowToast('资料已保存');
}

function shopApplyProfileToUI() {
    const profile = shopGetProfile();
    
    const nameEl = document.getElementById('shopProfileName');
    const descEl = document.getElementById('shopProfileDesc');
    const avatarImg = document.getElementById('shopAvatarImg');
    const avatarDefault = document.querySelector('#shopProfileAvatar .shop-avatar-default');
    
    if (nameEl) {
        const svg = nameEl.querySelector('svg');
        nameEl.childNodes[0].nodeValue = profile.name + ' ';
    }
    if (descEl) {
        const svg = descEl.querySelector('svg');
        descEl.childNodes[0].nodeValue = profile.desc + ' ';
    }
    if (avatarImg) {
        avatarImg.src = profile.avatar || '';
        avatarImg.style.display = profile.avatar ? 'block' : 'none';
    }
    if (avatarDefault) {
        avatarDefault.style.display = profile.avatar ? 'none' : 'flex';
    }
}

function shopInitColorScheme() {
    try {
        const preset = localStorage.getItem('shopColorPreset');
        const customScheme = localStorage.getItem('shopColorScheme');
        
        if (preset && SHOP_COLOR_PRESETS[preset]) {
            shopApplyColorPreset(preset);
        } else if (customScheme) {
            const scheme = JSON.parse(customScheme);
            const root = document.getElementById('shopAppMain');
            if (root) {
                if (scheme.primary) root.style.setProperty('--shop-primary', scheme.primary);
                if (scheme.accent) root.style.setProperty('--shop-accent', scheme.accent);
            }
            const primaryInput = document.getElementById('shopColorPrimary');
            const bgInput = document.getElementById('shopColorBg');
            const accentInput = document.getElementById('shopColorAccent');
            if (primaryInput && scheme.primary) primaryInput.value = scheme.primary;
            if (bgInput && scheme.bg) bgInput.value = scheme.bg;
            if (accentInput && scheme.accent) accentInput.value = scheme.accent;
        }
    } catch (e) {}
}

function shopInitTabBar() {
    const tabItems = document.querySelectorAll('.shop-tab-item');
    tabItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            shopSwitchTab(target);
        });
    });
}

function shopHandleAvatarUpload(fileInput, targetImgId, targetDefaultSelector) {
    const file = fileInput.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById(targetImgId);
        const defaultEl = document.querySelector(targetDefaultSelector);
        if (img) {
            img.src = e.target.result;
            img.style.display = 'block';
        }
        if (defaultEl) {
            defaultEl.style.display = 'none';
        }
    };
    reader.readAsDataURL(file);
}

function shopInitUploadHandlers() {
    const avatarFile = document.getElementById('shopAvatarFile');
    if (avatarFile) {
        avatarFile.addEventListener('change', function() {
            shopHandleAvatarUpload(this, 'shopEditAvatarImg', '#shopEditAvatar .shop-avatar-default');
        });
    }
    
    const profileBgFile = document.getElementById('shopProfileBgFile');
    if (profileBgFile) {
        profileBgFile.addEventListener('change', function() {
            const file = this.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                const bg = document.getElementById('shopProfileBg');
                if (bg) {
                    bg.style.backgroundImage = 'url(' + e.target.result + ')';
                    bg.style.backgroundSize = 'cover';
                    bg.style.backgroundPosition = 'center';
                }
            };
            reader.readAsDataURL(file);
        });
    }
    
    const bannerBgFile = document.getElementById('shopBannerBgFile');
    if (bannerBgFile) {
        bannerBgFile.addEventListener('change', function() {
            const file = this.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                const bg = document.getElementById('shopBannerBg');
                if (bg) {
                    bg.style.backgroundImage = 'url(' + e.target.result + ')';
                    bg.style.backgroundSize = 'cover';
                    bg.style.backgroundPosition = 'center';
                }
            };
            reader.readAsDataURL(file);
        });
    }
    
    const roleAvatarUpload = document.getElementById('shopRoleAvatarUpload');
    if (roleAvatarUpload) {
        roleAvatarUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('shopEditRoleAvatarPreview');
                if (preview) {
                    preview.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
                }
            };
            reader.readAsDataURL(file);
        });
    }
}

function shopInit() {
    shopRenderProducts();
    shopInitCategories();
    shopInitTabBar();
    shopInitCommentStars();
    shopInitUploadHandlers();
    shopInitColorScheme();
    shopApplyProfileToUI();
    shopRefreshCartUI();
    shopUpdateOrderBadges();
}

document.addEventListener('DOMContentLoaded', shopInit);

/* ----------------------- IG APP (ig) ----------------------- */

function igCloseModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('show');
}

/* ----------------------- 手工艺 APP (craft) ----------------------- */

function craftOpenViewer() {
    const el = document.getElementById('craftViewerOverlay');
    if (el) el.classList.add('show');
}


/* ==================== 美团APP React版（已编译） ==================== */
/* 美团APP React版 */
const DATA = {
  categories: [{
    id: 'c1',
    name: '面食',
    icon: '🍜',
    color: 'linear-gradient(135deg, #FF6B6B, #FF8E53)'
  }, {
    id: 'c2',
    name: '饮品',
    icon: '🧋',
    color: 'linear-gradient(135deg, #A8E6CF, #88D8B0)'
  }, {
    id: 'c3',
    name: '甜品',
    icon: '🍰',
    color: 'linear-gradient(135deg, #FFD3B6, #FFAAA5)'
  }, {
    id: 'c4',
    name: '快餐',
    icon: '🍱',
    color: 'linear-gradient(135deg, #FFB347, #FFCC33)'
  }, {
    id: 'c5',
    name: '寿司料理',
    icon: '🍣',
    color: 'linear-gradient(135deg, #FF9FF3, #F368E0)'
  }, {
    id: 'c6',
    name: '披萨意面',
    icon: '🍕',
    color: 'linear-gradient(135deg, #FF6B6B, #EE5A6F)'
  }, {
    id: 'c7',
    name: '面包蛋糕',
    icon: '🍞',
    color: 'linear-gradient(135deg, #DDA0DD, #DA70D6)'
  }, {
    id: 'c8',
    name: '汉堡炸鸡',
    icon: '🍔',
    color: 'linear-gradient(135deg, #FFA07A, #FA8072)'
  }, {
    id: 'c9',
    name: '水果',
    icon: '🍎',
    color: 'linear-gradient(135deg, #98FB98, #90EE90)'
  }, {
    id: 'c10',
    name: '烧烤',
    icon: '🍢',
    color: 'linear-gradient(135deg, #FF4500, #FF6347)'
  }],
  stores: function () {
    const storeData = [{
      cat: 'c1',
      stores: [['东方宫兰州拉面', '🍜', 4.6, 11538, '2.1km', '38分钟', 20, 2, ['满减', '新客立减', '超时赔付'], '正宗兰州拉面，手工现拉！', '北京市西城区西单北大街187号', '010-55016231', '08:00-23:00'], ['重庆小面', '🌶️', 4.4, 8923, '1.5km', '28分钟', 15, 3, ['满减', '首单立减'], '地道重庆味，麻辣鲜香！', '北京市东城区王府井大街138号', '010-66123456', '09:00-22:00'], ['味千拉面', '🍥', 4.5, 15678, '3.2km', '42分钟', 25, 5, ['满减', '会员专享'], '正宗日式豚骨拉面，浓郁醇厚！', '北京市朝阳区三里屯太古里南区', '010-64178899', '10:00-22:00'], ['康师傅私房牛肉面', '🐂', 4.3, 7845, '2.8km', '35分钟', 22, 3, ['满减', '新客立减'], '大块牛肉，劲道面条！', '北京市海淀区中关村大街15号', '010-82698765', '07:00-23:00'], ['老北京炸酱面', '🥢', 4.7, 12345, '1.8km', '30分钟', 18, 2, ['满减', '超时赔付'], '地道老北京味儿，家的味道！', '北京市西城区前门大街32号', '010-63034567', '08:00-21:00'], ['秦云老太婆摊摊面', '🌶️', 4.5, 9876, '2.5km', '32分钟', 16, 2, ['满减', '首单立减'], '重庆老字号，麻辣鲜香！', '北京市朝阳区望京街9号', '010-84712345', '09:00-22:00'], ['阿香米线', '🍜', 4.4, 13567, '3.0km', '40分钟', 28, 4, ['满减', '会员专享'], '云南过桥米线，汤鲜料足！', '北京市丰台区南三环西路16号', '010-87567890', '10:00-22:00']]
    }, {
      cat: 'c2',
      stores: [['喜茶', '🍵', 4.8, 25678, '1.2km', '25分钟', 20, 3, ['满减', '新品上市'], '灵感之茶，匠心制作！', '北京市西城区西单大悦城B1', '010-56587766', '10:00-22:00'], ['奈雪的茶', '🍵', 4.7, 22345, '1.8km', '28分钟', 22, 3, ['满减', '首单立减'], '一杯好茶，一口软欧包！', '北京市东城区王府井APM', '010-65231234', '10:00-22:00'], ['蜜雪冰城', '🧊', 4.6, 38976, '0.8km', '18分钟', 10, 1, ['满减', '低价好物'], '你爱我我爱你，蜜雪冰城甜蜜蜜！', '北京市朝阳区建国路88号', '010-85886789', '09:00-23:00'], ['瑞幸咖啡', '☕', 4.5, 31245, '1.5km', '22分钟', 15, 2, ['满减', '新人专享'], '专业咖啡新鲜式！', '北京市海淀区中关村软件园', '010-82825678', '07:00-22:00'], ['星巴克', '☕', 4.7, 28765, '2.0km', '25分钟', 30, 5, ['满减', '会员专享'], '第三空间，享受每一刻！', '北京市朝阳区国贸中心B1', '010-65053344', '07:00-23:00'], ['CoCo都可', '🧋', 4.5, 19876, '1.3km', '20分钟', 12, 2, ['满减', '首单立减'], '现煮茶饮，新鲜好味道！', '北京市西城区西直门凯德MALL', '010-58301234', '09:00-22:00'], ['茶百道', '🍵', 4.6, 21456, '1.6km', '24分钟', 18, 2, ['满减', '新品上市'], '成都味道，好茶饮！', '北京市朝阳区三里屯路19号', '010-64167890', '10:00-22:30']]
    }, {
      cat: 'c3',
      stores: [['满记甜品', '🍮', 4.6, 15678, '2.2km', '35分钟', 30, 4, ['满减', '会员专享'], '香港甜品专家，匠心之作！', '北京市西城区西单大悦城5F', '010-56587788', '10:00-22:00'], ['鲜芋仙', '🍡', 4.5, 13456, '1.8km', '30分钟', 25, 3, ['满减', '首单立减'], '台式甜品，新鲜好味道！', '北京市东城区崇文门新世界', '010-67084567', '10:00-22:00'], ['哈根达斯', '🍨', 4.7, 11234, '2.5km', '32分钟', 50, 6, ['满减', '高端之选'], '尽情尽享，尽善尽美！', '北京市朝阳区国贸商城', '010-65052233', '10:00-22:00'], ['DQ冰雪皇后', '🍦', 4.4, 18765, '1.5km', '25分钟', 28, 3, ['满减', '倒杯不洒'], '倒杯不洒的美味冰淇淋！', '北京市海淀区中关村家乐福', '010-82635678', '10:00-22:00'], ['Lady M', '🍰', 4.8, 8765, '3.0km', '40分钟', 68, 8, ['满减', '高端之选'], '纽约高端千层蛋糕品牌！', '北京市朝阳区三里屯太古里', '010-64132211', '10:00-21:00'], ['许留山', '🥭', 4.3, 12345, '2.0km', '28分钟', 35, 4, ['满减', '港式甜品'], '香港老字号甜品，芒果专家！', '北京市西城区金融街购物中心', '010-66220987', '10:00-22:00'], ['双美豆沙牛乳', '🥛', 4.6, 16789, '1.2km', '22分钟', 15, 2, ['满减', '新品上市'], '健康美味，豆沙牛乳！', '北京市朝阳区望京凯德MALL', '010-84783456', '09:00-22:00']]
    }, {
      cat: 'c4',
      stores: [['真功夫', '🍱', 4.4, 17890, '1.8km', '28分钟', 20, 3, ['满减', '新客立减'], '营养还是蒸的好！', '北京市西城区西单明珠B1', '010-66056789', '06:00-22:00'], ['老乡鸡', '🍗', 4.7, 22345, '1.5km', '25分钟', 18, 2, ['满减', '首单立减'], '安徽家乡鸡，干净又卫生！', '北京市朝阳区建国门外大街', '010-65678901', '07:00-22:00'], ['吉野家', '🍛', 4.5, 20123, '2.0km', '30分钟', 25, 4, ['满减', '会员专享'], '牛肉饭专家，日式美味！', '北京市东城区东方新天地', '010-85185678', '07:00-22:00'], ['永和大王', '🍚', 4.3, 15678, '1.2km', '22分钟', 15, 2, ['满减', '新客立减'], '台湾美食，豆浆油条！', '北京市海淀区西三环北路', '010-68412345', '06:00-23:00'], ['乡村基', '🍱', 4.4, 13456, '2.5km', '32分钟', 22, 3, ['满减', '超值套餐'], '重庆本土快餐，实惠美味！', '北京市丰台区方庄环岛', '010-67654321', '07:00-22:00'], ['田老师红烧肉', '🥩', 4.5, 19876, '1.0km', '18分钟', 16, 1, ['满减', '低价好物'], '红烧肉饭，家的味道！', '北京市朝阳区朝阳路88号', '010-85782345', '07:00-22:00'], ['和合谷', '🍚', 4.3, 14567, '1.6km', '26分钟', 18, 2, ['满减', '首单立减'], '国人快餐，良心品质！', '北京市西城区阜成门内大街', '010-66182345', '07:00-22:00']]
    }, {
      cat: 'c5',
      stores: [['元气寿司', '🍣', 4.6, 12345, '2.3km', '35分钟', 30, 5, ['满减', '会员专享'], '新鲜元气，每一贯都是享受！', '北京市西城区西单大悦城B2', '010-56587654', '10:00-22:00'], ['寿司郎', '🍱', 4.7, 18765, '3.0km', '40分钟', 40, 6, ['满减', '回转寿司'], '日本人气回转寿司！', '北京市朝阳区三里屯太古里', '010-64135678', '11:00-22:00'], ['争鲜回转寿司', '🍣', 4.4, 15432, '1.8km', '28分钟', 25, 3, ['满减', '超值之选'], '新鲜美味，物超所值！', '北京市东城区东直门来福士', '010-84476789', '10:00-22:00'], ['将太无二', '🏮', 4.8, 9876, '2.8km', '38分钟', 80, 8, ['满减', '高端日料'], '创意寿司，匠心之作！', '北京市朝阳区国贸中心3楼', '010-65054321', '11:00-22:00'], ['黑眼熊寿司', '🐻', 4.5, 16789, '1.5km', '25分钟', 20, 3, ['满减', '新客立减'], '可爱又好吃的寿司！', '北京市海淀区五道口华联', '010-62667890', '10:00-22:00'], ['N多寿司', '🍣', 4.3, 13567, '1.2km', '20分钟', 15, 2, ['满减', '低价好物'], 'N种选择，N种美味！', '北京市朝阳区望京西园', '010-84725678', '09:00-22:00'], ['味之藏拉面寿司', '🍱', 4.4, 11234, '2.0km', '30分钟', 28, 4, ['满减', '拉面寿司'], '日料双拼，一次满足！', '北京市丰台区丽泽天街', '010-83601234', '10:00-22:00']]
    }, {
      cat: 'c6',
      stores: [['必胜客', '🍕', 4.5, 21345, '2.0km', '35分钟', 45, 6, ['满减', '会员专享'], '欢乐时刻，必胜客！', '北京市西城区西单北大街120号', '010-66011234', '07:30-22:00'], ['达美乐披萨', '🍕', 4.6, 25678, '1.5km', '30分钟', 35, 5, ['满减', '30分钟必达'], '30分钟必达，美味不等待！', '北京市朝阳区建国路89号', '010-85889988', '10:00-22:00'], ['棒约翰', '🍕', 4.3, 17890, '2.5km', '38分钟', 50, 7, ['满减', '芝士满满'], '更好的馅料，更好的披萨！', '北京市东城区东直门外大街', '010-84478899', '10:00-22:00'], ['意风街意面', '🍝', 4.4, 12345, '1.8km', '28分钟', 30, 4, ['满减', '意式风味'], '地道意大利风味！', '北京市朝阳区三里屯路11号', '010-64171234', '11:00-22:00'], ['站点披萨', '🍕', 4.5, 15678, '2.2km', '32分钟', 40, 5, ['满减', '大尺寸披萨'], '美式大披萨，够过瘾！', '北京市海淀区五道口', '010-62635678', '10:30-22:00'], ['Mr.Pizza', '🍕', 4.6, 14567, '2.8km', '40分钟', 55, 7, ['满减', '韩式披萨'], '韩国人气披萨品牌！', '北京市朝阳区望京SOHO', '010-84785678', '10:00-22:00'], ['意面公社', '🍝', 4.3, 10987, '1.5km', '25分钟', 25, 3, ['满减', '首单立减'], '手工意面，劲道爽滑！', '北京市丰台区丰台万达广场', '010-63795678', '10:00-22:00']]
    }, {
      cat: 'c7',
      stores: [['味多美', '🍰', 4.6, 23456, '1.0km', '20分钟', 20, 2, ['满减', '新鲜烘焙'], '发现生活的美味！', '北京市西城区西四南大街32号', '010-66056789', '07:00-22:00'], ['好利来', '🎂', 4.7, 28765, '1.2km', '22分钟', 25, 3, ['满减', '网红甜品'], '好利来，用心做点心！', '北京市东城区王府井大街255号', '010-65234567', '08:00-22:00'], ['巴黎贝甜', '🥐', 4.5, 19876, '1.8km', '26分钟', 28, 3, ['满减', '法式烘焙'], '法式烘焙，浪漫味道！', '北京市朝阳区国贸中心B1', '010-65053322', '07:00-22:00'], ['原麦山丘', '🍞', 4.6, 16789, '2.0km', '30分钟', 30, 4, ['满减', '软欧面包'], '软欧面包，健康美味！', '北京市海淀区中关村大街1号', '010-82667890', '07:30-22:00'], ['多乐之日', '🥖', 4.4, 13456, '1.5km', '24分钟', 22, 3, ['满减', '韩式面包'], '韩国烘焙品牌，新鲜出炉！', '北京市朝阳区望京阜通东大街', '010-84782345', '07:00-22:00'], ['85度C', '☕', 4.3, 21345, '1.3km', '20分钟', 18, 2, ['满减', '咖啡面包'], '咖啡+面包，好搭配！', '北京市西城区西单君太B1', '010-66158901', '07:00-23:00'], ['金凤成祥', '🍰', 4.2, 15678, '0.9km', '18分钟', 15, 1, ['满减', '亲民之选'], '身边的蛋糕房！', '北京市朝阳区左家庄东街', '010-64635678', '07:00-22:00']]
    }, {
      cat: 'c8',
      stores: [['麦当劳', '🍔', 4.7, 35678, '1.2km', '22分钟', 20, 4, ['满减', '麦乐送'], '我就喜欢！', '北京市西城区西单北大街178号', '010-66012345', '06:00-24:00'], ['肯德基', '🍗', 4.6, 32456, '1.5km', '25分钟', 25, 5, ['满减', '宅急送'], '有了肯德基，生活好滋味！', '北京市东城区王府井大街201号', '010-65281234', '06:00-23:00'], ['汉堡王', '🍔', 4.5, 21345, '2.0km', '30分钟', 30, 5, ['满减', '皇堡专家'], '我选我味！', '北京市朝阳区三里屯太古里', '010-64156789', '07:00-23:00'], ['德克士', '🍗', 4.3, 18765, '1.8km', '28分钟', 22, 3, ['满减', '脆皮炸鸡'], '脆皮炸鸡，德克士！', '北京市海淀区中关村大街27号', '010-82661234', '07:00-22:00'], ['华莱士', '🍔', 4.2, 28976, '0.8km', '18分钟', 12, 1, ['满减', '超值低价'], '实惠美味，国民炸鸡！', '北京市朝阳区朝阳北路', '010-85763456', '08:00-23:00'], ['塔斯汀', '🥟', 4.6, 24567, '1.0km', '20分钟', 18, 2, ['满减', '中国汉堡'], '中国汉堡塔斯汀！', '北京市西城区马连道胡同', '010-63326789', '08:00-23:00'], ['派乐汉堡', '🍔', 4.1, 15678, '1.3km', '22分钟', 15, 2, ['满减', '超值套餐'], '好吃不贵，派乐汉堡！', '北京市丰台区马家堡西路', '010-67534567', '08:00-22:00']]
    }, {
      cat: 'c9',
      stores: [['百果园', '🍎', 4.6, 28765, '0.8km', '20分钟', 30, 3, ['满减', '不好吃三无退货'], '好吃的水果在百果园！', '北京市西城区广安门外大街', '010-63367890', '07:00-23:00'], ['每日优鲜', '🥝', 4.5, 31245, '1.5km', '30分钟', 40, 5, ['满减', '极速达'], '生鲜果蔬，最快29分钟达！', '北京市朝阳区望京SOHO', '010-84782345', '07:00-23:00'], ['鲜丰水果', '🍓', 4.4, 22345, '1.0km', '22分钟', 25, 3, ['满减', '新鲜直采'], '好吃才是硬道理！', '北京市东城区东四十条', '010-64015678', '07:00-22:00'], ['果多美', '🍇', 4.3, 18765, '1.2km', '20分钟', 20, 2, ['满减', '超值特惠'], '新鲜好水果，实惠多多！', '北京市海淀区学院路', '010-62345678', '07:30-22:00'], ['盒马鲜生', '🦐', 4.7, 25678, '2.5km', '35分钟', 50, 6, ['满减', '30分钟极速达'], '新鲜每一刻，看得见的新鲜！', '北京市朝阳区十里堡', '010-85856789', '08:00-22:00'], ['本来生活', '🥬', 4.5, 15432, '2.0km', '40分钟', 60, 8, ['满减', '品质之选'], '改善食品安全，从本开始！', '北京市朝阳区酒仙桥', '010-64312345', '08:00-21:00'], ['果切研究所', '🍉', 4.4, 19876, '1.8km', '25分钟', 28, 4, ['满减', '新鲜现切'], '新鲜现切水果，干净卫生！', '北京市西城区金融街', '010-66223456', '09:00-22:00']]
    }, {
      cat: 'c10',
      stores: [['木屋烧烤', '🍖', 4.6, 22345, '2.0km', '35分钟', 50, 6, ['满减', '夜宵首选'], '无烧烤，不夏天！', '北京市朝阳区望京街10号', '010-84785678', '11:00-02:00'], ['很久以前羊肉串', '🍢', 4.8, 18765, '2.5km', '40分钟', 60, 8, ['满减', '烤串专家'], '很久以前，只是家串店！', '北京市朝阳区三里屯路33号', '010-64132233', '11:00-03:00'], ['丰茂烤串', '🍗', 4.5, 15432, '1.8km', '32分钟', 45, 5, ['满减', '现切现串'], '羊肉现切现串才好吃！', '北京市海淀区五道口', '010-62638901', '11:00-02:00'], ['烤匠麻辣烤鱼', '🐟', 4.7, 12345, '3.0km', '45分钟', 70, 9, ['满减', '烤鱼专家'], '麻辣烤鱼，越吃越香！', '北京市朝阳区国贸中心', '010-65056789', '10:00-23:00'], ['大尚龙虾', '🦞', 4.4, 19876, '2.2km', '38分钟', 80, 10, ['满减', '龙虾盛宴'], '小龙虾，大满足！', '北京市西城区簋街', '010-64056789', '11:00-03:00'], ['夜烤大排档', '🍢', 4.3, 16789, '1.5km', '28分钟', 30, 4, ['满减', '夜宵推荐'], '烤串配啤酒，深夜好伙伴！', '北京市朝阳区双井', '010-87725678', '16:00-02:00'], ['冰城串吧', '🍖', 4.5, 14567, '2.8km', '42分钟', 40, 6, ['满减', '东北烤串'], '东北烤串，量大实惠！', '北京市朝阳区劲松', '010-67321234', '11:00-02:00']]
    }];
    const menuTemplates = {
      'c1': {
        cats: [{
          id: 'm1',
          name: '招牌面食'
        }, {
          id: 'm2',
          name: '特色小吃'
        }, {
          id: 'm3',
          name: '饮品'
        }],
        items: [['招牌牛肉面', 'm1', 32, '🍜', '精选牛腩慢炖3小时，肉质酥烂入味', 2356, '招牌'], ['经典兰州拉面', 'm1', 22, '🍜', '一清二白三红四绿，地道兰州味', 1890, ''], ['红烧排骨面', 'm1', 28, '🍖', '精选肋排，肉质鲜嫩，汤汁浓郁', 1456, ''], ['酸辣粉', 'm1', 18, '🌶️', '酸辣过瘾，红薯粉劲道爽滑', 1234, '热销'], ['担担面', 'm1', 20, '🥢', '麻辣鲜香，肉末酥香', 987, ''], ['鸡丝凉面', 'm1', 22, '🍗', '清爽可口，夏日必备', 876, ''], ['牛肉小面', 'm1', 25, '🐂', '重庆小面风味，麻辣鲜香', 1123, ''], ['过桥米线', 'm1', 28, '🍜', '云南正宗过桥米线，汤鲜料足', 1567, '推荐'], ['番茄鸡蛋面', 'm1', 18, '🍅', '酸甜开胃，家常味道', 1234, ''], ['阳春面', 'm1', 15, '🍜', '清汤挂面，简单美味', 876, ''], ['刀削面', 'm1', 24, '🍜', '山西刀削面，中厚边薄', 1098, ''], ['烩面', 'm1', 26, '🍜', '河南烩面，汤面筋道', 987, ''], ['馄饨面', 'm1', 23, '🥟', '云吞配面条，双重享受', 765, ''], ['葱油拌面', 'm1', 16, '🍝', '香浓葱油，简单好吃', 890, ''], ['麻辣香锅面', 'm1', 30, '🌶️', '麻辣鲜香，配料丰富', 1345, ''], ['酸菜鱼面', 'm1', 32, '🐟', '酸爽开胃，鱼肉鲜嫩', 1678, ''], ['肥牛面', 'm1', 35, '🥩', '精选肥牛，肉质鲜嫩', 1456, ''], ['海鲜面', 'm1', 38, '🦐', '新鲜海鲜，汤鲜味美', 1234, ''], ['炸酱面', 'm1', 20, '🍜', '老北京炸酱面，地道口味', 1567, ''], ['肉丝面', 'm1', 22, '🥩', '鲜香肉丝，家常美味', 987, ''], ['卤蛋', 'm2', 4, '🥚', '五香卤蛋，入味三分', 3456, ''], ['凉拌黄瓜', 'm2', 10, '🥒', '清爽脆嫩，开胃解腻', 1234, ''], ['牛肉夹馍', 'm2', 15, '🥙', '肉香四溢，馍脆肉多', 2134, '推荐'], ['酸辣土豆丝', 'm2', 12, '🥔', '酸辣脆爽，下饭神器', 987, ''], ['凉拌木耳', 'm2', 12, '🥗', '爽口木耳，开胃解腻', 1123, ''], ['口水鸡', 'm2', 22, '🍗', '麻辣鲜香，皮脆肉嫩', 1456, '热销'], ['夫妻肺片', 'm2', 24, '🥩', '四川凉菜经典，麻辣鲜香', 1234, ''], ['皮蛋豆腐', 'm2', 14, '🥚', '清爽开胃，嫩滑可口', 876, ''], ['麻婆豆腐', 'm2', 16, '🥘', '麻辣鲜香，下饭神器', 1567, ''], ['凉拌海带丝', 'm2', 8, '🥗', '酸爽脆嫩，开胃解腻', 987, ''], ['酸梅汤', 'm3', 8, '🍹', '解腻开胃，酸甜可口', 2345, ''], ['可乐', 'm3', 6, '🥤', '冰爽可口，经典味道', 3456, ''], ['雪碧', 'm3', 6, '🥤', '清爽柠檬味', 2134, ''], ['豆浆', 'm3', 5, '🥛', '现磨豆浆，营养健康', 1876, ''], ['鲜榨橙汁', 'm3', 12, '🍊', '新鲜现榨，维C满满', 1567, ''], ['蜂蜜柚子茶', 'm3', 10, '🍯', '清香柚子，甜蜜蜂蜜', 1234, ''], ['牛奶', 'm3', 8, '🥛', '新鲜牛奶，营养丰富', 987, ''], ['王老吉', 'm3', 7, '🥤', '怕上火喝王老吉', 1678, ''], ['加多宝', 'm3', 7, '🥤', '凉茶领导者', 1456, '']]
      },
      'c2': {
        cats: [{
          id: 'm1',
          name: '招牌饮品'
        }, {
          id: 'm2',
          name: '鲜榨果茶'
        }, {
          id: 'm3',
          name: '咖啡系列'
        }],
        items: [['招牌珍珠奶茶', 'm1', 16, '🧋', 'Q弹珍珠，香浓奶茶', 5678, '招牌'], ['杨枝甘露', 'm1', 22, '🥭', '芒果西柚椰奶，经典港式甜品', 3456, '热销'], ['芋泥波波奶茶', 'm1', 18, '🍠', '绵密芋泥，Q弹波波', 2345, '推荐'], ['奥利奥奶茶', 'm1', 19, '🍪', '奥利奥碎配香浓奶茶', 1987, ''], ['红豆奶茶', 'm1', 15, '🫘', '香甜红豆，经典搭配', 2134, ''], ['芋圆奶茶', 'm1', 17, '🍡', '手工芋圆，软糯Q弹', 1876, ''], ['烤奶', 'm1', 14, '🍵', '焦香烤奶，独特风味', 2567, ''], ['奶绿', 'm1', 13, '🍵', '清新绿茶配香浓牛奶', 2134, ''], ['布丁奶茶', 'm1', 17, '🍮', '嫩滑布丁配香浓奶茶', 1876, ''], ['椰果奶茶', 'm1', 15, '🥥', '脆爽椰果，经典搭配', 1567, ''], ['波霸奶茶', 'm1', 18, '🧋', '大波霸，超满足', 2345, ''], ['黑糖奶茶', 'm1', 19, '🍯', '黑糖珍珠，香浓醇厚', 2134, ''], ['抹茶奶茶', 'm1', 18, '🍵', '日式抹茶，清新茶香', 1789, ''], ['满杯水果茶', 'm2', 25, '🍓', '多种新鲜水果，维C满满', 3214, '招牌'], ['柠檬茶', 'm2', 15, '🍋', '清爽柠檬，解腻开胃', 4567, '热销'], ['多肉葡萄', 'm2', 22, '🍇', '去皮葡萄，果肉满满', 2876, ''], ['草莓啵啵', 'm2', 20, '🍓', '新鲜草莓，Q弹啵啵', 1987, ''], ['百香果茶', 'm2', 18, '🍯', '酸甜百香果，香气四溢', 1765, ''], ['芒果益力多', 'm2', 20, '🥭', '香浓芒果配益力多', 1543, '推荐'], ['西柚茶', 'm2', 19, '🍊', '清爽西柚，酸甜可口', 1234, ''], ['蜜桃乌龙', 'm2', 18, '🍑', '香甜蜜桃配乌龙茶', 1678, ''], ['荔枝红茶', 'm2', 20, '🫖', '清甜荔枝配红茶', 1456, ''], ['美式咖啡', 'm3', 18, '☕', '醇香浓郁，提神醒脑', 2345, ''], ['拿铁', 'm3', 24, '☕', '丝滑奶泡，香浓咖啡', 3456, '推荐'], ['卡布奇诺', 'm3', 26, '☕', '经典意式，奶泡绵密', 1876, ''], ['摩卡', 'm3', 28, '☕', '巧克力与咖啡的完美融合', 1567, ''], ['焦糖玛奇朵', 'm3', 27, '☕', '焦糖与咖啡的甜蜜邂逅', 2134, '热销'], ['冰美式', 'm3', 16, '🧊', '冰爽美式，夏日必备', 1987, ''], ['燕麦拿铁', 'm3', 26, '🥛', '健康燕麦奶配香浓咖啡', 1765, ''], ['手冲咖啡', 'm3', 32, '☕', '精品手冲，风味独特', 876, ''], ['冷萃咖啡', 'm3', 28, '☕', '低温冷萃，口感顺滑', 1234, ''], ['榛果拿铁', 'm3', 27, '🌰', '榛果香气，香浓咖啡', 1567, ''], ['美式冰咖啡', 'm3', 17, '🧊', '冰爽醇香，提神醒脑', 1890, '']]
      },
      'c3': {
        cats: [{
          id: 'm1',
          name: '招牌甜品'
        }, {
          id: 'm2',
          name: '冰淇淋'
        }, {
          id: 'm3',
          name: '蛋糕切件'
        }],
        items: [['杨枝甘露', 'm1', 28, '🥭', '芒果西柚椰奶西米，经典港式', 2345, '招牌'], ['芒果白雪黑糯米', 'm1', 32, '🍡', '香甜芒果配黑糯米，口感丰富', 1890, '热销'], ['双皮奶', 'm1', 22, '🍮', '嫩滑双皮奶，奶香浓郁', 1567, ''], ['红豆沙', 'm1', 18, '🫘', '绵密红豆沙，经典甜品', 1234, ''], ['芝麻糊', 'm1', 20, '🥣', '香浓芝麻糊，养生之选', 987, ''], ['杏仁豆腐', 'm1', 24, '🍮', '清爽杏仁味，嫩滑口感', 876, ''], ['芋圆仙草', 'm1', 26, '🍡', '手工芋圆配仙草，Q弹爽滑', 1456, '推荐'], ['芒果班戟', 'm1', 30, '🥞', '新鲜芒果配奶油，香甜可口', 1234, ''], ['榴莲班戟', 'm1', 35, '🍕', '金枕榴莲，浓郁香甜', 987, ''], ['木瓜炖雪蛤', 'm1', 48, '🥣', '养颜美容，滋补佳品', 567, ''], ['西米露', 'm1', 22, '🥛', '椰香西米露，清甜爽口', 1345, ''], ['烧仙草', 'm1', 20, '🍵', '台式烧仙草，配料丰富', 1567, ''], ['香草冰淇淋', 'm2', 32, '🍦', '经典香草味，奶香浓郁', 2134, ''], ['巧克力冰淇淋', 'm2', 35, '🍫', '浓郁可可，丝滑口感', 1876, ''], ['草莓冰淇淋', 'm2', 32, '🍓', '新鲜草莓，酸甜可口', 1567, ''], ['抹茶冰淇淋', 'm2', 36, '🍵', '日式抹茶，清新茶香', 1234, ''], ['芒果冰淇淋', 'm2', 33, '🥭', '香甜芒果，热带风味', 1456, ''], ['焦糖冰淇淋', 'm2', 34, '🍮', '焦香浓郁，甜蜜丝滑', 1345, ''], ['双球冰淇淋', 'm2', 58, '🍨', '两种口味，双重享受', 876, '热销'], ['蓝莓冰淇淋', 'm2', 35, '🫐', '酸甜蓝莓，果香浓郁', 1123, ''], ['提拉米苏冰淇淋', 'm2', 38, '☕', '意式风味，咖啡香浓', 987, ''], ['千层蛋糕', 'm3', 38, '🍰', '层层叠叠，奶油香浓', 2345, '招牌'], ['提拉米苏', 'm3', 42, '🍰', '意式经典，咖啡香浓', 1876, ''], ['芝士蛋糕', 'm3', 36, '🧀', '浓郁芝士，绵密口感', 1567, ''], ['黑森林蛋糕', 'm3', 40, '🍫', '巧克力樱桃，经典搭配', 1234, ''], ['芒果慕斯', 'm3', 35, '🥭', '香甜芒果慕斯，入口即化', 1456, '推荐'], ['红丝绒蛋糕', 'm3', 42, '🎂', '红丝绒配奶油芝士，浪漫美味', 987, ''], ['抹茶蛋糕', 'm3', 38, '🍵', '日式抹茶，清新茶香', 1234, ''], ['舒芙蕾', 'm3', 45, '🥞', '云朵般轻盈，入口即化', 765, '网红'], ['巧克力熔岩蛋糕', 'm3', 48, '🍫', '爆浆熔岩，巧克力浓郁', 1345, ''], ['巴斯克蛋糕', 'm3', 42, '🧀', '焦香外皮，绵密内馅', 1123, '']]
      },
      'c4': {
        cats: [{
          id: 'm1',
          name: '招牌套餐'
        }, {
          id: 'm2',
          name: '单点主菜'
        }, {
          id: 'm3',
          name: '配餐小吃'
        }],
        items: [['红烧排骨饭', 'm1', 32, '🍱', '精选肋排，配米饭和青菜', 2345, '招牌'], ['卤肉饭套餐', 'm1', 26, '🍚', '台式卤肉，香浓入味', 1987, '热销'], ['宫保鸡丁饭', 'm1', 24, '🍗', '麻辣鲜香，鸡肉嫩滑', 1876, ''], ['鱼香肉丝饭', 'm1', 22, '🥩', '酸甜微辣，经典川菜', 1567, ''], ['梅菜扣肉饭', 'm1', 28, '🥩', '肥而不腻，梅菜香浓', 1234, '推荐'], ['照烧鸡排饭', 'm1', 26, '🍗', '日式照烧，鸡肉鲜嫩', 1456, ''], ['咖喱鸡肉饭', 'm1', 25, '🍛', '香浓咖喱，配米饭', 1345, ''], ['黄焖鸡米饭', 'm1', 28, '🍗', '黄焖鸡，酱香浓郁', 1678, ''], ['番茄牛腩饭', 'm1', 30, '🥩', '酸甜番茄，软烂牛腩', 1567, ''], ['回锅肉饭', 'm1', 26, '🥓', '肥而不腻，下饭神器', 1234, ''], ['红烧鸡腿', 'm2', 18, '🍗', '鲜嫩多汁，入味三分', 2345, ''], ['红烧肉', 'm2', 22, '🥩', '肥而不腻，入口即化', 1987, ''], ['糖醋里脊', 'm2', 20, '🥩', '酸甜可口，外酥里嫩', 1678, ''], ['麻婆豆腐', 'm2', 12, '🥣', '麻辣鲜香，下饭神器', 2134, ''], ['土豆炖牛肉', 'm2', 25, '🥔', '软烂入味，家常美味', 1456, '热销'], ['鱼香茄子', 'm2', 16, '🍆', '酸甜微辣，软糯入味', 1234, ''], ['水煮肉片', 'm2', 28, '🥩', '麻辣鲜香，嫩滑肉片', 987, ''], ['蒸蛋羹', 'm3', 8, '🥚', '嫩滑蒸蛋，营养健康', 3456, ''], ['凉拌海带丝', 'm3', 6, '🥬', '清爽开胃', 1876, ''], ['酸梅汤', 'm3', 6, '🍹', '解腻开胃', 2345, ''], ['米饭', 'm3', 2, '🍚', '东北大米，香软可口', 5678, ''], ['可乐鸡翅', 'm3', 22, '🍗', '甜蜜可乐，鲜嫩鸡翅', 1567, '推荐'], ['凉拌黄瓜', 'm3', 8, '🥒', '清爽脆嫩', 2134, ''], ['紫菜蛋花汤', 'm3', 6, '🍲', '营养美味，暖胃暖心', 1876, ''], ['咸鸭蛋', 'm3', 5, '🥚', '流油咸鸭蛋，配饭神器', 2345, '']]
      },
      'c5': {
        cats: [{
          id: 'm1',
          name: '招牌寿司'
        }, {
          id: 'm2',
          name: '刺身拼盘'
        }, {
          id: 'm3',
          name: '日式小食'
        }],
        items: [['三文鱼寿司', 'm1', 18, '🍣', '新鲜三文鱼，入口即化', 2345, '招牌'], ['金枪鱼寿司', 'm1', 22, '🍣', '蓝鳍金枪鱼，肉质鲜美', 1890, ''], ['鳗鱼寿司', 'm1', 25, '🍣', '蒲烧鳗鱼，香甜多汁', 1567, '推荐'], ['虾寿司', 'm1', 15, '🦐', '鲜活甜虾，Q弹鲜美', 1987, ''], ['加州卷', 'm1', 28, '🍱', '牛油果蟹肉，经典美式', 1678, '热销'], ['三文鱼腩寿司', 'm1', 26, '🍣', '肥美三文鱼腩，入口即化', 1234, ''], ['玉子烧寿司', 'm1', 10, '🍳', '甜嫩玉子烧', 1456, ''], ['蟹柳寿司', 'm1', 12, '🦀', '鲜甜蟹柳，口感丰富', 1345, ''], ['北极贝寿司', 'm1', 20, '🐚', '脆嫩北极贝，鲜美无比', 1123, ''], ['榴莲寿司', 'm1', 28, '🍕', '金枕榴莲，创意寿司', 987, '网红'], ['三文鱼刺身', 'm2', 58, '🐟', '挪威三文鱼，新鲜厚切', 2134, '招牌'], ['北极贝刺身', 'm2', 48, '🐚', '加拿大北极贝，脆嫩鲜美', 1876, ''], ['甜虾刺身', 'm2', 38, '🦐', '北极甜虾，鲜甜可口', 1567, ''], ['刺身拼盘', 'm2', 98, '🍱', '多种刺身，一次满足', 987, '豪华'], ['金枪鱼腩刺身', 'm2', 88, '🐟', '蓝鳍金枪鱼腩，入口即化', 654, ''], ['章鱼刺身', 'm2', 42, '🐙', '新鲜章鱼，Q弹有嚼劲', 765, ''], ['黄狮鱼刺身', 'm2', 68, '🐟', '黄狮鱼，油脂丰富', 543, '推荐'], ['味增汤', 'm3', 12, '🍲', '日式味增汤，暖胃暖心', 2345, ''], ['日式煎饺', 'm3', 18, '🥟', '皮脆馅嫩，蘸汁美味', 1876, ''], ['章鱼小丸子', 'm3', 22, '🍡', '大阪风味，外酥里嫩', 1567, ''], ['日式大福', 'm3', 15, '🍡', '软糯外皮，奶油内馅', 1234, ''], ['天妇罗', 'm3', 28, '🍤', '酥脆外皮，鲜嫩内里', 1456, '热销'], ['日式咖喱饭', 'm3', 32, '🍛', '日式咖喱，香浓可口', 1234, ''], ['茶碗蒸', 'm3', 18, '🥚', '日式蒸蛋，嫩滑鲜美', 987, ''], ['日式沙拉', 'm3', 22, '🥗', '清爽健康，日式风味', 1123, '']]
      },
      'c6': {
        cats: [{
          id: 'm1',
          name: '经典披萨'
        }, {
          id: 'm2',
          name: '意面焗饭'
        }, {
          id: 'm3',
          name: '小食沙拉'
        }],
        items: [['超级至尊披萨', 'm1', 78, '🍕', '多种配料，经典之选', 2345, '招牌'], ['夏威夷披萨', 'm1', 68, '🍕', '菠萝火腿，酸甜可口', 1890, ''], ['玛格丽特披萨', 'm1', 58, '🍕', '番茄芝士罗勒，意式经典', 1567, '推荐'], ['海鲜披萨', 'm1', 88, '🦐', '虾仁鱿鱼，鲜美十足', 1234, ''], ['培根披萨', 'm1', 62, '🥓', '香脆培根，芝士满满', 1987, ''], ['水果披萨', 'm1', 65, '🍓', '多种水果，香甜可口', 1678, ''], ['榴莲披萨', 'm1', 98, '🍕', '金枕榴莲，浓郁香甜', 987, '网红'], ['牛肉披萨', 'm1', 72, '🥩', '香嫩牛肉，芝士满满', 1456, ''], ['鸡肉披萨', 'm1', 68, '🍗', '奥尔良鸡肉，美味多汁', 1345, ''], ['蘑菇披萨', 'm1', 60, '🍄', '多种菌菇，鲜香可口', 1234, ''], ['意大利肉酱面', 'm2', 38, '🍝', '经典意式肉酱，劲道面条', 2134, '招牌'], ['奶油培根意面', 'm2', 42, '🍝', '浓郁奶油，香脆培根', 1876, ''], ['番茄海鲜意面', 'm2', 48, '🦐', '番茄汤底，新鲜海鲜', 1567, ''], ['黑椒牛柳意面', 'm2', 45, '🥩', '黑椒香浓，牛肉嫩滑', 1234, ''], ['蘑菇奶油意面', 'm2', 40, '🍄', '浓郁奶油配鲜香蘑菇', 1456, ''], ['咖喱鸡焗饭', 'm2', 38, '🍛', '香浓咖喱，芝士焗饭', 1345, '推荐'], ['西班牙海鲜饭', 'm2', 68, '🍚', '藏红花配海鲜，风味独特', 876, ''], ['鸡翅', 'm3', 28, '🍗', '奥尔良烤翅，外焦里嫩', 2345, '热销'], ['薯条', 'm3', 15, '🍟', '金黄酥脆，配番茄酱', 2876, ''], ['凯撒沙拉', 'm3', 28, '🥗', '清爽健康，低脂美味', 1567, ''], ['洋葱圈', 'm3', 18, '🧅', '外酥里嫩，香甜可口', 1234, ''], ['芝士焗薯角', 'm3', 22, '🥔', '酥脆薯角配香浓芝士', 1456, ''], ['玉米汁', 'm3', 16, '🌽', '香浓玉米汁，健康美味', 1234, ''], ['蔬菜沙拉', 'm3', 24, '🥬', '新鲜蔬菜，低脂健康', 987, ''], ['鸡米花', 'm3', 25, '🍿', '酥脆鸡米花，一口一个', 1876, '']]
      },
      'c7': {
        cats: [{
          id: 'm1',
          name: '招牌面包'
        }, {
          id: 'm2',
          name: '生日蛋糕'
        }, {
          id: 'm3',
          name: '甜品小食'
        }],
        items: [['全麦吐司', 'm1', 15, '🍞', '健康全麦，营养早餐', 2345, ''], ['牛角包', 'm1', 12, '🥐', '法式牛角，层层酥脆', 1987, '推荐'], ['豆沙面包', 'm1', 8, '🍞', '香甜豆沙，经典口味', 2134, ''], ['肉松面包', 'm1', 10, '🍖', '咸香肉松，柔软面包', 1876, '热销'], ['乳酪包', 'm1', 14, '🧀', '奶油芝士，香浓可口', 1567, ''], ['菠萝包', 'm1', 9, '🍞', '酥脆外皮，柔软内里', 1234, ''], ['蒜香法棍', 'm1', 16, '🥖', '蒜香浓郁，外脆内软', 987, ''], ['紫薯面包', 'm1', 12, '🍠', '香甜紫薯，健康美味', 1456, ''], ['毛毛虫面包', 'm1', 11, '🐛', '奶油夹心，松软可口', 1345, ''], ['椰蓉面包', 'm1', 13, '🥥', '香甜椰蓉，口感丰富', 1234, ''], ['水果蛋糕', 'm2', 128, '🎂', '新鲜水果，奶油香浓', 1234, '招牌'], ['巧克力蛋糕', 'm2', 138, '🍫', '浓郁可可，丝滑奶油', 987, ''], ['抹茶蛋糕', 'm2', 128, '🍵', '日式抹茶，清新茶香', 876, ''], ['慕斯蛋糕', 'm2', 118, '🍰', '丝滑慕斯，入口即化', 765, ''], ['芝士蛋糕', 'm2', 158, '🧀', '浓郁芝士，绵密口感', 654, ''], ['网红爆浆蛋糕', 'm2', 168, '🍰', '爆浆流心，创意十足', 876, '网红'], ['儿童卡通蛋糕', 'm2', 188, '🎂', '可爱造型，小朋友最爱', 543, ''], ['提拉米苏', 'm3', 36, '🍰', '意式经典，咖啡香浓', 2345, ''], ['泡芙', 'm3', 8, '🍡', '酥脆外皮，奶油内馅', 2876, ''], ['蛋黄酥', 'm3', 12, '🥚', '层层酥皮，咸香蛋黄', 1567, ''], ['曲奇饼干', 'm3', 28, '🍪', '香脆可口，多种口味', 1987, ''], ['拿破仑蛋糕', 'm3', 32, '🥐', '层层酥皮，奶油夹心', 1234, '热销'], ['马卡龙', 'm3', 35, '🍬', '法式甜点，精致可爱', 987, ''], ['瑞士卷', 'm3', 22, '🍰', '柔软蛋糕卷，奶油夹心', 1456, ''], ['麻薯', 'm3', 18, '🍡', 'Q弹麻薯，多种口味', 1876, '推荐']]
      },
      'c8': {
        cats: [{
          id: 'm1',
          name: '招牌汉堡'
        }, {
          id: 'm2',
          name: '炸鸡小食'
        }, {
          id: 'm3',
          name: '套餐配餐'
        }],
        items: [['巨无霸', 'm1', 32, '🍔', '双层牛肉，经典之选', 3456, '招牌'], ['香辣鸡腿堡', 'm1', 22, '🍔', '香辣酥脆，鸡肉多汁', 2876, '热销'], ['奥尔良烤鸡腿堡', 'm1', 25, '🍔', '奥尔良风味，烤鸡鲜嫩', 2345, '推荐'], ['鳕鱼堡', 'm1', 26, '🐟', '酥脆鳕鱼， Tartar酱', 1567, ''], ['牛肉汉堡', 'm1', 24, '🍔', '纯牛肉饼，芝士满满', 1987, ''], ['鲜虾堡', 'm1', 28, '🦐', '完整虾仁，Q弹鲜美', 1234, ''], ['双层芝士堡', 'm1', 35, '🍔', '双层牛肉，双层芝士', 987, '豪华'], ['培根牛肉堡', 'm1', 30, '🥓', '香脆培根配牛肉饼', 1456, ''], ['鸡肉卷', 'm1', 18, '🌯', '鲜嫩鸡肉配蔬菜', 1876, ''], ['老北京鸡肉卷', 'm1', 20, '🌯', '老北京风味，甜面酱', 1678, ''], ['德州烟熏堡', 'm1', 33, '🥩', '烟熏牛肉，风味独特', 1234, ''], ['藤椒鸡腿堡', 'm1', 24, '🍔', '藤椒麻辣，鲜香酥脆', 1567, ''], ['香辣鸡翅', 'm2', 18, '🍗', '香辣酥脆，吮指回味', 4567, ''], ['原味鸡', 'm2', 22, '🍗', '独家配方，外焦里嫩', 3456, '招牌'], ['鸡米花', 'm2', 15, '🍿', '酥脆可口，一口一个', 2876, ''], ['薯条', 'm2', 12, '🍟', '金黄酥脆，现炸现卖', 5678, '热销'], ['奥尔良烤翅', 'm2', 20, '🍗', '奥尔良风味，皮脆肉嫩', 3456, ''], ['脆皮鸡', 'm2', 28, '🍗', '外酥里嫩，多汁可口', 2345, '推荐'], ['鸡块', 'm2', 16, '🍗', '金黄酥脆，鲜嫩多汁', 2134, ''], ['黄金鸡柳', 'm2', 17, '🍗', '外酥里嫩，鲜香可口', 2345, ''], ['香辣鸡排', 'm2', 22, '🍗', '香辣酥脆，大份满足', 1876, ''], ['可乐', 'm3', 8, '🥤', '冰爽可口', 4567, ''], ['雪碧', 'm3', 8, '🥤', '清爽柠檬', 3456, ''], ['全家桶', 'm3', 88, '🍗', '多种炸鸡，一次满足', 1234, '超值'], ['蛋挞', 'm3', 6, '🥚', '葡式蛋挞，酥脆嫩滑', 3456, ''], ['双人套餐', 'm3', 68, '🍔', '两个汉堡+小食+饮料', 2345, '热销'], ['儿童套餐', 'm3', 35, '🍔', '小汉堡+小食+饮料+玩具', 1876, ''], ['玉米杯', 'm3', 10, '🌽', '香甜玉米粒', 2134, ''], ['土豆泥', 'm3', 8, '🥔', '香浓土豆泥', 1567, ''], ['圣代', 'm3', 12, '🍦', '冰淇淋圣代，多种口味', 2345, ''], ['苹果派', 'm3', 8, '🥧', '酥脆外皮，苹果内馅', 1876, ''], ['菠萝派', 'm3', 8, '🍍', '酥脆外皮，菠萝内馅', 1654, '']]
      },
      'c9': {
        cats: [{
          id: 'm1',
          name: '新鲜水果'
        }, {
          id: 'm2',
          name: '果切拼盘'
        }, {
          id: 'm3',
          name: '果汁饮品'
        }],
        items: [['红富士苹果', 'm1', 15, '🍎', '脆甜多汁，山东烟台', 3456, '热销'], ['草莓', 'm1', 35, '🍓', '新鲜草莓，酸甜可口', 2345, ''], ['香蕉', 'm1', 10, '🍌', '进口香蕉，软糯香甜', 4567, ''], ['葡萄', 'm1', 28, '🍇', '阳光玫瑰，脆甜无籽', 1987, '推荐'], ['西瓜', 'm1', 20, '🍉', '8424西瓜，沙甜多汁', 2876, ''], ['芒果', 'm1', 25, '🥭', '海南芒果，香浓肉厚', 1567, ''], ['蓝莓', 'm1', 38, '🫐', '智利蓝莓，花青素丰富', 1234, ''], ['哈密瓜', 'm1', 22, '🍈', '新疆哈密瓜，香甜脆爽', 1876, ''], ['橙子', 'm1', 18, '🍊', '赣南脐橙，酸甜多汁', 2134, ''], ['火龙果', 'm1', 20, '🐉', '红心火龙果，清甜可口', 1678, ''], ['果切拼盘', 'm2', 38, '🍽️', '多种水果，新鲜现切', 2345, '招牌'], ['西瓜果切', 'm2', 18, '🍉', '冰镇西瓜，清甜解暑', 2876, '热销'], ['芒果果切', 'm2', 28, '🥭', '新鲜芒果，现切现卖', 1567, ''], ['草莓果切', 'm2', 32, '🍓', '奶油草莓，甜蜜多汁', 1234, ''], ['哈密瓜果切', 'm2', 22, '🍈', '香甜哈密瓜，现切现卖', 1456, ''], ['葡萄果切', 'm2', 30, '🍇', '阳光玫瑰，无籽脆甜', 1234, '推荐'], ['双拼果切', 'm2', 28, '🍓', '两种水果，双重享受', 1678, ''], ['鲜榨橙汁', 'm3', 18, '🍊', '100%鲜榨，维C满满', 2345, ''], ['西瓜汁', 'm3', 15, '🍉', '解暑神器，清甜可口', 1987, ''], ['芒果汁', 'm3', 20, '🥭', '香浓芒果，丝滑口感', 1678, ''], ['苹果汁', 'm3', 16, '🍎', '鲜榨苹果汁，酸甜可口', 1567, ''], ['蓝莓汁', 'm3', 25, '🫐', '鲜榨蓝莓汁，花青素丰富', 1234, ''], ['草莓奶昔', 'm3', 22, '🍓', '新鲜草莓配香浓牛奶', 1876, '热销'], ['芒果西米露', 'm3', 24, '🥭', '香浓芒果配Q弹西米', 1456, ''], ['百香果汁', 'm3', 18, '🍯', '酸甜百香果，香气四溢', 1234, '']]
      },
      'c10': {
        cats: [{
          id: 'm1',
          name: '招牌烤串'
        }, {
          id: 'm2',
          name: '特色荤菜'
        }, {
          id: 'm3',
          name: '素菜主食'
        }],
        items: [['羊肉串', 'm1', 5, '🍢', '新鲜羊肉，外焦里嫩', 5678, '招牌'], ['牛肉串', 'm1', 6, '🍢', '精选牛肉，鲜嫩多汁', 4567, ''], ['五花肉串', 'm1', 4, '🥓', '肥瘦相间，油而不腻', 3456, '热销'], ['烤鸡翅', 'm1', 8, '🍗', '奥尔良风味，皮脆肉嫩', 2876, '推荐'], ['烤鱿鱼', 'm1', 12, '🦑', '新鲜鱿鱼，Q弹有嚼劲', 2345, ''], ['烤虾', 'm1', 6, '🦐', '鲜活大虾，鲜甜美味', 1987, ''], ['烤玉米', 'm1', 8, '🌽', '甜糯玉米，焦香可口', 2134, ''], ['烤鸡心', 'm1', 4, '❤️', '鲜嫩鸡心，越嚼越香', 2345, ''], ['烤鸡胗', 'm1', 4, '🍗', '脆嫩鸡胗，口感独特', 2134, ''], ['烤排骨', 'm1', 12, '🍖', '精选排骨，外焦里嫩', 1567, ''], ['烤鸡皮', 'm1', 3, '🍗', '焦香酥脆，肥而不腻', 2567, ''], ['烤掌中宝', 'm1', 5, '🍗', '脆嫩可口，越嚼越香', 2345, ''], ['烤生蚝', 'm2', 10, '🦪', '蒜蓉粉丝，鲜嫩多汁', 1876, '招牌'], ['烤扇贝', 'm2', 10, '🐚', '蒜蓉粉丝，鲜美无比', 1567, ''], ['烤茄子', 'm2', 12, '🍆', '蒜蓉茄子，软糯入味', 2345, '热销'], ['麻辣小龙虾', 'm2', 88, '🦞', '十三香/蒜蓉，过瘾', 1234, '豪华'], ['烤羊腰', 'm2', 15, '🫘', '新鲜羊腰，补肾壮阳', 987, ''], ['烤猪蹄', 'm2', 18, '🐷', '软糯Q弹，胶原蛋白满满', 1234, '推荐'], ['烤牛蛙', 'm2', 28, '🐸', '鲜嫩牛蛙，麻辣鲜香', 765, ''], ['烤花甲', 'm2', 15, '🐚', '香辣花甲，鲜美入味', 1678, ''], ['烤鲍鱼', 'm2', 18, '🐚', '蒜蓉鲍鱼，鲜嫩弹牙', 876, ''], ['烤韭菜', 'm3', 6, '🥬', '鲜香韭菜，烤后更甜', 2876, ''], ['烤土豆', 'm3', 5, '🥔', '外焦里糯，撒料十足', 2134, ''], ['烤馒头片', 'm3', 3, '🍞', '酥脆可口，主食之选', 3456, ''], ['烤冷面', 'm3', 12, '🍜', '东北特色，酸甜可口', 1567, ''], ['烤金针菇', 'm3', 8, '🍄', '蒜蓉金针菇，鲜香入味', 1876, '热销'], ['烤豆腐', 'm3', 6, '🧈', '外焦里嫩，香辣可口', 1678, ''], ['烤面筋', 'm3', 4, '🍜', '劲道面筋，越嚼越香', 2345, ''], ['烤烧饼', 'm3', 5, '🥯', '酥脆烧饼，香气四溢', 1987, ''], ['烤茄子', 'm3', 12, '🍆', '蒜蓉茄子，软糯入味', 1678, ''], ['烤香菇', 'm3', 7, '🍄', '鲜香香菇，口感醇厚', 1456, ''], ['烤青椒', 'm3', 5, '🫑', '虎皮青椒，香辣开胃', 1345, '']]
      }
    };
    const reviewTemplatesByCategory = {
      c1: {
        good: [{
          rating: 5,
          content: '面条很劲道，汤头浓郁，牛肉块大又入味，下次还点！',
          tags: ['味道赞', '回头客']
        }, {
          rating: 5,
          content: '外卖速度很快，面汤分离，到手还是热乎的，包装很用心！',
          tags: ['配送快', '包装好']
        }, {
          rating: 5,
          content: '分量很足，一大碗面吃撑了，性价比超高，推荐！',
          tags: ['分量足', '性价比高']
        }, {
          rating: 4,
          content: '拉面很正宗，就是汤稍微有点咸，不过整体很不错。',
          tags: ['味道赞']
        }, {
          rating: 5,
          content: '朋友推荐的店，果然没失望！手工拉面就是不一样，已经是老顾客了。',
          tags: ['回头客', '朋友推荐']
        }, {
          rating: 5,
          content: '服务态度很好，备注不要香菜都记得，很贴心！',
          tags: ['服务好', '细心']
        }, {
          rating: 4,
          content: '面条很劲道，卤蛋也好吃，吃着放心，会继续支持的。',
          tags: ['味道赞', '食材新鲜']
        }, {
          rating: 5,
          content: '满减后很划算，比店里吃还便宜，味道一样正宗！',
          tags: ['优惠大', '味道赞']
        }],
        mid: [{
          rating: 3,
          content: '面条还行吧，中规中矩，没有特别惊艳的感觉。',
          tags: ['味道一般']
        }, {
          rating: 3,
          content: '配送有点慢，面都有点坨了，不过味道还可以接受。',
          tags: ['配送慢']
        }],
        bad: [{
          rating: 2,
          content: '等了一个多小时才到，面都坨了，汤也凉了，体验不太好。',
          tags: ['配送慢', '凉了']
        }, {
          rating: 1,
          content: '面条太少了，根本吃不饱，价格还贵，不会再点了。',
          tags: ['分量少', '价格贵']
        }]
      },
      c2: {
        good: [{
          rating: 5,
          content: '奶茶口感醇厚，珍珠Q弹，甜度刚刚好，太好喝了！',
          tags: ['味道赞', '回头客']
        }, {
          rating: 5,
          content: '配送速度很快，到手还是冰的，包装也很好，没有撒漏！',
          tags: ['配送快', '包装好']
        }, {
          rating: 5,
          content: '分量很足，一大杯喝一下午都够，性价比很高，推荐！',
          tags: ['分量足', '性价比高']
        }, {
          rating: 4,
          content: '果茶很清爽，水果也新鲜，就是稍微有点甜，不过整体不错。',
          tags: ['味道赞']
        }, {
          rating: 5,
          content: '朋友推荐的，果然好喝！已经是老顾客了，每次出新口味都要试。',
          tags: ['回头客', '朋友推荐']
        }, {
          rating: 5,
          content: '服务态度很好，备注少冰少糖都记得，很贴心！',
          tags: ['服务好', '细心']
        }, {
          rating: 4,
          content: '奶盖很绵密，茶底也很香，喝着放心，会继续支持的。',
          tags: ['味道赞', '食材新鲜']
        }, {
          rating: 5,
          content: '满减后超划算，比店里买还便宜，味道一样好！',
          tags: ['优惠大', '味道赞']
        }],
        mid: [{
          rating: 3,
          content: '奶茶还行吧，中规中矩，没有特别惊艳的感觉。',
          tags: ['味道一般']
        }, {
          rating: 3,
          content: '配送有点慢，等了好久，不过味道还可以接受。',
          tags: ['配送慢']
        }],
        bad: [{
          rating: 2,
          content: '等了一个多小时才到，冰都化完了，体验不太好。',
          tags: ['配送慢', '冰化了']
        }, {
          rating: 1,
          content: '太甜了，根本喝不下去，珍珠也很硬，不会再点了。',
          tags: ['太甜', '口感差']
        }]
      },
      c3: {
        good: [{
          rating: 5,
          content: '甜品太好吃了！口感细腻，甜度刚刚好，下次还点！',
          tags: ['味道赞', '回头客']
        }, {
          rating: 5,
          content: '配送很快，到手还是凉凉的，包装很用心，冰袋都没化！',
          tags: ['配送快', '包装好']
        }, {
          rating: 5,
          content: '分量很足，一个人吃不完，性价比很高，推荐！',
          tags: ['分量足', '性价比高']
        }, {
          rating: 4,
          content: '芒果班戟很赞，芒果很新鲜，就是稍微有点贵，不过物有所值。',
          tags: ['味道赞']
        }, {
          rating: 5,
          content: '朋友推荐的店，果然没失望！已经是老顾客了，每次都很满意。',
          tags: ['回头客', '朋友推荐']
        }, {
          rating: 5,
          content: '服务态度很好，备注的生日蜡烛都给了，很贴心！',
          tags: ['服务好', '细心']
        }, {
          rating: 4,
          content: '千层蛋糕很细腻，奶油也不腻，吃着放心，会继续支持的。',
          tags: ['味道赞', '食材新鲜']
        }, {
          rating: 5,
          content: '满减后很划算，比店里买还便宜，味道一样好！',
          tags: ['优惠大', '味道赞']
        }],
        mid: [{
          rating: 3,
          content: '甜品还行吧，中规中矩，没有特别惊艳的感觉。',
          tags: ['味道一般']
        }, {
          rating: 3,
          content: '配送有点慢，冰淇淋有点化了，不过味道还可以接受。',
          tags: ['配送慢']
        }],
        bad: [{
          rating: 2,
          content: '等了一个多小时才到，冰淇淋都化完了，体验不太好。',
          tags: ['配送慢', '化了']
        }, {
          rating: 1,
          content: '分量太少了，根本不够吃，价格还贵，不会再点了。',
          tags: ['分量少', '价格贵']
        }]
      },
      c4: {
        good: [{
          rating: 5,
          content: '套餐很实惠，味道也不错，米饭很香，下次还点！',
          tags: ['味道赞', '回头客']
        }, {
          rating: 5,
          content: '外卖速度很快，到手还是热乎的，包装也很用心！',
          tags: ['配送快', '包装好']
        }, {
          rating: 5,
          content: '分量很足，一个套餐吃撑了，性价比很高，推荐！',
          tags: ['分量足', '性价比高']
        }, {
          rating: 4,
          content: '红烧肉很入味，就是稍微有点肥，不过整体很不错。',
          tags: ['味道赞']
        }, {
          rating: 5,
          content: '同事推荐的，果然好吃！已经是老顾客了，工作餐首选。',
          tags: ['回头客', '朋友推荐']
        }, {
          rating: 5,
          content: '服务态度很好，备注多给点饭都记得，很贴心！',
          tags: ['服务好', '细心']
        }, {
          rating: 4,
          content: '菜品很新鲜，汤也很好喝，吃着放心，会继续支持的。',
          tags: ['味道赞', '食材新鲜']
        }, {
          rating: 5,
          content: '满减后超划算，比店里吃还便宜，味道一样好！',
          tags: ['优惠大', '味道赞']
        }],
        mid: [{
          rating: 3,
          content: '快餐还行吧，中规中矩，没有特别惊艳的感觉。',
          tags: ['味道一般']
        }, {
          rating: 3,
          content: '配送有点慢，等了好久，不过味道还可以接受。',
          tags: ['配送慢']
        }],
        bad: [{
          rating: 2,
          content: '等了一个多小时才到，菜都凉了，体验不太好。',
          tags: ['配送慢', '凉了']
        }, {
          rating: 1,
          content: '肉太少了，根本不够吃，价格还贵，不会再点了。',
          tags: ['分量少', '价格贵']
        }]
      },
      c5: {
        good: [{
          rating: 5,
          content: '寿司太好吃了！食材新鲜，三文鱼入口即化，下次还点！',
          tags: ['味道赞', '回头客']
        }, {
          rating: 5,
          content: '配送很快，到手还是凉的，包装很用心，冰袋都没化！',
          tags: ['配送快', '包装好']
        }, {
          rating: 5,
          content: '分量很足，一盒寿司两个人吃都够，性价比很高，推荐！',
          tags: ['分量足', '性价比高']
        }, {
          rating: 4,
          content: '寿司很正宗，就是稍微有点贵，不过物有所值。',
          tags: ['味道赞']
        }, {
          rating: 5,
          content: '朋友推荐的店，果然没失望！已经是老顾客了，每次都很满意。',
          tags: ['回头客', '朋友推荐']
        }, {
          rating: 5,
          content: '服务态度很好，备注的芥末酱油都给了双份，很贴心！',
          tags: ['服务好', '细心']
        }, {
          rating: 4,
          content: '刺身很新鲜，寿司饭也很劲道，吃着放心，会继续支持的。',
          tags: ['味道赞', '食材新鲜']
        }, {
          rating: 5,
          content: '满减后很划算，比店里吃还便宜，味道一样正宗！',
          tags: ['优惠大', '味道赞']
        }],
        mid: [{
          rating: 3,
          content: '寿司还行吧，中规中矩，没有特别惊艳的感觉。',
          tags: ['味道一般']
        }, {
          rating: 3,
          content: '配送有点慢，寿司有点温了，不过味道还可以接受。',
          tags: ['配送慢']
        }],
        bad: [{
          rating: 2,
          content: '等了一个多小时才到，寿司都不新鲜了，体验不太好。',
          tags: ['配送慢', '不新鲜']
        }, {
          rating: 1,
          content: '寿司太小了，根本不够吃，价格还贵，不会再点了。',
          tags: ['分量少', '价格贵']
        }]
      },
      c6: {
        good: [{
          rating: 5,
          content: '披萨太好吃了！芝士拉丝很长，饼底酥脆，下次还点！',
          tags: ['味道赞', '回头客']
        }, {
          rating: 5,
          content: '配送很快，到手还是热乎的，包装也很用心！',
          tags: ['配送快', '包装好']
        }, {
          rating: 5,
          content: '分量很足，一个披萨两个人吃都够，性价比很高，推荐！',
          tags: ['分量足', '性价比高']
        }, {
          rating: 4,
          content: '意面很入味，就是稍微有点硬，不过整体很不错。',
          tags: ['味道赞']
        }, {
          rating: 5,
          content: '朋友推荐的店，果然没失望！已经是老顾客了，聚会必点。',
          tags: ['回头客', '朋友推荐']
        }, {
          rating: 5,
          content: '服务态度很好，备注的切八块都记得，很贴心！',
          tags: ['服务好', '细心']
        }, {
          rating: 4,
          content: '芝士很足，料也很多，吃着放心，会继续支持的。',
          tags: ['味道赞', '食材新鲜']
        }, {
          rating: 5,
          content: '满减后超划算，比店里吃还便宜，味道一样好！',
          tags: ['优惠大', '味道赞']
        }],
        mid: [{
          rating: 3,
          content: '披萨还行吧，中规中矩，没有特别惊艳的感觉。',
          tags: ['味道一般']
        }, {
          rating: 3,
          content: '配送有点慢，披萨有点凉了，不过味道还可以接受。',
          tags: ['配送慢']
        }],
        bad: [{
          rating: 2,
          content: '等了一个多小时才到，披萨都凉透了，体验不太好。',
          tags: ['配送慢', '凉了']
        }, {
          rating: 1,
          content: '披萨太薄了，料也少，价格还贵，不会再点了。',
          tags: ['分量少', '价格贵']
        }]
      },
      c7: {
        good: [{
          rating: 5,
          content: '面包太好吃了！松软香甜，奶香浓郁，下次还点！',
          tags: ['味道赞', '回头客']
        }, {
          rating: 5,
          content: '配送很快，到手还是新鲜的，包装也很用心！',
          tags: ['配送快', '包装好']
        }, {
          rating: 5,
          content: '分量很足，一大袋面包吃好几天，性价比很高，推荐！',
          tags: ['分量足', '性价比高']
        }, {
          rating: 4,
          content: '蛋糕很好吃，奶油不腻，就是稍微有点贵，不过物有所值。',
          tags: ['味道赞']
        }, {
          rating: 5,
          content: '朋友推荐的店，果然没失望！已经是老顾客了，早餐必备。',
          tags: ['回头客', '朋友推荐']
        }, {
          rating: 5,
          content: '服务态度很好，备注的生日蜡烛都给了，很贴心！',
          tags: ['服务好', '细心']
        }, {
          rating: 4,
          content: '牛角包很酥脆，蛋糕也很细腻，吃着放心，会继续支持的。',
          tags: ['味道赞', '食材新鲜']
        }, {
          rating: 5,
          content: '满减后很划算，比店里买还便宜，味道一样好！',
          tags: ['优惠大', '味道赞']
        }],
        mid: [{
          rating: 3,
          content: '面包还行吧，中规中矩，没有特别惊艳的感觉。',
          tags: ['味道一般']
        }, {
          rating: 3,
          content: '配送有点慢，等了好久，不过味道还可以接受。',
          tags: ['配送慢']
        }],
        bad: [{
          rating: 2,
          content: '等了一个多小时才到，面包都不新鲜了，体验不太好。',
          tags: ['配送慢', '不新鲜']
        }, {
          rating: 1,
          content: '面包太小了，根本不够吃，价格还贵，不会再点了。',
          tags: ['分量少', '价格贵']
        }]
      },
      c8: {
        good: [{
          rating: 5,
          content: '汉堡太好吃了！肉饼很厚，酱料也足，下次还点！',
          tags: ['味道赞', '回头客']
        }, {
          rating: 5,
          content: '配送很快，到手还是热乎的，包装也很用心！',
          tags: ['配送快', '包装好']
        }, {
          rating: 5,
          content: '分量很足，一个套餐吃撑了，性价比很高，推荐！',
          tags: ['分量足', '性价比高']
        }, {
          rating: 4,
          content: '炸鸡很酥脆，就是稍微有点油，不过整体很不错。',
          tags: ['味道赞']
        }, {
          rating: 5,
          content: '朋友推荐的店，果然没失望！已经是老顾客了，每次都很满足。',
          tags: ['回头客', '朋友推荐']
        }, {
          rating: 5,
          content: '服务态度很好，备注的多给番茄酱都记得，很贴心！',
          tags: ['服务好', '细心']
        }, {
          rating: 4,
          content: '薯条很酥脆，汉堡也很新鲜，吃着放心，会继续支持的。',
          tags: ['味道赞', '食材新鲜']
        }, {
          rating: 5,
          content: '满减后超划算，比店里买还便宜，味道一样好！',
          tags: ['优惠大', '味道赞']
        }],
        mid: [{
          rating: 3,
          content: '汉堡还行吧，中规中矩，没有特别惊艳的感觉。',
          tags: ['味道一般']
        }, {
          rating: 3,
          content: '配送有点慢，等了好久，不过味道还可以接受。',
          tags: ['配送慢']
        }],
        bad: [{
          rating: 2,
          content: '等了一个多小时才到，汉堡都凉了，体验不太好。',
          tags: ['配送慢', '凉了']
        }, {
          rating: 1,
          content: '汉堡太小了，根本吃不饱，价格还贵，不会再点了。',
          tags: ['分量少', '价格贵']
        }]
      },
      c9: {
        good: [{
          rating: 5,
          content: '水果太新鲜了！又甜又多汁，包装也很用心，下次还点！',
          tags: ['味道赞', '回头客']
        }, {
          rating: 5,
          content: '配送很快，到手还是新鲜的，包装也很用心！',
          tags: ['配送快', '包装好']
        }, {
          rating: 5,
          content: '分量很足，一大盒水果吃好几天，性价比很高，推荐！',
          tags: ['分量足', '性价比高']
        }, {
          rating: 4,
          content: '草莓很新鲜很甜，就是稍微有点贵，不过物有所值。',
          tags: ['味道赞']
        }, {
          rating: 5,
          content: '朋友推荐的店，果然没失望！已经是老顾客了，每周都买。',
          tags: ['回头客', '朋友推荐']
        }, {
          rating: 5,
          content: '服务态度很好，备注的帮忙洗一下都记得，很贴心！',
          tags: ['服务好', '细心']
        }, {
          rating: 4,
          content: '水果很新鲜，种类也多，吃着放心，会继续支持的。',
          tags: ['味道赞', '食材新鲜']
        }, {
          rating: 5,
          content: '满减后很划算，比超市买还便宜，水果一样新鲜！',
          tags: ['优惠大', '味道赞']
        }],
        mid: [{
          rating: 3,
          content: '水果还行吧，中规中矩，没有特别惊艳的感觉。',
          tags: ['味道一般']
        }, {
          rating: 3,
          content: '配送有点慢，等了好久，不过味道还可以接受。',
          tags: ['配送慢']
        }],
        bad: [{
          rating: 2,
          content: '等了一个多小时才到，水果都不新鲜了，体验不太好。',
          tags: ['配送慢', '不新鲜']
        }, {
          rating: 1,
          content: '水果太少了，根本不够吃，价格还贵，不会再点了。',
          tags: ['分量少', '价格贵']
        }]
      },
      c10: {
        good: [{
          rating: 5,
          content: '烤串太好吃了！外焦里嫩，孜然味十足，下次还点！',
          tags: ['味道赞', '回头客']
        }, {
          rating: 5,
          content: '配送很快，到手还是热乎的，包装也很用心！',
          tags: ['配送快', '包装好']
        }, {
          rating: 5,
          content: '分量很足，一大把烤串吃撑了，性价比很高，推荐！',
          tags: ['分量足', '性价比高']
        }, {
          rating: 4,
          content: '羊肉串很正宗，就是稍微有点辣，不过整体很不错。',
          tags: ['味道赞']
        }, {
          rating: 5,
          content: '朋友推荐的店，果然没失望！已经是老顾客了，夜宵必备。',
          tags: ['回头客', '朋友推荐']
        }, {
          rating: 5,
          content: '服务态度很好，备注的多放辣都记得，很贴心！',
          tags: ['服务好', '细心']
        }, {
          rating: 4,
          content: '烤串很新鲜，味道也很正，吃着放心，会继续支持的。',
          tags: ['味道赞', '食材新鲜']
        }, {
          rating: 5,
          content: '满减后超划算，比店里吃还便宜，味道一样好！',
          tags: ['优惠大', '味道赞']
        }],
        mid: [{
          rating: 3,
          content: '烤串还行吧，中规中矩，没有特别惊艳的感觉。',
          tags: ['味道一般']
        }, {
          rating: 3,
          content: '配送有点慢，等了好久，不过味道还可以接受。',
          tags: ['配送慢']
        }],
        bad: [{
          rating: 2,
          content: '等了一个多小时才到，烤串都凉了，体验不太好。',
          tags: ['配送慢', '凉了']
        }, {
          rating: 1,
          content: '烤串太少了，根本不够吃，价格还贵，不会再点了。',
          tags: ['分量少', '价格贵']
        }]
      }
    };
    const users = [{
      name: '吃货小王',
      avatar: '👦'
    }, {
      name: '美食达人',
      avatar: '👩'
    }, {
      name: '外卖小哥',
      avatar: '🧑'
    }, {
      name: '小胖墩',
      avatar: '👧'
    }, {
      name: '美食家',
      avatar: '👨'
    }, {
      name: '甜甜圈',
      avatar: '👩‍🦰'
    }, {
      name: '大胃王',
      avatar: '🧔'
    }, {
      name: '小馋猫',
      avatar: '👱‍♀️'
    }, {
      name: '深夜食客',
      avatar: '👨‍🦱'
    }, {
      name: '甜品控',
      avatar: '👩‍🦱'
    }, {
      name: '健身达人',
      avatar: '💪'
    }, {
      name: '上班族',
      avatar: '👔'
    }];
    const imageCaptions = {
      'c1': ['牛肉面实拍', '麻辣红油', '手工拉面', '卤蛋特写'],
      'c2': ['奶茶实拍', '果茶分层', '珍珠特写', '拉花艺术'],
      'c3': ['甜品摆盘', '冰淇淋特写', '千层蛋糕', '芒果甜品'],
      'c4': ['套餐实拍', '红烧肉特写', '便当盒', '米饭配菜'],
      'c5': ['寿司拼盘', '三文鱼刺身', '回转寿司', '日式摆盘'],
      'c6': ['披萨拉丝', '意面特写', '芝士满满', '披萨切件'],
      'c7': ['面包陈列', '蛋糕特写', '牛角包', '慕斯蛋糕'],
      'c8': ['汉堡套餐', '炸鸡全家桶', '薯条特写', '快乐水'],
      'c9': ['水果拼盘', '草莓特写', '果切摆盘', '鲜榨果汁'],
      'c10': ['烤串拼盘', '烤生蚝', '小龙虾', '深夜烧烤']
    };
    function shuffleArray(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
    const storeNamePrefixes = ['招牌', '特色', '秘制', '经典', '金牌', '人气', '网红'];
    const storeDescSuffixes = ['，本店招牌必点！', '，深受老顾客喜爱！', '，大厨秘制配方！', '，每日新鲜现做！', '，口碑之选！', '，回头客超多！'];
    let storeId = 1;
    const stores = [];
    storeData.forEach(({
      cat,
      stores: catStores
    }) => {
      const menuTemplate = menuTemplates[cat];
      const imgs = imageCaptions[cat];
      catStores.forEach((s, idx) => {
        const [name, avatar, rating, monthSales, distance, deliveryTime, minOrder, deliveryFee, tags, notice, address, phone, businessHours] = s;
        const shuffledItems = shuffleArray(menuTemplate.items);
        const selectedItems = shuffledItems.slice(0, 30);
        const items = selectedItems.map((item, i) => {
          const priceMultiplier = 0.85 + Math.random() * 0.3;
          const newPrice = Math.round(item[2] * priceMultiplier * 10) / 10;
          let newName = item[0];
          const shouldRename = Math.random() < 0.3;
          if (shouldRename) {
            const prefix = storeNamePrefixes[Math.floor(Math.random() * storeNamePrefixes.length)];
            newName = prefix + newName;
          }
          const descSuffix = storeDescSuffixes[(idx + i) % storeDescSuffixes.length];
          const newDesc = item[4] + descSuffix;
          return {
            id: `item-${storeId}-${i + 1}`,
            name: newName,
            categoryId: item[1],
            price: newPrice,
            emoji: item[3],
            desc: newDesc,
            sales: Math.floor(item[5] * (0.8 + Math.random() * 0.4)),
            tag: item[6]
          };
        });
        const reviews = [];
        const catReviews = reviewTemplatesByCategory[cat] || reviewTemplatesByCategory.c1;
        const reviewData = [...catReviews.good.map(r => ({
          ...r,
          type: 'good'
        })), ...catReviews.mid.map(r => ({
          ...r,
          type: 'mid'
        })), ...catReviews.bad.map(r => ({
          ...r,
          type: 'bad'
        }))];
        reviewData.forEach((rv, i) => {
          const user = users[(i + idx * 3) % users.length];
          const hasImages = rv.type === 'good' && i % 3 === 0;
          const numImages = hasImages ? i % 2 === 0 ? 3 : 2 : 0;
          const images = [];
          for (let j = 0; j < numImages; j++) {
            images.push({
              emoji: ['📷', '🍽️', '🥘', '🍜', '🥗'][j % 5],
              caption: imgs[(i + j) % imgs.length]
            });
          }
          let content = rv.content;
          if (i % 2 === 0) {
            content = name + '的' + content.charAt(0).toLowerCase() + content.slice(1);
          }
          reviews.push({
            id: `rev-${storeId}-${i + 1}`,
            username: user.name,
            avatar: user.avatar,
            rating: rv.rating,
            content,
            time: `${i + 1}天前`,
            likes: Math.floor(Math.random() * 80) + 5,
            images,
            tags: rv.tags
          });
        });
        stores.push({
          id: `s${storeId}`,
          name,
          category: cat,
          avatar,
          bannerColor: `linear-gradient(135deg, hsl(${Math.floor(Math.random() * 60)}, 80%, 60%), hsl(${Math.floor(Math.random() * 60) + 20}, 70%, 50%))`,
          rating,
          monthSales,
          distance,
          deliveryTime,
          minOrder,
          deliveryFee,
          tags,
          notice,
          address,
          phone,
          businessHours,
          menus: {
            categories: menuTemplate.cats,
            items
          },
          reviews
        });
        storeId++;
      });
    });
    return stores;
  }()
};
const {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
  useCallback
} = React;

// ============== 全局状态管理 ==============
const AppContext = createContext(null);
const STORAGE_KEY = 'meituan_app_data';
const getDefaultData = () => ({
  cart: [],
  orders: [],
  addresses: [{
    id: 'a1',
    name: '张三',
    phone: '138****8888',
    address: '北京市朝阳区建国路88号SOHO现代城A座1801室',
    isDefault: true
  }, {
    id: 'a2',
    name: '李四',
    phone: '139****9999',
    address: '北京市海淀区中关村大街15号中关村广场B座2203室',
    isDefault: false
  }],
  coupons: [{
    id: 'cp1',
    amount: 5,
    condition: 30,
    name: '满30减5',
    expire: '2025-12-31',
    used: false
  }, {
    id: 'cp2',
    amount: 10,
    condition: 50,
    name: '满50减10',
    expire: '2025-12-31',
    used: false
  }, {
    id: 'cp3',
    amount: 20,
    condition: 100,
    name: '满100减20',
    expire: '2025-12-31',
    used: false
  }],
  favorites: [],
  searchHistory: [],
  city: '北京',
  profile: {
    name: '美食达人',
    phone: '138****8888',
    avatar: '👤',
    backgroundImage: ''
  }
});
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return {
        ...getDefaultData(),
        ...JSON.parse(saved)
      };
    }
  } catch (e) {
    console.error('加载数据失败', e);
  }
  return getDefaultData();
};
const saveToStorage = data => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('保存数据失败', e);
  }
};
function AppProvider({
  children
}) {
  const [state, setState] = useState(loadFromStorage);
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});
  useEffect(() => {
    saveToStorage(state);
  }, [state]);
  const showToast = useCallback((msg, duration = 2000) => {
    setToast(msg);
    setTimeout(() => setToast(null), duration);
  }, []);
  const navigate = useCallback((page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo(0, 0);
  }, []);
  const goBack = useCallback(() => {
    if (currentPage === 'storeDetail' || currentPage === 'checkout') {
      setCurrentPage('home');
    } else if (currentPage === 'category') {
      setCurrentPage('home');
    } else if (currentPage === 'search' || currentPage === 'cart' || currentPage === 'profile' || currentPage === 'orders') {
      setCurrentPage('home');
    } else if (currentPage === 'orderDetail' || currentPage === 'review') {
      setCurrentPage('orders');
    } else if (currentPage === 'addressList' || currentPage === 'addressEdit' || currentPage === 'coupons' || currentPage === 'settings' || currentPage === 'favorites') {
      setCurrentPage('profile');
    } else {
      setCurrentPage('home');
    }
    window.scrollTo(0, 0);
  }, [currentPage]);
  const addToCart = useCallback((storeId, item) => {
    setState(prev => {
      const cart = [...prev.cart];
      const existing = cart.find(i => i.storeId === storeId && i.itemId === item.id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          storeId,
          itemId: item.id,
          name: item.name,
          price: item.price,
          emoji: item.emoji,
          qty: 1
        });
      }
      return {
        ...prev,
        cart
      };
    });
    showToast('已加入购物车');
  }, [showToast]);
  const removeFromCart = useCallback((storeId, itemId) => {
    setState(prev => {
      let cart = [...prev.cart];
      const existing = cart.find(i => i.storeId === storeId && i.itemId === itemId);
      if (existing) {
        if (existing.qty > 1) {
          existing.qty -= 1;
        } else {
          cart = cart.filter(i => !(i.storeId === storeId && i.itemId === itemId));
        }
      }
      return {
        ...prev,
        cart
      };
    });
  }, []);
  const getCartByStore = useCallback(storeId => {
    return state.cart.filter(i => i.storeId === storeId);
  }, [state.cart]);
  const getCartTotal = useCallback(storeId => {
    const items = state.cart.filter(i => i.storeId === storeId);
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }, [state.cart]);
  const getCartCount = useCallback(storeId => {
    const items = state.cart.filter(i => i.storeId === storeId);
    return items.reduce((sum, i) => sum + i.qty, 0);
  }, [state.cart]);
  const getTotalCartCount = useCallback(() => {
    return state.cart.reduce((sum, i) => sum + i.qty, 0);
  }, [state.cart]);
  const clearStoreCart = useCallback(storeId => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(i => i.storeId !== storeId)
    }));
  }, []);
  const addOrder = useCallback(order => {
    setState(prev => ({
      ...prev,
      orders: [order, ...prev.orders]
    }));
  }, []);
  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setState(prev => ({
      ...prev,
      orders: prev.orders.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            status: newStatus
          };
        }
        return o;
      })
    }));
  }, []);
  const toggleFavorite = useCallback(storeId => {
    setState(prev => {
      const favorites = [...prev.favorites];
      const idx = favorites.indexOf(storeId);
      if (idx > -1) {
        favorites.splice(idx, 1);
        showToast('已取消收藏');
      } else {
        favorites.push(storeId);
        showToast('已收藏');
      }
      return {
        ...prev,
        favorites
      };
    });
  }, [showToast]);
  const isFavorite = useCallback(storeId => {
    return state.favorites.includes(storeId);
  }, [state.favorites]);
  const addAddress = useCallback(address => {
    setState(prev => {
      const addresses = [...prev.addresses];
      if (address.isDefault) {
        addresses.forEach(a => a.isDefault = false);
      }
      addresses.push({
        ...address,
        id: 'a' + Date.now()
      });
      return {
        ...prev,
        addresses
      };
    });
    showToast('地址添加成功');
  }, [showToast]);
  const updateAddress = useCallback((id, address) => {
    setState(prev => {
      const addresses = prev.addresses.map(a => {
        if (a.id === id) {
          return {
            ...a,
            ...address
          };
        }
        if (address.isDefault) {
          return {
            ...a,
            isDefault: false
          };
        }
        return a;
      });
      return {
        ...prev,
        addresses
      };
    });
    showToast('地址更新成功');
  }, [showToast]);
  const deleteAddress = useCallback(id => {
    setState(prev => ({
      ...prev,
      addresses: prev.addresses.filter(a => a.id !== id)
    }));
    showToast('地址已删除');
  }, [showToast]);
  const getDefaultAddress = useCallback(() => {
    return state.addresses.find(a => a.isDefault) || state.addresses[0];
  }, [state.addresses]);
  const addSearchHistory = useCallback(keyword => {
    setState(prev => {
      let history = prev.searchHistory.filter(h => h !== keyword);
      history.unshift(keyword);
      history = history.slice(0, 10);
      return {
        ...prev,
        searchHistory: history
      };
    });
  }, []);
  const clearSearchHistory = useCallback(() => {
    setState(prev => ({
      ...prev,
      searchHistory: []
    }));
  }, []);
  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `美团数据_${new Date().toLocaleDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('数据导出成功');
  }, [state, showToast]);
  const importData = useCallback(dataStr => {
    try {
      const data = JSON.parse(dataStr);
      setState(prev => ({
        ...prev,
        ...data
      }));
      showToast('数据导入成功');
      return true;
    } catch (e) {
      showToast('数据格式错误，导入失败');
      return false;
    }
  }, [showToast]);
  const cities = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '重庆'];
  const setCity = useCallback(city => {
    setState(prev => ({
      ...prev,
      city
    }));
    showToast(`已切换到${city}`);
  }, [showToast]);
  const updateProfile = useCallback(updates => {
    setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...updates
      }
    }));
    showToast('保存成功');
  }, [showToast]);
  const value = {
    state,
    setState,
    toast,
    showToast,
    currentPage,
    pageParams,
    navigate,
    goBack,
    addToCart,
    removeFromCart,
    getCartByStore,
    getCartTotal,
    getCartCount,
    getTotalCartCount,
    clearStoreCart,
    addOrder,
    updateOrderStatus,
    toggleFavorite,
    isFavorite,
    addAddress,
    updateAddress,
    deleteAddress,
    getDefaultAddress,
    addSearchHistory,
    clearSearchHistory,
    exportData,
    importData,
    cities,
    setCity,
    updateProfile
  };
  return /*#__PURE__*/React.createElement(AppContext.Provider, {
    value: value
  }, children, toast && /*#__PURE__*/React.createElement("div", {
    className: "toast"
  }, toast));
}
const useApp = () => useContext(AppContext);

// ============== 通用组件 ==============

function TabBar() {
  const {
    currentPage,
    navigate,
    getTotalCartCount
  } = useApp();
  const cartCount = getTotalCartCount();
  const tabs = [{
    key: 'home',
    label: '首页',
    icon: '🏠'
  }, {
    key: 'category',
    label: '分类',
    icon: '📋'
  }, {
    key: 'cart',
    label: '购物车',
    icon: '🛒',
    badge: cartCount
  }, {
    key: 'profile',
    label: '我的',
    icon: '👤'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "tabbar"
  }, tabs.map(tab => /*#__PURE__*/React.createElement("div", {
    key: tab.key,
    className: `tab-item ${currentPage === tab.key ? 'active' : ''}`,
    onClick: () => navigate(tab.key)
  }, /*#__PURE__*/React.createElement("span", {
    className: "tab-icon"
  }, tab.icon), /*#__PURE__*/React.createElement("span", null, tab.label), tab.badge > 0 && /*#__PURE__*/React.createElement("span", {
    className: "tab-badge"
  }, tab.badge))));
}
function TopHeader({
  onSearchClick
}) {
  const {
    navigate,
    state,
    cities,
    setCity
  } = useApp();
  const [showCityPicker, setShowCityPicker] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "top-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "location",
    onClick: () => setShowCityPicker(true)
  }, /*#__PURE__*/React.createElement("span", null, "📍"), /*#__PURE__*/React.createElement("span", null, state.city), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10
    }
  }, "▼")), /*#__PURE__*/React.createElement("div", {
    className: "search-bar",
    onClick: () => navigate('search')
  }, /*#__PURE__*/React.createElement("span", null, "🔍"), /*#__PURE__*/React.createElement("span", null, "搜索商家、商品"))), showCityPicker && /*#__PURE__*/React.createElement("div", {
    className: "city-picker-mask",
    onClick: () => setShowCityPicker(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "city-picker",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "city-picker-title"
  }, "选择城市"), /*#__PURE__*/React.createElement("div", {
    className: "city-picker-close",
    onClick: () => setShowCityPicker(false)
  }, "✕"), /*#__PURE__*/React.createElement("div", {
    className: "city-list"
  }, cities.map(city => /*#__PURE__*/React.createElement("div", {
    key: city,
    className: `city-item ${state.city === city ? 'active' : ''}`,
    onClick: () => {
      setCity(city);
      setShowCityPicker(false);
    }
  }, city))))));
}

// ============== 首页 ==============
function HomePage() {
  const {
    navigate
  } = useApp();
  const {
    categories,
    stores
  } = DATA;
  const topStores = [...stores].sort((a, b) => b.rating - a.rating).slice(0, 8);
  return /*#__PURE__*/React.createElement("div", {
    className: "page-content"
  }, /*#__PURE__*/React.createElement(TopHeader, null), /*#__PURE__*/React.createElement("div", {
    className: "banner-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "banner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "banner-title"
  }, "新人专享 立减20元"), /*#__PURE__*/React.createElement("div", {
    className: "banner-subtitle"
  }, "美食送到家 首单立减 限时特惠")))), /*#__PURE__*/React.createElement("div", {
    className: "category-grid"
  }, categories.map(cat => /*#__PURE__*/React.createElement("div", {
    key: cat.id,
    className: "cat-item",
    onClick: () => navigate('category', {
      categoryId: cat.id
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "cat-icon",
    style: {
      background: cat.color
    }
  }, cat.icon), /*#__PURE__*/React.createElement("span", null, cat.name)))), /*#__PURE__*/React.createElement("div", {
    className: "section-title recommended-section-title"
  }, /*#__PURE__*/React.createElement("span", null, "推荐商家"), /*#__PURE__*/React.createElement("span", {
    className: "section-more",
    onClick: () => navigate('category', {
      categoryId: 'all'
    })
  }, "查看全部 ›")), /*#__PURE__*/React.createElement("div", {
    className: "store-list recommended-stores"
  }, topStores.map(store => /*#__PURE__*/React.createElement(StoreCard, {
    key: store.id,
    store: store
  }))));
}
function StoreCard({
  store,
  from
}) {
  const {
    navigate,
    isFavorite,
    toggleFavorite
  } = useApp();
  const favorite = isFavorite(store.id);
  const [bannerImg, setBannerImg] = useState(null);
  const fileRef = useRef(null);
  const handleClick = () => {
    const params = {
      storeId: store.id
    };
    if (from === 'category') {
      params.from = 'category';
    }
    navigate('storeDetail', params);
  };
  const handleBannerClick = e => {
    e.stopPropagation();
    if (fileRef.current) fileRef.current.click();
  };
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setBannerImg(ev.target.result);
    reader.readAsDataURL(file);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "store-card",
    onClick: handleClick
  }, /*#__PURE__*/React.createElement("div", {
    className: "store-banner",
    style: bannerImg ? {
      backgroundImage: `url(${bannerImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    } : {
      background: store.bannerColor
    },
    onClick: handleBannerClick
  }, !bannerImg && /*#__PURE__*/React.createElement("span", {
    className: "store-banner-upload-hint"
  }, "点击更换图片"), /*#__PURE__*/React.createElement("span", {
    className: "store-tag"
  }, store.tags[0] || '热销'), /*#__PURE__*/React.createElement("div", {
    className: "store-avatar"
  }, store.avatar), /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: "image/*",
    style: {
      display: 'none'
    },
    onChange: handleFileChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "store-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "store-name-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "store-name"
  }, store.name), /*#__PURE__*/React.createElement("span", {
    className: `store-fav ${favorite ? 'active' : ''}`,
    onClick: e => {
      e.stopPropagation();
      toggleFavorite(store.id);
    }
  }, favorite ? '❤️' : '🤍')), /*#__PURE__*/React.createElement("div", {
    className: "store-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rating"
  }, "★ ", store.rating), /*#__PURE__*/React.createElement("span", null, "月售", store.monthSales, "+"), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, "·"), /*#__PURE__*/React.createElement("span", null, store.distance), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, "·"), /*#__PURE__*/React.createElement("span", null, store.deliveryTime)), /*#__PURE__*/React.createElement("div", {
    className: "store-tags"
  }, store.tags.map((tag, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "tag"
  }, tag)))));
}

// ============== 分类页 ==============
function CategoryPage() {
  const {
    pageParams,
    navigate
  } = useApp();
  const {
    categories,
    stores
  } = DATA;
  const [activeCat, setActiveCat] = useState(pageParams.categoryId || 'all');
  const filteredStores = activeCat === 'all' ? stores : stores.filter(s => s.category === activeCat);
  return /*#__PURE__*/React.createElement("div", {
    className: "page-content",
    style: {
      paddingBottom: 60,
      background: '#f5f5f5'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-header",
    style: {
      background: 'linear-gradient(180deg, #FFD101 0%, #FFE14A 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "back-btn",
    onClick: () => navigate('home')
  }, "←"), /*#__PURE__*/React.createElement("div", {
    className: "nav-title"
  }, "美食"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: 'calc(100vh - 60px - 52px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "menu-sidebar",
    style: {
      position: 'sticky',
      top: 0,
      height: 'calc(100vh - 60px - 52px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: `menu-cat-item ${activeCat === 'all' ? 'active' : ''}`,
    onClick: () => setActiveCat('all')
  }, "全部"), categories.map(cat => /*#__PURE__*/React.createElement("div", {
    key: cat.id,
    className: `menu-cat-item ${activeCat === cat.id ? 'active' : ''}`,
    onClick: () => setActiveCat(cat.id)
  }, cat.name))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '10px 12px'
    }
  }, filteredStores.map(store => /*#__PURE__*/React.createElement(StoreCard, {
    key: store.id,
    store: store,
    from: "category"
  })), filteredStores.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "🍽️"), /*#__PURE__*/React.createElement("div", {
    className: "empty-text"
  }, "暂无商家")))));
}

// ============== 搜索页 ==============
function SearchPage() {
  const {
    navigate,
    addSearchHistory,
    state,
    clearSearchHistory
  } = useApp();
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef(null);
  const hotWords = ['肯德基', '奶茶', '汉堡', '炸鸡', '披萨', '麻辣烫', '咖啡', '蛋糕'];
  const handleSearch = kw => {
    if (kw.trim()) {
      addSearchHistory(kw.trim());
    }
  };
  const filteredStores = keyword.trim() ? DATA.stores.filter(s => s.name.includes(keyword.trim())) : [];
  return /*#__PURE__*/React.createElement("div", {
    className: "search-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-input-wrap"
  }, /*#__PURE__*/React.createElement("span", null, "🔍"), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    className: "search-input",
    placeholder: "搜索商家、商品",
    value: keyword,
    onChange: e => setKeyword(e.target.value),
    onKeyDown: e => e.key === 'Enter' && handleSearch(keyword),
    autoFocus: true
  }), keyword && /*#__PURE__*/React.createElement("span", {
    onClick: () => setKeyword('')
  }, "✕")), /*#__PURE__*/React.createElement("span", {
    className: "search-cancel",
    onClick: () => navigate('home')
  }, "取消")), keyword.trim() ? /*#__PURE__*/React.createElement("div", {
    className: "search-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-section-title"
  }, "商家"), filteredStores.length > 0 ? filteredStores.map(store => /*#__PURE__*/React.createElement(StoreCard, {
    key: store.id,
    store: store
  })) : /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "🔍"), /*#__PURE__*/React.createElement("div", {
    className: "empty-text"
  }, "没有找到相关商家"))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "search-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-section-title"
  }, "搜索历史"), state.searchHistory.length > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, state.searchHistory.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "search-history-item",
    onClick: () => setKeyword(h)
  }, /*#__PURE__*/React.createElement("span", null, h), /*#__PURE__*/React.createElement("span", {
    className: "search-del"
  }, "✕"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 20,
      color: '#999',
      fontSize: 12
    },
    onClick: clearSearchHistory
  }, "清空搜索历史")) : /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#999',
      fontSize: 13
    }
  }, "暂无搜索历史")), /*#__PURE__*/React.createElement("div", {
    className: "search-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "search-section-title"
  }, "热门搜索"), /*#__PURE__*/React.createElement("div", {
    className: "search-tags"
  }, hotWords.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "search-tag",
    onClick: () => setKeyword(w)
  }, w))))));
}

// ============== 店铺详情页 ==============
function StoreDetailPage() {
  const {
    pageParams,
    navigate,
    addToCart,
    removeFromCart,
    getCartByStore,
    getCartTotal,
    getCartCount,
    isFavorite,
    toggleFavorite,
    showToast
  } = useApp();
  const storeId = pageParams.storeId;
  const from = pageParams.from || 'home';
  const store = DATA.stores.find(s => s.id === storeId);
  const handleClose = () => {
    if (from === 'category') {
      navigate('category', {
        categoryId: store?.category || 'all'
      });
    } else {
      navigate('home');
    }
  };
  const [activeTab, setActiveTab] = useState('menu');
  const [activeCat, setActiveCat] = useState(store?.menus?.categories?.[0]?.id || '');
  const [searchKeyword, setSearchKeyword] = useState('');
  const menuRef = useRef(null);
  useEffect(() => {
    if (store && store.menus && store.menus.categories.length > 0) {
      setActiveCat(store.menus.categories[0].id);
    }
  }, [storeId]);
  if (!store) {
    return /*#__PURE__*/React.createElement("div", {
      className: "page-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "nav-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "back-btn",
      onClick: () => navigate('home')
    }, "←"), /*#__PURE__*/React.createElement("div", {
      className: "nav-title"
    }, "店铺详情")), /*#__PURE__*/React.createElement("div", {
      className: "empty-state"
    }, /*#__PURE__*/React.createElement("div", {
      className: "empty-icon"
    }, "🏪"), /*#__PURE__*/React.createElement("div", {
      className: "empty-text"
    }, "店铺不存在")));
  }
  const cartItems = getCartByStore(storeId);
  const cartTotal = getCartTotal(storeId);
  const cartCount = getCartCount(storeId);
  const favorite = isFavorite(storeId);
  const minOrderMet = cartTotal >= store.minOrder;
  const filteredItems = searchKeyword.trim() ? store.menus.items.filter(i => i.name.includes(searchKeyword.trim())) : store.menus.items.filter(i => i.categoryId === activeCat);
  const getItemQty = itemId => {
    const item = cartItems.find(i => i.itemId === itemId);
    return item ? item.qty : 0;
  };
  const handleCatClick = catId => {
    setActiveCat(catId);
    setSearchKeyword('');
  };
  const handleCheckout = () => {
    if (!minOrderMet) {
      showToast(`还差¥${(store.minOrder - cartTotal).toFixed(2)}起送`);
      return;
    }
    navigate('checkout', {
      storeId
    });
  };
  const handleShare = () => {
    showToast('分享链接已复制');
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "store-detail-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "store-detail-decoration"
  }, store.avatar), /*#__PURE__*/React.createElement("div", {
    className: "store-back-btn",
    onClick: handleClose
  }, "←"), /*#__PURE__*/React.createElement("div", {
    className: "store-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "store-action-btn",
    onClick: handleShare
  }, "📤"), /*#__PURE__*/React.createElement("div", {
    className: "store-action-btn",
    onClick: () => toggleFavorite(storeId)
  }, favorite ? '❤️' : '🤍'), /*#__PURE__*/React.createElement("div", {
    className: "store-action-btn",
    onClick: handleClose
  }, "✕")), /*#__PURE__*/React.createElement("div", {
    className: "store-detail-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "store-detail-avatar"
  }, store.avatar), /*#__PURE__*/React.createElement("div", {
    className: "store-detail-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "store-detail-name"
  }, store.name), /*#__PURE__*/React.createElement("div", {
    className: "store-detail-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rating"
  }, "★ ", store.rating), /*#__PURE__*/React.createElement("span", null, "月售", store.monthSales, "+"), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, "·"), /*#__PURE__*/React.createElement("span", null, store.deliveryTime)), /*#__PURE__*/React.createElement("div", {
    className: "store-detail-meta",
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", null, "起送¥", store.minOrder), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, "·"), /*#__PURE__*/React.createElement("span", null, "配送费¥", store.deliveryFee))))), /*#__PURE__*/React.createElement("div", {
    className: "store-notice"
  }, /*#__PURE__*/React.createElement("span", null, "📢"), /*#__PURE__*/React.createElement("span", null, store.notice)), /*#__PURE__*/React.createElement("div", {
    className: "store-tabs"
  }, /*#__PURE__*/React.createElement("div", {
    className: `store-tab ${activeTab === 'menu' ? 'active' : ''}`,
    onClick: () => setActiveTab('menu')
  }, "点餐"), /*#__PURE__*/React.createElement("div", {
    className: `store-tab ${activeTab === 'review' ? 'active' : ''}`,
    onClick: () => setActiveTab('review')
  }, "评价"), /*#__PURE__*/React.createElement("div", {
    className: `store-tab ${activeTab === 'merchant' ? 'active' : ''}`,
    onClick: () => setActiveTab('merchant')
  }, "商家")), activeTab === 'menu' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 15px',
      background: '#fff',
      borderBottom: '1px solid #f5f5f5'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#f5f5f5',
      borderRadius: 20,
      padding: '8px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#999'
    }
  }, "🔍"), /*#__PURE__*/React.createElement("input", {
    style: {
      flex: 1,
      background: 'transparent',
      fontSize: 13
    },
    placeholder: "搜索店内商品",
    value: searchKeyword,
    onChange: e => setSearchKeyword(e.target.value)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "menu-container",
    ref: menuRef,
    style: {
      height: 'calc(100vh - 60px - 200px - 44px - 50px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "menu-sidebar"
  }, store.menus.categories.map(cat => /*#__PURE__*/React.createElement("div", {
    key: cat.id,
    className: `menu-cat-item ${activeCat === cat.id && !searchKeyword ? 'active' : ''}`,
    onClick: () => handleCatClick(cat.id)
  }, cat.name))), /*#__PURE__*/React.createElement("div", {
    className: "menu-main"
  }, !searchKeyword && store.menus.categories.map(cat => activeCat === cat.id && /*#__PURE__*/React.createElement("div", {
    key: cat.id
  }, /*#__PURE__*/React.createElement("div", {
    className: "menu-cat-title"
  }, cat.name), store.menus.items.filter(i => i.categoryId === cat.id).map(item => /*#__PURE__*/React.createElement(MenuItem, {
    key: item.id,
    item: item,
    qty: getItemQty(item.id),
    onAdd: () => addToCart(storeId, item),
    onRemove: () => removeFromCart(storeId, item.id)
  })))), searchKeyword && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "menu-cat-title"
  }, "搜索结果"), filteredItems.length > 0 ? filteredItems.map(item => /*#__PURE__*/React.createElement(MenuItem, {
    key: item.id,
    item: item,
    qty: getItemQty(item.id),
    onAdd: () => addToCart(storeId, item),
    onRemove: () => removeFromCart(storeId, item.id)
  })) : /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "🔍"), /*#__PURE__*/React.createElement("div", {
    className: "empty-text"
  }, "没有找到相关商品")))))), activeTab === 'review' && /*#__PURE__*/React.createElement(ReviewSection, {
    store: store
  }), activeTab === 'merchant' && /*#__PURE__*/React.createElement(MerchantInfo, {
    store: store
  }), activeTab === 'menu' && /*#__PURE__*/React.createElement("div", {
    className: "cart-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cart-bar-left",
    onClick: () => navigate('cart')
  }, /*#__PURE__*/React.createElement("div", {
    className: "cart-icon-wrap"
  }, "🛒", cartCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "cart-badge-num"
  }, cartCount)), cartCount > 0 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cart-total"
  }, /*#__PURE__*/React.createElement("small", null, "¥"), cartTotal.toFixed(2)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: '#999'
    }
  }, "配送费¥", store.deliveryFee)) : /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#999',
      fontSize: 12
    }
  }, "未选购商品")), /*#__PURE__*/React.createElement("button", {
    className: `cart-submit-btn ${minOrderMet ? '' : 'disabled'}`,
    onClick: handleCheckout
  }, minOrderMet ? '去结算' : `¥${store.minOrder}起送`)));
}
function MenuItem({
  item,
  qty,
  onAdd,
  onRemove
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "menu-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "menu-item-img"
  }, item.emoji), /*#__PURE__*/React.createElement("div", {
    className: "menu-item-info"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "menu-item-name"
  }, item.name, item.tag && /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#FFF5E6',
      color: '#FF6B00',
      fontSize: 10,
      padding: '1px 5px',
      borderRadius: 3,
      marginLeft: 6
    }
  }, item.tag)), /*#__PURE__*/React.createElement("div", {
    className: "menu-item-desc"
  }, item.desc), /*#__PURE__*/React.createElement("div", {
    className: "menu-item-sales"
  }, "月售", item.sales)), /*#__PURE__*/React.createElement("div", {
    className: "menu-item-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "menu-item-price"
  }, /*#__PURE__*/React.createElement("small", null, "¥"), item.price), qty > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "qty-control"
  }, /*#__PURE__*/React.createElement("button", {
    className: "qty-btn",
    onClick: onRemove
  }, "−"), /*#__PURE__*/React.createElement("span", {
    className: "qty-num"
  }, qty), /*#__PURE__*/React.createElement("button", {
    className: "qty-btn plus",
    onClick: onAdd
  }, "+")) : /*#__PURE__*/React.createElement("button", {
    className: "add-btn",
    onClick: onAdd
  }, "+"))));
}

// ============== 评价模块 ==============
function ReviewSection({
  store
}) {
  const [filter, setFilter] = useState('all');
  const [likedReviews, setLikedReviews] = useState({});
  const getReviewRating = rating => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };
  const filteredReviews = store.reviews.filter(r => {
    if (filter === 'all') return true;
    if (filter === 'good') return r.rating >= 4;
    if (filter === 'mid') return r.rating === 3;
    if (filter === 'bad') return r.rating <= 2;
    if (filter === 'hasImg') return r.images && r.images.length > 0;
    return true;
  });
  const goodRate = (store.reviews.filter(r => r.rating >= 4).length / store.reviews.length * 100).toFixed(0);
  const avgTaste = (store.rating * 0.9 + Math.random() * 0.5).toFixed(1);
  const avgPack = (store.rating * 0.85 + Math.random() * 0.5).toFixed(1);
  const avgDelivery = (store.rating * 0.8 + Math.random() * 0.5).toFixed(1);
  const toggleLike = reviewId => {
    setLikedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };
  const filters = [{
    key: 'all',
    label: '全部'
  }, {
    key: 'good',
    label: '好评'
  }, {
    key: 'mid',
    label: '中评'
  }, {
    key: 'bad',
    label: '差评'
  }, {
    key: 'hasImg',
    label: '有图'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "reviews-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-summary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-score"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-score-big"
  }, store.rating), /*#__PURE__*/React.createElement("div", {
    className: "review-score-stars"
  }, '★'.repeat(Math.round(store.rating)))), /*#__PURE__*/React.createElement("div", {
    className: "review-detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-detail-row"
  }, /*#__PURE__*/React.createElement("span", null, "口味"), /*#__PURE__*/React.createElement("div", {
    className: "review-rate-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-rate-fill",
    style: {
      width: `${avgTaste * 20}%`
    }
  })), /*#__PURE__*/React.createElement("span", null, avgTaste)), /*#__PURE__*/React.createElement("div", {
    className: "review-detail-row"
  }, /*#__PURE__*/React.createElement("span", null, "包装"), /*#__PURE__*/React.createElement("div", {
    className: "review-rate-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-rate-fill",
    style: {
      width: `${avgPack * 20}%`
    }
  })), /*#__PURE__*/React.createElement("span", null, avgPack)), /*#__PURE__*/React.createElement("div", {
    className: "review-detail-row"
  }, /*#__PURE__*/React.createElement("span", null, "配送"), /*#__PURE__*/React.createElement("div", {
    className: "review-rate-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-rate-fill",
    style: {
      width: `${avgDelivery * 20}%`
    }
  })), /*#__PURE__*/React.createElement("span", null, avgDelivery)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: '#666',
      marginBottom: 10
    }
  }, "好评率 ", goodRate, "% · 共 ", store.reviews.length, " 条评价"), /*#__PURE__*/React.createElement("div", {
    className: "review-filters"
  }, filters.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.key,
    className: `review-filter ${filter === f.key ? 'active' : ''}`,
    onClick: () => setFilter(f.key)
  }, f.label))), filteredReviews.map(review => /*#__PURE__*/React.createElement("div", {
    key: review.id,
    className: "review-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-item-row-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-user-avatar"
  }, review.avatar), /*#__PURE__*/React.createElement("div", {
    className: "review-user-name"
  }, review.username)), /*#__PURE__*/React.createElement("div", {
    className: "review-item-row-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "review-star-list"
  }, '★'.repeat(review.rating), '☆'.repeat(5 - review.rating)), /*#__PURE__*/React.createElement("span", {
    className: "review-score-num"
  }, review.rating, "分")), review.content && review.content.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "review-item-row-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-text-body"
  }, review.content)), review.images && review.images.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "review-item-imgs"
  }, review.images.map((img, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "review-img-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-img-box"
  }, /*#__PURE__*/React.createElement("span", {
    className: "review-img-emoji"
  }, img.emoji)), /*#__PURE__*/React.createElement("div", {
    className: "review-img-desc"
  }, img.caption)))), review.tags && review.tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "review-item-tags"
  }, review.tags.map((tag, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "review-tag-text"
  }, tag))), /*#__PURE__*/React.createElement("div", {
    className: "review-item-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: `review-like-btn ${likedReviews[review.id] ? 'active' : ''}`,
    onClick: () => toggleLike(review.id)
  }, "👍 ", review.likes + (likedReviews[review.id] ? 1 : 0))))), filteredReviews.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "💬"), /*#__PURE__*/React.createElement("div", {
    className: "empty-text"
  }, "暂无相关评价")));
}

// ============== 商家信息 ==============
function MerchantInfo({
  store
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "merchant-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "merchant-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "merchant-section-title"
  }, "商家信息"), /*#__PURE__*/React.createElement("div", {
    className: "merchant-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-label"
  }, "商家名称"), /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-value"
  }, store.name)), /*#__PURE__*/React.createElement("div", {
    className: "merchant-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-label"
  }, "营业时间"), /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-value"
  }, store.businessHours)), /*#__PURE__*/React.createElement("div", {
    className: "merchant-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-label"
  }, "联系电话"), /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-value"
  }, store.phone))), /*#__PURE__*/React.createElement("div", {
    className: "merchant-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "merchant-section-title"
  }, "配送信息"), /*#__PURE__*/React.createElement("div", {
    className: "merchant-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-label"
  }, "配送时间"), /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-value"
  }, store.deliveryTime)), /*#__PURE__*/React.createElement("div", {
    className: "merchant-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-label"
  }, "配送费"), /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-value"
  }, "¥", store.deliveryFee)), /*#__PURE__*/React.createElement("div", {
    className: "merchant-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-label"
  }, "起送价"), /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-value"
  }, "¥", store.minOrder)), /*#__PURE__*/React.createElement("div", {
    className: "merchant-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-label"
  }, "距离"), /*#__PURE__*/React.createElement("span", {
    className: "merchant-row-value"
  }, store.distance))), /*#__PURE__*/React.createElement("div", {
    className: "merchant-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "merchant-section-title"
  }, "商家资质"), /*#__PURE__*/React.createElement("div", {
    className: "merchant-cert-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "merchant-cert"
  }, "📜", /*#__PURE__*/React.createElement("span", null, "营业执照")), /*#__PURE__*/React.createElement("div", {
    className: "merchant-cert"
  }, "🍽️", /*#__PURE__*/React.createElement("span", null, "食品经营许可证")))));
}

// ============== 购物车页 ==============
function CartPage() {
  const {
    state,
    navigate,
    addToCart,
    removeFromCart,
    getCartTotal
  } = useApp();
  const storeGroups = {};
  state.cart.forEach(item => {
    if (!storeGroups[item.storeId]) {
      storeGroups[item.storeId] = [];
    }
    storeGroups[item.storeId].push(item);
  });
  const storeIds = Object.keys(storeGroups);
  return /*#__PURE__*/React.createElement("div", {
    className: "cart-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-header",
    style: {
      background: 'linear-gradient(180deg, #FFD101 0%, #FFE14A 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "back-btn",
    onClick: () => navigate('home')
  }, "←"), /*#__PURE__*/React.createElement("div", {
    className: "nav-title"
  }, "购物车"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28
    }
  })), storeIds.length > 0 ? storeIds.map(storeId => {
    const store = DATA.stores.find(s => s.id === storeId);
    const items = storeGroups[storeId];
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    return /*#__PURE__*/React.createElement("div", {
      key: storeId,
      className: "cart-store-group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cart-store-header",
      onClick: () => navigate('storeDetail', {
        storeId
      })
    }, /*#__PURE__*/React.createElement("div", {
      className: "cart-store-avatar"
    }, store?.avatar || '🏪'), /*#__PURE__*/React.createElement("span", null, store?.name || '未知店铺'), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#ccc',
        fontSize: 18,
        marginLeft: 'auto'
      }
    }, "›")), items.map(item => /*#__PURE__*/React.createElement("div", {
      key: item.itemId,
      className: "cart-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cart-item-img"
    }, item.emoji), /*#__PURE__*/React.createElement("div", {
      className: "cart-item-info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "cart-item-name"
    }, item.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "cart-item-price"
    }, "¥", item.price), /*#__PURE__*/React.createElement("div", {
      className: "qty-control"
    }, /*#__PURE__*/React.createElement("button", {
      className: "qty-btn",
      onClick: () => removeFromCart(storeId, item.itemId)
    }, "−"), /*#__PURE__*/React.createElement("span", {
      className: "qty-num"
    }, item.qty), /*#__PURE__*/React.createElement("button", {
      className: "qty-btn plus",
      onClick: () => {
        const store = DATA.stores.find(s => s.id === storeId);
        const menuItem = store?.menus?.items?.find(m => m.id === item.itemId);
        if (menuItem) addToCart(storeId, menuItem);
      }
    }, "+")))))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 15px',
        textAlign: 'right',
        borderTop: '1px solid #f5f5f5'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: '#666'
      }
    }, "合计："), /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#FF6B00',
        fontSize: 16,
        fontWeight: 600
      }
    }, "¥", total.toFixed(2))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 15px 12px',
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("button", {
      style: {
        background: 'linear-gradient(135deg, #FFD101, #FF9500)',
        color: '#333',
        padding: '8px 20px',
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 600
      },
      onClick: () => navigate('checkout', {
        storeId
      })
    }, "去结算")));
  }) : /*#__PURE__*/React.createElement("div", {
    className: "empty-state",
    style: {
      paddingTop: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "🛒"), /*#__PURE__*/React.createElement("div", {
    className: "empty-text"
  }, "购物车是空的"), /*#__PURE__*/React.createElement("button", {
    style: {
      marginTop: 20,
      background: 'linear-gradient(135deg, #FFD101, #FF9500)',
      color: '#333',
      padding: '10px 24px',
      borderRadius: 20,
      fontSize: 14,
      fontWeight: 500
    },
    onClick: () => navigate('home')
  }, "去逛逛")));
}

// ============== 结算页 ==============
function CheckoutPage() {
  const {
    pageParams,
    navigate,
    getCartByStore,
    getDefaultAddress,
    state,
    showToast,
    addOrder,
    clearStoreCart,
    updateOrderStatus
  } = useApp();
  const storeId = pageParams.storeId;
  const store = DATA.stores.find(s => s.id === storeId);
  const cartItems = getCartByStore(storeId);
  const defaultAddress = getDefaultAddress();
  const [payMode, setPayMode] = useState('self'); // self / other / daifu
  const [address, setAddress] = useState(defaultAddress);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [recipient, setRecipient] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = store?.deliveryFee || 0;
  const total = subtotal + deliveryFee - (selectedCoupon ? selectedCoupon.amount : 0);
  const availableCoupons = state.coupons.filter(c => !c.used && subtotal >= c.condition);
  const handleSubmit = () => {
    if (cartItems.length === 0) {
      showToast('购物车是空的');
      return;
    }
    if (payMode === 'other' && (!recipient.name || !recipient.phone || !recipient.address)) {
      showToast('请填写收餐人信息');
      return;
    }
    setShowPasswordModal(true);
  };
  const handleConfirmPayment = () => {
    const finalAddress = payMode === 'other' ? {
      name: recipient.name,
      phone: recipient.phone,
      address: recipient.address
    } : address;
    const order = {
      id: Date.now().toString(),
      storeId,
      storeName: store?.name || '',
      storeAvatar: store?.avatar || '',
      items: [...cartItems],
      subtotal,
      deliveryFee,
      total: Math.max(0, total),
      address: finalAddress,
      payMode,
      status: payMode === 'daifu' ? '待支付' : '配送中',
      payStatus: payMode === 'daifu' ? '待付款' : '已付款',
      time: new Date().toLocaleString(),
      coupon: selectedCoupon,
      deliveryProgress: 0
    };
    addOrder(order);
    clearStoreCart(storeId);
    setShowPasswordModal(false);
    showToast(payMode === 'daifu' ? '代付链接已生成' : '支付成功');
    if (payMode !== 'daifu') {
      setTimeout(() => {
        updateOrderStatus(order.id, '已完成');
      }, 2500);
    }
    setTimeout(() => {
      navigate('orders');
    }, 1500);
  };
  if (!store || cartItems.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "page-content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "nav-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "back-btn",
      onClick: () => navigate('cart')
    }, "←"), /*#__PURE__*/React.createElement("div", {
      className: "nav-title"
    }, "结算")), /*#__PURE__*/React.createElement("div", {
      className: "empty-state"
    }, /*#__PURE__*/React.createElement("div", {
      className: "empty-icon"
    }, "🛒"), /*#__PURE__*/React.createElement("div", {
      className: "empty-text"
    }, "购物车是空的")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "checkout-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "back-btn",
    onClick: () => navigate('storeDetail', {
      storeId
    })
  }, "←"), /*#__PURE__*/React.createElement("div", {
    className: "nav-title"
  }, "确认订单"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "address-section",
    onClick: () => navigate('addressList', {
      selectMode: true
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "address-icon"
  }, "📍"), /*#__PURE__*/React.createElement("div", {
    className: "address-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "address-name"
  }, (payMode === 'other' ? recipient.name : address?.name) || '请选择地址', /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 10,
      fontWeight: 400
    }
  }, payMode === 'other' ? recipient.phone : address?.phone)), /*#__PURE__*/React.createElement("div", {
    className: "address-detail"
  }, payMode === 'other' ? recipient.address : address?.address)), /*#__PURE__*/React.createElement("div", {
    className: "address-arrow"
  }, "›")), /*#__PURE__*/React.createElement("div", {
    className: "checkout-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "checkout-section-title"
  }, store.name), cartItems.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.itemId,
    className: "checkout-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "checkout-item-label"
  }, item.name, " × ", item.qty), /*#__PURE__*/React.createElement("span", {
    className: "checkout-item-value"
  }, "¥", (item.price * item.qty).toFixed(2)))), /*#__PURE__*/React.createElement("div", {
    className: "checkout-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "checkout-item-label"
  }, "配送费"), /*#__PURE__*/React.createElement("span", {
    className: "checkout-item-value"
  }, "¥", deliveryFee.toFixed(2)))), /*#__PURE__*/React.createElement("div", {
    className: "checkout-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "checkout-section-title"
  }, "优惠券"), availableCoupons.length > 0 ? availableCoupons.slice(0, 3).map(coupon => /*#__PURE__*/React.createElement("div", {
    key: coupon.id,
    className: "checkout-item",
    style: {
      cursor: 'pointer'
    },
    onClick: () => setSelectedCoupon(selectedCoupon?.id === coupon.id ? null : coupon)
  }, /*#__PURE__*/React.createElement("span", {
    className: "checkout-item-label"
  }, coupon.name, selectedCoupon?.id === coupon.id && /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#FF6B00',
      marginLeft: 8
    }
  }, "✓")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#FF6B00'
    }
  }, "-¥", coupon.amount))) : /*#__PURE__*/React.createElement("div", {
    className: "checkout-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "checkout-item-label"
  }, "暂无可用优惠券"))), /*#__PURE__*/React.createElement("div", {
    className: "checkout-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "checkout-section-title"
  }, "支付方式"), /*#__PURE__*/React.createElement("div", {
    className: "pay-modes"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pay-mode-item",
    onClick: () => setPayMode('self')
  }, /*#__PURE__*/React.createElement("div", {
    className: "pay-mode-icon"
  }, "👤"), /*#__PURE__*/React.createElement("div", {
    className: "pay-mode-name"
  }, "自己付"), /*#__PURE__*/React.createElement("div", {
    className: `pay-mode-radio ${payMode === 'self' ? 'active' : ''}`
  })), /*#__PURE__*/React.createElement("div", {
    className: "pay-mode-item",
    onClick: () => setPayMode('other')
  }, /*#__PURE__*/React.createElement("div", {
    className: "pay-mode-icon"
  }, "🎁"), /*#__PURE__*/React.createElement("div", {
    className: "pay-mode-name"
  }, "替他人点"), /*#__PURE__*/React.createElement("div", {
    className: `pay-mode-radio ${payMode === 'other' ? 'active' : ''}`
  })), /*#__PURE__*/React.createElement("div", {
    className: "pay-mode-item",
    onClick: () => setPayMode('daifu')
  }, /*#__PURE__*/React.createElement("div", {
    className: "pay-mode-icon"
  }, "💸"), /*#__PURE__*/React.createElement("div", {
    className: "pay-mode-name"
  }, "找朋友代付"), /*#__PURE__*/React.createElement("div", {
    className: `pay-mode-radio ${payMode === 'daifu' ? 'active' : ''}`
  })))), payMode === 'other' && /*#__PURE__*/React.createElement("div", {
    className: "checkout-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "checkout-section-title"
  }, "收餐人信息"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 15px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "收餐人姓名"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "请输入姓名",
    value: recipient.name,
    onChange: e => setRecipient({
      ...recipient,
      name: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "手机号码"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "请输入手机号",
    value: recipient.phone,
    onChange: e => setRecipient({
      ...recipient,
      phone: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "收货地址"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "请输入详细地址",
    value: recipient.address,
    onChange: e => setRecipient({
      ...recipient,
      address: e.target.value
    })
  })))), payMode === 'daifu' && /*#__PURE__*/React.createElement("div", {
    className: "checkout-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "daifu-info"
  }, "💡 生成代付链接后，可分享给好友，好友支付后订单生效")), /*#__PURE__*/React.createElement("div", {
    className: "checkout-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "checkout-total"
  }, "合计：", /*#__PURE__*/React.createElement("span", {
    className: "checkout-total-price"
  }, "¥", Math.max(0, total).toFixed(2))), /*#__PURE__*/React.createElement("button", {
    className: "checkout-btn",
    onClick: handleSubmit
  }, payMode === 'daifu' ? '生成代付链接' : '提交订单')), showPasswordModal && payMode !== 'daifu' && /*#__PURE__*/React.createElement(PasswordModal, {
    amount: Math.max(0, total),
    onClose: () => setShowPasswordModal(false),
    onConfirm: handleConfirmPayment
  }), showPasswordModal && payMode === 'daifu' && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: () => setShowPasswordModal(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-close",
    onClick: () => setShowPasswordModal(false)
  }, "✕"), /*#__PURE__*/React.createElement("div", {
    className: "modal-title"
  }, "生成代付链接"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 48,
      margin: '20px 0'
    }
  }, "🔗"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#666',
      marginBottom: 16,
      lineHeight: 1.6
    }
  }, "代付链接已生成，可分享给好友", /*#__PURE__*/React.createElement("br", null), "好友支付后订单自动生效"), /*#__PURE__*/React.createElement("button", {
    className: "checkout-btn",
    style: {
      width: '100%'
    },
    onClick: handleConfirmPayment
  }, "好的，知道了"))));
}
function PasswordModal({
  amount,
  onClose,
  onConfirm
}) {
  const [password, setPassword] = useState('');
  const {
    showToast
  } = useApp();
  const handleKeyPress = num => {
    if (password.length < 6) {
      const newPwd = password + num;
      setPassword(newPwd);
      if (newPwd.length === 6) {
        setTimeout(() => {
          onConfirm();
        }, 300);
      }
    }
  };
  const handleDelete = () => {
    setPassword(password.slice(0, -1));
  };
  const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'];
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-close",
    onClick: onClose
  }, "✕"), /*#__PURE__*/React.createElement("div", {
    className: "modal-title"
  }, "请输入支付密码"), /*#__PURE__*/React.createElement("div", {
    className: "modal-amount"
  }, /*#__PURE__*/React.createElement("small", null, "¥"), amount.toFixed(2)), /*#__PURE__*/React.createElement("div", {
    className: "password-dots"
  }, [0, 1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `password-dot ${password.length > i ? 'filled' : ''}`
  }, password.length > i ? '•' : ''))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 8
    }
  }, nums.map((num, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    style: {
      padding: '12px 0',
      fontSize: 18,
      fontWeight: 500,
      background: num ? '#f5f5f5' : 'transparent',
      borderRadius: 8,
      color: num ? '#333' : 'transparent',
      cursor: num ? 'pointer' : 'default'
    },
    onClick: () => {
      if (num === '⌫') handleDelete();else if (num) handleKeyPress(num);
    }
  }, num)))));
}

// ============== 订单列表页 ==============
function OrdersPage() {
  const {
    state,
    navigate,
    pageParams
  } = useApp();
  const [activeTab, setActiveTab] = useState(pageParams.tab || 'all');
  useEffect(() => {
    if (pageParams.tab) {
      setActiveTab(pageParams.tab);
    }
  }, [pageParams.tab]);
  const filteredOrders = state.orders.filter(o => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return o.status === '待支付';
    if (activeTab === 'processing') return o.status === '配送中' || o.status === '商家接单' || o.status === '正在前往商家';
    if (activeTab === 'completed') return o.status === '已完成';
    if (activeTab === 'refund') return o.status === '退款中' || o.status === '已退款';
    return true;
  });
  const tabs = [{
    key: 'all',
    label: '全部'
  }, {
    key: 'pending',
    label: '待付款'
  }, {
    key: 'processing',
    label: '配送中'
  }, {
    key: 'completed',
    label: '已完成'
  }, {
    key: 'refund',
    label: '退款'
  }];
  const getStatusText = order => {
    if (order.status === '待支付') return '待付款';
    if (order.status === '配送中') return '配送中';
    if (order.status === '已完成') return '已完成';
    if (order.status === '退款中') return '退款中';
    if (order.status === '已退款') return '已退款';
    return order.status;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "order-list-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-header",
    style: {
      background: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "back-btn",
    onClick: () => navigate('profile')
  }, "←"), /*#__PURE__*/React.createElement("div", {
    className: "nav-title"
  }, "我的订单"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "order-tabs"
  }, tabs.map(tab => /*#__PURE__*/React.createElement("div", {
    key: tab.key,
    className: `order-tab ${activeTab === tab.key ? 'active' : ''}`,
    onClick: () => setActiveTab(tab.key)
  }, tab.label))), filteredOrders.length > 0 ? filteredOrders.map(order => /*#__PURE__*/React.createElement("div", {
    key: order.id,
    className: "order-card",
    onClick: () => navigate('orderDetail', {
      orderId: order.id
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-store-name"
  }, order.storeAvatar, " ", order.storeName), /*#__PURE__*/React.createElement("div", {
    className: `order-status status-${order.status}`
  }, getStatusText(order))), /*#__PURE__*/React.createElement("div", {
    className: "order-items"
  }, order.items.slice(0, 3).map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "order-item-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "order-item-name"
  }, item.emoji, " ", item.name, " × ", item.qty), /*#__PURE__*/React.createElement("span", {
    className: "order-item-price"
  }, "¥", (item.price * item.qty).toFixed(2)))), order.items.length > 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontSize: 12,
      color: '#999',
      padding: '4px 0'
    }
  }, "共", order.items.length, "件商品")), /*#__PURE__*/React.createElement("div", {
    className: "order-card-footer"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "order-total-text"
  }, "实付 ", /*#__PURE__*/React.createElement("span", {
    className: "order-total-price"
  }, "¥", order.total?.toFixed(2) || '0.00')), /*#__PURE__*/React.createElement("div", {
    className: "order-time"
  }, order.time)), /*#__PURE__*/React.createElement("div", {
    className: "order-actions",
    onClick: e => e.stopPropagation()
  }, order.status === '待支付' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "order-action-btn",
    onClick: () => {
      navigate('orderDetail', {
        orderId: order.id
      });
    }
  }, "取消订单"), /*#__PURE__*/React.createElement("button", {
    className: "order-action-btn primary",
    onClick: () => {
      navigate('orderDetail', {
        orderId: order.id
      });
    }
  }, "去支付")), order.status === '配送中' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "order-action-btn",
    onClick: () => {
      navigate('orderDetail', {
        orderId: order.id
      });
    }
  }, "申请退款"), /*#__PURE__*/React.createElement("button", {
    className: "order-action-btn primary",
    onClick: () => {
      navigate('orderDetail', {
        orderId: order.id
      });
    }
  }, "查看配送")), order.status === '已完成' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "order-action-btn",
    onClick: () => {
      navigate('orderDetail', {
        orderId: order.id
      });
    }
  }, "申请售后"), /*#__PURE__*/React.createElement("button", {
    className: "order-action-btn primary",
    onClick: () => {
      navigate('orderDetail', {
        orderId: order.id
      });
    }
  }, "再来一单")), (order.status === '退款中' || order.status === '已退款') && /*#__PURE__*/React.createElement("button", {
    className: "order-action-btn",
    onClick: () => {
      navigate('orderDetail', {
        orderId: order.id
      });
    }
  }, "查看详情"))))) : /*#__PURE__*/React.createElement("div", {
    className: "empty-state",
    style: {
      paddingTop: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "📋"), /*#__PURE__*/React.createElement("div", {
    className: "empty-text"
  }, "暂无订单")));
}

// ============== 订单详情页 ==============
function OrderDetailPage() {
  const {
    state,
    navigate,
    pageParams,
    updateOrderStatus,
    showToast,
    addOrder,
    clearStoreCart
  } = useApp();
  const orderId = pageParams.orderId;
  const order = state.orders.find(o => o.id === orderId);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  useEffect(() => {
    if (order && order.status === '配送中') {
      const timer = setTimeout(() => {
        updateOrderStatus(orderId, '已完成');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [order?.status, orderId, updateOrderStatus]);
  if (!order) {
    return /*#__PURE__*/React.createElement("div", {
      className: "order-detail-page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "nav-header",
      style: {
        background: '#fff',
        borderBottom: '1px solid #f0f0f0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "back-btn",
      onClick: () => navigate('orders')
    }, "←"), /*#__PURE__*/React.createElement("div", {
      className: "nav-title"
    }, "订单详情"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 28
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "empty-state",
      style: {
        paddingTop: 100
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "empty-icon"
    }, "📋"), /*#__PURE__*/React.createElement("div", {
      className: "empty-text"
    }, "订单不存在")));
  }
  const getStatusText = () => {
    if (order.status === '待支付') return '待付款';
    if (order.status === '商家接单') return '商家已接单';
    if (order.status === '正在前往商家') return '骑手正在前往商家';
    if (order.status === '配送中') return '骑手正在配送中';
    if (order.status === '已完成') return '订单已完成';
    if (order.status === '退款中') return '退款中';
    if (order.status === '已退款') return '已退款';
    return order.status;
  };
  const getStatusIcon = () => {
    if (order.status === '待支付') return '💰';
    if (order.status === '商家接单') return '🏪';
    if (order.status === '正在前往商家') return '🚶';
    if (order.status === '配送中') return '🚴';
    if (order.status === '已完成') return '✅';
    if (order.status === '退款中') return '↩️';
    if (order.status === '已退款') return '💸';
    return '📋';
  };
  const handlePay = () => {
    setShowPasswordModal(true);
  };
  const handleConfirmPay = () => {
    updateOrderStatus(orderId, '商家接单');
    setShowPasswordModal(false);
    showToast('支付成功');
    setTimeout(() => {
      updateOrderStatus(orderId, '正在前往商家');
    }, 3000);
    setTimeout(() => {
      updateOrderStatus(orderId, '配送中');
    }, 8000);
    setTimeout(() => {
      updateOrderStatus(orderId, '已完成');
    }, 50000);
  };
  const getDeliverySteps = () => {
    const steps = [{
      key: 'ordered',
      label: '已下单',
      icon: '📝',
      done: true
    }, {
      key: 'paid',
      label: '已支付',
      icon: '💰',
      done: order.status !== '待支付'
    }, {
      key: 'accepted',
      label: '商家接单',
      icon: '🏪',
      done: order.status === '商家接单' || order.status === '正在前往商家' || order.status === '配送中' || order.status === '已完成'
    }, {
      key: 'pickup',
      label: '正在前往商家',
      icon: '🚶',
      done: order.status === '正在前往商家' || order.status === '配送中' || order.status === '已完成'
    }, {
      key: 'delivering',
      label: '配送中',
      icon: '🚴',
      done: order.status === '配送中' || order.status === '已完成'
    }, {
      key: 'completed',
      label: '已送达',
      icon: '✅',
      done: order.status === '已完成'
    }];
    return steps;
  };
  const handleCancelOrder = () => {
    updateOrderStatus(orderId, '已取消');
    showToast('订单已取消');
    setTimeout(() => navigate('orders'), 1000);
  };
  const handleRefund = () => {
    if (!refundReason.trim()) {
      showToast('请填写退款原因');
      return;
    }
    updateOrderStatus(orderId, '退款中');
    setShowRefundModal(false);
    showToast('退款申请已提交');
    setTimeout(() => {
      updateOrderStatus(orderId, '已退款');
      showToast('退款已完成');
    }, 2000);
  };
  const handleReorder = () => {
    const store = DATA.stores.find(s => s.id === order.storeId);
    if (store) {
      navigate('storeDetail', {
        storeId: order.storeId
      });
    }
  };
  const handleReview = () => {
    navigate('review', {
      orderId: order.id
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "order-detail-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-header",
    style: {
      background: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "back-btn",
    onClick: () => navigate('orders')
  }, "←"), /*#__PURE__*/React.createElement("div", {
    className: "nav-title"
  }, "订单详情"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-status"
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-detail-status-icon"
  }, getStatusIcon()), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-status-text"
  }, getStatusText()), order.status === '配送中' && /*#__PURE__*/React.createElement("div", {
    className: "order-detail-status-desc"
  }, "预计2-3分钟后送达"), order.status === '正在前往商家' && /*#__PURE__*/React.createElement("div", {
    className: "order-detail-status-desc"
  }, "骑手正在前往商家取餐"), order.status === '商家接单' && /*#__PURE__*/React.createElement("div", {
    className: "order-detail-status-desc"
  }, "商家正在准备您的餐品"), order.status === '待支付' && /*#__PURE__*/React.createElement("div", {
    className: "order-detail-status-desc"
  }, "请在30分钟内完成支付"), order.status !== '待支付' && order.status !== '退款中' && order.status !== '已退款' && order.status !== '已取消' && /*#__PURE__*/React.createElement("div", {
    className: "delivery-steps"
  }, getDeliverySteps().map((step, i) => /*#__PURE__*/React.createElement("div", {
    key: step.key,
    className: "delivery-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: `delivery-step-icon ${step.done ? 'done' : ''}`
  }, step.icon), /*#__PURE__*/React.createElement("div", {
    className: `delivery-step-label ${step.done ? 'done' : ''}`
  }, step.label), i < getDeliverySteps().length - 1 && /*#__PURE__*/React.createElement("div", {
    className: `delivery-step-line ${step.done ? 'done' : ''}`
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-detail-section-title"
  }, "配送地址"), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-address"
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-detail-address-name"
  }, order.address.name, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#999',
      fontWeight: 400
    }
  }, order.address.phone)), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-address-detail"
  }, order.address.address))), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-detail-section-title"
  }, order.storeAvatar, " ", order.storeName), order.items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "order-detail-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-detail-item-info"
  }, /*#__PURE__*/React.createElement("span", {
    className: "order-detail-item-emoji"
  }, item.emoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "order-detail-item-name"
  }, item.name), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-item-qty"
  }, "× ", item.qty))), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-item-price"
  }, "¥", (item.price * item.qty).toFixed(2))))), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-detail-price-row"
  }, /*#__PURE__*/React.createElement("span", null, "商品小计"), /*#__PURE__*/React.createElement("span", null, "¥", order.subtotal?.toFixed(2) || '0.00')), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-price-row"
  }, /*#__PURE__*/React.createElement("span", null, "配送费"), /*#__PURE__*/React.createElement("span", null, "¥", order.deliveryFee?.toFixed(2) || '0.00')), order.coupon && /*#__PURE__*/React.createElement("div", {
    className: "order-detail-price-row discount"
  }, /*#__PURE__*/React.createElement("span", null, "优惠券"), /*#__PURE__*/React.createElement("span", null, "-¥", order.coupon.amount.toFixed(2))), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-price-row total"
  }, /*#__PURE__*/React.createElement("span", null, "实付金额"), /*#__PURE__*/React.createElement("span", null, "¥", order.total?.toFixed(2) || '0.00'))), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-detail-price-row"
  }, /*#__PURE__*/React.createElement("span", null, "下单时间"), /*#__PURE__*/React.createElement("span", null, order.time)), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-price-row"
  }, /*#__PURE__*/React.createElement("span", null, "订单编号"), /*#__PURE__*/React.createElement("span", null, order.id)), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-price-row"
  }, /*#__PURE__*/React.createElement("span", null, "支付方式"), /*#__PURE__*/React.createElement("span", null, order.payMode === 'daifu' ? '好友代付' : order.payMode === 'other' ? '替他人点' : '自己支付'))), /*#__PURE__*/React.createElement("div", {
    className: "order-detail-bottom"
  }, order.status === '待支付' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "order-detail-btn",
    onClick: handleCancelOrder
  }, "取消订单"), /*#__PURE__*/React.createElement("button", {
    className: "order-detail-btn primary",
    onClick: handlePay
  }, "立即支付")), order.status === '配送中' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "order-detail-btn",
    onClick: () => setShowRefundModal(true)
  }, "申请退款"), /*#__PURE__*/React.createElement("button", {
    className: "order-detail-btn primary",
    onClick: () => showToast('骑手正在快马加鞭配送中~')
  }, "联系骑手")), order.status === '已完成' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "order-detail-btn",
    onClick: () => setShowRefundModal(true)
  }, "申请售后"), /*#__PURE__*/React.createElement("button", {
    className: "order-detail-btn",
    onClick: handleReview
  }, "写评价"), /*#__PURE__*/React.createElement("button", {
    className: "order-detail-btn primary",
    onClick: handleReorder
  }, "再来一单")), order.status === '退款中' && /*#__PURE__*/React.createElement("button", {
    className: "order-detail-btn primary",
    onClick: () => showToast('退款正在处理中，请耐心等待~')
  }, "退款进度"), order.status === '已退款' && /*#__PURE__*/React.createElement("button", {
    className: "order-detail-btn primary",
    onClick: handleReorder
  }, "再来一单")), showPasswordModal && /*#__PURE__*/React.createElement(PasswordModal, {
    onClose: () => setShowPasswordModal(false),
    onConfirm: handleConfirmPay,
    amount: order.total
  }), showRefundModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: () => setShowRefundModal(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-title"
  }, "申请退款"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: '#666',
      marginBottom: 16
    }
  }, "退款金额：¥", order.total?.toFixed(2) || '0.00'), /*#__PURE__*/React.createElement("textarea", {
    className: "refund-textarea",
    placeholder: "请填写退款原因...",
    value: refundReason,
    onChange: e => setRefundReason(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "modal-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "modal-btn",
    onClick: () => setShowRefundModal(false)
  }, "取消"), /*#__PURE__*/React.createElement("button", {
    className: "modal-btn primary",
    onClick: handleRefund
  }, "提交申请")))));
}

// ============== 评价页面 ==============
function ReviewPage() {
  const {
    state,
    navigate,
    pageParams,
    showToast
  } = useApp();
  const orderId = pageParams.orderId;
  const order = state.orders.find(o => o.id === orderId);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const availableTags = ['味道不错', '分量足', '配送快', '包装精美', '性价比高', '推荐菜品'];
  const toggleTag = tag => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };
  const handleSubmit = () => {
    if (!content.trim()) {
      showToast('请输入评价内容');
      return;
    }
    showToast('评价提交成功');
    setTimeout(() => navigate('orderDetail', {
      orderId
    }), 1000);
  };
  if (!order) {
    return /*#__PURE__*/React.createElement("div", {
      className: "review-page"
    }, /*#__PURE__*/React.createElement("div", {
      className: "nav-header",
      style: {
        background: '#fff',
        borderBottom: '1px solid #f0f0f0'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "back-btn",
      onClick: () => navigate('orders')
    }, "←"), /*#__PURE__*/React.createElement("div", {
      className: "nav-title"
    }, "写评价"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 28
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "empty-state",
      style: {
        paddingTop: 100
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "empty-icon"
    }, "📋"), /*#__PURE__*/React.createElement("div", {
      className: "empty-text"
    }, "订单不存在")));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "review-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-header",
    style: {
      background: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "back-btn",
    onClick: () => navigate('orderDetail', {
      orderId
    })
  }, "←"), /*#__PURE__*/React.createElement("div", {
    className: "nav-title"
  }, "写评价"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "review-store-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-store-avatar"
  }, order.storeAvatar), /*#__PURE__*/React.createElement("div", {
    className: "review-store-name"
  }, order.storeName)), /*#__PURE__*/React.createElement("div", {
    className: "review-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-section-title"
  }, "评分"), /*#__PURE__*/React.createElement("div", {
    className: "review-stars"
  }, [1, 2, 3, 4, 5].map(star => /*#__PURE__*/React.createElement("span", {
    key: star,
    className: `review-star ${star <= rating ? 'active' : ''}`,
    onClick: () => setRating(star)
  }, "★")), /*#__PURE__*/React.createElement("span", {
    className: "review-rating-text"
  }, rating === 5 ? '非常满意' : rating === 4 ? '满意' : rating === 3 ? '一般' : rating === 2 ? '不满意' : '非常不满意'))), /*#__PURE__*/React.createElement("div", {
    className: "review-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-section-title"
  }, "评价标签"), /*#__PURE__*/React.createElement("div", {
    className: "review-tags"
  }, availableTags.map(tag => /*#__PURE__*/React.createElement("span", {
    key: tag,
    className: `review-tag ${tags.includes(tag) ? 'active' : ''}`,
    onClick: () => toggleTag(tag)
  }, tag)))), /*#__PURE__*/React.createElement("div", {
    className: "review-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-section-title"
  }, "评价内容"), /*#__PURE__*/React.createElement("textarea", {
    className: "review-textarea",
    placeholder: "说说您的用餐体验吧~",
    value: content,
    onChange: e => setContent(e.target.value),
    maxLength: 500
  }), /*#__PURE__*/React.createElement("div", {
    className: "review-char-count"
  }, content.length, "/500")), /*#__PURE__*/React.createElement("div", {
    className: "review-items"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-section-title"
  }, "评价商品"), order.items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "review-goods-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "review-goods-emoji"
  }, item.emoji), /*#__PURE__*/React.createElement("span", {
    className: "review-goods-name"
  }, item.name)))), /*#__PURE__*/React.createElement("div", {
    className: "review-bottom"
  }, /*#__PURE__*/React.createElement("button", {
    className: "review-submit-btn",
    onClick: handleSubmit
  }, "提交评价")));
}

// ============== 个人中心 ==============
function ProfilePage() {
  const {
    navigate,
    state,
    updateProfile,
    showToast
  } = useApp();
  const avatarInputRef = useRef(null);
  const bgInputRef = useRef(null);
  const [showNameModal, setShowNameModal] = useState(false);
  const [editName, setEditName] = useState(state.profile.name);
  const menuItems = [{
    icon: '❤️',
    text: '我的收藏',
    onClick: () => navigate('favorites')
  }, {
    icon: '🎫',
    text: '优惠券',
    onClick: () => navigate('coupons')
  }, {
    icon: '📍',
    text: '地址管理',
    onClick: () => navigate('addressList')
  }, {
    icon: '⚙️',
    text: '设置',
    onClick: () => navigate('settings')
  }];
  const handleAvatarUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        updateProfile({
          avatarImage: ev.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleBgUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        updateProfile({
          backgroundImage: ev.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSaveName = () => {
    if (editName.trim()) {
      updateProfile({
        name: editName.trim()
      });
      setShowNameModal(false);
    } else {
      showToast('昵称不能为空');
    }
  };
  const headerStyle = state.profile.backgroundImage ? {
    backgroundImage: `url(${state.profile.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {};
  return /*#__PURE__*/React.createElement("div", {
    className: "profile-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-header",
    style: headerStyle,
    onClick: () => bgInputRef.current && bgInputRef.current.click()
  }, /*#__PURE__*/React.createElement("input", {
    ref: bgInputRef,
    type: "file",
    accept: "image/*",
    style: {
      display: 'none'
    },
    onChange: handleBgUpload
  }), /*#__PURE__*/React.createElement("div", {
    className: "profile-avatar-wrap",
    onClick: e => {
      e.stopPropagation();
      avatarInputRef.current && avatarInputRef.current.click();
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: avatarInputRef,
    type: "file",
    accept: "image/*",
    style: {
      display: 'none'
    },
    onChange: handleAvatarUpload
  }), state.profile.avatarImage ? /*#__PURE__*/React.createElement("img", {
    src: state.profile.avatarImage,
    alt: "头像",
    className: "profile-avatar-img"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "profile-avatar"
  }, state.profile.avatar), /*#__PURE__*/React.createElement("div", {
    className: "avatar-edit-icon"
  }, "📷")), /*#__PURE__*/React.createElement("div", {
    className: "profile-info",
    onClick: e => {
      e.stopPropagation();
      setShowNameModal(true);
      setEditName(state.profile.name);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-name"
  }, state.profile.name, /*#__PURE__*/React.createElement("span", {
    className: "profile-edit-icon"
  }, "✏️")), /*#__PURE__*/React.createElement("div", {
    className: "profile-phone"
  }, state.profile.phone)), /*#__PURE__*/React.createElement("div", {
    className: "profile-bg-hint"
  }, "点击更换背景")), /*#__PURE__*/React.createElement("div", {
    className: "order-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-section-title"
  }, /*#__PURE__*/React.createElement("span", null, "我的订单"), /*#__PURE__*/React.createElement("span", {
    className: "order-all",
    onClick: () => navigate('orders')
  }, "全部订单 ›")), /*#__PURE__*/React.createElement("div", {
    className: "order-icons"
  }, /*#__PURE__*/React.createElement("div", {
    className: "order-icon-item",
    onClick: () => navigate('orders', {
      tab: 'pending'
    })
  }, /*#__PURE__*/React.createElement("span", {
    className: "order-icon"
  }, "💰"), /*#__PURE__*/React.createElement("span", null, "待付款")), /*#__PURE__*/React.createElement("div", {
    className: "order-icon-item",
    onClick: () => navigate('orders', {
      tab: 'processing'
    })
  }, /*#__PURE__*/React.createElement("span", {
    className: "order-icon"
  }, "🚴"), /*#__PURE__*/React.createElement("span", null, "配送中")), /*#__PURE__*/React.createElement("div", {
    className: "order-icon-item",
    onClick: () => navigate('orders', {
      tab: 'completed'
    })
  }, /*#__PURE__*/React.createElement("span", {
    className: "order-icon"
  }, "✅"), /*#__PURE__*/React.createElement("span", null, "已完成")), /*#__PURE__*/React.createElement("div", {
    className: "order-icon-item",
    onClick: () => navigate('orders', {
      tab: 'refund'
    })
  }, /*#__PURE__*/React.createElement("span", {
    className: "order-icon"
  }, "↩️"), /*#__PURE__*/React.createElement("span", null, "退款")))), /*#__PURE__*/React.createElement("div", {
    className: "menu-list"
  }, menuItems.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "menu-item-row",
    onClick: item.onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "menu-item-icon"
  }, item.icon), /*#__PURE__*/React.createElement("span", {
    className: "menu-item-text"
  }, item.text), /*#__PURE__*/React.createElement("span", {
    className: "menu-item-arrow"
  }, "›")))), showNameModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: () => setShowNameModal(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-content",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-close",
    onClick: () => setShowNameModal(false)
  }, "✕"), /*#__PURE__*/React.createElement("div", {
    className: "modal-title"
  }, "修改昵称"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    className: "modal-input",
    value: editName,
    onChange: e => setEditName(e.target.value),
    placeholder: "请输入新昵称",
    maxLength: 20
  }), /*#__PURE__*/React.createElement("button", {
    className: "modal-btn",
    onClick: handleSaveName
  }, "保存"))));
}

// ============== 地址管理 ==============
function AddressListPage() {
  const {
    state,
    navigate,
    deleteAddress,
    pageParams
  } = useApp();
  const selectMode = pageParams.selectMode;
  return /*#__PURE__*/React.createElement("div", {
    className: "address-list-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-header",
    style: {
      background: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "back-btn",
    onClick: () => navigate(selectMode ? 'checkout' : 'profile')
  }, "←"), /*#__PURE__*/React.createElement("div", {
    className: "nav-title"
  }, "收货地址"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28
    }
  })), state.addresses.map(addr => /*#__PURE__*/React.createElement("div", {
    key: addr.id,
    className: `address-list-item ${addr.isDefault ? 'active' : ''}`,
    onClick: () => {
      if (selectMode) {
        navigate('checkout', {});
      } else {
        navigate('addressEdit', {
          addressId: addr.id
        });
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "address-list-icon"
  }, "📍"), /*#__PURE__*/React.createElement("div", {
    className: "address-list-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "address-list-name"
  }, addr.name, /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 10,
      fontWeight: 400,
      fontSize: 12,
      color: '#666'
    }
  }, addr.phone), addr.isDefault && /*#__PURE__*/React.createElement("span", {
    className: "default-tag"
  }, "默认")), /*#__PURE__*/React.createElement("div", {
    className: "address-list-detail"
  }, addr.address)), /*#__PURE__*/React.createElement("div", {
    className: "address-edit-btn"
  }, "✏️"))), /*#__PURE__*/React.createElement("div", {
    className: "add-address-btn"
  }, /*#__PURE__*/React.createElement("div", {
    className: "add-address-inner-btn",
    onClick: () => navigate('addressEdit', {})
  }, "+ 新增收货地址")));
}
function AddressEditPage() {
  const {
    pageParams,
    state,
    addAddress,
    updateAddress,
    deleteAddress,
    navigate,
    showToast
  } = useApp();
  const addressId = pageParams.addressId;
  const existing = state.addresses.find(a => a.id === addressId);
  const [form, setForm] = useState(existing || {
    name: '',
    phone: '',
    address: '',
    isDefault: false
  });
  const handleSave = () => {
    if (!form.name || !form.phone || !form.address) {
      showToast('请填写完整信息');
      return;
    }
    if (addressId) {
      updateAddress(addressId, form);
    } else {
      addAddress(form);
    }
    navigate('addressList');
  };
  const handleDelete = () => {
    if (addressId) {
      deleteAddress(addressId);
      navigate('addressList');
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#f5f5f5',
      minHeight: '100vh',
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-header",
    style: {
      background: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "back-btn",
    onClick: () => navigate('addressList')
  }, "←"), /*#__PURE__*/React.createElement("div", {
    className: "nav-title"
  }, addressId ? '编辑地址' : '新增地址'), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      padding: '15px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "收货人"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "请输入姓名",
    value: form.name,
    onChange: e => setForm({
      ...form,
      name: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "手机号码"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "请输入手机号",
    value: form.phone,
    onChange: e => setForm({
      ...form,
      phone: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "详细地址"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "请输入详细地址",
    value: form.address,
    onChange: e => setForm({
      ...form,
      address: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      borderRadius: 4,
      border: `2px solid ${form.isDefault ? '#FF6B00' : '#ddd'}`,
      background: form.isDefault ? '#FF6B00' : '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 14
    },
    onClick: () => setForm({
      ...form,
      isDefault: !form.isDefault
    })
  }, form.isDefault && '✓'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, "设为默认地址"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 480,
      background: '#fff',
      padding: '12px 15px',
      borderTop: '1px solid #eee',
      zIndex: 100
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      background: 'linear-gradient(135deg, #FFD101, #FF9500)',
      color: '#333',
      padding: 12,
      borderRadius: 24,
      fontSize: 15,
      fontWeight: 600
    },
    onClick: handleSave
  }, "保存"), addressId && /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      marginTop: 10,
      color: '#FF4D4F',
      padding: 10,
      fontSize: 14,
      background: 'none'
    },
    onClick: handleDelete
  }, "删除地址")));
}

// ============== 优惠券 ==============
function CouponsPage() {
  const {
    state,
    navigate
  } = useApp();
  return /*#__PURE__*/React.createElement("div", {
    className: "coupon-list-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-header",
    style: {
      background: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "back-btn",
    onClick: () => navigate('profile')
  }, "←"), /*#__PURE__*/React.createElement("div", {
    className: "nav-title"
  }, "优惠券"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28
    }
  })), state.coupons.map(coupon => /*#__PURE__*/React.createElement("div", {
    key: coupon.id,
    className: "coupon-item",
    style: {
      opacity: coupon.used ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "coupon-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "coupon-amount"
  }, /*#__PURE__*/React.createElement("small", null, "¥"), coupon.amount), /*#__PURE__*/React.createElement("div", {
    className: "coupon-condition"
  }, "满", coupon.condition, "可用")), /*#__PURE__*/React.createElement("div", {
    className: "coupon-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "coupon-name"
  }, coupon.name), /*#__PURE__*/React.createElement("div", {
    className: "coupon-expire"
  }, "有效期至 ", coupon.expire), !coupon.used && /*#__PURE__*/React.createElement("div", {
    className: "coupon-use-btn"
  }, "立即使用"), coupon.used && /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#999',
      fontSize: 12
    }
  }, "已使用")))), state.coupons.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "empty-state",
    style: {
      paddingTop: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "🎫"), /*#__PURE__*/React.createElement("div", {
    className: "empty-text"
  }, "暂无优惠券")));
}

// ============== 收藏 ==============
function FavoritesPage() {
  const {
    state,
    navigate
  } = useApp();
  const favStores = DATA.stores.filter(s => state.favorites.includes(s.id));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#f5f5f5',
      minHeight: '100vh',
      paddingBottom: 60
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-header",
    style: {
      background: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "back-btn",
    onClick: () => navigate('profile')
  }, "←"), /*#__PURE__*/React.createElement("div", {
    className: "nav-title"
  }, "我的收藏"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28
    }
  })), favStores.length > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px'
    }
  }, favStores.map(store => /*#__PURE__*/React.createElement(StoreCard, {
    key: store.id,
    store: store
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "empty-state",
    style: {
      paddingTop: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "❤️"), /*#__PURE__*/React.createElement("div", {
    className: "empty-text"
  }, "还没有收藏的店铺")));
}

// ============== 设置页 ==============
function SettingsPage() {
  const {
    navigate,
    exportData,
    importData,
    showToast,
    setState
  } = useApp();
  const fileInputRef = useRef(null);
  const handleImport = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        importData(event.target.result);
      };
      reader.readAsText(file);
    }
  };
  const handleClearData = () => {
    if (confirm('确定要清除所有数据吗？此操作不可恢复！')) {
      localStorage.removeItem(STORAGE_KEY);
      setState(getDefaultData());
      showToast('数据已清除');
    }
  };
  const menuItems = [{
    icon: '📤',
    text: '导出数据',
    onClick: exportData
  }, {
    icon: '📥',
    text: '导入数据',
    onClick: () => fileInputRef.current?.click()
  }, {
    icon: '🗑️',
    text: '清除数据',
    onClick: handleClearData,
    danger: true
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#f5f5f5',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-header",
    style: {
      background: '#fff',
      borderBottom: '1px solid #f0f0f0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "back-btn",
    onClick: () => navigate('profile')
  }, "←"), /*#__PURE__*/React.createElement("div", {
    className: "nav-title"
  }, "设置"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "menu-list",
    style: {
      marginTop: 10
    }
  }, menuItems.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "menu-item-row",
    onClick: item.onClick
  }, /*#__PURE__*/React.createElement("span", {
    className: "menu-item-icon"
  }, item.icon), /*#__PURE__*/React.createElement("span", {
    className: "menu-item-text",
    style: {
      color: item.danger ? '#FF4D4F' : '#333'
    }
  }, item.text), /*#__PURE__*/React.createElement("span", {
    className: "menu-item-arrow"
  }, "›")))), /*#__PURE__*/React.createElement("input", {
    ref: fileInputRef,
    type: "file",
    accept: ".json",
    style: {
      display: 'none'
    },
    onChange: handleImport
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '30px 20px',
      color: '#ccc',
      fontSize: 12
    }
  }, "美团外卖模拟版 v1.0"));
}

// ============== 主应用 ==============
function App() {
  const {
    currentPage
  } = useApp();
  const showTabBar = ['home', 'category', 'cart', 'profile'].includes(currentPage);
  return /*#__PURE__*/React.createElement("div", {
    className: "app-container"
  }, currentPage === 'home' && /*#__PURE__*/React.createElement(HomePage, null), currentPage === 'category' && /*#__PURE__*/React.createElement(CategoryPage, null), currentPage === 'search' && /*#__PURE__*/React.createElement(SearchPage, null), currentPage === 'storeDetail' && /*#__PURE__*/React.createElement(StoreDetailPage, null), currentPage === 'cart' && /*#__PURE__*/React.createElement(CartPage, null), currentPage === 'checkout' && /*#__PURE__*/React.createElement(CheckoutPage, null), currentPage === 'orders' && /*#__PURE__*/React.createElement(OrdersPage, null), currentPage === 'orderDetail' && /*#__PURE__*/React.createElement(OrderDetailPage, null), currentPage === 'review' && /*#__PURE__*/React.createElement(ReviewPage, null), currentPage === 'profile' && /*#__PURE__*/React.createElement(ProfilePage, null), currentPage === 'addressList' && /*#__PURE__*/React.createElement(AddressListPage, null), currentPage === 'addressEdit' && /*#__PURE__*/React.createElement(AddressEditPage, null), currentPage === 'coupons' && /*#__PURE__*/React.createElement(CouponsPage, null), currentPage === 'favorites' && /*#__PURE__*/React.createElement(FavoritesPage, null), currentPage === 'settings' && /*#__PURE__*/React.createElement(SettingsPage, null), showTabBar && /*#__PURE__*/React.createElement(TabBar, null));
}
let mtReactRoot = null;
function mtRenderReactApp() {
  const container = document.getElementById('mtRoot');
  if (!container) return;
  if (!mtReactRoot) {
    mtReactRoot = ReactDOM.createRoot(container);
  }
  mtReactRoot.render(/*#__PURE__*/React.createElement(AppProvider, null, /*#__PURE__*/React.createElement(App, null)));
}
function mtUnmountReactApp() {
  if (mtReactRoot) {
    mtReactRoot.unmount();
    mtReactRoot = null;
  }
}