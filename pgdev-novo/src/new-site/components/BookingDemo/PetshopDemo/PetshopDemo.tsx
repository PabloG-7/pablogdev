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
  PawPrint,
  User,
  Phone,
  Info,
  Award,
  Shield,
  Heart,
  Bone,
  Home,
  Scissors,
  Syringe,
  Dog,
  MapPin,
  CreditCard,
    Droplet,      // Para Banho
  Sparkles,     // Para Banho + Tosa (completo)
  Stethoscope   // Para Consulta veterinária
} from 'lucide-react'
import './PetshopDemo.css'
import '../BookingDemoGlobal.css'
import { bookingData } from '../bookingData'
import type { Language } from '../../../types'

type Props = {
  language: Language
}

export default function PetshopDemo({ language }: Props) {
  const isPt = language === 'pt'
  const data = bookingData.petshop

  const text = {
    back: isPt ? 'Voltar' : 'Volver',
    service: isPt ? 'SERVIÇO' : 'SERVICIO',
    professional: isPt ? 'PROFISSIONAL' : 'PROFESIONAL',
    date: isPt ? 'DATA' : 'FECHA',
    time: isPt ? 'HORÁRIO' : 'HORARIO',
    fullName: isPt ? 'NOME DO TUTOR' : 'NOMBRE DEL TUTOR',
    namePlaceholder: isPt ? 'Digite seu nome completo' : 'Escribe tu nombre completo',
    whatsapp: isPt ? 'WHATSAPP' : 'WHATSAPP',
    phonePlaceholder: isPt ? '(11) 99999-9999' : '(11) 99999-9999',
    petName: isPt ? 'NOME DO PET' : 'NOMBRE DE LA MASCOTA',
    petNamePlaceholder: isPt ? 'Digite o nome do seu pet' : 'Escribe el nombre de tu mascota',
    petSize: isPt ? 'PORTE DO PET' : 'TAMAÑO',
    petBreed: isPt ? 'RAÇA (OPCIONAL)' : 'RAZA (OPCIONAL)',
    petBreedPlaceholder: isPt ? 'Ex: Gold-Retriever, SRD' : 'Ej: Gold-Retriever',
    observation: isPt ? 'OBSERVAÇÃO' : 'OBSERVACIÓN',
    observationPlaceholder: isPt ? 'Alguma informação adicional? (ex: pet nervoso, precisa de atenção especial)' : '¿Información adicional?',
    confirm: isPt ? 'CONFIRMAR AGENDAMENTO' : 'CONFIRMAR TURNO',
    continue: isPt ? 'CONTINUAR' : 'CONTINUAR',
    appointmentConfirmed: isPt ? 'Agendamento confirmado!' : '¡Turno confirmado!',
    hourReserved: isPt ? 'seu horário foi reservado com sucesso.' : 'tu horario fue reservado con éxito.',
    newAppointmentBtn: isPt ? 'NOVO AGENDAMENTO' : 'NUEVO TURNO',
    wantThisSystem: isPt ? 'QUERO ESTE SISTEMA' : 'QUIERO ESTE SISTEMA',
    step1: isPt ? 'SERVIÇO' : 'SERVICIO',
    step2: isPt ? 'PROFISSIONAL' : 'PROFESIONAL',
    step3: isPt ? 'DATA' : 'FECHA',
    step4: isPt ? 'HORÁRIO' : 'HORARIO',
    step5: isPt ? 'DADOS' : 'DATOS',
    total: isPt ? 'TOTAL' : 'TOTAL',
    about: isPt ? 'SOBRE NÓS' : 'SOBRE NOSOTROS',
    services: isPt ? 'NOSSOS SERVIÇOS' : 'NUESTROS SERVICIOS',
    whyUs: isPt ? 'POR QUE ESCOLHER?' : 'POR QUÉ ELEGIR?'
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
  const [petName, setPetName] = useState('')
  const [petSize, setPetSize] = useState('Médio')
  const [petBreed, setPetBreed] = useState('')
  const [observation, setObservation] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const confirmationCode = useMemo(() => {
    if (!confirmed) return ''
    return `PET${Math.floor(1000 + Math.random() * 9000)}`
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
    setPetName('')
    setPetSize('Médio')
    setPetBreed('')
    setObservation('')
  }

  const getProfessionalImage = (prof: any) => {
    // MAPEAMENTO CORRETO DAS FOTOS DA PASTA public/demo/petshop/
    const imageMap: Record<string, string> = {
      'Equipe Pet': '/demo/petshop/equipe.jpg',
      'Dr. Carlos Vet': '/demo/petshop/carlos.jpg',
      'Juliana Groomer': '/demo/petshop/juliana.jpg',
    }
    
    if (imageMap[prof.name]) {
      return imageMap[prof.name]
    }
    
    // Fallback para avatar se a imagem não existir
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.name)}&background=8B5CF6&color=fff&size=120&rounded=true&bold=true`
  }

  const renderStepIndicator = () => {
    const steps = [1, 2, 3, 4, 5]
    const labels = [text.step1, text.step2, text.step3, text.step4, text.step5]

    return (
      <div className="petshop-steps">
        {steps.map((step, idx) => (
          <div key={step} className={`petshop-step ${activeStep >= step ? 'active' : ''}`}>
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
    <div className="step-content-petshop">
      <div className="petshop-section-title">
        <PawPrint size={20} />
        <h3>{text.service}</h3>
      </div>
      <div className="petshop-services">
        {data.services.map((service) => {
          // Mapeamento de ícones sem repetição
          let icon;
          if (service.name === 'Banho completo') {
            icon = <Droplet size={20} />;
          } else if (service.name === 'Tosa higiênica') {
            icon = <Scissors size={20} />;
          } else if (service.name === 'Banho + Tosa') {
            icon = <Sparkles size={20} />;
          } else if (service.name === 'Consulta veterinária') {
            icon = <Stethoscope size={20} />;
          } else {
            icon = <PawPrint size={20} />;
          }
          
          return (
            <button
              key={service.name}
              className={`petshop-service-item ${selectedService.name === service.name ? 'active' : ''}`}
              onClick={() => setSelectedService(service)}
            >
              <div className="service-left">
                <div className="service-icon-petshop">
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
          <div className="step-content-petshop">
            <div className="petshop-section-title">
              <Heart size={20} />
              <h3>{text.professional}</h3>
            </div>
            <div className="petshop-professionals">
              {data.professionals.map((prof) => (
                <button
                  key={prof.name}
                  className={`petshop-professional-card ${selectedProfessional.name === prof.name ? 'active' : ''}`}
                  onClick={() => setSelectedProfessional(prof)}
                >
                  <img 
                    src={getProfessionalImage(prof)} 
                    alt={prof.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.name)}&background=8B5CF6&color=fff&size=120&rounded=true&bold=true`
                    }}
                  />
                  <div className="professional-info">
                    <h4>{prof.name}</h4>
                    <p>{prof.role}</p>
                    <div className="professional-rating-petshop">
                      <Star size={12} fill="#8B5CF6" stroke="#8B5CF6" />
                      <span>{prof.rating}</span>
                      <span className="reviews">({Math.floor(30 + Math.random() * 100)} avaliações)</span>
                    </div>
                  </div>
                  {selectedProfessional.name === prof.name && <div className="professional-check"><Check size={14} /></div>}
                </button>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="step-content-petshop">
            <div className="petshop-section-title">
              <Calendar size={20} />
              <h3>{text.date}</h3>
            </div>
            <div className="petshop-dates">
              {data.dates.map((date) => (
                <button
                  key={date.label}
                  className={`petshop-date-card ${selectedDate.label === date.label ? 'active' : ''}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="date-day">{date.label.split(',')[0]}</span>
                  <span className="date-full">{date.label.split(',')[1] || ''}</span>
                  <span className="date-availability">{date.status}</span>
                </button>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="step-content-petshop">
            <div className="petshop-section-title">
              <Clock size={20} />
              <h3>{text.time}</h3>
            </div>
            <div className="petshop-times">
              {data.timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  className={`petshop-time-slot ${selectedTimeSlot.time === slot.time ? 'active' : ''} ${!slot.available ? 'disabled' : ''}`}
                  onClick={() => slot.available && setSelectedTimeSlot(slot)}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            <div className="time-note-petshop">
              <Clock size={12} />
              <span>Atendimento com duração média de 60-90 minutos</span>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="step-content-petshop">
            <div className="petshop-section-title">
              <Dog size={20} />
              <h3>{text.step5}</h3>
            </div>
            <form onSubmit={handleSubmit} className="petshop-form">
              <div className="petshop-form-row">
                <div className="petshop-input-group">
                  <label><User size={14} />{text.fullName}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={text.namePlaceholder}
                    required
                  />
                </div>
                <div className="petshop-input-group">
                  <label><Phone size={14} />{text.whatsapp}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={text.phonePlaceholder}
                    required
                  />
                </div>
              </div>
              <div className="petshop-form-row">
                <div className="petshop-input-group">
                  <label><PawPrint size={14} />{text.petName}</label>
                  <input
                    type="text"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder={text.petNamePlaceholder}
                    required
                  />
                </div>
                <div className="petshop-input-group">
                  <label><Info size={14} />{text.petSize}</label>
                  <select value={petSize} onChange={(e) => setPetSize(e.target.value)}>
                    <option value="Pequeno">🐕 Pequeno (até 10kg)</option>
                    <option value="Médio">🐕‍🦺 Médio (10kg a 25kg)</option>
                    <option value="Grande">🐕 Grande (acima de 25kg)</option>
                  </select>
                </div>
              </div>
              <div className="petshop-input-group">
                <label><Bone size={14} />{text.petBreed}</label>
                <input
                  type="text"
                  value={petBreed}
                  onChange={(e) => setPetBreed(e.target.value)}
                  placeholder={text.petBreedPlaceholder}
                />
              </div>
              <div className="petshop-input-group">
                <label><MessageCircle size={14} />{text.observation}</label>
                <textarea
                  rows={3}
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  placeholder={text.observationPlaceholder}
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
      return name.trim() !== '' && phone.trim() !== '' && petName.trim() !== ''
    }
    return true
  }

  return (
    <div className="petshop-demo-case">
      {/* HERO SECTION COM IMAGEM DE PET */}
      <div className="petshop-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-logo">
            <PawPrint size={48} />
            <h1>{data.business}</h1>
            <p>AMOR • CUIDADO • DEDICAÇÃO</p>
          </div>
          <div className="hero-info-bar">
            <span><MapPin size={14} /> RUA DOS PETS, 456 - SÃO PAULO</span>
            <span><Clock size={14} /> SEG-SÁB: 09H - 19H | DOM: 10H - 14H</span>
            <span><Heart size={14} /> Atendimento com amor</span>
          </div>
        </div>
        <a href="/" className="hero-back-btn">
          <ArrowLeft size={18} /> VOLTAR
        </a>
      </div>

      <div className="petshop-container">
        {!confirmed ? (
          <>
            {/* SISTEMA DE AGENDAMENTO */}
            <div className="booking-system-card-petshop">
              <div className="system-header-petshop">
                <h2>AGENDE O ATENDIMENTO DO SEU PET</h2>
                <p>Preencha os dados abaixo e garanta a vaga do seu amigo</p>
              </div>

              {renderStepIndicator()}

              <div className="system-main-petshop">
                <div className="system-content-petshop">
                  {renderStepContent()}
                  
                  <div className="system-actions-petshop">
                    {activeStep > 1 && (
                      <button className="btn-back-petshop" onClick={handlePrevStep}>
                        VOLTAR
                      </button>
                    )}
                    {activeStep < 5 ? (
                      <button className="btn-next-petshop" onClick={handleNextStep} disabled={!isStepValid()}>
                        CONTINUAR <ChevronRight size={18} />
                      </button>
                    ) : (
                      <button className="btn-confirm-petshop" onClick={handleSubmit} disabled={!isStepValid()}>
                        <CheckCircle size={18} /> CONFIRMAR AGENDAMENTO
                      </button>
                    )}
                  </div>
                </div>

                <div className="system-summary-petshop">
                  <div className="summary-title-petshop">RESUMO DO ATENDIMENTO</div>
                  <div className="summary-service-petshop">
                    <span>SERVIÇO</span>
                    <strong>{selectedService.name}</strong>
                  </div>
                  <div className="summary-service-petshop">
                    <span>PROFISSIONAL</span>
                    <strong>{selectedProfessional.name}</strong>
                  </div>
                  <div className="summary-service-petshop">
                    <span>DATA</span>
                    <strong>{selectedDate.label}</strong>
                  </div>
                  <div className="summary-service-petshop">
                    <span>HORÁRIO</span>
                    <strong>{selectedTimeSlot.time}</strong>
                  </div>
                  <div className="summary-total-petshop">
                    <span>{text.total}</span>
                    <strong>{selectedService.price}</strong>
                  </div>
                  <div className="summary-payment-petshop">
                    <CreditCard size={12} />
                    <span>Aceitamos cartões, PIX e dinheiro</span>
                  </div>
                  <div className="summary-note-petshop">
                    <Shield size={12} /> Confirmação imediata via WhatsApp
                  </div>
                </div>
              </div>
            </div>

            {/* NOSSOS SERVIÇOS DESTAQUES */}
            <div className="petshop-services-highlight">
              <h3>{text.services}</h3>
              <div className="services-highlight-grid">
                <div className="service-highlight-card">
                  <Scissors size={32} />
                  <h4>Banho e Tosa</h4>
                  <p>Produtos hipoalergênicos e profissionais especializados</p>
                </div>
                <div className="service-highlight-card">
                  <Syringe size={32} />
                  <h4>Vacinação</h4>
                  <p>Todas as vacinas com acompanhamento veterinário</p>
                </div>
                <div className="service-highlight-card">
                  <Heart size={32} />
                  <h4>Consultas</h4>
                  <p>Atendimento veterinário completo</p>
                </div>
                <div className="service-highlight-card">
                  <Bone size={32} />
                  <h4>Petshop</h4>
                  <p>Rações, brinquedos e acessórios</p>
                </div>
              </div>
            </div>

            {/* SOBRE NÓS */}
            <div className="petshop-about">
              <div className="about-left">
                <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop" alt="Petshop" />
              </div>
              <div className="about-right">
                <h3>{text.about}</h3>
                <p>Há mais de 10 anos cuidando dos seus pets com muito amor e dedicação. Nossa missão é proporcionar bem-estar e saúde para os animais, com atendimento humanizado e estrutura de primeira qualidade.</p>
                <div className="about-features-petshop">
                  <div><Award size={18} /> 10+ anos de experiência</div>
                  <div><Heart size={18} /> Atendimento humanizado</div>
                  <div><Home size={18} /> Estrutura climatizada</div>
                  <div><Dog size={18} /> Profissionais qualificados</div>
                </div>
              </div>
            </div>

            {/* POR QUE ESCOLHER */}
            <div className="petshop-why">
              <h3>{text.whyUs}</h3>
              <div className="why-grid-petshop">
                <div className="why-card-petshop">
                  <Award size={28} />
                  <h4>Profissionais Especializados</h4>
                  <p>Equipe treinada e apaixonada por pets</p>
                </div>
                <div className="why-card-petshop">
                  <Clock size={28} />
                  <h4>Agendamento Rápido</h4>
                  <p>Sem longas filas de espera</p>
                </div>
                <div className="why-card-petshop">
                  <Shield size={28} />
                  <h4>Segurança Garantida</h4>
                  <p>Produtos de qualidade e ambiente seguro</p>
                </div>
                <div className="why-card-petshop">
                  <MessageCircle size={28} />
                  <h4>Lembrete Automático</h4>
                  <p>Confirmação via WhatsApp</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* TELA DE SUCESSO */
          <div className="success-screen-petshop">
            <div className="success-card-petshop">
              <div className="success-icon-petshop">
                <PawPrint size={56} />
              </div>
              <h2>{text.appointmentConfirmed}</h2>
              <p>{name}, {text.hourReserved}</p>
              
              <div className="success-details-petshop">
                <div><span>SERVIÇO:</span><strong>{selectedService.name}</strong></div>
                <div><span>PROFISSIONAL:</span><strong>{selectedProfessional.name}</strong></div>
                <div><span>PET:</span><strong>{petName} ({petSize})</strong></div>
                <div><span>DATA:</span><strong>{selectedDate.label}</strong></div>
                <div><span>HORÁRIO:</span><strong>{selectedTimeSlot.time}</strong></div>
                <div className="code-highlight-petshop"><span>CÓDIGO:</span><strong>{confirmationCode}</strong></div>
              </div>

              <div className="whatsapp-alert-petshop">
                <MessageCircle size={18} />
                <span>Enviamos a confirmação via WhatsApp</span>
              </div>

              <div className="prepare-note-petshop">
                <Info size={14} />
                <span>Não se esqueça de trazer a carteirinha de vacinação</span>
              </div>

              <button onClick={handleReset} className="new-booking-petshop">
                NOVO AGENDAMENTO
              </button>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <footer className="petshop-footer">
          <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" className="footer-whatsapp-petshop">
            <MessageCircle size={18} />
            {text.wantThisSystem}
          </a>
          <p>Pet & Cia © 2026 - Todos os direitos reservados</p>
          <p className="footer-info">CNPJ: 12.345.678/0001-90 | CRMV: 12345</p>
        </footer>
      </div>
    </div>
  )
}