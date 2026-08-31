import { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useLanguage } from '../../hooks/useLanguage'
import { useAudio } from '../../hooks/useAudio'
import './Navbar.css'

interface NavbarProps {
  onContactClick: () => void
}

type TranslationKey = 'nav_home' | 'nav_services' | 'nav_showcase' | 'nav_about' | 'nav_process'

const navItems: { id: string; label: TranslationKey }[] = [
  { id: 'home', label: 'nav_home' },
  { id: 'services', label: 'nav_services' },
  { id: 'showcase', label: 'nav_showcase' },
  { id: 'about', label: 'nav_about' },
  { id: 'process', label: 'nav_process' },
]

export function Navbar({ onContactClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { lang, t, setLanguage } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { play } = useAudio()

  // Scroll lock melhorado - preserva overflow anterior
  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
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

  // Removido o reload - troca instantânea
  const handleLangChange = (newLang: 'pt' | 'es' | 'en') => {
    if (newLang === lang) return

    play('click')
    setLanguage(newLang)
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

        {/* DESKTOP MENU - com buttons semanticamente corretos */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="nav-item"
                onClick={() => handleNavClick(item.id)}
              >
                {t(item.label)}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="nav-item nav-btn"
              onClick={handleContactClick}
            >
              {t('nav_contact')}
            </button>
          </li>
          <li>
            <div className="control-group">
              <div className="lang-selector">
                <button
                  type="button"
                  className={`lang-btn ${lang === 'pt' ? 'active' : ''}`}
                  onClick={() => handleLangChange('pt')}
                  aria-label="Português"
                >
                  <img src="/images/bandeiras/bandeira-brasil.webp" alt="Português" width="24" height="16" />
                </button>
                <button
                  type="button"
                  className={`lang-btn ${lang === 'es' ? 'active' : ''}`}
                  onClick={() => handleLangChange('es')}
                  aria-label="Español"
                >
                  <img src="/images/bandeiras/bandeira-espanha.webp" alt="Español" width="24" height="16" />
                </button>
                <button
                  type="button"
                  className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => handleLangChange('en')}
                  aria-label="English"
                >
                  <img src="/images/bandeiras/bandeira-eua.webp" alt="English" width="24" height="16" />
                </button>
              </div>
              <button
                type="button"
                className="theme-toggle"
                onClick={handleThemeToggle}
                aria-label="Alternar tema"
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </button>
            </div>
          </li>
        </ul>

        {/* HAMBURGER - com aria-expanded */}
        <button
          type="button"
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
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

      {/* MOBILE MENU */}
      <div
        id="mobile-navigation"
        className={`nav-mobile ${isMenuOpen ? 'active' : ''}`}
        aria-hidden={!isMenuOpen}
      >
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
            type="button"
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

        {/* NAVEGAÇÃO MOBILE */}
        <nav className="mobile-menu-navigation">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="mobile-menu-item"
              onClick={() => handleNavClick(item.id)}
            >
              <span className="mobile-menu-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="mobile-menu-label">
                {t(item.label)}
              </span>
              <span className="mobile-menu-arrow">↗</span>
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          type="button"
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
                type="button"
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
                type="button"
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
                type="button"
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
              type="button"
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