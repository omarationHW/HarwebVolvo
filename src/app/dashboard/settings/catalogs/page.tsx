'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FolderTree,
  Globe,
  Building2,
  Users,
  ArrowRight,
  Plus,
  Edit,
  Eye,
  BarChart3,
  TrendingUp,
  Settings,
  Flag,
  Building,
  UserCheck,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react'

interface CatalogModule {
  id: string
  name: string
  description: string
  icon: any
  href: string
  color: string
  itemCount: number
  activeCount: number
  level: number
  parentCount?: number
}

interface HierarchyStats {
  countries: number
  organizations: number
  employers: number
  totalEmployees: number
  activeCountries: number
  activeOrganizations: number
  activeEmployers: number
}

export default function HierarchicalCatalogsPage() {
  const router = useRouter()
  
  const [hierarchyStats] = useState<HierarchyStats>({
    countries: 8,
    organizations: 11,
    employers: 13,
    totalEmployees: 19320,
    activeCountries: 7,
    activeOrganizations: 10,
    activeEmployers: 12
  })

  const catalogModules: CatalogModule[] = [
    {
      id: 'countries',
      name: 'Catálogo de Países',
      description: 'Administración de países y configuraciones fiscales/legales por jurisdicción',
      icon: Globe,
      href: '/dashboard/settings/catalogs/countries',
      color: 'blue',
      itemCount: hierarchyStats.countries,
      activeCount: hierarchyStats.activeCountries,
      level: 1
    },
    {
      id: 'organizations',
      name: 'Catálogo de Organizaciones',
      description: 'Gestión de organizaciones corporativas y sus políticas por país',
      icon: Building2,
      href: '/dashboard/settings/catalogs/organizations',
      color: 'purple',
      itemCount: hierarchyStats.organizations,
      activeCount: hierarchyStats.activeOrganizations,
      level: 2,
      parentCount: hierarchyStats.activeCountries
    },
    {
      id: 'employers',
      name: 'Catálogo de Empleadores',
      description: 'Administración de empleadores/tenants y su configuración específica',
      icon: Users,
      href: '/dashboard/settings/catalogs/employers',
      color: 'orange',
      itemCount: hierarchyStats.employers,
      activeCount: hierarchyStats.activeEmployers,
      level: 3,
      parentCount: hierarchyStats.activeOrganizations
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-600 to-blue-700'
      case 'purple': return 'from-purple-600 to-purple-700'
      case 'orange': return 'from-orange-600 to-orange-700'
      default: return 'from-gray-600 to-gray-700'
    }
  }

  const getIconBgColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600'
      case 'purple': return 'bg-purple-100 text-purple-600'
      case 'orange': return 'bg-orange-100 text-orange-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogos Jerárquicos</h1>
            <p className="text-gray-600 text-lg">
              Administración estructurada de países, organizaciones y empleadores
            </p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center">
            <FolderTree className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{hierarchyStats.countries}</div>
            <div className="text-sm text-gray-500">Países</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
              <Building2 className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{hierarchyStats.organizations}</div>
            <div className="text-sm text-gray-500">Organizaciones</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{hierarchyStats.employers}</div>
            <div className="text-sm text-gray-500">Empleadores</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{hierarchyStats.totalEmployees.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Empleados Total</div>
          </div>
        </div>
      </div>

      {/* Hierarchy Visualization */}
      <Card className="border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FolderTree className="h-5 w-5 text-emerald-600" />
            <span>Estructura Jerárquica</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Hierarchy Flow */}
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-3">
                    <Globe className="h-10 w-10 text-white" />
                  </div>
                  <div className="font-semibold text-gray-900">Países</div>
                  <div className="text-sm text-gray-500">Nivel 1</div>
                </div>
                
                <ArrowRight className="h-6 w-6 text-gray-400" />
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mb-3">
                    <Building2 className="h-10 w-10 text-white" />
                  </div>
                  <div className="font-semibold text-gray-900">Organizaciones</div>
                  <div className="text-sm text-gray-500">Nivel 2</div>
                </div>
                
                <ArrowRight className="h-6 w-6 text-gray-400" />
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center mb-3">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <div className="font-semibold text-gray-900">Empleadores</div>
                  <div className="text-sm text-gray-500">Nivel 3</div>
                </div>
              </div>
            </div>

            {/* Hierarchy Rules */}
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <h4 className="font-medium text-emerald-900 mb-2">Reglas de Jerarquía</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• Cada <strong>Organización</strong> pertenece a un <strong>País</strong> específico</li>
                <li>• Cada <strong>Empleador</strong> está asociado a una <strong>Organización</strong> determinada</li>
                <li>• Las configuraciones se heredan del nivel superior al inferior</li>
                <li>• Los empleadores pueden tener configuraciones específicas que sobrescriben la herencia</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 group"
          onClick={() => router.push('/dashboard/settings/catalogs/countries/new')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Agregar País</h3>
                <p className="text-gray-600 text-sm mb-4">Configurar nuevo país con sus regulaciones</p>
                <div className="flex items-center text-blue-600">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="text-sm">Nuevo país</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Globe className="h-7 w-7 text-blue-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 group"
          onClick={() => router.push('/dashboard/settings/catalogs/organizations/new')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">Crear Organización</h3>
                <p className="text-gray-600 text-sm mb-4">Establecer nueva entidad corporativa</p>
                <div className="flex items-center text-purple-600">
                  <Building className="h-4 w-4 mr-2" />
                  <span className="text-sm">Nueva organización</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                  <Building2 className="h-7 w-7 text-purple-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 group"
          onClick={() => router.push('/dashboard/settings/catalogs/employers/new')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">Registrar Empleador</h3>
                <p className="text-gray-600 text-sm mb-4">Agregar nuevo empleador/tenant</p>
                <div className="flex items-center text-orange-600">
                  <UserCheck className="h-4 w-4 mr-2" />
                  <span className="text-sm">Nuevo empleador</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                  <Users className="h-7 w-7 text-orange-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Catalog Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Módulos de Catálogo</h2>
          <div className="flex space-x-2">
            <Button 
              variant="default"
              size="sm"
              onClick={() => router.push('/dashboard/settings/catalogs/executive-dashboard')}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard Ejecutivo
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Todo
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Importar Masivo
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {catalogModules.map((module) => (
            <Card 
              key={module.id} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 group"
              onClick={() => router.push(module.href)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${getIconBgColor(module.color)}`}>
                      <module.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                          {module.name}
                        </h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          Nivel {module.level}
                        </span>
                        {module.level > 1 && (
                          <span className="text-xs text-gray-500">
                            {module.parentCount} padre{module.parentCount !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                        {module.description}
                      </p>
                      <div className="flex items-center space-x-6">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">{module.itemCount}</span>
                          <span className="text-gray-500 ml-1">total</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-green-600">{module.activeCount}</span>
                          <span className="text-gray-500 ml-1">activos</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-blue-600">
                            {((module.activeCount / module.itemCount) * 100).toFixed(0)}%
                          </span>
                          <span className="text-gray-500 ml-1">actividad</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col space-y-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border border-gray-100">
        <CardHeader className="pb-4 border-b border-gray-50">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-gray-600" />
              <span className="text-gray-900">Actividad Reciente en Catálogos</span>
            </div>
            <Button variant="outline" size="sm">
              Ver Todo
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[
              {
                action: 'Nuevo país registrado',
                detail: 'Colombia agregado con configuración fiscal completa',
                time: 'Hace 2 horas',
                type: 'create',
                level: 'País',
                user: 'Ana López - CEO'
              },
              {
                action: 'Organización actualizada',
                detail: 'Panxea Corp - Cambio de estructura organizacional',
                time: 'Hace 4 horas',
                type: 'update',
                level: 'Organización',
                user: 'Roberto Silva - Director'
              },
              {
                action: 'Empleador migrado',
                detail: 'Tech Innovation Labs - Migración a Nivel 2',
                time: 'Hace 6 horas',
                type: 'migration',
                level: 'Empleador',
                user: 'Sistema Automático'
              },
              {
                action: 'Configuración heredada',
                detail: '12 empleadores actualizados por cambio país México',
                time: 'Hace 1 día',
                type: 'inheritance',
                level: 'Múltiple',
                user: 'Sistema de Herencia'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'create' ? 'bg-green-500' :
                  activity.type === 'update' ? 'bg-blue-500' :
                  activity.type === 'migration' ? 'bg-purple-500' :
                  activity.type === 'inheritance' ? 'bg-orange-500' : 'bg-gray-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <span className="px-1.5 py-0.5 bg-gray-200 text-gray-700 text-xs rounded">
                      {activity.level}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{activity.detail}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-400">{activity.time}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}