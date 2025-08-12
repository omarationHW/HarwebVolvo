import { ComplianceRule, ComplianceCheck, ComplianceValidationResult, ComplianceCategory } from '@/types/compliance'

export class ComplianceService {
  // Reglas de cumplimiento por país
  private static rules: Record<string, ComplianceRule[]> = {
    MX: [
      {
        id: 'mx-isr-calculation',
        name: 'Cálculo correcto de ISR',
        description: 'Verificar que el ISR se calcule según las tablas vigentes',
        category: 'tax_compliance',
        country: 'MX',
        severity: 'critical',
        validationFunction: 'validateISRCalculation',
        isActive: true,
        lastUpdated: new Date()
      },
      {
        id: 'mx-imss-contribution',
        name: 'Contribuciones IMSS',
        description: 'Verificar contribuciones patronales y del trabajador al IMSS',
        category: 'social_security',
        country: 'MX',
        severity: 'critical',
        validationFunction: 'validateIMSSContribution',
        isActive: true,
        lastUpdated: new Date()
      },
      {
        id: 'mx-vacation-days',
        name: 'Días de vacaciones',
        description: 'Verificar que se otorguen al menos 6 días de vacaciones anuales',
        category: 'labor_laws',
        country: 'MX',
        severity: 'high',
        validationFunction: 'validateVacationDays',
        isActive: true,
        lastUpdated: new Date()
      },
      {
        id: 'mx-christmas-bonus',
        name: 'Aguinaldo navideño',
        description: 'Verificar pago de aguinaldo equivalente a 15 días de salario',
        category: 'labor_laws',
        country: 'MX',
        severity: 'critical',
        validationFunction: 'validateChristmasBonus',
        isActive: true,
        lastUpdated: new Date()
      }
    ],
    BR: [
      {
        id: 'br-irrf-calculation',
        name: 'Cálculo de IRRF',
        description: 'Verificar cálculo correcto del Imposto de Renda Retido na Fonte',
        category: 'tax_compliance',
        country: 'BR',
        severity: 'critical',
        validationFunction: 'validateIRRFCalculation',
        isActive: true,
        lastUpdated: new Date()
      },
      {
        id: 'br-thirteenth-salary',
        name: 'Décimo terceiro salário',
        description: 'Verificar pago del décimo tercer salario',
        category: 'labor_laws',
        country: 'BR',
        severity: 'critical',
        validationFunction: 'validateThirteenthSalary',
        isActive: true,
        lastUpdated: new Date()
      },
      {
        id: 'br-fgts-contribution',
        name: 'Contribución FGTS',
        description: 'Verificar contribución del 8% al FGTS',
        category: 'social_security',
        country: 'BR',
        severity: 'critical',
        validationFunction: 'validateFGTSContribution',
        isActive: true,
        lastUpdated: new Date()
      }
    ],
    US: [
      {
        id: 'us-federal-tax',
        name: 'Impuestos federales',
        description: 'Verificar retención de impuestos federales según IRS',
        category: 'tax_compliance',
        country: 'US',
        severity: 'critical',
        validationFunction: 'validateFederalTax',
        isActive: true,
        lastUpdated: new Date()
      },
      {
        id: 'us-overtime-pay',
        name: 'Pago de horas extra',
        description: 'Verificar pago de 1.5x por horas trabajadas sobre 40 semanales',
        category: 'labor_laws',
        country: 'US',
        severity: 'high',
        validationFunction: 'validateOvertimePay',
        isActive: true,
        lastUpdated: new Date()
      }
    ],
    AR: [
      {
        id: 'ar-ganancias-tax',
        name: 'Impuesto a las ganancias',
        description: 'Verificar cálculo del impuesto a las ganancias',
        category: 'tax_compliance',
        country: 'AR',
        severity: 'critical',
        validationFunction: 'validateGananciasTax',
        isActive: true,
        lastUpdated: new Date()
      },
      {
        id: 'ar-aguinaldo',
        name: 'Sueldo anual complementario',
        description: 'Verificar pago del aguinaldo en junio y diciembre',
        category: 'labor_laws',
        country: 'AR',
        severity: 'critical',
        validationFunction: 'validateAguinaldo',
        isActive: true,
        lastUpdated: new Date()
      }
    ]
  }

  static getRulesByCountry(country: string): ComplianceRule[] {
    return this.rules[country] || []
  }

  static getRulesByCategory(country: string, category: ComplianceCategory): ComplianceRule[] {
    return this.getRulesByCountry(country).filter(rule => rule.category === category)
  }

