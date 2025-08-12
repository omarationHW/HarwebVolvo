'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Building,
  Briefcase,
  Settings,
  Copy,
  Download
} from 'lucide-react'

interface EmployeeCustomConfig {
  employeeId: string
  employeeNumber: string
  employeeName: string
  department: string
  position: string
  baseSalary: number
  salaryType: 'monthly' | 'daily' | 'hourly'
  scheduleId: string
  costCenter: string
  customPerceptions: CustomConcept[]
  customDeductions: CustomConcept[]
  taxExemptions: TaxExemption[]
  specialRates: SpecialRates
  active: boolean
  lastUpdated: string
}

interface CustomConcept {
  conceptCode: string
  conceptName: string
  amount: number
  frequency: 'biweekly' | 'monthly' | 'annual' | 'one-time'
  startDate: string
  endDate?: string
  remainingPayments?: number
  authorizedBy: string
  reason: string
}

interface TaxExemption {
  conceptCode: string
  conceptName: string
  exemptAmount: number
  reason: string
  validUntil?: string
}

interface SpecialRates {
  overtimeRate?: number
  commissionPercentage?: number
  bonusMultiplier?: number
}

const mockEmployeeConfigs: EmployeeCustomConfig[] = [
  {
    employeeId: 'emp-001',
    employeeNumber: 'PNX-DEV-001',
    employeeName: 'María García López',
    department: 'Desarrollo',
    position: 'Tech Lead',
    baseSalary: 85000,
    salaryType: 'monthly',
    scheduleId: 'FULL_TIME',
    costCenter: 'CC001',
    customPerceptions: [
      {
        conceptCode: 'BONO_LIDERAZGO',
        conceptName: 'Bono de Liderazgo',
        amount: 8000,
        frequency: 'monthly',
        startDate: '2025-01-01',
        authorizedBy: 'Ana López - CEO',
        reason: 'Reconocimiento por liderazgo técnico excepcional'
      },
      {
        conceptCode: 'CERT_TECH',
        conceptName: 'Certificación Técnica',
        amount: 5000,
        frequency: 'one-time',
        startDate: '2025-01-15',
        endDate: '2025-01-15',
        remainingPayments: 1,
        authorizedBy: 'Roberto Silva - Director',
        reason: 'Reembolso certificación AWS Solutions Architect'
      }
    ],
    customDeductions: [
      {
        conceptCode: 'PRESTAMO_AUTO',
        conceptName: 'Préstamo Automóvil',
        amount: 3500,
        frequency: 'monthly',
        startDate: '2024-06-01',
        endDate: '2026-06-01',
        remainingPayments: 17,
        authorizedBy: 'Departamento de RH',
        reason: 'Préstamo para compra de vehículo'
      }
    ],
    taxExemptions: [
      {
        conceptCode: 'VALES_DESP',
        conceptName: 'Vales de Despensa',
        exemptAmount: 2000,
        reason: 'Exención legal hasta límite UMA',
        validUntil: '2025-12-31'
      }
    ],
    specialRates: {
      overtimeRate: 2.5,
      commissionPercentage: 2.0,
      bonusMultiplier: 1.2
    },
    active: true,
    lastUpdated: '2025-01-01'
  },
  {
    employeeId: 'emp-003',
    employeeNumber: 'PNX-MKT-001',
    employeeName: 'Luis Fernández Ruiz',
    department: 'Marketing',
    position: 'Marketing Director',
    baseSalary: 95000,
    salaryType: 'monthly',
    scheduleId: 'HYBRID',
    costCenter: 'CC002',
    customPerceptions: [
      {
        conceptCode: 'AUTO_EMPRESA',
        conceptName: 'Auto de Empresa',
        amount: 12000,
        frequency: 'monthly',
        startDate: '2024-03-01',
        authorizedBy: 'Ana López - CEO',
        reason: 'Beneficio ejecutivo - auto de empresa'
      }
    ],
    customDeductions: [
      {
        conceptCode: 'SEG_VIDA_FAM',
        conceptName: 'Seguro de Vida Familiar',
        amount: 850,
        frequency: 'monthly',
        startDate: '2024-01-01',
        authorizedBy: 'Empleado',
        reason: 'Seguro de vida familiar adicional'
      }
    ],
    taxExemptions: [],
    specialRates: {
      commissionPercentage: 5.0,
      bonusMultiplier: 1.5
    },
    active: true,
    lastUpdated: '2024-12-15'
  },
  {
    employeeId: 'emp-004',
    employeeNumber: 'PNX-SAL-001',
    employeeName: 'Patricia Morales Silva',
    department: 'Ventas',
    position: 'Sales Manager',
    baseSalary: 90000,
    salaryType: 'monthly',
    scheduleId: 'FULL_TIME',
    costCenter: 'CC003',
    customPerceptions: [
      {
        conceptCode: 'COMISION_ESP',
        conceptName: 'Comisión Especial Q4',
        amount: 15000,
        frequency: 'one-time',
        startDate: '2025-01-15',
        endDate: '2025-01-15',
        remainingPayments: 1,
        authorizedBy: 'Ana López - CEO',
        reason: 'Comisión especial por cumplimiento metas Q4 2024'
      }
    ],
    customDeductions: [
      {
        conceptCode: 'ANTICIPO_SUELDO',
        conceptName: 'Anticipo de Sueldo',
        amount: 20000,
        frequency: 'one-time',
        startDate: '2024-12-15',
        endDate: '2025-01-31',
        remainingPayments: 2,
        authorizedBy: 'Roberto Silva - Director',
        reason: 'Anticipo por gastos médicos familiares'
      }
    ],
    taxExemptions: [],
    specialRates: {
      commissionPercentage: 8.0,
      bonusMultiplier: 2.0
    },
    active: true,
    lastUpdated: '2024-12-15'
  }
]

