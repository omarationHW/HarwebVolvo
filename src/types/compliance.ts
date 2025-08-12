export interface ComplianceRule {
  id: string
  name: string
  description: string
  category: ComplianceCategory
  country: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  validationFunction: string
  isActive: boolean
  lastUpdated: Date
}

export interface ComplianceCheck {
  id: string
  ruleId: string
  entityType: 'employee' | 'workorder' | 'organization' | 'employer'
  entityId: string
  status: ComplianceStatus
  message: string
  checkedAt: Date
  resolvedAt?: Date
  assignedTo?: string
}

export interface ComplianceReport {
  id: string
  title: string
  period: {
    startDate: Date
    endDate: Date
  }
  country: string
  organizationId?: string
  employerId?: string
  summary: {
    totalChecks: number
    passed: number
    failed: number
    pending: number
    criticalIssues: number
  }
  checks: ComplianceCheck[]
  generatedAt: Date
  generatedBy: string
}

export type ComplianceStatus = 'compliant' | 'non_compliant' | 'pending' | 'exempt'

export type ComplianceCategory = 
  | 'tax_compliance'
  | 'labor_laws'
  | 'social_security'
  | 'data_protection'
  | 'payroll_regulations'
  | 'documentation'
  | 'financial_reporting'

export interface ComplianceMetrics {
  overallScore: number
  categoryScores: Record<ComplianceCategory, number>
  trendsData: {
    date: string
    score: number
  }[]
  criticalIssues: number
  pendingActions: number
}

export interface ComplianceValidationResult {
  isCompliant: boolean
  score: number
  issues: {
    ruleId: string
    severity: string
    message: string
    recommendation?: string
  }[]
  warnings: string[]
}