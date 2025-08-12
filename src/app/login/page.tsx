'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff,
  Sparkles,
  Shield,
  Zap,
  Globe
} from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  // Animated background particles
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 5 + 's'
      particle.style.animationDuration = 15 + Math.random() * 10 + 's'
      
      const bgAnimation = document.querySelector('.bg-animation')
      if (bgAnimation) {
        bgAnimation.appendChild(particle)
        setTimeout(() => particle.remove(), 25000)
      }
    }

    const interval = setInterval(createParticle, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al iniciar sesión')
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Animated Background */}
      <div className="bg-animation absolute inset-0">
        {/* Initial particles */}
        <div className="particle absolute w-2 h-2 bg-slate-400/20 rounded-full" />
        <div className="particle absolute w-3 h-3 bg-slate-400/10 rounded-full" />
        <div className="particle absolute w-2 h-2 bg-slate-400/15 rounded-full" />
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Content */}
      <div className="relative min-h-screen flex">
        {/* Left Panel - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-3xl font-bold text-white">H</span>
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-slate-700">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Bienvenido de vuelta</h1>
                <p className="text-white/80">Ingresa a tu cuenta de Harweb DBO</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-xl text-sm backdrop-blur-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/90">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                    <input
                      id="email"
                      type="email"
                      placeholder="usuario@empresa.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-white/90">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-slate-300">
                    <input type="checkbox" className="mr-2 rounded border-slate-600 bg-slate-700/50" />
                    Recordarme
                  </label>
                  <a href="#" className="text-slate-300 hover:text-white transition-colors">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl border border-slate-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                      <span>Iniciando sesión...</span>
                    </>
                  ) : (
                    <>
                      <span>Iniciar Sesión</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-300">
                  ¿No tienes cuenta?{' '}
                  <Link 
                    href="/register" 
                    className="text-white font-semibold hover:underline transition-all"
                  >
                    Registra tu empresa
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-xs text-center text-slate-400">
                  Al iniciar sesión, aceptas nuestros{' '}
                  <a href="#" className="underline hover:text-slate-300">Términos de servicio</a>
                  {' '}y{' '}
                  <a href="#" className="underline hover:text-slate-300">Política de privacidad</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Features */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold text-white mb-6">
              Gestiona tu nómina con inteligencia artificial
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Plataforma líder en Latinoamérica para gestión de nómina multi-país con compliance automático.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-700 border border-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Procesamiento Ultra-rápido</h3>
                  <p className="text-slate-300">Calcula nóminas de hasta 100,000 empleados en segundos</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-700 border border-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Multi-País</h3>
                  <p className="text-slate-300">Soporte para más de 50 países con reglas locales</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-700 border border-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Seguridad Enterprise</h3>
                  <p className="text-slate-300">Certificaciones ISO 27001 y SOC 2 Type II</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500K+</div>
                <div className="text-sm text-slate-400">Empleados activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-slate-400">Uptime garantizado</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-slate-400">Soporte dedicado</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(148, 163, 184, 0.3);
          border-radius: 50%;
          animation: float-up 15s linear infinite;
        }

        @keyframes float-up {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}