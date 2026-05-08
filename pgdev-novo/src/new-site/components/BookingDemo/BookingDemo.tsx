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
  Zap
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
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
    if (type === 'barbearia') return '#fec90f'
    if (type === 'clinica') return '#2e9b9b'
    return '#a855f7'
  }

  // Função para obter imagem ou placeholder
  const getProfessionalImage = (prof: any) => {
    if (prof.image && prof.image !== '/demo/barbearia/carlos.jpg') {
      return prof.image
    }
    // Placeholder com cor baseada no tipo
    const colors = {
      barbearia: '#fec90f20',
      clinica: '#2e9b9b20',
      petshop: '#a855f720'
    }
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='${colors[type].replace('#', '%23')}'/%3E%3Ctext x='30' y='38' text-anchor='middle' font-size='20' fill='${getAccentColor().replace('#', '%23')}'%3E👤%3C/text%3E%3C/svg%3E`
  }

  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="step-grid">
            {data.services.map((service) => (
              <button
                key={service.name}
                className={`option-card ${selectedService.name === service.name ? 'active' : ''}`}
                onClick={() => setSelectedService(service)}
              >
                <div className="option-info">
                  <span className="option-name">{service.name}</span>
                  <span className="option-duration">{service.duration}</span>
                </div>
                <span className="option-price">{service.price}</span>
                {selectedService.name === service.name && <Check size={16} className="option-check" />}
              </button>
            ))}
          </div>
        )
      case 2:
        return (
          <div className="step-grid">
            {data.professionals.map((prof) => (
              <button
                key={prof.name}
                className={`professional-card ${selectedProfessional.name === prof.name ? 'active' : ''}`}
                onClick={() => setSelectedProfessional(prof)}
              >
                <div className="professional-avatar">
                  <img 
                    src={getProfessionalImage(prof)} 
                    alt={prof.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23e5e7eb'/%3E%3Ctext x='24' y='30' text-anchor='middle' font-size='24' fill='%239ca3af'%3E👤%3C/text%3E%3C/svg%3E`
                    }}
                  />
                </div>
                <div className="professional-info">
                  <div className="professional-name">{prof.name}</div>
                  <div className="professional-role">{prof.role}</div>
                  <div className="professional-rating">
                    <Star size={12} fill="#f5a623" stroke="#f5a623" />
                    <span>{prof.rating}</span>
                  </div>
                  <div className="professional-bio">{prof.bio}</div>
                </div>
                {selectedProfessional.name === prof.name && <Check size={16} className="option-check" />}
              </button>
            ))}
          </div>
        )
      case 3:
        return (
          <div className="step-grid date-grid">
            {data.dates.map((date) => (
              <button
                key={date.label}
                className={`option-card ${selectedDate.label === date.label ? 'active' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="date-day">{date.label}</div>
                <div className="date-status">{date.status}</div>
              </button>
            ))}
          </div>
        )
      case 4:
        return (
          <div className="step-grid time-grid">
            {data.timeSlots.map((slot) => (
              <button
                key={slot.time}
                disabled={!slot.available}
                className={`time-card ${selectedTimeSlot.time === slot.time ? 'active' : ''} ${!slot.available ? 'disabled' : ''}`}
                onClick={() => slot.available && setSelectedTimeSlot(slot)}
              >
                <Clock size={14} />
                <span>{slot.time}</span>
              </button>
            ))}
          </div>
        )
      case 5:
        return (
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>{text.fullName}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={text.namePlaceholder}
                required
              />
            </div>
            <div className="form-group">
              <label>{text.whatsapp}</label>
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
                <div className="form-group" key={field}>
                  <label>{field}</label>
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
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handlePrevStep}>
                {text.backButton}
              </button>
              <button type="submit" className="btn-primary">
                <CheckCircle size={16} />
                {text.confirm}
              </button>
            </div>
          </form>
        )
      default:
        return null
    }
  }

  return (
    <div className="booking" style={{ '--accent': getAccentColor() } as React.CSSProperties}>
      <div className="booking-container">
        {/* Header */}
        <div className="booking-header">
          <a href="/" className="booking-back">
            <ArrowLeft size={16} />
            {text.back}
          </a>
          <div className="booking-logo">
            <img src={logo} alt="PabloG.Dev" />
            <span>PabloG.Dev</span>
          </div>
        </div>

        {/* Hero */}
        <div className="booking-hero">
          <div className="hero-icon">{getIcon()}</div>
          <h1>
            {data.business}
            <span> {text.newAppointment}</span>
          </h1>
          <p>{data.subtitle}</p>
        </div>

        {!confirmed ? (
          <>
            {/* Steps */}
            <div className="steps">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`step ${activeStep >= step ? 'completed' : ''} ${activeStep === step ? 'current' : ''}`}
                >
                  <div className="step-number">{step}</div>
                  <div className="step-label">
                    {step === 1 && text.step1}
                    {step === 2 && text.step2}
                    {step === 3 && text.step3}
                    {step === 4 && text.step4}
                    {step === 5 && text.step5}
                  </div>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="booking-grid">
              {/* Left */}
              <div className="booking-main">
                <div className="section-header">
                  <h2>{text.newAppointment}</h2>
                  <p>Preencha os dados abaixo</p>
                </div>
                {renderStep()}
                {activeStep < 5 && (
                  <button className="continue-btn" onClick={handleNextStep}>
                    {text.continue}
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>

              {/* Right - Summary */}
              <div className="booking-summary">
                <h3>{text.appointmentSummary}</h3>
                <div className="summary-item">
                  <span>{text.service}</span>
                  <strong>{selectedService.name}</strong>
                </div>
                <div className="summary-item">
                  <span>{text.professional}</span>
                  <strong>{selectedProfessional.name}</strong>
                </div>
                <div className="summary-item">
                  <span>{text.date}</span>
                  <strong>{selectedDate.label}</strong>
                </div>
                <div className="summary-item">
                  <span>{text.time}</span>
                  <strong>{selectedTimeSlot.time}</strong>
                </div>
                <div className="summary-divider" />
                <div className="summary-total">
                  <span>{text.total}</span>
                  <strong>{selectedService.price}</strong>
                </div>

                {data.extras && (
                  <div className="summary-extras">
                    {data.extras.map((extra) => (
                      <div key={extra} className="extra-item">
                        <Zap size={12} />
                        <span>{extra}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Summary */}
            <div className="booking-summary-mobile">
              <h3>{text.appointmentSummary}</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span>{text.service}</span>
                  <strong>{selectedService.name}</strong>
                </div>
                <div className="summary-item">
                  <span>{text.professional}</span>
                  <strong>{selectedProfessional.name}</strong>
                </div>
                <div className="summary-item">
                  <span>{text.date}</span>
                  <strong>{selectedDate.label}</strong>
                </div>
                <div className="summary-item">
                  <span>{text.time}</span>
                  <strong>{selectedTimeSlot.time}</strong>
                </div>
              </div>
              <div className="summary-total-mobile">
                <span>{text.total}</span>
                <strong>{selectedService.price}</strong>
              </div>
            </div>
          </>
        ) : (
          /* Success */
          <div className="booking-success">
            <div className="success-icon">
              <Crown size={48} />
            </div>
            <h2>{text.appointmentConfirmed}</h2>
            <p>{name}, {text.hourReserved}</p>
            <div className="success-card">
              <div className="success-row">
                <span>{text.service}</span>
                <strong>{selectedService.name}</strong>
              </div>
              <div className="success-row">
                <span>{text.professional}</span>
                <strong>{selectedProfessional.name}</strong>
              </div>
              <div className="success-row">
                <span>{text.date}</span>
                <strong>{selectedDate.label}</strong>
              </div>
              <div className="success-row">
                <span>{text.time}</span>
                <strong>{selectedTimeSlot.time}</strong>
              </div>
              <div className="success-row highlight">
                <span>{text.bookingCode}</span>
                <strong>{confirmationCode}</strong>
              </div>
            </div>
            <button onClick={handleReset} className="new-btn">
              <Calendar size={14} />
              {text.newAppointmentBtn}
            </button>
          </div>
        )}

        {/* Footer CTA */}
        <div className="booking-footer">
          <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
            <MessageCircle size={16} />
            {text.wantThisSystem}
            <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}