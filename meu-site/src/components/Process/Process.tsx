import { useLanguage } from '../../hooks/useLanguage'
import { type TranslationKey } from '../../data/translations'
import './Process.css'

interface ProcessStep {
  num: string
  titleKey: TranslationKey
  descKey: TranslationKey
  image: string
}

const steps: ProcessStep[] = [
  {
    num: '01',
    titleKey: 'step_1_title',
    descKey: 'step_1_desc',
    image: '/images/process1.png',
  },
  {
    num: '02',
    titleKey: 'step_2_title',
    descKey: 'step_2_desc',
    image: '/images/process2.png',
  },
  {
    num: '03',
    titleKey: 'step_3_title',
    descKey: 'step_3_desc',
    image: '/images/process3.png',
  },
  {
    num: '04',
    titleKey: 'step_4_title',
    descKey: 'step_4_desc',
    image: '/images/process4.png',
  },
]

export function Process() {
  const { t } = useLanguage()

  return (
    <section
      className="process-section"
      id="process"
      aria-labelledby="process-title"
    >
      <div className="process-container">

        <header className="process-header">
          <p className="process-tag">
            {t('process_subtitle')}
          </p>

          <h2 className="process-title" id="process-title">
            <span>{t('process_title_first')}</span>
            <strong>{t('process_title_highlight')}</strong>
          </h2>
        </header>

        <div className="process-flow">

          {/* caminho decorativo */}
          <svg
            className="process-path"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="process-path-shadow"
              d="M40 65
                 C130 15 210 110 300 65
                 S470 20 560 65
                 S730 110 820 65
                 S990 20 1160 65"
            />

            <path
              className="process-path-line"
              d="M40 65
                 C130 15 210 110 300 65
                 S470 20 560 65
                 S730 110 820 65
                 S990 20 1160 65"
            />
          </svg>

          {steps.map((step) => (
            <article className="process-step" key={step.num}>

              <div className="process-visual">
                <span className="process-number">
                  {step.num}
                </span>

                <div className="process-image-bg" />

                <img
                  className="process-image"
                  src={step.image}
                  alt=""
                  aria-hidden="true"
                />
              </div>

              <div className="process-step-content">
                <h3>{t(step.titleKey)}</h3>
                <p>{t(step.descKey)}</p>
              </div>

            </article>
          ))}

        </div>
      </div>
    </section>
  )
}