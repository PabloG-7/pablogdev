import { useLanguage } from '../../hooks/useLanguage'
import './About.css'

export function About() {
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

  // Link direto para o WhatsApp
  const whatsappLink = `https://wa.me/5511961111894?text=${encodeURIComponent(getWhatsAppMessage())}`

  return (
    <section className="about-section">
      <div className="about-container container">
        <div className="about-content">
          <div className="about-tag">
            <span className="about-tag-bracket">[</span>
            {t('about_subtitle')}
            <span className="about-tag-bracket">]</span>
          </div>

          <h2 className="about-title">
            Pablo<span className="gold-g">G</span>.Dev
          </h2>

          <div className="about-underline"></div>

          <p 
            className="about-text" 
            dangerouslySetInnerHTML={{ __html: t('about_desc_1') }}
          />

          <p 
            className="about-text" 
            dangerouslySetInnerHTML={{ __html: t('about_desc_2') }}
          />

          <div className="about-divider"></div>

          <div className="about-services">
            <div className="about-service">
              <span className="about-service-num">01</span>
              <span className="about-service-text">{t('about_service_1')}</span>
            </div>
            <div className="about-service">
              <span className="about-service-num">02</span>
              <span className="about-service-text">{t('about_service_2')}</span>
            </div>
            <div className="about-service">
              <span className="about-service-num">03</span>
              <span className="about-service-text">{t('about_service_3')}</span>
            </div>
          </div>

          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="about-cta"
          >
            {t('about_cta')}
          </a>
        </div>

        <div className="about-visual">
          <div className="about-3d-wrapper">
            <div className="about-3d-bg-logo">
              <img src="images/logo.png" alt="PabloG.Dev Logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}