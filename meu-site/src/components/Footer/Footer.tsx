import { useLanguage } from '../../hooks/useLanguage'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import './Footer.css'

export function Footer() {
  const { t, lang } = useLanguage()

  // Mensagem dinâmica conforme o idioma
  const getWhatsAppMessage = () => {
    const messages = {
      pt: 'Olá! Vim pelo site e gostaria de mais informações.',
      es: '¡Hola! Vine por el sitio y me gustaría obtener más información.',
      en: 'Hello! I came through the website and would like more information.'
    }
    return messages[lang] || messages.pt
  }

  const whatsappLink = `https://wa.me/5511961111894?text=${encodeURIComponent(getWhatsAppMessage())}`

  return (
    <footer className="footer">
      {/* Background Decorativo */}
      <div className="footer-bg" aria-hidden="true">
        <div className="footer-bg-circle footer-bg-circle-1"></div>
        <div className="footer-bg-circle footer-bg-circle-2"></div>
      </div>

      <div className="footer-container">
        {/* ===== TOPO - NEWSLETTER / CTA ===== */}
        <div className="footer-top">
          <div className="footer-cta">
            <h3 className="footer-cta-title">
              <span className="gold-g">{t('footer_cta_title_gold')}</span> {t('footer_cta_title_rest')}
            </h3>
            <p className="footer-cta-desc">
              {t('footer_cta_desc')}
            </p>
          </div>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-cta-btn"
          >
            <FaWhatsapp size={20} />
            {t('footer_cta_btn')}
          </a>
        </div>

        {/* ===== MEIO - GRID 4 COLUNAS ===== */}
        <div className="footer-middle">
          {/* Coluna 1 - Brand */}
          <div className="footer-col footer-col-brand">
            <div className="footer-logo">
              <img src="/images/logo.png" alt="PabloG.Dev" className="footer-logo-img" />
              <span className="footer-logo-text" aria-hidden="true">Pablo<span className="gold-g">G</span>.Dev</span>
            </div>
            <p className="footer-brand-desc">
              {t('footer_desc')}
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/pablog.dev/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61579501306846" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
                <FaFacebook />
              </a>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer_nav_title')}</h4>
            <ul className="footer-links">
              <li><a href="#home">{t('footer_nav_home')}</a></li>
              <li><a href="#services">{t('footer_nav_services')}</a></li>
              <li><a href="#showcase">{t('footer_nav_showcase')}</a></li>
              <li><a href="#about">{t('footer_nav_about')}</a></li>
              <li><a href="#faq">{t('footer_nav_faq')}</a></li>
            </ul>
          </div>

          {/* Coluna 3 - Serviços */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer_services_title')}</h4>
            <ul className="footer-links">
              <li><a href="#services">{t('footer_services_1')}</a></li>
              <li><a href="#services">{t('footer_services_2')}</a></li>
              <li><a href="#services">{t('footer_services_3')}</a></li>
              <li><a href="#services">{t('footer_services_4')}</a></li>
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div className="footer-col">
            <h4 className="footer-col-title">{t('footer_contact_title')}</h4>
            <ul className="footer-contact-list">
              <li>
                <FaWhatsapp className="footer-contact-icon" />
                <div>
                  <span className="footer-contact-label">{t('contact_wa_label')}</span>
                  <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="footer-contact-value"
                  >
                    {t('contact_wa')}
                  </a>
                </div>
              </li>
              <li>
                <MdEmail className="footer-contact-icon" />
                <div>
                  <span className="footer-contact-label">{t('contact_email_label')}</span>
                  <a href="mailto:pgdevsoftware@gmail.com" className="footer-contact-value">
                    {t('contact_email')}
                  </a>
                </div>
              </li>
              <li>
                <MdLocationOn className="footer-contact-icon" />
                <div>
                  <span className="footer-contact-label">{t('footer_location_label')}</span>
                  <span className="footer-contact-value">{t('footer_location')}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== BOTTOM - COPYRIGHT ===== */}
        <div className="footer-bottom">
          <p>
            &copy; 2026 <span className="gold-g">PabloG.Dev</span> — 
            {t('footer_copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}