import './Showcase.css'
import { Eye, Sparkles, Monitor, Calendar, ShoppingBag, Home, Scissors, Heart, Leaf } from 'lucide-react'
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
          name: 'Chilliz - Sorvetes Artesanais',
          image: '/images/exemplo7.webp',
          url: 'https://pablog-7.github.io/sorvete-site-exemplo/',
          description: 'Página para marcas de sorveteria com design vibrante',
          category: 'Alimentação'
        },
        {
          name: 'Yoga e Qualidade de Vida',
          image: '/images/exemplo8.webp',
          url: 'https://pablog-7.github.io/yoga-site-exemplo/',
          description: 'Plataformas para práticas e bem-estar',
          category: 'Bem-Estar'
        },
        {
          name: 'Virtz - Moda Streetwear',
          image: '/images/exemplo9.webp',
          url: 'https://pablog-7.github.io/virtz-site-exemplo/',
          description: 'Loja virtual de roupas com design moderno e destacado',
          category: 'E-commerce'
        },
        {
          name: 'Barbearias e Salões',
          image: '/images/exemplo10.webp',
          url: 'https://agendamento-de-barbearia-virid.vercel.app/',
          description: 'Agendamentos e portfólios para profissionais',
          category: 'Beleza'
        },
        {
          name: 'Avora Mart - E-commerce Premium',
          image: '/images/exemplo11.webp',
          url: 'https://pablog-7.github.io/fruit-site-exemplo/',
          description: 'UI Concept de e-commerce moderno com design premium e responsivo',
          category: 'E-commerce'
        },
        {
          name: 'MUSE Hair Atelier',
          image: '/images/exemplo12.webp',
          url: 'https://pablog-7.github.io/muse-site-exemplo/',
          description: 'Site institucional para salão de beleza com design clean, agendamento integrado e dashboard administrativo',
          category: 'Beleza'
        }
      ]
    },
    es: {
      projects: [
        {
          name: 'Bodas y Eventos',
          image: '/images/exemplo1.webp',
          url: 'https://pablog-7.github.io/casamento-site-exemplo/',
          description: 'Sitios elegantes para ceremonias y celebraciones',
          category: 'Eventos'
        },
        {
          name: 'Moda y Vestimenta',
          image: '/images/exemplo2.webp',
          url: 'https://roupas-ateller.vercel.app/',
          description: 'Catálogos y tiendas para marcas de moda',
          category: 'E-commerce'
        },
        {
          name: 'Alimentación y Repostería',
          image: '/images/exemplo3.webp',
          url: 'https://pablog-7.github.io/donuts-site-exemplo/',
          description: 'Menús atractivos para restaurantes y pastelerías',
          category: 'Alimentación'
        },
        {
          name: 'Salud y Bienestar',
          image: '/images/exemplo4.webp',
          url: 'https://pablog-7.github.io/projeto-drbruno/',
          description: 'Páginas profesionales para médicos y clínicas',
          category: 'Salud'
        },
        {
          name: 'E-commerce de Moda',
          image: '/images/exemplo5.webp',
          url: 'https://pablog-7.github.io/ecommerce-kushi/',
          description: 'Tiendas virtuales completas y modernas',
          category: 'E-commerce'
        },
        {
          name: 'Inmobiliarias y Corredores',
          image: '/images/exemplo6.webp',
          url: 'https://sistema-web-imobiliaria.vercel.app/',
          description: 'Portales inmobiliarios con búsqueda avanzada',
          category: 'Inmobiliario'
        },
        {
          name: 'Chilliz - Helados Artesanales',
          image: '/images/exemplo7.webp',
          url: 'https://pablog-7.github.io/sorvete-site-exemplo/',
          description: 'Página para marcas de heladería con diseño vibrante',
          category: 'Alimentación'
        },
        {
          name: 'Yoga y Calidad de Vida',
          image: '/images/exemplo8.webp',
          url: 'https://pablog-7.github.io/yoga-site-exemplo/',
          description: 'Plataformas para prácticas y bienestar',
          category: 'Bienestar'
        },
        {
          name: 'Virtz - Moda Streetwear',
          image: '/images/exemplo9.webp',
          url: 'https://pablog-7.github.io/virtz-site-exemplo/',
          description: 'Tienda virtual de ropa con diseño moderno y destacado',
          category: 'E-commerce'
        },
        {
          name: 'Barberías y Salones',
          image: '/images/exemplo10.webp',
          url: 'https://agendamento-de-barbearia-virid.vercel.app/',
          description: 'Agendamientos y portafolios para profesionales',
          category: 'Belleza'
        },
        {
          name: 'Avora Mart - E-commerce Premium',
          image: '/images/exemplo11.webp',
          url: 'https://pablog-7.github.io/fruit-site-exemplo/',
          description: 'UI Concept de e-commerce moderno con diseño premium y responsivo',
          category: 'E-commerce'
        },
        {
          name: 'MUSE Hair Atelier',
          image: '/images/exemplo12.webp',
          url: 'https://pablog-7.github.io/muse-site-exemplo/',
          description: 'Sitio institucional para salón de belleza con diseño clean, agenda integrada y dashboard administrativo',
          category: 'Belleza'
        }
      ]
    },
    en: {
      projects: [
        {
          name: 'Weddings & Events',
          image: '/images/exemplo1.webp',
          url: 'https://pablog-7.github.io/casamento-site-exemplo/',
          description: 'Elegant sites for ceremonies and celebrations',
          category: 'Events'
        },
        {
          name: 'Fashion & Clothing',
          image: '/images/exemplo2.webp',
          url: 'https://roupas-ateller.vercel.app/',
          description: 'Catalogs and stores for fashion brands',
          category: 'E-commerce'
        },
        {
          name: 'Food & Bakeries',
          image: '/images/exemplo3.webp',
          url: 'https://pablog-7.github.io/donuts-site-exemplo/',
          description: 'Attractive menus for restaurants and bakeries',
          category: 'Food'
        },
        {
          name: 'Health & Wellness',
          image: '/images/exemplo4.webp',
          url: 'https://pablog-7.github.io/projeto-drbruno/',
          description: 'Professional pages for doctors and clinics',
          category: 'Health'
        },
        {
          name: 'Fashion E-commerce',
          image: '/images/exemplo5.webp',
          url: 'https://pablog-7.github.io/ecommerce-kushi/',
          description: 'Complete and modern virtual stores',
          category: 'E-commerce'
        },
        {
          name: 'Real Estate & Brokers',
          image: '/images/exemplo6.webp',
          url: 'https://sistema-web-imobiliaria.vercel.app/',
          description: 'Real estate portals with advanced search',
          category: 'Real Estate'
        },
        {
          name: 'Chilliz - Artisan Ice Cream',
          image: '/images/exemplo7.webp',
          url: 'https://pablog-7.github.io/sorvete-site-exemplo/',
          description: 'Vibrant landing page for ice cream brands',
          category: 'Food'
        },
        {
          name: 'Yoga & Quality of Life',
          image: '/images/exemplo8.webp',
          url: 'https://pablog-7.github.io/yoga-site-exemplo/',
          description: 'Platforms for practice and wellness',
          category: 'Wellness'
        },
        {
          name: 'Virtz - Streetwear Fashion',
          image: '/images/exemplo9.webp',
          url: 'https://pablog-7.github.io/virtz-site-exemplo/',
          description: 'Clothing e-commerce with bold and modern design',
          category: 'E-commerce'
        },
        {
          name: 'Barbershops & Salons',
          image: '/images/exemplo10.webp',
          url: 'https://agendamento-de-barbearia-virid.vercel.app/',
          description: 'Scheduling and portfolios for professionals',
          category: 'Beauty'
        },
        {
          name: 'Avora Mart - Premium E-commerce',
          image: '/images/exemplo11.webp',
          url: 'https://pablog-7.github.io/fruit-site-exemplo/',
          description: 'Modern e-commerce UI Concept with premium and responsive design',
          category: 'E-commerce'
        },
        {
          name: 'MUSE Hair Atelier',
          image: '/images/exemplo12.webp',
          url: 'https://pablog-7.github.io/muse-site-exemplo/',
          description: 'Institutional website for a beauty salon with clean design, integrated scheduling and admin dashboard',
          category: 'Beauty'
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
      'Events': Calendar,
      'E-commerce': ShoppingBag,
      'Alimentación': Leaf,
      'Alimentação': Leaf,
      'Food': Leaf,
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
    <section className="showcase" id="exemplos">
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