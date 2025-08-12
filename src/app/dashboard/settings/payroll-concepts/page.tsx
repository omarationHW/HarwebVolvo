'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Calculator,
  Plus,
  Search,
  Filter,
  Edit,
  Copy,
  Trash2,
  Eye,
  Play,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  MoreVertical,
  FileText,
  Download,
  Upload
} from 'lucide-react'

interface PayrollConcept {
  id: string
  code: string
  name: string
  description: string
  type: 'perception' | 'deduction' | 'contribution'
  category: string
  calculationMethod: 'fixed' | 'percentage' | 'formula' | 'accumulated'
  formula?: string
  baseConcept?: string
  isTaxable: boolean
  affectsIMSS: boolean
  affectsInfonavit: boolean
  periodicity: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'annual'
  active: boolean
  version: number
  createdAt: string
  updatedAt: string
  usageCount: number
}

const mockConcepts: PayrollConcept[] = [
  {
    id: '1',
    code: 'SUELDO_BASE',
    name: 'Sueldo Base',
    description: 'Salario base mensual del empleado',
    type: 'perception',
    category: 'Salario',
    calculationMethod: 'fixed',
    isTaxable: true,
    affectsIMSS: true,
    affectsInfonavit: true,
    periodicity: 'monthly',
    active: true,
    version: 1,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    usageCount: 185
  },
  {
    id: '2',
    code: 'BONO_PROD',
    name: 'Bono de Productividad',
    description: 'Bono variable basado en metas alcanzadas',
    type: 'perception',
    category: 'Bonos',
    calculationMethod: 'formula',
    formula: 'SUELDO_BASE * 0.15 * (METAS_ALCANZADAS / 100)',
    baseConcept: 'SUELDO_BASE',
    isTaxable: true,
    affectsIMSS: true,
    affectsInfonavit: true,
    periodicity: 'monthly',
    active: true,
    version: 3,
    createdAt: '2024-02-01',
    updatedAt: '2024-11-15',
    usageCount: 45
  },
  {
    id: '3',
    code: 'ISR_RETENIDO',
    name: 'ISR Retenido',
    description: 'Impuesto sobre la renta retenido según tabla fiscal',
    type: 'deduction',
    category: 'Impuestos',
    calculationMethod: 'formula',
    formula: 'TABLA_ISR(INGRESO_GRAVABLE)',
    isTaxable: false,
    affectsIMSS: false,
    affectsInfonavit: false,
    periodicity: 'monthly',
    active: true,
    version: 2,
    createdAt: '2024-01-15',
    updatedAt: '2024-12-01',
    usageCount: 185
  },
  {
    id: '4',
    code: 'CUOTA_IMSS',
    name: 'Cuota IMSS Trabajador',
    description: 'Cuota del trabajador al Instituto Mexicano del Seguro Social',
    type: 'deduction',
    category: 'Seguridad Social',
    calculationMethod: 'percentage',
    formula: 'SBC * 0.025',
    baseConcept: 'SUELDO_BASE',
    isTaxable: false,
    affectsIMSS: false,
    affectsInfonavit: false,
    periodicity: 'monthly',
    active: true,
    version: 1,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    usageCount: 185
  },
  {
    id: '5',
    code: 'APORT_INFONAVIT',
    name: 'Aportación INFONAVIT',
    description: 'Aportación patronal al Instituto del Fondo Nacional de la Vivienda',
    type: 'contribution',
    category: 'Seguridad Social',
    calculationMethod: 'percentage',
    formula: 'SBC * 0.05',
    baseConcept: 'SUELDO_BASE',
    isTaxable: false,
    affectsIMSS: false,
    affectsInfonavit: false,
    periodicity: 'monthly',
    active: true,
    version: 1,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    usageCount: 185
  },
  {
    id: '6',
    code: 'VALES_DESP',
    name: 'Vales de Despensa',
    description: 'Apoyo para alimentación exento hasta el límite legal',
    type: 'perception',
    category: 'Beneficios',
    calculationMethod: 'fixed',
    isTaxable: false,
    affectsIMSS: false,
    affectsInfonavit: false,
    periodicity: 'monthly',
    active: true,
    version: 1,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-01',
    usageCount: 120
  }
]

