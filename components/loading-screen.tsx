"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cubeRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !cubeRef.current || !textRef.current) return

    // Animate loading cube
    gsap.to(cubeRef.current, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: "none",
    })

    // Animate text
    gsap.fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 })

    // Pulse animation
    gsap.to(cubeRef.current, {
      scale: 1.1,
      duration: 1,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <div
          ref={cubeRef}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-lg mx-auto mb-8"
        />
        <div ref={textRef} className="text-gray-800 dark:text-gray-200">
          <h2 className="text-2xl font-bold mb-2">Loading Portfolio</h2>
          <p className="text-gray-600 dark:text-gray-400">Initializing 3D experience...</p>
        </div>
      </div>
    </div>
  )
}
