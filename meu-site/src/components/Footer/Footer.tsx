import { useLanguage } from '../../hooks/useLanguage'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import './Footer.css'

export function Footer() {
  const { t, lang } = useLanguage()

  const getWhatsAppMessage = () => {
    const messages = {
      pt: 'Olá! Vim pelo site e gostaria de mais informações.',
      es: '¡Hola! Vine por el sitio y me gustaría obtener más información.',
      en: 'Hello! I came through the website and would like more information.'
    }

    return messages[lang] || messages.pt
  }

  const whatsappLink =
    `https://wa.me/5511961111894?text=${encodeURIComponent(getWhatsAppMessage())}`

  return (
    <footer className="footer">

      {/* texto gigante decorativo */}
      <div className="footer-watermark" aria-hidden="true">
        PABLOG.DEV
      </div>

      <div className="footer-container">

        <div className="footer-main">

          {/* MARCA */}
          <div className="footer-brand">

            <a href="#home" className="footer-logo">
              <img
                src="/images/logo.png"
                alt="PabloG.Dev"
              />

              <span>
                PABLO<span>G</span>.DEV
              </span>
            </a>

            <p>
              {t('footer_desc')}
            </p>

          </div>

          {/* NAVEGAÇÃO */}
          <nav
            className="footer-nav"
            aria-label={t('footer_nav_aria')}
          >
            <a href="#home">{t('footer_nav_home')}</a>
            <a href="#services">{t('footer_nav_services')}</a>
            <a href="#showcase">{t('footer_nav_showcase')}</a>
            <a href="#about">{t('footer_nav_about')}</a>
            <a href="#process">{t('footer_nav_process')}</a>
            <a href="#faq">{t('footer_nav_faq')}</a>
          </nav>

          {/* REDES */}
          <div className="footer-social">

            <a
              href="https://www.instagram.com/pablog.dev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61579501306846"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

          </div>

        </div>

        {/* LINHA */}
        <div className="footer-divider">
          <span />
        </div>

        {/* FINAL */}
        <div className="footer-bottom">

          <p>
            © 2026 <strong>PabloG.Dev</strong>
          </p>

          <div className="footer-signature">
            <span>{t('footer_signature_design')}</span>
            <i />
            <span>{t('footer_signature_code')}</span>
            <i />
            <span>{t('footer_signature_experience')}</span>
          </div>

          <div className="footer-location">
            <span className="status-dot" />
            {t('footer_location_short')}
          </div>

        </div>

      </div>

    </footer>
  )
}