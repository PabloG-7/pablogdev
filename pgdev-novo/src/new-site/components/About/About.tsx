// About.tsx - Visual limpo sem stats
import './About.css'
import logo from '../../assets/apenas-logo.png'
import { Code, Smartphone, Zap } from 'lucide-react'
import type { Language } from '../../types'

type AboutProps = { language: Language }

export default function About({ language }: AboutProps) {
  const content = {
    pt: {
      label: 'SOBRE MIM',
      title: 'Pablo',
      titleSpan: 'G.',
      titleEnd: 'Dev',
      text1: 'Transformo ideias em soluções digitais que realmente funcionam. Cada projeto é pensado para organizar processos, integrar WhatsApp e gerar resultados concretos para seu negócio.',
      text2: 'Trabalho com tecnologia para resolver problemas reais. Sem complicação: código limpo, entrega no prazo e suporte que não some depois do projeto.',
      features: [
        { icon: Code, label: 'Código limpo e otimizado' },
        { icon: Smartphone, label: '100% responsivo' },
        { icon: Zap, label: 'Entrega ágil' }
      ]
    },
    es: {
      label: 'SOBRE MÍ',
      title: 'Pablo',
      titleSpan: 'G.',
      titleEnd: 'Dev',
      text1: 'Transformo ideas en soluciones digitales que realmente funcionan. Cada proyecto está pensado para organizar procesos, integrar WhatsApp y generar resultados concretos para tu negocio.',
      text2: 'Trabajo con tecnología para resolver problemas reales. Sin complicaciones: código limpio, entrega a tiempo y soporte que no desaparece después del proyecto.',
      features: [
        { icon: Code, label: 'Código limpio y optimizado' },
        { icon: Smartphone, label: '100% responsivo' },
        { icon: Zap, label: 'Entrega ágil' }
      ]
    },
    en: {
      label: 'ABOUT ME',
      title: 'Pablo',
      titleSpan: 'G.',
      titleEnd: 'Dev',
      text1: 'I turn ideas into digital solutions that actually work. Each project is designed to organize processes, integrate WhatsApp and deliver real results for your business.',
      text2: 'I work with technology to solve real problems. No complications: clean code, on-time delivery and support that doesn\'t disappear after the project.',
      features: [
        { icon: Code, label: 'Clean and optimized code' },
        { icon: Smartphone, label: '100% responsive' },
        { icon: Zap, label: 'Agile delivery' }
      ]
    }
  }

  const currentContent = content[language]

  return (
    <section className="about" id="sobre">
      {/* LOGO NO FUNDO */}
      <div className="about-bg">
        <img src={logo} alt="PabloG.Dev" />
        <div className="about-bg-glow"></div>
      </div>
      
      <div className="about-container">
        <div className="about-wrapper">
          <div className="about-header">
            <span className="about-label">{currentContent.label}</span>
            <h2 className="about-title">
              {currentContent.title}
              <span>{currentContent.titleSpan}</span>
              {currentContent.titleEnd}
            </h2>
            <div className="about-title-line"></div>
          </div>

          <div className="about-texts">
            <p className="about-text">{currentContent.text1}</p>
            <p className="about-text">{currentContent.text2}</p>
          </div>

          <div className="about-features">
            {currentContent.features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="about-feature">
                  <div className="about-feature-icon">
                    <Icon size={16} />
                  </div>
                  <span>{feature.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}