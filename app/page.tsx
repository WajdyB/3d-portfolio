"use client"

import { useEffect, useRef, useState } from "react"
import { Scene } from "@/components/scene"
import { PortfolioSections } from "@/components/portfolio-sections"
import { LoadingScreen } from "@/components/loading-screen"
import { WebGLFallback } from "@/components/webgl-fallback"
import { WelcomeSection } from "@/components/welcome-section"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [webGLSupported, setWebGLSupported] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    if (!gl) {
      setWebGLSupported(false)
      setIsLoading(false)
      return
    }

    // Simulate loading time for scene initialization
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSectionChange = (section: string | null) => {
    setActiveSection(section)
  }

  if (!webGLSupported) {
    return <WebGLFallback />
  }

    return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white dark:bg-gray-900">
      {isLoading && <LoadingScreen />}
      
      <ThemeToggle />

      <div
        ref={containerRef}
        className={`w-full min-h-screen transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        {/* All content wrapped in a single dark mode container */}
        <div className="w-full">
          {/* Welcome Section */}
          <div className="w-full">
            <WelcomeSection />
          </div>

          {/* Main Content */}
          <div className="w-full h-screen">
            {/* Two-section layout */}
            <div className="flex w-full h-full">
              {/* Left section - Picture */}
              <div className="w-1/2 h-full flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600 shadow-lg">
                    <img 
                      src="/portfolio-image.jpg" 
                      alt="Wajdy Bouon" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Wajdy Bouon</h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">Full Stack Developer</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                    Passionate developer creating innovative digital experiences with modern technologies.
                  </p>
                </div>
              </div>

              {/* Right section - 3D Cube */}
              <div className="w-1/2 h-full relative">
                <Scene onSectionChange={handleSectionChange} />
                <PortfolioSections activeSection={activeSection} onClose={() => setActiveSection(null)} />
                
                {/* Instructions overlay */}
                <div className="absolute bottom-4 right-4 z-10 text-gray-600 dark:text-gray-300 text-xs opacity-75">
                  <p>Click faces to explore • Drag to rotate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
