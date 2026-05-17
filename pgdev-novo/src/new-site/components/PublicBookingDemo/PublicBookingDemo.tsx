import { useState } from 'react'
import {
  ArrowLeft,
  Calendar,
  Clock3,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'

import type { Language } from '../../types'
import './PublicBookingDemo.css'

type Props = {
  language: Language
}

const services = [
  {
    id: 1,
    namePt: 'Consulta',
    nameEs: 'Consulta',
    duration: '50min',
    price: 'R$ 120',
  },
  {
    id: 2,
    namePt: 'Retorno',
    nameEs: 'Retorno',
    duration: '30min',
    price: 'R$ 80',
  },
  {
    id: 3,
    namePt: 'Atendimento premium',
    nameEs: 'Atención premium',
    duration: '1h 20min',
    price: 'R$ 240',
  },
]

const availableTimes = [
  '09:00',
  '10:30',
  '14:00',
  '15:30',
  '17:00',
]

export default function PublicBookingDemo({
  language,
}: Props) {
  const isPt = language === 'pt'

  const [selectedService, setSelectedService] = useState(services[0])
  const [selectedTime, setSelectedTime] = useState('14:00')
  const [confirmed, setConfirmed] = useState(false)

  return (
    <main className="public-booking">
      <header className="public-booking-header">
        <a href="/" className="public-back-btn">
          <ArrowLeft size={16} />
          <span>
            {isPt ? 'Voltar ao site' : 'Volver al sitio'}
          </span>
        </a>

        <div className="public-brand">
          <div className="public-brand-mark">P</div>

          <div>
            <strong>PGDev Agenda</strong>
            <span>
              {isPt
                ? 'Experiência de agendamento'
                : 'Experiencia de reserva'}
            </span>
          </div>
        </div>
      </header>

      <section className="public-booking-hero">
        <div className="public-booking-copy">
          <span>
            {isPt ? 'Agendamento online' : 'Reserva online'}
          </span>

          <h1>
            {isPt
              ? 'Seu cliente agenda em poucos passos'
              : 'Tu cliente agenda en pocos pasos'}
          </h1>

          <p>
            {isPt
              ? 'Escolha do serviço, horário disponível e confirmação automática no WhatsApp.'
              : 'Elección del servicio, horario disponible y confirmación automática por WhatsApp.'}
          </p>
        </div>

        <div className="public-booking-card">
          {!confirmed ? (
            <>
              <div className="public-step">
                <div className="public-step-number">01</div>

                <div>
                  <strong>
                    {isPt
                      ? 'Escolha o serviço'
                      : 'Elige el servicio'}
                  </strong>

                  <p>
                    {isPt
                      ? 'Selecione o tipo de atendimento.'
                      : 'Selecciona el tipo de atención.'}
                  </p>
                </div>
              </div>

              <div className="public-services">
                {services.map(service => (
                  <button
                    key={service.id}
                    type="button"
                    className={`public-service-card ${
                      selectedService.id === service.id
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => setSelectedService(service)}
                  >
                    <div>
                      <strong>
                        {isPt
                          ? service.namePt
                          : service.nameEs}
                      </strong>

                      <span>{service.duration}</span>
                    </div>

                    <small>{service.price}</small>
                  </button>
                ))}
              </div>

              <div className="public-step">
                <div className="public-step-number">02</div>

                <div>
                  <strong>
                    {isPt
                      ? 'Escolha o horário'
                      : 'Elige el horario'}
                  </strong>

                  <p>
                    {isPt
                      ? 'Horários disponíveis em tempo real.'
                      : 'Horarios disponibles en tiempo real.'}
                  </p>
                </div>
              </div>

              <div className="public-times">
                {availableTimes.map(time => (
                  <button
                    key={time}
                    type="button"
                    className={
                      selectedTime === time ? 'active' : ''
                    }
                    onClick={() => setSelectedTime(time)}
                  >
                    <Clock3 size={14} />
                    {time}
                  </button>
                ))}
              </div>

              <div className="public-summary">
                <div>
                  <span>
                    {isPt ? 'Serviço' : 'Servicio'}
                  </span>

                  <strong>
                    {isPt
                      ? selectedService.namePt
                      : selectedService.nameEs}
                  </strong>
                </div>

                <div>
                  <span>
                    {isPt ? 'Horário' : 'Horario'}
                  </span>

                  <strong>{selectedTime}</strong>
                </div>
              </div>

              <button
                type="button"
                className="public-confirm-btn"
                onClick={() => setConfirmed(true)}
              >
                <span>
                  {isPt
                    ? 'Confirmar agendamento'
                    : 'Confirmar reserva'}
                </span>

                <ChevronRight size={18} />
              </button>
            </>
          ) : (
            <div className="public-success">
              <div className="public-success-icon">
                <CheckCircle2 size={42} />
              </div>

              <strong>
                {isPt
                  ? 'Agendamento confirmado'
                  : 'Reserva confirmada'}
              </strong>

              <p>
                {isPt
                  ? 'Seu horário foi reservado com sucesso.'
                  : 'Tu horario fue reservado correctamente.'}
              </p>

              <div className="public-success-card">
                <div>
                  <Calendar size={16} />
                  <span>25 Maio</span>
                </div>

                <div>
                  <Clock3 size={16} />
                  <span>{selectedTime}</span>
                </div>
              </div>

              <div className="public-whatsapp-box">
                <span>WhatsApp</span>

                <p>
                  {isPt
                    ? `Olá Ana! Seu horário foi confirmado para às ${selectedTime} ✅`
                    : `¡Hola Ana! Tu horario fue confirmado para las ${selectedTime} ✅`}
                </p>
              </div>

              <a
                href="/demo-agendamento"
                className="public-finish-btn"
              >
                {isPt
                  ? 'Ver no painel'
                  : 'Ver en el panel'}
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}