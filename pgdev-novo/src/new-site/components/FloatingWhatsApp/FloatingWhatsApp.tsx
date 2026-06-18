import './FloatingWhatsApp.css'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import type { Language } from '../../types'

type Props = {
  language: Language
}

function FloatingWhatsApp({ language }: Props) {
  const isPt = language === 'pt'
  const whatsappNumber = '5511961111894'
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const openWhatsApp = () => {
    const message = isPt
      ? 'Olá! Vim pelo site da PabloG.Dev'
      : '¡Hola! Vine por el sitio de PabloG.Dev'
    
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="floating-wpp-container"
          initial={{ opacity: 0, y: 60, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.6 }}
          transition={{ 
            type: 'spring', 
            stiffness: 500, 
            damping: 35,
            mass: 0.8
          }}
        >
          <button
            className="floating-wpp"
            onClick={openWhatsApp}
            aria-label={isPt ? 'WhatsApp' : 'WhatsApp'}
          >
            {/* Efeito de brilho giratório */}
            <div className="floating-wpp-glow"></div>
            
            {/* Ícone */}
            <FaWhatsapp />
            
            {/* Partículas mágicas */}
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingWhatsApp