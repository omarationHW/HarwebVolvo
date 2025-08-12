'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Cpu, 
  Network, 
  Layers, 
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  Activity,
  Users2,
  CreditCard,
  DollarSign,
  Zap,
  BarChart3
} from 'lucide-react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Dynamic particle generation
  useEffect(() => {
    const bgAnimation = document.querySelector('.bg-animation')
    if (!bgAnimation) return

    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.width = Math.random() * 60 + 20 + 'px'
      particle.style.height = particle.style.width
      particle.style.animationDuration = Math.random() * 4 + 4 + 's'
      particle.style.animationDelay = Math.random() * 2 + 's'
      
      bgAnimation.appendChild(particle)
      
      setTimeout(() => {
        particle.remove()
      }, 8000)
    }

    const interval = setInterval(createParticle, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gray-950">
      {/* Modern Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 -z-10" />
      
      {/* Subtle Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.02] -z-10" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }} />
      
      {/* Floating Geometric Shapes */}
      <div className="bg-animation fixed inset-0 overflow-hidden -z-10">
        <div className="absolute w-2 h-2 bg-emerald-400/20 rounded-full animate-float-subtle" style={{left: '15%', top: '20%', animationDelay: '0s'}} />
        <div className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float-subtle" style={{left: '85%', top: '30%', animationDelay: '2s'}} />
        <div className="absolute w-3 h-3 bg-purple-400/15 rounded-full animate-float-subtle" style={{left: '70%', top: '60%', animationDelay: '4s'}} />
        <div className="absolute w-1.5 h-1.5 bg-amber-400/25 rounded-full animate-float-subtle" style={{left: '25%', top: '70%', animationDelay: '1s'}} />
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-6 transition-all duration-500 ${
        scrolled ? 'bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50' : ''
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Harweb DBO
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#inicio" className="text-gray-300 hover:text-white font-medium transition-all duration-300 relative group">
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#productos" className="text-gray-300 hover:text-white font-medium transition-all duration-300 relative group">
              Productos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#precios" className="text-gray-300 hover:text-white font-medium transition-all duration-300 relative group">
              Precios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#contacto" className="text-gray-300 hover:text-white font-medium transition-all duration-300 relative group">
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <Link 
              href="/login"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Acceder
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-gray-300 hover:text-white p-2 transition-colors duration-300"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4">
            <div className="flex flex-col gap-4">
              <a href="#inicio" className="text-gray-300 hover:text-white font-medium transition-all duration-300 py-2">Inicio</a>
              <a href="#productos" className="text-gray-300 hover:text-white font-medium transition-all duration-300 py-2">Productos</a>
              <a href="#precios" className="text-gray-300 hover:text-white font-medium transition-all duration-300 py-2">Precios</a>
              <a href="#contacto" className="text-gray-300 hover:text-white font-medium transition-all duration-300 py-2">Contacto</a>
              <Link 
                href="/login"
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium rounded-xl text-center transition-all duration-300 mt-2"
              >
                Acceder
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center px-6 lg:px-12 pt-24 pb-20">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Hero Content */}
          <div className="animate-slide-in-left">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-white">Nómina</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Inteligente
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
              Plataforma empresarial que automatiza la gestión de nómina con 
              <span className="text-emerald-400 font-semibold"> compliance global</span> y 
              <span className="text-blue-400 font-semibold"> escalabilidad ilimitada</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/register"
                className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  Comenzar Gratis
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 text-gray-300 font-semibold rounded-2xl hover:bg-gray-700/50 hover:border-gray-600 hover:text-white transform hover:-translate-y-1 transition-all duration-300 text-center"
              >
                Ver Demo
              </Link>
            </div>

            {/* Modern Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">50+</div>
                <div className="text-sm text-gray-400 mt-1">Países Soportados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">100K+</div>
                <div className="text-sm text-gray-400 mt-1">Empleados Activos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">99.9%</div>
                <div className="text-sm text-gray-400 mt-1">Disponibilidad</div>
              </div>
            </div>
          </div>

          {/* Hero Graphics - Modern Dollar Spinner */}
          <div className="relative flex justify-center items-center animate-slide-in-right">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Outer Ring */}
              <div className="absolute inset-0 border border-gray-700/50 rounded-full animate-rotate-reverse" />
              <div className="absolute inset-4 border border-gray-600/30 rounded-full animate-rotate-slow" />
              
              {/* Inner Glow */}
              <div className="absolute inset-8 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-xl" />
              
              {/* Center Circle with Dollar */}
              <div className="absolute inset-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full border border-gray-700 flex items-center justify-center shadow-2xl animate-rotate-slow">
                <div className="relative">
                  <DollarSign className="w-24 h-24 text-emerald-400" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full blur-lg opacity-50" />
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-8 w-3 h-3 bg-emerald-400 rounded-full animate-float-subtle" />
              <div className="absolute bottom-8 left-4 w-2 h-2 bg-blue-400 rounded-full animate-float-subtle" style={{animationDelay: '1s'}} />
              <div className="absolute top-12 left-12 w-1.5 h-1.5 bg-purple-400 rounded-full animate-float-subtle" style={{animationDelay: '2s'}} />
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative px-6 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Tecnología de <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Vanguardia</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Infraestructura robusta diseñada para empresas modernas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:bg-gray-700/50 hover:border-gray-600 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ultra Rápido</h3>
              <p className="text-gray-400 leading-relaxed">
                Respuesta sub-100ms con enrutamiento geográfico inteligente
              </p>
            </div>

            <div className="group bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:bg-gray-700/50 hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Network className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Global</h3>
              <p className="text-gray-400 leading-relaxed">
                Compliance automático en múltiples jurisdicciones simultáneamente
              </p>
            </div>

            <div className="group bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:bg-gray-700/50 hover:border-gray-600 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Layers className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Escalable</h3>
              <p className="text-gray-400 leading-relaxed">
                Auto-escalamiento inteligente según crecimiento empresarial
              </p>
            </div>

            <div className="group bg-gray-800/50 border border-gray-700 rounded-2xl p-6 hover:bg-gray-700/50 hover:border-gray-600 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Seguro</h3>
              <p className="text-gray-400 leading-relaxed">
                Aislamiento de datos dinámico con SLA empresariales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="relative px-6 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Características <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Empresariales</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Herramientas profesionales diseñadas para maximizar la eficiencia de tu equipo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:bg-gray-700/50 hover:border-gray-600 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Analytics Avanzados</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Dashboards interactivos con métricas clave y análisis predictivo
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></div>
                  KPIs personalizables
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></div>
                  Reportes automáticos
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3"></div>
                  Alertas inteligentes
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:bg-gray-700/50 hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Users2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Gestión Integral</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Portal completo para administrar todo el ciclo de vida del empleado
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                  Onboarding digital
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                  Documentos en la nube
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                  Portal de autoservicio
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 hover:bg-gray-700/50 hover:border-gray-600 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Pagos Inteligentes</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Integración bancaria directa para pagos instantáneos y seguros
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                  PIX, SPEI, ACH
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                  Pagos programados
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                  Recibos digitales
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 lg:px-12 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.3) 0%, transparent 50%), 
                                 radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
              }} />
            </div>
            
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                ¿Listo para <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">evolucionar</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Únete a empresas innovadoras que ya transformaron su gestión de nómina
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="/register"
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/25 transform hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Comenzar Gratis
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/login"
                  className="px-8 py-4 bg-gray-700/50 border border-gray-600 text-gray-300 font-semibold rounded-2xl hover:bg-gray-600/50 hover:border-gray-500 hover:text-white transform hover:-translate-y-1 transition-all duration-300"
                >
                  Acceder a mi cuenta
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span>Prueba gratuita 30 días</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Sin compromiso</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Soporte 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes rotate-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.8;
            transform: scale(1);
          }
          50% { 
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .animate-float-subtle {
          animation: float-subtle 4s ease-in-out infinite;
        }

        .animate-rotate-slow {
          animation: rotate-slow 8s linear infinite;
        }

        .animate-rotate-reverse {
          animation: rotate-reverse 12s linear infinite;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}