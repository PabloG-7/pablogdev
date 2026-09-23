import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { type TranslationKey } from '../../data/translations'
import {
  FaChevronDown,
  FaQuestion,
  FaWhatsapp,
  FaArrowRight
} from 'react-icons/fa'
import './FAQ.css'

interface FAQItemData {
  num: string
  questionKey: TranslationKey
  answerKey: TranslationKey
}

interface FAQItemProps extends FAQItemData {
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ questionKey, answerKey, isOpen, onToggle }: FAQItemProps) {
  const { t } = useLanguage()

  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <button
        type="button"
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-icon">
          <FaQuestion />
        </span>

        <h4>{t(questionKey)}</h4>

        <span className={`faq-toggle ${isOpen ? 'open' : ''}`}>
          <FaChevronDown />
        </span>
      </button>

      <div className="faq-answer">
        <div className="faq-answer-inner">
          <p>{t(answerKey)}</p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const { t, lang } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItemData[] = [
    { num: '01', questionKey: 'faq_1', answerKey: 'faq_1_answer' },
    { num: '02', questionKey: 'faq_2', answerKey: 'faq_2_answer' },
    { num: '03', questionKey: 'faq_3', answerKey: 'faq_3_answer' },
    { num: '04', questionKey: 'faq_4', answerKey: 'faq_4_answer' },
    { num: '05', questionKey: 'faq_5', answerKey: 'faq_5_answer' },
    { num: '06', questionKey: 'faq_6', answerKey: 'faq_6_answer' }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  const getWhatsAppMessage = () => {
    const messages = {
      pt: 'Olá! Vim pelo site e gostaria de mais informações.',
      es: '¡Hola! Vine por el sitio y me gustaría obtener más información.',
      en: 'Hello! I came through the website and would like more information.'
    }
    return messages[lang] || messages.pt
  }

  const whatsappLink = `https://wa.me/5511961111894?text=${encodeURIComponent(getWhatsAppMessage())}`

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="faq-layout">

          {/* ================= COLUNA ESQUERDA (visual) ================= */}
          <div className="faq-visual">

            <div className="faq-heading">
              <span className="faq-eyebrow">{t('faq_eyebrow')}</span>

              <h2 className="faq-title">
                <span>{t('faq_title_first')}</span>
                <strong>{t('faq_title_highlight')}</strong>
              </h2>
            </div>

            <div className="faq-character-area">
              <div className="faq-yellow-shape" />

              <div className="faq-hand-note">
                {t('faq_note')}
                <span>↘</span>
              </div>

              <div className="faq-question-bubble">?</div>

              <img
                src="/images/image-3.png"
                alt=""
                className="faq-character"
                aria-hidden="true"
              />
            </div>

          </div>

          {/* ================= COLUNA DIREITA (perguntas) ================= */}
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.num}
                {...faq}
                isOpen={openIndex === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>

          {/* ================= CARD WHATSAPP ================= */}
          {/* Desktop: fica na coluna 1 (embaixo da personagem) */}
          {/* Mobile: vai pra depois da lista (order: 3) */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="faq-whatsapp"
          >
            <span className="faq-whatsapp-icon">
              <FaWhatsapp />
            </span>

            <span className="faq-whatsapp-text">
              <strong>{t('faq_contact_title')}</strong>
              <small>{t('faq_contact_text')}</small>
            </span>

            <span className="faq-whatsapp-arrow">
              <FaArrowRight />
            </span>
          </a>

        </div>
      </div>
    </section>
  )
}