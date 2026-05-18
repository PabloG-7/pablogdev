import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Clock,
  TrendingUp,
  X,
  CheckCircle,
  ArrowRight as ArrowRightIcon,
  Target,
  Gift,
  Lock,
  PlusCircle,  
  List,        
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import type { Language } from '../../types'
import logoImg from '../../assets/apple-touch-icon.png'
import './FullBookingExperience.css'

type Props = {
  language: Language
}

type Tab = 'agendar' | 'Calendario' | 'whatsapp' | 'clientes' | 'financeiro'

export default function FullBookingExperience({ language }: Props) {
  const isPt = language === 'pt'
  const [activeTab, setActiveTab] = useState<Tab>('agendar')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedClient, setSelectedClient] = useState<any>(null)

  const [showSuccess, setShowSuccess] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(1)
  const [appointments, setAppointments] = useState([
    { id: 1, time: '09:00', client: 'Ana Souza', service: 'Consulta', status: 'confirmed', phone: '(11) 99999-1234' },
    { id: 2, time: '10:30', client: 'Carlos Lima', service: 'Banho e Tosa', status: 'pending', phone: '(11) 98888-5678' },
    { id: 3, time: '13:00', client: 'Fernanda Costa', service: 'Corte', status: 'confirmed', phone: '(11) 97777-9012' },
  ])

  const clients = [
    { id: 1, name: 'Ana Souza', phone: '(11) 99999-1234', total: 12, totalSpent: 1440, lastVisit: '2 dias atrás', avatar: 'A', nextAppointment: '09:00 - Consulta' },
    { id: 2, name: 'Carlos Lima', phone: '(11) 98888-5678', total: 8, totalSpent: 680, lastVisit: '3 dias atrás', avatar: 'C', nextAppointment: '10:30 - Banho' },
    { id: 3, name: 'Fernanda Costa', phone: '(11) 97777-9012', total: 15, totalSpent: 1125, lastVisit: '5 dias atrás', avatar: 'F', nextAppointment: '13:00 - Corte' },
  ]

  const getMonthName = (date: Date) => {
    return date.toLocaleString(isPt ? 'pt-BR' : 'es-ES', { month: 'long', year: 'numeric' })
  }

  const goPrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  const goNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))

  const goToStep = (step: number, tab: Tab) => {
    setTutorialStep(step)
    setActiveTab(tab)
  }

  const canOpenAgenda = tutorialStep >= 2
  const canOpenWhatsapp = tutorialStep >= 3
  const canOpenClientes = tutorialStep >= 4
  const canOpenFinanceiro = tutorialStep >= 5

  const handleBooking = () => {
    const newAppointment = {
      id: Date.now(),
      time: '14:00',
      client: 'Ana Souza',
      service: 'Consulta',
      status: 'confirmed',
      phone: '(11) 99999-1234',
    }
    setAppointments(prev => [newAppointment, ...prev])
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
    goToStep(2, 'Calendario')
  }

  const getStatusColor = (status: string) => {
    if (status === 'confirmed') return 'confirmed'
    if (status === 'pending') return 'pending'
    return 'pending'
  }

  const getStatusText = (status: string) => {
    if (status === 'confirmed') return 'Confirmado'
    if (status === 'pending') return 'Pendente'
    return 'Pendente'
  }

  const handleNavClick = (tab: Tab) => {
    if (tab === 'Calendario' && !canOpenAgenda) return
    if (tab === 'whatsapp' && !canOpenWhatsapp) return
    if (tab === 'clientes' && !canOpenClientes) return
    if (tab === 'financeiro' && !canOpenFinanceiro) return
    setActiveTab(tab)
  }

  return (
    <div className="booking-simple">
      {/* Mobile Topbar */}
      <div className="simple-topbar">
        <div className="simple-logo">
          <img src={logoImg} alt="Logo" className="simple-logo-img" />
          <span>Agendamento</span>
        </div>
        <div className="simple-status">
          <div className="simple-dot"></div>
          <span>Online</span>
        </div>
      </div>

      {/* Sidebar Desktop */}
      <aside className="simple-sidebar">
        <div className="simple-sidebar-logo">
          <img src={logoImg} alt="Logo" className="simple-logo-img" />
          <span>Agendamento</span>
        </div>

        <div className="simple-step-info">
          <span className="simple-step-label">Passo {tutorialStep} de 5</span>
          <div className="simple-step-bar">
            <div className="simple-step-progress" style={{ width: `${(tutorialStep / 5) * 100}%` }} />
          </div>
        </div>

        <nav className="simple-nav">
          <button 
            className={`simple-nav-item ${activeTab === 'agendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('agendar')}
          >
            <PlusCircle size={18} /> {/* Ícone de AGENDAR (círculo com +) */}
            <span>Agendar</span>
          </button>
          <button 
            className={`simple-nav-item ${activeTab === 'Calendario' ? 'active' : ''} ${!canOpenAgenda ? 'locked' : ''}`}
            onClick={() => handleNavClick('Calendario')}
            disabled={!canOpenAgenda}
          >
            <List size={18} /> {/* Ícone de AGENDA (lista) - COMPLETAMENTE DIFERENTE */}
            <span>Calendário</span>
            {!canOpenAgenda && <Lock size={12} />}
          </button>
          <button 
            className={`simple-nav-item ${activeTab === 'whatsapp' ? 'active' : ''} ${!canOpenWhatsapp ? 'locked' : ''}`}
            onClick={() => handleNavClick('whatsapp')}
            disabled={!canOpenWhatsapp}
          >
            <FaWhatsapp size={18} />
            <span>WhatsApp</span>
            {!canOpenWhatsapp && <Lock size={12} />}
          </button>
          <button 
            className={`simple-nav-item ${activeTab === 'clientes' ? 'active' : ''} ${!canOpenClientes ? 'locked' : ''}`}
            onClick={() => handleNavClick('clientes')}
            disabled={!canOpenClientes}
          >
            <Users size={18} />
            <span>Clientes</span>
            {!canOpenClientes && <Lock size={12} />}
          </button>
          <button 
            className={`simple-nav-item ${activeTab === 'financeiro' ? 'active' : ''} ${!canOpenFinanceiro ? 'locked' : ''}`}
            onClick={() => handleNavClick('financeiro')}
            disabled={!canOpenFinanceiro}
          >
            <DollarSign size={18} />
            <span>Financeiro</span>
            {!canOpenFinanceiro && <Lock size={12} />}
          </button>
        </nav>

        <div className="simple-user">
          <div className="simple-avatar">P</div>
          <div>
            <div className="simple-name">Pablo Gomes</div>
            <div className="simple-role">Admin</div>
          </div>
        </div>
      </aside>

      {/* Main Content - continua igual */}
      <main className="simple-main">
        {/* Toast simples */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div className="simple-toast" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <CheckCircle size={16} />
              Agendamento confirmado!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conteúdo - Uma etapa = Uma ideia */}
        <AnimatePresence mode="wait">
          {/* ETAPA 1: AGENDAR */}
          {activeTab === 'agendar' && (
            <motion.div key="agendar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="simple-card">
              <div className="simple-header">
                <h2>Como o agendamento funciona</h2>
                <p>O cliente escolhe o serviço e confirma o horário</p>
              </div>

              <div className="simple-demo">
                <div className="simple-demo-header">
                  <a href="/agendar-demo" className="simple-demo-link">pablogdev.com/agendar-demo</a>
                </div>

                <div className="simple-step-label">1. Escolha o serviço</div>
                <div className="simple-service selected">
                  <div>
                    <strong>Consulta com Dra. Marina</strong>
                    <span>50min</span>
                  </div>
                  <span className="simple-price">R$ 120</span>
                </div>
                <div className="simple-service">
                  <div>
                    <strong>Banho e Tosa</strong>
                    <span>1h</span>
                  </div>
                  <span className="simple-price">R$ 85</span>
                </div>

                <div className="simple-step-label">2. Escolha o horário</div>
                <div className="simple-times">
                  <button className="simple-time">09:00</button>
                  <button className="simple-time active">14:00</button>
                  <button className="simple-time">16:30</button>
                </div>

                <button className="simple-btn" onClick={handleBooking}>
                  <CheckCircle size={16} />
                  Confirmar horário
                </button>
              </div>

              <div className="simple-hint">
                <Target size={14} />
                <span>Clique no botão para continuar</span>
              </div>
            </motion.div>
          )}

          {/* ETAPA 2: CALendário */}
          {activeTab === 'Calendario' && (
            <motion.div key="Calendario" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="simple-card">
              <div className="simple-header">
                <h2>Agendamento no calendário</h2>
                <p>O horário aparece automaticamente</p>
              </div>

              <div className="simple-agenda">
                <div className="simple-month">
                  <button onClick={goPrevMonth}><ChevronLeft size={16} /></button>
                  <span>{getMonthName(currentDate)}</span>
                  <button onClick={goNextMonth}><ChevronRight size={16} /></button>
                </div>

                <div className="simple-week">
                  {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'].map(day => (
                    <div key={day} className="simple-weekday">{day}</div>
                  ))}
                </div>

                <div className="simple-appointments">
                  {appointments.map((app, idx) => (
                    <div key={app.id} className={`simple-appointment ${idx === 0 ? 'new' : ''}`}>
                      <div><Clock size={12} />{app.time}</div>
                      <div><strong>{app.client}</strong> - {app.service}</div>
                      <span className={`simple-status ${getStatusColor(app.status)}`}>{getStatusText(app.status)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="simple-next" onClick={() => goToStep(3, 'whatsapp')}>
                Próximo: Confirmação no WhatsApp
                <ArrowRightIcon size={14} />
              </button>
            </motion.div>
          )}

          {/* ETAPA 3: WHATSAPP */}
          {activeTab === 'whatsapp' && (
            <motion.div key="whatsapp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="simple-card">
              <div className="simple-header">
                <h2>Confirmação automática</h2>
                <p>Cliente recebe mensagem no WhatsApp</p>
              </div>

              <div className="simple-whatsapp">
                <div className="simple-whatsapp-header">
                  <FaWhatsapp size={20} color="#25D366" />
                  <span>Mensagem automática</span>
                </div>
                <div className="simple-whatsapp-bubble">
                  ✅ Olá Ana! Seu horário das 14h foi confirmado.
                </div>
                <div className="simple-whatsapp-footer">
                  <CheckCircle size={12} />
                  <span>Enviado automaticamente • Sem trabalho manual</span>
                </div>
              </div>

              <button className="simple-next" onClick={() => goToStep(4, 'clientes')}>
                Próximo: Cliente salvo
                <ArrowRightIcon size={14} />
              </button>
            </motion.div>
          )}

          {/* ETAPA 4: CLIENTES */}
          {activeTab === 'clientes' && (
            <motion.div key="clientes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="simple-card">
              <div className="simple-header">
                <h2>Cliente salvo automaticamente</h2>
                <p>Histórico completo de cada cliente</p>
              </div>

              <div className="simple-clients">
                {clients.map(client => (
                  <div key={client.id} className="simple-client" onClick={() => setSelectedClient(client)}>
                    <div className="simple-client-avatar">{client.avatar}</div>
                    <div>
                      <div className="simple-client-name">{client.name}</div>
                      <div className="simple-client-phone">{client.phone}</div>
                      <div className="simple-client-stats">{client.total} atendimentos • {client.lastVisit}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="simple-next" onClick={() => goToStep(5, 'financeiro')}>
                Próximo: Resultados
                <ArrowRightIcon size={14} />
              </button>
            </motion.div>
          )}

          {/* ETAPA 5: FINANCEIRO */}
          {activeTab === 'financeiro' && (
            <motion.div key="financeiro" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="simple-card simple-final">
              <div className="simple-header">
                <h2>Resultados organizados</h2>
                <p>Faturamento e métricas importantes</p>
              </div>

              <div className="simple-stats">
                <div className="simple-stat">
                  <span>Faturamento hoje</span>
                  <strong>R$ 1.240</strong>
                </div>
                <div className="simple-stat">
                  <span>Atendimentos hoje</span>
                  <strong>12</strong>
                </div>
                <div className="simple-stat">
                  <span>Confirmações</span>
                  <strong>92%</strong>
                  <TrendingUp size={14} className="trend-up" />
                </div>
              </div>

              <div className="simple-benefits">
                <div><CheckCircle size={14} /> Zero mensagens manuais</div>
                <div><CheckCircle size={14} /> Lembretes automáticos</div>
                <div><CheckCircle size={14} /> Tudo organizado</div>
              </div>

              <a href="/contato" className="simple-cta">
                <Gift size={16} />
                Quero um sistema assim
                <ArrowRightIcon size={14} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Nav Mobile */}
        <div className="simple-bottom-nav">
          <button className={`simple-bottom-item ${activeTab === 'agendar' ? 'active' : ''}`} onClick={() => setActiveTab('agendar')}>
            <PlusCircle size={18} />
            <span>Agendar</span>
          </button>
          <button className={`simple-bottom-item ${activeTab === 'Calendario' ? 'active' : ''} ${!canOpenAgenda ? 'locked' : ''}`} onClick={() => handleNavClick('Calendario')} disabled={!canOpenAgenda}>
            <List size={18} />
            <span>Calendário</span>
          </button>
          <button className={`simple-bottom-item ${activeTab === 'whatsapp' ? 'active' : ''} ${!canOpenWhatsapp ? 'locked' : ''}`} onClick={() => handleNavClick('whatsapp')} disabled={!canOpenWhatsapp}>
            <FaWhatsapp size={18} />
            <span>Zap</span>
          </button>
          <button className={`simple-bottom-item ${activeTab === 'clientes' ? 'active' : ''} ${!canOpenClientes ? 'locked' : ''}`} onClick={() => handleNavClick('clientes')} disabled={!canOpenClientes}>
            <Users size={18} />
            <span>Clientes</span>
          </button>
          <button className={`simple-bottom-item ${activeTab === 'financeiro' ? 'active' : ''} ${!canOpenFinanceiro ? 'locked' : ''}`} onClick={() => handleNavClick('financeiro')} disabled={!canOpenFinanceiro}>
            <DollarSign size={18} />
            <span>Financeiro</span>
          </button>
        </div>
      </main>

      {/* Drawer Cliente */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div className="simple-drawer-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedClient(null)}>
            <motion.div className="simple-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} onClick={e => e.stopPropagation()}>
              <div className="simple-drawer-header">
                <div className="simple-drawer-avatar">{selectedClient.avatar}</div>
                <div>
                  <h3>{selectedClient.name}</h3>
                  <p>{selectedClient.phone}</p>
                </div>
                <button onClick={() => setSelectedClient(null)}><X size={18} /></button>
              </div>
              <div className="simple-drawer-body">
                <div className="simple-drawer-stats">
                  <div><span>Atendimentos</span><strong>{selectedClient.total}</strong></div>
                  <div><span>Total gasto</span><strong>R$ {selectedClient.totalSpent}</strong></div>
                </div>
                <div className="simple-drawer-info">
                  <div><span>Última visita</span><strong>{selectedClient.lastVisit}</strong></div>
                  <div><span>Próximo horário</span><strong>{selectedClient.nextAppointment}</strong></div>
                </div>
                <button className="simple-drawer-btn"><FaWhatsapp size={16} /> Enviar mensagem</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}