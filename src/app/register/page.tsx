'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import { 
  Building2, 
  Globe, 
  User, 
  Mail, 
  Lock, 
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle,
  Flag,
  Activity,
  BarChart3
} from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    employerName: '',
    organizationName: '',
    country: 'MX',
    organizationType: 'SME',
    taxId: ''
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

  const countries = [
    { code: 'BR', name: 'Brasil', flag: '🇧🇷', currency: 'BRL', timezone: 'America/Sao_Paulo' },
    { code: 'MX', name: 'México', flag: '🇲🇽', currency: 'MXN', timezone: 'America/Mexico_City' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷', currency: 'ARS', timezone: 'America/Buenos_Aires' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴', currency: 'COP', timezone: 'America/Bogota' },
    { code: 'CL', name: 'Chile', flag: '🇨🇱', currency: 'CLP', timezone: 'America/Santiago' },
    { code: 'PE', name: 'Perú', flag: '🇵🇪', currency: 'PEN', timezone: 'America/Lima' },
    { code: 'US', name: 'Estados Unidos', flag: '🇺🇸', currency: 'USD', timezone: 'America/New_York' },
    { code: 'CA', name: 'Canadá', flag: '🇨🇦', currency: 'CAD', timezone: 'America/Toronto' }
  ]

  const organizationTypes = [
    { value: 'CORPORATION', label: 'Corporación', description: 'Grandes empresas multinacionales' },
    { value: 'SME', label: 'PyME', description: 'Pequeña y mediana empresa' },
    { value: 'STARTUP', label: 'Startup', description: 'Empresa emergente de tecnología' },
    { value: 'NGO', label: 'ONG', description: 'Organización sin fines de lucro' },
    { value: 'GOVERNMENT', label: 'Gobierno', description: 'Entidad gubernamental' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      setStep(2)
      return
    }

    setLoading(true)
    setError('')

    try {
      const selectedCountry = countries.find(c => c.code === formData.country)
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          organizationName: formData.organizationName || formData.employerName,
          currency: selectedCountry?.currency,
          timezone: selectedCountry?.timezone
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al registrar')
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      {/* Animated Background */}
      <div className="bg-animation absolute inset-0">
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
      <div className="relative min-h-screen flex pt-20">
        {/* Left Panel - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">

            {/* Form Container */}
            <div className="bg-slate-800/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-slate-700">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {step === 1 ? 'Registra tu Empresa' : 'Crea tu Cuenta'}
                </h1>
                <p className="text-white/80">
                  {step === 1 ? 'Paso 1 de 2: Datos de tu organización' : 'Paso 2 de 2: Información del administrador'}
                </p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= 1 ? 'bg-slate-900 text-white border-2 border-slate-600' : 'bg-slate-700/50 text-slate-400'
                  }`}>
                    1
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${
                    step >= 2 ? 'bg-slate-600' : 'bg-slate-700/50'
                  }`} />
                </div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= 2 ? 'bg-slate-900 text-white border-2 border-slate-600' : 'bg-slate-700/50 text-slate-400'
                  }`}>
                    2
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-xl text-sm backdrop-blur-sm">
                    {error}
                  </div>
                )}
                
                {step === 1 ? (
                  // Step 1: Company Information
                  <>
                    <div className="space-y-2">
                      <label htmlFor="country" className="text-sm font-medium text-white/90">
                        País de operación
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => setFormData({ ...formData, country: country.code })}
                            className={`p-3 rounded-xl border transition-all ${
                              formData.country === country.code
                                ? 'bg-slate-700 border-slate-500 shadow-lg'
                                : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700/70'
                            }`}
                          >
                            <div className="text-2xl mb-1">{country.flag}</div>
                            <div className="text-xs text-white/90">{country.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="organizationName" className="text-sm font-medium text-white/90">
                        Nombre de la organización
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                        <input
                          id="organizationName"
                          placeholder="Grupo Empresarial ABC"
                          value={formData.organizationName}
                          onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="employerName" className="text-sm font-medium text-white/90">
                        Nombre del empleador
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                        <input
                          id="employerName"
                          placeholder="Mi Empresa S.A. de C.V."
                          required
                          value={formData.employerName}
                          onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="organizationType" className="text-sm font-medium text-white/90">
                        Tipo de organización
                      </label>
                      <select
                        id="organizationType"
                        value={formData.organizationType}
                        onChange={(e) => setFormData({ ...formData, organizationType: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                      >
                        {organizationTypes.map((type) => (
                          <option key={type.value} value={type.value} className="bg-slate-800">
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="taxId" className="text-sm font-medium text-white/90">
                        RFC / CNPJ / RUT (opcional)
                      </label>
                      <input
                        id="taxId"
                        placeholder="ABC123456789"
                        value={formData.taxId}
                        onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                      />
                    </div>
                  </>
                ) : (
                  // Step 2: Personal Information
                  <>
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-white/90">
                        Tu nombre completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                        <input
                          id="name"
                          placeholder="Juan Pérez García"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white/90">
                        Correo electrónico corporativo
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                        <input
                          id="email"
                          type="email"
                          placeholder="admin@empresa.com"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="password" className="text-sm font-medium text-white/90">
                        Contraseña segura
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Mínimo 8 caracteres"
                          required
                          minLength={8}
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
                      <p className="text-xs text-slate-400 mt-1">
                        Usa mayúsculas, minúsculas, números y símbolos
                      </p>
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 px-4 bg-slate-700/50 backdrop-blur-sm text-white font-semibold rounded-xl border border-slate-600 hover:bg-slate-700/70 transition-all duration-200"
                    >
                      Anterior
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl border border-slate-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                        <span>Procesando...</span>
                      </>
                    ) : (
                      <>
                        <span>{step === 1 ? 'Siguiente' : 'Crear Cuenta'}</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center">
                <p className="text-slate-300">
                  ¿Ya tienes cuenta?{' '}
                  <Link 
                    href="/login" 
                    className="text-white font-semibold hover:underline transition-all"
                  >
                    Inicia sesión
                  </Link>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-xs text-center text-slate-400">
                  Al registrarte, aceptas nuestros{' '}
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
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Setup Automático</h3>
                  <p className="text-slate-300">Tu empresa lista en menos de 5 minutos</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-700 border border-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Compliance Automático</h3>
                  <p className="text-slate-300">Siempre actualizado con regulaciones locales</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-700 border border-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Analytics Avanzados</h3>
                  <p className="text-slate-300">Reportes y métricas en tiempo real</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5K+</div>
                <div className="text-sm text-slate-400">Empresas activas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">30</div>
                <div className="text-sm text-slate-400">Días gratis</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-slate-400">Soporte dedicado</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}