import { useLanguage } from '../../hooks/useLanguage'
import { useHeroSlider } from '../../hooks/useHeroSlider'
import './Hero.css'

export function Hero() {
  const { t, lang } = useLanguage()
  const { currentIndex, goToImage } = useHeroSlider(2, 4000)

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
    <header className="hero container">
      <div className="hero-left">
        <p dangerouslySetInnerHTML={{ __html: t('hero_subtext') }} />
      </div>

      <div className="hero-center">
        <div className="hero-tag-wrapper">
          <div className="hero-tag">{t('hero_tag')}</div>
        </div>

        <h1 
          className="hero-title" 
          dangerouslySetInnerHTML={{ __html: t('hero_title') }}
        />

        <div className="hero-image-wrapper">
          <div className="hero-circle"></div>
          
          <div className="hero-images-slider">
            <img 
              src="/images/image-1.png"
              alt="Profissional de tecnologia"
              className={`hero-person-img ${currentIndex === 0 ? 'active fade-in' : ''}`}
              data-index="0"
            />
            <img 
              src="/images/image-2.png"
              alt="Profissional de tecnologia"
              className={`hero-person-img ${currentIndex === 1 ? 'active fade-in' : ''}`}
              data-index="1"
            />
          </div>

          <div className="slider-indicators">
            <span 
              className={`slider-dot ${currentIndex === 0 ? 'active' : ''}`}
              data-index="0"
              onClick={() => goToImage(0)}
            />
            <span 
              className={`slider-dot ${currentIndex === 1 ? 'active' : ''}`}
              data-index="1"
              onClick={() => goToImage(1)}
            />
          </div>
        </div>

        <div className="hero-buttons">
          <a 
            href="#showcase" 
            className="btn-pill-primary"
          >
            {t('hero_btn_portfolio')}
          </a>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-outline"
          >
            {t('hero_btn_hire')}
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-stars">★★★★★</div>
        <h2>100%</h2>
        <p>{t('hero_exp_sub')}</p>
      </div>
    </header>
  )
}