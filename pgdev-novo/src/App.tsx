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

import type { Language } from './new-site/types'

function getInitialLanguage(): Language {
  const savedLanguage = localStorage.getItem('pgdev-language')

  if (savedLanguage === 'pt' || savedLanguage === 'es') {
    return savedLanguage
  }

  return 'pt'
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem('pgdev-language', language)
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'es'
  }, [language])

  return (
    <>
      <Header language={language} onChangeLanguage={setLanguage} />
      <main>
        <Hero language={language} />
        <ProcessBanner />
        <Services language={language} />
        <Projects language={language} />
        <About language={language} />
        <Contact language={language} />
      </main>
      <Footer language={language} />
      <ProjectGuide language={language} />
    </>
  )
}

export default App