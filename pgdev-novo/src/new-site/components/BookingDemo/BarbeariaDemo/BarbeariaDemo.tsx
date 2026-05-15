import { useState, useEffect, useMemo } from 'react'
import {
  CheckCircle,
  ArrowLeft,
  MessageCircle,
  ChevronRight,
  Check,
  Crown,
  Star,
  Scissors,
  Award,
  Shield,
  MapPin,
  Wifi,
  Coffee,
  Sparkles,
  Flame,
  Smile,
  CreditCard,
  Gift,
  Zap
} from 'lucide-react'
import './BarbeariaDemo.css'
import '../BookingDemoGlobal.css'
import { bookingData } from '../bookingData'
import type { Language } from '../../../types'

type Props = {
  language: Language
}

export default function BarbeariaDemo({ language }: Props) {
  const isPt = language === 'pt'
  const data = bookingData.barbearia

  const text = {
    back: isPt ? 'Voltar' : 'Volver',
    service: isPt ? 'Serviço' : 'Servicio',
    professional: isPt ? 'Profissional' : 'Profesional',
    date: isPt ? 'Data' : 'Fecha',
    time: isPt ? 'Horário' : 'Horario',
    fullName: isPt ? 'Nome completo' : 'Nombre completo',
    namePlaceholder: isPt ? 'Digite seu nome' : 'Escribe tu nombre',
    whatsapp: isPt ? 'WhatsApp' : 'WhatsApp',
    phonePlaceholder: isPt ? '(11) 99999-9999' : '(11) 99999-9999',
    confirm: isPt ? 'Confirmar agendamento' : 'Confirmar',
    continue: isPt ? 'Continuar' : 'Continuar',
    appointmentConfirmed: isPt ? 'Agendamento confirmado!' : '¡Turno confirmado!',
    hourReserved: isPt ? 'seu horário foi reservado com sucesso.' : 'tu horario fue reservado con éxito.',
    newAppointmentBtn: isPt ? 'Novo agendamento' : 'Nuevo turno',
    wantThisSystem: isPt ? 'QUERO ESTE SISTEMA' : 'QUIERO ESTE SISTEMA',
    step1: isPt ? 'SERVIÇO' : 'SERVICIO',
    step2: isPt ? 'BARBEIRO' : 'BARBERO',
    step3: isPt ? 'DATA' : 'FECHA',
    step4: isPt ? 'HORÁRIO' : 'HORARIO',
    step5: isPt ? 'DADOS' : 'DATOS',
    total: isPt ? 'TOTAL' : 'TOTAL',
    about: isPt ? 'SOBRE' : 'SOBRE',
    reviews: isPt ? 'AVALIAÇÕES' : 'VALORACIONES'
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
    return `BAR${Math.floor(1000 + Math.random() * 9000)}`
  }, [confirmed])

  useEffect(() => {
    document.documentElement.classList.add('booking-demo-active')
    document.body.classList.add('booking-demo-active')
    return () => {
      document.documentElement.classList.remove('booking-demo-active')
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setConfirmed(false)
    setActiveStep(1)
    setName('')
    setPhone('')
  }

  const getProfessionalImage = (prof: any) => {
    const imageMap: Record<string, string> = {
      'Carlos Silva': '/demo/barbearia/carlitoss.jpg',
      'Rafael Souza': '/demo/barbearia/rafael.jpg',
      'André Lima': '/demo/barbearia/andre.jpg',
    }
    
    if (imageMap[prof.name]) {
      return imageMap[prof.name]
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.name)}&background=000000&color=D4AF37&size=120&rounded=true&bold=true`
  }

  const getServiceIcon = (serviceName: string) => {
    if (serviceName === 'Corte Masculino') return <Scissors size={22} />
    if (serviceName === 'Corte + Barba') return <Sparkles size={22} />
    if (serviceName === 'Barba Completa') return <Flame size={22} />
    if (serviceName === 'Sobrancelha') return <Smile size={22} />
    return <Scissors size={22} />
  }

  return (
    <div className="barbearia-modern">
      {/* Header Minimalista */}
      <header className="modern-header">
        <div className="header-container">
          <a href="/" className="back-link">
            <ArrowLeft size={18} />
            <span>{text.back}</span>
          </a>
          <div className="logo-area">
            <Scissors size={28} />
            <span>CLASSIC BARBER</span>
          </div>
          <div className="header-contact">
            <MapPin size={16} />
            <span>Centro, SP</span>
          </div>
        </div>
      </header>

      <div className="modern-container">
        {!confirmed ? (
          <>
            {/* Hero Section com Imagem de Fundo */}
            <div className="hero-with-bg">
              <div className="hero-overlay-bg"></div>
              <div className="hero-content-bg">
                <h1>CORTE E BARBA<br /><span>COM ESTILO</span></h1>
                <p>Agende seu horário em segundos e tenha uma experiência premium</p>
                <div className="hero-stats-bg">
                  <div><Zap size={18} /><span>+10.000 clientes</span></div>
                  <div><Award size={18} /><span>5 anos de excelência</span></div>
                  <div><Star size={18} /><span>4.9 ★ Avaliações</span></div>
                </div>
              </div>
            </div>

            {/* Booking Grid - Layout de duas colunas */}
            <div className="booking-grid">
              {/* Coluna Esquerda - Formulário */}
              <div className="booking-form-column">
                <div className="form-header">
                  <h2>Agende seu horário</h2>
                  <div className="step-indicator-modern">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div key={step} className={`step-dot ${activeStep >= step ? 'active' : ''}`}>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-content">
                  {activeStep === 1 && (
                    <div className="step-form">
                      <h3>Escolha o serviço</h3>
                      <div className="services-modern">
                        {data.services.map((service) => (
                          <button
                            key={service.name}
                            className={`service-card-modern ${selectedService.name === service.name ? 'active' : ''}`}
                            onClick={() => setSelectedService(service)}
                          >
                            <div className="service-icon">{getServiceIcon(service.name)}</div>
                            <div className="service-details">
                              <strong>{service.name}</strong>
                              <span>{service.duration}</span>
                            </div>
                            <div className="service-price">{service.price}</div>
                            {selectedService.name === service.name && <Check size={18} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="step-form">
                      <h3>Escolha o profissional</h3>
                      <div className="professionals-modern">
                        {data.professionals.map((prof) => (
                          <button
                            key={prof.name}
                            className={`professional-card ${selectedProfessional.name === prof.name ? 'active' : ''}`}
                            onClick={() => setSelectedProfessional(prof)}
                          >
                            <img src={getProfessionalImage(prof)} alt={prof.name} />
                            <div>
                              <strong>{prof.name}</strong>
                              <p>{prof.role}</p>
                              <div className="rating"><Star size={12} fill="#D4AF37" /> {prof.rating}</div>
                            </div>
                            {selectedProfessional.name === prof.name && <Check size={16} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="step-form">
                      <h3>Selecione a data</h3>
                      <div className="dates-modern">
                        {data.dates.map((date) => (
                          <button
                            key={date.label}
                            className={`date-card-modern ${selectedDate.label === date.label ? 'active' : ''}`}
                            onClick={() => setSelectedDate(date)}
                          >
                            <span className="date-day">{date.label.split(',')[0]}</span>
                            <span className="date-info">{date.label.split(',')[1]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeStep === 4 && (
                    <div className="step-form">
                      <h3>Escolha o horário</h3>
                      <div className="times-modern">
                        {data.timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            disabled={!slot.available}
                            className={`time-slot-modern ${selectedTimeSlot.time === slot.time ? 'active' : ''}`}
                            onClick={() => slot.available && setSelectedTimeSlot(slot)}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeStep === 5 && (
                    <div className="step-form">
                      <h3>Seus dados</h3>
                      <form onSubmit={handleSubmit} className="user-form">
                        <input
                          type="text"
                          placeholder="Nome completo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <input
                          type="tel"
                          placeholder="WhatsApp"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </form>
                    </div>
                  )}

                  <div className="form-actions">
                    {activeStep > 1 && (
                      <button className="btn-prev" onClick={handlePrevStep}>
                        Voltar
                      </button>
                    )}
                    {activeStep < 5 ? (
                      <button className="btn-next" onClick={handleNextStep}>
                        Continuar <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button className="btn-confirm" onClick={handleSubmit}>
                        <CheckCircle size={18} /> Confirmar
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Coluna Direita - Resumo e Benefícios */}
              <div className="booking-summary-column">
                <div className="summary-card">
                  <h3>Resumo do agendamento</h3>
                  
                  <div className="summary-item">
                    <span>Serviço</span>
                    <strong>{selectedService.name}</strong>
                  </div>
                  
                  <div className="summary-item">
                    <span>Profissional</span>
                    <strong>{selectedProfessional.name}</strong>
                  </div>
                  
                  <div className="summary-item">
                    <span>Data</span>
                    <strong>{selectedDate.label}</strong>
                  </div>
                  
                  <div className="summary-item">
                    <span>Horário</span>
                    <strong>{selectedTimeSlot.time}</strong>
                  </div>
                  
                  <div className="summary-divider"></div>
                  
                  <div className="summary-total">
                    <span>Total</span>
                    <strong>{selectedService.price}</strong>
                  </div>

                  <div className="benefits-list">
                    <div><Shield size={14} /> Confirmação imediata</div>
                    <div><CreditCard size={14} /> Pague na barbearia</div>
                    <div><Gift size={14} /> 1ª visita com desconto</div>
                  </div>
                </div>

                {/* Diferenciais */}
                <div className="perks-card">
                  <h4>Diferenciais Classic Barber</h4>
                  <div className="perk-item">
                    <Coffee size={16} />
                    <span>Bebida especial cortesia</span>
                  </div>
                  <div className="perk-item">
                    <Wifi size={16} />
                    <span>Wi-Fi de alta velocidade</span>
                  </div>
                  <div className="perk-item">
                    <Award size={16} />
                    <span>Produtos premium importados</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção de Depoimentos */}
            <div className="testimonials-section">
              <h3>O que nossos clientes dizem</h3>
              <div className="testimonials-grid">
                <div className="testimonial-card">
                  <div className="stars">★★★★★</div>
                  <p>"Melhor barbearia de SP! Ambiente incrível e profissionais top."</p>
                  <strong>- Ana Silva</strong>
                </div>
                <div className="testimonial-card">
                  <div className="stars">★★★★★</div>
                  <p>"Atendimento impecável, sai daqui parecendo outra pessoa."</p>
                  <strong>- Marcos Lima</strong>
                </div>
                <div className="testimonial-card">
                  <div className="stars">★★★★★</div>
                  <p>"Recomendo demais! O degrade do Carlos é sensacional."</p>
                  <strong>- Fernando R.</strong>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Tela de Sucesso */
          <div className="success-modern">
            <div className="success-card-modern">
              <div className="success-icon"><Crown size={64} /></div>
              <h2>{text.appointmentConfirmed}</h2>
              <p>{name}, {text.hourReserved}</p>
              
              <div className="booking-details">
                <div><span>Serviço:</span><strong>{selectedService.name}</strong></div>
                <div><span>Profissional:</span><strong>{selectedProfessional.name}</strong></div>
                <div><span>Data/Horário:</span><strong>{selectedDate.label} - {selectedTimeSlot.time}</strong></div>
                <div className="code"><span>Código:</span><strong>{confirmationCode}</strong></div>
              </div>

              <div className="whatsapp-message">
                <MessageCircle size={18} />
                <span>Confirmação enviada via WhatsApp</span>
              </div>

              <button onClick={handleReset} className="new-booking">
                Novo agendamento
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="modern-footer">
          <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
            <MessageCircle size={18} />
            {text.wantThisSystem}
          </a>
          <p>Classic Barber © 2026 - Tradição e estilo desde 2018</p>
        </footer>
      </div>
    </div>
  )
}