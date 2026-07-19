import { useEffect, useState } from 'react'

import './new-site/styles/variables.css'
import './new-site/styles/global.css'

import Header from './new-site/components/Header/Header'
import Hero from './new-site/components/Hero/Hero'
import Services from './new-site/components/Services/Services'
import Showcase from './new-site/components/Showcase/Showcase'
import Process from './new-site/components/Process/Process'
import FAQ from './new-site/components/FAQ/FAQ'
import About from './new-site/components/About/About'
import Contact from './new-site/components/Contact/Contact'
import Footer from './new-site/components/Footer/Footer'
import ProjectGuide from './new-site/components/ProjectGuide/ProjectGuide'
import FloatingAI from './new-site/components/FloatingAI/FloatingAI'
import PabloGomesPage from './new-site/components/PabloGomesPage/PabloGomesPage'

import type { Language } from './new-site/types'

function App() {
  const path = window.location.pathname

  const currentLanguage: Language =
    path === '/es' || path.startsWith('/es/')
      ? 'es'
      : path === '/en' || path.startsWith('/en/')
      ? 'en'
      : 'pt'

  const [isGuideOpen, setIsGuideOpen] = useState(false)

  useEffect(() => {
  document.documentElement.lang =
    currentLanguage === 'pt'
      ? 'pt-BR'
      : currentLanguage === 'es'
      ? 'es'
      : 'en'
}, [currentLanguage])

  // Página exclusiva Pablo Gomes
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
      <Header language={currentLanguage} />

      <main>
        <Hero
          language={currentLanguage}
          onOpenGuide={() => setIsGuideOpen(true)}
        />

        <Services language={currentLanguage} />

        <Showcase language={currentLanguage} />

        <Process language={currentLanguage} />

        <FAQ language={currentLanguage} />

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