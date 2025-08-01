"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { gsap } from "gsap"

export function WelcomeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | undefined>(undefined)
  const rendererRef = useRef<THREE.WebGLRenderer | undefined>(undefined)
  const cameraRef = useRef<THREE.PerspectiveCamera | undefined>(undefined)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 100, 0.1, 1000)
    camera.position.set(0, 0, 5)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, 100)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    containerRef.current.appendChild(renderer.domElement)

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 100
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.8,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Create animated text geometry
    const createTextMesh = (text: string, y: number) => {
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")!
      canvas.width = 512
      canvas.height = 128

      context.fillStyle = "white"
      context.font = "bold 48px Arial"
      context.textAlign = "center"
      context.textBaseline = "middle"
      context.fillText(text, 256, 64)

      const texture = new THREE.CanvasTexture(canvas)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
      })

      const geometry = new THREE.PlaneGeometry(4, 1)
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(0, y, 0)
      scene.add(mesh)

      return mesh
    }

    const welcomeMesh = createTextMesh("Welcome to", 1.0)
    const portfolioMesh = createTextMesh("My Portfolio", 0.0)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate particles
      particlesMesh.rotation.y += 0.002
      particlesMesh.rotation.x += 0.001

      // Animate text entrance
      gsap.to(welcomeMesh.material, { opacity: 1, duration: 2, delay: 0.5 })
      gsap.to(portfolioMesh.material, { opacity: 1, duration: 2, delay: 1.5 })

      // Floating animation
      gsap.to(welcomeMesh.position, { y: 1.0 + Math.sin(Date.now() * 0.001) * 0.1, duration: 0.1 })
      gsap.to(portfolioMesh.position, { y: 0.0 + Math.sin(Date.now() * 0.001 + 1) * 0.1, duration: 0.1 })

      renderer.render(scene, camera)
    }

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / 100
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, 100)
    }

    window.addEventListener("resize", handleResize)
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-[100px] overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Overlay text for better readability */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center space-y-0">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 opacity-90">
            Welcome to
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 opacity-90">
            My Portfolio
          </h2>
        </div>
      </div>
    </div>
  )
} 