import './Showcase.css'
import { ArrowUpRight } from 'lucide-react'
import type { Language } from '../../types'

type ShowcaseProps = {
  language: Language
}

export default function Showcase({ language }: ShowcaseProps) {
  const content = {
    pt: {
      label: 'EXEMPLOS DE SOLUÇÕES',
      title: 'Ideias visuais para',
      titleSpan: 'vender mais online',
      projects: [
        {
          name: 'Dr. Bruno',
          category: 'Site para profissional da saúde',
          image: '/images/exemplo1.webp',
          url: 'https://pablog-7.github.io/projeto-drbruno/',
        },
        {
          name: 'Kushi',
          category: 'Loja virtual de moda',
          image: '/images/exemplo2.webp',
          url: 'https://pablog-7.github.io/ecommerce-kushi/',
        },
        {
          name: 'Atelier',
          category: 'Landing page de moda',
          image: '/images/exemplo3.webp',
          url: 'https://roupas-ateller.vercel.app/',
        },
        {
          name: 'Barbearia',
          category: 'Site com agendamento online',
          image: '/images/exemplo4.webp',
          url: 'https://agendamento-de-barbearia-virid.vercel.app/',
        },
        {
          name: 'Saveur',
          category: 'Site para restaurante',
          image: '/images/exemplo5.webp',
          url: 'https://sistema-web-para-restaurante.vercel.app/',
        },
        {
          name: 'Habitat',
          category: 'Site para imobiliária',
          image: '/images/exemplo6.webp',
          url: 'https://sistema-web-imobiliaria.vercel.app/',
        },
      ]
    },
    es: {
      label: 'EJEMPLOS DE SOLUCIONES',
      title: 'Ideas visuales para',
      titleSpan: 'vender más online',
      projects: [
        {
          name: 'Dr. Bruno',
          category: 'Sitio para profesional de salud',
          image: '/images/exemplo1.webp',
          url: 'https://pablog-7.github.io/projeto-drbruno/',
        },
        {
          name: 'Kushi',
          category: 'Tienda online de moda',
          image: '/images/exemplo2.webp',
          url: 'https://pablog-7.github.io/ecommerce-kushi/',
        },
        {
          name: 'Atelier',
          category: 'Landing page de moda',
          image: '/images/exemplo3.webp',
          url: 'https://roupas-ateller.vercel.app/',
        },
        {
          name: 'Barbearia',
          category: 'Sitio con agenda online',
          image: '/images/exemplo4.webp',
          url: 'https://agendamento-de-barbearia-virid.vercel.app/',
        },
        {
          name: 'Saveur',
          category: 'Sitio para restaurante',
          image: '/images/exemplo5.webp',
          url: 'https://sistema-web-para-restaurante.vercel.app/',
        },
        {
          name: 'Habitat',
          category: 'Sitio para inmobiliaria',
          image: '/images/exemplo6.webp',
          url: 'https://sistema-web-imobiliaria.vercel.app/',
        },
      ]
    },
    en: {
      label: 'SOLUTION EXAMPLES',
      title: 'Visual ideas to',
      titleSpan: 'sell more online',
      projects: [
        {
          name: 'Dr. Bruno',
          category: 'Website for healthcare professional',
          image: '/images/exemplo1.webp',
          url: 'https://pablog-7.github.io/projeto-drbruno/',
        },
        {
          name: 'Kushi',
          category: 'Fashion e-commerce',
          image: '/images/exemplo2.webp',
          url: 'https://pablog-7.github.io/ecommerce-kushi/',
        },
        {
          name: 'Atelier',
          category: 'Fashion landing page',
          image: '/images/exemplo3.webp',
          url: 'https://roupas-ateller.vercel.app/',
        },
        {
          name: 'Barbearia',
          category: 'Website with online scheduling',
          image: '/images/exemplo4.webp',
          url: 'https://agendamento-de-barbearia-virid.vercel.app/',
        },
        {
          name: 'Saveur',
          category: 'Restaurant website',
          image: '/images/exemplo5.webp',
          url: 'https://sistema-web-para-restaurante.vercel.app/',
        },
        {
          name: 'Habitat',
          category: 'Real estate website',
          image: '/images/exemplo6.webp',
          url: 'https://sistema-web-imobiliaria.vercel.app/',
        },
      ]
    }
  }

  const currentContent = content[language]

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="showcase" id="projetos">
      <div className="showcase-container">
        <div className="showcase-header">
          <span className="showcase-label">
            {currentContent.label}
          </span>

          <h2 className="showcase-title">
            {currentContent.title}
            <span>{currentContent.titleSpan}</span>
          </h2>
        </div>

        <div className="showcase-grid">
          {currentContent.projects.map((project, index) => (
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
                  width={900}
                  height={560}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  fetchPriority={index < 2 ? 'high' : 'low'}
                  decoding="async"
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