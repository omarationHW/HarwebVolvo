'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Settings,
  Calculator,
  Building2,
  Globe,
  Users,
  FileText,
  Shield,
  Zap,
  ArrowRight,
  Edit,
  Plus,
  BarChart3,
  Workflow,
  FolderTree
} from 'lucide-react'

interface ConfigurationModule {
  id: string
  name: string
  description: string
  icon: any
  href: string
  color: string
  status: 'active' | 'pending' | 'configured'
  itemCount?: number
}

export default function SettingsPage() {
  const router = useRouter()
  
  const configurationModules: ConfigurationModule[] = [
    {
      id: 'work-orders',
      name: 'Editor de Órdenes de Trabajo',
      description: 'Sistema de gestión multi-tenant con auto-escalamiento y enrutamiento geográfico inteligente',
      icon: Workflow,
      href: '/dashboard/settings/work-orders',
      color: 'indigo',
      status: 'active',
      itemCount: 12
    },
    {
      id: 'hierarchical-catalogs',
      name: 'Catálogos Jerárquicos',
      description: 'Administración de países, organizaciones y empleadores con estructura jerárquica',
      icon: FolderTree,
      href: '/dashboard/settings/catalogs',
      color: 'emerald',
      status: 'active',
      itemCount: 32
    },
    {
      id: 'payroll-concepts',
      name: 'Conceptos de Nómina',
      description: 'Editor de percepciones, deducciones y aportaciones con fórmulas personalizadas',
      icon: Calculator,
      href: '/dashboard/settings/payroll-concepts',
      color: 'blue',
      status: 'configured',
      itemCount: 45
    },
    {
      id: 'country-config',
      name: 'Configuración País',
      description: 'Impuestos, seguridad social, salarios mínimos y regulaciones laborales',
      icon: Globe,
      href: '/dashboard/settings/country-config',
      color: 'green',
      status: 'configured',
      itemCount: 12
    },
    {
      id: 'organization-config',
      name: 'Configuración Organización',
      description: 'Política salarial, beneficios, horarios y centros de costo',
      icon: Building2,
      href: '/dashboard/settings/organization-config',
      color: 'purple',
      status: 'active',
      itemCount: 8
    },
    {
      id: 'employee-config',
      name: 'Configuración Empleados',
      description: 'Configuraciones específicas, excepciones y casos especiales',
      icon: Users,
      href: '/dashboard/settings/employee-config',
      color: 'orange',
      status: 'pending',
      itemCount: 23
    },
    {
      id: 'tax-tables',
      name: 'Tablas Fiscales',
      description: 'ISR, subsidios, UMA y actualizaciones automáticas de autoridades',
      icon: FileText,
      href: '/dashboard/settings/tax-tables',
      color: 'red',
      status: 'configured',
      itemCount: 6
    },
    {
      id: 'compliance',
      name: 'Cumplimiento Legal',
      description: 'Validaciones automáticas, timbrado fiscal y reportes gubernamentales',
      icon: Shield,
      href: '/dashboard/settings/compliance',
      color: 'teal',
      status: 'active',
      itemCount: 15
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'configured': return 'bg-green-100 text-green-700 border-green-200'
      case 'active': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'configured': return 'Configurado'
      case 'active': return 'En Uso'
      case 'pending': return 'Pendiente'
      default: return status
    }
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'indigo': return 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-100'
      case 'emerald': return 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-100'
      case 'blue': return 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-100'
      case 'green': return 'bg-green-50 text-green-600 hover:bg-green-100 border-green-100'
      case 'purple': return 'bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-100'
      case 'orange': return 'bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-100'
      case 'red': return 'bg-red-50 text-red-600 hover:bg-red-100 border-red-100'
      case 'teal': return 'bg-teal-50 text-teal-600 hover:bg-teal-100 border-teal-100'
      default: return 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración del Sistema</h1>
            <p className="text-gray-600 text-lg">
              Gestión avanzada de conceptos de nómina y configuración jerárquica
            </p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center">
            <Settings className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
              <Calculator className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">45</div>
            <div className="text-sm text-gray-500">Conceptos Activos</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
              <Globe className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-500">Niveles Configuración</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">98%</div>
            <div className="text-sm text-gray-500">Compliance Legal</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
              <Zap className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-sm text-gray-500">Actualizaciones</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          className="hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 group"
          onClick={() => router.push('/dashboard/settings/payroll-concepts/new')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Crear Concepto</h3>
                <p className="text-gray-600 text-sm mb-4">Agregar nueva percepción, deducción o aportación</p>
                <div className="flex items-center text-blue-600">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="text-sm">Nuevo concepto</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Plus className="h-7 w-7 text-blue-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 group"
          onClick={() => router.push('/dashboard/settings/country-config')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Configurar País</h3>
                <p className="text-gray-600 text-sm mb-4">Actualizar tablas fiscales y regulaciones</p>
                <div className="flex items-center text-green-600">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="text-sm">Configuración legal</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <Globe className="h-7 w-7 text-green-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 group"
          onClick={() => router.push('/dashboard/settings/compliance')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">Validar Cumplimiento</h3>
                <p className="text-gray-600 text-sm mb-4">Revisar compliance y reportes fiscales</p>
                <div className="flex items-center text-teal-600">
                  <Shield className="h-4 w-4 mr-2" />
                  <span className="text-sm">Auditoría legal</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                  <Shield className="h-7 w-7 text-teal-600" />
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-teal-600 transition-colors" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Modules */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Módulos de Configuración</h2>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Ver Dashboard
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {configurationModules.map((module) => (
            <Card 
              key={module.id} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 group"
              onClick={() => router.push(module.href)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${getColorClasses(module.color)}`}>
                    <module.icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(module.status)}`}>
                      {getStatusLabel(module.status)}
                    </span>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {module.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                  
                  {module.itemCount && (
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <span className="text-sm text-gray-500">
                        {module.itemCount} elementos configurados
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border border-gray-100">
        <CardHeader className="pb-4 border-b border-gray-50">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-600" />
            <span className="text-gray-900">Actividad Reciente de Configuración</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[
              {
                action: 'Actualización de tablas ISR',
                detail: 'Tablas fiscales 2025 - Autoridades Hacendarias',
                time: 'Hace 2 horas',
                type: 'update',
                user: 'Sistema Automático'
              },
              {
                action: 'Nuevo concepto creado',
                detail: 'Bono de Productividad Q1 - Ventas',
                time: 'Hace 5 horas',
                type: 'create',
                user: 'Ana López - CEO'
              },
              {
                action: 'Configuración de organización modificada',
                detail: 'Política de horarios - Trabajo híbrido',
                time: 'Hace 1 día',
                type: 'update',
                user: 'Roberto Silva - Director'
              },
              {
                action: 'Validación de compliance completada',
                detail: 'Auditoría fiscal Q4 2024 - Sin observaciones',
                time: 'Hace 2 días',
                type: 'validation',
                user: 'Sistema de Compliance'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'create' ? 'bg-green-500' :
                  activity.type === 'update' ? 'bg-blue-500' :
                  activity.type === 'validation' ? 'bg-purple-500' : 'bg-gray-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600 truncate">{activity.detail}</p>
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