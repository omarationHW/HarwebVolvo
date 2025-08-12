'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Workflow,
  ArrowLeft,
  ArrowRight,
  Building2,
  Globe,
  Server,
  Shield,
  Settings,
  CheckCircle,
  AlertTriangle,
  Info,
  Cpu,
  Database,
  HardDrive,
  Wifi,
  MapPin,
  Users,
  Calendar,
  Zap,
  Target,
  TrendingUp,
  Lock,
  Eye,
  Lightbulb,
  Save
} from 'lucide-react'

interface TenantConfig {
  // Company Information
  company_name: string
  legal_name: string
  tax_id: string
  industry: string
  
  // Operational Parameters
  employee_count: number
  projected_growth: number
  payroll_frequency: 'weekly' | 'biweekly' | 'monthly'
  multi_country: boolean
  countries: string[]
  timezone_primary: string
  languages: string[]
  fiscal_year_start: string
  
  // Geographic Configuration
  primary_region: string
  secondary_regions: string[]
  routing_strategy: 'latency_optimized' | 'compliance_first' | 'cost_optimized'
  data_residency_requirements: Array<{
    country: string
    must_stay_local: boolean
    backup_regions: string[]
  }>
  
  // Isolation Level (Auto-determined)
  isolation_level: 1 | 2 | 3
  auto_scaling_enabled: boolean
  
  // SLA Selection
  uptime_guarantee: number
  response_time_target: number
  support_level: 'basic' | 'premium' | 'enterprise'
  geo_redundancy: boolean
  
  // Compliance Requirements
  data_protection_level: 'gdpr' | 'ccpa' | 'lgpd' | 'standard'
  audit_requirements: {
    retention_years: number
    external_audits: boolean
    compliance_reporting: string[]
  }
  security_profile: 'standard' | 'enhanced' | 'maximum'
}

