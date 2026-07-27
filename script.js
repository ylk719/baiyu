// Tailwind theme extension
tailwind.config = {
  theme: {
    extend: {
      colors: {
        theme: {
          text: '#64748b',   // slate-500
          icon: '#475569',   // slate-600
          accent: '#94a3b8', // slate-400
        }
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  }
}

// === Fixed canvas + proportional scaling ===
const DESIGN_WIDTH = 375
const DESIGN_HEIGHT = 812
const MAX_WIDTH = 480

function scaleCanvas() {
  const root = document.getElementById('app-root')
  const canvas = document.getElementById('mobile-canvas')
  if (!root || !canvas) return

  const vw = window.innerWidth
  const vh = window.innerHeight

  const availableW = Math.min(vw, MAX_WIDTH)
  const availableH = vh

  const scale = Math.min(availableW / DESIGN_WIDTH, availableH / DESIGN_HEIGHT)

  canvas.style.transform = `scale(${scale})`

  const scaledW = DESIGN_WIDTH * scale
  const scaledH = DESIGN_HEIGHT * scale
  root.style.width = scaledW + 'px'
  root.style.height = scaledH + 'px'
  root.style.position = 'absolute'
  root.style.left = '50%'
  root.style.top = '50%'
  root.style.transform = 'translate(-50%, -50%)'
}

// === Pages horizontal swipe + Dock sync ===
function initPages() {
  const pages = document.getElementById('pages')
  if (!pages) return

  const dockItems = document.querySelectorAll('.dock-item[data-page]')
  const pageCount = pages.querySelectorAll('.page').length

  // 创建页面指示器(小圆点)
  let indicator = document.querySelector('.page-indicator')
  if (!indicator && pageCount > 1) {
    indicator = document.createElement('div')
    indicator.className = 'page-indicator'
    for (let i = 0; i < pageCount; i++) {
      const dot = document.createElement('div')
      dot.className = 'dot' + (i === 0 ? ' active' : '')
      dot.dataset.page = i
      indicator.appendChild(dot)
    }
    document.getElementById('mobile-canvas').appendChild(indicator)
  }

  const dots = indicator ? indicator.querySelectorAll('.dot') : []

  function updateActive(idx) {
    dockItems.forEach(item => {
      const pageIdx = parseInt(item.dataset.page, 10)
      item.classList.toggle('active', pageIdx === idx)
    })
    dots.forEach((d, i) => d.classList.toggle('active', i === idx))
  }

  // 滚动时计算当前页
  let scrollTimer = null
  pages.addEventListener('scroll', () => {
    if (scrollTimer) cancelAnimationFrame(scrollTimer)
    scrollTimer = requestAnimationFrame(() => {
      const idx = Math.round(pages.scrollLeft / pages.clientWidth)
      updateActive(idx)
    })
  }, { passive: true })

  // 点击 Dock 项切换页面
  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.page, 10)
      if (!isNaN(idx)) {
        const target = pages.querySelectorAll('.page')[idx]
        if (target) {
          pages.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
          updateActive(idx)
        }
      }
    })
  })

  // 点击指示器切换
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.page, 10)
      const target = pages.querySelectorAll('.page')[idx]
      if (target) {
        pages.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
        updateActive(idx)
      }
    })
  })
}

// 仅竖屏提示
function checkOrientation() {
  const isLandscape = window.innerWidth > window.innerHeight
  document.body.classList.toggle('force-portrait-hint', isLandscape)
}

window.addEventListener('resize', () => {
  scaleCanvas()
  checkOrientation()
})
window.addEventListener('orientationchange', () => {
  scaleCanvas()
  checkOrientation()
})

document.addEventListener('DOMContentLoaded', () => {
  scaleCanvas()
  checkOrientation()
  initPages()
  initSettings()
})

// === Settings Overlay (更改背景) ===
const DEFAULT_WALLPAPER = 'https://lh3.googleusercontent.com/aida-public/AB6AXuATzNgnIhxMBqQTkDuj_PJam75h1syX5osCGi1gX6vQiwoZfrX0zvtO4wDEyQ-lYI5ToXGKDd_vD0XCYxNs6IBmot7nSbP1znfchkY716Iq38HCy-GA7Psh_7eVT47nKI8sssE2fpjVBtrym7D4zxBRSCEipKosUj_wvu3TM_yk6MYVYe65dpYSsF1U6vbP8JFdKstNdgxo8KGLLULD01-i0O3Vr1WpydPByK4iVO-Bf2XMWXpKDMuffQBCp5IhnbM73Ihf_3DP1aM'

