import { useState } from 'react'
import {
  CalendarCheck,
  BarChart3,
  MessageCircle,
  Users,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react'
import type { Language } from '../../types'
import './ExperienceDemo.css'

type Props = {
  language: Language
}

type Tab = 'dashboard' | 'agenda' | 'whatsapp' | 'cliente'

export default function ExperienceDemo({ language }: Props) {
  const isPt = language === 'pt'
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  const copy = {
    label: isPt ? 'Demonstração' : 'Demostración',
    title: isPt
      ? 'Veja como funciona na prática'
      : 'Mira cómo funciona en la práctica',
    text: isPt
      ? 'Agendamentos, clientes e confirmações automáticas em um só lugar.'
      : 'Reservas, clientes y confirmaciones automáticas en un solo lugar.',
    cta: isPt ? 'Demo completa' : 'Demo completa',
  }

  return (
    <section className="experience" id="experiencia">
      <div className="experience-container">
        <div className="experience-copy">
          <span className="experience-label">
            {copy.label}
          </span>
          <h2>
            {copy.title}
            <span className="experience-highlight">.</span>
          </h2>
          <p>{copy.text}</p>
          <a href="/demo-agendamento" className="experience-btn">
            {copy.cta}
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="experience-panel">
          <div className="experience-tabs">
            {[
              { id: 'dashboard', icon: BarChart3, label: 'Visão' },
              { id: 'agenda', icon: CalendarCheck, label: 'Agenda' },
              { id: 'whatsapp', icon: MessageCircle, label: 'Zap' },
              { id: 'cliente', icon: Users, label: 'Cliente' },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  className={activeTab === tab.id ? 'active' : ''}
                  onClick={() => setActiveTab(tab.id as Tab)}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="experience-screen">
            {activeTab === 'dashboard' && (
              <>
                <div className="metric-grid">
                  <div>
                    <span>{isPt ? 'Faturamento' : 'Ingresos'}</span>
                    <strong>R$ 2.680</strong>
                  </div>
                  <div>
                    <span>{isPt ? 'Agendamentos' : 'Reservas'}</span>
                    <strong>35</strong>
                  </div>
                  <div>
                    <span>{isPt ? 'Ticket médio' : 'Ticket promedio'}</span>
                    <strong>R$ 76</strong>
                  </div>
                  <div>
                    <span>{isPt ? 'Confirmação' : 'Confirmación'}</span>
                    <strong>92%</strong>
                  </div>
                </div>
                <div className="mini-chart">
                  {[35, 70, 45, 90, 60, 80].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </>
            )}

            {activeTab === 'agenda' && (
              <div className="schedule-list">
                {[
                  ['09:00', isPt ? 'Banho e Tosa' : 'Baño y Corte', 'confirmado'],
                  ['10:30', isPt ? 'Consulta' : 'Consulta', 'confirmado'],
                  ['14:00', isPt ? 'Vacinação' : 'Vacunación', 'pendente'],
                  ['15:30', isPt ? 'Retorno' : 'Retorno', 'confirmado'],
                ].map((item, idx) => (
                  <div className="schedule-item" key={idx}>
                    <div>
                      <Clock size={12} />
                      <strong>{item[0]}</strong>
                    </div>
                    <span>{item[1]}</span>
                    <small className={item[2]}>{item[2] === 'confirmado' ? '✓' : '○'}</small>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="whatsapp-preview">
                <div className="experience-message">
                  <MessageCircle size={14} />
                  <p>
                    {isPt 
                      ? 'Olá! Seu horário está confirmado para amanhã às 14h.'
                      : '¡Hola! Tu horario está confirmado para mañana a las 14h.'}
                  </p>
                </div>
                <div className="features">
                  <div><CheckCircle size={12} /> {isPt ? 'Confirmação' : 'Confirmación'}</div>
                  <div><CheckCircle size={12} /> {isPt ? 'Lembrete' : 'Recordatorio'}</div>
                  <div><CheckCircle size={12} /> {isPt ? 'Pós-atendimento' : 'Post-servicio'}</div>
                </div>
              </div>
            )}

            {activeTab === 'cliente' && (
              <div className="client-preview">
                <div className="client-header">
                  <div className="experience-avatar">A</div>
                  <div>
                    <strong>Ana Souza</strong>
                    <span>{isPt ? 'Cliente desde março' : 'Cliente desde marzo'}</span>
                  </div>
                </div>
                <div className="client-details">
                  <div>
                    <span>{isPt ? 'Serviço' : 'Servicio'}</span>
                    <strong>{isPt ? 'Consulta' : 'Consulta'}</strong>
                  </div>
                  <div>
                    <span>{isPt ? 'Horário' : 'Horario'}</span>
                    <strong>{isPt ? 'Quinta, 14h' : 'Jueves, 14h'}</strong>
                  </div>
                  <div>
                    <span>{isPt ? 'Status' : 'Estado'}</span>
                    <strong className="confirmed">✓ {isPt ? 'Confirmado' : 'Confirmado'}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}