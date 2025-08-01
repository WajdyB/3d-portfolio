"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { gsap } from "gsap"

interface SceneProps {
  onSectionChange: (section: string | null) => void
}

export function Scene({ onSectionChange }: SceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | undefined>(undefined)
  const rendererRef = useRef<THREE.WebGLRenderer | undefined>(undefined)
  const cameraRef = useRef<THREE.PerspectiveCamera | undefined>(undefined)
  const controlsRef = useRef<OrbitControls | undefined>(undefined)
  const cubeRef = useRef<THREE.Group | undefined>(undefined)
  const raycasterRef = useRef<THREE.Raycaster | undefined>(undefined)
  const mouseRef = useRef<THREE.Vector2 | undefined>(undefined)

  const sections = [
    { name: "About", color: "#3b82f6", position: [0, 0, 1] },
    { name: "Projects", color: "#10b981", position: [1, 0, 0] },
    { name: "Skills", color: "#f59e0b", position: [0, 0, -1] },
    { name: "Contact", color: "#ef4444", position: [-1, 0, 0] },
    { name: "Social Life", color: "#60a5fa", position: [0, 1, 0] },
    { name: "Resume", color: "#06b6d4", position: [0, -1, 0] },
  ]

  // Create 3D text geometry
  const create3DText = (text: string, size: number = 0.5) => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")!
    canvas.width = 512
    canvas.height = 128

    // Create gradient background
    const gradient = context.createLinearGradient(0, 0, 0, 128)
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)")
    gradient.addColorStop(1, "rgba(59, 130, 246, 0.4)")
    context.fillStyle = gradient
    context.fillRect(0, 0, 512, 128)

    // Add text with shadow
    context.shadowColor = "rgba(0, 0, 0, 0.5)"
    context.shadowBlur = 10
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.fillStyle = "white"
    context.font = `bold ${size * 100}px Arial`
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.fillText(text, 256, 64)

    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const geometry = new THREE.PlaneGeometry(size * 4, size)
    const mesh = new THREE.Mesh(geometry, material)
    return mesh
  }

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x1a1a2e, 10, 50)
    sceneRef.current = scene

    // Camera setup
    const container = mountRef.current
    const rect = container.getBoundingClientRect()
    const camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000)
    camera.position.set(10, 7, 7)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    
    renderer.setSize(rect.width, rect.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    rendererRef.current = renderer

    mountRef.current.appendChild(renderer.domElement)

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.enablePan = false
    controls.maxDistance = 8
    controls.minDistance = 2
    controlsRef.current = controls

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0x93c5fd, 0.8, 20)
    pointLight.position.set(-5, 5, -5)
    scene.add(pointLight)

    // Create cube group
    const cubeGroup = new THREE.Group()
    cubeGroup.position.set(0, 0, 0)
    cubeRef.current = cubeGroup
    scene.add(cubeGroup)

    // Create cube faces
    const geometry = new THREE.PlaneGeometry(3.8, 3.8)
    const faces: THREE.Mesh[] = []

    sections.forEach((section, index) => {
      // Create face material
      const material = new THREE.MeshLambertMaterial({
        color: section.color,
        transparent: true,
        opacity: 0.8,
      })

      const face = new THREE.Mesh(geometry, material)

      // Position faces
      const [x, y, z] = section.position
      face.position.set(x * 2.0, y * 2.0, z * 2.0)

      // Rotate faces to face outward
      if (x !== 0) face.rotation.y = x > 0 ? Math.PI / 2 : -Math.PI / 2
      if (y !== 0) face.rotation.x = y > 0 ? -Math.PI / 2 : Math.PI / 2
      if (z < 0) face.rotation.y = Math.PI

      face.userData = { section: section.name, originalColor: section.color }
      faces.push(face)
      cubeGroup.add(face)

      // Add text
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")!
      canvas.width = 256
      canvas.height = 256

      context.fillStyle = "white"
      context.font = "bold 32px Arial"
      context.textAlign = "center"
      context.textBaseline = "middle"
      context.fillText(section.name, 128, 128)

      const textTexture = new THREE.CanvasTexture(canvas)
      const textMaterial = new THREE.MeshBasicMaterial({
        map: textTexture,
        transparent: true,
      })

      const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 3.6), textMaterial)
      textMesh.position.copy(face.position)
      textMesh.rotation.copy(face.rotation)
      
      // Calculate normal vector based on face rotation
      const normal = new THREE.Vector3(0, 0, 1)
      normal.applyQuaternion(face.quaternion)
      textMesh.position.add(normal.multiplyScalar(0.01))

      cubeGroup.add(textMesh)
    })

    // Create wireframe cube
    const wireframeGeometry = new THREE.BoxGeometry(4.0, 4.0, 4.0)
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x444444,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const wireframeCube = new THREE.Mesh(wireframeGeometry, wireframeMaterial)
    cubeGroup.add(wireframeCube)

    // Create floating particles around the sphere
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 50
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 3 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 2

      posArray[i] = radius * Math.sin(theta) * Math.cos(phi)
      posArray[i + 1] = radius * Math.sin(theta) * Math.sin(phi)
      posArray[i + 2] = radius * Math.cos(theta)
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.8,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    cubeGroup.add(particlesMesh)

    // Store references for animation
    const particlesMeshRef = particlesMesh

    // Raycaster setup
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    raycasterRef.current = raycaster
    mouseRef.current = mouse

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      const container = mountRef.current
      if (!container) return
      
      const rect = container.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(faces)

      // Reset all faces
      faces.forEach((face) => {
        gsap.to(face.material, {
          opacity: 0.8,
          duration: 0.3,
        })
        gsap.to(face.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.3,
        })
      })

      // Highlight hovered face
      if (intersects.length > 0) {
        const hoveredFace = intersects[0].object as THREE.Mesh
        gsap.to(hoveredFace.material, {
          opacity: 1,
          duration: 0.3,
        })
        gsap.to(hoveredFace.scale, {
          x: 1.1,
          y: 1.1,
          z: 1.1,
          duration: 0.3,
        })
        document.body.style.cursor = "pointer"
      } else {
        document.body.style.cursor = "default"
      }
    }

    const handleClick = (event: MouseEvent) => {
      const container = mountRef.current
      if (!container) return
      
      const rect = container.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(faces)

      if (intersects.length > 0) {
        const clickedFace = intersects[0].object as THREE.Mesh
        const sectionName = clickedFace.userData.section

        // Animate face click
        gsap.to(clickedFace.scale, {
          x: 0.9,
          y: 0.9,
          z: 0.9,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        })

        // Trigger section change
        onSectionChange(sectionName)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Gentle rotation
      if (cubeGroup) {
        cubeGroup.rotation.y += 0.005
        cubeGroup.rotation.x += 0.002
      }

      // Animate particles
      if (particlesMeshRef) {
        particlesMeshRef.rotation.y += 0.002
        particlesMeshRef.rotation.x += 0.001
      }

      controls.update()
      renderer.render(scene, camera)
    }

    // Handle resize
    const handleResize = () => {
      const container = mountRef.current
      if (!container) return
      
      const rect = container.getBoundingClientRect()
      camera.aspect = rect.width / rect.height
      camera.updateProjectionMatrix()
      renderer.setSize(rect.width, rect.height)
    }

    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    // Entrance animation
    gsap.fromTo(cubeGroup.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 1.5, ease: "back.out(1.7)" })

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("resize", handleResize)

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }

      renderer.dispose()
      controls.dispose()
    }
  }, [onSectionChange])

  return <div ref={mountRef} className="w-full h-full" />
}
