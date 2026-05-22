import { useState } from 'react'
import {
  CalendarCheck,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Check,
  Hourglass,
  Lock,
  Store,
  User,
  Phone,
  Calendar,
  CreditCard,
  Bell,
  MessageCircle,
  Star,
  ChevronRight,
  MoreVertical,
  Scissors,
  Stethoscope,
  Sparkles,
  Database,
  Zap,
  MessageSquare
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
    <section className="exp-demo" id="experiencia">
      <div className="exp-demo-container">
        <div className="exp-demo-copy">
          <span className="exp-demo-label">
            {copy.label}
          </span>
          <h2>
            {copy.title}
            <span className="exp-demo-highlight">.</span>
          </h2>
          <p>{copy.text}</p>
          <p className="exp-demo-strong-text">{copy.subtitle}</p>
          <div className="exp-demo-interaction-hint">
            <span>Interaja com a prévia ao lado</span>
            <ArrowRight size={16} className="exp-demo-hint-arrow" />
          </div>
        </div>

        <div className="exp-demo-panel">
          <div className="exp-demo-tabs">
            {[
              { id: 'agendamento', icon: CalendarCheck, label: isPt ? 'Agendamento' : 'Agendamiento', locked: false },
              { id: 'agenda', icon: Clock, label: isPt ? 'Calendário' : 'Calendario', locked: !canOpenAgenda },
              { id: 'whatsapp', icon: FaWhatsapp, label: 'WhatsApp', locked: !canOpenWhatsapp },
              { id: 'cliente', icon: Users, label: isPt ? 'Clientes' : 'Clientes', locked: !canOpenCliente },
              { id: 'resultado', icon: CheckCircle, label: isPt ? 'Resultado' : 'Resultado', locked: !canOpenResultado },
            ].map((tab) => {
              const Icon = tab.icon
              const isDisabled = tab.locked
              
              return (
                <button
                  key={tab.id}
                  className={`exp-demo-tab ${activeTab === tab.id ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
                  onClick={() => handleTabClick(tab.id as Tab)}
                  disabled={isDisabled}
                >
                  <Icon size={14} />
                  {tab.label}
                  {isDisabled && <Lock size={10} className="exp-demo-lock-icon" />}
                </button>
              )
            })}
          </div>

          <div className="exp-demo-screen">
            {activeTab === 'agendamento' && (
              <div className="exp-demo-preview-content">
                <div className="exp-demo-business-header">
                  <div className="exp-demo-business-info">
                    <div className="exp-demo-business-avatar">
                      <Store size={14} />
                    </div>
                    <div>
                      <h4>Studio Marina</h4>
                      <div className="exp-demo-business-rating">
                        <Star size={10} fill="#fec90f" color="#fec90f" />
                        <Star size={10} fill="#fec90f" color="#fec90f" />
                        <Star size={10} fill="#fec90f" color="#fec90f" />
                        <Star size={10} fill="#fec90f" color="#fec90f" />
                        <Star size={10} fill="#fec90f" color="#fec90f" />
                        <span>(128 avaliações)</span>
                      </div>
                    </div>
                  </div>
                  <button className="exp-demo-more-btn">
                    <MoreVertical size={14} />
                  </button>
                </div>

                <div className="exp-demo-service-section">
                  <label>Serviço</label>
                  <div className="exp-demo-services-list">
                    <div 
                      className={`exp-demo-service-card ${selectedService === 'consulta' ? 'selected' : ''}`}
                      onClick={() => setSelectedService('consulta')}
                    >
                      <div className="exp-demo-service-icon">
                        <Stethoscope size={18} />
                      </div>
                      <div className="exp-demo-service-info">
                        <strong>Consulta com Dra. Marina</strong>
                        <span>50min</span>
                      </div>
                      <div className="exp-demo-service-price">R$ 120</div>
                    </div>
                    
                    <div 
                      className={`exp-demo-service-card ${selectedService === 'banho' ? 'selected' : ''}`}
                      onClick={() => setSelectedService('banho')}
                    >
                      <div className="exp-demo-service-icon">
                        <Scissors size={18} />
                      </div>
                      <div className="exp-demo-service-info">
                        <strong>Banho e Tosa</strong>
                        <span>40min</span>
                      </div>
                      <div className="exp-demo-service-price">R$ 85</div>
                    </div>
                  </div>
                </div>

                <div className="exp-demo-time-section">
                  <label>Horário</label>
                  <div className="exp-demo-mini-times">
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
                </div>

                <div className="exp-demo-client-data">
                  <div className="exp-demo-data-field">
                    <User size={12} />
                    <input type="text" placeholder="Nome completo" defaultValue="Ana Souza" />
                  </div>
                  <div className="exp-demo-data-field">
                    <Phone size={12} />
                    <input type="text" placeholder="WhatsApp" defaultValue="(11) 99999-9999" />
                  </div>
                </div>

                <button
                  type="button"
                  className="exp-demo-mini-confirm"
                  onClick={() => {
                    setTutorialStep(2)
                    setActiveTab('agenda')
                  }}
                >
                  Confirmar agendamento
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {activeTab === 'agenda' && (
              <div className="exp-demo-preview-content">
                <div className="exp-demo-calendar-header">
                  <div className="exp-demo-calendar-title">
                    <Calendar size={14} />
                    <h4>Agenda de hoje</h4>
                  </div>
                  <div className="exp-demo-date-selector">
                    <span>18 de Novembro</span>
                    <ChevronRight size={12} />
                  </div>
                </div>

                <div className="exp-demo-schedule-list">
                  {[
                    { time: '09:00', service: 'Banho e Tosa', client: 'Roberto Silva', status: 'confirmed' },
                    { time: '10:30', service: 'Consulta', client: 'Mariana Costa', status: 'confirmed' },
                    { time: '14:00', service: 'Vacinação', client: 'Carlos Eduardo', status: 'pending' },
                    { time: '15:30', service: 'Retorno', client: 'Fernanda Lima', status: 'confirmed' },
                  ].map((item, idx) => (
                    <div className="exp-demo-schedule-item" key={idx}>
                      <div className="exp-demo-schedule-time">
                        <Clock size={12} />
                        <strong>{item.time}</strong>
                      </div>
                      <div className="exp-demo-schedule-details">
                        <span className="exp-demo-service-name">{item.service}</span>
                        <span className="exp-demo-client-name">{item.client}</span>
                      </div>
                      <div className={`exp-demo-status-badge ${item.status}`}>
                        {item.status === 'confirmed' ? (
                          <><Check size={10} /> Confirmado</>
                        ) : (
                          <><Hourglass size={10} /> Pendente</>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="exp-demo-mini-next-calendar" 
                  onClick={() => {
                    setTutorialStep(3)
                    setActiveTab('whatsapp')
                  }}
                >
                  <MessageCircle size={14} />
                  Ver confirmação no WhatsApp
                </button>
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="exp-demo-preview-content">
                <div className="exp-demo-whatsapp-header">
                  <FaWhatsapp size={16} color="#25d366" />
                  <span>Studio Marina</span>
                  <span className="exp-demo-auto-badge">Atendimento automático</span>
                </div>

                <div className="exp-demo-whatsapp-conversation">
                  <div className="exp-demo-message-row received">
                    <div className="exp-demo-message-bubble">
                      <p><Check size={10} /> Seu horário está confirmado para amanhã às 14h.</p>
                      <span className="exp-demo-message-time">Agendamento confirmado</span>
                    </div>
                  </div>
                  <div className="exp-demo-message-row received">
                    <div className="exp-demo-message-bubble reminder">
                      <p><Bell size={10} /> Lembrete: sua consulta é em 2 horas!</p>
                    </div>
                  </div>
                </div>

                <div className="exp-demo-whatsapp-features">
                  <div className="exp-demo-feature-item">
                    <Bell size={12} />
                    <span>Lembretes automáticos</span>
                  </div>
                  <div className="exp-demo-feature-item">
                    <CheckCircle size={12} />
                    <span>Confirmação instantânea</span>
                  </div>
                  <div className="exp-demo-feature-item">
                    <MessageSquare size={12} />
                    <span>Pós-atendimento</span>
                  </div>
                </div>
                
                <button 
                  className="exp-demo-mini-next-whatsapp" 
                  onClick={() => {
                    setTutorialStep(4)
                    setActiveTab('cliente')
                  }}
                >
                  Ver ficha do cliente
                  <ChevronRight size={14} />
                </button>
              </div>
            )}

            {activeTab === 'cliente' && (
              <div className="exp-demo-preview-content">
                <div className="exp-demo-client-profile-header">
                  <div className="exp-demo-client-avatar-large">AS</div>
                  <div className="exp-demo-client-info">
                    <h4>Ana Souza</h4>
                    <div className="exp-demo-client-meta">
                      <span><Calendar size={10} /> Desde Out 2024</span>
                      <span><CheckCircle size={10} /> 12 atendimentos</span>
                    </div>
                  </div>
                </div>

                <div className="exp-demo-client-info-grid">
                  <div className="exp-demo-info-card">
                    <Phone size={12} />
                    <div>
                      <span>Contato</span>
                      <strong>(11) 99999-9999</strong>
                    </div>
                  </div>
                  <div className="exp-demo-info-card">
                    <Calendar size={12} />
                    <div>
                      <span>Próximo agendamento</span>
                      <strong>Amanhã, 14h</strong>
                    </div>
                  </div>
                  <div className="exp-demo-info-card">
                    <CreditCard size={12} />
                    <div>
                      <span>Último serviço</span>
                      <strong>Consulta - R$ 120</strong>
                    </div>
                  </div>
                </div>

                <div className="exp-demo-client-history">
                  <div className="exp-demo-history-item">
                    <Calendar size={10} />
                    <span>15/11/2024</span>
                    <span>Consulta</span>
                    <Check size={10} color="#4caf50" />
                  </div>
                  <div className="exp-demo-history-item">
                    <Calendar size={10} />
                    <span>10/11/2024</span>
                    <span>Retorno</span>
                    <Check size={10} color="#4caf50" />
                  </div>
                  <div className="exp-demo-history-item">
                    <Calendar size={10} />
                    <span>05/11/2024</span>
                    <span>Vacinação</span>
                    <Check size={10} color="#4caf50" />
                  </div>
                </div>
                
                <button 
                  className="exp-demo-mini-next-client" 
                  onClick={() => {
                    setTutorialStep(5)
                    setActiveTab('resultado')
                  }}
                >
                  Ver resultado final
                </button>
              </div>
            )}

            {activeTab === 'resultado' && (
              <div className="exp-demo-preview-content">
                <div className="exp-demo-result-stats">
                  <div className="exp-demo-stat-card">
                    <div className="exp-demo-stat-icon">
                      <Sparkles size={18} />
                    </div>
                    <div className="exp-demo-stat-content">
                      <span>Fluxo completo</span>
                      <strong>Cliente agendou sozinho</strong>
                    </div>
                  </div>
                  <div className="exp-demo-stat-card">
                    <div className="exp-demo-stat-icon">
                      <FaWhatsapp size={18} color="#25d366" />
                    </div>
                    <div className="exp-demo-stat-content">
                      <span>WhatsApp</span>
                      <strong>Confirmação automática</strong>
                    </div>
                  </div>
                  <div className="exp-demo-stat-card">
                    <div className="exp-demo-stat-icon">
                      <Database size={18} />
                    </div>
                    <div className="exp-demo-stat-content">
                      <span>Organização</span>
                      <strong>Tudo salvo no sistema</strong>
                    </div>
                  </div>
                </div>

                <div className="exp-demo-result-highlight">
                  <Zap size={16} color="#fec90f" />
                  <p>Sistema funcionando 24/7 sem intervenção manual</p>
                </div>

                <a href="#contato" className="exp-demo-mini-next-result">
                  Quero um sistema assim
                  <ArrowRight size={14} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}