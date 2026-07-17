import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import './FAQ.css'
import type { Language } from '../../types'

type FAQProps = {
  language: Language
}

export default function FAQ({ language }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null)

  const content = {
    pt: {
      label: 'DÚVIDAS',
      title: 'Perguntas',
      titleSpan: 'Frequentes',
      items: [
        {
          question: 'Quanto custa um site?',
          answer: 'O investimento varia de acordo com o tipo de projeto, funcionalidades e necessidades do seu negócio. Após entender o que você procura, envio um orçamento personalizado e sem compromisso.'
        },
        {
          question: 'Quanto tempo leva para o projeto ficar pronto?',
          answer: 'Landing pages e sites institucionais costumam levar de 3 a 10 dias úteis. Já sistemas personalizados possuem um cronograma específico, definido de acordo com a complexidade e os recursos solicitados.'
        },
        {
          question: 'O site funciona em celular e computador?',
          answer: 'Sim. Todos os projetos são desenvolvidos com design responsivo, garantindo uma ótima experiência em celulares, tablets e computadores.'
        },
        {
          question: 'Depois da entrega, você oferece suporte?',
          answer: 'Sim. Após a entrega ofereço suporte para esclarecer dúvidas e realizar pequenos ajustes relacionados ao projeto.'
        },
        {
          question: 'Você também desenvolve sistemas personalizados?',
          answer: 'Sim. Além de sites institucionais e landing pages, desenvolvo sistemas personalizados, painéis administrativos, automações e soluções sob medida para diferentes necessidades.'
        },
        {
          question: 'Meu site aparecerá no Google?',
          answer: 'Sim. Todos os projetos seguem boas práticas de SEO para facilitar a indexação pelos mecanismos de busca e melhorar a visibilidade do seu site.'
        }
      ]
    },
    es: {
      label: 'DUDAS',
      title: 'Preguntas',
      titleSpan: 'Frecuentes',
      items: [
        {
          question: '¿Cuánto cuesta un sitio web?',
          answer: 'La inversión varía según el tipo de proyecto, funcionalidades y necesidades de tu negocio. Después de entender lo que buscas, envío un presupuesto personalizado y sin compromiso.'
        },
        {
          question: '¿Cuánto tiempo lleva el proyecto?',
          answer: 'Las landing pages y sitios web institucionales suelen tardar de 3 a 10 días hábiles. Los sistemas personalizados requieren un cronograma específico, definido según la complejidad y los recursos solicitados.'
        },
        {
          question: '¿El sitio funciona en celular y computadora?',
          answer: 'Sí. Todos los proyectos se desarrollan con diseño responsivo, garantizando una excelente experiencia en celulares, tablets y computadoras.'
        },
        {
          question: '¿Después de la entrega ofreces soporte?',
          answer: 'Sí. Después de la entrega ofrezco soporte para aclarar dudas y realizar pequeños ajustes relacionados con el proyecto.'
        },
        {
          question: '¿También desarrollas sistemas personalizados?',
          answer: 'Sí. Además de sitios web institucionales y landing pages, desarrollo sistemas personalizados, paneles administrativos, automatizaciones y soluciones a medida para diferentes necesidades.'
        },
        {
          question: '¿Mi sitio aparecerá en Google?',
          answer: 'Sí. Todos los proyectos siguen buenas prácticas de SEO para facilitar la indexación por los motores de búsqueda y mejorar la visibilidad de tu sitio.'
        }
      ]
    },
    en: {
      label: 'FAQ',
      title: 'Frequently',
      titleSpan: 'Asked',
      items: [
        {
          question: 'How much does a website cost?',
          answer: 'The investment varies depending on the type of project, features and your business needs. After understanding what you\'re looking for, I send a personalized and no-obligation quote.'
        },
        {
          question: 'How long does the project take?',
          answer: 'Landing pages and business websites usually take 3 to 10 business days. Custom systems require a specific timeline, defined according to complexity and requested features.'
        },
        {
          question: 'Does the website work on mobile and computer?',
          answer: 'Yes. All projects are developed with responsive design, ensuring a great experience on phones, tablets and computers.'
        },
        {
          question: 'Do you offer support after delivery?',
          answer: 'Yes. After delivery I offer support to answer questions and make small adjustments related to the project.'
        },
        {
          question: 'Do you also develop custom systems?',
          answer: 'Yes. In addition to business websites and landing pages, I develop custom systems, admin panels, automations and tailored solutions for different needs.'
        },
        {
          question: 'Will my website appear on Google?',
          answer: 'Yes. All projects follow good SEO practices to facilitate indexing by search engines and improve your website\'s visibility.'
        }
      ]
    }
  }

  const currentContent = content[language]
  const faqItems = currentContent.items

  return (
    <section className="faq">
      <div 
        className="faq-background"
        style={{ backgroundImage: 'url(/plan-de-fundo-faq.png)' }}
      />

      <div className="faq-container">
        <div className="faq-header">
          <span className="faq-label">{currentContent.label}</span>
          <h2>
            {currentContent.title}<br />
            <span>{currentContent.titleSpan}</span>
          </h2>
          <div className="faq-sub">
            {language === 'pt' && 'Orçamento · Prazos · Responsivo · Suporte'}
            {language === 'es' && 'Presupuesto · Plazos · Responsivo · Soporte'}
            {language === 'en' && 'Budget · Deadlines · Responsive · Support'}
          </div>
        </div>

        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = open === index
            return (
              <div 
                key={index} 
                className={`faq-item ${isOpen ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <div className="faq-q-left">
                    <span className="faq-num">{String(index + 1).padStart(2, '0')}</span>
                    <span>{item.question}</span>
                  </div>
                  <div className="faq-icon-wrap">
                    <ChevronDown 
                      size={18} 
                      className={`faq-icon ${isOpen ? 'rotated' : ''}`}
                    />
                  </div>
                </button>

                <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                  <div className="faq-a-inner">
                    <div className="faq-a-line"></div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="faq-footer">
          <span>
            {language === 'pt' && 'Ainda tem dúvidas? Fale comigo no WhatsApp'}
            {language === 'es' && '¿Aún tienes dudas? Háblame por WhatsApp'}
            {language === 'en' && 'Still have questions? Talk to me on WhatsApp'}
          </span>
          <a href="https://wa.me/5511961111894" target="_blank" rel="noopener noreferrer">
            {language === 'pt' ? 'Falar agora' : language === 'es' ? 'Hablar ahora' : 'Talk now'}
          </a>
        </div>
      </div>
    </section>
  )
}