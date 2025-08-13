'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import { 
  Cpu, 
  Network, 
  Layers, 
  ShieldCheck,
  ChevronRight,
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
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      }, 8000)
    }

    const interval = setInterval(createParticle, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="bg-animation absolute inset-0 opacity-20">
          <div className="particle absolute w-32 h-32 bg-blue-500/30 rounded-full"></div>
          <div className="particle absolute w-24 h-24 bg-purple-500/30 rounded-full"></div>
          <div className="particle absolute w-40 h-40 bg-indigo-500/30 rounded-full"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Floating Dollar Signs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-dollar absolute top-1/4 left-1/4 text-6xl text-emerald-400/30 animate-float">$</div>
          <div className="floating-dollar absolute top-1/3 right-1/4 text-4xl text-emerald-400/20 animate-float-delayed">$</div>
          <div className="floating-dollar absolute bottom-1/3 left-1/3 text-8xl text-emerald-400/10 animate-float-slow">$</div>
          <div className="floating-dollar absolute top-1/2 right-1/3 text-5xl text-emerald-400/25 animate-float-fast">$</div>
          <div className="floating-dollar absolute bottom-1/4 right-1/5 text-7xl text-emerald-400/15 animate-float">$</div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 backdrop-blur-lg rounded-full border border-slate-700 text-slate-300 text-sm mb-4">
                <Zap className="w-4 h-4 mr-2 text-emerald-400" />
                Más de 5,000 empresas ya confían en nosotros
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Sistema de Nómina
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Inteligente
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Automatiza la gestión de nóminas, órdenes de trabajo y cumplimiento 
                regulatorio en América Latina con nuestra plataforma de última generación.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-2xl hover:from-emerald-700 hover:to-cyan-700 transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-emerald-500/25 flex items-center space-x-2"
              >
                <span>Empezar Gratis</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="#features"
                className="px-8 py-4 bg-slate-800/50 backdrop-blur-lg border border-slate-700 text-white font-semibold rounded-2xl hover:bg-slate-700/50 transition-all duration-300"
              >
                Ver Características
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-slate-400 text-sm">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>30 días gratis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users2 className="w-4 h-4 text-emerald-400" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Sin tarjeta requerida</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Todo lo que necesitas en una plataforma
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Herramientas profesionales diseñadas para empresas modernas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-6 bg-slate-700/50 backdrop-blur-lg rounded-2xl border border-slate-600 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
                <Cpu className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Procesamiento Avanzado</h3>
              <p className="text-slate-400 text-sm">Cálculos automáticos de nómina con precisión garantizada</p>
            </div>
            
            <div className="group p-6 bg-slate-700/50 backdrop-blur-lg rounded-2xl border border-slate-600 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                <Network className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Integración Total</h3>
              <p className="text-slate-400 text-sm">Conecta con bancos y sistemas fiscales automáticamente</p>
            </div>
            
            <div className="group p-6 bg-slate-700/50 backdrop-blur-lg rounded-2xl border border-slate-600 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                <Layers className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Multi-empresa</h3>
              <p className="text-slate-400 text-sm">Gestiona múltiples organizaciones desde un panel</p>
            </div>
            
            <div className="group p-6 bg-slate-700/50 backdrop-blur-lg rounded-2xl border border-slate-600 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
                <ShieldCheck className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Cumplimiento Legal</h3>
              <p className="text-slate-400 text-sm">Siempre actualizado con las regulaciones locales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cumplimiento Legal Section */}
      <section id="cumplimiento" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Cumplimiento Legal
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Mantente siempre conforme con las regulaciones laborales de cada país
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 text-center hover:border-emerald-500/50 transition-all">
              <div className="text-3xl mb-3">🇲🇽</div>
              <h3 className="font-semibold text-white mb-2">México</h3>
              <p className="text-sm text-slate-400">IMSS, INFONAVIT, SAT</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 text-center hover:border-emerald-500/50 transition-all">
              <div className="text-3xl mb-3">🇧🇷</div>
              <h3 className="font-semibold text-white mb-2">Brasil</h3>
              <p className="text-sm text-slate-400">CLT, eSocial, FGTS</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 text-center hover:border-emerald-500/50 transition-all">
              <div className="text-3xl mb-3">🇦🇷</div>
              <h3 className="font-semibold text-white mb-2">Argentina</h3>
              <p className="text-sm text-slate-400">AFIP, SIPA, ART</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 text-center hover:border-emerald-500/50 transition-all">
              <div className="text-3xl mb-3">🇨🇴</div>
              <h3 className="font-semibold text-white mb-2">Colombia</h3>
              <p className="text-sm text-slate-400">PILA, DIAN, EPS</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 text-center hover:border-emerald-500/50 transition-all">
              <div className="text-3xl mb-3">🇨🇱</div>
              <h3 className="font-semibold text-white mb-2">Chile</h3>
              <p className="text-sm text-slate-400">AFP, PREVIRED, DT</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 text-center hover:border-emerald-500/50 transition-all">
              <div className="text-3xl mb-3">🇵🇪</div>
              <h3 className="font-semibled text-white mb-2">Perú</h3>
              <p className="text-sm text-slate-400">SUNAT, ESSALUD, SPP</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 text-center hover:border-emerald-500/50 transition-all">
              <div className="text-3xl mb-3">🇺🇸</div>
              <h3 className="font-semibold text-white mb-2">Estados Unidos</h3>
              <p className="text-sm text-slate-400">IRS, DOL, SSA</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl border border-slate-700 text-center hover:border-emerald-500/50 transition-all">
              <div className="text-3xl mb-3">🇨🇦</div>
              <h3 className="font-semibold text-white mb-2">Canadá</h3>
              <p className="text-sm text-slate-400">CRA, CPP, EI</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Listo para revolucionar tu nómina?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Únete a miles de empresas que ya optimizaron su gestión de recursos humanos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-2xl hover:bg-emerald-50 transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
            >
              Empezar Gratis - 30 Días
            </Link>
            <Link
              href="mailto:contacto@harwebdbo.com"
              className="px-8 py-4 bg-emerald-700/50 backdrop-blur-lg border border-emerald-400/50 text-white font-semibold rounded-2xl hover:bg-emerald-700/70 transition-all duration-300"
            >
              Contactar Ventas
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-dollar {
          font-weight: bold;
          pointer-events: none;
          user-select: none;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite 2s;
        }
        
        .animate-float-slow {
          animation: float 12s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float 6s ease-in-out infinite 1s;
        }
      `}</style>
    </div>
  )
}