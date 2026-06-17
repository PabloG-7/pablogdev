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
  const whatsappMessage = language === 'pt'
    ? 'Olá! Quero profissionalizar meu negócio online.'
    : '¡Hola! Quiero profesionalizar mi negocio online.'

  const whatsappLink = `https://wa.me/5511961111894?text=${encodeURIComponent(whatsappMessage)}`

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
            {language === 'pt' ? 'Soluções digitais' : 'Soluciones digitales'}
          </p>

          <h1 className="hero-title">
            {language === 'pt' ? (
              <>Transforme seu negócio com <span>sites e sistemas</span></>
            ) : (
              <>Transforma tu negocio con <span>sitios y sistemas</span></>
            )}
          </h1>
          
          <p className="hero-text">
            {language === 'pt'
              ? 'Organize atendimentos, integre WhatsApp e profissionalize sua empresa.'
              : 'Organiza atenciones, integra WhatsApp y profesionaliza tu empresa.'}
          </p>

          <div className="hero-features">
            <span className="hero-feature">
              <MessageCircle size={14} />
              WhatsApp
            </span>
            <span className="hero-feature-divider">·</span>
            <span className="hero-feature">
              <Calendar size={14} />
              Agendamentos
            </span>
            <span className="hero-feature-divider">·</span>
            <span className="hero-feature">
              <Layout size={14} />
              Gestão
            </span>
            <span className="hero-feature-divider">·</span>
            <span className="hero-feature">
              <Zap size={14} />
              24/7
            </span>
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
            
            <button 
              onClick={onOpenGuide}
              className="hero-btn secondary"
            >
              Diagnóstico grátis
              <ClipboardList size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}