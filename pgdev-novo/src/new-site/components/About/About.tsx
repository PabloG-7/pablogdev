import './About.css'
import logo from '../../assets/logo.png'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'

type AboutProps = {
  language: Language
}

export default function About({ language }: AboutProps) {
  const content = language === 'pt' ? pt : es

  return (
    <section className="about" id="sobre">
      <div className="about-container">
        <span className="about-label">{content.about.badge}</span>
        <h2 className="about-title">
          {content.about.title}{' '}
          <span>{content.about.highlight}</span>
        </h2>

        <div className="about-grid">
          <div className="about-text">
            <p>{content.about.text1}</p>
            <p>{content.about.text2}</p>
          </div>

          <div className="about-logo">
            <img src={logo} alt="PabloG.Dev" />
          </div>
        </div>
      </div>
    </section>
  )
}