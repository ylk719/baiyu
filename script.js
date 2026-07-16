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

    // ========== API 设置功能 ==========
    function initApiSettings() {
        const API_HISTORY_KEY = 'censy_api_url_history';
        const API_CONFIG_KEY = 'censy_api_config';
        let apiBaseUrl = '';
        let apiKey = '';
        let apiModels = [];
        let selectedModelIds = [];
        let selectedModel = '';
        let chatHistory = [];

        const urlInput = document.getElementById('censyApiUrl');
        const keyInput = document.getElementById('censyApiKey');
        const testBtn = document.getElementById('censyApiTestBtn');
        const fetchBtn = document.getElementById('censyApiFetchBtn');
        const saveBtn = document.getElementById('censyApiSaveBtn');
        const statusEl = document.getElementById('censyApiStatus');
        const modelsList = document.getElementById('censyApiModelsList');
        const modelsSection = document.getElementById('censyApiModelsSection');
        const modelsCount = document.getElementById('censyApiModelsCount');
        const selectedCountEl = document.getElementById('censyApiSelectedCount');
        const defaultModelWrap = document.getElementById('censyApiDefaultModelWrap');
        const defaultModelSelect = document.getElementById('censyApiDefaultModel');
        const chatBlock = document.getElementById('censyApiChatBlock');
        const chatMessages = document.getElementById('censyApiChatMessages');
        const chatSendBtn = document.getElementById('censyApiChatSend');
        const chatInput = document.getElementById('censyApiChatInput');
        const keyToggle = document.getElementById('censyApiKeyToggle');
        const historyBtn = document.getElementById('censyApiHistoryBtn');
        const historyList = document.getElementById('censyApiHistoryList');

        function getApiUrl() { return urlInput ? urlInput.value.trim() : ''; }
        function getApiKey() { return keyInput ? keyInput.value.trim() : ''; }

        function setApiStatus(msg, type) {
            if (!statusEl) return;
            statusEl.textContent = msg;
            statusEl.className = 'censy-api-status ' + (type || '');
        }

        function saveApiConfig() {
            try {
                localStorage.setItem(API_CONFIG_KEY, JSON.stringify({
                    url: getApiUrl(),
                    key: getApiKey(),
                    model: selectedModel,
                    modelIds: selectedModelIds,
                    models: apiModels
                }));
            } catch(e) {}
        }

        function loadApiConfig() {
            try {
                const config = JSON.parse(localStorage.getItem(API_CONFIG_KEY) || '{}');
                if (config.url && urlInput) {
                    urlInput.value = config.url;
                    apiBaseUrl = config.url.endsWith('/') ? config.url.slice(0, -1) : config.url;
                }
                if (config.key && keyInput) {
                    keyInput.value = config.key;
                    apiKey = config.key;
                }
                if (config.model) selectedModel = config.model;
                if (config.modelIds) selectedModelIds = config.modelIds;
                if (config.models) apiModels = config.models;
            } catch(e) {}
        }

        function saveApiUrlHistory(url) {
            if (!url) return;
            let history = [];
            try { history = JSON.parse(localStorage.getItem(API_HISTORY_KEY) || '[]'); } catch(e) {}
            history = history.filter(h => h !== url);
            history.unshift(url);
            if (history.length > 10) history = history.slice(0, 10);
            try { localStorage.setItem(API_HISTORY_KEY, JSON.stringify(history)); } catch(e) {}
        }

        function renderApiHistory() {
            if (!historyList) return;
            let history = [];
            try { history = JSON.parse(localStorage.getItem(API_HISTORY_KEY) || '[]'); } catch(e) {}
            if (history.length === 0) {
                historyList.style.display = 'none';
                return;
            }
            historyList.innerHTML = history.map((url, idx) =>
                `<div class="censy-api-history-item" data-url="${url}">
                    <span>${url}</span>
                    <span class="censy-api-history-del" data-idx="${idx}">×</span>
                </div>`
            ).join('');
            historyList.style.display = 'block';

            historyList.querySelectorAll('.censy-api-history-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    if (e.target.classList.contains('censy-api-history-del')) {
                        const idx = parseInt(e.target.dataset.idx);
                        let h = [];
                        try { h = JSON.parse(localStorage.getItem(API_HISTORY_KEY) || '[]'); } catch(e2) {}
                        h.splice(idx, 1);
                        try { localStorage.setItem(API_HISTORY_KEY, JSON.stringify(h)); } catch(e2) {}
                        renderApiHistory();
                        return;
                    }
                    const url = this.dataset.url;
                    if (urlInput) urlInput.value = url;
                    historyList.style.display = 'none';
                });
            });
        }

        function updateSelectedCount() {
            if (selectedCountEl) selectedCountEl.textContent = selectedModelIds.length;
        }

        function toggleModel(modelId) {
            const idx = selectedModelIds.indexOf(modelId);
            if (idx > -1) {
                selectedModelIds.splice(idx, 1);
            } else {
                selectedModelIds.push(modelId);
            }

            if (modelsList) {
                modelsList.querySelectorAll('.censy-api-model-item').forEach(item => {
                    item.classList.toggle('selected', selectedModelIds.includes(item.dataset.modelId));
                });
            }

            if (selectedModel && !selectedModelIds.includes(selectedModel)) {
                selectedModel = selectedModelIds.length > 0 ? selectedModelIds[0] : '';
                if (defaultModelSelect) defaultModelSelect.value = selectedModel;
            }

            if (!selectedModel && selectedModelIds.length > 0) {
                selectedModel = selectedModelIds[0];
                if (defaultModelSelect) defaultModelSelect.value = selectedModel;
            }

            updateSelectedCount();
        }

        function bindModelClickEvents() {
            if (!modelsList) return;
            modelsList.querySelectorAll('.censy-api-model-item').forEach(item => {
                item.addEventListener('click', function() {
                    const modelId = this.dataset.modelId;
                    toggleModel(modelId);
                });
            });
        }

        function renderModels(models) {
            if (modelsCount) modelsCount.textContent = models.length;
            if (modelsSection) modelsSection.style.display = 'block';
            if (defaultModelWrap) defaultModelWrap.style.display = 'block';
            if (chatBlock) chatBlock.style.display = 'block';

            if (modelsList) {
                modelsList.innerHTML = models.map((m, idx) => {
                    const id = m.id || m.name || ('model_' + idx);
                    const name = m.name || m.id || id;
                    const isSelected = selectedModelIds.includes(id);
                    return `<div class="censy-api-model-item ${isSelected ? 'selected' : ''}" data-model-id="${id}">
                        <div class="censy-api-model-checkbox"></div>
                        <div class="censy-api-model-info">
                            <div class="censy-api-model-name">${name}</div>
                            <div class="censy-api-model-id">${id}</div>
                        </div>
                    </div>`;
                }).join('');
                bindModelClickEvents();
            }

            if (defaultModelSelect) {
                defaultModelSelect.innerHTML = models.map((m, idx) => {
                    const id = m.id || m.name || ('model_' + idx);
                    return `<option value="${id}">${id}</option>`;
                }).join('');
            }

            updateSelectedCount();
        }

        function restoreSavedModelsUI() {
            if (apiModels.length === 0) return;
            renderModels(apiModels);
            if (selectedModel && defaultModelSelect) {
                defaultModelSelect.value = selectedModel;
            }
        }

        function escapeHtml(str) {
            const div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        function addChatMessage(role, content, isError) {
            if (!chatMessages) return;
            const cls = isError ? 'censy-api-chat-error' : (role === 'user' ? 'censy-api-chat-user' : 'censy-api-chat-assistant');
            const msgEl = document.createElement('div');
            msgEl.className = 'censy-api-chat-msg ' + cls;
            msgEl.textContent = content;
            chatMessages.appendChild(msgEl);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        async function sendChatMessage(text) {
            if (!apiBaseUrl || !apiKey) {
                addChatMessage('system', '请先连接API', true);
                return;
            }
            if (!selectedModel) {
                addChatMessage('system', '请先选择模型', true);
                return;
            }
            if (!text.trim()) return;

            addChatMessage('user', text);
            chatHistory.push({ role: 'user', content: text });

            const chatUrl = apiBaseUrl + '/chat/completions';
            const body = {
                model: selectedModel,
                messages: chatHistory.slice(-20),
                stream: false
            };

            if (chatSendBtn) chatSendBtn.disabled = true;

            try {
                const resp = await fetch(chatUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + apiKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                });

                if (!resp.ok) {
                    const errText = await resp.text().catch(() => '');
                    addChatMessage('system', '请求失败: HTTP ' + resp.status + (errText ? ' - ' + errText.substring(0, 200) : ''), true);
                    if (chatSendBtn) chatSendBtn.disabled = false;
                    return;
                }

                const data = await resp.json();
                const reply = data.choices?.[0]?.message?.content || '(无回复内容)';

                chatHistory.push({ role: 'assistant', content: reply });
                addChatMessage('assistant', reply);
            } catch (err) {
                addChatMessage('system', '请求出错: ' + err.message, true);
            }
            if (chatSendBtn) chatSendBtn.disabled = false;
        }

        if (keyToggle) {
            keyToggle.addEventListener('click', () => {
                if (!keyInput) return;
                keyInput.type = keyInput.type === 'password' ? 'text' : 'password';
            });
        }

        if (historyBtn) {
            historyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!historyList) return;
                if (historyList.style.display === 'none') {
                    renderApiHistory();
                } else {
                    historyList.style.display = 'none';
                }
            });
        }

        document.addEventListener('click', (e) => {
            if (historyList && historyBtn && !historyBtn.contains(e.target) && !historyList.contains(e.target)) {
                historyList.style.display = 'none';
            }
        });

        if (testBtn) {
            const originalText = testBtn.textContent;
            testBtn.addEventListener('click', async () => {
                const url = getApiUrl();
                const key = getApiKey();
                if (!url) { setApiStatus('请输入 API 地址', 'error'); return; }
                if (!key) { setApiStatus('请输入 API Key', 'error'); return; }

                if (selectedModelIds.length > 0) {
                    setApiStatus('正在测试 ' + selectedModelIds.length + ' 个模型...', 'loading');
                    testBtn.disabled = true;
                    testBtn.textContent = '测试中...';

                    const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
                    let successCount = 0;
                    let failCount = 0;

                    for (let i = 0; i < selectedModelIds.length; i++) {
                        const modelId = selectedModelIds[i];
                        try {
                            const resp = await fetch(baseUrl + '/chat/completions', {
                                method: 'POST',
                                headers: {
                                    'Authorization': 'Bearer ' + key,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    model: modelId,
                                    messages: [{ role: 'user', content: 'hi' }],
                                    max_tokens: 5
                                })
                            });
                            if (resp.ok) {
                                successCount++;
                            } else {
                                failCount++;
                            }
                        } catch (e) {
                            failCount++;
                        }
                    }

                    if (failCount === 0) {
                        setApiStatus('✅ 全部 ' + successCount + ' 个模型测试成功！', 'success');
                    } else {
                        setApiStatus('测试完成: ' + successCount + ' 个成功, ' + failCount + ' 个失败', successCount > 0 ? 'success' : 'error');
                    }
                    testBtn.disabled = false;
                    testBtn.textContent = originalText;
                } else {
                    setApiStatus('正在测试连接...', 'loading');
                    testBtn.disabled = true;
                    testBtn.textContent = '测试中...';

                    try {
                        const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
                        const modelsUrl = baseUrl + '/models';
                        const resp = await fetch(modelsUrl, {
                            method: 'GET',
                            headers: { 'Authorization': 'Bearer ' + key }
                        });

                        if (!resp.ok) {
                            const errText = await resp.text().catch(() => '');
                            setApiStatus('连接失败: HTTP ' + resp.status + (errText ? ' - ' + errText.substring(0, 100) : ''), 'error');
                            testBtn.disabled = false;
                            testBtn.textContent = originalText;
                            return;
                        }

                        const contentType = resp.headers.get('content-type') || '';
                        if (contentType.includes('text/html')) {
                            setApiStatus('连接失败: 返回了网页而非API响应，请检查地址是否正确（通常需要以 /v1 结尾）', 'error');
                            testBtn.disabled = false;
                            testBtn.textContent = originalText;
                            return;
                        }

                        const data = await resp.json();
                        const models = data.data || data || [];
                        setApiStatus('连接成功! 发现 ' + models.length + ' 个模型，请点击拉取模型查看列表', 'success');
                    } catch (err) {
                        setApiStatus('连接失败: ' + err.message, 'error');
                    }
                    testBtn.disabled = false;
                    testBtn.textContent = originalText;
                }
            });
        }

        if (fetchBtn) {
            const originalText = fetchBtn.textContent;
            fetchBtn.addEventListener('click', async () => {
                const url = getApiUrl();
                const key = getApiKey();
                if (!url) { setApiStatus('请输入 API 地址', 'error'); return; }
                if (!key) { setApiStatus('请输入 API Key', 'error'); return; }

                setApiStatus('正在拉取模型列表...', 'loading');
                fetchBtn.disabled = true;
                fetchBtn.textContent = '拉取中...';

                try {
                    const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
                    const modelsUrl = baseUrl + '/models';
                    const resp = await fetch(modelsUrl, {
                        method: 'GET',
                        headers: { 'Authorization': 'Bearer ' + key }
                    });

                    if (!resp.ok) {
                        const errText = await resp.text().catch(() => '');
                        setApiStatus('拉取失败: HTTP ' + resp.status + (errText ? ' - ' + errText.substring(0, 100) : ''), 'error');
                        fetchBtn.disabled = false;
                        fetchBtn.textContent = originalText;
                        return;
                    }

                    const contentType = resp.headers.get('content-type') || '';
                    if (contentType.includes('text/html')) {
                        setApiStatus('拉取失败: 返回了网页而非API响应，请检查地址是否正确', 'error');
                        fetchBtn.disabled = false;
                        fetchBtn.textContent = originalText;
                        return;
                    }

                    const data = await resp.json();
                    const models = data.data || data || [];

                    apiBaseUrl = baseUrl;
                    apiKey = key;
                    apiModels = models;

                    saveApiUrlHistory(url);

                    renderModels(models);

                    if (selectedModel && defaultModelSelect) {
                        defaultModelSelect.value = selectedModel;
                    } else if (models.length > 0) {
                        const firstId = models[0].id || models[0].name || '';
                        if (!selectedModelIds.includes(firstId)) {
                            selectedModelIds.push(firstId);
                        }
                        selectedModel = firstId;
                        if (defaultModelSelect) defaultModelSelect.value = selectedModel;
                        if (modelsList) {
                            const firstItem = modelsList.querySelector('.censy-api-model-item');
                            if (firstItem) firstItem.classList.add('selected');
                        }
                        updateSelectedCount();
                    }

                    setApiStatus('拉取成功! 共 ' + models.length + ' 个模型，点击保存配置以永久保存', 'success');
                } catch (err) {
                    setApiStatus('拉取失败: ' + err.message, 'error');
                }
                fetchBtn.disabled = false;
                fetchBtn.textContent = originalText;
            });
        }

        if (saveBtn) {
            const originalText = saveBtn.textContent;
            saveBtn.addEventListener('click', () => {
                const url = getApiUrl();
                const key = getApiKey();
                if (!url) { setApiStatus('请输入 API 地址', 'error'); return; }
                if (!key) { setApiStatus('请输入 API Key', 'error'); return; }
                if (selectedModelIds.length === 0) { setApiStatus('请先拉取模型并勾选至少一个模型', 'error'); return; }
                if (!selectedModel) { setApiStatus('请选择默认模型', 'error'); return; }

                saveBtn.disabled = true;
                saveBtn.textContent = '保存中...';

                saveApiConfig();
                setApiStatus('✅ 配置已保存！共保存 ' + selectedModelIds.length + ' 个模型，默认模型: ' + selectedModel, 'success');

                saveBtn.disabled = false;
                saveBtn.textContent = originalText;
            });
        }

        if (defaultModelSelect) {
            defaultModelSelect.addEventListener('change', function() {
                selectedModel = this.value;
                if (!selectedModelIds.includes(this.value)) {
                    selectedModelIds.push(this.value);
                    if (modelsList) {
                        const item = modelsList.querySelector(`[data-model-id="${this.value}"]`);
                        if (item) item.classList.add('selected');
                    }
                    updateSelectedCount();
                }
            });
        }

        if (chatSendBtn) {
            chatSendBtn.addEventListener('click', () => {
                if (!chatInput) return;
                const text = chatInput.value.trim();
                if (text) {
                    sendChatMessage(text);
                    chatInput.value = '';
                }
            });
        }

        if (chatInput) {
            chatInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    const text = chatInput.value.trim();
                    if (text) {
                        sendChatMessage(text);
                        chatInput.value = '';
                    }
                }
            });
        }

        loadApiConfig();
        restoreSavedModelsUI();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApiSettings);
    } else {
        initApiSettings();
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

/* ==================== 微信信息APP ==================== */
(function() {
    let wxCurrentTab = 'chats';
    let wxChatListCache = null;
    let wxChatListCacheTime = 0;
    let wxRenderChatListTimeout = null;
    
    function debounceRenderChatList() {
        if (wxRenderChatListTimeout) clearTimeout(wxRenderChatListTimeout);
        wxRenderChatListTimeout = setTimeout(() => {
            wxRenderChatList();
        }, 30);
    }
    
    window.wxOpenApp = function() {
        const el = document.getElementById('wxAppMain');
        if (el) el.classList.add('wx-show');
        wxInitData();
        wxSwitchTab('chats');
        debounceRenderChatList();
        wxCloseChatMenu();
        wxCloseChatMorePanel();
    };
    
    window.wxCloseApp = function() {
        const el = document.getElementById('wxAppMain');
        if (el) el.classList.remove('wx-show');
    };
    
    window.wxSwitchTab = function(tab) {
        wxCurrentTab = tab;
        // 切换底部Tab高亮
        const tabItems = document.querySelectorAll('#wxAppMain .wx-tab-item');
        tabItems.forEach(item => {
            if (item.dataset.tab === tab) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        // 切换页面显示
        const tabMap = {
            'chats': 'wxTabChats',
            'contacts': 'wxTabContacts',
            'discover': 'wxTabDiscover',
            'me': 'wxTabMe'
        };
        const pages = document.querySelectorAll('#wxAppMain .wx-tab-page');
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(tabMap[tab]);
        if (targetPage) targetPage.classList.add('active');
    };
    
    // 数据初始化
    function wxInitData() {
        if (!localStorage.getItem('wx_accounts')) {
            const oldUserStr = localStorage.getItem('wx_user');
            let defaultUser = {
                id: 'me',
                avatar: '',
                nickname: '我',
                wxid: 'wxid_' + Math.random().toString(36).substr(2, 10),
                persona: '',
                cover: '',
                signature: ''
            };
            if (oldUserStr) {
                try {
                    const oldUser = JSON.parse(oldUserStr);
                    defaultUser = { ...defaultUser, ...oldUser, id: 'me' };
                } catch (e) {}
            }
            localStorage.setItem('wx_accounts', JSON.stringify([defaultUser]));
            localStorage.setItem('wx_active_account_id', 'me');
        }
        if (!localStorage.getItem('wx_contacts')) {
            localStorage.setItem('wx_contacts', JSON.stringify([]));
        }
        if (!localStorage.getItem('wx_chats')) {
            localStorage.setItem('wx_chats', JSON.stringify([]));
        }
        if (!localStorage.getItem('wx_moments')) {
            localStorage.setItem('wx_moments', JSON.stringify([]));
        }
        if (!localStorage.getItem('wx_messages')) {
            localStorage.setItem('wx_messages', JSON.stringify({}));
        }
        if (!localStorage.getItem('wx_groups')) {
            localStorage.setItem('wx_groups', JSON.stringify([]));
        }
    }

    // 当前聊天ID
    let wxCurrentChatId = null;
    let wxAddContactAvatar = '';
    let wxAddContactBg = '';

    // 渲染聊天列表
    function wxRenderChatList() {
        const listEl = document.getElementById('wxChatList');
        if (!listEl) return;
        
        let chats = [];
        try {
            chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
        } catch (e) {
            chats = [];
        }

        const drafts = wxGetDrafts();
        const chatsKey = JSON.stringify(chats) + '|drafts:' + JSON.stringify(drafts);
        const now = Date.now();
        if (wxChatListCache === chatsKey && now - wxChatListCacheTime < 100) {
            return;
        }
        wxChatListCache = chatsKey;
        wxChatListCacheTime = now;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {
            contacts = [];
        }
        
        if (chats.length === 0) {
            listEl.innerHTML = '<div style="text-align:center;color:#999;padding:100px 0;">暂无聊天</div>';
            return;
        }
        
        const contactMap = new Map();
        contacts.forEach(c => contactMap.set(c.id, c));
        
        listEl.innerHTML = chats.map((chat, index) => {
            let displayName = chat.name || '未命名';
            let avatar = chat.avatar;
            
            if (!chat.type || chat.type !== 'group') {
                const contact = contactMap.get(chat.id);
                if (contact) {
                    displayName = contact.displayName || contact.remark || contact.name || displayName;
                    if (contact.avatar) {
                        avatar = contact.avatar;
                    }
                }
            }

            const firstChar = displayName.charAt(0) || '?';
            const avatarHtml = avatar 
                ? `<img src="${avatar}" alt="">`
                : `<div class="wx-chat-avatar-placeholder">${firstChar}</div>`;
            const unreadHtml = chat.unread > 0 
                ? `<div class="wx-chat-unread">${chat.unread > 99 ? '99+' : chat.unread}</div>` 
                : '';
            const divider = index < chats.length - 1 ? '<div class="wx-chat-divider"></div>' : '';
            const isGroup = chat.type === 'group';
            const clickHandler = isGroup 
                ? `wxOpenGroupChat('${chat.id}')`
                : `wxOpenChat('${chat.id}')`;
            const groupIcon = isGroup ? '<div class="wx-chat-group-tag"></div>' : '';
            // 草稿指示器
            const draftText = drafts[chat.id];
            const previewHtml = draftText
                ? `<span class="wx-draft-indicator">[草稿]</span>${wxEscapeHtml(draftText)}`
                : wxEscapeHtml(chat.lastMessage || '');
            return `
                <div class="wx-chat-item" onclick="${clickHandler}">
                    <div class="wx-chat-avatar">${avatarHtml}${groupIcon}</div>
                    <div class="wx-chat-info">
                        <div class="wx-chat-name">${displayName}</div>
                        <div class="wx-chat-preview">${previewHtml}</div>
                    </div>
                    <div class="wx-chat-meta">
                        <div class="wx-chat-time">${chat.time || ''}</div>
                        ${unreadHtml}
                    </div>
                </div>
                ${divider}
            `;
        }).join('');
    }

    // +号下拉菜单
    window.wxToggleAddMenu = function() {
        const menu = document.getElementById('wxAddMenu');
        if (menu) {
            menu.classList.toggle('show');
        }
    };

    // 点击页面其他地方关闭下拉菜单
    function wxCloseAddMenu() {
        const menu = document.getElementById('wxAddMenu');
        if (menu) {
            menu.classList.remove('show');
        }
    }

    // 发起群聊
    window.wxStartGroupChat = function() {
        wxCloseAddMenu();
        wxInitGroupData();
        wxCreateGroupAvatar = '';
        wxSelectedGroupMembers = [];
        const avatarImg = document.getElementById('wxGroupAvatarImg');
        const nameInput = document.getElementById('wxGroupNameInput');
        const introInput = document.getElementById('wxGroupIntroInput');
        if (avatarImg) { avatarImg.src = ''; avatarImg.style.display = 'none'; }
        if (nameInput) nameInput.value = '';
        if (introInput) introInput.value = '';
        wxRenderGroupMemberList();
        wxRenderSelectedMembers();
        const page = document.getElementById('wxPageCreateGroup');
        if (page) page.classList.add('wx-page-show');
    };

    // 打开添加角色页面
    window.wxOpenAddContact = function() {
        wxCloseAddMenu();
        wxAddContactAvatar = '';
        wxAddContactBg = '';
        const avatarImg = document.getElementById('wxAddAvatarImg');
        const bgImg = document.getElementById('wxAddBgImg');
        const nicknameInput = document.getElementById('wxAddNickname');
        const constellationSelect = document.getElementById('wxAddConstellation');
        const personaTextarea = document.getElementById('wxAddPersona');
        if (avatarImg) { avatarImg.src = ''; avatarImg.style.display = 'none'; }
        if (bgImg) { bgImg.src = ''; bgImg.style.display = 'none'; }
        if (nicknameInput) nicknameInput.value = '';
        if (constellationSelect) constellationSelect.value = '';
        if (personaTextarea) personaTextarea.value = '';
        const page = document.getElementById('wxPageAddContact');
        if (page) page.classList.add('wx-page-show');
    };

    // 关闭添加角色页面
    window.wxCloseAddContact = function() {
        const page = document.getElementById('wxPageAddContact');
        if (page) page.classList.remove('wx-page-show');
    };

    // 保存新角色
    window.wxSaveNewContact = function() {
        const nickname = document.getElementById('wxAddNickname').value.trim();
        const constellation = document.getElementById('wxAddConstellation').value;
        const persona = document.getElementById('wxAddPersona').value.trim();
        
        if (!nickname) {
            wxShowToast('请输入昵称');
            return;
        }
        
        const contactId = 'contact_' + Date.now();
        const now = new Date();
        const timeStr = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
        
        // 保存到联系人
        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        contacts.unshift({
            id: contactId,
            name: nickname,
            avatar: wxAddContactAvatar,
            constellation: constellation,
            persona: persona,
            bg: wxAddContactBg,
            starred: false
        });
        localStorage.setItem('wx_contacts', JSON.stringify(contacts));
        
        // 保存到聊天列表
        let chats = [];
        try {
            chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
        } catch (e) {}
        chats.unshift({
            id: contactId,
            name: nickname,
            avatar: wxAddContactAvatar,
            lastMessage: persona ? persona.substring(0, 30) : '',
            time: timeStr,
            unread: 0,
            bg: wxAddContactBg
        });
        localStorage.setItem('wx_chats', JSON.stringify(chats));
        
        // 初始化消息记录
        let messages = {};
        try {
            messages = JSON.parse(localStorage.getItem('wx_messages') || '{}');
        } catch (e) {}
        if (!messages[contactId]) {
            messages[contactId] = [];
        }
        localStorage.setItem('wx_messages', JSON.stringify(messages));
        
        wxShowToast('添加成功');
        wxCloseAddContact();
        debounceRenderChatList();
    };

    // 打开聊天页面
    window.wxOpenChat = function(chatId) {
        wxCurrentChatId = chatId;
        
        let chats = [];
        try {
            chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
        } catch (e) {}
        const chat = chats.find(c => c.id === chatId);
        
        const titleEl = document.getElementById('wxChatTitle');
        if (titleEl && chat) {
            titleEl.textContent = chat.name || '聊天';
        }
        
        // 清除未读
        if (chat) {
            chat.unread = 0;
            localStorage.setItem('wx_chats', JSON.stringify(chats));
        }
        
        wxRenderMessages();
        // 恢复草稿
        wxRestoreDraft(chatId, 'wxChatInput');
        // 确保语音按钮已添加到更多面板
        wxAddVoiceBtnToMorePanel();

        setTimeout(() => {
            if (wxGetTypingStatus(chatId)) {
                const msgEl = document.getElementById('wxChatMessages');
                if (msgEl) {
                    const typingEl = document.createElement('div');
                    typingEl.id = 'wxTypingIndicator';
                    typingEl.className = 'wx-msg-row wx-msg-them';
                    typingEl.innerHTML = '<div class="wx-msg-avatar"></div><div class="wx-msg-bubble" style="color:#999;font-style:italic;">正在输入...</div>';
                    msgEl.appendChild(typingEl);
                    msgEl.scrollTop = msgEl.scrollHeight;
                }
            }
        }, 50);
        
        const page = document.getElementById('wxPageChat');
        if (page) page.classList.add('wx-page-show');
        
        // 隐藏底部Tab栏
        const tabBar = document.querySelector('.wx-tab-bar');
        if (tabBar) tabBar.style.display = 'none';
        
        // 滚动到底部
        setTimeout(() => {
            const msgEl = document.getElementById('wxChatMessages');
            if (msgEl) msgEl.scrollTop = msgEl.scrollHeight;
        }, 50);
    };

    // 关闭聊天页面
    window.wxCloseChat = function() {
        // 保存草稿
        if (wxCurrentChatId) {
            const inputEl = document.getElementById('wxChatInput');
            wxSaveDraft(wxCurrentChatId, inputEl ? inputEl.value : '');
        }
        // 清除引用回复预览
        if (wxCurrentReply && !wxCurrentReply.isGroup) {
            wxCancelReply();
        }
        const page = document.getElementById('wxPageChat');
        if (page) page.classList.remove('wx-page-show');
        wxCurrentChatId = null;
        wxCloseChatMenu();
        wxCloseMsgMenu();
        wxCloseChatMorePanel();
        // 恢复底部Tab栏
        const tabBar = document.querySelector('.wx-tab-bar');
        if (tabBar) tabBar.style.display = 'flex';
        debounceRenderChatList();
    };

    // 渲染消息
    function wxRenderMessages() {
        const msgEl = document.getElementById('wxChatMessages');
        if (!msgEl || !wxCurrentChatId) return;
        
        let messages = {};
        try {
            messages = JSON.parse(localStorage.getItem('wx_messages') || '{}');
        } catch (e) {}
        
        const msgList = messages[wxCurrentChatId] || [];
        
        let chats = [];
        try {
            chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
        } catch (e) {}
        const chat = chats.find(c => c.id === wxCurrentChatId);
        
        const user = wxGetUser();
        
        if (msgList.length === 0) {
            msgEl.innerHTML = '<div style="text-align:center;color:#999;padding:40px 0;font-size:13px;">暂无消息，开始聊天吧</div>';
            return;
        }
        
        msgEl.innerHTML = msgList.map((msg, index) => {
            const isMe = msg.from === 'me';
            // 撤回消息：居中灰色提示
            if (msg.recalled) {
                const recallText = isMe ? '你撤回了一条消息' : '对方撤回了一条消息';
                return `<div class="wx-msg-recalled" data-msg-index="${index}">${recallText}</div>`;
            }
            const avatar = isMe ? (user.avatar || '') : (chat ? chat.avatar : '');
            const firstChar = isMe ? (user.nickname ? user.nickname.charAt(0) : '我') : (chat ? (chat.name ? chat.name.charAt(0) : '?') : '?');
            const avatarHtml = avatar
                ? `<img src="${avatar}" alt="">`
                : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#e0e0e0;color:#999;font-size:16px;">${wxEscapeHtml(firstChar)}</div>`;
            // 引用预览
            let quoteHtml = '';
            if (msg.replyTo) {
                quoteHtml = `<div class="wx-msg-quote"><span class="wx-msg-quote-sender">${wxEscapeHtml(msg.replyTo.senderName || '')}</span><span class="wx-msg-quote-content">${wxEscapeHtml(msg.replyTo.content || '')}</span></div>`;
            }
            // 气泡内容
            let bubbleInner = '';
            if (msg.type === 'voice') {
                const dur = msg.duration || 0;
                bubbleInner = `<div class="wx-msg-voice ${isMe ? 'wx-msg-voice-me' : ''}"><span class="wx-msg-voice-icon">${isMe ? '🎤' : '▶'}</span><span class="wx-msg-voice-bar"></span><span class="wx-msg-voice-duration">${dur}"</span></div>`;
            } else {
                bubbleInner = wxEscapeHtml(msg.content || '');
            }
            return `
                <div class="wx-msg-row ${isMe ? 'wx-msg-me' : 'wx-msg-them'}" data-msg-index="${index}">
                    <div class="wx-msg-avatar">${avatarHtml}</div>
                    <div class="wx-msg-bubble">${quoteHtml}${bubbleInner}</div>
                </div>
            `;
        }).join('');
        wxAttachLongPress(msgEl, false);
    }

    // 发送消息
    function wxSendMessage() {
        const inputEl = document.getElementById('wxChatInput');
        if (!inputEl || !wxCurrentChatId) return;
        
        const content = inputEl.value.trim();
        if (!content) return;
        
        let messages = {};
        try {
            messages = JSON.parse(localStorage.getItem('wx_messages') || '{}');
        } catch (e) {}
        
        if (!messages[wxCurrentChatId]) {
            messages[wxCurrentChatId] = [];
        }

        const newMsg = {
            from: 'me',
            content: content,
            time: Date.now()
        };
        // 引用回复
        if (wxCurrentReply && !wxCurrentReply.isGroup) {
            newMsg.replyTo = {
                senderName: wxCurrentReply.senderName,
                content: wxCurrentReply.content,
                type: wxCurrentReply.type
            };
        }
        messages[wxCurrentChatId].push(newMsg);

        localStorage.setItem('wx_messages', JSON.stringify(messages));

        inputEl.value = '';
        // 清除草稿（发送后输入框已空）
        wxSaveDraft(wxCurrentChatId, '');
        // 清除引用回复预览
        if (wxCurrentReply && !wxCurrentReply.isGroup) {
            wxCancelReply();
        }
        wxRenderMessages();
        
        // 更新聊天列表最后消息
        let chats = [];
        try {
            chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
        } catch (e) {}
        const chatIndex = chats.findIndex(c => c.id === wxCurrentChatId);
        if (chatIndex > -1) {
            const now = new Date();
            const timeStr = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
            chats[chatIndex].lastMessage = content;
            chats[chatIndex].time = timeStr;
            // 移到最前面
            const [chatItem] = chats.splice(chatIndex, 1);
            chats.unshift(chatItem);
            localStorage.setItem('wx_chats', JSON.stringify(chats));
        }
        
        // 滚动到底部
        setTimeout(() => {
            const msgEl = document.getElementById('wxChatMessages');
            if (msgEl) msgEl.scrollTop = msgEl.scrollHeight;
        }, 50);

        // AI自动回复
        wxSendAiReply(wxCurrentChatId);
    }

    /* ============ 消息增强：撤回/删除/引用回复/语音/草稿 ============ */
    // 当前引用回复状态：{ isGroup, senderName, content, type }
    let wxCurrentReply = null;
    // 长按计时器
    let wxMsgPressTimer = null;

    // 长按事件委托绑定（每个容器只绑一次）
    function wxAttachLongPress(container, isGroup) {
        if (!container || container.dataset.wxLongPressBound) return;
        container.dataset.wxLongPressBound = '1';
        function start(target) {
            const row = target.closest('[data-msg-index]');
            if (!row) return;
            if (row.classList.contains('wx-msg-recalled')) return;
            if (row.classList.contains('wx-msg-system')) return;
            const index = parseInt(row.dataset.msgIndex, 10);
            if (isNaN(index)) return;
            if (wxMsgPressTimer) clearTimeout(wxMsgPressTimer);
            wxMsgPressTimer = setTimeout(function() {
                wxMsgPressTimer = null;
                const chatId = isGroup ? wxCurrentGroupId : wxCurrentChatId;
                if (!chatId) return;
                wxShowMsgMenu(chatId, index, isGroup);
            }, 500);
        }
        function cancel() {
            if (wxMsgPressTimer) { clearTimeout(wxMsgPressTimer); wxMsgPressTimer = null; }
        }
        container.addEventListener('mousedown', function(e){ start(e.target); });
        container.addEventListener('mouseup', cancel);
        container.addEventListener('mouseleave', cancel);
        container.addEventListener('touchstart', function(e){ start(e.target); }, {passive: true});
        container.addEventListener('touchend', cancel);
        container.addEventListener('touchmove', cancel);
        container.addEventListener('touchcancel', cancel);
    }

    // 显示消息操作菜单
    window.wxShowMsgMenu = function(chatId, msgIndex, isGroup) {
        wxCloseMsgMenu();
        const messages = wxGetMessages();
        const list = messages[chatId] || [];
        const msg = list[msgIndex];
        if (!msg) return;
        const isMe = msg.from === 'me';
        const canRecall = isMe && (Date.now() - (msg.time || 0)) < 2 * 60 * 1000;
        const overlay = document.createElement('div');
        overlay.className = 'wx-msg-menu-overlay';
        overlay.id = 'wxMsgMenuOverlay';
        overlay.addEventListener('click', wxCloseMsgMenu);
        const menu = document.createElement('div');
        menu.className = 'wx-msg-menu';
        menu.addEventListener('click', function(e){ e.stopPropagation(); });
        let html = '';
        if (canRecall) {
            html += `<div class="wx-msg-menu-item" onclick="wxRecallMessage('${wxEscapeHtml(chatId)}', ${msgIndex}, ${isGroup})">撤回</div>`;
        }
        html += `<div class="wx-msg-menu-item" onclick="wxDeleteMessage('${wxEscapeHtml(chatId)}', ${msgIndex}, ${isGroup})">删除</div>`;
        html += `<div class="wx-msg-menu-item" onclick="wxStartReply('${wxEscapeHtml(chatId)}', ${msgIndex}, ${isGroup})">引用回复</div>`;
        menu.innerHTML = html;
        overlay.appendChild(menu);
        document.body.appendChild(overlay);
    };

    // 关闭消息操作菜单
    window.wxCloseMsgMenu = function() {
        const existing = document.getElementById('wxMsgMenuOverlay');
        if (existing) existing.remove();
    };

    // 撤回消息（仅自己发的、2分钟内）
    window.wxRecallMessage = function(chatId, msgIndex, isGroup) {
        wxCloseMsgMenu();
        const messages = wxGetMessages();
        const list = messages[chatId] || [];
        const msg = list[msgIndex];
        if (!msg) return;
        if (msg.from !== 'me') return;
        if ((Date.now() - (msg.time || 0)) >= 2 * 60 * 1000) {
            wxShowToast('超过2分钟，无法撤回');
            return;
        }
        msg.recalled = true;
        msg.recalledAt = Date.now();
        wxSaveMessages(messages);
        if (isGroup) { if (wxCurrentGroupId === chatId) wxRenderGroupMessages(); }
        else { if (wxCurrentChatId === chatId) wxRenderMessages(); }
        wxRefreshLastMessage(chatId);
    };

    // 删除消息（仅本地，对方不感知）
    window.wxDeleteMessage = function(chatId, msgIndex, isGroup) {
        wxCloseMsgMenu();
        const messages = wxGetMessages();
        const list = messages[chatId] || [];
        if (msgIndex < 0 || msgIndex >= list.length) return;
        list.splice(msgIndex, 1);
        wxSaveMessages(messages);
        if (isGroup) { if (wxCurrentGroupId === chatId) wxRenderGroupMessages(); }
        else { if (wxCurrentChatId === chatId) wxRenderMessages(); }
        wxRefreshLastMessage(chatId);
    };

    // 开始引用回复
    window.wxStartReply = function(chatId, msgIndex, isGroup) {
        wxCloseMsgMenu();
        const messages = wxGetMessages();
        const list = messages[chatId] || [];
        const msg = list[msgIndex];
        if (!msg) return;
        let senderName = '';
        const currentUser = wxGetUser();
        if (isGroup) {
            if (msg.from === 'me') {
                senderName = currentUser.nickname || '我';
            } else {
                senderName = wxGetGroupMemberInfo(msg.from).name || '成员';
            }
        } else {
            if (msg.from === 'me') {
                senderName = '我';
            } else {
                let chats = [];
                try { chats = JSON.parse(localStorage.getItem('wx_chats') || '[]'); } catch (e) {}
                const c = chats.find(function(x){ return x.id === chatId; });
                senderName = c ? (c.name || '对方') : '对方';
            }
        }
        let snippet = msg.content || '';
        if (msg.type === 'voice') snippet = '[语音]';
        else if (msg.type === 'image') snippet = '[图片]';
        else if (msg.type === 'redpacket') snippet = '[红包]';
        else if (msg.type === 'transfer') snippet = '[转账]';
        else if (msg.type === 'vote') snippet = '[投票]';
        else if (msg.type === 'solitaire') snippet = '[接龙]';
        wxCurrentReply = {
            isGroup: !!isGroup,
            senderName: senderName,
            content: snippet,
            type: msg.type || 'text'
        };
        wxRenderReplyPreview();
        const inputId = isGroup ? 'wxGroupChatInput' : 'wxChatInput';
        const input = document.getElementById(inputId);
        if (input) input.focus();
    };

    // 取消引用回复
    window.wxCancelReply = function() {
        wxCurrentReply = null;
        wxRenderReplyPreview();
    };

    // 渲染输入框上方的引用预览
    function wxRenderReplyPreview() {
        const old1 = document.getElementById('wxReplyPreviewPrivate');
        if (old1) old1.remove();
        const old2 = document.getElementById('wxReplyPreviewGroup');
        if (old2) old2.remove();
        if (!wxCurrentReply) return;
        const targetInputId = wxCurrentReply.isGroup ? 'wxGroupChatInput' : 'wxChatInput';
        const input = document.getElementById(targetInputId);
        if (!input) { wxCurrentReply = null; return; }
        const inputBar = input.closest('.wx-chat-input-bar');
        if (!inputBar) { wxCurrentReply = null; return; }
        const container = inputBar.parentElement;
        if (!container) { wxCurrentReply = null; return; }
        const preview = document.createElement('div');
        preview.className = 'wx-reply-preview';
        preview.id = wxCurrentReply.isGroup ? 'wxReplyPreviewGroup' : 'wxReplyPreviewPrivate';
        preview.innerHTML =
            '<div class="wx-reply-preview-info">' +
                '<span class="wx-reply-preview-sender">' + wxEscapeHtml(wxCurrentReply.senderName) + '</span>' +
                '<span class="wx-reply-preview-content">' + wxEscapeHtml(wxCurrentReply.content) + '</span>' +
            '</div>' +
            '<div class="wx-reply-preview-close" onclick="wxCancelReply()">×</div>';
        container.insertBefore(preview, inputBar);
    }

    // 发送模拟语音消息
    window.wxSendVoiceMessage = function(isGroup) {
        const chatId = isGroup ? wxCurrentGroupId : wxCurrentChatId;
        if (!chatId) return;
        if (isGroup) wxCloseGroupMorePanel(); else wxCloseChatMorePanel();
        const duration = Math.floor(Math.random() * 30) + 3; // 3~32秒
        const messages = wxGetMessages();
        if (!messages[chatId]) messages[chatId] = [];
        messages[chatId].push({
            from: 'me',
            type: 'voice',
            duration: duration,
            content: '',
            time: Date.now()
        });
        wxSaveMessages(messages);
        if (isGroup) wxRenderGroupMessages(); else wxRenderMessages();
        // 更新聊天列表
        let chats = [];
        try { chats = JSON.parse(localStorage.getItem('wx_chats') || '[]'); } catch (e) {}
        const idx = chats.findIndex(function(c){ return c.id === chatId; });
        if (idx > -1) {
            const now = new Date();
            const timeStr = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
            chats[idx].lastMessage = '[语音]';
            chats[idx].time = timeStr;
            const [item] = chats.splice(idx, 1);
            chats.unshift(item);
            try { localStorage.setItem('wx_chats', JSON.stringify(chats)); } catch (e) {}
        }
        setTimeout(function() {
            const el = document.getElementById(isGroup ? 'wxGroupChatMessages' : 'wxChatMessages');
            if (el) el.scrollTop = el.scrollHeight;
        }, 50);
    };

    // 动态添加“语音消息”按钮到私聊/群聊的更多面板
    function wxAddVoiceBtnToMorePanel() {
        const voiceIconSvg = '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#fff" stroke-width="2"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>';
        const privatePanel = document.querySelector('#wxChatMorePanel .wx-more-panel-grid');
        if (privatePanel && !privatePanel.querySelector('.wx-more-voice-btn')) {
            const item = document.createElement('div');
            item.className = 'wx-more-panel-item wx-more-voice-btn';
            item.innerHTML =
                '<div class="wx-more-panel-icon wx-more-icon-voice">' + voiceIconSvg + '</div>' +
                '<div class="wx-more-panel-label">语音消息</div>';
            item.addEventListener('click', function() { window.wxSendVoiceMessage(false); });
            privatePanel.appendChild(item);
        }
        const groupPanel = document.querySelector('#wxGroupMorePanel .wx-more-panel-grid');
        if (groupPanel && !groupPanel.querySelector('.wx-more-voice-btn')) {
            const item = document.createElement('div');
            item.className = 'wx-more-panel-item wx-more-voice-btn';
            item.innerHTML =
                '<div class="wx-more-panel-icon wx-more-icon-voice">' + voiceIconSvg + '</div>' +
                '<div class="wx-more-panel-label">语音消息</div>';
            item.addEventListener('click', function() { window.wxSendVoiceMessage(true); });
            groupPanel.appendChild(item);
        }
    }

    // 根据最新消息刷新聊天列表的 lastMessage
    function wxRefreshLastMessage(chatId) {
        const messages = wxGetMessages();
        const list = messages[chatId] || [];
        let lastMessage = '';
        if (list.length > 0) {
            const last = list[list.length - 1];
            if (last.recalled) {
                lastMessage = last.from === 'me' ? '你撤回了一条消息' : '对方撤回了一条消息';
            } else if (last.from === 'system') {
                lastMessage = last.content || '';
            } else if (last.type === 'voice') {
                lastMessage = '[语音]';
            } else if (last.type === 'image') {
                lastMessage = '[图片]';
            } else if (last.type === 'redpacket') {
                lastMessage = '[红包]';
            } else if (last.type === 'transfer') {
                lastMessage = '[转账]';
            } else if (last.type === 'vote') {
                lastMessage = '[投票]';
            } else if (last.type === 'solitaire') {
                lastMessage = '[接龙]';
            } else {
                lastMessage = last.content || '';
            }
            // 群聊加上发送者前缀
            if (last.from !== 'me' && last.from !== 'them' && last.from !== 'system') {
                const member = wxGetGroupMemberInfo(last.from);
                lastMessage = (member.name || '成员') + ': ' + lastMessage;
            }
        }
        let chats = [];
        try { chats = JSON.parse(localStorage.getItem('wx_chats') || '[]'); } catch (e) {}
        const idx = chats.findIndex(function(c){ return c.id === chatId; });
        if (idx > -1) {
            chats[idx].lastMessage = lastMessage || chats[idx].lastMessage || '';
            try { localStorage.setItem('wx_chats', JSON.stringify(chats)); } catch (e) {}
        }
        debounceRenderChatList();
    }

    // 草稿读写
    function wxGetDrafts() {
        try { return JSON.parse(localStorage.getItem('wx_drafts') || '{}'); } catch (e) { return {}; }
    }
    function wxSaveDraft(chatId, content) {
        const drafts = wxGetDrafts();
        if (content && content.trim()) {
            drafts[chatId] = content;
        } else {
            delete drafts[chatId];
        }
        try { localStorage.setItem('wx_drafts', JSON.stringify(drafts)); } catch (e) {}
    }
    function wxRestoreDraft(chatId, inputId) {
        const drafts = wxGetDrafts();
        const input = document.getElementById(inputId);
        if (input) input.value = drafts[chatId] || '';
    }
    /* ============ 消息增强 END ============ */

    // 添加联系人消息
    function wxAddContactMessage(chatId, content) {
        let messages = {};
        try {
            messages = JSON.parse(localStorage.getItem('wx_messages') || '{}');
        } catch (e) {}

        if (!messages[chatId]) messages[chatId] = [];
        messages[chatId].push({
            from: 'them',
            content: content,
            time: Date.now()
        });
        localStorage.setItem('wx_messages', JSON.stringify(messages));

        // 更新聊天列表
        let chats = [];
        try {
            chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
        } catch (e) {}
        const chatIndex = chats.findIndex(c => c.id === chatId);
        if (chatIndex > -1) {
            const now = new Date();
            const timeStr = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
            chats[chatIndex].lastMessage = content;
            chats[chatIndex].time = timeStr;
            if (wxCurrentChatId !== chatId) {
                chats[chatIndex].unread = (chats[chatIndex].unread || 0) + 1;
            }
            localStorage.setItem('wx_chats', JSON.stringify(chats));
        }

        // 如果当前正在查看这个聊天，重新渲染
        if (wxCurrentChatId === chatId) {
            wxRenderMessages();
            setTimeout(() => {
                const msgEl = document.getElementById('wxChatMessages');
                if (msgEl) msgEl.scrollTop = msgEl.scrollHeight;
            }, 50);
        }
    }

    let wxAiReplyLocks = {};

    function wxSaveTypingStatus(chatId, isTyping) {
        let status = {};
        try {
            status = JSON.parse(localStorage.getItem('wx_typing_status') || '{}');
        } catch (e) {}
        if (isTyping) {
            status[chatId] = Date.now();
        } else {
            delete status[chatId];
        }
        localStorage.setItem('wx_typing_status', JSON.stringify(status));
    }

    function wxGetTypingStatus(chatId) {
        let status = {};
        try {
            status = JSON.parse(localStorage.getItem('wx_typing_status') || '{}');
        } catch (e) {}
        return status[chatId] ? true : false;
    }

    async function wxSendAiReply(chatId) {
        if (wxAiReplyLocks[chatId]) return;
        wxAiReplyLocks[chatId] = true;

        let apiConfig = {};
        try {
            apiConfig = JSON.parse(localStorage.getItem('censy_api_config') || '{}');
        } catch (e) {}

        if (!apiConfig.url || !apiConfig.key || !apiConfig.model) {
            wxAiReplyLocks[chatId] = false;
            return;
        }

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const contact = contacts.find(c => c.id === chatId);

        let messages = {};
        try {
            messages = JSON.parse(localStorage.getItem('wx_messages') || '{}');
        } catch (e) {}
        const msgList = messages[chatId] || [];

        const apiMessages = [];
        const contactName = contact ? contact.name : '联系人';
        const persona = contact && contact.persona ? contact.persona : '';

        const systemPrompt = persona
            ? `你是"${contactName}"。人设：${persona}\n自然口语化回复，像真人聊天，听懂人话。`
            : `你是微信好友"${contactName}"。自然口语化回复，像真人聊天。`;

        apiMessages.push({ role: 'system', content: systemPrompt });

        msgList.slice(-5).forEach(msg => {
            apiMessages.push({
                role: msg.from === 'me' ? 'user' : 'assistant',
                content: msg.content
            });
        });

        const baseUrl = apiConfig.url.endsWith('/') ? apiConfig.url.slice(0, -1) : apiConfig.url;

        // 秒回，无延迟
        wxSaveTypingStatus(chatId, true);

        if (wxCurrentChatId === chatId) {
            const msgEl = document.getElementById('wxChatMessages');
            if (msgEl) {
                const typingEl = document.createElement('div');
                typingEl.id = 'wxTypingIndicator';
                typingEl.className = 'wx-msg-row wx-msg-them';
                typingEl.innerHTML = '<div class="wx-msg-avatar"></div><div class="wx-msg-bubble" style="color:#999;font-style:italic;">正在输入...</div>';
                msgEl.appendChild(typingEl);
                msgEl.scrollTop = msgEl.scrollHeight;
            }
        }

        try {
            const resp = await fetch(baseUrl + '/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + apiConfig.key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: apiConfig.model,
                    messages: apiMessages,
                    stream: true,
                    temperature: 0.8,
                    max_tokens: 300
                })
            });

            if (!resp.ok) {
                wxSaveTypingStatus(chatId, false);
                const typingEl = document.getElementById('wxTypingIndicator');
                if (typingEl) typingEl.remove();
                wxAddContactMessage(chatId, '(回复失败，请检查API配置)');
                wxAiReplyLocks[chatId] = false;
                return;
            }

            const reader = resp.body.getReader();
            const decoder = new TextDecoder();
            let fullReply = '';
            let replyEl = null;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunks = decoder.decode(value).split('\n');
                for (const chunk of chunks) {
                    if (chunk.startsWith('data: ')) {
                        const dataStr = chunk.slice(6);
                        if (dataStr === '[DONE]') {
                            break;
                        }
                        try {
                            const data = JSON.parse(dataStr);
                            const delta = data.choices?.[0]?.delta?.content;
                            if (delta) {
                                fullReply += delta;

                                if (!replyEl && wxCurrentChatId === chatId) {
                                    const typingEl = document.getElementById('wxTypingIndicator');
                                    if (typingEl) typingEl.remove();

                                    const msgEl = document.getElementById('wxChatMessages');
                                    if (msgEl) {
                                        replyEl = document.createElement('div');
                                        replyEl.className = 'wx-msg-row wx-msg-them';
                                        replyEl.innerHTML = `<div class="wx-msg-avatar"></div><div class="wx-msg-bubble">${delta}</div>`;
                                        msgEl.appendChild(replyEl);
                                        msgEl.scrollTop = msgEl.scrollHeight;
                                    }
                                } else if (replyEl && wxCurrentChatId === chatId) {
                                    const bubble = replyEl.querySelector('.wx-msg-bubble');
                                    if (bubble) {
                                        bubble.textContent = fullReply;
                                    }
                                    const msgEl = document.getElementById('wxChatMessages');
                                    if (msgEl) msgEl.scrollTop = msgEl.scrollHeight;
                                }
                            }
                        } catch (e) {}
                    }
                }
            }

            wxSaveTypingStatus(chatId, false);
            const typingEl = document.getElementById('wxTypingIndicator');
            if (typingEl) typingEl.remove();

            if (fullReply) {
                wxAddContactMessage(chatId, fullReply);
            } else {
                wxAddContactMessage(chatId, '(无回复内容)');
            }
        } catch (err) {
            wxSaveTypingStatus(chatId, false);
            const typingEl = document.getElementById('wxTypingIndicator');
            if (typingEl) typingEl.remove();
            wxAddContactMessage(chatId, '(网络错误，回复失败)');
        }

        wxAiReplyLocks[chatId] = false;
    }

    /* ============ 联系人主动发消息 ============ */
    let wxProactiveLocks = {};           // 防止同一联系人重复发送
    let wxProactiveTimer = null;         // 定时器句柄
    const WX_PROACTIVE_INTERVAL = 30000; // 30秒检查一次
    const WX_PROACTIVE_IDLE_MS = 5 * 60 * 1000; // 5分钟未聊天
    const WX_PROACTIVE_PROBABILITY = 0.3;        // 30%概率主动发消息

    // 启动定时检查联系人主动发消息
    window.wxStartProactiveMessages = function() {
        if (wxProactiveTimer) clearInterval(wxProactiveTimer);
        wxProactiveTimer = setInterval(wxCheckProactiveMessages, WX_PROACTIVE_INTERVAL);
    };

    // 检查并发送主动消息
    window.wxCheckProactiveMessages = function() {
        let apiConfig = {};
        try {
            apiConfig = JSON.parse(localStorage.getItem('censy_api_config') || '{}');
        } catch (e) {}
        // 未配置API时直接跳过
        if (!apiConfig.url || !apiConfig.key || !apiConfig.model) return;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        if (!contacts || contacts.length === 0) return;

        const messages = wxGetMessages();
        const now = Date.now();

        contacts.forEach(contact => {
            if (!contact || !contact.id) return;
            if (wxProactiveLocks[contact.id]) return;
            const msgList = messages[contact.id] || [];
            const lastMsg = msgList[msgList.length - 1];
            // 没有任何聊天记录则跳过
            if (!lastMsg) return;
            // 距离上次聊天不足5分钟则跳过
            if (now - (lastMsg.time || 0) < WX_PROACTIVE_IDLE_MS) return;
            // 30% 概率主动发消息
            if (Math.random() > WX_PROACTIVE_PROBABILITY) return;
            wxSendProactiveMessage(contact.id);
        });
    };

    // 联系人主动发一条消息
    async function wxSendProactiveMessage(chatId) {
        if (wxProactiveLocks[chatId]) return;
        wxProactiveLocks[chatId] = true;

        let apiConfig = {};
        try {
            apiConfig = JSON.parse(localStorage.getItem('censy_api_config') || '{}');
        } catch (e) {}
        if (!apiConfig.url || !apiConfig.key || !apiConfig.model) {
            wxProactiveLocks[chatId] = false;
            return;
        }

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const contact = contacts.find(c => c.id === chatId);
        if (!contact) {
            wxProactiveLocks[chatId] = false;
            return;
        }

        const contactName = contact.name || '联系人';
        const persona = contact.persona || '';

        // 读取最近5条聊天记录作为上下文
        const messages = wxGetMessages();
        const msgList = (messages[chatId] || []).slice(-5);

        const systemPrompt = `你是"${contactName}"。人设：${persona || '微信好友'}\n你主动给用户发一条消息，可以打招呼、分享近况、或者继续之前的话题。自然口语化，像真人聊天，简短一点。`;

        const apiMessages = [{ role: 'system', content: systemPrompt }];
        msgList.forEach(msg => {
            apiMessages.push({
                role: msg.from === 'me' ? 'user' : 'assistant',
                content: msg.content
            });
        });

        const baseUrl = apiConfig.url.endsWith('/') ? apiConfig.url.slice(0, -1) : apiConfig.url;

        // 显示"正在输入..."提示
        wxSaveTypingStatus(chatId, true);
        if (wxCurrentChatId === chatId) {
            const msgEl = document.getElementById('wxChatMessages');
            if (msgEl) {
                const typingEl = document.createElement('div');
                typingEl.id = 'wxTypingIndicator';
                typingEl.className = 'wx-msg-row wx-msg-them';
                typingEl.innerHTML = '<div class="wx-msg-avatar"></div><div class="wx-msg-bubble wx-proactive-typing" style="color:#999;font-style:italic;">正在输入...</div>';
                msgEl.appendChild(typingEl);
                msgEl.scrollTop = msgEl.scrollHeight;
            }
        }

        try {
            const resp = await fetch(baseUrl + '/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + apiConfig.key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: apiConfig.model,
                    messages: apiMessages,
                    stream: false,
                    temperature: 0.85,
                    max_tokens: 300
                })
            });

            wxSaveTypingStatus(chatId, false);
            const typingEl = document.getElementById('wxTypingIndicator');
            if (typingEl) typingEl.remove();

            if (!resp.ok) {
                wxProactiveLocks[chatId] = false;
                return;
            }
            const data = await resp.json();
            const content = data.choices?.[0]?.message?.content || '';
            if (content) {
                wxAddContactMessage(chatId, content);
            }
        } catch (err) {
            wxSaveTypingStatus(chatId, false);
            const typingEl = document.getElementById('wxTypingIndicator');
            if (typingEl) typingEl.remove();
        }
        wxProactiveLocks[chatId] = false;
    }
    /* ============ 联系人主动发消息 END ============ */

    // Toast提示
    window.wxShowToast = function(msg) {
        let toast = document.getElementById('wxToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'wxToast';
            toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.7);color:#fff;padding:10px 20px;border-radius:8px;font-size:14px;z-index:10000;opacity:0;transition:opacity 0.3s;pointer-events:none;';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        clearTimeout(toast._timer);
        toast._timer = setTimeout(() => {
            toast.style.opacity = '0';
        }, 1500);
    }

    // 绑定+号按钮点击事件
    document.addEventListener('DOMContentLoaded', function() {
        const addBtn = document.getElementById('wxAddBtn');
        if (addBtn) {
            addBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                wxToggleAddMenu();
            });
        }
        
        // 点击其他地方关闭下拉菜单
        document.addEventListener('click', function(e) {
            const addBtn = document.getElementById('wxAddBtn');
            const addMenu = document.getElementById('wxAddMenu');
            if (addBtn && !addBtn.contains(e.target) && addMenu && !addMenu.contains(e.target)) {
                wxCloseAddMenu();
            }
        });
        
        // 头像上传
        const avatarUpload = document.getElementById('wxAddAvatarUpload');
        const avatarFile = document.getElementById('wxAddAvatarFile');
        const avatarImg = document.getElementById('wxAddAvatarImg');
        if (avatarUpload && avatarFile) {
            avatarUpload.addEventListener('click', function() {
                avatarFile.click();
            });
            avatarFile.addEventListener('change', function(e) {
                const f = e.target.files[0];
                if (!f) return;
                const reader = new FileReader();
                reader.onload = function(ev) {
                    wxAddContactAvatar = ev.target.result;
                    if (avatarImg) {
                        avatarImg.src = ev.target.result;
                        avatarImg.style.display = 'block';
                    }
                };
                reader.readAsDataURL(f);
            });
        }
        
        // 背景上传
        const bgUpload = document.getElementById('wxAddBgUpload');
        const bgFile = document.getElementById('wxAddBgFile');
        const bgImg = document.getElementById('wxAddBgImg');
        if (bgUpload && bgFile) {
            bgUpload.addEventListener('click', function() {
                bgFile.click();
            });
            bgFile.addEventListener('change', function(e) {
                const f = e.target.files[0];
                if (!f) return;
                const reader = new FileReader();
                reader.onload = function(ev) {
                    wxAddContactBg = ev.target.result;
                    if (bgImg) {
                        bgImg.src = ev.target.result;
                        bgImg.style.display = 'block';
                    }
                };
                reader.readAsDataURL(f);
            });
        }
        
        // 聊天输入框发送消息（回车）
        const chatInput = document.getElementById('wxChatInput');
        if (chatInput) {
            chatInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    wxSendMessage();
                }
            });
        }
        
        // 打开APP时渲染聊天列表
        const originalWxOpenApp = window.wxOpenApp;
        window.wxOpenApp = function() {
            if (originalWxOpenApp) originalWxOpenApp();
            setTimeout(wxRenderChatList, 50);
        };

        // 初始化通讯录搜索框
        wxInitContactsSearch();

        // 通讯录"标签"功能项 -> 打开标签管理页面
        const funcItems = document.querySelectorAll('#wxTabContacts .wx-contacts-func-item');
        funcItems.forEach(item => {
            const nameEl = item.querySelector('.wx-contacts-func-name');
            if (nameEl && nameEl.textContent.trim() === '标签') {
                item.onclick = function(e) {
                    e.preventDefault();
                    wxOpenTagManagement();
                };
            }
        });
    });
    
    // 绑定信息APP图标点击事件
    document.addEventListener('DOMContentLoaded', function() {
        const entry = document.getElementById('censyWechatEntry');
        if (entry) {
            entry.style.cursor = 'pointer';
            entry.onclick = function() {
                if (typeof wxOpenApp === 'function') {
                    wxOpenApp();
                }
            };
        }
    });

    let wxCurrentContactId = null;
    let wxPostMomentImages = [];
    let wxPostMomentVideoUrl = '';
    let wxPostMomentVisibility = 'public';
    let wxPostMomentVisibleTo = [];
    let wxCommentTargetMomentId = null;

    const PINYIN_MAP = {
        '阿':'A','啊':'A','唉':'A','爱':'A','安':'A','昂':'A','奥':'A',
        '八':'B','吧':'B','白':'B','百':'B','班':'B','半':'B','帮':'B','包':'B','宝':'B','抱':'B','北':'B','贝':'B','背':'B','被':'B','本':'B','比':'B','笔':'B','边':'B','便':'B','表':'B','别':'B','病':'B','波':'B','不':'B','步':'B',
        '才':'C','参':'C','餐':'C','草':'C','册':'C','层':'C','茶':'C','差':'C','长':'C','常':'C','场':'C','唱':'C','车':'C','成':'C','城':'C','吃':'C','尺':'C','充':'C','虫':'C','出':'C','穿':'C','船':'C','窗':'C','床':'C','春':'C','词':'C','次':'C','从':'C','村':'C',
        '打':'D','大':'D','带':'D','代':'D','待':'D','袋':'D','戴':'D','单':'D','但':'D','蛋':'D','当':'D','党':'D','刀':'D','倒':'D','到':'D','道':'D','得':'D','的':'D','灯':'D','等':'D','低':'D','底':'D','地':'D','第':'D','点':'D','电':'D','店':'D','钓':'D','调':'D','定':'D','丢':'D','东':'D','冬':'D','动':'D','都':'D','读':'D','独':'D','度':'D','短':'D','对':'D','多':'D',
        '饿':'E','儿':'E','而':'E','二':'E',
        '发':'F','法':'F','反':'F','饭':'F','方':'F','房':'F','放':'F','飞':'F','非':'F','费':'F','分':'F','份':'F','奋':'F','风':'F','封':'F','丰':'F','峰':'F','蜂':'F','冯':'F','佛':'F','否':'F','夫':'F','服':'F','父':'F','付':'F','复':'F',
        '该':'G','改':'G','盖':'G','干':'G','甘':'G','敢':'G','感':'G','刚':'G','钢':'G','高':'G','告':'G','哥':'G','歌':'G','格':'G','个':'G','各':'G','给':'G','根':'G','跟':'G','更':'G','工':'G','公':'G','功':'G','共':'G','狗':'G','够':'G','估':'G','姑':'G','孤':'G','古':'G','股':'G','故':'G','顾':'G','瓜':'G','挂':'G','乖':'G','怪':'G','关':'G','观':'G','官':'G','管':'G','馆':'G','惯':'G','光':'G','广':'G','归':'G','贵':'G','国':'G','果':'G','过':'G',
        '哈':'H','还':'H','孩':'H','海':'H','害':'H','含':'H','寒':'H','汉':'H','行':'H','好':'H','号':'H','浩':'H','喝':'H','河':'H','何':'H','和':'H','贺':'H','黑':'H','很':'H','恨':'H','红':'H','宏':'H','洪':'H','虹':'H','后':'H','候':'H','厚':'H','呼':'H','乎':'H','忽':'H','胡':'H','湖':'H','虎':'H','户':'H','花':'H','华':'H','化':'H','画':'H','话':'H','怀':'H','欢':'H','换':'H','黄':'H','皇':'H','回':'H','会':'H','惠':'H','慧':'H','婚':'H','魂':'H','浑':'H','活':'H','火':'H','或':'H','货':'H','获':'H',
        '机':'J','鸡':'J','级':'J','极':'J','急':'J','即':'J','集':'J','及':'J','吉':'J','籍':'J','几':'J','己':'J','记':'J','纪':'J','技':'J','际':'J','济':'J','继':'J','寄':'J','加':'J','家':'J','佳':'J','假':'J','价':'J','架':'J','驾':'J','尖':'J','间':'J','肩':'J','艰':'J','奸':'J','减':'J','简':'J','见':'J','件':'J','建':'J','健':'J','剑':'J','渐':'J','践':'J','鉴':'J','江':'J','将':'J','讲':'J','奖':'J','匠':'J','降':'J','交':'J','郊':'J','娇':'J','骄':'J','胶':'J','焦':'J','角':'J','脚':'J','搅':'J','叫':'J','轿':'J','较':'J','教':'J','接':'J','节':'J','杰':'J','洁':'J','结':'J','解':'J','姐':'J','借':'J','介':'J','界':'J','今':'J','金':'J','津':'J','筋':'J','仅':'J','紧':'J','锦':'J','尽':'J','近':'J','进':'J','晋':'J','禁':'J','京':'J','经':'J','精':'J','静':'J','境':'J','镜':'J','九':'J','久':'J','酒':'J','旧':'J','救':'J','就':'J','舅':'J','居':'J','局':'J','举':'J','巨':'J','具':'J','剧':'J','据':'J','距':'J','觉':'J','决':'J','绝':'J','均':'J','君':'J','军':'J',
        '卡':'K','开':'K','凯':'K','慨':'K','刊':'K','看':'K','康':'K','抗':'K','考':'K','烤':'K','靠':'K','科':'K','棵':'K','颗':'K','壳':'K','可':'K','渴':'K','克':'K','刻':'K','客':'K','课':'K','肯':'K','啃':'K','坑':'K','空':'K','孔':'K','控':'K','口':'K','扣':'K','寇':'K','苦':'K','酷':'K','快':'K','块':'K','筷':'K','宽':'K','款':'K','匡':'K','狂':'K','框':'K','矿':'K','旷':'K','况':'K','亏':'K','葵':'K','愧':'K','溃':'K','坤':'K','昆':'K','困':'K','扩':'K','括':'K',
        '拉':'L','啦':'L','喇':'L','腊':'L','辣':'L','来':'L','莱':'L','赖':'L','兰':'L','蓝':'L','篮':'L','懒':'L','烂':'L','狼':'L','浪':'L','劳':'L','牢':'L','老':'L','乐':'L','雷':'L','泪':'L','类':'L','累':'L','冷':'L','里':'L','理':'L','李':'L','立':'L','力':'L','历':'L','丽':'L','利':'L','例':'L','连':'L','脸':'L','练':'L','炼':'L','恋':'L','良':'L','凉':'L','梁':'L','粮':'L','两':'L','亮':'L','谅':'L','辆':'L','量':'L','聊':'L','了':'L','料':'L','列':'L','烈':'L','裂':'L','林':'L','临':'L','邻':'L','淋':'L','灵':'L','零':'L','领':'L','另':'L','令':'L','刘':'L','留':'L','流':'L','柳':'L','六':'L','龙':'L','隆':'L','垄':'L','楼':'L','搂':'L','漏':'L','陋':'L','卢':'L','炉':'L','鲁':'L','路':'L','露':'L','鹿':'L','录':'L','旅':'L','虑':'L','率':'L','绿':'L','乱':'L','掠':'L','略':'L','轮':'L','论':'L','罗':'L','洛':'L','络':'L','落':'L',
        '妈':'M','麻':'M','马':'M','码':'M','玛':'M','骂':'M','吗':'M','买':'M','卖':'M','麦':'M','埋':'M','满':'M','慢':'M','漫':'M','忙':'M','芒':'M','盲':'M','茫':'M','猫':'M','毛':'M','矛':'M','茅':'M','茂':'M','冒':'M','帽':'M','贸':'M','么':'M','没':'M','眉':'M','梅':'M','媒':'M','煤':'M','美':'M','妹':'M','门':'M','们':'M','闷':'M','猛':'M','梦':'M','迷':'M','米':'M','秘':'M','密':'M','蜜':'M','棉':'M','免':'M','勉':'M','面':'M','苗':'M','秒':'M','妙':'M','庙':'M','灭':'M','民':'M','敏':'M','明':'M','鸣':'M','命':'M','摸':'M','模':'M','磨':'M','魔':'M','抹':'M','末':'M','莫':'M','墨':'M','默':'M','木':'M','目':'M','牧':'M','墓':'M','幕':'M','慕':'M','母':'M','亩':'M',
        '拿':'N','哪':'N','那':'N','娜':'N','纳':'N','乃':'N','奶':'N','耐':'N','男':'N','南':'N','难':'N','囊':'N','挠':'N','脑':'N','闹':'N','呢':'N','内':'N','嫩':'N','能':'N','你':'N','泥':'N','拟':'N','逆':'N','年':'N','念':'N','娘':'N','鸟':'N','尿':'N','捏':'N','聂':'N','孽':'N','宁':'N','凝':'N','牛':'N','扭':'N','浓':'N','农':'N','弄':'N','奴':'N','努':'N','怒':'N','女':'N','暖':'N','诺':'N',
        '哦':'O','欧':'O','偶':'O','呕':'O','殴':'O',
        '怕':'P','拍':'P','排':'P','派':'P','攀':'P','潘':'P','盘':'P','判':'P','盼':'P','抛':'P','炮':'P','跑':'P','泡':'P','陪':'P','配':'P','佩':'P','喷':'P','盆':'P','朋':'P','碰':'P','批':'P','皮':'P','疲':'P','脾':'P','匹':'P','僻':'P','片':'P','偏':'P','票':'P','飘':'P','漂':'P','瓢':'P','拼':'P','品':'P','贫':'P','频':'P','平':'P','评':'P','凭':'P','瓶':'P','苹':'P','屏':'P','坡':'P','泼':'P','婆':'P','破':'P','剖':'P','扑':'P','铺':'P','仆':'P','朴':'P','普':'P',
        '七':'Q','其':'Q','奇':'Q','骑':'Q','起':'Q','气':'Q','汽':'Q','器':'Q','期':'Q','妻':'Q','栖':'Q','戚':'Q','欺':'Q','漆':'Q','齐':'Q','歧':'Q','祈':'Q','棋':'Q','旗':'Q','岂':'Q','弃':'Q','泣':'Q','恰':'Q','千':'Q','迁':'Q','牵':'Q','铅':'Q','谦':'Q','钱':'Q','前':'Q','潜':'Q','浅':'Q','遣':'Q','欠':'Q','枪':'Q','强':'Q','墙':'Q','抢':'Q','敲':'Q','桥':'Q','瞧':'Q','巧':'Q','切':'Q','茄':'Q','且':'Q','窃':'Q','亲':'Q','侵':'Q','秦':'Q','琴':'Q','青':'Q','轻':'Q','清':'Q','情':'Q','晴':'Q','顷':'Q','请':'Q','庆':'Q','穷':'Q','秋':'Q','丘':'Q','求':'Q','球':'Q','区':'Q','曲':'Q','取':'Q','去':'Q','趣':'Q','圈':'Q','全':'Q','权':'Q','泉':'Q','拳':'Q','犬':'Q','劝':'Q','缺':'Q','却':'Q','确':'Q','鹊':'Q','雀':'Q','群':'Q',
        '然':'R','燃':'R','染':'R','壤':'R','让':'R','饶':'R','扰':'R','绕':'R','惹':'R','热':'R','人':'R','仁':'R','忍':'R','认':'R','任':'R','扔':'R','仍':'R','日':'R','荣':'R','容':'R','融':'R','熔':'R','溶':'R','肉':'R','如':'R','乳':'R','入':'R','软':'R','瑞':'R','锐':'R','润':'R','若':'R','弱':'R',
        '撒':'S','洒':'S','萨':'S','赛':'S','三':'S','散':'S','桑':'S','丧':'S','骚':'S','扫':'S','嫂':'S','色':'S','森':'S','僧':'S','沙':'S','杀':'S','傻':'S','啥':'S','晒':'S','山':'S','删':'S','闪':'S','善':'S','伤':'S','商':'S','上':'S','尚':'S','烧':'S','少':'S','邵':'S','绍':'S','蛇':'S','舌':'S','舍':'S','设':'S','社':'S','射':'S','涉':'S','申':'S','伸':'S','身':'S','深':'S','神':'S','沈':'S','审':'S','甚':'S','肾':'S','慎':'S','升':'S','生':'S','声':'S','省':'S','圣':'S','胜':'S','盛':'S','剩':'S','尸':'S','失':'S','师':'S','诗':'S','施':'S','湿':'S','十':'S','石':'S','时':'S','识':'S','实':'S','食':'S','使':'S','史':'S','始':'S','士':'S','世':'S','市':'S','示':'S','事':'S','侍':'S','饰':'S','视':'S','试':'S','是':'S','室':'S','逝':'S','势':'S','收':'S','手':'S','守':'S','首':'S','寿':'S','受':'S','瘦':'S','兽':'S','书':'S','舒':'S','疏':'S','输':'S','蔬':'S','孰':'S','熟':'S','暑':'S','署':'S','蜀':'S','鼠':'S','数':'S','树':'S','竖':'S','刷':'S','耍':'S','衰':'S','摔':'S','甩':'S','帅':'S','双':'S','霜':'S','谁':'S','水':'S','睡':'S','说':'S','硕':'S','斯':'S','思':'S','私':'S','司':'S','死':'S','四':'S','寺':'S','似':'S','饲':'S','送':'S','松':'S','宋':'S','搜':'S','艘':'S','苏':'S','俗':'S','诉':'S','素':'S','速':'S','宿':'S','粟':'S','塑':'S','虽':'S','随':'S','岁':'S','孙':'S','损':'S','所':'S','索':'S','锁':'S',
        '他':'T','她':'T','它':'T','踏':'T','台':'T','太':'T','态':'T','泰':'T','谈':'T','弹':'T','探':'T','汤':'T','唐':'T','堂':'T','躺':'T','趟':'T','烫':'T','涛':'T','掏':'T','逃':'T','桃':'T','淘':'T','套':'T','特':'T','疼':'T','踢':'T','提':'T','题':'T','体':'T','天':'T','填':'T','甜':'T','调':'T','条':'T','跳':'T','贴':'T','铁':'T','听':'T','厅':'T','廷':'T','亭':'T','庭':'T','通':'T','同':'T','铜':'T','童':'T','统':'T','痛':'T','偷':'T','头':'T','投':'T','透':'T','突':'T','图':'T','涂':'T','途':'T','土':'T','吐':'T','兔':'T','团':'T','推':'T','退':'T','吞':'T','屯':'T','托':'T','拖':'T','脱':'T','陀':'T','驼':'T',
        '挖':'W','哇':'W','蛙':'W','瓦':'W','外':'W','玩':'W','完':'W','晚':'W','万':'W','王':'W','网':'W','往':'W','忘':'W','望':'W','危':'W','威':'W','微':'W','为':'W','围':'W','唯':'W','惟':'W','维':'W','伟':'W','伪':'W','尾':'W','纬':'W','卫':'W','未':'W','位':'W','味':'W','胃':'W','谓':'W','喂':'W','温':'W','文':'W','闻':'W','纹':'W','蚊':'W','稳':'W','问':'W','翁':'W','我':'W','卧':'W','握':'W','乌':'W','污':'W','屋':'W','无':'W','五':'W','午':'W','武':'W','务':'W','物':'W','悟':'W','雾':'W',
        '西':'X','吸':'X','希':'X','息':'X','牺':'X','悉':'X','膝':'X','习':'X','席':'X','喜':'X','洗':'X','系':'X','戏':'X','细':'X','瞎':'X','虾':'X','峡':'X','侠':'X','狭':'X','下':'X','夏':'X','先':'X','仙':'X','鲜':'X','闲':'X','贤':'X','显':'X','险':'X','县':'X','现':'X','线':'X','限':'X','宪':'X','陷':'X','馅':'X','羡':'X','献':'X','乡':'X','相':'X','香':'X','祥':'X','详':'X','想':'X','响':'X','向':'X','项':'X','象':'X','像':'X','削':'X','萧':'X','硝':'X','销':'X','小':'X','晓':'X','笑':'X','效':'X','些':'X','鞋':'X','斜':'X','写':'X','泄':'X','谢':'X','新':'X','心':'X','信':'X','星':'X','兴':'X','刑':'X','形':'X','行':'X','醒':'X','幸':'X','性':'X','姓':'X','凶':'X','兄':'X','胸':'X','雄':'X','熊':'X','休':'X','修':'X','秀':'X','袖':'X','绣':'X','须':'X','虚':'X','需':'X','徐':'X','许':'X','序':'X','绪':'X','续':'X','宣':'X','悬':'X','选':'X','穴':'X','学':'X','雪':'X','血':'X','勋':'X','寻':'X','训':'X','讯':'X','迅':'X',
        '压':'Y','呀':'Y','丫':'Y','牙':'Y','芽':'Y','哑':'Y','雅':'Y','亚':'Y','烟':'Y','言':'Y','严':'Y','颜':'Y','沿':'Y','眼':'Y','演':'Y','艳':'Y','厌':'Y','宴':'Y','验':'Y','羊':'Y','阳':'Y','杨':'Y','洋':'Y','仰':'Y','养':'Y','样':'Y','漾':'Y','邀':'Y','腰':'Y','摇':'Y','遥':'Y','咬':'Y','药':'Y','要':'Y','耀':'Y','也':'Y','冶':'Y','野':'Y','业':'Y','叶':'Y','夜':'Y','液':'Y','一':'Y','衣':'Y','医':'Y','依':'Y','仪':'Y','宜':'Y','姨':'Y','遗':'Y','移':'Y','疑':'Y','乙':'Y','已':'Y','以':'Y','尾':'Y','椅':'Y','意':'Y','义':'Y','亿':'Y','艺':'Y','忆':'Y','异':'Y','易':'Y','疫':'Y','益':'Y','谊':'Y','译':'Y','因':'Y','音':'Y','阴':'Y','银':'Y','尹':'Y','引':'Y','饮':'Y','印':'Y','应':'Y','英':'Y','樱':'Y','鹰':'Y','迎':'Y','赢':'Y','影':'Y','映':'Y','硬':'Y','哟':'Y','拥':'Y','永':'Y','勇':'Y','用':'Y','优':'Y','忧':'Y','悠':'Y','尤':'Y','由':'Y','邮':'Y','油':'Y','游':'Y','友':'Y','有':'Y','又':'Y','右':'Y','幼':'Y','诱':'Y','于':'Y','余':'Y','鱼':'Y','娱':'Y','渔':'Y','愉':'Y','雨':'Y','语':'Y','与':'Y','宇':'Y','羽':'Y','玉':'Y','育':'Y','浴':'Y','欲':'Y','御':'Y','遇':'Y','愈':'Y','誉':'Y','预':'Y','域':'Y','园':'Y','原':'Y','员':'Y','圆':'Y','元':'Y','袁':'Y','源':'Y','远':'Y','怨':'Y','院':'Y','愿':'Y','约':'Y','月':'Y','悦':'Y','阅':'Y','越':'Y','跃':'Y','云':'Y','匀':'Y','允':'Y','运':'Y','韵':'Y','孕':'Y',
        '杂':'Z','砸':'Z','灾':'Z','栽':'Z','载':'Z','再':'Z','在':'Z','咱':'Z','暂':'Z','赞':'Z','脏':'Z','葬':'Z','遭':'Z','糟':'Z','早':'Z','枣':'Z','澡':'Z','灶':'Z','造':'Z','噪':'Z','燥':'Z','躁':'Z','则':'Z','责':'Z','择':'Z','泽':'Z','贼':'Z','怎':'Z','增':'Z','赠':'Z','扎':'Z','眨':'Z','炸':'Z','摘':'Z','窄':'Z','宅':'Z','债':'Z','占':'Z','站':'Z','战':'Z','张':'Z','章':'Z','掌':'Z','仗':'Z','帐':'Z','账':'Z','胀':'Z','涨':'Z','障':'Z','招':'Z','找':'Z','召':'Z','照':'Z','罩':'Z','遮':'Z','折':'Z','哲':'Z','者':'Z','这':'Z','针':'Z','珍':'Z','真':'Z','振':'Z','镇':'Z','阵':'Z','正':'Z','证':'Z','政':'Z','之':'Z','只':'Z','知':'Z','支':'Z','枝':'Z','织':'Z','直':'Z','执':'Z','职':'Z','植':'Z','殖':'Z','值':'Z','止':'Z','旨':'Z','址':'Z','纸':'Z','指':'Z','至':'Z','治':'Z','制':'Z','致':'Z','置':'Z','中':'Z','钟':'Z','终':'Z','种':'Z','众':'Z','重':'Z','州':'Z','周':'Z','洲':'Z','舟':'Z','粥':'Z','轴':'Z','肘':'Z','皱':'Z','宙':'Z','昼':'Z','骤':'Z','朱':'Z','珠':'Z','株':'Z','蛛':'Z','猪':'Z','竹':'Z','烛':'Z','煮':'Z','主':'Z','住':'Z','注':'Z','助':'Z','祝':'Z','筑':'Z','铸':'Z','抓':'Z','专':'Z','砖':'Z','转':'Z','赚':'Z','庄':'Z','装':'Z','壮':'Z','状':'Z','撞':'Z','追':'Z','准':'Z','捉':'Z','桌':'Z','着':'Z','仔':'Z','子':'Z','紫':'Z','字':'Z','自':'Z','宗':'Z','总':'Z','纵':'Z','走':'Z','奏':'Z','租':'Z','足':'Z','族':'Z','阻':'Z','组':'Z','嘴':'Z','最':'Z','罪':'Z','醉':'Z','尊':'Z','昨':'Z','左':'Z','作':'Z','坐':'Z','座':'Z','做':'Z'
    };

    function wxGetFirstLetter(str) {
        if (!str) return '#';
        const firstChar = str.charAt(0);
        if (/[a-zA-Z]/.test(firstChar)) {
            return firstChar.toUpperCase();
        }
        if (PINYIN_MAP[firstChar]) {
            return PINYIN_MAP[firstChar];
        }
        return '#';
    }

    let wxContactsSearchKeyword = '';

    function wxHighlightText(text, keyword) {
        if (!text) return '';
        const str = String(text);
        if (!keyword) return str;
        const lower = str.toLowerCase();
        const idx = lower.indexOf(keyword);
        if (idx === -1) return str;
        const before = str.substring(0, idx);
        const match = str.substring(idx, idx + keyword.length);
        const after = str.substring(idx + keyword.length);
        return `${before}<span class="wx-contacts-search-highlight">${match}</span>${after}`;
    }

    function wxBuildContactItemHtml(contact, idx, groupLen, keyword) {
        const displayName = contact.displayName || contact.remark || contact.name || '未命名';
        const firstChar = displayName.charAt(0) || '?';
        const avatarHtml = contact.avatar
            ? `<img src="${contact.avatar}" alt="">`
            : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#576b95;color:#fff;font-size:16px;">${firstChar}</div>`;
        const divider = idx < groupLen - 1 ? '<div class="wx-contacts-divider"></div>' : '';
        const starIcon = contact.starred ? '<span class="wx-contact-star" title="星标好友">★</span>' : '';
        const nameDisplay = keyword ? wxHighlightText(displayName, keyword) : displayName;
        const safeId = contact.id.replace(/'/g, "\\'");
        return `
            <div class="wx-contacts-item" onclick="wxOpenContactDetail('${safeId}')">
                <div class="wx-contacts-avatar-wrap">
                    <div class="wx-contacts-avatar">${avatarHtml}</div>
                    ${starIcon}
                </div>
                <div class="wx-contacts-name">${nameDisplay}</div>
            </div>
            ${divider}
        `;
    }

    function wxRenderContacts() {
        const listEl = document.getElementById('wxContactsList');
        const indexEl = document.getElementById('wxContactsIndex');
        if (!listEl) return;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {
            contacts = [];
        }

        if (contacts.length === 0) {
            listEl.innerHTML = '<div style="text-align:center;color:#999;padding:60px 0;">暂无联系人</div>';
            if (indexEl) indexEl.innerHTML = '';
            return;
        }

        const keyword = (wxContactsSearchKeyword || '').trim().toLowerCase();

        let filtered = contacts;
        if (keyword) {
            filtered = contacts.filter(c => {
                const name = (c.name || '').toLowerCase();
                const remark = (c.remark || '').toLowerCase();
                const displayName = (c.displayName || '').toLowerCase();
                const tags = (c.tags || []).map(t => (t || '').toLowerCase());
                return name.indexOf(keyword) !== -1
                    || remark.indexOf(keyword) !== -1
                    || displayName.indexOf(keyword) !== -1
                    || tags.some(t => t.indexOf(keyword) !== -1);
            });
        }

        if (filtered.length === 0) {
            listEl.innerHTML = '<div style="text-align:center;color:#999;padding:60px 0;">未找到匹配的联系人</div>';
            if (indexEl) indexEl.innerHTML = '';
            return;
        }

        // 星标好友单独分组（仅在非搜索状态下显示在顶部）
        const starredContacts = keyword
            ? []
            : filtered.filter(c => c.starred);
        const nonStarredContacts = keyword
            ? filtered
            : filtered.filter(c => !c.starred);

        const groups = {};
        nonStarredContacts.forEach(contact => {
            const letter = wxGetFirstLetter(contact.name);
            if (!groups[letter]) {
                groups[letter] = [];
            }
            groups[letter].push(contact);
        });

        const sortedLetters = Object.keys(groups).sort((a, b) => {
            if (a === '#') return 1;
            if (b === '#') return -1;
            return a.localeCompare(b);
        });

        let html = '';

        if (starredContacts.length > 0) {
            html += `<div class="wx-contacts-group-title wx-contacts-star-group" data-letter="★">★ 星标好友</div>`;
            starredContacts.forEach((contact, idx) => {
                html += wxBuildContactItemHtml(contact, idx, starredContacts.length, keyword);
            });
        }

        sortedLetters.forEach(letter => {
            html += `<div class="wx-contacts-group-title" data-letter="${letter}">${letter}</div>`;
            groups[letter].forEach((contact, idx) => {
                html += wxBuildContactItemHtml(contact, idx, groups[letter].length, keyword);
            });
        });

        listEl.innerHTML = html;

        if (indexEl) {
            let indexHtml = '';
            if (starredContacts.length > 0) {
                indexHtml += `<span onclick="wxScrollToContactGroup('★')">★</span>`;
            }
            indexHtml += sortedLetters.map(l =>
                `<span onclick="wxScrollToContactGroup('${l}')">${l}</span>`
            ).join('');
            indexEl.innerHTML = indexHtml;
        }
    }

    window.wxScrollToContactGroup = function(letter) {
        const listEl = document.getElementById('wxContactsList');
        const target = listEl ? listEl.querySelector(`.wx-contacts-group-title[data-letter="${letter}"]`) : null;
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // 切换联系人星标状态
    window.wxToggleStarContact = function() {
        if (!wxCurrentContactId) return;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const idx = contacts.findIndex(c => c.id === wxCurrentContactId);
        if (idx === -1) return;

        contacts[idx].starred = !contacts[idx].starred;
        try {
            localStorage.setItem('wx_contacts', JSON.stringify(contacts));
        } catch (e) {}

        const starSwitch = document.getElementById('wxStarSwitch');
        if (starSwitch) {
            starSwitch.classList.remove('on', 'off');
            starSwitch.classList.add(contacts[idx].starred ? 'on' : 'off');
        }

        if (typeof wxRenderContacts === 'function') {
            wxRenderContacts();
        }

        wxShowToast(contacts[idx].starred ? '已设为星标好友' : '已取消星标');
    };

    // 初始化通讯录搜索框（将静态 span 替换为 input）
    window.wxInitContactsSearch = function() {
        const searchBox = document.querySelector('.wx-contacts-search-box');
        if (!searchBox) return;
        if (searchBox.querySelector('.wx-contacts-search-input')) return;

        const span = searchBox.querySelector('span');
        if (span) span.remove();

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'wx-contacts-search-input';
        input.placeholder = '搜索';
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('spellcheck', 'false');

        input.addEventListener('input', function() {
            wxSearchContacts(this.value);
        });

        searchBox.appendChild(input);
    };

    // 搜索联系人（按名字、备注、标签匹配）
    window.wxSearchContacts = function(keyword) {
        wxContactsSearchKeyword = keyword || '';
        wxRenderContacts();
    };

    // 收集所有标签及其联系人数量
    function wxGetAllTagsWithCount() {
        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}

        let globalTags = [];
        try {
            globalTags = JSON.parse(localStorage.getItem('wx_tags') || '[]');
        } catch (e) {}

        const tagCount = {};
        globalTags.forEach(t => {
            if (!tagCount[t]) tagCount[t] = 0;
        });
        contacts.forEach(c => {
            (c.tags || []).forEach(t => {
                tagCount[t] = (tagCount[t] || 0) + 1;
            });
        });

        return Object.keys(tagCount).sort().map(name => ({ name: name, count: tagCount[name] }));
    }

    window.wxRenderTagManagementList = function() {
        const body = document.getElementById('wxTagManagementBody');
        if (!body) return;

        const tags = wxGetAllTagsWithCount();

        if (tags.length === 0) {
            body.innerHTML = '<div style="text-align:center;color:#999;padding:60px 0;line-height:1.8;">暂无标签<br><span style="font-size:13px;">点击右上角"+"创建标签</span></div>';
            return;
        }

        let html = '';
        tags.forEach((tag, idx) => {
            const divider = idx < tags.length - 1 ? '<div class="wx-tag-management-divider"></div>' : '';
            const safeName = tag.name.replace(/'/g, "\\'");
            html += `
                <div class="wx-tag-management-item" onclick="wxViewTagContacts('${safeName}')">
                    <div class="wx-tag-management-info">
                        <span class="wx-tag-management-name">${tag.name}</span>
                        <span class="wx-tag-management-count">${tag.count}人</span>
                    </div>
                    <div class="wx-tag-management-actions">
                        <span class="wx-tag-management-delete" onclick="event.stopPropagation(); wxDeleteTag('${safeName}')">×</span>
                    </div>
                </div>
                ${divider}
            `;
        });
        body.innerHTML = html;
    };

    // 打开标签管理页面
    window.wxOpenTagManagement = function() {
        wxCloseTagManagement();

        const page = document.createElement('div');
        page.className = 'wx-tag-management-page';
        page.id = 'wxTagManagementPage';
        page.innerHTML = `
            <div class="wx-nav-bar">
                <div class="wx-nav-left">
                    <div class="wx-nav-btn" onclick="wxCloseTagManagement()">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#000" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                    </div>
                </div>
                <div class="wx-nav-title">标签</div>
                <div class="wx-nav-right">
                    <div class="wx-nav-btn wx-tag-management-add" onclick="wxCreateTag()">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#000" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </div>
                </div>
            </div>
            <div class="wx-tag-management-body" id="wxTagManagementBody"></div>
        `;

        const contactsTab = document.getElementById('wxTabContacts');
        if (contactsTab) {
            contactsTab.appendChild(page);
        } else {
            document.body.appendChild(page);
        }

        requestAnimationFrame(() => {
            page.classList.add('show');
        });

        wxRenderTagManagementList();
    };

    // 关闭标签管理页面
    window.wxCloseTagManagement = function() {
        const page = document.getElementById('wxTagManagementPage');
        if (!page) return;
        page.classList.remove('show');
        setTimeout(() => {
            const p = document.getElementById('wxTagManagementPage');
            if (p) p.remove();
        }, 250);
    };

    // 创建新标签
    window.wxCreateTag = function() {
        const name = prompt('请输入标签名称：');
        if (name === null) return;
        const trimmed = name.trim();
        if (!trimmed) {
            wxShowToast('标签名不能为空');
            return;
        }

        const allTags = wxGetAllTagsWithCount();
        if (allTags.some(t => t.name === trimmed)) {
            wxShowToast('标签已存在');
            return;
        }

        let globalTags = [];
        try {
            globalTags = JSON.parse(localStorage.getItem('wx_tags') || '[]');
        } catch (e) {}
        globalTags.push(trimmed);
        try {
            localStorage.setItem('wx_tags', JSON.stringify(globalTags));
        } catch (e) {}

        wxRenderTagManagementList();
        wxShowToast('标签已创建');
    };

    // 删除标签（同时从所有联系人中移除）
    window.wxDeleteTag = function(tagName) {
        const confirmed = confirm('确定要删除标签"' + tagName + '"吗？\n该标签将从所有联系人中移除。');
        if (!confirmed) return;

        let globalTags = [];
        try {
            globalTags = JSON.parse(localStorage.getItem('wx_tags') || '[]');
        } catch (e) {}
        const newGlobalTags = globalTags.filter(t => t !== tagName);
        try {
            localStorage.setItem('wx_tags', JSON.stringify(newGlobalTags));
        } catch (e) {}

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        contacts.forEach(c => {
            if (c.tags && Array.isArray(c.tags)) {
                c.tags = c.tags.filter(t => t !== tagName);
            }
        });
        try {
            localStorage.setItem('wx_contacts', JSON.stringify(contacts));
        } catch (e) {}

        wxRenderTagManagementList();
        wxShowToast('标签已删除');
    };

    // 查看标签下的联系人
    window.wxViewTagContacts = function(tagName) {
        const body = document.getElementById('wxTagManagementBody');
        if (!body) return;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}

        const tagContacts = contacts.filter(c => (c.tags || []).indexOf(tagName) !== -1);

        let html = `
            <div class="wx-tag-management-contacts-header">
                <div class="wx-nav-btn" onclick="wxRenderTagManagementList()">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#000" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                </div>
                <span class="wx-tag-management-contacts-title">${tagName} (${tagContacts.length})</span>
            </div>
        `;

        if (tagContacts.length === 0) {
            html += '<div style="text-align:center;color:#999;padding:60px 0;">该标签下暂无联系人</div>';
        } else {
            tagContacts.forEach((contact, idx) => {
                html += wxBuildContactItemHtml(contact, idx, tagContacts.length, '');
            });
        }

        body.innerHTML = html;
    };

    window.wxOpenContactDetail = function(contactId) {
        wxCurrentContactId = contactId;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const contact = contacts.find(c => c.id === contactId);
        if (!contact) {
            wxShowToast('联系人不存在');
            return;
        }

        const avatarEl = document.getElementById('wxContactDetailAvatar');
        const avatarPlaceholderEl = document.getElementById('wxContactDetailAvatarPlaceholder');
        const nameEl = document.getElementById('wxContactDetailName');
        const wxidEl = document.getElementById('wxContactDetailWxid');
        const constellationEl = document.getElementById('wxContactDetailConstellation');
        const personaEl = document.getElementById('wxContactDetailPersona');

        if (nameEl) nameEl.textContent = contact.name || '未命名';
        if (wxidEl) wxidEl.textContent = '微信号: wxid_' + contactId.substring(0, 10);
        if (constellationEl) constellationEl.textContent = contact.constellation || '未知星座';
        if (personaEl) personaEl.textContent = contact.persona || '暂无描述';

        if (avatarEl) {
            if (contact.avatar) {
                avatarEl.innerHTML = `<img src="${contact.avatar}" alt="">`;
            } else {
                const firstChar = contact.name ? contact.name.charAt(0) : '?';
                avatarEl.innerHTML = `<div class="wx-contact-detail-avatar-placeholder">${firstChar}</div>`;
            }
        }

        // 动态添加星标好友开关行
        const detailBody = document.querySelector('#wxPageContactDetail .wx-contact-detail-body');
        const existingStarToggle = document.querySelector('#wxPageContactDetail .wx-contact-star-toggle-section');
        if (existingStarToggle) existingStarToggle.remove();
        if (detailBody) {
            const isStarred = !!contact.starred;
            const starSection = document.createElement('div');
            starSection.className = 'wx-contact-detail-section wx-contact-star-toggle-section';
            starSection.innerHTML = `
                <div class="wx-contact-detail-row wx-contact-star-toggle" onclick="wxToggleStarContact()">
                    <span class="wx-contact-detail-label">设为星标好友</span>
                    <div class="wx-star-switch ${isStarred ? 'on' : 'off'}" id="wxStarSwitch">
                        <div class="wx-star-switch-knob"></div>
                    </div>
                </div>
            `;
            const header = detailBody.querySelector('.wx-contact-detail-header');
            if (header && header.nextSibling) {
                detailBody.insertBefore(starSection, header.nextSibling);
            } else if (header) {
                detailBody.appendChild(starSection);
            } else {
                detailBody.insertBefore(starSection, detailBody.firstChild);
            }
        }

        const page = document.getElementById('wxPageContactDetail');
        if (page) page.classList.add('wx-page-show');
    };

    window.wxCloseContactDetail = function() {
        const page = document.getElementById('wxPageContactDetail');
        if (page) page.classList.remove('wx-page-show');
        wxCurrentContactId = null;
    };

    window.wxContactDetailSendMsg = function() {
        if (!wxCurrentContactId) return;
        wxCloseContactDetail();
        setTimeout(() => {
            if (typeof wxOpenChat === 'function') {
                wxOpenChat(wxCurrentContactId);
            }
        }, 100);
    };

    // 联系人详情菜单
    window.wxToggleContactMenu = function(e) {
        e.stopPropagation();
        const panel = document.getElementById('wxContactMenuPanel');
        if (panel) panel.classList.toggle('show');
    };

    window.wxCloseContactMenu = function() {
        const panel = document.getElementById('wxContactMenuPanel');
        if (panel) panel.classList.remove('show');
    };

    // 设置备注
    window.wxSetContactRemark = function() {
        if (!wxCurrentContactId) return;
        wxCloseContactMenu();

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const contact = contacts.find(c => c.id === wxCurrentContactId);
        if (!contact) return;

        const currentRemark = contact.remark || contact.name || '';
        const newRemark = prompt('请输入备注名：', currentRemark);
        if (newRemark === null) return; // 用户取消

        // 更新联系人备注
        contact.remark = newRemark.trim();
        contact.displayName = newRemark.trim() || contact.name;

        try {
            localStorage.setItem('wx_contacts', JSON.stringify(contacts));
        } catch (e) {}

        // 更新详情页显示
        const nameEl = document.getElementById('wxContactDetailName');
        if (nameEl) nameEl.textContent = contact.displayName || contact.name;

        wxShowToast('备注已更新');
    };

    // 删除联系人
    window.wxDeleteContact = function() {
        if (!wxCurrentContactId) return;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const contact = contacts.find(c => c.id === wxCurrentContactId);
        if (!contact) {
            wxCloseContactMenu();
            return;
        }

        const displayName = contact.displayName || contact.remark || contact.name;
        const confirmed = confirm(`确定要删除联系人"${displayName}"吗？`);
        if (!confirmed) return;

        // 删除联系人
        const newContacts = contacts.filter(c => c.id !== wxCurrentContactId);
        try {
            localStorage.setItem('wx_contacts', JSON.stringify(newContacts));
        } catch (e) {}

        // 删除相关聊天记录
        let chats = [];
        try {
            chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
        } catch (e) {}
        const newChats = chats.filter(c => c.id !== wxCurrentContactId);
        try {
            localStorage.setItem('wx_chats', JSON.stringify(newChats));
        } catch (e) {}

        wxCloseContactMenu();
        wxCloseContactDetail();

        // 刷新联系人列表
        if (typeof wxRenderContacts === 'function') {
            wxRenderContacts();
        }

        wxShowToast('已删除联系人');
    };

    // 头像上传
    window.wxTriggerContactAvatarUpload = function() {
        const fileInput = document.getElementById('wxContactAvatarFile');
        if (fileInput) fileInput.click();
    };

    document.getElementById('wxContactAvatarFile')?.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(ev) {
            const avatarData = ev.target.result;
            
            let contacts = [];
            try {
                contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
            } catch (e) {}
            
            const idx = contacts.findIndex(c => c.id === wxCurrentContactId);
            if (idx !== -1) {
                contacts[idx].avatar = avatarData;
                try {
                    localStorage.setItem('wx_contacts', JSON.stringify(contacts));
                } catch (e) {}
            }

            const avatarEl = document.getElementById('wxContactDetailAvatar');
            const remarkTagAvatarEl = document.getElementById('wxRemarkTagAvatar');
            if (avatarEl) avatarEl.innerHTML = `<img src="${avatarData}" alt="">`;
            if (remarkTagAvatarEl) remarkTagAvatarEl.innerHTML = `<img src="${avatarData}" alt="">`;

            if (typeof wxRenderContacts === 'function') {
                wxRenderContacts();
            }
            if (typeof debounceRenderChatList === 'function') {
                debounceRenderChatList();
            }

            wxShowToast('头像已更新');
        };
        reader.readAsDataURL(file);
        this.value = '';
    });

    // 备注和标签页面
    let wxCurrentEditTags = [];

    window.wxOpenRemarkTagPage = function() {
        if (!wxCurrentContactId) return;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const contact = contacts.find(c => c.id === wxCurrentContactId);
        if (!contact) return;

        wxCloseContactMenu();

        const avatarEl = document.getElementById('wxRemarkTagAvatar');
        const avatarPlaceholderEl = document.getElementById('wxRemarkTagAvatarPlaceholder');
        const originalNameEl = document.getElementById('wxRemarkTagOriginalName');
        const remarkInput = document.getElementById('wxRemarkInput');
        const tagList = document.getElementById('wxTagList');

        if (originalNameEl) originalNameEl.textContent = contact.name || '未命名';
        if (remarkInput) remarkInput.value = contact.remark || '';

        wxCurrentEditTags = contact.tags ? [...contact.tags] : [];

        if (avatarEl) {
            if (contact.avatar) {
                avatarEl.innerHTML = `<img src="${contact.avatar}" alt="">`;
            } else {
                const firstChar = contact.name ? contact.name.charAt(0) : '?';
                avatarEl.innerHTML = `<div class="wx-contact-detail-avatar-placeholder">${firstChar}</div>`;
            }
        }

        wxRenderTagList();

        const page = document.getElementById('wxPageRemarkTag');
        if (page) page.classList.add('wx-page-show');
    };

    window.wxCloseRemarkTagPage = function() {
        const page = document.getElementById('wxPageRemarkTag');
        if (page) page.classList.remove('wx-page-show');
        wxCurrentEditTags = [];
    };

    function wxRenderTagList() {
        const tagList = document.getElementById('wxTagList');
        if (!tagList) return;

        let html = '';
        if (wxCurrentEditTags.length > 0) {
            html += wxCurrentEditTags.map((tag, idx) => `
                <div class="wx-tag-item">
                    <span>${tag}</span>
                    <span class="wx-tag-remove" onclick="wxRemoveTag(${idx})">×</span>
                </div>
            `).join('');
        }
        html += `
            <div class="wx-tag-item wx-tag-add" onclick="wxAddTag()">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#999" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>添加标签</span>
            </div>
        `;
        tagList.innerHTML = html;
    }

    window.wxAddTag = function() {
        const tagInput = document.getElementById('wxTagInput');
        if (!tagInput) return;
        
        tagInput.style.display = 'block';
        tagInput.focus();
    };

    window.wxRemoveTag = function(index) {
        wxCurrentEditTags.splice(index, 1);
        wxRenderTagList();
    };

    document.getElementById('wxTagInput')?.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const tag = this.value.trim();
            if (tag && !wxCurrentEditTags.includes(tag)) {
                wxCurrentEditTags.push(tag);
                wxRenderTagList();
            }
            this.value = '';
            this.style.display = 'none';
        } else if (e.key === 'Escape') {
            this.value = '';
            this.style.display = 'none';
        }
    });

    window.wxSaveRemarkTag = function() {
        if (!wxCurrentContactId) return;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}

        const idx = contacts.findIndex(c => c.id === wxCurrentContactId);
        if (idx === -1) return;

        const remarkInput = document.getElementById('wxRemarkInput');
        const remark = remarkInput ? remarkInput.value.trim() : '';

        contacts[idx].remark = remark;
        contacts[idx].displayName = remark || contacts[idx].name;
        contacts[idx].tags = wxCurrentEditTags;

        try {
            localStorage.setItem('wx_contacts', JSON.stringify(contacts));
        } catch (e) {}

        wxCloseRemarkTagPage();

        const nameEl = document.getElementById('wxContactDetailName');
        if (nameEl) nameEl.textContent = contacts[idx].displayName || contacts[idx].name;

        if (typeof wxRenderContacts === 'function') {
            wxRenderContacts();
        }
        if (typeof debounceRenderChatList === 'function') {
            debounceRenderChatList();
        }

        wxShowToast('已保存');
    };

    // 人设编辑
    window.wxEditContactPersona = function() {
        if (!wxCurrentContactId) return;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const contact = contacts.find(c => c.id === wxCurrentContactId);
        if (!contact) return;

        const textarea = document.getElementById('wxEditContactPersonaTextarea');
        if (textarea) textarea.value = contact.persona || '';

        const page = document.getElementById('wxPageEditPersona');
        if (page) page.classList.add('wx-page-show');
    };

    window.wxCloseEditPersona = function() {
        const page = document.getElementById('wxPageEditPersona');
        if (page) page.classList.remove('wx-page-show');
    };

    window.wxSaveContactPersona = function() {
        if (!wxCurrentContactId) return;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}

        const idx = contacts.findIndex(c => c.id === wxCurrentContactId);
        if (idx === -1) return;

        const textarea = document.getElementById('wxEditContactPersonaTextarea');
        const persona = textarea ? textarea.value.trim() : '';

        contacts[idx].persona = persona;

        try {
            localStorage.setItem('wx_contacts', JSON.stringify(contacts));
        } catch (e) {}

        wxCloseEditPersona();

        const personaEl = document.getElementById('wxContactDetailPersona');
        if (personaEl) personaEl.textContent = persona || '暂无描述';

        wxShowToast('人设已保存');
    };

    // 联系人朋友圈
    window.wxOpenContactMoments = function() {
        if (!wxCurrentContactId) return;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const contact = contacts.find(c => c.id === wxCurrentContactId);
        if (!contact) return;

        const avatarEl = document.getElementById('wxContactMomentsAvatar');
        const nameEl = document.getElementById('wxContactMomentsName');

        if (avatarEl) {
            if (contact.avatar) {
                avatarEl.innerHTML = `<img src="${contact.avatar}" alt="">`;
            } else {
                const firstChar = contact.name ? contact.name.charAt(0) : '?';
                avatarEl.innerHTML = `<div class="wx-contact-moments-avatar-placeholder">${firstChar}</div>`;
            }
        }
        if (nameEl) nameEl.textContent = contact.displayName || contact.remark || contact.name || '联系人';

        // 筛选该联系人的朋友圈
        let moments = [];
        try {
            moments = JSON.parse(localStorage.getItem('wx_moments') || '[]');
        } catch (e) {}

        const contactMoments = moments.filter(m => m.userId === wxCurrentContactId || m.nickname === contact.name);

        const listEl = document.getElementById('wxContactMomentsList');
        if (!listEl) return;

        if (contactMoments.length === 0) {
            listEl.innerHTML = '<div style="text-align:center;color:#999;padding:60px 0;">暂无朋友圈动态</div>';
        } else {
            listEl.innerHTML = contactMoments.map((moment, idx) => {
                const firstChar = moment.nickname ? moment.nickname.charAt(0) : '?';
                const avatarHtml = moment.avatar 
                    ? `<img src="${moment.avatar}" alt="">`
                    : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#576b95;color:#fff;font-size:16px;">${firstChar}</div>`;
                
                let imagesHtml = '';
                if (moment.images && moment.images.length > 0) {
                    const imgCount = moment.images.length;
                    imagesHtml = `<div class="wx-moment-images img-${imgCount}">`;
                    moment.images.forEach(img => {
                        imagesHtml += `<div class="wx-moment-img"><img src="${img}" alt=""></div>`;
                    });
                    imagesHtml += `</div>`;
                }

                const videoHtml = moment.videoUrl
                    ? `<div class="wx-moment-video"><video src="${moment.videoUrl}" controls playsinline webkit-playsinline></video></div>`
                    : '';

                const likesHtml = moment.likes && moment.likes.length > 0
                    ? `<div class="wx-moment-likes">
                        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        <span>${moment.likes.join('，')}</span>
                       </div>`
                    : '';

                const commentsHtml = moment.comments && moment.comments.length > 0
                    ? moment.comments.map(c => 
                        `<div class="wx-moment-comment"><span class="wx-moment-comment-name">${c.name}：</span>${c.content}</div>`
                      ).join('')
                    : '';

                return `
                    <div class="wx-moment-item">
                        <div class="wx-moment-avatar">${avatarHtml}</div>
                        <div class="wx-moment-body">
                            <div class="wx-moment-name">${moment.nickname || '匿名'}</div>
                            ${moment.text ? `<div class="wx-moment-text">${moment.text}</div>` : ''}
                            ${imagesHtml}
                            ${videoHtml}
                            <div class="wx-moment-footer">
                                <span class="wx-moment-time">${moment.time || ''}</span>
                            </div>
                            <div class="wx-moment-likes-comments">
                                ${likesHtml}
                                ${likesHtml && commentsHtml ? '<div class="wx-moment-likes-divider"></div>' : ''}
                                ${commentsHtml}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        const page = document.getElementById('wxPageContactMoments');
        if (page) page.classList.add('wx-page-show');
    };

    window.wxCloseContactMoments = function() {
        const page = document.getElementById('wxPageContactMoments');
        if (page) page.classList.remove('wx-page-show');
    };

    // 私聊页面菜单
    window.wxOpenChatMenu = function(e) {
        if (e) e.stopPropagation();
        const panel = document.getElementById('wxChatMenuPanel');
        if (panel) panel.classList.add('show');
    };

    window.wxCloseChatMenu = function() {
        const panel = document.getElementById('wxChatMenuPanel');
        if (panel) panel.classList.remove('show');
    };

    window.wxChatMenuViewDetail = function() {
        wxCloseChatMenu();
        if (wxCurrentChatId) {
            wxOpenContactDetail(wxCurrentChatId);
        }
    };

    window.wxChatMenuSetRemark = function() {
        wxCloseChatMenu();
        if (!wxCurrentChatId) return;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const contact = contacts.find(c => c.id === wxCurrentChatId);
        if (!contact) return;

        const currentRemark = contact.remark || contact.name || '';
        const remark = prompt('设置备注', currentRemark);
        if (remark === null) return;

        const idx = contacts.findIndex(c => c.id === wxCurrentChatId);
        if (idx !== -1) {
            contacts[idx].remark = remark.trim();
            try {
                localStorage.setItem('wx_contacts', JSON.stringify(contacts));
            } catch (e) {}

            // 更新聊天列表显示
            let chats = [];
            try {
                chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
            } catch (e) {}
            const chatIdx = chats.findIndex(c => c.id === wxCurrentChatId);
            if (chatIdx !== -1) {
                chats[chatIdx].name = remark.trim() || contacts[idx].name;
                try {
                    localStorage.setItem('wx_chats', JSON.stringify(chats));
                } catch (e) {}
            }

            // 更新页面标题
            const titleEl = document.getElementById('wxChatTitle');
            if (titleEl) titleEl.textContent = remark.trim() || contacts[idx].name;

            debounceRenderChatList();
            wxShowToast('备注已更新');
        }
    };

    window.wxChatMenuDeleteContact = function() {
        wxCloseChatMenu();
        if (!wxCurrentChatId) return;

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const contact = contacts.find(c => c.id === wxCurrentChatId);
        if (!contact) return;

        const displayName = contact.remark || contact.name;
        const confirmed = confirm('确定要删除联系人"' + displayName + '"吗？');
        if (!confirmed) return;

        // 删除联系人
        const newContacts = contacts.filter(c => c.id !== wxCurrentChatId);
        try {
            localStorage.setItem('wx_contacts', JSON.stringify(newContacts));
        } catch (e) {}

        // 删除相关聊天记录
        let chats = [];
        try {
            chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
        } catch (e) {}
        const newChats = chats.filter(c => c.id !== wxCurrentChatId);
        try {
            localStorage.setItem('wx_chats', JSON.stringify(newChats));
        } catch (e) {}

        // 删除消息记录
        let messages = {};
        try {
            messages = JSON.parse(localStorage.getItem('wx_messages') || '{}');
        } catch (e) {}
        delete messages[wxCurrentChatId];
        try {
            localStorage.setItem('wx_messages', JSON.stringify(messages));
        } catch (e) {}

        wxCloseChat();
        debounceRenderChatList();
        wxShowToast('已删除联系人');
    };

    // 私聊更多面板
    window.wxToggleChatMorePanel = function() {
        const panel = document.getElementById('wxChatMorePanel');
        if (panel) panel.classList.toggle('show');
    };
    window.wxCloseChatMorePanel = function() {
        const panel = document.getElementById('wxChatMorePanel');
        if (panel) panel.classList.remove('show');
    };

    // 私聊红包
    window.wxOpenChatRedPacket = function() {
        wxCloseChatMorePanel();
        wxRedPacketType = 'exclusive';
        wxRedPacketRecipientId = wxCurrentChatId;
        const amountInput = document.getElementById('wxRedPacketAmount');
        const msgInput = document.getElementById('wxRedPacketMessage');
        if (amountInput) amountInput.value = '';
        if (msgInput) msgInput.value = '';
        wxSetRedPacketType('exclusive');
        const recipientName = document.getElementById('wxRedPacketRecipientName');
        let contacts = [];
        try { contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]'); } catch(e) {}
        const contact = contacts.find(c => c.id === wxCurrentChatId);
        if (recipientName) { recipientName.textContent = contact ? (contact.remark || contact.name) : '对方'; recipientName.classList.add('selected'); }
        const page = document.getElementById('wxPageRedPacket');
        if (page) page.classList.add('wx-page-show');
    };

    // 私聊转账
    window.wxOpenChatTransfer = function() {
        wxCloseChatMorePanel();
        let contacts = [];
        try { contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]'); } catch(e) {}
        const contact = contacts.find(c => c.id === wxCurrentChatId);
        wxTransferRecipientId = wxCurrentChatId;
        wxTransferRecipientName = contact ? (contact.remark || contact.name) : '对方';
        const amountInput = document.getElementById('wxTransferAmount');
        const msgInput = document.getElementById('wxTransferMessage');
        if (amountInput) amountInput.value = '';
        if (msgInput) msgInput.value = '';
        const recipientEl = document.getElementById('wxTransferRecipientName');
        if (recipientEl) recipientEl.textContent = wxTransferRecipientName;
        const page = document.getElementById('wxPageTransfer');
        if (page) page.classList.add('wx-page-show');
    };

    // 私聊投票
    window.wxOpenChatVote = function() {
        wxCloseChatMorePanel();
        const page = document.getElementById('wxPageVote');
        if (page) page.classList.add('wx-page-show');
        wxVoteTopic = '';
        wxVoteOptions = ['', ''];
        wxVoteMultiSelect = false;
        wxVoteAnonymous = false;
        const topicInput = document.getElementById('wxVoteTopic');
        if (topicInput) topicInput.value = '';
        wxRenderVoteOptions();
    };

    // 私聊接龙
    window.wxOpenChatSolitaire = function() {
        wxCloseChatMorePanel();
        const page = document.getElementById('wxPageSolitaire');
        if (page) page.classList.add('wx-page-show');
        const topicInput = document.getElementById('wxSolitaireTopic');
        const contentInput = document.getElementById('wxSolitaireContent');
        if (topicInput) topicInput.value = '';
        if (contentInput) contentInput.value = '';
    };

    // 私聊图片上传
    window.wxTriggerChatImageUpload = function() {
        wxCloseChatMorePanel();
        const fileInput = document.getElementById('wxChatImageFile');
        if (fileInput) fileInput.click();
    };
    document.getElementById('wxChatImageFile')?.addEventListener('change', function(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(evt) {
            wxSendChatImage(evt.target?.result);
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    });
    window.wxSendChatImage = function(base64) {
        if (!wxCurrentChatId) return;
        const messages = wxGetMessages();
        if (!messages[wxCurrentChatId]) messages[wxCurrentChatId] = [];
        messages[wxCurrentChatId].push({
            from: 'me',
            type: 'image',
            content: base64,
            time: Date.now()
        });
        wxSaveMessages(messages);
        wxRenderMessages();
        const messagesEl = document.getElementById('wxChatMessages');
        if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight;
        // 更新聊天列表最后消息
        let chats = [];
        try { chats = JSON.parse(localStorage.getItem('wx_chats') || '[]'); } catch(e) {}
        const chatIdx = chats.findIndex(c => c.id === wxCurrentChatId);
        if (chatIdx !== -1) {
            chats[chatIdx].lastMessage = '[图片]';
            chats[chatIdx].time = new Date().toLocaleTimeString('zh-CN', {hour:'2-digit', minute:'2-digit'});
            try { localStorage.setItem('wx_chats', JSON.stringify(chats)); } catch(e) {}
        }
        debounceRenderChatList();
    };

    function wxRenderMoments() {
        const listEl = document.getElementById('wxMomentsList');
        if (!listEl) return;

        let moments = [];
        try {
            moments = JSON.parse(localStorage.getItem('wx_moments') || '[]');
        } catch (e) {
            moments = [];
        }

        const user = wxGetUser();

        const avatarEl = document.getElementById('wxMomentsAvatar');
        const nicknameEl = document.getElementById('wxMomentsNickname');
        const coverBgEl = document.getElementById('wxMomentsCoverBg');
        if (avatarEl) {
            if (user.avatar) {
                avatarEl.innerHTML = `<img src="${user.avatar}" alt="">`;
            } else {
                const firstChar = user.nickname ? user.nickname.charAt(0) : '我';
                avatarEl.innerHTML = `<div class="wx-moments-avatar-placeholder">${firstChar}</div>`;
            }
        }
        if (nicknameEl) nicknameEl.textContent = user.nickname || '我';
        const signatureEl = document.getElementById('wxMomentsSignature');
        if (signatureEl) {
            signatureEl.textContent = user.signature || '点击添加个性签名';
            if (!user.signature) signatureEl.style.opacity = '0.6';
            else signatureEl.style.opacity = '1';
        }
        if (coverBgEl) {
            if (user.cover) {
                coverBgEl.style.backgroundImage = `url(${user.cover})`;
                coverBgEl.style.background = `url(${user.cover}) center/cover`;
            } else {
                coverBgEl.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
        }

        if (moments.length === 0) {
            listEl.innerHTML = '<div style="text-align:center;color:#999;padding:60px 0;">暂无朋友圈动态</div>';
            return;
        }

        listEl.innerHTML = moments.map((moment, idx) => {
            const firstChar = moment.nickname ? moment.nickname.charAt(0) : '?';
            const avatarHtml = moment.avatar 
                ? `<img src="${moment.avatar}" alt="">`
                : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#576b95;color:#fff;font-size:16px;">${firstChar}</div>`;
            
            let imagesHtml = '';
            if (moment.images && moment.images.length > 0) {
                const imgCount = moment.images.length;
                imagesHtml = `<div class="wx-moment-images img-${imgCount}">`;
                moment.images.forEach(img => {
                    imagesHtml += `<div class="wx-moment-img"><img src="${img}" alt=""></div>`;
                });
                imagesHtml += `</div>`;
            }

            const videoHtml = moment.videoUrl
                ? `<div class="wx-moment-video"><video src="${moment.videoUrl}" controls playsinline webkit-playsinline></video></div>`
                : '';

            const visibilityTagHtml = (moment.visibility && moment.visibility !== 'public')
                ? `<div class="wx-moment-visibility-tag">${moment.visibility === 'private' ? '仅自己可见' : '部分可见'}</div>`
                : '';

            const likesHtml = moment.likes && moment.likes.length > 0
                ? `<div class="wx-moment-likes">
                    <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    <span>${moment.likes.join('，')}</span>
                   </div>`
                : '';

            const commentsHtml = moment.comments && moment.comments.length > 0
                ? moment.comments.map(c => 
                    `<div class="wx-moment-comment"><span class="wx-moment-comment-name">${c.name}：</span>${c.content}</div>`
                  ).join('')
                : '';

            const divider = idx < moments.length - 1 ? '<div class="wx-moment-divider"></div>' : '';

            return `
                <div class="wx-moment-item" data-moment-id="${moment.id}">
                    <div class="wx-moment-avatar">${avatarHtml}</div>
                    <div class="wx-moment-body">
                        <div class="wx-moment-name">${moment.nickname || '匿名'}</div>
                        ${moment.text ? `<div class="wx-moment-text">${moment.text}</div>` : ''}
                        ${imagesHtml}
                        ${videoHtml}
                        ${visibilityTagHtml}
                        <div class="wx-moment-footer">
                            <span class="wx-moment-time">${moment.time || ''}</span>
                            <div class="wx-moment-actions-btn">
                                <div class="wx-moment-action-icon" onclick="wxToggleMomentMenu('${moment.id}', event)">
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#888" stroke-width="2"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                                </div>
                                <div class="wx-moment-action-menu" id="wxMomentMenu_${moment.id}">
                                    <div class="wx-moment-action-item" onclick="wxLikeMoment('${moment.id}')">
                                        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                                        <span>赞</span>
                                    </div>
                                    <div class="wx-moment-action-item" onclick="wxCommentMoment('${moment.id}')">
                                        <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                                        <span>评论</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="wx-moment-likes-comments ${(likesHtml || commentsHtml) ? 'show' : ''}" id="wxMomentLikesComments_${moment.id}">
                            ${likesHtml}
                            ${likesHtml && commentsHtml ? '<div class="wx-moment-likes-divider"></div>' : ''}
                            ${commentsHtml}
                        </div>
                    </div>
                </div>
                ${divider}
            `;
        }).join('');
    }

    window.wxToggleMomentMenu = function(momentId, event) {
        event.stopPropagation();
        const menuEl = document.getElementById('wxMomentMenu_' + momentId);
        const allMenus = document.querySelectorAll('.wx-moment-action-menu');
        allMenus.forEach(m => {
            if (m.id !== 'wxMomentMenu_' + momentId) {
                m.classList.remove('show');
            }
        });
        if (menuEl) {
            menuEl.classList.toggle('show');
        }
    };

    document.addEventListener('click', function() {
        const allMenus = document.querySelectorAll('.wx-moment-action-menu');
        allMenus.forEach(m => m.classList.remove('show'));
    });

    window.wxLikeMoment = function(momentId) {
        let moments = [];
        try {
            moments = JSON.parse(localStorage.getItem('wx_moments') || '[]');
        } catch (e) {}
        
        const momentIndex = moments.findIndex(m => m.id === momentId);
        if (momentIndex === -1) return;

        const user = wxGetUser();
        const myName = user.nickname || '我';

        if (!moments[momentIndex].likes) {
            moments[momentIndex].likes = [];
        }

        const likeIndex = moments[momentIndex].likes.indexOf(myName);
        if (likeIndex > -1) {
            moments[momentIndex].likes.splice(likeIndex, 1);
        } else {
            moments[momentIndex].likes.push(myName);
        }

        const lcEl = document.getElementById('wxMomentLikesComments_' + momentId);
        if (lcEl) {
            lcEl.classList.add('show');
        }

        localStorage.setItem('wx_moments', JSON.stringify(moments));
        wxRenderMoments();
    };

    window.wxCommentMoment = function(momentId) {
        wxShowCommentInput(momentId);
    };

    // ===== 评论输入栏 =====
    window.wxShowCommentInput = function(momentId) {
        wxCommentTargetMomentId = momentId;
        // 关闭所有操作菜单
        document.querySelectorAll('.wx-moment-action-menu').forEach(function(m) {
            m.classList.remove('show');
        });

        let mask = document.getElementById('wxCommentInputMask');
        if (!mask) {
            mask = document.createElement('div');
            mask.id = 'wxCommentInputMask';
            mask.className = 'wx-comment-input-mask';
            mask.addEventListener('click', wxHideCommentInput);
            document.body.appendChild(mask);
        }

        let bar = document.getElementById('wxCommentInputBar');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'wxCommentInputBar';
            bar.className = 'wx-comment-input-bar';
            bar.innerHTML = '<input type="text" class="wx-comment-input" id="wxCommentInputText" placeholder="评论">' +
                '<div class="wx-comment-send" onclick="wxSubmitComment()">发送</div>';
            document.body.appendChild(bar);
            const input = bar.querySelector('#wxCommentInputText');
            if (input) {
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        wxSubmitComment();
                    }
                });
            }
        }

        mask.classList.add('show');
        bar.classList.add('show');
        const inputEl = document.getElementById('wxCommentInputText');
        if (inputEl) {
            inputEl.value = '';
            setTimeout(function() { inputEl.focus(); }, 50);
        }
    };

    window.wxHideCommentInput = function() {
        const bar = document.getElementById('wxCommentInputBar');
        if (bar) bar.classList.remove('show');
        const mask = document.getElementById('wxCommentInputMask');
        if (mask) mask.classList.remove('show');
        wxCommentTargetMomentId = null;
    };

    window.wxSubmitComment = function(momentId) {
        const targetId = momentId || wxCommentTargetMomentId;
        if (!targetId) return;
        const inputEl = document.getElementById('wxCommentInputText');
        const content = inputEl ? inputEl.value.trim() : '';
        if (!content) {
            wxShowToast('请输入评论内容');
            return;
        }

        let moments = [];
        try {
            moments = JSON.parse(localStorage.getItem('wx_moments') || '[]');
        } catch (e) {
            moments = [];
        }
        const idx = moments.findIndex(function(m) { return m.id === targetId; });
        if (idx === -1) return;

        const user = wxGetUser();
        const myName = user.nickname || '我';

        if (!moments[idx].comments) moments[idx].comments = [];
        moments[idx].comments.push({ name: myName, content: content });

        try {
            localStorage.setItem('wx_moments', JSON.stringify(moments));
        } catch (e) {
            wxShowToast('保存失败');
            return;
        }

        wxHideCommentInput();
        wxRenderMoments();
        const lcEl = document.getElementById('wxMomentLikesComments_' + targetId);
        if (lcEl) lcEl.classList.add('show');
        wxShowToast('评论成功');
    };

    // ===== 视频动态 =====
    function wxUpdateVideoBtnDisplay() {
        const section = document.getElementById('wxPostMomentVideoSection');
        if (!section) return;
        if (wxPostMomentVideoUrl) {
            const isData = wxPostMomentVideoUrl.indexOf('data:') === 0;
            const previewHtml = isData
                ? '<video src="' + wxPostMomentVideoUrl + '" muted></video>'
                : '<div class="wx-post-moment-video-url"><span>' + wxPostMomentVideoUrl + '</span></div>';
            section.innerHTML = '<div class="wx-post-moment-video-preview">' + previewHtml +
                '<div class="wx-post-moment-video-remove" onclick="wxClearMomentVideo()">×</div></div>' +
                '<div class="wx-post-moment-video-change" onclick="wxOpenVideoPicker()">更换视频</div>';
        } else {
            section.innerHTML = '<div class="wx-post-moment-video-btn-inner" onclick="wxOpenVideoPicker()">' +
                '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#576b95" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>' +
                '<span class="wx-post-moment-video-text">添加视频</span></div>';
        }
    }

    window.wxClearMomentVideo = function() {
        wxPostMomentVideoUrl = '';
        wxUpdateVideoBtnDisplay();
    };

    window.wxAddVideoBtnToPostPage = function() {
        const postPage = document.getElementById('wxPagePostMoment');
        if (!postPage) return;
        if (document.getElementById('wxPostMomentVideoSection')) return;
        const imagesEl = document.getElementById('wxPostMomentImages');
        if (!imagesEl) return;
        const section = document.createElement('div');
        section.id = 'wxPostMomentVideoSection';
        section.className = 'wx-post-moment-video-btn';
        imagesEl.parentNode.insertBefore(section, imagesEl.nextSibling);
        wxUpdateVideoBtnDisplay();
    };

    window.wxOpenVideoPicker = function() {
        // 若已存在则先移除
        const existing = document.getElementById('wxVideoPickerOverlay');
        if (existing) existing.parentNode.removeChild(existing);

        const overlay = document.createElement('div');
        overlay.id = 'wxVideoPickerOverlay';
        overlay.className = 'wx-video-picker';
        overlay.innerHTML = '<div class="wx-video-picker-mask"></div>' +
            '<div class="wx-video-picker-panel">' +
            '<div class="wx-video-picker-title">添加视频</div>' +
            '<input type="text" class="wx-video-picker-input" id="wxVideoUrlInput" placeholder="输入视频URL（https://...）">' +
            '<div class="wx-video-picker-btn wx-video-picker-url-btn">使用URL</div>' +
            '<div class="wx-video-picker-divider"><span>或</span></div>' +
            '<div class="wx-video-picker-btn wx-video-picker-file-btn">选择本地视频</div>' +
            '<div class="wx-video-picker-btn wx-video-picker-cancel">取消</div>' +
            '</div>';
        document.body.appendChild(overlay);

        function closePicker() {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }

        overlay.querySelector('.wx-video-picker-mask').addEventListener('click', closePicker);
        overlay.querySelector('.wx-video-picker-cancel').addEventListener('click', closePicker);

        overlay.querySelector('.wx-video-picker-url-btn').addEventListener('click', function() {
            const urlInput = document.getElementById('wxVideoUrlInput');
            const url = urlInput ? urlInput.value.trim() : '';
            if (!url) {
                wxShowToast('请输入视频URL');
                return;
            }
            wxPostMomentVideoUrl = url;
            wxUpdateVideoBtnDisplay();
            closePicker();
            wxShowToast('视频已添加');
        });

        overlay.querySelector('.wx-video-picker-file-btn').addEventListener('click', function() {
            // 确保隐藏的视频文件 input 存在
            let fileInput = document.getElementById('wxMomentVideoFile');
            if (!fileInput) {
                fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.id = 'wxMomentVideoFile';
                fileInput.accept = 'video/*';
                fileInput.style.display = 'none';
                fileInput.addEventListener('change', function(e) {
                    const file = e.target.files && e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = function(ev) {
                        wxPostMomentVideoUrl = ev.target.result;
                        wxUpdateVideoBtnDisplay();
                        wxShowToast('视频已添加');
                    };
                    reader.onerror = function() {
                        wxShowToast('视频读取失败');
                    };
                    reader.readAsDataURL(file);
                    e.target.value = '';
                });
                document.body.appendChild(fileInput);
            }
            closePicker();
            fileInput.click();
        });
    };

    // ===== 可见范围 =====
    function wxVisibilityLabel(v) {
        if (v === 'private') return '仅自己可见';
        if (v === 'partial') return '部分可见';
        return '公开';
    }

    function wxUpdateVisibilityDisplay() {
        const text = wxVisibilityLabel(wxPostMomentVisibility);
        const imgSpan = document.getElementById('wxPostMomentVisibilityValue');
        if (imgSpan) imgSpan.textContent = text;
        const txtSpan = document.getElementById('wxPostTextMomentVisibilityValue');
        if (txtSpan) txtSpan.textContent = text;
    }

    window.wxAddVisibilityBtnToPostPage = function() {
        // 图文发布页：复用已有的"谁可以看"行，绑定点击事件
        const postPage = document.getElementById('wxPagePostMoment');
        if (postPage) {
            const rows = postPage.querySelectorAll('.wx-post-moment-option-row');
            rows.forEach(function(row) {
                const label = row.querySelector('.wx-post-moment-option-label');
                if (label && label.textContent.indexOf('谁可以看') !== -1) {
                    if (!row.getAttribute('data-wx-bound')) {
                        row.setAttribute('data-wx-bound', '1');
                        row.addEventListener('click', function() { wxSelectVisibility(); });
                    }
                    const valueSpan = row.querySelector('.wx-post-moment-option-value span');
                    if (valueSpan && !valueSpan.id) valueSpan.id = 'wxPostMomentVisibilityValue';
                }
            });
        }

        // 纯文字发布页：动态添加可见范围行
        const textBody = document.querySelector('#wxPagePostTextMoment .wx-post-text-moment-body');
        if (textBody && !document.getElementById('wxPostTextMomentVisibilityRow')) {
            const wrap = document.createElement('div');
            wrap.id = 'wxPostTextMomentVisibilityRow';
            wrap.className = 'wx-post-moment-visibility';
            wrap.innerHTML = '<div class="wx-post-moment-option-row">' +
                '<span class="wx-post-moment-option-label">谁可以看</span>' +
                '<div class="wx-post-moment-option-value">' +
                '<span id="wxPostTextMomentVisibilityValue">公开</span>' +
                '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ccc" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' +
                '</div></div>';
            wrap.querySelector('.wx-post-moment-option-row').addEventListener('click', function() {
                wxSelectVisibility();
            });
            textBody.appendChild(wrap);
        }
    };

    window.wxSelectVisibility = function() {
        const existing = document.getElementById('wxVisibilityPickerOverlay');
        if (existing) existing.parentNode.removeChild(existing);

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {
            contacts = [];
        }

        let tempVisibility = wxPostMomentVisibility;
        let tempVisibleTo = wxPostMomentVisibleTo.slice();

        const overlay = document.createElement('div');
        overlay.id = 'wxVisibilityPickerOverlay';
        overlay.className = 'wx-visibility-picker';

        function renderContacts() {
            if (contacts.length === 0) {
                return '<div class="wx-visibility-empty">暂无联系人</div>';
            }
            return contacts.map(function(c) {
                const checked = tempVisibleTo.indexOf(c.id) !== -1;
                const firstChar = (c.name || '?').charAt(0);
                const avatarHtml = c.avatar
                    ? '<img src="' + c.avatar + '" alt="">'
                    : '<div>' + firstChar + '</div>';
                const name = c.displayName || c.remark || c.name || '未命名';
                return '<div class="wx-visibility-contact" data-cid="' + c.id + '">' +
                    '<div class="wx-visibility-contact-avatar">' + avatarHtml + '</div>' +
                    '<span class="wx-visibility-contact-name">' + name + '</span>' +
                    '<span class="wx-visibility-contact-check ' + (checked ? 'checked' : '') + '">' + (checked ? '✓' : '') + '</span>' +
                    '</div>';
            }).join('');
        }

        overlay.innerHTML = '<div class="wx-visibility-picker-mask"></div>' +
            '<div class="wx-visibility-picker-panel">' +
            '<div class="wx-visibility-picker-title">谁可以看</div>' +
            '<div class="wx-visibility-picker-options">' +
            '<div class="wx-visibility-option ' + (tempVisibility === 'public' ? 'selected' : '') + '" data-v="public"><span>公开</span><span class="wx-visibility-check">✓</span></div>' +
            '<div class="wx-visibility-option ' + (tempVisibility === 'private' ? 'selected' : '') + '" data-v="private"><span>仅自己可见</span><span class="wx-visibility-check">✓</span></div>' +
            '<div class="wx-visibility-option ' + (tempVisibility === 'partial' ? 'selected' : '') + '" data-v="partial"><span>部分可见</span><span class="wx-visibility-check">✓</span></div>' +
            '</div>' +
            '<div class="wx-visibility-contacts" style="display:' + (tempVisibility === 'partial' ? 'block' : 'none') + '">' + renderContacts() + '</div>' +
            '<div class="wx-visibility-picker-actions">' +
            '<div class="wx-visibility-picker-btn cancel">取消</div>' +
            '<div class="wx-visibility-picker-btn confirm">完成</div>' +
            '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        function closePicker() {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }

        const optionsEl = overlay.querySelector('.wx-visibility-picker-options');
        optionsEl.querySelectorAll('.wx-visibility-option').forEach(function(opt) {
            opt.addEventListener('click', function() {
                tempVisibility = opt.getAttribute('data-v');
                optionsEl.querySelectorAll('.wx-visibility-option').forEach(function(o) {
                    o.classList.remove('selected');
                });
                opt.classList.add('selected');
                overlay.querySelector('.wx-visibility-contacts').style.display =
                    tempVisibility === 'partial' ? 'block' : 'none';
            });
        });

        const contactsEl = overlay.querySelector('.wx-visibility-contacts');
        contactsEl.querySelectorAll('.wx-visibility-contact').forEach(function(cEl) {
            cEl.addEventListener('click', function() {
                const cid = cEl.getAttribute('data-cid');
                const i = tempVisibleTo.indexOf(cid);
                if (i > -1) {
                    tempVisibleTo.splice(i, 1);
                } else {
                    tempVisibleTo.push(cid);
                }
                const checked = tempVisibleTo.indexOf(cid) !== -1;
                const chk = cEl.querySelector('.wx-visibility-contact-check');
                chk.classList.toggle('checked', checked);
                chk.textContent = checked ? '✓' : '';
            });
        });

        overlay.querySelector('.wx-visibility-picker-mask').addEventListener('click', closePicker);
        overlay.querySelector('.wx-visibility-picker-btn.cancel').addEventListener('click', closePicker);
        overlay.querySelector('.wx-visibility-picker-btn.confirm').addEventListener('click', function() {
            if (tempVisibility === 'partial' && tempVisibleTo.length === 0) {
                wxShowToast('请选择可见的联系人');
                return;
            }
            wxPostMomentVisibility = tempVisibility;
            wxPostMomentVisibleTo = tempVisibleTo.slice();
            wxUpdateVisibilityDisplay();
            closePicker();
        });
    };

    let wxCameraPressTimer = null;
    let wxCameraLongPress = false;

    function wxBindCameraBtn() {
        const cameraBtn = document.getElementById('wxCameraBtn');
        if (!cameraBtn) return;

        cameraBtn.addEventListener('mousedown', function(e) {
            wxCameraLongPress = false;
            wxCameraPressTimer = setTimeout(() => {
                wxCameraLongPress = true;
                wxOpenPostTextMoment();
            }, 500);
        });

        cameraBtn.addEventListener('mouseup', function(e) {
            if (wxCameraPressTimer) {
                clearTimeout(wxCameraPressTimer);
                wxCameraPressTimer = null;
            }
            if (!wxCameraLongPress) {
                wxOpenPostMoment();
            }
        });

        cameraBtn.addEventListener('mouseleave', function(e) {
            if (wxCameraPressTimer) {
                clearTimeout(wxCameraPressTimer);
                wxCameraPressTimer = null;
            }
        });

        cameraBtn.addEventListener('touchstart', function(e) {
            wxCameraLongPress = false;
            wxCameraPressTimer = setTimeout(() => {
                wxCameraLongPress = true;
                wxOpenPostTextMoment();
            }, 500);
        });

        cameraBtn.addEventListener('touchend', function(e) {
            if (wxCameraPressTimer) {
                clearTimeout(wxCameraPressTimer);
                wxCameraPressTimer = null;
            }
            if (!wxCameraLongPress) {
                wxOpenPostMoment();
            }
        });
    }

    window.wxOpenPostMoment = function() {
        wxPostMomentImages = [];
        wxPostMomentVideoUrl = '';
        wxPostMomentVisibility = 'public';
        wxPostMomentVisibleTo = [];
        const textEl = document.getElementById('wxPostMomentText');
        const imagesEl = document.getElementById('wxPostMomentImages');
        if (textEl) textEl.value = '';
        if (imagesEl) {
            imagesEl.innerHTML = `
                <div class="wx-post-moment-add-btn" onclick="wxTriggerMomentImageUpload()">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#ccc" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
            `;
        }
        wxAddVideoBtnToPostPage();
        wxAddVisibilityBtnToPostPage();
        wxUpdateVideoBtnDisplay();
        wxUpdateVisibilityDisplay();
        const page = document.getElementById('wxPagePostMoment');
        if (page) page.classList.add('wx-page-show');
    };

    window.wxClosePostMoment = function() {
        const page = document.getElementById('wxPagePostMoment');
        if (page) page.classList.remove('wx-page-show');
    };

    window.wxOpenPostTextMoment = function() {
        wxPostMomentVisibility = 'public';
        wxPostMomentVisibleTo = [];
        const textEl = document.getElementById('wxPostTextMomentText');
        if (textEl) textEl.value = '';
        wxAddVisibilityBtnToPostPage();
        wxUpdateVisibilityDisplay();
        const page = document.getElementById('wxPagePostTextMoment');
        if (page) page.classList.add('wx-page-show');
    };

    window.wxClosePostTextMoment = function() {
        const page = document.getElementById('wxPagePostTextMoment');
        if (page) page.classList.remove('wx-page-show');
    };

    window.wxTriggerMomentImageUpload = function() {
        const fileInput = document.getElementById('wxMomentImageFile');
        if (fileInput) fileInput.click();
    };

    function wxRenderPostMomentImages() {
        const imagesEl = document.getElementById('wxPostMomentImages');
        if (!imagesEl) return;

        let html = '';
        wxPostMomentImages.forEach((img, idx) => {
            html += `
                <div class="wx-post-moment-img-item">
                    <img src="${img}" alt="">
                    <div class="wx-post-moment-img-delete" onclick="wxDeleteMomentImage(${idx})">×</div>
                </div>
            `;
        });

        if (wxPostMomentImages.length < 9) {
            html += `
                <div class="wx-post-moment-add-btn" onclick="wxTriggerMomentImageUpload()">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#ccc" stroke-width="1.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
            `;
        }

        imagesEl.innerHTML = html;
    }

    window.wxDeleteMomentImage = function(index) {
        wxPostMomentImages.splice(index, 1);
        wxRenderPostMomentImages();
    };

    window.wxSubmitPostMoment = function() {
        const textEl = document.getElementById('wxPostMomentText');
        const text = textEl ? textEl.value.trim() : '';

        if (!text && wxPostMomentImages.length === 0 && !wxPostMomentVideoUrl) {
            wxShowToast('请输入文字或添加图片');
            return;
        }

        const user = wxGetUser();

        const now = new Date();
        const timeStr = now.getMonth() + 1 + '月' + now.getDate() + '日';

        const newMoment = {
            id: 'moment_' + Date.now(),
            userId: user.id || 'me',
            nickname: user.nickname || '我',
            avatar: user.avatar || '',
            text: text,
            images: [...wxPostMomentImages],
            time: timeStr,
            likes: [],
            comments: [],
            visibility: wxPostMomentVisibility,
            visibleTo: [...wxPostMomentVisibleTo]
        };
        if (wxPostMomentVideoUrl) {
            newMoment.videoUrl = wxPostMomentVideoUrl;
        }

        let moments = [];
        try {
            moments = JSON.parse(localStorage.getItem('wx_moments') || '[]');
        } catch (e) {}

        moments.unshift(newMoment);
        try {
            localStorage.setItem('wx_moments', JSON.stringify(moments));
        } catch (e) {
            wxShowToast('内容过大，保存失败');
            return;
        }

        wxClosePostMoment();
        wxRenderMoments();
        wxShowToast('发表成功');
        // 触发朋友圈AI互动
        wxTriggerMomentsAiInteraction(newMoment.id);
    };

    window.wxSubmitPostTextMoment = function() {
        const textEl = document.getElementById('wxPostTextMomentText');
        const text = textEl ? textEl.value.trim() : '';

        if (!text) {
            wxShowToast('请输入文字内容');
            return;
        }

        const user = wxGetUser();

        const now = new Date();
        const timeStr = now.getMonth() + 1 + '月' + now.getDate() + '日';

        const newMoment = {
            id: 'moment_' + Date.now(),
            userId: user.id || 'me',
            nickname: user.nickname || '我',
            avatar: user.avatar || '',
            text: text,
            images: [],
            time: timeStr,
            likes: [],
            comments: [],
            visibility: wxPostMomentVisibility,
            visibleTo: [...wxPostMomentVisibleTo]
        };

        let moments = [];
        try {
            moments = JSON.parse(localStorage.getItem('wx_moments') || '[]');
        } catch (e) {}

        moments.unshift(newMoment);
        try {
            localStorage.setItem('wx_moments', JSON.stringify(moments));
        } catch (e) {
            wxShowToast('内容过大，保存失败');
            return;
        }

        wxClosePostTextMoment();
        wxRenderMoments();
        wxShowToast('发表成功');
        // 触发朋友圈AI互动
        wxTriggerMomentsAiInteraction(newMoment.id);
    };

    /* ============ 朋友圈AI互动 ============ */
    const WX_MOMENTS_LIKE_PROBABILITY = 0.3;       // 30%概率有联系人点赞
    const WX_MOMENTS_COMMENT_PROBABILITY = 0.2;    // 20%概率有联系人评论
    let wxMomentsAiStarted = false;                // 防止重复启动

    // 启动朋友圈AI互动（仅在首次调用时设置标记，实际互动按发布触发）
    window.wxStartMomentsAiInteraction = function() {
        wxMomentsAiStarted = true;
    };

    // 触发某条朋友圈的AI互动：延迟1-10分钟后随机点赞/评论
    window.wxTriggerMomentsAiInteraction = function(momentId) {
        if (!wxMomentsAiStarted) return;
        if (!momentId) return;

        // 30%概率有联系人点赞
        if (Math.random() < WX_MOMENTS_LIKE_PROBABILITY) {
            const likeDelay = 60 * 1000 + Math.floor(Math.random() * 9 * 60 * 1000); // 1-10分钟
            setTimeout(() => wxAiLikeMoment(momentId), likeDelay);
        }
        // 20%概率有联系人评论
        if (Math.random() < WX_MOMENTS_COMMENT_PROBABILITY) {
            const commentDelay = 60 * 1000 + Math.floor(Math.random() * 9 * 60 * 1000); // 1-10分钟
            setTimeout(() => wxAiCommentMoment(momentId), commentDelay);
        }
    };

    // 联系人随机点赞：从联系人中随机选1-3人
    function wxAiLikeMoment(momentId) {
        let moments = [];
        try {
            moments = JSON.parse(localStorage.getItem('wx_moments') || '[]');
        } catch (e) { return; }
        const idx = moments.findIndex(m => m.id === momentId);
        if (idx === -1) return;
        const moment = moments[idx];
        if (!moment.likes) moment.likes = [];

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        if (contacts.length === 0) return;

        // 过滤已点赞的人
        const available = contacts.filter(c => c.name && moment.likes.indexOf(c.name) === -1);
        if (available.length === 0) return;
        const count = Math.min(available.length, 1 + Math.floor(Math.random() * 3)); // 1-3人
        // 随机选取
        for (let i = available.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [available[i], available[j]] = [available[j], available[i]];
        }
        const picked = available.slice(0, count);
        picked.forEach(c => {
            if (moment.likes.indexOf(c.name) === -1) moment.likes.push(c.name);
        });
        try {
            localStorage.setItem('wx_moments', JSON.stringify(moments));
        } catch (e) { return; }
        wxRenderMoments();
    }

    // 联系人随机评论：从联系人中随机选1人，调用API生成评论内容
    async function wxAiCommentMoment(momentId) {
        let apiConfig = {};
        try {
            apiConfig = JSON.parse(localStorage.getItem('censy_api_config') || '{}');
        } catch (e) {}
        if (!apiConfig.url || !apiConfig.key || !apiConfig.model) return;

        let moments = [];
        try {
            moments = JSON.parse(localStorage.getItem('wx_moments') || '[]');
        } catch (e) { return; }
        const idx = moments.findIndex(m => m.id === momentId);
        if (idx === -1) return;
        const moment = moments[idx];

        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        if (contacts.length === 0) return;
        // 随机选1人
        const contact = contacts[Math.floor(Math.random() * contacts.length)];
        if (!contact || !contact.name) return;

        const contactName = contact.name;
        const persona = contact.persona || '';
        const momentText = (moment.text || '').slice(0, 200);

        const systemPrompt = `你是"${contactName}"。人设：${persona || '微信好友'}\n看到用户发的朋友圈"${momentText}"，请写一条自然的评论，简短口语化，不要超过30个字。只返回评论内容本身，不要加引号。`;

        const apiMessages = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: momentText || '看看这条朋友圈' }
        ];

        const baseUrl = apiConfig.url.endsWith('/') ? apiConfig.url.slice(0, -1) : apiConfig.url;

        try {
            const resp = await fetch(baseUrl + '/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + apiConfig.key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: apiConfig.model,
                    messages: apiMessages,
                    stream: false,
                    temperature: 0.9,
                    max_tokens: 100
                })
            });
            if (!resp.ok) return;
            const data = await resp.json();
            let content = (data.choices?.[0]?.message?.content || '').trim();
            if (!content) return;
            // 去掉可能的前后引号
            content = content.replace(/^["“”'']+|["“”'']+$/g, '');
            if (!content) return;

            // 重新读取最新数据，避免并发覆盖
            let latestMoments = [];
            try {
                latestMoments = JSON.parse(localStorage.getItem('wx_moments') || '[]');
            } catch (e) { return; }
            const latestIdx = latestMoments.findIndex(m => m.id === momentId);
            if (latestIdx === -1) return;
            if (!latestMoments[latestIdx].comments) latestMoments[latestIdx].comments = [];
            latestMoments[latestIdx].comments.push({ name: contactName, content: content });
            try {
                localStorage.setItem('wx_moments', JSON.stringify(latestMoments));
            } catch (e) { return; }
            wxRenderMoments();
        } catch (err) {
            // 静默失败
        }
    }
    /* ============ 朋友圈AI互动 END ============ */

    const originalWxSwitchTab = window.wxSwitchTab;
    window.wxSwitchTab = function(tab) {
        if (originalWxSwitchTab) originalWxSwitchTab(tab);
        if (tab === 'contacts') {
            setTimeout(wxRenderContacts, 50);
        } else if (tab === 'discover') {
            setTimeout(wxRenderMoments, 50);
        }
    };

    const origWxOpenApp = window.wxOpenApp;
    window.wxOpenApp = function() {
        if (origWxOpenApp) origWxOpenApp();
        setTimeout(() => {
            wxRenderContacts();
            wxBindCameraBtn();
        }, 100);
    };

    document.addEventListener('DOMContentLoaded', function() {
        const momentFileInput = document.getElementById('wxMomentImageFile');
        if (momentFileInput) {
            momentFileInput.addEventListener('change', function(e) {
                const files = Array.from(e.target.files);
                const remaining = 9 - wxPostMomentImages.length;
                const toAdd = files.slice(0, remaining);

                let loaded = 0;
                toAdd.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = function(ev) {
                        wxPostMomentImages.push(ev.target.result);
                        loaded++;
                        if (loaded === toAdd.length) {
                            wxRenderPostMomentImages();
                        }
                    };
                    reader.readAsDataURL(file);
                });

                e.target.value = '';
            });
        }

        const profileAvatarFile = document.getElementById('wxProfileAvatarFile');
        if (profileAvatarFile) {
            profileAvatarFile.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = function(ev) {
                    const avatarData = ev.target.result;
                    const user = wxGetUser();
                    user.avatar = avatarData;
                    wxSaveUser(user);
                    wxRenderMe();
                    wxRenderProfile();
                    wxShowToast('头像已更新');
                };
                reader.readAsDataURL(file);
                e.target.value = '';
            });
        }

        // 启动AI增强：联系人主动发消息 + 朋友圈AI互动
        if (typeof wxStartProactiveMessages === 'function') wxStartProactiveMessages();
        if (typeof wxStartMomentsAiInteraction === 'function') wxStartMomentsAiInteraction();
    });

    function wxGetUser() {
        try {
            const accounts = JSON.parse(localStorage.getItem('wx_accounts') || '[]');
            const activeId = localStorage.getItem('wx_active_account_id') || 'me';
            const user = accounts.find(a => a.id === activeId);
            return user || {};
        } catch (e) {
            return {};
        }
    }

    function wxSaveUser(user) {
        try {
            const accounts = JSON.parse(localStorage.getItem('wx_accounts') || '[]');
            const activeId = localStorage.getItem('wx_active_account_id') || 'me';
            const idx = accounts.findIndex(a => a.id === activeId);
            if (idx !== -1) {
                accounts[idx] = { ...accounts[idx], ...user };
                localStorage.setItem('wx_accounts', JSON.stringify(accounts));
            } else {
                localStorage.setItem('wx_user', JSON.stringify(user));
            }
        } catch (e) {}
    }

    function wxGetAccounts() {
        try {
            return JSON.parse(localStorage.getItem('wx_accounts') || '[]');
        } catch (e) {
            return [];
        }
    }

    function wxSaveAccounts(accounts) {
        try {
            localStorage.setItem('wx_accounts', JSON.stringify(accounts));
        } catch (e) {}
    }

    window.wxOpenAccountManager = function() {
        const page = document.getElementById('wxPageAccountManager');
        if (page) page.classList.add('wx-page-show');
        wxRenderAccountList();
    };

    window.wxCloseAccountManager = function() {
        const page = document.getElementById('wxPageAccountManager');
        if (page) page.classList.remove('wx-page-show');
    };

    function wxRenderAccountList() {
        const listEl = document.getElementById('wxAccountList');
        if (!listEl) return;
        const accounts = wxGetAccounts();
        const activeId = localStorage.getItem('wx_active_account_id') || 'me';

        if (accounts.length === 0) {
            listEl.innerHTML = '<div style="text-align:center;color:#999;padding:60px 0;">暂无账号</div>';
            return;
        }

        listEl.innerHTML = accounts.map(account => `
            <div class="wx-account-item ${account.id === activeId ? 'active' : ''}" onclick="wxSwitchAccount('${account.id}')">
                <div class="wx-account-avatar">
                    ${account.avatar ? `<img src="${account.avatar}" alt="">` : `<span>${(account.nickname || '我').charAt(0)}</span>`}
                </div>
                <div class="wx-account-nickname">${account.nickname || '我'}</div>
                <div class="wx-account-wxid">${account.wxid || 'wxid_xxxx'}</div>
                ${account.id === activeId ? '<div class="wx-account-active-tag">当前账号</div>' : ''}
            </div>
        `).join('');
    }

    window.wxSwitchAccount = function(accountId) {
        const accounts = wxGetAccounts();
        const account = accounts.find(a => a.id === accountId);
        if (!account) return;

        localStorage.setItem('wx_active_account_id', accountId);
        wxShowToast(`已切换到 ${account.nickname || '我'}`);
        
        wxRenderMe();
        wxRenderProfile();
        wxRenderMoments();
        wxRenderChatList();
        wxRenderContacts();
        
        wxCloseAccountManager();
    };

    let wxAddAccountAvatar = '';

    window.wxAddNewAccount = function() {
        wxAddAccountAvatar = '';
        document.getElementById('wxAddAccountAvatarImg')?.setAttribute('src', '');
        document.getElementById('wxAddAccountNickname')?.setAttribute('value', '');
        document.getElementById('wxAddAccountWxid')?.setAttribute('value', '');
        document.getElementById('wxAddAccountPersona')?.setAttribute('value', '');
        const page = document.getElementById('wxPageAddAccount');
        if (page) page.classList.add('wx-page-show');
    };

    window.wxCloseAddAccount = function() {
        const page = document.getElementById('wxPageAddAccount');
        if (page) page.classList.remove('wx-page-show');
    };

    window.wxSaveNewAccount = function() {
        const nickname = document.getElementById('wxAddAccountNickname')?.value?.trim() || '';
        const wxid = document.getElementById('wxAddAccountWxid')?.value?.trim() || '';
        const persona = document.getElementById('wxAddAccountPersona')?.value?.trim() || '';

        if (!nickname) {
            wxShowToast('请输入昵称');
            return;
        }

        const newAccount = {
            id: 'account_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
            avatar: wxAddAccountAvatar,
            nickname: nickname,
            wxid: wxid || 'wxid_' + Math.random().toString(36).substr(2, 10),
            persona: persona,
            cover: '',
            signature: ''
        };

        const accounts = wxGetAccounts();
        accounts.push(newAccount);
        wxSaveAccounts(accounts);

        wxShowToast('添加成功');
        wxCloseAddAccount();
        wxOpenAccountManager();
    };

    document.getElementById('wxAddAccountAvatarUpload')?.addEventListener('click', function() {
        document.getElementById('wxAddAccountAvatarFile')?.click();
    });

    document.getElementById('wxAddAccountAvatarFile')?.addEventListener('change', function(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(evt) {
            wxAddAccountAvatar = evt.target?.result || '';
            document.getElementById('wxAddAccountAvatarImg')?.setAttribute('src', wxAddAccountAvatar);
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    });

    window.wxTriggerMomentsCoverUpload = function() {
        const fileInput = document.getElementById('wxMomentsCoverFile');
        if (fileInput) fileInput.click();
    };

    window.wxOpenEditSignature = function() {
        const user = wxGetUser();
        const textarea = document.getElementById('wxEditSignatureTextarea');
        if (textarea) textarea.value = user.signature || '';
        const page = document.getElementById('wxPageEditSignature');
        if (page) page.classList.add('wx-page-show');
    };

    window.wxCloseEditSignature = function() {
        const page = document.getElementById('wxPageEditSignature');
        if (page) page.classList.remove('wx-page-show');
    };

    window.wxSaveEditSignature = function() {
        const textarea = document.getElementById('wxEditSignatureTextarea');
        if (!textarea) return;
        const signature = textarea.value.trim();
        if (signature.length > 200) {
            wxShowToast('个性签名不能超过200个字符');
            return;
        }
        const user = wxGetUser();
        user.signature = signature;
        wxSaveUser(user);
        wxRenderMoments();
        wxCloseEditSignature();
        wxShowToast('保存成功');
    };

    window.wxQuickPostMoment = function() {
        const inputEl = document.getElementById('wxMomentsInput');
        if (!inputEl) return;
        const text = inputEl.value.trim();
        if (!text) {
            wxShowToast('请输入内容');
            return;
        }

        const user = wxGetUser();
        const now = new Date();
        const timeStr = now.getMonth() + 1 + '月' + now.getDate() + '日';

        const newMoment = {
            id: 'moment_' + Date.now(),
            userId: user.id || 'me',
            nickname: user.nickname || '我',
            avatar: user.avatar || '',
            text: text,
            images: [],
            time: timeStr,
            likes: [],
            comments: [],
            visibility: 'public',
            visibleTo: []
        };

        let moments = [];
        try {
            moments = JSON.parse(localStorage.getItem('wx_moments') || '[]');
        } catch (e) {}

        moments.unshift(newMoment);
        try {
            localStorage.setItem('wx_moments', JSON.stringify(moments));
        } catch (e) {
            wxShowToast('内容过大，保存失败');
            return;
        }

        inputEl.value = '';
        wxRenderMoments();
        wxShowToast('发表成功');
        wxTriggerMomentsAiInteraction(newMoment.id);
    };

    document.getElementById('wxMomentsInput')?.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            wxQuickPostMoment();
        }
    });

    document.getElementById('wxMomentsCoverFile')?.addEventListener('change', function(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(evt) {
            const user = wxGetUser();
            user.cover = evt.target?.result || '';
            wxSaveUser(user);
            wxRenderMoments();
            wxShowToast('背景更换成功');
        };
        reader.readAsDataURL(file);
        e.target.value = '';
    });

    function wxRenderMe() {
        const user = wxGetUser();
        const nickname = user.nickname || '我';
        const wxid = user.wxid || 'wxid_xxxx';
        const avatar = user.avatar || '';

        const nicknameEl = document.getElementById('wxMeNickname');
        if (nicknameEl) nicknameEl.textContent = nickname;

        const wxidEl = document.getElementById('wxMeWxid');
        if (wxidEl) wxidEl.textContent = wxid;

        const avatarEl = document.getElementById('wxMeAvatar');
        const avatarPlaceholder = document.getElementById('wxMeAvatarPlaceholder');
        if (avatarEl) {
            let img = avatarEl.querySelector('img');
            if (avatar) {
                if (!img) {
                    img = document.createElement('img');
                    avatarEl.appendChild(img);
                }
                img.src = avatar;
                img.style.display = 'block';
                if (avatarPlaceholder) avatarPlaceholder.style.display = 'none';
            } else {
                if (img) img.style.display = 'none';
                if (avatarPlaceholder) {
                    avatarPlaceholder.style.display = 'flex';
                    avatarPlaceholder.textContent = nickname.charAt(0) || '我';
                }
            }
        }
    }

    function wxRenderProfile() {
        const user = wxGetUser();
        const nickname = user.nickname || '我';
        const wxid = user.wxid || 'wxid_xxxx';
        const avatar = user.avatar || '';
        const persona = user.persona || '';

        const nameEl = document.getElementById('wxProfileName');
        if (nameEl) nameEl.textContent = nickname;

        const wxidEl = document.getElementById('wxProfileWxid');
        if (wxidEl) wxidEl.textContent = wxid;

        const personaEl = document.getElementById('wxProfilePersona');
        if (personaEl) {
            personaEl.textContent = persona || '暂无';
        }

        const avatarEl = document.getElementById('wxProfileAvatar');
        const avatarPlaceholder = document.getElementById('wxProfileAvatarPlaceholder');
        if (avatarEl) {
            let img = avatarEl.querySelector('img');
            if (avatar) {
                if (!img) {
                    img = document.createElement('img');
                    avatarEl.appendChild(img);
                }
                img.src = avatar;
                img.style.display = 'block';
                if (avatarPlaceholder) avatarPlaceholder.style.display = 'none';
            } else {
                if (img) img.style.display = 'none';
                if (avatarPlaceholder) {
                    avatarPlaceholder.style.display = 'flex';
                    avatarPlaceholder.textContent = nickname.charAt(0) || '头';
                }
            }
        }
    }

    window.wxOpenProfile = function() {
        wxRenderProfile();
        const page = document.getElementById('wxPageProfile');
        if (page) page.classList.add('wx-page-show');
    };

    window.wxCloseProfile = function() {
        const page = document.getElementById('wxPageProfile');
        if (page) page.classList.remove('wx-page-show');
        wxRenderMe();
    };

    window.wxTriggerProfileAvatarUpload = function() {
        const fileInput = document.getElementById('wxProfileAvatarFile');
        if (fileInput) fileInput.click();
    };

    window.wxOpenEditName = function() {
        const user = wxGetUser();
        const input = document.getElementById('wxEditNameInput');
        if (input) {
            input.value = user.nickname || '';
        }
        const page = document.getElementById('wxPageEditName');
        if (page) page.classList.add('wx-page-show');
        setTimeout(() => {
            if (input) input.focus();
        }, 100);
    };

    window.wxCloseEditName = function() {
        const page = document.getElementById('wxPageEditName');
        if (page) page.classList.remove('wx-page-show');
    };

    window.wxSaveEditName = function() {
        const input = document.getElementById('wxEditNameInput');
        const newName = input ? input.value.trim() : '';
        if (!newName) {
            wxShowToast('名字不能为空');
            return;
        }
        const user = wxGetUser();
        user.nickname = newName;
        wxSaveUser(user);
        wxRenderProfile();
        wxCloseEditName();
        wxShowToast('修改成功');
    };

    window.wxOpenEditPersona = function() {
        const user = wxGetUser();
        const textarea = document.getElementById('wxEditPersonaTextarea');
        if (textarea) {
            textarea.value = user.persona || '';
        }
        const page = document.getElementById('wxPageEditPersona');
        if (page) page.classList.add('wx-page-show');
        setTimeout(() => {
            if (textarea) textarea.focus();
        }, 100);
    };

    window.wxCloseEditPersona = function() {
        const page = document.getElementById('wxPageEditPersona');
        if (page) page.classList.remove('wx-page-show');
    };

    window.wxSaveEditPersona = function() {
        const textarea = document.getElementById('wxEditPersonaTextarea');
        const newPersona = textarea ? textarea.value.trim() : '';
        const user = wxGetUser();
        user.persona = newPersona;
        wxSaveUser(user);
        wxRenderProfile();
        wxCloseEditPersona();
        wxShowToast('保存成功');
    };

    const origWxSwitchTab2 = window.wxSwitchTab;
    window.wxSwitchTab = function(tab) {
        if (origWxSwitchTab2) origWxSwitchTab2(tab);
        if (tab === 'me') {
            setTimeout(wxRenderMe, 50);
        }
    };

    const origWxOpenApp2 = window.wxOpenApp;
    window.wxOpenApp = function() {
        if (origWxOpenApp2) origWxOpenApp2();
        setTimeout(() => {
            wxRenderMe();
        }, 100);
    };

    /* ==================== 群聊功能 ==================== */
    let wxCreateGroupAvatar = '';
    let wxSelectedGroupMembers = []; // 联系人ID数组
    let wxCurrentGroupId = null;
    let wxGroupMentionRange = null; // @触发位置

    // 成员昵称颜色板
    const wxGroupColors = ['#576b95', '#fa5151', '#ff9c19', '#07c160', '#1e88e5', '#8e44ad', '#e91e63', '#009688'];
    function wxGetMemberColor(id) {
        if (!id) return wxGroupColors[0];
        let sum = 0;
        for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
        return wxGroupColors[sum % wxGroupColors.length];
    }

    // 初始化群聊数据
    function wxInitGroupData() {
        if (!localStorage.getItem('wx_groups')) {
            localStorage.setItem('wx_groups', JSON.stringify([]));
        }
    }

    function wxGetGroups() {
        try {
            return JSON.parse(localStorage.getItem('wx_groups') || '[]');
        } catch (e) {
            return [];
        }
    }

    function wxSaveGroups(groups) {
        localStorage.setItem('wx_groups', JSON.stringify(groups));
    }

    // 头像HTML生成（共用）
    function wxBuildAvatarHtml(avatar, name) {
        const firstChar = name ? name.charAt(0) : '?';
        return avatar
            ? `<img src="${avatar}" alt="">`
            : `<div class="wx-avatar-text">${firstChar}</div>`;
    }

    // 渲染创建群聊页面的成员列表
    function wxRenderGroupMemberList() {
        const listEl = document.getElementById('wxGroupMemberList');
        if (!listEl) return;
        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        if (contacts.length === 0) {
            listEl.innerHTML = '<div style="text-align:center;color:#999;padding:20px 0;font-size:13px;">暂无联系人</div>';
            return;
        }
        listEl.innerHTML = contacts.map(contact => {
            const checked = wxSelectedGroupMembers.indexOf(contact.id) > -1;
            return `
                <div class="wx-group-member-item ${checked ? 'checked' : ''}" onclick="wxToggleGroupMember('${contact.id}')">
                    <div class="wx-group-member-checkbox">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div class="wx-group-member-avatar">${wxBuildAvatarHtml(contact.avatar, contact.name)}</div>
                    <div class="wx-group-member-name">${contact.name || '未命名'}</div>
                </div>
            `;
        }).join('');
    }

    // 渲染已选成员
    function wxRenderSelectedMembers() {
        const el = document.getElementById('wxGroupSelectedMembers');
        if (!el) return;
        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        el.innerHTML = wxSelectedGroupMembers.map(id => {
            const contact = contacts.find(c => c.id === id);
            if (!contact) return '';
            return `
                <div class="wx-group-selected-member">
                    <div class="wx-group-selected-member-avatar">${wxBuildAvatarHtml(contact.avatar, contact.name)}</div>
                    <div class="wx-group-selected-member-name">${contact.name || ''}</div>
                </div>
            `;
        }).join('');
    }

    // 切换成员选中
    window.wxToggleGroupMember = function(contactId) {
        const idx = wxSelectedGroupMembers.indexOf(contactId);
        if (idx > -1) {
            wxSelectedGroupMembers.splice(idx, 1);
        } else {
            wxSelectedGroupMembers.push(contactId);
        }
        wxRenderGroupMemberList();
        wxRenderSelectedMembers();
    };

    // 关闭创建群聊页面
    window.wxCloseCreateGroup = function() {
        const page = document.getElementById('wxPageCreateGroup');
        if (page) page.classList.remove('wx-page-show');
    };

    // 触发群头像上传
    window.wxTriggerGroupAvatarUpload = function() {
        const file = document.getElementById('wxGroupAvatarFile');
        if (file) file.click();
    };

    // 保存群聊
    window.wxSaveGroup = function() {
        const nameInput = document.getElementById('wxGroupNameInput');
        const introInput = document.getElementById('wxGroupIntroInput');
        const name = nameInput ? nameInput.value.trim() : '';
        const intro = introInput ? introInput.value.trim() : '';
        if (!name) {
            wxShowToast('请输入群名称');
            return;
        }
        if (wxSelectedGroupMembers.length === 0) {
            wxShowToast('请选择群成员');
            return;
        }
        const groupId = 'group_' + Date.now();
        const group = {
            id: groupId,
            name: name,
            avatar: wxCreateGroupAvatar,
            intro: intro,
            members: wxSelectedGroupMembers.slice(),
            ownerId: 'me',
            createTime: Date.now(),
            type: 'group'
        };
        const groups = wxGetGroups();
        groups.push(group);
        wxSaveGroups(groups);

        // 加入聊天列表
        let chats = [];
        try {
            chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
        } catch (e) {}
        const now = new Date();
        const timeStr = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
        chats.unshift({
            id: groupId,
            name: name,
            avatar: wxCreateGroupAvatar,
            lastMessage: '群聊已创建',
            time: timeStr,
            unread: 0,
            bg: '',
            type: 'group'
        });
        localStorage.setItem('wx_chats', JSON.stringify(chats));

        // 初始化消息记录
        let messages = {};
        try {
            messages = JSON.parse(localStorage.getItem('wx_messages') || '{}');
        } catch (e) {}
        messages[groupId] = [];
        localStorage.setItem('wx_messages', JSON.stringify(messages));

        wxShowToast('创建成功');
        wxCloseCreateGroup();
        debounceRenderChatList();
    };

    // 打开群聊聊天页面
    window.wxOpenGroupChat = function(groupId) {
        wxCurrentGroupId = groupId;
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === groupId);
        if (!group) {
            wxShowToast('群聊不存在');
            return;
        }
        const titleEl = document.getElementById('wxGroupChatTitle');
        if (titleEl) {
            const count = (group.members ? group.members.length : 0) + 1; // 含自己
            titleEl.textContent = `${group.name}(${count})`;
        }
        // 清除未读
        let chats = [];
        try {
            chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
        } catch (e) {}
        const chatIndex = chats.findIndex(c => c.id === groupId);
        if (chatIndex > -1) {
            chats[chatIndex].unread = 0;
            localStorage.setItem('wx_chats', JSON.stringify(chats));
        }
        wxRenderGroupMessages();
        // 新公告：在消息列表顶部显示一条系统消息
        const grpForAnn = wxGetGroups().find(g => g.id === groupId);
        if (grpForAnn && grpForAnn.announcement && (grpForAnn.announcementTime || 0) > (grpForAnn.announcementSeenTime || 0)) {
            const msgEl = document.getElementById('wxGroupChatMessages');
            if (msgEl) {
                const annDiv = document.createElement('div');
                annDiv.className = 'wx-msg-system';
                annDiv.textContent = '群公告：' + grpForAnn.announcement;
                msgEl.insertBefore(annDiv, msgEl.firstChild);
            }
            grpForAnn.announcementSeenTime = grpForAnn.announcementTime || Date.now();
            const _groupsForAnn = wxGetGroups();
            const _gForAnn = _groupsForAnn.find(g => g.id === groupId);
            if (_gForAnn) {
                _gForAnn.announcementSeenTime = grpForAnn.announcementSeenTime;
                wxSaveGroups(_groupsForAnn);
            }
        }
        // 恢复草稿
        wxRestoreDraft(groupId, 'wxGroupChatInput');
        // 确保语音按钮已添加到更多面板
        wxAddVoiceBtnToMorePanel();
        const page = document.getElementById('wxPageGroupChat');
        if (page) page.classList.add('wx-page-show');
        // 隐藏底部Tab栏
        const tabBar = document.querySelector('.wx-tab-bar');
        if (tabBar) tabBar.style.display = 'none';
        // 关闭@面板
        const mentionPanel = document.getElementById('wxMentionPanel');
        if (mentionPanel) mentionPanel.classList.remove('show');
        setTimeout(() => {
            const msgEl = document.getElementById('wxGroupChatMessages');
            if (msgEl) msgEl.scrollTop = msgEl.scrollHeight;
        }, 50);
    };

    // 关闭群聊聊天页面
    window.wxCloseGroupChat = function() {
        // 保存草稿
        if (wxCurrentGroupId) {
            const inputEl = document.getElementById('wxGroupChatInput');
            wxSaveDraft(wxCurrentGroupId, inputEl ? inputEl.value : '');
        }
        // 清除引用回复预览
        if (wxCurrentReply && wxCurrentReply.isGroup) {
            wxCancelReply();
        }
        const page = document.getElementById('wxPageGroupChat');
        if (page) page.classList.remove('wx-page-show');
        const mentionPanel = document.getElementById('wxMentionPanel');
        if (mentionPanel) mentionPanel.classList.remove('show');
        wxCurrentGroupId = null;
        wxCloseMsgMenu();
        // 恢复底部Tab栏
        const tabBar = document.querySelector('.wx-tab-bar');
        if (tabBar) tabBar.style.display = 'flex';
        debounceRenderChatList();
    };

    // 获取成员信息（联系人或自己）
    function wxGetGroupMemberInfo(memberId) {
        if (memberId === 'me') {
            const user = wxGetUser();
            return { id: 'me', name: user.nickname || '我', avatar: user.avatar || '' };
        }
        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const contact = contacts.find(c => c.id === memberId);
        return contact ? contact : { id: memberId, name: '未知成员', avatar: '' };
    }

    // 渲染群聊消息
    function wxRenderGroupMessages() {
        const msgEl = document.getElementById('wxGroupChatMessages');
        if (!msgEl || !wxCurrentGroupId) return;
        let messages = {};
        try {
            messages = JSON.parse(localStorage.getItem('wx_messages') || '{}');
        } catch (e) {}
        const msgList = messages[wxCurrentGroupId] || [];
        if (msgList.length === 0) {
            msgEl.innerHTML = '<div style="text-align:center;color:#999;padding:40px 0;font-size:13px;">暂无消息，开始聊天吧</div>';
            return;
        }
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        msgEl.innerHTML = msgList.map((msg, index) => {
            // 系统消息居中显示
            if (msg.from === 'system') {
                return `<div class="wx-msg-system">${wxEscapeHtml(msg.content || '')}</div>`;
            }
            const isMe = msg.from === 'me';
            const member = wxGetGroupMemberInfo(msg.from);
            // 撤回消息：居中灰色提示
            if (msg.recalled) {
                const recallName = isMe ? '你' : (member.name || '成员');
                return `<div class="wx-msg-recalled" data-msg-index="${index}">${recallName}撤回了一条消息</div>`;
            }
            const avatarHtml = wxBuildAvatarHtml(member.avatar, member.name);
            const senderColor = isMe ? '' : `style="color:${wxGetMemberColor(msg.from)};"`;
            const nameHtml = isMe ? '' : `<div class="wx-msg-sender-name" ${senderColor}>${member.name || ''}</div>`;
            // 引用预览
            let quoteHtml = '';
            if (msg.replyTo) {
                quoteHtml = `<div class="wx-msg-quote"><span class="wx-msg-quote-sender">${wxEscapeHtml(msg.replyTo.senderName || '')}</span><span class="wx-msg-quote-content">${wxEscapeHtml(msg.replyTo.content || '')}</span></div>`;
            }
            let bubbleHtml = '';
            if (msg.type === 'redpacket') {
                bubbleHtml = wxRenderRedPacketCard(msg, index);
            } else if (msg.type === 'transfer') {
                bubbleHtml = wxRenderTransferCard(msg, index);
            } else if (msg.type === 'vote') {
                bubbleHtml = wxRenderVoteCard(msg, index);
            } else if (msg.type === 'solitaire') {
                bubbleHtml = wxRenderSolitaireCard(msg, index);
            } else if (msg.type === 'image') {
                bubbleHtml = wxRenderImageCard(msg, index);
            } else if (msg.type === 'voice') {
                const dur = msg.duration || 0;
                bubbleHtml = `<div class="wx-msg-bubble">${quoteHtml}<div class="wx-msg-voice ${isMe ? 'wx-msg-voice-me' : ''}"><span class="wx-msg-voice-icon">${isMe ? '🎤' : '▶'}</span><span class="wx-msg-voice-bar"></span><span class="wx-msg-voice-duration">${dur}"</span></div></div>`;
            } else {
                // 普通文字消息
                let contentHtml = wxEscapeHtml(msg.content || '');
                // @高亮：把 @昵称 包成高亮
                if (msg.mentions && msg.mentions.length) {
                    msg.mentions.forEach(mid => {
                        const m = wxGetGroupMemberInfo(mid);
                        const mentionText = '@' + (m.name || '');
                        const color = mid === 'me' ? '#fa5151' : wxGetMemberColor(mid);
                        contentHtml = contentHtml.split(mentionText).join(`<span class="wx-mention-text" style="color:${color};font-weight:500;">${mentionText}</span>`);
                    });
                }
                bubbleHtml = `<div class="wx-msg-bubble">${quoteHtml}${contentHtml}</div>`;
            }
            return `
                <div class="wx-msg-row ${isMe ? 'wx-msg-me' : 'wx-msg-them'}" data-msg-index="${index}">
                    <div class="wx-msg-avatar">${avatarHtml}</div>
                    <div class="wx-msg-bubble-wrap">
                        ${nameHtml}
                        ${bubbleHtml}
                    </div>
                </div>
            `;
        }).join('');
        wxAttachLongPress(msgEl, true);
    }

    // 发送群聊消息
    window.wxSendGroupMessage = function() {
        const inputEl = document.getElementById('wxGroupChatInput');
        if (!inputEl || !wxCurrentGroupId) return;
        const content = inputEl.value;
        if (!content.trim()) return;
        // 提取@的成员
        const mentions = [];
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        const memberList = group ? group.members.slice() : [];
        // 加入自己以便@自己
        memberList.push('me');
        memberList.forEach(mid => {
            const m = wxGetGroupMemberInfo(mid);
            const mentionText = '@' + (m.name || '');
            if (content.indexOf(mentionText) > -1) {
                mentions.push(mid);
            }
        });
        let messages = {};
        try {
            messages = JSON.parse(localStorage.getItem('wx_messages') || '{}');
        } catch (e) {}
        if (!messages[wxCurrentGroupId]) messages[wxCurrentGroupId] = [];
        const newGroupMsg = {
            from: 'me',
            content: content,
            time: Date.now(),
            mentions: mentions
        };
        // 引用回复
        if (wxCurrentReply && wxCurrentReply.isGroup) {
            newGroupMsg.replyTo = {
                senderName: wxCurrentReply.senderName,
                content: wxCurrentReply.content,
                type: wxCurrentReply.type
            };
        }
        messages[wxCurrentGroupId].push(newGroupMsg);
        localStorage.setItem('wx_messages', JSON.stringify(messages));
        inputEl.value = '';
        // 清除草稿（发送后输入框已空）
        wxSaveDraft(wxCurrentGroupId, '');
        // 清除引用回复预览
        if (wxCurrentReply && wxCurrentReply.isGroup) {
            wxCancelReply();
        }
        // 关闭@面板
        const mentionPanel = document.getElementById('wxMentionPanel');
        if (mentionPanel) mentionPanel.classList.remove('show');
        wxRenderGroupMessages();
        // 更新聊天列表
        let chats = [];
        try {
            chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
        } catch (e) {}
        const chatIndex = chats.findIndex(c => c.id === wxCurrentGroupId);
        if (chatIndex > -1) {
            const now = new Date();
            const timeStr = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
            chats[chatIndex].lastMessage = content;
            chats[chatIndex].time = timeStr;
            const [chatItem] = chats.splice(chatIndex, 1);
            chats.unshift(chatItem);
            localStorage.setItem('wx_chats', JSON.stringify(chats));
        }
        setTimeout(() => {
            const msgEl = document.getElementById('wxGroupChatMessages');
            if (msgEl) msgEl.scrollTop = msgEl.scrollHeight;
        }, 50);

        // 群聊AI回复
        wxSendGroupAiReply(wxCurrentGroupId, content, mentions);
    };

    // 群聊AI回复：一次API调用生成所有成员回复
    let wxGroupAiLocks = {};

    async function wxSendGroupAiReply(groupId, userMessage, mentions) {
        if (wxGroupAiLocks[groupId]) return;
        wxGroupAiLocks[groupId] = true;

        let apiConfig = {};
        try {
            apiConfig = JSON.parse(localStorage.getItem('censy_api_config') || '{}');
        } catch (e) {}

        if (!apiConfig.url || !apiConfig.key || !apiConfig.model) {
            wxGroupAiLocks[groupId] = false;
            return;
        }

        const groups = wxGetGroups();
        const group = groups.find(g => g.id === groupId);
        if (!group || !group.members || group.members.length === 0) {
            wxGroupAiLocks[groupId] = false;
            return;
        }

        // 获取成员信息
        const members = group.members.map(mid => {
            const info = wxGetGroupMemberInfo(mid);
            const contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
            const contact = contacts.find(c => c.id === mid);
            return {
                id: mid,
                name: info.name || '未知',
                persona: contact ? (contact.persona || '') : ''
            };
        });

        // 获取最近5条聊天记录
        let messages = {};
        try {
            messages = JSON.parse(localStorage.getItem('wx_messages') || '{}');
        } catch (e) {}
        const msgList = (messages[groupId] || []).slice(-5);

        // 构建系统提示词
        const memberList = members.map(m => 
            `- ${m.name}（ID: ${m.id}）${m.persona ? '，人设：' + m.persona : ''}`
        ).join('\n');

        const mentionedNames = mentions && mentions.length
            ? mentions.map(mid => wxGetGroupMemberInfo(mid).name).join('、')
            : '';

        const systemPrompt = `你是一个群聊模拟器。群里有以下成员：
${memberList}

用户"${wxGetGroupMemberInfo('me').name}"刚发了一条消息${mentionedNames ? `，@了${mentionedNames}` : ''}：
"${userMessage}"

请让群里所有成员（除了发送者）都回复这条消息。要求：
1. 每个成员根据自己的人设回复，语气和风格要符合角色
2. 被@的成员应该优先回复
3. 未被@的成员也要根据上下文给出反应（比如附和、吐槽、开玩笑等）
4. 回复要自然口语化，像真人微信群聊一样
5. 不同成员的回复要有差异，避免千篇一律

请以JSON格式返回，格式如下：
{"replies":[{"memberId":"成员ID","content":"回复内容"}]}

所有成员都立即回复，delay为0。只返回JSON，不要其他内容。`;

        const apiMessages = [
            { role: 'system', content: systemPrompt }
        ];

        // 添加最近聊天记录作为上下文
        msgList.forEach(msg => {
            if (msg.from === 'system') return;
            const senderName = msg.from === 'me' ? '我' : (wxGetGroupMemberInfo(msg.from).name || '成员');
            apiMessages.push({
                role: msg.from === 'me' ? 'user' : 'assistant',
                content: `${senderName}: ${msg.content}`
            });
        });

        const baseUrl = apiConfig.url.endsWith('/') ? apiConfig.url.slice(0, -1) : apiConfig.url;

        try {
            const resp = await fetch(baseUrl + '/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + apiConfig.key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: apiConfig.model,
                    messages: apiMessages,
                    stream: false,
                    temperature: 0.9,
                    max_tokens: 800
                })
            });

            if (!resp.ok) {
                wxGroupAiLocks[groupId] = false;
                return;
            }

            const data = await resp.json();
            let replyText = data.choices?.[0]?.message?.content || '';

            // 解析JSON回复
            let replies = [];
            try {
                // 去除可能的markdown代码块标记
                replyText = replyText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                const parsed = JSON.parse(replyText);
                replies = parsed.replies || parsed;
            } catch (e) {
                // JSON解析失败，跳过
                wxGroupAiLocks[groupId] = false;
                return;
            }

            // 秒回，所有成员立即回复
            replies.forEach(reply => {
                wxAddGroupMemberMessage(groupId, reply.memberId, reply.content);
            });

        } catch (err) {
            // 网络错误，静默处理
        }

        wxGroupAiLocks[groupId] = false;
    }

    // 添加群成员消息
    function wxAddGroupMemberMessage(groupId, memberId, content) {
        let messages = {};
        try {
            messages = JSON.parse(localStorage.getItem('wx_messages') || '{}');
        } catch (e) {}

        if (!messages[groupId]) messages[groupId] = [];
        messages[groupId].push({
            from: memberId,
            content: content,
            time: Date.now()
        });
        localStorage.setItem('wx_messages', JSON.stringify(messages));

        // 更新聊天列表
        let chats = [];
        try {
            chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
        } catch (e) {}
        const chatIndex = chats.findIndex(c => c.id === groupId);
        if (chatIndex > -1) {
            const now = new Date();
            const timeStr = (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
            const memberInfo = wxGetGroupMemberInfo(memberId);
            chats[chatIndex].lastMessage = memberInfo.name + ': ' + content.substring(0, 30);
            chats[chatIndex].time = timeStr;
            if (wxCurrentGroupId !== groupId) {
                chats[chatIndex].unread = (chats[chatIndex].unread || 0) + 1;
            }
            localStorage.setItem('wx_chats', JSON.stringify(chats));
        }

        // 如果当前正在查看这个群聊，重新渲染
        if (wxCurrentGroupId === groupId) {
            wxRenderGroupMessages();
            setTimeout(() => {
                const msgEl = document.getElementById('wxGroupChatMessages');
                if (msgEl) msgEl.scrollTop = msgEl.scrollHeight;
            }, 50);
        }
    }
    function wxGroupMentionTrigger(inputEl) {
        const panel = document.getElementById('wxMentionPanel');
        if (!panel) return;
        const value = inputEl.value;
        const cursorPos = inputEl.selectionStart;
        const before = value.substring(0, cursorPos);
        const atIdx = before.lastIndexOf('@');
        if (atIdx === -1) {
            panel.classList.remove('show');
            panel.innerHTML = '';
            return;
        }
        // @前面必须是空格或处于开头
        if (atIdx > 0 && before.charAt(atIdx - 1) !== ' ' && before.charAt(atIdx - 1) !== '\n') {
            panel.classList.remove('show');
            panel.innerHTML = '';
            return;
        }
        const keyword = before.substring(atIdx + 1);
        // 关键字内不允许有空格
        if (keyword.indexOf(' ') > -1 || keyword.indexOf('\n') > -1) {
            panel.classList.remove('show');
            panel.innerHTML = '';
            return;
        }
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        const memberIds = group ? group.members.slice() : [];
        memberIds.push('me');
        const matched = memberIds.map(id => wxGetGroupMemberInfo(id)).filter(m => {
            return (m.name || '').toLowerCase().indexOf(keyword.toLowerCase()) > -1;
        });
        if (matched.length === 0) {
            panel.classList.remove('show');
            panel.innerHTML = '';
            return;
        }
        panel.innerHTML = matched.map(m => {
            return `
                <div class="wx-mention-item" onclick="wxMentionMember('${m.id}', ${atIdx})">
                    <div class="wx-mention-item-avatar">${wxBuildAvatarHtml(m.avatar, m.name)}</div>
                    <div class="wx-mention-item-name">${m.name || ''}</div>
                </div>
            `;
        }).join('');
        panel.classList.add('show');
        wxGroupMentionRange = { atIdx: atIdx };
    }

    // 选择@成员
    window.wxMentionMember = function(memberId, atIdx) {
        const inputEl = document.getElementById('wxGroupChatInput');
        const panel = document.getElementById('wxMentionPanel');
        if (!inputEl || !wxCurrentGroupId) return;
        const member = wxGetGroupMemberInfo(memberId);
        const mentionText = '@' + (member.name || '') + ' ';
        const value = inputEl.value;
        const before = value.substring(0, atIdx);
        const after = value.substring(inputEl.selectionStart);
        inputEl.value = before + mentionText + after;
        // 光标移动到末尾
        const newPos = (before + mentionText).length;
        inputEl.focus();
        inputEl.setSelectionRange(newPos, newPos);
        if (panel) panel.classList.remove('show');
    };

    // 打开群聊设置
    window.wxOpenGroupSettings = function(groupId) {
        if (groupId) wxCurrentGroupId = groupId;
        wxRenderGroupSettings();
        const page = document.getElementById('wxPageGroupSettings');
        if (page) page.classList.add('wx-page-show');
    };

    // 关闭群聊设置
    window.wxCloseGroupSettings = function() {
        const page = document.getElementById('wxPageGroupSettings');
        if (page) page.classList.remove('wx-page-show');
    };

    // 渲染群聊设置页
    function wxRenderGroupSettings() {
        const bodyEl = document.getElementById('wxGroupSettingsBody');
        if (!bodyEl || !wxCurrentGroupId) return;
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        if (!group) {
            bodyEl.innerHTML = '<div style="text-align:center;color:#999;padding:40px 0;">群聊不存在</div>';
            return;
        }
        const isOwner = group.ownerId === 'me';
        const memberIds = group.members || [];
        const totalCount = memberIds.length + 1; // 含自己

        const membersHtml = memberIds.map(id => {
            const m = wxGetGroupMemberInfo(id);
            const isOwnerTag = id === group.ownerId ? '<div class="wx-group-settings-owner-tag">群主</div>' : '';
            // 群主视角下，非群主成员显示移除按钮
            const removeBtn = (isOwner && id !== group.ownerId)
                ? `<div class="wx-group-member-remove" onclick="event.stopPropagation(); wxRemoveGroupMember('${id}')" title="移出群聊"></div>`
                : '';
            return `
                <div class="wx-group-settings-member" onclick="wxShowToast('${(m.name || '').replace(/'/g, "\\'")}')">
                    <div class="wx-group-settings-member-avatar">${wxBuildAvatarHtml(m.avatar, m.name)}${isOwnerTag}${removeBtn}</div>
                    <div class="wx-group-settings-member-name">${m.name || ''}</div>
                </div>
            `;
        }).join('');

        // 自己作为群主显示在最前
        const meMember = wxGetGroupMemberInfo('me');
        const meOwnerTag = isOwner ? '<div class="wx-group-settings-owner-tag">群主</div>' : '';
        const meHtml = `
            <div class="wx-group-settings-member" onclick="wxShowToast('我')">
                <div class="wx-group-settings-member-avatar">${wxBuildAvatarHtml(meMember.avatar, meMember.name)}${meOwnerTag}</div>
                <div class="wx-group-settings-member-name">${meMember.name || '我'}</div>
            </div>
        `;

        const addBtn = isOwner ? `
            <div class="wx-group-settings-member wx-group-settings-add-member" onclick="wxAddGroupMember()">
                <div class="wx-group-settings-member-avatar">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#999" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <div class="wx-group-settings-member-name"></div>
            </div>
        ` : '';

        const dangerBtns = isOwner
            ? `<div class="wx-group-settings-danger-btn" onclick="wxDisbandGroup()">解散群聊</div>`
            : `<div class="wx-group-settings-danger-btn" onclick="wxExitGroup()">退出群聊</div>`;

        // 群公告展示
        const announcementText = group.announcement || '';
        const announcementDisplay = announcementText
            ? `<span style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${wxEscapeHtml(announcementText)}</span>`
            : '<span>暂无群公告</span>';
        const announcementSection = `
            <div class="wx-group-settings-section wx-group-announcement">
                <div class="wx-group-settings-row" ${isOwner ? 'onclick="wxEditGroupAnnouncement()"' : ''}>
                    <span class="wx-group-settings-row-label">群公告</span>
                    <div class="wx-group-settings-row-value">
                        ${announcementDisplay}
                        ${isOwner ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ccc" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>' : ''}
                    </div>
                </div>
            </div>
        `;

        // 群文件 / 群相册入口
        const filesAlbumSection = `
            <div class="wx-group-settings-section">
                <div class="wx-group-settings-row wx-group-file-entry" onclick="wxOpenGroupFiles()">
                    <span class="wx-group-settings-row-label">群文件</span>
                    <div class="wx-group-settings-row-value">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ccc" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                </div>
                <div class="wx-group-settings-divider"></div>
                <div class="wx-group-settings-row wx-group-album-entry" onclick="wxOpenGroupAlbum()">
                    <span class="wx-group-settings-row-label">群相册</span>
                    <div class="wx-group-settings-row-value">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ccc" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                </div>
            </div>
        `;

        bodyEl.innerHTML = `
            <div class="wx-group-settings-header">
                <div class="wx-group-settings-avatar" onclick="wxShowToast('点击更换群头像')">
                    ${wxBuildAvatarHtml(group.avatar, group.name)}
                </div>
                <div class="wx-group-settings-info">
                    <div class="wx-group-settings-name">${group.name || '群聊'}</div>
                    <div class="wx-group-settings-intro">${group.intro || '暂无群介绍'}</div>
                </div>
            </div>
            <div class="wx-group-settings-section">
                <div class="wx-group-settings-row" onclick="wxEditGroupName()">
                    <span class="wx-group-settings-row-label">群聊名称</span>
                    <div class="wx-group-settings-row-value">
                        <span>${(group.name || '').replace(/</g, '&lt;')}</span>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#ccc" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
                    </div>
                </div>
                <div class="wx-group-settings-divider"></div>
                <div class="wx-group-settings-row">
                    <span class="wx-group-settings-row-label">群介绍</span>
                    <div class="wx-group-settings-row-value">
                        <span style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${(group.intro || '暂无').replace(/</g, '&lt;')}</span>
                    </div>
                </div>
            </div>
            ${announcementSection}
            <div class="wx-group-settings-members-title">群成员(${totalCount})</div>
            <div class="wx-group-settings-members">
                ${meHtml}
                ${membersHtml}
                ${addBtn}
            </div>
            ${filesAlbumSection}
            <div class="wx-group-settings-section">
                <div class="wx-group-settings-row">
                    <span class="wx-group-settings-row-label">消息免打扰</span>
                    <div class="wx-group-settings-switch ${group.mute ? 'on' : ''}" onclick="wxToggleGroupOption('mute', this)"></div>
                </div>
                <div class="wx-group-settings-divider"></div>
                <div class="wx-group-settings-row">
                    <span class="wx-group-settings-row-label">置顶聊天</span>
                    <div class="wx-group-settings-switch ${group.top ? 'on' : ''}" onclick="wxToggleGroupOption('top', this)"></div>
                </div>
                <div class="wx-group-settings-divider"></div>
                <div class="wx-group-settings-row">
                    <span class="wx-group-settings-row-label">保存到通讯录</span>
                    <div class="wx-group-settings-switch ${group.saved ? 'on' : ''}" onclick="wxToggleGroupOption('saved', this)"></div>
                </div>
            </div>
            ${dangerBtns}
        `;
    }

    // 切换群选项
    window.wxToggleGroupOption = function(key, el) {
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        if (!group) return;
        group[key] = !group[key];
        wxSaveGroups(groups);
        if (el) el.classList.toggle('on');
    };

    // 编辑群名称
    window.wxEditGroupName = function() {
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        if (!group) return;
        let modal = document.getElementById('wxGroupEditModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'wxGroupEditModal';
            modal.className = 'wx-group-edit-modal';
            modal.innerHTML = `
                <div class="wx-group-edit-modal-content">
                    <div class="wx-group-edit-modal-title">群聊名称</div>
                    <div class="wx-group-edit-modal-input-wrap">
                        <input type="text" class="wx-group-edit-modal-input" id="wxGroupEditNameInput" maxlength="30">
                    </div>
                    <div class="wx-group-edit-modal-actions">
                        <div class="wx-group-edit-modal-btn cancel" onclick="wxCloseGroupEditModal()">取消</div>
                        <div class="wx-group-edit-modal-btn confirm" onclick="wxConfirmGroupName()">确定</div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        const input = document.getElementById('wxGroupEditNameInput');
        if (input) input.value = group.name || '';
        modal.classList.add('show');
        setTimeout(() => { if (input) input.focus(); }, 100);
    };

    window.wxCloseGroupEditModal = function() {
        const modal = document.getElementById('wxGroupEditModal');
        if (modal) modal.classList.remove('show');
    };

    window.wxConfirmGroupName = function() {
        const input = document.getElementById('wxGroupEditNameInput');
        const newName = input ? input.value.trim() : '';
        if (!newName) {
            wxShowToast('请输入群名称');
            return;
        }
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        if (group) {
            group.name = newName;
            wxSaveGroups(groups);
            // 同步更新聊天列表
            let chats = [];
            try {
                chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
            } catch (e) {}
            const chatIndex = chats.findIndex(c => c.id === wxCurrentGroupId);
            if (chatIndex > -1) {
                chats[chatIndex].name = newName;
                localStorage.setItem('wx_chats', JSON.stringify(chats));
            }
            // 更新群聊标题
            const titleEl = document.getElementById('wxGroupChatTitle');
            if (titleEl) {
                const count = (group.members ? group.members.length : 0) + 1;
                titleEl.textContent = `${newName}(${count})`;
            }
        }
        wxCloseGroupEditModal();
        wxRenderGroupSettings();
        wxShowToast('修改成功');
    };

    // 选中的待添加成员
    let wxAddGroupMemberSelected = [];

    // 添加群成员（设置页"+"）
    window.wxAddGroupMember = function() {
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        if (!group) return;
        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const notInGroup = contacts.filter(c => (group.members || []).indexOf(c.id) === -1);
        if (notInGroup.length === 0) {
            wxShowToast('没有可添加的联系人');
            return;
        }
        // 打开选择面板
        wxAddGroupMemberSelected = [];
        wxRenderAddGroupMemberList();
        const panel = document.getElementById('wxAddGroupMemberPanel');
        const overlay = document.getElementById('wxAddGroupMemberOverlay');
        if (panel) panel.classList.add('show');
        if (overlay) overlay.classList.add('show');
    };

    // 渲染添加成员选择列表
    function wxRenderAddGroupMemberList() {
        const listEl = document.getElementById('wxAddGroupMemberList');
        if (!listEl) return;
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        if (!group) return;
        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const notInGroup = contacts.filter(c => (group.members || []).indexOf(c.id) === -1);
        if (notInGroup.length === 0) {
            listEl.innerHTML = '<div style="text-align:center;color:#999;padding:20px 0;font-size:13px;">没有可添加的联系人</div>';
            return;
        }
        listEl.innerHTML = notInGroup.map(contact => {
            const checked = wxAddGroupMemberSelected.indexOf(contact.id) > -1;
            return `
                <div class="wx-group-member-item ${checked ? 'checked' : ''}" onclick="wxToggleAddGroupMember('${contact.id}')">
                    <div class="wx-group-member-checkbox">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div class="wx-group-member-avatar">${wxBuildAvatarHtml(contact.avatar, contact.name)}</div>
                    <div class="wx-group-member-name">${contact.name || '未命名'}</div>
                </div>
            `;
        }).join('');
    }

    // 切换添加成员选中状态
    window.wxToggleAddGroupMember = function(contactId) {
        const idx = wxAddGroupMemberSelected.indexOf(contactId);
        if (idx > -1) {
            wxAddGroupMemberSelected.splice(idx, 1);
        } else {
            wxAddGroupMemberSelected.push(contactId);
        }
        wxRenderAddGroupMemberList();
    };

    // 确认添加选中的成员
    window.wxConfirmAddGroupMembers = function() {
        if (wxAddGroupMemberSelected.length === 0) {
            wxShowToast('请至少选择一个联系人');
            return;
        }
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        if (!group) return;
        if (!group.members) group.members = [];
        let contacts = [];
        try {
            contacts = JSON.parse(localStorage.getItem('wx_contacts') || '[]');
        } catch (e) {}
        const names = [];
        wxAddGroupMemberSelected.forEach(id => {
            if (group.members.indexOf(id) === -1) {
                group.members.push(id);
                const c = contacts.find(co => co.id === id);
                if (c) names.push(c.name);
            }
        });
        wxSaveGroups(groups);
        // 系统消息
        let messages = {};
        try {
            messages = JSON.parse(localStorage.getItem('wx_messages') || '{}');
        } catch (e) {}
        if (!messages[wxCurrentGroupId]) messages[wxCurrentGroupId] = [];
        messages[wxCurrentGroupId].push({
            from: 'system',
            content: '你邀请了 ' + names.join('、') + ' 加入群聊',
            time: Date.now()
        });
        localStorage.setItem('wx_messages', JSON.stringify(messages));
        wxCloseAddGroupMemberPanel();
        wxRenderGroupSettings();
        wxShowToast('已添加');
    };

    // 关闭添加成员面板
    window.wxCloseAddGroupMemberPanel = function() {
        const panel = document.getElementById('wxAddGroupMemberPanel');
        const overlay = document.getElementById('wxAddGroupMemberOverlay');
        if (panel) panel.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
        wxAddGroupMemberSelected = [];
    };

    // 退出群聊
    window.wxExitGroup = function() {
        if (!confirm('确定要退出群聊吗？')) return;
        wxRemoveGroupFromChats(wxCurrentGroupId);
        wxShowToast('已退出群聊');
        wxCloseGroupSettings();
        wxCloseGroupChat();
        debounceRenderChatList();
    };

    // 解散群聊
    window.wxDisbandGroup = function() {
        if (!confirm('确定要解散群聊吗？解散后不可恢复。')) return;
        const groups = wxGetGroups();
        const newGroups = groups.filter(g => g.id !== wxCurrentGroupId);
        wxSaveGroups(newGroups);
        wxRemoveGroupFromChats(wxCurrentGroupId);
        // 删除消息记录
        let messages = {};
        try {
            messages = JSON.parse(localStorage.getItem('wx_messages') || '{}');
        } catch (e) {}
        delete messages[wxCurrentGroupId];
        localStorage.setItem('wx_messages', JSON.stringify(messages));
        wxShowToast('已解散群聊');
        wxCloseGroupSettings();
        wxCloseGroupChat();
        debounceRenderChatList();
    };

    // 从聊天列表移除群聊
    function wxRemoveGroupFromChats(groupId) {
        let chats = [];
        try {
            chats = JSON.parse(localStorage.getItem('wx_chats') || '[]');
        } catch (e) {}
        const newChats = chats.filter(c => c.id !== groupId);
        localStorage.setItem('wx_chats', JSON.stringify(newChats));
    }

    // 打开通讯录群聊列表
    window.wxOpenGroupList = function() {
        wxInitGroupData();
        wxRenderGroupList();
        const page = document.getElementById('wxPageGroupList');
        if (page) page.classList.add('wx-page-show');
    };

    // 关闭群聊列表
    window.wxCloseGroupList = function() {
        const page = document.getElementById('wxPageGroupList');
        if (page) page.classList.remove('wx-page-show');
    };

    // 渲染群聊列表
    function wxRenderGroupList() {
        const bodyEl = document.getElementById('wxGroupListBody');
        if (!bodyEl) return;
        const groups = wxGetGroups();
        if (groups.length === 0) {
            bodyEl.innerHTML = '<div class="wx-group-list-empty">暂无群聊</div>';
            return;
        }
        bodyEl.innerHTML = groups.map(group => {
            const count = (group.members ? group.members.length : 0) + 1;
            return `
                <div class="wx-group-list-item" data-group-id="${group.id}">
                    <div class="wx-group-list-avatar" onclick="wxOpenGroupChat('${group.id}')">
                        ${wxBuildAvatarHtml(group.avatar, group.name)}
                        <div class="wx-group-avatar-count">${count}</div>
                    </div>
                    <div class="wx-group-list-info" onclick="wxOpenGroupChat('${group.id}')">
                        <div class="wx-group-list-name">${(group.name || '').replace(/</g, '&lt;')}</div>
                        <div class="wx-group-list-count">${count}人</div>
                    </div>
                    <div class="wx-group-list-actions">
                        <div class="wx-group-list-action-btn wx-action-edit" onclick="wxEditGroupListItem('${group.id}', event)">编辑</div>
                        ${group.ownerId === 'me' ? `<div class="wx-group-list-action-btn wx-action-disband" onclick="wxDisbandGroupListItem('${group.id}', event)">解散</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');
        // 绑定左滑事件
        wxBindGroupListSwipe();
    }

    // 列表项编辑（重命名）
    window.wxEditGroupListItem = function(groupId, event) {
        if (event) event.stopPropagation();
        wxCurrentGroupId = groupId;
        wxEditGroupName();
    };

    // 列表项解散
    window.wxDisbandGroupListItem = function(groupId, event) {
        if (event) event.stopPropagation();
        wxCurrentGroupId = groupId;
        wxDisbandGroup();
    };

    // 绑定群聊列表左滑事件
    function wxBindGroupListSwipe() {
        const items = document.querySelectorAll('.wx-group-list-item');
        items.forEach(item => {
            let startX = 0;
            let currentX = 0;
            let dragging = false;
            let opened = false;
            const actionWidth = 110;

            item.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
                dragging = true;
            }, { passive: true });

            item.addEventListener('touchmove', function(e) {
                if (!dragging) return;
                currentX = e.touches[0].clientX;
                let dx = currentX - startX;
                if (opened) dx = dx - actionWidth;
                if (dx > 0) dx = 0;
                if (dx < -actionWidth) dx = -actionWidth;
                item.style.transform = `translateX(${dx}px)`;
            }, { passive: true });

            item.addEventListener('touchend', function() {
                if (!dragging) return;
                dragging = false;
                let dx = currentX - startX;
                if (opened) dx = dx - actionWidth;
                if (dx < -actionWidth / 2) {
                    item.style.transform = `translateX(${-actionWidth}px)`;
                    opened = true;
                } else {
                    item.style.transform = 'translateX(0)';
                    opened = false;
                }
            }, { passive: true });

            // 鼠标事件支持（桌面端测试）
            let mouseStartX = 0;
            let mouseDragging = false;
            item.addEventListener('mousedown', function(e) {
                // 排除点击操作按钮
                if (e.target.closest('.wx-group-list-action-btn') || e.target.closest('.wx-group-list-avatar') || e.target.closest('.wx-group-list-info')) return;
                mouseStartX = e.clientX;
                mouseDragging = true;
            });
            item.addEventListener('mousemove', function(e) {
                if (!mouseDragging) return;
                let dx = e.clientX - mouseStartX;
                if (opened) dx = dx - actionWidth;
                if (dx > 0) dx = 0;
                if (dx < -actionWidth) dx = -actionWidth;
                item.style.transform = `translateX(${dx}px)`;
            });
            item.addEventListener('mouseup', function(e) {
                if (!mouseDragging) return;
                mouseDragging = false;
                let dx = e.clientX - mouseStartX;
                if (opened) dx = dx - actionWidth;
                if (dx < -actionWidth / 2) {
                    item.style.transform = `translateX(${-actionWidth}px)`;
                    opened = true;
                } else {
                    item.style.transform = 'translateX(0)';
                    opened = false;
                }
            });
            item.addEventListener('mouseleave', function() {
                if (mouseDragging) {
                    mouseDragging = false;
                    item.style.transform = opened ? `translateX(${-actionWidth}px)` : 'translateX(0)';
                }
            });
        });
    }

    // 暴露内部渲染函数到window（符合规范要求）
    window.wxRenderSelectedMembers = wxRenderSelectedMembers;
    window.wxRenderGroupMessages = wxRenderGroupMessages;
    window.wxRenderGroupSettings = wxRenderGroupSettings;
    window.wxRenderGroupList = wxRenderGroupList;
    window.wxGroupMentionTrigger = wxGroupMentionTrigger;
    window.wxRenderGroupMemberList = wxRenderGroupMemberList;

    /* ==================== 群聊更多功能（红包/转账/投票/接龙/图片） ==================== */
    // 状态变量
    let wxRedPacketType = 'lucky';
    let wxRedPacketRecipientId = null;
    let wxTransferRecipientId = null;
    let wxVoteOptionsState = ['', ''];
    let wxVoteSettings = { multi: false, anonymous: false };

    // HTML转义
    function wxEscapeHtml(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // 读取/保存消息
    function wxGetMessages() {
        try { return JSON.parse(localStorage.getItem('wx_messages') || '{}'); } catch (e) { return {}; }
    }
    function wxSaveMessages(messages) {
        localStorage.setItem('wx_messages', JSON.stringify(messages));
    }

    // 获取当前群成员（含自己）
    function wxGetCurrentGroupMembers() {
        if (!wxCurrentGroupId) return [];
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        if (!group) return [];
        const ids = (group.members || []).slice();
        if (ids.indexOf('me') === -1) ids.push('me');
        return ids;
    }

    // 向群聊追加消息 + 更新聊天列表
    function wxAppendGroupMessage(msg) {
        if (!wxCurrentGroupId) return;
        const messages = wxGetMessages();
        if (!messages[wxCurrentGroupId]) messages[wxCurrentGroupId] = [];
        messages[wxCurrentGroupId].push(msg);
        wxSaveMessages(messages);
        // 更新聊天列表
        let chats = [];
        try { chats = JSON.parse(localStorage.getItem('wx_chats') || '[]'); } catch (e) {}
        const idx = chats.findIndex(c => c.id === wxCurrentGroupId);
        if (idx > -1) {
            const now = new Date();
            const hh = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
            const mm = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
            chats[idx].lastMessage = msg.preview || '新消息';
            chats[idx].time = hh + ':' + mm;
            const [item] = chats.splice(idx, 1);
            chats.unshift(item);
            localStorage.setItem('wx_chats', JSON.stringify(chats));
        }
        wxRenderGroupMessages();
        setTimeout(() => {
            const msgEl = document.getElementById('wxGroupChatMessages');
            if (msgEl) msgEl.scrollTop = msgEl.scrollHeight;
        }, 50);
    }

    // 成员选择器（底部弹出）
    function wxShowMemberPicker(title, memberIds, callback) {
        let modal = document.getElementById('wxMemberPickerModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'wxMemberPickerModal';
            modal.className = 'wx-member-picker-modal';
            document.body.appendChild(modal);
            modal.addEventListener('click', function(e) {
                if (e.target.classList && e.target.classList.contains('wx-member-picker-mask')) {
                    modal.classList.remove('show');
                }
            });
        }
        const listHtml = memberIds.map(id => {
            const m = wxGetGroupMemberInfo(id);
            return `
                <div class="wx-member-picker-item" data-id="${id}">
                    <div class="wx-member-picker-avatar">${wxBuildAvatarHtml(m.avatar, m.name)}</div>
                    <div class="wx-member-picker-name">${wxEscapeHtml(m.name || '')}</div>
                </div>
            `;
        }).join('');
        modal.innerHTML = `
            <div class="wx-member-picker-mask"></div>
            <div class="wx-member-picker-content">
                <div class="wx-member-picker-title">${wxEscapeHtml(title || '选择成员')}</div>
                <div class="wx-member-picker-list">${listHtml}</div>
            </div>
        `;
        modal.classList.add('show');
        modal.querySelectorAll('.wx-member-picker-item').forEach(item => {
            item.addEventListener('click', function() {
                const id = this.dataset.id;
                modal.classList.remove('show');
                if (callback) callback(id);
            });
        });
    }

    /* ----- 更多面板 ----- */
    window.wxToggleGroupMorePanel = function() {
        const panel = document.getElementById('wxGroupMorePanel');
        if (!panel) return;
        panel.classList.toggle('show');
        const mentionPanel = document.getElementById('wxMentionPanel');
        if (mentionPanel) mentionPanel.classList.remove('show');
    };
    window.wxCloseGroupMorePanel = function() {
        const panel = document.getElementById('wxGroupMorePanel');
        if (panel) panel.classList.remove('show');
    };

    /* ----- 红包 ----- */
    window.wxOpenRedPacket = function() {
        wxCloseGroupMorePanel();
        wxRedPacketType = 'lucky';
        wxRedPacketRecipientId = null;
        const amountInput = document.getElementById('wxRedPacketAmount');
        const countInput = document.getElementById('wxRedPacketCount');
        const msgInput = document.getElementById('wxRedPacketMessage');
        if (amountInput) amountInput.value = '';
        if (countInput) countInput.value = '';
        if (msgInput) msgInput.value = '';
        wxSetRedPacketType('lucky');
        const recipientName = document.getElementById('wxRedPacketRecipientName');
        if (recipientName) { recipientName.textContent = '点击选择'; recipientName.classList.remove('selected'); }
        const page = document.getElementById('wxPageRedPacket');
        if (page) page.classList.add('wx-page-show');
    };
    window.wxCloseRedPacket = function() {
        const page = document.getElementById('wxPageRedPacket');
        if (page) page.classList.remove('wx-page-show');
    };
    window.wxSetRedPacketType = function(type) {
        wxRedPacketType = type;
        const tabs = document.querySelectorAll('.wx-redpacket-type-tab');
        tabs.forEach(t => t.classList.toggle('active', t.dataset.type === type));
        const countRow = document.getElementById('wxRedPacketCountRow');
        const recipientRow = document.getElementById('wxRedPacketRecipientRow');
        if (countRow) countRow.style.display = type === 'lucky' ? 'flex' : 'none';
        if (recipientRow) recipientRow.style.display = type === 'exclusive' ? 'flex' : 'none';
    };
    window.wxSelectRedPacketRecipient = function() {
        const members = wxGetCurrentGroupMembers().filter(id => id !== 'me');
        if (members.length === 0) { wxShowToast('暂无群成员'); return; }
        wxShowMemberPicker('选择领取人', members, function(id) {
            wxRedPacketRecipientId = id;
            const m = wxGetGroupMemberInfo(id);
            const el = document.getElementById('wxRedPacketRecipientName');
            if (el) { el.textContent = m.name || ''; el.classList.add('selected'); }
        });
    };
    window.wxCreateRedPacket = function() {
        if (!wxCurrentGroupId) return;
        const amountInput = document.getElementById('wxRedPacketAmount');
        const countInput = document.getElementById('wxRedPacketCount');
        const msgInput = document.getElementById('wxRedPacketMessage');
        const amount = parseFloat(amountInput ? amountInput.value : '0');
        if (!amount || amount <= 0) { wxShowToast('请输入金额'); return; }
        const message = (msgInput ? msgInput.value.trim() : '') || '恭喜发财，大吉大利';
        let count = 1;
        let recipient = null;
        if (wxRedPacketType === 'lucky') {
            count = parseInt(countInput ? countInput.value : '1', 10);
            if (!count || count < 1) { wxShowToast('请输入红包个数'); return; }
        } else {
            if (!wxRedPacketRecipientId) { wxShowToast('请选择领取人'); return; }
            recipient = wxRedPacketRecipientId;
            count = 1;
        }
        const id = 'rp_' + Date.now();
        const rpData = {
            id: id,
            type: wxRedPacketType,
            totalAmount: Math.round(amount * 100) / 100,
            count: count,
            message: message,
            recipient: recipient,
            claimed: [],
            expired: false,
            createTime: Date.now()
        };
        wxAppendGroupMessage({
            from: 'me',
            type: 'redpacket',
            time: Date.now(),
            redpacketData: rpData,
            preview: '[红包]'
        });
        wxShowToast('已发送');
        wxCloseRedPacket();
        // AI群成员自动抢红包
        const __rpMsgs = wxGetMessages();
        const __rpIdx = (__rpMsgs[wxCurrentGroupId] || []).length - 1;
        if (__rpIdx >= 0) wxAutoClaimRedPacket(wxCurrentGroupId, __rpIdx);
    };
    // 点击红包卡片：领取或查看详情
    window.wxOpenRedPacketCard = function(msgIndex) {
        if (!wxCurrentGroupId) return;
        const messages = wxGetMessages();
        const list = messages[wxCurrentGroupId] || [];
        const msg = list[msgIndex];
        if (!msg || msg.type !== 'redpacket') return;
        const data = msg.redpacketData;
        if (!data) return;
        // 已领取过 → 直接看详情
        if (data.claimed.some(c => c.uid === 'me')) {
            wxOpenRedPacketDetail(msgIndex);
            return;
        }
        // 过期检查（24小时）
        const isExpired = data.expired || (Date.now() - (data.createTime || msg.time || 0) > 24 * 60 * 60 * 1000);
        if (isExpired) {
            data.expired = true;
            wxSaveMessages(messages);
            wxRenderGroupMessages();
            wxOpenRedPacketDetail(msgIndex);
            return;
        }
        // 专属红包：不是给我的
        if (data.type === 'exclusive' && data.recipient !== 'me') {
            wxShowToast('这不是给你的红包');
            wxOpenRedPacketDetail(msgIndex);
            return;
        }
        // 是否已领完
        const totalCount = data.type === 'exclusive' ? 1 : data.count;
        if (data.claimed.length >= totalCount) {
            wxOpenRedPacketDetail(msgIndex);
            return;
        }
        // 领取：计算金额
        let claimAmount = 0;
        if (data.type === 'lucky') {
            const remaining = data.totalAmount - data.claimed.reduce((s, c) => s + c.amount, 0);
            const remainingCount = totalCount - data.claimed.length;
            if (remainingCount <= 1) {
                claimAmount = Math.round(remaining * 100) / 100;
            } else {
                const minVal = 0.01;
                const maxVal = remaining - minVal * (remainingCount - 1);
                claimAmount = Math.max(minVal, Math.round((Math.random() * (maxVal - minVal) + minVal) * 100) / 100);
            }
        } else {
            claimAmount = data.totalAmount;
        }
        data.claimed.push({ uid: 'me', amount: claimAmount, time: Date.now() });
        wxSaveMessages(messages);
        wxRenderGroupMessages();
        wxOpenRedPacketDetail(msgIndex);
    };
    window.wxOpenRedPacketDetail = function(msgIndex) {
        if (!wxCurrentGroupId) return;
        const messages = wxGetMessages();
        const list = messages[wxCurrentGroupId] || [];
        const msg = list[msgIndex];
        if (!msg || msg.type !== 'redpacket') return;
        const data = msg.redpacketData;
        const sender = wxGetGroupMemberInfo(msg.from);
        const myClaim = data.claimed.find(c => c.uid === 'me');
        const isExpired = data.expired || (Date.now() - (data.createTime || msg.time || 0) > 24 * 60 * 60 * 1000);
        const isExclusive = data.type === 'exclusive';
        const claimedCount = data.claimed.length;
        const totalCount = isExclusive ? 1 : data.count;
        const remainingAmount = data.totalAmount - data.claimed.reduce((s, c) => s + c.amount, 0);
        let statusText = '';
        if (myClaim) {
            statusText = isExclusive ? '已领取' : (claimedCount >= totalCount ? '已被领完' : '已领取');
        } else if (isExpired) {
            statusText = '已过期';
        } else if (claimedCount >= totalCount) {
            statusText = '已被领完';
        } else {
            statusText = isExclusive ? (data.recipient === 'me' ? '等待领取' : '专属红包') : '等待领取';
        }
        const recordsHtml = data.claimed.length === 0
            ? '<div class="wx-redpacket-detail-empty">暂无领取记录</div>'
            : data.claimed.map(c => {
                const m = wxGetGroupMemberInfo(c.uid);
                const d = new Date(c.time || 0);
                const hh = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
                const mm = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
                return `
                    <div class="wx-redpacket-detail-record">
                        <div class="wx-redpacket-detail-record-avatar">${wxBuildAvatarHtml(m.avatar, m.name)}</div>
                        <div class="wx-redpacket-detail-record-info">
                            <div class="wx-redpacket-detail-record-name">${wxEscapeHtml(m.name || '')}</div>
                            <div class="wx-redpacket-detail-record-time">${hh}:${mm}</div>
                        </div>
                        <div class="wx-redpacket-detail-record-amount">¥${(c.amount || 0).toFixed(2)}</div>
                    </div>
                `;
            }).join('');
        const body = document.getElementById('wxRedPacketDetailBody');
        if (body) {
            body.innerHTML = `
                <div class="wx-redpacket-detail-header">
                    <div class="wx-redpacket-detail-avatar">${wxBuildAvatarHtml(sender.avatar, sender.name)}</div>
                    <div class="wx-redpacket-detail-from">${wxEscapeHtml(sender.name || '')}</div>
                    <div class="wx-redpacket-detail-title">${wxEscapeHtml(data.message || '恭喜发财')}</div>
                    ${myClaim
                        ? `<div class="wx-redpacket-detail-amount">${(myClaim.amount || 0).toFixed(2)}<span class="wx-redpacket-detail-amount-unit">元</span></div>`
                        : (isExpired ? `<div class="wx-redpacket-detail-amount">0.00<span class="wx-redpacket-detail-amount-unit">元</span></div>` : `<div class="wx-redpacket-detail-amount" style="font-size:16px;">${wxEscapeHtml(data.message || '')}</div>`)
                    }
                    <div class="wx-redpacket-detail-status">${statusText}</div>
                </div>
                <div class="wx-redpacket-detail-section">
                    <div class="wx-redpacket-detail-section-title">${claimedCount}/${totalCount}个已领取，共¥${data.totalAmount.toFixed(2)}，剩余¥${remainingAmount.toFixed(2)}</div>
                    ${recordsHtml}
                </div>
            `;
        }
        const page = document.getElementById('wxPageRedPacketDetail');
        if (page) page.classList.add('wx-page-show');
    };
    window.wxCloseRedPacketDetail = function() {
        const page = document.getElementById('wxPageRedPacketDetail');
        if (page) page.classList.remove('wx-page-show');
    };

    /* ----- 转账 ----- */
    window.wxOpenTransfer = function() {
        wxCloseGroupMorePanel();
        wxTransferRecipientId = null;
        const avatar = document.getElementById('wxTransferRecipientAvatar');
        const name = document.getElementById('wxTransferRecipientName');
        if (avatar) avatar.innerHTML = '';
        if (name) { name.textContent = '点击选择'; name.classList.add('empty'); }
        const amountInput = document.getElementById('wxTransferAmount');
        const msgInput = document.getElementById('wxTransferMessage');
        if (amountInput) amountInput.value = '';
        if (msgInput) msgInput.value = '';
        const page = document.getElementById('wxPageTransfer');
        if (page) page.classList.add('wx-page-show');
    };
    window.wxCloseTransfer = function() {
        const page = document.getElementById('wxPageTransfer');
        if (page) page.classList.remove('wx-page-show');
    };
    window.wxSelectTransferRecipient = function() {
        const members = wxGetCurrentGroupMembers().filter(id => id !== 'me');
        if (members.length === 0) { wxShowToast('暂无群成员'); return; }
        wxShowMemberPicker('选择收款人', members, function(id) {
            wxTransferRecipientId = id;
            const m = wxGetGroupMemberInfo(id);
            const avatar = document.getElementById('wxTransferRecipientAvatar');
            const name = document.getElementById('wxTransferRecipientName');
            if (avatar) avatar.innerHTML = wxBuildAvatarHtml(m.avatar, m.name);
            if (name) { name.textContent = m.name || ''; name.classList.remove('empty'); }
        });
    };
    window.wxCreateTransfer = function() {
        if (!wxCurrentGroupId) return;
        if (!wxTransferRecipientId) { wxShowToast('请选择收款人'); return; }
        const amountInput = document.getElementById('wxTransferAmount');
        const msgInput = document.getElementById('wxTransferMessage');
        const amount = parseFloat(amountInput ? amountInput.value : '0');
        if (!amount || amount <= 0) { wxShowToast('请输入金额'); return; }
        const message = (msgInput ? msgInput.value.trim() : '') || '微信转账';
        const id = 'tf_' + Date.now();
        const tfData = {
            id: id,
            amount: Math.round(amount * 100) / 100,
            message: message,
            recipient: wxTransferRecipientId,
            claimed: false,
            createTime: Date.now()
        };
        wxAppendGroupMessage({
            from: 'me',
            type: 'transfer',
            time: Date.now(),
            transferData: tfData,
            preview: '[转账] ¥' + amount.toFixed(2)
        });
        wxShowToast('已发送');
        wxCloseTransfer();
    };
    window.wxOpenTransferCard = function(msgIndex) {
        if (!wxCurrentGroupId) return;
        const messages = wxGetMessages();
        const list = messages[wxCurrentGroupId] || [];
        const msg = list[msgIndex];
        if (!msg || msg.type !== 'transfer') return;
        const data = msg.transferData;
        if (!data) return;
        if (data.recipient === 'me') {
            if (!data.claimed) {
                if (confirm('确认接收 ¥' + data.amount.toFixed(2) + ' 元转账？')) {
                    data.claimed = true;
                    data.claimTime = Date.now();
                    wxSaveMessages(messages);
                    wxRenderGroupMessages();
                    wxShowToast('已确认收款 ¥' + data.amount.toFixed(2));
                }
            } else {
                wxShowToast('已收款 ¥' + data.amount.toFixed(2));
            }
        } else {
            wxShowToast('转账给 ' + (data.recipient ? (wxGetGroupMemberInfo(data.recipient).name || '他人') : '他人'));
        }
    };

    /* ----- 投票 ----- */
    window.wxOpenVote = function() {
        wxCloseGroupMorePanel();
        wxVoteOptionsState = ['', ''];
        wxVoteSettings = { multi: false, anonymous: false };
        const topicInput = document.getElementById('wxVoteTopic');
        if (topicInput) topicInput.value = '';
        const multiSwitch = document.getElementById('wxVoteMultiSwitch');
        const anonSwitch = document.getElementById('wxVoteAnonymousSwitch');
        if (multiSwitch) multiSwitch.classList.remove('on');
        if (anonSwitch) anonSwitch.classList.remove('on');
        wxRenderVoteOptions();
        const page = document.getElementById('wxPageVote');
        if (page) page.classList.add('wx-page-show');
    };
    window.wxCloseVote = function() {
        const page = document.getElementById('wxPageVote');
        if (page) page.classList.remove('wx-page-show');
    };
    function wxRenderVoteOptions() {
        const wrap = document.getElementById('wxVoteOptions');
        if (!wrap) return;
        wrap.innerHTML = wxVoteOptionsState.map((val, idx) => {
            return `
                <div class="wx-vote-option-item">
                    <div class="wx-vote-option-index">${idx + 1}</div>
                    <input type="text" class="wx-vote-option-input" placeholder="选项${idx + 1}" value="${wxEscapeHtml(val)}" data-index="${idx}" maxlength="30">
                    ${wxVoteOptionsState.length > 2 ? `<div class="wx-vote-option-del" data-index="${idx}"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>` : ''}
                </div>
            `;
        }).join('');
        wrap.querySelectorAll('.wx-vote-option-input').forEach(input => {
            input.addEventListener('input', function() {
                const i = parseInt(this.dataset.index, 10);
                wxVoteOptionsState[i] = this.value;
            });
        });
        wrap.querySelectorAll('.wx-vote-option-del').forEach(btn => {
            btn.addEventListener('click', function() {
                const i = parseInt(this.dataset.index, 10);
                wxVoteOptionsState.splice(i, 1);
                wxRenderVoteOptions();
            });
        });
    }
    window.wxRenderVoteOptions = wxRenderVoteOptions;
    window.wxAddVoteOption = function() {
        if (wxVoteOptionsState.length >= 10) { wxShowToast('最多10个选项'); return; }
        wxVoteOptionsState.push('');
        wxRenderVoteOptions();
    };
    window.wxToggleVoteSwitch = function(key, el) {
        wxVoteSettings[key] = !wxVoteSettings[key];
        if (el) el.classList.toggle('on', wxVoteSettings[key]);
    };
    window.wxCreateVote = function() {
        if (!wxCurrentGroupId) return;
        const topicInput = document.getElementById('wxVoteTopic');
        const topic = topicInput ? topicInput.value.trim() : '';
        if (!topic) { wxShowToast('请输入投票主题'); return; }
        const options = wxVoteOptionsState.map(o => o.trim()).filter(o => o);
        if (options.length < 2) { wxShowToast('请至少输入2个选项'); return; }
        const id = 'vote_' + Date.now();
        const voteData = {
            id: id,
            topic: topic,
            options: options.map(text => ({ text: text, voters: [] })),
            multiSelect: !!wxVoteSettings.multi,
            anonymous: !!wxVoteSettings.anonymous,
            closed: false,
            createTime: Date.now()
        };
        wxAppendGroupMessage({
            from: 'me',
            type: 'vote',
            time: Date.now(),
            voteData: voteData,
            preview: '[投票] ' + topic
        });
        wxShowToast('已发布');
        wxCloseVote();
    };
    window.wxVoteOption = function(msgIndex, optionIndex) {
        if (!wxCurrentGroupId) return;
        const messages = wxGetMessages();
        const list = messages[wxCurrentGroupId] || [];
        const msg = list[msgIndex];
        if (!msg || msg.type !== 'vote') return;
        const data = msg.voteData;
        if (!data || data.closed) { wxShowToast('投票已结束'); return; }
        const opt = data.options[optionIndex];
        if (!opt) return;
        const alreadyVoted = data.options.some(o => o.voters.indexOf('me') > -1);
        if (alreadyVoted && !data.multiSelect) {
            wxShowToast('已投过票');
            return;
        }
        // 多选时该选项已投则取消
        const myIdx = opt.voters.indexOf('me');
        if (myIdx > -1) {
            opt.voters.splice(myIdx, 1);
        } else {
            opt.voters.push('me');
        }
        wxSaveMessages(messages);
        wxRenderGroupMessages();
    };

    /* ----- 接龙 ----- */
    window.wxOpenSolitaire = function() {
        wxCloseGroupMorePanel();
        const topicInput = document.getElementById('wxSolitaireTopic');
        const contentInput = document.getElementById('wxSolitaireContent');
        if (topicInput) topicInput.value = '';
        if (contentInput) contentInput.value = '';
        const page = document.getElementById('wxPageSolitaire');
        if (page) page.classList.add('wx-page-show');
    };
    window.wxCloseSolitaire = function() {
        const page = document.getElementById('wxPageSolitaire');
        if (page) page.classList.remove('wx-page-show');
    };
    window.wxCreateSolitaire = function() {
        if (!wxCurrentGroupId) return;
        const topicInput = document.getElementById('wxSolitaireTopic');
        const contentInput = document.getElementById('wxSolitaireContent');
        const topic = topicInput ? topicInput.value.trim() : '';
        const content = contentInput ? contentInput.value.trim() : '';
        if (!topic) { wxShowToast('请输入接龙主题'); return; }
        if (!content) { wxShowToast('请输入第一句内容'); return; }
        const id = 'sol_' + Date.now();
        const solitaireData = {
            id: id,
            topic: topic,
            items: [{ uid: 'me', content: content, time: Date.now() }]
        };
        wxAppendGroupMessage({
            from: 'me',
            type: 'solitaire',
            time: Date.now(),
            solitaireData: solitaireData,
            preview: '[接龙] ' + topic
        });
        wxShowToast('已发起');
        wxCloseSolitaire();
        // AI群成员自动参与接龙
        const __solMessages = wxGetMessages();
        const __solList = __solMessages[wxCurrentGroupId] || [];
        const __solMsgIndex = __solList.length - 1;
        if (__solMsgIndex >= 0) wxAutoJoinSolitaire(wxCurrentGroupId, __solMsgIndex);
    };

    // AI群成员自动参与接龙：每个成员随机延迟2-8秒，添加一条接龙项
    window.wxAutoJoinSolitaire = function(groupId, msgIndex) {
        if (!groupId) return;
        const initMessages = wxGetMessages();
        const initList = initMessages[groupId] || [];
        const initMsg = initList[msgIndex];
        if (!initMsg || initMsg.type !== 'solitaire') return;
        const initData = initMsg.solitaireData;
        if (!initData) return;
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === groupId);
        if (!group) return;
        const senderId = initMsg.from;
        // 候选参与成员（除发起者和自己）
        const candidates = (group.members || []).filter(id => id !== senderId && id !== 'me');
        if (candidates.length === 0) return;
        // 接龙内容候选池（随机生成自然口语化的接龙内容）
        const contentPool = [
            '我来一条',
            '加上我',
            '+1',
            '我也来',
            '接上',
            '跟一个',
            '算我一个',
            '同上',
            '凑热闹',
            '继续',
            '到我了',
            '我也参与一下',
            '接着接',
            '来咯',
            '凑个数'
        ];
        candidates.forEach(memberId => {
            // 每个成员随机延迟2-8秒
            const delay = 2000 + Math.floor(Math.random() * 6000);
            setTimeout(() => {
                const messages = wxGetMessages();
                const list = messages[groupId] || [];
                const msg = list[msgIndex];
                if (!msg || msg.type !== 'solitaire') return;
                const data = msg.solitaireData;
                if (!data) return;
                // 已参与过则跳过
                if (data.items.some(it => it.uid === memberId)) return;
                // 随机生成接龙内容
                const content = contentPool[Math.floor(Math.random() * contentPool.length)];
                data.items.push({ uid: memberId, content: content, time: Date.now() });
                wxSaveMessages(messages);
                // 仅当正在查看该群聊时才重新渲染
                if (wxCurrentGroupId === groupId) {
                    wxRenderGroupMessages();
                    setTimeout(() => {
                        const msgEl = document.getElementById('wxGroupChatMessages');
                        if (msgEl) msgEl.scrollTop = msgEl.scrollHeight;
                    }, 50);
                }
            }, delay);
        });
    };
    window.wxAppendSolitaire = function(msgIndex, inputId) {
        if (!wxCurrentGroupId) return;
        const input = document.getElementById(inputId);
        const content = input ? input.value.trim() : '';
        if (!content) { wxShowToast('请输入接龙内容'); return; }
        const messages = wxGetMessages();
        const list = messages[wxCurrentGroupId] || [];
        const msg = list[msgIndex];
        if (!msg || msg.type !== 'solitaire') return;
        const data = msg.solitaireData;
        if (!data) return;
        data.items.push({ uid: 'me', content: content, time: Date.now() });
        wxSaveMessages(messages);
        wxRenderGroupMessages();
        setTimeout(() => {
            const msgEl = document.getElementById('wxGroupChatMessages');
            if (msgEl) msgEl.scrollTop = msgEl.scrollHeight;
        }, 50);
    };

    /* ----- 图片 ----- */
    window.wxTriggerGroupImageUpload = function() {
        wxCloseGroupMorePanel();
        const file = document.getElementById('wxGroupImageFile');
        if (file) {
            file.value = '';
            file.click();
        }
    };
    window.wxSendGroupImage = function(base64Data) {
        if (!wxCurrentGroupId) return;
        wxAppendGroupMessage({
            from: 'me',
            type: 'image',
            time: Date.now(),
            content: base64Data,
            preview: '[图片]'
        });
    };
    window.wxPreviewImage = function(src) {
        const overlay = document.getElementById('wxImagePreviewOverlay');
        const img = document.getElementById('wxImagePreviewImg');
        if (overlay && img) {
            img.src = src;
            overlay.classList.add('show');
        }
    };
    window.wxCloseImagePreview = function() {
        const overlay = document.getElementById('wxImagePreviewOverlay');
        if (overlay) overlay.classList.remove('show');
    };
    window.wxPreviewImageByIndex = function(msgIndex) {
        if (!wxCurrentGroupId) return;
        const messages = wxGetMessages();
        const list = messages[wxCurrentGroupId] || [];
        const msg = list[msgIndex];
        if (!msg || msg.type !== 'image') return;
        wxPreviewImage(msg.content);
    };

    /* ----- 消息卡片渲染函数 ----- */
    function wxRenderRedPacketCard(msg, index) {
        const data = msg.redpacketData;
        if (!data) return '';
        const myClaim = data.claimed.find(c => c.uid === 'me');
        const isExpired = data.expired || (Date.now() - (data.createTime || msg.time || 0) > 24 * 60 * 60 * 1000);
        const isExclusive = data.type === 'exclusive';
        const totalCount = isExclusive ? 1 : data.count;
        const claimedAll = data.claimed.length >= totalCount;
        let statusBadge = '';
        if (myClaim) statusBadge = '已领取';
        else if (claimedAll) statusBadge = '已被领完';
        else if (isExpired) statusBadge = '已过期';
        let recipientHtml = '';
        if (isExclusive && data.recipient) {
            const m = wxGetGroupMemberInfo(data.recipient);
            recipientHtml = `<div class="wx-msg-redpacket-recipient">${wxBuildAvatarHtml(m.avatar, m.name)}</div>`;
        }
        return `
            <div class="wx-msg-redpacket" onclick="wxOpenRedPacketCard(${index})">
                ${statusBadge ? `<div class="wx-msg-redpacket-claimed-tag">${statusBadge}</div>` : ''}
                <div class="wx-msg-redpacket-icon">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#fff" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9c3 0 4-2 4-2s1 2 5 2 5-2 5-2"/><circle cx="12" cy="14" r="2.5"/></svg>
                </div>
                <div class="wx-msg-redpacket-info">
                    <div class="wx-msg-redpacket-msg">${wxEscapeHtml(data.message || '恭喜发财')}</div>
                    <div class="wx-msg-redpacket-name">微信红包</div>
                </div>
                ${recipientHtml}
            </div>
        `;
    }
    function wxRenderTransferCard(msg, index) {
        const data = msg.transferData;
        if (!data) return '';
        const tag = data.claimed ? '已收款' : '';
        const recipientName = data.recipient ? (wxGetGroupMemberInfo(data.recipient).name || '') : '';
        return `
            <div class="wx-msg-transfer" onclick="wxOpenTransferCard(${index})">
                ${tag ? `<div class="wx-msg-transfer-claimed-tag">${tag}</div>` : ''}
                <div class="wx-msg-transfer-icon">
                    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#fff" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><circle cx="6" cy="14.5" r="1.5"/></svg>
                </div>
                <div class="wx-msg-transfer-info">
                    <div class="wx-msg-transfer-msg">${wxEscapeHtml(data.message || '微信转账')}</div>
                    <div class="wx-msg-transfer-amount-line">¥<span class="amount">${data.amount.toFixed(2)}</span></div>
                    <div class="wx-msg-transfer-name">转账${recipientName ? '给 ' + wxEscapeHtml(recipientName) : ''}</div>
                </div>
            </div>
        `;
    }
    function wxRenderVoteCard(msg, index) {
        const data = msg.voteData;
        if (!data) return '';
        const voterSet = new Set();
        data.options.forEach(o => o.voters.forEach(v => voterSet.add(v)));
        const totalVotes = data.options.reduce((s, o) => s + o.voters.length, 0);
        return `
            <div class="wx-msg-vote">
                <div class="wx-msg-vote-header">
                    <div class="wx-msg-vote-icon">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="3"><path d="M9 17l-5-5 2-2 3 3 7-7 2 2z"/></svg>
                    </div>
                    <div class="wx-msg-vote-title">${wxEscapeHtml(data.topic || '投票')}</div>
                </div>
                <div class="wx-msg-vote-options">
                    ${data.options.map((opt, i) => {
                        const voters = opt.voters.length;
                        const pct = totalVotes > 0 ? Math.round(voters * 100 / totalVotes) : 0;
                        const voted = opt.voters.indexOf('me') > -1;
                        return `
                            <div class="wx-msg-vote-option ${voted ? 'voted' : ''}" onclick="wxVoteOption(${index}, ${i})">
                                <div class="wx-msg-vote-option-bar">
                                    <div class="wx-msg-vote-option-fill" style="width:${pct}%"></div>
                                    <div class="wx-msg-vote-option-text">
                                        <span>${wxEscapeHtml(opt.text)}</span>
                                        <span class="wx-msg-vote-option-percent">${pct}%</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="wx-msg-vote-footer">
                    <span>${voterSet.size}人参与 · ${totalVotes}票</span>
                    <span>${data.multiSelect ? '多选' : '单选'}${data.anonymous ? ' · 匿名' : ''}</span>
                </div>
            </div>
        `;
    }
    function wxRenderSolitaireCard(msg, index) {
        const data = msg.solitaireData;
        if (!data) return '';
        const participants = new Set(data.items.map(it => it.uid));
        const itemsHtml = data.items.map((it, i) => {
            const m = wxGetGroupMemberInfo(it.uid);
            return `
                <div class="wx-msg-solitaire-item">
                    <span class="num">${i + 1}.</span><span class="who">${wxEscapeHtml(m.name || '')}:</span>${wxEscapeHtml(it.content)}
                </div>
            `;
        }).join('');
        const inputId = 'wxSolitaireInput_' + index;
        return `
            <div class="wx-msg-solitaire">
                <div class="wx-msg-solitaire-header">
                    <div class="wx-msg-solitaire-icon">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/></svg>
                    </div>
                    <div class="wx-msg-solitaire-title">${wxEscapeHtml(data.topic || '接龙')}</div>
                </div>
                <div class="wx-msg-solitaire-list">${itemsHtml}</div>
                <div class="wx-msg-solitaire-footer-info">${participants.size}人参与 · ${data.items.length}条接龙</div>
                <div class="wx-msg-solitaire-input-row">
                    <input type="text" class="wx-msg-solitaire-input" id="${inputId}" placeholder="追加接龙内容" maxlength="50">
                    <div class="wx-msg-solitaire-btn" onclick="wxAppendSolitaire(${index}, '${inputId}')">接龙</div>
                </div>
            </div>
        `;
    }
    function wxRenderImageCard(msg, index) {
        const src = msg.content || '';
        return `
            <div class="wx-msg-image" onclick="wxPreviewImageByIndex(${index})">
                <img src="${src}" alt="图片">
            </div>
        `;
    }

    /* ==================== 群聊增强：群公告 / 成员管理 / 群文件 / 群相册 / AI抢红包 ==================== */

    // 向指定群聊追加消息（不依赖 wxCurrentGroupId，仅在该群聊打开时才渲染）
    function wxPushGroupMessageTo(groupId, msg) {
        if (!groupId) return;
        const messages = wxGetMessages();
        if (!messages[groupId]) messages[groupId] = [];
        messages[groupId].push(msg);
        wxSaveMessages(messages);
        // 更新聊天列表
        let chats = [];
        try { chats = JSON.parse(localStorage.getItem('wx_chats') || '[]'); } catch (e) {}
        const idx = chats.findIndex(c => c.id === groupId);
        if (idx > -1) {
            const now = new Date();
            const hh = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
            const mm = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
            chats[idx].lastMessage = msg.preview || '新消息';
            chats[idx].time = hh + ':' + mm;
            const [item] = chats.splice(idx, 1);
            chats.unshift(item);
            localStorage.setItem('wx_chats', JSON.stringify(chats));
        }
        // 仅当正在查看该群聊时才渲染
        if (wxCurrentGroupId === groupId) {
            const chatPage = document.getElementById('wxPageGroupChat');
            if (chatPage && chatPage.classList.contains('wx-page-show')) {
                wxRenderGroupMessages();
                setTimeout(() => {
                    const msgEl = document.getElementById('wxGroupChatMessages');
                    if (msgEl) msgEl.scrollTop = msgEl.scrollHeight;
                }, 50);
            }
        }
    }

    // 编辑群公告
    window.wxEditGroupAnnouncement = function() {
        if (!wxCurrentGroupId) return;
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        if (!group) return;
        if (group.ownerId !== 'me') {
            wxShowToast('仅群主可编辑');
            return;
        }
        let modal = document.getElementById('wxGroupAnnouncementModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'wxGroupAnnouncementModal';
            modal.className = 'wx-group-announcement-edit';
            modal.innerHTML = `
                <div class="wx-group-announcement-edit-content">
                    <div class="wx-group-announcement-edit-title">群公告</div>
                    <div class="wx-group-announcement-edit-input-wrap">
                        <textarea class="wx-group-announcement-edit-input" id="wxGroupAnnouncementInput" maxlength="200" placeholder="输入群公告内容"></textarea>
                    </div>
                    <div class="wx-group-announcement-edit-actions">
                        <div class="wx-group-announcement-edit-btn cancel" onclick="wxCloseGroupAnnouncementEdit()">取消</div>
                        <div class="wx-group-announcement-edit-btn confirm" onclick="wxConfirmGroupAnnouncement()">确定</div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        const input = document.getElementById('wxGroupAnnouncementInput');
        if (input) input.value = group.announcement || '';
        modal.classList.add('show');
        setTimeout(() => { if (input) input.focus(); }, 100);
    };

    window.wxCloseGroupAnnouncementEdit = function() {
        const modal = document.getElementById('wxGroupAnnouncementModal');
        if (modal) modal.classList.remove('show');
    };

    window.wxConfirmGroupAnnouncement = function() {
        const input = document.getElementById('wxGroupAnnouncementInput');
        const text = input ? input.value.trim() : '';
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        if (group) {
            group.announcement = text;
            group.announcementTime = Date.now();
            wxSaveGroups(groups);
        }
        wxCloseGroupAnnouncementEdit();
        wxRenderGroupSettings();
        wxShowToast('已发布');
    };

    // 移除群成员
    window.wxRemoveGroupMember = function(memberId) {
        if (!wxCurrentGroupId || !memberId) return;
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        if (!group) return;
        if (memberId === group.ownerId) {
            wxShowToast('群主不能被移除');
            return;
        }
        const member = wxGetGroupMemberInfo(memberId);
        const memberName = member.name || '成员';
        if (!confirm('确定将' + memberName + '移出群聊吗？')) return;
        if (group.members) {
            const idx = group.members.indexOf(memberId);
            if (idx > -1) group.members.splice(idx, 1);
        }
        wxSaveGroups(groups);
        // 系统消息
        wxPushGroupMessageTo(wxCurrentGroupId, {
            from: 'system',
            type: 'system',
            content: memberName + '被移出群聊',
            time: Date.now(),
            preview: memberName + '被移出群聊'
        });
        wxRenderGroupSettings();
        wxShowToast('已移出');
    };

    // 打开群文件页面
    window.wxOpenGroupFiles = function() {
        if (!wxCurrentGroupId) return;
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === wxCurrentGroupId);
        if (!group) return;
        // 初始化模拟文件数据
        if (!group.files || group.files.length === 0) {
            group.files = [
                { id: 'f1', name: '群规.txt', size: '2.3KB', time: '2024-01-01' },
                { id: 'f2', name: '活动方案.docx', size: '15.6KB', time: '2024-01-02' },
                { id: 'f3', name: '聚会照片.zip', size: '8.2MB', time: '2024-01-03' }
            ];
            wxSaveGroups(groups);
        }
        const settingsPage = document.getElementById('wxPageGroupSettings');
        let page = document.getElementById('wxGroupFilesPage');
        if (!page) {
            page = document.createElement('div');
            page.id = 'wxGroupFilesPage';
            page.className = 'wx-group-files-page';
            if (settingsPage) settingsPage.appendChild(page);
            else document.body.appendChild(page);
        }
        const filesHtml = group.files.length === 0
            ? '<div class="wx-group-files-empty">暂无文件</div>'
            : group.files.map(f => `
                <div class="wx-group-file-item">
                    <div class="wx-group-file-icon">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#576b95" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div class="wx-group-file-info">
                        <div class="wx-group-file-name">${wxEscapeHtml(f.name || '')}</div>
                        <div class="wx-group-file-meta">${wxEscapeHtml(f.size || '')}${f.time ? ' · ' + wxEscapeHtml(f.time) : ''}</div>
                    </div>
                </div>
            `).join('');
        page.innerHTML = `
            <div class="wx-group-files-header">
                <div class="wx-group-files-back" onclick="wxCloseGroupFiles()">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#333" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                </div>
                <div class="wx-group-files-title">群文件</div>
            </div>
            <div class="wx-group-files-body">${filesHtml}</div>
        `;
        page.classList.add('show');
    };

    window.wxCloseGroupFiles = function() {
        const page = document.getElementById('wxGroupFilesPage');
        if (page) page.classList.remove('show');
    };

    // 打开群相册页面
    window.wxOpenGroupAlbum = function() {
        if (!wxCurrentGroupId) return;
        const messages = wxGetMessages();
        const list = messages[wxCurrentGroupId] || [];
        const images = list.filter(m => m.type === 'image' && m.content);
        const settingsPage = document.getElementById('wxPageGroupSettings');
        let page = document.getElementById('wxGroupAlbumPage');
        if (!page) {
            page = document.createElement('div');
            page.id = 'wxGroupAlbumPage';
            page.className = 'wx-group-album-page';
            if (settingsPage) settingsPage.appendChild(page);
            else document.body.appendChild(page);
        }
        const albumHtml = images.length === 0
            ? '<div class="wx-group-album-empty">暂无图片</div>'
            : '<div class="wx-group-album-grid">' + images.map(img => `
                <div class="wx-group-album-item"><img src="${img.content}" alt=""></div>
            `).join('') + '</div>';
        page.innerHTML = `
            <div class="wx-group-album-header">
                <div class="wx-group-album-back" onclick="wxCloseGroupAlbum()">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#333" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
                </div>
                <div class="wx-group-album-title">群相册</div>
            </div>
            <div class="wx-group-album-body">${albumHtml}</div>
        `;
        // 绑定点击预览（避免将 base64 放进 onclick 属性）
        const imgs = images;
        page.querySelectorAll('.wx-group-album-item').forEach((el, i) => {
            el.addEventListener('click', function() {
                if (imgs[i] && imgs[i].content) wxPreviewImage(imgs[i].content);
            });
        });
        page.classList.add('show');
    };

    window.wxCloseGroupAlbum = function() {
        const page = document.getElementById('wxGroupAlbumPage');
        if (page) page.classList.remove('show');
    };

    // AI群成员自动抢红包
    window.wxAutoClaimRedPacket = function(groupId, msgIndex) {
        if (!groupId) return;
        const initMessages = wxGetMessages();
        const initList = initMessages[groupId] || [];
        const initMsg = initList[msgIndex];
        if (!initMsg || initMsg.type !== 'redpacket') return;
        const initData = initMsg.redpacketData;
        if (!initData) return;
        const groups = wxGetGroups();
        const group = groups.find(g => g.id === groupId);
        if (!group) return;
        const senderId = initMsg.from;
        // 候选领取人
        let candidates;
        if (initData.type === 'exclusive') {
            if (!initData.recipient || initData.recipient === senderId) return;
            candidates = [initData.recipient];
        } else {
            candidates = (group.members || []).filter(id => id !== senderId && id !== 'me');
        }
        if (candidates.length === 0) return;
        candidates.forEach(memberId => {
            const delay = 1000 + Math.floor(Math.random() * 4000); // 1-5秒
            setTimeout(() => {
                const messages = wxGetMessages();
                const list = messages[groupId] || [];
                const msg = list[msgIndex];
                if (!msg || msg.type !== 'redpacket') return;
                const data = msg.redpacketData;
                if (!data) return;
                const totalCount = data.type === 'exclusive' ? 1 : data.count;
                // 已领完 / 过期 / 已领过 / 专属非本人
                if (data.claimed.length >= totalCount) return;
                if (data.expired || (Date.now() - (data.createTime || msg.time || 0) > 24 * 60 * 60 * 1000)) return;
                if (data.claimed.some(c => c.uid === memberId)) return;
                if (data.type === 'exclusive' && data.recipient !== memberId) return;
                // 计算金额
                let claimAmount = 0;
                if (data.type === 'lucky') {
                    const remaining = data.totalAmount - data.claimed.reduce((s, c) => s + c.amount, 0);
                    const remainingCount = totalCount - data.claimed.length;
                    if (remainingCount <= 1) {
                        claimAmount = Math.round(remaining * 100) / 100;
                    } else {
                        const minVal = 0.01;
                        const maxVal = remaining - minVal * (remainingCount - 1);
                        claimAmount = Math.max(minVal, Math.round((Math.random() * (maxVal - minVal) + minVal) * 100) / 100);
                    }
                } else {
                    claimAmount = data.totalAmount;
                }
                data.claimed.push({ uid: memberId, amount: claimAmount, time: Date.now() });
                wxSaveMessages(messages);
                // 发送“抢到了”消息
                const member = wxGetGroupMemberInfo(memberId);
                const claimText = (member.name || '群成员') + '抢到了' + claimAmount.toFixed(2) + '元';
                wxPushGroupMessageTo(groupId, {
                    from: memberId,
                    type: 'text',
                    content: '抢到了' + claimAmount.toFixed(2) + '元',
                    time: Date.now(),
                    preview: claimText
                });
            }, delay);
        });
    };

    // 群聊功能事件绑定
    document.addEventListener('DOMContentLoaded', function() {
        // 群头像上传
        const groupAvatarFile = document.getElementById('wxGroupAvatarFile');
        const groupAvatarImg = document.getElementById('wxGroupAvatarImg');
        if (groupAvatarFile) {
            groupAvatarFile.addEventListener('change', function(e) {
                const f = e.target.files[0];
                if (!f) return;
                const reader = new FileReader();
                reader.onload = function(ev) {
                    wxCreateGroupAvatar = ev.target.result;
                    if (groupAvatarImg) {
                        groupAvatarImg.src = ev.target.result;
                        groupAvatarImg.style.display = 'block';
                    }
                };
                reader.readAsDataURL(f);
            });
        }

        // 群聊输入框：回车发送 & @触发
        const groupInput = document.getElementById('wxGroupChatInput');
        if (groupInput) {
            groupInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    wxSendGroupMessage();
                }
            });
            groupInput.addEventListener('input', function() {
                wxGroupMentionTrigger(groupInput);
            });
            groupInput.addEventListener('click', function() {
                wxGroupMentionTrigger(groupInput);
            });
        }

        // 群聊设置按钮
        const settingsBtn = document.getElementById('wxGroupChatSettingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (wxCurrentGroupId) wxOpenGroupSettings(wxCurrentGroupId);
            });
        }

        // 点击其他地方关闭@面板
        document.addEventListener('click', function(e) {
            const panel = document.getElementById('wxMentionPanel');
            const input = document.getElementById('wxGroupChatInput');
            if (panel && panel.classList.contains('show')) {
                if (!panel.contains(e.target) && e.target !== input) {
                    panel.classList.remove('show');
                }
            }
            // 点击更多面板外部关闭更多面板
            const morePanel = document.getElementById('wxGroupMorePanel');
            if (morePanel && morePanel.classList.contains('show')) {
                const moreBtn = document.querySelector('#wxPageGroupChat .wx-chat-more-btn');
                if (!morePanel.contains(e.target) && (!moreBtn || !moreBtn.contains(e.target))) {
                    morePanel.classList.remove('show');
                }
            }
        });

        // 群聊更多按钮（+号）：弹起更多功能面板
        const groupMoreBtn = document.querySelector('#wxPageGroupChat .wx-chat-more-btn');
        if (groupMoreBtn) {
            groupMoreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                wxToggleGroupMorePanel();
            });
        }

        // 群聊图片上传
        const groupImageFile = document.getElementById('wxGroupImageFile');
        if (groupImageFile) {
            groupImageFile.addEventListener('change', function(e) {
                const f = e.target.files[0];
                if (!f) return;
                const reader = new FileReader();
                reader.onload = function(ev) {
                    wxSendGroupImage(ev.target.result);
                };
                reader.readAsDataURL(f);
            });
        }

        // 图片预览遮罩点击关闭
        const imgPreviewOverlay = document.getElementById('wxImagePreviewOverlay');
        if (imgPreviewOverlay) {
            imgPreviewOverlay.addEventListener('click', function(e) {
                if (e.target === imgPreviewOverlay) {
                    wxCloseImagePreview();
                }
            });
        }

        // 通讯录tab切换时渲染群聊列表（保证数据最新）
        const origSwitch = window.wxSwitchTab;
        window.wxSwitchTab = function(tab) {
            if (origSwitch) origSwitch(tab);
            if (tab === 'contacts') {
                wxInitGroupData();
            }
        };
    });

    // 打开APP时初始化群聊数据
    const origWxOpenAppForGroup = window.wxOpenApp;
    window.wxOpenApp = function() {
        if (origWxOpenAppForGroup) origWxOpenAppForGroup();
        wxInitGroupData();
    };
})();

/* ==================== 小手机锁屏界面 JS ==================== */

// 锁屏状态（默认密码1234）
let phoneLockState = {
    password: '1234',           // 默认密码
    isUnlocked: false,          // 是否已解锁
    currentInput: '',           // 当前输入的密码
    wallpaper: ''               // 锁屏壁纸
};

// 加载锁屏配置
function phoneLoadLockState() {
    try {
        const stored = localStorage.getItem('phone_lock_state');
        if (stored) {
            const parsed = JSON.parse(stored);
            phoneLockState.password = parsed.password || '1234';
            phoneLockState.wallpaper = parsed.wallpaper || '';
        }
    } catch (e) {
        console.error('加载锁屏配置失败', e);
    }
}

// 保存锁屏配置
function phoneSaveLockState() {
    try {
        localStorage.setItem('phone_lock_state', JSON.stringify({
            password: phoneLockState.password,
            wallpaper: phoneLockState.wallpaper || ''
        }));
    } catch (e) {
        console.error('保存锁屏配置失败', e);
    }
}

// 加载锁屏壁纸（从本地存储加载）
function phoneLoadLockWallpaper() {
    const bg = document.getElementById('phoneLockscreenBg');
    const pwdBg = document.getElementById('phonePasswordPanelBg');
    if (phoneLockState.wallpaper) {
        if (bg) bg.style.backgroundImage = `url(${phoneLockState.wallpaper})`;
        if (pwdBg) pwdBg.style.backgroundImage = `url(${phoneLockState.wallpaper})`;
    } else {
        if (bg) bg.style.backgroundImage = '';
        if (pwdBg) pwdBg.style.backgroundImage = '';
    }
}

// 初始化锁屏
function phoneInitLockscreen() {
    phoneLoadLockState();
    phoneLoadLockWallpaper();

    // 强制每次打开都显示锁屏
    phoneLockState.isUnlocked = false;
    phoneLockState.currentInput = '';

    // 确保锁屏显示
    const lockscreen = document.getElementById('phoneLockscreen');
    if (lockscreen) {
        lockscreen.style.display = 'block';
        lockscreen.classList.remove('hidden');
    }

    // 更新时间
    phoneUpdateLockscreenTime();
    setInterval(phoneUpdateLockscreenTime, 1000);

    // 绑定上滑事件
    phoneBindLockscreenEvents();

    // 绑定密码键盘事件
    phoneBindPasswordKeypad();
}

// 更新锁屏时间
function phoneUpdateLockscreenTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const dateStr = `${now.getMonth() + 1}月${now.getDate()}日 ${weekdays[now.getDay()]}`;
    const timeStr = `${hours}:${minutes}`;

    const timeEl = document.getElementById('phoneLockscreenTime');
    const dateEl = document.getElementById('phoneLockscreenDate');
    if (timeEl) timeEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;
}

// 绑定锁屏上滑事件
function phoneBindLockscreenEvents() {
    const content = document.getElementById('phoneLockscreenContent');
    if (!content) return;

    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const onStart = (e) => {
        if (phoneLockState.isUnlocked) return;
        isDragging = true;
        startY = e.touches ? e.touches[0].clientY : e.clientY;
        currentY = startY;
    };

    const onMove = (e) => {
        if (!isDragging || phoneLockState.isUnlocked) return;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        const delta = startY - y;
        if (delta > 0) {
            e.preventDefault();
            currentY = y;
            const move = Math.min(delta, 200);
            content.style.transform = `translateY(-${move}px)`;
            content.style.opacity = 1 - move / 400;
        }
    };

    const onEnd = (e) => {
        if (!isDragging || phoneLockState.isUnlocked) return;
        isDragging = false;
        const delta = startY - currentY;
        if (delta > 80) {
            content.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            content.style.transform = `translateY(-100vh)`;
            content.style.opacity = '0';
            setTimeout(() => {
                phoneShowPasswordPanel();
                content.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                content.style.transform = '';
                content.style.opacity = '';
            }, 300);
        } else {
            content.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            content.style.transform = '';
            content.style.opacity = '';
            setTimeout(() => {
                content.style.transition = '';
            }, 300);
        }
    };

    content.addEventListener('touchstart', onStart, { passive: true });
    content.addEventListener('touchmove', onMove, { passive: false });
    content.addEventListener('touchend', onEnd, { passive: true });
    content.addEventListener('mousedown', onStart);
    content.addEventListener('mousemove', onMove);
    content.addEventListener('mouseup', onEnd);
    content.addEventListener('mouseleave', onEnd);
}

// 显示密码输入面板
function phoneShowPasswordPanel() {
    const panel = document.getElementById('phonePasswordPanel');
    if (!panel) return;
    
    // 同步锁屏背景到密码面板
    const bg = document.getElementById('phoneLockscreenBg');
    const pwdBg = document.getElementById('phonePasswordPanelBg');
    if (bg && pwdBg) {
        pwdBg.style.backgroundImage = bg.style.backgroundImage;
    }
    
    panel.classList.add('show');
    phoneLockState.currentInput = '';
    phoneUpdatePasswordDots(0);
    const err = document.getElementById('phonePasswordError');
    if (err) err.textContent = '';
}

// 关闭密码输入面板
function phoneClosePasswordPanel() {
    const panel = document.getElementById('phonePasswordPanel');
    if (panel) panel.classList.remove('show');
    phoneLockState.currentInput = '';
    phoneUpdatePasswordDots(0);
}

// 更新密码点显示
function phoneUpdatePasswordDots(count) {
    const dots = document.getElementById('phonePasswordDots');
    if (!dots) return;
    const spans = dots.querySelectorAll('span');
    spans.forEach((span, i) => {
        span.classList.remove('filled', 'error');
        if (i < count) {
            span.classList.add('filled');
        }
    });
}

// 密码错误动画
function phoneShowPasswordError(msg) {
    const dots = document.getElementById('phonePasswordDots');
    const err = document.getElementById('phonePasswordError');
    if (dots) {
        const spans = dots.querySelectorAll('span');
        spans.forEach(s => {
            s.classList.remove('filled');
            s.classList.add('error');
        });
    }
    if (err) err.textContent = msg;
    setTimeout(() => {
        if (dots) {
            const spans = dots.querySelectorAll('span');
            spans.forEach(s => s.classList.remove('error'));
        }
    }, 500);
}

// 解锁成功
function phoneUnlockSuccess() {
    phoneLockState.isUnlocked = true;
    const lockscreen = document.getElementById('phoneLockscreen');
    if (lockscreen) {
        lockscreen.classList.add('hidden');
        setTimeout(() => {
            lockscreen.style.display = 'none';
        }, 400);
    }
}

// 绑定数字键盘
function phoneBindPasswordKeypad() {
    const panel = document.getElementById('phonePasswordPanel');
    if (!panel) return;
    const keys = panel.querySelectorAll('.phone-key[data-key]');
    keys.forEach(key => {
        if (key.dataset.bound) return;
        key.dataset.bound = '1';

        const onPress = (e) => {
            e.preventDefault();
            if (key.dataset.key === 'del') {
                if (phoneLockState.currentInput.length > 0) {
                    phoneLockState.currentInput = phoneLockState.currentInput.slice(0, -1);
                    phoneUpdatePasswordDots(phoneLockState.currentInput.length);
                    const err = document.getElementById('phonePasswordError');
                    if (err) err.textContent = '';
                }
            } else {
                if (phoneLockState.currentInput.length < 4) {
                    phoneLockState.currentInput += key.dataset.key;
                    phoneUpdatePasswordDots(phoneLockState.currentInput.length);
                    const err = document.getElementById('phonePasswordError');
                    if (err) err.textContent = '';
                    if (phoneLockState.currentInput.length === 4) {
                        // 验证密码
                        if (phoneLockState.currentInput === phoneLockState.password) {
                            const err = document.getElementById('phonePasswordError');
                            if (err) err.textContent = '';
                            setTimeout(() => {
                                phoneUnlockSuccess();
                            }, 200);
                        } else {
                            phoneShowPasswordError('密码错误，请重试');
                            phoneLockState.currentInput = '';
                        }
                    }
                }
            }
        };

        key.addEventListener('click', onPress);
        key.addEventListener('touchend', onPress);
    });
}

// 页面加载时初始化锁屏
document.addEventListener('DOMContentLoaded', function() {
    initInsPanelAvatar();
    initVinylAvatar();
    initInsSocialUploads();
    initCatCardUploads();
    initCapsuleAvatars();
    initAnimalAvatars();
    initLockSettings();
});

function initLockSettings() {
    // 更改锁屏壁纸
    const lockBgBtn = document.getElementById('censyLockBgBtn');
    const lockBgFile = document.getElementById('censyLockBgFile');
    const lockBgSaveBtn = document.getElementById('censyLockBgSaveBtn');
    let tempLockWallpaper = '';
    
    if (lockBgBtn && lockBgFile) {
        lockBgBtn.addEventListener('click', () => lockBgFile.click());
        lockBgFile.addEventListener('change', (e) => {
            const f = e.target.files[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                tempLockWallpaper = ev.target.result;
                const bg = document.getElementById('phoneLockscreenBg');
                const pwdBg = document.getElementById('phonePasswordPanelBg');
                if (bg) bg.style.backgroundImage = `url(${tempLockWallpaper})`;
                if (pwdBg) pwdBg.style.backgroundImage = `url(${tempLockWallpaper})`;
            };
            reader.readAsDataURL(f);
        });
    }

    // 保存锁屏壁纸
    if (lockBgSaveBtn) {
        lockBgSaveBtn.addEventListener('click', () => {
            if (tempLockWallpaper) {
                phoneLockState.wallpaper = tempLockWallpaper;
                phoneSaveLockState();
                lockBgSaveBtn.textContent = '已保存 ✓';
                setTimeout(() => {
                    lockBgSaveBtn.textContent = '保存锁屏壁纸';
                }, 2000);
            } else {
                lockBgSaveBtn.textContent = '请先选择图片';
                setTimeout(() => {
                    lockBgSaveBtn.textContent = '保存锁屏壁纸';
                }, 2000);
            }
        });
    }

    // 更改锁屏密码
    const pwdSaveBtn = document.getElementById('censyLockPwdSaveBtn');
    const pwdInput = document.getElementById('censyLockPwdInput');
    if (pwdSaveBtn && pwdInput) {
        pwdSaveBtn.addEventListener('click', () => {
            const val = pwdInput.value.trim();
            if (!/^\d{4}$/.test(val)) {
                pwdInput.style.borderColor = '#e8364f';
                pwdInput.value = '';
                pwdInput.placeholder = '请输入4位数字';
                setTimeout(() => {
                    pwdInput.style.borderColor = '';
                    pwdInput.placeholder = '输入4位新密码';
                }, 2000);
                return;
            }
            phoneLockState.password = val;
            phoneSaveLockState();
            pwdInput.value = '';
            pwdInput.placeholder = '密码已保存 ✓';
            setTimeout(() => {
                pwdInput.placeholder = '输入4位新密码';
            }, 2000);
        });
    }
}

function initInsSocialUploads() {
    const avatarWrap = document.getElementById('insSocialAvatarWrap');
    const avatarFile = document.getElementById('insSocialAvatarFile');
    const avatarImg = document.getElementById('insSocialAvatarImg');
    if (avatarWrap && avatarFile && avatarImg) {
        avatarWrap.addEventListener('click', () => avatarFile.click());
        avatarFile.addEventListener('change', (e) => {
            const f = e.target.files[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = (ev) => { avatarImg.src = ev.target.result; };
            reader.readAsDataURL(f);
        });
    }
    // 三个图片上传
    for (let i = 1; i <= 3; i++) {
        const wrap = document.getElementById('insSocialImg' + i + 'Wrap');
        const file = document.getElementById('insSocialImg' + i + 'File');
        const img = document.getElementById('insSocialImg' + i);
        if (wrap && file && img) {
            wrap.addEventListener('click', () => file.click());
            file.addEventListener('change', (e) => {
                const f = e.target.files[0];
                if (!f) return;
                const reader = new FileReader();
                reader.onload = (ev) => { img.src = ev.target.result; };
                reader.readAsDataURL(f);
            });
        }
    }
}

function initCatCardUploads() {
    // 猫咪卡片圆形头像上传
    const avatarWrap = document.getElementById('catCardAvatarWrap');
    const avatarFile = document.getElementById('catCardAvatarFile');
    const avatarImg = document.getElementById('catCardAvatarImg');
    if (avatarWrap && avatarFile && avatarImg) {
        avatarWrap.addEventListener('click', () => avatarFile.click());
        avatarFile.addEventListener('change', (e) => {
            const f = e.target.files[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = (ev) => { avatarImg.src = ev.target.result; };
            reader.readAsDataURL(f);
        });
    }
    // 猫咪卡片正方形内容图片上传
    const contentWrap = document.getElementById('catCardContentWrap');
    const contentFile = document.getElementById('catCardContentFile');
    const contentImg = document.getElementById('catCardContentImg');
    if (contentWrap && contentFile && contentImg) {
        contentWrap.addEventListener('click', () => contentFile.click());
        contentFile.addEventListener('change', (e) => {
            const f = e.target.files[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = (ev) => { contentImg.src = ev.target.result; };
            reader.readAsDataURL(f);
        });
    }
}

function initCapsuleAvatars() {
    for (let i = 1; i <= 2; i++) {
        const wrap = document.getElementById('capsuleAvatar' + i + 'Wrap');
        const fileInput = document.getElementById('capsuleAvatarFile' + i);
        const img = document.getElementById('capsuleAvatarImg' + i);
        if (!wrap || !fileInput || !img) continue;
        wrap.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            const f = e.target.files[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = (ev) => { img.src = ev.target.result; };
            reader.readAsDataURL(f);
        });
    }
}

function initAnimalAvatars() {
    for (let i = 1; i <= 5; i++) {
        const wrap = document.getElementById('animalAvatarWrap' + i);
        const fileInput = document.getElementById('animalAvatarFile' + i);
        const img = document.getElementById('animalAvatarImg' + i);
        if (!wrap || !fileInput || !img) continue;
        wrap.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            const f = e.target.files[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = (ev) => { img.src = ev.target.result; };
            reader.readAsDataURL(f);
        });
    }
}

function initVinylAvatar() {
    const centerImg = document.getElementById('vinylCenterImg');
    const fileInput = document.getElementById('vinylAvatarFile');
    const disc = document.getElementById('vinylDisc');
    if (!centerImg || !fileInput || !disc) return;
    
    centerImg.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            centerImg.src = ev.target.result;
        };
        reader.readAsDataURL(f);
    });
}

function initInsPanelAvatar() {
    const avatar = document.getElementById('insPanelAvatar');
    const fileInput = document.getElementById('insPanelAvatarFile');
    if (!avatar || !fileInput) return;
    
    avatar.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = avatar.querySelector('img');
            if (img) img.src = ev.target.result;
        };
        reader.readAsDataURL(f);
    });
}