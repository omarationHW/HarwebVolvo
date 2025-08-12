'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  RefreshCw
} from 'lucide-react'
import { ComplianceMetrics, ComplianceValidationResult } from '@/types/compliance'

interface ComplianceDashboardProps {
  country?: string
  organizationId?: string
}

export function ComplianceDashboard({ country = 'MX', organizationId }: ComplianceDashboardProps) {
  const [metrics, setMetrics] = useState<ComplianceMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastValidation, setLastValidation] = useState<ComplianceValidationResult | null>(null)

  useEffect(() => {
    loadComplianceData()
  }, [country, organizationId])

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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos de cumplimiento...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-6 shadow-2xl mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-700 bg-clip-text text-transparent">
              Dashboard de Cumplimiento
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mt-1 font-medium">
              País: {country} • Última actualización: {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={runValidation}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Shield className="h-4 w-4 mr-2" />
              )}
              Ejecutar Validación
            </Button>
            <Button variant="outline" className="bg-white/10 backdrop-blur-sm border-white/20 text-gray-800 hover:bg-white/20 transition-all duration-200">
              <FileText className="h-4 w-4 mr-2" />
              Generar Reporte
            </Button>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Puntuación General</p>
                <p className={`text-2xl sm:text-3xl font-bold ${getScoreColor(metrics?.overallScore || 0)}`}>
                  {metrics?.overallScore || 0}%
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Problemas Críticos</p>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">
                  {metrics?.criticalIssues || 0}
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-lg">
                <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Acciones Pendientes</p>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                  {metrics?.pendingActions || 0}
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl shadow-lg">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Estado General</p>
                <p className="text-lg sm:text-xl font-semibold text-green-600">
                  {(metrics?.overallScore || 0) >= 85 ? 'Conforme' : 'Requiere Atención'}
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-lg">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Puntuación por categoría */}
      <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl text-gray-800">Puntuación por Categoría</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {metrics?.categoryScores && Object.entries(metrics.categoryScores).map(([category, score]) => (
            <div key={category} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm font-medium text-gray-800 capitalize">
                  {category.replace('_', ' ')}
                </span>
                <span className={`text-sm font-semibold ${getScoreColor(score)}`}>
                  {score}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    score >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                    score >= 80 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    score >= 70 ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-red-500 to-pink-600'
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Últimos problemas encontrados */}
      {lastValidation?.issues && lastValidation.issues.length > 0 && (
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl flex items-center gap-2 text-gray-800">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Problemas Detectados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {lastValidation.issues.map((issue, index) => (
              <div key={index} className="p-3 sm:p-4 bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <h4 className="font-medium text-gray-800">{issue.message}</h4>
                  <Badge className={`text-xs ${getSeverityColor(issue.severity)} self-start sm:self-center`}>
                    {issue.severity}
                  </Badge>
                </div>
                {issue.recommendation && (
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Recomendación:</strong> {issue.recommendation}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Advertencias */}
      {lastValidation?.warnings && lastValidation.warnings.length > 0 && (
        <Card className="bg-white/10 backdrop-blur-lg border border-yellow-300/50 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl text-gray-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Advertencias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lastValidation.warnings.map((warning, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                  {warning}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}