import { ArrowRight, BadgeCheck, Globe2, ShieldCheck, Smartphone, TrendingUp } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import type { Language } from '../../types'
import './SiteExperience.css'
import { LayoutTemplate } from 'lucide-react'


type Props = {
  language: Language
}

export default function SiteExperience({ language }: Props) {
  const isPt = language === 'pt'

  return (
    <section className="site-experience" id="site-profissional">
      <div className="site-exp-container">
        {/* LEFT SIDE */}
        <div className="site-exp-content">
          <span className="site-exp-label">
            <LayoutTemplate size={14} />
            {isPt ? 'PRESENÇA PROFISSIONAL' : 'PRESENCIA PROFESIONAL'}
          </span>

          <h2>
            {isPt
              ? 'Seu negócio precisa parecer premium.'
              : 'Tu negocio necesita parecer premium.'}
          </h2>

          <p>
            {isPt
              ? 'Hoje as pessoas julgam sua empresa em segundos. Um site profissional aumenta confiança, melhora sua imagem e faz o cliente sentir que está falando com um negócio sério.'
              : 'Hoy las personas juzgan tu empresa en segundos. Un sitio profesional aumenta la confianza y hace que tu negocio se vea serio.'}
          </p>

          <div className="site-exp-benefits">
            <div>
              <ShieldCheck size={16} />
              <span>{isPt ? 'Mais credibilidade' : 'Más credibilidad'}</span>
            </div>
            <div>
              <TrendingUp size={16} />
              <span>{isPt ? 'Mais conversão' : 'Más conversión'}</span>
            </div>
            <div>
              <FaWhatsapp size={14} />
              <span>{isPt ? 'WhatsApp integrado' : 'WhatsApp integrado'}</span>
            </div>
          </div>

          <a href="#contato" className="site-exp-button">
            {isPt ? 'QUERO UM SITE PROFISSIONAL' : 'QUIERO UN SITIO PROFESIONAL'}
            <ArrowRight size={16} />
          </a>
        </div>

        {/* RIGHT SIDE - MOCKUP */}
        <div className="site-exp-mockup">
          {/* Browser Mockup */}
          <div className="browser-mockup">
            <div className="browser-bar">
              <div className="browser-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>www.seusite.com.br</p>
            </div>

            <div className="browser-content">
              <div className="browser-header">
                <strong>PabloG.Dev</strong>
                <nav>
                  <span>{isPt ? 'Início' : 'Inicio'}</span>
                  <span>{isPt ? 'Serviços' : 'Servicios'}</span>
                  <span>{isPt ? 'Contato' : 'Contacto'}</span>
                </nav>
              </div>

              <div className="browser-hero">
                <div className="browser-hero-left">
                  <span className="hero-tag">
                    <BadgeCheck size={10} />
                    {isPt ? 'SITE PROFISSIONAL' : 'SITIO PROFESIONAL'}
                  </span>
                  <h3>
                    {isPt
                      ? 'Transforme visitantes em clientes'
                      : 'Transforma visitantes en clientes'}
                  </h3>
                  <p>
                    {isPt
                      ? 'Sites modernos, rápidos e preparados para vender.'
                      : 'Sitios modernos, rápidos y preparados para vender.'}
                  </p>
                  <button className="whatsapp-btn">
                    <FaWhatsapp size={14} />
                    WhatsApp
                  </button>
                </div>
                <div className="browser-hero-right">
                  <div className="globe-icon">
                    <Globe2 size={28} />
                  </div>
                </div>
              </div>

              <div className="browser-stats">
                <div>
                  <strong>24h</strong>
                  <span>{isPt ? 'Contato rápido' : 'Contacto rápido'}</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>{isPt ? 'Responsivo' : 'Responsivo'}</span>
                </div>
                <div>
                  <strong>+Visual</strong>
                  <span>{isPt ? 'Premium' : 'Premium'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="phone-mockup">
            <div className="phone-inner">
              <div className="phone-header">
                <Smartphone size={14} />
                <span>Mobile</span>
              </div>
              <div className="phone-chat">
                <div className="chat-message">
                  {isPt
                    ? 'Olá, gostaria de um orçamento.'
                    : 'Hola, quiero un presupuesto.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}