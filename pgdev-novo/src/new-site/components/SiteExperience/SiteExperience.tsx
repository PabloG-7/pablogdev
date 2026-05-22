import { useState } from 'react'
import {
  LayoutTemplate,
  MessageCircle,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Lock,
  Star,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import type { Language } from '../../types'
import './SiteExperience.css'

type Props = {
  language: Language
}

type Tab = 'hero' | 'servicos' | 'contato' | 'mobile' | 'resultado'

export default function SiteExperience({ language }: Props) {
  const isPt = language === 'pt'
  const [activeTab, setActiveTab] = useState<Tab>('hero')
  const [step, setStep] = useState(1)

  const canServices = step >= 2
  const canContact = step >= 3
  const canMobile = step >= 4
  const canResult = step >= 5

  const handleTabClick = (tab: Tab) => {
    if (tab === 'servicos' && !canServices) return
    if (tab === 'contato' && !canContact) return
    if (tab === 'mobile' && !canMobile) return
    if (tab === 'resultado' && !canResult) return
    setActiveTab(tab)
  }

  return (
    <section className="site-exp" id="site-profissional">
      <div className="site-exp-container">
        <div className="site-exp-copy">
          <span className="site-exp-label">
            {isPt ? 'Site profissional' : 'Sitio profesional'}
          </span>

          <h2>
            {isPt
              ? 'Seu negócio com presença profissional'
              : 'Tu negocio con presencia profesional'}
            <span>.</span>
          </h2>

          <p>
            {isPt
              ? 'Um site moderno apresenta seus serviços, passa confiança e facilita o contato com clientes pelo WhatsApp.'
              : 'Un sitio moderno presenta tus servicios, transmite confianza y facilita el contacto por WhatsApp.'}
          </p>

          <strong>
            {isPt
              ? 'Mais autoridade, mais clareza e mais chances de receber contatos.'
              : 'Más autoridad, más claridad y más oportunidades de contacto.'}
          </strong>

          <div className="site-exp-hint">
            {isPt ? 'Interaja com a prévia ao lado' : 'Interactúa con la vista previa'}
            <ArrowRight size={16} />
          </div>
        </div>

        <div className="site-panel">
          <div className="site-tabs">
            {[
              { id: 'hero', icon: LayoutTemplate, label: 'Home', locked: false },
              { id: 'servicos', icon: Star, label: isPt ? 'Serviços' : 'Servicios', locked: !canServices },
              { id: 'contato', icon: MessageCircle, label: 'WhatsApp', locked: !canContact },
              { id: 'mobile', icon: Smartphone, label: 'Mobile', locked: !canMobile },
              { id: 'resultado', icon: CheckCircle, label: isPt ? 'Resultado' : 'Resultado', locked: !canResult },
            ].map((tab) => {
              const Icon = tab.icon

              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`${activeTab === tab.id ? 'active' : ''} ${tab.locked ? 'locked' : ''}`}
                  disabled={tab.locked}
                  onClick={() => handleTabClick(tab.id as Tab)}
                >
                  <Icon size={14} />
                  {tab.label}
                  {tab.locked && <Lock size={10} />}
                </button>
              )
            })}
          </div>

          <div className="site-screen">
            {activeTab === 'hero' && (
              <div className="site-preview site-preview-image-only">
                <picture>
                  <source
                    media="(max-width: 600px)"
                    srcSet="/preview-site-clinica-mobile.png"
                  />

                  <img
                    src="/preview-site-clinica.png"
                    alt="Prévia de site profissional"
                    className="site-preview-full-image"
                  />
                </picture>

                <button
                  type="button"
                  className="site-preview-hotspot"
                  onClick={() => {
                    setStep(2)
                    setActiveTab('servicos')
                  }}
                >
                  Ver serviços
                </button>
              </div>
            )}

            {activeTab === 'servicos' && (
              <div className="site-preview">
                <div className="site-browser-bar">
                  <span />
                  <span />
                  <span />
                  <small>Seus serviços</small>
                </div>

                <div className="site-services-grid">
                  <div>
                    <Star size={16} />
                    <strong>Consulta</strong>
                    <p>Atendimento personalizado.</p>
                  </div>

                  <div>
                    <Star size={16} />
                    <strong>Retorno</strong>
                    <p>Acompanhamento simples.</p>
                  </div>

                  <div>
                    <Star size={16} />
                    <strong>Premium</strong>
                    <p>Experiência completa.</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="site-next whatsapp"
                  onClick={() => {
                    setStep(3)
                    setActiveTab('contato')
                  }}
                >
                  Ver contato pelo WhatsApp
                </button>
              </div>
            )}

            {activeTab === 'contato' && (
              <div className="site-preview">
                <div className="site-browser-bar">
                  <span />
                  <span />
                  <span />
                  <small>Contato rápido</small>
                </div>

                <div className="site-contact-preview">
                  <div className="site-whatsapp-card">
                    <FaWhatsapp size={28} />
                    <div>
                      <strong>Fale pelo WhatsApp</strong>
                      <p>Cliente tira dúvidas e chama direto pelo botão do site.</p>
                    </div>
                  </div>

                  <div className="site-contact-line">
                    <span>Nome</span>
                    <strong>Ana Souza</strong>
                  </div>

                  <div className="site-contact-line">
                    <span>Interesse</span>
                    <strong>Consulta</strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="site-next mobile"
                  onClick={() => {
                    setStep(4)
                    setActiveTab('mobile')
                  }}
                >
                  Ver versão mobile
                </button>
              </div>
            )}

            {activeTab === 'mobile' && (
              <div className="site-preview mobile-preview-wrap">
                <div className="site-phone">
                  <div className="site-phone-top" />
                  <div className="site-phone-hero">
                    <span>Clínica Marina</span>
                    <strong>Atendimento moderno</strong>
                    <p>Agende ou fale pelo WhatsApp.</p>
                  </div>

                  <div className="site-phone-card" />
                  <div className="site-phone-card small" />
                  <div className="site-phone-button">
                    WhatsApp
                  </div>
                </div>

                <button
                  type="button"
                  className="site-next result"
                  onClick={() => {
                    setStep(5)
                    setActiveTab('resultado')
                  }}
                >
                  Ver resultado final
                </button>
              </div>
            )}

            {activeTab === 'resultado' && (
              <div className="site-preview">
                <div className="site-result">
                  <div>
                    <span>Presença</span>
                    <strong>Negócio mais profissional</strong>
                  </div>

                  <div>
                    <span>Contato</span>
                    <strong>WhatsApp sempre visível</strong>
                  </div>

                  <div>
                    <span>Confiança</span>
                    <strong>Serviços apresentados com clareza</strong>
                  </div>
                </div>

                <a href="#contato" className="site-final-cta">
                  {isPt ? 'Quero um site assim' : 'Quiero un sitio así'}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}