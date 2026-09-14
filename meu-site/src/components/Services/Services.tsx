import { useLanguage } from '../../hooks/useLanguage'
import './Services.css'

interface Service {
  image: string
  titleKey: 'service_1_title' | 'service_2_title' | 'service_3_title'
  descKey: 'service_1_desc' | 'service_2_desc' | 'service_3_desc'
}

const services: Service[] = [
  {
    image: '/images/serv1.webp',
    titleKey: 'service_1_title',
    descKey: 'service_1_desc',
  },
  {
    image: '/images/serv2.webp',
    titleKey: 'service_2_title',
    descKey: 'service_2_desc',
  },
  {
    image: '/images/serv3.webp',
    titleKey: 'service_3_title',
    descKey: 'service_3_desc',
  },
]

export function Services() {
  const { t, lang } = useLanguage()

  // Mensagem dinâmica conforme o idioma (mesmo padrão do Hero)
  const getWhatsAppMessage = (serviceTitle: string) => {
    const messages = {
      pt: `Olá! Vim pelo site e tenho interesse no serviço: ${serviceTitle}.`,
      es: `¡Hola! Vine por el sitio y tengo interés en el servicio: ${serviceTitle}.`,
      en: `Hello! I came through the website and I'm interested in the service: ${serviceTitle}.`
    }
    return messages[lang] || messages.pt
  }

  // Link direto para o WhatsApp (mesmo número do Hero)
  const getWhatsAppLink = (serviceTitle: string) =>
    `https://wa.me/5511961111894?text=${encodeURIComponent(getWhatsAppMessage(serviceTitle))}`

  return (
    <section 
      className="services-section" 
      id="services" 
      aria-labelledby="services-title"
    >
      <div className="services-container container">
        <div className="services-title-wrap">
          <h2 className="services-title" id="services-title">
            <span className="linha1">{t('services_title_line1')}</span>
            <span className="linha2">
              <span className="s">{t('services_title_line2_first')}</span>
              {t('services_title_line2_rest')}
            </span>
            <span className="traco"></span>
          </h2>
        </div>

        <div className="services-grid">
          {services.map((service) => {
            const title = t(service.titleKey)
            return (
              <article className="service-card" key={service.titleKey}>
                <div className="service-image-wrapper">
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <h3>{title}</h3>
                <p>{t(service.descKey)}</p>

                {/* Botão Tenho Interesse - WhatsApp (dentro do card) */}
                <a
                  href={getWhatsAppLink(title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-whatsapp-btn"
                  aria-label={`Tenho interesse em ${title} - Falar no WhatsApp`}
                >
                  {/* Ícone oficial do WhatsApp */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>{t('service_btn_interest')}</span>
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}