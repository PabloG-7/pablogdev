import { useEffect, useState } from 'react'

import './new-site/styles/variables.css'
import './new-site/styles/global.css'

import Header from './new-site/components/Header/Header'
import Hero from './new-site/components/Hero/Hero'
import Services from './new-site/components/Services/Services'
import Showcase from './new-site/components/Showcase/Showcase'
import About from './new-site/components/About/About'
import Contact from './new-site/components/Contact/Contact'
import Footer from './new-site/components/Footer/Footer'
import ProjectGuide from './new-site/components/ProjectGuide/ProjectGuide'
import FloatingAI from './new-site/components/FloatingAI/FloatingAI'
import PabloGomesPage from './new-site/components/PabloGomesPage/PabloGomesPage'

import type { Language } from './new-site/types'

function getInitialLanguage(): Language {
  const savedLanguage = localStorage.getItem('pgdev-language')

  if (savedLanguage === 'pt' || savedLanguage === 'es' || savedLanguage === 'en') {
    return savedLanguage
  }

  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('es')) return 'es'
  if (browserLang.startsWith('en')) return 'en'
  return 'pt'
}

function App() {
  const path = window.location.pathname

  const isSpanishRoute = path === '/es' || path.startsWith('/es/')
  const isEnglishRoute = path === '/en' || path.startsWith('/en/')

  const [language, setLanguage] = useState<Language>(
    isSpanishRoute ? 'es' : isEnglishRoute ? 'en' : getInitialLanguage()
  )

  const [isGuideOpen, setIsGuideOpen] = useState(false)

  const currentLanguage: Language = isSpanishRoute ? 'es' : isEnglishRoute ? 'en' : language

  useEffect(() => {
    localStorage.setItem('pgdev-language', currentLanguage)
    document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : currentLanguage === 'es' ? 'es' : 'en'
  }, [currentLanguage])

  if (path === '/pablo-gomes') {
    return <PabloGomesPage language="pt" />
  }

  if (path === '/es/pablo-gomes') {
    return <PabloGomesPage language="es" />
  }

  if (path === '/en/pablo-gomes') {
    return <PabloGomesPage language="en" />
  }

  return (
    <>
      <Header
        language={currentLanguage}
        onChangeLanguage={setLanguage}
      />

      <main>
        <Hero
          language={currentLanguage}
          onOpenGuide={() => setIsGuideOpen(true)}
        />

        <Services language={currentLanguage} />

        <Showcase language={currentLanguage} />

        <About language={currentLanguage} />

        <Contact language={currentLanguage} />
      </main>

      <Footer language={currentLanguage} />

      <ProjectGuide
        language={currentLanguage}
        open={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <FloatingAI language={currentLanguage} />
    </>
  )
}

export default App