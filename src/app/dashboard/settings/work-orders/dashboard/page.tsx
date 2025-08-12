'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Workflow,
  Globe,
  Server,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  MapPin,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Settings,
  RefreshCw,
  Download,
  Filter,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus,
  Brain,
  Lightbulb,
  Bell,
  Lock
} from 'lucide-react'

interface GlobalMetrics {
  totalTenants: number
  activeTenants: number
  totalEmployees: number
  totalTransactions: number
  averageLatency: number
  globalUptime: number
  resourceUtilization: {
    cpu: number
    memory: number
    storage: number
    bandwidth: number
  }
  byIsolationLevel: {
    level1: number
    level2: number
    level3: number
  }
  byRegion: {
    [key: string]: number
  }
  byStatus: {
    active: number
    pending: number
    migrating: number
    suspended: number
  }
}

interface RealtimeMetrics {
  timestamp: string
  activeUsers: number
  transactionsPerSecond: number
  averageLatency: number
  errorRate: number
  cpuUsage: number
  memoryUsage: number
  networkTraffic: number
}

interface IntelligentAlert {
  id: string
  type: 'scaling' | 'performance' | 'compliance' | 'cost' | 'security'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  tenant_id?: string
  tenant_name?: string
  recommendation: string
  estimated_impact: string
  created_at: string
  auto_actionable: boolean
}

interface TenantPerformance {
  tenant_id: string
  tenant_name: string
  region: string
  isolation_level: number
  uptime: number
  avg_response_time: number
  error_rate: number
  employee_count: number
  resource_efficiency: number
  compliance_score: number
  cost_efficiency: number
  trend: 'up' | 'down' | 'stable'
}

