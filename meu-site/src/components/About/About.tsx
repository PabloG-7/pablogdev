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

  const getWhatsAppMessage = () => {
    const messages = {
      pt: 'Olá! Vim pelo site e gostaria de mais informações.',
      es: '¡Hola! Vine por el sitio y me gustaría obtener más información.',
      en: 'Hello! I came through the website and would like more information.'
    }

    return messages[lang as keyof typeof messages] || messages.pt
  }

  const whatsappLink = `https://wa.me/5511961111894?text=${encodeURIComponent(
    getWhatsAppMessage()
  )}`

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    let disposed = false
    let model: THREE.Object3D | null = null
    let mixer: THREE.AnimationMixer | null = null

    // Detecta celulares/tablets
    const isMobile =
      window.innerWidth <= 768 ||
      navigator.maxTouchPoints > 0

    // ==============================
    // CENA
    // ==============================

    const scene = new THREE.Scene()
    sceneRef.current = scene

    // ==============================
    // CAMERA
    // ==============================

    const width = Math.max(container.clientWidth, 1)
    const height = Math.max(container.clientHeight, 1)

    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      1000
    )

    camera.position.set(0, 1.5, 3.5)
    camera.lookAt(0, 0, 0)

    cameraRef.current = camera

    // ==============================
    // RENDERER
    // ==============================

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
      stencil: false,
      depth: true
    })

    /*
     * No celular usamos 1x.
     * Isso reduz bastante o uso de memória/GPU
     * principalmente em iPhones com tela Retina.
     */
    const pixelRatio = isMobile
      ? 1
      : Math.min(window.devicePixelRatio, 1.5)

    renderer.setPixelRatio(pixelRatio)
    renderer.setSize(width, height, false)

    rendererRef.current = renderer

    container.appendChild(renderer.domElement)

    // ==============================
    // LUZES
    // ==============================

    const ambient = new THREE.AmbientLight(0xffffff, 2)
    scene.add(ambient)

    const directional = new THREE.DirectionalLight(0xffffff, 3)
    directional.position.set(5, 5, 5)
    scene.add(directional)

    // ==============================
    // LOADER
    // ==============================

    const loader = new GLTFLoader()

    loader.load(
      '/models/Untitled.glb',

      (gltf) => {
        // Se o componente já foi desmontado,
        // não adicionamos o modelo.
        if (disposed) {
          disposeObject(gltf.scene)
          return
        }

        model = gltf.scene

        model.scale.set(5, 5, 5)
        model.position.set(0, -4, 0)

        scene.add(model)

        // ==============================
        // ANIMAÇÃO DO GLB
        // ==============================

        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model)

          const action = mixer.clipAction(
            gltf.animations[0]
          )

          action.play()
        }
      },

      undefined,

      (error) => {
        if (disposed) return

        console.error(
          'Erro ao carregar o modelo 3D:',
          error
        )

        container.innerHTML = `
          <div
            style="
              display:flex;
              align-items:center;
              justify-content:center;
              width:100%;
              height:100%;
              color:var(--text-muted);
              font-size:14px;
              text-align:center;
              padding:20px;
            "
          >
            ⚠️ Modelo 3D não encontrado.
          </div>
        `
      }
    )

    // ==============================
    // TIMER
    // ==============================

    const timer = new THREE.Timer()

    // ==============================
    // ANIMAÇÃO
    // ==============================

    function animate() {
      if (disposed) return

      animationRef.current =
        requestAnimationFrame(animate)

      timer.update()

      const delta = timer.getDelta()

      if (mixer) {
        mixer.update(delta)
      }

      renderer.render(scene, camera)
    }

    animate()

    // ==============================
    // RESIZE
    // ==============================

    const handleResize = () => {
      if (disposed) return

      const newWidth = Math.max(
        container.clientWidth,
        1
      )

      const newHeight = Math.max(
        container.clientHeight,
        1
      )

      camera.aspect = newWidth / newHeight

      camera.updateProjectionMatrix()

      renderer.setSize(
        newWidth,
        newHeight,
        false
      )
    }

    window.addEventListener(
      'resize',
      handleResize
    )

    // ==============================
    // CLEANUP
    // ==============================

    return () => {
      disposed = true

      window.removeEventListener(
        'resize',
        handleResize
      )

      if (animationRef.current !== null) {
        cancelAnimationFrame(
          animationRef.current
        )
      }

      mixer?.stopAllAction()

      if (model) {
        scene.remove(model)
        disposeObject(model)
      }

      renderer.dispose()

      renderer.domElement.remove()

      rendererRef.current = null
      cameraRef.current = null
      sceneRef.current = null
    }

    // ==============================
    // LIBERA RECURSOS DO GLB
    // ==============================

    function disposeObject(
      object: THREE.Object3D
    ) {
      object.traverse((child) => {
        const mesh = child as THREE.Mesh

        if (mesh.geometry) {
          mesh.geometry.dispose()
        }

        if (mesh.material) {
          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material]

          materials.forEach((material) => {
            material.dispose()

            Object.values(material).forEach(
              (value) => {
                if (
                  value &&
                  typeof value === 'object' &&
                  'isTexture' in value
                ) {
                  ;(value as THREE.Texture).dispose()
                }
              }
            )
          })
        }
      })
    }
  }, [])

  return (
    <section className="about-section">

      <div className="about-container container">

        <div className="about-content">

          <div className="about-tag">
            <span className="about-tag-bracket">
              [
            </span>

            {t('about_subtitle')}

            <span className="about-tag-bracket">
              ]
            </span>
          </div>

          <h2 className="about-title">
            Pablo
            <span className="gold-g">G</span>
            .Dev
          </h2>

          <div className="about-underline"></div>

          <p
            className="about-text"
            dangerouslySetInnerHTML={{
              __html: t('about_desc_1')
            }}
          />

          <p
            className="about-text"
            dangerouslySetInnerHTML={{
              __html: t('about_desc_2')
            }}
          />

          <div className="about-divider"></div>

          <div className="about-services">

            <div className="about-service">
              <span className="about-service-num">
                01
              </span>

              <span className="about-service-text">
                {t('about_service_1')}
              </span>
            </div>

            <div className="about-service">
              <span className="about-service-num">
                02
              </span>

              <span className="about-service-text">
                {t('about_service_2')}
              </span>
            </div>

            <div className="about-service">
              <span className="about-service-num">
                03
              </span>

              <span className="about-service-text">
                {t('about_service_3')}
              </span>
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
              <img
                src="/images/logo.png"
                alt="PabloG.Dev Logo"
              />
            </div>

            <div
              id="about-model"
              ref={containerRef}
            />

          </div>

        </div>

      </div>

    </section>
  )
}