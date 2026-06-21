import './Services.css'
import { Globe, Settings2, CalendarCheck } from 'lucide-react'
import type { Language } from '../../types'
import serviceImage from '../../assets/service-background.webp'

type ServicesProps = {
  language: Language
}

// Serviços com suporte a três idiomas
const getServices = (language: Language) => {
  const content = {
    pt: {
      title: 'Soluções digitais',
      subtitle: 'para seu negócio',
      services: [
        {
          title: 'Sites que passam confiança',
          description: 'Páginas modernas para apresentar seu negócio, mostrar seus serviços e levar o cliente direto para o WhatsApp.',
          icon: Globe,
          points: ['Visual profissional', 'Contato pelo WhatsApp', 'Funciona no celular']
        },
        {
          title: 'Sistemas para organizar seu negócio',
          description: 'Painéis sob medida para controlar clientes, pedidos, reservas, serviços e informações importantes.',
          icon: Settings2,
          points: ['Controle interno', 'Dados organizados', 'Mais produtividade']
        },
        {
          title: 'Agendamentos online',
          description: 'Uma experiência simples para o cliente escolher horário, enviar os dados e chamar no WhatsApp.',
          icon: CalendarCheck,
          points: ['Horários disponíveis', 'Envio para WhatsApp', 'Ideal para serviços']
        }
      ],
      scrollText: 'Role para explorar'
    },
    es: {
      title: 'Soluciones digitales',
      subtitle: 'para tu negocio',
      services: [
        {
          title: 'Sitios que generan confianza',
          description: 'Páginas modernas para presentar tu negocio, mostrar tus servicios y llevar al cliente directo a WhatsApp.',
          icon: Globe,
          points: ['Visual profesional', 'Contacto por WhatsApp', 'Funciona en celular']
        },
        {
          title: 'Sistemas para organizar tu negocio',
          description: 'Paneles a medida para controlar clientes, pedidos, reservas, servicios e información importante.',
          icon: Settings2,
          points: ['Control interno', 'Datos organizados', 'Más productividad']
        },
        {
          title: 'Agendamientos online',
          description: 'Una experiencia simple para que el cliente elija horario, envíe sus datos y contacte por WhatsApp.',
          icon: CalendarCheck,
          points: ['Horarios disponibles', 'Envío a WhatsApp', 'Ideal para servicios']
        }
      ],
      scrollText: 'Desliza para explorar'
    },
    en: {
      title: 'Digital Solutions',
      subtitle: 'for your business',
      services: [
        {
          title: 'Trustworthy Websites',
          description: 'Modern pages to present your business, showcase your services and take customers straight to WhatsApp.',
          icon: Globe,
          points: ['Professional look', 'WhatsApp contact', 'Mobile friendly']
        },
        {
          title: 'Systems to organize your business',
          description: 'Custom dashboards to manage clients, orders, bookings, services and important information.',
          icon: Settings2,
          points: ['Internal control', 'Organized data', 'More productivity']
        },
        {
          title: 'Online Scheduling',
          description: 'A simple experience for customers to choose a time, send their details and connect via WhatsApp.',
          icon: CalendarCheck,
          points: ['Available times', 'WhatsApp integration', 'Ideal for services']
        }
      ],
      scrollText: 'Scroll to explore'
    }
  }

  return content[language]
}

export default function Services({ language }: ServicesProps) {
  const data = getServices(language)

  return (
    <section className="services" id="servicos">
      {/* IMAGEM DE FUNDO NA ESQUERDA */}
      <div 
        className="services-background"
        style={{ backgroundImage: `url(${serviceImage})` }}
      />
      
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">
            <span className="line-1">{data.title}</span>
            <span className="line-2">{data.subtitle}</span>
          </h2>
        </div>

        <div className="services-grid">
          {data.services.map((service) => {
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
                </div>
              </div>
            )
          })}
        </div>

        {/* SCROLL INDICATOR */}
        <div className="scroll-indicator">
          <div className="scroll-arrows">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="scroll-text">
            {data.scrollText}
          </span>
        </div>
      </div>
    </section>
  )
}