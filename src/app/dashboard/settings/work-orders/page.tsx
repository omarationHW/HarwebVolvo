'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Workflow,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  Eye,
  Globe,
  Building2,
  Users,
  Server,
  Zap,
  TrendingUp,
  Shield,
  MapPin,
  Activity,
  Settings,
  CheckCircle,
  AlertTriangle,
  Clock,
  Database,
  Cpu,
  HardDrive,
  Wifi
} from 'lucide-react'

interface WorkOrder {
  id: string
  tenant_code: string
  company_name: string
  legal_name: string
  tax_id: string
  employee_count: number
  payroll_frequency: string
  isolation_level: 1 | 2 | 3
  primary_region: string
  countries: string[]
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
}

const mockWorkOrders: WorkOrder[] = [
  {
    id: 'wo-001',
    tenant_code: 'PANX-CORP',
    company_name: 'Panxea Corporation',
    legal_name: 'Panxea Corporation S.A. de C.V.',
    tax_id: 'PCO240101ABC',
    employee_count: 1250,
    payroll_frequency: 'biweekly',
    isolation_level: 2,
    primary_region: 'us-central',
    countries: ['MX', 'US'],
    status: 'active',
    created_at: '2024-01-15',
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
    compliance_score: 98
  },
  {
    id: 'wo-002',
    tenant_code: 'TECH-INNOV',
    company_name: 'Tech Innovation Labs',
    legal_name: 'Laboratorios de Innovación Tecnológica S.A.',
    tax_id: 'TIL240215DEF',
    employee_count: 450,
    payroll_frequency: 'monthly',
    isolation_level: 1,
    primary_region: 'mx-central',
    countries: ['MX'],
    status: 'active',
    created_at: '2024-02-15',
    last_activity: '2025-01-04T09:45:00Z',
    resource_usage: {
      cpu_usage: 42,
      memory_usage: 38,
      storage_usage: 28,
      bandwidth_usage: 25
    },
    sla_metrics: {
      uptime: 99.87,
      avg_response_time: 92
    },
    compliance_score: 96
  },
  {
    id: 'wo-003',
    tenant_code: 'GLOBAL-MFG',
    company_name: 'Global Manufacturing Inc.',
    legal_name: 'Global Manufacturing Incorporated',
    tax_id: 'GMI240301GHI',
    employee_count: 8500,
    payroll_frequency: 'weekly',
    isolation_level: 3,
    primary_region: 'multi-region',
    countries: ['MX', 'US', 'CA', 'BR'],
    status: 'active',
    created_at: '2024-03-01',
    last_activity: '2025-01-04T11:15:00Z',
    resource_usage: {
      cpu_usage: 78,
      memory_usage: 85,
      storage_usage: 68,
      bandwidth_usage: 82
    },
    sla_metrics: {
      uptime: 99.99,
      avg_response_time: 45
    },
    compliance_score: 100
  },
  {
    id: 'wo-004',
    tenant_code: 'STARTUP-X',
    company_name: 'Startup X Solutions',
    legal_name: 'Startup X Solutions S.A.P.I. de C.V.',
    tax_id: 'SXS240401JKL',
    employee_count: 85,
    payroll_frequency: 'biweekly',
    isolation_level: 1,
    primary_region: 'mx-central',
    countries: ['MX'],
    status: 'pending',
    created_at: '2024-04-01',
    last_activity: '2025-01-03T16:20:00Z',
    resource_usage: {
      cpu_usage: 15,
      memory_usage: 18,
      storage_usage: 12,
      bandwidth_usage: 8
    },
    sla_metrics: {
      uptime: 99.5,
      avg_response_time: 120
    },
    compliance_score: 88
  },
  {
    id: 'wo-005',
    tenant_code: 'MED-SYSTEMS',
    company_name: 'Medical Systems Corp',
    legal_name: 'Medical Systems Corporation S.A.',
    tax_id: 'MSC240501MNO',
    employee_count: 2800,
    payroll_frequency: 'biweekly',
    isolation_level: 2,
    primary_region: 'us-east',
    countries: ['US', 'MX'],
    status: 'migrating',
    created_at: '2024-05-01',
    last_activity: '2025-01-04T08:30:00Z',
    resource_usage: {
      cpu_usage: 55,
      memory_usage: 62,
      storage_usage: 48,
      bandwidth_usage: 45
    },
    sla_metrics: {
      uptime: 99.92,
      avg_response_time: 78
    },
    compliance_score: 94
  }
]

