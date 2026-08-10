import { Navbar } from './components/Navbar/Navbar'
import { Hero } from './components/Hero/Hero'
import { Services } from './components/Services/Services'
import { Showcase } from './components/Showcase/Showcase'
import { About } from './components/About/About'
import { Process } from './components/Process/Process'
import { FAQ } from './components/FAQ/FAQ'
import { Footer } from './components/Footer/Footer'
import { useAudio } from './hooks/useAudio'

import './styles/global.css'
import './styles/variables.css'

function App() {
  const { play } = useAudio()

  const scrollToFooter = () => {
    play('confirm')

    const footer = document.querySelector('.footer')

    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <Navbar onContactClick={scrollToFooter} />

      <section id="home">
        <Hero />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="showcase">
        <Showcase />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="process">
        <Process />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <Footer />
    </>
  )
}

export default App