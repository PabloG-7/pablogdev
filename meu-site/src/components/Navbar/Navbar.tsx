import { useState } from 'react'
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

  const toggleMenu = () => {
    play('click')
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = !isMenuOpen ? 'hidden' : ''
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.style.overflow = ''
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
        <div className="brand">
          <div className="logo-container">
            <img src="images/logo.png" alt="PabloG.Dev" className="logo" />
            <div className="logo-glow"></div>
          </div>
          <span className="brand-name">
            Pablo<span className="accent">G</span>.Dev
          </span>
        </div>

        <ul className="nav-list">
          <li onClick={() => handleNavClick('home')}>
            <span className="nav-label">{t('nav_home')}</span>
            <span className="nav-indicator"></span>
          </li>
          <li onClick={() => handleNavClick('services')}>
            <span className="nav-label">{t('nav_services')}</span>
            <span className="nav-indicator"></span>
          </li>
          <li onClick={() => handleNavClick('showcase')}>
            <span className="nav-label">{t('nav_showcase') || 'Exemplos'}</span>
            <span className="nav-indicator"></span>
          </li>
          <li onClick={() => handleNavClick('about')}>
            <span className="nav-label">{t('nav_about')}</span>
            <span className="nav-indicator"></span>
          </li>
          <li onClick={() => handleNavClick('process')}>
            <span className="nav-label">{t('nav_process')}</span>
            <span className="nav-indicator"></span>
          </li>
          <li className="contact-btn-wrapper">
            <button className="contact-btn" onClick={handleContactClick}>
              {t('nav_contact')}
              <span className="btn-arrow">→</span>
            </button>
          </li>
        </ul>

        <div className="controls">
          <div className="language-selector">
            <button
              className={`lang-option ${lang === 'pt' ? 'active' : ''}`}
              onClick={() => handleLangChange('pt')}
              aria-label="Português"
            >
              <img src="/images/bandeiras/bandeira-brasil.webp" alt="PT" />
            </button>
            <button
              className={`lang-option ${lang === 'es' ? 'active' : ''}`}
              onClick={() => handleLangChange('es')}
              aria-label="Español"
            >
              <img src="/images/bandeiras/bandeira-espanha.webp" alt="ES" />
            </button>
            <button
              className={`lang-option ${lang === 'en' ? 'active' : ''}`}
              onClick={() => handleLangChange('en')}
              aria-label="English"
            >
              <img src="/images/bandeiras/bandeira-eua.webp" alt="EN" />
            </button>
          </div>
          <button className="theme-btn" onClick={handleThemeToggle}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>

        <button 
          className={`menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div 
        className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      />

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-header">
          <div className="mobile-brand">
            <img src="images/logo.png" alt="PabloG.Dev" className="mobile-logo" />
            <span className="mobile-brand-name">
              Pablo<span className="accent">G</span>.Dev
            </span>
          </div>
          <button className="close-btn" onClick={closeMenu}>✕</button>
        </div>

        <ul className="mobile-nav">
          <li onClick={() => handleNavClick('home')}>
            <span className="nav-icon">⌂</span>
            {t('nav_home')}
          </li>
          <li onClick={() => handleNavClick('services')}>
            <span className="nav-icon">✦</span>
            {t('nav_services')}
          </li>
          <li onClick={() => handleNavClick('showcase')}>
            <span className="nav-icon">◈</span>
            {t('nav_showcase') || 'Exemplos'}
          </li>
          <li onClick={() => handleNavClick('about')}>
            <span className="nav-icon">◉</span>
            {t('nav_about')}
          </li>
          <li onClick={() => handleNavClick('process')}>
            <span className="nav-icon">◊</span>
            {t('nav_process')}
          </li>
          <li className="mobile-contact">
            <button className="contact-btn-full" onClick={handleContactClick}>
              {t('nav_contact')}
              <span className="btn-arrow">→</span>
            </button>
          </li>
        </ul>

        <div className="mobile-footer">
          <div className="mobile-langs">
            <button
              className={`lang-option ${lang === 'pt' ? 'active' : ''}`}
              onClick={() => handleLangChange('pt')}
            >
              <img src="/images/bandeiras/bandeira-brasil.webp" alt="PT" />
            </button>
            <button
              className={`lang-option ${lang === 'es' ? 'active' : ''}`}
              onClick={() => handleLangChange('es')}
            >
              <img src="/images/bandeiras/bandeira-espanha.webp" alt="ES" />
            </button>
            <button
              className={`lang-option ${lang === 'en' ? 'active' : ''}`}
              onClick={() => handleLangChange('en')}
            >
              <img src="/images/bandeiras/bandeira-eua.webp" alt="EN" />
            </button>
          </div>
          <button className="theme-btn-mobile" onClick={handleThemeToggle}>
            {theme === 'dark' ? '☀️ Tema Claro' : '🌙 Tema Escuro'}
          </button>
        </div>
      </div>
    </>
  )
}