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

// === 微信互动系统核心逻辑 ===
const WcData = {
    contacts: [
        { id: 1, name: '初雪', nick: '小雪', avatar: 'https://picsum.photos/100/100?3' }
    ],
    moments: [
        { id: 1, authorId: 1, text: '今天的雪好白~', img: 'https://picsum.photos/300/300?9', imgDesc: '图片描述: 白茫茫的一片雪景', time: '刚刚', likes: 1, comments: [] }
    ],
    chats: [
        { id: 1, targetName: '初雪', lastMsg: '在干嘛呢？', time: '12:00', avatar: 'https://picsum.photos/100/100?3' }
    ]
};
let WcUserData = {
    name: 'User', gender: '', birth: '', zodiac: '', pers: '', bg: '',
    avatar: 'https://picsum.photos/100/100?2'
};

const wcApp = document.getElementById('wcAppMain');
const wcEntry = document.getElementById('censyWechatEntry');
const wcBackBtn = document.getElementById('wcBackBtn');
const title = document.getElementById('wcTitle');
const btnPen = document.getElementById('wcBtnPen');
const btnHeart = document.getElementById('wcBtnHeart');
const btnPlus = document.getElementById('wcBtnPlus');
const menuChat = document.getElementById('wcMenuChat');
const menuHeart = document.getElementById('wcMenuHeart');

let currentChatId = null;

function wcSwitchTab(tabName) {
    document.querySelectorAll('.wc-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.wc-tab-item').forEach(v => v.classList.remove('active'));
    document.querySelector(`.wc-tab-item[data-target="${tabName}"]`).classList.add('active');
    document.getElementById(`wcView${tabName}`).classList.add('active');
    btnPen.style.display = 'none'; btnHeart.style.display = 'none'; btnPlus.style.display = 'none';
    menuChat.classList.remove('show'); menuHeart.classList.remove('show');

    if(tabName === 'Chat') {
        title.innerText = '微信(2)'; btnPen.style.display = 'block'; wcRenderChats();
    } else if(tabName === 'Contact') {
        title.innerText = '通讯录'; wcRenderContacts();
    } else if(tabName === 'Moment') {
        title.innerText = '朋友圈'; btnHeart.style.display = 'block'; btnPlus.style.display = 'block'; wcRenderMoments();
    } else {
        title.innerText = '我';
    }
}

document.querySelectorAll('.wc-tab-item').forEach(item => {
    item.addEventListener('click', function() { wcSwitchTab(this.dataset.target); });
});

if(wcEntry) wcEntry.addEventListener('click', () => { wcApp.classList.add('wc-show'); wcSwitchTab('Chat'); });
if(wcBackBtn) wcBackBtn.addEventListener('click', () => { wcApp.classList.remove('wc-show'); });
document.addEventListener('click', (e) => {
    if(!e.target.closest('#wcBtnPen') && !e.target.closest('#wcMenuChat')) menuChat.classList.remove('show');
    if(!e.target.closest('#wcBtnHeart') && !e.target.closest('#wcMenuHeart')) menuHeart.classList.remove('show');
});
btnPen.onclick = () => menuChat.classList.toggle('show');
btnHeart.onclick = () => menuHeart.classList.toggle('show');

window.wcCloseModal = (id) => document.getElementById(id).classList.remove('show');
function wcOpenModal(id) { document.getElementById(id).classList.add('show'); }

// 添加好友
let tempAvt = '';
document.getElementById('wcMenuAddFriend').onclick = () => { menuChat.classList.remove('show'); tempAvt = ''; document.getElementById('wcAddAvtBtn').innerHTML = '传头像'; wcOpenModal('wcModalAddFriend'); };
document.getElementById('wcAddAvtBtn').onclick = () => document.getElementById('wcAddAvtFile').click();
document.getElementById('wcAddAvtFile').onchange = e => {
    let f = e.target.files[0]; if(!f) return;
    let r = new FileReader(); r.onload = ev => { tempAvt = ev.target.result; document.getElementById('wcAddAvtBtn').innerHTML = `<img src="${tempAvt}">`; }; r.readAsDataURL(f);
};
document.getElementById('wcSaveFriend').onclick = () => {
    let name = document.getElementById('wcAddName').value || '未命名';
    let nick = document.getElementById('wcAddNick').value || name;
    let newChar = { id: Date.now(), name, nick, avatar: tempAvt || 'https://picsum.photos/100/100' };
    WcData.contacts.push(newChar);
    wcCloseModal('wcModalAddFriend'); wcRenderContacts();
    alert('添加成功');
};

