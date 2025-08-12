'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Building2,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  MoreVertical,
  Users,
  Globe,
  TrendingUp,
  DollarSign,
  Building,
  MapPin,
  Settings,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Download,
  Upload,
  Calendar,
  Clock,
  Target,
  Briefcase
} from 'lucide-react'

interface Organization {
  id: string
  name: string
  legal_name: string
  tax_id: string
  industry: string
  country_id: string
  country_name: string
  country_flag: string
  
  // Corporate Information
  corporate_info: {
    headquarters_city: string
    website: string
    phone: string
    email: string
    size_category: 'startup' | 'small' | 'medium' | 'large' | 'enterprise'
    founded_year: number
  }
  
  // Business Configuration
  business_config: {
    fiscal_year_start: string
    default_currency: string
    business_model: string
    revenue_recognition: string
    cost_accounting_method: string
  }
  
  // HR Policies
  hr_policies: {
    payroll_frequency: 'weekly' | 'biweekly' | 'monthly'
    vacation_policy: string
    remote_work_policy: 'none' | 'hybrid' | 'full'
    performance_review_cycle: 'quarterly' | 'biannual' | 'annual'
    probation_period_months: number
  }
  
  // Organizational Structure
  structure: {
    departments: string[]
    locations: string[]
    reporting_levels: number
    employee_classification: string[]
  }
  
  status: 'active' | 'inactive' | 'setup' | 'suspended'
  
  // Statistics
  employers_count: number
  total_employees: number
  departments_count: number
  locations_count: number
  
  // Inheritance from Country
  inherits_tax_config: boolean
  inherits_labor_laws: boolean
  custom_overrides: string[]
  
  created_at: string
  updated_at: string
  last_sync: string
}

