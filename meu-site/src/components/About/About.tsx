import { useEffect, useRef } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import './About.css'

export function About() {
  const { t, lang } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const animationRef = useRef<number | null>(null)

  // Mensagem dinâmica conforme o idioma
  const getWhatsAppMessage = () => {
    const messages = {
      pt: 'Olá! Vim pelo site e gostaria de mais informações.',
      es: '¡Hola! Vine por el sitio y me gustaría obtener más información.',
      en: 'Hello! I came through the website and would like more information.'
    }
    return messages[lang] || messages.pt
  }

  // Link direto para o WhatsApp
  const whatsappLink = `https://wa.me/5511961111894?text=${encodeURIComponent(getWhatsAppMessage())}`

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Configuração da cena
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.set(0, 1.5, 3.5)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false
    })

    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    rendererRef.current = renderer

    container.appendChild(renderer.domElement)

    // Luzes
    const ambient = new THREE.AmbientLight(0xffffff, 2)
    scene.add(ambient)

    const directional = new THREE.DirectionalLight(0xffffff, 3)
    directional.position.set(5, 5, 5)
    scene.add(directional)

    // Loader do modelo 3D
    const loader = new GLTFLoader()
    let mixer: THREE.AnimationMixer | null = null
    let clock = new THREE.Clock()

    loader.load(
      '/models/Untitled.glb',
      (gltf) => {
        const model = gltf.scene
        model.scale.set(5, 5, 5)
        model.position.set(0, -4, 0)
        scene.add(model)

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model)
          const action = mixer.clipAction(gltf.animations[0])
          action.play()
        }
      },
      undefined,
      (error) => {
        console.error('Erro ao carregar o modelo 3D:', error)
        container.innerHTML = `
          <div style="display:flex; align-items:center; justify-content:center; width:100%; height:100%; color:var(--text-muted); font-size:14px; text-align:center; padding:20px;">
            ⚠️ Modelo 3D não encontrado.<br>
            Coloque o arquivo <strong>Untitled.glb</strong><br>
            na pasta <strong>public/models/</strong>
          </div>
        `
      }
    )

    // Loop de animação
    function animate() {
      animationRef.current = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      if (mixer) {
        mixer.update(delta)
      }
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (container) {
        const canvas = container.querySelector('canvas')
        if (canvas) {
          container.removeChild(canvas)
        }
      }
      renderer.dispose()
    }
  }, [])

  return (
    <section className="about-section">
      <div className="about-container container">
        <div className="about-content">
          <div className="about-tag">
            <span className="about-tag-bracket">[</span>
            {t('about_subtitle')}
            <span className="about-tag-bracket">]</span>
          </div>

          <h2 className="about-title">
            Pablo<span className="gold-g">G</span>.Dev
          </h2>

          <div className="about-underline"></div>

          <p 
            className="about-text" 
            dangerouslySetInnerHTML={{ __html: t('about_desc_1') }}
          />

          <p 
            className="about-text" 
            dangerouslySetInnerHTML={{ __html: t('about_desc_2') }}
          />

          <div className="about-divider"></div>

          <div className="about-services">
            <div className="about-service">
              <span className="about-service-num">01</span>
              <span className="about-service-text">{t('about_service_1')}</span>
            </div>
            <div className="about-service">
              <span className="about-service-num">02</span>
              <span className="about-service-text">{t('about_service_2')}</span>
            </div>
            <div className="about-service">
              <span className="about-service-num">03</span>
              <span className="about-service-text">{t('about_service_3')}</span>
            </div>
          </div>

          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="about-cta"
          >
            {t('about_cta')}
          </a>
        </div>

        <div className="about-visual">
          <div className="about-3d-wrapper">
            <div className="about-3d-bg-logo">
              <img src="images/logo.png" alt="PabloG.Dev Logo" />
            </div>
            <div id="about-model" ref={containerRef}></div>
          </div>
        </div>
      </div>
    </section>
  )
}