import './Footer.css'
import logo from '../../assets/apple-touch-icon.png'
import { ChevronUp } from 'lucide-react'
import type { Language } from '../../types'

type FooterProps = {
  language: Language
}

export default function Footer({ language }: FooterProps) {
  const content = {
    pt: {
      copyright: '© 2026 PabloG.Dev - Transformando ideias em negócios digitais.'
    },
    es: {
      copyright: '© 2026 PabloG.Dev - Transformando ideas en negocios digitales.'
    },
    en: {
      copyright: '© 2026 PabloG.Dev - Transforming ideas into digital businesses.'
    }
  }

  const currentContent = content[language]

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      window.scrollTo(0, 0)
    }
  }

  const ariaLabel = {
    pt: 'Voltar ao topo',
    es: 'Volver arriba',
    en: 'Back to top'
  }

  return (
    <footer className="footer">
      <div className="footer__accent"></div>

      <div className="footer-container">
        <div className="footer-main">
          <img 
            src={logo} 
            alt="PabloG.Dev" 
            className="footer-logo" 
            loading="lazy"
            decoding="async"
          />
          <span className="footer-copyright">{currentContent.copyright}</span>
        </div>

        <button 
          onClick={scrollToTop} 
          className="footer-back-top" 
          aria-label={ariaLabel[language]}
        >
          <ChevronUp size={18} />
        </button>
      </div>
    </footer>
  )
}