'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
  Flag
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Panel - Form */}
          <div className="order-2 lg:order-1">
            {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start mb-8">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center shadow-xl">
                  <span className="text-2xl font-bold text-white">H</span>
                </div>
                <span className="text-2xl font-bold text-white">Harweb DBO</span>
              </Link>
            </div>

            {/* Form Container */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {step === 1 ? 'Información de la Empresa' : 'Información Personal'}
                </h1>
                <p className="text-white/80">
                  {step === 1 ? 'Paso 1 de 2: Datos de tu organización' : 'Paso 2 de 2: Crea tu cuenta de administrador'}
                </p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= 1 ? 'bg-white text-purple-700' : 'bg-white/20 text-white/50'
                  }`}>
                    1
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${
                    step >= 2 ? 'bg-white' : 'bg-white/20'
                  }`} />
                </div>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= 2 ? 'bg-white text-purple-700' : 'bg-white/20 text-white/50'
                  }`}>
                    2
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                                ? 'bg-white/20 border-white/50 shadow-lg'
                                : 'bg-white/5 border-white/20 hover:bg-white/10'
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
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
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
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
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
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                      >
                        {organizationTypes.map((type) => (
                          <option key={type.value} value={type.value} className="bg-purple-800">
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
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
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
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
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
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
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
                          className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-white/60 mt-1">
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
                      className="flex-1 py-3 px-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200"
                    >
                      Anterior
                    </button>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-3 px-4 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:from-white/30 hover:to-white/20 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 ${
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
                <p className="text-white/80">
                  ¿Ya tienes cuenta?{' '}
                  <Link 
                    href="/login" 
                    className="text-white font-semibold hover:underline transition-all"
                  >
                    Inicia sesión
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Benefits */}
          <div className="order-1 lg:order-2 flex items-center">
            <div className="w-full">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Únete a la revolución de la nómina inteligente
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mb-8">
                Más de 5,000 empresas confían en nosotros para procesar su nómina de forma eficiente y cumplir con todas las regulaciones.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <p className="text-white/90">Configuración en menos de 5 minutos</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <p className="text-white/90">Cálculos automáticos según legislación local</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <p className="text-white/90">Integración bancaria para pagos instantáneos</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <p className="text-white/90">Reportes y analytics en tiempo real</p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <p className="text-white/90">Soporte 24/7 con expertos en nómina</p>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="flex items-center space-x-4 mb-4">
                  <Sparkles className="h-8 w-8 text-yellow-400" />
                  <h3 className="text-xl font-semibold text-white">Oferta de lanzamiento</h3>
                </div>
                <p className="text-white/90 mb-2">
                  <span className="text-2xl font-bold">30 días gratis</span> sin compromiso
                </p>
                <p className="text-sm text-white/70">
                  No se requiere tarjeta de crédito. Cancela cuando quieras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}