import './ProjectGuide.css'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Globe,
  HelpCircle,
  MessageSquareMore,
  Settings2,
  X,
} from 'lucide-react'
import type { Language } from '../../types'

type ProjectGuideProps = {
  language: Language
}

type Need = 'site' | 'system' | 'unsure' | ''
type Moment = 'starting' | 'improving' | 'urgent' | ''

type SelectOption<T extends string> = {
  key: T
  title: string
  description?: string
  icon?: typeof Globe
}

type GoalOption = {
  key: string
  label: string
}

function ProjectGuide({ language }: ProjectGuideProps) {
  const [open, setOpen] = useState(false)
  const [need, setNeed] = useState<Need>('')
  const [moment, setMoment] = useState<Moment>('')
  const [goals, setGoals] = useState<string[]>([])

  const isPt = language === 'pt'
  const whatsappNumber = '5511961111894'

  const needOptions = useMemo<Array<SelectOption<Need>>>(() => {
    return [
      {
        key: 'site',
        title: isPt ? 'Site profissional' : 'Sitio profesional',
        description: isPt
          ? 'Para gerar confiança, aparecer melhor e receber mais contatos.'
          : 'Para generar confianza, aparecer mejor y recibir más contactos.',
        icon: Globe,
      },
      {
        key: 'system',
        title: isPt ? 'Sistema sob medida' : 'Sistema a medida',
        description: isPt
          ? 'Para organizar atendimento, vendas, clientes e processos internos.'
          : 'Para organizar atención, ventas, clientes y procesos internos.',
        icon: Settings2,
      },
      {
        key: 'unsure',
        title: isPt ? 'Quero orientação' : 'Quiero orientación',
        description: isPt
          ? 'Para entender se o ideal é site, sistema, automação ou uma combinação.'
          : 'Para entender si conviene sitio, sistema, automatización o una combinación.',
        icon: HelpCircle,
      },
    ]
  }, [isPt])

  const momentOptions = useMemo<Array<SelectOption<Moment>>>(() => {
    return [
      {
        key: 'starting',
        title: isPt ? 'Estou começando agora' : 'Estoy empezando ahora',
      },
      {
        key: 'improving',
        title: isPt ? 'Já tenho algo e quero melhorar' : 'Ya tengo algo y quiero mejorarlo',
      },
      {
        key: 'urgent',
        title: isPt ? 'Preciso colocar em prática logo' : 'Necesito ponerlo en marcha pronto',
      },
    ]
  }, [isPt])

  const goalOptions = useMemo<GoalOption[]>(() => {
    if (need === 'site') {
      return [
        { key: 'trust', label: isPt ? 'Passar mais confiança' : 'Transmitir más confianza' },
        { key: 'contacts', label: isPt ? 'Receber contatos pelo WhatsApp' : 'Recibir contactos por WhatsApp' },
        { key: 'explain', label: isPt ? 'Mostrar meus serviços com clareza' : 'Mostrar mis servicios con claridad' },
        { key: 'visibility', label: isPt ? 'Melhorar presença online' : 'Mejorar presencia online' },
      ]
    }

    if (need === 'system') {
      return [
        { key: 'clients', label: isPt ? 'Organizar clientes e atendimentos' : 'Organizar clientes y atención' },
        { key: 'automation', label: isPt ? 'Automatizar tarefas repetitivas' : 'Automatizar tareas repetitivas' },
        { key: 'sales', label: isPt ? 'Controlar vendas e pedidos' : 'Controlar ventas y pedidos' },
        { key: 'reports', label: isPt ? 'Ter relatórios e visão clara' : 'Tener reportes y visión clara' },
      ]
    }

    if (need === 'unsure') {
      return [
        { key: 'direction', label: isPt ? 'Entender o melhor caminho' : 'Entender el mejor camino' },
        { key: 'idea', label: isPt ? 'Transformar uma ideia em plano' : 'Convertir una idea en plan' },
        { key: 'budget', label: isPt ? 'Ter noção de prazo e investimento' : 'Tener idea de plazo e inversión' },
        { key: 'specialist', label: isPt ? 'Conversar direto com um especialista' : 'Hablar directo con un especialista' },
      ]
    }

    return []
  }, [isPt, need])

  const selectedNeed = needOptions.find((item) => item.key === need)
  const selectedMoment = momentOptions.find((item) => item.key === moment)
  const canFinish = Boolean(need && moment && goals.length > 0)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeGuide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function resetGuide() {
    setNeed('')
    setMoment('')
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

  function openWhatsApp() {
    if (!canFinish || !selectedNeed || !selectedMoment) return

    const message = isPt
      ? [
          'Olá! Vim pelo site e quero uma orientação para meu projeto.',
          `O que eu preciso: ${selectedNeed.title}.`,
          `Momento atual: ${selectedMoment.title}.`,
          `Principais objetivos: ${goals.join(', ')}.`,
          'Pode me ajudar a entender o melhor caminho, prazo e investimento?',
        ].join('\n')
      : [
          '¡Hola! Vi tu sitio y quiero orientación para mi proyecto.',
          `Lo que necesito: ${selectedNeed.title}.`,
          `Momento actual: ${selectedMoment.title}.`,
          `Objetivos principales: ${goals.join(', ')}.`,
          '¿Puedes ayudarme a entender el mejor camino, plazo e inversión?',
        ].join('\n')

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )

    closeGuide()
  }

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
        <div className="project-guide" role="dialog" aria-modal="true" aria-labelledby="project-guide-title">
          <button
            type="button"
            className="project-guide__overlay"
            onClick={closeGuide}
            aria-label={isPt ? 'Fechar guia' : 'Cerrar guía'}
          />

          <div className="project-guide__modal">
            <button
              type="button"
              className="project-guide__close"
              onClick={closeGuide}
              aria-label={isPt ? 'Fechar guia' : 'Cerrar guía'}
            >
              <X size={18} />
            </button>

            <span className="project-guide__badge">
              {isPt ? 'Diagnóstico rápido' : 'Diagnóstico rápido'}
            </span>

            <h2 id="project-guide-title" className="project-guide__title">
              {isPt ? 'O que você precisa?' : '¿Qué necesitas?'}
            </h2>

            <div className="project-guide__options">
              {needOptions.map((item) => {
                const Icon = item.icon || HelpCircle

                return (
                  <button
                    key={item.key}
                    type="button"
                    className={`project-guide__option ${need === item.key ? 'is-selected' : ''}`}
                    onClick={() => handleSelectNeed(item.key)}
                  >
                    <Icon size={20} />
                    <span>
                      <strong>{item.title}</strong>
                      {item.description && <small>{item.description}</small>}
                    </span>
                  </button>
                )
              })}
            </div>

            {need && (
              <>
                <h2 className="project-guide__title" style={{ marginTop: 24 }}>
                  {isPt ? 'Qual é o momento?' : '¿En qué momento estás?'}
                </h2>

                <div className="project-guide__chips project-guide__chips--single">
                  {momentOptions.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={moment === item.key ? 'is-selected' : ''}
                      onClick={() => setMoment(item.key)}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>

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
                      {goals.includes(item.label) && <CheckCircle2 size={14} />}
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