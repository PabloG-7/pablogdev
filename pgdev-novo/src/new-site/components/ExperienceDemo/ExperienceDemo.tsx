import {
  ArrowRight,
  Bell,
  CalendarCheck,
  CalendarDays,
  CheckCircle,
  Clock,
  Sparkles,
  Users
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import type { Language } from '../../types'
import './ExperienceDemo.css'

type Props = {
  language: Language
}

export default function ExperienceDemo({ language }: Props) {
  const isPt = language === 'pt'

  return (
    <section className="booking-experience" id="experiencia">
      <div className="booking-exp-container">
        {/* LEFT SIDE - COPY */}
        <div className="booking-exp-copy">
          <span className="booking-exp-label">
            <Sparkles size={14} />
            {isPt ? 'AGENDAMENTO ONLINE' : 'AGENDAMIENTO ONLINE'}
          </span>

          <h2>
            {isPt
              ? 'Deixe seus clientes agendarem sozinhos.'
              : 'Deja que tus clientes agenden solos.'}
          </h2>

          <p>
            {isPt
              ? 'Uma experiência moderna onde o cliente escolhe o horário, confirma pelo WhatsApp e você recebe tudo organizado sem perder tempo respondendo mensagens repetidas.'
              : 'Una experiencia moderna donde el cliente elige el horario, confirma por WhatsApp y tú recibes todo organizado sin perder tiempo respondiendo mensajes repetidos.'}
          </p>

          <div className="booking-exp-pills">
            <div>
              <CalendarCheck size={16} />
              <span>{isPt ? 'Agenda automática' : 'Agenda automática'}</span>
            </div>
            <div>
              <FaWhatsapp size={14} />
              <span>{isPt ? 'Confirmação no WhatsApp' : 'Confirmación por WhatsApp'}</span>
            </div>
            <div>
              <Bell size={16} />
              <span>{isPt ? 'Lembretes inteligentes' : 'Recordatorios inteligentes'}</span>
            </div>
          </div>

          <a href="#contato" className="booking-exp-cta">
            {isPt ? 'QUERO AGENDAMENTO ONLINE' : 'QUIERO AGENDAMIENTO ONLINE'}
            <ArrowRight size={16} />
          </a>
        </div>

        {/* RIGHT SIDE - VISUAL CLEAN */}
        <div className="booking-exp-visual">
          {/* Phone Mockup */}
          <div className="booking-phone">
            <div className="booking-phone-screen">
              <div className="booking-phone-top">
                <div>
                  <small>{isPt ? 'Agendamento' : 'Agendamiento'}</small>
                  <strong>{isPt ? 'Escolha seu horário' : 'Elige tu horario'}</strong>
                </div>
                <CalendarDays size={18} />
              </div>

              <div className="booking-days">
                <button>Seg</button>
                <button className="active">Ter</button>
                <button>Qua</button>
                <button>Qui</button>
              </div>

              <div className="booking-hours">
                <button>09:00</button>
                <button className="active">14:30</button>
                <button>17:00</button>
              </div>

              <div className="booking-service-card">
                <div>
                  <span>{isPt ? 'Serviço selecionado' : 'Servicio seleccionado'}</span>
                  <strong>{isPt ? 'Consulta / Atendimento' : 'Consulta / Atención'}</strong>
                </div>
                <CheckCircle size={16} />
              </div>

              <button className="booking-confirm">
                <FaWhatsapp size={14} />
                {isPt ? 'Confirmar pelo WhatsApp' : 'Confirmar por WhatsApp'}
              </button>
            </div>
          </div>

          {/* Panel Dashboard */}
          <div className="booking-panel">
            <div className="booking-panel-header">
              <div>
                <small>{isPt ? 'Painel do negócio' : 'Panel del negocio'}</small>
                <strong>{isPt ? 'Agenda de hoje' : 'Agenda de hoy'}</strong>
              </div>
              <span>{isPt ? 'Ao vivo' : 'En vivo'}</span>
            </div>

            <div className="booking-stats">
              <div>
                <Users size={16} />
                <strong>12</strong>
                <span>{isPt ? 'agendados' : 'agendados'}</span>
              </div>
              <div>
                <CheckCircle size={16} />
                <strong>9</strong>
                <span>{isPt ? 'confirmados' : 'confirmados'}</span>
              </div>
              <div>
                <Clock size={16} />
                <strong>3</strong>
                <span>{isPt ? 'pendentes' : 'pendientes'}</span>
              </div>
            </div>

            <div className="booking-list">
              <div>
                <span>09:00</span>
                <strong>Ana Souza</strong>
                <em>{isPt ? 'Confirmado' : 'Confirmado'}</em>
              </div>
              <div>
                <span>14:30</span>
                <strong>Carlos Lima</strong>
                <em>{isPt ? 'Confirmado' : 'Confirmado'}</em>
              </div>
              <div>
                <span>17:00</span>
                <strong>Fernanda Costa</strong>
                <em>{isPt ? 'Pendente' : 'Pendiente'}</em>
              </div>
            </div>

            <div className="booking-whatsapp-box">
              <FaWhatsapp size={14} />
              <div>
                <strong>{isPt ? 'Mensagem automática' : 'Mensaje automático'}</strong>
                <span>
                  {isPt
                    ? 'Seu horário foi confirmado para amanhã às 14:30.'
                    : 'Tu horario fue confirmado para mañana a las 14:30.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}