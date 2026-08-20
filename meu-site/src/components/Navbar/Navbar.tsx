import { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../hooks/useLanguage'
import { useAudio } from '../../hooks/useAudio'
import './Navbar.css'

interface NavbarProps {
  onContactClick: () => void
}

export function Navbar({ onContactClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { lang, t, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { play } = useAudio()

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    play('click')
    setIsMenuOpen(prev => !prev)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleThemeToggle = () => {
    play('switch')
    toggleTheme()
  }

  const handleLangChange = (newLang: 'pt' | 'es' | 'en') => {
    play('click')
    if (newLang === lang) return
    setLanguage(newLang)
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }

  const handleNavClick = (sectionId: string) => {
    closeMenu()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContactClick = () => {
    play('confirm')
    closeMenu()
    onContactClick()
  }

  return (
    <>
      <nav className="navbar">
        <div className="logo-group">
          <div className="logo-wrapper">
            <img src="images/logo.png" alt="PabloG.Dev Logo" className="logo-icon" />
          </div>
          <div className="logo-text">Pablo<span className="gold-g">G</span>.Dev</div>
        </div>

        <ul className="nav-links">
          <li className="nav-item" onClick={() => handleNavClick('home')}>
            {t('nav_home')}
          </li>
          <li className="nav-item" onClick={() => handleNavClick('services')}>
            {t('nav_services')}
          </li>
          <li className="nav-item" onClick={() => handleNavClick('showcase')}>
            {t('nav_showcase') || 'Exemplos'}
          </li>
          <li className="nav-item" onClick={() => handleNavClick('about')}>
            {t('nav_about')}
          </li>
          <li className="nav-item" onClick={() => handleNavClick('process')}>
            {t('nav_process')}
          </li>
          <li className="nav-item nav-btn" onClick={handleContactClick}>
            {t('nav_contact')}
          </li>
          <li>
            <div className="control-group">
              <div className="lang-selector">
                <button 
                  className={`lang-btn ${lang === 'pt' ? 'active' : ''}`}
                  onClick={() => handleLangChange('pt')}
                  aria-label="Português"
                >
                  <img src="/images/bandeiras/bandeira-brasil.webp" alt="Português" width="24" height="16" />
                </button>
                <button 
                  className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
                  onClick={() => handleLangChange('es')}
                  aria-label="Español"
                >
                  <img src="/images/bandeiras/bandeira-espanha.webp" alt="Español" width="24" height="16" />
                </button>
                <button 
                  className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => handleLangChange('en')}
                  aria-label="English"
                >
                  <img src="/images/bandeiras/bandeira-eua.webp" alt="English" width="24" height="16" />
                </button>
              </div>
              <button 
                className="theme-toggle" 
                onClick={handleThemeToggle}
                aria-label="Alternar tema"
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </button>
            </div>
          </li>
        </ul>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </nav>

      <div 
        className={`nav-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      />

      <div className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-header">
          <div className="mobile-logo">
            <div className="logo-wrapper">
              <img src="images/logo.png" alt="PabloG.Dev Logo" className="logo-icon" />
            </div>
            <div className="logo-text">Pablo<span className="gold-g">G</span>.Dev</div>
          </div>
          <button className="close-menu" onClick={closeMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mobile-divider" />

        <ul className="mobile-nav-links">
          <li className="nav-item" onClick={() => handleNavClick('home')}>
            <span className="nav-icon">⌂</span>
            {t('nav_home')}
          </li>
          <li className="nav-item" onClick={() => handleNavClick('services')}>
            <span className="nav-icon">◇</span>
            {t('nav_services')}
          </li>
          <li className="nav-item" onClick={() => handleNavClick('showcase')}>
            <span className="nav-icon">◆</span>
            {t('nav_showcase') || 'Exemplos'}
          </li>
          <li className="nav-item" onClick={() => handleNavClick('about')}>
            <span className="nav-icon">◎</span>
            {t('nav_about')}
          </li>
          <li className="nav-item" onClick={() => handleNavClick('process')}>
            <span className="nav-icon">◈</span>
            {t('nav_process')}
          </li>
        </ul>

        <div className="mobile-actions">
          <button className="mobile-contact-btn" onClick={handleContactClick}>
            {t('nav_contact')}
          </button>
        </div>

        <div className="mobile-footer">
          <div className="mobile-controls">
            <div className="lang-selector">
              <button 
                className={`lang-btn ${lang === 'pt' ? 'active' : ''}`}
                onClick={() => handleLangChange('pt')}
                aria-label="Português"
              >
                <img src="/images/bandeiras/bandeira-brasil.webp" alt="Português" width="24" height="16" />
              </button>
              <button 
                className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
                onClick={() => handleLangChange('es')}
                aria-label="Español"
              >
                <img src="/images/bandeiras/bandeira-espanha.webp" alt="Español" width="24" height="16" />
              </button>
              <button 
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => handleLangChange('en')}
                aria-label="English"
              >
                <img src="/images/bandeiras/bandeira-eua.webp" alt="English" width="24" height="16" />
              </button>
            </div>
            <button 
              className="theme-toggle" 
              onClick={handleThemeToggle}
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}