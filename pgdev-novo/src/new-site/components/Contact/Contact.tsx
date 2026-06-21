import './Contact.css'
import { Mail } from 'lucide-react'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import type { Language } from '../../types'

type ContactProps = {
  language: Language
}

export default function Contact({ language }: ContactProps) {
  const content = {
    pt: {
      badge: 'CONTATO',
      title: <>Vamos <span>conversar?</span></>,
      description: 'Escolha o melhor canal e fale comigo agora mesmo.',
      cardMessage: 'Olá! Vim pelo site e gostaria de mais informações.',
      whatsapp: 'WhatsApp',
      email: 'Email',
      social: 'Redes sociais'
    },
    es: {
      badge: 'CONTACTO',
      title: <>¿Vamos <span>conversar?</span></>,
      description: 'Elige el mejor canal y háblame ahora mismo.',
      cardMessage: '¡Hola! Vine por el sitio y me gustaría más información.',
      whatsapp: 'WhatsApp',
      email: 'Correo',
      social: 'Redes sociales'
    },
    en: {
      badge: 'CONTACT',
      title: <>Let's <span>talk?</span></>,
      description: 'Choose the best channel and talk to me right now.',
      cardMessage: 'Hello! I came through the site and would like more information.',
      whatsapp: 'WhatsApp',
      email: 'Email',
      social: 'Social media'
    }
  }

  const currentContent = content[language]
  const whatsappLink = `https://wa.me/5511961111894?text=${encodeURIComponent(currentContent.cardMessage)}`

  return (
    <section className="contact" id="contato">
      <div className="contact-container">
        <div className="contact-header">
          <span className="contact-badge">
            {currentContent.badge}
          </span>
          <h2 className="contact-title">
            {currentContent.title}
          </h2>
          <p className="contact-description">
            {currentContent.description}
          </p>
        </div>

        <div className="contact-grid">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <div className="contact-card-icon">
              <FaWhatsapp size={24} />
            </div>
            <h3>{currentContent.whatsapp}</h3>
            <p>+55 11 96111-1894</p>
            <span className="contact-arrow">→</span>
          </a>

          <a
            href="mailto:pgdevsoftware@gmail.com"
            className="contact-card"
          >
            <div className="contact-card-icon">
              <Mail size={24} />
            </div>
            <h3>{currentContent.email}</h3>
            <p>pgdevsoftware@gmail.com</p>
            <span className="contact-arrow">→</span>
          </a>
        </div>

        <div className="contact-social">
          <span>{currentContent.social}</span>
          <div className="social-links">
            <a href="https://www.instagram.com/pablog.dev/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={18} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61579501306846" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={18} />
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}