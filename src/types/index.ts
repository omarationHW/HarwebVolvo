// Types for the Harweb DBO System

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  organizationId?: string
  workOrderId?: string
}

export interface WorkOrderConfig {
  taxRates: {
    inss?: number
    irrf?: number
    fgts?: number
    isr?: number
    imss?: number
    infonavit?: number
    jubilacion?: number
    obraSocial?: number
  }
  benefits: {
    mealVoucher?: number
    transport?: number
    healthInsurance?: number
  }
  workingDays: number
  currency: string
  locale: string
  timezone: string
}

export interface PayrollCalculation {
  grossSalary: number
  inss: number
  irrf: number
  fgts: number
  otherTaxes: number
  totalTaxes: number
  benefits: number
  deductions: number
  netSalary: number
  details: Record<string, any>
}

export interface CountryConfig {
  code: string
  name: string
  currency: string
  locale: string
  timezone: string
  taxSystem: Record<string, any>
  regulations: Record<string, any>
}