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

type Step =
  | 'welcome'
  | 'service'
  | 'projectDescription'
  | 'doubtDescription'
  | 'notSureDescription'
  | 'budgetDescription'
  | 'company'
  | 'name'
  | 'result'

export default function FloatingAI({ language }: FloatingAIProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState<Step>('welcome')
  const [userData, setUserData] = useState({
    service: '',
    serviceRaw: '',
    company: '',
    name: '',
    question: '',
    description: ''
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
        message: 'Olá! 👋\n\nPosso ajudar com sites, sistemas web, automações e melhorias em projetos já existentes.\n\nMe diga rapidamente o que você precisa.',
        options: [
          { id: 'start', label: 'Quero começar', value: 'start' },
          { id: 'skip', label: 'Falar diretamente comigo', value: 'skip' }
        ]
      },
      service: {
        message: 'O que você precisa?',
        options: [
          { id: 'website', label: 'Criar um Site', value: 'website' },
          { id: 'system', label: 'Criar um Sistema', value: 'system' },
          { id: 'ai', label: 'IA e Automação', value: 'ai' },
          { id: 'improve', label: 'Melhorar um Projeto Existente', value: 'improve' },
          { id: 'hasProject', label: 'Já tenho um Projeto', value: 'hasProject' },
          { id: 'doubt', label: 'Tenho uma Dúvida', value: 'doubt' },
          { id: 'notSure', label: 'Não sei qual solução preciso', value: 'notSure' },
          { id: 'budget', label: 'Quero solicitar um orçamento', value: 'budget' }
        ]
      },
      projectDescription: {
        message: 'Me conte rapidamente sobre o projeto.',
        placeholder: 'Ex: Preciso de um site para minha clínica com agendamento online...'
      },
      doubtDescription: {
        message: 'Qual sua dúvida?',
        placeholder: 'Ex: Meu site atual está lento e queria saber se dá para melhorar...'
      },
      notSureDescription: {
        message: 'Sem problemas. Me explique rapidamente o seu negócio e o que você gostaria de melhorar.',
        placeholder: 'Ex: Tenho uma loja de roupas e queria vender mais pela internet...'
      },
      budgetDescription: {
        message: 'Me conte rapidamente o que você precisa.',
        placeholder: 'Ex: Preciso de um sistema de gestão para minha empresa...'
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
        message: 'Perfeito! Já tenho as informações iniciais.',
        cta: 'Clique abaixo para continuar a conversa diretamente no WhatsApp',
        restart: 'Recomeçar'
      },
      serviceDetected: (service: string) => `Entendi! Você está buscando: ${service}`
    },
    es: {
      buttonLabel: 'Asistente',
      welcome: {
        message: '¡Hola! 👋\n\nPuedo ayudar con sitios web, sistemas web, automatizaciones y mejoras en proyectos existentes.\n\nDime rápidamente qué necesitas.',
        options: [
          { id: 'start', label: 'Quiero empezar', value: 'start' },
          { id: 'skip', label: 'Hablar directamente conmigo', value: 'skip' }
        ]
      },
      service: {
        message: '¿Qué necesitas?',
        options: [
          { id: 'website', label: 'Crear un Sitio', value: 'website' },
          { id: 'system', label: 'Crear un Sistema', value: 'system' },
          { id: 'ai', label: 'IA y Automatización', value: 'ai' },
          { id: 'improve', label: 'Mejorar un Proyecto Existente', value: 'improve' },
          { id: 'hasProject', label: 'Ya tengo un Proyecto', value: 'hasProject' },
          { id: 'doubt', label: 'Tengo una Duda', value: 'doubt' },
          { id: 'notSure', label: 'No sé qué solución necesito', value: 'notSure' },
          { id: 'budget', label: 'Quiero solicitar un presupuesto', value: 'budget' }
        ]
      },
      projectDescription: {
        message: 'Cuéntame rápidamente sobre el proyecto.',
        placeholder: 'Ej: Necesito un sitio para mi clínica con reservas online...'
      },
      doubtDescription: {
        message: '¿Cuál es tu duda?',
        placeholder: 'Ej: Mi sitio actual es lento y quiero saber si se puede mejorar...'
      },
      notSureDescription: {
        message: 'Sin problemas. Explícame rápidamente tu negocio y qué te gustaría mejorar.',
        placeholder: 'Ej: Tengo una tienda de ropa y quiero vender más por internet...'
      },
      budgetDescription: {
        message: 'Cuéntame rápidamente lo que necesitas.',
        placeholder: 'Ej: Necesito un sistema de gestión para mi empresa...'
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
        message: '¡Perfecto! Ya tengo la información inicial.',
        cta: 'Haz clic abajo para continuar la conversación directamente en WhatsApp',
        restart: 'Recomenzar'
      },
      serviceDetected: (service: string) => `¡Entendido! Estás buscando: ${service}`
    },
    en: {
      buttonLabel: 'Assistant',
      welcome: {
        message: 'Hello! 👋\n\nI can help with websites, web systems, automations, and improvements to existing projects.\n\nQuickly tell me what you need.',
        options: [
          { id: 'start', label: 'I want to start', value: 'start' },
          { id: 'skip', label: 'Talk directly with me', value: 'skip' }
        ]
      },
      service: {
        message: 'What do you need?',
        options: [
          { id: 'website', label: 'Create a Website', value: 'website' },
          { id: 'system', label: 'Create a System', value: 'system' },
          { id: 'ai', label: 'AI & Automation', value: 'ai' },
          { id: 'improve', label: 'Improve an Existing Project', value: 'improve' },
          { id: 'hasProject', label: 'I already have a Project', value: 'hasProject' },
          { id: 'doubt', label: 'I have a Question', value: 'doubt' },
          { id: 'notSure', label: 'I\'m not sure what solution I need', value: 'notSure' },
          { id: 'budget', label: 'I want to request a quote', value: 'budget' }
        ]
      },
      projectDescription: {
        message: 'Tell me quickly about the project.',
        placeholder: 'Ex: I need a website for my clinic with online booking...'
      },
      doubtDescription: {
        message: 'What\'s your question?',
        placeholder: 'Ex: My current website is slow and I\'d like to know if it can be improved...'
      },
      notSureDescription: {
        message: 'No problem. Quickly explain your business and what you\'d like to improve.',
        placeholder: 'Ex: I have a clothing store and I want to sell more online...'
      },
      budgetDescription: {
        message: 'Tell me quickly what you need.',
        placeholder: 'Ex: I need a management system for my company...'
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
        message: 'Perfect! I already have the initial information.',
        cta: 'Click below to continue the conversation directly on WhatsApp',
        restart: 'Start over'
      },
      serviceDetected: (service: string) => `Got it! You're looking for: ${service}`
    }
  }

  const lang = t[language]
  const whatsappNumber = '5511961111894'

  const generateId = useCallback(() => {
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
      website: isPt ? 'Criar um Site' : isEs ? 'Crear un Sitio' : 'Create a Website',
      system: isPt ? 'Criar um Sistema' : isEs ? 'Crear un Sistema' : 'Create a System',
      ai: isPt ? 'IA e Automação' : isEs ? 'IA y Automatización' : 'AI & Automation',
      improve: isPt ? 'Melhorar um Projeto Existente' : isEs ? 'Mejorar un Proyecto Existente' : 'Improve an Existing Project',
      hasProject: isPt ? 'Já tenho um Projeto' : isEs ? 'Ya tengo un Proyecto' : 'I already have a Project',
      doubt: isPt ? 'Tenho uma Dúvida' : isEs ? 'Tengo una Duda' : 'I have a Question',
      notSure: isPt ? 'Não sei qual solução preciso' : isEs ? 'No sé qué solución necesito' : 'I\'m not sure what solution I need',
      budget: isPt ? 'Quero solicitar um orçamento' : isEs ? 'Quiero solicitar un presupuesto' : 'I want to request a quote'
    }

    const serviceLabel = userData.serviceRaw || serviceMap[userData.service] || userData.service
    const company = userData.company || (isPt ? 'não informado' : isEs ? 'no informado' : 'not informed')
    const name = userData.name || (isPt ? 'não informado' : isEs ? 'no informado' : 'not informed')

    let message = ''

    if (userData.service === 'doubt' && userData.question) {
      message = isPt
        ? `Olá! Vim pelo assistente do site.\n\nInteresse: Tenho uma dúvida\n\nDúvida:\n${userData.question}\n\nEmpresa: ${company}\nNome: ${name}`
        : isEs
        ? `¡Hola! Vine por el asistente del sitio.\n\nInterés: Tengo una duda\n\nDuda:\n${userData.question}\n\nEmpresa: ${company}\nNombre: ${name}`
        : `Hello! I came through the site assistant.\n\nInterest: I have a question\n\nQuestion:\n${userData.question}\n\nCompany: ${company}\nName: ${name}`
    } else if ((userData.service === 'hasProject' || userData.service === 'notSure' || userData.service === 'budget') && userData.description) {
      const interestLabel = userData.service === 'hasProject' 
        ? (isPt ? 'Já tenho um projeto' : isEs ? 'Ya tengo un proyecto' : 'I already have a project')
        : userData.service === 'budget'
        ? (isPt ? 'Quero solicitar um orçamento' : isEs ? 'Quiero solicitar un presupuesto' : 'I want to request a quote')
        : (isPt ? 'Não sei qual solução preciso' : isEs ? 'No sé qué solución necesito' : 'I\'m not sure what solution I need')
      
      message = isPt
        ? `Olá! Vim pelo assistente do site.\n\nInteresse: ${interestLabel}\n\nDescrição:\n${userData.description}\n\nEmpresa: ${company}\nNome: ${name}`
        : isEs
        ? `¡Hola! Vine por el asistente del sitio.\n\nInterés: ${interestLabel}\n\nDescripción:\n${userData.description}\n\nEmpresa: ${company}\nNombre: ${name}`
        : `Hello! I came through the site assistant.\n\nInterest: ${interestLabel}\n\nDescription:\n${userData.description}\n\nCompany: ${company}\nName: ${name}`
    } else {
      message = isPt
        ? `Olá! Vim pelo assistente do site.\n\nServiço: ${serviceLabel}\nEmpresa: ${company}\nNome: ${name}\n\nGostaria de saber mais sobre as soluções.`
        : isEs
        ? `¡Hola! Vine por el asistente del sitio.\n\nServicio: ${serviceLabel}\nEmpresa: ${company}\nNombre: ${name}\n\nMe gustaría saber más sobre las soluciones.`
        : `Hello! I came through the site assistant.\n\nService: ${serviceLabel}\nCompany: ${company}\nName: ${name}\n\nI would like to know more about the solutions.`
    }

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
      
      setUserData(prev => ({ ...prev, service: value, serviceRaw: option?.label || value }))
      
      // Casos que precisam de descrição
      if (value === 'hasProject') {
        setCurrentStep('projectDescription')
        await simulateTyping(lang.projectDescription.message)
        return
      }
      
      if (value === 'doubt') {
        setCurrentStep('doubtDescription')
        await simulateTyping(lang.doubtDescription.message)
        return
      }
      
      if (value === 'notSure') {
        setCurrentStep('notSureDescription')
        await simulateTyping(lang.notSureDescription.message)
        return
      }

      if (value === 'budget') {
        setCurrentStep('budgetDescription')
        await simulateTyping(lang.budgetDescription.message)
        return
      }
      
      // Casos normais - vai direto para empresa
      setCurrentStep('company')
      await simulateTyping(lang.company.message)
      return
    }

    if (currentStep === 'result') {
      if (value === 'restart') {
        setMessages([])
        setUserData({ service: '', serviceRaw: '', company: '', name: '', question: '', description: '' })
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

    if (currentStep === 'projectDescription') {
      setUserData(prev => ({ ...prev, description: text }))
      setCurrentStep('company')
      await simulateTyping(lang.company.message)
      return
    }

    if (currentStep === 'doubtDescription') {
      setUserData(prev => ({ ...prev, question: text }))
      setCurrentStep('company')
      await simulateTyping(lang.company.message)
      return
    }

    if (currentStep === 'notSureDescription') {
      setUserData(prev => ({ ...prev, description: text }))
      setCurrentStep('company')
      await simulateTyping(lang.company.message)
      return
    }

    if (currentStep === 'budgetDescription') {
      setUserData(prev => ({ ...prev, description: text }))
      setCurrentStep('company')
      await simulateTyping(lang.company.message)
      return
    }

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
      
      let resultMessage = `${lang.result.message}\n\n`
      
      // Adiciona informações específicas baseado no tipo
      if (userData.service === 'doubt' && userData.question) {
        resultMessage += isPt 
          ? `📋 Interesse: Tenho uma dúvida\n💭 Dúvida: ${userData.question}\n🏢 Empresa: ${userData.company}\n👤 Nome: ${text}`
          : isEs
          ? `📋 Interés: Tengo una duda\n💭 Duda: ${userData.question}\n🏢 Empresa: ${userData.company}\n👤 Nombre: ${text}`
          : `📋 Interest: I have a question\n💭 Question: ${userData.question}\n🏢 Company: ${userData.company}\n👤 Name: ${text}`
      } else if ((userData.service === 'hasProject' || userData.service === 'notSure' || userData.service === 'budget') && userData.description) {
        const interestLabel = userData.service === 'hasProject' 
          ? (isPt ? 'Já tenho um projeto' : isEs ? 'Ya tengo un proyecto' : 'I already have a project')
          : userData.service === 'budget'
          ? (isPt ? 'Quero solicitar um orçamento' : isEs ? 'Quiero solicitar un presupuesto' : 'I want to request a quote')
          : (isPt ? 'Não sei qual solução preciso' : isEs ? 'No sé qué solución necesito' : 'I\'m not sure what solution I need')
        
        resultMessage += isPt
          ? `📋 Interesse: ${interestLabel}\n📝 Descrição: ${userData.description}\n🏢 Empresa: ${userData.company}\n👤 Nome: ${text}`
          : isEs
          ? `📋 Interés: ${interestLabel}\n📝 Descripción: ${userData.description}\n🏢 Empresa: ${userData.company}\n👤 Nombre: ${text}`
          : `📋 Interest: ${interestLabel}\n📝 Description: ${userData.description}\n🏢 Company: ${userData.company}\n👤 Name: ${text}`
      } else {
        resultMessage += isPt
          ? `📋 Serviço: ${serviceLabel}\n🏢 Empresa: ${userData.company}\n👤 Nome: ${text}`
          : isEs
          ? `📋 Servicio: ${serviceLabel}\n🏢 Empresa: ${userData.company}\n👤 Nombre: ${text}`
          : `📋 Service: ${serviceLabel}\n🏢 Company: ${userData.company}\n👤 Name: ${text}`
      }
      
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

            {/* ===== INPUT - SÓ APARECE NOS PASSOS QUE PRECISAM DE TEXTO ===== */}
            {(currentStep === 'company' || 
              currentStep === 'name' || 
              currentStep === 'projectDescription' || 
              currentStep === 'doubtDescription' || 
              currentStep === 'notSureDescription' ||
              currentStep === 'budgetDescription') && (
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
                      : currentStep === 'name'
                      ? lang.name.placeholder
                      : currentStep === 'projectDescription'
                      ? lang.projectDescription.placeholder
                      : currentStep === 'doubtDescription'
                      ? lang.doubtDescription.placeholder
                      : currentStep === 'notSureDescription'
                      ? lang.notSureDescription.placeholder
                      : lang.budgetDescription.placeholder
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