// "我"页面编辑
let tempMeAvt = '';
document.getElementById('wcMeAvtBtn').onclick = () => document.getElementById('wcMeAvtFile').click();
document.getElementById('wcMeAvtFile').onchange = e => {
    let f = e.target.files[0]; if(!f) return;
    let r = new FileReader(); r.onload = ev => { tempMeAvt = ev.target.result; document.getElementById('wcMeAvtBtn').innerHTML = `<img src="${tempMeAvt}">`; }; r.readAsDataURL(f);
};
document.getElementById('wcSaveMe').onclick = () => {
    WcUserData.name = document.getElementById('wcMeNameIn').value || 'User';
    WcUserData.gender = document.getElementById('wcMeGenderIn').value;
    WcUserData.birth = document.getElementById('wcMeBirthIn').value;
    WcUserData.zodiac = document.getElementById('wcMeZodiacIn').value;
    WcUserData.pers = document.getElementById('wcMePersIn').value;
    WcUserData.bg = document.getElementById('wcMeBgIn').value;
    if(tempMeAvt) WcUserData.avatar = tempMeAvt;

    document.getElementById('wcMeNameDisplay').innerText = WcUserData.name;
    document.getElementById('wcMeAvtDisplay').style.backgroundImage = `url(${WcUserData.avatar})`;
    let meNameEl = document.querySelector('.wc-moment-myname');
    let meAvtEl = document.querySelector('.wc-moment-myavatar div');
    if(meNameEl) meNameEl.innerText = WcUserData.name;
    if(meAvtEl) meAvtEl.style.backgroundImage = `url(${WcUserData.avatar})`;

    wcCloseModal('wcModalEditMe'); wcRenderMoments();
};

// 朋友圈封面
const momentCoverBox = document.getElementById('wcMomentCoverBox');
const momentCoverFile = document.getElementById('wcMomentCoverFile');
if(momentCoverBox && momentCoverFile) {
    momentCoverBox.addEventListener('click', (e) => { if(e.target === momentCoverBox) momentCoverFile.click(); });
    momentCoverFile.addEventListener('change', e => {
        let f = e.target.files[0]; if(!f) return;
        let r = new FileReader(); r.onload = ev => { momentCoverBox.style.backgroundImage = `url(${ev.target.result})`; }; r.readAsDataURL(f);
    });
}

// 发起群聊
document.getElementById('wcMenuCreateGroup').onclick = () => {
    menuChat.classList.remove('show');
    let listWrap = document.getElementById('wcGroupSelectList'); listWrap.innerHTML = '';
    WcData.contacts.forEach(c => {
        listWrap.innerHTML += `<div class="wc-select-item" data-id="${c.id}" onclick="this.classList.toggle('selected')">
          <div class="wc-select-avatar" style="background-image:url(${c.avatar})"></div>
          <div class="wc-select-name">${c.nick}</div><div class="wc-checkbox"></div></div>`;
    });
    wcOpenModal('wcModalCreateGroup');
};
document.getElementById('wcSaveGroup').onclick = () => {
    let gname = document.getElementById('wcGroupName').value || '未命名群聊';
    WcData.chats.unshift({ id: Date.now(), targetName: gname, lastMsg: '群聊已创建', time: '刚刚', avatar: 'https://picsum.photos/100/100?4' });
    wcCloseModal('wcModalCreateGroup'); wcRenderChats();
};

