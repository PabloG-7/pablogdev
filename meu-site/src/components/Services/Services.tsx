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
  const { t } = useLanguage()

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
          {services.map((service) => (
            <article className="service-card" key={service.titleKey}>
              <div className="service-image-wrapper">
                <img
                  src={service.image}
                  alt=""
                  loading="lazy"
                />
              </div>
              <h3>{t(service.titleKey)}</h3>
              <p>{t(service.descKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}