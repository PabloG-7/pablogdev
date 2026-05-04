import './PabloGomesPage.css'
import logo from '../../assets/logo.png'
import type { Language } from '../../types'

type Props = {
  language: Language
}

export default function PabloGomesPage({ language }: Props) {
  const isPt = language === 'pt'

  return (
    <main className="pablo-page">
      <section className="pablo-hero">
        <a href="/" className="pablo-back">
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
                {isPt ? 'Ver trabalhos e soluções' : 'Ver trabajos y soluciones'}
              </a>

              <a href="https://github.com/pablog-7" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
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

            <a href="/" className="pablo-main-link">
              {isPt ? 'Ir para o site principal' : 'Ir al sitio principal'}
            </a>
          </div>
        </div>
      </section>

      <section className="pablo-info">
        <h2>{isPt ? 'Identidade profissional' : 'Identidad profesional'}</h2>

        <p>
          {isPt
            ? 'Esta página conecta Pablo Gomes à PabloG.Dev e ao trabalho desenvolvido em sites, sistemas, agendamentos online e automações. Para conhecer os projetos e solicitar uma solução, acesse o site principal.'
            : 'Esta página conecta Pablo Gomes con PabloG.Dev y con el trabajo desarrollado en sitios, sistemas, agendamientos online y automatizaciones. Para conocer los proyectos y solicitar una solución, accede al sitio principal.'}
        </p>

        <div className="pablo-grid">
          <div>
            <h3>PabloG.Dev</h3>
            <p>{isPt ? 'Marca profissional de Pablo Gomes para desenvolvimento de soluções digitais.' : 'Marca profesional de Pablo Gomes para desarrollo de soluciones digitales.'}</p>
          </div>

          <div>
            <h3>{isPt ? 'Projetos e demos' : 'Proyectos y demos'}</h3>
            <p>{isPt ? 'Sites, sistemas e demonstrações para negócios como clínicas, petshops e barbearias.' : 'Sitios, sistemas y demos para negocios como clínicas, petshops y barberías.'}</p>
          </div>

          <div>
            <h3>{isPt ? 'Site oficial' : 'Sitio oficial'}</h3>
            <p>{isPt ? 'A página principal apresenta serviços, projetos e contato comercial.' : 'La página principal presenta servicios, proyectos y contacto comercial.'}</p>
          </div>
        </div>
      </section>
    </main>
  )
}