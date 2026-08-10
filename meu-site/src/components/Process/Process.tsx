import { useLanguage } from '../../hooks/useLanguage'
import { type TranslationKey } from '../../data/translations'
import './Process.css'

interface ProcessStep {
  icon: string
  num: string
  titleKey: TranslationKey
  descKey: TranslationKey
}

export function Process() {
  const { t } = useLanguage()

  const steps: ProcessStep[] = [
    { 
      icon: '💬', 
      num: '01', 
      titleKey: 'step_1_title', 
      descKey: 'step_1_desc' 
    },
    { 
      icon: '📝', 
      num: '02', 
      titleKey: 'step_2_title', 
      descKey: 'step_2_desc' 
    },
    { 
      icon: '🎨', 
      num: '03', 
      titleKey: 'step_3_title', 
      descKey: 'step_3_desc' 
    },
    { 
      icon: '⚙️', 
      num: '04', 
      titleKey: 'step_4_title', 
      descKey: 'step_4_desc' 
    }
  ]

  return (
    <section className="process-section">
      <div className="process-container container">
        <div className="process-header">
          <div className="process-left">
            <h3>{t('process_subtitle')}</h3>
            <h2>{t('process_title')}</h2>
          </div>
          <div className="process-right">
            {t('process_desc')}
          </div>
        </div>

        <div className="process-steps-wrapper">
          {steps.map((step, index) => (
            <div className="step-item" key={index}>
              <div className="step-circle">{step.icon}</div>
              <span className="step-num">{step.num}</span>
              <h4>{t(step.titleKey)}</h4>
              <p>{t(step.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}