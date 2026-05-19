import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  DollarSign,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Lock,
  TrendingUp,
  FileText,
} from 'lucide-react'
import type { Language } from '../../types'
import './SystemExperience.css'

type Props = {
  language: Language
}

type Tab = 'dashboard' | 'clientes' | 'financeiro' | 'relatorios' | 'resultado'

export default function SystemExperience({ language }: Props) {
  const isPt = language === 'pt'

  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [tutorialStep, setTutorialStep] = useState(1)

  const canOpenClients = tutorialStep >= 2
  const canOpenFinance = tutorialStep >= 3
  const canOpenReports = tutorialStep >= 4
  const canOpenResult = tutorialStep >= 5

  const handleTabClick = (tab: Tab) => {
    if (tab === 'clientes' && !canOpenClients) return
    if (tab === 'financeiro' && !canOpenFinance) return
    if (tab === 'relatorios' && !canOpenReports) return
    if (tab === 'resultado' && !canOpenResult) return
    setActiveTab(tab)
  }

  return (
    <section className="system-exp" id="sistema">
      <div className="system-exp-container">
        <div className="system-exp-copy">
          <span className="system-exp-label">
            {isPt ? 'Sistema web' : 'Sistema web'}
          </span>

          <h2>
            {isPt
              ? 'Tudo organizado em um só sistema'
              : 'Todo organizado en un solo sistema'}
            <span>.</span>
          </h2>

          <p>
            {isPt
              ? 'Controle clientes, atendimentos, financeiro e informações importantes do negócio em um painel simples.'
              : 'Controla clientes, atenciones, finanzas e información importante del negocio en un panel simple.'}
          </p>

          <strong>
            {isPt
              ? 'Menos planilhas. Mais controle e clareza.'
              : 'Menos hojas de cálculo. Más control y claridad.'}
          </strong>

          <div className="system-exp-hint">
            {isPt ? 'Interaja com o painel ao lado' : 'Interactúa con el panel al lado'}
            <ArrowRight size={16} />
          </div>
        </div>

        <div className="system-panel">
          <div className="system-tabs">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: isPt ? 'Painel' : 'Panel', locked: false },
              { id: 'clientes', icon: Users, label: isPt ? 'Clientes' : 'Clientes', locked: !canOpenClients },
              { id: 'financeiro', icon: DollarSign, label: isPt ? 'Financeiro' : 'Finanzas', locked: !canOpenFinance },
              { id: 'relatorios', icon: BarChart3, label: isPt ? 'Relatórios' : 'Reportes', locked: !canOpenReports },
              { id: 'resultado', icon: CheckCircle, label: isPt ? 'Resultado' : 'Resultado', locked: !canOpenResult },
            ].map((tab) => {
              const Icon = tab.icon

              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`${activeTab === tab.id ? 'active' : ''} ${tab.locked ? 'locked' : ''}`}
                  onClick={() => handleTabClick(tab.id as Tab)}
                  disabled={tab.locked}
                >
                  <Icon size={14} />
                  {tab.label}
                  {tab.locked && <Lock size={10} />}
                </button>
              )
            })}
          </div>

          <div className="system-layout">
            <aside className="system-sidebar">
              <div className="system-sidebar-logo">
                PG
              </div>

              <nav className="system-sidebar-nav">
                <div className="active">
                  <LayoutDashboard size={16} />
                  <span>Painel</span>
                </div>

                <div>
                  <Users size={16} />
                  <span>Clientes</span>
                </div>

                <div>
                  <DollarSign size={16} />
                  <span>Financeiro</span>
                </div>

                <div>
                  <BarChart3 size={16} />
                  <span>Relatórios</span>
                </div>
              </nav>
            </aside>

            <div className="system-screen">
              <div className="system-topbar">
                <div className="system-search" />
                <div className="system-user">
                  <div />
                </div>
              </div>

              {activeTab === 'dashboard' && (
                <div className="system-content">
                  <div className="system-header-mini">
                    <span>Painel principal</span>
                    <small>Hoje</small>
                  </div>

                  <div className="system-metrics">
                    <div>
                      <span>Atendimentos</span>
                      <strong>24</strong>
                    </div>

                    <div>
                      <span>Clientes</span>
                      <strong>128</strong>
                    </div>

                    <div>
                      <span>Receita</span>
                      <strong>R$ 4.280</strong>
                    </div>
                  </div>

                  <div className="system-mini-list">
                    <div>
                      <span>09:00</span>
                      <strong>Ana Souza</strong>
                      <small>Confirmado</small>
                    </div>

                    <div>
                      <span>10:30</span>
                      <strong>Carlos Lima</strong>
                      <small>Pendente</small>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="system-next"
                    onClick={() => {
                      setTutorialStep(2)
                      setActiveTab('clientes')
                    }}
                  >
                    {isPt ? 'Ver clientes organizados' : 'Ver clientes organizados'}
                  </button>
                </div>
              )}

              {activeTab === 'clientes' && (
                <div className="system-content">
                  <div className="system-header-mini">
                    <span>{isPt ? 'Clientes cadastrados' : 'Clientes registrados'}</span>
                    <small>128</small>
                  </div>

                  <div className="system-clients-list">
                    {[
                      ['A', 'Ana Souza', '12 atendimentos'],
                      ['C', 'Carlos Lima', '8 atendimentos'],
                      ['F', 'Fernanda Costa', '15 atendimentos'],
                    ].map((client) => (
                      <div className="system-client" key={client[1]}>
                        <div>{client[0]}</div>
                        <section>
                          <strong>{client[1]}</strong>
                          <span>{client[2]}</span>
                        </section>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="system-next finance"
                    onClick={() => {
                      setTutorialStep(3)
                      setActiveTab('financeiro')
                    }}
                  >
                    {isPt ? 'Ver controle financeiro' : 'Ver control financiero'}
                  </button>
                </div>
              )}

              {activeTab === 'financeiro' && (
                <div className="system-content">
                  <div className="system-header-mini">
                    <span>{isPt ? 'Resumo financeiro' : 'Resumen financiero'}</span>
                    <small>Este mês</small>
                  </div>

                  <div className="system-finance-card">
                    <span>{isPt ? 'Recebido' : 'Recibido'}</span>
                    <strong>R$ 12.480</strong>
                    <small>
                      <TrendingUp size={13} />
                      +18% {isPt ? 'comparado ao mês anterior' : 'comparado al mes anterior'}
                    </small>
                  </div>

                  <div className="system-transactions">
                    <div>
                      <span>Consulta</span>
                      <strong>+ R$ 120</strong>
                    </div>

                    <div>
                      <span>Banho e Tosa</span>
                      <strong>+ R$ 85</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="system-next reports"
                    onClick={() => {
                      setTutorialStep(4)
                      setActiveTab('relatorios')
                    }}
                  >
                    {isPt ? 'Ver relatórios' : 'Ver reportes'}
                  </button>
                </div>
              )}

              {activeTab === 'relatorios' && (
                <div className="system-content">
                  <div className="system-header-mini">
                    <span>{isPt ? 'Relatórios simples' : 'Reportes simples'}</span>
                    <small>
                      <FileText size={12} />
                    </small>
                  </div>

                  <div className="system-chart">
                    {[45, 70, 55, 88, 64, 92].map((height, index) => (
                      <div key={index} style={{ height: `${height}%` }} />
                    ))}
                  </div>

                  <div className="system-report-summary">
                    <div>
                      <span>{isPt ? 'Melhor dia' : 'Mejor día'}</span>
                      <strong>Sexta-feira</strong>
                    </div>

                    <div>
                      <span>{isPt ? 'Serviço mais vendido' : 'Servicio más vendido'}</span>
                      <strong>Consulta</strong>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="system-next result"
                    onClick={() => {
                      setTutorialStep(5)
                      setActiveTab('resultado')
                    }}
                  >
                    {isPt ? 'Ver resultado final' : 'Ver resultado final'}
                  </button>
                </div>
              )}

              {activeTab === 'resultado' && (
                <div className="system-content">
                  <div className="system-result">
                    <div>
                      <span>{isPt ? 'Controle' : 'Control'}</span>
                      <strong>{isPt ? 'Tudo em um só lugar' : 'Todo en un solo lugar'}</strong>
                    </div>

                    <div>
                      <span>{isPt ? 'Organização' : 'Organización'}</span>
                      <strong>{isPt ? 'Menos planilhas e bagunça' : 'Menos hojas y desorden'}</strong>
                    </div>

                    <div>
                      <span>{isPt ? 'Decisão' : 'Decisión'}</span>
                      <strong>{isPt ? 'Dados claros para crescer' : 'Datos claros para crecer'}</strong>
                    </div>
                  </div>

                  <a href="#contato" className="system-final-cta">
                    {isPt ? 'Quero um sistema assim' : 'Quiero un sistema así'}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}