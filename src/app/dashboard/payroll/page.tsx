'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  DollarSign,
  Calendar,
  Users,
  Calculator,
  FileText,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Play,
  Pause,
  TrendingUp,
  Building,
  Briefcase,
  User,
  CreditCard,
  PieChart
} from 'lucide-react'

interface PayrollPeriod {
  id: string
  name: string
  startDate: string
  endDate: string
  status: 'draft' | 'processing' | 'completed' | 'approved' | 'paid'
  workOrders: WorkOrderPayroll[]
  totalEmployees: number
  totalGrossPay: number
  totalDeductions: number
  totalNetPay: number
  createdDate: string
  processedDate?: string
  approvedDate?: string
  paidDate?: string
}

interface WorkOrderPayroll {
  id: string
  name: string
  employerName: string
  organizationName: string
  employeeCount: number
  grossPay: number
  deductions: {
    tax: number
    socialSecurity: number
    other: number
  }
  netPay: number
  status: 'pending' | 'calculated' | 'approved'
  employees: EmployeePayroll[]
}

interface EmployeePayroll {
  id: string
  employeeNumber: string
  name: string
  position: string
  baseSalary: number
  overtime: number
  bonuses: number
  grossPay: number
  deductions: {
    tax: number
    socialSecurity: number
    otherDeductions: number
  }
  netPay: number
  paymentMethod: 'bank_transfer' | 'check' | 'cash'
  bankAccount?: string
}

const mockPayrollPeriods: PayrollPeriod[] = [
  {
    id: 'payroll-2025-01-15',
    name: 'Quincena 15 Enero 2025',
    startDate: '2025-01-01',
    endDate: '2025-01-15',
    status: 'draft',
    totalEmployees: 185,
    totalGrossPay: 6875000,
    totalDeductions: 1375000,
    totalNetPay: 5500000,
    createdDate: '2025-01-05',
    workOrders: [
      {
        id: 'wo-dev-team',
        name: 'Equipo de Desarrollo',
        employerName: 'Panxea México',
        organizationName: 'Panxea Corporation',
        employeeCount: 45,
        grossPay: 1875000,
        deductions: {
          tax: 281250,
          socialSecurity: 131250,
          other: 37500
        },
        netPay: 1425000,
        status: 'pending',
        employees: [
          {
            id: 'emp-001',
            employeeNumber: 'PNX-DEV-001',
            name: 'María García López',
            position: 'Tech Lead',
            baseSalary: 42500,
            overtime: 5000,
            bonuses: 8000,
            grossPay: 55500,
            deductions: {
              tax: 8325,
              socialSecurity: 3885,
              otherDeductions: 1110
            },
            netPay: 42180,
            paymentMethod: 'bank_transfer',
            bankAccount: '****-1234'
          }
        ]
      },
      {
        id: 'wo-marketing',
        name: 'Marketing Digital',
        employerName: 'Panxea México',
        organizationName: 'Panxea Corporation',
        employeeCount: 12,
        grossPay: 480000,
        deductions: {
          tax: 72000,
          socialSecurity: 33600,
          other: 9600
        },
        netPay: 364800,
        status: 'pending',
        employees: []
      }
    ]
  },
  {
    id: 'payroll-2024-12-31',
    name: 'Quincena 31 Diciembre 2024',
    startDate: '2024-12-16',
    endDate: '2024-12-31',
    status: 'paid',
    totalEmployees: 185,
    totalGrossPay: 7250000,
    totalDeductions: 1450000,
    totalNetPay: 5800000,
    createdDate: '2024-12-20',
    processedDate: '2024-12-28',
    approvedDate: '2024-12-30',
    paidDate: '2024-12-31',
    workOrders: []
  }
]

