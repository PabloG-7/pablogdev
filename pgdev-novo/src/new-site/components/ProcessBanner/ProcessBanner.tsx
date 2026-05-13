import { useEffect, useMemo, useState } from 'react'
import './ProcessBanner.css'
import type { Language } from '../../types'

type ProcessBannerProps = {
  language: Language
}

function ProcessBanner({ language }: ProcessBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const ads = useMemo(() => {
    const ptBanners = [
      {
        id: 1,
        image: '/banner-1.png',
        alt: 'Atendimento rápido pelo WhatsApp',
      },
      {
        id: 2,
        image: '/banner-2.png',
        alt: 'Agendamentos online',
      },
      {
        id: 3,
        image: '/banner-3.png',
        alt: 'Experiência tipo app',
      },
      {
        id: 4,
        image: '/banner-4.png',
        alt: 'Sites profissionais',
      },
    ]

    const esBanners = [
      {
        id: 1,
        image: '/banneres-1.png',
        alt: 'Atención rápida por WhatsApp',
      },
      {
        id: 2,
        image: '/banneres-2.png',
        alt: 'Agendamientos online',
      },
      {
        id: 3,
        image: '/banneres-3.png',
        alt: 'Experiencia tipo app',
      },
      {
        id: 4,
        image: '/banneres-4.png',
        alt: 'Sitios profesionales',
      },
    ]

    return language === 'es' ? esBanners : ptBanners
  }, [language])

  // Resetar índice quando o idioma mudar
  useEffect(() => {
    setCurrentIndex(0)
  }, [language])

  // Pré-carregar imagens
  useEffect(() => {
    ads.forEach((ad) => {
      const img = new Image()
      img.src = ad.image
    })
  }, [ads])

  // Auto-play do carrossel (só funciona se tiver mais de 1 banner)
  useEffect(() => {
    if (ads.length <= 1) return
    
    const interval = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [ads.length])

  const nextAd = () => {
    if (ads.length <= 1) return
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length)
  }

  const prevAd = () => {
    if (ads.length <= 1) return
    setCurrentIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length)
  }

  return (
    <section className="process-banner">
      <div className="container">
        <div className="carousel-container">
          {ads.length > 1 && (
            <button
              type="button"
              className="carousel-btn carousel-btn--prev"
              onClick={prevAd}
              aria-label={language === 'es' ? 'Banner anterior' : 'Banner anterior'}
            >
              ←
            </button>
          )}

          <div className="carousel-slide">
            <img
              src={ads[currentIndex].image}
              alt={ads[currentIndex].alt}
              className="process-image"
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>

          {ads.length > 1 && (
            <button
              type="button"
              className="carousel-btn carousel-btn--next"
              onClick={nextAd}
              aria-label={language === 'es' ? 'Siguiente banner' : 'Próximo banner'}
            >
              →
            </button>
          )}
        </div>

        {ads.length > 1 && (
          <div className="carousel-dots">
            {ads.map((ad, index) => (
              <button
                type="button"
                key={ad.id}
                className={`dot ${index === currentIndex ? 'dot--active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`${language === 'es' ? 'Ver banner' : 'Ver banner'} ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProcessBanner