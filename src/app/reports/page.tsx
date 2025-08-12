'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart3,
  PieChart,
  FileText,
  Download,
  Calendar,
  Filter,
  Search,
  TrendingUp,
  DollarSign,
  Users,
  Building,
  Plus,
  Eye
} from 'lucide-react'

interface Report {
  id: string
  name: string
  type: 'payroll' | 'compliance' | 'financial' | 'employee' | 'tax'
  description: string
  lastGenerated: string
  generatedBy: string
  status: 'ready' | 'generating' | 'error'
  downloadUrl?: string
  parameters: Record<string, any>
}

const mockReports: Report[] = [
  {
    id: 'rpt-payroll-001',
    name: 'Reporte de Nómina Mensual',
    type: 'payroll',
    description: 'Resumen detallado de nómina por período',
    lastGenerated: '2025-01-12',
    generatedBy: 'María García',
    status: 'ready',
    downloadUrl: '/api/reports/payroll-monthly.pdf',
    parameters: { period: 'Enero 2025', workOrders: ['all'] }
  },
  {
    id: 'rpt-compliance-001',
    name: 'Auditoría de Cumplimiento',
    type: 'compliance',
    description: 'Validación de regulaciones fiscales y laborales',
    lastGenerated: '2025-01-10',
    generatedBy: 'Sistema Automático',
    status: 'ready',
    parameters: { country: 'MX', regulations: ['fiscal', 'labor'] }
  },
  {
    id: 'rpt-employee-001',
    name: 'Directorio de Empleados',
    type: 'employee',
    description: 'Lista completa de empleados activos',
    lastGenerated: '2025-01-08',
    generatedBy: 'Luis Fernández',
    status: 'ready',
    parameters: { status: 'active', includeDetails: true }
  },
  {
    id: 'rpt-tax-001',
    name: 'Declaración Fiscal Mensual',
    type: 'tax',
    description: 'Cálculos fiscales para presentación ante SAT',
    lastGenerated: '2025-01-05',
    generatedBy: 'Patricia Morales',
    status: 'generating',
    parameters: { month: 'Diciembre 2024', taxType: 'ISR' }
  },
  {
    id: 'rpt-financial-001',
    name: 'Estados Financieros',
    type: 'financial',
    description: 'Balance general y estado de resultados',
    lastGenerated: '2025-01-03',
    generatedBy: 'Elena Torres',
    status: 'ready',
    parameters: { period: 'Q4 2024', includeNotes: true }
  }
]

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [filteredReports, setFilteredReports] = useState<Report[]>(mockReports)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    let filtered = reports

    if (searchTerm) {
      filtered = filtered.filter(report => 
        report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(report => report.type === typeFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(report => report.status === statusFilter)
    }

    setFilteredReports(filtered)
  }, [reports, searchTerm, typeFilter, statusFilter])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payroll': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'compliance': return 'bg-red-100 text-red-700 border-red-200'
      case 'financial': return 'bg-green-100 text-green-700 border-green-200'
      case 'employee': return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'tax': return 'bg-orange-100 text-orange-700 border-orange-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-700 border-green-200'
      case 'generating': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'error': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payroll': return <DollarSign className="h-4 w-4" />
      case 'compliance': return <FileText className="h-4 w-4" />
      case 'financial': return <TrendingUp className="h-4 w-4" />
      case 'employee': return <Users className="h-4 w-4" />
      case 'tax': return <Building className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'payroll': return 'Nómina'
      case 'compliance': return 'Cumplimiento'
      case 'financial': return 'Financiero'
      case 'employee': return 'Empleados'
      case 'tax': return 'Fiscal'
      default: return type
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ready': return 'Listo'
      case 'generating': return 'Generando'
      case 'error': return 'Error'
      default: return status
    }
  }

  const handleGenerateReport = async (reportId: string) => {
    setIsGenerating(true)
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setReports(reports.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            status: 'ready' as const, 
            lastGenerated: new Date().toISOString().split('T')[0],
            generatedBy: 'Usuario Actual'
          }
        : report
    ))
    setIsGenerating(false)
  }

  const handleDownloadReport = (report: Report) => {
    // Simulate download
    alert(`Descargando: ${report.name}`)
  }

  const reportStats = {
    total: reports.length,
    ready: reports.filter(r => r.status === 'ready').length,
    generating: reports.filter(r => r.status === 'generating').length,
    recent: reports.filter(r => {
      const reportDate = new Date(r.lastGenerated)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return reportDate >= weekAgo
    }).length
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Total Reportes</p>
                <p className="text-2xl font-bold text-slate-900">{reportStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Listos</p>
                <p className="text-2xl font-bold text-slate-900">{reportStats.ready}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Generando</p>
                <p className="text-2xl font-bold text-slate-900">{reportStats.generating}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Esta Semana</p>
                <p className="text-2xl font-bold text-slate-900">{reportStats.recent}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar reportes..."
                className="pl-10 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <select
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Todos los tipos</option>
                <option value="payroll">Nómina</option>
                <option value="compliance">Cumplimiento</option>
                <option value="financial">Financiero</option>
                <option value="employee">Empleados</option>
                <option value="tax">Fiscal</option>
              </select>
              <select
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="ready">Listo</option>
                <option value="generating">Generando</option>
                <option value="error">Error</option>
              </select>
              <Button className="bg-slate-900 text-white hover:bg-slate-800 flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Nuevo Reporte</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="border-0 shadow-sm hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(report.type).replace('text-', 'text-white bg-').split(' ')[0]}`}>
                    {getTypeIcon(report.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-900">
                      {report.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getTypeColor(report.type)}`}>
                        {getTypeLabel(report.type)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(report.status)}`}>
                        {getStatusLabel(report.status)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">{report.description}</p>
              
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Última generación:</span>
                  <span className="font-medium">{report.lastGenerated}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Generado por:</span>
                  <span className="font-medium">{report.generatedBy}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4 border-t border-slate-200">
                {report.status === 'ready' ? (
                  <Button
                    size="sm"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleDownloadReport(report)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                ) : report.status === 'generating' ? (
                  <Button size="sm" className="flex-1" disabled>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generando...
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleGenerateReport(report.id)}
                    disabled={isGenerating}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {isGenerating ? 'Generando...' : 'Generar'}
                  </Button>
                )}
                
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">No se encontraron reportes</h3>
          <p className="text-slate-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}