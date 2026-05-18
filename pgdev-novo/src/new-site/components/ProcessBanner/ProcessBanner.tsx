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
        image: '/banner-1.webp',
        mobileImage: '/banner-1mobile.webp',
        alt: 'Atendimento rápido pelo WhatsApp',
      },
      {
        id: 2,
        image: '/banner-2.webp',
        mobileImage: '/banner-2mobile.webp',
        alt: 'Agendamentos online',
      },
      {
        id: 3,
        image: '/banner-3.webp',
        mobileImage: '/banner-3mobile.webp',
        alt: 'Experiência tipo app',
      },
      {
        id: 4,
        image: '/banner-4.webp',
        mobileImage: '/banner-4mobile.webp',
        alt: 'Sites profissionais',
      },
    ]

    const esBanners = [
      { id: 1, image: '/banneres-1.webp', alt: 'Atención rápida por WhatsApp' },
      { id: 2, image: '/banneres-2.webp', alt: 'Agendamientos online' },
      { id: 3, image: '/banneres-3.webp', alt: 'Experiencia tipo app' },
      { id: 4, image: '/banneres-4.webp', alt: 'Sitios profesionales' },
    ]

    return language === 'es' ? esBanners : ptBanners
  }, [language])

  useEffect(() => {
    setCurrentIndex(0)
  }, [language])

  useEffect(() => {
    const preloadImages = () => {
      ads.slice(1).forEach((ad) => {
        const desktopImg = new Image()
        desktopImg.src = ad.image

        // Só preload mobileImage se existir (para banners ES que não têm)
        if (ad.mobileImage) {
          const mobileImg = new Image()
          mobileImg.src = ad.mobileImage
        }
      })
    }

    const timeout = window.setTimeout(preloadImages, 1000)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [ads])

  useEffect(() => {
    if (ads.length <= 1) return

    const interval = window.setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length)
    }, 6000)

    return () => window.clearInterval(interval)
  }, [ads.length])

  const nextAd = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length)
  }

  const prevAd = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length)
  }

  const currentAd = ads[currentIndex]

  return (
    <section className="process-banner" aria-label="Banners de serviços">
      <div className="container">
        <div className="carousel-container">
          <button
            type="button"
            className="carousel-btn carousel-btn--prev"
            onClick={prevAd}
            aria-label={language === 'es' ? 'Banner anterior' : 'Banner anterior'}
          >
            ←
          </button>

          <div className="carousel-slide">
            <picture>
              {currentAd.mobileImage && (
                <source
                  media="(max-width: 768px)"
                  srcSet={currentAd.mobileImage}
                />
              )}
              <img
                key={currentAd.image}
                src={currentAd.image}
                alt={currentAd.alt}
                className="process-image"
                loading={currentIndex === 0 ? 'eager' : 'lazy'}
                fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
                decoding="async"
                width="1536"
                height="864"
              />
            </picture>
          </div>

          <button
            type="button"
            className="carousel-btn carousel-btn--next"
            onClick={nextAd}
            aria-label={language === 'es' ? 'Siguiente banner' : 'Próximo banner'}
          >
            →
          </button>
        </div>

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
      </div>
    </section>
  )
}

export default ProcessBanner