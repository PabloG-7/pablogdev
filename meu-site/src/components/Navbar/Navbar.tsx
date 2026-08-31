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
    play('click')
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
      <nav className="navbar" role="navigation" aria-label="Navegação principal">
        <div className="logo-group">
          <div className="logo-wrapper">
            <img src="/images/logo.png" alt="PabloG.Dev Logo" className="logo-icon" />
          </div>
          <div className="logo-text">Pablo<span className="highlight">G</span>.Dev</div>
        </div>

        <ul className="nav-links" role="menubar">
          <li role="none">
            <button
              role="menuitem"
              className="nav-item"
              onClick={() => handleNavClick('home')}
            >
              {t('nav_home')}
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              className="nav-item"
              onClick={() => handleNavClick('services')}
            >
              {t('nav_services')}
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              className="nav-item"
              onClick={() => handleNavClick('showcase')}
            >
              {t('nav_showcase') || 'Exemplos'}
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              className="nav-item"
              onClick={() => handleNavClick('about')}
            >
              {t('nav_about')}
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              className="nav-item"
              onClick={() => handleNavClick('process')}
            >
              {t('nav_process')}
            </button>
          </li>
          <li role="none">
            <button
              role="menuitem"
              className="nav-item nav-btn"
              onClick={handleContactClick}
            >
              {t('nav_contact')}
            </button>
          </li>
          <li role="none">
            <div className="control-group">
              <div className="lang-selector" role="group" aria-label="Seletor de idioma">
                <button 
                  className={`lang-btn ${lang === 'pt' ? 'active' : ''}`}
                  onClick={() => handleLangChange('pt')}
                  aria-label="Português"
                  aria-current={lang === 'pt' ? 'true' : undefined}
                >
                  <img src="/images/bandeiras/bandeira-brasil.webp" alt="Português" width="24" height="16" loading="lazy" />
                </button>
                <button 
                  className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
                  onClick={() => handleLangChange('es')}
                  aria-label="Español"
                  aria-current={lang === 'es' ? 'true' : undefined}
                >
                  <img src="/images/bandeiras/bandeira-espanha.webp" alt="Español" width="24" height="16" loading="lazy" />
                </button>
                <button 
                  className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => handleLangChange('en')}
                  aria-label="English"
                  aria-current={lang === 'en' ? 'true' : undefined}
                >
                  <img src="/images/bandeiras/bandeira-eua.webp" alt="English" width="24" height="16" loading="lazy" />
                </button>
              </div>
              <button 
                className="theme-toggle" 
                onClick={handleThemeToggle}
                aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </button>
            </div>
          </li>
        </ul>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
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
        aria-hidden="true"
      />

      {/* ===== MENU MOBILE COMERCIAL E PREMIUM ===== */}
      <div 
        id="mobile-menu"
        className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação mobile"
      >
        <div className="mobile-menu-glow" aria-hidden="true"></div>

        {/* HEADER */}
        <div className="mobile-menu-header">
          <div className="mobile-menu-brand">
            <div className="mobile-menu-logo">
              <img
                src="/images/logo.png"
                alt="PabloG.Dev Logo"
                loading="lazy"
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
        <nav className="mobile-menu-navigation" role="navigation" aria-label="Menu mobile">
          <button
            className="mobile-menu-item"
            onClick={() => handleNavClick('home')}
          >
            <span className="mobile-menu-number">01</span>
            <span className="mobile-menu-label">
              {t('nav_home')}
            </span>
            <span className="mobile-menu-arrow" aria-hidden="true">↗</span>
          </button>

          <button
            className="mobile-menu-item"
            onClick={() => handleNavClick('services')}
          >
            <span className="mobile-menu-number">02</span>
            <span className="mobile-menu-label">
              {t('nav_services')}
            </span>
            <span className="mobile-menu-arrow" aria-hidden="true">↗</span>
          </button>

          <button
            className="mobile-menu-item"
            onClick={() => handleNavClick('showcase')}
          >
            <span className="mobile-menu-number">03</span>
            <span className="mobile-menu-label">
              {t('nav_showcase') || 'Exemplos'}
            </span>
            <span className="mobile-menu-arrow" aria-hidden="true">↗</span>
          </button>

          <button
            className="mobile-menu-item"
            onClick={() => handleNavClick('about')}
          >
            <span className="mobile-menu-number">04</span>
            <span className="mobile-menu-label">
              {t('nav_about')}
            </span>
            <span className="mobile-menu-arrow" aria-hidden="true">↗</span>
          </button>

          <button
            className="mobile-menu-item"
            onClick={() => handleNavClick('process')}
          >
            <span className="mobile-menu-number">05</span>
            <span className="mobile-menu-label">
              {t('nav_process')}
            </span>
            <span className="mobile-menu-arrow" aria-hidden="true">↗</span>
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
          <span className="mobile-menu-cta-arrow" aria-hidden="true">↗</span>
        </button>

        {/* FOOTER */}
        <div className="mobile-menu-footer">
          <div className="mobile-controls">
            <div className="lang-selector" role="group" aria-label="Seletor de idioma">
              <button
                className={`lang-btn ${lang === 'pt' ? 'active' : ''}`}
                onClick={() => handleLangChange('pt')}
                aria-label="Português"
                aria-current={lang === 'pt' ? 'true' : undefined}
              >
                <img
                  src="/images/bandeiras/bandeira-brasil.webp"
                  alt="Português"
                  loading="lazy"
                />
              </button>

              <button
                className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
                onClick={() => handleLangChange('es')}
                aria-label="Español"
                aria-current={lang === 'es' ? 'true' : undefined}
              >
                <img
                  src="/images/bandeiras/bandeira-espanha.webp"
                  alt="Español"
                  loading="lazy"
                />
              </button>

              <button
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => handleLangChange('en')}
                aria-label="English"
                aria-current={lang === 'en' ? 'true' : undefined}
              >
                <img
                  src="/images/bandeiras/bandeira-eua.webp"
                  alt="English"
                  loading="lazy"
                />
              </button>
            </div>

            <button
              className="theme-toggle"
              onClick={handleThemeToggle}
              aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}