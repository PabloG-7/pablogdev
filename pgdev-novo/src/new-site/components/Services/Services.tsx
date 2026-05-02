import './Services.css'
import { Globe, Settings2, Smartphone, MessageCircleMore, Workflow, BarChart3 } from 'lucide-react'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'

type ServicesProps = {
  language: Language
}

const icons = [Globe, Settings2, Smartphone, MessageCircleMore, Workflow, BarChart3] as const

export default function Services({ language }: ServicesProps) {
  const content = language === 'pt' ? pt : es

  return (
    <section className="services" id="servicos">
      <div className="services-container">
        <div className="services-header">
          <span className="services-label">{content.services.badge}</span>
          <h2 className="services-title">
            {content.services.title}
            <span> {content.services.highlight}</span>
          </h2>
        </div>

        <div className="services-grid">
          {content.services.items.map((service, index) => {
            const Icon = icons[index]
            return (
              <div key={service.title} className="service-card">
                <Icon size={22} strokeWidth={1.5} />
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}