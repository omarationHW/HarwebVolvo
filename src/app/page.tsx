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
  BarChart3,
  FileCheck,
  Clock,
  Building2,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

export default function Home() {
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="bg-animation absolute inset-0 opacity-20">
          <div className="particle absolute w-32 h-32 bg-blue-500/30 rounded-full"></div>
          <div className="particle absolute w-24 h-24 bg-purple-500/30 rounded-full"></div>
          <div className="particle absolute w-40 h-40 bg-indigo-500/30 rounded-full"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                La revolución de la
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  nómina inteligente
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto">
                Procesa nóminas, gestiona órdenes de trabajo y cumple con todas las regulaciones 
                de forma automática en América Latina.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-1 shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Empezar Gratis</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#nomina"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                Ver Demo
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-white/60 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>30 días gratis</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nómina Section */}
      <section id="nomina" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Gestión de Nómina Inteligente
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Automatiza todos los cálculos de nómina según la legislación de cada país latinoamericano
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 rounded-xl">
              <DollarSign className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Cálculos Automáticos</h3>
              <p className="text-slate-600">Deducciones, impuestos y beneficios calculados automáticamente</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <Users2 className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Multi-empresa</h3>
              <p className="text-slate-600">Gestiona múltiples empresas y empleadores desde un panel</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl">
              <Clock className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Tiempo Real</h3>
              <p className="text-slate-600">Actualizaciones instantáneas y sincronización automática</p>
            </div>
          </div>
        </div>
      </section>

      {/* Órdenes de Trabajo Section */}
      <section id="ordenes" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Órdenes de Trabajo
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Organiza y rastrea proyectos, asigna empleados y controla costos en tiempo real
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Building2 className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Gestión de Proyectos</h3>
                  <p className="text-slate-600">Crea y administra órdenes de trabajo con estados y progreso</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Activity className="h-8 w-8 text-purple-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Seguimiento en Tiempo Real</h3>
                  <p className="text-slate-600">Monitorea el progreso y costos de cada proyecto</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CreditCard className="h-8 w-8 text-green-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Control de Costos</h3>
                  <p className="text-slate-600">Presupuestos automáticos y alertas de gastos</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="font-medium">Proyecto Volvo A1</span>
                  <span className="text-blue-600 font-semibold">En Progreso</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <span className="font-medium">Mantenimiento B2</span>
                  <span className="text-green-600 font-semibold">Completado</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <span className="font-medium">Instalación C3</span>
                  <span className="text-yellow-600 font-semibold">Pendiente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reportes Section */}
      <section id="reportes" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Reportes y Analytics
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Dashboards interactivos y reportes automáticos para tomar decisiones informadas
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Dashboard Ejecutivo</h3>
              <p className="text-slate-600">KPIs en tiempo real y métricas de rendimiento</p>
            </div>
            <div className="text-center p-6">
              <FileCheck className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Reportes Automáticos</h3>
              <p className="text-slate-600">Informes programados y exportación automática</p>
            </div>
            <div className="text-center p-6">
              <Zap className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Insights Inteligentes</h3>
              <p className="text-slate-600">Análisis predictivo y recomendaciones automáticas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cumplimiento Section */}
      <section id="cumplimiento" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Cumplimiento Legal
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Mantente siempre conforme con las regulaciones laborales de cada país
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-2xl mb-2">🇲🇽</div>
              <h3 className="font-semibold text-slate-900">México</h3>
              <p className="text-sm text-slate-600">IMSS, INFONAVIT, SAT</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-2xl mb-2">🇧🇷</div>
              <h3 className="font-semibold text-slate-900">Brasil</h3>
              <p className="text-sm text-slate-600">CLT, eSocial, FGTS</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-2xl mb-2">🇦🇷</div>
              <h3 className="font-semibold text-slate-900">Argentina</h3>
              <p className="text-sm text-slate-600">AFIP, SIPA, ART</p>
            </div>
            <div className="bg-white p-6 rounded-xl text-center">
              <div className="text-2xl mb-2">🇨🇴</div>
              <h3 className="font-semibold text-slate-900">Colombia</h3>
              <p className="text-sm text-slate-600">PILA, DIAN, EPS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Precios Section */}
      <section id="precios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Planes y Precios</h2>
            <p className="text-xl text-slate-600">Elige el plan perfecto para tu empresa</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
              <div className="text-4xl font-bold text-slate-900 mb-4">$99<span className="text-lg text-slate-600">/mes</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Hasta 50 empleados
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Nómina básica
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Soporte por email
                </li>
              </ul>
              <Link href="/register" className="block w-full text-center py-3 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors">
                Empezar
              </Link>
            </div>
            
            <div className="bg-blue-600 p-8 rounded-xl text-white relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold">
                Más Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="text-4xl font-bold mb-4">$299<span className="text-lg text-blue-200">/mes</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Hasta 200 empleados
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Nómina completa + Órdenes
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Reportes avanzados
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  Soporte prioritario
                </li>
              </ul>
              <Link href="/register" className="block w-full text-center py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                Empezar
              </Link>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-slate-900 mb-4">Custom</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Empleados ilimitados
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Funciones personalizadas
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Soporte 24/7
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Implementación dedicada
                </li>
              </ul>
              <Link href="#contacto" className="block w-full text-center py-3 bg-slate-200 text-slate-900 rounded-lg hover:bg-slate-300 transition-colors">
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clientes Section */}
      <section id="clientes" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Más de 5,000 empresas confían en nosotros
            </h2>
            <p className="text-xl text-slate-600">
              Desde startups hasta corporaciones multinacionales
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-4">
                "HarwebDBO revolucionó nuestra gestión de nómina. Ahora procesamos pagos en minutos, no días."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-200 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-slate-900">María González</p>
                  <p className="text-sm text-slate-600">CEO, TechCorp México</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-4">
                "El cumplimiento automático nos ahorra horas de trabajo administrativo cada semana."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-200 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-slate-900">João Silva</p>
                  <p className="text-sm text-slate-600">CFO, GlobalCorp Brasil</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 mb-4">
                "La integración con nuestros sistemas existentes fue perfecta y sin interrupciones."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-200 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-slate-900">Carlos Rodríguez</p>
                  <p className="text-sm text-slate-600">CTO, FinTech Colombia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">¿Listo para empezar?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Únete a miles de empresas que ya optimizaron su gestión de nómina
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-1 shadow-xl"
              >
                Empezar Gratis - 30 Días
              </Link>
              <Link
                href="mailto:contacto@harwebdbo.com"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                Contactar Ventas
              </Link>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-12">
            <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
              <div>
                <h3 className="font-semibold mb-4">Producto</h3>
                <ul className="space-y-2 text-slate-300">
                  <li><Link href="#nomina" className="hover:text-white transition-colors">Nómina</Link></li>
                  <li><Link href="#ordenes" className="hover:text-white transition-colors">Órdenes de Trabajo</Link></li>
                  <li><Link href="#reportes" className="hover:text-white transition-colors">Reportes</Link></li>
                  <li><Link href="#cumplimiento" className="hover:text-white transition-colors">Cumplimiento</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Empresa</h3>
                <ul className="space-y-2 text-slate-300">
                  <li><Link href="#" className="hover:text-white transition-colors">Nosotros</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Prensa</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Soporte</h3>
                <ul className="space-y-2 text-slate-300">
                  <li><Link href="#" className="hover:text-white transition-colors">Documentación</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Centro de Ayuda</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-slate-300">
                  <li><Link href="#" className="hover:text-white transition-colors">Privacidad</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Términos</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Cookies</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Licenses</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
              <p>&copy; 2024 HarwebDBO. Todos los derechos reservados.</p>
            </div>
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}