import './About.css'
import logo from '../../assets/apenas-logo-pablogdev.png'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'
import { useEffect, useState } from 'react'

type AboutProps = {
  language: Language
}

export default function About({ language }: AboutProps) {
  const content = language === 'pt' ? pt : es
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  return (
    <section className="about" id="sobre">
      {/* Vídeo de fundo premium - Desktop */}
      {isDesktop && (
        <video
          className="about-video about-video-desktop"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/about-videopc.mp4" type="video/mp4" />
        </video>
      )}

      {/* Vídeo de fundo premium - Mobile */}
      {!isDesktop && (
        <video
          className="about-video about-video-mobile"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/about-video.mp4" type="video/mp4" />
        </video>
      )}

      {/* Elementos minimalistas - VERSÃO PONTOS */}
      <div className="about__dot-top"></div>
      <div className="about__dot-bottom"></div>
      <div className="about__ring"></div>
      <div className="about__line-short"></div>

      <div className="about-container">
        <span className="about-label">{content.about.badge}</span>
        <h2 className="about-title">
          {content.about.title}{' '}
          <span>{content.about.highlight}</span>
        </h2>

        <div className="about-grid">
          <div className="about-text">
            <p>{content.about.text1}</p>
            <p>{content.about.text2}</p>
          </div>

          <div className="about-logo">
            <img src={logo} alt="PabloG.Dev" />
          </div>
        </div>
      </div>
    </section>
  )
}