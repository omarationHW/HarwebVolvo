'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  TrendingUp,
  FileText,
  Settings,
  RefreshCw,
  Plus
} from 'lucide-react'

interface ComplianceMetrics {
  overallScore: number
  categoryScores: {
    tax_compliance: number
    labor_laws: number
    social_security: number
    data_protection: number
    payroll_regulations: number
    documentation: number
    financial_reporting: number
  }
  trendsData: Array<{ date: string; score: number }>
  criticalIssues: number
  pendingActions: number
}

interface ComplianceValidationResult {
  isCompliant: boolean
  score: number
  issues: Array<{
    ruleId: string
    severity: 'critical' | 'high' | 'medium' | 'low'
    message: string
    recommendation: string
  }>
  warnings: string[]
}

export default function CompliancePage() {
  const [metrics, setMetrics] = useState<ComplianceMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastValidation, setLastValidation] = useState<ComplianceValidationResult | null>(null)

  useEffect(() => {
    loadComplianceData()
  }, [])

  const loadComplianceData = async () => {
    setIsLoading(true)
    try {
      // Simular datos de cumplimiento
      const mockMetrics: ComplianceMetrics = {
        overallScore: 87,
        categoryScores: {
          tax_compliance: 92,
          labor_laws: 85,
          social_security: 88,
          data_protection: 90,
          payroll_regulations: 82,
          documentation: 85,
          financial_reporting: 89
        },
        trendsData: [
          { date: '2024-01', score: 82 },
          { date: '2024-02', score: 84 },
          { date: '2024-03', score: 87 }
        ],
        criticalIssues: 2,
        pendingActions: 5
      }
      
      setMetrics(mockMetrics)
    } catch (error) {
      console.error('Error loading compliance data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const runValidation = async () => {
    setIsLoading(true)
    try {
      // Simular validación
      const mockValidation: ComplianceValidationResult = {
        isCompliant: false,
        score: 87,
        issues: [
          {
            ruleId: 'mx-isr-calculation',
            severity: 'high',
            message: 'Discrepancia en cálculo de ISR para 3 empleados',
            recommendation: 'Revisar tabla de ISR vigente y recalcular'
          },
          {
            ruleId: 'mx-vacation-days',
            severity: 'medium',
            message: 'Un empleado con días de vacaciones por debajo del mínimo legal',
            recommendation: 'Ajustar días de vacaciones según antigüedad'
          }
        ],
        warnings: [
          'Algunos registros no tienen toda la información necesaria para validación completa'
        ]
      }
      
      setLastValidation(mockValidation)
      await loadComplianceData()
    } catch (error) {
      console.error('Error running validation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    if (score >= 70) return 'text-orange-600'
    return 'text-red-600'
  }

  if (isLoading && !metrics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando datos de cumplimiento...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Puntuación General</p>
                <p className={`text-2xl font-bold ${getScoreColor(metrics?.overallScore || 0)}`}>
                  {metrics?.overallScore || 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Problemas Críticos</p>
                <p className="text-2xl font-bold text-red-600">
                  {metrics?.criticalIssues || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Acciones Pendientes</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {metrics?.pendingActions || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-slate-600">Estado General</p>
                <p className="text-2xl font-bold text-green-600">
                  {(metrics?.overallScore || 0) >= 85 ? 'Conforme' : 'Requiere Atención'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Button
              onClick={runValidation}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Shield className="h-4 w-4" />
              )}
              <span>Ejecutar Validación</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Generar Reporte</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nueva Regla</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Scores */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Puntuación por Categoría</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {metrics?.categoryScores && Object.entries(metrics.categoryScores).map(([category, score]) => (
                <div key={category} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-sm font-medium text-slate-900 capitalize">
                      {category.replace('_', ' ')}
                    </span>
                    <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
                      {score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        score >= 90 ? 'bg-green-500' :
                        score >= 80 ? 'bg-yellow-500' :
                        score >= 70 ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Latest Issues */}
          {lastValidation?.issues && lastValidation.issues.length > 0 && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Problemas Detectados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lastValidation.issues.map((issue, index) => (
                  <div key={index} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex flex-col gap-2 mb-2">
                      <h4 className="font-medium text-slate-900">{issue.message}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full self-start ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                    </div>
                    {issue.recommendation && (
                      <p className="text-sm text-slate-600 mt-2">
                        <strong>Recomendación:</strong> {issue.recommendation}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Warnings */}
          {lastValidation?.warnings && lastValidation.warnings.length > 0 && (
            <Card className="border-0 shadow-sm bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-slate-900 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Advertencias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lastValidation.warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                      {warning}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}