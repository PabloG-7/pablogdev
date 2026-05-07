import './Projects.css'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Language } from '../../types'

type ProjectsProps = {
  language: Language
}

import exemplo1 from '../../assets/exemplo1.png'
import exemplo2 from '../../assets/exemplo2.png'
import exemplo3 from '../../assets/exemplo3.png'
import exemplo4 from '../../assets/exemplo4.png'
import exemplo5 from '../../assets/exemplo5.png'
import exemplo6 from '../../assets/exemplo6.png'

const projectImages = [exemplo1, exemplo2, exemplo3, exemplo4, exemplo5, exemplo6]

// Links dos projetos atualizados
const projectLinks = [
  'https://pablog-7.github.io/projeto-drbruno/',     // Dr. Bruno
  'https://pablog-7.github.io/ecommerce-kushi/',    // Kushi E-commerce
  'https://maxsorvetesibertioga.com.br/',            // Max Sorvetes
  '/demo-barbearia',                                 // Barbearia (demo)
  '/demo-petshop',                                   // Petshop (demo)
  '/demo-clinica',                                   // Clínica (demo)
]

export default function Projects({ language }: ProjectsProps) {
  const content = language === 'pt' ? pt : es
  const [currentPage, setCurrentPage] = useState(0)
  
  const totalProjects = content.projects.items.length
  const projectsPerPage = 2 // ALTERADO: 2 projetos por página
  const totalPages = Math.ceil(totalProjects / projectsPerPage)

  // Pré-carregar imagens
  useEffect(() => {
    projectImages.forEach((img) => {
      const image = new Image()
      image.src = img
    })
  }, [])

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const startIndex = currentPage * projectsPerPage
  const visibleProjects = content.projects.items.slice(startIndex, startIndex + projectsPerPage)

  const isExternalLink = (link: string) => {
    return link.startsWith('http') || link.startsWith('https')
  }

  const getProjectIndex = (projectTitle: string) => {
    return content.projects.items.findIndex(item => item.title === projectTitle)
  }

  return (
    <section className="projects" id="projetos">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">{content.projects.title}</h2>
          
          <div className="carousel-controls">
            <button 
              className="carousel-arrow carousel-arrow--prev"
              onClick={prevPage}
              aria-label="Projetos anteriores"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="carousel-arrow carousel-arrow--next"
              onClick={nextPage}
              aria-label="Próximos projetos"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="projects-grid">
          {visibleProjects.map((project) => {
            const originalIndex = getProjectIndex(project.title)
            const linkIndex = originalIndex !== -1 ? originalIndex : 0
            const link = projectLinks[linkIndex]
            const isExternal = isExternalLink(link)
            
            return (
              <div key={project.title} className="project-card">
                <img 
                  src={projectImages[linkIndex]} 
                  alt={project.title} 
                />
                <div className="project-overlay">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a
                    href={link}
                    className="project-link"
                    target={isExternal ? "_blank" : "_self"}
                    rel={isExternal ? "noopener noreferrer" : ""}
                  >
                    {linkIndex >= 3 ? 'Ver demonstração' : 'Ver projeto'}
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Dots indicadores */}
        <div className="carousel-dots">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentPage ? 'dot--active' : ''}`}
              onClick={() => setCurrentPage(index)}
              aria-label={`Ir para página ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}