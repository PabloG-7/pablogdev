import './ProjectPreview.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle,
  Eye,
  Globe2,
  Heart,
  LayoutTemplate,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  MousePointerClick,
  Palette,
  Phone,
  RotateCcw,
  Shield,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import logoPng from '../../assets/apenas-logo.png'
import type { CSSProperties } from 'react'
import type { Language } from '../../types'

type Props = {
  language: Language
}

type ProjectType = 'website' | 'landing' | 'system'
type Industry = 'service' | 'health' | 'food' | 'store'
type DeviceMode = 'desktop' | 'mobile'
type StylePreset = 'premium' | 'clean' | 'bold'

const STORAGE_KEY = 'project_preview_state_v2'

interface SavedState {
  businessName: string
  projectType: ProjectType
  industry: Industry
  deviceMode: DeviceMode
  stylePreset: StylePreset
  primaryColor: string
  secondaryColor: string
  accentColor: string
}

const colorPresets = [
  {
    id: 'pg',
    label: 'PG',
    primary: '#fec90f',
    secondary: '#000c24',
    accent: '#3b82f6',
  },
  {
    id: 'fresh',
    label: 'Fresh',
    primary: '#22c55e',
    secondary: '#082f49',
    accent: '#06b6d4',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    primary: '#f59e0b',
    secondary: '#111827',
    accent: '#ef4444',
  },
  {
    id: 'soft',
    label: 'Soft',
    primary: '#a78bfa',
    secondary: '#1f2937',
    accent: '#f472b6',
  },
]

const defaultState: SavedState = {
  businessName: '',
  projectType: 'website',
  industry: 'service',
  deviceMode: 'desktop',
  stylePreset: 'premium',
  primaryColor: '#fec90f',
  secondaryColor: '#000c24',
  accentColor: '#3b82f6',
}

function isHexColor(value: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(value)
}

function getInitials(name: string) {
  const clean = name.trim()
  if (!clean) return 'PG'

  return clean
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')
}

function loadState(): SavedState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultState

    return {
      ...defaultState,
      ...JSON.parse(stored),
    }
  } catch {
    return defaultState
  }
}

function saveState(state: SavedState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage can fail in private mode. The simulator still works without it.
  }
}

