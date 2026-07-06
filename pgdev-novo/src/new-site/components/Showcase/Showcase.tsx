import './Showcase.css'
import { ArrowUpRight } from 'lucide-react'
import type { Language } from '../../types'

type ShowcaseProps = {
  language: Language
}

export default function Showcase({ language }: ShowcaseProps) {
  const content = {
    pt: {
      projects: [
        {
          name: 'Dr. Bruno',
          category: 'Saúde',
          description: 'Site profissional com WhatsApp para agendamento.',
          image: '/images/exemplo1.webp',
          url: 'https://pablog-7.github.io/projeto-drbruno/',
          results: ['+40% agendamentos', 'Atendimento 24/7']
        },
        {
          name: 'Kushi',
          category: 'Moda',
          description: 'Loja virtual com pedidos direto pelo WhatsApp.',
          image: '/images/exemplo2.webp',
          url: 'https://pablog-7.github.io/ecommerce-kushi/',
          results: ['Vendas automatizadas', 'Catálogo digital']
        },
        {
          name: 'Barbearia',
          category: 'Beleza',
          description: 'Sistema de agendamento com confirmação automática.',
          image: '/images/exemplo4.webp',
          url: 'https://agendamento-de-barbearia-virid.vercel.app/',
          results: ['Sem filas', 'Gestão de horários']
        },
        {
          name: 'Saveur',
          category: 'Gastronomia',
          description: 'Site com cardápio digital e delivery integrado.',
          image: '/images/exemplo5.webp',
          url: 'https://sistema-web-para-restaurante.vercel.app/',
          results: ['Pedidos organizados', 'Mais vendas']
        },
        {
          name: 'Habitat',
          category: 'Imobiliária',
          description: 'Site institucional com catálogo de imóveis.',
          image: '/images/exemplo6.webp',
          url: 'https://sistema-web-imobiliaria.vercel.app/',
          results: ['Mais visibilidade', 'Contatos qualificados']
        },
        {
          name: 'Atelier',
          category: 'Moda',
          description: 'Landing page para lançamento de coleção.',
          image: '/images/exemplo3.webp',
          url: 'https://roupas-ateller.vercel.app/',
          results: ['Alta conversão', 'Lançamento de sucesso']
        },
      ]
    },
    es: {
      projects: [
        {
          name: 'Dr. Bruno',
          category: 'Salud',
          description: 'Sitio profesional con WhatsApp para reservas.',
          image: '/images/exemplo1.webp',
          url: 'https://pablog-7.github.io/projeto-drbruno/',
          results: ['+40% reservas', 'Atención 24/7']
        },
        {
          name: 'Kushi',
          category: 'Moda',
          description: 'Tienda virtual con pedidos directo por WhatsApp.',
          image: '/images/exemplo2.webp',
          url: 'https://pablog-7.github.io/ecommerce-kushi/',
          results: ['Ventas automatizadas', 'Catálogo digital']
        },
        {
          name: 'Barbearia',
          category: 'Belleza',
          description: 'Sistema de reservas con confirmación automática.',
          image: '/images/exemplo4.webp',
          url: 'https://agendamento-de-barbearia-virid.vercel.app/',
          results: ['Sin filas', 'Gestión de horarios']
        },
        {
          name: 'Saveur',
          category: 'Gastronomía',
          description: 'Sitio con menú digital y delivery integrado.',
          image: '/images/exemplo5.webp',
          url: 'https://sistema-web-para-restaurante.vercel.app/',
          results: ['Pedidos organizados', 'Más ventas']
        },
        {
          name: 'Habitat',
          category: 'Inmobiliaria',
          description: 'Sitio institucional con catálogo de inmuebles.',
          image: '/images/exemplo6.webp',
          url: 'https://sistema-web-imobiliaria.vercel.app/',
          results: ['Más visibilidad', 'Contactos calificados']
        },
        {
          name: 'Atelier',
          category: 'Moda',
          description: 'Landing page para lanzamiento de colección.',
          image: '/images/exemplo3.webp',
          url: 'https://roupas-ateller.vercel.app/',
          results: ['Alta conversión', 'Lanzamiento exitoso']
        },
      ]
    },
    en: {
      projects: [
        {
          name: 'Dr. Bruno',
          category: 'Healthcare',
          description: 'Professional website with WhatsApp for bookings.',
          image: '/images/exemplo1.webp',
          url: 'https://pablog-7.github.io/projeto-drbruno/',
          results: ['+40% bookings', '24/7 service']
        },
        {
          name: 'Kushi',
          category: 'Fashion',
          description: 'Online store with orders directly via WhatsApp.',
          image: '/images/exemplo2.webp',
          url: 'https://pablog-7.github.io/ecommerce-kushi/',
          results: ['Automated sales', 'Digital catalog']
        },
        {
          name: 'Barbearia',
          category: 'Beauty',
          description: 'Booking system with automatic confirmation.',
          image: '/images/exemplo4.webp',
          url: 'https://agendamento-de-barbearia-virid.vercel.app/',
          results: ['No waiting lines', 'Schedule management']
        },
        {
          name: 'Saveur',
          category: 'Gastronomy',
          description: 'Website with digital menu and integrated delivery.',
          image: '/images/exemplo5.webp',
          url: 'https://sistema-web-para-restaurante.vercel.app/',
          results: ['Organized orders', 'More sales']
        },
        {
          name: 'Habitat',
          category: 'Real Estate',
          description: 'Institutional website with property catalog.',
          image: '/images/exemplo6.webp',
          url: 'https://sistema-web-imobiliaria.vercel.app/',
          results: ['More visibility', 'Qualified contacts']
        },
        {
          name: 'Atelier',
          category: 'Fashion',
          description: 'Landing page for collection launch.',
          image: '/images/exemplo3.webp',
          url: 'https://roupas-ateller.vercel.app/',
          results: ['High conversion', 'Successful launch']
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