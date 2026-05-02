import './Projects.css'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
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

export default function Projects({ language }: ProjectsProps) {
  const content = language === 'pt' ? pt : es
  const [showAll, setShowAll] = useState(false)

  const handleShowMore = () => {
    const currentScrollY = window.scrollY
    setShowAll(true)
    setTimeout(() => {
      window.scrollTo(0, currentScrollY)
    }, 0)
  }

  const handleShowLess = () => {
    const currentScrollY = window.scrollY
    setShowAll(false)
    setTimeout(() => {
      window.scrollTo(0, currentScrollY)
    }, 0)
  }

  const visibleProjects = showAll 
    ? content.projects.items 
    : content.projects.items.slice(0, Math.min(3, projectImages.length))

  return (
    <section className="projects" id="projetos">
      <div className="projects-container">
        <h2 className="projects-title">{content.projects.title}</h2>

        <div className="projects-grid">
          {visibleProjects.map((project, index) => (
            <div key={project.title} className="project-card">
              <img 
                src={projectImages[index] || projectImages[projectImages.length - 1]} 
                alt={project.title} 
              />
              <div className="project-overlay">
                <span>{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {content.projects.items.length > 3 && (
          <div className="projects-more">
            {!showAll ? (
              <button className="show-more-btn" onClick={handleShowMore}>
                {language === 'pt' ? 'Ver mais projetos' : 'Ver más proyectos'}
                <ChevronDown size={20} className="arrow" />
              </button>
            ) : (
              <button className="show-more-btn" onClick={handleShowLess}>
                {language === 'pt' ? 'Ver menos' : 'Ver menos'}
                <ChevronDown size={20} className="arrow rotate" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}