export default function NewWorkOrderPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<TenantConfig>({
    company_name: '',
    legal_name: '',
    tax_id: '',
    industry: '',
    employee_count: 0,
    projected_growth: 0,
    payroll_frequency: 'biweekly',
    multi_country: false,
    countries: ['MX'],
    timezone_primary: 'America/Mexico_City',
    languages: ['es'],
    fiscal_year_start: '01-01',
    primary_region: 'mx-central',
    secondary_regions: [],
    routing_strategy: 'latency_optimized',
    data_residency_requirements: [],
    isolation_level: 1,
    auto_scaling_enabled: true,
    uptime_guarantee: 99.9,
    response_time_target: 100,
    support_level: 'basic',
    geo_redundancy: false,
    data_protection_level: 'standard',
    audit_requirements: {
      retention_years: 7,
      external_audits: false,
      compliance_reporting: []
    },
    security_profile: 'standard'
  })

  const steps = [
    {
      id: 'company_information',
      title: 'Información de la Empresa',
      description: 'Datos básicos y identificación fiscal',
      icon: Building2
    },
    {
      id: 'operational_parameters',
      title: 'Parámetros Operacionales',
      description: 'Configuración de empleados y operaciones',
      icon: Users
    },
    {
      id: 'geographic_distribution',
      title: 'Distribución Geográfica',
      description: 'Regiones y enrutamiento inteligente',
      icon: Globe
    },
    {
      id: 'compliance_requirements',
      title: 'Requisitos de Compliance',
      description: 'Seguridad y regulaciones',
      icon: Shield
    },
    {
      id: 'sla_selection',
      title: 'Selección de SLA',
      description: 'Garantías de servicio y soporte',
      icon: Target
    },
    {
      id: 'resource_allocation',
      title: 'Asignación de Recursos',
      description: 'Nivel de aislamiento automático',
      icon: Server
    },
    {
      id: 'review_and_deploy',
      title: 'Revisión y Despliegue',
      description: 'Validación final y activación',
      icon: CheckCircle
    }
  ]

  // Auto-determine isolation level based on employee count
  const determineIsolationLevel = (employeeCount: number): 1 | 2 | 3 => {
    if (employeeCount < 500) return 1
    if (employeeCount < 5000) return 2
    return 3
  }

  // Update isolation level when employee count changes
  const handleEmployeeCountChange = (count: number) => {
    const level = determineIsolationLevel(count)
    setFormData({
      ...formData,
      employee_count: count,
      isolation_level: level
    })
  }

  const industries = [
    'Tecnología',
    'Manufactura',
    'Servicios Financieros',
    'Salud',
    'Retail',
    'Educación',
    'Construcción',
    'Telecomunicaciones',
    'Energía',
    'Otros'
  ]

  const regions = [
    { value: 'mx-central', label: 'México Central', description: 'Ciudad de México y área metropolitana' },
    { value: 'mx-north', label: 'México Norte', description: 'Monterrey, Tijuana, Juárez' },
    { value: 'us-central', label: 'Estados Unidos Central', description: 'Dallas, Chicago' },
    { value: 'us-east', label: 'Estados Unidos Este', description: 'Nueva York, Miami' },
    { value: 'us-west', label: 'Estados Unidos Oeste', description: 'Los Ángeles, San Francisco' },
    { value: 'ca-central', label: 'Canadá Central', description: 'Toronto, Montreal' },
    { value: 'br-southeast', label: 'Brasil Sudeste', description: 'São Paulo, Río de Janeiro' },
    { value: 'multi-region', label: 'Multi-Región', description: 'Distribución automática global' }
  ]

  const countries = [
    { code: 'MX', name: 'México', flag: '🇲🇽' },
    { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
    { code: 'CA', name: 'Canadá', flag: '🇨🇦' },
    { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
    { code: 'CL', name: 'Chile', flag: '🇨🇱' },
    { code: 'PE', name: 'Perú', flag: '🇵🇪' }
  ]

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Company Information
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Comercial *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Panxea Corporation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Razón Social *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. Panxea Corporation S.A. de C.V."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.legal_name}
                  onChange={(e) => setFormData({ ...formData, legal_name: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  RFC/Tax ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ej. PCO240101ABC"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.tax_id}
                  onChange={(e) => setFormData({ ...formData, tax_id: e.target.value.toUpperCase() })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industria
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                >
                  <option value="">Seleccionar industria</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )

      case 1: // Operational Parameters
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Empleados *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="1250"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.employee_count || ''}
                  onChange={(e) => handleEmployeeCountChange(parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Determina automáticamente el nivel de aislamiento
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crecimiento Proyectado (anual)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="200"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.projected_growth || ''}
                  onChange={(e) => setFormData({ ...formData, projected_growth: parseInt(e.target.value) || 0 })}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Empleados nuevos por año
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frecuencia de Nómina
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.payroll_frequency}
                  onChange={(e) => setFormData({ ...formData, payroll_frequency: e.target.value as any })}
                >
                  <option value="weekly">Semanal</option>
                  <option value="biweekly">Quincenal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>
            </div>

            {/* Auto-determined Isolation Level Display */}
            <Card className="border border-indigo-100 bg-indigo-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-900 mb-1">
                      Nivel de Aislamiento Asignado: Nivel {formData.isolation_level}
                    </h4>
                    <p className="text-sm text-indigo-700">
                      {formData.isolation_level === 1 && "Compartido - Hasta 500 empleados. Recursos compartidos optimizados."}
                      {formData.isolation_level === 2 && "Semi-dedicado - 500-5000 empleados. Recursos semi-dedicados con mejor performance."}
                      {formData.isolation_level === 3 && "Dedicado - Más de 5000 empleados. Infraestructura dedicada completa."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Países de Operación
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {countries.map(country => (
                  <label key={country.code} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.countries.includes(country.code)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            countries: [...formData.countries, country.code],
                            multi_country: formData.countries.length + 1 > 1
                          })
                        } else {
                          const newCountries = formData.countries.filter(c => c !== country.code)
                          setFormData({
                            ...formData,
                            countries: newCountries,
                            multi_country: newCountries.length > 1
                          })
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                    <span className="text-lg">{country.flag}</span>
                    <span className="text-sm font-medium text-gray-900">{country.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 2: // Geographic Distribution
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Región Principal *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {regions.map(region => (
                  <label 
                    key={region.value} 
                    className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.primary_region === region.value 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="primary_region"
                      value={region.value}
                      checked={formData.primary_region === region.value}
                      onChange={(e) => setFormData({ ...formData, primary_region: e.target.value })}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{region.label}</div>
                      <div className="text-sm text-gray-500">{region.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Estrategia de Enrutamiento
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    value: 'latency_optimized',
                    label: 'Optimizado por Latencia',
                    description: 'Prioriza velocidad de respuesta',
                    icon: Zap
                  },
                  {
                    value: 'compliance_first',
                    label: 'Compliance Primero',
                    description: 'Prioriza cumplimiento regulatorio',
                    icon: Shield
                  },
                  {
                    value: 'cost_optimized',
                    label: 'Optimizado por Costo',
                    description: 'Prioriza eficiencia de costos',
                    icon: TrendingUp
                  }
                ].map(strategy => (
                  <label 
                    key={strategy.value}
                    className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.routing_strategy === strategy.value 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="routing_strategy"
                      value={strategy.value}
                      checked={formData.routing_strategy === strategy.value}
                      onChange={(e) => setFormData({ ...formData, routing_strategy: e.target.value as any })}
                      className="sr-only"
                    />
                    <strategy.icon className="h-8 w-8 text-indigo-600 mb-2" />
                    <div className="font-medium text-gray-900 text-center">{strategy.label}</div>
                    <div className="text-sm text-gray-500 text-center mt-1">{strategy.description}</div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 3: // Compliance Requirements
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Nivel de Protección de Datos
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    value: 'standard',
                    label: 'Estándar',
                    description: 'Protección básica según regulaciones locales',
                    icon: Lock
                  },
                  {
                    value: 'gdpr',
                    label: 'GDPR',
                    description: 'Cumplimiento con GDPR Europeo',
                    icon: Shield
                  },
                  {
                    value: 'ccpa',
                    label: 'CCPA',
                    description: 'California Consumer Privacy Act',
                    icon: Shield
                  },
                  {
                    value: 'lgpd',
                    label: 'LGPD',
                    description: 'Lei Geral de Proteção de Dados (Brasil)',
                    icon: Shield
                  }
                ].map(level => (
                  <label 
                    key={level.value}
                    className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.data_protection_level === level.value 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="data_protection_level"
                      value={level.value}
                      checked={formData.data_protection_level === level.value}
                      onChange={(e) => setFormData({ ...formData, data_protection_level: e.target.value as any })}
                      className="mt-1"
                    />
                    <level.icon className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">{level.label}</div>
                      <div className="text-sm text-gray-500">{level.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Perfil de Seguridad
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    value: 'standard',
                    label: 'Estándar',
                    description: 'Seguridad básica empresarial'
                  },
                  {
                    value: 'enhanced',
                    label: 'Mejorado',
                    description: 'Seguridad avanzada con controles adicionales'
                  },
                  {
                    value: 'maximum',
                    label: 'Máximo',
                    description: 'Seguridad de nivel enterprise'
                  }
                ].map(profile => (
                  <label 
                    key={profile.value}
                    className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.security_profile === profile.value 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="security_profile"
                      value={profile.value}
                      checked={formData.security_profile === profile.value}
                      onChange={(e) => setFormData({ ...formData, security_profile: e.target.value as any })}
                      className="sr-only"
                    />
                    <div className="font-medium text-gray-900">{profile.label}</div>
                    <div className="text-sm text-gray-500 mt-1">{profile.description}</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Retención de Datos (años)
                </label>
                <input
                  type="number"
                  min="1"
                  max="25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.audit_requirements.retention_years}
                  onChange={(e) => setFormData({
                    ...formData,
                    audit_requirements: {
                      ...formData.audit_requirements,
                      retention_years: parseInt(e.target.value) || 7
                    }
                  })}
                />
              </div>
              <div className="flex items-center space-x-3 pt-6">
                <input
                  type="checkbox"
                  checked={formData.audit_requirements.external_audits}
                  onChange={(e) => setFormData({
                    ...formData,
                    audit_requirements: {
                      ...formData.audit_requirements,
                      external_audits: e.target.checked
                    }
                  })}
                  className="rounded border-gray-300"
                />
                <div>
                  <div className="font-medium text-gray-900">Auditorías Externas</div>
                  <div className="text-sm text-gray-500">Requiere auditorías por terceros</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 4: // SLA Selection
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Garantía de Uptime (%)
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.uptime_guarantee}
                  onChange={(e) => setFormData({ ...formData, uptime_guarantee: parseFloat(e.target.value) })}
                >
                  <option value={99.5}>99.5% - Básico</option>
                  <option value={99.9}>99.9% - Estándar</option>
                  <option value={99.95}>99.95% - Premium</option>
                  <option value={99.99}>99.99% - Enterprise</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {formData.uptime_guarantee === 99.5 && "~3.6 horas downtime/mes"}
                  {formData.uptime_guarantee === 99.9 && "~43 minutos downtime/mes"}
                  {formData.uptime_guarantee === 99.95 && "~21 minutos downtime/mes"}
                  {formData.uptime_guarantee === 99.99 && "~4.3 minutos downtime/mes"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiempo de Respuesta (ms)
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={formData.response_time_target}
                  onChange={(e) => setFormData({ ...formData, response_time_target: parseInt(e.target.value) })}
                >
                  <option value={200}>&lt; 200ms - Básico</option>
                  <option value={100}>&lt; 100ms - Estándar</option>
                  <option value={50}>&lt; 50ms - Premium</option>
                  <option value={25}>&lt; 25ms - Enterprise</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Nivel de Soporte
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    value: 'basic',
                    label: 'Básico',
                    description: 'Soporte por email 8x5',
                    features: ['Email support', 'Business hours', 'Response: 24-48h']
                  },
                  {
                    value: 'premium',
                    label: 'Premium',
                    description: 'Soporte telefónico 24x7',
                    features: ['Phone + Email', '24x7 support', 'Response: 2-4h']
                  },
                  {
                    value: 'enterprise',
                    label: 'Enterprise',
                    description: 'Dedicated support manager',
                    features: ['Dedicated manager', 'Priority support', 'Response: &lt;1h']
                  }
                ].map(level => (
                  <label 
                    key={level.value}
                    className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.support_level === level.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="support_level"
                      value={level.value}
                      checked={formData.support_level === level.value}
                      onChange={(e) => setFormData({ ...formData, support_level: e.target.value as any })}
                      className="sr-only"
                    />
                    <div className="font-medium text-gray-900 mb-1">{level.label}</div>
                    <div className="text-sm text-gray-500 mb-2">{level.description}</div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {level.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.geo_redundancy}
                onChange={(e) => setFormData({ ...formData, geo_redundancy: e.target.checked })}
                className="rounded border-gray-300"
              />
              <div>
                <div className="font-medium text-gray-900">Redundancia Geográfica</div>
                <div className="text-sm text-gray-500">Respaldo automático en múltiples regiones</div>
              </div>
            </div>
          </div>
        )

      case 5: // Resource Allocation
        return (
          <div className="space-y-6">
            {/* Automatic Resource Allocation Display */}
            <Card className="border border-green-100 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5 text-green-600" />
                  <span className="text-green-900">Asignación Automática de Recursos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <Cpu className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">
                      {formData.isolation_level === 1 ? '2-4' : formData.isolation_level === 2 ? '8-16' : '32-64'}
                    </div>
                    <div className="text-xs text-gray-600">CPU Cores</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <Database className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">
                      {formData.isolation_level === 1 ? '8-16' : formData.isolation_level === 2 ? '32-64' : '128-256'}GB
                    </div>
                    <div className="text-xs text-gray-600">RAM</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <HardDrive className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">
                      {formData.isolation_level === 1 ? '100-500' : formData.isolation_level === 2 ? '1-5' : '10-50'}
                      {formData.isolation_level === 1 ? 'GB' : 'TB'}
                    </div>
                    <div className="text-xs text-gray-600">Storage</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <Wifi className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-900">
                      {formData.isolation_level === 1 ? '100' : formData.isolation_level === 2 ? '1000' : '10000'}Mbps
                    </div>
                    <div className="text-xs text-gray-600">Bandwidth</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>Nivel {formData.isolation_level}:</strong> {' '}
                    {formData.isolation_level === 1 && "Recursos compartidos optimizados para hasta 500 empleados. Auto-escalamiento disponible."}
                    {formData.isolation_level === 2 && "Recursos semi-dedicados para 500-5000 empleados. Performance garantizada con aislamiento de cargas."}
                    {formData.isolation_level === 3 && "Infraestructura dedicada completa para más de 5000 empleados. Máximo performance y control."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.auto_scaling_enabled}
                onChange={(e) => setFormData({ ...formData, auto_scaling_enabled: e.target.checked })}
                className="rounded border-gray-300"
              />
              <div>
                <div className="font-medium text-gray-900">Auto-escalamiento Habilitado</div>
                <div className="text-sm text-gray-500">Migración automática entre niveles según crecimiento</div>
              </div>
            </div>

            {/* Migration Thresholds */}
            <Card className="border border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Umbrales de Migración Automática</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-gray-900">Nivel 1 → Nivel 2</span>
                    <span className="text-blue-600 font-semibold">500 empleados</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium text-gray-900">Nivel 2 → Nivel 3</span>
                    <span className="text-purple-600 font-semibold">5,000 empleados</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case 6: // Review and Deploy
        return (
          <div className="space-y-6">
            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-gray-600" />
                  <span>Resumen de Configuración</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Información de la Empresa</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><strong>Nombre:</strong> {formData.company_name}</div>
                      <div><strong>Razón Social:</strong> {formData.legal_name}</div>
                      <div><strong>RFC:</strong> {formData.tax_id}</div>
                      <div><strong>Industria:</strong> {formData.industry}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Configuración Operacional</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><strong>Empleados:</strong> {formData.employee_count.toLocaleString()}</div>
                      <div><strong>Nómina:</strong> {formData.payroll_frequency}</div>
                      <div><strong>Países:</strong> {formData.countries.join(', ')}</div>
                      <div><strong>Región:</strong> {formData.primary_region}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Nivel de Servicio</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><strong>Aislamiento:</strong> Nivel {formData.isolation_level}</div>
                      <div><strong>Uptime:</strong> {formData.uptime_guarantee}%</div>
                      <div><strong>Respuesta:</strong> &lt;{formData.response_time_target}ms</div>
                      <div><strong>Soporte:</strong> {formData.support_level}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Compliance y Seguridad</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><strong>Protección:</strong> {formData.data_protection_level.toUpperCase()}</div>
                      <div><strong>Seguridad:</strong> {formData.security_profile}</div>
                      <div><strong>Retención:</strong> {formData.audit_requirements.retention_years} años</div>
                      <div><strong>Redundancia:</strong> {formData.geo_redundancy ? 'Sí' : 'No'}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deployment Checklist */}
            <Card className="border border-green-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Lista de Verificación de Despliegue</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    'Validación de configuración completada',
                    'Recursos de infraestructura asignados',
                    'Configuración de compliance verificada',
                    'Enrutamiento geográfico configurado',
                    'Monitoreo y alertas activados',
                    'Respaldo y disaster recovery configurados'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-yellow-100 bg-yellow-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Tiempo de Activación</h4>
                    <p className="text-sm text-yellow-700">
                      El tenant será activado automáticamente después del despliegue. 
                      El proceso completo puede tomar entre 15-30 minutos dependiendo de la configuración.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return <div>Paso no encontrado</div>
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Here would be the actual deployment logic
    console.log('Deploying tenant with config:', formData)
    router.push('/dashboard/settings/work-orders')
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.company_name && formData.legal_name && formData.tax_id
      case 1:
        return formData.employee_count > 0 && formData.countries.length > 0
      default:
        return true
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Nuevo Tenant (Orden de Trabajo)</h1>
              <p className="text-gray-600 text-lg">
                Configuración paso a paso con auto-escalamiento y optimización inteligente
              </p>
            </div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <Workflow className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index < currentStep 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : index === currentStep 
                      ? 'bg-indigo-500 border-indigo-500 text-white' 
                      : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold text-gray-900">{steps[currentStep].title}</h3>
            <p className="text-gray-600 text-sm">{steps[currentStep].description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card className="border border-gray-100">
        <CardContent className="p-8">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Anterior</span>
        </Button>

        {currentStep === steps.length - 1 ? (
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Desplegar Tenant</span>
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="bg-indigo-600 hover:bg-indigo-700 flex items-center space-x-2"
          >
            <span>Siguiente</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Help Sidebar */}
      <Card className="fixed right-6 top-1/2 transform -translate-y-1/2 w-80 border border-indigo-100 bg-indigo-50 z-40">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="h-4 w-4 text-indigo-600" />
            <span className="font-medium text-indigo-900">Ayuda</span>
          </div>
          <div className="text-sm text-indigo-700">
            {currentStep === 0 && "Ingresa la información legal y fiscal de la empresa. Estos datos se utilizarán para configurar el compliance automático."}
            {currentStep === 1 && "El número de empleados determina automáticamente el nivel de aislamiento óptimo. El sistema migrará automáticamente entre niveles según el crecimiento."}
            {currentStep === 2 && "Selecciona la región más cercana a tus usuarios para optimizar latencia. El enrutamiento inteligente distribuirá automáticamente el tráfico."}
            {currentStep === 3 && "Configura los requisitos de compliance según las regulaciones de los países donde operas. El sistema aplicará automáticamente los controles necesarios."}
            {currentStep === 4 && "Selecciona el nivel de servicio según tus necesidades críticas de negocio. Los SLA más altos incluyen redundancia geográfica automática."}
            {currentStep === 5 && "Los recursos se asignan automáticamente según el nivel de aislamiento. El sistema optimiza continuamente el uso y costos."}
            {currentStep === 6 && "Revisa toda la configuración antes del despliegue. El tenant se activará automáticamente y estará listo en 15-30 minutos."}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}