import './Showcase.css'
import { ArrowUpRight } from 'lucide-react'
import type { Language } from '../../types'

type ShowcaseProps = {
  language: Language
}

export default function Showcase({ language }: ShowcaseProps) {
  const isPt = language === 'pt'

  const projects = [
    {
      name: 'Dr. Bruno',
      category: isPt ? 'Site para profissional da saúde' : 'Sitio para profesional de salud',
      image: '/images/exemplo1.webp',
      url: 'https://pablog-7.github.io/projeto-drbruno/',
    },
    {
      name: 'Kushi',
      category: isPt ? 'Loja virtual de moda' : 'Tienda online de moda',
      image: '/images/exemplo2.webp',
      url: 'https://pablog-7.github.io/ecommerce-kushi/',
    },
    {
      name: 'Atelier',
      category: isPt ? 'Landing page de moda' : 'Landing page de moda',
      image: '/images/exemplo3.webp',
      url: 'https://roupas-ateller.vercel.app/',
    },
    {
      name: 'Barbearia',
      category: isPt ? 'Site com agendamento online' : 'Sitio con agenda online',
      image: '/images/exemplo4.webp',
      url: 'https://agendamento-de-barbearia-virid.vercel.app/',
    },
    {
      name: 'Saveur',
      category: isPt ? 'Site para restaurante' : 'Sitio para restaurante',
      image: '/images/exemplo5.webp',
      url: 'https://sistema-web-para-restaurante.vercel.app/',
    },
    {
      name: 'Habitat',
      category: isPt ? 'Site para imobiliária' : 'Sitio para inmobiliaria',
      image: '/images/exemplo6.webp',
      url: 'https://sistema-web-imobiliaria.vercel.app/',
    },
  ]

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="showcase" id="projetos">
      <div className="showcase-container">
        <div className="showcase-header">
          <span className="showcase-label">
            {isPt ? 'EXEMPLOS DE SOLUÇÕES' : 'EJEMPLOS DE SOLUCIONES'}
          </span>

          <h2 className="showcase-title">
            {isPt ? 'Ideias visuais para' : 'Ideas visuales para'}
            <span>{isPt ? ' vender mais online' : ' vender más online'}</span>
          </h2>
        </div>

        <div className="showcase-grid">
          {projects.map((project) => (
            <button
              key={project.name}
              className="showcase-card"
              onClick={() => handleProjectClick(project.url)}
              aria-label={`Abrir projeto ${project.name}`}
            >
              <div className="card">
                <img
                  src={project.image}
                  alt={project.name}
                  width="900"
                  height="560"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />

                <div className="card-hover">
                  <div className="card-text">
                    <h3>{project.name}</h3>
                    <p>{project.category}</p>
                  </div>

                  <div className="card-icon">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}