function ProjectPreview({ language }: Props) {
  const saved = useMemo(() => loadState(), [])
  const isPt = language === 'pt'

  const [open, setOpen] = useState(false)
  const [businessName, setBusinessName] = useState(saved.businessName)
  const [projectType, setProjectType] = useState<ProjectType>(saved.projectType)
  const [industry, setIndustry] = useState<Industry>(saved.industry)
  const [deviceMode, setDeviceMode] = useState<DeviceMode>(saved.deviceMode)
  const [stylePreset, setStylePreset] = useState<StylePreset>(saved.stylePreset)
  const [primaryColor, setPrimaryColor] = useState(saved.primaryColor)
  const [secondaryColor, setSecondaryColor] = useState(saved.secondaryColor)
  const [accentColor, setAccentColor] = useState(saved.accentColor)

  useEffect(() => {
    saveState({
      businessName,
      projectType,
      industry,
      deviceMode,
      stylePreset,
      primaryColor,
      secondaryColor,
      accentColor,
    })
  }, [businessName, projectType, industry, deviceMode, stylePreset, primaryColor, secondaryColor, accentColor])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false)
    },
    [open],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    const nav = document.querySelector('nav')
    const header = document.querySelector('header')

    if (!open) return undefined

    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    if (nav) (nav as HTMLElement).style.display = 'none'
    if (header) (header as HTMLElement).style.zIndex = '0'

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''

      if (nav) (nav as HTMLElement).style.display = ''
      if (header) (header as HTMLElement).style.zIndex = ''

      window.scrollTo(0, scrollY)
    }
  }, [open])

  const name = businessName.trim() || (isPt ? 'Seu Negócio' : 'Tu Negocio')
  const initials = useMemo(() => getInitials(businessName), [businessName])

  const typeLabel = {
    website: isPt ? 'Site completo' : 'Sitio completo',
    landing: 'Landing page',
    system: isPt ? 'Sistema interno' : 'Sistema interno',
  }[projectType]

  const industryCopy = {
    service: {
      label: isPt ? 'Serviços' : 'Servicios',
      headline: isPt ? 'Agendamentos, confiança e contato rápido' : 'Reservas, confianza y contacto rápido',
      metric: isPt ? 'Leads' : 'Leads',
      action: isPt ? 'Solicitar orçamento' : 'Solicitar presupuesto',
    },
    health: {
      label: isPt ? 'Saúde' : 'Salud',
      headline: isPt ? 'Autoridade, acolhimento e marca profissional' : 'Autoridad, cercanía y marca profesional',
      metric: isPt ? 'Consultas' : 'Consultas',
      action: isPt ? 'Agendar consulta' : 'Agendar consulta',
    },
    food: {
      label: isPt ? 'Gastronomia' : 'Gastronomía',
      headline: isPt ? 'Cardápio bonito e pedidos pelo WhatsApp' : 'Menú bonito y pedidos por WhatsApp',
      metric: isPt ? 'Pedidos' : 'Pedidos',
      action: isPt ? 'Ver cardápio' : 'Ver menú',
    },
    store: {
      label: isPt ? 'Loja' : 'Tienda',
      headline: isPt ? 'Produtos em destaque e compra sem atrito' : 'Productos destacados y compra sin fricción',
      metric: isPt ? 'Vendas' : 'Ventas',
      action: isPt ? 'Comprar agora' : 'Comprar ahora',
    },
  }[industry]

  const styleLabel = {
    premium: isPt ? 'Premium' : 'Premium',
    clean: isPt ? 'Clean' : 'Clean',
    bold: isPt ? 'Impacto' : 'Impacto',
  }[stylePreset]

  const whatsappMessage = isPt
    ? `Olá! Vi a simulação no site e quero um projeto para "${name}". Tipo: ${typeLabel}. Segmento: ${industryCopy.label}. Estilo: ${styleLabel}. Cores: ${primaryColor} / ${secondaryColor} / ${accentColor}`
    : `¡Hola! Vi la simulación en el sitio y quiero un proyecto para "${name}". Tipo: ${typeLabel}. Segmento: ${industryCopy.label}. Estilo: ${styleLabel}. Colores: ${primaryColor} / ${secondaryColor} / ${accentColor}`

  const deviceStyle = {
    '--primary': primaryColor,
    '--secondary': secondaryColor,
    '--accent': accentColor,
  } as CSSProperties

  const updateColor = (setter: (value: string) => void, value: string) => {
    const normalized = value.startsWith('#') ? value : `#${value}`
    setter(normalized.slice(0, 7))
  }

  const applyPreset = (preset: (typeof colorPresets)[number]) => {
    setPrimaryColor(preset.primary)
    setSecondaryColor(preset.secondary)
    setAccentColor(preset.accent)
  }

  const resetPreview = () => {
    setBusinessName('')
    setProjectType('website')
    setIndustry('service')
    setDeviceMode('desktop')
    setStylePreset('premium')
    setPrimaryColor(defaultState.primaryColor)
    setSecondaryColor(defaultState.secondaryColor)
    setAccentColor(defaultState.accentColor)
  }

  return (
    <>
      <button type="button" className="preview-button" onClick={() => setOpen(true)}>
        <Eye size={18} />
        {isPt ? 'Ver como pode ficar' : 'Ver cómo puede quedar'}
      </button>

      {open && (
        <div className="preview" role="dialog" aria-modal="true" aria-labelledby="project-preview-title">
          <button
            type="button"
            className="preview__overlay"
            onClick={() => setOpen(false)}
            aria-label={isPt ? 'Fechar simulador' : 'Cerrar simulador'}
          />

          <div className="preview__modal">
            <div className="preview__logo-top">
              <img src={logoPng} alt="Logo" />
              <span>{isPt ? 'Simulador de Projetos' : 'Simulador de Proyectos'}</span>
            </div>

            <button
              type="button"
              className="preview__close"
              onClick={() => setOpen(false)}
              aria-label={isPt ? 'Fechar' : 'Cerrar'}
            >
              <X size={16} />
            </button>

            <div className="preview__content">
              <div className="preview__header">
                <span className="preview__badge">
                  {isPt ? 'Preview ao vivo' : 'Preview en vivo'}
                </span>
                <h2 id="project-preview-title" className="preview__title">
                  {isPt ? 'Monte uma prévia do seu projeto em segundos' : 'Monta una previa de tu proyecto en segundos'}
                </h2>
                <p className="preview__text">
                  {isPt
                    ? 'Personalize nome, segmento, estilo e cores para visualizar uma direção inicial antes de pedir o orçamento.'
                    : 'Personaliza nombre, segmento, estilo y colores para visualizar una dirección inicial antes de pedir presupuesto.'}
                </p>
              </div>

              <div className="preview__grid">
                <aside className="preview__panel" aria-label={isPt ? 'Controles do preview' : 'Controles del preview'}>
                  <div className="preview__field">
                    <label htmlFor="preview-business-name">{isPt ? 'Nome do negócio' : 'Nombre del negocio'}</label>
                    <input
                      id="preview-business-name"
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder={isPt ? 'Ex: Clínica Vida' : 'Ej: Clínica Vida'}
                      maxLength={34}
                    />
                  </div>

                  <div className="preview__group">
                    <span>
                      <LayoutTemplate size={13} />
                      {isPt ? 'Tipo de projeto' : 'Tipo de proyecto'}
                    </span>
                    <div className="preview__chips" role="group">
                      <button
                        type="button"
                        className={projectType === 'website' ? 'is-active' : ''}
                        onClick={() => setProjectType('website')}
                      >
                        <Globe2 size={13} />
                        {isPt ? 'Site' : 'Sitio'}
                      </button>
                      <button
                        type="button"
                        className={projectType === 'landing' ? 'is-active' : ''}
                        onClick={() => setProjectType('landing')}
                      >
                        <MousePointerClick size={13} />
                        Landing
                      </button>
                      <button
                        type="button"
                        className={projectType === 'system' ? 'is-active' : ''}
                        onClick={() => setProjectType('system')}
                      >
                        <BarChart3 size={13} />
                        Sistema
                      </button>
                    </div>
                  </div>

                  <div className="preview__group">
                    <span>
                      <BriefcaseBusiness size={13} />
                      {isPt ? 'Segmento' : 'Segmento'}
                    </span>
                    <div className="preview__chips preview__chips--compact" role="group">
                      {(['service', 'health', 'food', 'store'] as Industry[]).map((item) => (
                        <button
                          type="button"
                          key={item}
                          className={industry === item ? 'is-active' : ''}
                          onClick={() => setIndustry(item)}
                        >
                          {{
                            service: isPt ? 'Serviços' : 'Servicios',
                            health: isPt ? 'Saúde' : 'Salud',
                            food: isPt ? 'Food' : 'Food',
                            store: isPt ? 'Loja' : 'Tienda',
                          }[item]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="preview__group">
                    <span>
                      <MonitorSmartphone size={13} />
                      {isPt ? 'Visualização' : 'Visualización'}
                    </span>
                    <div className="preview__segmented" role="group">
                      <button
                        type="button"
                        className={deviceMode === 'desktop' ? 'is-active' : ''}
                        onClick={() => setDeviceMode('desktop')}
                        aria-label="Desktop"
                      >
                        <MonitorSmartphone size={15} />
                      </button>
                      <button
                        type="button"
                        className={deviceMode === 'mobile' ? 'is-active' : ''}
                        onClick={() => setDeviceMode('mobile')}
                        aria-label="Mobile"
                      >
                        <Smartphone size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="preview__group">
                    <span>
                      <Sparkles size={13} />
                      {isPt ? 'Estilo' : 'Estilo'}
                    </span>
                    <div className="preview__chips preview__chips--compact" role="group">
                      {(['premium', 'clean', 'bold'] as StylePreset[]).map((item) => (
                        <button
                          type="button"
                          key={item}
                          className={stylePreset === item ? 'is-active' : ''}
                          onClick={() => setStylePreset(item)}
                        >
                          {{
                            premium: 'Premium',
                            clean: 'Clean',
                            bold: isPt ? 'Impacto' : 'Impacto',
                          }[item]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="preview__group">
                    <span>
                      <Palette size={13} />
                      {isPt ? 'Cores rápidas' : 'Colores rápidos'}
                    </span>
                    <div className="preview__swatches">
                      {colorPresets.map((preset) => (
                        <button
                          type="button"
                          key={preset.id}
                          onClick={() => applyPreset(preset)}
                          className="preview__swatch"
                          aria-label={`${isPt ? 'Aplicar paleta' : 'Aplicar paleta'} ${preset.label}`}
                        >
                          <span style={{ background: preset.primary }} />
                          <span style={{ background: preset.secondary }} />
                          <span style={{ background: preset.accent }} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="preview__colors">
                    {[
                      {
                        label: isPt ? 'Principal' : 'Principal',
                        value: primaryColor,
                        setter: setPrimaryColor,
                      },
                      {
                        label: isPt ? 'Base' : 'Base',
                        value: secondaryColor,
                        setter: setSecondaryColor,
                      },
                      {
                        label: isPt ? 'Destaque' : 'Acento',
                        value: accentColor,
                        setter: setAccentColor,
                      },
                    ].map((color) => (
                      <div className="preview__color-field" key={color.label}>
                        <label>{color.label}</label>
                        <div className="preview__color-row">
                          <input
                            type="color"
                            value={isHexColor(color.value) ? color.value : '#000000'}
                            onChange={(e) => color.setter(e.target.value)}
                          />
                          <input
                            type="text"
                            value={color.value}
                            onChange={(e) => updateColor(color.setter, e.target.value)}
                            maxLength={7}
                            spellCheck={false}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button type="button" className="preview__reset" onClick={resetPreview}>
                    <RotateCcw size={14} />
                    {isPt ? 'Resetar preview' : 'Reiniciar preview'}
                  </button>
                </aside>

                <section
                  className={`preview__stage preview__stage--${deviceMode}`}
                  style={deviceStyle}
                  aria-label={isPt ? 'Prévia do projeto' : 'Previa del proyecto'}
                >
                  <div className={`preview__device preview__device--${stylePreset}`}>
                    <div className="preview__topbar">
                      <span />
                      <span />
                      <span />
                      <strong>{name}</strong>
                    </div>

                    {projectType === 'system' && (
                      <div className="preview-dashboard">
                        <div className="preview-dashboard__sidebar">
                          <div className="preview-dashboard__logo">{initials}</div>
                          <div className="preview-dashboard__nav-item active" />
                          <div className="preview-dashboard__nav-item" />
                          <div className="preview-dashboard__nav-item" />
                          <div className="preview-dashboard__nav-item" />
                        </div>

                        <div className="preview-dashboard__main">
                          <div className="preview-dashboard__heading">
                            <div>
                              <strong>{name}</strong>
                              <small>{typeLabel} · {industryCopy.label}</small>
                            </div>
                            <div className="preview-dashboard__status">Online</div>
                          </div>

                          <div className="preview-dashboard__metrics">
                            <div className="preview-dashboard__metric">
                              <strong>128</strong>
                              <span>{isPt ? 'Clientes' : 'Clientes'}</span>
                            </div>
                            <div className="preview-dashboard__metric">
                              <strong>42</strong>
                              <span>{industryCopy.metric}</span>
                            </div>
                            <div className="preview-dashboard__metric">
                              <strong>23%</strong>
                              <span>{isPt ? 'Crescimento' : 'Crecimiento'}</span>
                            </div>
                          </div>

                          <div className="preview-dashboard__chart">
                            <div className="preview-dashboard__chart-header">
                              <span>{isPt ? 'Performance do mês' : 'Performance del mes'}</span>
                              <strong>+R$24K</strong>
                            </div>
                            <div className="preview-dashboard__chart-bars">
                              {[65, 45, 82, 58, 36, 72, 52].map((height, index) => (
                                <div className="preview-dashboard__chart-bar" key={height + index}>
                                  <div className="preview-dashboard__chart-bar-fill" style={{ height: `${height}%` }} />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="preview-dashboard__table">
                            <div>
                              <span>{isPt ? 'Novo cliente' : 'Nuevo cliente'}</span>
                              <strong>{isPt ? 'Aguardando contato' : 'Esperando contacto'}</strong>
                            </div>
                            <div>
                              <span>{isPt ? 'Tarefa' : 'Tarea'}</span>
                              <strong>{isPt ? 'Enviar proposta' : 'Enviar propuesta'}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {projectType === 'website' && (
                      <div className="preview-site">
                        <div className="preview-site__header">
                          <div className="preview-site__brand">
                            <div className="preview-site__logo">{initials}</div>
                            <span className="preview-site__name">{name}</span>
                          </div>
                          <div className="preview-site__menu">
                            <span className="active">{isPt ? 'Home' : 'Inicio'}</span>
                            <span>{isPt ? 'Serviços' : 'Servicios'}</span>
                            <span>{isPt ? 'Sobre' : 'Sobre'}</span>
                            <span>{isPt ? 'Contato' : 'Contacto'}</span>
                          </div>
                          <Menu className="preview-site__menu-icon" size={16} />
                        </div>

                        <div className="preview-site__hero">
                          <span className="preview-site__hero-badge">{industryCopy.label}</span>
                          <h3>{industryCopy.headline}</h3>
                          <p>
                            {isPt
                              ? 'Uma presença digital clara, bonita e pensada para gerar contatos todos os dias.'
                              : 'Una presencia digital clara, bonita y pensada para generar contactos todos los días.'}
                          </p>
                          <button type="button" className="preview-site__hero-cta">
                            {industryCopy.action}
                            <ArrowRight size={13} />
                          </button>
                        </div>

                        <div className="preview-site__sections">
                          <div className="preview-site__section">
                            <div className="preview-site__section-icon"><Wrench size={16} /></div>
                            <span>{isPt ? 'Serviços' : 'Servicios'}</span>
                            <small>{isPt ? 'Tudo bem explicado' : 'Todo bien explicado'}</small>
                          </div>
                          <div className="preview-site__section">
                            <div className="preview-site__section-icon"><Users size={16} /></div>
                            <span>{isPt ? 'Prova social' : 'Prueba social'}</span>
                            <small>{isPt ? 'Depoimentos reais' : 'Testimonios reales'}</small>
                          </div>
                          <div className="preview-site__section">
                            <div className="preview-site__section-icon"><MessageCircle size={16} /></div>
                            <span>WhatsApp</span>
                            <small>{isPt ? 'Contato em 1 clique' : 'Contacto en 1 clic'}</small>
                          </div>
                        </div>

                        <div className="preview-site__strip">
                          <div>
                            <strong>4.9</strong>
                            <span>{isPt ? 'avaliação média' : 'valoración media'}</span>
                          </div>
                          <div>
                            <strong>24h</strong>
                            <span>{isPt ? 'resposta rápida' : 'respuesta rápida'}</span>
                          </div>
                          <div>
                            <strong>100%</strong>
                            <span>{isPt ? 'responsivo' : 'responsivo'}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {projectType === 'landing' && (
                      <div className="preview-landing">
                        <div className="preview-landing__top">
                          <div className="preview-landing__brand">
                            <div className="preview-landing__logo">{initials}</div>
                            <span>{name}</span>
                          </div>
                          <span className="preview-landing__cta-top">{industryCopy.action}</span>
                        </div>

                        <div className="preview-landing__hero">
                          <div className="preview-landing__icon-circle">
                            <Zap size={20} />
                          </div>
                          <span className="preview-landing__eyebrow">{typeLabel} · {industryCopy.label}</span>
                          <h3>{isPt ? 'Transforme visitantes em clientes' : 'Transforma visitantes en clientes'}</h3>
                          <p>
                            {isPt
                              ? 'Uma página direta, persuasiva e otimizada para o cliente tomar uma ação.'
                              : 'Una página directa, persuasiva y optimizada para que el cliente tome acción.'}
                          </p>
                          <button type="button" className="preview-landing__big-cta">
                            {industryCopy.action}
                            <ArrowRight size={14} />
                          </button>

                          <div className="preview-landing__trust">
                            <div className="preview-landing__trust-item">
                              <Shield size={12} />
                              {isPt ? 'Seguro' : 'Seguro'}
                            </div>
                            <div className="preview-landing__trust-item">
                              <Heart size={12} />
                              {isPt ? 'Humano' : 'Humano'}
                            </div>
                            <div className="preview-landing__trust-item">
                              <CheckCircle size={12} />
                              {isPt ? 'Sem enrolação' : 'Sin vueltas'}
                            </div>
                          </div>

                          <div className="preview-landing__features">
                            <div className="preview-landing__feature">
                              <TrendingUp size={14} />
                              <span>{isPt ? 'Alta conversão' : 'Alta conversión'}</span>
                            </div>
                            <div className="preview-landing__feature">
                              <Star size={14} />
                              <span>{isPt ? 'Design premium' : 'Diseño premium'}</span>
                            </div>
                            <div className="preview-landing__feature">
                              <Phone size={14} />
                              <span>WhatsApp</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="preview__insights">
                    <div>
                      <ShoppingBag size={15} />
                      <span>{isPt ? 'Pensado para vender' : 'Pensado para vender'}</span>
                    </div>
                    <div>
                      <CalendarDays size={15} />
                      <span>{isPt ? 'Pronto para agendar' : 'Listo para agendar'}</span>
                    </div>
                    <div>
                      <CheckCircle size={15} />
                      <span>{isPt ? 'Responsivo' : 'Responsivo'}</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="preview__footer">
              <p>
                {isPt
                  ? 'Essa é uma simulação visual. O projeto final é desenhado sob medida para o seu negócio.'
                  : 'Esta es una simulación visual. El proyecto final se diseña a medida para tu negocio.'}
              </p>
              <a
                href={`https://wa.me/5511961111894?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="preview__cta"
              >
                {isPt ? 'Quero um preview assim' : 'Quiero una previa así'}
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectPreview