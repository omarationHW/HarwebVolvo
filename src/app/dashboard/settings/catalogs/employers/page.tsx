'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  MoreVertical,
  Building2,
  Globe,
  TrendingUp,
  UserCheck,
  DollarSign,
  Calendar,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  Download,
  Upload,
  Settings,
  Shield,
  Zap,
  Flag,
  Building
} from 'lucide-react'

interface Employer {
  id: string
  code: string
  name: string
  legal_name: string
  tax_id: string
  industry: string
  organization_id: string
  organization_name: string
  country_id: string
  country_name: string
  country_flag: string
  status: 'active' | 'inactive' | 'setup' | 'migrating'
  
  // Corporate Info
  corporate_info: {
    registration_date: string
    legal_address: string
    business_phone: string
    business_email: string
    website: string
    business_license: string
  }
  
  // Payroll Configuration
  payroll_config: {
    payroll_frequency: 'weekly' | 'biweekly' | 'monthly'
    pay_period_cutoff: number
    payment_day: number
    overtime_policy: string
    holiday_policy: string
    vacation_accrual_method: 'anniversary' | 'calendar' | 'rolling' | 'progressive'
  }
  
  // HR Policies (inherited from organization with overrides)
  hr_policies: {
    work_hours_per_day: number
    work_days_per_week: number
    break_policies: string[]
    remote_work_allowed: boolean
    flexible_hours: boolean
    dress_code: string
    employee_benefits: string[]
  }
  
  // Tenant Configuration
  tenant_config: {
    isolation_level: 1 | 2 | 3
    auto_scaling_enabled: boolean
    uptime_guarantee: number
    support_level: 'basic' | 'premium' | 'enterprise'
    data_retention_years: number
    backup_frequency: 'daily' | 'weekly' | 'monthly'
  }
  
  // Inheritance Settings
  inherits_from_country: boolean
  inherits_from_organization: boolean
  custom_overrides: string[]
  
  // Statistics
  employees_count: number
  active_employees: number
  departments_count: number
  locations_count: number
  avg_salary: number
  payroll_cost_monthly: number
  
  created_at: string
  updated_at: string
  last_payroll_run: string | null
}

const mockEmployers: Employer[] = [
  {
    id: 'panx-mx-001',
    code: 'PANX-MX',
    name: 'Panxea México',
    legal_name: 'Panxea Corporation S.A. de C.V.',
    tax_id: 'PCO240101ABC',
    industry: 'Tecnología',
    organization_id: 'panx-corp',
    organization_name: 'Panxea Corporation',
    country_id: 'mx',
    country_name: 'México',
    country_flag: '🇲🇽',
    status: 'active',
    corporate_info: {
      registration_date: '2024-01-15',
      legal_address: 'Av. Reforma 123, Col. Centro, CDMX, México',
      business_phone: '+52 55 1234 5678',
      business_email: 'legal@panxea.mx',
      website: 'https://panxea.mx',
      business_license: 'REG-MX-001-2024'
    },
    payroll_config: {
      payroll_frequency: 'biweekly',
      pay_period_cutoff: 15,
      payment_day: 30,
      overtime_policy: 'mexican_federal_law',
      holiday_policy: 'mandatory_plus_company',
      vacation_accrual_method: 'anniversary'
    },
    hr_policies: {
      work_hours_per_day: 8,
      work_days_per_week: 5,
      break_policies: ['lunch_1hr', 'coffee_15min_am', 'coffee_15min_pm'],
      remote_work_allowed: true,
      flexible_hours: true,
      dress_code: 'business_casual',
      employee_benefits: ['seguro_medico_mayor', 'fondo_ahorro', 'comedor_subsidiado', 'gym_membership']
    },
    tenant_config: {
      isolation_level: 2,
      auto_scaling_enabled: true,
      uptime_guarantee: 99.95,
      support_level: 'premium',
      data_retention_years: 7,
      backup_frequency: 'daily'
    },
    inherits_from_country: true,
    inherits_from_organization: true,
    custom_overrides: ['vacation_accrual_method', 'remote_work_policy'],
    employees_count: 1250,
    active_employees: 1180,
    departments_count: 8,
    locations_count: 3,
    avg_salary: 85000,
    payroll_cost_monthly: 8950000,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2025-01-04T08:30:00Z',
    last_payroll_run: '2025-01-01T09:00:00Z'
  },
  {
    id: 'tech-us-001',
    code: 'TECH-US',
    name: 'Tech Innovation Labs',
    legal_name: 'Tech Innovation Labs LLC',
    tax_id: '98-7654321',
    industry: 'Tecnología',
    organization_id: 'tech-innov',
    organization_name: 'Tech Innovation Group',
    country_id: 'us',
    country_name: 'Estados Unidos',
    country_flag: '🇺🇸',
    status: 'active',
    corporate_info: {
      registration_date: '2024-02-01',
      legal_address: '456 Tech St, Silicon Valley, CA 94000, USA',
      business_phone: '+1 415 555 0123',
      business_email: 'legal@techinnovlabs.com',
      website: 'https://techinnovlabs.com',
      business_license: 'CA-LLC-001-2024'
    },
    payroll_config: {
      payroll_frequency: 'biweekly',
      pay_period_cutoff: 26,
      payment_day: 5,
      overtime_policy: 'federal_flsa_exempt',
      holiday_policy: 'company_holidays_only',
      vacation_accrual_method: 'rolling'
    },
    hr_policies: {
      work_hours_per_day: 8,
      work_days_per_week: 5,
      break_policies: ['lunch_1hr'],
      remote_work_allowed: true,
      flexible_hours: true,
      dress_code: 'casual',
      employee_benefits: ['health_insurance', '401k_matching', 'stock_options', 'unlimited_pto']
    },
    tenant_config: {
      isolation_level: 2,
      auto_scaling_enabled: true,
      uptime_guarantee: 99.9,
      support_level: 'premium',
      data_retention_years: 7,
      backup_frequency: 'daily'
    },
    inherits_from_country: true,
    inherits_from_organization: false,
    custom_overrides: ['overtime_policy', 'vacation_policy', 'benefits_package'],
    employees_count: 450,
    active_employees: 425,
    departments_count: 5,
    locations_count: 2,
    avg_salary: 120000,
    payroll_cost_monthly: 4500000,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-12-28T14:20:00Z',
    last_payroll_run: '2024-12-31T10:00:00Z'
  },
  {
    id: 'north-ca-001',
    code: 'NORTH-CA',
    name: 'North American Solutions',
    legal_name: 'North American Solutions Inc.',
    tax_id: '123456789RC0001',
    industry: 'Consultoría',
    organization_id: 'north-am',
    organization_name: 'North American Corp',
    country_id: 'ca',
    country_name: 'Canadá',
    country_flag: '🇨🇦',
    status: 'active',
    corporate_info: {
      registration_date: '2024-03-10',
      legal_address: '789 Bay St, Toronto, ON M5H 2Y2, Canada',
      business_phone: '+1 416 555 0789',
      business_email: 'info@northamsolutions.ca',
      website: 'https://northamsolutions.ca',
      business_license: 'ON-INC-789-2024'
    },
    payroll_config: {
      payroll_frequency: 'biweekly',
      pay_period_cutoff: 26,
      payment_day: 10,
      overtime_policy: 'canadian_federal_standards',
      holiday_policy: 'statutory_plus_company',
      vacation_accrual_method: 'calendar'
    },
    hr_policies: {
      work_hours_per_day: 8,
      work_days_per_week: 5,
      break_policies: ['lunch_1hr', 'coffee_15min_am', 'coffee_15min_pm'],
      remote_work_allowed: true,
      flexible_hours: false,
      dress_code: 'business_professional',
      employee_benefits: ['provincial_health_plus', 'rrsp_matching', 'dental_vision', 'life_insurance']
    },
    tenant_config: {
      isolation_level: 1,
      auto_scaling_enabled: false,
      uptime_guarantee: 99.5,
      support_level: 'basic',
      data_retention_years: 7,
      backup_frequency: 'weekly'
    },
    inherits_from_country: true,
    inherits_from_organization: true,
    custom_overrides: ['remote_work_policy'],
    employees_count: 180,
    active_employees: 165,
    departments_count: 4,
    locations_count: 2,
    avg_salary: 75000,
    payroll_cost_monthly: 1125000,
    created_at: '2024-03-10T10:00:00Z',
    updated_at: '2024-11-20T16:45:00Z',
    last_payroll_run: '2024-12-31T08:00:00Z'
  },
  {
    id: 'global-br-001',
    code: 'GLOB-BR',
    name: 'Global Services Brasil',
    legal_name: 'Global Services do Brasil Ltda.',
    tax_id: '12.345.678/0001-90',
    industry: 'Servicios',
    organization_id: 'glob-serv',
    organization_name: 'Global Services International',
    country_id: 'br',
    country_name: 'Brasil',
    country_flag: '🇧🇷',
    status: 'setup',
    corporate_info: {
      registration_date: '2024-11-15',
      legal_address: 'Av. Paulista 1000, São Paulo, SP 01310-100, Brasil',
      business_phone: '+55 11 9999 8888',
      business_email: 'contato@globalservices.com.br',
      website: 'https://globalservices.com.br',
      business_license: 'SP-LTDA-001-2024'
    },
    payroll_config: {
      payroll_frequency: 'monthly',
      pay_period_cutoff: 25,
      payment_day: 5,
      overtime_policy: 'clt_brazilian_law',
      holiday_policy: 'clt_mandatory_holidays',
      vacation_accrual_method: 'anniversary'
    },
    hr_policies: {
      work_hours_per_day: 8,
      work_days_per_week: 5,
      break_policies: ['lunch_1hr'],
      remote_work_allowed: false,
      flexible_hours: false,
      dress_code: 'business_formal',
      employee_benefits: ['plano_saude', 'vale_refeicao', 'vale_transporte', '13_salario']
    },
    tenant_config: {
      isolation_level: 1,
      auto_scaling_enabled: false,
      uptime_guarantee: 99.0,
      support_level: 'basic',
      data_retention_years: 5,
      backup_frequency: 'weekly'
    },
    inherits_from_country: true,
    inherits_from_organization: true,
    custom_overrides: [],
    employees_count: 25,
    active_employees: 0,
    departments_count: 2,
    locations_count: 1,
    avg_salary: 45000,
    payroll_cost_monthly: 120000,
    created_at: '2024-11-15T10:00:00Z',
    updated_at: '2024-12-20T11:30:00Z',
    last_payroll_run: null
  },
  {
    id: 'innov-co-001',
    code: 'INNOV-CO',
    name: 'Innovation Colombia',
    legal_name: 'Innovation Colombia S.A.S.',
    tax_id: '900123456-1',
    industry: 'Tecnología',
    organization_id: 'innov-latam',
    organization_name: 'Innovation LatAm',
    country_id: 'co',
    country_name: 'Colombia',
    country_flag: '🇨🇴',
    status: 'active',
    corporate_info: {
      registration_date: '2025-01-04',
      legal_address: 'Calle 72 #10-07, Bogotá, Colombia',
      business_phone: '+57 1 234 5678',
      business_email: 'info@innovationcolombia.co',
      website: 'https://innovationcolombia.co',
      business_license: 'BOG-SAS-001-2025'
    },
    payroll_config: {
      payroll_frequency: 'monthly',
      pay_period_cutoff: 30,
      payment_day: 5,
      overtime_policy: 'colombian_labor_code',
      holiday_policy: 'colombian_holidays_plus_company',
      vacation_accrual_method: 'anniversary'
    },
    hr_policies: {
      work_hours_per_day: 8,
      work_days_per_week: 6,
      break_policies: ['lunch_1hr'],
      remote_work_allowed: true,
      flexible_hours: false,
      dress_code: 'business_casual',
      employee_benefits: ['eps_contributivo', 'pension_obligatoria', 'cesantias', 'prima_servicios']
    },
    tenant_config: {
      isolation_level: 1,
      auto_scaling_enabled: false,
      uptime_guarantee: 99.0,
      support_level: 'basic',
      data_retention_years: 5,
      backup_frequency: 'monthly'
    },
    inherits_from_country: true,
    inherits_from_organization: true,
    custom_overrides: [],
    employees_count: 45,
    active_employees: 45,
    departments_count: 2,
    locations_count: 1,
    avg_salary: 35000,
    payroll_cost_monthly: 1575000,
    created_at: '2025-01-04T09:00:00Z',
    updated_at: '2025-01-04T09:00:00Z',
    last_payroll_run: '2025-01-31T10:00:00Z'
  },
  {
    id: 'banco-ar-001',
    code: 'BANCO-AR',
    name: 'Banco del Sur Buenos Aires',
    legal_name: 'Banco del Sur S.A. - Sucursal Buenos Aires',
    tax_id: '30-50001234-9',
    industry: 'Servicios Financieros',
    organization_id: 'org-005',
    organization_name: 'Banco del Sur',
    country_id: 'ar',
    country_name: 'Argentina',
    country_flag: '🇦🇷',
    status: 'active',
    corporate_info: {
      registration_date: '2024-04-10',
      legal_address: 'Av. Corrientes 1234, Buenos Aires, Argentina',
      business_phone: '+54 11 4321 9876',
      business_email: 'buenosaires@bancodelsur.com.ar',
      website: 'https://bancodelsur.com.ar',
      business_license: 'BCRA-BS-BA-2024'
    },
    payroll_config: {
      payroll_frequency: 'monthly',
      pay_period_cutoff: 25,
      payment_day: 3,
      overtime_policy: 'argentine_labor_law',
      holiday_policy: 'banking_holidays_plus_national',
      vacation_accrual_method: 'anniversary'
    },
    hr_policies: {
      work_hours_per_day: 8,
      work_days_per_week: 5,
      break_policies: ['lunch_1hr', 'coffee_15min_am', 'coffee_15min_pm'],
      remote_work_allowed: true,
      flexible_hours: false,
      dress_code: 'business_formal',
      employee_benefits: ['obra_social', 'jubilacion', 'seguro_vida', 'comedor_empresarial']
    },
    tenant_config: {
      isolation_level: 2,
      auto_scaling_enabled: true,
      uptime_guarantee: 99.95,
      support_level: 'premium',
      data_retention_years: 10,
      backup_frequency: 'daily'
    },
    inherits_from_country: true,
    inherits_from_organization: true,
    custom_overrides: ['banking_regulations', 'financial_compliance'],
    employees_count: 850,
    active_employees: 820,
    departments_count: 5,
    locations_count: 1,
    avg_salary: 95000,
    payroll_cost_monthly: 8075000,
    created_at: '2024-04-10T10:00:00Z',
    updated_at: '2025-01-03T11:20:00Z',
    last_payroll_run: '2025-01-31T08:00:00Z'
  },
  {
    id: 'agro-ar-001',
    code: 'AGRO-AR',
    name: 'AgroAustral Rosario',
    legal_name: 'AgroAustral S.A. - Planta Rosario',
    tax_id: '30-60001234-5',
    industry: 'Agroindustria',
    organization_id: 'org-006',
    organization_name: 'AgroAustral',
    country_id: 'ar',
    country_name: 'Argentina',
    country_flag: '🇦🇷',
    status: 'active',
    corporate_info: {
      registration_date: '2024-04-15',
      legal_address: 'Ruta 9 Km 234, Rosario, Argentina',
      business_phone: '+54 341 555 0123',
      business_email: 'rosario@agroaustral.com.ar',
      website: 'https://agroaustral.com.ar',
      business_license: 'SENASA-AA-ROS-2024'
    },
    payroll_config: {
      payroll_frequency: 'monthly',
      pay_period_cutoff: 30,
      payment_day: 10,
      overtime_policy: 'agricultural_labor_law',
      holiday_policy: 'harvest_season_adjusted',
      vacation_accrual_method: 'calendar'
    },
    hr_policies: {
      work_hours_per_day: 8,
      work_days_per_week: 6,
      break_policies: ['lunch_1hr', 'mate_break_15min'],
      remote_work_allowed: false,
      flexible_hours: false,
      dress_code: 'work_uniform',
      employee_benefits: ['obra_social', 'jubilacion', 'ropa_trabajo', 'transporte_empresa']
    },
    tenant_config: {
      isolation_level: 1,
      auto_scaling_enabled: false,
      uptime_guarantee: 99.5,
      support_level: 'basic',
      data_retention_years: 7,
      backup_frequency: 'weekly'
    },
    inherits_from_country: true,
    inherits_from_organization: true,
    custom_overrides: ['harvest_season_policies', 'agricultural_safety'],
    employees_count: 520,
    active_employees: 500,
    departments_count: 4,
    locations_count: 2,
    avg_salary: 65000,
    payroll_cost_monthly: 3380000,
    created_at: '2024-04-15T10:00:00Z',
    updated_at: '2025-01-02T14:30:00Z',
    last_payroll_run: '2025-01-31T09:00:00Z'
  },
  {
    id: 'minera-cl-001',
    code: 'MINERA-CL',
    name: 'Minera Andes Antofagasta',
    legal_name: 'Minera Andes SpA - Faena Antofagasta',
    tax_id: '76.123.456-7',
    industry: 'Minería',
    organization_id: 'org-007',
    organization_name: 'Minera Andes',
    country_id: 'cl',
    country_name: 'Chile',
    country_flag: '🇨🇱',
    status: 'active',
    corporate_info: {
      registration_date: '2024-05-20',
      legal_address: 'Ruta B-400 Km 15, Antofagasta, Chile',
      business_phone: '+56 55 2345 6789',
      business_email: 'antofagasta@mineraandes.cl',
      website: 'https://mineraandes.cl',
      business_license: 'SERNAGEOMIN-MA-ANT-2024'
    },
    payroll_config: {
      payroll_frequency: 'biweekly',
      pay_period_cutoff: 26,
      payment_day: 15,
      overtime_policy: 'mining_shift_premium',
      holiday_policy: 'continuous_operations',
      vacation_accrual_method: 'progressive'
    },
    hr_policies: {
      work_hours_per_day: 12,
      work_days_per_week: 4,
      break_policies: ['meal_30min_per_6hrs', 'safety_briefing_15min'],
      remote_work_allowed: false,
      flexible_hours: false,
      dress_code: 'safety_ppe_required',
      employee_benefits: ['isapre_premium', 'afp', 'seguro_complementario', 'casa_cambio']
    },
    tenant_config: {
      isolation_level: 2,
      auto_scaling_enabled: true,
      uptime_guarantee: 99.8,
      support_level: 'premium',
      data_retention_years: 15,
      backup_frequency: 'daily'
    },
    inherits_from_country: true,
    inherits_from_organization: true,
    custom_overrides: ['mining_safety_regulations', 'shift_work_policies', 'altitude_compensation'],
    employees_count: 950,
    active_employees: 920,
    departments_count: 5,
    locations_count: 2,
    avg_salary: 135000,
    payroll_cost_monthly: 12825000,
    created_at: '2024-05-20T10:00:00Z',
    updated_at: '2025-01-02T15:30:00Z',
    last_payroll_run: '2025-01-31T06:00:00Z'
  },
  {
    id: 'retail-cl-001',
    code: 'RETAIL-CL',
    name: 'Retail Andino Santiago',
    legal_name: 'Retail Andino S.A. - Tienda Santiago Centro',
    tax_id: '96.789.012-3',
    industry: 'Retail',
    organization_id: 'org-008',
    organization_name: 'Retail Andino',
    country_id: 'cl',
    country_name: 'Chile',
    country_flag: '🇨🇱',
    status: 'active',
    corporate_info: {
      registration_date: '2024-05-25',
      legal_address: 'Av. Providencia 2550, Providencia, Santiago, Chile',
      business_phone: '+56 2 3456 7890',
      business_email: 'santiago@retailandino.cl',
      website: 'https://retailandino.cl',
      business_license: 'SII-RA-SCL-2024'
    },
    payroll_config: {
      payroll_frequency: 'monthly',
      pay_period_cutoff: 30,
      payment_day: 5,
      overtime_policy: 'retail_commission_based',
      holiday_policy: 'retail_calendar',
      vacation_accrual_method: 'calendar'
    },
    hr_policies: {
      work_hours_per_day: 8,
      work_days_per_week: 6,
      break_policies: ['lunch_45min', 'coffee_15min'],
      remote_work_allowed: false,
      flexible_hours: true,
      dress_code: 'retail_uniform',
      employee_benefits: ['fonasa_isapre_mix', 'afp', 'colación', 'descuento_empleado']
    },
    tenant_config: {
      isolation_level: 1,
      auto_scaling_enabled: false,
      uptime_guarantee: 99.0,
      support_level: 'basic',
      data_retention_years: 5,
      backup_frequency: 'weekly'
    },
    inherits_from_country: true,
    inherits_from_organization: true,
    custom_overrides: ['retail_commission_structure', 'customer_service_bonuses'],
    employees_count: 380,
    active_employees: 365,
    departments_count: 4,
    locations_count: 1,
    avg_salary: 48000,
    payroll_cost_monthly: 1824000,
    created_at: '2024-05-25T10:00:00Z',
    updated_at: '2024-12-28T11:45:00Z',
    last_payroll_run: '2025-01-31T07:00:00Z'
  },
  {
    id: 'textil-pe-001',
    code: 'TEXTIL-PE',
    name: 'Textil Perú Lima',
    legal_name: 'Textil Perú S.A.C. - Planta Lima',
    tax_id: '20123456789',
    industry: 'Textil',
    organization_id: 'org-009',
    organization_name: 'Textil Perú',
    country_id: 'pe',
    country_name: 'Perú',
    country_flag: '🇵🇪',
    status: 'active',
    corporate_info: {
      registration_date: '2024-06-15',
      legal_address: 'Av. Argentina 2485, Callao, Lima, Perú',
      business_phone: '+51 1 234 5678',
      business_email: 'lima@textilperu.com.pe',
      website: 'https://textilperu.com.pe',
      business_license: 'PRODUCE-TP-LIM-2024'
    },
    payroll_config: {
      payroll_frequency: 'monthly',
      pay_period_cutoff: 30,
      payment_day: 15,
      overtime_policy: 'peruvian_labor_code',
      holiday_policy: 'textile_industry_standard',
      vacation_accrual_method: 'anniversary'
    },
    hr_policies: {
      work_hours_per_day: 8,
      work_days_per_week: 6,
      break_policies: ['lunch_1hr', 'descanso_15min_am', 'descanso_15min_pm'],
      remote_work_allowed: false,
      flexible_hours: false,
      dress_code: 'industrial_uniform',
      employee_benefits: ['essalud', 'onp_spp', 'cts', 'gratificaciones', 'asignacion_familiar']
    },
    tenant_config: {
      isolation_level: 2,
      auto_scaling_enabled: false,
      uptime_guarantee: 99.5,
      support_level: 'premium',
      data_retention_years: 7,
      backup_frequency: 'daily'
    },
    inherits_from_country: true,
    inherits_from_organization: true,
    custom_overrides: ['export_bonus_structure', 'production_incentives'],
    employees_count: 1450,
    active_employees: 1420,
    departments_count: 5,
    locations_count: 1,
    avg_salary: 28000,
    payroll_cost_monthly: 4060000,
    created_at: '2024-06-15T10:00:00Z',
    updated_at: '2025-01-01T09:15:00Z',
    last_payroll_run: '2025-01-31T08:30:00Z'
  },
  {
    id: 'gastro-pe-001',
    code: 'GASTRO-PE',
    name: 'Gastro Lima Miraflores',
    legal_name: 'Gastronomía Lima S.A.C. - Restaurante Miraflores',
    tax_id: '20987654321',
    industry: 'Gastronomía',
    organization_id: 'org-010',
    organization_name: 'Gastro Lima',
    country_id: 'pe',
    country_name: 'Perú',
    country_flag: '🇵🇪',
    status: 'active',
    corporate_info: {
      registration_date: '2024-06-20',
      legal_address: 'Av. La Mar 1234, Miraflores, Lima, Perú',
      business_phone: '+51 1 456 7890',
      business_email: 'miraflores@gastrolima.pe',
      website: 'https://gastrolima.pe',
      business_license: 'MINCETUR-GL-MIR-2024'
    },
    payroll_config: {
      payroll_frequency: 'biweekly',
      pay_period_cutoff: 15,
      payment_day: 30,
      overtime_policy: 'hospitality_flexible_hours',
      holiday_policy: 'restaurant_calendar',
      vacation_accrual_method: 'anniversary'
    },
    hr_policies: {
      work_hours_per_day: 8,
      work_days_per_week: 6,
      break_policies: ['comida_personal_30min', 'descanso_personal_15min'],
      remote_work_allowed: false,
      flexible_hours: true,
      dress_code: 'chef_service_uniform',
      employee_benefits: ['essalud', 'onp_spp', 'cts', 'propinas_compartidas', 'comida_personal']
    },
    tenant_config: {
      isolation_level: 1,
      auto_scaling_enabled: false,
      uptime_guarantee: 99.0,
      support_level: 'basic',
      data_retention_years: 5,
      backup_frequency: 'weekly'
    },
    inherits_from_country: true,
    inherits_from_organization: true,
    custom_overrides: ['tips_distribution_policy', 'shift_meal_policy'],
    employees_count: 180,
    active_employees: 175,
    departments_count: 4,
    locations_count: 1,
    avg_salary: 22000,
    payroll_cost_monthly: 396000,
    created_at: '2024-06-20T10:00:00Z',
    updated_at: '2024-12-30T16:20:00Z',
    last_payroll_run: '2025-01-31T09:30:00Z'
  },
  {
    id: 'pharma-pe-001',
    code: 'PHARMA-PE',
    name: 'Pharma Andina Lima',
    legal_name: 'Farmacéutica Andina S.A. - Oficina Lima',
    tax_id: '20555666777',
    industry: 'Farmacéutica',
    organization_id: 'org-011',
    organization_name: 'Pharma Andina',
    country_id: 'pe',
    country_name: 'Perú',
    country_flag: '🇵🇪',
    status: 'active',
    corporate_info: {
      registration_date: '2024-06-25',
      legal_address: 'Av. Javier Prado Este 3456, San Borja, Lima, Perú',
      business_phone: '+51 1 567 8901',
      business_email: 'lima@pharmaandina.pe',
      website: 'https://pharmaandina.pe',
      business_license: 'DIGEMID-PA-LIM-2024'
    },
    payroll_config: {
      payroll_frequency: 'monthly',
      pay_period_cutoff: 30,
      payment_day: 5,
      overtime_policy: 'professional_exempt',
      holiday_policy: 'pharmaceutical_calendar',
      vacation_accrual_method: 'anniversary'
    },
    hr_policies: {
      work_hours_per_day: 8,
      work_days_per_week: 5,
      break_policies: ['lunch_1hr', 'coffee_15min'],
      remote_work_allowed: true,
      flexible_hours: true,
      dress_code: 'business_casual',
      employee_benefits: ['essalud_eps', 'onp_spp', 'cts', 'seguro_vida', 'capacitacion_profesional']
    },
    tenant_config: {
      isolation_level: 2,
      auto_scaling_enabled: true,
      uptime_guarantee: 99.8,
      support_level: 'premium',
      data_retention_years: 10,
      backup_frequency: 'daily'
    },
    inherits_from_country: true,
    inherits_from_organization: true,
    custom_overrides: ['pharmaceutical_regulations', 'professional_development_budget'],
    employees_count: 320,
    active_employees: 310,
    departments_count: 4,
    locations_count: 1,
    avg_salary: 38000,
    payroll_cost_monthly: 1216000,
    created_at: '2024-06-25T10:00:00Z',
    updated_at: '2024-12-22T13:45:00Z',
    last_payroll_run: '2025-01-31T08:15:00Z'
  }
]

