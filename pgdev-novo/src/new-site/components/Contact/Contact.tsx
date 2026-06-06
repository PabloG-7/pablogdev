import './Contact.css'
import { Mail } from 'lucide-react'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'

type ContactProps = {
  language: Language
}

export default function Contact({ language }: ContactProps) {
  const content = language === 'pt' ? pt : es

  const whatsappLink = `https://wa.me/5511961111894?text=${encodeURIComponent(content.contact.cardMessage)}`

  return (
    <section className="contact" id="contato">
      <div className="contact-container">
        <div className="contact-header">
          <span className="contact-badge">
            {language === 'pt' ? 'CONTATO' : 'CONTACTO'}
          </span>
          <h2 className="contact-title">
            {language === 'pt' ? (
              <>Vamos <span>conversar?</span></>
            ) : (
              <>¿Vamos <span>conversar?</span></>
            )}
          </h2>
          <p className="contact-description">
            {language === 'pt'
              ? 'Escolha o melhor canal e fale comigo agora mesmo.'
              : 'Elige el mejor canal y háblame ahora mismo.'}
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
            <h3>WhatsApp</h3>
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
            <h3>Email</h3>
            <p>pgdevsoftware@gmail.com</p>
            <span className="contact-arrow">→</span>
          </a>
        </div>

        <div className="contact-social">
          <span>Redes sociais</span>
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