// 发朋友圈
let postTargetId = null; let tempPostImg = '';
document.getElementById('wcBtnPlus').onclick = () => { postTargetId = null; document.getElementById('wcPostTitle').innerText = '发朋友圈'; openPostModal(); };
document.getElementById('wcMenuRandomPost').onclick = () => {
    menuHeart.classList.remove('show');
    if(WcData.contacts.length===0) return;
    let rChar = WcData.contacts[Math.floor(Math.random()*WcData.contacts.length)];
    let texts = ['今天天气真好！', '又是努力的一天~', '去吃好吃的啦！', '放空中...'];
    WcData.moments.unshift({ id: Date.now(), authorId: rChar.id, text: texts[Math.floor(Math.random()*texts.length)], img: `https://picsum.photos/300/300?${Math.random()}`, imgDesc: '图片描述: 随机生成的生活记录', time: '刚刚', likes:0, comments:[] });
    wcRenderMoments();
};
document.getElementById('wcMenuProxyPost').onclick = () => {
    menuHeart.classList.remove('show');
    let listWrap = document.getElementById('wcProxySelectList'); listWrap.innerHTML = '';
    WcData.contacts.forEach(c => {
        listWrap.innerHTML += `<div class="wc-select-item" onclick="wcSelectProxy(${c.id})">
          <div class="wc-select-avatar" style="background-image:url(${c.avatar})"></div>
          <div class="wc-select-name">${c.nick}</div></div>`;
    });
    wcOpenModal('wcModalProxySelect');
};
window.wcSelectProxy = (id) => { postTargetId = id; wcCloseModal('wcModalProxySelect'); document.getElementById('wcPostTitle').innerText = '代替Char发圈'; openPostModal(); };
function openPostModal() {
    tempPostImg = ''; document.getElementById('wcPostText').value = '';
    document.getElementById('wcPostPreview').style.display = 'none';
    document.querySelector('#wcPostImgBtn span').style.display = 'inline';
    wcOpenModal('wcModalPostMoment');
}
document.getElementById('wcPostImgBtn').onclick = () => document.getElementById('wcPostImgFile').click();
document.getElementById('wcPostImgFile').onchange = e => {
    let f = e.target.files[0]; if(!f) return;
    let r = new FileReader(); r.onload = ev => { tempPostImg = ev.target.result; document.getElementById('wcPostPreview').src = tempPostImg; document.getElementById('wcPostPreview').style.display = 'block'; document.querySelector('#wcPostImgBtn span').style.display = 'none'; }; r.readAsDataURL(f);
};
document.getElementById('wcSavePost').onclick = () => {
    let txt = document.getElementById('wcPostText').value;
    if(!txt && !tempPostImg) return;
    WcData.moments.unshift({ id: Date.now(), authorId: postTargetId, text: txt, img: tempPostImg, imgDesc: tempPostImg ? '图片描述: 一张刚发布的照片' : '', time: '刚刚', likes:0, comments:[] });
    wcCloseModal('wcModalPostMoment'); wcRenderMoments();
};

// 点赞、评论与高级魔法棒逻辑
window.wcToggleLike = (mId) => {
    let m = WcData.moments.find(x => x.id === mId);
    if(m) { m.likes = m.likes ? 0 : 1; wcRenderMoments(); }
};

window.wcAddComment = (mId) => {
    let txt = prompt('输入评论内容:');
    if(!txt) return;
    let m = WcData.moments.find(x => x.id === mId);
    if(m) {
        m.comments.push({ id: Date.now(), author: WcUserData.name, text: txt, isMe: true });
        wcRenderMoments();
    }
};

window.wcUserReplyComment = (mId, cId) => {
    let m = WcData.moments.find(x => x.id === mId);
    if(!m) return;
    let targetC = m.comments.find(x => x.id === cId);
    if(!targetC) return;
    let txt = prompt(`回复 ${targetC.author}:`);
    if(!txt) return;
    m.comments.push({ id: Date.now(), author: WcUserData.name, text: `回复<span style="color:#576b95"> ${targetC.author}</span>: ${txt}`, isMe: true });
    wcRenderMoments();
};

window.wcWandAction = (mId) => {
    let m = WcData.moments.find(x => x.id === mId);
    if(!m || WcData.contacts.length === 0) return;
    
    let isUserPost = (m.authorId === null);
    let charList = WcData.contacts;
    let rChar = charList[Math.floor(Math.random() * charList.length)];
    
    if (isUserPost) {
        let replies = ['太棒了！', '好看~', '羡慕了', '贴贴！', '收到！', '哇哦！', '这在哪呀？'];
        m.comments.push({ id: Date.now(), author: rChar.nick, text: replies[Math.floor(Math.random()*replies.length)], isMe: false });
    } else {
        let userComments = m.comments.filter(c => c.isMe);
        let authorObj = charList.find(x => x.id === m.authorId) || rChar;
        
        if (userComments.length > 0 && Math.random() > 0.4) {
          let targetC = userComments[Math.floor(Math.random() * userComments.length)];
          let repTexts = ['哈哈是的', '确实~', '你说的对', '那必须的！', '比心~', '没问题！'];
          m.comments.push({ id: Date.now(), author: authorObj.nick, text: `回复<span style="color:#576b95"> ${targetC.author}</span>: ${repTexts[Math.floor(Math.random()*repTexts.length)]}`, isMe: false });
        } else {
          let selfTexts = ['[补充] 忘说了，今天心情很好', '统一回复：谢谢大家的点赞~', '[补充] 拍得不错吧', '嘿嘿', '好耶~'];
          m.comments.push({ id: Date.now(), author: authorObj.nick, text: selfTexts[Math.floor(Math.random()*selfTexts.length)], isMe: false });
        }
    }
    wcRenderMoments();
};

