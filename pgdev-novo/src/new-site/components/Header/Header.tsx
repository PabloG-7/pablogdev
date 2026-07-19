import './Header.css'
import logo from '../../assets/apenas-logo.png'
import brFlag from '../../assets/bandeira-brasil.webp' 
import esFlag from '../../assets/bandeira-espanha.webp'
import enFlag from '../../assets/bandeira-eua.webp'
import { Menu, X } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import type { Language } from '../../types'

type HeaderProps = {
  language: Language
}

export default function Header({ language }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  
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
        cta: 'WhatsApp'
      }
    },
    es: {
      header: {
        home: 'Inicio',
        services: 'Servicios',
        projects: 'Ejemplos',
        process: 'Proceso',
        contact: 'Contacto',
        cta: 'WhatsApp'
      }
    },
    en: {
      header: {
        home: 'Home',
        services: 'Services',
        projects: 'Examples',
        process: 'Process',
        contact: 'Contact',
        cta: 'WhatsApp'
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
          <div className="brand-underline"></div>
        </a>

        <nav className="nav">
          <a href={`${basePath}#inicio`} className={`nav-link ${activeSection === 'inicio' ? 'active' : ''}`}>{currentContent.header.home}</a>
          <a href={`${basePath}#servicos`} className={`nav-link ${activeSection === 'servicos' ? 'active' : ''}`}>{currentContent.header.services}</a>
          <a href={`${basePath}#exemplos`} className={`nav-link ${activeSection === 'exemplos' ? 'active' : ''}`}>{currentContent.header.projects}</a>
          <a href={`${basePath}#processo`} className={`nav-link ${activeSection === 'processo' ? 'active' : ''}`}>{currentContent.header.process}</a>
          <a href={`${basePath}#contato`} className={`nav-link ${activeSection === 'contato' ? 'active' : ''}`}>{currentContent.header.contact}</a>
        </nav>

        <div className="actions">
          <div className="lang">
            <button 
              className={`lang-btn ${language === 'pt' ? 'active' : ''}`} 
              onClick={() => changeLanguage('pt')}
              aria-label="Português"
            >
              <img src={brFlag} alt="Português" className="flag-icon" />
              <span className="lang-label">PT</span>
            </button>
            <button 
              className={`lang-btn ${language === 'es' ? 'active' : ''}`} 
              onClick={() => changeLanguage('es')}
              aria-label="Español"
            >
              <img src={esFlag} alt="Español" className="flag-icon" />
              <span className="lang-label">ES</span>
            </button>
            <button 
              className={`lang-btn ${language === 'en' ? 'active' : ''}`} 
              onClick={() => changeLanguage('en')}
              aria-label="English"
            >
              <img src={enFlag} alt="English" className="flag-icon" />
              <span className="lang-label">EN</span>
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
            <span>{currentContent.header.cta}</span>
          </a>
        </div>

        <div className="mobile-lang-header">
          <button 
            className={`mobile-lang-header-btn ${language === 'pt' ? 'active' : ''}`} 
            onClick={() => changeLanguage('pt')}
            aria-label="Português"
          >
            <img src={brFlag} alt="Português" className="flag-icon-mobile" />
            <span className="mobile-lang-label">PT</span>
          </button>
          <button 
            className={`mobile-lang-header-btn ${language === 'es' ? 'active' : ''}`} 
            onClick={() => changeLanguage('es')}
            aria-label="Español"
          >
            <img src={esFlag} alt="Español" className="flag-icon-mobile" />
            <span className="mobile-lang-label">ES</span>
          </button>
          <button 
            className={`mobile-lang-header-btn ${language === 'en' ? 'active' : ''}`} 
            onClick={() => changeLanguage('en')}
            aria-label="English"
          >
            <img src={enFlag} alt="English" className="flag-icon-mobile" />
            <span className="mobile-lang-label">EN</span>
          </button>
        </div>

        <button type="button" className={`mobile-btn ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Menu">
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <nav className="mobile-nav">
            <a href={`${basePath}#inicio`} className={activeSection === 'inicio' ? 'active' : ''} onClick={closeMenu}>{currentContent.header.home}</a>
            <a href={`${basePath}#servicos`} className={activeSection === 'servicos' ? 'active' : ''} onClick={closeMenu}>{currentContent.header.services}</a>
            <a href={`${basePath}#exemplos`} className={activeSection === 'exemplos' ? 'active' : ''} onClick={closeMenu}>{currentContent.header.projects}</a>
            <a href={`${basePath}#processo`} className={activeSection === 'processo' ? 'active' : ''} onClick={closeMenu}>{currentContent.header.process}</a>
            <a href={`${basePath}#contato`} className={activeSection === 'contato' ? 'active' : ''} onClick={closeMenu}>{currentContent.header.contact}</a>
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
            <span>{currentContent.header.cta}</span>
          </a>
        </div>
      </div>
    </header>
  )
}