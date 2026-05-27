import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CheckCircle,
  Database,
  FileText,
  LineChart,
  Lock,
  Settings2,
  ShieldCheck,
  Users,
  Wallet,
  Zap,
} from 'lucide-react'
import type { Language } from '../../types'
import './SystemExperience.css'
import { Binary } from 'lucide-react'

type Props = {
  language: Language
}

export default function SystemExperience({ language }: Props) {
  const isPt = language === 'pt'

  return (
    <section className="system-experience" id="sistema">
      {/* Elementos decorativos minimalistas */}
      <div className="system-exp__dot-top"></div>
      <div className="system-exp__dot-bottom"></div>
      <div className="system-exp__ring"></div>
      <div className="system-exp__line"></div>

      <div className="system-exp-container">
        {/* LEFT SIDE - COPY */}
        <div className="system-exp-copy">
          <span className="system-exp-label">
         <Binary size={14} />
            {isPt ? 'SISTEMA SOB MEDIDA' : 'SISTEMA A MEDIDA'}
          </span>

          <h2>
            {isPt
              ? 'Seu negócio organizado em um painel profissional.'
              : 'Tu negocio organizado en un panel profesional.'}
          </h2>

          <p>
            {isPt
              ? 'Chega de planilhas confusas, anotações perdidas e processos manuais. Eu desenvolvo sistemas web personalizados para você controlar clientes, agendamentos, financeiro, relatórios e operações em um só lugar.'
              : 'Basta de hojas de cálculo confusas y procesos manuales. Desarrollo sistemas web personalizados para controlar clientes, agenda, finanzas, reportes y operaciones en un solo lugar.'}
          </p>

          <div className="system-exp-pills">
            <div>
              <Database size={16} />
              <span>{isPt ? 'Dados centralizados' : 'Datos centralizados'}</span>
            </div>
            <div>
              <Zap size={16} />
              <span>{isPt ? 'Processos rápidos' : 'Procesos rápidos'}</span>
            </div>
            <div>
              <ShieldCheck size={16} />
              <span>{isPt ? 'Mais controle' : 'Más control'}</span>
            </div>
          </div>

          <a href="#contato" className="system-exp-cta">
            {isPt ? 'QUERO UM SISTEMA PARA MEU NEGÓCIO' : 'QUIERO UN SISTEMA PARA MI NEGOCIO'}
            <ArrowRight size={16} />
          </a>
        </div>

        {/* RIGHT SIDE - PANEL MOCKUP */}
        <div className="system-exp-visual">
          <div className="system-panel">
            <div className="system-panel-sidebar">
              <div className="system-logo-mini">
                <Settings2 size={18} />
              </div>
              <span className="active" />
              <span />
              <span />
              <span />
            </div>

            <div className="system-panel-main">
              <div className="system-panel-top">
                <div>
                  <small>{isPt ? 'Sistema de gestão' : 'Sistema de gestión'}</small>
                  <strong>{isPt ? 'Painel principal' : 'Panel principal'}</strong>
                </div>
                <div className="system-secure">
                  <Lock size={12} />
                  {isPt ? 'Seguro' : 'Seguro'}
                </div>
              </div>

              {/* KPIs */}
              <div className="system-kpis">
                <div>
                  <Users size={18} />
                  <strong>248</strong>
                  <span>{isPt ? 'clientes' : 'clientes'}</span>
                </div>
                <div>
                  <CalendarCheck size={18} />
                  <strong>86</strong>
                  <span>{isPt ? 'agendamentos' : 'reservas'}</span>
                </div>
                <div>
                  <Wallet size={18} />
                  <strong>R$ 18k</strong>
                  <span>{isPt ? 'receita' : 'ingresos'}</span>
                </div>
              </div>

              {/* Dashboard Grid */}
              <div className="system-dashboard-grid">
                <div className="system-chart-box">
                  <div className="system-box-title">
                    <span>{isPt ? 'Crescimento mensal' : 'Crecimiento mensual'}</span>
                    <LineChart size={14} />
                  </div>
                  <div className="system-bars">
                    <i style={{ height: '45%' }} />
                    <i style={{ height: '58%' }} />
                    <i style={{ height: '50%' }} />
                    <i style={{ height: '72%' }} />
                    <i style={{ height: '64%' }} />
                    <i style={{ height: '88%' }} />
                    <i style={{ height: '78%' }} />
                    <i style={{ height: '96%' }} />
                  </div>
                </div>

                <div className="system-list-box">
                  <div className="system-box-title">
                    <span>{isPt ? 'Atividades recentes' : 'Actividades recientes'}</span>
                    <FileText size={14} />
                  </div>
                  <div className="system-activity">
                    <CheckCircle size={13} />
                    <div>
                      <strong>{isPt ? 'Novo cliente cadastrado' : 'Nuevo cliente registrado'}</strong>
                      <span>{isPt ? 'há 8 minutos' : 'hace 8 minutos'}</span>
                    </div>
                  </div>
                  <div className="system-activity">
                    <CheckCircle size={13} />
                    <div>
                      <strong>{isPt ? 'Pagamento confirmado' : 'Pago confirmado'}</strong>
                      <span>{isPt ? 'há 22 minutos' : 'hace 22 minutos'}</span>
                    </div>
                  </div>
                  <div className="system-activity">
                    <CheckCircle size={13} />
                    <div>
                      <strong>{isPt ? 'Relatório atualizado' : 'Reporte actualizado'}</strong>
                      <span>{isPt ? 'hoje' : 'hoy'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modules */}
              <div className="system-modules">
                <div>
                  <BarChart3 size={14} />
                  <span>{isPt ? 'Relatórios' : 'Reportes'}</span>
                </div>
                <div>
                  <Users size={14} />
                  <span>{isPt ? 'Clientes' : 'Clientes'}</span>
                </div>
                <div>
                  <CalendarCheck size={14} />
                  <span>{isPt ? 'Agenda' : 'Agenda'}</span>
                </div>
                <div>
                  <Wallet size={14} />
                  <span>{isPt ? 'Financeiro' : 'Finanzas'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}