import { useState, useEffect, useMemo } from 'react'
import {
  Calendar,
  CheckCircle,
  ArrowLeft,
  MessageCircle,
  ChevronRight,
  Check,
  Clock,
  Star,
  Stethoscope,
  User,
  Phone,
  MapPin,
  Info,
  Award,
  Shield,
  Heart,
  Wifi,
  Car,
  Users,
  Activity,
  Mail,
  CreditCard,      
  Eye,          
  ClipboardList
} from 'lucide-react'
import './ClinicaDemo.css'
import '../BookingDemoGlobal.css'
import { bookingData } from '../bookingData'
import type { Language } from '../../../types'

type Props = {
  language: Language
}

export default function ClinicaDemo({ language }: Props) {
  const isPt = language === 'pt'
  const data = bookingData.clinica

  const text = {
    back: isPt ? 'Voltar' : 'Volver',
    service: isPt ? 'CONSULTA' : 'CONSULTA',
    professional: isPt ? 'MÉDICO' : 'MÉDICO',
    date: isPt ? 'DATA' : 'FECHA',
    time: isPt ? 'HORÁRIO' : 'HORARIO',
    fullName: isPt ? 'NOME COMPLETO' : 'NOMBRE COMPLETO',
    namePlaceholder: isPt ? 'Digite seu nome completo' : 'Escribe tu nombre completo',
    whatsapp: isPt ? 'WHATSAPP' : 'WHATSAPP',
    phonePlaceholder: isPt ? '(11) 99999-9999' : '(11) 99999-9999',
    email: isPt ? 'E-MAIL' : 'CORREO',
    emailPlaceholder: isPt ? 'seu@email.com' : 'tu@email.com',
    insurance: isPt ? 'CONVÊNIO (OPCIONAL)' : 'SEGURO (OPCIONAL)',
    insurancePlaceholder: isPt ? 'Ex: Unimed, Bradesco, etc' : 'Ej: Unimed, Bradesco',
    confirm: isPt ? 'CONFIRMAR CONSULTA' : 'CONFIRMAR CONSULTA',
    continue: isPt ? 'CONTINUAR' : 'CONTINUAR',
    appointmentConfirmed: isPt ? 'Consulta confirmada!' : '¡Consulta confirmada!',
    hourReserved: isPt ? 'sua consulta foi agendada com sucesso.' : 'tu consulta fue agendada con éxito.',
    newAppointmentBtn: isPt ? 'NOVO AGENDAMENTO' : 'NUEVO TURNO',
    wantThisSystem: isPt ? 'QUERO ESTE SISTEMA' : 'QUIERO ESTE SISTEMA',
    step1: isPt ? 'CONSULTA' : 'CONSULTA',
    step2: isPt ? 'MÉDICO' : 'MÉDICO',
    step3: isPt ? 'DATA' : 'FECHA',
    step4: isPt ? 'HORÁRIO' : 'HORARIO',
    step5: isPt ? 'DADOS' : 'DATOS',
    total: isPt ? 'VALOR' : 'VALOR',
    about: isPt ? 'SOBRE A CLÍNICA' : 'SOBRE LA CLÍNICA',
    specialties: isPt ? 'ESPECIALIDADES' : 'ESPECIALIDADES',
    whyUs: isPt ? 'POR QUE ESCOLHER?' : 'POR QUÉ ELEGIR?',
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
  const [email, setEmail] = useState('')
  const [insurance, setInsurance] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const confirmationCode = useMemo(() => {
    if (!confirmed) return ''
    return `CLI${Math.floor(1000 + Math.random() * 9000)}`
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
    setEmail('')
    setInsurance('')
  }

  const getProfessionalImage = (prof: any) => {
    // MAPEAMENTO CORRETO DAS FOTOS DA PASTA public/demo/clinica/
    const imageMap: Record<string, string> = {
      'Dra. Ana Martins': '/demo/clinica/ana.jpg',
      'Dr. Carlos Oliveira': '/demo/clinica/carlos.jpg',
      'Dra. Juliana Silva': '/demo/clinica/juliana.jpg',
    }
    
    if (imageMap[prof.name]) {
      return imageMap[prof.name]
    }
    
    // Fallback para avatar se a imagem não existir
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.name)}&background=0D9488&color=fff&size=120&rounded=true&bold=true`
  }

  const renderStepIndicator = () => {
    const steps = [1, 2, 3, 4, 5]
    const labels = [text.step1, text.step2, text.step3, text.step4, text.step5]

    return (
      <div className="clinica-steps">
        {steps.map((step, idx) => (
          <div key={step} className={`clinica-step ${activeStep >= step ? 'active' : ''}`}>
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
    <div className="step-content-clinica">
      <div className="clinica-section-title">
        <Activity size={20} />
        <h3>{text.service}</h3>
      </div>
      <div className="clinica-services">
        {data.services.map((service) => {
          // Mapeamento de ícones sem repetição
          let icon;
          if (service.name === 'Consulta médica') {
            icon = <Stethoscope size={20} />;
          } else if (service.name === 'Avaliação especializada') {
            icon = <Eye size={20} />;
          } else if (service.name === 'Retorno de consulta') {
            icon = <ClipboardList size={20} />;
          } else if (service.name === 'Sessão de fisioterapia') {
            icon = <Activity size={20} />;
          } else {
            icon = <Heart size={20} />;
          }
          
          return (
            <button
              key={service.name}
              className={`clinica-service-item ${selectedService.name === service.name ? 'active' : ''}`}
              onClick={() => setSelectedService(service)}
            >
              <div className="service-left">
                <div className="service-icon-clinica">
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
          <div className="step-content-clinica">
            <div className="clinica-section-title">
              <Users size={20} />
              <h3>{text.professional}</h3>
            </div>
            <div className="clinica-doctors">
              {data.professionals.map((prof) => (
                <button
                  key={prof.name}
                  className={`clinica-doctor-card ${selectedProfessional.name === prof.name ? 'active' : ''}`}
                  onClick={() => setSelectedProfessional(prof)}
                >
                  <img 
                    src={getProfessionalImage(prof)} 
                    alt={prof.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.name)}&background=0D9488&color=fff&size=120&rounded=true&bold=true`
                    }}
                  />
                  <div className="doctor-info">
                    <h4>{prof.name}</h4>
                    <p>{prof.role}</p>
                    <div className="doctor-specialties">
                      <span>CRM: {Math.floor(10000 + Math.random() * 90000)}</span>
                    </div>
                    <div className="doctor-rating">
                      <Star size={12} fill="#0D9488" stroke="#0D9488" />
                      <span>{prof.rating}</span>
                      <span className="reviews">({Math.floor(50 + Math.random() * 150)} avaliações)</span>
                    </div>
                  </div>
                  {selectedProfessional.name === prof.name && <div className="doctor-check"><Check size={14} /></div>}
                </button>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="step-content-clinica">
            <div className="clinica-section-title">
              <Calendar size={20} />
              <h3>{text.date}</h3>
            </div>
            <div className="clinica-dates">
              {data.dates.map((date) => (
                <button
                  key={date.label}
                  className={`clinica-date-card ${selectedDate.label === date.label ? 'active' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="date-day">{date.label.split(',')[0]}</span>
                  <span className="date-full">{date.label.split(',')[1] || ''}</span>
                  <span className="date-status">{date.status}</span>
                </button>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="step-content-clinica">
            <div className="clinica-section-title">
              <Clock size={20} />
              <h3>{text.time}</h3>
            </div>
            <div className="clinica-times">
              {data.timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  className={`clinica-time-slot ${selectedTimeSlot.time === slot.time ? 'active' : ''} ${!slot.available ? 'disabled' : ''}`}
                  onClick={() => slot.available && setSelectedTimeSlot(slot)}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            <div className="time-note">
              <Clock size={12} />
              <span>Consultas com duração média de 30-45 minutos</span>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="step-content-clinica">
            <div className="clinica-section-title">
              <User size={20} />
              <h3>{text.step5}</h3>
            </div>
            <form onSubmit={handleSubmit} className="clinica-form">
              <div className="clinica-input-group">
                <label><User size={14} />{text.fullName}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={text.namePlaceholder}
                  required
                />
              </div>
              <div className="clinica-input-group">
                <label><Phone size={14} />{text.whatsapp}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={text.phonePlaceholder}
                  required
                />
              </div>
              <div className="clinica-input-group">
                <label><Mail size={14} />{text.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={text.emailPlaceholder}
                  required
                />
              </div>
              <div className="clinica-input-group optional">
                <label><Shield size={14} />{text.insurance}</label>
                <input
                  type="text"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  placeholder={text.insurancePlaceholder}
                />
              </div>
            </form>
          </div>
        )
      default:
        return null
    }
  }

  const isStepValid = () => {
    if (activeStep === 5) {
      return name.trim() !== '' && phone.trim() !== '' && email.trim() !== ''
    }
    return true
  }

  return (
    <div className="clinica-demo-case">
      {/* HERO SECTION COM IMAGEM MÉDICA */}
      <div className="clinica-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-logo">
            <Stethoscope size={48} />
            <h1>{data.business}</h1>
            <p>SAÚDE • CONFIANÇA • HUMANIZAÇÃO</p>
          </div>
          <div className="hero-info-bar">
            <span><MapPin size={14} /> AV. PAULISTA, 2000 - SÃO PAULO</span>
            <span><Clock size={14} /> SEG-SEX: 08H - 20H | SÁB: 08H - 14H</span>
            <span><Heart size={14} /> URGÊNCIA 24H</span>
          </div>
        </div>
        <a href="/" className="hero-back-btn">
          <ArrowLeft size={18} /> VOLTAR
        </a>
      </div>

      <div className="clinica-container">
        {!confirmed ? (
          <>
            {/* SISTEMA DE AGENDAMENTO */}
            <div className="booking-system-card-clinica">
              <div className="system-header-clinica">
                <h2>AGENDE SUA CONSULTA</h2>
                <p>Preencha os dados abaixo e garanta seu atendimento</p>
              </div>

              {renderStepIndicator()}

              <div className="system-main-clinica">
                <div className="system-content-clinica">
                  {renderStepContent()}
                  
                  <div className="system-actions-clinica">
                    {activeStep > 1 && (
                      <button className="btn-back-clinica" onClick={handlePrevStep}>
                        VOLTAR
                      </button>
                    )}
                    {activeStep < 5 ? (
                      <button className="btn-next-clinica" onClick={handleNextStep}>
                        CONTINUAR <ChevronRight size={18} />
                      </button>
                    ) : (
                      <button className="btn-confirm-clinica" onClick={handleSubmit} disabled={!isStepValid()}>
                        <CheckCircle size={18} /> CONFIRMAR CONSULTA
                      </button>
                    )}
                  </div>
                </div>

                <div className="system-summary-clinica">
                  <div className="summary-title-clinica">RESUMO DA CONSULTA</div>
                  <div className="summary-service-clinica">
                    <span>TIPO</span>
                    <strong>{selectedService.name}</strong>
                  </div>
                  <div className="summary-service-clinica">
                    <span>MÉDICO(A)</span>
                    <strong>{selectedProfessional.name}</strong>
                  </div>
                  <div className="summary-service-clinica">
                    <span>ESPECIALIDADE</span>
                    <strong>{selectedProfessional.role}</strong>
                  </div>
                  <div className="summary-service-clinica">
                    <span>DATA</span>
                    <strong>{selectedDate.label}</strong>
                  </div>
                  <div className="summary-service-clinica">
                    <span>HORÁRIO</span>
                    <strong>{selectedTimeSlot.time}</strong>
                  </div>
                  <div className="summary-total-clinica">
                    <span>{text.total}</span>
                    <strong>{selectedService.price}</strong>
                  </div>
                  <div className="summary-payment-clinica">
                    <CreditCard size={12} />
                    <span>Aceitamos todos os cartões e convênios</span>
                  </div>
                  <div className="summary-note-clinica">
                    <Shield size={12} /> Confirmação imediata via WhatsApp e E-mail
                  </div>
                </div>
              </div>
            </div>

            {/* ESPECIALIDADES */}
            <div className="clinica-specialties">
              <h3>NOSSAS ESPECIALIDADES</h3>
              <div className="specialties-grid">
                <div className="specialty-card">
                  <Heart size={32} />
                  <h4>Cardiologia</h4>
                  <p>Prevenção e tratamento do coração</p>
                </div>
                <div className="specialty-card">
                  <Activity size={32} />
                  <h4>Clínica Geral</h4>
                  <p>Atendimento completo para toda família</p>
                </div>
                <div className="specialty-card">
                  <User size={32} />
                  <h4>Pediatria</h4>
                  <p>Cuidado especializado para crianças</p>
                </div>
                <div className="specialty-card">
                  <Stethoscope size={32} />
                  <h4>Dermatologia</h4>
                  <p>Saúde e estética da sua pele</p>
                </div>
              </div>
            </div>

            {/* SOBRE A CLÍNICA */}
            <div className="clinica-about">
              <div className="about-left">
                <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop" alt="Clínica" />
              </div>
              <div className="about-right">
                <h3>{text.about}</h3>
                <p>Com mais de 15 anos de experiência, a Clínica Saúde+ é referência em atendimento médico no Brasil. Nossa missão é proporcionar saúde de qualidade com atendimento humanizado e tecnologia de ponta.</p>
                <div className="about-features-clinica">
                  <div><Award size={18} /> 15+ anos de experiência</div>
                  <div><Heart size={18} /> Atendimento humanizado</div>
                  <div><Wifi size={18} /> Estrutura moderna</div>
                  <div><Car size={18} /> Estacionamento conveniado</div>
                </div>
              </div>
            </div>

            {/* POR QUE ESCOLHER */}
            <div className="clinica-why">
              <h3>{text.whyUs}</h3>
              <div className="why-grid">
                <div className="why-card">
                  <Award size={28} />
                  <h4>Profissionais Certificados</h4>
                  <p>Equipe médica altamente qualificada</p>
                </div>
                <div className="why-card">
                  <Clock size={28} />
                  <h4>Agendamento Rápido</h4>
                  <p>Sem longas filas de espera</p>
                </div>
                <div className="why-card">
                  <CheckCircle size={28} />
                  <h4>Equipamentos Modernos</h4>
                  <p>Tecnologia de última geração</p>
                </div>
                <div className="why-card">
                  <MessageCircle size={28} />
                  <h4>Lembrete Automático</h4>
                  <p>Confirmação via WhatsApp</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* TELA DE SUCESSO */
          <div className="success-screen-clinica">
            <div className="success-card-clinica">
              <div className="success-icon-clinica">
                <Heart size={56} />
              </div>
              <h2>{text.appointmentConfirmed}</h2>
              <p>{name}, {text.hourReserved}</p>
              
              <div className="success-details-clinica">
                <div><span>CONSULTA:</span><strong>{selectedService.name}</strong></div>
                <div><span>MÉDICO(A):</span><strong>{selectedProfessional.name}</strong></div>
                <div><span>DATA:</span><strong>{selectedDate.label}</strong></div>
                <div><span>HORÁRIO:</span><strong>{selectedTimeSlot.time}</strong></div>
                <div className="code-highlight-clinica"><span>CÓDIGO:</span><strong>{confirmationCode}</strong></div>
              </div>

              <div className="whatsapp-alert-clinica">
                <MessageCircle size={18} />
                <span>Enviamos a confirmação via WhatsApp e E-mail</span>
              </div>

              <div className="prepare-note">
                <Info size={14} />
                <span>Chegue 10 minutos antes com seus documentos</span>
              </div>

              <button onClick={handleReset} className="new-booking-clinica">
                NOVO AGENDAMENTO
              </button>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="clinica-footer">
          <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" className="footer-whatsapp-clinica">
            <MessageCircle size={18} />
            {text.wantThisSystem}
          </a>
          <p>Clínica Saúde+ © 2026 - Todos os direitos reservados</p>
          <p className="footer-info">CRM: 12345-SP | CNPJ: 12.345.678/0001-90</p>
        </footer>
      </div>
    </div>
  )
}