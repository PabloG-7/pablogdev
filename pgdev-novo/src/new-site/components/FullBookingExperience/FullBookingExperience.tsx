import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Users,
  MessageCircle,
  DollarSign,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Clock,
  TrendingUp,
  TrendingDown,
  Zap,
  X,
  Bell,
  Mic,
  Paperclip,
  Smile,
  Calendar as CalendarIcon,
  UserPlus,
} from 'lucide-react'
import type { Language } from '../../types'
import './FullBookingExperience.css'

type Props = {
  language: Language
}

type Tab = 'fluxo' | 'agenda' | 'clientes' | 'financeiro' | 'mensagens'

export default function FullBookingExperience({ language }: Props) {
  const isPt = language === 'pt'
  const [activeTab, setActiveTab] = useState<Tab>('fluxo')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [typing, setTyping] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [appointments, setAppointments] = useState([
    { id: 1, time: '09:00', client: 'Ana Souza', service: 'Consulta', status: 'confirmed', phone: '(11) 99999-1234' },
    { id: 2, time: '10:30', client: 'Carlos Lima', service: 'Banho e Tosa', status: 'pending', phone: '(11) 98888-5678' },
    { id: 3, time: '13:00', client: 'Fernanda Costa', service: 'Corte', status: 'confirmed', phone: '(11) 97777-9012' },
    { id: 4, time: '15:30', client: 'Lucas Mendes', service: 'Retorno', status: 'cancelled', phone: '(11) 96666-3456' },
    { id: 5, time: '17:00', client: 'Mariana Silva', service: 'Massagem', status: 'completed', phone: '(11) 95555-7890' },
  ])

  const clients = [
    { id: 1, name: 'Ana Souza', phone: '(11) 99999-1234', total: 12, totalSpent: 1440, lastVisit: '2 dias atrás', avatar: 'A', nextAppointment: '09:00 - Consulta' },
    { id: 2, name: 'Carlos Lima', phone: '(11) 98888-5678', total: 8, totalSpent: 680, lastVisit: '3 dias atrás', avatar: 'C', nextAppointment: '10:30 - Banho' },
    { id: 3, name: 'Fernanda Costa', phone: '(11) 97777-9012', total: 15, totalSpent: 1125, lastVisit: '5 dias atrás', avatar: 'F', nextAppointment: '13:00 - Corte' },
    { id: 4, name: 'Lucas Mendes', phone: '(11) 96666-3456', total: 6, totalSpent: 540, lastVisit: '1 dia atrás', avatar: 'L', nextAppointment: '15:30 - Retorno' },
    { id: 5, name: 'Mariana Silva', phone: '(11) 95555-7890', total: 4, totalSpent: 340, lastVisit: 'Hoje', avatar: 'M', nextAppointment: '17:00 - Massagem' },
  ]

  const getMonthName = (date: Date) => {
    return date.toLocaleString(isPt ? 'pt-BR' : 'es-ES', {
      month: 'long',
      year: 'numeric',
    })
  }

  const goPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const goNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  // Typing effect no WhatsApp
  useEffect(() => {
    if (activeTab !== 'mensagens') return

    const interval = setInterval(() => {
      setTyping(true)
      
      const timeout = setTimeout(() => {
        setTyping(false)
      }, 3000)
      
      return () => clearTimeout(timeout)
    }, 8000)

    return () => clearInterval(interval)
  }, [activeTab])

  // Função para confirmar agendamento no fluxo
  const handleFlowConfirm = () => {
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
    setActiveTab('agenda')

    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'confirmed'
      case 'pending': return 'pending'
      case 'cancelled': return 'cancelled'
      case 'completed': return 'completed'
      default: return 'pending'
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'confirmed': return isPt ? 'Confirmado' : 'Confirmado'
      case 'pending': return isPt ? 'Pendente' : 'Pendiente'
      case 'cancelled': return isPt ? 'Cancelado' : 'Cancelado'
      case 'completed': return isPt ? 'Concluído' : 'Completado'
      default: return isPt ? 'Pendente' : 'Pendiente'
    }
  }

  return (
    <div className="booking-system">
      {/* Mobile Topbar */}
      <div className="booking-mobile-topbar">
        <div className="booking-mobile-logo">
          <div className="booking-logo-mark">P</div>
          <span>PGDev Flow</span>
        </div>
        <div className="booking-mobile-status">
          <div className="booking-live-dot"></div>
          <span>{isPt ? 'Online' : 'En línea'}</span>
        </div>
        <button className="booking-mobile-notif">
          <Bell size={18} />
          <span className="notif-badge">3</span>
        </button>
      </div>

      <aside className="booking-sidebar">
        <div className="booking-logo">
          <div className="booking-logo-mark">P</div>
          <span className="booking-logo-text">PabloG<span>.dev</span></span>
        </div>

        <nav className="booking-nav">
          <button 
            type="button"
            className={`booking-nav-item ${activeTab === 'fluxo' ? 'active' : ''}`}
            onClick={() => setActiveTab('fluxo')}
          >
            <CalendarIcon size={18} />
            <span>{isPt ? 'Fluxo' : 'Flujo'}</span>
          </button>
          <button 
            type="button"
            className={`booking-nav-item ${activeTab === 'agenda' ? 'active' : ''}`}
            onClick={() => setActiveTab('agenda')}
          >
            <Calendar size={18} />
            <span>{isPt ? 'Agenda' : 'Calendario'}</span>
          </button>
          <button 
            type="button"
            className={`booking-nav-item ${activeTab === 'clientes' ? 'active' : ''}`}
            onClick={() => setActiveTab('clientes')}
          >
            <Users size={18} />
            <span>{isPt ? 'Clientes' : 'Clientes'}</span>
          </button>
          <button 
            type="button"
            className={`booking-nav-item ${activeTab === 'financeiro' ? 'active' : ''}`}
            onClick={() => setActiveTab('financeiro')}
          >
            <DollarSign size={18} />
            <span>{isPt ? 'Financeiro' : 'Finanzas'}</span>
          </button>
          <button 
            type="button"
            className={`booking-nav-item ${activeTab === 'mensagens' ? 'active' : ''}`}
            onClick={() => setActiveTab('mensagens')}
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </button>
        </nav>

        <a href="/" className="booking-back-site">
          <ArrowLeft size={16} />
          <span>{isPt ? 'Voltar ao site' : 'Volver al sitio'}</span>
        </a>

        <div className="booking-user-info">
          <div className="booking-user-avatar">P</div>
          <div>
            <div className="booking-user-name">Pablo Gonçalves</div>
            <div className="booking-user-role">{isPt ? 'Administrador' : 'Administrador'}</div>
          </div>
        </div>
      </aside>

      <main className="booking-main-content">
        {/* Toast de sucesso */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="booking-toast"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              ✅ {isPt ? 'Novo agendamento recebido' : 'Nueva reserva recibida'}
            </motion.div>
          )}
        </AnimatePresence>

        <header className="booking-header">
          <a href="/" className="booking-mobile-back">
            <ArrowLeft size={16} />
            <span>{isPt ? 'Voltar ao site' : 'Volver al sitio'}</span>
          </a>

          <div className="booking-header-title">
            <h1>
              {activeTab === 'fluxo' && (isPt ? 'Fluxo do cliente' : 'Flujo del cliente')}
              {activeTab === 'agenda' && (isPt ? 'Agendamentos' : 'Calendario')}
              {activeTab === 'clientes' && (isPt ? 'Clientes' : 'Clientes')}
              {activeTab === 'financeiro' && (isPt ? 'Financeiro' : 'Finanzas')}
              {activeTab === 'mensagens' && (isPt ? 'Conversas' : 'Conversaciones')}
            </h1>
            <p>{isPt ? 'Gerencie tudo em um só lugar' : 'Gestiona todo en un solo lugar'}</p>
            <span className="booking-demo-badge">
              {isPt ? 'Demonstração visual' : 'Demostración visual'}
            </span>
          </div>

          <div className="booking-header-actions">
            <button type="button" className="booking-btn-new" onClick={() => setShowModal(true)}>
              <Plus size={16} />
              <span>{isPt ? 'Novo' : 'Nuevo'}</span>
            </button>
            <button type="button" className="booking-btn-icon">
              <Settings size={18} />
            </button>
          </div>
        </header>

        {/* Top Stats */}
        <div className="booking-top-stats">
          <div className="booking-mini-stat">
            <span>{isPt ? 'Hoje' : 'Hoy'}</span>
            <strong>12 {isPt ? 'agendamentos' : 'reservas'}</strong>
          </div>
          <div className="booking-mini-stat">
            <span>{isPt ? 'Receita' : 'Ingresos'}</span>
            <strong>R$ 1.240</strong>
          </div>
          <div className="booking-mini-stat online">
            <div className="booking-live-dot"></div>
            <span>{isPt ? 'Status' : 'Estado'}</span>
            <strong>{isPt ? 'Online' : 'En línea'}</strong>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'fluxo' && (
            <motion.div
              key="fluxo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="booking-client-flow"
            >
              <div className="flow-copy">
                <span>{isPt ? 'Link público' : 'Link público'}</span>
                <h2>{isPt ? 'Seu cliente agenda sozinho' : 'Tu cliente agenda solo'}</h2>
                <p>
                  {isPt
                    ? 'Uma experiência simples: escolha do serviço, horário disponível e confirmação automática pelo WhatsApp.'
                    : 'Una experiencia simple: elección del servicio, horario disponible y confirmación automática por WhatsApp.'}
                </p>
              </div>

              <div className="flow-grid">
                <div className="flow-phone">
                  <div className="flow-phone-header">
                    <strong>PGDev Agenda</strong>
                    <span>pablogdev.com/agendar</span>
                  </div>

                  <div className="flow-step active">
                    <small>01</small>
                    <div>
                      <strong>{isPt ? 'Escolha o serviço' : 'Elige el servicio'}</strong>
                      <p>{isPt ? 'Consulta, corte, banho e tosa...' : 'Consulta, corte, baño...'}</p>
                    </div>
                  </div>

                  <div className="flow-service-card selected">
                    <span>Consulta</span>
                    <strong>R$ 120</strong>
                  </div>

                  <div className="flow-step active">
                    <small>02</small>
                    <div>
                      <strong>{isPt ? 'Escolha o horário' : 'Elige el horario'}</strong>
                      <p>{isPt ? 'Horários disponíveis em tempo real.' : 'Horarios disponibles en tiempo real.'}</p>
                    </div>
                  </div>

                  <div className="flow-times">
                    <button type="button">09:00</button>
                    <button type="button" className="selected">14:00</button>
                    <button type="button">16:30</button>
                  </div>

                  <button 
                    type="button" 
                    className="flow-confirm-btn"
                    onClick={handleFlowConfirm}
                  >
                    {isPt ? 'Confirmar agendamento' : 'Confirmar reserva'}
                  </button>
                </div>

                <div className="flow-result">
                  <div className="flow-result-card">
                    <span>{isPt ? 'Agenda atualizada' : 'Agenda actualizada'}</span>
                    <strong>Ana Souza</strong>
                    <p>14:00 — Consulta</p>
                    <small>{isPt ? 'Status: confirmado' : 'Estado: confirmado'}</small>
                  </div>

                  <div className="flow-whatsapp-card">
                    <MessageCircle size={18} />
                    <p>
                      {isPt
                        ? 'Olá Ana! Seu horário foi confirmado para amanhã às 14h ✅'
                        : '¡Hola Ana! Tu horario fue confirmado para mañana a las 14h ✅'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'agenda' && (
            <motion.div
              key="agenda"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="booking-agenda-view"
            >
              {appointments.length === 0 ? (
                <div className="booking-empty-state">
                  <CalendarIcon size={48} />
                  <h3>{isPt ? 'Nenhum agendamento' : 'Sin reservas'}</h3>
                  <p>{isPt ? 'Crie seu primeiro agendamento para começar' : 'Crea tu primera reserva para comenzar'}</p>
                  <button className="empty-state-btn" onClick={() => setShowModal(true)}>
                    <Plus size={16} />
                    {isPt ? 'Criar agendamento' : 'Crear reserva'}
                  </button>
                </div>
              ) : (
                <>
                  <div className="booking-calendar-header">
                    <div className="booking-month-nav">
                      <button type="button" onClick={goPrevMonth} className="booking-nav-btn">
                        <ChevronLeft size={18} />
                      </button>
                      <span className="booking-month-name">{getMonthName(currentDate)}</span>
                      <button type="button" onClick={goNextMonth} className="booking-nav-btn">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                    <button type="button" className="booking-btn-filter">
                      <Filter size={14} />
                      <span>{isPt ? 'Filtrar' : 'Filtrar'}</span>
                    </button>
                  </div>

                  <div className="booking-weekdays">
                    {[isPt ? 'SEG' : 'LUN', isPt ? 'TER' : 'MAR', isPt ? 'QUA' : 'MIÉ', isPt ? 'QUI' : 'JUE', isPt ? 'SEX' : 'VIE', isPt ? 'SÁB' : 'SÁB', isPt ? 'DOM' : 'DOM'].map(day => (
                      <div key={day} className="booking-weekday">{day}</div>
                    ))}
                  </div>

                  <div className="booking-appointments-list">
                    <div className="booking-list-header">
                      <span>{isPt ? 'Horário' : 'Hora'}</span>
                      <span>{isPt ? 'Cliente' : 'Cliente'}</span>
                      <span>{isPt ? 'Serviço' : 'Servicio'}</span>
                      <span>{isPt ? 'Status' : 'Estado'}</span>
                      <span></span>
                    </div>
                    {appointments.map((app, idx) => (
                      <motion.div 
                        key={app.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`booking-appointment-row ${idx === 0 ? 'new-appointment' : ''}`}
                      >
                        <div className="booking-appointment-time">
                          <Clock size={14} />
                          <span>{app.time}</span>
                        </div>
                        <div className="booking-appointment-client">
                          <div className="booking-client-avatar">{app.client.charAt(0)}</div>
                          <div>
                            <div className="booking-client-name">{app.client}</div>
                            <div className="booking-client-phone">{app.phone}</div>
                          </div>
                        </div>
                        <div className="booking-appointment-service">{app.service}</div>
                        <div className="booking-appointment-status">
                          <span className={`booking-status-badge ${getStatusColor(app.status)}`}>
                            {getStatusText(app.status)}
                          </span>
                        </div>
                        <div className="booking-appointment-actions">
                          <button type="button" className="booking-action-btn">
                            <MoreHorizontal size={14} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'clientes' && (
            <motion.div
              key="clientes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="booking-clients-view"
            >
              <div className="booking-search-bar">
                <Search size={16} />
                <input type="text" placeholder={isPt ? "Buscar cliente..." : "Buscar cliente..."} />
              </div>
              
              {clients.length === 0 ? (
                <div className="booking-empty-state">
                  <UserPlus size={48} />
                  <h3>{isPt ? 'Nenhum cliente' : 'Sin clientes'}</h3>
                  <p>{isPt ? 'Adicione seus clientes para começar' : 'Agrega tus clientes para comenzar'}</p>
                  <button className="empty-state-btn" onClick={() => setShowModal(true)}>
                    <Plus size={16} />
                    {isPt ? 'Adicionar cliente' : 'Agregar cliente'}
                  </button>
                </div>
              ) : (
                <div className="booking-clients-grid">
                  {clients.map((client, idx) => (
                    <motion.div 
                      key={client.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="booking-client-card"
                      onClick={() => setSelectedClient(client)}
                    >
                      <div className="booking-client-card-avatar">{client.avatar}</div>
                      <div className="booking-client-card-info">
                        <div className="booking-client-card-name">{client.name}</div>
                        <div className="booking-client-card-phone">{client.phone}</div>
                        <div className="booking-client-card-stats">
                          <span>{client.total} {isPt ? 'atendimentos' : 'atenciones'}</span>
                          <span>•</span>
                          <span>{client.lastVisit}</span>
                        </div>
                      </div>
                      <button type="button" className="booking-client-card-action">
                        <MessageCircle size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'financeiro' && (
            <motion.div
              key="financeiro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="booking-finance-view"
            >
              <div className="booking-stats-cards">
                <motion.div whileHover={{ scale: 1.02 }} className="booking-stat-card">
                  <div className="booking-stat-header">
                    <span>{isPt ? 'Receita mensal' : 'Ingresos mensuales'}</span>
                    <TrendingUp size={16} className="trend-up" />
                  </div>
                  <div className="booking-stat-value">R$ 12.480</div>
                  <div className="booking-stat-change positive">+12% vs {isPt ? 'mês anterior' : 'mes anterior'}</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="booking-stat-card">
                  <div className="booking-stat-header">
                    <span>{isPt ? 'Despesas' : 'Gastos'}</span>
                    <TrendingDown size={16} className="trend-down" />
                  </div>
                  <div className="booking-stat-value">R$ 5.720</div>
                  <div className="booking-stat-change negative">-8% vs {isPt ? 'mês anterior' : 'mes anterior'}</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="booking-stat-card highlight">
                  <div className="booking-stat-header">
                    <span>{isPt ? 'Lucro líquido' : 'Ganancia neta'}</span>
                    <Zap size={16} />
                  </div>
                  <div className="booking-stat-value">R$ 6.760</div>
                  <div className="booking-stat-change positive">+28% vs {isPt ? 'mês anterior' : 'mes anterior'}</div>
                </motion.div>
              </div>

              <div className="booking-chart-container">
                <div className="booking-chart-header">
                  <h3>{isPt ? 'Receita semanal' : 'Ingresos semanales'}</h3>
                  <span className="trend-up">+15%</span>
                </div>
                <div className="booking-simple-chart">
                  {[35, 70, 45, 90, 60, 80, 55].map((value, i) => (
                    <div key={i} className="chart-bar-container">
                      <motion.div 
                        className="chart-bar" 
                        style={{ height: `${value}%` }}
                        initial={{ height: 0 }}
                        animate={{ height: `${value}%` }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                      >
                        <span className="chart-value">R$ {value * 20}</span>
                      </motion.div>
                      <span className="chart-label">
                        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="booking-transactions">
                <div className="booking-transactions-header">
                  <h3>{isPt ? 'Últimas transações' : 'Últimas transacciones'}</h3>
                  <button type="button" className="booking-see-all">{isPt ? 'Ver todas' : 'Ver todas'}</button>
                </div>
                <div className="booking-transaction-list">
                  {[
                    { title: 'Ana Souza - Consulta', amount: '+R$ 120,00', date: 'Hoje, 10:30', type: 'success' },
                    { title: 'Carlos Lima - Banho e Tosa', amount: '+R$ 85,00', date: 'Hoje, 09:15', type: 'success' },
                    { title: 'Taxa de serviço', amount: '-R$ 5,00', date: 'Ontem', type: 'warning' },
                  ].map((trans, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="booking-transaction-item"
                    >
                      <div className="booking-transaction-info">
                        <div className={`booking-transaction-icon ${trans.type}`}>✓</div>
                        <div>
                          <div className="booking-transaction-title">{trans.title}</div>
                          <div className="booking-transaction-date">{trans.date}</div>
                        </div>
                      </div>
                      <div className={`booking-transaction-amount ${trans.type === 'success' ? 'positive' : 'negative'}`}>
                        {trans.amount}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'mensagens' && (
            <motion.div
              key="mensagens"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="booking-messages-view"
            >
              <div className="booking-messages-sidebar">
                <div className="booking-messages-search">
                  <Search size={14} />
                  <input type="text" placeholder={isPt ? "Buscar conversa..." : "Buscar conversación..."} />
                </div>
                <div className="booking-conversations-list">
                  {['Ana Souza', 'Carlos Lima', 'Fernanda Costa'].map((name, idx) => (
                    <div key={idx} className={`booking-conversation ${idx === 0 ? 'active' : ''}`}>
                      <div className="booking-conv-avatar">{name.charAt(0)}</div>
                      <div className="booking-conv-info">
                        <div className="booking-conv-name">{name}</div>
                        <div className="booking-conv-preview">
                          {idx === 0 ? (isPt ? "Olá! Meu horário está confirmado?" : "¡Hola! ¿Mi horario está confirmado?") :
                           idx === 1 ? (isPt ? "Ótimo atendimento, obrigado!" : "Excelente atención, ¡gracias!") :
                           (isPt ? "Posso remarcar meu horário?" : "¿Puedo reprogramar mi horario?")}
                        </div>
                      </div>
                      <div className="booking-conv-time">{idx === 0 ? '10:30' : idx === 1 ? '09:15' : 'Ontem'}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="booking-messages-chat">
                <div className="booking-chat-header">
                  <div className="booking-chat-contact">
                    <div className="booking-chat-avatar">A</div>
                    <div>
                      <div className="booking-chat-name">Ana Souza</div>
                      <div className="booking-chat-status">
                        <div className="booking-live-dot small"></div>
                        {isPt ? 'Online' : 'En línea'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="booking-chat-messages">
                  <div className="booking-message received">
                    <div className="booking-message-bubble">
                      {isPt ? "Olá! Meu horário para amanhã está confirmado?" : "¡Hola! ¿Mi horario para mañana está confirmado?"}
                    </div>
                    <div className="booking-message-time">10:30 <span className="message-status">✓✓</span></div>
                  </div>
                  <div className="booking-message sent">
                    <div className="booking-message-bubble">
                      {isPt ? "Sim, Ana! Seu horário das 14h está confirmado ✅" : "¡Sí, Ana! Tu horario de las 14h está confirmado ✅"}
                    </div>
                    <div className="booking-message-time">10:32 <span className="message-status">✓✓ Lido</span></div>
                  </div>
                  
                  {typing && (
                    <div className="booking-typing-indicator">
                      <div className="booking-typing-dot"></div>
                      <div className="booking-typing-dot"></div>
                      <div className="booking-typing-dot"></div>
                      <span>{isPt ? 'digitando...' : 'escribiendo...'}</span>
                    </div>
                  )}
                  
                  <div className="booking-message received">
                    <div className="booking-message-bubble">
                      {isPt ? "Perfeito! Muito obrigada 🙌" : "¡Perfecto! Muchas gracias 🙌"}
                    </div>
                    <div className="booking-message-time">10:33 <span className="message-status">✓✓</span></div>
                  </div>
                </div>
                <div className="booking-chat-input">
                  <button type="button" className="chat-action-btn">
                    <Paperclip size={18} />
                  </button>
                  <input type="text" placeholder={isPt ? "Digite sua mensagem..." : "Escribe tu mensaje..."} />
                  <button type="button" className="chat-action-btn">
                    <Mic size={18} />
                  </button>
                  <button type="button" className="chat-action-btn">
                    <Smile size={18} />
                  </button>
                  <button type="button" className="booking-send-btn">
                    {isPt ? 'Enviar' : 'Enviar'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modal Novo Agendamento */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="booking-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              className="booking-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="booking-modal-header">
                <h3>{isPt ? 'Novo Agendamento' : 'Nueva Reserva'}</h3>
                <button onClick={() => setShowModal(false)}>
                  <X size={18} />
                </button>
              </div>
              <div className="booking-modal-body">
                <div className="booking-form-group">
                  <label>{isPt ? 'Cliente' : 'Cliente'}</label>
                  <input type="text" placeholder={isPt ? "Nome do cliente" : "Nombre del cliente"} />
                </div>
                <div className="booking-form-group">
                  <label>{isPt ? 'Serviço' : 'Servicio'}</label>
                  <select>
                    <option>Consulta</option>
                    <option>Banho e Tosa</option>
                    <option>Corte</option>
                    <option>Massagem</option>
                  </select>
                </div>
                <div className="booking-form-row">
                  <div className="booking-form-group">
                    <label>{isPt ? 'Data' : 'Fecha'}</label>
                    <input type="date" />
                  </div>
                  <div className="booking-form-group">
                    <label>{isPt ? 'Horário' : 'Hora'}</label>
                    <input type="time" />
                  </div>
                </div>
              </div>
              <div className="booking-modal-footer">
                <button className="modal-cancel" onClick={() => setShowModal(false)}>
                  {isPt ? 'Cancelar' : 'Cancelar'}
                </button>
                <button className="modal-confirm">
                  {isPt ? 'Criar agendamento' : 'Crear reserva'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer Cliente */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div 
            className="booking-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedClient(null)}
          >
            <motion.div 
              className="booking-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="booking-drawer-header">
                <div className="booking-drawer-avatar">{selectedClient.avatar}</div>
                <div>
                  <h3>{selectedClient.name}</h3>
                  <p>{selectedClient.phone}</p>
                </div>
                <button onClick={() => setSelectedClient(null)}>
                  <X size={18} />
                </button>
              </div>
              <div className="booking-drawer-body">
                <div className="drawer-stats">
                  <div>
                    <span>{isPt ? 'Total atendimentos' : 'Total atenciones'}</span>
                    <strong>{selectedClient.total}</strong>
                  </div>
                  <div>
                    <span>{isPt ? 'Total gasto' : 'Total gastado'}</span>
                    <strong>R$ {selectedClient.totalSpent}</strong>
                  </div>
                </div>
                <div className="drawer-info">
                  <div className="drawer-info-row">
                    <span>{isPt ? 'Última visita' : 'Última visita'}</span>
                    <strong>{selectedClient.lastVisit}</strong>
                  </div>
                  <div className="drawer-info-row">
                    <span>{isPt ? 'Próximo horário' : 'Próximo horario'}</span>
                    <strong>{selectedClient.nextAppointment}</strong>
                  </div>
                </div>
                <div className="drawer-actions">
                  <button className="drawer-btn primary">
                    <MessageCircle size={16} />
                    {isPt ? 'Enviar mensagem' : 'Enviar mensaje'}
                  </button>
                  <button className="drawer-btn">
                    <Calendar size={16} />
                    {isPt ? 'Ver histórico' : 'Ver historial'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}