export default function TenantManagementDashboard() {
  const [globalMetrics, setGlobalMetrics] = useState<GlobalMetrics>({
    totalTenants: 127,
    activeTenants: 118,
    totalEmployees: 245680,
    totalTransactions: 1847293,
    averageLatency: 67,
    globalUptime: 99.94,
    resourceUtilization: { cpu: 64, memory: 71, storage: 45, bandwidth: 38 },
    byIsolationLevel: { level1: 89, level2: 32, level3: 6 },
    byRegion: {
      'mx-central': 45,
      'us-central': 38,
      'us-east': 24,
      'us-west': 12,
      'ca-central': 8
    },
    byStatus: { active: 118, pending: 6, migrating: 2, suspended: 1 }
  })

  const [realtimeMetrics, setRealtimeMetrics] = useState<RealtimeMetrics>({
    timestamp: new Date().toISOString(),
    activeUsers: 12847,
    transactionsPerSecond: 2847,
    averageLatency: 67,
    errorRate: 0.012,
    cpuUsage: 64,
    memoryUsage: 71,
    networkTraffic: 8.4
  })

  const [intelligentAlerts, setIntelligentAlerts] = useState<IntelligentAlert[]>([
    {
      id: '1',
      type: 'scaling',
      severity: 'high',
      title: 'Migración Automática Recomendada',
      description: 'Tech Innovation Labs está cerca del umbral de 500 empleados',
      tenant_id: 'wo-002',
      tenant_name: 'Tech Innovation Labs',
      recommendation: 'Programar migración a Nivel 2 durante ventana de mantenimiento',
      estimated_impact: 'Mejora 40% en performance, costo adicional $2,400/mes',
      created_at: '2025-01-04T10:30:00Z',
      auto_actionable: true
    },
    {
      id: '2',
      type: 'performance',
      severity: 'medium',
      title: 'Optimización de Latencia Disponible',
      description: 'Usuarios en Brasil experimentan latencia elevada (180ms)',
      tenant_id: 'wo-003',
      tenant_name: 'Global Manufacturing Inc.',
      recommendation: 'Activar enrutamiento geográfico inteligente para región SA-East',
      estimated_impact: 'Reducción 60% latencia usuarios Brasil',
      created_at: '2025-01-04T09:15:00Z',
      auto_actionable: true
    },
    {
      id: '3',
      type: 'cost',
      severity: 'low',
      title: 'Oportunidad de Optimización de Costos',
      description: 'Recursos sub-utilizados en horarios nocturnos',
      recommendation: 'Implementar auto-scaling temporal con reducción nocturna',
      estimated_impact: 'Ahorro estimado $8,500/mes sin impacto en performance',
      created_at: '2025-01-04T08:45:00Z',
      auto_actionable: false
    },
    {
      id: '4',
      type: 'compliance',
      severity: 'high',
      title: 'Actualización de Compliance Requerida',
      description: 'Nueva regulación GDPR 2025 requiere actualización de políticas',
      recommendation: 'Actualizar configuraciones de retención de datos para 23 tenants EU',
      estimated_impact: 'Compliance 100% con nuevas regulaciones',
      created_at: '2025-01-03T16:20:00Z',
      auto_actionable: false
    }
  ])

  const [topPerformingTenants, setTopPerformingTenants] = useState<TenantPerformance[]>([
    {
      tenant_id: 'wo-003',
      tenant_name: 'Global Manufacturing Inc.',
      region: 'multi-region',
      isolation_level: 3,
      uptime: 99.99,
      avg_response_time: 45,
      error_rate: 0.001,
      employee_count: 8500,
      resource_efficiency: 94,
      compliance_score: 100,
      cost_efficiency: 87,
      trend: 'up'
    },
    {
      tenant_id: 'wo-001',
      tenant_name: 'Panxea Corporation',
      region: 'us-central',
      isolation_level: 2,
      uptime: 99.95,
      avg_response_time: 85,
      error_rate: 0.005,
      employee_count: 1250,
      resource_efficiency: 89,
      compliance_score: 98,
      cost_efficiency: 92,
      trend: 'stable'
    },
    {
      tenant_id: 'wo-005',
      tenant_name: 'Medical Systems Corp',
      region: 'us-east',
      isolation_level: 2,
      uptime: 99.92,
      avg_response_time: 78,
      error_rate: 0.008,
      employee_count: 2800,
      resource_efficiency: 85,
      compliance_score: 94,
      cost_efficiency: 88,
      trend: 'up'
    }
  ])

  const [selectedTimeRange, setSelectedTimeRange] = useState('24h')
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Simulate real-time updates
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      setRealtimeMetrics(prev => ({
        ...prev,
        timestamp: new Date().toISOString(),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 200 - 100),
        transactionsPerSecond: prev.transactionsPerSecond + Math.floor(Math.random() * 100 - 50),
        averageLatency: Math.max(45, prev.averageLatency + Math.floor(Math.random() * 10 - 5)),
        errorRate: Math.max(0, prev.errorRate + (Math.random() * 0.002 - 0.001)),
        cpuUsage: Math.max(30, Math.min(90, prev.cpuUsage + Math.floor(Math.random() * 6 - 3))),
        memoryUsage: Math.max(40, Math.min(85, prev.memoryUsage + Math.floor(Math.random() * 4 - 2))),
        networkTraffic: Math.max(5, prev.networkTraffic + (Math.random() * 2 - 1))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50 text-red-700'
      case 'high': return 'border-orange-500 bg-orange-50 text-orange-700'
      case 'medium': return 'border-yellow-500 bg-yellow-50 text-yellow-700'
      case 'low': return 'border-blue-500 bg-blue-50 text-blue-700'
      default: return 'border-gray-500 bg-gray-50 text-gray-700'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'scaling': return <TrendingUp className="h-4 w-4" />
      case 'performance': return <Zap className="h-4 w-4" />
      case 'compliance': return <Shield className="h-4 w-4" />
      case 'cost': return <Target className="h-4 w-4" />
      case 'security': return <Lock className="h-4 w-4" />
      default: return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Gestión Multi-Tenant</h1>
            <p className="text-gray-600 text-lg">
              Monitoreo en tiempo real, análisis predictivo y optimización automática
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Activity className={`h-4 w-4 ${autoRefresh ? 'text-green-500' : 'text-gray-400'}`} />
              <span>Auto-refresh {autoRefresh ? 'ON' : 'OFF'}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={autoRefresh ? 'border-green-500 text-green-600' : ''}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Pausar' : 'Activar'}
            </Button>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              <option value="1h">Última hora</option>
              <option value="24h">Últimas 24h</option>
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
            </select>
          </div>
        </div>
      </div>

      {/* Global Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tenants</p>
                <p className="text-2xl font-bold text-gray-900">{globalMetrics.totalTenants}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Workflow className="h-5 w-5 text-indigo-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">+3 este mes</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Empleados Total</p>
                <p className="text-2xl font-bold text-gray-900">{globalMetrics.totalEmployees.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">+8.2% YoY</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime Global</p>
                <p className="text-2xl font-bold text-gray-900">{globalMetrics.globalUptime}%</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">SLA cumplido</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Latencia Promedio</p>
                <p className="text-2xl font-bold text-gray-900">{realtimeMetrics.averageLatency}ms</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">-12ms esta semana</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Transacciones/Seg</p>
                <p className="text-2xl font-bold text-gray-900">{realtimeMetrics.transactionsPerSecond.toLocaleString()}</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Activity className="h-5 w-5 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <Activity className="h-3 w-3 text-blue-500 mr-1" />
              <span className="text-blue-600">Tiempo real</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Error Rate</p>
                <p className="text-2xl font-bold text-gray-900">{(realtimeMetrics.errorRate * 100).toFixed(3)}%</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">Dentro de SLA</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resource Utilization */}
        <Card className="lg:col-span-2 border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Server className="h-5 w-5 text-blue-600" />
                <span>Utilización Global de Recursos</span>
              </div>
              <div className="text-sm text-gray-500">
                Actualizado: {new Date(realtimeMetrics.timestamp).toLocaleTimeString()}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                    <Cpu className="h-4 w-4" />
                    <span>CPU</span>
                  </span>
                  <span className="text-sm text-gray-900">{realtimeMetrics.cpuUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${realtimeMetrics.cpuUsage}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                    <Database className="h-4 w-4" />
                    <span>Memoria</span>
                  </span>
                  <span className="text-sm text-gray-900">{realtimeMetrics.memoryUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${realtimeMetrics.memoryUsage}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                    <HardDrive className="h-4 w-4" />
                    <span>Storage</span>
                  </span>
                  <span className="text-sm text-gray-900">{globalMetrics.resourceUtilization.storage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full" 
                    style={{ width: `${globalMetrics.resourceUtilization.storage}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1 text-sm font-medium text-gray-700">
                    <Wifi className="h-4 w-4" />
                    <span>Red</span>
                  </span>
                  <span className="text-sm text-gray-900">{realtimeMetrics.networkTraffic.toFixed(1)} GB/s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(100, (realtimeMetrics.networkTraffic / 10) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Distribution by Isolation Level */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-medium text-gray-900 mb-3">Distribución por Nivel de Aislamiento</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{globalMetrics.byIsolationLevel.level1}</div>
                  <div className="text-sm text-gray-600">Nivel 1 - Compartido</div>
                  <div className="text-xs text-gray-500">Hasta 500 empleados</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{globalMetrics.byIsolationLevel.level2}</div>
                  <div className="text-sm text-gray-600">Nivel 2 - Semi-dedicado</div>
                  <div className="text-xs text-gray-500">500-5K empleados</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{globalMetrics.byIsolationLevel.level3}</div>
                  <div className="text-sm text-gray-600">Nivel 3 - Dedicado</div>
                  <div className="text-xs text-gray-500">+5K empleados</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Intelligent Alerts */}
        <Card className="border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <span>Alertas Inteligentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {intelligentAlerts.slice(0, 4).map(alert => (
              <div 
                key={alert.id}
                className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(alert.type)}
                    <span className="font-medium text-sm">{alert.title}</span>
                  </div>
                  {alert.auto_actionable && (
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      Auto-Fix
                    </Button>
                  )}
                </div>
                <p className="text-xs mb-2">{alert.description}</p>
                {alert.tenant_name && (
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Tenant:</strong> {alert.tenant_name}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  <strong>Impacto:</strong> {alert.estimated_impact}
                </p>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              Ver Todas las Alertas
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Tenants */}
        <Card className="border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Tenants con Mejor Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingTenants.map((tenant, index) => (
                <div key={tenant.tenant_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{tenant.tenant_name}</div>
                      <div className="text-xs text-gray-500">
                        {tenant.employee_count.toLocaleString()} empleados • Nivel {tenant.isolation_level}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{tenant.uptime}%</span>
                      {tenant.trend === 'up' ? (
                        <ArrowUp className="h-4 w-4 text-green-500" />
                      ) : tenant.trend === 'down' ? (
                        <ArrowDown className="h-4 w-4 text-red-500" />
                      ) : (
                        <Minus className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{tenant.avg_response_time}ms avg</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card className="border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>Distribución Geográfica</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(globalMetrics.byRegion).map(([region, count]) => (
                <div key={region} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {region === 'mx-central' && 'México Central'}
                      {region === 'us-central' && 'Estados Unidos Central'}
                      {region === 'us-east' && 'Estados Unidos Este'}
                      {region === 'us-west' && 'Estados Unidos Oeste'}
                      {region === 'ca-central' && 'Canadá Central'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(count / globalMetrics.totalTenants) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 mt-4">
              <h4 className="font-medium text-gray-900 mb-3">Latencia por Región</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="text-lg font-bold text-green-600">45ms</div>
                  <div className="text-xs text-gray-600">México</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="text-lg font-bold text-blue-600">67ms</div>
                  <div className="text-xs text-gray-600">Estados Unidos</div>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded">
                  <div className="text-lg font-bold text-purple-600">89ms</div>
                  <div className="text-xs text-gray-600">Canadá</div>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded">
                  <div className="text-lg font-bold text-orange-600">134ms</div>
                  <div className="text-xs text-gray-600">Brasil</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Center */}
      <Card className="border border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-gray-600" />
              <span>Centro de Acciones Rápidas</span>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar Reporte
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros Avanzados
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <span className="text-sm">Optimizar Performance</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Shield className="h-6 w-6 text-green-600" />
              <span className="text-sm">Verificar Compliance</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Target className="h-6 w-6 text-purple-600" />
              <span className="text-sm">Reducir Costos</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
              <Lightbulb className="h-6 w-6 text-orange-600" />
              <span className="text-sm">Recomendaciones ML</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}