function initSettings() {
  const homeOverlay = document.getElementById('settings-home')        // 一级：设置主页
  const wallOverlay = document.getElementById('settings-overlay')     // 二级：更改背景
  const dockSet     = document.getElementById('dock-settings')      // Dock 入口
  const homeBack    = document.getElementById('settings-home-back-btn')
  const wallBack    = document.getElementById('settings-back-btn')
  const rowWall     = document.getElementById('row-wallpaper')        // 主页里"更改背景"行
  const wallEl      = document.getElementById('settings-wallpaper')
  const presets     = document.querySelectorAll('.preset-item')
  const uploadInp   = document.getElementById('wallpaper-upload')
  const resetBtn    = document.getElementById('settings-reset-btn')
  const saveBtn     = document.getElementById('settings-save-btn')

  if (!dockSet) return

  // 当前预览状态（未保存）
  let previewWallpaper = localStorage.getItem('cosmiclove:wallpaper') || DEFAULT_WALLPAPER
  if (wallEl) applyWallpaperToDOM(wallEl, previewWallpaper, presets)

  // ---- 一级：设置主页 ----
  function openHome() {
    if (!homeOverlay) return
    homeOverlay.classList.add('open')
    homeOverlay.setAttribute('aria-hidden', 'false')
  }
  function closeHome() {
    if (!homeOverlay) return
    homeOverlay.classList.remove('open')
    homeOverlay.setAttribute('aria-hidden', 'true')
  }
  dockSet.addEventListener('click', openHome)
  homeBack && homeBack.addEventListener('click', closeHome)

  // ---- 二级：更改背景 ----
  function openWallpaper() {
    if (!wallOverlay) return
    wallOverlay.classList.add('open')
    wallOverlay.setAttribute('aria-hidden', 'false')
    // 进入更改背景时，预览回到当前已生效壁纸
    previewWallpaper = localStorage.getItem('cosmiclove:wallpaper') || DEFAULT_WALLPAPER
    if (wallEl) applyWallpaperToDOM(wallEl, previewWallpaper, presets)
  }
  function closeWallpaper() {
    if (!wallOverlay) return
    wallOverlay.classList.remove('open')
    wallOverlay.setAttribute('aria-hidden', 'true')
  }
  rowWall && rowWall.addEventListener('click', openWallpaper)
  wallBack && wallBack.addEventListener('click', closeWallpaper)

  // 选择预设
  presets.forEach(item => {
    item.addEventListener('click', () => {
      const bg = extractUrl(item.style.backgroundImage)
      if (!bg) return
      previewWallpaper = bg
      if (wallEl) applyWallpaperToDOM(wallEl, previewWallpaper, presets, item.dataset.preset)
    })
  })

  // 自定义上传
  uploadInp && uploadInp.addEventListener('change', e => {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = ev => {
      previewWallpaper = ev.target.result
      if (wallEl) applyWallpaperToDOM(wallEl, previewWallpaper, presets, '__upload__')
    }
    reader.readAsDataURL(f)
  })

  // 恢复默认
  resetBtn && resetBtn.addEventListener('click', () => {
    previewWallpaper = DEFAULT_WALLPAPER
    if (wallEl) applyWallpaperToDOM(wallEl, previewWallpaper, presets, 'default')
  })

  // 保存
  saveBtn && saveBtn.addEventListener('click', () => {
    localStorage.setItem('cosmiclove:wallpaper', previewWallpaper)
    applyWallpaperToMainCanvas(previewWallpaper)
    const orig = saveBtn.textContent
    saveBtn.textContent = '已保存'
    setTimeout(() => { saveBtn.textContent = orig }, 1200)
    setTimeout(closeWallpaper, 600)
  })

  // 列表行触控反馈（统一处理，替代原 inline 脚本）
  document.querySelectorAll('.interactive-row').forEach(row => {
    row.addEventListener('touchstart', () => row.classList.add('touched'), { passive: true })
    row.addEventListener('touchend',   () => setTimeout(() => row.classList.remove('touched'), 150), { passive: true })
  })

  // 初次进入也把保存的壁纸应用到主画布
  const saved = localStorage.getItem('cosmiclove:wallpaper')
  if (saved) applyWallpaperToMainCanvas(saved)

  initIconConfig()
  initApiConfig()
}

