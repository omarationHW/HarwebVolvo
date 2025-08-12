'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Workflow,
  ArrowLeft,
  Save,
  Settings,
  Server,
  Globe,
  Shield,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
  Cpu,
  Database,
  HardDrive,
  Wifi,
  MapPin,
  Users,
  Calendar,
  Zap,
  Activity,
  Edit,
  Copy,
  Trash2,
  RefreshCw,
  Eye,
  BarChart3,
  Clock
} from 'lucide-react'

interface TenantConfig {
  id: string
  tenant_code: string
  company_name: string
  legal_name: string
  tax_id: string
  industry: string
  employee_count: number
  projected_growth: number
  payroll_frequency: 'weekly' | 'biweekly' | 'monthly'
  countries: string[]
  primary_region: string
  secondary_regions: string[]
  routing_strategy: 'latency_optimized' | 'compliance_first' | 'cost_optimized'
  isolation_level: 1 | 2 | 3
  auto_scaling_enabled: boolean
  uptime_guarantee: number
  response_time_target: number
  support_level: 'basic' | 'premium' | 'enterprise'
  geo_redundancy: boolean
  data_protection_level: 'gdpr' | 'ccpa' | 'lgpd' | 'standard'
  security_profile: 'standard' | 'enhanced' | 'maximum'
  status: 'active' | 'pending' | 'suspended' | 'migrating'
  created_at: string
  last_activity: string
  resource_usage: {
    cpu_usage: number
    memory_usage: number
    storage_usage: number
    bandwidth_usage: number
  }
  sla_metrics: {
    uptime: number
    avg_response_time: number
  }
  compliance_score: number
  cost_per_month: number
  migration_history: Array<{
    from_level: number
    to_level: number
    date: string
    reason: string
    auto_triggered: boolean
  }>
}

