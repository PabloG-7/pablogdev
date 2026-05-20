import './Services.css'
import { Globe, Settings2, CalendarCheck, ArrowRight } from 'lucide-react'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'

type ServicesProps = {
  language: Language
}

const services = [
  {
    title: 'Sites profissionais',
    description: 'Presença online moderna para apresentar seu negócio e facilitar o contato.',
    href: '#site-profissional',
    icon: Globe,
    points: ['Visual moderno', 'WhatsApp integrado', 'Responsivo']
  },
  {
    title: 'Sistemas web',
    description: 'Painéis e ferramentas para organizar clientes, processos e informações.',
    href: '#sistema',
    icon: Settings2,
    points: ['Controle interno', 'Relatórios', 'Mais organização']
  },
  {
    title: 'Agendamentos online',
    description: 'Seu cliente escolhe horário sozinho e recebe confirmação automática.',
    href: '#experiencia',
    icon: CalendarCheck,
    points: ['Horários online', 'Confirmação no WhatsApp', 'Cliente salvo']
  }
]

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
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.title} className="service-card">
                <Icon size={22} strokeWidth={1.5} />
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-points">
                    {service.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                  <a href={service.href}>
                    Ver exemplo <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}