'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Globe,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  MoreVertical,
  Building2,
  Users,
  TrendingUp,
  DollarSign,
  Flag,
  MapPin,
  Calculator,
  Shield,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Download,
  Upload,
  Settings,
  Zap
} from 'lucide-react'

interface Country {
  id: string
  code: string
  name: string
  flag: string
  currency: string
  timezone: string
  language: string
  region: string
  status: 'active' | 'inactive' | 'setup'
  
  // Fiscal Configuration
  fiscal_config: {
    tax_year_start: string
    minimum_wage: number
    uma_value: number
    tax_regime: string
    vat_rate: number
  }
  
  // Labor Regulations
  labor_config: {
    max_work_hours_week: number
    overtime_multiplier: number
    vacation_days_year: number
    christmas_bonus_days: number
    severance_formula: string
  }
  
  // Social Security
  social_security: {
    employee_contribution: number
    employer_contribution: number
    pension_age: number
    disability_coverage: boolean
    health_coverage: boolean
  }
  
  // Statistics
  organizations_count: number
  employers_count: number
  employees_count: number
  
  created_at: string
  updated_at: string
  last_sync: string
}

const mockCountries: Country[] = [
  {
    id: 'mx',
    code: 'MX',
    name: 'México',
    flag: '🇲🇽',
    currency: 'MXN',
    timezone: 'America/Mexico_City',
    language: 'es',
    region: 'North America',
    status: 'active',
    fiscal_config: {
      tax_year_start: '01-01',
      minimum_wage: 248.93,
      uma_value: 108.57,
      tax_regime: 'Progressive',
      vat_rate: 16.0
    },
    labor_config: {
      max_work_hours_week: 48,
      overtime_multiplier: 2.0,
      vacation_days_year: 12,
      christmas_bonus_days: 15,
      severance_formula: '3_months_plus_20_days_per_year'
    },
    social_security: {
      employee_contribution: 2.5,
      employer_contribution: 7.0,
      pension_age: 65,
      disability_coverage: true,
      health_coverage: true
    },
    organizations_count: 23,
    employers_count: 78,
    employees_count: 156890,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2025-01-01T08:30:00Z',
    last_sync: '2025-01-04T10:15:00Z'
  },
  {
    id: 'us',
    code: 'US',
    name: 'Estados Unidos',
    flag: '🇺🇸',
    currency: 'USD',
    timezone: 'America/New_York',
    language: 'en',
    region: 'North America',
    status: 'active',
    fiscal_config: {
      tax_year_start: '01-01',
      minimum_wage: 7.25,
      uma_value: 0, // No equivalent
      tax_regime: 'Progressive',
      vat_rate: 0 // No federal VAT, state sales tax varies
    },
    labor_config: {
      max_work_hours_week: 40,
      overtime_multiplier: 1.5,
      vacation_days_year: 0, // No federal mandate
      christmas_bonus_days: 0, // No federal mandate
      severance_formula: 'at_will_employment'
    },
    social_security: {
      employee_contribution: 6.2,
      employer_contribution: 6.2,
      pension_age: 67,
      disability_coverage: true,
      health_coverage: false // Separate system
    },
    organizations_count: 12,
    employers_count: 28,
    employees_count: 67450,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-12-15T14:20:00Z',
    last_sync: '2025-01-04T09:45:00Z'
  },
  {
    id: 'ca',
    code: 'CA',
    name: 'Canadá',
    flag: '🇨🇦',
    currency: 'CAD',
    timezone: 'America/Toronto',
    language: 'en',
    region: 'North America',
    status: 'active',
    fiscal_config: {
      tax_year_start: '01-01',
      minimum_wage: 15.50,
      uma_value: 0,
      tax_regime: 'Progressive',
      vat_rate: 5.0 // GST
    },
    labor_config: {
      max_work_hours_week: 40,
      overtime_multiplier: 1.5,
      vacation_days_year: 10,
      christmas_bonus_days: 0,
      severance_formula: 'notice_period_based'
    },
    social_security: {
      employee_contribution: 5.95,
      employer_contribution: 7.37,
      pension_age: 65,
      disability_coverage: true,
      health_coverage: true
    },
    organizations_count: 5,
    employers_count: 12,
    employees_count: 18340,
    created_at: '2024-03-10T10:00:00Z',
    updated_at: '2024-11-20T16:45:00Z',
    last_sync: '2025-01-03T15:30:00Z'
  },
  {
    id: 'br',
    code: 'BR',
    name: 'Brasil',
    flag: '🇧🇷',
    currency: 'BRL',
    timezone: 'America/Sao_Paulo',
    language: 'pt',
    region: 'South America',
    status: 'setup',
    fiscal_config: {
      tax_year_start: '01-01',
      minimum_wage: 1320.00,
      uma_value: 0,
      tax_regime: 'Progressive',
      vat_rate: 17.0 // ICMS varies by state
    },
    labor_config: {
      max_work_hours_week: 44,
      overtime_multiplier: 1.5,
      vacation_days_year: 30,
      christmas_bonus_days: 30, // 13th salary
      severance_formula: 'fgts_plus_40_percent'
    },
    social_security: {
      employee_contribution: 11.0,
      employer_contribution: 20.0,
      pension_age: 65,
      disability_coverage: true,
      health_coverage: true
    },
    organizations_count: 3,
    employers_count: 6,
    employees_count: 2890,
    created_at: '2024-11-15T10:00:00Z',
    updated_at: '2024-12-20T11:30:00Z',
    last_sync: '2025-01-02T14:20:00Z'
  },
  {
    id: 'co',
    code: 'CO',
    name: 'Colombia',
    flag: '🇨🇴',
    currency: 'COP',
    timezone: 'America/Bogota',
    language: 'es',
    region: 'South America',
    status: 'active',
    fiscal_config: {
      tax_year_start: '01-01',
      minimum_wage: 1300000,
      uma_value: 0,
      tax_regime: 'Progressive',
      vat_rate: 19.0
    },
    labor_config: {
      max_work_hours_week: 48,
      overtime_multiplier: 1.25,
      vacation_days_year: 15,
      christmas_bonus_days: 30,
      severance_formula: 'one_month_per_year'
    },
    social_security: {
      employee_contribution: 4.0,
      employer_contribution: 12.0,
      pension_age: 62,
      disability_coverage: true,
      health_coverage: true
    },
    organizations_count: 1,
    employers_count: 1,
    employees_count: 45,
    created_at: '2025-01-04T09:00:00Z',
    updated_at: '2025-01-04T09:00:00Z',
    last_sync: '2025-01-04T09:00:00Z'
  },
  {
    id: 'ar',
    code: 'AR',
    name: 'Argentina',
    flag: '🇦🇷',
    currency: 'ARS',
    timezone: 'America/Buenos_Aires',
    language: 'es',
    region: 'South America',
    status: 'active',
    fiscal_config: {
      tax_year_start: '01-01',
      minimum_wage: 234315,
      uma_value: 0,
      tax_regime: 'Progressive',
      vat_rate: 21.0
    },
    labor_config: {
      max_work_hours_week: 48,
      overtime_multiplier: 1.5,
      vacation_days_year: 14,
      christmas_bonus_days: 30, // Aguinaldo
      severance_formula: 'one_month_per_year_plus_notice'
    },
    social_security: {
      employee_contribution: 17.0,
      employer_contribution: 26.4,
      pension_age: 65,
      disability_coverage: true,
      health_coverage: true
    },
    organizations_count: 4,
    employers_count: 8,
    employees_count: 3450,
    created_at: '2024-04-10T10:00:00Z',
    updated_at: '2025-01-03T11:20:00Z',
    last_sync: '2025-01-04T08:00:00Z'
  },
  {
    id: 'cl',
    code: 'CL',
    name: 'Chile',
    flag: '🇨🇱',
    currency: 'CLP',
    timezone: 'America/Santiago',
    language: 'es',
    region: 'South America',
    status: 'active',
    fiscal_config: {
      tax_year_start: '01-01',
      minimum_wage: 500000,
      uma_value: 0,
      tax_regime: 'Progressive',
      vat_rate: 19.0
    },
    labor_config: {
      max_work_hours_week: 45,
      overtime_multiplier: 1.5,
      vacation_days_year: 15,
      christmas_bonus_days: 0, // No mandatory
      severance_formula: 'one_month_per_year_max_11'
    },
    social_security: {
      employee_contribution: 20.5,
      employer_contribution: 7.0,
      pension_age: 65,
      disability_coverage: true,
      health_coverage: true
    },
    organizations_count: 3,
    employers_count: 6,
    employees_count: 2890,
    created_at: '2024-05-20T10:00:00Z',
    updated_at: '2025-01-02T15:30:00Z',
    last_sync: '2025-01-04T07:45:00Z'
  },
  {
    id: 'pe',
    code: 'PE',
    name: 'Perú',
    flag: '🇵🇪',
    currency: 'PEN',
    timezone: 'America/Lima',
    language: 'es',
    region: 'South America',
    status: 'active',
    fiscal_config: {
      tax_year_start: '01-01',
      minimum_wage: 1025,
      uma_value: 0,
      tax_regime: 'Progressive',
      vat_rate: 18.0
    },
    labor_config: {
      max_work_hours_week: 48,
      overtime_multiplier: 1.25,
      vacation_days_year: 30,
      christmas_bonus_days: 30, // Gratificación
      severance_formula: 'cts_compensation_time_service'
    },
    social_security: {
      employee_contribution: 13.0,
      employer_contribution: 9.0,
      pension_age: 65,
      disability_coverage: true,
      health_coverage: true
    },
    organizations_count: 5,
    employers_count: 10,
    employees_count: 4200,
    created_at: '2024-06-15T10:00:00Z',
    updated_at: '2025-01-01T09:15:00Z',
    last_sync: '2025-01-04T06:30:00Z'
  }
]

export default function CountriesCatalogPage() {
  const router = useRouter()
  const [countries, setCountries] = useState<Country[]>(mockCountries)
  const [filteredCountries, setFilteredCountries] = useState<Country[]>(mockCountries)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [regionFilter, setRegionFilter] = useState('all')
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    let filtered = countries

    if (searchTerm) {
      filtered = filtered.filter(country => 
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.currency.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(country => country.status === statusFilter)
    }

    if (regionFilter !== 'all') {
      filtered = filtered.filter(country => country.region === regionFilter)
    }

    setFilteredCountries(filtered)
  }, [countries, searchTerm, statusFilter, regionFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200'
      case 'inactive': return 'bg-red-100 text-red-700 border-red-200'
      case 'setup': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo'
      case 'inactive': return 'Inactivo'
      case 'setup': return 'En Configuración'
      default: return status
    }
  }

  const regions = Array.from(new Set(countries.map(country => country.region)))

  const stats = {
    total: countries.length,
    active: countries.filter(c => c.status === 'active').length,
    totalOrganizations: countries.reduce((sum, c) => sum + c.organizations_count, 0),
    totalEmployers: countries.reduce((sum, c) => sum + c.employers_count, 0),
    totalEmployees: countries.reduce((sum, c) => sum + c.employees_count, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogo de Países</h1>
            <p className="text-gray-600 text-lg">
              Administración de países y configuraciones fiscales/legales por jurisdicción
            </p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
            <Globe className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Países</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
            <div className="text-sm text-gray-500">Activos</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
              <Building2 className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalOrganizations}</div>
            <div className="text-sm text-gray-500">Organizaciones</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalEmployers}</div>
            <div className="text-sm text-gray-500">Empleadores</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg mx-auto mb-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalEmployees.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Empleados</div>
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
              placeholder="Buscar países..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="setup">En Configuración</option>
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              <option value="all">Todas las regiones</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Importar</span>
          </Button>
          <Button 
            onClick={() => router.push('/dashboard/settings/catalogs/countries/new')}
            className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo País</span>
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Mostrando {filteredCountries.length} de {countries.length} países
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCountries.map((country) => (
          <Card key={country.id} className="border border-gray-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{country.flag}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{country.name}</h3>
                    <div className="text-sm text-gray-500">{country.code} • {country.currency}</div>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(country.status)}`}>
                  {getStatusLabel(country.status)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Región:</span>
                  <span className="font-medium">{country.region}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Idioma:</span>
                  <span className="font-medium">{country.language.toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Zona Horaria:</span>
                  <span className="font-medium text-xs">{country.timezone}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-purple-50 rounded">
                  <div className="font-bold text-purple-600">{country.organizations_count}</div>
                  <div className="text-xs text-gray-600">Orgs</div>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded">
                  <div className="font-bold text-orange-600">{country.employers_count}</div>
                  <div className="text-xs text-gray-600">Empleadores</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="font-bold text-green-600">{country.employees_count.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Empleados</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                  <div>Salario Mín: {country.currency} {country.fiscal_config.minimum_wage.toLocaleString()}</div>
                  <div>IVA: {country.fiscal_config.vat_rate}%</div>
                  <div>Horas/Sem: {country.labor_config.max_work_hours_week}h</div>
                  <div>Seg. Social: {country.social_security.employee_contribution}%</div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedCountry(country)
                      setShowDetailsModal(true)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver Detalles
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => router.push(`/dashboard/settings/catalogs/countries/${country.id}/edit`)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button size="sm" variant="outline" className="px-2">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Country Details Modal */}
      {showDetailsModal && selectedCountry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{selectedCountry.flag}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedCountry.name}</h2>
                    <p className="text-gray-600">{selectedCountry.code} • {selectedCountry.region}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDetailsModal(false)}
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Fiscal Configuration */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calculator className="h-5 w-5 text-green-600" />
                      <span>Configuración Fiscal</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Inicio año fiscal:</span>
                      <span className="font-medium">{selectedCountry.fiscal_config.tax_year_start}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Salario mínimo:</span>
                      <span className="font-medium">{selectedCountry.currency} {selectedCountry.fiscal_config.minimum_wage.toLocaleString()}</span>
                    </div>
                    {selectedCountry.fiscal_config.uma_value > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">UMA:</span>
                        <span className="font-medium">{selectedCountry.currency} {selectedCountry.fiscal_config.uma_value}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Régimen fiscal:</span>
                      <span className="font-medium">{selectedCountry.fiscal_config.tax_regime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">IVA/VAT:</span>
                      <span className="font-medium">{selectedCountry.fiscal_config.vat_rate}%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Labor Regulations */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span>Regulaciones Laborales</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horas máx/semana:</span>
                      <span className="font-medium">{selectedCountry.labor_config.max_work_hours_week}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Factor horas extra:</span>
                      <span className="font-medium">{selectedCountry.labor_config.overtime_multiplier}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vacaciones/año:</span>
                      <span className="font-medium">{selectedCountry.labor_config.vacation_days_year} días</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Aguinaldo:</span>
                      <span className="font-medium">{selectedCountry.labor_config.christmas_bonus_days} días</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Finiquito:</span>
                      <span className="font-medium text-xs">{selectedCountry.labor_config.severance_formula.replace(/_/g, ' ')}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Security */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <span>Seguridad Social</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contribución empleado:</span>
                      <span className="font-medium">{selectedCountry.social_security.employee_contribution}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contribución empleador:</span>
                      <span className="font-medium">{selectedCountry.social_security.employer_contribution}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Edad pensión:</span>
                      <span className="font-medium">{selectedCountry.social_security.pension_age} años</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seguro invalidez:</span>
                      <span className="font-medium">{selectedCountry.social_security.disability_coverage ? 'Sí' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seguro salud:</span>
                      <span className="font-medium">{selectedCountry.social_security.health_coverage ? 'Sí' : 'No'}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Statistics & Sync */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      <span>Estadísticas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{selectedCountry.organizations_count}</div>
                        <div className="text-xs text-gray-600">Organizaciones</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{selectedCountry.employers_count}</div>
                        <div className="text-xs text-gray-600">Empleadores</div>
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{selectedCountry.employees_count.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Empleados Totales</div>
                    </div>
                    <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                      <div>Creado: {new Date(selectedCountry.created_at).toLocaleDateString()}</div>
                      <div>Actualizado: {new Date(selectedCountry.updated_at).toLocaleDateString()}</div>
                      <div>Última sincronización: {new Date(selectedCountry.last_sync).toLocaleString()}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline">
                  <Zap className="h-4 w-4 mr-2" />
                  Sincronizar Ahora
                </Button>
                <Button 
                  onClick={() => router.push(`/dashboard/settings/catalogs/countries/${selectedCountry.id}/edit`)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar País
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredCountries.length === 0 && (
        <div className="text-center py-12">
          <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron países</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}