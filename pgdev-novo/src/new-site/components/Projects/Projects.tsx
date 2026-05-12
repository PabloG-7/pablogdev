import './Projects.css'
import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'

// Imagens desktop - APENAS ESTAS (sem mobile)
import exemplo1 from '../../assets/exemplo1.webp'
import exemplo2 from '../../assets/exemplo2.webp'
import exemplo3 from '../../assets/exemplo3.webp'
import exemplo4 from '../../assets/exemplo4.webp'
import exemplo5 from '../../assets/exemplo5.webp'
import exemplo6 from '../../assets/exemplo6.webp'

type ProjectsProps = {
  language: Language
}

const projectImages = [exemplo1, exemplo2, exemplo3, exemplo4, exemplo5, exemplo6]

const projectLinks = [
  'https://pablog-7.github.io/projeto-drbruno/',
  'https://pablog-7.github.io/ecommerce-kushi/',
  'https://maxsorvetesibertioga.com.br/',
  '/demo-barbearia',
  '/demo-petshop',
  '/demo-clinica',
]

const projectLead = {
  pt: {
    title: 'Exemplos pensados para transmitir',
    viewProject: 'Ver projeto',
    viewDemo: 'Ver demonstração',
    previous: 'Projeto anterior',
    next: 'Próximo projeto',
    page: 'Ir para projeto',
  },
  es: {
    title: 'Ejemplos pensados para transmitir',
    viewProject: 'Ver proyecto',
    viewDemo: 'Ver demostración',
    previous: 'Proyecto anterior',
    next: 'Siguiente proyecto',
    page: 'Ir al proyecto',
  },
}

function isExternalLink(link: string) {
  return link.startsWith('http://') || link.startsWith('https://')
}

export default function Projects({ language }: ProjectsProps) {
  const content = language === 'pt' ? pt : es
  const copy = language === 'pt' ? projectLead.pt : projectLead.es
  const [currentProject, setCurrentProject] = useState(0)

  const projects = content.projects.items
  const totalProjects = projects.length
  const safeIndex = totalProjects > 0 ? currentProject % totalProjects : 0
  const activeProject = projects[safeIndex]
  const activeImage = projectImages[safeIndex] ?? projectImages[0] ?? ''
  const activeLink = projectLinks[safeIndex] ?? projectLinks[0] ?? '#'
  const isExternal = isExternalLink(activeLink)

  const projectNumber = useMemo(() => String(safeIndex + 1).padStart(2, '0'), [safeIndex])

  // Pré-carrega a próxima imagem
  useEffect(() => {
    if (!totalProjects) return

    const nextIndex = (safeIndex + 1) % totalProjects
    const nextImage = projectImages[nextIndex]

    if (!nextImage) return

    const image = new Image()
    image.src = nextImage
  }, [safeIndex, totalProjects])

  function nextProject() {
    setCurrentProject((prev) => (prev + 1) % totalProjects)
  }

  function prevProject() {
    setCurrentProject((prev) => (prev - 1 + totalProjects) % totalProjects)
  }

  if (!activeProject) return null

  return (
    <section className="projects" id="projetos" aria-labelledby="projects-title">
      {/* Elementos minimalistas - DIFERENTES */}
      <div className="projects__dash-top"></div>
      <div className="projects__dash-bottom"></div>
      <div className="projects__cross"></div>

      <div className="projects__shell">
        {/* LADO ESQUERDO - IMAGEM */}
        <div className="projects__visual" aria-live="polite">
          <a
            href={activeLink}
            target={isExternal ? '_blank' : '_self'}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="projects__image-link"
            aria-label={`${safeIndex >= 3 ? copy.viewDemo : copy.viewProject}: ${activeProject.title}`}
          >
            <img 
              className="projects__image" 
              src={activeImage} 
              alt={activeProject.title}
              width={900}
              height={560}
              loading={safeIndex === 0 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={safeIndex === 0 ? 'high' : 'low'}
            />
          </a>
        </div>

        {/* LADO DIREITO - CONTEÚDO */}
        <div className="projects__copy">
          <h2 id="projects-title" className="projects__title">
            {copy.title}
          </h2>

          <div className="projects__meta">
            <span>{projectNumber}</span>
            <div>
              <strong>{activeProject.category}</strong>
              <small>{activeProject.title}</small>
            </div>
          </div>
        </div>
      </div>

      {/* CONTROLES E DOTS FORA DO SHELL */}
      <div className="projects__controls" aria-label="Controle do carrossel de projetos">
        <button type="button" onClick={prevProject} aria-label={copy.previous}>
          <ChevronLeft size={28} />
        </button>
        <button type="button" onClick={nextProject} aria-label={copy.next}>
          <ChevronRight size={28} />
        </button>
      </div>

      <div className="projects__dots" aria-label="Projetos disponíveis">
        {projects.map((project, index) => (
          <button
            type="button"
            key={project.title}
            className={index === currentProject ? 'is-active' : ''}
            onClick={() => setCurrentProject(index)}
            aria-label={`${copy.page} ${index + 1}`}
            aria-current={index === currentProject}
          />
        ))}
      </div>
    </section>
  )
}