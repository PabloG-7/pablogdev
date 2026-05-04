import './PabloGomesPage.css'
import logo from '../../assets/logo.png'
import type { Language } from '../../types'
import { ArrowLeft, Briefcase, Code, Calendar, Zap, Shield, ChevronRight, Star, Users, Smartphone } from 'lucide-react'

type Props = {
  language: Language
}

export default function PabloGomesPage({ language }: Props) {
  const isPt = language === 'pt'

  return (
    <main className="pablo-page">
      <section className="pablo-hero">
        <a href="/" className="pablo-back">
          <ArrowLeft size={16} />
          {isPt ? 'Acessar site oficial PabloG.Dev' : 'Acceder al sitio oficial PabloG.Dev'}
        </a>

        <div className="pablo-content">
          <div>
            <span className="pablo-label">
              {isPt ? 'Criador da PabloG.Dev' : 'Creador de PabloG.Dev'}
            </span>

            <h1>
              Pablo Gomes <span>PabloG.Dev</span>
            </h1>

            <p>
              {isPt
                ? 'Pablo Gomes é o profissional por trás da PabloG.Dev, marca focada na criação de sites profissionais, sistemas web, agendamentos online e automações para empresas no Brasil e na América do Sul.'
                : 'Pablo Gomes es el profesional detrás de PabloG.Dev, marca enfocada en la creación de sitios web profesionales, sistemas, agendamientos online y automatizaciones para empresas en Brasil y América del Sur.'}
            </p>

            <div className="pablo-actions">
              <a href="/">
                <Briefcase size={16} />
                {isPt ? 'Ver trabalhos e soluções' : 'Ver trabajos y soluciones'}
              </a>

              <a href="https://github.com/pablog-7" target="_blank" rel="noopener noreferrer">
                <Code size={16} />
                GitHub
              </a>
            </div>

            {/* Stats rápidos */}
            <div className="pablo-stats">
              <div className="pablo-stat">
                <Star size={18} />
                <div>
                  <strong>+50</strong>
                  <span>{isPt ? 'projetos entregues' : 'proyectos entregados'}</span>
                </div>
              </div>
              <div className="pablo-stat">
                <Users size={18} />
                <div>
                  <strong>+30</strong>
                  <span>{isPt ? 'clientes atendidos' : 'clientes atendidos'}</span>
                </div>
              </div>
              <div className="pablo-stat">
                <Smartphone size={18} />
                <div>
                  <strong>100%</strong>
                  <span>{isPt ? 'responsivo' : 'responsivo'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pablo-card">
            <img src={logo} alt="PabloG.Dev - Pablo Gomes" />
            <h2>PabloG.Dev</h2>
            <p>
              {isPt
                ? 'Site oficial com projetos, demonstrações e soluções digitais criadas para empresas que querem crescer com mais presença e organização.'
                : 'Sitio oficial con proyectos, demostraciones y soluciones digitales creadas para empresas que quieren crecer con más presencia y organización.'}
            </p>

            <div className="pablo-card-features">
              <div className="pablo-card-feature">
                <Code size={14} />
                <span>{isPt ? 'Sites profissionais' : 'Sitios profesionales'}</span>
              </div>
              <div className="pablo-card-feature">
                <Calendar size={14} />
                <span>{isPt ? 'Agendamentos' : 'Agendamientos'}</span>
              </div>
              <div className="pablo-card-feature">
                <Zap size={14} />
                <span>{isPt ? 'Automações' : 'Automatizaciones'}</span>
              </div>
            </div>

            <a href="/" className="pablo-main-link">
              {isPt ? 'Ir para o site principal' : 'Ir al sitio principal'}
              <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="pablo-info">
        <div className="pablo-info-header">
          <Shield size={32} className="pablo-info-icon" />
          <h2>{isPt ? 'Identidade profissional' : 'Identidad profesional'}</h2>
          <p>
            {isPt
              ? 'Esta página conecta Pablo Gomes à PabloG.Dev e ao trabalho desenvolvido em sites, sistemas, agendamentos online e automações. Para conhecer os projetos e solicitar uma solução, acesse o site principal.'
              : 'Esta página conecta Pablo Gomes con PabloG.Dev y con el trabajo desarrollado en sitios, sistemas, agendamientos online y automatizaciones. Para conocer los proyectos y solicitar una solución, accede al sitio principal.'}
          </p>
        </div>

        <div className="pablo-grid">
          <div className="pablo-grid-card">
            <div className="pablo-grid-icon">
              <Briefcase size={24} />
            </div>
            <h3>PabloG.Dev</h3>
            <p>{isPt ? 'Marca profissional de Pablo Gomes para desenvolvimento de soluções digitais.' : 'Marca profesional de Pablo Gomes para desarrollo de soluciones digitales.'}</p>
          </div>

          <div className="pablo-grid-card">
            <div className="pablo-grid-icon">
              <Code size={24} />
            </div>
            <h3>{isPt ? 'Projetos e demos' : 'Proyectos y demos'}</h3>
            <p>{isPt ? 'Sites, sistemas e demonstrações para negócios como clínicas, petshops e barbearias.' : 'Sitios, sistemas y demos para negocios como clínicas, petshops y barberías.'}</p>
          </div>

          <div className="pablo-grid-card">
            <div className="pablo-grid-icon">
              <Calendar size={24} />
            </div>
            <h3>{isPt ? 'Site oficial' : 'Sitio oficial'}</h3>
            <p>{isPt ? 'A página principal apresenta serviços, projetos e contato comercial.' : 'La página principal presenta servicios, proyectos y contacto comercial.'}</p>
          </div>
        </div>

        <div className="pablo-cta">
          <a href="/" className="pablo-cta-button">
            {isPt ? 'Explorar todos os projetos' : 'Explorar todos los proyectos'}
            <ChevronRight size={16} />
          </a>
        </div>
      </section>
    </main>
  )
}