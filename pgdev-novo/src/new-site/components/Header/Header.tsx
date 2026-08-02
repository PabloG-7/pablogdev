import './Header.css'
import logo from '../../assets/apenas-logo.png'
import brFlag from '../../assets/bandeira-brasil.webp' 
import esFlag from '../../assets/bandeira-espanha.webp'
import enFlag from '../../assets/bandeira-eua.webp'
import { Menu, X, Sun, Moon, ChevronDown, Globe, Settings } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import type { Language } from '../../types'

type HeaderProps = {
  language: Language
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

// Language options
const languageOptions = [
  { code: 'pt', label: 'Português', flag: brFlag },
  { code: 'es', label: 'Español', flag: esFlag },
  { code: 'en', label: 'English', flag: enFlag }
]

// Language Dropdown Component (CORRIGIDO)
const LanguageDropdown = ({ 
  language, 
  isOpen, 
  onToggle, 
  onClose,
  onChange,
  variant = 'desktop'
}: { 
  language: Language
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  onChange: (lang: Language) => void
  variant?: 'desktop' | 'tablet' | 'mobile'
}) => {
  const current = languageOptions.find(l => l.code === language)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose() // FECHA, não alterna
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  const className = `lang-${variant}`

  return (
    <div className={`${className}-wrapper`} ref={ref}>
      <button 
        className={`${className}-trigger`}
        onClick={onToggle}
        aria-label="Selecionar idioma"
      >
        <img 
          src={current?.flag} 
          alt={current?.label}
          className={`${className}-trigger-flag`}
        />
        {variant === 'desktop' && (
          <>
            <span className="lang-trigger-label">{current?.code.toUpperCase()}</span>
            <ChevronDown size={14} className={`lang-chevron ${isOpen ? 'open' : ''}`} />
          </>
        )}
        {variant !== 'desktop' && (
          <ChevronDown size={12} className={`lang-chevron ${isOpen ? 'open' : ''}`} />
        )}
      </button>

      {isOpen && (
        <div className={`${className}-dropdown`}>
          {languageOptions.map((option) => (
            <button
              key={option.code}
              className={`${className}-option ${language === option.code ? 'active' : ''}`}
              onClick={() => {
                onClose() // FECHA primeiro
                onChange(option.code as Language) // Depois muda
              }}
            >
              <img src={option.flag} alt={option.label} className={`${className}-option-flag`} />
              <span>{option.label}</span>
              {language === option.code && variant === 'desktop' && (
                <span className="lang-check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header({
  language,
  theme,
  onToggleTheme
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  
  // ESTADOS SEPARADOS para cada dropdown
  const [isDesktopLangOpen, setIsDesktopLangOpen] = useState(false)
  const [isTabletLangOpen, setIsTabletLangOpen] = useState(false)
  
  const basePath = language === 'es' ? '/es' : language === 'en' ? '/en' : ''

  const whatsappMessages = {
    pt: 'Olá, vim pelo site PabloG.Dev e gostaria de saber mais sobre sites e sistemas.',
    es: 'Hola, vengo del sitio PabloG.Dev y me gustaría obtener más información sobre sitios web y sistemas.',
    en: "Hello, I came from the PabloG.Dev website and I'd like to know more about websites and custom systems."
  }

  const whatsappLink = `https://wa.me/5511961111894?text=${encodeURIComponent(whatsappMessages[language])}`

  const content = {
    pt: {
      header: {
        home: 'Início',
        services: 'Serviços',
        projects: 'Exemplos',
        process: 'Processo',
        contact: 'Contato',
        cta: 'WhatsApp',
        settings: 'Configurações',
        language: 'Idioma',
        theme: 'Tema',
        dark: 'Escuro',
        light: 'Claro'
      }
    },
    es: {
      header: {
        home: 'Inicio',
        services: 'Servicios',
        projects: 'Ejemplos',
        process: 'Proceso',
        contact: 'Contacto',
        cta: 'WhatsApp',
        settings: 'Configuraciones',
        language: 'Idioma',
        theme: 'Tema',
        dark: 'Oscuro',
        light: 'Claro'
      }
    },
    en: {
      header: {
        home: 'Home',
        services: 'Services',
        projects: 'Examples',
        process: 'Process',
        contact: 'Contact',
        cta: 'WhatsApp',
        settings: 'Settings',
        language: 'Language',
        theme: 'Theme',
        dark: 'Dark',
        light: 'Light'
      }
    }
  }

  const currentContent = content[language]

  const changeLanguage = (lang: Language) => {
    const currentHash = window.location.hash
    
    if (lang === 'pt') {
      window.location.href = `/${currentHash}`
    } else if (lang === 'es') {
      window.location.href = `/es${currentHash}`
    } else if (lang === 'en') {
      window.location.href = `/en${currentHash}`
    }
  }

  const handleWhatsAppClick = () => {
    if (window.fbq) {
      window.fbq('track', 'Contact')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const sections = ['inicio', 'servicos', 'exemplos', 'processo', 'contato']
      const scrollPos = window.scrollY + 200
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && element.offsetTop <= scrollPos && element.offsetTop + element.offsetHeight > scrollPos) {
          setActiveSection(section)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <a href={`${basePath}#inicio`} className="brand" onClick={closeMenu}>
          <img src={logo} alt="PabloG.Dev" className="brand-logo" />
        </a>

        {/* DESKTOP NAV */}
        <nav className="nav">
          <a href={`${basePath}#inicio`} className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`}>{currentContent.header.home}</a>
          <a href={`${basePath}#servicos`} className={`nav-link ${activeSection === 'servicos' ? 'active' : ''}`}>{currentContent.header.services}</a>
          <a href={`${basePath}#exemplos`} className={`nav-link ${activeSection === 'exemplos' ? 'active' : ''}`}>{currentContent.header.projects}</a>
          <a href={`${basePath}#processo`} className={`nav-link ${activeSection === 'processo' ? 'active' : ''}`}>{currentContent.header.process}</a>
          <a href={`${basePath}#contato`} className={`nav-link ${activeSection === 'contato' ? 'active' : ''}`}>{currentContent.header.contact}</a>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="actions">
          <LanguageDropdown
            language={language}
            isOpen={isDesktopLangOpen}
            onToggle={() => setIsDesktopLangOpen(v => !v)}
            onClose={() => setIsDesktopLangOpen(false)}
            onChange={changeLanguage}
            variant="desktop"
          />

          <button
            type="button"
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta"
            onClick={handleWhatsAppClick}
          >
            <FaWhatsapp size={16} />
            <span>{currentContent.header.cta}</span>
          </a>
        </div>

        {/* TABLET CONTROLS */}
        <div className="tablet-controls">
          <LanguageDropdown
            language={language}
            isOpen={isTabletLangOpen}
            onToggle={() => setIsTabletLangOpen(v => !v)}
            onClose={() => setIsTabletLangOpen(false)}
            onChange={changeLanguage}
            variant="tablet"
          />

          <button
            type="button"
            className="tablet-theme-toggle"
            onClick={onToggleTheme}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button type="button" className={`mobile-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Menu">
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU - DRAWER */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <nav className="mobile-nav">
            <a href={`${basePath}#inicio`} className={activeSection === 'inicio' ? 'active' : ''} onClick={closeMenu}>{currentContent.header.home}</a>
            <a href={`${basePath}#servicos`} className={activeSection === 'servicos' ? 'active' : ''} onClick={closeMenu}>{currentContent.header.services}</a>
            <a href={`${basePath}#exemplos`} className={activeSection === 'exemplos' ? 'active' : ''} onClick={closeMenu}>{currentContent.header.projects}</a>
            <a href={`${basePath}#processo`} className={activeSection === 'processo' ? 'active' : ''} onClick={closeMenu}>{currentContent.header.process}</a>
            <a href={`${basePath}#contato`} className={activeSection === 'contato' ? 'active' : ''} onClick={closeMenu}>{currentContent.header.contact}</a>
          </nav>

          <div className="mobile-divider"></div>

          {/* CONFIGURAÇÕES */}
          <div className="mobile-settings">
            <span className="mobile-settings-label">
              <Settings size={16} />
              {currentContent.header.settings}
            </span>

            <div className="mobile-lang-section">
              <span className="mobile-lang-label">
                <Globe size={14} />
                {currentContent.header.language}
              </span>
              <div className="mobile-lang-options">
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    className={`mobile-lang-option ${language === option.code ? 'active' : ''}`}
                    onClick={() => {
                      changeLanguage(option.code as Language)
                      closeMenu()
                    }}
                  >
                    <img src={option.flag} alt={option.label} className="mobile-lang-option-flag" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              className="mobile-theme-option"
              onClick={() => {
                onToggleTheme()
                closeMenu()
              }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>
                {currentContent.header.theme}: {theme === 'dark' ? currentContent.header.dark : currentContent.header.light}
              </span>
            </button>
          </div>

          <div className="mobile-divider"></div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-cta"
            onClick={() => {
              handleWhatsAppClick()
              closeMenu()
            }}
          >
            <FaWhatsapp size={16} />
            <span>{currentContent.header.cta}</span>
          </a>
        </div>
      </div>
    </header>
  )
}