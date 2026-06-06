// About.tsx - Sem vídeo
import './About.css'
import logo from '../../assets/apenas-logo-pablogdev.png'
import type { Language } from '../../types'

type AboutProps = { language: Language }

export default function About({ language }: AboutProps) {
  const isPT = language === 'pt'

  return (
    <section className="about" id="sobre">
      <div className="about-container">
        <span className="about-label">QUEM ESTÁ POR TRÁS</span>
        <h2 className="about-title">
          Pablo<span>G.</span>Dev
        </h2>

        <div className="about-content">
          <p>
            {isPT 
              ? 'Sou desenvolvedor especializado em criar soluções digitais que realmente resolvem problemas. Meu foco é entregar sites e sistemas que organizam processos, integram WhatsApp e trazem mais clientes para seu negócio.'
              : 'Soy desarrollador especializado en crear soluciones digitales que realmente resuelven problemas. Mi enfoque es entregar sitios y sistemas que organizan procesos, integran WhatsApp y traen más clientes a tu negocio.'}
          </p>
          <p>
            {isPT
              ? 'Atendo desde pequenos empreendedores até negócios que precisam profissionalizar sua presença online. Sem enrolação: código limpo, entrega rápida e suporte de verdade.'
              : 'Atiendo desde pequeños emprendedores hasta negocios que necesitan profesionalizar su presencia online. Sin rodeos: código limpio, entrega rápida y soporte de verdad.'}
          </p>
          
          <div className="about-logo">
            <img src={logo} alt="PabloG.Dev" />
          </div>
        </div>
      </div>
    </section>
  )
}