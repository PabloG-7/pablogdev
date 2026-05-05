import { useEffect } from 'react'
import './PabloGomesPage.css'
import logo from '../../assets/apenas-logo.png'
import type { Language } from '../../types'
import { ArrowLeft, Briefcase, Code, Calendar, Zap, Shield, ChevronRight, Star, Rocket, Smartphone, Target } from 'lucide-react'

type Props = {
  language: Language
}

export default function PabloGomesPage({ language }: Props) {
  const isPt = language === 'pt'

  // SEO: Atualizar title e description da página
  useEffect(() => {
    document.title = isPt
      ? 'Pablo Gomes | Criador da PabloG.Dev'
      : 'Pablo Gomes | Creador de PabloG.Dev'

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute(
        'content',
        isPt
          ? 'Pablo Gomes é o profissional por trás da PabloG.Dev, focada em sites profissionais, sistemas web e agendamentos online para empresas.'
          : 'Pablo Gomes es el profesional detrás de PabloG.Dev, enfocada en sitios web profesionales, sistemas web y reservas online para empresas.'
      )
    }
  }, [isPt])

  return (
    <main className="pablo-page">
      {/* Logo de fundo gigante */}
      <div className="pablo-bg-logo">
        <img src={logo} alt="" />
      </div>

      <section className="pablo-hero">
        <a href="/" className="pablo-back">
          <ArrowLeft size={16} />
          {isPt ? 'Acessar site principal' : 'Acceder al sitio principal'}
        </a>

        <div className="pablo-content">
          <div className="pablo-text-center">
            <span className="pablo-label">
              {isPt ? 'Desenvolvedor & Criador' : 'Desarrollador & Creador'}
            </span>

            <h1>
              Pablo Gomes
              <span>PabloG.Dev</span>
            </h1>

            <p>
              {isPt
                ? 'Desenvolvedor focado em criar soluções digitais sob medida para negócios. Especializado em sites profissionais, sistemas web e agendamentos online que resolvem problemas reais.'
                : 'Desarrollador enfocado en crear soluciones digitales a medida para negocios. Especializado en sitios web profesionales, sistemas web y reservas online que resuelven problemas reales.'}
            </p>

            <div className="pablo-actions">
              <a href="/#projetos" className="pablo-btn-primary">
                <Briefcase size={16} />
                {isPt ? 'Ver trabalhos e projetos' : 'Ver trabajos y proyectos'}
                <ChevronRight size={14} />
              </a>
            </div>

            {/* Social Links com palavras coloridas */}
<div className="pablo-social-text">
  <a href="https://github.com/pablog-7" target="_blank" rel="noopener noreferrer" className="social-github">
    GitHub
  </a>
  <span className="social-separator">•</span>
  <a href="https://www.linkedin.com/in/pablogomesdev/" target="_blank" rel="noopener noreferrer" className="social-linkedin">
    LinkedIn
  </a>
  <span className="social-separator">•</span>
  <a href="https://www.instagram.com/pablog.dev/" target="_blank" rel="noopener noreferrer" className="social-instagram">
    Instagram
  </a>
  <span className="social-separator">•</span>
  <a href="https://www.facebook.com/profile.php?id=61579501306846" target="_blank" rel="noopener noreferrer" className="social-facebook">
    Facebook
  </a>
  <span className="social-separator">•</span>
  <a href="mailto:pgdevsoftware@gmail.com" className="social-email">
    E-mail
  </a>
</div>
          </div>
        </div>
      </section>

      <section className="pablo-info">
        <div className="pablo-info-header">
          <Shield size={32} className="pablo-info-icon" />
          <h2>{isPt ? 'O que eu faço' : 'Lo que hago'}</h2>
          <p>
            {isPt
              ? 'Soluções digitais completas para empresas que querem crescer com mais presença e organização.'
              : 'Soluciones digitales completas para empresas que quieren crecer con más presencia y organización.'}
          </p>
        </div>

        <div className="pablo-grid">
          <div className="pablo-grid-card">
            <div className="pablo-grid-icon">
              <Code size={24} />
            </div>
            <h3>{isPt ? 'Sites profissionais' : 'Sitios profesionales'}</h3>
            <p>{isPt ? 'Landing pages, institucionais e e-commerces responsivos.' : 'Landing pages, institucionales y e-commerces responsivos.'}</p>
          </div>

          <div className="pablo-grid-card">
            <div className="pablo-grid-icon">
              <Zap size={24} />
            </div>
            <h3>{isPt ? 'Sistemas web' : 'Sistemas web'}</h3>
            <p>{isPt ? 'Painéis administrativos, automações e integrações.' : 'Paneles administrativos, automatizaciones e integraciones.'}</p>
          </div>

          <div className="pablo-grid-card">
            <div className="pablo-grid-icon">
              <Calendar size={24} />
            </div>
            <h3>{isPt ? 'Agendamentos' : 'Agendamientos'}</h3>
            <p>{isPt ? 'Sistema completo de reservas para serviços.' : 'Sistema completo de reservas para servicios.'}</p>
          </div>
        </div>

        <div className="pablo-diff">
          <div className="pablo-diff-item">
            <Rocket size={20} />
            <div>
              <strong>{isPt ? 'Performance' : 'Rendimiento'}</strong>
              <span>{isPt ? 'Sites rápidos' : 'Sitios rápidos'}</span>
            </div>
          </div>
          <div className="pablo-diff-item">
            <Smartphone size={20} />
            <div>
              <strong>{isPt ? 'Responsivo' : 'Responsivo'}</strong>
              <span>{isPt ? 'Todas as telas' : 'Todas las pantallas'}</span>
            </div>
          </div>
          <div className="pablo-diff-item">
            <Target size={20} />
            <div>
              <strong>{isPt ? 'Sob medida' : 'A medida'}</strong>
              <span>{isPt ? 'Para seu negócio' : 'Para tu negocio'}</span>
            </div>
          </div>
        </div>

        <div className="pablo-note">
          <Star size={14} />
          <p>
            {isPt
              ? 'Em construção — novos projetos serão adicionados em breve.'
              : 'En construcción — nuevos proyectos serán agregados pronto.'}
          </p>
        </div>

        <div className="pablo-cta">
          <a href="/" className="pablo-cta-button">
            {isPt ? 'Acessar site principal' : 'Acceder al sitio principal'}
            <ChevronRight size={16} />
          </a>
        </div>
      </section>
    </main>
  )
}