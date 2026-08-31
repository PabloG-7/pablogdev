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
            <img src="/images/logo.png" alt="PabloG.Dev Logo" className="logo-icon" />
          </div>
          <div className="logo-text">Pablo<span className="highlight">G</span>.Dev</div>
        </div>

        <ul className="nav-links">
          <li 
            className="nav-item" 
            onClick={() => handleNavClick('home')}
          >
            {t('nav_home')}
          </li>
          <li 
            className="nav-item" 
            onClick={() => handleNavClick('services')}
          >
            {t('nav_services')}
          </li>
          <li 
            className="nav-item" 
            onClick={() => handleNavClick('showcase')}
          >
            {t('nav_showcase') || 'Exemplos'}
          </li>
          <li 
            className="nav-item" 
            onClick={() => handleNavClick('about')}
          >
            {t('nav_about')}
          </li>
          <li 
            className="nav-item" 
            onClick={() => handleNavClick('process')}
          >
            {t('nav_process')}
          </li>
          <li 
            className="nav-item nav-btn" 
            onClick={handleContactClick}
          >
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

      {/* ===== MENU MOBILE COMERCIAL E PREMIUM ===== */}
      <div className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-glow"></div>

        {/* HEADER */}
        <div className="mobile-menu-header">
          <div className="mobile-menu-brand">
            <div className="mobile-menu-logo">
              <img
                src="/images/logo.png"
                alt="PabloG.Dev Logo"
              />
            </div>

            <div>
              <div className="mobile-menu-brand-name">
                Pablo<span>G</span>.Dev
              </div>
            </div>
          </div>

          <button
            className="close-menu"
            onClick={closeMenu}
            aria-label="Fechar menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>

        {/* PROPOSTA DE VALOR */}
        <div className="mobile-menu-proposta">
          <span className="mobile-menu-tagline">
            {lang === 'pt' ? 'Sites e sistemas pensados' : 
             lang === 'es' ? 'Sitios y sistemas pensados' : 
             'Websites and systems designed'}
          </span>
          <span className="mobile-menu-tagline-destaque">
            {lang === 'pt' ? 'para o seu negócio.' : 
             lang === 'es' ? 'para su negocio.' : 
             'for your business.'}
          </span>
        </div>

        {/* NAVEGAÇÃO */}
        <nav className="mobile-menu-navigation">
          <button
            className="mobile-menu-item"
            onClick={() => handleNavClick('home')}
          >
            <span className="mobile-menu-number">01</span>
            <span className="mobile-menu-label">
              {t('nav_home')}
            </span>
            <span className="mobile-menu-arrow">↗</span>
          </button>

          <button
            className="mobile-menu-item"
            onClick={() => handleNavClick('services')}
          >
            <span className="mobile-menu-number">02</span>
            <span className="mobile-menu-label">
              {t('nav_services')}
            </span>
            <span className="mobile-menu-arrow">↗</span>
          </button>

          <button
            className="mobile-menu-item"
            onClick={() => handleNavClick('showcase')}
          >
            <span className="mobile-menu-number">03</span>
            <span className="mobile-menu-label">
              {t('nav_showcase') || 'Exemplos'}
            </span>
            <span className="mobile-menu-arrow">↗</span>
          </button>

          <button
            className="mobile-menu-item"
            onClick={() => handleNavClick('about')}
          >
            <span className="mobile-menu-number">04</span>
            <span className="mobile-menu-label">
              {t('nav_about')}
            </span>
            <span className="mobile-menu-arrow">↗</span>
          </button>

          <button
            className="mobile-menu-item"
            onClick={() => handleNavClick('process')}
          >
            <span className="mobile-menu-number">05</span>
            <span className="mobile-menu-label">
              {t('nav_process')}
            </span>
            <span className="mobile-menu-arrow">↗</span>
          </button>
        </nav>

        {/* CTA - QUERO UM SITE */}
        <button
          className="mobile-menu-cta"
          onClick={handleContactClick}
        >
          <span>
            {lang === 'pt' ? 'QUERO UM SITE' : 
             lang === 'es' ? 'QUIERO UN SITIO' : 
             'I WANT A WEBSITE'}
          </span>
          <span className="mobile-menu-cta-arrow">↗</span>
        </button>

        {/* FOOTER */}
        <div className="mobile-menu-footer">
          <div className="mobile-controls">
            <div className="lang-selector">
              <button
                className={`lang-btn ${lang === 'pt' ? 'active' : ''}`}
                onClick={() => handleLangChange('pt')}
                aria-label="Português"
              >
                <img
                  src="/images/bandeiras/bandeira-brasil.webp"
                  alt="Português"
                />
              </button>

              <button
                className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
                onClick={() => handleLangChange('es')}
                aria-label="Español"
              >
                <img
                  src="/images/bandeiras/bandeira-espanha.webp"
                  alt="Español"
                />
              </button>

              <button
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => handleLangChange('en')}
                aria-label="English"
              >
                <img
                  src="/images/bandeiras/bandeira-eua.webp"
                  alt="English"
                />
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