const mockOrganizations: Organization[] = [
  {
    id: 'org-001',
    name: 'Panxea Corporation',
    legal_name: 'Panxea Corporation S.A. de C.V.',
    tax_id: 'PCO240101ABC',
    industry: 'Technology',
    country_id: 'mx',
    country_name: 'México',
    country_flag: '🇲🇽',
    corporate_info: {
      headquarters_city: 'Ciudad de México',
      website: 'https://panxea.com',
      phone: '+52 55 1234 5678',
      email: 'contacto@panxea.com',
      size_category: 'large',
      founded_year: 2018
    },
    business_config: {
      fiscal_year_start: '01-01',
      default_currency: 'MXN',
      business_model: 'SaaS',
      revenue_recognition: 'Subscription',
      cost_accounting_method: 'Activity-Based'
    },
    hr_policies: {
      payroll_frequency: 'biweekly',
      vacation_policy: 'Flexible PTO',
      remote_work_policy: 'hybrid',
      performance_review_cycle: 'quarterly',
      probation_period_months: 3
    },
    structure: {
      departments: ['Engineering', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance'],
      locations: ['CDMX', 'Guadalajara', 'Monterrey'],
      reporting_levels: 4,
      employee_classification: ['Full-time', 'Part-time', 'Contractor', 'Intern']
    },
    status: 'active',
    employers_count: 12,
    total_employees: 2847,
    departments_count: 6,
    locations_count: 3,
    inherits_tax_config: true,
    inherits_labor_laws: true,
    custom_overrides: ['vacation_policy', 'remote_work_policy'],
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2025-01-02T14:30:00Z',
    last_sync: '2025-01-04T09:15:00Z'
  },
  {
    id: 'org-002',
    name: 'TechNova Industries',
    legal_name: 'TechNova Industries S.A. de C.V.',
    tax_id: 'TNI240201XYZ',
    industry: 'Manufacturing',
    country_id: 'mx',
    country_name: 'México',
    country_flag: '🇲🇽',
    corporate_info: {
      headquarters_city: 'Tijuana',
      website: 'https://technova.mx',
      phone: '+52 664 987 6543',
      email: 'info@technova.mx',
      size_category: 'medium',
      founded_year: 2015
    },
    business_config: {
      fiscal_year_start: '01-01',
      default_currency: 'MXN',
      business_model: 'Manufacturing',
      revenue_recognition: 'Point of Sale',
      cost_accounting_method: 'Standard Costing'
    },
    hr_policies: {
      payroll_frequency: 'biweekly',
      vacation_policy: 'Accrual-based',
      remote_work_policy: 'none',
      performance_review_cycle: 'annual',
      probation_period_months: 6
    },
    structure: {
      departments: ['Production', 'Quality', 'Logistics', 'Maintenance', 'Administration'],
      locations: ['Tijuana', 'Mexicali'],
      reporting_levels: 3,
      employee_classification: ['Full-time', 'Temporary', 'Seasonal']
    },
    status: 'active',
    employers_count: 8,
    total_employees: 1245,
    departments_count: 5,
    locations_count: 2,
    inherits_tax_config: true,
    inherits_labor_laws: true,
    custom_overrides: [],
    created_at: '2024-02-20T10:00:00Z',
    updated_at: '2024-12-15T16:20:00Z',
    last_sync: '2025-01-03T18:45:00Z'
  },
  {
    id: 'org-003',
    name: 'Global Dynamics Inc.',
    legal_name: 'Global Dynamics Incorporated',
    tax_id: '12-3456789',
    industry: 'Consulting',
    country_id: 'us',
    country_name: 'Estados Unidos',
    country_flag: '🇺🇸',
    corporate_info: {
      headquarters_city: 'New York',
      website: 'https://globaldynamics.com',
      phone: '+1 212 555 0123',
      email: 'contact@globaldynamics.com',
      size_category: 'large',
      founded_year: 2010
    },
    business_config: {
      fiscal_year_start: '01-01',
      default_currency: 'USD',
      business_model: 'Professional Services',
      revenue_recognition: 'Time & Materials',
      cost_accounting_method: 'Project-Based'
    },
    hr_policies: {
      payroll_frequency: 'biweekly',
      vacation_policy: 'PTO Bank',
      remote_work_policy: 'full',
      performance_review_cycle: 'biannual',
      probation_period_months: 3
    },
    structure: {
      departments: ['Strategy', 'Operations', 'Technology', 'Change Management', 'Business Development'],
      locations: ['New York', 'Boston', 'Chicago', 'San Francisco'],
      reporting_levels: 5,
      employee_classification: ['Full-time', 'Part-time', 'Contractor']
    },
    status: 'active',
    employers_count: 6,
    total_employees: 890,
    departments_count: 5,
    locations_count: 4,
    inherits_tax_config: true,
    inherits_labor_laws: false,
    custom_overrides: ['labor_laws', 'payroll_frequency'],
    created_at: '2024-03-10T10:00:00Z',
    updated_at: '2024-11-28T12:45:00Z',
    last_sync: '2025-01-04T07:30:00Z'
  },
  {
    id: 'org-004',
    name: 'Innovation Hub Brasil',
    legal_name: 'Innovation Hub Brasil Ltda.',
    tax_id: '12.345.678/0001-90',
    industry: 'Fintech',
    country_id: 'br',
    country_name: 'Brasil',
    country_flag: '🇧🇷',
    corporate_info: {
      headquarters_city: 'São Paulo',
      website: 'https://innovationhub.com.br',
      phone: '+55 11 3456 7890',
      email: 'contato@innovationhub.com.br',
      size_category: 'startup',
      founded_year: 2022
    },
    business_config: {
      fiscal_year_start: '01-01',
      default_currency: 'BRL',
      business_model: 'Platform',
      revenue_recognition: 'Transaction-based',
      cost_accounting_method: 'Variable Costing'
    },
    hr_policies: {
      payroll_frequency: 'monthly',
      vacation_policy: 'Statutory 30 days',
      remote_work_policy: 'hybrid',
      performance_review_cycle: 'quarterly',
      probation_period_months: 3
    },
    structure: {
      departments: ['Product', 'Engineering', 'Growth', 'Compliance', 'People'],
      locations: ['São Paulo'],
      reporting_levels: 3,
      employee_classification: ['CLT', 'PJ', 'Intern']
    },
    status: 'setup',
    employers_count: 2,
    total_employees: 45,
    departments_count: 5,
    locations_count: 1,
    inherits_tax_config: true,
    inherits_labor_laws: true,
    custom_overrides: ['remote_work_policy'],
    created_at: '2024-11-20T10:00:00Z',
    updated_at: '2024-12-28T09:15:00Z',
    last_sync: '2025-01-02T15:20:00Z'
  },
  {
    id: 'org-005',
    name: 'Banco del Sur',
    legal_name: 'Banco del Sur S.A.',
    tax_id: '30-50001234-9',
    industry: 'Banking',
    country_id: 'ar',
    country_name: 'Argentina',
    country_flag: '🇦🇷',
    corporate_info: {
      headquarters_city: 'Buenos Aires',
      website: 'https://bancodelsur.com.ar',
      phone: '+54 11 4321 9876',
      email: 'info@bancodelsur.com.ar',
      size_category: 'large',
      founded_year: 1998
    },
    business_config: {
      fiscal_year_start: '01-01',
      default_currency: 'ARS',
      business_model: 'Financial Services',
      revenue_recognition: 'Interest Income',
      cost_accounting_method: 'Activity-Based'
    },
    hr_policies: {
      payroll_frequency: 'monthly',
      vacation_policy: 'Progressive by Seniority',
      remote_work_policy: 'hybrid',
      performance_review_cycle: 'annual',
      probation_period_months: 6
    },
    structure: {
      departments: ['Commercial Banking', 'Personal Banking', 'Risk Management', 'Technology', 'HR'],
      locations: ['Buenos Aires', 'Córdoba', 'Rosario'],
      reporting_levels: 5,
      employee_classification: ['Full-time', 'Part-time']
    },
    status: 'active',
    employers_count: 4,
    total_employees: 1250,
    departments_count: 5,
    locations_count: 3,
    inherits_tax_config: true,
    inherits_labor_laws: true,
    custom_overrides: ['banking_regulations', 'security_protocols'],
    created_at: '2024-04-10T10:00:00Z',
    updated_at: '2025-01-03T11:20:00Z',
    last_sync: '2025-01-04T08:00:00Z'
  },
  {
    id: 'org-006',
    name: 'AgroAustral',
    legal_name: 'AgroAustral S.A.',
    tax_id: '30-60001234-5',
    industry: 'Agriculture',
    country_id: 'ar',
    country_name: 'Argentina',
    country_flag: '🇦🇷',
    corporate_info: {
      headquarters_city: 'Rosario',
      website: 'https://agroaustral.com.ar',
      phone: '+54 341 555 0123',
      email: 'contacto@agroaustral.com.ar',
      size_category: 'large',
      founded_year: 2005
    },
    business_config: {
      fiscal_year_start: '07-01',
      default_currency: 'ARS',
      business_model: 'Agribusiness',
      revenue_recognition: 'Harvest-based',
      cost_accounting_method: 'Standard Costing'
    },
    hr_policies: {
      payroll_frequency: 'monthly',
      vacation_policy: 'Standard Legal',
      remote_work_policy: 'none',
      performance_review_cycle: 'annual',
      probation_period_months: 3
    },
    structure: {
      departments: ['Production', 'Logistics', 'Commercial', 'Finance'],
      locations: ['Rosario', 'Pergamino'],
      reporting_levels: 4,
      employee_classification: ['Full-time', 'Seasonal']
    },
    status: 'active',
    employers_count: 2,
    total_employees: 850,
    departments_count: 4,
    locations_count: 2,
    inherits_tax_config: true,
    inherits_labor_laws: true,
    custom_overrides: ['harvest_season_policies'],
    created_at: '2024-04-15T10:00:00Z',
    updated_at: '2025-01-02T14:30:00Z',
    last_sync: '2025-01-04T07:45:00Z'
  },
  {
    id: 'org-007',
    name: 'Minera Andes',
    legal_name: 'Minera Andes SpA',
    tax_id: '76.123.456-7',
    industry: 'Mining',
    country_id: 'cl',
    country_name: 'Chile',
    country_flag: '🇨🇱',
    corporate_info: {
      headquarters_city: 'Santiago',
      website: 'https://mineraandes.cl',
      phone: '+56 2 2345 6789',
      email: 'info@mineraandes.cl',
      size_category: 'enterprise',
      founded_year: 2001
    },
    business_config: {
      fiscal_year_start: '01-01',
      default_currency: 'CLP',
      business_model: 'Mining Operations',
      revenue_recognition: 'Production-based',
      cost_accounting_method: 'Process Costing'
    },
    hr_policies: {
      payroll_frequency: 'biweekly',
      vacation_policy: 'Progressive Mining Sector',
      remote_work_policy: 'none',
      performance_review_cycle: 'biannual',
      probation_period_months: 6
    },
    structure: {
      departments: ['Operations', 'Safety', 'Environment', 'Maintenance', 'HR'],
      locations: ['Santiago', 'Antofagasta', 'Calama'],
      reporting_levels: 6,
      employee_classification: ['Full-time', 'Contractor', 'Shift Worker']
    },
    status: 'active',
    employers_count: 3,
    total_employees: 1450,
    departments_count: 5,
    locations_count: 3,
    inherits_tax_config: true,
    inherits_labor_laws: true,
    custom_overrides: ['mining_safety_regulations', 'shift_work_policies'],
    created_at: '2024-05-20T10:00:00Z',
    updated_at: '2025-01-02T15:30:00Z',
    last_sync: '2025-01-04T07:00:00Z'
  },
  {
    id: 'org-008',
    name: 'Retail Andino',
    legal_name: 'Retail Andino S.A.',
    tax_id: '96.789.012-3',
    industry: 'Retail',
    country_id: 'cl',
    country_name: 'Chile',
    country_flag: '🇨🇱',
    corporate_info: {
      headquarters_city: 'Santiago',
      website: 'https://retailandino.cl',
      phone: '+56 2 3456 7890',
      email: 'contacto@retailandino.cl',
      size_category: 'medium',
      founded_year: 2010
    },
    business_config: {
      fiscal_year_start: '01-01',
      default_currency: 'CLP',
      business_model: 'Retail Chain',
      revenue_recognition: 'Point of Sale',
      cost_accounting_method: 'FIFO'
    },
    hr_policies: {
      payroll_frequency: 'monthly',
      vacation_policy: 'Standard Retail',
      remote_work_policy: 'none',
      performance_review_cycle: 'annual',
      probation_period_months: 3
    },
    structure: {
      departments: ['Sales', 'Logistics', 'Marketing', 'E-commerce'],
      locations: ['Santiago', 'Valparaíso'],
      reporting_levels: 4,
      employee_classification: ['Full-time', 'Part-time', 'Seasonal']
    },
    status: 'active',
    employers_count: 2,
    total_employees: 680,
    departments_count: 4,
    locations_count: 2,
    inherits_tax_config: true,
    inherits_labor_laws: true,
    custom_overrides: ['retail_commission_structure'],
    created_at: '2024-05-25T10:00:00Z',
    updated_at: '2024-12-28T11:45:00Z',
    last_sync: '2025-01-04T06:30:00Z'
  },
  {
    id: 'org-009',
    name: 'Textil Perú',
    legal_name: 'Textil Perú S.A.C.',
    tax_id: '20123456789',
    industry: 'Textiles',
    country_id: 'pe',
    country_name: 'Perú',
    country_flag: '🇵🇪',
    corporate_info: {
      headquarters_city: 'Lima',
      website: 'https://textilperu.com.pe',
      phone: '+51 1 234 5678',
      email: 'info@textilperu.com.pe',
      size_category: 'large',
      founded_year: 1995
    },
    business_config: {
      fiscal_year_start: '01-01',
      default_currency: 'PEN',
      business_model: 'Manufacturing & Export',
      revenue_recognition: 'Export Delivery',
      cost_accounting_method: 'Standard Costing'
    },
    hr_policies: {
      payroll_frequency: 'monthly',
      vacation_policy: 'Standard 30 Days',
      remote_work_policy: 'none',
      performance_review_cycle: 'annual',
      probation_period_months: 3
    },
    structure: {
      departments: ['Production', 'Quality', 'Exports', 'HR', 'Finance'],
      locations: ['Lima', 'Arequipa'],
      reporting_levels: 5,
      employee_classification: ['Full-time', 'Contractor']
    },
    status: 'active',
    employers_count: 4,
    total_employees: 2100,
    departments_count: 5,
    locations_count: 2,
    inherits_tax_config: true,
    inherits_labor_laws: true,
    custom_overrides: ['export_bonus_structure'],
    created_at: '2024-06-15T10:00:00Z',
    updated_at: '2025-01-01T09:15:00Z',
    last_sync: '2025-01-04T06:00:00Z'
  },
  {
    id: 'org-010',
    name: 'Gastro Lima',
    legal_name: 'Gastronomía Lima S.A.C.',
    tax_id: '20987654321',
    industry: 'Hospitality',
    country_id: 'pe',
    country_name: 'Perú',
    country_flag: '🇵🇪',
    corporate_info: {
      headquarters_city: 'Lima',
      website: 'https://gastrolima.pe',
      phone: '+51 1 456 7890',
      email: 'contacto@gastrolima.pe',
      size_category: 'medium',
      founded_year: 2008
    },
    business_config: {
      fiscal_year_start: '01-01',
      default_currency: 'PEN',
      business_model: 'Restaurant Chain',
      revenue_recognition: 'Daily Sales',
      cost_accounting_method: 'Food Cost Percentage'
    },
    hr_policies: {
      payroll_frequency: 'biweekly',
      vacation_policy: 'Standard 30 Days',
      remote_work_policy: 'none',
      performance_review_cycle: 'quarterly',
      probation_period_months: 3
    },
    structure: {
      departments: ['Kitchen', 'Service', 'Administration', 'Marketing'],
      locations: ['Miraflores', 'San Isidro', 'Barranco'],
      reporting_levels: 3,
      employee_classification: ['Full-time', 'Part-time']
    },
    status: 'active',
    employers_count: 3,
    total_employees: 450,
    departments_count: 4,
    locations_count: 3,
    inherits_tax_config: true,
    inherits_labor_laws: true,
    custom_overrides: ['tips_distribution_policy'],
    created_at: '2024-06-20T10:00:00Z',
    updated_at: '2024-12-30T16:20:00Z',
    last_sync: '2025-01-04T05:45:00Z'
  },
  {
    id: 'org-011',
    name: 'Pharma Andina',
    legal_name: 'Farmacéutica Andina S.A.',
    tax_id: '20555666777',
    industry: 'Pharmaceuticals',
    country_id: 'pe',
    country_name: 'Perú',
    country_flag: '🇵🇪',
    corporate_info: {
      headquarters_city: 'Lima',
      website: 'https://pharmaandina.pe',
      phone: '+51 1 567 8901',
      email: 'info@pharmaandina.pe',
      size_category: 'medium',
      founded_year: 2012
    },
    business_config: {
      fiscal_year_start: '01-01',
      default_currency: 'PEN',
      business_model: 'Pharmaceutical Distribution',
      revenue_recognition: 'Delivery-based',
      cost_accounting_method: 'FIFO'
    },
    hr_policies: {
      payroll_frequency: 'monthly',
      vacation_policy: 'Standard 30 Days',
      remote_work_policy: 'hybrid',
      performance_review_cycle: 'biannual',
      probation_period_months: 3
    },
    structure: {
      departments: ['Sales', 'Regulatory', 'Logistics', 'Quality'],
      locations: ['Lima'],
      reporting_levels: 4,
      employee_classification: ['Full-time']
    },
    status: 'active',
    employers_count: 2,
    total_employees: 320,
    departments_count: 4,
    locations_count: 1,
    inherits_tax_config: true,
    inherits_labor_laws: true,
    custom_overrides: ['pharmaceutical_regulations'],
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-12-22T13:45:00Z',
    last_sync: '2025-01-04T05:30:00Z'
  }
]

export default function OrganizationsCatalogPage() {
  const router = useRouter()
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations)
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>(mockOrganizations)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [countryFilter, setCountryFilter] = useState('all')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    let filtered = organizations

    if (searchTerm) {
      filtered = filtered.filter(org => 
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.legal_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.tax_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.industry.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(org => org.status === statusFilter)
    }

    if (countryFilter !== 'all') {
      filtered = filtered.filter(org => org.country_id === countryFilter)
    }

    if (industryFilter !== 'all') {
      filtered = filtered.filter(org => org.industry === industryFilter)
    }

    setFilteredOrganizations(filtered)
  }, [organizations, searchTerm, statusFilter, countryFilter, industryFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200'
      case 'inactive': return 'bg-red-100 text-red-700 border-red-200'
      case 'setup': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'suspended': return 'bg-gray-100 text-gray-700 border-gray-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo'
      case 'inactive': return 'Inactivo'
      case 'setup': return 'En Configuración'
      case 'suspended': return 'Suspendido'
      default: return status
    }
  }

  const getSizeColor = (size: string) => {
    switch (size) {
      case 'startup': return 'bg-purple-100 text-purple-700'
      case 'small': return 'bg-blue-100 text-blue-700'
      case 'medium': return 'bg-green-100 text-green-700'
      case 'large': return 'bg-orange-100 text-orange-700'
      case 'enterprise': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const countries = Array.from(new Set(organizations.map(org => ({ id: org.country_id, name: org.country_name, flag: org.country_flag }))))
  const industries = Array.from(new Set(organizations.map(org => org.industry)))

  const stats = {
    total: organizations.length,
    active: organizations.filter(o => o.status === 'active').length,
    totalEmployers: organizations.reduce((sum, o) => sum + o.employers_count, 0),
    totalEmployees: organizations.reduce((sum, o) => sum + o.total_employees, 0),
    totalDepartments: organizations.reduce((sum, o) => sum + o.departments_count, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogo de Organizaciones</h1>
            <p className="text-gray-600 text-lg">
              Gestión de organizaciones corporativas y sus políticas por país
            </p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center">
            <Building2 className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
              <Building2 className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Organizaciones</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
            <div className="text-sm text-gray-500">Activas</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalEmployers}</div>
            <div className="text-sm text-gray-500">Empleadores</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalEmployees.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Empleados</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-teal-100 rounded-lg mx-auto mb-2">
              <Briefcase className="h-5 w-5 text-teal-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalDepartments}</div>
            <div className="text-sm text-gray-500">Departamentos</div>
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
              placeholder="Buscar organizaciones..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activas</option>
              <option value="inactive">Inactivas</option>
              <option value="setup">En Configuración</option>
              <option value="suspended">Suspendidas</option>
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
            >
              <option value="all">Todos los países</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>{country.flag} {country.name}</option>
              ))}
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
            >
              <option value="all">Todas las industrias</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
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
            onClick={() => router.push('/dashboard/settings/catalogs/organizations/new')}
            className="bg-purple-600 hover:bg-purple-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nueva Organización</span>
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Mostrando {filteredOrganizations.length} de {organizations.length} organizaciones
      </div>

      {/* Organizations Table */}
      <Card className="border border-gray-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-900">Organización</th>
                  <th className="text-left p-4 font-semibold text-gray-900">País</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Industria</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Tamaño</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Empleadores</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Empleados</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Estado</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrganizations.map((org, index) => (
                  <tr key={org.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{org.name}</div>
                        <div className="text-sm text-gray-500">{org.legal_name}</div>
                        <div className="text-xs text-gray-400">{org.tax_id}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{org.country_flag}</span>
                        <span className="text-sm text-gray-900">{org.country_name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-900">{org.industry}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getSizeColor(org.corporate_info.size_category)}`}>
                        {org.corporate_info.size_category.charAt(0).toUpperCase() + org.corporate_info.size_category.slice(1)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{org.employers_count}</div>
                        <div className="text-xs text-gray-500">empleadores</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{org.total_employees.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">empleados</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {org.status === 'active' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : org.status === 'setup' ? (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(org.status)}`}>
                          {getStatusLabel(org.status)}
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
                            setSelectedOrganization(org)
                            setShowDetailsModal(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => router.push(`/dashboard/settings/catalogs/organizations/${org.id}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 w-8 p-0"
                          onClick={() => router.push(`/dashboard/settings/catalogs/employers?organization=${org.id}`)}
                        >
                          <ArrowRight className="h-4 w-4" />
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

      {/* Organization Details Modal */}
      {showDetailsModal && selectedOrganization && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">{selectedOrganization.country_flag}</span>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedOrganization.name}</h2>
                  </div>
                  <p className="text-gray-600">{selectedOrganization.legal_name}</p>
                  <p className="text-sm text-gray-500">{selectedOrganization.industry} • {selectedOrganization.tax_id}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDetailsModal(false)}
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Corporate Information */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      <span>Información Corporativa</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sede:</span>
                      <span className="font-medium">{selectedOrganization.corporate_info.headquarters_city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fundada:</span>
                      <span className="font-medium">{selectedOrganization.corporate_info.founded_year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tamaño:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSizeColor(selectedOrganization.corporate_info.size_category)}`}>
                        {selectedOrganization.corporate_info.size_category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Website:</span>
                      <a href={selectedOrganization.corporate_info.website} className="text-blue-600 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
                        Ver sitio
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Teléfono:</span>
                      <span className="font-medium text-sm">{selectedOrganization.corporate_info.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-sm">{selectedOrganization.corporate_info.email}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Configuration */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-green-600" />
                      <span>Configuración de Negocio</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Año fiscal:</span>
                      <span className="font-medium">{selectedOrganization.business_config.fiscal_year_start}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Moneda:</span>
                      <span className="font-medium">{selectedOrganization.business_config.default_currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modelo:</span>
                      <span className="font-medium text-sm">{selectedOrganization.business_config.business_model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ingresos:</span>
                      <span className="font-medium text-sm">{selectedOrganization.business_config.revenue_recognition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Costos:</span>
                      <span className="font-medium text-sm">{selectedOrganization.business_config.cost_accounting_method}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* HR Policies */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <span>Políticas de RRHH</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nómina:</span>
                      <span className="font-medium">{selectedOrganization.hr_policies.payroll_frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vacaciones:</span>
                      <span className="font-medium text-sm">{selectedOrganization.hr_policies.vacation_policy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trabajo remoto:</span>
                      <span className="font-medium">{selectedOrganization.hr_policies.remote_work_policy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Evaluaciones:</span>
                      <span className="font-medium">{selectedOrganization.hr_policies.performance_review_cycle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prueba:</span>
                      <span className="font-medium">{selectedOrganization.hr_policies.probation_period_months} meses</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Organizational Structure */}
                <Card className="border border-gray-100 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-orange-600" />
                      <span>Estructura Organizacional</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <span className="text-gray-600 text-sm">Departamentos ({selectedOrganization.structure.departments.length}):</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedOrganization.structure.departments.map(dept => (
                          <span key={dept} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                            {dept}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Ubicaciones ({selectedOrganization.structure.locations.length}):</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedOrganization.structure.locations.map(location => (
                          <span key={location} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Niveles jerárquicos:</span>
                        <span className="font-medium">{selectedOrganization.structure.reporting_levels}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Clasificaciones:</span>
                        <span className="font-medium">{selectedOrganization.structure.employee_classification.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Inheritance & Overrides */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-teal-600" />
                      <span>Herencia de País</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Config. fiscal:</span>
                      <CheckCircle className={`h-4 w-4 ${selectedOrganization.inherits_tax_config ? 'text-green-500' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Leyes laborales:</span>
                      <CheckCircle className={`h-4 w-4 ${selectedOrganization.inherits_labor_laws ? 'text-green-500' : 'text-gray-400'}`} />
                    </div>
                    {selectedOrganization.custom_overrides.length > 0 && (
                      <div>
                        <span className="text-gray-600 text-sm">Sobrescrituras:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedOrganization.custom_overrides.map(override => (
                            <span key={override} className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                              {override.replace(/_/g, ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => router.push(`/dashboard/settings/catalogs/employers?organization=${selectedOrganization.id}`)}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Ver Empleadores
                </Button>
                <Button 
                  onClick={() => router.push(`/dashboard/settings/catalogs/organizations/${selectedOrganization.id}/edit`)}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Organización
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredOrganizations.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron organizaciones</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}