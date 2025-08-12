'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3,
  TrendingUp,
  Globe,
  Building2,
  Users,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  PieChart,
  Activity,
  Zap,
  Shield,
  Settings,
  Download,
  RefreshCw,
  Eye,
  Filter,
  Search
} from 'lucide-react'

interface ExecutiveSummary {
  totalCountries: number
  activeCountries: number
  totalOrganizations: number
  activeOrganizations: number
  totalEmployers: number
  activeEmployers: number
  totalEmployees: number
  activeEmployees: number
  monthlyPayrollCost: number
  averageSalary: number
  complianceScore: number
  systemUptime: number
}

interface CountryMetrics {
  id: string
  name: string
  flag: string
  organizations: number
  employers: number
  employees: number
  payrollCost: number
  averageSalary: number
  complianceScore: number
  status: 'active' | 'setup' | 'inactive'
  riskLevel: 'low' | 'medium' | 'high'
  lastUpdate: string
}

interface IndustryMetrics {
  industry: string
  organizations: number
  employees: number
  payrollCost: number
  averageSalary: number
  growth: number
}

interface ComplianceAlert {
  id: string
  type: 'critical' | 'warning' | 'info'
  country: string
  organization: string
  message: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
}

const mockExecutiveSummary: ExecutiveSummary = {
  totalCountries: 8,
  activeCountries: 7,
  totalOrganizations: 11,
  activeOrganizations: 10,
  totalEmployers: 13,
  activeEmployers: 12,
  totalEmployees: 19320,
  activeEmployees: 18850,
  monthlyPayrollCost: 51236000,
  averageSalary: 68500,
  complianceScore: 96.5,
  systemUptime: 99.87
}

const mockCountryMetrics: CountryMetrics[] = [
  {
    id: 'mx',
    name: 'México',
    flag: '🇲🇽',
    organizations: 2,
    employers: 3,
    employees: 4342,
    payrollCost: 14525000,
    averageSalary: 85000,
    complianceScore: 98.5,
    status: 'active',
    riskLevel: 'low',
    lastUpdate: '2025-01-04T08:30:00Z'
  },
  {
    id: 'us',
    name: 'Estados Unidos',
    flag: '🇺🇸',
    organizations: 1,
    employers: 1,
    employees: 450,
    payrollCost: 4500000,
    averageSalary: 120000,
    complianceScore: 95.2,
    status: 'active',
    riskLevel: 'low',
    lastUpdate: '2024-12-28T14:20:00Z'
  },
  {
    id: 'ca',
    name: 'Canadá',
    flag: '🇨🇦',
    organizations: 1,
    employers: 1,
    employees: 180,
    payrollCost: 1125000,
    averageSalary: 75000,
    complianceScore: 97.8,
    status: 'active',
    riskLevel: 'low',
    lastUpdate: '2024-11-20T16:45:00Z'
  },
  {
    id: 'ar',
    name: 'Argentina',
    flag: '🇦🇷',
    organizations: 2,
    employers: 2,
    employees: 1370,
    payrollCost: 11455000,
    averageSalary: 80000,
    complianceScore: 94.5,
    status: 'active',
    riskLevel: 'medium',
    lastUpdate: '2025-01-03T11:20:00Z'
  },
  {
    id: 'cl',
    name: 'Chile',
    flag: '🇨🇱',
    organizations: 2,
    employers: 2,
    employees: 1330,
    payrollCost: 14649000,
    averageSalary: 91500,
    complianceScore: 96.8,
    status: 'active',
    riskLevel: 'low',
    lastUpdate: '2025-01-02T15:30:00Z'
  },
  {
    id: 'pe',
    name: 'Perú',
    flag: '🇵🇪',
    organizations: 3,
    employers: 3,
    employees: 1950,
    payrollCost: 5672000,
    averageSalary: 29300,
    complianceScore: 93.2,
    status: 'active',
    riskLevel: 'medium',
    lastUpdate: '2025-01-01T09:15:00Z'
  },
  {
    id: 'br',
    name: 'Brasil',
    flag: '🇧🇷',
    organizations: 1,
    employers: 1,
    employees: 25,
    payrollCost: 120000,
    averageSalary: 45000,
    complianceScore: 89.5,
    status: 'setup',
    riskLevel: 'high',
    lastUpdate: '2024-12-20T11:30:00Z'
  },
  {
    id: 'co',
    name: 'Colombia',
    flag: '🇨🇴',
    organizations: 1,
    employers: 1,
    employees: 45,
    payrollCost: 1575000,
    averageSalary: 35000,
    complianceScore: 91.8,
    status: 'active',
    riskLevel: 'medium',
    lastUpdate: '2025-01-04T09:00:00Z'
  }
]

const mockIndustryMetrics: IndustryMetrics[] = [
  {
    industry: 'Tecnología',
    organizations: 3,
    employees: 1745,
    payrollCost: 12025000,
    averageSalary: 85000,
    growth: 15.2
  },
  {
    industry: 'Servicios Financieros',
    organizations: 1,
    employees: 850,
    payrollCost: 8075000,
    averageSalary: 95000,
    growth: 8.5
  },
  {
    industry: 'Minería',
    organizations: 1,
    employees: 950,
    payrollCost: 12825000,
    averageSalary: 135000,
    growth: 5.8
  },
  {
    industry: 'Textil',
    organizations: 1,
    employees: 1450,
    payrollCost: 4060000,
    averageSalary: 28000,
    growth: 12.3
  },
  {
    industry: 'Agroindustria',
    organizations: 1,
    employees: 520,
    payrollCost: 3380000,
    averageSalary: 65000,
    growth: 3.2
  },
  {
    industry: 'Retail',
    organizations: 1,
    employees: 380,
    payrollCost: 1824000,
    averageSalary: 48000,
    growth: 7.8
  }
]

const mockComplianceAlerts: ComplianceAlert[] = [
  {
    id: '1',
    type: 'critical',
    country: 'Brasil',
    organization: 'Innovation Hub Brasil',
    message: 'Configuración de FGTS pendiente - Vencimiento en 5 días',
    dueDate: '2025-01-09T00:00:00Z',
    priority: 'high'
  },
  {
    id: '2',
    type: 'warning',
    country: 'Argentina',
    organization: 'Banco del Sur',
    message: 'Actualización de escalas salariales BCRA requerida',
    dueDate: '2025-01-15T00:00:00Z',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'warning',
    country: 'Perú',
    organization: 'Textil Perú',
    message: 'Renovación de licencia de exportación próxima',
    dueDate: '2025-01-20T00:00:00Z',
    priority: 'medium'
  },
  {
    id: '4',
    type: 'info',
    country: 'Chile',
    organization: 'Minera Andes',
    message: 'Actualización de normativas de seguridad minera disponible',
    dueDate: '2025-02-01T00:00:00Z',
    priority: 'low'
  }
]

export default function ExecutiveDashboardPage() {
  const router = useRouter()
  const [summary] = useState<ExecutiveSummary>(mockExecutiveSummary)
  const [countryMetrics] = useState<CountryMetrics[]>(mockCountryMetrics)
  const [industryMetrics] = useState<IndustryMetrics[]>(mockIndustryMetrics)
  const [complianceAlerts] = useState<ComplianceAlert[]>(mockComplianceAlerts)
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedView, setSelectedView] = useState('overview')

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />
      case 'warning': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-600" />
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-200 bg-red-50'
      case 'warning': return 'border-yellow-200 bg-yellow-50'
      case 'info': return 'border-blue-200 bg-blue-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'high': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const formatCurrency = (amount: number) => {
    return `$${(amount / 1000000).toFixed(1)}M`
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Ejecutivo</h1>
            <p className="text-gray-600 text-lg">
              Vista consolidada del sistema de gestión jerárquica multinacional
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
              <option value="1y">Último año</option>
            </select>
            <Button variant="outline" className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Actualizar</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Exportar Reporte</span>
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Países Activos</p>
                <p className="text-3xl font-bold text-gray-900">{summary.activeCountries}</p>
                <p className="text-xs text-gray-500">de {summary.totalCountries} total</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+3 países este año</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Empleados Activos</p>
                <p className="text-3xl font-bold text-gray-900">{formatNumber(summary.activeEmployees)}</p>
                <p className="text-xs text-gray-500">de {formatNumber(summary.totalEmployees)} total</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+8.5% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Nómina Mensual</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(summary.monthlyPayrollCost)}</p>
                <p className="text-xs text-gray-500">promedio ${formatNumber(summary.averageSalary)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+12.3% crecimiento anual</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Compliance Score</p>
                <p className="text-3xl font-bold text-gray-900">{summary.complianceScore}%</p>
                <p className="text-xs text-gray-500">uptime {summary.systemUptime}%</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">Excelente</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        {[
          { id: 'overview', label: 'Vista General', icon: BarChart3 },
          { id: 'countries', label: 'Por Países', icon: Globe },
          { id: 'industries', label: 'Por Industrias', icon: Building2 },
          { id: 'compliance', label: 'Compliance', icon: Shield }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedView(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 border-b-2 font-medium text-sm ${
              selectedView === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Countries Overview */}
      {selectedView === 'countries' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {countryMetrics.map((country) => (
            <Card key={country.id} className="border border-gray-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{country.flag}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{country.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(country.riskLevel)}`}>
                          {country.riskLevel === 'low' ? 'Bajo Riesgo' : 
                           country.riskLevel === 'medium' ? 'Riesgo Medio' : 'Alto Riesgo'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{country.complianceScore}%</div>
                    <div className="text-xs text-gray-500">Compliance</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <div className="font-bold text-purple-600">{country.organizations}</div>
                    <div className="text-xs text-gray-600">Orgs</div>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded">
                    <div className="font-bold text-orange-600">{country.employers}</div>
                    <div className="text-xs text-gray-600">Empleadores</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="font-bold text-green-600">{formatNumber(country.employees)}</div>
                    <div className="text-xs text-gray-600">Empleados</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nómina mensual:</span>
                    <span className="font-medium">{formatCurrency(country.payrollCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salario promedio:</span>
                    <span className="font-medium">${formatNumber(country.averageSalary)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Última actualización:</span>
                    <span className="font-medium text-xs">{new Date(country.lastUpdate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Detalles
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings className="h-4 w-4 mr-1" />
                    Configurar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Industries Overview */}
      {selectedView === 'industries' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-blue-600" />
                <span>Distribución por Industria</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {industryMetrics.map((industry, index) => (
                  <div key={industry.industry} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{industry.industry}</div>
                      <div className="text-sm text-gray-600">
                        {formatNumber(industry.employees)} empleados • {industry.organizations} org
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{formatCurrency(industry.payrollCost)}</div>
                      <div className="flex items-center text-sm">
                        {industry.growth > 0 ? (
                          <ArrowUp className="h-3 w-3 text-green-600 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-red-600 mr-1" />
                        )}
                        <span className={industry.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                          {Math.abs(industry.growth)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Métricas de Crecimiento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Crecimiento de Empleados</span>
                    <span className="text-sm text-green-600">+8.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Expansión Geográfica</span>
                    <span className="text-sm text-blue-600">+25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Compliance Score</span>
                    <span className="text-sm text-emerald-600">96.5%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '96.5%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Eficiencia Operativa</span>
                    <span className="text-sm text-purple-600">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Compliance Alerts */}
      {selectedView === 'compliance' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span>Alertas de Compliance</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceAlerts.map((alert) => (
                    <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                      <div className="flex items-start space-x-3">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="font-medium text-gray-900">{alert.country} • {alert.organization}</div>
                            <div className="text-xs text-gray-500">
                              Vence: {new Date(alert.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                          <p className="text-sm text-gray-700">{alert.message}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              alert.priority === 'high' ? 'bg-red-100 text-red-700' :
                              alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {alert.priority === 'high' ? 'Alta Prioridad' :
                               alert.priority === 'medium' ? 'Media Prioridad' : 'Baja Prioridad'}
                            </span>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">Ver</Button>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Resolver</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border border-gray-100 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <span>Score General</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">96.5%</div>
                  <div className="text-sm text-gray-600 mb-4">Compliance Score Global</div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '96.5%' }}></div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Fiscal</span>
                      <span className="font-medium">98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Laboral</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Seguridad Social</span>
                      <span className="font-medium">97%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span>Sistema</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Uptime</span>
                    <span className="font-medium text-green-600">99.87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tiempo Respuesta</span>
                    <span className="font-medium">45ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Procesos Activos</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Último Backup</span>
                    <span className="font-medium">Hace 2h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Overview Charts */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <span>Distribución Global</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="font-medium text-gray-900">8 Países</div>
                      <div className="text-sm text-gray-600">6 activos, 2 en configuración</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-blue-600">75%</div>
                    <div className="text-xs text-gray-500">Tasa activación</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-8 w-8 text-purple-600" />
                    <div>
                      <div className="font-medium text-gray-900">11 Organizaciones</div>
                      <div className="text-sm text-gray-600">10 activas, 1 en configuración</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-purple-600">91%</div>
                    <div className="text-xs text-gray-500">Tasa activación</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-orange-600" />
                    <div>
                      <div className="font-medium text-gray-900">13 Empleadores</div>
                      <div className="text-sm text-gray-600">12 activos, 1 en configuración</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-orange-600">92%</div>
                    <div className="text-xs text-gray-500">Tasa activación</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Tendencias de Crecimiento</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Empleados Últimos 12 Meses</span>
                    <span className="text-sm text-green-600">+2,340 (+13.4%)</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    Crecimiento constante en todas las regiones
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Expansión Geográfica</span>
                    <span className="text-sm text-blue-600">+3 países</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    Argentina, Chile y Perú añadidos este año
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Nuevas Industrias</span>
                    <span className="text-sm text-purple-600">+4 sectores</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    Minería, retail, textil y gastronomía
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-2xl text-green-600">↗ 15%</div>
                      <div className="text-gray-600">Crecimiento anual</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-2xl text-blue-600">8</div>
                      <div className="text-gray-600">Países activos</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}