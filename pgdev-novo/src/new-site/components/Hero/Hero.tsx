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
      {/* Camada de fundo cinematográfica - com estilo inline para funcionar no Vite */}
      <div 
        className="hero-background"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(0, 12, 36, 0.55) 0%,
              rgba(0, 12, 36, 0.45) 50%,
              rgba(0, 12, 36, 0.35) 100%
            ),
            url(${heroBackground})
          `
        }}
      />
      
    
      
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-label">
            {language === 'pt' ? 'SOLUÇÕES DIGITAIS' : 'SOLUCIONES DIGITALES'}
          </span>

          <h1 className="hero-title">
            {language === 'pt' ? (
              <>Transforme seu negócio com <span>sites e sistemas</span></>
            ) : (
              <>Transforma tu negocio con <span>sitios y sistemas</span></>
            )}
          </h1>
          
          <p className="hero-text">
            {language === 'pt'
              ? 'Soluções digitais que organizam atendimentos, integram WhatsApp e profissionalizam sua empresa 24/7.'
              : 'Soluciones digitales que organizan atenciones, integran WhatsApp y profesionalizan tu empresa 24/7.'}
          </p>

          <div className="hero-features">
            <div className="hero-feature">
              <MessageCircle size={16} />
              <span>{language === 'pt' ? 'WhatsApp integrado' : 'WhatsApp integrado'}</span>
            </div>
            <div className="hero-feature">
              <Calendar size={16} />
              <span>{language === 'pt' ? 'Agendamentos online' : 'Agendamientos online'}</span>
            </div>
            <div className="hero-feature">
              <Layout size={16} />
              <span>{language === 'pt' ? 'Gestão simplificada' : 'Gestión simplificada'}</span>
            </div>
            <div className="hero-feature">
              <Zap size={16} />
              <span>{language === 'pt' ? 'Atendimento 24/7' : 'Atención 24/7'}</span>
            </div>
          </div>

          {/* BOTÕES - WHATSAPP PRIMEIRO */}
          <div className="hero-actions">
            <a 
              href={whatsappLink}
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-btn primary"
            >
              <MessageCircle size={16} />
              {language === 'pt' ? 'FALAR NO WHATSAPP' : 'HABLAR POR WHATSAPP'}
              <ArrowRight size={16} />
            </a>
            
            <button 
              onClick={onOpenGuide}
              className="hero-btn secondary"
            >
              <ClipboardList size={16} />
              {language === 'pt' ? 'DIAGNÓSTICO GRÁTIS' : 'DIAGNÓSTICO GRATIS'}
            </button>
          </div>
        </div>
      </div>

      
    </section>
  )
}