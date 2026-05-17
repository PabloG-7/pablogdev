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
    namePt: 'Consulta com Dra. Marina',
    nameEs: 'Consulta con Dra. Marina',
    duration: '50min',
    price: 'R$ 120',
  },
  {
    id: 2,
    namePt: 'Retorno com Dr. Carlos',
    nameEs: 'Retorno con Dr. Carlos',
    duration: '30min',
    price: 'R$ 80',
  },
  {
    id: 3,
    namePt: 'Atendimento premium - Studio Bella',
    nameEs: 'Atención premium - Studio Bella',
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

// Função para obter o dia da semana em português/espanhol
const getWeekDay = (date: Date, isPt: boolean) => {
  const weekDaysPt = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
  const weekDaysEs = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const weekDays = isPt ? weekDaysPt : weekDaysEs
  return weekDays[date.getDay()]
}

// Formatar data para exibição
const formatDate = (date: Date, isPt: boolean) => {
  const day = date.getDate()
  const month = isPt 
    ? ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'][date.getMonth()]
    : ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][date.getMonth()]
  return `${day} de ${month}`
}

export default function PublicBookingDemo({
  language,
}: Props) {
  const isPt = language === 'pt'
  const [selectedDate] = useState(new Date(2025, 4, 25)) // 25 de Maio de 2025
  const [selectedService, setSelectedService] = useState(services[0])
  const [selectedTime, setSelectedTime] = useState('14:00')
  const [confirmed, setConfirmed] = useState(false)

  const weekDay = getWeekDay(selectedDate, isPt)
  const formattedDate = formatDate(selectedDate, isPt)
  const fullDateString = `${weekDay} • ${formattedDate}`

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
                    {isPt ? 'Data e horário' : 'Fecha y hora'}
                  </span>

                  <strong>
                    {fullDateString} • {selectedTime}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className="public-confirm-btn"
                onClick={() => setConfirmed(true)}
              >
                <span>
                  {isPt
                    ? 'Confirmar horário'
                    : 'Confirmar hora'}
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
                  <span>{formattedDate}</span>
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
                    ? `Olá Ana! Seu horário foi confirmado para ${fullDateString} às ${selectedTime} ✅`
                    : `¡Hola Ana! Tu horario fue confirmado para ${fullDateString} a las ${selectedTime} ✅`}
                </p>
              </div>

              <div className="public-whatsapp-confirm">
                <CheckCircle2 size={14} />
                <span>
                  {isPt
                    ? 'Você receberá a confirmação no WhatsApp'
                    : 'Recibirás la confirmación en WhatsApp'}
                </span>
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