export default function EditTenantPage() {
  const router = useRouter()
  const params = useParams()
  const tenantId = params.id as string

  const [tenant, setTenant] = useState<TenantConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [hasChanges, setHasChanges] = useState(false)

  // Mock data - in real app this would come from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockTenant: TenantConfig = {
        id: tenantId,
        tenant_code: 'PANX-CORP',
        company_name: 'Panxea Corporation',
        legal_name: 'Panxea Corporation S.A. de C.V.',
        tax_id: 'PCO240101ABC',
        industry: 'Tecnología',
        employee_count: 1250,
        projected_growth: 200,
        payroll_frequency: 'biweekly',
        countries: ['MX', 'US'],
        primary_region: 'us-central',
        secondary_regions: ['mx-central'],
        routing_strategy: 'latency_optimized',
        isolation_level: 2,
        auto_scaling_enabled: true,
        uptime_guarantee: 99.95,
        response_time_target: 85,
        support_level: 'premium',
        geo_redundancy: true,
        data_protection_level: 'standard',
        security_profile: 'enhanced',
        status: 'active',
        created_at: '2024-01-15T10:30:00Z',
        last_activity: '2025-01-04T10:30:00Z',
        resource_usage: {
          cpu_usage: 65,
          memory_usage: 72,
          storage_usage: 45,
          bandwidth_usage: 38
        },
        sla_metrics: {
          uptime: 99.95,
          avg_response_time: 85
        },
        compliance_score: 98,
        cost_per_month: 12500,
        migration_history: [
          {
            from_level: 1,
            to_level: 2,
            date: '2024-06-15T09:00:00Z',
            reason: 'Employee count exceeded 500 threshold',
            auto_triggered: true
          }
        ]
      }
      setTenant(mockTenant)
      setIsLoading(false)
    }, 1000)
  }, [tenantId])

  const handleSave = async () => {
    if (!tenant) return
    
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSaving(false)
    setHasChanges(false)
    
    // Show success message or redirect
    router.push('/dashboard/settings/work-orders')
  }

  const handleMigration = (targetLevel: 1 | 2 | 3) => {
    if (!tenant) return
    
    const updatedTenant = {
      ...tenant,
      isolation_level: targetLevel,
      status: 'migrating' as const,
      migration_history: [
        ...tenant.migration_history,
        {
          from_level: tenant.isolation_level,
          to_level: targetLevel,
          date: new Date().toISOString(),
          reason: 'Manual migration triggered by administrator',
          auto_triggered: false
        }
      ]
    }
    
    setTenant(updatedTenant)
    setHasChanges(true)
  }

  const tabs = [
    { id: 'basic', label: 'Información Básica', icon: Settings },
    { id: 'resources', label: 'Recursos y Performance', icon: Server },
    { id: 'geographic', label: 'Configuración Geográfica', icon: Globe },
    { id: 'compliance', label: 'Compliance y Seguridad', icon: Shield },
    { id: 'sla', label: 'SLA y Soporte', icon: Target },
    { id: 'analytics', label: 'Analytics y Costos', icon: BarChart3 }
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!tenant) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Tenant no encontrado</h3>
        <p className="text-gray-500">El tenant solicitado no existe o no tienes permisos para acceder.</p>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Comercial
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={tenant.company_name}
                  onChange={(e) => {
                    setTenant({ ...tenant, company_name: e.target.value })
                    setHasChanges(true)
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Razón Social
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={tenant.legal_name}
                  onChange={(e) => {
                    setTenant({ ...tenant, legal_name: e.target.value })
                    setHasChanges(true)
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RFC/Tax ID
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={tenant.tax_id}
                  onChange={(e) => {
                    setTenant({ ...tenant, tax_id: e.target.value.toUpperCase() })
                    setHasChanges(true)
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industria
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={tenant.industry}
                  onChange={(e) => {
                    setTenant({ ...tenant, industry: e.target.value })
                    setHasChanges(true)
                  }}
                >
                  <option value="Tecnología">Tecnología</option>
                  <option value="Manufactura">Manufactura</option>
                  <option value="Servicios Financieros">Servicios Financieros</option>
                  <option value="Salud">Salud</option>
                  <option value="Retail">Retail</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frecuencia de Nómina
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={tenant.payroll_frequency}
                  onChange={(e) => {
                    setTenant({ ...tenant, payroll_frequency: e.target.value as any })
                    setHasChanges(true)
                  }}
                >
                  <option value="weekly">Semanal</option>
                  <option value="biweekly">Quincenal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Empleados
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={tenant.employee_count}
                  onChange={(e) => {
                    const count = parseInt(e.target.value) || 0
                    setTenant({ ...tenant, employee_count: count })
                    setHasChanges(true)
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crecimiento Proyectado (anual)
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={tenant.projected_growth}
                  onChange={(e) => {
                    setTenant({ ...tenant, projected_growth: parseInt(e.target.value) || 0 })
                    setHasChanges(true)
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado del Tenant
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={tenant.status}
                onChange={(e) => {
                  setTenant({ ...tenant, status: e.target.value as any })
                  setHasChanges(true)
                }}
              >
                <option value="active">Activo</option>
                <option value="pending">Pendiente</option>
                <option value="suspended">Suspendido</option>
                <option value="migrating">Migrando</option>
              </select>
            </div>
          </div>
        )

      case 'resources':
        return (
          <div className="space-y-6">
            {/* Current Resource Usage */}
            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span>Uso Actual de Recursos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                        <Cpu className="h-4 w-4" />
                        <span>CPU</span>
                      </span>
                      <span className="text-sm text-gray-900">{tenant.resource_usage.cpu_usage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${tenant.resource_usage.cpu_usage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                        <Database className="h-4 w-4" />
                        <span>Memoria</span>
                      </span>
                      <span className="text-sm text-gray-900">{tenant.resource_usage.memory_usage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${tenant.resource_usage.memory_usage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                        <HardDrive className="h-4 w-4" />
                        <span>Storage</span>
                      </span>
                      <span className="text-sm text-gray-900">{tenant.resource_usage.storage_usage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${tenant.resource_usage.storage_usage}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                        <Wifi className="h-4 w-4" />
                        <span>Ancho de Banda</span>
                      </span>
                      <span className="text-sm text-gray-900">{tenant.resource_usage.bandwidth_usage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ width: `${tenant.resource_usage.bandwidth_usage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Migration Controls */}
            <Card className="border border-indigo-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  <span>Control de Migración de Nivel</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Info className="h-4 w-4 text-indigo-600" />
                    <span className="font-medium text-indigo-900">Nivel Actual: Nivel {tenant.isolation_level}</span>
                  </div>
                  <p className="text-sm text-indigo-700">
                    {tenant.isolation_level === 1 && "Recursos compartidos optimizados. Recomendado para hasta 500 empleados."}
                    {tenant.isolation_level === 2 && "Recursos semi-dedicados con performance garantizada. Óptimo para 500-5000 empleados."}
                    {tenant.isolation_level === 3 && "Infraestructura dedicada completa. Para más de 5000 empleados o requisitos especiales."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant={tenant.isolation_level === 1 ? "default" : "outline"}
                    onClick={() => handleMigration(1)}
                    disabled={tenant.isolation_level === 1}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Server className="h-6 w-6" />
                    <span>Nivel 1 - Compartido</span>
                  </Button>
                  <Button
                    variant={tenant.isolation_level === 2 ? "default" : "outline"}
                    onClick={() => handleMigration(2)}
                    disabled={tenant.isolation_level === 2}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Server className="h-6 w-6" />
                    <span>Nivel 2 - Semi-dedicado</span>
                  </Button>
                  <Button
                    variant={tenant.isolation_level === 3 ? "default" : "outline"}
                    onClick={() => handleMigration(3)}
                    disabled={tenant.isolation_level === 3}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Server className="h-6 w-6" />
                    <span>Nivel 3 - Dedicado</span>
                  </Button>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <input
                    type="checkbox"
                    checked={tenant.auto_scaling_enabled}
                    onChange={(e) => {
                      setTenant({ ...tenant, auto_scaling_enabled: e.target.checked })
                      setHasChanges(true)
                    }}
                    className="rounded border-gray-300"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Auto-escalamiento Habilitado</div>
                    <div className="text-sm text-gray-500">Migración automática basada en métricas de uso</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Migration History */}
            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-600" />
                  <span>Historial de Migraciones</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tenant.migration_history.map((migration, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">
                          Nivel {migration.from_level} → Nivel {migration.to_level}
                        </div>
                        <div className="text-sm text-gray-500">{migration.reason}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-900">
                          {new Date(migration.date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {migration.auto_triggered ? 'Automático' : 'Manual'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 'geographic':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Región Principal
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={tenant.primary_region}
                onChange={(e) => {
                  setTenant({ ...tenant, primary_region: e.target.value })
                  setHasChanges(true)
                }}
              >
                <option value="mx-central">México Central</option>
                <option value="us-central">Estados Unidos Central</option>
                <option value="us-east">Estados Unidos Este</option>
                <option value="us-west">Estados Unidos Oeste</option>
                <option value="ca-central">Canadá Central</option>
                <option value="multi-region">Multi-Región</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Estrategia de Enrutamiento
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'latency_optimized', label: 'Optimizado por Latencia', icon: Zap },
                  { value: 'compliance_first', label: 'Compliance Primero', icon: Shield },
                  { value: 'cost_optimized', label: 'Optimizado por Costo', icon: Target }
                ].map(strategy => (
                  <label 
                    key={strategy.value}
                    className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      tenant.routing_strategy === strategy.value 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="routing_strategy"
                      value={strategy.value}
                      checked={tenant.routing_strategy === strategy.value}
                      onChange={(e) => {
                        setTenant({ ...tenant, routing_strategy: e.target.value as any })
                        setHasChanges(true)
                      }}
                      className="sr-only"
                    />
                    <strategy.icon className="h-8 w-8 text-indigo-600 mb-2" />
                    <span className="font-medium text-gray-900 text-center">{strategy.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Países de Operación
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { code: 'MX', name: 'México', flag: '🇲🇽' },
                  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
                  { code: 'CA', name: 'Canadá', flag: '🇨🇦' },
                  { code: 'BR', name: 'Brasil', flag: '🇧🇷' }
                ].map(country => (
                  <label key={country.code} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={tenant.countries.includes(country.code)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTenant({ ...tenant, countries: [...tenant.countries, country.code] })
                        } else {
                          setTenant({ ...tenant, countries: tenant.countries.filter(c => c !== country.code) })
                        }
                        setHasChanges(true)
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-lg">{country.flag}</span>
                    <span className="text-sm font-medium text-gray-900">{country.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={tenant.geo_redundancy}
                onChange={(e) => {
                  setTenant({ ...tenant, geo_redundancy: e.target.checked })
                  setHasChanges(true)
                }}
                className="rounded border-gray-300"
              />
              <div>
                <div className="font-medium text-gray-900">Redundancia Geográfica</div>
                <div className="text-sm text-gray-500">Respaldo automático en múltiples regiones</div>
              </div>
            </div>
          </div>
        )

      case 'sla':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Garantía de Uptime (%)
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={tenant.uptime_guarantee}
                  onChange={(e) => {
                    setTenant({ ...tenant, uptime_guarantee: parseFloat(e.target.value) })
                    setHasChanges(true)
                  }}
                >
                  <option value={99.5}>99.5% - Básico</option>
                  <option value={99.9}>99.9% - Estándar</option>
                  <option value={99.95}>99.95% - Premium</option>
                  <option value={99.99}>99.99% - Enterprise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo de Respuesta Objetivo (ms)
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={tenant.response_time_target}
                  onChange={(e) => {
                    setTenant({ ...tenant, response_time_target: parseInt(e.target.value) })
                    setHasChanges(true)
                  }}
                >
                  <option value={200}>&lt; 200ms</option>
                  <option value={100}>&lt; 100ms</option>
                  <option value={50}>&lt; 50ms</option>
                  <option value={25}>&lt; 25ms</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Nivel de Soporte
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'basic', label: 'Básico' },
                  { value: 'premium', label: 'Premium' },
                  { value: 'enterprise', label: 'Enterprise' }
                ].map(level => (
                  <label 
                    key={level.value}
                    className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-colors ${
                      tenant.support_level === level.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="support_level"
                      value={level.value}
                      checked={tenant.support_level === level.value}
                      onChange={(e) => {
                        setTenant({ ...tenant, support_level: e.target.value as any })
                        setHasChanges(true)
                      }}
                      className="sr-only"
                    />
                    <div className="font-medium text-gray-900">{level.label}</div>
                  </label>
                ))}
              </div>
            </div>

            {/* Current SLA Performance */}
            <Card className="border border-green-100 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-900">Performance Actual vs SLA</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{tenant.sla_metrics.uptime}%</div>
                    <div className="text-sm text-gray-600">Uptime Actual</div>
                    <div className="text-xs text-gray-500">Objetivo: {tenant.uptime_guarantee}%</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{tenant.sla_metrics.avg_response_time}ms</div>
                    <div className="text-sm text-gray-600">Tiempo Respuesta</div>
                    <div className="text-xs text-gray-500">Objetivo: &lt;{tenant.response_time_target}ms</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return <div>Contenido de {activeTab}</div>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => router.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Editar Tenant: {tenant.company_name}
              </h1>
              <p className="text-gray-600 text-lg">
                {tenant.tenant_code} • {tenant.employee_count.toLocaleString()} empleados • Nivel {tenant.isolation_level}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {hasChanges && (
              <div className="flex items-center space-x-2 text-orange-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Cambios sin guardar</span>
              </div>
            )}
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-indigo-600 hover:bg-indigo-700 flex items-center space-x-2"
            >
              {isSaving ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Status Banner */}
      <Card className={`border ${
        tenant.status === 'active' ? 'border-green-200 bg-green-50' :
        tenant.status === 'migrating' ? 'border-blue-200 bg-blue-50' :
        tenant.status === 'suspended' ? 'border-red-200 bg-red-50' :
        'border-yellow-200 bg-yellow-50'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            {tenant.status === 'active' ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : tenant.status === 'migrating' ? (
              <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            )}
            <div>
              <div className="font-medium">
                Estado: {tenant.status === 'active' ? 'Activo' : 
                         tenant.status === 'migrating' ? 'Migrando' :
                         tenant.status === 'suspended' ? 'Suspendido' : 'Pendiente'}
              </div>
              <div className="text-sm text-gray-600">
                Última actividad: {new Date(tenant.last_activity).toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <Card className="border border-gray-100">
        <CardContent className="p-8">
          {renderTabContent()}
        </CardContent>
      </Card>
    </div>
  )
}