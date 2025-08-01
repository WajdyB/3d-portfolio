"use client"

import { AlertTriangle, ExternalLink } from "lucide-react"

export function WebGLFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-6" />

          <h1 className="text-3xl font-bold text-white mb-4">WebGL Not Supported</h1>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Your browser doesn't support WebGL, which is required for the 3D portfolio experience. Please try using a
            modern browser like Chrome, Firefox, Safari, or Edge.
          </p>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Alternative Portfolio Links</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="https://github.com/johndoe"
                className="flex items-center justify-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <ExternalLink size={20} />
                GitHub Profile
              </a>

              <a
                href="https://linkedin.com/in/johndoe"
                className="flex items-center justify-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <ExternalLink size={20} />
                LinkedIn Profile
              </a>

              <a
                href="mailto:john@example.com"
                className="flex items-center justify-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <ExternalLink size={20} />
                Email Contact
              </a>

              <a
                href="/resume.pdf"
                className="flex items-center justify-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
              >
                <ExternalLink size={20} />
                Download Resume
              </a>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Browser Recommendations</h3>
            <p className="text-sm text-gray-300">
              For the best experience, please use Chrome 51+, Firefox 53+, Safari 10+, or Edge 79+
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
