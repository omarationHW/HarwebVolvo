'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Home, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Briefcase,
  DollarSign,
  ChevronRight,
  Bell,
  Search,
  Shield,
  BarChart3,
  FileCheck,
  Plus,
  HelpCircle,
  Globe,
  Building2,
  CreditCard,
  Calendar,
  Archive
} from 'lucide-react'

export default function EmployeesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      setUser(JSON.parse(userData))
      return
    }
    
    fetch('/api/auth/status')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          if (token) localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(data.user))
          setUser(data.user)
        } else {
          router.push('/login')
        }
      })
      .catch(() => {
        router.push('/login')
      })
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    }
    
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando aplicación...</p>
        </div>
      </div>
    )
  }

  const mainNavigation = [
    { 
      name: 'Dashboard', 
      href: '/dashboard', 
      icon: Home, 
      description: 'Vista general del sistema'
    },
    { 
      name: 'Empleados', 
      href: '/employees', 
      icon: Users, 
      description: 'Gestión de personal'
    },
    { 
      name: 'Nómina', 
      href: '/payroll', 
      icon: DollarSign, 
      description: 'Procesamiento de pagos'
    },
    { 
      name: 'Órdenes de Trabajo', 
      href: '/work-orders', 
      icon: Briefcase, 
      description: 'Unidades de trabajo'
    }
  ]

  const managementNavigation = [
    { 
      name: 'Cumplimiento', 
      href: '/compliance', 
      icon: FileCheck, 
      description: 'Regulaciones y auditoría'
    },
    { 
      name: 'Reportes', 
      href: '/reports', 
      icon: BarChart3, 
      description: 'Análisis y métricas'
    },
    { 
      name: 'Configuración', 
      href: '/dashboard/settings', 
      icon: Settings, 
      description: 'Ajustes del sistema'
    }
  ]

  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard'
    if (pathname === '/employees') return 'Empleados'
    if (pathname === '/payroll') return 'Nómina'
    if (pathname === '/work-orders') return 'Órdenes de Trabajo'
    if (pathname === '/compliance') return 'Cumplimiento'
    if (pathname === '/reports') return 'Reportes'
    if (pathname.startsWith('/dashboard/settings')) return 'Configuración'
    return 'Sistema Harweb'
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 ${
        sidebarCollapsed ? 'w-20' : 'w-72'
      } bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col`}>
        
        {/* Logo Section */}
        <div className="flex-shrink-0 p-6 border-b border-slate-200">
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-900 truncate">
                  Harweb DBO
                </h2>
                <p className="text-sm text-slate-500 truncate">Sistema de Nómina</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-8 overflow-y-auto">
          {/* Main Navigation */}
          <div>
            {!sidebarCollapsed && (
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Principal
              </h3>
            )}
            <div className="space-y-1">
              {mainNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-slate-900 text-white' 
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    <item.icon className={`flex-shrink-0 h-5 w-5 ${
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                    }`} />
                    {!sidebarCollapsed && (
                      <div className="ml-3 min-w-0 flex-1">
                        <div className="truncate">{item.name}</div>
                        <div className={`text-xs mt-0.5 truncate ${
                          isActive ? 'text-white/70' : 'text-slate-500'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                    )}
                    {isActive && !sidebarCollapsed && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Management Navigation */}
          <div>
            {!sidebarCollapsed && (
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Gestión
              </h3>
            )}
            <div className="space-y-1">
              {managementNavigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive 
                        ? 'bg-slate-900 text-white' 
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    <item.icon className={`flex-shrink-0 h-5 w-5 ${
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
                    }`} />
                    {!sidebarCollapsed && (
                      <div className="ml-3 min-w-0 flex-1">
                        <div className="truncate">{item.name}</div>
                        <div className={`text-xs mt-0.5 truncate ${
                          isActive ? 'text-white/70' : 'text-slate-500'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                    )}
                    {isActive && !sidebarCollapsed && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Quick Actions */}
          {!sidebarCollapsed && (
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Acciones
              </h3>
              <div className="space-y-2">
                <button className="w-full flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors">
                  <Plus className="h-4 w-4 mr-3" />
                  Nuevo Empleado
                </button>
                <button className="w-full flex items-center px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 rounded-lg transition-colors">
                  <Calendar className="h-4 w-4 mr-3" />
                  Procesar Nómina
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* User Profile */}
        <div className="flex-shrink-0 p-6 border-t border-slate-200">
          {!sidebarCollapsed ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-slate-600 font-semibold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                  {user?.role === 'SUPER_ADMIN' ? 'Super Admin' : user?.role}
                </span>
                <div className="flex space-x-1">
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors">
                    <HelpCircle className="h-4 w-4" />
                  </button>
                  <button 
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    title={sidebarCollapsed ? 'Expandir sidebar' : 'Contraer sidebar'}
                  >
                    <Menu className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <button
                className="w-full flex items-center justify-center px-3 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                <span className="text-slate-600 font-semibold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <button 
                className="p-2 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
                onClick={() => setSidebarCollapsed(false)}
                title="Expandir sidebar"
              >
                <Menu className="h-4 w-4" />
              </button>
              <button
                className="p-2 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                onClick={handleLogout}
                title="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{getPageTitle()}</h1>
                <p className="text-sm text-slate-500">
                  {new Date().toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar empleados, órdenes..."
                  className="pl-10 pr-4 py-2 w-80 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                />
              </div>
              
              <button className="relative p-2 text-slate-400 hover:text-slate-500 rounded-lg hover:bg-slate-100">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="md:hidden p-2 text-slate-400 hover:text-slate-500 rounded-lg hover:bg-slate-100">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}