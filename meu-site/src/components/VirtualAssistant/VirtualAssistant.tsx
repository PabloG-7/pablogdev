import { useState, useRef, useEffect } from 'react'
import './VirtualAssistant.css'
import { 
  FaWhatsapp, 
  FaTimes, 
  FaRedo, 
  FaPaperPlane, 
  FaGlobe, 
  FaCogs, 
  FaLightbulb, 
  FaTools, 
  FaCommentDots 
} from 'react-icons/fa'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================================
// 📋 TIPOS
// ============================================================

type Step = 'greeting' | 'request' | 'name' | 'done'

interface Message {
  id: number
  type: 'assistant' | 'user'
  text: string
  options?: Option[]
}

interface Option {
  id: string
  label: string
  icon?: React.ReactNode
}

interface ClientData {
  type: string
  request: string
  name: string
}

// ============================================================
// 📋 DADOS INICIAIS
// ============================================================

const initialClientData: ClientData = {
  type: '',
  request: '',
  name: '',
}

// ============================================================
// 🎯 COMPONENTE PRINCIPAL
// ============================================================

export function VirtualAssistant() {
  const { t, lang } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [clientData, setClientData] = useState<ClientData>(initialClientData)
  const [step, setStep] = useState<Step>('greeting')
  const [inputMode, setInputMode] = useState<'none' | 'text' | 'name'>('none')
  const [isTyping, setIsTyping] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // ============================================================
  // 📜 INICIALIZAR
  // ============================================================

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: 'assistant',
          text: t('assistant_greeting'),
          options: [
            { id: 'site', label: t('assistant_option_site'), icon: <FaGlobe color="#4FC3F7" /> },
            { id: 'system', label: t('assistant_option_system'), icon: <FaCogs color="#81C784" /> },
            { id: 'idea', label: t('assistant_option_idea'), icon: <FaLightbulb color="#FFD54F" /> },
            { id: 'improve', label: t('assistant_option_improve'), icon: <FaTools color="#FF8A65" /> },
          ],
        },
      ])
    }
  }, [t, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ============================================================
  // ⌨️ FECHAR COM ESCAPE
  // ============================================================

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  // ============================================================
  // 📱 BLOQUEIO TOTAL DA PÁGINA - PRESERVANDO ESTILOS ANTERIORES
  // ============================================================

  useEffect(() => {
    if (!isOpen) return

    const scrollY = window.scrollY
    const body = document.body
    const html = document.documentElement

    // Salva estilos anteriores do body
    const previousBodyStyles = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    }

    // Salva estilos anteriores do html
    const previousHtmlStyles = {
      overflow: html.style.overflow,
      height: html.style.height,
    }

    // Aplica trava
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'

    html.style.overflow = 'hidden'
    html.style.height = '100%'

    return () => {
      // Restaura estilos anteriores do body
      body.style.position = previousBodyStyles.position
      body.style.top = previousBodyStyles.top
      body.style.left = previousBodyStyles.left
      body.style.right = previousBodyStyles.right
      body.style.width = previousBodyStyles.width
      body.style.overflow = previousBodyStyles.overflow

      // Restaura estilos anteriores do html
      html.style.overflow = previousHtmlStyles.overflow
      html.style.height = previousHtmlStyles.height

      // Volta para posição salva
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  // ============================================================
  // ⌨️ CONTROLE DE FOCO DO INPUT (com preventScroll)
  // ============================================================

  useEffect(() => {
    if (isOpen && inputMode !== 'none') {
      const timer = setTimeout(() => {
        const input = inputRef.current

        if (!input) return

        try {
          input.focus({ preventScroll: true })
        } catch {
          input.focus()
        }
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isOpen, inputMode])

  // ============================================================
  // 🗣️ ADICIONAR MENSAGEM
  // ============================================================

  const addMessage = (text: string, type: 'assistant' | 'user', options?: Option[]) => {
    setMessages((prev) => [...prev, { id: Date.now(), type, text, options }])
  }

  // ============================================================
  // 🎛️ CLICK EM OPÇÃO
  // ============================================================

  const handleOptionClick = (option: Option) => {
    if (isTyping || isSending) return

    addMessage(option.label, 'user')

    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)

      if (step === 'done') {
        handleFinalOption(option.id)
        return
      }

      handleGreeting(option.id)
    }, 500)
  }

  // ============================================================
  // ✉️ ENVIO DE TEXTO
  // ============================================================

  const handleSend = () => {
    const text = inputValue.trim()
    if (!text || isTyping || isSending) return

    setInputValue('')
    addMessage(text, 'user')

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      
      switch (step) {
        case 'request':
          handleRequest(text)
          break
        case 'name':
          handleName(text)
          break
        default:
          break
      }
    }, 500)
  }

  // ============================================================
  // 🔄 REINICIAR
  // ============================================================

  const handleRestart = () => {
    setClientData(initialClientData)
    setInputValue('')
    setInputMode('none')
    setStep('greeting')
    setIsTyping(false)
    setIsSending(false)

    setMessages([
      {
        id: Date.now(),
        type: 'assistant',
        text: t('assistant_greeting'),
        options: [
          { id: 'site', label: t('assistant_option_site'), icon: <FaGlobe color="#4FC3F7" /> },
          { id: 'system', label: t('assistant_option_system'), icon: <FaCogs color="#81C784" /> },
          { id: 'idea', label: t('assistant_option_idea'), icon: <FaLightbulb color="#FFD54F" /> },
          { id: 'improve', label: t('assistant_option_improve'), icon: <FaTools color="#FF8A65" /> },
        ],
      },
    ])
  }

  // ============================================================
  // 🎯 HANDLERS
  // ============================================================

  // ---------- GREETING ----------
  const handleGreeting = (id: string) => {
    const typeMap: Record<string, string> = {
      site: t('assistant_option_site'),
      system: t('assistant_option_system'),
      idea: t('assistant_option_idea'),
      improve: t('assistant_option_improve'),
    }

    const questionMap: Record<string, string> = {
      site: t('assistant_request_site'),
      system: t('assistant_request_system'),
      idea: t('assistant_request_idea'),
      improve: t('assistant_request_improve'),
    }

    if (!typeMap[id]) {
      addMessage(
        t('assistant_invalid_option'),
        'assistant',
        [
          { id: 'site', label: t('assistant_option_site'), icon: <FaGlobe color="#4FC3F7" /> },
          { id: 'system', label: t('assistant_option_system'), icon: <FaCogs color="#81C784" /> },
          { id: 'idea', label: t('assistant_option_idea'), icon: <FaLightbulb color="#FFD54F" /> },
          { id: 'improve', label: t('assistant_option_improve'), icon: <FaTools color="#FF8A65" /> },
        ]
      )
      return
    }

    setClientData((prev) => ({
      ...prev,
      type: typeMap[id],
    }))

    setStep('request')
    setInputMode('text')

    addMessage(questionMap[id], 'assistant')
  }

  // ---------- REQUEST ----------
  const handleRequest = (text: string) => {
    if (!text.trim()) return

    setClientData((prev) => ({ ...prev, request: text.trim() }))
    setStep('name')
    setInputMode('name')
    addMessage(t('assistant_name_question'), 'assistant')
  }

  // ---------- NAME ----------
  const handleName = (text: string) => {
    if (!text.trim()) {
      addMessage(t('assistant_name_required'), 'assistant')
      return
    }

    const updatedData = {
      ...clientData,
      name: text.trim(),
    }

    setClientData(updatedData)
    setInputMode('none')
    setStep('done')

    addMessage(
      t('assistant_final_message'),
      'assistant',
      [
        { id: 'send', label: t('assistant_send_whatsapp'), icon: <FaWhatsapp color="#25D366" /> },
        { id: 'later', label: t('assistant_later') },
      ]
    )
  }

  // ---------- FINAL OPTIONS ----------
  const handleFinalOption = (id: string) => {
    setMessages((prev) =>
      prev.map((message, index) =>
        index === prev.length - 1
          ? { ...message, options: undefined }
          : message
      )
    )

    if (id === 'send') {
      setIsSending(true)
      addMessage(t('assistant_opening_whatsapp'), 'assistant')

      setTimeout(() => {
        sendToWhatsApp(clientData)
        setIsSending(false)
      }, 500)

      return
    }

    if (id === 'later') {
      addMessage(
        t('assistant_later_response'),
        'assistant'
      )
      return
    }
  }

  // ============================================================
  // 📱 ENVIAR PARA WHATSAPP
  // ============================================================

  const sendToWhatsApp = (data: ClientData) => {
    // ✅ NÚMERO REAL CORRIGIDO
    const PHONE_NUMBER = '5511961111894'

    // Mensagem no idioma selecionado
    const typeLabel = lang === 'pt' ? 'Interesse' : lang === 'es' ? 'Interés' : 'Interest'
    const needLabel = lang === 'pt' ? 'Necessidade' : lang === 'es' ? 'Necesidad' : 'Need'
    const nameLabel = lang === 'pt' ? 'Nome' : lang === 'es' ? 'Nombre' : 'Name'

    const message = `🚀 NOVO CONTATO — PABLOG.DEV

${nameLabel}: ${data.name}

📌 ${typeLabel}: ${data.type}

💬 ${needLabel}:
${data.request}`

    const encoded = encodeURIComponent(message)
    const whatsappLink = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encoded}`

    // ✅ Com proteção noopener,noreferrer
    window.open(whatsappLink, '_blank', 'noopener,noreferrer')
  }

  // ============================================================
  // 🎨 RENDER
  // ============================================================

  return (
    <>
      {isOpen && (
        <div
          id="assistant-chat"
          className="assistant-chat"
          role="dialog"
          aria-modal="true"
          aria-label={t('assistant_dialog_aria')}
        >
          {/* HEADER - NOVO DESIGN PREMIUM */}
          <div className="assistant-header">
            {/* Elementos decorativos do header */}
            <div className="header-bg-glow" />
            <div className="header-gold-line" />
            <div className="header-glow-sphere" />

            {/* Perfil */}
            <div className="assistant-profile">
              <div className="avatar-wrapper">
                <img src="/assistant2.webp" alt={t('assistant_dialog_aria')} />
                <span className="status-badge" />
              </div>
              <div className="profile-info">
                <div className="profile-name">
                  Pablo<span className="highlight">G</span>.Dev
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="assistant-header-actions">
              <button
                type="button"
                className="action-btn"
                onClick={handleRestart}
                aria-label={t('assistant_restart_aria')}
                title={t('assistant_restart_aria')}
                disabled={isTyping || isSending}
              >
                <FaRedo />
              </button>
              <button
                type="button"
                className="action-btn close-btn"
                onClick={() => setIsOpen(false)}
                aria-label={t('assistant_close_aria')}
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* ÁREA DE MENSAGENS COM FUNDO FIXO */}
          <div className="assistant-messages-area">
            {/* Fundo fixo */}
            <div className="assistant-messages-bg" aria-hidden="true" />

            {/* Mensagens roláveis */}
            <div
              className="assistant-messages"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.map((msg) => (
                <div key={msg.id} className="assistant-message-wrapper">
                  <div className={`assistant-message ${msg.type}`}>
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}

                    {msg.options && (
                      <div className="assistant-options">
                        {msg.options.map((option) => (
                          <button
                            type="button"
                            key={option.id}
                            className={`assistant-option ${option.id === 'later' ? 'secondary' : ''}`}
                            onClick={() => handleOptionClick(option)}
                            disabled={isTyping || isSending}
                          >
                            {option.icon && <span className="option-icon">{option.icon}</span>}
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="assistant-message-wrapper">
                  <div className="assistant-message assistant assistant-typing" aria-label={t('assistant_typing_indicator')}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* INPUT CONDICIONAL */}
          {inputMode !== 'none' && (
            <div className="assistant-input">
              <input
                ref={inputRef}
                type="text"
                aria-label={
                  inputMode === 'name'
                    ? t('assistant_name_placeholder')
                    : t('assistant_request_placeholder')
                }
                placeholder={
                  inputMode === 'name'
                    ? t('assistant_name_placeholder')
                    : t('assistant_request_placeholder')
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={isTyping || isSending}
              />
              <button 
                type="button"
                onClick={handleSend} 
                disabled={isTyping || isSending || !inputValue.trim()}
              >
                <FaPaperPlane color="#000C24" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* BOTÃO FLUTUANTE */}
      {!isOpen && (
        <button
          type="button"
          className="assistant-button"
          onClick={() => setIsOpen(true)}
          aria-label={t('assistant_open_aria')}
          aria-expanded={isOpen}
          aria-controls="assistant-chat"
        >
          <img src="/assistant.webp" alt={t('assistant_dialog_aria')} />
          <span className="assistant-notification">
            <FaCommentDots color="#000C24" />
          </span>
        </button>
      )}
    </>
  )
}