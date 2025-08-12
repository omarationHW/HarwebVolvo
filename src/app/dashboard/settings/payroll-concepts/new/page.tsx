'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Calculator,
  Save,
  Play,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Info,
  Code,
  Eye,
  Lightbulb,
  BookOpen,
  Zap
} from 'lucide-react'

interface FormulaValidation {
  isValid: boolean
  errors: string[]
  warnings: string[]
  dependencies: string[]
}

export default function NewPayrollConceptPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    type: 'perception',
    category: '',
    calculationMethod: 'fixed',
    formula: '',
    baseConcept: '',
    fixedAmount: '',
    percentage: '',
    isTaxable: true,
    affectsIMSS: true,
    affectsInfonavit: true,
    periodicity: 'monthly',
    active: true
  })

  const [validation, setValidation] = useState<FormulaValidation>({
    isValid: true,
    errors: [],
    warnings: [],
    dependencies: []
  })

  const [testResult, setTestResult] = useState<any>(null)
  const [showPreview, setShowPreview] = useState(false)

  const conceptTypes = [
    { value: 'perception', label: 'Percepción', description: 'Ingresos que aumentan el pago del empleado' },
    { value: 'deduction', label: 'Deducción', description: 'Descuentos que reducen el pago neto' },
    { value: 'contribution', label: 'Aportación', description: 'Contribuciones patronales (no afectan al empleado)' }
  ]

  const calculationMethods = [
    { value: 'fixed', label: 'Monto Fijo', description: 'Cantidad fija sin variación' },
    { value: 'percentage', label: 'Porcentaje', description: 'Porcentaje sobre un concepto base' },
    { value: 'formula', label: 'Fórmula', description: 'Cálculo personalizado con fórmulas complejas' },
    { value: 'accumulated', label: 'Acumulado', description: 'Suma de múltiples conceptos o períodos' }
  ]

  const categories = [
    'Salario',
    'Bonos',
    'Comisiones',
    'Beneficios',
    'Impuestos',
    'Seguridad Social',
    'Descuentos',
    'Préstamos',
    'Otros'
  ]

  const periodicities = [
    { value: 'daily', label: 'Diario' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quincenal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'annual', label: 'Anual' }
  ]

  const availableConcepts = [
    'SUELDO_BASE',
    'HORAS_EXTRA',
    'COMISION_VENTAS',
    'BONO_ASISTENCIA', 
    'DIAS_TRABAJADOS',
    'INGRESO_GRAVABLE',
    'SBC',
    'UMA',
    'SALARIO_MINIMO'
  ]

  const formulaFunctions = [
    'SUM()', 'AVG()', 'MAX()', 'MIN()', 'ROUND()', 'IF()', 'AND()', 'OR()',
    'TABLA_ISR()', 'SUBSIDIO_EMPLEO()', 'LIMITE_INFERIOR()', 'DIAS_PERIODO()'
  ]

  const validateFormula = (formula: string) => {
    const errors: string[] = []
    const warnings: string[] = []
    const dependencies: string[] = []

    if (!formula.trim()) {
      return { isValid: true, errors, warnings, dependencies }
    }

    // Verificar sintaxis básica
    const parentheses = formula.split('(').length - formula.split(')').length
    if (parentheses !== 0) {
      errors.push('Los paréntesis no están balanceados')
    }

    // Detectar dependencias
    availableConcepts.forEach(concept => {
      if (formula.includes(concept)) {
        dependencies.push(concept)
      }
    })

    // Verificar referencias circulares
    if (dependencies.includes(formData.code)) {
      errors.push('Referencia circular detectada')
    }

    // Advertencias de buenas prácticas
    if (formula.length > 200) {
      warnings.push('La fórmula es muy compleja, considera dividirla en conceptos más simples')
    }

    if (dependencies.length > 5) {
      warnings.push('La fórmula depende de muchos conceptos, esto puede afectar el rendimiento')
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      dependencies
    }
  }

  const handleFormulaChange = (value: string) => {
    setFormData({ ...formData, formula: value })
    setValidation(validateFormula(value))
  }

  const testFormula = () => {
    // Simular test de fórmula
    const mockTestData = {
      SUELDO_BASE: 15000,
      HORAS_EXTRA: 8,
      COMISION_VENTAS: 2500,
      DIAS_TRABAJADOS: 30,
      UMA: 108.57
    }

    try {
      // Esta sería la lógica real de evaluación de fórmula
      let result = 0
      
      if (formData.calculationMethod === 'fixed') {
        result = parseFloat(formData.fixedAmount) || 0
      } else if (formData.calculationMethod === 'percentage') {
        const baseValue = mockTestData.SUELDO_BASE || 0
        const percentage = parseFloat(formData.percentage) || 0
        result = baseValue * (percentage / 100)
      } else if (formData.calculationMethod === 'formula') {
        // Simulación simple - en producción usaría un parser real
        if (formData.formula.includes('SUELDO_BASE * 0.15')) {
          result = mockTestData.SUELDO_BASE * 0.15
        } else if (formData.formula.includes('HORAS_EXTRA * 50')) {
          result = mockTestData.HORAS_EXTRA * 50
        } else {
          result = 1500 // Valor de ejemplo
        }
      }

      setTestResult({
        success: true,
        result,
        inputs: mockTestData,
        calculation: `Resultado: $${result.toLocaleString()}`
      })
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Error en el cálculo de la fórmula'
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validation.isValid) {
      alert('Por favor corrige los errores en la fórmula antes de guardar')
      return
    }

    // Aquí se guardaría el concepto
    console.log('Guardando concepto:', formData)
    router.push('/dashboard/settings/payroll-concepts')
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Nuevo Concepto de Nómina</h1>
              <p className="text-gray-600 text-lg">
                Crear percepciones, deducciones y aportaciones con fórmulas personalizadas
              </p>
            </div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <Calculator className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  <span>Información Básica</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Código del Concepto *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ej. BONO_PROD"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Concepto *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ej. Bono de Productividad"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Descripción detallada del concepto..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Concepto *
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      {conceptTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Periodicidad
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.periodicity}
                      onChange={(e) => setFormData({ ...formData, periodicity: e.target.value })}
                    >
                      {periodicities.map(period => (
                        <option key={period.value} value={period.value}>{period.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calculation Method */}
            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-purple-600" />
                  <span>Método de Cálculo</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Cálculo *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {calculationMethods.map(method => (
                      <label 
                        key={method.value} 
                        className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.calculationMethod === method.value 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="calculationMethod"
                          value={method.value}
                          checked={formData.calculationMethod === method.value}
                          onChange={(e) => setFormData({ ...formData, calculationMethod: e.target.value })}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{method.label}</div>
                          <div className="text-sm text-gray-500">{method.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Conditional Fields */}
                {formData.calculationMethod === 'fixed' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monto Fijo
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.fixedAmount}
                      onChange={(e) => setFormData({ ...formData, fixedAmount: e.target.value })}
                    />
                  </div>
                )}

                {formData.calculationMethod === 'percentage' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Porcentaje (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.percentage}
                        onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Concepto Base
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.baseConcept}
                        onChange={(e) => setFormData({ ...formData, baseConcept: e.target.value })}
                      >
                        <option value="">Seleccionar concepto base</option>
                        {availableConcepts.map(concept => (
                          <option key={concept} value={concept}>{concept}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {formData.calculationMethod === 'formula' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fórmula de Cálculo
                      </label>
                      <div className="relative">
                        <textarea
                          rows={4}
                          placeholder="ej. SUELDO_BASE * 0.15 * (METAS_ALCANZADAS / 100)"
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent font-mono text-sm ${
                            validation.isValid ? 'border-gray-300 focus:ring-blue-500' : 'border-red-300 focus:ring-red-500'
                          }`}
                          value={formData.formula}
                          onChange={(e) => handleFormulaChange(e.target.value)}
                        />
                        <Code className="absolute top-3 right-3 h-4 w-4 text-gray-400" />
                      </div>
                      
                      {/* Validation Messages */}
                      {validation.errors.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {validation.errors.map((error, index) => (
                            <div key={index} className="flex items-center space-x-2 text-red-600 text-sm">
                              <AlertTriangle className="h-4 w-4" />
                              <span>{error}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {validation.warnings.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {validation.warnings.map((warning, index) => (
                            <div key={index} className="flex items-center space-x-2 text-yellow-600 text-sm">
                              <AlertTriangle className="h-4 w-4" />
                              <span>{warning}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {validation.dependencies.length > 0 && (
                        <div className="mt-2">
                          <div className="text-sm text-gray-600 mb-1">Dependencias detectadas:</div>
                          <div className="flex flex-wrap gap-1">
                            {validation.dependencies.map(dep => (
                              <span key={dep} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                {dep}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={testFormula}
                        className="flex items-center space-x-2"
                      >
                        <Play className="h-4 w-4" />
                        <span>Probar Fórmula</span>
                      </Button>
                      <Button 
                        type="button"
                        variant="ghost"
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center space-x-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>Vista Previa</span>
                      </Button>
                    </div>

                    {/* Test Results */}
                    {testResult && (
                      <div className={`p-4 rounded-lg border ${
                        testResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                      }`}>
                        {testResult.success ? (
                          <div>
                            <div className="flex items-center space-x-2 text-green-700 mb-2">
                              <CheckCircle className="h-4 w-4" />
                              <span className="font-medium">Prueba exitosa</span>
                            </div>
                            <div className="text-sm text-green-600">
                              <div>Resultado: <strong>${testResult.result.toLocaleString()}</strong></div>
                              <div className="mt-2 text-xs">
                                Datos de prueba utilizados: {JSON.stringify(testResult.inputs, null, 2)}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-red-700">
                            <AlertTriangle className="h-4 w-4" />
                            <span>{testResult.error}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tax and Legal Settings */}
            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <span>Configuración Fiscal y Legal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={formData.isTaxable}
                      onChange={(e) => setFormData({ ...formData, isTaxable: e.target.checked })}
                    />
                    <div>
                      <div className="font-medium text-gray-900">Gravable para ISR</div>
                      <div className="text-sm text-gray-500">Sujeto a impuesto sobre la renta</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={formData.affectsIMSS}
                      onChange={(e) => setFormData({ ...formData, affectsIMSS: e.target.checked })}
                    />
                    <div>
                      <div className="font-medium text-gray-900">Integra al IMSS</div>
                      <div className="text-sm text-gray-500">Se incluye en el SBC</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={formData.affectsInfonavit}
                      onChange={(e) => setFormData({ ...formData, affectsInfonavit: e.target.checked })}
                    />
                    <div>
                      <div className="font-medium text-gray-900">Integra INFONAVIT</div>
                      <div className="text-sm text-gray-500">Base para aportaciones INFONAVIT</div>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Help Panel */}
            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  <span>Ayuda</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Conceptos Disponibles</h4>
                  <div className="space-y-1">
                    {availableConcepts.slice(0, 5).map(concept => (
                      <div key={concept} className="text-sm bg-gray-50 px-2 py-1 rounded font-mono">
                        {concept}
                      </div>
                    ))}
                    <div className="text-xs text-gray-500">+{availableConcepts.length - 5} más...</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Funciones Disponibles</h4>
                  <div className="space-y-1">
                    {formulaFunctions.slice(0, 4).map(func => (
                      <div key={func} className="text-sm bg-gray-50 px-2 py-1 rounded font-mono">
                        {func}
                      </div>
                    ))}
                    <div className="text-xs text-gray-500">+{formulaFunctions.length - 4} más...</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <h4 className="font-medium text-gray-900 mb-2">Ejemplos de Fórmulas</h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="font-mono bg-blue-50 p-2 rounded">SUELDO_BASE * 0.15</div>
                      <div className="text-gray-500 mt-1">15% del sueldo base</div>
                    </div>
                    <div>
                      <div className="font-mono bg-blue-50 p-2 rounded">IF(HORAS_EXTRA &gt; 0, HORAS_EXTRA * 50, 0)</div>
                      <div className="text-gray-500 mt-1">Pago de horas extra condicional</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border border-gray-100">
              <CardContent className="p-6 space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2"
                  disabled={!validation.isValid}
                >
                  <Save className="h-4 w-4" />
                  <span>Guardar Concepto</span>
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.back()}
                >
                  Cancelar
                </Button>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Zap className="h-4 w-4" />
                    <span>Los cambios se aplicarán en el próximo período de nómina</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}