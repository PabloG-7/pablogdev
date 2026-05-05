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

// Função melhorada para detectar idioma baseado no navegador
function getInitialLanguage(): Language {
  // 1. Verifica se já existe idioma salvo no localStorage
  const savedLanguage = localStorage.getItem('pgdev-language')
  
  if (savedLanguage === 'pt' || savedLanguage === 'es') {
    return savedLanguage
  }

  // 2. Detecta idioma do navegador
  const browserLang = navigator.language.toLowerCase()
  
  // 3. Se for espanhol (de qualquer país: es, es-ES, es-MX, es-AR, etc.)
  if (browserLang.startsWith('es')) {
    return 'es'
  }

  // 4. Padrão: português (Brasil e Portugal)
  return 'pt'
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem('pgdev-language', language)
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'es'
  }, [language])

  const path = window.location.pathname

  if (path === '/demo-barbearia') {
    return <BookingDemo type="barbearia" />
  }

  if (path === '/demo-clinica') {
    return <BookingDemo type="clinica" />
  }

  if (path === '/demo-petshop') {
    return <BookingDemo type="petshop" />
  }

  if (path === '/pablo-gomes') {
    return <PabloGomesPage language={language} />
  }

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