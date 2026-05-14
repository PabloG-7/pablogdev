import './ProjectGuide.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Globe,
  HelpCircle,
  MessageCircle,
  Rocket,
  Settings2,
  Sparkles,
  Store,
  Target,
  X,
  Zap,
} from 'lucide-react'
import type { Language } from '../../types'

type ProjectGuideProps = {
  language: Language
}

type BusinessType =
  | 'clinic'
  | 'barber'
  | 'petshop'
  | 'store'
  | 'realestate'
  | 'restaurant'
  | 'services'
  | 'other'
  | ''

type MainNeed =
  | 'website'
  | 'booking'
  | 'system'
  | 'whatsapp'
  | 'notSure'
  | ''

type Urgency = 'calm' | 'soon' | 'urgent' | ''

type Budget = 'starter' | 'professional' | 'complete' | 'notSure' | ''

type Step = 1 | 2 | 3 | 4 | 5

type Option<T extends string> = {
  key: T
  title: string
  description: string
  icon: typeof Globe
}

type MultiOption = {
  key: string
  label: string
}

function ProjectGuide({ language }: ProjectGuideProps) {
  const isPt = language === 'pt'
  const whatsappNumber = '5511961111894'

  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>(1)

  const [businessType, setBusinessType] = useState<BusinessType>('')
  const [mainNeed, setMainNeed] = useState<MainNeed>('')
  const [problems, setProblems] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [urgency, setUrgency] = useState<Urgency>('')
  const [budget, setBudget] = useState<Budget>('')
  const [businessName, setBusinessName] = useState('')
  const [projectIdea, setProjectIdea] = useState('')

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const floatButtonRef = useRef<HTMLButtonElement>(null)

  const businessOptions = useMemo<Array<Option<BusinessType>>>(() => [
    {
      key: 'clinic',
      title: isPt ? 'Clínica ou saúde' : 'Clínica o salud',
      description: isPt ? 'Consultas, agenda, pacientes e atendimento.' : 'Consultas, agenda, pacientes y atención.',
      icon: Building2,
    },
    {
      key: 'barber',
      title: isPt ? 'Barbearia ou estética' : 'Barbería o estética',
      description: isPt ? 'Horários, serviços, profissionais e clientes.' : 'Horarios, servicios, profesionales y clientes.',
      icon: Calendar,
    },
    {
      key: 'petshop',
      title: isPt ? 'Petshop' : 'Petshop',
      description: isPt ? 'Banho, tosa, agendamentos e cadastro de pets.' : 'Baño, peluquería, reservas y registro de mascotas.',
      icon: Store,
    },
    {
      key: 'store',
      title: isPt ? 'Loja ou comércio' : 'Tienda o comercio',
      description: isPt ? 'Produtos, pedidos, catálogo e WhatsApp.' : 'Productos, pedidos, catálogo y WhatsApp.',
      icon: Store,
    },
    {
      key: 'realestate',
      title: isPt ? 'Imóveis ou reservas' : 'Inmuebles o reservas',
      description: isPt ? 'Catálogo, disponibilidade, reservas e confirmação.' : 'Catálogo, disponibilidad, reservas y confirmación.',
      icon: Building2,
    },
    {
      key: 'restaurant',
      title: isPt ? 'Restaurante ou delivery' : 'Restaurante o delivery',
      description: isPt ? 'Cardápio, pedidos, WhatsApp e organização.' : 'Menú, pedidos, WhatsApp y organización.',
      icon: Store,
    },
    {
      key: 'services',
      title: isPt ? 'Prestação de serviços' : 'Servicios profesionales',
      description: isPt ? 'Apresentação profissional, contatos e orçamentos.' : 'Presentación profesional, contactos y presupuestos.',
      icon: Target,
    },
    {
      key: 'other',
      title: isPt ? 'Outro tipo de negócio' : 'Otro tipo de negocio',
      description: isPt ? 'Tenho uma ideia diferente ou personalizada.' : 'Tengo una idea diferente o personalizada.',
      icon: HelpCircle,
    },
  ], [isPt])

  const needOptions = useMemo<Array<Option<MainNeed>>>(() => [
    {
      key: 'website',
      title: isPt ? 'Site profissional' : 'Sitio profesional',
      description: isPt ? 'Quero presença online, confiança e mais contatos.' : 'Quiero presencia online, confianza y más contactos.',
      icon: Globe,
    },
    {
      key: 'booking',
      title: isPt ? 'Agendamento online' : 'Reservas online',
      description: isPt ? 'Quero organizar horários, clientes e confirmações.' : 'Quiero organizar horarios, clientes y confirmaciones.',
      icon: Calendar,
    },
    {
      key: 'system',
      title: isPt ? 'Sistema web' : 'Sistema web',
      description: isPt ? 'Quero controlar processos, dados, clientes ou vendas.' : 'Quiero controlar procesos, datos, clientes o ventas.',
      icon: Settings2,
    },
    {
      key: 'whatsapp',
      title: isPt ? 'WhatsApp e atendimento' : 'WhatsApp y atención',
      description: isPt ? 'Quero facilitar contatos, pedidos e mensagens.' : 'Quiero facilitar contactos, pedidos y mensajes.',
      icon: MessageCircle,
    },
    {
      key: 'notSure',
      title: isPt ? 'Não sei o ideal' : 'No sé qué necesito',
      description: isPt ? 'Quero que o diagnóstico indique o melhor caminho.' : 'Quiero que el diagnóstico indique el mejor camino.',
      icon: Sparkles,
    },
  ], [isPt])

  // Problemas adaptados por necessidade
  const problemOptions = useMemo<MultiOption[]>(() => {
    if (mainNeed === 'website') {
      return [
        { key: 'noWebsite', label: isPt ? 'Meu negócio não tem site profissional' : 'Mi negocio no tiene sitio profesional' },
        { key: 'lowTrust', label: isPt ? 'Quero passar mais confiança para os clientes' : 'Quiero transmitir más confianza a los clientes' },
        { key: 'badImage', label: isPt ? 'Minha presença online parece simples ou amadora' : 'Mi presencia online parece simple o amateur' },
        { key: 'fewContacts', label: isPt ? 'Recebo poucos contatos ou orçamentos' : 'Recibo pocos contactos o presupuestos' },
        { key: 'noGoogle', label: isPt ? 'Não apareço bem no Google' : 'No aparezco bien en Google' },
      ]
    }

    if (mainNeed === 'booking') {
      return [
        { key: 'manualBooking', label: isPt ? 'Agendamentos são manuais e bagunçados' : 'Las reservas son manuales y desorganizadas' },
        { key: 'forgetClients', label: isPt ? 'Clientes esquecem os horários' : 'Los clientes olvidan los horarios' },
        { key: 'lostTime', label: isPt ? 'Perco muito tempo respondendo mensagens' : 'Pierdo mucho tiempo respondiendo mensajes' },
        { key: 'noConfirmation', label: isPt ? 'Não tenho confirmação automática' : 'No tengo confirmación automática' },
        { key: 'scheduleConflict', label: isPt ? 'Tenho conflitos de horário com frequência' : 'Tengo conflictos de horario con frecuencia' },
      ]
    }

    if (mainNeed === 'system') {
      return [
        { key: 'noControl', label: isPt ? 'Falta controle de clientes, pedidos ou dados' : 'Falta control de clientes, pedidos o datos' },
        { key: 'manualProcess', label: isPt ? 'Processos são muito manuais e repetitivos' : 'Los procesos son muy manuales y repetitivos' },
        { key: 'noReports', label: isPt ? 'Não tenho relatórios ou indicadores' : 'No tengo reportes o indicadores' },
        { key: 'scatteredData', label: isPt ? 'Dados espalhados em vários lugares' : 'Datos dispersos en varios lugares' },
        { key: 'noHistory', label: isPt ? 'Falta histórico de ações e registros' : 'Falta historial de acciones y registros' },
      ]
    }

    if (mainNeed === 'whatsapp') {
      return [
        { key: 'lostMessages', label: isPt ? 'Perco mensagens de clientes' : 'Pierdo mensajes de clientes' },
        { key: 'slowResponse', label: isPt ? 'Demoro para responder ou organizar' : 'Tardo en responder u organizar' },
        { key: 'confusingOrders', label: isPt ? 'Pedidos ou solicitações ficam confusos' : 'Pedidos o solicitudes quedan confusos' },
        { key: 'noCatalog', label: isPt ? 'Não tenho catálogo ou cardápio digital' : 'No tengo catálogo o menú digital' },
        { key: 'noDirection', label: isPt ? 'Cliente não sabe para onde enviar a mensagem' : 'El cliente no sabe a dónde enviar el mensaje' },
      ]
    }

    // notSure ou vazio
    return [
      { key: 'notSureProblem', label: isPt ? 'Não sei exatamente qual é o problema' : 'No sé exactamente cuál es el problema' },
      { key: 'needHelp', label: isPt ? 'Preciso de ajuda para identificar o ideal' : 'Necesito ayuda para identificar lo ideal' },
      { key: 'wantGrowth', label: isPt ? 'Quero crescer mas não sei por onde começar' : 'Quiero crecer pero no sé por dónde empezar' },
    ]
  }, [isPt, mainNeed])

  // Recursos adaptados por necessidade (SEM base genérico)
  const featureOptions = useMemo<MultiOption[]>(() => {
    if (mainNeed === 'website') {
      return [
        { key: 'whatsapp', label: isPt ? 'Botão e mensagem automática para WhatsApp' : 'Botón y mensaje automático para WhatsApp' },
        { key: 'responsive', label: isPt ? 'Visual perfeito no celular' : 'Visual perfecto en celular' },
        { key: 'seo', label: isPt ? 'SEO para aparecer melhor no Google' : 'SEO para aparecer mejor en Google' },
        { key: 'pages', label: isPt ? 'Páginas profissionais para apresentar serviços' : 'Páginas profesionales para presentar servicios' },
        { key: 'portfolio', label: isPt ? 'Área de projetos, fotos ou cases' : 'Área de proyectos, fotos o casos' },
        { key: 'lead', label: isPt ? 'Formulário ou captação de leads' : 'Formulario o captación de leads' },
      ]
    }

    if (mainNeed === 'booking') {
      return [
        { key: 'calendar', label: isPt ? 'Calendário de horários disponíveis' : 'Calendario de horarios disponibles' },
        { key: 'services', label: isPt ? 'Serviços, preços e profissionais' : 'Servicios, precios y profesionales' },
        { key: 'professionals', label: isPt ? 'Gestão de profissionais e agendas' : 'Gestión de profesionales y agendas' },
        { key: 'confirmation', label: isPt ? 'Confirmação automática por WhatsApp' : 'Confirmación automática por WhatsApp' },
        { key: 'admin', label: isPt ? 'Painel para gerenciar agendamentos' : 'Panel para gestionar reservas' },
        { key: 'responsive', label: isPt ? 'Funcionamento perfeito no celular' : 'Funcionamiento perfecto en celular' },
      ]
    }

    if (mainNeed === 'system') {
      return [
        { key: 'dashboard', label: isPt ? 'Dashboard administrativo' : 'Dashboard administrativo' },
        { key: 'clients', label: isPt ? 'Cadastro de clientes' : 'Registro de clientes' },
        { key: 'reports', label: isPt ? 'Relatórios e indicadores' : 'Reportes e indicadores' },
        { key: 'permissions', label: isPt ? 'Login e permissões de acesso' : 'Login y permisos de acceso' },
        { key: 'processControl', label: isPt ? 'Controle de processos internos' : 'Control de procesos internos' },
        { key: 'history', label: isPt ? 'Histórico de ações e registros' : 'Historial de acciones y registros' },
        { key: 'responsiveAdmin', label: isPt ? 'Painel adaptado para celular e computador' : 'Panel adaptado para celular y computadora' },
      ]
    }

    if (mainNeed === 'whatsapp') {
      return [
        { key: 'messageFlow', label: isPt ? 'Mensagens prontas e botões inteligentes' : 'Mensajes listos y botones inteligentes' },
        { key: 'catalog', label: isPt ? 'Catálogo simples integrado ao WhatsApp' : 'Catálogo simple integrado a WhatsApp' },
        { key: 'contactRoute', label: isPt ? 'Direcionamento inteligente de atendimento' : 'Direccionamiento inteligente de atención' },
        { key: 'supportPage', label: isPt ? 'Página simples de apoio e informações' : 'Página simple de apoyo e informaciones' },
        { key: 'quickReply', label: isPt ? 'Respostas rápidas para perguntas comuns' : 'Respuestas rápidas para preguntas comunes' },
      ]
    }

    // notSure
    return [
      { key: 'diagnosis', label: isPt ? 'Diagnóstico completo do meu negócio' : 'Diagnóstico completo de mi negocio' },
      { key: 'plan', label: isPt ? 'Plano dividido por prioridades' : 'Plan dividido por prioridades' },
      { key: 'future', label: isPt ? 'Projeto preparado para evoluir depois' : 'Proyecto preparado para evolucionar después' },
      { key: 'mentoring', label: isPt ? 'Acompanhamento para definir o melhor caminho' : 'Acompañamiento para definir el mejor camino' },
    ]
  }, [isPt, mainNeed])

  const urgencyOptions = useMemo<Array<Option<Urgency>>>(() => [
    {
      key: 'calm',
      title: isPt ? 'Sem pressa' : 'Sin prisa',
      description: isPt ? 'Quero planejar com calma.' : 'Quiero planear con calma.',
      icon: ClipboardList,
    },
    {
      key: 'soon',
      title: isPt ? 'Quero começar em breve' : 'Quiero empezar pronto',
      description: isPt ? 'Já tenho uma ideia e quero tirar do papel.' : 'Ya tengo una idea y quiero llevarla a la práctica.',
      icon: Rocket,
    },
    {
      key: 'urgent',
      title: isPt ? 'Preciso rápido' : 'Lo necesito rápido',
      description: isPt ? 'Tenho urgência para colocar online ou organizar.' : 'Tengo urgencia para ponerlo online u organizar.',
      icon: Zap,
    },
  ], [isPt])

  const budgetOptions = useMemo<Array<Option<Budget>>>(() => [
    {
      key: 'starter',
      title: isPt ? 'Começar simples' : 'Empezar simple',
      description: isPt ? 'Quero uma primeira versão bem feita.' : 'Quiero una primera versión bien hecha.',
      icon: Rocket,
    },
    {
      key: 'professional',
      title: isPt ? 'Projeto profissional' : 'Proyecto profesional',
      description: isPt ? 'Quero algo completo, bonito e funcional.' : 'Quiero algo completo, bonito y funcional.',
      icon: Sparkles,
    },
    {
      key: 'complete',
      title: isPt ? 'Solução completa' : 'Solución completa',
      description: isPt
        ? 'Quero uma solução mais completa, com site, painel ou integrações conforme a necessidade.'
        : 'Quiero una solución más completa, con sitio, panel o integraciones según la necesidad.',
      icon: Settings2,
    },
    {
      key: 'notSure',
      title: isPt ? 'Ainda não sei' : 'Todavía no sé',
      description: isPt ? 'Quero entender o melhor investimento.' : 'Quiero entender la mejor inversión.',
      icon: HelpCircle,
    },
  ], [isPt])

  const selectedBusiness = businessOptions.find((item) => item.key === businessType)
  const selectedNeed = needOptions.find((item) => item.key === mainNeed)
  const selectedUrgency = urgencyOptions.find((item) => item.key === urgency)
  const selectedBudget = budgetOptions.find((item) => item.key === budget)

  const progress = `${Math.round((step / 5) * 100)}%`

  // Recomendação priorizando mainNeed
  const recommendedPlan = useMemo(() => {
    const items: string[] = []

    // Prioridade 1: baseado na necessidade principal
    if (mainNeed === 'website') {
      items.push(isPt ? 'Site profissional com visual premium' : 'Sitio profesional con visual premium')
      items.push(isPt ? 'SEO para aparecer melhor no Google' : 'SEO para aparecer mejor en Google')
      items.push(isPt ? 'Integração com WhatsApp para contato rápido' : 'Integración con WhatsApp para contacto rápido')
    }

    if (mainNeed === 'booking') {
      items.push(isPt ? 'Sistema de agendamento online' : 'Sistema de reservas online')
      items.push(isPt ? 'Calendário inteligente com horários disponíveis' : 'Calendario inteligente con horarios disponibles')
      items.push(isPt ? 'Confirmação automática por WhatsApp' : 'Confirmación automática por WhatsApp')
    }

    if (mainNeed === 'system') {
      items.push(isPt ? 'Painel administrativo para gestão completa' : 'Panel administrativo para gestión completa')
      items.push(isPt ? 'Cadastro e organização de clientes e dados' : 'Registro y organización de clientes y datos')
      items.push(isPt ? 'Relatórios e indicadores personalizados' : 'Reportes e indicadores personalizados')
    }

    if (mainNeed === 'whatsapp') {
      items.push(isPt ? 'Atendimento otimizado com WhatsApp' : 'Atención optimizada con WhatsApp')
      items.push(isPt ? 'Mensagens prontas e botões inteligentes' : 'Mensajes listos y botones inteligentes')
      items.push(isPt ? 'Direcionamento automático de atendimento' : 'Direccionamiento automático de atención')
    }

    if (mainNeed === 'notSure' || items.length === 0) {
      items.push(isPt ? 'Diagnóstico inicial completo do negócio' : 'Diagnóstico inicial completo del negocio')
      items.push(isPt ? 'Plano personalizado por etapas e prioridades' : 'Plan personalizado por etapas y prioridades')
      items.push(isPt ? 'Recomendação do melhor caminho digital' : 'Recomendación del mejor camino digital')
    }

    // Prioridade 2: extras baseados em problemas/recursos marcados
    const has = (key: string) => problems.includes(key) || features.includes(key)

    if (mainNeed !== 'website' && (has('noWebsite') || has('lowTrust') || has('badImage'))) {
      items.push(isPt ? 'Site institucional como apoio' : 'Sitio institucional como apoyo')
    }

    if (mainNeed !== 'booking' && has('manualBooking')) {
      items.push(isPt ? 'Funcionalidade de agendamento como complemento' : 'Funcionalidad de reservas como complemento')
    }

    if (mainNeed !== 'system' && (has('noControl') || has('manualProcess') || has('noReports'))) {
      items.push(isPt ? 'Painel de controle simplificado' : 'Panel de control simplificado')
    }

    if (mainNeed !== 'whatsapp' && (has('lostMessages') || has('slowResponse'))) {
      items.push(isPt ? 'Integração com WhatsApp para agilizar atendimento' : 'Integración con WhatsApp para agilizar atención')
    }

    return Array.from(new Set(items))
  }, [features, isPt, mainNeed, problems])

  // Prioridade mais específica
  const priorityText = useMemo(() => {
    if (mainNeed === 'website') {
      return isPt
        ? 'Prioridade: criar presença profissional, gerar confiança e aumentar contatos.'
        : 'Prioridad: crear presencia profesional, generar confianza y aumentar contactos.'
    }

    if (mainNeed === 'booking') {
      return isPt
        ? 'Prioridade: organizar horários, automatizar confirmações e reduzir faltas.'
        : 'Prioridad: organizar horarios, automatizar confirmaciones y reducir ausencias.'
    }

    if (mainNeed === 'system') {
      return isPt
        ? 'Prioridade: centralizar dados, organizar processos e gerar relatórios claros.'
        : 'Prioridad: centralizar datos, organizar procesos y generar reportes claros.'
    }

    if (mainNeed === 'whatsapp') {
      return isPt
        ? 'Prioridade: agilizar atendimento, organizar mensagens e reduzir perda de clientes.'
        : 'Prioridad: agilizar atención, organizar mensajes y reducir pérdida de clientes.'
    }

    return isPt
      ? 'Prioridade: fazer um diagnóstico completo e definir o melhor plano digital.'
      : 'Prioridad: hacer un diagnóstico completo y definir el mejor plan digital.'
  }, [isPt, mainNeed])

  const projectName = useMemo(() => {
    const name = businessName.trim()

    if (name) {
      return isPt
        ? `Plano digital para ${name}`
        : `Plan digital para ${name}`
    }

    return isPt
      ? `Plano digital para ${selectedBusiness?.title || 'seu negócio'}`
      : `Plan digital para ${selectedBusiness?.title || 'tu negocio'}`
  }, [businessName, isPt, selectedBusiness])

  const canGoNext = useMemo(() => {
    if (step === 1) return Boolean(businessType)
    if (step === 2) return Boolean(mainNeed)
    if (step === 3) return problems.length > 0
    if (step === 4) return features.length > 0
    if (step === 5) return Boolean(urgency && budget)
    return false
  }, [budget, businessType, features.length, mainNeed, problems.length, step, urgency])

  function resetGuide() {
    setStep(1)
    setBusinessType('')
    setMainNeed('')
    setProblems([])
    setFeatures([])
    setUrgency('')
    setBudget('')
    setBusinessName('')
    setProjectIdea('')
  }

  function closeGuide() {
    setOpen(false)
    resetGuide()
    setTimeout(() => floatButtonRef.current?.focus(), 100)
  }

  function goNext() {
    if (!canGoNext) return
    if (step < 5) setStep((current) => (current + 1) as Step)
  }

  function goBack() {
    if (step > 1) setStep((current) => (current - 1) as Step)
  }

  function toggleList(value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) {
    setter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    )
  }

  function openWhatsApp() {
    if (!selectedBusiness || !selectedNeed || !selectedUrgency || !selectedBudget) return

    const problemLabels = problems.length > 0
      ? problems
          .map((key) => problemOptions.find((item) => item.key === key)?.label)
          .filter(Boolean)
          .map((label) => `• ${label}`)
          .join('\n')
      : (isPt ? 'Não especificado' : 'No especificado')

    const featureLabels = features.length > 0
      ? features
          .map((key) => featureOptions.find((item) => item.key === key)?.label)
          .filter(Boolean)
          .map((label) => `• ${label}`)
          .join('\n')
      : (isPt ? 'Não especificado' : 'No especificado')

    const planItems = recommendedPlan.map((item) => `• ${item}`).join('\n')

    const message = isPt
      ? [
          '🤖 *Olá Pablo! Fiz o diagnóstico inteligente no site da PabloG.Dev.*',
          '',
          `🏢 *Tipo de negócio:* ${selectedBusiness.title}`,
          `📝 *Nome do negócio:* ${businessName.trim() || 'Não informado'}`,
          `💡 *Ideia do cliente:* ${projectIdea.trim() || 'Não informou detalhes extras'}`,
          '',
          `🎯 *Principal necessidade:* ${selectedNeed.title}`,
          '',
          `⚠️ *Problemas atuais:*`,
          problemLabels,
          '',
          `✨ *Recursos desejados:*`,
          featureLabels,
          '',
          `⏰ *Urgência:* ${selectedUrgency.title}`,
          `📦 *Estilo de projeto:* ${selectedBudget.title}`,
          '',
          `📋 *Plano:* ${projectName}`,
          '',
          '🧠 *Recomendação gerada:*',
          planItems,
          '',
          `🔑 *${priorityText}*`,
          '',
          '💬 Quero entender como podemos fazer esse projeto.'
        ].join('\n')
      : [
          '🤖 *¡Hola Pablo! Hice el diagnóstico inteligente en el sitio de PabloG.Dev.*',
          '',
          `🏢 *Tipo de negocio:* ${selectedBusiness.title}`,
          `📝 *Nombre del negocio:* ${businessName.trim() || 'No informado'}`,
          `💡 *Idea del cliente:* ${projectIdea.trim() || 'No informó detalles extras'}`,
          '',
          `🎯 *Necesidad principal:* ${selectedNeed.title}`,
          '',
          `⚠️ *Problemas actuales:*`,
          problemLabels,
          '',
          `✨ *Recursos deseados:*`,
          featureLabels,
          '',
          `⏰ *Urgencia:* ${selectedUrgency.title}`,
          `📦 *Estilo de proyecto:* ${selectedBudget.title}`,
          '',
          `📋 *Plan:* ${projectName}`,
          '',
          '🧠 *Recomendación generada:*',
          planItems,
          '',
          `🔑 *${priorityText}*`,
          '',
          '💬 Quiero entender cómo podemos hacer este proyecto.'
        ].join('\n')

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )

    closeGuide()
  }

  useEffect(() => {
    if (!open) return

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    setTimeout(() => closeButtonRef.current?.focus(), 100)

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeGuide()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <>
      {!open && (
        <button
          ref={floatButtonRef}
          type="button"
          className="project-guide-float"
          onClick={() => setOpen(true)}
          aria-label={isPt ? 'Abrir diagnóstico inteligente' : 'Abrir diagnóstico inteligente'}
        >
          <img
            src="/dog-assistant.png"
            alt={isPt ? 'Assistente PabloG' : 'Asistente PabloG'}
            className="project-guide__float-image"
          />
        </button>
      )}

      {open && (
        <div
          className="project-guide"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-guide-title"
        >
          <button
            type="button"
            className="project-guide__overlay"
            onClick={closeGuide}
            aria-label={isPt ? 'Fechar assistente' : 'Cerrar asistente'}
          />

          <div className="project-guide__modal project-guide__modal--smart">
            <button
              ref={closeButtonRef}
              type="button"
              className="project-guide__close"
              onClick={closeGuide}
              aria-label={isPt ? 'Fechar assistente' : 'Cerrar asistente'}
            >
              <X size={18} />
            </button>

            <div className="project-guide__header">
              <div className="project-guide__assistant-icon">
                <img
                  src="/dog-assistant.png"
                  alt={isPt ? 'Assistente PabloG' : 'Asistente PabloG'}
                  className="project-guide__assistant-image"
                />
              </div>

              <div>
                <span className="project-guide__badge">
                  {isPt ? 'PabloG Assist' : 'PabloG Assist'}
                </span>

                <h2 id="project-guide-title" className="project-guide__title">
                  {isPt
                    ? 'Diagnóstico inteligente do seu projeto'
                    : 'Diagnóstico inteligente de tu proyecto'}
                </h2>
              </div>
            </div>

            <div className="project-guide__progress" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={5} aria-label={isPt ? `Etapa ${step} de 5` : `Paso ${step} de 5`}>
              <span style={{ width: progress }} />
            </div>

            <p className="project-guide__helper">
              {isPt
                ? 'Responda algumas perguntas e receba uma recomendação personalizada para site, agendamento ou sistema.'
                : 'Responde algunas preguntas y recibe una recomendación personalizada para sitio, reservas o sistema.'}
            </p>

            {step === 1 && (
              <div className="project-guide__step">
                <h3 className="project-guide__question">
                  {isPt ? 'Qual é o tipo do seu negócio?' : '¿Cuál es el tipo de tu negocio?'}
                </h3>

                <div className="project-guide__options project-guide__options--grid">
                  {businessOptions.map((item) => {
                    const Icon = item.icon

                    return (
                      <button
                        key={item.key}
                        type="button"
                        className={`project-guide__option ${businessType === item.key ? 'is-selected' : ''}`}
                        onClick={() => setBusinessType(item.key)}
                      >
                        <Icon size={20} />
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.description}</small>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="project-guide__step">
                <h3 className="project-guide__question">
                  {isPt ? 'O que você mais precisa agora?' : '¿Qué necesitas más ahora?'}
                </h3>

                <div className="project-guide__options">
                  {needOptions.map((item) => {
                    const Icon = item.icon

                    return (
                      <button
                        key={item.key}
                        type="button"
                        className={`project-guide__option ${mainNeed === item.key ? 'is-selected' : ''}`}
                        onClick={() => {
                          setMainNeed(item.key)
                          setProblems([])
                          setFeatures([])
                        }}
                      >
                        <Icon size={20} />
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.description}</small>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="project-guide__step">
                <h3 className="project-guide__question">
                  {isPt ? 'Quais problemas você quer resolver?' : '¿Qué problemas quieres resolver?'}
                </h3>

                <p className="project-guide__helper">
                  {isPt ? 'Pode escolher mais de uma opção.' : 'Puedes elegir más de una opción.'}
                </p>

                <div className="project-guide__chips" role="group" aria-label={isPt ? 'Lista de problemas' : 'Lista de problemas'}>
                  {problemOptions.map((item) => {
                    const isSelected = problems.includes(item.key)

                    return (
                      <button
                        key={item.key}
                        type="button"
                        role="checkbox"
                        aria-checked={isSelected}
                        className={isSelected ? 'is-selected' : ''}
                        onClick={() => toggleList(item.key, setProblems)}
                      >
                        {isSelected && <CheckCircle2 size={14} />}
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="project-guide__step">
                <h3 className="project-guide__question">
                  {isPt ? 'Quais recursos seriam importantes?' : '¿Qué recursos serían importantes?'}
                </h3>

                <p className="project-guide__helper">
                  {isPt
                    ? 'A assistente adapta as opções conforme sua necessidade.'
                    : 'La asistente adapta las opciones según tu necesidad.'}
                </p>

                <div className="project-guide__chips" role="group" aria-label={isPt ? 'Lista de recursos' : 'Lista de recursos'}>
                  {featureOptions.map((item) => {
                    const isSelected = features.includes(item.key)

                    return (
                      <button
                        key={item.key}
                        type="button"
                        role="checkbox"
                        aria-checked={isSelected}
                        className={isSelected ? 'is-selected' : ''}
                        onClick={() => toggleList(item.key, setFeatures)}
                      >
                        {isSelected && <CheckCircle2 size={14} />}
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="project-guide__step">
                <h3 className="project-guide__question">
                  {isPt ? 'Pra fechar o diagnóstico:' : 'Para cerrar el diagnóstico:'}
                </h3>

                <p className="project-guide__mini-title">
                  {isPt ? 'Qual sua urgência?' : '¿Cuál es tu urgencia?'}
                </p>

                <div className="project-guide__options">
                  {urgencyOptions.map((item) => {
                    const Icon = item.icon

                    return (
                      <button
                        key={item.key}
                        type="button"
                        className={`project-guide__option ${urgency === item.key ? 'is-selected' : ''}`}
                        onClick={() => setUrgency(item.key)}
                      >
                        <Icon size={20} />
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.description}</small>
                        </span>
                      </button>
                    )
                  })}
                </div>

                <p className="project-guide__mini-title">
                  {isPt ? 'Qual estilo de projeto você imagina?' : '¿Qué estilo de proyecto imaginas?'}
                </p>

                <div className="project-guide__options">
                  {budgetOptions.map((item) => {
                    const Icon = item.icon

                    return (
                      <button
                        key={item.key}
                        type="button"
                        className={`project-guide__option ${budget === item.key ? 'is-selected' : ''}`}
                        onClick={() => setBudget(item.key)}
                      >
                        <Icon size={20} />
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.description}</small>
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="project-guide__custom">
                  <label htmlFor="guide-business-name">
                    {isPt ? 'Nome do negócio' : 'Nombre del negocio'}
                  </label>

                  <input
                    id="guide-business-name"
                    value={businessName}
                    onChange={(event) => setBusinessName(event.target.value)}
                    placeholder={isPt ? 'Ex: Clínica Bella Saúde' : 'Ej: Clínica Bella Salud'}
                    maxLength={80}
                  />

                  <label htmlFor="guide-project-idea">
                    {isPt ? 'Conte rapidamente sua ideia' : 'Cuéntame rápidamente tu idea'}
                  </label>

                  <textarea
                    id="guide-project-idea"
                    value={projectIdea}
                    onChange={(event) => setProjectIdea(event.target.value)}
                    placeholder={
                      isPt
                        ? 'Ex: Quero um site com agendamento para clientes marcarem pelo celular...'
                        : 'Ej: Quiero un sitio con reservas para que mis clientes agenden por celular...'
                    }
                    maxLength={500}
                  />
                </div>

                {urgency && budget && (
                  <div className="project-guide__result" role="region" aria-label={isPt ? 'Recomendação gerada' : 'Recomendación generada'}>
                    <span>
                      <Sparkles size={16} />
                      {isPt ? 'Recomendação gerada' : 'Recomendación generada'}
                    </span>

                    <strong>{projectName}</strong>
                    
                    <p className="project-guide__result-priority">{priorityText}</p>

                    <ul>
                      {recommendedPlan.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="project-guide__footer">
              {step > 1 && (
                <button
                  type="button"
                  className="project-guide__back"
                  onClick={goBack}
                >
                  <ArrowLeft size={15} />
                  {isPt ? 'Voltar' : 'Volver'}
                </button>
              )}

              {step < 5 ? (
                <button
                  type="button"
                  className="project-guide__submit"
                  disabled={!canGoNext}
                  onClick={goNext}
                >
                  <span>{isPt ? 'Continuar' : 'Continuar'}</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  className="project-guide__submit"
                  disabled={!canGoNext}
                  onClick={openWhatsApp}
                >
                  <span>{isPt ? 'Enviar diagnóstico no WhatsApp' : 'Enviar diagnóstico por WhatsApp'}</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectGuide