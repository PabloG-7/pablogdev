import './Header.css'
import logo from '../../assets/apenas-logo.png'
import brFlag from '../../assets/bandeira-brasil.webp' 
import esFlag from '../../assets/bandeira-espanha.webp' 
import { Menu, X } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'

type HeaderProps = {
  language: Language
  onChangeLanguage: (language: Language) => void
}

export default function Header({ language, onChangeLanguage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const content = language === 'pt' ? pt : es

  const handleWhatsAppClick = () => {
    if (window.fbq) {
      window.fbq('track', 'Contact')
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const sections = ['inicio', 'servicos', 'projetos', 'sobre', 'contato']
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

  const whatsappLink = "https://wa.me/5511961111894?text=Ol%C3%A1%2C%20vim%20pelo%20site%20PabloG.Dev%20e%20gostaria%20de%20saber%20mais%20sobre%20sites%20e%20sistemas."

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <a href="#inicio" className="brand" onClick={closeMenu}>
          <img src={logo} alt="PabloG.Dev" className="brand-logo" />
          <div className="brand-underline"></div>
        </a>

        <nav className="nav">
          <a href="#inicio" className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`}>{content.header.home}</a>
          <a href="#servicos" className={`nav-link ${activeSection === 'servicos' ? 'active' : ''}`}>{content.header.services}</a>
          <a href="#projetos" className={`nav-link ${activeSection === 'projetos' ? 'active' : ''}`}>{content.header.projects}</a>
          <a href="#sobre" className={`nav-link ${activeSection === 'sobre' ? 'active' : ''}`}>{content.header.about}</a>
          <a href="#contato" className={`nav-link ${activeSection === 'contato' ? 'active' : ''}`}>{content.header.contact}</a>
        </nav>

        <div className="actions">
          <div className="lang">
            <button 
              className={`lang-btn ${language === 'pt' ? 'active' : ''}`} 
              onClick={() => onChangeLanguage('pt')}
              aria-label="Português"
            >
              <img src={brFlag} alt="Português" className="flag-icon" />
            </button>
            <button 
              className={`lang-btn ${language === 'es' ? 'active' : ''}`} 
              onClick={() => onChangeLanguage('es')}
              aria-label="Español"
            >
              <img src={esFlag} alt="Español" className="flag-icon" />
            </button>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="cta"
            onClick={handleWhatsAppClick}
          >
            <FaWhatsapp size={16} />
            <span>{content.header.cta}</span>
          </a>
        </div>

        {/* SELETOR DE IDIOMA MOBILE */}
        <div className="mobile-lang-header">
          <button 
            className={`mobile-lang-header-btn ${language === 'pt' ? 'active' : ''}`} 
            onClick={() => onChangeLanguage('pt')}
            aria-label="Português"
          >
            <img src={brFlag} alt="Português" className="flag-icon-mobile" />
          </button>
          <button 
            className={`mobile-lang-header-btn ${language === 'es' ? 'active' : ''}`} 
            onClick={() => onChangeLanguage('es')}
            aria-label="Español"
          >
            <img src={esFlag} alt="Español" className="flag-icon-mobile" />
          </button>
        </div>

        <button type="button" className={`mobile-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Menu">
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <nav className="mobile-nav">
            <a href="#inicio" className={activeSection === 'inicio' ? 'active' : ''} onClick={closeMenu}>{content.header.home}</a>
            <a href="#servicos" className={activeSection === 'servicos' ? 'active' : ''} onClick={closeMenu}>{content.header.services}</a>
            <a href="#projetos" className={activeSection === 'projetos' ? 'active' : ''} onClick={closeMenu}>{content.header.projects}</a>
            <a href="#sobre" className={activeSection === 'sobre' ? 'active' : ''} onClick={closeMenu}>{content.header.about}</a>
            <a href="#contato" className={activeSection === 'contato' ? 'active' : ''} onClick={closeMenu}>{content.header.contact}</a>
          </nav>

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
            <span>{content.header.cta}</span>
          </a>
        </div>
      </div>
    </header>
  )
}