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
          Voltar para PabloG.Dev
        </a>

        <div className="pablo-content">
          <div>
            <span className="pablo-label">
              {isPt ? 'Desenvolvedor Front-End' : 'Desarrollador Front-End'}
            </span>

            <h1>
              Pablo Gomes <span>PabloG.Dev</span>
            </h1>

            <p>
              {isPt
                ? 'Pablo Gomes é desenvolvedor front-end especializado em React e TypeScript, criador da PabloG.Dev. Atua no desenvolvimento de sites profissionais, sistemas web, agendamentos online e automações para empresas no Brasil e na América do Sul.'
                : 'Pablo Gomes es desarrollador front-end especializado en React y TypeScript, creador de PabloG.Dev. Trabaja en el desarrollo de sitios web, sistemas, agendamientos online y automatizaciones para empresas en Brasil y América del Sur.'}
            </p>

            <div className="pablo-actions">
              <a href="https://wa.me/5511961111894" target="_blank" rel="noopener noreferrer">
                {isPt ? 'Falar no WhatsApp' : 'Hablar por WhatsApp'}
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
                ? 'Sites, sistemas e soluções digitais para negócios que querem crescer com mais presença e organização.'
                : 'Sitios, sistemas y soluciones digitales para negocios que quieren crecer con más presencia y organización.'}
            </p>
          </div>
        </div>
      </section>

      <section className="pablo-info">
        <h2>{isPt ? 'Sobre Pablo Gomes' : 'Sobre Pablo Gomes'}</h2>

        <p>
          {isPt
            ? 'Com foco em tecnologia, design e resultado, Pablo Gomes desenvolve projetos digitais que unem visual profissional, boa experiência de uso e estrutura pensada para conversão.'
            : 'Con enfoque en tecnología, diseño y resultados, Pablo Gomes desarrolla proyectos digitales que combinan visual profesional, buena experiencia de uso y estructura pensada para conversión.'}
        </p>

        <div className="pablo-grid">
          <div>
            <h3>React & TypeScript</h3>
            <p>{isPt ? 'Desenvolvimento moderno para sites e sistemas.' : 'Desarrollo moderno para sitios y sistemas.'}</p>
          </div>

          <div>
            <h3>{isPt ? 'Sistemas Web' : 'Sistemas Web'}</h3>
            <p>{isPt ? 'Soluções sob medida para organizar processos.' : 'Soluciones a medida para organizar procesos.'}</p>
          </div>

          <div>
            <h3>{isPt ? 'Agendamentos Online' : 'Agendamientos Online'}</h3>
            <p>{isPt ? 'Demonstrações e sistemas para clínicas, petshops e barbearias.' : 'Demos y sistemas para clínicas, petshops y barberías.'}</p>
          </div>
        </div>
      </section>
    </main>
  )
}