export default function EmployersCatalogPage() {
  const router = useRouter()
  const [employers, setEmployers] = useState<Employer[]>(mockEmployers)
  const [filteredEmployers, setFilteredEmployers] = useState<Employer[]>(mockEmployers)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [organizationFilter, setOrganizationFilter] = useState('all')
  const [countryFilter, setCountryFilter] = useState('all')
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  useEffect(() => {
    let filtered = employers

    if (searchTerm) {
      filtered = filtered.filter(employer => 
        employer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employer.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employer.legal_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employer.tax_id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(employer => employer.status === statusFilter)
    }

    if (organizationFilter !== 'all') {
      filtered = filtered.filter(employer => employer.organization_id === organizationFilter)
    }

    if (countryFilter !== 'all') {
      filtered = filtered.filter(employer => employer.country_id === countryFilter)
    }

    setFilteredEmployers(filtered)
  }, [employers, searchTerm, statusFilter, organizationFilter, countryFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200'
      case 'inactive': return 'bg-red-100 text-red-700 border-red-200'
      case 'setup': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'migrating': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo'
      case 'inactive': return 'Inactivo'
      case 'setup': return 'En Configuración'
      case 'migrating': return 'Migrando'
      default: return status
    }
  }

  const getTenantLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-blue-100 text-blue-700'
      case 2: return 'bg-purple-100 text-purple-700'
      case 3: return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const organizations = Array.from(new Set(employers.map(employer => employer.organization_id)))
    .map(orgId => {
      const employer = employers.find(e => e.organization_id === orgId)
      return { id: orgId, name: employer?.organization_name || orgId }
    })

  const countries = Array.from(new Set(employers.map(employer => employer.country_id)))
    .map(countryId => {
      const employer = employers.find(e => e.country_id === countryId)
      return { 
        id: countryId, 
        name: employer?.country_name || countryId,
        flag: employer?.country_flag || '🏳️'
      }
    })

  const stats = {
    total: employers.length,
    active: employers.filter(e => e.status === 'active').length,
    totalEmployees: employers.reduce((sum, e) => sum + e.employees_count, 0),
    activeEmployees: employers.reduce((sum, e) => sum + e.active_employees, 0),
    avgSalary: employers.reduce((sum, e) => sum + e.avg_salary, 0) / employers.length,
    totalPayroll: employers.reduce((sum, e) => sum + e.payroll_cost_monthly, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogo de Empleadores</h1>
            <p className="text-gray-600 text-lg">
              Administración de empleadores/tenants y su configuración específica
            </p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center">
            <Users className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Empleadores</div>
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
              <UserCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalEmployees.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Empleados</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-lg mx-auto mb-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.activeEmployees.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Empleados Activos</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">${Math.round(stats.avgSalary / 1000)}K</div>
            <div className="text-sm text-gray-500">Salario Promedio</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg mx-auto mb-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">${(stats.totalPayroll / 1000000).toFixed(1)}M</div>
            <div className="text-sm text-gray-500">Nómina Mensual</div>
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
              placeholder="Buscar empleadores..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="setup">En Configuración</option>
              <option value="migrating">Migrando</option>
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              value={organizationFilter}
              onChange={(e) => setOrganizationFilter(e.target.value)}
            >
              <option value="all">Todas las organizaciones</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
            >
              <option value="all">Todos los países</option>
              {countries.map(country => (
                <option key={country.id} value={country.id}>{country.flag} {country.name}</option>
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
            onClick={() => router.push('/dashboard/settings/catalogs/employers/new')}
            className="bg-orange-600 hover:bg-orange-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Empleador</span>
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Mostrando {filteredEmployers.length} de {employers.length} empleadores
      </div>

      {/* Employers Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredEmployers.map((employer) => (
          <Card key={employer.id} className="border border-gray-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{employer.country_flag}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{employer.name}</h3>
                    <div className="text-sm text-gray-500">{employer.code} • {employer.industry}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {employer.organization_name} • {employer.country_name}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTenantLevelColor(employer.tenant_config.isolation_level)}`}>
                    Nivel {employer.tenant_config.isolation_level}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(employer.status)}`}>
                    {getStatusLabel(employer.status)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">RFC/Tax ID:</span>
                  <span className="font-medium">{employer.tax_id}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Frecuencia Nómina:</span>
                  <span className="font-medium">
                    {employer.payroll_config.payroll_frequency === 'weekly' ? 'Semanal' :
                     employer.payroll_config.payroll_frequency === 'biweekly' ? 'Quincenal' : 'Mensual'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Herencia:</span>
                  <div className="flex space-x-1">
                    {employer.inherits_from_country && (
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">País</span>
                    )}
                    {employer.inherits_from_organization && (
                      <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">Org</span>
                    )}
                    {employer.custom_overrides.length > 0 && (
                      <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                        {employer.custom_overrides.length} override{employer.custom_overrides.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="font-bold text-blue-600">{employer.employees_count}</div>
                  <div className="text-xs text-gray-600">Empleados</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="font-bold text-green-600">{employer.active_employees}</div>
                  <div className="text-xs text-gray-600">Activos</div>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded">
                  <div className="font-bold text-purple-600">{employer.departments_count}</div>
                  <div className="text-xs text-gray-600">Deptos</div>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded">
                  <div className="font-bold text-orange-600">{employer.locations_count}</div>
                  <div className="text-xs text-gray-600">Ubicaciones</div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                  <div>Salario Prom: ${(employer.avg_salary / 1000).toFixed(0)}K</div>
                  <div>Nómina: ${(employer.payroll_cost_monthly / 1000).toFixed(0)}K</div>
                  <div>SLA: {employer.tenant_config.uptime_guarantee}%</div>
                  <div>Soporte: {employer.tenant_config.support_level}</div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedEmployer(employer)
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
                    onClick={() => router.push(`/dashboard/settings/catalogs/employers/${employer.id}/edit`)}
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

      {/* Employer Details Modal */}
      {showDetailsModal && selectedEmployer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{selectedEmployer.country_flag}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedEmployer.name}</h2>
                    <p className="text-gray-600">
                      {selectedEmployer.organization_name} • {selectedEmployer.country_name}
                    </p>
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
                      <span className="text-gray-600">Razón social:</span>
                      <span className="font-medium text-sm">{selectedEmployer.legal_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RFC/Tax ID:</span>
                      <span className="font-medium">{selectedEmployer.tax_id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registro:</span>
                      <span className="font-medium">{new Date(selectedEmployer.corporate_info.registration_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Teléfono:</span>
                      <span className="font-medium text-sm">{selectedEmployer.corporate_info.business_phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-sm">{selectedEmployer.corporate_info.business_email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Website:</span>
                      <span className="font-medium text-sm">{selectedEmployer.corporate_info.website}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Payroll Configuration */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <span>Configuración de Nómina</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frecuencia:</span>
                      <span className="font-medium">
                        {selectedEmployer.payroll_config.payroll_frequency === 'weekly' ? 'Semanal' :
                         selectedEmployer.payroll_config.payroll_frequency === 'biweekly' ? 'Quincenal' : 'Mensual'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Día de corte:</span>
                      <span className="font-medium">{selectedEmployer.payroll_config.pay_period_cutoff}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Día de pago:</span>
                      <span className="font-medium">{selectedEmployer.payroll_config.payment_day}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Política overtime:</span>
                      <span className="font-medium text-xs">{selectedEmployer.payroll_config.overtime_policy.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Acumulación vacaciones:</span>
                      <span className="font-medium text-xs">{selectedEmployer.payroll_config.vacation_accrual_method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Última nómina:</span>
                      <span className="font-medium text-xs">
                        {selectedEmployer.last_payroll_run ? 
                          new Date(selectedEmployer.last_payroll_run).toLocaleDateString() : 
                          'Sin procesar'
                        }
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* HR Policies */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <UserCheck className="h-5 w-5 text-purple-600" />
                      <span>Políticas de RH</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horas por día:</span>
                      <span className="font-medium">{selectedEmployer.hr_policies.work_hours_per_day}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Días por semana:</span>
                      <span className="font-medium">{selectedEmployer.hr_policies.work_days_per_week}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trabajo remoto:</span>
                      <span className="font-medium">{selectedEmployer.hr_policies.remote_work_allowed ? 'Sí' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horarios flexibles:</span>
                      <span className="font-medium">{selectedEmployer.hr_policies.flexible_hours ? 'Sí' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Código de vestimenta:</span>
                      <span className="font-medium text-xs">{selectedEmployer.hr_policies.dress_code.replace(/_/g, ' ')}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-gray-600 text-sm">Beneficios:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedEmployer.hr_policies.employee_benefits.slice(0, 3).map((benefit, index) => (
                          <span key={index} className="px-1.5 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                            {benefit.replace(/_/g, ' ')}
                          </span>
                        ))}
                        {selectedEmployer.hr_policies.employee_benefits.length > 3 && (
                          <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            +{selectedEmployer.hr_policies.employee_benefits.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tenant Configuration */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-indigo-600" />
                      <span>Configuración Tenant</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nivel aislamiento:</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTenantLevelColor(selectedEmployer.tenant_config.isolation_level)}`}>
                        Nivel {selectedEmployer.tenant_config.isolation_level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Auto-escalamiento:</span>
                      <span className="font-medium">{selectedEmployer.tenant_config.auto_scaling_enabled ? 'Habilitado' : 'Deshabilitado'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">SLA Uptime:</span>
                      <span className="font-medium">{selectedEmployer.tenant_config.uptime_guarantee}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nivel soporte:</span>
                      <span className="font-medium">{selectedEmployer.tenant_config.support_level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Retención datos:</span>
                      <span className="font-medium">{selectedEmployer.tenant_config.data_retention_years} años</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Respaldos:</span>
                      <span className="font-medium">{selectedEmployer.tenant_config.backup_frequency}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Statistics */}
                <Card className="border border-gray-100 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      <span>Estadísticas y Herencia</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{selectedEmployer.employees_count}</div>
                        <div className="text-xs text-gray-600">Total Empleados</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{selectedEmployer.active_employees}</div>
                        <div className="text-xs text-gray-600">Empleados Activos</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">${(selectedEmployer.avg_salary / 1000).toFixed(0)}K</div>
                        <div className="text-xs text-gray-600">Salario Promedio</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">${(selectedEmployer.payroll_cost_monthly / 1000).toFixed(0)}K</div>
                        <div className="text-xs text-gray-600">Nómina Mensual</div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Configuración Heredada:</span>
                        <div className="flex space-x-2">
                          {selectedEmployer.inherits_from_country && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">País</span>
                          )}
                          {selectedEmployer.inherits_from_organization && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Organización</span>
                          )}
                        </div>
                      </div>
                      {selectedEmployer.custom_overrides.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-600">Configuraciones personalizadas:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedEmployer.custom_overrides.map((override, index) => (
                              <span key={index} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                                {override.replace(/_/g, ' ')}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-1 text-xs text-gray-600">
                        <div>Creado: {new Date(selectedEmployer.created_at).toLocaleDateString()}</div>
                        <div>Actualizado: {new Date(selectedEmployer.updated_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button variant="outline">
                  <Zap className="h-4 w-4 mr-2" />
                  Ejecutar Nómina
                </Button>
                <Button variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Validar Compliance
                </Button>
                <Button 
                  onClick={() => router.push(`/dashboard/settings/catalogs/employers/${selectedEmployer.id}/edit`)}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Empleador
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredEmployers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron empleadores</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}