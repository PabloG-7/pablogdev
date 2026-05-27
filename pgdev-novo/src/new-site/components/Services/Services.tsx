import './Services.css'
import { Globe, Settings2, CalendarCheck, ArrowRight } from 'lucide-react'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'

type ServicesProps = {
  language: Language
}

// Serviços com suporte a dois idiomas
const getServices = (isPt: boolean) => [
  {
    title: isPt ? 'Sites profissionais' : 'Sitios profesionales',
    description: isPt 
      ? 'Presença online moderna para apresentar seu negócio e facilitar o contato.'
      : 'Presencia online moderna para presentar tu negocio y facilitar el contacto.',
    href: '#site-profissional',
    icon: Globe,
    points: isPt 
      ? ['Visual moderno', 'WhatsApp integrado', 'Responsivo']
      : ['Visual moderno', 'WhatsApp integrado', 'Responsivo']
  },
  {
    title: isPt ? 'Sistemas web' : 'Sistemas web',
    description: isPt 
      ? 'Painéis e ferramentas para organizar clientes, processos e informações.'
      : 'Paneles y herramientas para organizar clientes, procesos e información.',
    href: '#sistema',
    icon: Settings2,
    points: isPt 
      ? ['Controle interno', 'Relatórios', 'Mais organização']
      : ['Control interno', 'Reportes', 'Más organización']
  },
  {
    title: isPt ? 'Agendamentos online' : 'Agendamientos online',
    description: isPt 
      ? 'Seu cliente escolhe horário sozinho e recebe confirmação automática.'
      : 'Tu cliente elige horario solo y recibe confirmación automática.',
    href: '#experiencia',
    icon: CalendarCheck,
    points: isPt 
      ? ['Horários online', 'Confirmação no WhatsApp', 'Cliente salvo']
      : ['Horarios online', 'Confirmación por WhatsApp', 'Cliente guardado']
  }
]

export default function Services({ language }: ServicesProps) {
  const isPt = language === 'pt'
  const content = isPt ? pt : es
  const services = getServices(isPt)

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
                    {isPt ? 'Ver exemplo' : 'Ver ejemplo'} <ArrowRight size={14} />
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