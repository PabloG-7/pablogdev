// About.tsx - Sem vídeo
import './About.css'
import logo from '../../assets/apenas-logo-pablogdev.png'
import type { Language } from '../../types'

type AboutProps = { language: Language }

export default function About({ language }: AboutProps) {
  const content = {
    pt: {
      label: 'QUEM ESTÁ POR TRÁS',
      title: 'Pablo',
      titleSpan: 'G.',
      titleEnd: 'Dev',
      text1: 'Sou desenvolvedor especializado em criar soluções digitais que realmente resolvem problemas. Meu foco é entregar sites e sistemas que organizam processos, integram WhatsApp e trazem mais clientes para seu negócio.',
      text2: 'Atendo desde pequenos empreendedores até negócios que precisam profissionalizar sua presença online. Sem enrolação: código limpo, entrega rápida e suporte de verdade.'
    },
    es: {
      label: 'QUIÉN ESTÁ DETRÁS',
      title: 'Pablo',
      titleSpan: 'G.',
      titleEnd: 'Dev',
      text1: 'Soy desarrollador especializado en crear soluciones digitales que realmente resuelven problemas. Mi enfoque es entregar sitios y sistemas que organizan procesos, integran WhatsApp y traen más clientes a tu negocio.',
      text2: 'Atiendo desde pequeños emprendedores hasta negocios que necesitan profesionalizar su presencia online. Sin rodeos: código limpio, entrega rápida y soporte de verdad.'
    },
    en: {
      label: 'WHO IS BEHIND',
      title: 'Pablo',
      titleSpan: 'G.',
      titleEnd: 'Dev',
      text1: 'I am a developer specialized in creating digital solutions that truly solve problems. My focus is to deliver websites and systems that organize processes, integrate WhatsApp and bring more customers to your business.',
      text2: 'I serve from small entrepreneurs to businesses that need to professionalize their online presence. No nonsense: clean code, fast delivery and real support.'
    }
  }

  const currentContent = content[language]

  return (
    <section className="about" id="sobre">
      <div className="about-container">
        <span className="about-label">{currentContent.label}</span>
        <h2 className="about-title">
          {currentContent.title}
          <span>{currentContent.titleSpan}</span>
          {currentContent.titleEnd}
        </h2>

        <div className="about-content">
          <p>{currentContent.text1}</p>
          <p>{currentContent.text2}</p>
          
          <div className="about-logo">
            <img src={logo} alt="PabloG.Dev" />
          </div>
        </div>
      </div>
    </section>
  )
}