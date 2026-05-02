import './ProjectGuide.css'
import { useState, useEffect } from 'react'
import { X, ArrowRight, Globe, Settings2, HelpCircle, MessageSquareMore } from 'lucide-react'
import type { Language } from '../../types'

type ProjectGuideProps = {
  language: Language
}

type Need = 'site' | 'system' | 'unsure' | ''

type GoalOption = {
  key: string
  label: string
}

function ProjectGuide({ language }: ProjectGuideProps) {
  const [open, setOpen] = useState(false)
  const [need, setNeed] = useState<Need>('')
  const [goals, setGoals] = useState<string[]>([])

  const isPt = language === 'pt'
  const whatsappNumber = '5511961111894'

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function resetGuide() {
    setNeed('')
    setGoals([])
  }

  function closeGuide() {
    setOpen(false)
    resetGuide()
  }

  function handleSelectNeed(nextNeed: Need) {
    setNeed(nextNeed)
    setGoals([])
  }

  function toggleGoal(goal: string) {
    setGoals((currentGoals) =>
      currentGoals.includes(goal)
        ? currentGoals.filter((item) => item !== goal)
        : [...currentGoals, goal]
    )
  }

  function getGoals(): GoalOption[] {
    if (need === 'site') {
      return [
        { key: 'clients', label: isPt ? 'Atrair mais clientes' : 'Atraer más clientes' },
        { key: 'trust', label: isPt ? 'Passar mais confiança' : 'Transmitir más confianza' },
        { key: 'presence', label: isPt ? 'Melhorar presença online' : 'Mejorar presencia online' },
        { key: 'whatsapp', label: isPt ? 'Receber contatos no WhatsApp' : 'Recibir contactos por WhatsApp' },
      ]
    }

    if (need === 'system') {
      return [
        { key: 'organization', label: isPt ? 'Organizar minha operação' : 'Organizar mi operación' },
        { key: 'automation', label: isPt ? 'Automatizar processos' : 'Automatizar procesos' },
        { key: 'control', label: isPt ? 'Controlar clientes/vendas' : 'Controlar clientes/ventas' },
        { key: 'reports', label: isPt ? 'Ter relatórios e visão clara' : 'Tener reportes y visión clara' },
      ]
    }

    return [
      { key: 'understand', label: isPt ? 'Entender a melhor solução' : 'Entender la mejor solución' },
      { key: 'idea', label: isPt ? 'Tenho uma ideia e preciso de direção' : 'Tengo una idea y necesito dirección' },
      { key: 'talk', label: isPt ? 'Prefiro explicar direto' : 'Prefiero explicar directamente' },
    ]
  }

  function openWhatsApp() {
    if (!need || goals.length === 0) return

    const needText =
      need === 'site'
        ? isPt
          ? 'um site profissional'
          : 'un sitio web profesional'
        : need === 'system'
        ? isPt
          ? 'um sistema sob medida'
          : 'un sistema a medida'
        : isPt
        ? 'a melhor solução para meu negócio'
        : 'la mejor solución para mi negocio'

    const goalsText = goals.join(', ')

    const message = isPt
      ? `Olá! Vi seu site e quero falar sobre ${needText}. Meus principais objetivos são: ${goalsText}. Pode me orientar melhor?`
      : `¡Hola! Vi tu sitio y quiero hablar sobre ${needText}. Mis principales objetivos son: ${goalsText}. ¿Puedes orientarme mejor?`

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )

    closeGuide()
  }

  const canFinish = Boolean(need && goals.length > 0)
  const goalOptions = getGoals()

  return (
    <>
      {!open && (
   <button
  type="button"
  className="project-guide-float"
  onClick={() => setOpen(true)}
  aria-label={isPt ? 'Montar meu projeto' : 'Armar mi proyecto'}
>
  <MessageSquareMore size={22} />
</button>
      )}

      {open && (
        <div className="project-guide" role="dialog" aria-modal="true">
          <button
            type="button"
            className="project-guide__overlay"
            onClick={closeGuide}
            aria-label={isPt ? 'Fechar guia' : 'Cerrar guía'}
          />

          <div className="project-guide__modal">
            <button type="button" className="project-guide__close" onClick={closeGuide}>
              <X size={18} />
            </button>

            <span className="project-guide__badge">
              {isPt ? 'Diagnóstico rápido' : 'Diagnóstico rápido'}
            </span>

            <h2 className="project-guide__title">
              {isPt ? 'O que você precisa?' : '¿Qué necesitas?'}
            </h2>

            <div className="project-guide__options">
              <button
                type="button"
                className={`project-guide__option ${need === 'site' ? 'is-selected' : ''}`}
                onClick={() => handleSelectNeed('site')}
              >
                <Globe size={20} />
                <span>{isPt ? 'Um site profissional' : 'Un sitio profesional'}</span>
              </button>

              <button
                type="button"
                className={`project-guide__option ${need === 'system' ? 'is-selected' : ''}`}
                onClick={() => handleSelectNeed('system')}
              >
                <Settings2 size={20} />
                <span>{isPt ? 'Um sistema sob medida' : 'Un sistema a medida'}</span>
              </button>

              <button
                type="button"
                className={`project-guide__option ${need === 'unsure' ? 'is-selected' : ''}`}
                onClick={() => handleSelectNeed('unsure')}
              >
                <HelpCircle size={20} />
                <span>{isPt ? 'Ainda não tenho certeza' : 'Todavía no estoy seguro'}</span>
              </button>
            </div>

            {need && (
              <>
                <h2 className="project-guide__title" style={{ marginTop: 24 }}>
                  {isPt ? 'Quais objetivos você tem?' : '¿Qué objetivos tienes?'}
                </h2>

                <p className="project-guide__helper">
                  {isPt
                    ? 'Você pode escolher mais de uma opção.'
                    : 'Puedes elegir más de una opción.'}
                </p>

                <div className="project-guide__chips">
                  {goalOptions.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={goals.includes(item.label) ? 'is-selected' : ''}
                      onClick={() => toggleGoal(item.label)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              type="button"
              className="project-guide__submit"
              disabled={!canFinish}
              onClick={openWhatsApp}
            >
              <span>{isPt ? 'Falar no WhatsApp' : 'Hablar por WhatsApp'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectGuide