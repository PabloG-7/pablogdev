import './Footer.css'
import logo from '../../assets/apenas-logo.png'
import { Mail } from 'lucide-react'
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'

type FooterProps = {
  language: Language
}

export default function Footer({ language }: FooterProps) {
  const content = language === 'pt' ? pt : es
  const accentColor = content.footer.accentColor

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <img src={logo} alt="PabloG.Dev" className="footer-logo" />
            <div>
              <h3>
                Pablo<span style={{ color: accentColor }}>G</span>.Dev
              </h3>
              <p>{content.footer.text}</p>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-links-column">
              <h4 style={{ color: accentColor }}>{content.footer.contact}</h4>
              <div className="footer-contact-info">
                <a href="https://wa.me/5511961111894" target="_blank" rel="noreferrer">
                  <FaWhatsapp size={16} style={{ color: accentColor }} />
                  +55 11 96111-1894
                </a>
                <a href="mailto:pgdevsoftware@gmail.com">
                  <Mail size={16} style={{ color: accentColor }} />
                  pgdevsoftware@gmail.com
                </a>
              </div>
            </div>

            <div className="footer-links-column">
              <h4 style={{ color: accentColor }}>{content.footer.socialMedia}</h4>
              <div className="footer-contact-info">
                <a href="https://www.instagram.com/pablog.dev/" target="_blank" rel="noreferrer">
                  <FaInstagram size={16} style={{ color: accentColor }} />
                  @pablog.dev
                </a>
                <a href="https://www.facebook.com/profile.php?id=61579501306846" target="_blank" rel="noreferrer">
                  <FaFacebook size={16} style={{ color: accentColor }} />
                  Facebook Page
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{content.footer.copyright}</span>
        </div>
      </div>
    </footer>
  )
}