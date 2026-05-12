import './Footer.css'
import logo from '../../assets/apenas-logo.png'
import { Mail, ChevronUp } from 'lucide-react'
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'

type FooterProps = {
  language: Language
}

export default function Footer({ language }: FooterProps) {
  const content = language === 'pt' ? pt : es

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      {/* Linha decorativa superior */}
      <div className="footer__accent"></div>
      
      {/* Traços minimalistas decorativos */}
      <div className="footer__dash-1"></div>
      <div className="footer__dash-2"></div>

      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo-wrapper">
              <img src={logo} alt="PabloG.Dev" className="footer-logo" />
              <div className="footer-logo-glow"></div>
            </div>
            <div>
              <h3>
                Pablo<span>G</span>.Dev
              </h3>
              <p>{content.footer.text}</p>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h4>
                <span className="footer-link-icon"></span>
                {content.footer.contact}
              </h4>
              <div className="footer-contact-info">
                <a href="https://wa.me/5511961111894" target="_blank" rel="noreferrer">
                  <div className="footer-icon-bg">
                    <FaWhatsapp size={14} />
                  </div>
                  <span>+55 11 96111-1894</span>
                </a>
                <a href="mailto:pgdevsoftware@gmail.com">
                  <div className="footer-icon-bg">
                    <Mail size={14} />
                  </div>
                  <span>pgdevsoftware@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="footer-links-column">
              <h4>
                <span className="footer-link-icon"></span>
                {content.footer.socialMedia}
              </h4>
              <div className="footer-contact-info">
                <a href="https://www.instagram.com/pablog.dev/" target="_blank" rel="noreferrer">
                  <div className="footer-icon-bg">
                    <FaInstagram size={14} />
                  </div>
                  <span>@pablog.dev</span>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61579501306846" target="_blank" rel="noreferrer">
                  <div className="footer-icon-bg">
                    <FaFacebook size={14} />
                  </div>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{content.footer.copyright}</span>
          <button onClick={scrollToTop} className="footer-back-top" aria-label="Voltar ao topo">
            <ChevronUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  )
}