export default function WorkOrdersPage() {
  const router = useRouter()
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(mockWorkOrders)
  const [filteredOrders, setFilteredOrders] = useState<WorkOrder[]>(mockWorkOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    let filtered = workOrders

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.tenant_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.tax_id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter(order => order.isolation_level.toString() === levelFilter)
    }

    setFilteredOrders(filtered)
  }, [workOrders, searchTerm, statusFilter, levelFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'suspended': return 'bg-red-100 text-red-700 border-red-200'
      case 'migrating': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo'
      case 'pending': return 'Pendiente'
      case 'suspended': return 'Suspendido'
      case 'migrating': return 'Migrando'
      default: return status
    }
  }

  const getIsolationLevelLabel = (level: number) => {
    switch (level) {
      case 1: return 'Nivel 1 - Compartido'
      case 2: return 'Nivel 2 - Semi-dedicado'
      case 3: return 'Nivel 3 - Dedicado'
      default: return `Nivel ${level}`
    }
  }

  const getIsolationLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-blue-100 text-blue-700'
      case 2: return 'bg-purple-100 text-purple-700'
      case 3: return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const stats = {
    total: workOrders.length,
    active: workOrders.filter(wo => wo.status === 'active').length,
    totalEmployees: workOrders.reduce((sum, wo) => sum + wo.employee_count, 0),
    avgUptime: workOrders.reduce((sum, wo) => sum + wo.sla_metrics.uptime, 0) / workOrders.length,
    avgCompliance: workOrders.reduce((sum, wo) => sum + wo.compliance_score, 0) / workOrders.length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Editor de Órdenes de Trabajo</h1>
            <p className="text-gray-600 text-lg">
              Sistema de gestión multi-tenant con auto-escalamiento y enrutamiento geográfico inteligente
            </p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <Workflow className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg mx-auto mb-2">
              <Workflow className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Tenants</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
            <div className="text-sm text-gray-500">Activos</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalEmployees.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Empleados Total</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.avgUptime.toFixed(2)}%</div>
            <div className="text-sm text-gray-500">Uptime Promedio</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
              <Shield className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.avgCompliance.toFixed(0)}%</div>
            <div className="text-sm text-gray-500">Compliance Promedio</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar tenants..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="pending">Pendientes</option>
              <option value="suspended">Suspendidos</option>
              <option value="migrating">Migrando</option>
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
            >
              <option value="all">Todos los niveles</option>
              <option value="1">Nivel 1 - Compartido</option>
              <option value="2">Nivel 2 - Semi-dedicado</option>
              <option value="3">Nivel 3 - Dedicado</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={() => router.push('/dashboard/settings/work-orders/new')}
            className="bg-indigo-600 hover:bg-indigo-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Tenant</span>
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Mostrando {filteredOrders.length} de {workOrders.length} órdenes de trabajo
      </div>

      {/* Work Orders Table */}
      <Card className="border border-gray-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-900">Tenant</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Nivel de Aislamiento</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Empleados</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Regiones</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Performance</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Estado</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={order.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{order.company_name}</div>
                        <div className="text-sm text-gray-500">{order.tenant_code}</div>
                        <div className="text-xs text-gray-400">{order.tax_id}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getIsolationLevelColor(order.isolation_level)}`}>
                        {getIsolationLevelLabel(order.isolation_level)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-lg font-semibold text-gray-900">{order.employee_count.toLocaleString()}</div>
                      <div className="text-xs text-gray-500 capitalize">{order.payroll_frequency}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1 mb-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-900">{order.primary_region}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {order.countries.map(country => (
                          <span key={country} className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                            {country}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-3 w-3 text-green-500" />
                          <span className="text-sm text-gray-900">{order.sla_metrics.uptime}% uptime</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="h-3 w-3 text-blue-500" />
                          <span className="text-sm text-gray-900">{order.sla_metrics.avg_response_time}ms</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-3 w-3 text-purple-500" />
                          <span className="text-sm text-gray-900">{order.compliance_score}% compliance</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {order.status === 'active' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : order.status === 'migrating' ? (
                          <Clock className="h-4 w-4 text-blue-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => {
                            setSelectedOrder(order)
                            setShowDetails(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => router.push(`/dashboard/settings/work-orders/${order.id}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tenant Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedOrder.company_name}</h2>
                  <p className="text-gray-600">{selectedOrder.tenant_code} - {selectedOrder.legal_name}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Resource Usage */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Server className="h-5 w-5 text-blue-600" />
                      <span>Uso de Recursos</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center space-x-1">
                            <Cpu className="h-3 w-3" />
                            <span>CPU</span>
                          </span>
                          <span>{selectedOrder.resource_usage.cpu_usage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${selectedOrder.resource_usage.cpu_usage}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center space-x-1">
                            <Database className="h-3 w-3" />
                            <span>Memoria</span>
                          </span>
                          <span>{selectedOrder.resource_usage.memory_usage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${selectedOrder.resource_usage.memory_usage}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center space-x-1">
                            <HardDrive className="h-3 w-3" />
                            <span>Almacenamiento</span>
                          </span>
                          <span>{selectedOrder.resource_usage.storage_usage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${selectedOrder.resource_usage.storage_usage}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="flex items-center space-x-1">
                            <Wifi className="h-3 w-3" />
                            <span>Ancho de Banda</span>
                          </span>
                          <span>{selectedOrder.resource_usage.bandwidth_usage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full" 
                            style={{ width: `${selectedOrder.resource_usage.bandwidth_usage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SLA Metrics */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <span>Métricas SLA</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600">{selectedOrder.sla_metrics.uptime}%</div>
                      <div className="text-sm text-gray-600 mt-1">Uptime Actual</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600">{selectedOrder.sla_metrics.avg_response_time}ms</div>
                      <div className="text-sm text-gray-600 mt-1">Tiempo Respuesta Promedio</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600">{selectedOrder.compliance_score}%</div>
                      <div className="text-sm text-gray-600 mt-1">Compliance Score</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Configuration Info */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-gray-600" />
                      <span>Configuración</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de Aislamiento</label>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getIsolationLevelColor(selectedOrder.isolation_level)}`}>
                          {getIsolationLevelLabel(selectedOrder.isolation_level)}
                        </span>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Empleados</label>
                        <div className="text-lg font-semibold text-gray-900">{selectedOrder.employee_count.toLocaleString()}</div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Frecuencia de Nómina</label>
                        <div className="text-gray-900 capitalize">{selectedOrder.payroll_frequency}</div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Región Principal</label>
                        <div className="text-gray-900">{selectedOrder.primary_region}</div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Países</label>
                        <div className="flex flex-wrap gap-1">
                          {selectedOrder.countries.map(country => (
                            <span key={country} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                              {country}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Creado</label>
                        <div className="text-sm text-gray-600">{new Date(selectedOrder.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Workflow className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron órdenes de trabajo</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}