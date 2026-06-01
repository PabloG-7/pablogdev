import { useEffect, useState } from 'react'

import './new-site/styles/variables.css'
import './new-site/styles/global.css'

import Header from './new-site/components/Header/Header'
import Hero from './new-site/components/Hero/Hero'
import ProcessBanner from './new-site/components/ProcessBanner/ProcessBanner'
import Services from './new-site/components/Services/Services'
import Showcase from './new-site/components/Showcase/Showcase'
import About from './new-site/components/About/About'
import Contact from './new-site/components/Contact/Contact'
import Footer from './new-site/components/Footer/Footer'
import ProjectGuide from './new-site/components/ProjectGuide/ProjectGuide'
import FloatingWhatsApp from './new-site/components/FloatingWhatsApp/FloatingWhatsApp'
import BookingDemo from './new-site/components/BookingDemo/BookingDemo'
import PabloGomesPage from './new-site/components/PabloGomesPage/PabloGomesPage'

import type { Language } from './new-site/types'

function getInitialLanguage(): Language {
  const savedLanguage = localStorage.getItem('pgdev-language')

  if (savedLanguage === 'pt' || savedLanguage === 'es') {
    return savedLanguage
  }

  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'pt'
}

function App() {
  const path = window.location.pathname

  const isSpanishRoute = path === '/es' || path.startsWith('/es/')
  const [language, setLanguage] = useState<Language>(
    isSpanishRoute ? 'es' : getInitialLanguage()
  )
  const [isGuideOpen, setIsGuideOpen] = useState(false)

  const currentLanguage: Language = isSpanishRoute ? 'es' : language

  useEffect(() => {
    localStorage.setItem('pgdev-language', currentLanguage)
    document.documentElement.lang = currentLanguage === 'pt' ? 'pt-BR' : 'es'
  }, [currentLanguage])

  if (path === '/demo-barbearia') {
    return <BookingDemo type="barbearia" language={currentLanguage} />
  }

  if (path === '/demo-clinica') {
    return <BookingDemo type="clinica" language={currentLanguage} />
  }

  if (path === '/demo-petshop') {
    return <BookingDemo type="petshop" language={currentLanguage} />
  }

  if (path === '/pablo-gomes') {
    return <PabloGomesPage language="pt" />
  }

  if (path === '/es/pablo-gomes') {
    return <PabloGomesPage language="es" />
  }

  return (
    <>
      <Header language={currentLanguage} onChangeLanguage={setLanguage} />

      <main>
        <Hero language={currentLanguage} onOpenGuide={() => setIsGuideOpen(true)} />
        <ProcessBanner language={currentLanguage} />
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

      <FloatingWhatsApp language={currentLanguage} />
    </>
  )
}

export default App