// === Icon Config Overlay (更改图标) ===
function initIconConfig() {
  const iconOverlay = document.getElementById('icon-config-overlay')
  const rowIcon     = document.getElementById('row-icon-config')
  const backBtn    = document.getElementById('icon-back-btn')
  const saveBtn    = document.getElementById('icon-save-btn')
  const grid       = document.getElementById('icon-grid')
  const sheet      = document.getElementById('icon-action-sheet')
  const sheetBack  = document.getElementById('icon-sheet-backdrop')
  const sheetClose = document.getElementById('icon-sheet-close')
  const selName    = document.getElementById('selected-icon-name')
  const uploadInp  = document.getElementById('icon-upload-input')
  if (!iconOverlay || !rowIcon) return

  let currentIconKey = null   // 当前正在编辑的图标 key
  let pendingChanges = {}     // { Music: 'data:...', Chat: null, ... } 未保存

  // 打开 / 关闭页
  function open() {
    iconOverlay.classList.add('open')
    iconOverlay.setAttribute('aria-hidden', 'false')
    pendingChanges = {} // 进入时清空待保存
    renderIconState()
  }
  function close() {
    iconOverlay.classList.remove('open')
    iconOverlay.setAttribute('aria-hidden', 'true')
    closeSheet()
  }
  rowIcon.addEventListener('click', open)
  backBtn && backBtn.addEventListener('click', close)

  // 渲染每个图标当前状态（已保存 + 待保存）
  function renderIconState() {
    document.querySelectorAll('.app-icon').forEach(el => {
      const key = el.dataset.icon
      // 优先用 pendingChanges，其次 localStorage
      let url = pendingChanges[key]
      if (url === undefined) {
        const stored = localStorage.getItem(`cosmiclove:icon:${key}`)
        url = stored || null
      }
      if (url === null) {
        // 重置：清除自定义背景，恢复 SVG
        el.classList.remove('custom')
        el.style.backgroundImage = ''
      } else if (url) {
        el.classList.add('custom')
        el.style.backgroundImage = `url('${url}')`
      }
    })
  }

  // 点击图标 → 打开 action sheet
  grid && grid.addEventListener('click', e => {
    const el = e.target.closest('.app-icon')
    if (!el) return
    currentIconKey = el.dataset.icon
    selName.textContent = 'Edit ' + currentIconKey
    openSheet()
  })

  function openSheet() {
    sheet.classList.add('active')
    sheet.setAttribute('aria-hidden', 'false')
  }
  function closeSheet() {
    sheet.classList.remove('active')
    sheet.setAttribute('aria-hidden', 'true')
  }
  sheetBack && sheetBack.addEventListener('click', closeSheet)
  sheetClose && sheetClose.addEventListener('click', closeSheet)

  // Sheet 选项
  document.querySelectorAll('.sheet-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action
      if (action === 'upload') {
        uploadInp && uploadInp.click()
      } else if (action === 'browse') {
        // 简化：直接套用一个内建简约包 URL
        if (currentIconKey) {
          pendingChanges[currentIconKey] = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&q=80'
          renderIconState()
        }
        closeSheet()
      } else if (action === 'reset') {
        if (currentIconKey) {
          pendingChanges[currentIconKey] = null // 标记为重置
          renderIconState()
        }
        closeSheet()
      }
    })
  })

  // 自定义上传
  uploadInp && uploadInp.addEventListener('change', e => {
    const f = e.target.files && e.target.files[0]
    if (!f || !currentIconKey) return
    const reader = new FileReader()
    reader.onload = ev => {
      pendingChanges[currentIconKey] = ev.target.result
      renderIconState()
      closeSheet()
    }
    reader.readAsDataURL(f)
    e.target.value = '' // 清空,允许下次选同一文件
  })

  // 保存更改 → 批量写入 localStorage
  saveBtn && saveBtn.addEventListener('click', () => {
    Object.keys(pendingChanges).forEach(key => {
      const v = pendingChanges[key]
      if (v === null) {
        localStorage.removeItem(`cosmiclove:icon:${key}`)
      } else {
        localStorage.setItem(`cosmiclove:icon:${key}`, v)
      }
    })
    pendingChanges = {}
    const span = saveBtn.querySelector('span')
    const orig = span.textContent
    span.textContent = '已保存'
    setTimeout(() => { span.textContent = orig }, 1200)
    setTimeout(close, 700)
  })
}

// === API Config Overlay (API 配置) ===
function initApiConfig() {
  const apiOverlay = document.getElementById('api-config-overlay')
  const rowApi     = document.getElementById('row-api-config')
  const backBtn   = document.getElementById('api-back-btn')
  const apiKeyInp = document.getElementById('apiKey')
  const secKeyInp = document.getElementById('secretKey')
  const secToggle = document.getElementById('secret-toggle')
  const testBtn   = document.getElementById('api-test-btn')
  const saveBtn   = document.getElementById('api-save-btn')
  const statusEl  = document.getElementById('api-status-text')
  const statusDot = document.querySelector('.api-status-dot-wrap')
  const statusBox = document.querySelector('.api-status')
  if (!apiOverlay || !rowApi) return

  // 打开 / 关闭
  function open() {
    apiOverlay.classList.add('open')
    apiOverlay.setAttribute('aria-hidden', 'false')
    // 进入时回填保存的值
    apiKeyInp.value = localStorage.getItem('cosmiclove:apiKey') || ''
    secKeyInp.value = localStorage.getItem('cosmiclove:secretKey') || ''
    setStatus('idle', '已准备好拉取模型')
  }
  function close() {
    apiOverlay.classList.remove('open')
    apiOverlay.setAttribute('aria-hidden', 'true')
  }
  rowApi.addEventListener('click', open)
  backBtn && backBtn.addEventListener('click', close)

  // 显示 / 隐藏私钥
  secToggle && secToggle.addEventListener('click', () => {
    const showing = secToggle.classList.toggle('show')
    secKeyInp.type = showing ? 'text' : 'password'
  })

  // 状态切换
  function setStatus(state, text) {
    statusEl.textContent = text
    statusBox.classList.remove('idle', 'success', 'error')
    statusDot.classList.remove('idle', 'success', 'error')
    if (state) {
      statusBox.classList.add(state)
      statusDot.classList.add(state)
    }
  }

  // 测试连接（模拟）
  testBtn && testBtn.addEventListener('click', () => {
    const key = apiKeyInp.value.trim()
    const sec = secKeyInp.value.trim()
    if (!key || !sec) {
      setStatus('error', '请先填写密钥与私钥')
      return
    }
    const orig = testBtn.querySelector('span').textContent
    testBtn.setAttribute('disabled', '')
    testBtn.querySelector('span').textContent = '连接中…'
    setStatus('idle', '正在拉取模型')
    setTimeout(() => {
      testBtn.removeAttribute('disabled')
      testBtn.querySelector('span').textContent = orig
      // 简单校验：长度 >= 8 视为通过
      if (key.length >= 8 && sec.length >= 8) {
        setStatus('success', '连接成功 · 模型已就绪')
      } else {
        setStatus('error', '密钥格式不正确')
      }
    }, 1200)
  })

  // 保存配置
  saveBtn && saveBtn.addEventListener('click', () => {
    const key = apiKeyInp.value.trim()
    const sec = secKeyInp.value.trim()
    if (!key || !sec) {
      setStatus('error', '密钥与私钥不能为空')
      return
    }
    localStorage.setItem('cosmiclove:apiKey', key)
    localStorage.setItem('cosmiclove:secretKey', sec)
    const orig = saveBtn.querySelector('span').textContent
    saveBtn.querySelector('span').textContent = '已保存'
    setStatus('success', '配置已保存')
    setTimeout(() => { saveBtn.querySelector('span').textContent = orig }, 1200)
    setTimeout(close, 800)
  })
}

function applyWallpaperToDOM(wallEl, url, presets, activeKey) {
  wallEl.style.backgroundImage = `url('${url}')`
  if (presets && activeKey !== undefined) {
    presets.forEach(p => {
      p.classList.toggle('active', p.dataset.preset === activeKey)
    })
    // 上传的图片无对应预设项 → 清掉所有 active
    if (activeKey === '__upload__') {
      presets.forEach(p => p.classList.remove('active'))
    }
  } else if (presets) {
    // 默认按 url 匹配
    presets.forEach(p => {
      const url = extractUrl(p.style.backgroundImage)
      p.classList.toggle('active', url === extractUrl(wallEl.style.backgroundImage))
    })
  }
}

function applyWallpaperToMainCanvas(url) {
  // 把保存的壁纸作为手机画布的背景图
  const canvas = document.getElementById('mobile-canvas')
  if (!canvas) return
  canvas.style.backgroundImage = `url('${url}')`
  canvas.style.backgroundSize = 'cover'
  canvas.style.backgroundPosition = 'center'
}

function extractUrl(bgImage) {
  if (!bgImage) return ''
  const m = bgImage.match(/url\(['"]?([^'")]+)['"]?\)/)
  return m ? m[1] : ''
}
