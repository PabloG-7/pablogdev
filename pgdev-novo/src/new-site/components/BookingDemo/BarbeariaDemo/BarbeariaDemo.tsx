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
  User,
  Award,
  Shield,
  ThumbsUp,
  MapPin,
  Wifi,
  Coffee,
  Users,       
  Sparkles,      // Para corte + barba (completo)
  Flame,         // Para barba completa (estilo)
  Smile          // Para sobrancelha
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
    reviews: isPt ? 'AVALIAÇÕES' : 'VALORACIONES',
    structure: isPt ? 'ESTRUTURA' : 'ESTRUCTURA'
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    setConfirmed(false)
    setActiveStep(1)
    setName('')
    setPhone('')
  }

  const getProfessionalImage = (prof: any) => {
    // MAPEAMENTO CORRETO DAS FOTOS DA PASTA public/demo/barbearia/
    const imageMap: Record<string, string> = {
      'Carlos Silva': '/demo/barbearia/carlitoss.jpg',
      'Rafael Souza': '/demo/barbearia/rafael.jpg',
      'André Lima': '/demo/barbearia/andre.jpg',
    }
    
    if (imageMap[prof.name]) {
      return imageMap[prof.name]
    }
    
    // Fallback para avatar se a imagem não existir
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.name)}&background=8B4513&color=fff&size=120&rounded=true&bold=true`
  }

  const renderStepIndicator = () => {
    const steps = [1, 2, 3, 4, 5]
    const labels = [text.step1, text.step2, text.step3, text.step4, text.step5]

    return (
      <div className="barbearia-steps">
        {steps.map((step, idx) => (
          <div key={step} className={`barbearia-step ${activeStep >= step ? 'active' : ''}`}>
            <div className="step-number">{step}</div>
            <span>{labels[idx]}</span>
            {idx < 4 && <div className="step-line-custom" />}
          </div>
        ))}
      </div>
    )
  }

  const renderStepContent = () => {
    switch (activeStep) {
    case 1:
  return (
    <div className="step-content-barbearia">
      <div className="barbearia-section-title">
        <Scissors size={20} />
        <h3>{text.step1}</h3>
      </div>
      <div className="barbearia-services">
        {data.services.map((service) => {
          // Mapeamento de ícones sem repetição
          let icon;
          if (service.name === 'Corte Masculino') {
            icon = <Scissors size={20} />;
          } else if (service.name === 'Corte + Barba') {
            icon = <Sparkles size={20} />;
          } else if (service.name === 'Barba Completa') {
            icon = <Flame size={20} />;
          } else if (service.name === 'Sobrancelha') {
            icon = <Smile size={20} />;
          } else {
            icon = <Scissors size={20} />;
          }
          
          return (
            <button
              key={service.name}
              className={`barbearia-service-item ${selectedService.name === service.name ? 'active' : ''}`}
              onClick={() => setSelectedService(service)}
            >
              <div className="service-left">
                <div className="service-icon-barbearia">
                  {icon}
                </div>
                <div className="service-info">
                  <h4>{service.name}</h4>
                  <span>{service.duration}</span>
                </div>
              </div>
              <div className="service-right">
                <strong>{service.price}</strong>
                {selectedService.name === service.name && <Check size={16} />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
      case 2:
        return (
          <div className="step-content-barbearia">
            <div className="barbearia-section-title">
              <Users size={20} />
              <h3>ESCOLHA SEU BARBEIRO</h3>
            </div>
            <div className="barbearia-barbers">
              {data.professionals.map((prof) => (
                <button
                  key={prof.name}
                  className={`barbearia-barber-card ${selectedProfessional.name === prof.name ? 'active' : ''}`}
                  onClick={() => setSelectedProfessional(prof)}
                >
                  <img 
                    src={getProfessionalImage(prof)} 
                    alt={prof.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.name)}&background=8B4513&color=fff&size=120&rounded=true&bold=true`
                    }}
                  />
                  <div className="barber-info">
                    <h4>{prof.name}</h4>
                    <p>{prof.role}</p>
                    <div className="barber-stars">
                      <Star size={12} fill="#D4AF37" stroke="#D4AF37" />
                      <span>{prof.rating}</span>
                    </div>
                  </div>
                  {selectedProfessional.name === prof.name && <div className="barber-check"><Check size={14} /></div>}
                </button>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="step-content-barbearia">
            <div className="barbearia-section-title">
              <Calendar size={20} />
              <h3>SELECIONE A DATA</h3>
            </div>
            <div className="barbearia-dates">
              {data.dates.map((date) => (
                <button
                  key={date.label}
                  className={`barbearia-date-card ${selectedDate.label === date.label ? 'active' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="date-day">{date.label.split(',')[0]}</span>
                  <span className="date-full">{date.label.split(',')[1] || ''}</span>
                  <span className="date-badge">{date.status}</span>
                </button>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="step-content-barbearia">
            <div className="barbearia-section-title">
              <Clock size={20} />
              <h3>ESCOLHA O HORÁRIO</h3>
            </div>
            <div className="barbearia-times">
              {data.timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  className={`barbearia-time-slot ${selectedTimeSlot.time === slot.time ? 'active' : ''} ${!slot.available ? 'disabled' : ''}`}
                  onClick={() => slot.available && setSelectedTimeSlot(slot)}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>
        )
      case 5:
        return (
          <div className="step-content-barbearia">
            <div className="barbearia-section-title">
              <User size={20} />
              <h3>SEUS DADOS</h3>
            </div>
            <form onSubmit={handleSubmit} className="barbearia-form">
              <div className="barbearia-input-group">
                <label>NOME COMPLETO</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome"
                  required
                />
              </div>
              <div className="barbearia-input-group">
                <label>WHATSAPP</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>
            </form>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="barbearia-demo-case">
      {/* HERO SECTION COM IMAGEM DE FUNDO */}
      <div className="barbearia-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-logo">
            <Scissors size={48} />
            <h1>CLASSIC BARBER</h1>
            <p>ESTILO • TRADIÇÃO • AUTENTICIDADE</p>
          </div>
          <div className="hero-info-bar">
            <span><MapPin size={14} /> RUA DA MODA, 123 - CENTRO</span>
            <span><Clock size={14} /> TER-SÁB: 09H - 20H</span>
            <span><Award size={14} /> 10 ANOS DE EXPERIÊNCIA</span>
          </div>
        </div>
        <a href="/" className="hero-back-btn">
          <ArrowLeft size={18} /> VOLTAR
        </a>
      </div>

      <div className="barbearia-container">
        {!confirmed ? (
          <>
            {/* SISTEMA DE AGENDAMENTO */}
            <div className="booking-system-card">
              <div className="system-header">
                <h2>AGENDE SEU HORÁRIO</h2>
                <p>Preencha os dados abaixo e garanta sua vaga</p>
              </div>

              {renderStepIndicator()}

              <div className="system-main">
                <div className="system-content">
                  {renderStepContent()}
                  
                  <div className="system-actions">
                    {activeStep > 1 && (
                      <button className="btn-back-barbearia" onClick={handlePrevStep}>
                        VOLTAR
                      </button>
                    )}
                    {activeStep < 5 ? (
                      <button className="btn-next-barbearia" onClick={handleNextStep}>
                        CONTINUAR <ChevronRight size={18} />
                      </button>
                    ) : (
                      <button className="btn-confirm-barbearia" onClick={handleSubmit}>
                        <CheckCircle size={18} /> CONFIRMAR AGENDAMENTO
                      </button>
                    )}
                  </div>
                </div>

                <div className="system-summary">
                  <div className="summary-title">SEU AGENDAMENTO</div>
                  <div className="summary-service">
                    <span>SERVIÇO</span>
                    <strong>{selectedService.name}</strong>
                  </div>
                  <div className="summary-service">
                    <span>BARBEIRO</span>
                    <strong>{selectedProfessional.name}</strong>
                  </div>
                  <div className="summary-service">
                    <span>DATA</span>
                    <strong>{selectedDate.label}</strong>
                  </div>
                  <div className="summary-service">
                    <span>HORÁRIO</span>
                    <strong>{selectedTimeSlot.time}</strong>
                  </div>
                  <div className="summary-total">
                    <span>TOTAL</span>
                    <strong>{selectedService.price}</strong>
                  </div>
                  <div className="summary-note">
                    <Shield size={12} /> Confirmação imediata via WhatsApp
                  </div>
                </div>
              </div>
            </div>

            {/* SEÇÃO SOBRE A BARBEARIA */}
            <div className="barbearia-about">
              <div className="about-left">
                <img src="https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg" alt="Barbearia" />
              </div>
              <div className="about-right">
                <h3>{text.about} <span>CLASSIC BARBER</span></h3>
                <p>Há mais de uma década, a Classic Barber é referência em cortes masculinos e barba na região. Nosso compromisso é oferecer uma experiência única, combinando técnicas tradicionais com as tendências mais atuais.</p>
                <div className="about-features">
                  <div><Award size={18} /> Barbeiros Experientes</div>
                  <div><Coffee size={18} /> Cerveja e Whisky grátis</div>
                  <div><Wifi size={18} /> Wi-Fi disponível</div>
                  <div><ThumbsUp size={18} /> Satisfação garantida</div>
                </div>
              </div>
            </div>

            {/* SEÇÃO DE AVALIAÇÕES */}
            <div className="barbearia-reviews">
              <h3>{text.reviews}</h3>
              <div className="reviews-grid">
                <div className="review-card">
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <p>Melhor barbearia da região! Atendimento impecável e profissionais muito qualificados.</p>
                  <strong>- Mariana S.</strong>
                </div>
                <div className="review-card">
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <p>Sempre saio satisfeito. Ambiente agradável e muito profissionalismo.</p>
                  <strong>- Rafael C.</strong>
                </div>
                <div className="review-card">
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <Star size={16} fill="#D4AF37" stroke="#D4AF37" />
                  <p>Atendimento top, recomendo demais! O Carlos é fera no degrade.</p>
                  <strong>- Thiago M.</strong>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* TELA DE SUCESSO */
          <div className="success-screen-barbearia">
            <div className="success-card-barbearia">
              <div className="success-crown">
                <Crown size={56} />
              </div>
              <h2>{text.appointmentConfirmed}</h2>
              <p>{name}, {text.hourReserved}</p>
              
              <div className="success-details-barbearia">
                <div><span>SERVIÇO:</span><strong>{selectedService.name}</strong></div>
                <div><span>BARBEIRO:</span><strong>{selectedProfessional.name}</strong></div>
                <div><span>DATA:</span><strong>{selectedDate.label}</strong></div>
                <div><span>HORÁRIO:</span><strong>{selectedTimeSlot.time}</strong></div>
                <div className="code-highlight"><span>CÓDIGO:</span><strong>{confirmationCode}</strong></div>
              </div>

              <div className="whatsapp-alert">
                <MessageCircle size={18} />
                <span>Enviamos a confirmação via WhatsApp</span>
              </div>

              <button onClick={handleReset} className="new-booking-barbearia">
                NOVO AGENDAMENTO
              </button>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="barbearia-footer">
          <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" className="footer-whatsapp">
            <MessageCircle size={18} />
            {text.wantThisSystem}
          </a>
          <p>Classic Barber © 2026 - Todos os direitos reservados</p>
        </footer>
      </div>
    </div>
  )
}