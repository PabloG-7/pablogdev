import './Services.css'
import { Globe, Settings2, CalendarCheck } from 'lucide-react'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'
import serviceImage from '../../assets/service-background.webp'

type ServicesProps = {
  language: Language
}

// Serviços com suporte a dois idiomas
const getServices = (isPt: boolean) => [
  {
    title: isPt ? 'Sites que passam confiança' : 'Sitios que generan confianza',
    description: isPt
      ? 'Páginas modernas para apresentar seu negócio, mostrar seus serviços e levar o cliente direto para o WhatsApp.'
      : 'Páginas modernas para presentar tu negocio, mostrar tus servicios y llevar al cliente directo a WhatsApp.',
    icon: Globe,
    points: isPt
      ? ['Visual profissional', 'Contato pelo WhatsApp', 'Funciona no celular']
      : ['Visual profesional', 'Contacto por WhatsApp', 'Funciona en celular']
  },
  {
    title: isPt ? 'Sistemas para organizar seu negócio' : 'Sistemas para organizar tu negocio',
    description: isPt
      ? 'Painéis sob medida para controlar clientes, pedidos, reservas, serviços e informações importantes.'
      : 'Paneles a medida para controlar clientes, pedidos, reservas, servicios e información importante.',
    icon: Settings2,
    points: isPt
      ? ['Controle interno', 'Dados organizados', 'Mais produtividade']
      : ['Control interno', 'Datos organizados', 'Más productividad']
  },
  {
    title: isPt ? 'Agendamentos online' : 'Agendamientos online',
    description: isPt
      ? 'Uma experiência simples para o cliente escolher horário, enviar os dados e chamar no WhatsApp.'
      : 'Una experiencia simple para que el cliente elija horario, envíe sus datos y contacte por WhatsApp.',
    icon: CalendarCheck,
    points: isPt
      ? ['Horários disponíveis', 'Envio para WhatsApp', 'Ideal para serviços']
      : ['Horarios disponibles', 'Envío a WhatsApp', 'Ideal para servicios']
  }
]

export default function Services({ language }: ServicesProps) {
  const isPt = language === 'pt'
  const content = isPt ? pt : es
  const services = getServices(isPt)

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
            <span className="line-1">Soluções digitais</span>
            <span className="line-2">para seu negócio</span>
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
            {isPt ? 'Role para explorar' : 'Desliza para explorar'}
          </span>
        </div>
      </div>
    </section>
  )
}