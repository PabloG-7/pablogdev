import { useRef, useEffect, useCallback } from 'react'

type SoundName = 'click' | 'switch' | 'confirm'

const soundPaths: Record<SoundName, string> = {
  click: '/sounds/click.mp3',
  switch: '/sounds/switch.mp3',
  confirm: '/sounds/confirm.mp3'
}

const soundVolumes: Record<SoundName, number> = {
  click: 0.15,
  switch: 0.15,
  confirm: 0.18
}

export function useAudio() {
  const sounds = useRef<Record<SoundName, HTMLAudioElement | null>>({
    click: null,
    switch: null,
    confirm: null
  })

  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return

    initialized.current = true

    ;(Object.keys(soundPaths) as SoundName[]).forEach((key) => {
      const audio = new Audio()

      audio.src = soundPaths[key]
      audio.preload = 'auto'
      audio.volume = soundVolumes[key]
      audio.load()

      sounds.current[key] = audio
    })

    return () => {
      ;(Object.keys(sounds.current) as SoundName[]).forEach((key) => {
        const audio = sounds.current[key]

        if (audio) {
          audio.pause()
          audio.removeAttribute('src')
          audio.load()
          sounds.current[key] = null
        }
      })

      initialized.current = false
    }
  }, [])

  const play = useCallback((soundName: SoundName) => {
    const audio = sounds.current[soundName]

    if (!audio) return

    audio.currentTime = 0

    const promise = audio.play()

    if (promise !== undefined) {
      promise.catch(() => {})
    }
  }, [])

  return { play }
}