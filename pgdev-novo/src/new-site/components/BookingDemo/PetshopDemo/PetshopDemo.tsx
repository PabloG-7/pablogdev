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
  Info,
  Shield,
  Heart,
  Scissors,
  Dog,
  CreditCard,
  Droplet,
  Sparkles,
  Stethoscope,
  Gift,
  Trophy,
  Users
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
    confirm: isPt ? 'Confirmar agendamento' : 'Confirmar',
    continue: isPt ? 'Continuar' : 'Continuar',
    appointmentConfirmed: isPt ? 'Agendamento confirmado!' : '¡Turno confirmado!',
    hourReserved: isPt ? 'seu horário foi reservado com sucesso.' : 'tu horario fue reservado con éxito.',
    newAppointmentBtn: isPt ? 'Novo agendamento' : 'Nuevo turno',
    wantThisSystem: isPt ? 'Quero este sistema' : 'Quiero este sistema',
    total: isPt ? 'Total' : 'Total'
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
    const imageMap: Record<string, string> = {
      'Equipe Pet': '/demo/petshop/equipe.jpg',
      'Dr. Carlos Vet': '/demo/petshop/carlos.jpg',
      'Juliana Groomer': '/demo/petshop/juliana.jpg',
    }
    
    if (imageMap[prof.name]) {
      return imageMap[prof.name]
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(prof.name)}&background=F59E0B&color=fff&size=120&rounded=true&bold=true`
  }

  const getServiceIcon = (serviceName: string) => {
    if (serviceName === 'Banho completo') return <Droplet size={24} />
    if (serviceName === 'Tosa higiênica') return <Scissors size={24} />
    if (serviceName === 'Banho + Tosa') return <Sparkles size={24} />
    if (serviceName === 'Consulta veterinária') return <Stethoscope size={24} />
    return <PawPrint size={24} />
  }

  const steps = [
    { step: 1, icon: PawPrint, label: 'Serviço' },
    { step: 2, icon: Users, label: 'Profissional' },
    { step: 3, icon: Calendar, label: 'Data' },
    { step: 4, icon: Clock, label: 'Horário' },
    { step: 5, icon: Dog, label: 'Dados' }
  ]

  return (
    <div className="petshop-modern-demo">
      {/* Header Amigável */}
      <header className="petshop-header-demo">
        <div className="header-content-demo">
          <a href="/" className="back-btn-demo">
            <ArrowLeft size={18} />
            <span>Voltar</span>
          </a>
          <div className="logo-demo">
            <PawPrint size={28} />
            <span>Pet & Cia</span>
          </div>
        
        </div>
      </header>

      <div className="petshop-main-demo">
        {!confirmed ? (
          <>
            {/* Hero Section com Imagem de Fundo */}
            <section className="hero-friendly-demo">
              <div className="hero-overlay-demo"></div>
              <div className="hero-content-demo">
                <div className="hero-badge-demo">
                  <Trophy size={16} />
                  <span>+10.000 pets felizes</span>
                </div>
                <h1>Cuidado e carinho<br />para o seu <span>melhor amigo</span></h1>
                <p>Agende banho, tosa ou consulta veterinária em poucos cliques</p>
                <div className="hero-features-demo">
                  <div><Heart size={18} /><span>Atendimento humanizado</span></div>
                  <div><Shield size={18} /><span>Profissionais certificados</span></div>
                  <div><Star size={18} /><span>4.9 ★ (1.230 avaliações)</span></div>
                </div>
              </div>
            </section>

            {/* Sistema de Agendamento */}
            <div className="booking-wrapper-demo">
              {/* Steps */}
              <div className="steps-container-demo">
                {steps.map((item) => (
                  <div key={item.step} className={`step-item-demo ${activeStep >= item.step ? 'active' : ''}`}>
                    <div className="step-circle-demo">
                      <item.icon size={18} />
                    </div>
                    <span>{item.label}</span>
                    {item.step < 5 && <div className="step-line-demo" />}
                  </div>
                ))}
              </div>

              {/* Conteúdo Principal */}
              <div className="booking-content-demo">
                {/* Coluna Esquerda */}
                <div className="form-area-demo">
                  {activeStep === 1 && (
                    <div className="step-panel-demo">
                      <h3>Escolha um serviço</h3>
                      <div className="services-list-demo">
                        {data.services.map((service) => (
                          <button
                            key={service.name}
                            className={`service-btn-demo ${selectedService.name === service.name ? 'active' : ''}`}
                            onClick={() => setSelectedService(service)}
                          >
                            <div className="service-icon-demo">{getServiceIcon(service.name)}</div>
                            <div className="service-text-demo">
                              <strong>{service.name}</strong>
                              <span>{service.duration}</span>
                            </div>
                            <div className="service-price-demo">{service.price}</div>
                            {selectedService.name === service.name && <Check size={18} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="step-panel-demo">
                      <h3>Escolha o profissional</h3>
                      <div className="professionals-list-demo">
                        {data.professionals.map((prof) => (
                          <button
                            key={prof.name}
                            className={`professional-btn-demo ${selectedProfessional.name === prof.name ? 'active' : ''}`}
                            onClick={() => setSelectedProfessional(prof)}
                          >
                            <img src={getProfessionalImage(prof)} alt={prof.name} />
                            <div className="professional-text-demo">
                              <strong>{prof.name}</strong>
                              <p>{prof.role}</p>
                              <div className="rating-demo"><Star size={12} fill="#F59E0B" stroke="#F59E0B" /> {prof.rating}</div>
                            </div>
                            {selectedProfessional.name === prof.name && <Check size={16} />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="step-panel-demo">
                      <h3>Selecione a data</h3>
                      <div className="dates-list-demo">
                        {data.dates.map((date) => (
                          <button
                            key={date.label}
                            className={`date-btn-demo ${selectedDate.label === date.label ? 'active' : ''}`}
                            onClick={() => setSelectedDate(date)}
                          >
                            <span className="date-day-demo">{date.label.split(',')[0]}</span>
                            <span className="date-full-demo">{date.label.split(',')[1]}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeStep === 4 && (
                    <div className="step-panel-demo">
                      <h3>Horários disponíveis</h3>
                      <div className="times-list-demo">
                        {data.timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            disabled={!slot.available}
                            className={`time-btn-demo ${selectedTimeSlot.time === slot.time ? 'active' : ''} ${!slot.available ? 'disabled' : ''}`}
                            onClick={() => slot.available && setSelectedTimeSlot(slot)}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                      <div className="time-note-demo">
                        <Clock size={14} />
                        <span>Atendimento com duração média de 60 minutos</span>
                      </div>
                    </div>
                  )}

                  {activeStep === 5 && (
                    <div className="step-panel-demo">
                      <h3>Dados do tutor e do pet</h3>
                      <form className="pet-form-demo" onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder="Seu nome completo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <input
                          type="tel"
                          placeholder="Seu WhatsApp"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Nome do pet"
                          value={petName}
                          onChange={(e) => setPetName(e.target.value)}
                          required
                        />
                        <select value={petSize} onChange={(e) => setPetSize(e.target.value)}>
                          <option value="Pequeno">🐕 Pequeno (até 10kg)</option>
                          <option value="Médio">🐕‍🦺 Médio (10kg a 25kg)</option>
                          <option value="Grande">🐕 Grande (acima de 25kg)</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Raça (opcional)"
                          value={petBreed}
                          onChange={(e) => setPetBreed(e.target.value)}
                        />
                        <textarea
                          rows={3}
                          placeholder="Observações (ex: pet nervoso, precisa de atenção especial)"
                          value={observation}
                          onChange={(e) => setObservation(e.target.value)}
                        />
                      </form>
                    </div>
                  )}

                  <div className="form-buttons-demo">
                    {activeStep > 1 && (
                      <button className="btn-prev-demo" onClick={handlePrevStep}>
                        Voltar
                      </button>
                    )}
                    {activeStep < 5 ? (
                      <button className="btn-next-demo" onClick={handleNextStep}>
                        Continuar <ChevronRight size={16} />
                      </button>
                    ) : (
                      <button className="btn-confirm-demo" onClick={handleSubmit}>
                        <CheckCircle size={18} /> Confirmar
                      </button>
                    )}
                  </div>
                </div>

                {/* Coluna Direita - Resumo */}
                <div className="summary-area-demo">
                  <div className="summary-card-demo">
                    <div className="summary-header-demo">
                      <PawPrint size={20} />
                      <h4>Resumo do atendimento</h4>
                    </div>
                    
                    <div className="summary-item-demo">
                      <span>Serviço</span>
                      <strong>{selectedService.name}</strong>
                    </div>
                    
                    <div className="summary-item-demo">
                      <span>Profissional</span>
                      <strong>{selectedProfessional.name}</strong>
                    </div>
                    
                    <div className="summary-item-demo">
                      <span>Data</span>
                      <strong>{selectedDate.label}</strong>
                    </div>
                    
                    <div className="summary-item-demo">
                      <span>Horário</span>
                      <strong>{selectedTimeSlot.time}</strong>
                    </div>
                    
                    {petName && (
                      <div className="summary-item-demo">
                        <span>Pet</span>
                        <strong>{petName}</strong>
                      </div>
                    )}
                    
                    <div className="summary-divider-demo" />
                    
                    <div className="summary-total-demo">
                      <span>Total</span>
                      <strong>{selectedService.price}</strong>
                    </div>

                    <div className="payment-methods-demo">
                      <CreditCard size={14} />
                      <span>Aceitamos cartão, PIX e dinheiro</span>
                    </div>
                  </div>

                  <div className="perks-card-demo">
                    <h4>Benefícios exclusivos</h4>
                    <div className="perk-demo"><Gift size={14} /> 1ª visita com 10% off</div>
                    <div className="perk-demo"><Heart size={14} /> Produtos hipoalergênicos</div>
                    <div className="perk-demo"><Shield size={14} /> Ambiente climatizado</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seção de Depoimentos */}
            <section className="testimonials-demo">
              <h3>O que dizem nossos clientes</h3>
              <div className="testimonials-grid-demo">
                <div className="testimonial-demo">
                  <div className="stars-demo">★★★★★</div>
                  <p>"Meu pet ama esse lugar! Atendimento maravilhoso e profissionais muito atenciosos."</p>
                  <strong>- Amanda Silva</strong>
                </div>
                <div className="testimonial-demo">
                  <div className="stars-demo">★★★★★</div>
                  <p>"Melhor petshop de SP! Ambiente limpo, organizado e cuidam super bem do Thor."</p>
                  <strong>- Rafael Oliveira</strong>
                </div>
                <div className="testimonial-demo">
                  <div className="stars-demo">★★★★★</div>
                  <p>"Equipe qualificada e muito carinhosa com os animais. Recomendo demais!"</p>
                  <strong>- Juliana Costa</strong>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Tela de Sucesso */
          <div className="success-screen-demo">
            <div className="success-card-demo">
              <div className="success-icon-demo"><PawPrint size={64} /></div>
              <h2>{text.appointmentConfirmed}</h2>
              <p>{name}, {text.hourReserved}</p>
              
              <div className="booking-details-demo">
                <div><span>Serviço:</span><strong>{selectedService.name}</strong></div>
                <div><span>Profissional:</span><strong>{selectedProfessional.name}</strong></div>
                <div><span>Pet:</span><strong>{petName}</strong></div>
                <div><span>Data/Horário:</span><strong>{selectedDate.label} - {selectedTimeSlot.time}</strong></div>
                <div className="code-demo"><span>Código:</span><strong>{confirmationCode}</strong></div>
              </div>

              <div className="whatsapp-message-demo">
                <MessageCircle size={18} />
                <span>Confirmação enviada por WhatsApp</span>
              </div>

              <div className="reminder-demo">
                <Info size={14} />
                <span>Não esqueça a carteirinha de vacinação!</span>
              </div>

              <button onClick={handleReset} className="new-booking-demo">
                Novo agendamento
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="petshop-footer-demo">
          <a href={data.whatsapp} target="_blank" rel="noopener noreferrer" className="whatsapp-link-demo">
            <MessageCircle size={18} />
            {text.wantThisSystem}
          </a>
          <p>Pet & Cia © 2026 - Cuidando do seu melhor amigo com amor</p>
        </footer>
      </div>
    </div>
  )
}