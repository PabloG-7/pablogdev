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

  return (
    <a
      className="showcase-card"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(titleKey)}
    >
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
    </a>
  )
}

// Projetos movidos para fora do componente para evitar recriação
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
    categoryKey: 'cat_food',
    titleKey: 'project_8_name',
    descKey: 'project_8_desc',
    link: 'https://pablog-7.github.io/orderuk-site-exemplo/'
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

export function Showcase() {
  const { t } = useLanguage()

  return (
    <section className="showcase-section" id="showcase" aria-labelledby="showcase-title">
      <div className="container">
        <div className="showcase-header">
          <h2 id="showcase-title">
            {t('showcase_title_part1')}
            <br />
            {t('showcase_title_part2')}
          </h2>
        </div>

        <div className="showcase-grid">
          {projects.map((project) => (
            <ShowcaseCard 
              key={project.link} 
              {...project} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}