export default function PayrollPage() {
  const [payrollPeriods, setPayrollPeriods] = useState<PayrollPeriod[]>(mockPayrollPeriods)
  const [selectedPeriod, setSelectedPeriod] = useState<PayrollPeriod>(mockPayrollPeriods[0])
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700 border-gray-200'
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'completed': return 'bg-green-100 text-green-700 border-green-200'
      case 'approved': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'paid': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="h-4 w-4" />
      case 'processing': return <Calculator className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'approved': return <CheckCircle className="h-4 w-4" />
      case 'paid': return <CreditCard className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Borrador'
      case 'processing': return 'Procesando'
      case 'completed': return 'Completado'
      case 'approved': return 'Aprobado'
      case 'paid': return 'Pagado'
      default: return status
    }
  }

  const handleCalculatePayroll = async () => {
    setIsProcessing(true)
    setProcessingStep(0)

    const steps = [
      'Validando datos de empleados...',
      'Calculando salarios base...',
      'Procesando horas extra...',
      'Aplicando bonificaciones...',
      'Calculando deducciones fiscales...',
      'Generando reportes...',
      'Finalizando cálculos...'
    ]

    for (let i = 0; i < steps.length; i++) {
      setProcessingStep(i)
      await new Promise(resolve => setTimeout(resolve, 1500))
    }

    const updatedPeriod = {
      ...selectedPeriod,
      status: 'completed' as const,
      processedDate: new Date().toISOString().split('T')[0],
      workOrders: selectedPeriod.workOrders.map(wo => ({
        ...wo,
        status: 'calculated' as const
      }))
    }

    setSelectedPeriod(updatedPeriod)
    setPayrollPeriods(periods => 
      periods.map(p => p.id === selectedPeriod.id ? updatedPeriod : p)
    )

    setIsProcessing(false)
    setProcessingStep(0)
  }

  const handleApprovePayroll = () => {
    const updatedPeriod = {
      ...selectedPeriod,
      status: 'approved' as const,
      approvedDate: new Date().toISOString().split('T')[0],
      workOrders: selectedPeriod.workOrders.map(wo => ({
        ...wo,
        status: 'approved' as const
      }))
    }

    setSelectedPeriod(updatedPeriod)
    setPayrollPeriods(periods => 
      periods.map(p => p.id === selectedPeriod.id ? updatedPeriod : p)
    )
  }

  const handlePayPayroll = () => {
    const updatedPeriod = {
      ...selectedPeriod,
      status: 'paid' as const,
      paidDate: new Date().toISOString().split('T')[0]
    }

    setSelectedPeriod(updatedPeriod)
    setPayrollPeriods(periods => 
      periods.map(p => p.id === selectedPeriod.id ? updatedPeriod : p)
    )
  }

  const processingSteps = [
    'Validando datos de empleados...',
    'Calculando salarios base...',
    'Procesando horas extra...',
    'Aplicando bonificaciones...',
    'Calculando deducciones fiscales...',
    'Generando reportes...',
    'Finalizando cálculos...'
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Períodos</p>
                <p className="text-2xl font-bold text-slate-900">{payrollPeriods.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Empleados</p>
                <p className="text-2xl font-bold text-slate-900">{selectedPeriod.totalEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Pago Neto</p>
                <p className="text-2xl font-bold text-slate-900">${(selectedPeriod.totalNetPay / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Estado</p>
                <p className="text-2xl font-bold text-slate-900">{getStatusLabel(selectedPeriod.status)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Period Selection */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-slate-600" />
            <span className="text-slate-900">Períodos de Nómina</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {payrollPeriods.map((period) => (
              <Card 
                key={period.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-l-4 ${
                  selectedPeriod.id === period.id
                    ? 'border-l-slate-900 bg-slate-50 ring-2 ring-slate-300 shadow-lg'
                    : 'border-l-slate-300 hover:border-l-slate-600 hover:bg-slate-50'
                } border-0 shadow-sm`}
                onClick={() => setSelectedPeriod(period)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-slate-900">{period.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs border flex items-center space-x-1 ${getStatusColor(period.status)}`}>
                      {getStatusIcon(period.status)}
                      <span>{getStatusLabel(period.status)}</span>
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{period.startDate} - {period.endDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{period.totalEmployees} empleados</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>${period.totalNetPay.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Processing Status */}
      {isProcessing && (
        <Card className="border-0 shadow-sm bg-blue-50">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Procesando Nómina</h3>
              <p className="text-slate-600 mb-4">{processingSteps[processingStep]}</p>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((processingStep + 1) / processingSteps.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Paso {processingStep + 1} de {processingSteps.length}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payroll Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-slate-600" />
                  <span className="text-slate-900">Resumen: {selectedPeriod.name}</span>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? 'Ocultar' : 'Ver'} Detalles
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">{selectedPeriod.totalEmployees}</div>
                  <div className="text-sm text-slate-600">Empleados</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">
                    ${(selectedPeriod.totalGrossPay / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-slate-600">Salario Bruto</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <Calculator className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">
                    ${(selectedPeriod.totalDeductions / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-slate-600">Deducciones</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">
                    ${(selectedPeriod.totalNetPay / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-slate-600">Pago Neto</div>
                </div>
              </div>

              {/* Work Orders Details */}
              {showDetails && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900 mb-3">Órdenes de Trabajo</h4>
                  {selectedPeriod.workOrders.map((workOrder) => (
                    <Card key={workOrder.id} className="border-l-4 border-l-blue-400 bg-slate-50 border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h5 className="font-semibold text-slate-900">{workOrder.name}</h5>
                            <p className="text-sm text-slate-600">{workOrder.employerName}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(workOrder.status)}`}>
                            {getStatusLabel(workOrder.status)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-slate-600">Empleados:</span>
                            <div className="font-semibold">{workOrder.employeeCount}</div>
                          </div>
                          <div>
                            <span className="text-slate-600">Salario Bruto:</span>
                            <div className="font-semibold">${workOrder.grossPay.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-slate-600">Deducciones:</span>
                            <div className="font-semibold text-red-600">
                              ${(workOrder.deductions.tax + workOrder.deductions.socialSecurity + workOrder.deductions.other).toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-600">Pago Neto:</span>
                            <div className="font-semibold text-green-600">${workOrder.netPay.toLocaleString()}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions Panel */}
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="h-5 w-5 text-slate-600" />
                <span className="text-slate-900">Acciones</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedPeriod.status === 'draft' && (
                <Button
                  onClick={handleCalculatePayroll}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <Calculator className="h-4 w-4" />
                  <span>{isProcessing ? 'Calculando...' : 'Calcular Nómina'}</span>
                </Button>
              )}

              {selectedPeriod.status === 'completed' && (
                <Button
                  onClick={handleApprovePayroll}
                  className="w-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Aprobar Nómina</span>
                </Button>
              )}

              {selectedPeriod.status === 'approved' && (
                <Button
                  onClick={handlePayPayroll}
                  className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Procesar Pagos</span>
                </Button>
              )}

              <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Ver Reportes</span>
              </Button>

              <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Exportar Datos</span>
              </Button>
            </CardContent>
          </Card>

          {/* Status Timeline */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900">Estado del Período</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${selectedPeriod.createdDate ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="text-sm">
                    <div className="font-medium text-slate-900">Creado</div>
                    {selectedPeriod.createdDate && <div className="text-slate-600">{selectedPeriod.createdDate}</div>}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${selectedPeriod.processedDate ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="text-sm">
                    <div className="font-medium text-slate-900">Procesado</div>
                    {selectedPeriod.processedDate && <div className="text-slate-600">{selectedPeriod.processedDate}</div>}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${selectedPeriod.approvedDate ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="text-sm">
                    <div className="font-medium text-slate-900">Aprobado</div>
                    {selectedPeriod.approvedDate && <div className="text-slate-600">{selectedPeriod.approvedDate}</div>}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${selectedPeriod.paidDate ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="text-sm">
                    <div className="font-medium text-slate-900">Pagado</div>
                    {selectedPeriod.paidDate && <div className="text-slate-600">{selectedPeriod.paidDate}</div>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}