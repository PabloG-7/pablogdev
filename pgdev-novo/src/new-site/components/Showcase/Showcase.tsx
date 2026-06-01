import './Showcase.css'
import { Eye } from 'lucide-react'
import type { Language } from '../../types'

import exemplo1 from '../../assets/exemplo1.webp'
import exemplo2 from '../../assets/exemplo2.webp'
import exemplo3 from '../../assets/exemplo3.webp'
import exemplo4 from '../../assets/exemplo4.webp'
import exemplo5 from '../../assets/exemplo5.webp'
import exemplo6 from '../../assets/exemplo6.webp'

type ShowcaseProps = {
  language: Language
}

export default function Showcase({ language }: ShowcaseProps) {
  const isPt = language === 'pt'

  const projects = [
    {
      name: 'Dr. Bruno',
      category: isPt ? 'Site para profissional da saúde' : 'Sitio para profesional de salud',
      image: exemplo1,
      url: 'https://pablog-7.github.io/projeto-drbruno/',
    },
    {
      name: 'Kushi',
      category: isPt ? 'Loja virtual de moda' : 'Tienda online de moda',
      image: exemplo2,
      url: 'https://pablog-7.github.io/ecommerce-kushi/',
    },
    {
      name: 'Atelier',
      category: isPt ? 'Landing page de moda' : 'Landing page de moda',
      image: exemplo3,
      url: 'https://roupas-ateller.vercel.app/',
    },
    {
      name: 'Barbearia',
      category: isPt ? 'Site com agendamento online' : 'Sitio con agenda online',
      image: exemplo4,
      url: 'https://agendamento-de-barbearia-virid.vercel.app/',
    },
    {
      name: 'Saveur',
      category: isPt ? 'Site para restaurante' : 'Sitio para restaurante',
      image: exemplo5,
      url: 'https://sistema-web-para-restaurante.vercel.app/',
    },
    {
      name: 'Habitat',
      category: isPt ? 'Site para imobiliária' : 'Sitio para inmobiliaria',
      image: exemplo6,
      url: 'https://sistema-web-imobiliaria.vercel.app/',
    },
  ]

  // Organizar exemplos em pares para o grid
  const projectPairs = [
    [projects[0], projects[1]],
    [projects[2], projects[3]],
    [projects[4], projects[5]],
  ]

  const handleProjectClick = (url: string) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank')
    } else if (url !== '#contato') {
      window.location.href = url
    } else {
      document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="showcase" id="showcase">
      <div className="showcase-container">
        <div className="showcase-header">
          <span className="showcase-label">
            {isPt ? 'EXEMPLOS DE SOLUÇÕES' : 'EJEMPLOS DE SOLUCIONES'}
          </span>
          <h2 className="showcase-title">
            {isPt ? 'Ideias visuais para' : 'Ideas visuales para'}
            <span> {isPt ? 'vender mais online' : 'vender más online'}</span>
          </h2>
        </div>

        <div className="showcase-grid-2x2">
          {projectPairs.map((pair, pairIndex) => (
            <div key={pairIndex} className="showcase-row">
              {pair.map((project) => (
                <button
                  key={project.name}
                  className="showcase-card"
                  onClick={() => handleProjectClick(project.url)}
                >
                  <div className="card-image">
                    <img src={project.image} alt={project.name} />
                    <div className="card-overlay">
                      <div className="card-center">
                        <Eye size={32} />
                        <span>{isPt ? 'Visualizar projeto' : 'Ver proyecto'}</span>
                      </div>
                      <div className="card-bottom">
                        <h3>{project.name}</h3>
                        <p>{project.category}</p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}