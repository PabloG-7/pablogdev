import './Contact.css'
import { MessageCircle, Mail, ArrowRight } from 'lucide-react'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import { pt } from '../../i18n/pt'
import { es } from '../../i18n/es'
import type { Language } from '../../types'

type ContactProps = {
  language: Language
}

export default function Contact({ language }: ContactProps) {
  const content = language === 'pt' ? pt : es

  return (
    <section className="contact" id="contato">
      <div className="contact-container">
        <div className="contact-content">
          <h2 className="contact-title">{content.contact.title}</h2>
          <p className="contact-text">{content.contact.text}</p>

          <div className="contact-info">
            <a
              href="https://wa.me/5511961111894"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-item"
            >
              <MessageCircle size={18} />
              <span>+55 11 96111-1894</span>
            </a>

            <a href="mailto:pgdevsoftware@gmail.com" className="contact-info-item">
              <Mail size={18} />
              <span>pgdevsoftware@gmail.com</span>
            </a>

            <a
              href="https://www.instagram.com/pablog.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-item"
            >
              <FaInstagram size={18} />
              <span>@pablog.dev</span>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61579501306846"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-item"
            >
              <FaFacebook size={18} />
              <span>Facebook Page</span>
            </a>
          </div>
        </div>

        <a
          href={`https://wa.me/5511961111894?text=${encodeURIComponent(content.contact.cardMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-button"
        >
          {content.contact.cardButton}
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  )
}