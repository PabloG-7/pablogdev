import { useLanguage } from '../../hooks/useLanguage'
import { type TranslationKey } from '../../data/translations'
import './Showcase.css'

interface ShowcaseCardProps {
  image: string
  categoryKey: TranslationKey
  titleKey: TranslationKey
  descKey: TranslationKey
  link: string
}

function ShowcaseCard({ image, categoryKey, titleKey, descKey, link }: ShowcaseCardProps) {
  const { t } = useLanguage()

  const handleClick = () => {
    window.open(link, '_blank')
  }

  return (
    <div className="showcase-card" onClick={handleClick}>
      <div className="card">
        <img 
          src={image} 
          alt={t(titleKey)} 
          loading="lazy" 
          decoding="async"
        />
        <div className="card-overlay">
          <div className="overlay-content">
            <div className="overlay-header">
              <span className="overlay-category">{t(categoryKey)}</span>
            </div>
            <h3 className="overlay-title">{t(titleKey)}</h3>
            <p className="overlay-description">{t(descKey)}</p>
            <div className="card-link">{t('card_link')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Showcase() {
  const { t } = useLanguage()

  const projects: ShowcaseCardProps[] = [
    {
      image: '/images/exemplo1.webp',
      categoryKey: 'cat_events',
      titleKey: 'project_1_name',
      descKey: 'project_1_desc',
      link: 'https://pablog-7.github.io/casamento-site-exemplo/'
    },
    {
      image: '/images/exemplo2.webp',
      categoryKey: 'cat_ecommerce',
      titleKey: 'project_2_name',
      descKey: 'project_2_desc',
      link: 'https://roupas-ateller.vercel.app/'
    },
    {
      image: '/images/exemplo3.webp',
      categoryKey: 'cat_food',
      titleKey: 'project_3_name',
      descKey: 'project_3_desc',
      link: 'https://pablog-7.github.io/donuts-site-exemplo/'
    },
    {
      image: '/images/exemplo4.webp',
      categoryKey: 'cat_health',
      titleKey: 'project_4_name',
      descKey: 'project_4_desc',
      link: 'https://pablog-7.github.io/fisio-site-exemplo/'
    },
    {
      image: '/images/exemplo5.webp',
      categoryKey: 'cat_ecommerce',
      titleKey: 'project_5_name',
      descKey: 'project_5_desc',
      link: 'https://pablog-7.github.io/ecommerce-kushi/'
    },
    {
      image: '/images/exemplo6.webp',
      categoryKey: 'cat_realestate',
      titleKey: 'project_6_name',
      descKey: 'project_6_desc',
      link: 'https://sistema-web-imobiliaria.vercel.app/'
    },
    {
      image: '/images/exemplo7.webp',
      categoryKey: 'cat_food',
      titleKey: 'project_7_name',
      descKey: 'project_7_desc',
      link: 'https://pablog-7.github.io/sorvete-site-exemplo/'
    },
    {
      image: '/images/exemplo8.webp',
      categoryKey: 'cat_wellness',
      titleKey: 'project_8_name',
      descKey: 'project_8_desc',
      link: 'https://pablog-7.github.io/yoga-site-exemplo/'
    },
    {
      image: '/images/exemplo9.webp',
      categoryKey: 'cat_ecommerce',
      titleKey: 'project_9_name',
      descKey: 'project_9_desc',
      link: 'https://pablog-7.github.io/virtz-site-exemplo/'
    },
    {
      image: '/images/exemplo10.webp',
      categoryKey: 'cat_beauty',
      titleKey: 'project_10_name',
      descKey: 'project_10_desc',
      link: 'https://agendamento-de-barbearia-virid.vercel.app/'
    },
    {
      image: '/images/exemplo11.webp',
      categoryKey: 'cat_ecommerce',
      titleKey: 'project_11_name',
      descKey: 'project_11_desc',
      link: 'https://pablog-7.github.io/fruit-site-exemplo/'
    },
    {
      image: '/images/exemplo12.webp',
      categoryKey: 'cat_beauty',
      titleKey: 'project_12_name',
      descKey: 'project_12_desc',
      link: 'https://pablog-7.github.io/muse-site-exemplo/'
    }
  ]

  return (
    <section className="showcase-section" id="showcase">
      <div className="container">
        <div className="showcase-header">
          <div>
            <h2>{t('showcase_title')}</h2>
          </div>
          <a href="#">{t('showcase_explore')}</a>
        </div>

        <div className="showcase-grid">
          {projects.map((project, index) => (
            <ShowcaseCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}