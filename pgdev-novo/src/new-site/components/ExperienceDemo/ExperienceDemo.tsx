import { useState } from 'react'
import {
  CalendarCheck,
  BarChart3,
  MessageCircle,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Check,
  Hourglass
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
      ? 'Veja passo a passo como o cliente agenda e como tudo aparece no sistema.'
      : 'Mira paso a paso cómo el cliente agenda y cómo todo aparece en el sistema.',
    cta: isPt ? 'Ver tutorial interativo' : 'Ver tutorial interactivo',
    subtitle: isPt
      ? 'Menos mensagens manuais. Mais organização no atendimento.'
      : 'Menos mensajes manuales. Más organización en la atención.',
    autoConfirm: isPt ? 'Confirmação automática' : 'Confirmación automática'
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
          <p className="experience-strong-text">{copy.subtitle}</p>
          <a href="/demo-agendamento" className="experience-btn">
            {copy.cta}
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="experience-panel">
          <div className="experience-tabs">
            {[
              { id: 'dashboard', icon: BarChart3, label: isPt ? 'Resumo' : 'Resumen' },
              { id: 'agenda', icon: CalendarCheck, label: isPt ? 'Horários' : 'Horarios' },
              { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
              { id: 'cliente', icon: Users, label: isPt ? 'Clientes' : 'Clientes' },
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
                    <span>{isPt ? 'Valor médio' : 'Valor promedio'}</span>
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
                  ['09:00', isPt ? 'Banho e Tosa' : 'Baño y Corte', 'confirmed'],
                  ['10:30', isPt ? 'Consulta' : 'Consulta', 'confirmed'],
                  ['14:00', isPt ? 'Vacinação' : 'Vacunación', 'pending'],
                  ['15:30', isPt ? 'Retorno' : 'Retorno', 'confirmed'],
                ].map((item, idx) => (
                  <div className="schedule-item" key={idx}>
                    <div>
                      <Clock size={12} />
                      <strong>{item[0]}</strong>
                    </div>
                    <span>{item[1]}</span>
                    <small className={item[2] === 'confirmed' ? 'confirmed' : 'pending'}>
                      {item[2] === 'confirmed' ? (
                        <><Check size={10} /> {isPt ? 'Confirmado' : 'Confirmado'}</>
                      ) : (
                        <><Hourglass size={10} /> {isPt ? 'Pendente' : 'Pendiente'}</>
                      )}
                    </small>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="whatsapp-preview">
                <div className="auto-confirm-badge">
                  {copy.autoConfirm}
                </div>
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
                    <span>{isPt ? 'Último atendimento há 2 dias' : 'Última atención hace 2 días'}</span>
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