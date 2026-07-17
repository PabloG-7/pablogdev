import { MessageCircle, ClipboardList, Palette, Zap, Eye, Rocket } from 'lucide-react'
import './Process.css'
import type { Language } from '../../types'

type ProcessProps = {
  language: Language
}

export default function Process({ language }: ProcessProps) {
  const content = {
    pt: {
      label: 'COMO EU TRABALHO',
      title: 'Da sua ideia',
      titleSpan: 'ao site pronto',
      steps: [
        {
          icon: MessageCircle,
          title: 'Conversa',
          description: 'Conversamos sobre sua ideia e seus objetivos.'
        },
        {
          icon: ClipboardList,
          title: 'Planejamento',
          description: 'Planejo a estrutura, os recursos e o cronograma do projeto.'
        },
        {
          icon: Palette,
          title: 'Design',
          description: 'Desenvolvo um visual moderno, intuitivo e alinhado à sua marca.'
        },
        {
          icon: Zap,
          title: 'Desenvolvimento',
          description: 'Transformo o projeto em um site rápido, responsivo e funcional.'
        },
        {
          icon: Eye,
          title: 'Revisão',
          description: 'Você testa o resultado e faço os ajustes necessários.'
        },
        {
          icon: Rocket,
          title: 'Entrega',
          description: 'Seu site é publicado e fica pronto para receber clientes.'
        }
      ]
    },
    es: {
      label: 'CÓMO TRABAJO',
      title: 'De tu idea',
      titleSpan: 'al sitio listo',
      steps: [
        {
          icon: MessageCircle,
          title: 'Conversación',
          description: 'Conversamos sobre tu idea y tus objetivos.'
        },
        {
          icon: ClipboardList,
          title: 'Planificación',
          description: 'Planifico la estructura, los recursos y el cronograma del proyecto.'
        },
        {
          icon: Palette,
          title: 'Diseño',
          description: 'Desarrollo un visual moderno, intuitivo y alineado con tu marca.'
        },
        {
          icon: Zap,
          title: 'Desarrollo',
          description: 'Transformo el proyecto en un sitio rápido, responsivo y funcional.'
        },
        {
          icon: Eye,
          title: 'Revisión',
          description: 'Pruebas el resultado y hago los ajustes necesarios.'
        },
        {
          icon: Rocket,
          title: 'Entrega',
          description: 'Tu sitio es publicado y listo para recibir clientes.'
        }
      ]
    },
    en: {
      label: 'HOW I WORK',
      title: 'From your idea',
      titleSpan: 'to the ready website',
      steps: [
        {
          icon: MessageCircle,
          title: 'Conversation',
          description: "We talk about your idea and your goals."
        },
        {
          icon: ClipboardList,
          title: 'Planning',
          description: "I plan the structure, resources and project timeline."
        },
        {
          icon: Palette,
          title: 'Design',
          description: "I develop a modern, intuitive visual aligned with your brand."
        },
        {
          icon: Zap,
          title: 'Development',
          description: "I transform the project into a fast, responsive and functional website."
        },
        {
          icon: Eye,
          title: 'Review',
          description: "You test the result and I make the necessary adjustments."
        },
        {
          icon: Rocket,
          title: 'Delivery',
          description: "Your website is published and ready to receive clients."
        }
      ]
    }
  }

  const currentContent = content[language]

  return (
    <section className="process">
      <div 
        className="process-background"
        style={{ backgroundImage: 'url(/plan-de-fundo-process.png)' }}
      />

      <div className="process-container">
        <div className="process-header">
          <span className="process-label">{currentContent.label}</span>
          <h2>
            {currentContent.title}<br />
            <span>{currentContent.titleSpan}</span>
          </h2>
        </div>

        <div className="process-grid">
          {currentContent.steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="process-card">
                <div className="process-card-number">{String(index + 1).padStart(2, '0')}</div>
                <Icon size={28} className="process-card-icon" />
                <div className="process-card-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}