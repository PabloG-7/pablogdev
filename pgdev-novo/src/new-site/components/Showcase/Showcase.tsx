import './Showcase.css'
import { Eye, Sparkles, Monitor, Calendar, ShoppingBag, Home, Scissors, Heart } from 'lucide-react'
import type { Language } from '../../types'

type ShowcaseProps = {
  language: Language
}

export default function Showcase({ language }: ShowcaseProps) {
  const content = {
    pt: {
      projects: [
        {
          name: 'Casamentos & Eventos',
          image: '/images/exemplo1.webp',
          url: 'https://pablog-7.github.io/casamento-site-exemplo/',
          description: 'Sites elegantes para cerimônias e celebrações',
          category: 'Eventos'
        },
        {
          name: 'Moda e Vestuário',
          image: '/images/exemplo2.webp',
          url: 'https://roupas-ateller.vercel.app/',
          description: 'Catálogos e lojas para marcas de moda',
          category: 'E-commerce'
        },
        {
          name: 'Alimentação e Docerias',
          image: '/images/exemplo3.webp',
          url: 'https://pablog-7.github.io/donuts-site-exemplo/',
          description: 'Cardápios atrativos para restaurantes e confeitarias',
          category: 'Alimentação'
        },
        {
          name: 'Saúde e Bem-Estar',
          image: '/images/exemplo4.webp',
          url: 'https://pablog-7.github.io/projeto-drbruno/',
          description: 'Páginas profissionais para médicos e clínicas',
          category: 'Saúde'
        },
        {
          name: 'E-commerce de Moda',
          image: '/images/exemplo5.webp',
          url: 'https://pablog-7.github.io/ecommerce-kushi/',
          description: 'Lojas virtuais completas e modernas',
          category: 'E-commerce'
        },
        {
          name: 'Imobiliárias e Corretores',
          image: '/images/exemplo6.webp',
          url: 'https://sistema-web-imobiliaria.vercel.app/',
          description: 'Portais imobiliários com busca avançada',
          category: 'Imobiliário'
        },
        {
          name: 'Barbearias e Salões',
          image: '/images/exemplo7.webp',
          url: 'https://agendamento-de-barbearia-virid.vercel.app/',
          description: 'Agendamentos e portfólios para profissionais',
          category: 'Beleza'
        },
        {
          name: 'Yoga e Qualidade de Vida',
          image: '/images/exemplo8.webp',
          url: 'https://pablog-7.github.io/yoga-site-exemplo/',
          description: 'Plataformas para práticas e bem-estar',
          category: 'Bem-Estar'
        }
      ]
    },
    es: {
      projects: [
        {
          name: 'Bodas y Eventos',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=560&fit=crop&crop=center',
          url: 'https://pablog-7.github.io/casamento-site-exemplo/',
          description: 'Sitios elegantes para ceremonias y celebraciones',
          category: 'Eventos'
        },
        {
          name: 'Moda y Vestimenta',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=560&fit=crop&crop=center',
          url: 'https://roupas-ateller.vercel.app/',
          description: 'Catálogos y tiendas para marcas de moda',
          category: 'E-commerce'
        },
        {
          name: 'Alimentación y Repostería',
          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=560&fit=crop&crop=center',
          url: 'https://pablog-7.github.io/donuts-site-exemplo/',
          description: 'Menús atractivos para restaurantes y pastelerías',
          category: 'Alimentación'
        },
        {
          name: 'Salud y Bienestar',
          image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&h=560&fit=crop&crop=center',
          url: 'https://pablog-7.github.io/projeto-drbruno/',
          description: 'Páginas profesionales para médicos y clínicas',
          category: 'Salud'
        },
        {
          name: 'E-commerce de Moda',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=560&fit=crop&crop=center',
          url: 'https://pablog-7.github.io/ecommerce-kushi/',
          description: 'Tiendas virtuales completas y modernas',
          category: 'E-commerce'
        },
        {
          name: 'Inmobiliarias y Corredores',
          image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=900&h=560&fit=crop&crop=center',
          url: 'https://sistema-web-imobiliaria.vercel.app/',
          description: 'Portales inmobiliarios con búsqueda avanzada',
          category: 'Inmobiliario'
        },
        {
          name: 'Barberías y Salones',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=560&fit=crop&crop=center',
          url: 'https://agendamento-de-barbearia-virid.vercel.app/',
          description: 'Agendamientos y portafolios para profesionales',
          category: 'Belleza'
        },
        {
          name: 'Yoga y Calidad de Vida',
          image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&h=560&fit=crop&crop=center',
          url: 'https://pablog-7.github.io/yoga-site-exemplo/',
          description: 'Plataformas para prácticas y bienestar',
          category: 'Bienestar'
        }
      ]
    },
    en: {
      projects: [
        {
          name: 'Weddings & Events',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=560&fit=crop&crop=center',
          url: 'https://pablog-7.github.io/casamento-site-exemplo/',
          description: 'Elegant sites for ceremonies and celebrations',
          category: 'Events'
        },
        {
          name: 'Fashion & Clothing',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=560&fit=crop&crop=center',
          url: 'https://roupas-ateller.vercel.app/',
          description: 'Catalogs and stores for fashion brands',
          category: 'E-commerce'
        },
        {
          name: 'Food & Bakeries',
          image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=560&fit=crop&crop=center',
          url: 'https://pablog-7.github.io/donuts-site-exemplo/',
          description: 'Attractive menus for restaurants and bakeries',
          category: 'Food'
        },
        {
          name: 'Health & Wellness',
          image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&h=560&fit=crop&crop=center',
          url: 'https://pablog-7.github.io/projeto-drbruno/',
          description: 'Professional pages for doctors and clinics',
          category: 'Health'
        },
        {
          name: 'Fashion E-commerce',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=560&fit=crop&crop=center',
          url: 'https://pablog-7.github.io/ecommerce-kushi/',
          description: 'Complete and modern virtual stores',
          category: 'E-commerce'
        },
        {
          name: 'Real Estate & Brokers',
          image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=900&h=560&fit=crop&crop=center',
          url: 'https://sistema-web-imobiliaria.vercel.app/',
          description: 'Real estate portals with advanced search',
          category: 'Real Estate'
        },
        {
          name: 'Barbershops & Salons',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&h=560&fit=crop&crop=center',
          url: 'https://agendamento-de-barbearia-virid.vercel.app/',
          description: 'Scheduling and portfolios for professionals',
          category: 'Beauty'
        },
        {
          name: 'Yoga & Quality of Life',
          image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&h=560&fit=crop&crop=center',
          url: 'https://pablog-7.github.io/yoga-site-exemplo/',
          description: 'Platforms for practice and wellness',
          category: 'Wellness'
        }
      ]
    }
  }

  const currentContent = content[language]

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      'Eventos': Calendar,
      'E-commerce': ShoppingBag,
      'Alimentación': ShoppingBag,
      'Alimentação': ShoppingBag,
      'Food': ShoppingBag,
      'Saúde': Heart,
      'Salud': Heart,
      'Health': Heart,
      'Imobiliário': Home,
      'Inmobiliario': Home,
      'Real Estate': Home,
      'Beleza': Scissors,
      'Belleza': Scissors,
      'Beauty': Scissors,
      'Bem-Estar': Sparkles,
      'Bienestar': Sparkles,
      'Wellness': Sparkles
    }
    return icons[category] || Monitor
  }

  return (
    <section className="showcase" id="templates">
      <div className="showcase-container">
        <div className="showcase-grid">
          {currentContent.projects.map((project, index) => {
            const IconComponent = getCategoryIcon(project.category)
            
            return (
              <button
                key={project.name}
                className="showcase-card"
                onClick={() => handleProjectClick(project.url)}
                aria-label={`Visualizar ${project.name}`}
              >
                <div className="card">
                  <img
                    src={project.image}
                    alt={project.name}
                    width={900}
                    height={560}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    fetchPriority={index < 4 ? 'high' : 'low'}
                    decoding="async"
                  />

                  {/* Overlay com detalhes no hover */}
                  <div className="card-overlay">
                    <div className="overlay-content">
                      <div className="overlay-header">
                        <IconComponent size={24} className="overlay-icon" />
                        <span className="overlay-category">{project.category}</span>
                      </div>

                      <h3 className="overlay-title">{project.name}</h3>
                      
                      <p className="overlay-description">{project.description}</p>

                      <div className="card-link">
                        <Eye size={20} />
                        Visualizar Template
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}