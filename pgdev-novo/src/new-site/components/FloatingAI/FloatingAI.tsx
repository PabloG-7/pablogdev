import './FloatingAI.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { X, ArrowRight, Send } from 'lucide-react'
import type { Language } from '../../types'

type FloatingAIProps = {
  language: Language
}

type Message = {
  id: string
  type: 'bot' | 'user'
  text: string
  options?: Array<{
    id: string
    label: string
    value: string
  }>
}

type Step = 'welcome' | 'service' | 'company' | 'name' | 'result'

export default function FloatingAI({ language }: FloatingAIProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState<Step>('welcome')
  const [userData, setUserData] = useState({
    service: '',
    serviceRaw: '',
    company: '',
    name: ''
  })
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isPt = language === 'pt'
  const isEs = language === 'es'

  const t = {
    pt: {
      buttonLabel: 'Assistente',
      welcome: {
        message: 'Olá! 👋 Sou o assistente da PabloG.Dev.\n\nVou ajudar você a encontrar a solução digital ideal para o seu negócio. São apenas algumas perguntas rápidas.\n\nVamos começar?',
        options: [
          { id: 'start', label: 'Sim, vamos começar', value: 'start' },
          { id: 'skip', label: 'Falar diretamente comigo', value: 'skip' }
        ]
      },
      service: {
        message: 'O que você precisa?',
        options: [
          { id: 'website', label: 'Site Profissional', value: 'website' },
          { id: 'system', label: 'Sistema Web', value: 'system' },
          { id: 'booking', label: 'Agendamento Online', value: 'booking' },
          { id: 'whatsapp', label: 'WhatsApp e Automação', value: 'whatsapp' },
          { id: 'notSure', label: 'Ainda não sei, quero ajuda', value: 'notSure' }
        ]
      },
      company: {
        message: 'Qual o nome da sua empresa ou negócio?',
        placeholder: 'Ex: Clínica Bella Saúde'
      },
      name: {
        message: 'Qual o seu nome?',
        placeholder: 'Ex: João Silva'
      },
      result: {
        loading: 'Preparando suas informações...',
        message: 'Suas respostas foram registradas. Se quiser, pode falar diretamente comigo agora para começarmos seu projeto.',
        cta: 'Falar comigo agora',
        restart: 'Recomeçar'
      },
      serviceDetected: (service: string) => `Entendi! Você está buscando: ${service}`
    },
    es: {
      buttonLabel: 'Asistente',
      welcome: {
        message: '¡Hola! 👋 Soy el asistente de PabloG.Dev.\n\nTe ayudaré a encontrar la solución digital ideal para tu negocio. Son solo algunas preguntas rápidas.\n\n¿Empezamos?',
        options: [
          { id: 'start', label: 'Sí, vamos a empezar', value: 'start' },
          { id: 'skip', label: 'Hablar directamente conmigo', value: 'skip' }
        ]
      },
      service: {
        message: '¿Qué necesitas?',
        options: [
          { id: 'website', label: 'Sitio Profesional', value: 'website' },
          { id: 'system', label: 'Sistema Web', value: 'system' },
          { id: 'booking', label: 'Reservas Online', value: 'booking' },
          { id: 'whatsapp', label: 'WhatsApp y Automatización', value: 'whatsapp' },
          { id: 'notSure', label: 'Todavía no sé, quiero ayuda', value: 'notSure' }
        ]
      },
      company: {
        message: '¿Cuál es el nombre de tu empresa o negocio?',
        placeholder: 'Ej: Clínica Bella Salud'
      },
      name: {
        message: '¿Cuál es tu nombre?',
        placeholder: 'Ej: Juan Pérez'
      },
      result: {
        loading: 'Preparando tu información...',
        message: 'Tus respuestas fueron registradas. Si quieres, puedes hablar directamente conmigo ahora para comenzar tu proyecto.',
        cta: 'Hablar conmigo ahora',
        restart: 'Recomenzar'
      },
      serviceDetected: (service: string) => `¡Entendido! Estás buscando: ${service}`
    },
    en: {
      buttonLabel: 'Assistant',
      welcome: {
        message: 'Hello! 👋 I\'m the assistant from PabloG.Dev.\n\nI\'ll help you find the ideal digital solution for your business. Just a few quick questions.\n\nShall we start?',
        options: [
          { id: 'start', label: 'Yes, let\'s start', value: 'start' },
          { id: 'skip', label: 'Talk directly with me', value: 'skip' }
        ]
      },
      service: {
        message: 'What do you need?',
        options: [
          { id: 'website', label: 'Professional Website', value: 'website' },
          { id: 'system', label: 'Web System', value: 'system' },
          { id: 'booking', label: 'Online Booking', value: 'booking' },
          { id: 'whatsapp', label: 'WhatsApp & Automation', value: 'whatsapp' },
          { id: 'notSure', label: 'Not sure yet, I need help', value: 'notSure' }
        ]
      },
      company: {
        message: 'What\'s the name of your company or business?',
        placeholder: 'Ex: Bella Health Clinic'
      },
      name: {
        message: 'What\'s your name?',
        placeholder: 'Ex: John Smith'
      },
      result: {
        loading: 'Preparing your information...',
        message: 'Your answers have been recorded. If you want, you can talk directly with me now to start your project.',
        cta: 'Talk with me now',
        restart: 'Start over'
      },
      serviceDetected: (service: string) => `Got it! You're looking for: ${service}`
    }
  }

  const lang = t[language]
  const whatsappNumber = '5511961111894'

  const generateId = useCallback(() => {
    // Melhor ID para evitar colisões
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID()
    }
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }, [])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const addMessage = useCallback((message: Omit<Message, 'id'>) => {
    setMessages(prev => {
      const lastMsg = prev[prev.length - 1]
      if (lastMsg?.text === message.text && lastMsg?.type === message.type) {
        return prev
      }
      return [...prev, { ...message, id: generateId() }]
    })
    setTimeout(scrollToBottom, 100)
  }, [scrollToBottom, generateId])

  const simulateTyping = useCallback(async (message: string, options?: Message['options']) => {
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300))
    addMessage({ type: 'bot', text: message, options })
    setIsTyping(false)
  }, [addMessage])

  const openWhatsApp = useCallback(() => {
    const serviceMap: Record<string, string> = {
      website: isPt ? 'Site Profissional' : isEs ? 'Sitio Profesional' : 'Professional Website',
      system: isPt ? 'Sistema Web' : isEs ? 'Sistema Web' : 'Web System',
      booking: isPt ? 'Agendamento Online' : isEs ? 'Reservas Online' : 'Online Booking',
      whatsapp: isPt ? 'WhatsApp e Automação' : isEs ? 'WhatsApp y Automatización' : 'WhatsApp & Automation',
      notSure: isPt ? 'Ainda não sei' : isEs ? 'Todavía no sé' : 'Not sure yet'
    }

    const serviceLabel = userData.serviceRaw || serviceMap[userData.service] || userData.service
    const company = userData.company || (isPt ? 'não informado' : isEs ? 'no informado' : 'not informed')
    const name = userData.name || (isPt ? 'não informado' : isEs ? 'no informado' : 'not informed')

    const message = isPt
      ? `Olá! Vim pelo assistente do site.\n\nServiço: ${serviceLabel}\nEmpresa: ${company}\nNome: ${name}\n\nGostaria de saber mais sobre as soluções.`
      : isEs
      ? `¡Hola! Vine por el asistente del sitio.\n\nServicio: ${serviceLabel}\nEmpresa: ${company}\nNombre: ${name}\n\nMe gustaría saber más sobre las soluciones.`
      : `Hello! I came through the site assistant.\n\nService: ${serviceLabel}\nCompany: ${company}\nName: ${name}\n\nI would like to know more about the solutions.`

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }, [userData, isPt, isEs])

  const handleOptionClick = useCallback(async (value: string) => {
    let userLabel = value

    if (currentStep === 'welcome') {
      userLabel = value === 'start' ? lang.welcome.options[0].label : lang.welcome.options[1].label
      addMessage({ type: 'user', text: userLabel })

      if (value === 'skip') {
        await simulateTyping(
          isPt ? 'Entendido. Vou abrir o WhatsApp para você falar diretamente comigo.' :
          isEs ? 'Entendido. Voy a abrir WhatsApp para que hables directamente conmigo.' :
          'Understood. I\'ll open WhatsApp for you to talk directly with me.'
        )
        setTimeout(openWhatsApp, 500)
        return
      }

      setCurrentStep('service')
      await simulateTyping(lang.service.message, lang.service.options)
      return
    }

    if (currentStep === 'service') {
      const option = lang.service.options.find(o => o.value === value)
      userLabel = option?.label || value
      addMessage({ type: 'user', text: userLabel })
      
      if (value !== 'notSure') {
        setUserData(prev => ({ ...prev, service: value, serviceRaw: option?.label || value }))
      } else {
        setUserData(prev => ({ ...prev, service: value, serviceRaw: '' }))
      }
      
      setCurrentStep('company')
      await simulateTyping(lang.company.message)
      return
    }

    if (currentStep === 'result') {
      if (value === 'restart') {
        setMessages([])
        setUserData({ service: '', serviceRaw: '', company: '', name: '' })
        setCurrentStep('welcome')
        setInputValue('')
        setTimeout(() => {
          simulateTyping(lang.welcome.message, lang.welcome.options)
        }, 300)
        return
      }
      if (value === 'whatsapp') {
        openWhatsApp()
        return
      }
    }
  }, [currentStep, lang, addMessage, simulateTyping, openWhatsApp, isPt, isEs])

  const handleSendMessage = useCallback(async () => {
    const text = inputValue.trim()
    if (!text) return

    setInputValue('')
    addMessage({ type: 'user', text })

    if (currentStep === 'company') {
      setUserData(prev => ({ ...prev, company: text }))
      setCurrentStep('name')
      await simulateTyping(lang.name.message)
      return
    }

    if (currentStep === 'name') {
      setUserData(prev => ({ ...prev, name: text }))
      setCurrentStep('result')
      
      setIsTyping(true)
      await new Promise(resolve => setTimeout(resolve, 600))
      
      const serviceLabel = userData.serviceRaw || lang.service.options.find(o => o.value === userData.service)?.label || userData.service
      
      const resultMessage = `${lang.result.message}\n\n${isPt ? `📋 Serviço: ${serviceLabel}` : isEs ? `📋 Servicio: ${serviceLabel}` : `📋 Service: ${serviceLabel}`}\n${isPt ? `🏢 Empresa: ${userData.company}` : isEs ? `🏢 Empresa: ${userData.company}` : `🏢 Company: ${userData.company}`}\n${isPt ? `👤 Nome: ${text}` : isEs ? `👤 Nombre: ${text}` : `👤 Name: ${text}`}`
      
      addMessage({ 
        type: 'bot', 
        text: resultMessage,
        options: [
          { id: 'whatsapp', label: lang.result.cta, value: 'whatsapp' },
          { id: 'restart', label: lang.result.restart, value: 'restart' }
        ]
      })
      setIsTyping(false)
      return
    }
  }, [inputValue, currentStep, lang, addMessage, simulateTyping, userData, isPt, isEs])

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => {
      const newState = !prev
      if (newState && messages.length === 0) {
        setTimeout(() => {
          simulateTyping(lang.welcome.message, lang.welcome.options)
        }, 300)
      }
      return newState
    })
  }, [messages.length, lang, simulateTyping])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  return (
    <>
      {/* ===== BOTÃO FLUTUANTE ===== */}
      <button
        className={`floating-ai-button ${isOpen ? 'open' : ''}`}
        onClick={toggleOpen}
        aria-label={lang.buttonLabel}
      >
        {!isOpen && (
          <>
            <span className="pulse-ring"></span>
            <span className="pulse-ring"></span>
          </>
        )}
        {isOpen ? (
          <X size={24} strokeWidth={1.5} />
        ) : (
          <img
            src="/iconia.webp"
            alt="Assistente IA"
            className="floating-ai-icon"
          />
        )}
      </button>

      {/* ===== CHAT ===== */}
      {isOpen && (
        <div className="floating-ai-chat">
          {/* ===== HEADER - APENAS CAPA ===== */}
          <div className="floating-ai-header">
            {/* CAPA DE FUNDO */}
            <img
              src="/iconiacapa.webp"
              alt=""
              className="header-cover"
            />
            
            {/* CONTEÚDO DO HEADER - APENAS O BOTÃO FECHAR */}
            <div className="header-content">
              <button 
                className="header-close" 
                onClick={toggleOpen}
                aria-label={isPt ? 'Fechar' : isEs ? 'Cerrar' : 'Close'}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* ===== BODY ===== */}
          <div className="floating-ai-body">
            {/* ===== MESSAGES ===== */}
            <div className="messages-container">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message ${message.type === 'bot' ? 'bot' : 'user'}`}
                >
                  <div className="message-content">
                    {message.type === 'bot' && (
                      <div className="avatar">
                        <div className="avatar-wrapper">
                          <img
                            src="/iconia2.webp"
                            alt="Assistente IA"
                            className="avatar-ai-icon"
                          />
                        </div>
                        <span className="status-dot"></span>
                      </div>
                    )}
                    <div className="message-text">
                      {message.text.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                  
                  {/* ===== OPÇÕES ===== */}
                  {message.options && message.type === 'bot' && currentStep !== 'result' && (
                    <div className="message-options">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          className="option-btn"
                          onClick={() => handleOptionClick(option.value)}
                        >
                          <span>{option.label}</span>
                          <ArrowRight size={14} strokeWidth={1.5} />
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {message.options && message.type === 'bot' && currentStep === 'result' && (
                    <div className="message-options result-options">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          className={`option-btn ${option.id === 'whatsapp' ? 'primary' : 'secondary'}`}
                          onClick={() => handleOptionClick(option.value)}
                        >
                          <span>{option.label}</span>
                          <ArrowRight size={14} strokeWidth={1.5} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* ===== TYPING INDICATOR ===== */}
              {isTyping && (
                <div className="message bot typing">
                  <div className="message-content">
                    <div className="avatar">
                      <div className="avatar-wrapper">
                        <img
                          src="/iconia2.webp"
                          alt="Assistente IA"
                          className="avatar-ai-icon"
                        />
                      </div>
                      <span className="status-dot"></span>
                    </div>
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* ===== INPUT - SÓ APARECE EM COMPANY E NAME ===== */}
            {(currentStep === 'company' || currentStep === 'name') && (
              <div className="chat-input">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={
                    currentStep === 'company'
                      ? lang.company.placeholder
                      : lang.name.placeholder
                  }
                  className="input-field"
                />
                <button 
                  onClick={handleSendMessage}
                  className="send-btn"
                  disabled={!inputValue.trim()}
                >
                  <Send size={16} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}