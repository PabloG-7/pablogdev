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
  open: boolean
  onClose: () => void
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

function ProjectGuide({ language, open, onClose }: ProjectGuideProps) {
  const isPt = language === 'pt'
  const isEs = language === 'es'
  const isEn = language === 'en'
  
  const whatsappNumber = '5511961111894'

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

  const t = {
    pt: {
      businessOptions: [
        { key: 'clinic', title: 'Clínica ou saúde', description: 'Consultas, agenda, pacientes e atendimento.' },
        { key: 'barber', title: 'Barbearia ou estética', description: 'Horários, serviços, profissionais e clientes.' },
        { key: 'petshop', title: 'Petshop', description: 'Banho, tosa, agendamentos e cadastro de pets.' },
        { key: 'store', title: 'Loja ou comércio', description: 'Produtos, pedidos, catálogo e WhatsApp.' },
        { key: 'realestate', title: 'Imóveis ou reservas', description: 'Catálogo, disponibilidade, reservas e confirmação.' },
        { key: 'restaurant', title: 'Restaurante ou delivery', description: 'Cardápio, pedidos, WhatsApp e organização.' },
        { key: 'services', title: 'Prestação de serviços', description: 'Apresentação profissional, contatos e orçamentos.' },
        { key: 'other', title: 'Outro tipo de negócio', description: 'Tenho uma ideia diferente ou personalizada.' },
      ],
      needOptions: [
        { key: 'website', title: 'Site profissional', description: 'Quero presença online, confiança e mais contatos.' },
        { key: 'booking', title: 'Agendamento online', description: 'Quero organizar horários, clientes e confirmações.' },
        { key: 'system', title: 'Sistema web', description: 'Quero controlar processos, dados, clientes ou vendas.' },
        { key: 'whatsapp', title: 'WhatsApp e atendimento', description: 'Quero facilitar contatos, pedidos e mensagens.' },
        { key: 'notSure', title: 'Não sei o ideal', description: 'Quero que o diagnóstico indique o melhor caminho.' },
      ],
      problemOptions: {
        website: [
          { key: 'noWebsite', label: 'Meu negócio não tem site profissional' },
          { key: 'lowTrust', label: 'Quero passar mais confiança para os clientes' },
          { key: 'badImage', label: 'Minha presença online parece simples ou amadora' },
          { key: 'fewContacts', label: 'Recebo poucos contatos ou orçamentos' },
          { key: 'noGoogle', label: 'Não apareço bem no Google' },
        ],
        booking: [
          { key: 'manualBooking', label: 'Agendamentos são manuais e bagunçados' },
          { key: 'forgetClients', label: 'Clientes esquecem os horários' },
          { key: 'lostTime', label: 'Perco muito tempo respondendo mensagens' },
          { key: 'noConfirmation', label: 'Não tenho confirmação automática' },
          { key: 'scheduleConflict', label: 'Tenho conflitos de horário com frequência' },
        ],
        system: [
          { key: 'noControl', label: 'Falta controle de clientes, pedidos ou dados' },
          { key: 'manualProcess', label: 'Processos são muito manuais e repetitivos' },
          { key: 'noReports', label: 'Não tenho relatórios ou indicadores' },
          { key: 'scatteredData', label: 'Dados espalhados em vários lugares' },
          { key: 'noHistory', label: 'Falta histórico de ações e registros' },
        ],
        whatsapp: [
          { key: 'lostMessages', label: 'Perco mensagens de clientes' },
          { key: 'slowResponse', label: 'Demoro para responder ou organizar' },
          { key: 'confusingOrders', label: 'Pedidos ou solicitações ficam confusos' },
          { key: 'noCatalog', label: 'Não tenho catálogo ou cardápio digital' },
          { key: 'noDirection', label: 'Cliente não sabe para onde enviar a mensagem' },
        ],
        notSure: [
          { key: 'notSureProblem', label: 'Não sei exatamente qual é o problema' },
          { key: 'needHelp', label: 'Preciso de ajuda para identificar o ideal' },
          { key: 'wantGrowth', label: 'Quero crescer mas não sei por onde começar' },
        ],
      },
      featureOptions: {
        website: [
          { key: 'whatsapp', label: 'Botão e mensagem automática para WhatsApp' },
          { key: 'responsive', label: 'Visual perfeito no celular' },
          { key: 'seo', label: 'SEO para aparecer melhor no Google' },
          { key: 'pages', label: 'Páginas profissionais para apresentar serviços' },
          { key: 'portfolio', label: 'Área de projetos, fotos ou cases' },
          { key: 'lead', label: 'Formulário ou captação de leads' },
        ],
        booking: [
          { key: 'calendar', label: 'Calendário de horários disponíveis' },
          { key: 'services', label: 'Serviços, preços e profissionais' },
          { key: 'professionals', label: 'Gestão de profissionais e agendas' },
          { key: 'confirmation', label: 'Confirmação automática por WhatsApp' },
          { key: 'admin', label: 'Painel para gerenciar agendamentos' },
          { key: 'responsive', label: 'Funcionamento perfeito no celular' },
        ],
        system: [
          { key: 'dashboard', label: 'Dashboard administrativo' },
          { key: 'clients', label: 'Cadastro de clientes' },
          { key: 'reports', label: 'Relatórios e indicadores' },
          { key: 'permissions', label: 'Login e permissões de acesso' },
          { key: 'processControl', label: 'Controle de processos internos' },
          { key: 'history', label: 'Histórico de ações e registros' },
          { key: 'responsiveAdmin', label: 'Painel adaptado para celular e computador' },
        ],
        whatsapp: [
          { key: 'messageFlow', label: 'Mensagens prontas e botões inteligentes' },
          { key: 'catalog', label: 'Catálogo simples integrado ao WhatsApp' },
          { key: 'contactRoute', label: 'Direcionamento inteligente de atendimento' },
          { key: 'supportPage', label: 'Página simples de apoio e informações' },
          { key: 'quickReply', label: 'Respostas rápidas para perguntas comuns' },
        ],
        notSure: [
          { key: 'diagnosis', label: 'Diagnóstico completo do meu negócio' },
          { key: 'plan', label: 'Plano dividido por prioridades' },
          { key: 'future', label: 'Projeto preparado para evoluir depois' },
          { key: 'mentoring', label: 'Acompanhamento para definir o melhor caminho' },
        ],
      },
      urgencyOptions: [
        { key: 'calm', title: 'Sem pressa', description: 'Quero planejar com calma.' },
        { key: 'soon', title: 'Quero começar em breve', description: 'Já tenho uma ideia e quero tirar do papel.' },
        { key: 'urgent', title: 'Preciso rápido', description: 'Tenho urgência para colocar online ou organizar.' },
      ],
      budgetOptions: [
        { key: 'starter', title: 'Começar simples', description: 'Quero uma primeira versão bem feita.' },
        { key: 'professional', title: 'Projeto profissional', description: 'Quero algo completo, bonito e funcional.' },
        { key: 'complete', title: 'Solução completa', description: 'Quero uma solução mais completa, com site, painel ou integrações conforme a necessidade.' },
        { key: 'notSure', title: 'Ainda não sei', description: 'Quero entender o melhor investimento.' },
      ],
      labels: {
        badge: 'PabloG Assist',
        title: 'Diagnóstico inteligente do seu projeto',
        helper: 'Responda algumas perguntas e receba uma recomendação personalizada para site, agendamento ou sistema.',
        step1: 'Qual é o tipo do seu negócio?',
        step2: 'O que você mais precisa agora?',
        step3: 'Quais problemas você quer resolver?',
        step3Helper: 'Pode escolher mais de uma opção.',
        step4: 'Quais recursos seriam importantes?',
        step4Helper: 'A assistente adapta as opções conforme sua necessidade.',
        step5: 'Pra fechar o diagnóstico:',
        urgency: 'Qual sua urgência?',
        budget: 'Qual estilo de projeto você imagina?',
        businessName: 'Nome do negócio',
        businessNamePlaceholder: 'Ex: Clínica Bella Saúde',
        projectIdea: 'Conte rapidamente sua ideia',
        projectIdeaPlaceholder: 'Ex: Quero um site com agendamento para clientes marcarem pelo celular...',
        result: 'Recomendação gerada',
        back: 'Voltar',
        next: 'Continuar',
        submit: 'Enviar diagnóstico no WhatsApp',
        close: 'Fechar assistente',
        progress: 'Etapa',
        of: 'de',
        priorityWebsite: 'Prioridade: criar presença profissional, gerar confiança e aumentar contatos.',
        priorityBooking: 'Prioridade: organizar horários, automatizar confirmações e reduzir faltas.',
        prioritySystem: 'Prioridade: centralizar dados, organizar processos e gerar relatórios claros.',
        priorityWhatsapp: 'Prioridade: agilizar atendimento, organizar mensagens e reduzir perda de clientes.',
        priorityNotSure: 'Prioridade: fazer um diagnóstico completo e definir o melhor plano digital.',
        planPrefix: 'Plano digital para',
        yourBusiness: 'seu negócio',
        tuBusiness: 'tu negocio',
        notSpecified: 'Não especificado',
        noSpecified: 'No especificado',
        hello: 'Olá Pablo! Fiz o diagnóstico inteligente no site da PabloG.Dev.',
        businessType: 'Tipo de negócio',
        businessNameLabel: 'Nome do negócio',
        notInformed: 'Não informado',
        clientIdea: 'Ideia do cliente',
        noExtraDetails: 'Não informou detalhes extras',
        mainNeed: 'Principal necessidade',
        currentProblems: 'Problemas atuais',
        desiredFeatures: 'Recursos desejados',
        urgencyLabel: 'Urgência',
        projectStyle: 'Estilo de projeto',
        plan: 'Plano',
        recommendation: 'Recomendação gerada',
        wantToKnow: 'Quero entender como podemos fazer esse projeto.',
      }
    },
    es: {
      businessOptions: [
        { key: 'clinic', title: 'Clínica o salud', description: 'Consultas, agenda, pacientes y atención.' },
        { key: 'barber', title: 'Barbería o estética', description: 'Horarios, servicios, profesionales y clientes.' },
        { key: 'petshop', title: 'Petshop', description: 'Baño, peluquería, reservas y registro de mascotas.' },
        { key: 'store', title: 'Tienda o comercio', description: 'Productos, pedidos, catálogo y WhatsApp.' },
        { key: 'realestate', title: 'Inmuebles o reservas', description: 'Catálogo, disponibilidad, reservas y confirmación.' },
        { key: 'restaurant', title: 'Restaurante o delivery', description: 'Menú, pedidos, WhatsApp y organización.' },
        { key: 'services', title: 'Servicios profesionales', description: 'Presentación profesional, contactos y presupuestos.' },
        { key: 'other', title: 'Otro tipo de negocio', description: 'Tengo una idea diferente o personalizada.' },
      ],
      needOptions: [
        { key: 'website', title: 'Sitio profesional', description: 'Quiero presencia online, confianza y más contactos.' },
        { key: 'booking', title: 'Reservas online', description: 'Quiero organizar horarios, clientes y confirmaciones.' },
        { key: 'system', title: 'Sistema web', description: 'Quiero controlar procesos, datos, clientes o ventas.' },
        { key: 'whatsapp', title: 'WhatsApp y atención', description: 'Quiero facilitar contactos, pedidos y mensajes.' },
        { key: 'notSure', title: 'No sé qué necesito', description: 'Quiero que el diagnóstico indique el mejor camino.' },
      ],
      problemOptions: {
        website: [
          { key: 'noWebsite', label: 'Mi negocio no tiene sitio profesional' },
          { key: 'lowTrust', label: 'Quiero transmitir más confianza a los clientes' },
          { key: 'badImage', label: 'Mi presencia online parece simple o amateur' },
          { key: 'fewContacts', label: 'Recibo pocos contactos o presupuestos' },
          { key: 'noGoogle', label: 'No aparezco bien en Google' },
        ],
        booking: [
          { key: 'manualBooking', label: 'Las reservas son manuales y desorganizadas' },
          { key: 'forgetClients', label: 'Los clientes olvidan los horarios' },
          { key: 'lostTime', label: 'Pierdo mucho tiempo respondiendo mensajes' },
          { key: 'noConfirmation', label: 'No tengo confirmación automática' },
          { key: 'scheduleConflict', label: 'Tengo conflictos de horario con frecuencia' },
        ],
        system: [
          { key: 'noControl', label: 'Falta control de clientes, pedidos o datos' },
          { key: 'manualProcess', label: 'Los procesos son muy manuales y repetitivos' },
          { key: 'noReports', label: 'No tengo reportes o indicadores' },
          { key: 'scatteredData', label: 'Datos dispersos en varios lugares' },
          { key: 'noHistory', label: 'Falta historial de acciones y registros' },
        ],
        whatsapp: [
          { key: 'lostMessages', label: 'Pierdo mensajes de clientes' },
          { key: 'slowResponse', label: 'Tardo en responder u organizar' },
          { key: 'confusingOrders', label: 'Pedidos o solicitudes quedan confusos' },
          { key: 'noCatalog', label: 'No tengo catálogo o menú digital' },
          { key: 'noDirection', label: 'El cliente no sabe a dónde enviar el mensaje' },
        ],
        notSure: [
          { key: 'notSureProblem', label: 'No sé exactamente cuál es el problema' },
          { key: 'needHelp', label: 'Necesito ayuda para identificar lo ideal' },
          { key: 'wantGrowth', label: 'Quiero crecer pero no sé por dónde empezar' },
        ],
      },
      featureOptions: {
        website: [
          { key: 'whatsapp', label: 'Botón y mensaje automático para WhatsApp' },
          { key: 'responsive', label: 'Visual perfecto en celular' },
          { key: 'seo', label: 'SEO para aparecer mejor en Google' },
          { key: 'pages', label: 'Páginas profesionales para presentar servicios' },
          { key: 'portfolio', label: 'Área de proyectos, fotos o casos' },
          { key: 'lead', label: 'Formulario o captación de leads' },
        ],
        booking: [
          { key: 'calendar', label: 'Calendario de horarios disponibles' },
          { key: 'services', label: 'Servicios, precios y profesionales' },
          { key: 'professionals', label: 'Gestión de profesionales y agendas' },
          { key: 'confirmation', label: 'Confirmación automática por WhatsApp' },
          { key: 'admin', label: 'Panel para gestionar reservas' },
          { key: 'responsive', label: 'Funcionamiento perfecto en celular' },
        ],
        system: [
          { key: 'dashboard', label: 'Dashboard administrativo' },
          { key: 'clients', label: 'Registro de clientes' },
          { key: 'reports', label: 'Reportes e indicadores' },
          { key: 'permissions', label: 'Login y permisos de acceso' },
          { key: 'processControl', label: 'Control de procesos internos' },
          { key: 'history', label: 'Historial de acciones y registros' },
          { key: 'responsiveAdmin', label: 'Panel adaptado para celular y computadora' },
        ],
        whatsapp: [
          { key: 'messageFlow', label: 'Mensajes listos y botones inteligentes' },
          { key: 'catalog', label: 'Catálogo simple integrado a WhatsApp' },
          { key: 'contactRoute', label: 'Direccionamiento inteligente de atención' },
          { key: 'supportPage', label: 'Página simple de apoyo e información' },
          { key: 'quickReply', label: 'Respuestas rápidas para preguntas comunes' },
        ],
        notSure: [
          { key: 'diagnosis', label: 'Diagnóstico completo de mi negocio' },
          { key: 'plan', label: 'Plan dividido por prioridades' },
          { key: 'future', label: 'Proyecto preparado para evolucionar después' },
          { key: 'mentoring', label: 'Acompañamiento para definir el mejor camino' },
        ],
      },
      urgencyOptions: [
        { key: 'calm', title: 'Sin prisa', description: 'Quiero planear con calma.' },
        { key: 'soon', title: 'Quiero empezar pronto', description: 'Ya tengo una idea y quiero llevarla a la práctica.' },
        { key: 'urgent', title: 'Lo necesito rápido', description: 'Tengo urgencia para ponerlo online u organizar.' },
      ],
      budgetOptions: [
        { key: 'starter', title: 'Empezar simple', description: 'Quiero una primera versión bien hecha.' },
        { key: 'professional', title: 'Proyecto profesional', description: 'Quiero algo completo, bonito y funcional.' },
        { key: 'complete', title: 'Solución completa', description: 'Quiero una solución más completa, con sitio, panel o integraciones según la necesidad.' },
        { key: 'notSure', title: 'Todavía no sé', description: 'Quiero entender la mejor inversión.' },
      ],
      labels: {
        badge: 'PabloG Assist',
        title: 'Diagnóstico inteligente de tu proyecto',
        helper: 'Responde algunas preguntas y recibe una recomendación personalizada para sitio, reservas o sistemas.',
        step1: '¿Cuál es el tipo de tu negocio?',
        step2: '¿Qué necesitas más ahora?',
        step3: '¿Qué problemas quieres resolver?',
        step3Helper: 'Puedes elegir más de una opción.',
        step4: '¿Qué recursos serían importantes?',
        step4Helper: 'La asistente adapta las opciones según tu necesidad.',
        step5: 'Para cerrar el diagnóstico:',
        urgency: '¿Cuál es tu urgencia?',
        budget: '¿Qué estilo de proyecto imaginas?',
        businessName: 'Nombre del negocio',
        businessNamePlaceholder: 'Ej: Clínica Bella Salud',
        projectIdea: 'Cuéntame rápidamente tu idea',
        projectIdeaPlaceholder: 'Ej: Quiero un sitio con reservas para que mis clientes agenden por celular...',
        result: 'Recomendación generada',
        back: 'Volver',
        next: 'Continuar',
        submit: 'Enviar diagnóstico por WhatsApp',
        close: 'Cerrar asistente',
        progress: 'Paso',
        of: 'de',
        priorityWebsite: 'Prioridad: crear presencia profesional, generar confianza y aumentar contactos.',
        priorityBooking: 'Prioridad: organizar horarios, automatizar confirmaciones y reducir ausencias.',
        prioritySystem: 'Prioridad: centralizar datos, organizar procesos y generar reportes claros.',
        priorityWhatsapp: 'Prioridad: agilizar atención, organizar mensajes y reducir pérdida de clientes.',
        priorityNotSure: 'Prioridad: hacer un diagnóstico completo y definir el mejor plan digital.',
        planPrefix: 'Plan digital para',
        yourBusiness: 'tu negocio',
        tuBusiness: 'tu negocio',
        notSpecified: 'No especificado',
        noSpecified: 'No especificado',
        hello: '¡Hola Pablo! Hice el diagnóstico inteligente en el sitio de PabloG.Dev.',
        businessType: 'Tipo de negocio',
        businessNameLabel: 'Nombre del negocio',
        notInformed: 'No informado',
        clientIdea: 'Idea del cliente',
        noExtraDetails: 'No informó detalles extras',
        mainNeed: 'Necesidad principal',
        currentProblems: 'Problemas actuales',
        desiredFeatures: 'Recursos deseados',
        urgencyLabel: 'Urgencia',
        projectStyle: 'Estilo de proyecto',
        plan: 'Plan',
        recommendation: 'Recomendación generada',
        wantToKnow: 'Quiero entender cómo podemos hacer este proyecto.',
      }
    },
    en: {
      businessOptions: [
        { key: 'clinic', title: 'Clinic or healthcare', description: 'Consultations, schedules, patients and care.' },
        { key: 'barber', title: 'Barber or aesthetics', description: 'Schedules, services, professionals and clients.' },
        { key: 'petshop', title: 'Petshop', description: 'Baths, grooming, bookings and pet registration.' },
        { key: 'store', title: 'Store or commerce', description: 'Products, orders, catalog and WhatsApp.' },
        { key: 'realestate', title: 'Real estate or bookings', description: 'Catalog, availability, reservations and confirmation.' },
        { key: 'restaurant', title: 'Restaurant or delivery', description: 'Menu, orders, WhatsApp and organization.' },
        { key: 'services', title: 'Professional services', description: 'Professional presentation, contacts and budgets.' },
        { key: 'other', title: 'Other type of business', description: 'I have a different or customized idea.' },
      ],
      needOptions: [
        { key: 'website', title: 'Professional website', description: 'I want online presence, trust and more contacts.' },
        { key: 'booking', title: 'Online booking', description: 'I want to organize schedules, clients and confirmations.' },
        { key: 'system', title: 'Web system', description: 'I want to control processes, data, clients or sales.' },
        { key: 'whatsapp', title: 'WhatsApp and service', description: 'I want to facilitate contacts, orders and messages.' },
        { key: 'notSure', title: 'I don\'t know what I need', description: 'I want the diagnosis to indicate the best path.' },
      ],
      problemOptions: {
        website: [
          { key: 'noWebsite', label: 'My business doesn\'t have a professional website' },
          { key: 'lowTrust', label: 'I want to convey more trust to clients' },
          { key: 'badImage', label: 'My online presence looks simple or amateur' },
          { key: 'fewContacts', label: 'I receive few contacts or budgets' },
          { key: 'noGoogle', label: 'I don\'t appear well on Google' },
        ],
        booking: [
          { key: 'manualBooking', label: 'Bookings are manual and messy' },
          { key: 'forgetClients', label: 'Clients forget their schedules' },
          { key: 'lostTime', label: 'I spend a lot of time responding to messages' },
          { key: 'noConfirmation', label: 'I don\'t have automatic confirmation' },
          { key: 'scheduleConflict', label: 'I frequently have schedule conflicts' },
        ],
        system: [
          { key: 'noControl', label: 'Lack of control over clients, orders or data' },
          { key: 'manualProcess', label: 'Processes are very manual and repetitive' },
          { key: 'noReports', label: 'I don\'t have reports or indicators' },
          { key: 'scatteredData', label: 'Data scattered in multiple places' },
          { key: 'noHistory', label: 'Lack of history of actions and records' },
        ],
        whatsapp: [
          { key: 'lostMessages', label: 'I lose client messages' },
          { key: 'slowResponse', label: 'I take too long to respond or organize' },
          { key: 'confusingOrders', label: 'Orders or requests get confusing' },
          { key: 'noCatalog', label: 'I don\'t have a digital catalog or menu' },
          { key: 'noDirection', label: 'Client doesn\'t know where to send the message' },
        ],
        notSure: [
          { key: 'notSureProblem', label: 'I don\'t know exactly what the problem is' },
          { key: 'needHelp', label: 'I need help identifying the ideal solution' },
          { key: 'wantGrowth', label: 'I want to grow but I don\'t know where to start' },
        ],
      },
      featureOptions: {
        website: [
          { key: 'whatsapp', label: 'Button and automatic message for WhatsApp' },
          { key: 'responsive', label: 'Perfect display on mobile' },
          { key: 'seo', label: 'SEO to appear better on Google' },
          { key: 'pages', label: 'Professional pages to present services' },
          { key: 'portfolio', label: 'Projects area, photos or cases' },
          { key: 'lead', label: 'Form or lead capture' },
        ],
        booking: [
          { key: 'calendar', label: 'Available times calendar' },
          { key: 'services', label: 'Services, prices and professionals' },
          { key: 'professionals', label: 'Management of professionals and schedules' },
          { key: 'confirmation', label: 'Automatic confirmation via WhatsApp' },
          { key: 'admin', label: 'Dashboard to manage bookings' },
          { key: 'responsive', label: 'Perfect functioning on mobile' },
        ],
        system: [
          { key: 'dashboard', label: 'Administrative dashboard' },
          { key: 'clients', label: 'Client registration' },
          { key: 'reports', label: 'Reports and indicators' },
          { key: 'permissions', label: 'Login and access permissions' },
          { key: 'processControl', label: 'Internal process control' },
          { key: 'history', label: 'History of actions and records' },
          { key: 'responsiveAdmin', label: 'Dashboard adapted for mobile and computer' },
        ],
        whatsapp: [
          { key: 'messageFlow', label: 'Ready messages and smart buttons' },
          { key: 'catalog', label: 'Simple catalog integrated with WhatsApp' },
          { key: 'contactRoute', label: 'Intelligent service routing' },
          { key: 'supportPage', label: 'Simple support and information page' },
          { key: 'quickReply', label: 'Quick answers to common questions' },
        ],
        notSure: [
          { key: 'diagnosis', label: 'Complete diagnosis of my business' },
          { key: 'plan', label: 'Plan divided by priorities' },
          { key: 'future', label: 'Project prepared to evolve later' },
          { key: 'mentoring', label: 'Guidance to define the best path' },
        ],
      },
      urgencyOptions: [
        { key: 'calm', title: 'No rush', description: 'I want to plan calmly.' },
        { key: 'soon', title: 'I want to start soon', description: 'I already have an idea and want to bring it to life.' },
        { key: 'urgent', title: 'I need it fast', description: 'I need urgency to put it online or organize.' },
      ],
      budgetOptions: [
        { key: 'starter', title: 'Start simple', description: 'I want a well-done first version.' },
        { key: 'professional', title: 'Professional project', description: 'I want something complete, beautiful and functional.' },
        { key: 'complete', title: 'Complete solution', description: 'I want a more complete solution, with website, dashboard or integrations as needed.' },
        { key: 'notSure', title: 'I don\'t know yet', description: 'I want to understand the best investment.' },
      ],
      labels: {
        badge: 'PabloG Assist',
        title: 'Smart diagnosis of your project',
        helper: 'Answer a few questions and receive a personalized recommendation for website, booking or system.',
        step1: 'What is your business type?',
        step2: 'What do you need most right now?',
        step3: 'What problems do you want to solve?',
        step3Helper: 'You can choose more than one option.',
        step4: 'What features would be important?',
        step4Helper: 'The assistant adapts the options according to your need.',
        step5: 'To close the diagnosis:',
        urgency: 'What is your urgency?',
        budget: 'What project style do you imagine?',
        businessName: 'Business name',
        businessNamePlaceholder: 'Ex: Bella Health Clinic',
        projectIdea: 'Tell me your idea quickly',
        projectIdeaPlaceholder: 'Ex: I want a website with booking for clients to schedule via mobile...',
        result: 'Generated recommendation',
        back: 'Back',
        next: 'Continue',
        submit: 'Send diagnosis via WhatsApp',
        close: 'Close assistant',
        progress: 'Step',
        of: 'of',
        priorityWebsite: 'Priority: create professional presence, build trust and increase contacts.',
        priorityBooking: 'Priority: organize schedules, automate confirmations and reduce no-shows.',
        prioritySystem: 'Priority: centralize data, organize processes and generate clear reports.',
        priorityWhatsapp: 'Priority: streamline service, organize messages and reduce client loss.',
        priorityNotSure: 'Priority: do a complete diagnosis and define the best digital plan.',
        planPrefix: 'Digital plan for',
        yourBusiness: 'your business',
        tuBusiness: 'your business',
        notSpecified: 'Not specified',
        noSpecified: 'Not specified',
        hello: 'Hello Pablo! I did the smart diagnosis on the PabloG.Dev website.',
        businessType: 'Business type',
        businessNameLabel: 'Business name',
        notInformed: 'Not informed',
        clientIdea: 'Client idea',
        noExtraDetails: 'No extra details provided',
        mainNeed: 'Main need',
        currentProblems: 'Current problems',
        desiredFeatures: 'Desired features',
        urgencyLabel: 'Urgency',
        projectStyle: 'Project style',
        plan: 'Plan',
        recommendation: 'Generated recommendation',
        wantToKnow: 'I want to understand how we can make this project.',
      }
    }
  }

  const lang = t[language]

  const businessOptions = useMemo<Array<Option<BusinessType>>>(() => 
    lang.businessOptions.map((item) => ({
      ...item,
      icon: item.key === 'clinic' || item.key === 'realestate' ? Building2 : 
            item.key === 'barber' ? Calendar :
            item.key === 'petshop' || item.key === 'store' || item.key === 'restaurant' ? Store :
            item.key === 'services' ? Target :
            HelpCircle
    })), [lang]
  )

  const needOptions = useMemo<Array<Option<MainNeed>>>(() => 
    lang.needOptions.map((item) => ({
      ...item,
      icon: item.key === 'website' ? Globe :
            item.key === 'booking' ? Calendar :
            item.key === 'system' ? Settings2 :
            item.key === 'whatsapp' ? MessageCircle :
            Sparkles
    })), [lang]
  )

  const problemOptions = useMemo<MultiOption[]>(() => {
    const key = mainNeed || 'notSure'
    return lang.problemOptions[key as keyof typeof lang.problemOptions] || lang.problemOptions.notSure
  }, [mainNeed, lang])

  const featureOptions = useMemo<MultiOption[]>(() => {
    const key = mainNeed || 'notSure'
    return lang.featureOptions[key as keyof typeof lang.featureOptions] || lang.featureOptions.notSure
  }, [mainNeed, lang])

  const urgencyOptions = useMemo<Array<Option<Urgency>>>(() => 
    lang.urgencyOptions.map((item) => ({
      ...item,
      icon: item.key === 'calm' ? ClipboardList :
            item.key === 'soon' ? Rocket :
            Zap
    })), [lang]
  )

  const budgetOptions = useMemo<Array<Option<Budget>>>(() => 
    lang.budgetOptions.map((item) => ({
      ...item,
      icon: item.key === 'starter' ? Rocket :
            item.key === 'professional' ? Sparkles :
            item.key === 'complete' ? Settings2 :
            HelpCircle
    })), [lang]
  )

  const selectedBusiness = businessOptions.find((item) => item.key === businessType)
  const selectedNeed = needOptions.find((item) => item.key === mainNeed)
  const selectedUrgency = urgencyOptions.find((item) => item.key === urgency)
  const selectedBudget = budgetOptions.find((item) => item.key === budget)

  const progress = `${Math.round((step / 5) * 100)}%`

  const recommendedPlan = useMemo(() => {
    const items: string[] = []

    if (mainNeed === 'website') {
      items.push(isPt ? 'Site profissional com visual premium' : isEs ? 'Sitio profesional con visual premium' : 'Professional website with premium look')
      items.push(isPt ? 'SEO para aparecer melhor no Google' : isEs ? 'SEO para aparecer mejor en Google' : 'SEO to appear better on Google')
      items.push(isPt ? 'Integração com WhatsApp para contato rápido' : isEs ? 'Integración con WhatsApp para contacto rápido' : 'WhatsApp integration for quick contact')
    }

    if (mainNeed === 'booking') {
      items.push(isPt ? 'Sistema de agendamento online' : isEs ? 'Sistema de reservas online' : 'Online booking system')
      items.push(isPt ? 'Calendário inteligente com horários disponíveis' : isEs ? 'Calendario inteligente con horarios disponibles' : 'Smart calendar with available times')
      items.push(isPt ? 'Confirmação automática por WhatsApp' : isEs ? 'Confirmación automática por WhatsApp' : 'Automatic confirmation via WhatsApp')
    }

    if (mainNeed === 'system') {
      items.push(isPt ? 'Painel administrativo para gestão completa' : isEs ? 'Panel administrativo para gestión completa' : 'Administrative dashboard for complete management')
      items.push(isPt ? 'Cadastro e organização de clientes e dados' : isEs ? 'Registro y organización de clientes y datos' : 'Client and data registration and organization')
      items.push(isPt ? 'Relatórios e indicadores personalizados' : isEs ? 'Reportes e indicadores personalizados' : 'Custom reports and indicators')
    }

    if (mainNeed === 'whatsapp') {
      items.push(isPt ? 'Atendimento otimizado com WhatsApp' : isEs ? 'Atención optimizada con WhatsApp' : 'Optimized service with WhatsApp')
      items.push(isPt ? 'Mensagens prontas e botões inteligentes' : isEs ? 'Mensajes listos y botones inteligentes' : 'Ready messages and smart buttons')
      items.push(isPt ? 'Direcionamento automático de atendimento' : isEs ? 'Direccionamiento automático de atención' : 'Automatic service routing')
    }

    if (mainNeed === 'notSure' || items.length === 0) {
      items.push(isPt ? 'Diagnóstico inicial completo do negócio' : isEs ? 'Diagnóstico inicial completo del negocio' : 'Complete initial business diagnosis')
      items.push(isPt ? 'Plano personalizado por etapas e prioridades' : isEs ? 'Plan personalizado por etapas y prioridades' : 'Custom plan by stages and priorities')
      items.push(isPt ? 'Recomendação do melhor caminho digital' : isEs ? 'Recomendación del mejor camino digital' : 'Recommendation of the best digital path')
    }

    const has = (key: string) => problems.includes(key) || features.includes(key)

    if (mainNeed !== 'website' && (has('noWebsite') || has('lowTrust') || has('badImage'))) {
      items.push(isPt ? 'Site institucional como apoio' : isEs ? 'Sitio institucional como apoyo' : 'Institutional website as support')
    }

    if (mainNeed !== 'booking' && has('manualBooking')) {
      items.push(isPt ? 'Funcionalidade de agendamento como complemento' : isEs ? 'Funcionalidad de reservas como complemento' : 'Booking functionality as a complement')
    }

    if (mainNeed !== 'system' && (has('noControl') || has('manualProcess') || has('noReports'))) {
      items.push(isPt ? 'Painel de controle simplificado' : isEs ? 'Panel de control simplificado' : 'Simplified control dashboard')
    }

    if (mainNeed !== 'whatsapp' && (has('lostMessages') || has('slowResponse'))) {
      items.push(isPt ? 'Integração com WhatsApp para agilizar atendimento' : isEs ? 'Integración con WhatsApp para agilizar atención' : 'WhatsApp integration to streamline service')
    }

    return Array.from(new Set(items))
  }, [features, isPt, isEs, mainNeed, problems])

  const priorityText = useMemo(() => {
    if (mainNeed === 'website') return lang.labels.priorityWebsite
    if (mainNeed === 'booking') return lang.labels.priorityBooking
    if (mainNeed === 'system') return lang.labels.prioritySystem
    if (mainNeed === 'whatsapp') return lang.labels.priorityWhatsapp
    return lang.labels.priorityNotSure
  }, [mainNeed, lang])

  const projectName = useMemo(() => {
    const name = businessName.trim()

    if (name) {
      return `${lang.labels.planPrefix} ${name}`
    }

    return `${lang.labels.planPrefix} ${selectedBusiness?.title || lang.labels.yourBusiness}`
  }, [businessName, lang, selectedBusiness])

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
    onClose()
    setTimeout(() => resetGuide(), 300)
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
      : lang.labels.notSpecified

    const featureLabels = features.length > 0
      ? features
          .map((key) => featureOptions.find((item) => item.key === key)?.label)
          .filter(Boolean)
          .map((label) => `• ${label}`)
          .join('\n')
      : lang.labels.notSpecified

    const planItems = recommendedPlan.map((item) => `• ${item}`).join('\n')

    const message = [
      `🤖 *${lang.labels.hello}*`,
      '',
      `🏢 *${lang.labels.businessType}:* ${selectedBusiness.title}`,
      `📝 *${lang.labels.businessNameLabel}:* ${businessName.trim() || lang.labels.notInformed}`,
      `💡 *${lang.labels.clientIdea}:* ${projectIdea.trim() || lang.labels.noExtraDetails}`,
      '',
      `🎯 *${lang.labels.mainNeed}:* ${selectedNeed.title}`,
      '',
      `⚠️ *${lang.labels.currentProblems}:*`,
      problemLabels,
      '',
      `✨ *${lang.labels.desiredFeatures}:*`,
      featureLabels,
      '',
      `⏰ *${lang.labels.urgencyLabel}:* ${selectedUrgency.title}`,
      `📦 *${lang.labels.projectStyle}:* ${selectedBudget.title}`,
      '',
      `📋 *${lang.labels.plan}:* ${projectName}`,
      '',
      '🧠 *Recomendação gerada:*',
      planItems,
      '',
      `🔑 *${priorityText}*`,
      '',
      `💬 ${lang.labels.wantToKnow}`
    ].join('\n')

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )

    closeGuide()
  }

  useEffect(() => {
    const img = new Image()
    img.src = '/dog-assistant.webp'
  }, [])

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      return
    }

    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = `-${scrollY}px`

    setTimeout(() => closeButtonRef.current?.focus(), 100)

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeGuide()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  if (!open) return null

  return (
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
        aria-label={lang.labels.close}
      />

      <div className="project-guide__modal project-guide__modal--smart">
        <button
          ref={closeButtonRef}
          type="button"
          className="project-guide__close"
          onClick={closeGuide}
          aria-label={lang.labels.close}
        >
          <X size={18} />
        </button>

        <div className="project-guide__header">
          <div className="project-guide__assistant-icon">
            <img
              src="/dog-assistant.webp"
              alt={isPt ? 'Assistente PabloG' : isEs ? 'Asistente PabloG' : 'PabloG Assistant'}
              className="project-guide__assistant-image"
              width="44"
              height="44"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div>
            <span className="project-guide__badge">
              {lang.labels.badge}
            </span>

            <h2 id="project-guide-title" className="project-guide__title">
              {lang.labels.title}
            </h2>
          </div>
        </div>

        <div className="project-guide__progress" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={5} aria-label={`${lang.labels.progress} ${step} ${lang.labels.of} 5`}>
          <span style={{ width: progress }} />
        </div>

        <p className="project-guide__helper">
          {lang.labels.helper}
        </p>

        {step === 1 && (
          <div className="project-guide__step">
            <h3 className="project-guide__question">
              {lang.labels.step1}
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
              {lang.labels.step2}
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
              {lang.labels.step3}
            </h3>

            <p className="project-guide__helper">
              {lang.labels.step3Helper}
            </p>

            <div className="project-guide__chips" role="group" aria-label={isPt ? 'Lista de problemas' : isEs ? 'Lista de problemas' : 'Problem list'}>
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
              {lang.labels.step4}
            </h3>

            <p className="project-guide__helper">
              {lang.labels.step4Helper}
            </p>

            <div className="project-guide__chips" role="group" aria-label={isPt ? 'Lista de recursos' : isEs ? 'Lista de recursos' : 'Features list'}>
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
              {lang.labels.step5}
            </h3>

            <p className="project-guide__mini-title">
              {lang.labels.urgency}
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
              {lang.labels.budget}
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
                {lang.labels.businessName}
              </label>

              <input
                id="guide-business-name"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder={lang.labels.businessNamePlaceholder}
                maxLength={80}
              />

              <label htmlFor="guide-project-idea">
                {lang.labels.projectIdea}
              </label>

              <textarea
                id="guide-project-idea"
                value={projectIdea}
                onChange={(event) => setProjectIdea(event.target.value)}
                placeholder={lang.labels.projectIdeaPlaceholder}
                maxLength={500}
              />
            </div>

            {urgency && budget && (
              <div className="project-guide__result" role="region" aria-label={lang.labels.result}>
                <span>
                  <Sparkles size={16} />
                  {lang.labels.result}
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
              {lang.labels.back}
            </button>
          )}

          {step < 5 ? (
            <button
              type="button"
              className="project-guide__submit"
              disabled={!canGoNext}
              onClick={goNext}
            >
              <span>{lang.labels.next}</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              className="project-guide__submit"
              disabled={!canGoNext}
              onClick={openWhatsApp}
            >
              <span>{lang.labels.submit}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectGuide