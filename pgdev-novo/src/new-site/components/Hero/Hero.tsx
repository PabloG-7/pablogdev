import './Hero.css'
import heroBackground from '../../assets/hero-background.webp'
import { ArrowRight, MessageCircle, Calendar, Layout, Zap } from 'lucide-react'
import type { Language } from '../../types'
import { ClipboardList } from 'lucide-react'

type HeroProps = {
  language: Language
  onOpenGuide: () => void
}

export default function Hero({ language, onOpenGuide }: HeroProps) {
  const whatsappMessage = {
    pt: 'Olá! Quero profissionalizar meu negócio online.',
    es: '¡Hola! Quiero profesionalizar mi negocio online.',
    en: 'Hello! I want to professionalize my online business.'
  }

  const whatsappLink = `https://wa.me/5511961111894?text=${encodeURIComponent(whatsappMessage[language])}`

  const content = {
    pt: {
      label: 'Soluções digitais',
      title: <>Transforme seu negócio com <span>sites e sistemas</span></>,
      text: 'Organize atendimentos, integre WhatsApp e profissionalize seu negócio.',
      features: ['WhatsApp', 'Agendamentos', 'Gestão', '24/7'],
      ctaPrimary: 'Falar no WhatsApp',
      ctaSecondary: 'Diagnóstico grátis'
    },
    es: {
      label: 'Soluciones digitales',
      title: <>Transforma tu negocio con <span>sitios y sistemas</span></>,
      text: 'Organiza atenciones, integra WhatsApp y profesionaliza tu negocio.',
      features: ['WhatsApp', 'Agendamientos', 'Gestión', '24/7'],
      ctaPrimary: 'Hablar por WhatsApp',
      ctaSecondary: 'Diagnóstico gratis'
    },
    en: {
      label: 'Digital Solutions',
      title: <>Transform your business with <span>websites and systems</span></>,
      text: 'Organize appointments, integrate WhatsApp and professionalize your business.',
      features: ['WhatsApp', 'Scheduling', 'Management', '24/7'],
      ctaPrimary: 'Talk on WhatsApp',
      ctaSecondary: 'Free Diagnosis'
    }
  }

  const currentContent = content[language]

  return (
    <section className="hero" id="inicio">
      <div 
        className="hero-background"
        style={{
          backgroundImage: `url(${heroBackground})`
        }}
      />
      
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-label">
            {currentContent.label}
          </p>

          <h1 className="hero-title">
            {currentContent.title}
          </h1>
          
          <p className="hero-text">
            {currentContent.text}
          </p>

          <div className="hero-features">
            <span className="hero-feature">
              <MessageCircle size={14} />
              {currentContent.features[0]}
            </span>
            <span className="hero-feature-divider">·</span>
            <span className="hero-feature">
              <Calendar size={14} />
              {currentContent.features[1]}
            </span>
            <span className="hero-feature-divider">·</span>
            <span className="hero-feature">
              <Layout size={14} />
              {currentContent.features[2]}
            </span>
            <span className="hero-feature-divider">·</span>
            <span className="hero-feature">
              <Zap size={14} />
              {currentContent.features[3]}
            </span>
          </div>

          <div className="hero-actions">
            <a 
              href={whatsappLink}
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-btn primary"
            >
              {currentContent.ctaPrimary}
              <ArrowRight size={16} />
            </a>
            
            <button 
              onClick={onOpenGuide}
              className="hero-btn secondary"
            >
              {currentContent.ctaSecondary}
              <ClipboardList size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}