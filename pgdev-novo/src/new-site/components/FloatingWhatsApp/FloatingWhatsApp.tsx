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

  // Botão inteligente: some ao descer, aparece ao subir
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
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          {/* Botão principal com efeito glass */}
          <motion.button
            className="floating-wpp"
            onClick={openWhatsApp}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            aria-label={isPt ? 'WhatsApp' : 'WhatsApp'}
          >
            {/* Efeito de brilho */}
            <div className="floating-wpp-glow"></div>
            
            {/* Ícone */}
            <FaWhatsapp />
            
            {/* Partículas (opcional) */}
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingWhatsApp