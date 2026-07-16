import { useState, useEffect, useRef } from 'react'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [images, setImages] = useState({
    cover: '',
    avatar: '',
    photo: '',
    psp: '',
    iscreen1: '',
    iscreen2: '',
    p3_1: '',
    p3_2: '',
    p3_3: '',
    bg: '',
  })
  const pagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = pagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const pageWidth = container.offsetWidth
      const pageIndex = Math.round(scrollLeft / pageWidth)
      setCurrentPage(pageIndex)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof images) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages((prev) => ({ ...prev, [key]: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages((prev) => ({ ...prev, bg: e.target?.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const scrollToPage = (pageIndex: number) => {
    const container = pagesContainerRef.current
    if (container) {
      container.scrollTo({
        left: pageIndex * container.offsetWidth,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="censy-phone-wrapper" id="censyPhoneMain" style={{ backgroundImage: images.bg ? `url(${images.bg})` : undefined }}>
      <input type="file" id="censyFileCover" accept="image/*" onChange={(e) => handleImageUpload(e, 'cover')} />
      <input type="file" id="censyFileAvatar" accept="image/*" onChange={(e) => handleImageUpload(e, 'avatar')} />
      <input type="file" id="censyPhotoFile" accept="image/*" onChange={(e) => handleImageUpload(e, 'photo')} />
      <input type="file" id="censyPspUpload" accept="image/*" onChange={(e) => handleImageUpload(e, 'psp')} />
      <input type="file" id="censyIscreenUpload" accept="image/*" onChange={(e) => handleImageUpload(e, 'iscreen1')} />
      <input type="file" id="censyIscreenUpload2" accept="image/*" onChange={(e) => handleImageUpload(e, 'iscreen2')} />
      <input type="file" id="censyP3Up1" accept="image/*" onChange={(e) => handleImageUpload(e, 'p3_1')} />
      <input type="file" id="censyP3Up2" accept="image/*" onChange={(e) => handleImageUpload(e, 'p3_2')} />
      <input type="file" id="censyP3Up3" accept="image/*" onChange={(e) => handleImageUpload(e, 'p3_3')} />
      <input type="file" id="censyGlobalBgUpload" accept="image/*" onChange={handleBgUpload} />

      <div className="censy-pages-container" ref={pagesContainerRef} id="censyPagesContainer">
        <div className="censy-page">
          <div className="censy-top-section">
            <div className="censy-mini-card">
              <div className="censy-card-cover" id="censyCoverUpload" onClick={() => document.getElementById('censyFileCover')?.click()} style={{ backgroundImage: images.cover ? `url(${images.cover})` : undefined }} />
              <div className="censy-card-avatar" id="censyAvatarUpload" onClick={() => document.getElementById('censyFileAvatar')?.click()}>
                {images.avatar ? <img src={images.avatar} alt="" /> : '换图'}
              </div>
              <div className="censy-card-texts">
                <div contentEditable={true}>❄️❄️ - 初雪 -</div>
                <div contentEditable={true}>˚♡. Meet you in white December ʚ˚ + ˛</div>
                <div contentEditable={true}>- 在白色12月 遇见你 -</div>
              </div>
            </div>
          </div>
          <div className="censy-mid-section">
            <div className="censy-polaroid-card">
              <div className="censy-photo-area" id="censyPhotoBox" onClick={() => document.getElementById('censyPhotoFile')?.click()}>
                <div className="censy-placeholder">
                  <svg width="200" height="180" viewBox="0 0 200 180">
                    <path d="M 30 140 L 70 50 L 130 50 L 160 70 L 160 140 L 30 140 Z" fill="#d8d8d8" stroke="#999" strokeWidth="3" />
                    <path d="M 30 140 L 60 110 L 90 140 Z" fill="#d8d8d8" stroke="#999" strokeWidth="2" />
                    <text x="60" y="130" fontSize="18" fill="#999" textAnchor="middle">!</text>
                    <rect x="165" y="70" width="30" height="70" fill="none" stroke="#999" strokeWidth="2" strokeDasharray="4 3" />
                    <path d="M 70 50 L 70 20 L 90 20 L 100 30 L 110 20 L 130 20 L 130 50 Z" fill="#fff" stroke="#999" strokeWidth="2" />
                    <line x1="80" y1="30" x2="90" y2="35" stroke="#999" strokeWidth="2" />
                    <line x1="110" y1="30" x2="100" y2="35" stroke="#999" strokeWidth="2" />
                    <circle cx="100" cy="40" r="3" fill="#999" />
                    <circle cx="150" cy="30" r="20" fill="none" stroke="#999" strokeWidth="2" />
                    <text x="150" y="38" fontSize="16" fill="#999" textAnchor="middle">嗝</text>
                    <path d="M 130 30 L 140 35 L 130 40" stroke="#999" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <img id="censyPhotoImg" src={images.photo} alt="照片" style={{ display: images.photo ? 'block' : 'none' }} />
              </div>
              <div className="censy-polaroid-text-area">
                <div className="censy-polaroid-desc" contentEditable={true}>图片已被小猫吃掉</div>
                <div className="censy-polaroid-label" contentEditable={true}>Polaroid</div>
              </div>
            </div>
            <div className="censy-apps-grid">
              <div className="censy-app-item">
                <div className="censy-app-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <div className="censy-app-name">微信</div>
              </div>
              <div className="censy-app-item">
                <div className="censy-app-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="censy-app-name">名册</div>
              </div>
              <div className="censy-app-item">
                <div className="censy-app-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <div className="censy-app-name">世界书</div>
              </div>
              <div className="censy-app-item">
                <div className="censy-app-icon">
                  <svg viewBox="0 0 24 24">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="censy-app-name">邀约</div>
              </div>
            </div>
          </div>
        </div>

        <div className="censy-page">
          <div className="censy-p2-wrapper">
            <div className="censy-psp-wrapper">
              <div className="censy-psp-scale-box">
                <div className="psp-machine">
                  <div className="left-group">
                    <div className="dpad-full">
                      <span className="d-up"></span>
                      <span className="d-down"></span>
                      <span className="d-left"></span>
                      <span className="d-right"></span>
                    </div>
                    <div className="speaker-grid">
                      <span></span><span></span><span></span>
                      <span></span><span></span><span></span>
                      <span></span><span></span><span></span>
                    </div>
                    <div className="paw-joystick"></div>
                  </div>
                  <div className="center-screen" id="censyPspScreenWrap" onClick={() => document.getElementById('censyPspUpload')?.click()}>
                    <div className="screen-text" style={{ display: images.psp ? 'none' : 'block' }}>点击更换图片</div>
                    <img id="censyPspShowImg" src={images.psp} style={{ display: images.psp ? 'block' : 'none' }} />
                  </div>
                  <div className="right-group">
                    <div className="action-buttons">
                      <div className="action-btn"></div>
                      <div className="action-btn"></div>
                      <div className="action-btn"></div>
                      <div className="action-btn"></div>
                    </div>
                    <div className="paw-joystick"></div>
                    <div className="speaker-grid">
                      <span></span><span></span><span></span>
                      <span></span><span></span><span></span>
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="censy-p2-bottom-section">
              <div className="censy-p2-col">
                <div className="censy-iscreen-wrapper">
                  <div className="censy-iscreen-frame-large" id="censyIscreenBox" onClick={() => document.getElementById('censyIscreenUpload')?.click()}>
                    <span className="censy-iscreen-placeholder" style={{ display: images.iscreen1 ? 'none' : 'block' }}>点击上传</span>
                    <img id="censyIscreenImg" src={images.iscreen1} style={{ display: images.iscreen1 ? 'block' : 'none' }} />
                  </div>
                  <div className="censy-iscreen-label" contentEditable={true}>iScreen</div>
                </div>
                <div className="censy-apps-grid-small">
                  <div className="censy-app-item app-small">
                    <div className="censy-app-icon">
                      <svg viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </div>
                    <div className="censy-app-name">日程</div>
                  </div>
                  <div className="censy-app-item app-small">
                    <div className="censy-app-icon">
                      <svg viewBox="0 0 24 24">
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                        <path d="M8 14h.01" />
                        <path d="M12 14h.01" />
                        <path d="M16 14h.01" />
                        <path d="M8 18h.01" />
                        <path d="M12 18h.01" />
                        <path d="M16 18h.01" />
                      </svg>
                    </div>
                    <div className="censy-app-name">日历</div>
                  </div>
                  <div className="censy-app-item app-small">
                    <div className="censy-app-icon">
                      <svg viewBox="0 0 24 24">
                        <rect x="2" y="6" width="20" height="12" rx="2" />
                        <path d="M6 12h4" />
                        <path d="M8 10v4" />
                        <circle cx="15" cy="13" r="1" />
                        <circle cx="18" cy="11" r="1" />
                      </svg>
                    </div>
                    <div className="censy-app-name">游戏</div>
                  </div>
                  <div className="censy-app-item app-small">
                    <div className="censy-app-icon">
                      <svg viewBox="0 0 24 24">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <path d="M12 18h.01" />
                      </svg>
                    </div>
                    <div className="censy-app-name">查手机</div>
                  </div>
                </div>
              </div>
              <div className="censy-p2-col">
                <div className="censy-apps-grid">
                  <div className="censy-app-item">
                    <div className="censy-app-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                    </div>
                    <div className="censy-app-name">商城</div>
                  </div>
                  <div className="censy-app-item">
                    <div className="censy-app-icon">
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                      </svg>
                    </div>
                    <div className="censy-app-name">美团</div>
                  </div>
                  <div className="censy-app-item">
                    <div className="censy-app-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    </div>
                    <div className="censy-app-name">隐秘时刻</div>
                  </div>
                  <div className="censy-app-item">
                    <div className="censy-app-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                      </svg>
                    </div>
                    <div className="censy-app-name">记忆库</div>
                  </div>
                </div>
                <div className="censy-iscreen-wrapper">
                  <div className="censy-iscreen-frame" id="censyIscreenBox2" onClick={() => document.getElementById('censyIscreenUpload2')?.click()}>
                    <span className="censy-iscreen-placeholder" style={{ display: images.iscreen2 ? 'none' : 'block' }}>点击上传</span>
                    <img id="censyIscreenImg2" src={images.iscreen2} style={{ display: images.iscreen2 ? 'block' : 'none' }} />
                  </div>
                  <div className="censy-iscreen-label" contentEditable={true}>Widget</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="censy-page">
          <div className="censy-p3-wrapper">
            <div className="censy-p3-top-wrapper">
              <div className="censy-p3-scale-box">
                <div className="censy-p3-container">
                  <div className="censy-p3-polaroid censy-p3-card1" id="censyP3Card1" onClick={() => document.getElementById('censyP3Up1')?.click()}>
                    <div className="censy-p3-photo">
                      <span style={{ display: images.p3_1 ? 'none' : 'block' }}>点击上传</span>
                      <img id="censyP3Img1" src={images.p3_1} style={{ display: images.p3_1 ? 'block' : 'none' }} />
                    </div>
                    <div className="censy-p3-caption" contentEditable={true}>your puppy 😊</div>
                  </div>
                  <div className="censy-p3-polaroid censy-p3-card2" id="censyP3Card2" onClick={() => document.getElementById('censyP3Up2')?.click()}>
                    <div className="censy-p3-photo">
                      <span style={{ display: images.p3_2 ? 'none' : 'block' }}>点击上传</span>
                      <img id="censyP3Img2" src={images.p3_2} style={{ display: images.p3_2 ? 'block' : 'none' }} />
                    </div>
                    <div className="censy-p3-caption" contentEditable={true}>Every day !/</div>
                  </div>
                  <div className="censy-p3-polaroid censy-p3-card3" id="censyP3Card3" onClick={() => document.getElementById('censyP3Up3')?.click()}>
                    <div className="censy-p3-photo">
                      <span style={{ display: images.p3_3 ? 'none' : 'block' }}>点击上传</span>
                      <img id="censyP3Img3" src={images.p3_3} style={{ display: images.p3_3 ? 'block' : 'none' }} />
                    </div>
                    <div className="censy-p3-caption" contentEditable={true}>🐇 YEAH! 🐾</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="censy-p3-bottom-apps">
              <div className="censy-app-item">
                <div className="censy-app-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="13" r="8" />
                    <path d="M12 9v4l2 2" />
                    <path d="M5 3 2 6" />
                    <path d="m22 6-3-3" />
                    <path d="M6.38 18.7 4 21" />
                    <path d="M17.64 18.67 20 21" />
                  </svg>
                </div>
                <div className="censy-app-name">闹钟</div>
              </div>
              <div className="censy-app-item">
                <div className="censy-app-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M15 3h6v6" />
                    <path d="M10 14L21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </div>
                <div className="censy-app-name">外出</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="censy-fixed-bottom">
        <div className="censy-page-indicators" id="censyPageDots">
          <span className={`censy-dot ${currentPage === 0 ? 'active' : ''}`} onClick={() => scrollToPage(0)}></span>
          <span className={`censy-dot ${currentPage === 1 ? 'active' : ''}`} onClick={() => scrollToPage(1)}></span>
          <span className={`censy-dot ${currentPage === 2 ? 'active' : ''}`} onClick={() => scrollToPage(2)}></span>
        </div>
        <div className="censy-dock-container">
          <div className="censy-dock-item">
            <div className="censy-dock-icon">
              <svg viewBox="0 0 24 24">
                <path d="M4 19l5.5-5.5" />
                <path d="M14.5 8.5L20 3" />
                <path d="M8 21l-5-5 9-9 5 5-9 9z" />
                <path d="M13 6l5 5" />
              </svg>
            </div>
            <div className="censy-dock-name">外观</div>
          </div>
          <div className="censy-dock-item">
            <div className="censy-dock-icon">
              <svg viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <path d="M8 9h8" />
                <path d="M8 13h5" />
              </svg>
            </div>
            <div className="censy-dock-name">论坛</div>
          </div>
          <div className="censy-dock-item">
            <div className="censy-dock-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 21s-6.5-4.35-8.5-7.12C1.5 11.1 2.2 7.4 5.4 5.5c2.1-1.25 4.55-.73 6.1.94 1.55-1.67 4-2.19 6.1-.94 3.2 1.9 3.9 5.6 1.9 8.38C18.5 16.65 12 21 12 21z" />
              </svg>
            </div>
            <div className="censy-dock-name">情侣空间</div>
          </div>
          <div className="censy-dock-item" id="censySettingsDockBtn" onClick={() => setShowSettings(true)}>
            <div className="censy-dock-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="censy-dock-name">设置</div>
          </div>
        </div>
      </div>

      <div className={`censy-settings-panel ${showSettings ? 'show' : ''}`} id="censySettingsPanel">
        <div className="censy-settings-header">
          <span>⚙️ 定制偏好设置</span>
          <div className="censy-close-btn" id="censyCloseSettings" onClick={() => setShowSettings(false)}>✕</div>
        </div>
        <div className="censy-settings-body">
          <div className="censy-settings-block">
            <div className="censy-settings-title">全局呈现</div>
            <div className="censy-bg-upload-btn" id="censyBgBtn" onClick={() => document.getElementById('censyGlobalBgUpload')?.click()}>🖼️ 更改聊天背景壁纸</div>
          </div>
          <div className="censy-settings-block">
            <details className="censy-settings-details">
              <summary className="censy-settings-summary">
                <div className="censy-settings-title" style={{ marginBottom: 0 }}>应用与功能区图标调整</div>
                <span className="censy-details-arrow">▼</span>
              </summary>
              <div className="censy-details-content">
                <div className="censy-settings-app-item">
                  <span>微信</span>
                  <button>更换图标</button>
                </div>
                <div className="censy-settings-app-item">
                  <span>名册</span>
                  <button>更换图标</button>
                </div>
                <div className="censy-settings-app-item">
                  <span>世界书</span>
                  <button>更换图标</button>
                </div>
                <div className="censy-settings-app-item">
                  <span>邀约</span>
                  <button>更换图标</button>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App