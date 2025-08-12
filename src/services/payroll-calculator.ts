import { PayrollCalculation } from '@/types'
import { COUNTRY_CONFIGS } from '@/config/countries'
import { Decimal } from '@prisma/client/runtime/library'

export class PayrollCalculator {
  private country: string
  private config: any

  constructor(country: string) {
    this.country = country
    this.config = COUNTRY_CONFIGS[country]
    if (!this.config) {
      throw new Error(`Country ${country} not supported`)
    }
  }

  calculate(
    grossSalary: number,
    options: {
      dependents?: number
      otherDeductions?: number
      benefits?: number
    } = {}
  ): PayrollCalculation {
    switch (this.country) {
      case 'BR':
        return this.calculateBrazil(grossSalary, options)
      case 'MX':
        return this.calculateMexico(grossSalary, options)
      case 'AR':
        return this.calculateArgentina(grossSalary, options)
      default:
        throw new Error(`Calculator not implemented for ${this.country}`)
    }
  }

  private calculateBrazil(
    grossSalary: number,
    options: any
  ): PayrollCalculation {
    const taxSystem = this.config.taxSystem

    // Calculate INSS
    let inss = 0
    let remainingSalary = grossSalary
    for (const bracket of taxSystem.inss.brackets) {
      if (remainingSalary <= 0) break
      const taxableAmount = Math.min(
        remainingSalary,
        bracket.max - bracket.min
      )
      inss += taxableAmount * bracket.rate
      remainingSalary -= taxableAmount
    }
    inss = Math.min(inss, taxSystem.inss.ceiling * 0.14)

    // Calculate FGTS
    const fgts = grossSalary * taxSystem.fgts

    // Calculate IRRF
    const irrfBase = grossSalary - inss - (options.dependents || 0) * taxSystem.irrf.dependentDeduction
    let irrf = 0
    for (const bracket of taxSystem.irrf.brackets) {
      if (irrfBase >= bracket.min && irrfBase <= bracket.max) {
        irrf = irrfBase * bracket.rate - bracket.deduction
        break
      }
    }

    const totalTaxes = inss + irrf
    const benefits = options.benefits || 0
    const deductions = options.otherDeductions || 0
    const netSalary = grossSalary - totalTaxes - deductions + benefits

    return {
      grossSalary,
      inss,
      irrf,
      fgts,
      otherTaxes: 0,
      totalTaxes,
      benefits,
      deductions,
      netSalary,
      details: {
        country: 'BR',
        currency: 'BRL',
        dependents: options.dependents || 0
      }
    }
  }

  private calculateMexico(
    grossSalary: number,
    options: any
  ): PayrollCalculation {
    const taxSystem = this.config.taxSystem

    // Calculate ISR (monthly)
    let isr = 0
    for (const bracket of taxSystem.isr.brackets) {
      if (grossSalary >= bracket.min && grossSalary <= bracket.max) {
        isr = (grossSalary - bracket.min) * bracket.rate + bracket.fixed
        break
      }
    }

    // Calculate IMSS
    const imss = grossSalary * taxSystem.imss.employeeRate

    // Calculate Infonavit
    const infonavit = grossSalary * taxSystem.infonavit

    const totalTaxes = isr + imss + infonavit
    const benefits = options.benefits || 0
    const deductions = options.otherDeductions || 0
    const netSalary = grossSalary - totalTaxes - deductions + benefits

    return {
      grossSalary,
      inss: imss,
      irrf: isr,
      fgts: infonavit,
      otherTaxes: 0,
      totalTaxes,
      benefits,
      deductions,
      netSalary,
      details: {
        country: 'MX',
        currency: 'MXN',
        imss,
        infonavit
      }
    }
  }

  private calculateArgentina(
    grossSalary: number,
    options: any
  ): PayrollCalculation {
    const taxSystem = this.config.taxSystem

    // Calculate social security contributions
    const jubilacion = grossSalary * taxSystem.jubilacion
    const obraSocial = grossSalary * taxSystem.obraSocial
    const pami = grossSalary * taxSystem.pami
    const sindicato = grossSalary * taxSystem.sindicato

    // Calculate income tax (ganancias)
    let ganancias = 0
    const annualSalary = grossSalary * 13 // Include SAC
    for (const bracket of taxSystem.ganancias.brackets) {
      if (annualSalary >= bracket.min && annualSalary <= bracket.max) {
        ganancias = ((annualSalary - bracket.min) * bracket.rate) / 13
        break
      }
    }

    const totalTaxes = jubilacion + obraSocial + pami + sindicato + ganancias
    const benefits = options.benefits || 0
    const deductions = options.otherDeductions || 0
    const netSalary = grossSalary - totalTaxes - deductions + benefits

    return {
      grossSalary,
      inss: jubilacion + obraSocial + pami,
      irrf: ganancias,
      fgts: 0,
      otherTaxes: sindicato,
      totalTaxes,
      benefits,
      deductions,
      netSalary,
      details: {
        country: 'AR',
        currency: 'ARS',
        jubilacion,
        obraSocial,
        pami,
        sindicato
      }
    }
  }
}