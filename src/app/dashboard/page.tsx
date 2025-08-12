'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  DollarSign, 
  Globe,
  Building2,
  Briefcase,
  BarChart3,
  Clock,
  AlertTriangle,
  ArrowRight,
  Shield,
  TrendingUp,
  Calendar,
  Activity,
  ChevronRight,
  MapPin,
  Target
} from 'lucide-react'

interface HierarchyLevel {
  id: string
  name: string
  type: 'country' | 'organization' | 'employer' | 'workorder'
  count?: number
  children?: HierarchyLevel[]
  details?: any
  statistics?: any
}

export default function DashboardPage() {
  const router = useRouter()
  const [hierarchyData, setHierarchyData] = useState<HierarchyLevel[]>([])
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeWorkOrders: 0,
    totalPayrollCost: 0,
    monthlyGrowth: 0
  })
  const [globalStats, setGlobalStats] = useState({
    totalCountries: 0,
    totalOrganizations: 0,
    totalEmployers: 0,
    totalWorkOrders: 0,
    totalEmployees: 0
  })
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      
      if (parsedUser.role === 'SUPER_ADMIN') {
        loadSuperAdminData()
      } else {
        loadUserData()
      }
    } else {
      setIsLoading(false)
    }
  }, [])

  const loadSuperAdminData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/hierarchy', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setHierarchyData(data.hierarchy)
        setGlobalStats(data.globalStats)
        setStats({
          totalEmployees: data.globalStats.totalEmployees,
          activeWorkOrders: data.globalStats.totalWorkOrders,
          totalPayrollCost: data.globalStats.totalEmployees * 35000,
          monthlyGrowth: 8.2
        })
      }
    } catch (error) {
      console.error('Error loading super admin data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserData = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
        
      {/* Welcome Section */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              ¡Bienvenido de vuelta, {user?.name?.split(' ')[0] || 'Usuario'}!
            </h2>
            <p className="text-slate-600">
              Aquí tienes un resumen de la actividad de hoy en el sistema
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">Último acceso</div>
            <div className="font-medium text-slate-700">Hoy, 9:30 AM</div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Empleados</p>
                <p className="text-2xl font-bold text-slate-900">
                  {globalStats.totalEmployees.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+12%</span>
                  <span className="text-sm text-slate-500 ml-1">vs mes anterior</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Órdenes Activas</p>
                <p className="text-2xl font-bold text-slate-900">
                  {globalStats.totalWorkOrders}
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">+5</span>
                  <span className="text-sm text-slate-500 ml-1">nuevas este mes</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Costo Nómina</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${(stats.totalPayrollCost / 1000000).toFixed(1)}M
                </p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-red-500 mr-1 transform rotate-180" />
                  <span className="text-sm text-red-600 font-medium">-2.1%</span>
                  <span className="text-sm text-slate-500 ml-1">optimización</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Países Activos</p>
                <p className="text-2xl font-bold text-slate-900">
                  {globalStats.totalCountries}
                </p>
                <div className="flex items-center mt-2">
                  <Globe className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-slate-600 font-medium">
                    {globalStats.totalOrganizations} organizaciones
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Countries Overview */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Operaciones por País
                  </CardTitle>
                  <p className="text-sm text-slate-600 mt-1">
                    Vista general de todas las ubicaciones
                  </p>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <BarChart3 className="w-5 h-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {hierarchyData.map((country) => (
                  <div key={country.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{country.name}</h3>
                          <p className="text-sm text-slate-600">
                            {country.statistics?.organizations} organizaciones • {country.statistics?.employees} empleados
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900">{country.statistics?.organizations}</div>
                        <div className="text-xs text-slate-600">Organizaciones</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900">{country.statistics?.workOrders}</div>
                        <div className="text-xs text-slate-600">Órdenes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900">{country.statistics?.employees}</div>
                        <div className="text-xs text-slate-600">Empleados</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                Acciones Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button 
                onClick={() => router.push('/employees')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-slate-900">Empleados</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button 
                onClick={() => router.push('/dashboard/payroll')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium text-slate-900">Nómina</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button 
                onClick={() => router.push('/dashboard/work-orders')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="font-medium text-slate-900">Órdenes</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button 
                onClick={() => router.push('/dashboard/compliance')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="font-medium text-slate-900">Cumplimiento</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">Nómina procesada</p>
                    <p className="text-xs text-slate-600">Panxea México • Hace 2 horas</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">Empleado agregado</p>
                    <p className="text-xs text-slate-600">Ana García • Marketing • Hace 5 horas</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">Configuración actualizada</p>
                    <p className="text-xs text-slate-600">Beneficios de salud • Hace 1 día</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="border-0 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Próximas Tareas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-red-900">Procesar nómina</p>
                    <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">
                      Alta
                    </span>
                  </div>
                  <p className="text-xs text-red-700">Panxea México • En 2 días</p>
                </div>
                
                <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-yellow-900">Revisión contratos</p>
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                      Media
                    </span>
                  </div>
                  <p className="text-xs text-yellow-700">TechStart • En 1 semana</p>
                </div>
                
                <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-green-900">Actualizar beneficios</p>
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                      Baja
                    </span>
                  </div>
                  <p className="text-xs text-green-700">GlobalCorp Brasil • En 2 semanas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}