import './Footer.css'
import logo from '../../assets/apple-touch-icon.png'
import { ChevronUp } from 'lucide-react'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'

type FooterProps = {
  language: Language
}

export default function Footer({ language }: FooterProps) {
  const content = language === 'pt' ? pt : es

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      window.scrollTo(0, 0)
    }
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
          <span className="footer-copyright">{content.footer.copyright}</span>
        </div>

        <button 
          onClick={scrollToTop} 
          className="footer-back-top" 
          aria-label={language === 'pt' ? 'Voltar ao topo' : 'Volver arriba'}
        >
          <ChevronUp size={18} />
        </button>
      </div>
    </footer>
  )
}