export default function EmployeeConfigPage() {
  const [employeeConfigs, setEmployeeConfigs] = useState<EmployeeCustomConfig[]>(mockEmployeeConfigs)
  const [filteredConfigs, setFilteredConfigs] = useState<EmployeeCustomConfig[]>(mockEmployeeConfigs)
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeCustomConfig | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    let filtered = employeeConfigs

    if (searchTerm) {
      filtered = filtered.filter(config => 
        config.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        config.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        config.position.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (departmentFilter !== 'all') {
      filtered = filtered.filter(config => config.department === departmentFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(config => 
        statusFilter === 'active' ? config.active : !config.active
      )
    }

    setFilteredConfigs(filtered)
  }, [employeeConfigs, searchTerm, departmentFilter, statusFilter])

  const departments = Array.from(new Set(employeeConfigs.map(config => config.department)))

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'biweekly': return 'Quincenal'
      case 'monthly': return 'Mensual'
      case 'annual': return 'Anual'
      case 'one-time': return 'Una vez'
      default: return frequency
    }
  }

  const stats = {
    total: employeeConfigs.length,
    active: employeeConfigs.filter(config => config.active).length,
    withCustomPerceptions: employeeConfigs.filter(config => config.customPerceptions.length > 0).length,
    withCustomDeductions: employeeConfigs.filter(config => config.customDeductions.length > 0).length,
    withExemptions: employeeConfigs.filter(config => config.taxExemptions.length > 0).length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración de Empleados</h1>
            <p className="text-gray-600 text-lg">
              Configuraciones específicas, excepciones y casos especiales por empleado
            </p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center">
            <Users className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Configurados</div>
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
              <Plus className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.withCustomPerceptions}</div>
            <div className="text-sm text-gray-500">Con Percepciones</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg mx-auto mb-2">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.withCustomDeductions}</div>
            <div className="text-sm text-gray-500">Con Deducciones</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg mx-auto mb-2">
              <Settings className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.withExemptions}</div>
            <div className="text-sm text-gray-500">Con Exenciones</div>
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
              placeholder="Buscar empleados..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">Todos los departamentos</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700 flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nueva Configuración</span>
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Mostrando {filteredConfigs.length} de {employeeConfigs.length} empleados configurados
      </div>

      {/* Employee Configs Table */}
      <Card className="border border-gray-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-900">Empleado</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Configuraciones</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Salario Base</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Última Actualización</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Estado</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredConfigs.map((config, index) => (
                  <tr key={config.employeeId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{config.employeeName}</div>
                          <div className="text-sm text-gray-500">{config.employeeNumber}</div>
                          <div className="text-xs text-gray-500">{config.position} - {config.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        {config.customPerceptions.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Plus className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-green-600">{config.customPerceptions.length} Percepciones</span>
                          </div>
                        )}
                        {config.customDeductions.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Trash2 className="h-3 w-3 text-red-600" />
                            <span className="text-xs text-red-600">{config.customDeductions.length} Deducciones</span>
                          </div>
                        )}
                        {config.taxExemptions.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Settings className="h-3 w-3 text-blue-600" />
                            <span className="text-xs text-blue-600">{config.taxExemptions.length} Exenciones</span>
                          </div>
                        )}
                        {Object.keys(config.specialRates).length > 0 && (
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-3 w-3 text-purple-600" />
                            <span className="text-xs text-purple-600">Tarifas especiales</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">
                        ${config.baseSalary.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">{config.salaryType}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(config.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {config.active ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className="text-sm text-gray-600">
                          {config.active ? 'Activo' : 'Inactivo'}
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
                            setSelectedEmployee(config)
                            setShowDetails(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Copy className="h-4 w-4" />
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

      {/* Employee Details Modal/Panel */}
      {showDetails && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedEmployee.employeeName}</h2>
                  <p className="text-gray-600">{selectedEmployee.employeeNumber} - {selectedEmployee.position}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Custom Perceptions */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="h-5 w-5 text-green-600" />
                      <span>Percepciones Personalizadas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedEmployee.customPerceptions.length > 0 ? (
                      selectedEmployee.customPerceptions.map((perception, index) => (
                        <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium text-gray-900">{perception.conceptName}</div>
                            <div className="text-lg font-bold text-green-600">${perception.amount.toLocaleString()}</div>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>Frecuencia: {getFrequencyLabel(perception.frequency)}</div>
                            <div>Desde: {new Date(perception.startDate).toLocaleDateString()}</div>
                            {perception.endDate && (
                              <div>Hasta: {new Date(perception.endDate).toLocaleDateString()}</div>
                            )}
                            {perception.remainingPayments && (
                              <div>Pagos restantes: {perception.remainingPayments}</div>
                            )}
                            <div className="text-xs text-gray-500 mt-2">
                              Autorizado por: {perception.authorizedBy}
                            </div>
                            <div className="text-xs text-gray-500">
                              Motivo: {perception.reason}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        No hay percepciones personalizadas
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Custom Deductions */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Trash2 className="h-5 w-5 text-red-600" />
                      <span>Deducciones Personalizadas</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedEmployee.customDeductions.length > 0 ? (
                      selectedEmployee.customDeductions.map((deduction, index) => (
                        <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium text-gray-900">{deduction.conceptName}</div>
                            <div className="text-lg font-bold text-red-600">-${deduction.amount.toLocaleString()}</div>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>Frecuencia: {getFrequencyLabel(deduction.frequency)}</div>
                            <div>Desde: {new Date(deduction.startDate).toLocaleDateString()}</div>
                            {deduction.endDate && (
                              <div>Hasta: {new Date(deduction.endDate).toLocaleDateString()}</div>
                            )}
                            {deduction.remainingPayments && (
                              <div>Pagos restantes: {deduction.remainingPayments}</div>
                            )}
                            <div className="text-xs text-gray-500 mt-2">
                              Autorizado por: {deduction.authorizedBy}
                            </div>
                            <div className="text-xs text-gray-500">
                              Motivo: {deduction.reason}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        No hay deducciones personalizadas
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tax Exemptions */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-blue-600" />
                      <span>Exenciones Fiscales</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedEmployee.taxExemptions.length > 0 ? (
                      selectedEmployee.taxExemptions.map((exemption, index) => (
                        <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium text-gray-900">{exemption.conceptName}</div>
                            <div className="text-lg font-bold text-blue-600">${exemption.exemptAmount.toLocaleString()}</div>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>Motivo: {exemption.reason}</div>
                            {exemption.validUntil && (
                              <div>Válido hasta: {new Date(exemption.validUntil).toLocaleDateString()}</div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        No hay exenciones fiscales
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Special Rates */}
                <Card className="border border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                      <span>Tarifas Especiales</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.keys(selectedEmployee.specialRates).length > 0 ? (
                      <div className="space-y-3">
                        {selectedEmployee.specialRates.overtimeRate && (
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <span className="font-medium text-gray-900">Tarifa Horas Extra</span>
                            <span className="text-lg font-bold text-purple-600">{selectedEmployee.specialRates.overtimeRate}x</span>
                          </div>
                        )}
                        {selectedEmployee.specialRates.commissionPercentage && (
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <span className="font-medium text-gray-900">Porcentaje Comisión</span>
                            <span className="text-lg font-bold text-purple-600">{selectedEmployee.specialRates.commissionPercentage}%</span>
                          </div>
                        )}
                        {selectedEmployee.specialRates.bonusMultiplier && (
                          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                            <span className="font-medium text-gray-900">Multiplicador Bonos</span>
                            <span className="text-lg font-bold text-purple-600">{selectedEmployee.specialRates.bonusMultiplier}x</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        No hay tarifas especiales configuradas
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {filteredConfigs.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron configuraciones</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}