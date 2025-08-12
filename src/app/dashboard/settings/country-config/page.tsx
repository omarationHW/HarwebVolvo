'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Globe,
  DollarSign,
  Calculator,
  Calendar,
  Shield,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Edit,
  Save,
  Info,
  TrendingUp,
  FileText,
  Building
} from 'lucide-react'

interface TaxBracket {
  lowerLimit: number
  upperLimit: number
  fixedFee: number
  percentage: number
}

interface SubsidyBracket {
  lowerLimit: number
  upperLimit: number
  subsidy: number
}

interface CountryConfig {
  currency: string
  minimumWages: {
    general: number
    professional: number
    byZone: { zone: string; amount: number }[]
  }
  taxTables: {
    isrTable: TaxBracket[]
    subsidyTable: SubsidyBracket[]
    lastUpdate: string
  }
  socialSecurity: {
    imssRates: {
      employeePercentage: number
      employerPercentage: number
      ceiling: number
    }
    infonavitPercentage: number
    sarPercentage: number
  }
  laborRegulations: {
    overtimeMultiplier: number
    vacationPremium: number
    christmasBonusDays: number
    officialHolidays: string[]
  }
  legalLimits: {
    umaValue: number
    salaryCeiling: number
    maximumDeductionPercentage: number
  }
}

export default function CountryConfigPage() {
  const [config, setConfig] = useState<CountryConfig>({
    currency: 'MXN',
    minimumWages: {
      general: 248.93,
      professional: 374.89,
      byZone: [
        { zone: 'Zona Norte', amount: 374.89 },
        { zone: 'Zona Centro', amount: 248.93 },
        { zone: 'Zona Sur', amount: 248.93 }
      ]
    },
    taxTables: {
      isrTable: [
        { lowerLimit: 0.01, upperLimit: 746.04, fixedFee: 0, percentage: 1.92 },
        { lowerLimit: 746.05, upperLimit: 6332.05, fixedFee: 14.32, percentage: 6.40 },
        { lowerLimit: 6332.06, upperLimit: 11128.01, fixedFee: 371.83, percentage: 10.88 },
        { lowerLimit: 11128.02, upperLimit: 12935.83, fixedFee: 893.63, percentage: 16.00 },
        { lowerLimit: 12935.84, upperLimit: 31236.49, fixedFee: 1182.88, percentage: 21.36 },
        { lowerLimit: 31236.50, upperLimit: 49233.00, fixedFee: 5094.67, percentage: 23.52 },
        { lowerLimit: 49233.01, upperLimit: 93993.90, fixedFee: 9327.69, percentage: 30.00 },
        { lowerLimit: 93993.91, upperLimit: 125325.20, fixedFee: 22755.96, percentage: 32.00 },
        { lowerLimit: 125325.21, upperLimit: 375975.61, fixedFee: 32808.70, percentage: 34.00 },
        { lowerLimit: 375975.62, upperLimit: 1000000, fixedFee: 117912.32, percentage: 35.00 }
      ],
      subsidyTable: [
        { lowerLimit: 0.01, upperLimit: 1768.96, subsidy: 407.02 },
        { lowerLimit: 1768.97, upperLimit: 2653.38, subsidy: 406.83 },
        { lowerLimit: 2653.39, upperLimit: 3472.84, subsidy: 406.62 },
        { lowerLimit: 3472.85, upperLimit: 3537.87, subsidy: 392.77 },
        { lowerLimit: 3537.88, upperLimit: 4446.15, subsidy: 382.46 },
        { lowerLimit: 4446.16, upperLimit: 4717.18, subsidy: 354.23 },
        { lowerLimit: 4717.19, upperLimit: 5335.42, subsidy: 324.87 },
        { lowerLimit: 5335.43, upperLimit: 6224.67, subsidy: 294.63 },
        { lowerLimit: 6224.68, upperLimit: 7113.90, subsidy: 253.54 },
        { lowerLimit: 7113.91, upperLimit: 7382.33, subsidy: 217.61 }
      ],
      lastUpdate: '2025-01-01'
    },
    socialSecurity: {
      imssRates: {
        employeePercentage: 2.5,
        employerPercentage: 7.0,
        ceiling: 132060
      },
      infonavitPercentage: 5.0,
      sarPercentage: 2.0
    },
    laborRegulations: {
      overtimeMultiplier: 2.0,
      vacationPremium: 25.0,
      christmasBonusDays: 15,
      officialHolidays: [
        '2025-01-01', // Año Nuevo
        '2025-02-03', // Día de la Constitución
        '2025-03-17', // Natalicio de Benito Juárez
        '2025-05-01', // Día del Trabajo
        '2025-09-16', // Día de la Independencia
        '2025-11-17', // Revolución Mexicana
        '2025-12-25'  // Navidad
      ]
    },
    legalLimits: {
      umaValue: 108.57,
      salaryCeiling: 1596863.04,
      maximumDeductionPercentage: 30.0
    }
  })

  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [lastSync, setLastSync] = useState('2025-01-01 10:30:15')

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: Globe },
    { id: 'wages', label: 'Salarios Mínimos', icon: DollarSign },
    { id: 'taxes', label: 'Tablas Fiscales', icon: Calculator },
    { id: 'social-security', label: 'Seguridad Social', icon: Shield },
    { id: 'regulations', label: 'Regulaciones', icon: FileText },
    { id: 'limits', label: 'Límites Legales', icon: TrendingUp }
  ]

  const syncWithAuthorities = async () => {
    // Simular sincronización con autoridades fiscales
    try {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simular tiempo de sincronización
      setLastSync(new Date().toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
      alert('Sincronización completada exitosamente con las autoridades fiscales')
    } catch (error) {
      alert('Error durante la sincronización')
    } finally {
      setIsLoading(false)
    }
  }

  const exportConfig = () => {
    try {
      const dataStr = JSON.stringify(config, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      const exportFileDefaultName = `mexico-config-${new Date().toISOString().split('T')[0]}.json`
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
      
      alert('Configuración exportada exitosamente')
    } catch (error) {
      alert('Error al exportar la configuración')
    }
  }

  const importConfig = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const importedConfig = JSON.parse(e.target?.result as string)
            setConfig(importedConfig)
            alert('Configuración importada exitosamente')
          } catch (error) {
            alert('Error al importar la configuración. Verifique que el archivo sea válido.')
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Configuración de País - México</h1>
              <p className="text-slate-600 text-lg">
                Configuración fiscal, laboral y de seguridad social nivel nacional
              </p>
            </div>
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Globe className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">100%</div>
              <div className="text-sm text-slate-600">Compliance Legal</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
                <RefreshCw className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">Ene 2025</div>
              <div className="text-sm text-slate-600">Última Actualización</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">${config.minimumWages.general}</div>
              <div className="text-sm text-slate-600">Salario Mínimo</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-2">
                <Building className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">${config.legalLimits.umaValue}</div>
              <div className="text-sm text-slate-600">UMA Actual</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600">
                Última sincronización: <span className="font-medium text-slate-900">{lastSync}</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={syncWithAuthorities}
                disabled={isLoading}
                className="flex items-center space-x-2 border-slate-200 hover:bg-slate-50 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Sincronizando...' : 'Sincronizar'}</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={exportConfig}
                className="flex items-center space-x-2 border-slate-200 hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                <span>Exportar</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={importConfig}
                className="flex items-center space-x-2 border-slate-200 hover:bg-slate-50"
              >
                <Upload className="h-4 w-4" />
                <span>Importar</span>
              </Button>
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                className={isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-900 hover:bg-slate-800'}
              >
                {isEditing ? (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex flex-wrap gap-2 md:gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 border-b-2 font-medium text-sm flex items-center space-x-2 transition-all duration-200 rounded-t-lg ${
                    activeTab === tab.id
                      ? 'border-slate-900 text-slate-900 bg-slate-50'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-900">
                  <Info className="h-5 w-5 text-blue-600" />
                  <span>Información General</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">País</label>
                    <div className="text-lg font-semibold text-slate-900">México</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Moneda</label>
                    <div className="text-lg font-semibold text-slate-900">{config.currency}</div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Régimen Fiscal</label>
                  <div className="text-lg font-semibold text-slate-900">Asalariados</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Autoridad Fiscal</label>
                  <div className="text-lg font-semibold text-slate-900">Servicio de Administración Tributaria (SAT)</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-900">
                  <Calendar className="h-5 w-5 text-green-600" />
                  <span>Días Festivos 2025</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    { date: '2025-01-01', name: 'Año Nuevo' },
                    { date: '2025-02-03', name: 'Día de la Constitución' },
                    { date: '2025-03-17', name: 'Natalicio de Benito Juárez' },
                    { date: '2025-05-01', name: 'Día del Trabajo' },
                    { date: '2025-09-16', name: 'Día de la Independencia' },
                    { date: '2025-11-17', name: 'Revolución Mexicana' },
                    { date: '2025-12-25', name: 'Navidad' }
                  ].map((holiday, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                      <span className="text-sm font-medium text-slate-900">{holiday.name}</span>
                      <span className="text-sm text-slate-600">{new Date(holiday.date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'wages' && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-900">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>Salarios Mínimos Vigentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <label className="block text-sm font-medium text-slate-600 mb-2">Salario Mínimo General</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-slate-900">${config.minimumWages.general}</span>
                      <span className="text-sm text-slate-600">MXN diarios</span>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <label className="block text-sm font-medium text-slate-600 mb-2">Salario Mínimo Profesional</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-slate-900">${config.minimumWages.professional}</span>
                      <span className="text-sm text-slate-600">MXN diarios</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-3">Por Zona Geográfica</label>
                  <div className="space-y-3">
                    {config.minimumWages.byZone.map((zone, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <span className="font-medium text-slate-900">{zone.zone}</span>
                        <span className="text-lg font-semibold text-slate-900">${zone.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'taxes' && (
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5 text-purple-600" />
                    <span className="text-slate-900">Tabla de ISR Mensual</span>
                  </div>
                  <div className="text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded-lg">
                    Vigente desde: {config.taxTables.lastUpdate}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-slate-900">Límite Inferior</th>
                        <th className="px-4 py-3 text-left font-medium text-slate-900">Límite Superior</th>
                        <th className="px-4 py-3 text-left font-medium text-slate-900">Cuota Fija</th>
                        <th className="px-4 py-3 text-left font-medium text-slate-900">% Excedente</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.taxTables.isrTable.slice(0, 5).map((bracket, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="px-4 py-3 font-mono text-slate-900">${bracket.lowerLimit.toLocaleString()}</td>
                          <td className="px-4 py-3 font-mono text-slate-900">${bracket.upperLimit.toLocaleString()}</td>
                          <td className="px-4 py-3 font-mono text-slate-900">${bracket.fixedFee.toLocaleString()}</td>
                          <td className="px-4 py-3 font-mono text-slate-900">{bracket.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-3 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">
                    Mostrando 5 de {config.taxTables.isrTable.length} registros totales
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-900">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Tabla de Subsidio al Empleo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-slate-900">Límite Inferior</th>
                        <th className="px-4 py-3 text-left font-medium text-slate-900">Límite Superior</th>
                        <th className="px-4 py-3 text-left font-medium text-slate-900">Subsidio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.taxTables.subsidyTable.slice(0, 5).map((bracket, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="px-4 py-3 font-mono text-slate-900">${bracket.lowerLimit.toLocaleString()}</td>
                          <td className="px-4 py-3 font-mono text-slate-900">${bracket.upperLimit.toLocaleString()}</td>
                          <td className="px-4 py-3 font-mono text-slate-900">${bracket.subsidy.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-3 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">
                    Mostrando 5 de {config.taxTables.subsidyTable.length} registros totales
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'social-security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-900">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>IMSS - Cuotas y Aportaciones</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{config.socialSecurity.imssRates.employeePercentage}%</div>
                    <div className="text-sm text-slate-600">Trabajador</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{config.socialSecurity.imssRates.employerPercentage}%</div>
                    <div className="text-sm text-slate-600">Patrón</div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <label className="block text-sm font-medium text-slate-600 mb-1">Tope de Cotización</label>
                  <div className="text-lg font-semibold text-slate-900">${config.socialSecurity.imssRates.ceiling.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-900">
                  <Building className="h-5 w-5 text-orange-600" />
                  <span>Otras Aportaciones</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-medium text-slate-900">INFONAVIT</span>
                  <span className="text-lg font-semibold text-slate-900">{config.socialSecurity.infonavitPercentage}%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-medium text-slate-900">SAR</span>
                  <span className="text-lg font-semibold text-slate-900">{config.socialSecurity.sarPercentage}%</span>
                </div>
                <div className="text-xs text-slate-500 mt-2 p-2 bg-amber-50 rounded border border-amber-200">
                  * Aportaciones patronales calculadas sobre el SBC
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'regulations' && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-900">
                <FileText className="h-5 w-5 text-green-600" />
                <span>Regulaciones Laborales</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">{config.laborRegulations.overtimeMultiplier}x</div>
                  <div className="text-sm text-slate-600">Multiplicador Horas Extra</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{config.laborRegulations.vacationPremium}%</div>
                  <div className="text-sm text-slate-600">Prima Vacacional</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{config.laborRegulations.christmasBonusDays}</div>
                  <div className="text-sm text-slate-600">Días Aguinaldo</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">{config.laborRegulations.officialHolidays.length}</div>
                  <div className="text-sm text-slate-600">Días Festivos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'limits' && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-900">
                <TrendingUp className="h-5 w-5 text-red-600" />
                <span>Límites y Topes Legales</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-3xl font-bold text-red-600">${config.legalLimits.umaValue}</div>
                  <div className="text-sm text-slate-600 mt-2">Unidad de Medida y Actualización (UMA)</div>
                  <div className="text-xs text-slate-500 mt-1">Vigente 2025</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-3xl font-bold text-blue-600">${(config.legalLimits.salaryCeiling / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-slate-600 mt-2">Techo Salarial Anual</div>
                  <div className="text-xs text-slate-500 mt-1">Límite para prestaciones</div>
                </div>
                <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="text-3xl font-bold text-yellow-600">{config.legalLimits.maximumDeductionPercentage}%</div>
                  <div className="text-sm text-slate-600 mt-2">Máximo de Deducciones</div>
                  <div className="text-xs text-slate-500 mt-1">Del salario base</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}