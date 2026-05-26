import './Hero.css'
import heroDevices from '../../assets/hero-devices.png'
import logo from '../../assets/logo.png'
import { ArrowRight, MessageCircle, Calendar, Layout, Zap } from 'lucide-react'
import type { Language } from '../../types'
import ProjectPreview from '../ProjectPreview/ProjectPreview'

type HeroProps = {
  language: Language
}

export default function Hero({ language }: HeroProps) {
  const whatsappMessage = language === 'pt'
    ? 'Olá! Quero profissionalizar meu negócio online.'
    : '¡Hola! Quiero profesionalizar mi negocio online.'

  const whatsappLink = `https://wa.me/5511961111894?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <section className="hero" id="inicio">
      {/* IMAGEM DE FUNDO */}
      <img 
        src={heroDevices}
        alt="" 
        className="hero-bg-logo hero-bg-logo--desktop" 
        aria-hidden="true" 
      />
      <img 
        src={logo}
        alt="" 
        className="hero-bg-logo hero-bg-logo--mobile" 
        aria-hidden="true" 
      />
      
      <div className="hero-container">
        <div className="hero-content">
          {/* BADGE */}
          <span className="hero-label">
            {language === 'pt' ? 'SOLUÇÕES DIGITAIS' : 'SOLUCIONES DIGITALES'}
          </span>

          {/* TÍTULO */}
          <h1 className="hero-title">
            {language === 'pt' ? (
              <>Transforme seu negócio com <span>sites e sistemas</span></>
            ) : (
              <>Transforma tu negocio con <span>sitios y sistemas</span></>
            )}
          </h1>
          
          {/* SUBTÍTULO */}
          <p className="hero-text">
            {language === 'pt'
              ? 'Soluções digitais que organizam atendimentos, integram WhatsApp e profissionalizam sua empresa 24/7.'
              : 'Soluciones digitales que organizan atenciones, integran WhatsApp y profesionalizan tu empresa 24/7.'}
          </p>

          {/* FEATURES */}
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

          {/* AÇÕES */}
          <div className="hero-actions">
            <a 
              href={whatsappLink}
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-btn primary"
            >
              {language === 'pt' ? 'FALAR NO WHATSAPP' : 'HABLAR POR WHATSAPP'}
              <ArrowRight size={16} />
            </a>
            <ProjectPreview language={language} />
          </div>
        </div>
      </div>
    </section>
  )
}