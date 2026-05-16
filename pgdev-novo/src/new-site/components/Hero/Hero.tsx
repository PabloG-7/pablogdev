import './Hero.css'
import heroDevices from '../../assets/hero-devices.png'
import logo from '../../assets/logo.png'
import { ArrowRight, Calendar, MessageCircle, Layout, Headphones, Globe, Calendar as CalendarIcon, Settings2 } from 'lucide-react'
import type { Language } from '../../types'
import ProjectPreview from '../ProjectPreview/ProjectPreview'

type HeroProps = {
  language: Language
}

export default function Hero({ language }: HeroProps) {
  const whatsappMessage =
    language === 'pt'
      ? 'Olá! Vi o site da PabloG.Dev e quero entender a melhor solução para meu negócio.'
      : '¡Hola! Vi el sitio de PabloG.Dev y quiero entender la mejor solución para mi negocio.'

  const whatsappLink = `https://wa.me/5511961111894?text=${encodeURIComponent(whatsappMessage)}`

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

      {/* IMAGEM DE FUNDO - DESKTOP */}
      <img 
        src={heroDevices}
        alt="" 
        className="hero-bg-logo hero-bg-logo--desktop" 
        aria-hidden="true" 
      />

      {/* IMAGEM DE FUNDO - MOBILE */}
      <img 
        src={logo}
        alt="" 
        className="hero-bg-logo hero-bg-logo--mobile" 
        aria-hidden="true" 
      />
      
      <div className="hero-container">
        <div className="hero-content">
          {/* NOVO TÍTULO */}
          <h1 className="hero-title">
            {language === 'pt'
              ? 'Transforme seu atendimento e vendas com'
              : 'Transforma tu atención y ventas con'}{' '}
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

          {/* STATS MELHORADOS - CLEAN & DIRETO */}
          <div className="hero-stats">
            <div className="stat">
              <Globe size={16} />
              <div className="stat-info">
                <strong>{language === 'pt' ? 'Sites' : 'Sitios'}</strong>
                <p>
                  {language === 'pt'
                    ? 'Sem presença online → Mais autoridade'
                    : 'Sin presencia online → Más autoridad'}
                </p>
              </div>
            </div>

            <div className="stat">
              <CalendarIcon size={16} />
              <div className="stat-info">
                <strong>{language === 'pt' ? 'Agendamentos' : 'Reservas'}</strong>
                <p>
                  {language === 'pt'
                    ? 'Horários bagunçados → Mais organização'
                    : 'Horarios desorganizados → Más organización'}
                </p>
              </div>
            </div>

            <div className="stat">
              <Settings2 size={16} />
              <div className="stat-info">
                <strong>{language === 'pt' ? 'Sistemas' : 'Sistemas'}</strong>
                <p>
                  {language === 'pt'
                    ? 'Controle manual → Mais praticidade'
                    : 'Control manual → Más practicidad'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}