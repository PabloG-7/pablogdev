import { useState, useEffect, useMemo } from 'react'
import {
  Calendar,
  User,
  CheckCircle,
  ArrowLeft,
  MessageCircle,
  ChevronRight,
  Check,
  CalendarDays,
  Crown,
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

  // Textos internacionais
  const text = {
    back: isPt ? 'Voltar' : 'Volver',
    newAppointment: isPt ? 'Novo agendamento' : 'Nuevo turno',
    fillInfo: isPt ? 'Preencha as informações abaixo' : 'Completa la información abajo',
    service: isPt ? 'Serviço' : 'Servicio',
    professional: isPt ? 'Profissional' : 'Profesional',
    date: isPt ? 'Data' : 'Fecha',
    time: isPt ? 'Horário' : 'Horario',
    confirmation: isPt ? 'Confirmação' : 'Confirmación',
    yourData: isPt ? 'Seus dados' : 'Tus datos',
    informData: isPt ? 'Informe seus dados para confirmar' : 'Informa tus datos para confirmar',
    fullName: isPt ? 'Nome completo' : 'Nombre completo',
    namePlaceholder: isPt ? 'Digite seu nome' : 'Escribe tu nombre',
    whatsapp: isPt ? 'WhatsApp' : 'WhatsApp',
    phonePlaceholder: isPt ? '(11) 99999-9999' : '(11) 99999-9999',
    backButton: isPt ? 'Voltar' : 'Volver',
    confirm: isPt ? 'Confirmar agendamento' : 'Confirmar turno',
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
    step6: isPt ? 'Confirmação' : 'Confirmación',
    total: isPt ? 'Total' : 'Total',
    appointmentSummary: isPt ? 'Resumo do agendamento' : 'Resumen del turno',
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
    return `AGD-${Math.floor(1000 + Math.random() * 9000)}`
  }, [confirmed])

  useEffect(() => {
    document.body.classList.add('booking-demo-active')
    
    let accentColor = type === 'barbearia' ? '#fec90f' : type === 'clinica' ? '#2e9b9b' : '#a855f7'
    document.body.style.setProperty('--booking-accent', accentColor)
    
    return () => {
      document.body.classList.remove('booking-demo-active')
      document.body.style.removeProperty('--booking-accent')
    }
  }, [type])

  const handleNextStep = () => {
    if (activeStep < 6) {
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

    if (window.fbq) {
      window.fbq('track', 'Lead')
    }
  }

  const handleReset = () => {
    setConfirmed(false)
    setActiveStep(1)
    setName('')
    setPhone('')
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="booking-v3-section">
            <label>{text.service}</label>
            <div className="booking-v3-service-grid">
              {data.services.map((service) => (
                <button
                  key={service.name}
                  className={`booking-v3-service-card ${selectedService.name === service.name ? 'active' : ''}`}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="booking-v3-service-card-header">
                    <strong>{service.name}</strong>
                    <small>{service.duration || '30 min'}</small>
                    {selectedService.name === service.name && <Check size={16} />}
                  </div>
                  <span className="booking-v3-price">
                    {service.price}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="booking-v3-section">
            <label>{text.professional}</label>
            <div className="booking-v3-professional-grid">
              {data.professionals.map((prof) => (
                <button
                  key={prof.name}
                  className={`booking-v3-professional-card ${selectedProfessional.name === prof.name ? 'active' : ''}`}
                  onClick={() => setSelectedProfessional(prof)}
                >
                  <div className="booking-v3-professional-image">
                    <img src={prof.image} alt={prof.name} />
                  </div>
                  <div className="booking-v3-professional-info">
                    <strong>{prof.name}</strong>
                    <span className="booking-v3-professional-role">{prof.role}</span>
                    <div className="booking-v3-professional-rating">
                      <span>⭐ {prof.rating}</span>
                    </div>
                    <p className="booking-v3-professional-bio">{prof.bio}</p>
                  </div>
                  {selectedProfessional.name === prof.name && <Check size={16} className="check-mark" />}
                </button>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="booking-v3-section">
            <label>{text.date}</label>
            <div className="booking-v3-date-grid">
              {data.dates.map((date) => (
                <button
                  key={date.label}
                  className={`booking-v3-date-card ${
                    selectedDate.label === date.label ? 'active' : ''
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  <strong>{date.label}</strong>
                  <span>{date.status}</span>
                </button>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="booking-v3-section">
            <label>{text.time}</label>
            <div className="booking-v3-time-grid">
              {data.timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  className={`booking-v3-time-card ${
                    selectedTimeSlot.time === slot.time ? 'active' : ''
                  } ${!slot.available ? 'disabled' : ''}`}
                  onClick={() => slot.available && setSelectedTimeSlot(slot)}
                >
                  <strong>{slot.time}</strong>
                  <span>{slot.status}</span>
                </button>
              ))}
            </div>
          </div>
        )
      case 5:
        return (
          <form onSubmit={handleSubmit} className="booking-v3-form">
            <div className="booking-v3-form-header">
              <User size={28} className="booking-v3-header-icon" />
              <h2>{text.yourData}</h2>
              <p>{text.informData}</p>
            </div>

            {data.clientFields.map((field) => {
              if (field === 'Nome') {
                return (
                  <div className="booking-v3-form-group" key={field}>
                    <label>{text.fullName}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={text.namePlaceholder}
                      required
                    />
                  </div>
                )
              }
              if (field === 'WhatsApp') {
                return (
                  <div className="booking-v3-form-group" key={field}>
                    <label>{text.whatsapp}</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={text.phonePlaceholder}
                      required
                    />
                  </div>
                )
              }
              return (
                <div className="booking-v3-form-group" key={field}>
                  <label>{field}</label>
                  {field === 'Observação' ? (
                    <textarea
                      rows={3}
                      placeholder={`Digite ${field.toLowerCase()}`}
                    />
                  ) : field === 'Convênio' ? (
                    <input
                      type="text"
                      placeholder="Ex: Unimed, Amil, etc."
                    />
                  ) : field === 'Nome do pet' ? (
                    <input
                      type="text"
                      placeholder="Digite o nome do seu pet"
                    />
                  ) : field === 'Porte' ? (
                    <select>
                      <option value="">Selecione o porte</option>
                      <option value="Pequeno">Pequeno</option>
                      <option value="Médio">Médio</option>
                      <option value="Grande">Grande</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder={`Digite ${field.toLowerCase()}`}
                    />
                  )}
                </div>
              )
            })}

            <div className="booking-v3-form-actions">
              <button type="button" className="booking-v3-back-btn" onClick={handlePrevStep}>
                {text.backButton}
              </button>
              <button type="submit" className="booking-v3-submit-btn">
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

  const getTypeName = () => {
    if (type === 'barbearia') return isPt ? 'Barbearia' : 'Barbería'
    if (type === 'clinica') return isPt ? 'Clínica' : 'Clínica'
    return isPt ? 'PetShop' : 'PetShop'
  }

  return (
    <div className="booking-demo-v3" data-type={type}>
      <div className="booking-v3-container">
        {/* Navigation */}
        <nav className="booking-v3-nav">
          <a href="/" className="booking-v3-back">
            <ArrowLeft size={16} />
            {text.back}
          </a>
          <div className="booking-v3-logo">
            <img src={logo} alt="PabloG.Dev" className="booking-v3-logo-img" />
            <span>Pablo<span className="booking-v3-logo-accent">G</span>.Dev</span>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="booking-v3-hero">
          <h1>
            {getTypeName()}
            <span> {text.newAppointment}</span>
          </h1>
          <p className="booking-v3-subtitle">{data.subtitle}</p>
        </div>

        {/* Stepper */}
        <div className="booking-steps">
          <div className={`step ${activeStep >= 1 ? 'active' : ''}`}>1 {text.step1}</div>
          <div className={`step ${activeStep >= 2 ? 'active' : ''}`}>2 {text.step2}</div>
          <div className={`step ${activeStep >= 3 ? 'active' : ''}`}>3 {text.step3}</div>
          <div className={`step ${activeStep >= 4 ? 'active' : ''}`}>4 {text.step4}</div>
          <div className={`step ${activeStep >= 5 ? 'active' : ''}`}>5 {text.step5}</div>
          <div className={`step ${activeStep >= 6 ? 'active' : ''}`}>6 {text.step6}</div>
        </div>

        {/* Layout 2 colunas - desktop / 1 coluna - mobile */}
        {!confirmed ? (
          <>
            {/* Desktop: 2 colunas */}
            <div className="booking-v3-layout-desktop">
              {/* Coluna esquerda - Formulário */}
              <div className="booking-v3-card">
                <div className="booking-v3-selection-header">
                  <CalendarDays size={28} className="booking-v3-header-icon" />
                  <h2>{text.newAppointment}</h2>
                  <p>{text.fillInfo}</p>
                </div>
                {renderStepContent()}
                
                {activeStep < 6 && activeStep !== 5 && (
                  <button className="booking-v3-continue-btn" onClick={handleNextStep}>
                    {text.continue}
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>

              {/* Coluna direita - Resumo (Desktop) */}
              <div className="booking-summary-card">
                <h3>{text.appointmentSummary}</h3>
                <div className="booking-summary-item">
                  <span>{text.service}</span>
                  <strong>{selectedService.name}</strong>
                </div>
                <div className="booking-summary-item">
                  <span>{text.professional}</span>
                  <strong>{selectedProfessional.name}</strong>
                </div>
                <div className="booking-summary-item">
                  <span>{text.date}</span>
                  <strong>{selectedDate.label}</strong>
                </div>
                <div className="booking-summary-item">
                  <span>{text.time}</span>
                  <strong>{selectedTimeSlot.time}</strong>
                </div>
                <div className="booking-summary-divider"></div>
                <div className="booking-summary-item total">
                  <span>{text.total}</span>
                  <strong>{selectedService.price}</strong>
                </div>
                
                {/* Info Desktop */}
                <div className="booking-summary-info">
                  {data.info && data.info.map((item) => (
                    <div className="booking-summary-info-item" key={item.label}>
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Extras Desktop */}
                <div className="booking-summary-extras">
                  {data.extras && data.extras.map((extra) => (
                    <div className="booking-summary-extra-item" key={extra}>
                      <Check size={14} />
                      <span>{extra}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumo Mobile (aparece embaixo do formulário) */}
            <div className="booking-summary-card-mobile">
              <h3>{text.appointmentSummary}</h3>
              <div className="booking-summary-mobile-grid">
                <div className="booking-summary-mobile-item">
                  <span>{text.service}</span>
                  <strong>{selectedService.name}</strong>
                </div>
                <div className="booking-summary-mobile-item">
                  <span>{text.professional}</span>
                  <strong>{selectedProfessional.name}</strong>
                </div>
                <div className="booking-summary-mobile-item">
                  <span>{text.date}</span>
                  <strong>{selectedDate.label}</strong>
                </div>
                <div className="booking-summary-mobile-item">
                  <span>{text.time}</span>
                  <strong>{selectedTimeSlot.time}</strong>
                </div>
                <div className="booking-summary-mobile-item total">
                  <span>{text.total}</span>
                  <strong>{selectedService.price}</strong>
                </div>
              </div>
              
              {/* Info Mobile */}
              <div className="booking-summary-mobile-info">
                {data.info && data.info.map((item) => (
                  <div className="booking-summary-mobile-info-item" key={item.label}>
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Extras Mobile */}
              <div className="booking-summary-mobile-extras">
                {data.extras && data.extras.map((extra) => (
                  <div className="booking-summary-mobile-extra-item" key={extra}>
                    <Check size={12} />
                    <span>{extra}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Success Phase - Com código de confirmação */
          <div className="booking-v3-success">
            <div className="booking-v3-success-icon">
              <Crown size={56} />
            </div>
            <h2>{text.appointmentConfirmed}</h2>
            <p>
              {name || (isPt ? 'Cliente' : 'Cliente')}, {text.hourReserved}
            </p>
            <div className="booking-v3-success-card">
              <div className="booking-v3-success-row">
                <span>{text.service}</span>
                <strong>{selectedService.name}</strong>
              </div>
              <div className="booking-v3-success-row">
                <span>{text.professional}</span>
                <strong>{selectedProfessional.name}</strong>
              </div>
              <div className="booking-v3-success-row">
                <span>{text.date}</span>
                <strong>{selectedDate.label}</strong>
              </div>
              <div className="booking-v3-success-row">
                <span>{text.time}</span>
                <strong>{selectedTimeSlot.time}</strong>
              </div>
              <div className="booking-v3-success-row">
                <span>{text.bookingCode}</span>
                <strong className="booking-v3-success-code">{confirmationCode}</strong>
              </div>
              <div className="booking-v3-success-row">
                <span>{text.value}</span>
                <strong>{selectedService.price}</strong>
              </div>
            </div>
            <button onClick={handleReset} className="booking-v3-new-btn">
              <Calendar size={14} />
              {text.newAppointmentBtn}
            </button>
          </div>
        )}

        {/* Features Grid */}
        <div className="booking-v3-features">
          {data.features.map((feature) => (
            <div className="booking-v3-feature" key={feature}>
              <Check size={20} />
              <div>
                <strong>{feature}</strong>
                <span>{data.segment}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="booking-v3-footer">
          <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" className="booking-v3-whatsapp">
            <MessageCircle size={16} />
            {text.wantThisSystem}
            <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}