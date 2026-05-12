import './Hero.css'
import { useState, useEffect } from 'react'
import heroDevices from '../../assets/hero-devices.png'
import logo from '../../assets/logo.png'
import { ArrowRight, Calendar, MessageCircle, Layout, Shield, Headphones, Lightbulb, Code, TrendingUp } from 'lucide-react'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'
import ProjectPreview from '../ProjectPreview/ProjectPreview'

type HeroProps = {
  language: Language
}

export default function Hero({ language }: HeroProps) {
  const content = language === 'pt' ? pt : es
  const [isMobile, setIsMobile] = useState(false)

  const whatsappMessage =
    language === 'pt'
      ? 'Olá! Vi o site da PabloG.Dev e quero entender a melhor solução para meu negócio.'
      : '¡Hola! Vi el sitio de PabloG.Dev y quiero entender la mejor solución para mi negocio.'

  const whatsappLink = `https://wa.me/5511961111894?text=${encodeURIComponent(whatsappMessage)}`

  // Detectar tela menor que 768px
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Gerar estrelas aleatórias
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3
  }))

  return (
    <section className="hero" id="inicio">
      {/* EFEITO DE ESTRELAS NO FUNDO */}
      <div className="hero__stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>

      {/* ELEMENTOS MINIMALISTAS */}
      <div className="hero__line-top"></div>
      <div className="hero__line-right"></div>
      <div className="hero__dot"></div>
      <div className="hero__wave"></div>

      {/* IMAGEM DE FUNDO - TROCA EM TELAS MENORES */}
      <img 
        src={isMobile ? logo : heroDevices} 
        alt="" 
        className="hero-bg-logo" 
        aria-hidden="true" 
      />
      
      <div className="hero-container">
        <div className="hero-content">
          {/* NOVO TÍTULO */}
          <h1 className="hero-title">
            {language === 'pt'
              ? 'Transforme seu atendimento com'
              : 'Transforma tu atención con'}{' '}
            <span className="hero-highlight">
              {language === 'pt' ? 'sites e sistemas' : 'sitios y sistemas'}
            </span>
          </h1>

          {/* NOVO SUBTÍTULO */}
          <p className="hero-text">
            {language === 'pt'
              ? 'Sites e sistemas para organizar atendimentos, integrar WhatsApp e deixar seu negócio mais profissional.'
              : 'Sitios y sistemas para organizar atenciones, integrar WhatsApp y dejar tu negocio más profesional.'}
          </p>

          {/* NOVAS FEATURES COM ÍCONES TROCADOS */}
          <div className="hero-features">
            <div className="feature">
              <Calendar size={18} />
              <span>
                {language === 'pt'
                  ? 'Agendamentos online'
                  : 'Agendamientos en línea'}
              </span>
            </div>

            <div className="feature">
              <MessageCircle size={18} />
              <span>
                {language === 'pt'
                  ? 'Integração com WhatsApp'
                  : 'Integración con WhatsApp'}
              </span>
            </div>

            <div className="feature">
              <Layout size={18} />
              <span>
                {language === 'pt'
                  ? 'Mais organização'
                  : 'Más organización'}
              </span>
            </div>

            <div className="feature">
              <Headphones size={18} />
              <span>
                {language === 'pt'
                  ? 'Suporte e acompanhamento'
                  : 'Soporte y acompañamiento'}
              </span>
            </div>
          </div>

          <div className="hero-actions">
            <a 
              href={whatsappLink}
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-btn primary"
            >
              Falar no WhatsApp
              <ArrowRight size={16} />
            </a>
            <ProjectPreview language={language} />
          </div>

          {/* NOVOS STATS */}
          <div className="hero-stats">
            <div className="stat">
              <Lightbulb size={18} color="#fec90f" />
              {language === 'pt'
                ? 'Atendimento'
                : 'Atención'}{' '}
              <span>
                {language === 'pt'
                  ? '→ Mais Organização'
                  : '→ Más Organización'}
              </span>
            </div>

            <div className="stat">
              <Code size={18} color="#fec90f" />
              {language === 'pt'
                ? 'Organização'
                : 'Organización'}{' '}
              <span>
                {language === 'pt'
                  ? '→ Mais praticidade'
                  : '→ Más practicidad'}
              </span>
            </div>

            <div className="stat">
              <TrendingUp size={18} color="#fec90f" />
              {language === 'pt'
                ? 'Negócio'
                : 'Negocio'}{' '}
              <span>
                {language === 'pt'
                  ? '→ Mais resultado'
                  : '→ Más resultados'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}