  static async validateEmployee(employeeData: any, country: string): Promise<ComplianceValidationResult> {
    const rules = this.getRulesByCountry(country)
    const issues: any[] = []
    const warnings: string[] = []
    let totalScore = 100
    let passedRules = 0

    for (const rule of rules) {
      try {
        const validationResult = await this.executeValidation(rule, employeeData)
        
        if (!validationResult.isValid) {
          const penalty = this.getSeverityPenalty(rule.severity)
          totalScore -= penalty
          
          issues.push({
            ruleId: rule.id,
            severity: rule.severity,
            message: validationResult.message,
            recommendation: validationResult.recommendation
          })
        } else {
          passedRules++
        }

        if (validationResult.warnings) {
          warnings.push(...validationResult.warnings)
        }
      } catch (error) {
        console.error(`Error validating rule ${rule.id}:`, error)
        warnings.push(`No se pudo validar la regla: ${rule.name}`)
      }
    }

    return {
      isCompliant: issues.length === 0,
      score: Math.max(0, totalScore),
      issues,
      warnings
    }
  }

  private static getSeverityPenalty(severity: string): number {
    switch (severity) {
      case 'critical': return 25
      case 'high': return 15
      case 'medium': return 10
      case 'low': return 5
      default: return 5
    }
  }

  private static async executeValidation(rule: ComplianceRule, data: any): Promise<{
    isValid: boolean
    message: string
    recommendation?: string
    warnings?: string[]
  }> {
    // Aquí implementaríamos las validaciones específicas
    switch (rule.validationFunction) {
      case 'validateISRCalculation':
        return this.validateISRCalculation(data)
      
      case 'validateIMSSContribution':
        return this.validateIMSSContribution(data)
      
      case 'validateVacationDays':
        return this.validateVacationDays(data)
      
      case 'validateChristmasBonus':
        return this.validateChristmasBonus(data)
      
      case 'validateIRRFCalculation':
        return this.validateIRRFCalculation(data)
      
      case 'validateThirteenthSalary':
        return this.validateThirteenthSalary(data)
      
      case 'validateFGTSContribution':
        return this.validateFGTSContribution(data)
      
      case 'validateFederalTax':
        return this.validateFederalTax(data)
      
      case 'validateOvertimePay':
        return this.validateOvertimePay(data)
      
      case 'validateGananciasTax':
        return this.validateGananciasTax(data)
      
      case 'validateAguinaldo':
        return this.validateAguinaldo(data)
      
      default:
        return {
          isValid: true,
          message: 'Validación no implementada',
          warnings: [`Función de validación ${rule.validationFunction} no está implementada`]
        }
    }
  }

  // Validaciones específicas por país
  private static validateISRCalculation(data: any) {
    // Simulación de validación de ISR para México
    const salary = data.salary || 0
    const expectedISR = this.calculateMexicanISR(salary)
    const actualISR = data.taxes?.isr || 0
    
    const tolerance = expectedISR * 0.05 // 5% de tolerancia
    const isValid = Math.abs(expectedISR - actualISR) <= tolerance

    return {
      isValid,
      message: isValid 
        ? 'Cálculo de ISR correcto' 
        : `ISR incorrecto. Esperado: $${expectedISR.toFixed(2)}, Actual: $${actualISR.toFixed(2)}`,
      recommendation: !isValid ? 'Revisar tabla de ISR vigente y recalcular' : undefined
    }
  }

  private static validateIMSSContribution(data: any) {
    const salary = data.salary || 0
    const expectedIMSS = salary * 0.0375 // 3.375% empleado
    const actualIMSS = data.socialSecurity?.imss || 0
    
    const isValid = Math.abs(expectedIMSS - actualIMSS) <= 10 // Tolerancia de $10

    return {
      isValid,
      message: isValid 
        ? 'Contribución IMSS correcta' 
        : `Contribución IMSS incorrecta. Esperado: $${expectedIMSS.toFixed(2)}`,
      recommendation: !isValid ? 'Verificar porcentaje de contribución IMSS (3.375% empleado)' : undefined
    }
  }

  private static validateVacationDays(data: any) {
    const hireDate = new Date(data.hireDate)
    const today = new Date()
    const yearsWorked = Math.floor((today.getTime() - hireDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    
    const minVacationDays = Math.max(6, 6 + Math.floor(yearsWorked / 2)) // Incrementa cada 2 años
    const actualVacationDays = data.benefits?.vacationDays || 0
    
    const isValid = actualVacationDays >= minVacationDays

    return {
      isValid,
      message: isValid 
        ? 'Días de vacaciones conforme a ley' 
        : `Días de vacaciones insuficientes. Mínimo: ${minVacationDays}, Actual: ${actualVacationDays}`,
      recommendation: !isValid ? 'Ajustar días de vacaciones según antigüedad del empleado' : undefined
    }
  }

  private static validateChristmasBonus(data: any) {
    const salary = data.salary || 0
    const expectedBonus = (salary * 15) / 365 // 15 días proporcionales
    const actualBonus = data.bonuses?.christmas || 0
    
    const isValid = actualBonus >= expectedBonus * 0.9 // 90% del esperado

    return {
      isValid,
      message: isValid 
        ? 'Aguinaldo conforme a ley' 
        : `Aguinaldo insuficiente. Esperado mínimo: $${expectedBonus.toFixed(2)}`,
      recommendation: !isValid ? 'Calcular aguinaldo como 15 días de salario' : undefined
    }
  }

  private static validateIRRFCalculation(data: any) {
    // Simulación para Brasil
    const salary = data.salary || 0
    const expectedIRRF = this.calculateBrazilianIRRF(salary)
    const actualIRRF = data.taxes?.irrf || 0
    
    const isValid = Math.abs(expectedIRRF - actualIRRF) <= expectedIRRF * 0.05

    return {
      isValid,
      message: isValid ? 'IRRF calculado correctamente' : 'IRRF no conforme',
      recommendation: !isValid ? 'Revisar tabla de IRRF vigente' : undefined
    }
  }

  private static validateThirteenthSalary(data: any) {
    const salary = data.salary || 0
    const expectedThirteenth = salary // Un salario completo
    const actualThirteenth = data.bonuses?.thirteenth || 0
    
    const isValid = actualThirteenth >= expectedThirteenth * 0.9

    return {
      isValid,
      message: isValid ? 'Décimo terceiro conforme' : 'Décimo terceiro insuficiente',
      recommendation: !isValid ? 'Pagar décimo terceiro equivalente a un salario' : undefined
    }
  }

  private static validateFGTSContribution(data: any) {
    const salary = data.salary || 0
    const expectedFGTS = salary * 0.08 // 8%
    const actualFGTS = data.socialSecurity?.fgts || 0
    
    const isValid = Math.abs(expectedFGTS - actualFGTS) <= 10

    return {
      isValid,
      message: isValid ? 'FGTS correto' : 'FGTS incorreto',
      recommendation: !isValid ? 'FGTS deve ser 8% do salário' : undefined
    }
  }

  private static validateFederalTax(data: any) {
    // Simulación para US
    return {
      isValid: true,
      message: 'Impuestos federales - validación pendiente',
      warnings: ['Validación de impuestos federales US en desarrollo']
    }
  }

  private static validateOvertimePay(data: any) {
    const regularHours = data.hours?.regular || 40
    const overtimeHours = data.hours?.overtime || 0
    const regularRate = data.hourlyRate || 0
    const overtimeRate = data.overtimeRate || 0
    
    const expectedOvertimeRate = regularRate * 1.5
    const isValid = overtimeHours === 0 || overtimeRate >= expectedOvertimeRate * 0.95

    return {
      isValid,
      message: isValid ? 'Pago de horas extra correcto' : 'Tasa de horas extra incorrecta',
      recommendation: !isValid ? 'Horas extra deben pagarse a 1.5x la tarifa regular' : undefined
    }
  }

  private static validateGananciasTax(data: any) {
    // Simulación para Argentina
    return {
      isValid: true,
      message: 'Impuesto a las ganancias - validación pendiente',
      warnings: ['Validación de ganancias Argentina en desarrollo']
    }
  }

  private static validateAguinaldo(data: any) {
    const salary = data.salary || 0
    const expectedAguinaldo = salary / 2 // Medio salario por semestre
    const actualAguinaldo = data.bonuses?.aguinaldo || 0
    
    const isValid = actualAguinaldo >= expectedAguinaldo * 0.9

    return {
      isValid,
      message: isValid ? 'Aguinaldo conforme' : 'Aguinaldo insuficiente',
      recommendation: !isValid ? 'Aguinaldo debe ser equivalente a medio salario por semestre' : undefined
    }
  }

  // Métodos auxiliares para cálculos
  private static calculateMexicanISR(monthlyIncome: number): number {
    // Tabla simplificada de ISR México 2024 (mensual)
    const brackets = [
      { min: 0, max: 644.58, rate: 0.0192, fixed: 0 },
      { min: 644.59, max: 5470.92, rate: 0.064, fixed: 12.38 },
      { min: 5470.93, max: 9614.66, rate: 0.1088, fixed: 321.26 },
      { min: 9614.67, max: 11176.62, rate: 0.16, fixed: 772.10 },
      { min: 11176.63, max: 13381.47, rate: 0.2136, fixed: 1022.01 },
      { min: 13381.48, max: 26988.50, rate: 0.2352, fixed: 1492.18 },
      { min: 26988.51, max: 42537.58, rate: 0.30, fixed: 4691.54 },
      { min: 42537.59, max: 81211.25, rate: 0.32, fixed: 9359.05 },
      { min: 81211.26, max: Infinity, rate: 0.34, fixed: 21734.94 }
    ]

    for (const bracket of brackets) {
      if (monthlyIncome >= bracket.min && monthlyIncome <= bracket.max) {
        return bracket.fixed + (monthlyIncome - bracket.min) * bracket.rate
      }
    }
    return 0
  }

  private static calculateBrazilianIRRF(monthlyIncome: number): number {
    // Tabla simplificada de IRRF Brasil 2024 (mensual)
    if (monthlyIncome <= 1903.98) return 0
    if (monthlyIncome <= 2826.65) return monthlyIncome * 0.075 - 142.80
    if (monthlyIncome <= 3751.05) return monthlyIncome * 0.15 - 354.80
    if (monthlyIncome <= 4664.68) return monthlyIncome * 0.225 - 636.13
    return monthlyIncome * 0.275 - 869.36
  }
}