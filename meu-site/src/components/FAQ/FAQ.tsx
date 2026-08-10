import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { type TranslationKey } from '../../data/translations'
import { FaChevronDown } from 'react-icons/fa'
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

function FAQItem({ num, questionKey, answerKey, isOpen, onToggle }: FAQItemProps) {
  const { t } = useLanguage()

  return (
    <div className={`faq-item ${isOpen ? 'active' : ''}`}>
      <div className="faq-question" onClick={onToggle}>
        <div className="faq-left">
          <span className="faq-num">{num}</span>
          <h4>{t(questionKey)}</h4>
        </div>
        <span className={`faq-toggle ${isOpen ? 'open' : ''}`}>
          <FaChevronDown />
        </span>
      </div>
      <div className="faq-answer">
        <div className="faq-answer-inner">
          <p>{t(answerKey)}</p>
        </div>
      </div>
    </div>
  )
}

export function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs: FAQItemData[] = [
    {
      num: '01',
      questionKey: 'faq_1',
      answerKey: 'faq_1_answer'
    },
    {
      num: '02',
      questionKey: 'faq_2',
      answerKey: 'faq_2_answer'
    },
    {
      num: '03',
      questionKey: 'faq_3',
      answerKey: 'faq_3_answer'
    },
    {
      num: '04',
      questionKey: 'faq_4',
      answerKey: 'faq_4_answer'
    },
    {
      num: '05',
      questionKey: 'faq_5',
      answerKey: 'faq_5_answer'
    },
    {
      num: '06',
      questionKey: 'faq_6',
      answerKey: 'faq_6_answer'
    }
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container container">
        <div className="faq-header">
          <div className="faq-header-left">
            <div className="faq-badge">{t('faq_subtitle')}</div>
            <h2 className="faq-title">
              {t('faq_title')}
            </h2>
            <p className="faq-desc">
              {t('faq_desc')}
            </p>
          </div>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              num={faq.num}
              questionKey={faq.questionKey}
              answerKey={faq.answerKey}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}