// 聊天室功能
window.wcOpenChat = (charId) => {
    let c = WcData.contacts.find(x => x.id === charId);
    if(!c) return;
    currentChatId = charId;
    document.getElementById('wcChatRoomTitle').innerText = c.nick;
    document.getElementById('wcSetAvt').style.backgroundImage = `url(${c.avatar})`;
    document.getElementById('wcSetName').innerText = c.nick;
    wcOpenModal('wcModalChatRoom');
};
window.wcOpenChatSettings = () => { wcOpenModal('wcModalChatSettings'); };

// 个人朋友圈管理
window.wcRenderMyMomentsList = () => {
    let html = '';
    let myMs = WcData.moments.filter(x => x.authorId === null);
    if(myMs.length === 0) { html = '<div style="padding:20px;text-align:center;color:#999;">暂无数据</div>'; }
    else {
        myMs.forEach(m => {
          html += `<div class="wc-mym-item"><div class="wc-mym-text">${m.text || '[图片]'}</div><div class="wc-mym-del" onclick="wcDelMoment(${m.id})">删除</div></div>`;
        });
    }
    document.getElementById('wcMyMomentsList').innerHTML = html;
};
window.wcDelMoment = (id) => {
    WcData.moments = WcData.moments.filter(x => x.id !== id);
    wcRenderMyMomentsList(); wcRenderMoments();
};
window.wcClearMyMoments = () => {
    if(confirm('确定清空所有自己发的朋友圈吗？')) {
        WcData.moments = WcData.moments.filter(x => x.authorId !== null);
        wcRenderMyMomentsList(); wcRenderMoments();
    }
};
document.querySelector('.wc-list-cell[onclick="wcOpenModal(\'wcModalMyMoments\')"]').addEventListener('click', wcRenderMyMomentsList);


// 渲染器
function wcRenderChats() {
    let html = '';
    WcData.chats.forEach(c => {
        html += `<div class="wc-list-cell"><div class="wc-cell-avt" style="background-image:url(${c.avatar})"></div><div class="wc-cell-info"><div class="wc-cell-title">${c.targetName}</div><div class="wc-cell-sub">${c.lastMsg}</div></div><div class="wc-cell-time">${c.time}</div></div>`;
    });
    document.getElementById('wcChatList').innerHTML = html;
}
function wcRenderContacts() {
    let html = '';
    WcData.contacts.forEach(c => {
        html += `<div class="wc-list-cell" onclick="wcOpenChat(${c.id})"><div class="wc-cell-avt" style="background-image:url(${c.avatar})"></div><div class="wc-cell-info"><div class="wc-cell-title">${c.nick}</div></div></div>`;
    });
    document.getElementById('wcContactList').innerHTML = html;
}
function wcRenderMoments() {
    let html = '';
    WcData.moments.forEach(m => {
        let author = m.authorId ? WcData.contacts.find(x => x.id === m.authorId) : { nick: WcUserData.name, avatar: WcUserData.avatar };
        if(!author) author = { nick: '未知', avatar: '' };
        
        let imgHtml = m.img ? `<div class="wc-m-img-wrap" style="display:block;"><img src="${m.img}" class="wc-m-img">` + (m.imgDesc ? `<div class="wc-m-img-desc">${m.imgDesc}</div>` : '') + `</div>` : '';
        
        let actionsHtml = `<div class="wc-m-bottom"><div class="wc-m-time">${m.time}</div><div class="wc-m-actions">`;
        actionsHtml += `<svg onclick="wcToggleLike(${m.id})" viewBox="0 0 24 24" stroke="${m.likes?'#fa5151':'currentColor'}" fill="${m.likes?'#fa5151':'none'}"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
        actionsHtml += `<svg onclick="wcAddComment(${m.id})" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;
        // 魔法棒统一放置在评论图标的旁边，不论是谁的朋友圈
        actionsHtml += `<span class="wc-wand-btn" onclick="wcWandAction(${m.id})">??</span></div></div>`;
        
        let commentsHtml = '';
        if(m.comments && m.comments.length > 0) {
          commentsHtml = `<div class="wc-m-comments">`;
          m.comments.forEach(c => {
          commentsHtml += `<div class="wc-c-item" onclick="wcUserReplyComment(${m.id}, ${c.id})"><div class="wc-c-text"><span class="wc-c-name">${c.author}</span>: ${c.text}</div></div>`;
          });
          commentsHtml += `</div>`;
        }
        
        html += `<div class="wc-m-item"><div class="wc-m-avatar" style="background-image:url(${author.avatar})"></div><div class="wc-m-content"><div class="wc-m-name">${author.nick}</div><div class="wc-m-text">${m.text}</div>${imgHtml}${actionsHtml}${commentsHtml}</div></div>`;
    });
    document.getElementById('wcMomentsList').innerHTML = html;
}
