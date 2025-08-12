import { CountryConfig } from '@/types'

export const COUNTRY_CONFIGS: Record<string, CountryConfig> = {
  BR: {
    code: 'BR',
    name: 'Brasil',
    currency: 'BRL',
    locale: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    taxSystem: {
      inss: {
        brackets: [
          { min: 0, max: 1412.00, rate: 0.075 },
          { min: 1412.01, max: 2666.68, rate: 0.09 },
          { min: 2666.69, max: 4000.03, rate: 0.12 },
          { min: 4000.04, max: 7786.02, rate: 0.14 }
        ],
        ceiling: 7786.02
      },
      irrf: {
        brackets: [
          { min: 0, max: 2259.20, rate: 0, deduction: 0 },
          { min: 2259.21, max: 2826.65, rate: 0.075, deduction: 169.44 },
          { min: 2826.66, max: 3751.05, rate: 0.15, deduction: 381.44 },
          { min: 3751.06, max: 4664.68, rate: 0.225, deduction: 662.77 },
          { min: 4664.69, max: Infinity, rate: 0.275, deduction: 896.00 }
        ],
        dependentDeduction: 189.59
      },
      fgts: 0.08
    },
    regulations: {
      decimoTerceiro: true,
      ferias: true,
      avisosPrevios: true,
      horasExtras: { rate: 1.5 }
    }
  },
  MX: {
    code: 'MX',
    name: 'México',
    currency: 'MXN',
    locale: 'es-MX',
    timezone: 'America/Mexico_City',
    taxSystem: {
      isr: {
        brackets: [
          { min: 0, max: 7735.00, rate: 0.0192, fixed: 0 },
          { min: 7735.01, max: 65651.07, rate: 0.064, fixed: 148.51 },
          { min: 65651.08, max: 115375.90, rate: 0.1088, fixed: 3855.14 },
          { min: 115375.91, max: 134119.41, rate: 0.16, fixed: 9265.20 },
          { min: 134119.42, max: 160577.65, rate: 0.1792, fixed: 12264.16 },
          { min: 160577.66, max: 323862.00, rate: 0.2136, fixed: 17005.47 },
          { min: 323862.01, max: 510451.00, rate: 0.2352, fixed: 39929.05 },
          { min: 510451.01, max: 974535.03, rate: 0.30, fixed: 73703.41 },
          { min: 974535.04, max: 1299380.04, rate: 0.32, fixed: 180050.48 },
          { min: 1299380.05, max: 3898140.12, rate: 0.34, fixed: 260850.81 },
          { min: 3898140.13, max: Infinity, rate: 0.35, fixed: 1143018.39 }
        ]
      },
      imss: {
        employeeRate: 0.0225,
        employerRate: 0.2040
      },
      infonavit: 0.05,
      ptu: 0.10
    },
    regulations: {
      aguinaldo: { minDays: 15 },
      vacaciones: { minDays: 12 },
      primaVacacional: 0.25
    }
  },
  AR: {
    code: 'AR',
    name: 'Argentina',
    currency: 'ARS',
    locale: 'es-AR',
    timezone: 'America/Buenos_Aires',
    taxSystem: {
      jubilacion: 0.11,
      obraSocial: 0.03,
      pami: 0.03,
      sindicato: 0.025,
      ganancias: {
        brackets: [
          { min: 0, max: 506830, rate: 0.05 },
          { min: 506831, max: 760245, rate: 0.09 },
          { min: 760246, max: 1013660, rate: 0.12 },
          { min: 1013661, max: 1267075, rate: 0.15 },
          { min: 1267076, max: 1520490, rate: 0.19 },
          { min: 1520491, max: 2280735, rate: 0.23 },
          { min: 2280736, max: 3040980, rate: 0.27 },
          { min: 3040981, max: 4561470, rate: 0.31 },
          { min: 4561471, max: Infinity, rate: 0.35 }
        ]
      }
    },
    regulations: {
      sac: true,
      vacaciones: { formula: 'days_worked / 20' },
      indemnizacion: true
    }
  }
}