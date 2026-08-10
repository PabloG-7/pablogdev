import { useState, useEffect, useCallback, useRef } from 'react'

export function useHeroSlider(imageCount: number, intervalMs: number = 4000) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const showImage = useCallback((index: number) => {
    if (index === currentIndex) return
    
    // Adiciona fade-out na imagem atual
    setIsTransitioning(true)
    
    // Troca a imagem após o fade-out
    timeoutRef.current = window.setTimeout(() => {
      setCurrentIndex(index)
      // Remove fade-out após a transição
      setTimeout(() => {
        setIsTransitioning(false)
      }, 100)
    }, 600) // Tempo do fade-out
  }, [currentIndex])

  const nextImage = useCallback(() => {
    const nextIndex = (currentIndex + 1) % imageCount
    showImage(nextIndex)
  }, [currentIndex, imageCount, showImage])

  const startSlider = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = window.setInterval(nextImage, intervalMs)
  }, [nextImage, intervalMs])

  const stopSlider = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const goToImage = useCallback((index: number) => {
    stopSlider()
    showImage(index)
    setTimeout(startSlider, 100)
  }, [showImage, stopSlider, startSlider])

  useEffect(() => {
    startSlider()
    return stopSlider
  }, [startSlider, stopSlider])

  return {
    currentIndex,
    isTransitioning,
    goToImage,
    startSlider,
    stopSlider,
  }
}