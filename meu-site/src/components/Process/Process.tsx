import type { ReactNode } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { type TranslationKey } from '../../data/translations'
import './Process.css'

interface ProcessStep {
  icon: ReactNode
  num: string
  titleKey: TranslationKey
  descKey: TranslationKey
}

const steps: ProcessStep[] = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01" />
        <path d="M12 10h.01" />
        <path d="M16 10h.01" />
      </svg>
    ),
    num: '01',
    titleKey: 'step_1_title',
    descKey: 'step_1_desc',
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M6 10h12" />
        <path d="M6 7h12" />
      </svg>
    ),
    num: '02',
    titleKey: 'step_2_title',
    descKey: 'step_2_desc',
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    num: '03',
    titleKey: 'step_3_title',
    descKey: 'step_3_desc',
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    num: '04',
    titleKey: 'step_4_title',
    descKey: 'step_4_desc',
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
      <div className="container">
        <header className="process-header">
          <div className="process-left">
            <p className="process-tag">
              {t('process_subtitle')}
            </p>

            <h2
              className="process-title"
              id="process-title"
            >
              {t('process_title')}
            </h2>

            <p className="process-desc">
              {t('process_desc')}
            </p>
          </div>
        </header>

        <div className="process-steps-wrapper">
          {steps.map((step) => (
            <article
              className="step-item"
              key={step.num}
            >
              <div className="step-circle">
                {step.icon}
              </div>

              <span className="step-num">
                {step.num}
              </span>

              <h3>
                {t(step.titleKey)}
              </h3>

              <p>
                {t(step.descKey)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}