'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Building2,
  DollarSign,
  Clock,
  Users,
  Gift,
  Briefcase,
  Calendar,
  Settings,
  Edit,
  Save,
  Plus,
  Trash2,
  Copy,
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

interface SalaryScale {
  level: string
  minSalary: number
  maxSalary: number
  currency: string
  description: string
}

interface CorporateBenefit {
  conceptCode: string
  name: string
  amount: number
  type: 'fixed' | 'percentage'
  appliesTo: 'all' | 'department' | 'level'
  criteria: string
  active: boolean
}

interface WorkSchedule {
  scheduleId: string
  name: string
  weeklyHours: number
  dailyHours: number
  overtimeAfter: number
  description: string
  departments: string[]
}

interface CostCenter {
  code: string
  name: string
  budgetLimit: number
  manager: string
  active: boolean
}

interface OrganizationConfig {
  payrollFrequency: 'weekly' | 'biweekly' | 'monthly'
  salaryScales: SalaryScale[]
  corporateBenefits: CorporateBenefit[]
  workSchedules: WorkSchedule[]
  costCenters: CostCenter[]
  deductionPolicies: {
    maxTotalDeductions: number
    loanMaxTerm: number
    advanceMaxPercentage: number
  }
}

export default function OrganizationConfigPage() {
  const [config, setConfig] = useState<OrganizationConfig>({
    payrollFrequency: 'biweekly',
    salaryScales: [
      {
        level: 'Ejecutivo Senior',
        minSalary: 80000,
        maxSalary: 150000,
        currency: 'MXN',
        description: 'Directores y gerentes de alto nivel'
      },
      {
        level: 'Ejecutivo Medio',
        minSalary: 45000,
        maxSalary: 80000,
        currency: 'MXN',
        description: 'Gerentes de área y coordinadores'
      },
      {
        level: 'Profesional Senior',
        minSalary: 30000,
        maxSalary: 55000,
        currency: 'MXN',
        description: 'Especialistas y líderes técnicos'
      },
      {
        level: 'Profesional',
        minSalary: 20000,
        maxSalary: 35000,
        currency: 'MXN',
        description: 'Analistas y desarrolladores'
      },
      {
        level: 'Operativo',
        minSalary: 12000,
        maxSalary: 25000,
        currency: 'MXN',
        description: 'Personal administrativo y soporte'
      }
    ],
    corporateBenefits: [
      {
        conceptCode: 'VALES_DESP',
        name: 'Vales de Despensa',
        amount: 2000,
        type: 'fixed',
        appliesTo: 'all',
        criteria: 'Todos los empleados activos',
        active: true
      },
      {
        conceptCode: 'SEGURO_VIDA',
        name: 'Seguro de Vida',
        amount: 1.5,
        type: 'percentage',
        appliesTo: 'level',
        criteria: 'Ejecutivo Senior, Ejecutivo Medio',
        active: true
      },
      {
        conceptCode: 'BONO_TRANSPORT',
        name: 'Apoyo de Transporte',
        amount: 1500,
        type: 'fixed',
        appliesTo: 'department',
        criteria: 'Ventas, Marketing',
        active: true
      },
      {
        conceptCode: 'FONDO_AHORRO',
        name: 'Fondo de Ahorro',
        amount: 8,
        type: 'percentage',
        appliesTo: 'all',
        criteria: 'Empleados con más de 6 meses',
        active: true
      }
    ],
    workSchedules: [
      {
        scheduleId: 'FULL_TIME',
        name: 'Tiempo Completo',
        weeklyHours: 40,
        dailyHours: 8,
        overtimeAfter: 8,
        description: 'Horario estándar de lunes a viernes',
        departments: ['Desarrollo', 'Marketing', 'Ventas', 'Administración']
      },
      {
        scheduleId: 'HYBRID',
        name: 'Trabajo Híbrido',
        weeklyHours: 40,
        dailyHours: 8,
        overtimeAfter: 8,
        description: '3 días oficina, 2 días remoto',
        departments: ['Desarrollo', 'Marketing']
      },
      {
        scheduleId: 'SUPPORT_24_7',
        name: 'Soporte 24/7',
        weeklyHours: 42,
        dailyHours: 8,
        overtimeAfter: 8,
        description: 'Turnos rotativos con guardias',
        departments: ['Soporte Técnico']
      }
    ],
    costCenters: [
      {
        code: 'CC001',
        name: 'Desarrollo de Software',
        budgetLimit: 2500000,
        manager: 'María García López',
        active: true
      },
      {
        code: 'CC002',
        name: 'Marketing Digital',
        budgetLimit: 800000,
        manager: 'Luis Fernández Ruiz',
        active: true
      },
      {
        code: 'CC003',
        name: 'Ventas Corporativas',
        budgetLimit: 1200000,
        manager: 'Patricia Morales Silva',
        active: true
      },
      {
        code: 'CC004',
        name: 'Consultoría',
        budgetLimit: 1800000,
        manager: 'Elena Torres Vázquez',
        active: true
      }
    ],
    deductionPolicies: {
      maxTotalDeductions: 30,
      loanMaxTerm: 24,
      advanceMaxPercentage: 30
    }
  })

  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [showNewSalaryScale, setShowNewSalaryScale] = useState(false)
  const [showNewBenefit, setShowNewBenefit] = useState(false)

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: Building2 },
    { id: 'salary-scales', label: 'Escalas Salariales', icon: DollarSign },
    { id: 'benefits', label: 'Beneficios', icon: Gift },
    { id: 'schedules', label: 'Horarios', icon: Clock },
    { id: 'cost-centers', label: 'Centros de Costo', icon: Briefcase },
    { id: 'policies', label: 'Políticas', icon: Settings }
  ]

  const frequencies = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quincenal' },
    { value: 'monthly', label: 'Mensual' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración de Organización</h1>
            <p className="text-gray-600 text-lg">
              Políticas salariales, beneficios y estructura organizacional
            </p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
            <Building2 className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{config.salaryScales.length}</div>
            <div className="text-sm text-gray-500">Escalas Salariales</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
              <Gift className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{config.corporateBenefits.filter(b => b.active).length}</div>
            <div className="text-sm text-gray-500">Beneficios Activos</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{config.costCenters.filter(cc => cc.active).length}</div>
            <div className="text-sm text-gray-500">Centros de Costo</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{config.workSchedules.length}</div>
            <div className="text-sm text-gray-500">Horarios Configurados</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          className={isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
        >
          {isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Editar Configuración
            </>
          )}
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
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
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  <span>Configuración General</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frecuencia de Nómina
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={config.payrollFrequency}
                    onChange={(e) => setConfig({
                      ...config,
                      payrollFrequency: e.target.value as any
                    })}
                    disabled={!isEditing}
                  >
                    {frequencies.map(freq => (
                      <option key={freq.value} value={freq.value}>{freq.label}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organización</label>
                    <div className="text-lg font-semibold text-gray-900">Panxea Corporation</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                    <div className="text-lg font-semibold text-gray-900">México</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Estado de Configuración</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { item: 'Escalas Salariales', status: 'configured', count: config.salaryScales.length },
                  { item: 'Beneficios Corporativos', status: 'configured', count: config.corporateBenefits.filter(b => b.active).length },
                  { item: 'Horarios de Trabajo', status: 'configured', count: config.workSchedules.length },
                  { item: 'Centros de Costo', status: 'configured', count: config.costCenters.filter(cc => cc.active).length },
                  { item: 'Políticas de Deducción', status: 'configured', count: 1 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-900">{item.item}</span>
                    </div>
                    <span className="text-sm text-gray-500">{item.count} configurado(s)</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'salary-scales' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Escalas Salariales</h3>
              <Button 
                onClick={() => setShowNewSalaryScale(true)}
                className="bg-purple-600 hover:bg-purple-700 flex items-center space-x-2"
                disabled={!isEditing}
              >
                <Plus className="h-4 w-4" />
                <span>Nueva Escala</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {config.salaryScales.map((scale, index) => (
                <Card key={index} className="border border-gray-100">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{scale.level}</CardTitle>
                      {isEditing && (
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600">{scale.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Salario Mínimo</label>
                        <div className="text-lg font-semibold text-gray-900">${scale.minSalary.toLocaleString()}</div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Salario Máximo</label>
                        <div className="text-lg font-semibold text-gray-900">${scale.maxSalary.toLocaleString()}</div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <div className="text-xs text-gray-500">Rango: ${(scale.maxSalary - scale.minSalary).toLocaleString()} {scale.currency}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Beneficios Corporativos</h3>
              <Button 
                onClick={() => setShowNewBenefit(true)}
                className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
                disabled={!isEditing}
              >
                <Plus className="h-4 w-4" />
                <span>Nuevo Beneficio</span>
              </Button>
            </div>

            <Card className="border border-gray-100">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-semibold text-gray-900">Beneficio</th>
                        <th className="text-left p-4 font-semibold text-gray-900">Monto</th>
                        <th className="text-left p-4 font-semibold text-gray-900">Aplica a</th>
                        <th className="text-left p-4 font-semibold text-gray-900">Estado</th>
                        <th className="text-left p-4 font-semibold text-gray-900">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.corporateBenefits.map((benefit, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="p-4">
                            <div>
                              <div className="font-medium text-gray-900">{benefit.name}</div>
                              <div className="text-sm text-gray-500">{benefit.conceptCode}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-gray-900">
                              {benefit.type === 'fixed' ? '$' : ''}{benefit.amount.toLocaleString()}{benefit.type === 'percentage' ? '%' : ''}
                            </div>
                            <div className="text-xs text-gray-500">{benefit.type === 'fixed' ? 'Monto fijo' : 'Porcentaje'}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-gray-900 capitalize">{benefit.appliesTo}</div>
                            <div className="text-xs text-gray-500">{benefit.criteria}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              {benefit.active ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              )}
                              <span className="text-sm text-gray-600">
                                {benefit.active ? 'Activo' : 'Inactivo'}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            {isEditing && (
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'schedules' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Horarios de Trabajo</h3>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
                disabled={!isEditing}
              >
                <Plus className="h-4 w-4" />
                <span>Nuevo Horario</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {config.workSchedules.map((schedule, index) => (
                <Card key={index} className="border border-gray-100">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{schedule.name}</CardTitle>
                      {isEditing && (
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{schedule.description}</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{schedule.weeklyHours}</div>
                        <div className="text-xs text-gray-600">Horas/Semana</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{schedule.dailyHours}</div>
                        <div className="text-xs text-gray-600">Horas/Día</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-xl font-bold text-orange-600">{schedule.overtimeAfter}</div>
                        <div className="text-xs text-gray-600">Extra después</div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Departamentos</label>
                      <div className="flex flex-wrap gap-1">
                        {schedule.departments.map((dept, deptIndex) => (
                          <span key={deptIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {dept}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cost-centers' && (
          <Card className="border border-gray-100">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-900">Centro de Costo</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Presupuesto</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Responsable</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Estado</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {config.costCenters.map((center, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-gray-900">{center.name}</div>
                            <div className="text-sm text-gray-500">{center.code}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-lg font-semibold text-gray-900">
                            ${center.budgetLimit.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">Límite mensual</div>
                        </td>
                        <td className="p-4 text-sm text-gray-900">{center.manager}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            {center.active ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            )}
                            <span className="text-sm text-gray-600">
                              {center.active ? 'Activo' : 'Inactivo'}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          {isEditing && (
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'policies' && (
          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <span>Políticas de Deducción</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600">{config.deductionPolicies.maxTotalDeductions}%</div>
                  <div className="text-sm text-gray-600 mt-2">Máximo Total de Deducciones</div>
                  <div className="text-xs text-gray-500 mt-1">Del salario base</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{config.deductionPolicies.loanMaxTerm}</div>
                  <div className="text-sm text-gray-600 mt-2">Plazo Máximo Préstamos</div>
                  <div className="text-xs text-gray-500 mt-1">Meses</div>
                </div>
                <div className="text-center p-6 bg-yellow-50 rounded-lg">
                  <div className="text-3xl font-bold text-yellow-600">{config.deductionPolicies.advanceMaxPercentage}%</div>
                  <div className="text-sm text-gray-600 mt-2">Máximo Anticipos</div>
                  <div className="text-xs text-gray-500 mt-1">Del salario mensual</div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-4">Reglas Adicionales</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">Los préstamos requieren autorización del gerente directo</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">Los anticipos se descuentan automáticamente de la siguiente nómina</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">El fondo de ahorro se calcula después de impuestos</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-700">Las deducciones por orden judicial tienen prioridad</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}