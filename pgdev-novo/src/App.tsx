import { useEffect, useState } from 'react'

import './new-site/styles/variables.css'
import './new-site/styles/global.css'

import Header from './new-site/components/Header/Header'
import Hero from './new-site/components/Hero/Hero'
import ProcessBanner from './new-site/components/ProcessBanner/ProcessBanner'
import Services from './new-site/components/Services/Services'
import Projects from './new-site/components/Projects/Projects'
import About from './new-site/components/About/About'
import Contact from './new-site/components/Contact/Contact'
import Footer from './new-site/components/Footer/Footer'
import ProjectGuide from './new-site/components/ProjectGuide/ProjectGuide'

import BookingDemo from './new-site/components/BookingDemo/BookingDemo'
import PabloGomesPage from './new-site/components/PabloGomesPage/PabloGomesPage'

import type { Language } from './new-site/types'

function getInitialLanguage(): Language {
  const savedLanguage = localStorage.getItem('pgdev-language')

  if (savedLanguage === 'pt' || savedLanguage === 'es') {
    return savedLanguage
  }

  const browserLang = navigator.language.toLowerCase()

  if (browserLang.startsWith('es')) {
    return 'es'
  }

  return 'pt'
}

function App() {
  const path = window.location.pathname
  const isSpanishRoute = path === '/es' || path.startsWith('/es/')

  const [language, setLanguage] = useState<Language>(
    isSpanishRoute ? 'es' : getInitialLanguage
  )

  const currentLanguage: Language = isSpanishRoute ? 'es' : language

  useEffect(() => {
    localStorage.setItem('pgdev-language', currentLanguage)
    document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : 'es'
  }, [currentLanguage])

  if (path === '/demo-barbearia') {
    return <BookingDemo type="barbearia" language={language} />
  }

  if (path === '/demo-clinica') {
    return <BookingDemo type="clinica" language={language} />
  }

  if (path === '/demo-petshop') {
    return <BookingDemo type="petshop" language={language} />
  }

  if (path === '/pablo-gomes') return <PabloGomesPage language="pt" />
  if (path === '/es/pablo-gomes') return <PabloGomesPage language="es" />

  return (
    <>
      <Header language={currentLanguage} onChangeLanguage={setLanguage} />
      <main>
        <Hero language={currentLanguage} />
        <ProcessBanner language={currentLanguage} />
        <Services language={currentLanguage} />
        <Projects language={currentLanguage} />
        <About language={currentLanguage} />
        <Contact language={currentLanguage} />
      </main>
      <Footer language={currentLanguage} />
      <ProjectGuide language={currentLanguage} />
    </>
  )
}

export default App