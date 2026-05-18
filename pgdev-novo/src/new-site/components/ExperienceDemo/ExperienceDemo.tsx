import { useState } from 'react'
import {
  CalendarCheck,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Check,
  Hourglass
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import type { Language } from '../../types'
import './ExperienceDemo.css'

type Props = {
  language: Language
}

type Tab = 'agendamento' | 'agenda' | 'whatsapp' | 'cliente' | 'resultado'

export default function ExperienceDemo({ language }: Props) {
  const isPt = language === 'pt'
  const [activeTab, setActiveTab] = useState<Tab>('agendamento')
  const [tutorialStep, setTutorialStep] = useState(1)
  const [tutorialDone] = useState(false)
  const [selectedService, setSelectedService] = useState('consulta')
  const [selectedTime, setSelectedTime] = useState('14:00')

  const canOpenAgenda = tutorialDone || tutorialStep >= 2
  const canOpenWhatsapp = tutorialDone || tutorialStep >= 3
  const canOpenCliente = tutorialDone || tutorialStep >= 4
  const canOpenResultado = tutorialDone || tutorialStep >= 5

  const copy = {
    label: isPt ? 'Agendamento online' : 'Agendamiento online',
    title: isPt
      ? 'Seu cliente agenda sozinho'
      : 'Tu cliente agenda por sí mismo',
    text: isPt
      ? 'O cliente escolhe o serviço, confirma o horário e tudo aparece automaticamente no sistema e WhatsApp.'
      : 'El cliente elige el servicio, confirma el horario y todo aparece automáticamente en el sistema y WhatsApp.',
    subtitle: isPt
      ? 'Agendamentos automáticos, confirmações no WhatsApp e tudo organizado.'
      : 'Agendamientos automáticos, confirmaciones en WhatsApp y todo organizado.',
    autoConfirm: isPt ? 'Confirmação automática' : 'Confirmación automática'
  }

  const handleTabClick = (tabId: Tab) => {
    if (tabId === 'agenda' && !canOpenAgenda) return
    if (tabId === 'whatsapp' && !canOpenWhatsapp) return
    if (tabId === 'cliente' && !canOpenCliente) return
    if (tabId === 'resultado' && !canOpenResultado) return
    setActiveTab(tabId)
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
          <div className="experience-interaction-hint">
            <span>Interaja com a prévia ao lado</span>
            <ArrowRight size={16} />
          </div>
        </div>

        <div className="experience-panel">
          <div className="experience-tabs">
            {[
              { id: 'agendamento', icon: CalendarCheck, label: isPt ? 'Agendamento' : 'Agendamiento' },
              { id: 'agenda', icon: Clock, label: isPt ? 'Calendário' : 'Calendario' },
              { id: 'whatsapp', icon: FaWhatsapp, label: 'WhatsApp' },
              { id: 'cliente', icon: Users, label: isPt ? 'Clientes' : 'Clientes' },
              { id: 'resultado', icon: CheckCircle, label: isPt ? 'Resultado' : 'Resultado' },
            ].map((tab) => {
              const Icon = tab.icon
              const isDisabled = 
                (tab.id === 'agenda' && !canOpenAgenda) ||
                (tab.id === 'whatsapp' && !canOpenWhatsapp) ||
                (tab.id === 'cliente' && !canOpenCliente) ||
                (tab.id === 'resultado' && !canOpenResultado)
              
              return (
                <button
                  key={tab.id}
                  className={`${activeTab === tab.id ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => handleTabClick(tab.id as Tab)}
                  disabled={isDisabled}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="experience-screen">
            {activeTab === 'agendamento' && (
              <div className="booking-preview-mini">
                <div className="services-list">
                  <div 
                    className={`mini-service ${selectedService === 'consulta' ? 'selected' : ''}`}
                    onClick={() => setSelectedService('consulta')}
                  >
                    <div>
                      <strong>Consulta com Dra. Marina</strong>
                      <span>50min • ⭐ 4.9</span>
                    </div>
                    <small>R$ 120</small>
                  </div>
                  
                  <div 
                    className={`mini-service ${selectedService === 'banho' ? 'selected' : ''}`}
                    onClick={() => setSelectedService('banho')}
                  >
                    <div>
                      <strong>Banho e Tosa</strong>
                      <span>40min • ⭐ 4.8</span>
                    </div>
                    <small>R$ 85</small>
                  </div>
                </div>

                <div className="mini-times">
                  <button 
                    className={selectedTime === '09:00' ? 'active' : ''}
                    onClick={() => setSelectedTime('09:00')}
                  >
                    09:00
                  </button>
                  <button 
                    className={selectedTime === '14:00' ? 'active' : ''}
                    onClick={() => setSelectedTime('14:00')}
                  >
                    14:00
                  </button>
                  <button 
                    className={selectedTime === '16:30' ? 'active' : ''}
                    onClick={() => setSelectedTime('16:30')}
                  >
                    16:30
                  </button>
                  <button 
                    className={selectedTime === '18:00' ? 'active' : ''}
                    onClick={() => setSelectedTime('18:00')}
                  >
                    18:00
                  </button>
                </div>

                <button
                  type="button"
                  className="mini-confirm"
                  onClick={() => {
                    setTutorialStep(2)
                    setActiveTab('agenda')
                  }}
                >
                  Confirmar horário
                </button>
              </div>
            )}

            {activeTab === 'agenda' && (
              <>
                <div className="schedule-list">
                  <div className="schedule-date-hint">
                    <span>📅 Hoje, 14 de maio</span>
                  </div>
                  {[
                    ['09:00', 'Banho e Tosa', 'confirmed'],
                    ['10:30', 'Consulta', 'confirmed'],
                    ['14:00', 'Vacinação', 'pending'],
                    ['15:30', 'Retorno', 'confirmed'],
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
                <button 
                  className="mini-next calendar" 
                  onClick={() => {
                    setTutorialStep(3)
                    setActiveTab('whatsapp')
                  }}
                >
                  Ver confirmação no WhatsApp
                </button>
              </>
            )}

            {activeTab === 'whatsapp' && (
              <>
                <div className="whatsapp-preview">
                  <div className="auto-confirm-badge">
                    <FaWhatsapp size={12} color="#25d366" />
                    {copy.autoConfirm}
                  </div>
                  <div className="experience-message">
                    <FaWhatsapp size={14} color="#25d366" />
                    <p>
                      {isPt 
                        ? 'Olá! Seu horário está confirmado para amanhã às 14h. ✅'
                        : '¡Hola! Tu horario está confirmado para mañana a las 14h. ✅'}
                    </p>
                  </div>
                  <div className="features">
                    <div><CheckCircle size={12} /> {isPt ? 'Confirmação' : 'Confirmación'}</div>
                    <div><CheckCircle size={12} /> {isPt ? 'Lembrete' : 'Recordatorio'}</div>
                    <div><CheckCircle size={12} /> {isPt ? 'Pós-atendimento' : 'Post-servicio'}</div>
                  </div>
                </div>
                <button 
                  className="mini-next whatsapp" 
                  onClick={() => {
                    setTutorialStep(4)
                    setActiveTab('cliente')
                  }}
                >
                  Ver cliente salvo
                </button>
              </>
            )}

            {activeTab === 'cliente' && (
              <>
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
                <button 
                  className="mini-next client" 
                  onClick={() => {
                    setTutorialStep(5)
                    setActiveTab('resultado')
                  }}
                >
                  Ver resultado final
                </button>
              </>
            )}

            {activeTab === 'resultado' && (
              <div className="result-preview">
                <div>
                  <span>Fluxo completo</span>
                  <strong>Cliente agendou sozinho</strong>
                </div>
                <div>
                  <span>WhatsApp</span>
                  <strong>Confirmação automática</strong>
                </div>
                <div>
                  <span>Organização</span>
                  <strong>Tudo salvo no sistema</strong>
                </div>

                <a href="#contato" className="mini-next result">
                  Quero um sistema assim
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}