export default function PayrollConceptsPage() {
  const router = useRouter()
  const [concepts, setConcepts] = useState<PayrollConcept[]>(mockConcepts)
  const [filteredConcepts, setFilteredConcepts] = useState<PayrollConcept[]>(mockConcepts)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedConcepts, setSelectedConcepts] = useState<Set<string>>(new Set())

  useEffect(() => {
    let filtered = concepts

    if (searchTerm) {
      filtered = filtered.filter(concept => 
        concept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        concept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        concept.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(concept => concept.type === typeFilter)
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(concept => concept.category === categoryFilter)
    }

    setFilteredConcepts(filtered)
  }, [concepts, searchTerm, typeFilter, categoryFilter])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'perception': return 'bg-green-100 text-green-700 border-green-200'
      case 'deduction': return 'bg-red-100 text-red-700 border-red-200'
      case 'contribution': return 'bg-blue-100 text-blue-700 border-blue-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'perception': return <TrendingUp className="h-4 w-4" />
      case 'deduction': return <TrendingDown className="h-4 w-4" />
      case 'contribution': return <Minus className="h-4 w-4" />
      default: return <Calculator className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'perception': return 'Percepción'
      case 'deduction': return 'Deducción'
      case 'contribution': return 'Aportación'
      default: return type
    }
  }

  const getMethodLabel = (method: string) => {
    switch (method) {
      case 'fixed': return 'Monto Fijo'
      case 'percentage': return 'Porcentaje'
      case 'formula': return 'Fórmula'
      case 'accumulated': return 'Acumulado'
      default: return method
    }
  }

  const categories = Array.from(new Set(concepts.map(concept => concept.category)))

  const stats = {
    total: concepts.length,
    active: concepts.filter(c => c.active).length,
    perceptions: concepts.filter(c => c.type === 'perception').length,
    deductions: concepts.filter(c => c.type === 'deduction').length,
    contributions: concepts.filter(c => c.type === 'contribution').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Conceptos de Nómina</h1>
            <p className="text-gray-600 text-lg">
              Editor avanzado de percepciones, deducciones y aportaciones
            </p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <Calculator className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
              <Calculator className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Conceptos</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.perceptions}</div>
            <div className="text-sm text-gray-500">Percepciones</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg mx-auto mb-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.deductions}</div>
            <div className="text-sm text-gray-500">Deducciones</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
              <Minus className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.contributions}</div>
            <div className="text-sm text-gray-500">Aportaciones</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.active}</div>
            <div className="text-sm text-gray-500">Activos</div>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar conceptos..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Todos los tipos</option>
              <option value="perception">Percepciones</option>
              <option value="deduction">Deducciones</option>
              <option value="contribution">Aportaciones</option>
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">Todas las categorías</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Importar</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
          <Button 
            onClick={() => router.push('/dashboard/settings/payroll-concepts/new')}
            className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Concepto</span>
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Mostrando {filteredConcepts.length} de {concepts.length} conceptos
      </div>

      {/* Concepts Table */}
      <Card className="border border-gray-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-900">Concepto</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Tipo</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Método</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Fórmula</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Uso</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Estado</th>
                  <th className="text-left p-4 font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredConcepts.map((concept, index) => (
                  <tr key={concept.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="font-medium text-gray-900">{concept.name}</div>
                        <div className="text-sm text-gray-500">{concept.code}</div>
                        <div className="text-xs text-gray-500 max-w-xs truncate">{concept.description}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 w-fit ${getTypeColor(concept.type)}`}>
                        {getTypeIcon(concept.type)}
                        <span>{getTypeLabel(concept.type)}</span>
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-900">
                      {getMethodLabel(concept.calculationMethod)}
                    </td>
                    <td className="p-4">
                      {concept.formula ? (
                        <div className="max-w-xs">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded truncate block">
                            {concept.formula}
                          </code>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-gray-900">{concept.usageCount}</div>
                      <div className="text-xs text-gray-500">empleados</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {concept.active ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className="text-sm text-gray-600">
                          {concept.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">v{concept.version}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                          <Play className="h-4 w-4" />
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
      
      {filteredConcepts.length === 0 && (
        <div className="text-center py-12">
          <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron conceptos</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  )
}