import { useRef, useEffect } from 'react'

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

  useEffect(() => {
    // Inicializa todos os áudios
    (Object.keys(soundPaths) as SoundName[]).forEach((key) => {
      const audio = new Audio(soundPaths[key])
      audio.volume = soundVolumes[key]
      sounds.current[key] = audio
    })

    // Cleanup
    return () => {
      (Object.keys(sounds.current) as SoundName[]).forEach((key) => {
        if (sounds.current[key]) {
          sounds.current[key]!.pause()
          sounds.current[key] = null
        }
      })
    }
  }, [])

  const play = (soundName: SoundName) => {
    const audio = sounds.current[soundName]
    if (audio) {
      audio.currentTime = 0
      audio.play().catch(() => {})
    }
  }

  return { play }
}