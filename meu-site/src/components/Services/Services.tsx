import { useLanguage } from '../../hooks/useLanguage'
import './Services.css'

export function Services() {
  const { t } = useLanguage()

  return (
    <section className="services-section">
      <div className="services-container container">
        <div className="services-title-wrap">
          <h2 className="services-title">
            <span className="linha1">{t('services_title_line1')}</span>
            <span className="linha2"><span className="s">{t('services_title_line2_first')}</span>{t('services_title_line2_rest')}</span>
            <span className="traco"></span>
          </h2>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-image-wrapper">
              <img src="/images/serv1.webp" alt="Websites" loading="lazy" />
            </div>
            <h4>{t('service_1_title')}</h4>
            <p>{t('service_1_desc')}</p>
          </div>

          <div className="service-card">
            <div className="service-image-wrapper">
              <img src="/images/serv2.webp" alt="Systems" loading="lazy" />
            </div>
            <h4>{t('service_2_title')}</h4>
            <p>{t('service_2_desc')}</p>
          </div>

          <div className="service-card">
            <div className="service-image-wrapper">
              <img src="/images/serv3.webp" alt="Scheduling" loading="lazy" />
            </div>
            <h4>{t('service_3_title')}</h4>
            <p>{t('service_3_desc')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}