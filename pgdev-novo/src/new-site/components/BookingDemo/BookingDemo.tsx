import { useState, useEffect, useMemo } from 'react'
import {
  Calendar,
  CheckCircle,
  ArrowLeft,
  MessageCircle,
  ChevronRight,
  Check,
  Crown,
  Clock,
  Star,
  Scissors,
  Stethoscope,
  PawPrint,
  Zap,
  User,
  Phone,
  MapPin,
  Info
} from 'lucide-react'
import './BookingDemo.css'
import './BookingDemoGlobal.css'
import { bookingData, type BookingType } from './bookingData'
import logo from '../../assets/apple-touch-icon.png'
import type { Language } from '../../types'

type Props = {
  type: BookingType
  language: Language
}

export default function BookingDemo({ type, language }: Props) {
  const isPt = language === 'pt'
  const data = bookingData[type]

  const text = {
    back: isPt ? 'Voltar' : 'Volver',
    newAppointment: isPt ? 'Agendar horário' : 'Agendar turno',
    service: isPt ? 'Serviço' : 'Servicio',
    professional: isPt ? 'Profissional' : 'Profesional',
    date: isPt ? 'Data' : 'Fecha',
    time: isPt ? 'Horário' : 'Horario',
    yourData: isPt ? 'Seus dados' : 'Tus datos',
    fullName: isPt ? 'Nome completo' : 'Nombre completo',
    namePlaceholder: isPt ? 'Digite seu nome' : 'Escribe tu nombre',
    whatsapp: isPt ? 'WhatsApp' : 'WhatsApp',
    phonePlaceholder: isPt ? '(11) 99999-9999' : '(11) 99999-9999',
    backButton: isPt ? 'Voltar' : 'Volver',
    confirm: isPt ? 'Confirmar agendamento' : 'Confirmar',
    continue: isPt ? 'Continuar' : 'Continuar',
    appointmentConfirmed: isPt ? 'Agendamento confirmado!' : '¡Turno confirmado!',
    hourReserved: isPt ? 'seu horário foi reservado com sucesso.' : 'tu horario fue reservado con éxito.',
    value: isPt ? 'Valor' : 'Valor',
    newAppointmentBtn: isPt ? 'Novo agendamento' : 'Nuevo turno',
    wantThisSystem: isPt ? 'Quero este sistema' : 'Quiero este sistema',
    step1: isPt ? 'Serviço' : 'Servicio',
    step2: isPt ? 'Profissional' : 'Profesional',
    step3: isPt ? 'Data' : 'Fecha',
    step4: isPt ? 'Horário' : 'Horario',
    step5: isPt ? 'Dados' : 'Datos',
    total: isPt ? 'Total' : 'Total',
    appointmentSummary: isPt ? 'Resumo' : 'Resumen',
    bookingCode: isPt ? 'Código' : 'Código',
  }

  const [activeStep, setActiveStep] = useState(1)
  const [selectedService, setSelectedService] = useState(data.services[0])
  const [selectedProfessional, setSelectedProfessional] = useState(data.professionals[0])
  const [selectedDate, setSelectedDate] = useState(data.dates[0])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    data.timeSlots.find((slot) => slot.available) || data.timeSlots[0]
  )
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const confirmationCode = useMemo(() => {
    if (!confirmed) return ''
    return `#${Math.floor(1000 + Math.random() * 9000)}`
  }, [confirmed])

  useEffect(() => {
    document.body.classList.add('booking-demo-active')
    return () => {
      document.body.classList.remove('booking-demo-active')
    }
  }, [])

  const handleNextStep = () => {
    if (activeStep < 5) {
      setActiveStep(activeStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConfirmed(true)
    if (window.fbq) window.fbq('track', 'Lead')
  }

  const handleReset = () => {
    setConfirmed(false)
    setActiveStep(1)
    setName('')
    setPhone('')
  }

  const getIcon = () => {
    if (type === 'barbearia') return <Scissors size={20} />
    if (type === 'clinica') return <Stethoscope size={20} />
    return <PawPrint size={20} />
  }

  const getAccentColor = () => {
    if (type === 'barbearia') return '#f5a623'
    if (type === 'clinica') return '#2e9b9b'
    return '#a855f7'
  }

  const getProfessionalImage = (prof: any) => {
    if (prof.image && prof.image !== '/demo/barbearia/carlos.jpg') {
      return prof.image
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.name)}&background=${getAccentColor().replace('#', '')}&color=fff&size=60&rounded=true`
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>1. {text.step1}</h3>
              <p>Escolha o serviço desejado</p>
            </div>
            <div className="services-list">
              {data.services.map((service) => (
                <button
                  key={service.name}
                  className={`service-item ${selectedService.name === service.name ? 'active' : ''}`}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="service-left">
                    <div className="service-icon">{getIcon()}</div>
                    <div className="service-info">
                      <span className="service-name">{service.name}</span>
                      <span className="service-duration">{service.duration}</span>
                    </div>
                  </div>
                  <div className="service-right">
                    <span className="service-price">{service.price}</span>
                    {selectedService.name === service.name && <Check size={16} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>2. {text.professional}</h3>
              <p>Escolha o profissional</p>
            </div>
            <div className="professionals-list">
              {data.professionals.map((prof) => (
                <button
                  key={prof.name}
                  className={`professional-item ${selectedProfessional.name === prof.name ? 'active' : ''}`}
                  onClick={() => setSelectedProfessional(prof)}
                >
                  <div className="professional-left">
                    <div className="professional-avatar">
                      <img 
                        src={getProfessionalImage(prof)} 
                        alt={prof.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.name)}&background=${getAccentColor().replace('#', '')}&color=fff&size=60`
                        }}
                      />
                    </div>
                    <div className="professional-details">
                      <div className="professional-name">{prof.name}</div>
                      <div className="professional-role">{prof.role}</div>
                      <div className="professional-rating">
                        <Star size={12} fill="#f5a623" stroke="#f5a623" />
                        <span>{prof.rating}</span>
                      </div>
                      <div className="professional-bio">{prof.bio}</div>
                    </div>
                  </div>
                  {selectedProfessional.name === prof.name && <Check size={16} className="professional-check" />}
                </button>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>3. {text.date}</h3>
              <p>Escolha a data</p>
            </div>
            <div className="dates-list">
              {data.dates.map((date) => (
                <button
                  key={date.label}
                  className={`date-item ${selectedDate.label === date.label ? 'active' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="date-day">{date.label}</div>
                  <div className="date-status">{date.status}</div>
                </button>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>4. {text.time}</h3>
              <p>Escolha o horário</p>
            </div>
            <div className="times-list">
              {data.timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  className={`time-item ${selectedTimeSlot.time === slot.time ? 'active' : ''} ${!slot.available ? 'disabled' : ''}`}
                  onClick={() => slot.available && setSelectedTimeSlot(slot)}
                >
                  <Clock size={14} />
                  <span>{slot.time}</span>
                </button>
              ))}
            </div>
          </div>
        )
      case 5:
        return (
          <div className="step-content">
            <div className="step-header">
              <h3>5. {text.yourData}</h3>
              <p>Preencha seus dados</p>
            </div>
            <form onSubmit={handleSubmit} className="customer-form">
              <div className="form-field">
                <label>
                  <User size={14} />
                  {text.fullName}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={text.namePlaceholder}
                  required
                />
              </div>
              <div className="form-field">
                <label>
                  <Phone size={14} />
                  {text.whatsapp}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={text.phonePlaceholder}
                  required
                />
              </div>
              {data.clientFields.map((field) => {
                if (field === 'Nome' || field === 'WhatsApp') return null
                return (
                  <div className="form-field" key={field}>
                    <label>
                      {field === 'Observação' ? <Info size={14} /> : <MapPin size={14} />}
                      {field}
                    </label>
                    {field === 'Observação' ? (
                      <textarea rows={3} placeholder={`Digite ${field.toLowerCase()}`} />
                    ) : field === 'Convênio' ? (
                      <input type="text" placeholder="Ex: Unimed" />
                    ) : field === 'Nome do pet' ? (
                      <input type="text" placeholder="Nome do pet" />
                    ) : field === 'Porte' ? (
                      <select>
                        <option>Pequeno</option>
                        <option>Médio</option>
                        <option>Grande</option>
                      </select>
                    ) : (
                      <input type="text" placeholder={`Digite ${field.toLowerCase()}`} />
                    )}
                  </div>
                )
              })}
            </form>
          </div>
        )
      default:
        return null
    }
  }

  const isStepValid = () => {
    if (activeStep === 5) {
      return name.trim() !== '' && phone.trim() !== ''
    }
    return true
  }

  return (
    <div className="booking-modern" style={{ '--accent': getAccentColor() } as React.CSSProperties}>
      <div className="booking-modern-container">
        {/* Top Bar */}
        <div className="top-bar">
          <a href="/" className="back-link">
            <ArrowLeft size={16} />
            {text.back}
          </a>
          <div className="brand">
            <img src={logo} alt="PabloG.Dev" />
            <span>PabloG.Dev</span>
          </div>
        </div>

        {!confirmed ? (
          <div className="booking-layout">
            {/* Left Column - Steps Navigation */}
            <div className="steps-sidebar">
              <div className="business-info">
                <div className="business-icon">{getIcon()}</div>
                <h2>{data.business}</h2>
                <p>{data.subtitle}</p>
              </div>

              <div className="steps-navigation">
                {[1, 2, 3, 4, 5].map((step) => (
                  <button
                    key={step}
                    className={`nav-step ${activeStep === step ? 'active' : ''} ${activeStep > step ? 'completed' : ''}`}
                    onClick={() => setActiveStep(step)}
                  >
                    <div className="nav-step-number">
                      {activeStep > step ? <Check size={14} /> : step}
                    </div>
                    <div className="nav-step-label">
                      <span className="step-label-small">
                        {step === 1 && text.step1}
                        {step === 2 && text.step2}
                        {step === 3 && text.step3}
                        {step === 4 && text.step4}
                        {step === 5 && text.step5}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Main Content */}
            <div className="main-content-area">
              <div className="content-card">
                {renderStepContent()}
                
                <div className="action-buttons">
                  {activeStep > 1 && (
                    <button className="btn-outline" onClick={handlePrevStep}>
                      {text.backButton}
                    </button>
                  )}
                  {activeStep < 5 ? (
                    <button 
                      className="btn-primary" 
                      onClick={handleNextStep}
                      disabled={!isStepValid()}
                    >
                      {text.continue}
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button 
                      className="btn-primary" 
                      onClick={handleSubmit}
                      disabled={!isStepValid()}
                    >
                      <CheckCircle size={16} />
                      {text.confirm}
                    </button>
                  )}
                </div>
              </div>

              {/* Summary Card */}
              <div className="summary-card">
                <h4>{text.appointmentSummary}</h4>
                <div className="summary-details">
                  <div className="summary-row">
                    <span>{text.service}</span>
                    <strong>{selectedService.name}</strong>
                  </div>
                  <div className="summary-row">
                    <span>{text.professional}</span>
                    <strong>{selectedProfessional.name}</strong>
                  </div>
                  <div className="summary-row">
                    <span>{text.date}</span>
                    <strong>{selectedDate.label}</strong>
                  </div>
                  <div className="summary-row">
                    <span>{text.time}</span>
                    <strong>{selectedTimeSlot.time}</strong>
                  </div>
                  <div className="summary-divider" />
                  <div className="summary-total">
                    <span>{text.total}</span>
                    <strong>{selectedService.price}</strong>
                  </div>
                </div>
                {data.extras && (
                  <div className="summary-extras">
                    {data.extras.map((extra) => (
                      <div key={extra} className="extra-badge">
                        <Zap size={12} />
                        {extra}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="success-screen">
            <div className="success-content">
              <div className="success-icon">
                <Crown size={56} />
              </div>
              <h2>{text.appointmentConfirmed}</h2>
              <p>{name}, {text.hourReserved}</p>
              
              <div className="success-info">
                <div className="info-row">
                  <span>{text.service}</span>
                  <strong>{selectedService.name}</strong>
                </div>
                <div className="info-row">
                  <span>{text.professional}</span>
                  <strong>{selectedProfessional.name}</strong>
                </div>
                <div className="info-row">
                  <span>{text.date}</span>
                  <strong>{selectedDate.label}</strong>
                </div>
                <div className="info-row">
                  <span>{text.time}</span>
                  <strong>{selectedTimeSlot.time}</strong>
                </div>
                <div className="info-row highlight">
                  <span>{text.bookingCode}</span>
                  <strong>{confirmationCode}</strong>
                </div>
              </div>

              <button onClick={handleReset} className="new-appointment-btn">
                <Calendar size={16} />
                {text.newAppointmentBtn}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="booking-footer-modern">
          <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" className="whatsapp-link">
            <MessageCircle size={16} />
            {text.wantThisSystem}
            <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}