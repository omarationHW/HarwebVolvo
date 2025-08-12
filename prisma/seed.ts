import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')

  // 1. Crear configuraciones de países
  console.log('📍 Creando configuraciones de países...')
  
  const mexicoConfig = await prisma.countryConfiguration.upsert({
    where: { country: 'MX' },
    update: {},
    create: {
      country: 'MX',
      name: 'México',
      currency: 'MXN',
      locale: 'es-MX',
      timezone: 'America/Mexico_City',
      minimumWage: 207.44,
      workingHours: 48,
      taxSystem: {
        isr: { rates: [1.92, 6.4, 10.88, 16, 21.36, 23.52, 30, 32, 34, 35] },
        imss: { employee: 0.0375, employer: 0.1775 },
        infonavit: 0.05
      },
      laborLaws: {
        vacationDays: 6,
        christmasBonus: 15,
        overtime: 2.0
      },
      holidayCalendar: {
        "2024": ["2024-01-01", "2024-02-05", "2024-03-21", "2024-05-01", "2024-09-16", "2024-11-20", "2024-12-25"]
      },
      overtimeRules: {
        weeklyLimit: 9,
        dailyLimit: 3,
        multiplier: 2.0
      },
      socialSecurity: {
        imss: true,
        infonavit: true,
        afore: true
      }
    }
  })

  const brazilConfig = await prisma.countryConfiguration.upsert({
    where: { country: 'BR' },
    update: {},
    create: {
      country: 'BR',
      name: 'Brasil',
      currency: 'BRL',
      locale: 'pt-BR',
      timezone: 'America/Sao_Paulo',
      minimumWage: 1320.00,
      workingHours: 44,
      taxSystem: {
        irrf: { rates: [0, 7.5, 15, 22.5, 27.5] },
        inss: { employee: 0.11, employer: 0.20 },
        fgts: 0.08
      },
      laborLaws: {
        vacationDays: 30,
        thirteenthSalary: true,
        overtime: 1.5
      },
      holidayCalendar: {
        "2024": ["2024-01-01", "2024-04-21", "2024-05-01", "2024-09-07", "2024-10-12", "2024-11-02", "2024-11-15", "2024-12-25"]
      },
      overtimeRules: {
        weeklyLimit: 10,
        dailyLimit: 2,
        multiplier: 1.5
      },
      socialSecurity: {
        inss: true,
        fgts: true,
        pis: true
      }
    }
  })

  const argentiniaConfig = await prisma.countryConfiguration.upsert({
    where: { country: 'AR' },
    update: {},
    create: {
      country: 'AR',
      name: 'Argentina',
      currency: 'ARS',
      locale: 'es-AR',
      timezone: 'America/Buenos_Aires',
      minimumWage: 202800.00,
      workingHours: 48,
      taxSystem: {
        ganancias: { rates: [5, 9, 12, 15, 19, 23, 27, 31, 35] },
        jubilacion: { employee: 0.11, employer: 0.1062 },
        obra_social: { employee: 0.03, employer: 0.06 }
      },
      laborLaws: {
        vacationDays: 14,
        aguinaldo: true,
        overtime: 1.5
      },
      holidayCalendar: {
        "2024": ["2024-01-01", "2024-03-24", "2024-03-29", "2024-05-01", "2024-05-25", "2024-06-20", "2024-07-09", "2024-08-17", "2024-12-25"]
      },
      overtimeRules: {
        weeklyLimit: 12,
        dailyLimit: 3,
        multiplier: 1.5
      },
      socialSecurity: {
        anses: true,
        obra_social: true
      }
    }
  })

  const colombiaConfig = await prisma.countryConfiguration.upsert({
    where: { country: 'CO' },
    update: {},
    create: {
      country: 'CO',
      name: 'Colombia',
      currency: 'COP',
      locale: 'es-CO',
      timezone: 'America/Bogota',
      minimumWage: 1300000.00,
      workingHours: 48,
      taxSystem: {
        renta: { rates: [0, 19, 28, 33, 35, 37, 39] },
        salud: { employee: 0.04, employer: 0.085 },
        pension: { employee: 0.04, employer: 0.12 }
      },
      laborLaws: {
        vacationDays: 15,
        prima: true,
        cesantias: true,
        overtime: 1.25
      },
      holidayCalendar: {
        "2024": ["2024-01-01", "2024-01-08", "2024-03-25", "2024-05-01", "2024-05-13", "2024-06-03", "2024-06-10", "2024-07-01", "2024-07-20", "2024-08-07", "2024-08-19", "2024-10-14", "2024-11-04", "2024-11-11", "2024-12-08", "2024-12-25"]
      },
      overtimeRules: {
        weeklyLimit: 12,
        dailyLimit: 4,
        multiplier: 1.25
      },
      socialSecurity: {
        eps: true,
        afp: true,
        arl: true
      }
    }
  })

  const chileConfig = await prisma.countryConfiguration.upsert({
    where: { country: 'CL' },
    update: {},
    create: {
      country: 'CL',
      name: 'Chile',
      currency: 'CLP',
      locale: 'es-CL',
      timezone: 'America/Santiago',
      minimumWage: 460000.00,
      workingHours: 45,
      taxSystem: {
        impuesto_unico: { rates: [0, 4, 8, 13.5, 23, 30.4, 35.5, 40] },
        prevision: { employee: 0.1, employer: 0 },
        salud: { employee: 0.07, employer: 0 }
      },
      laborLaws: {
        vacationDays: 15,
        gratificacion: true,
        overtime: 1.5
      },
      holidayCalendar: {
        "2024": ["2024-01-01", "2024-03-29", "2024-03-30", "2024-05-01", "2024-05-21", "2024-06-07", "2024-06-29", "2024-07-16", "2024-08-15", "2024-09-18", "2024-09-19", "2024-10-12", "2024-11-01", "2024-12-08", "2024-12-25"]
      },
      overtimeRules: {
        weeklyLimit: 12,
        dailyLimit: 2,
        multiplier: 1.5
      },
      socialSecurity: {
        afp: true,
        isapre: true
      }
    }
  })

  const usaConfig = await prisma.countryConfiguration.upsert({
    where: { country: 'US' },
    update: {},
    create: {
      country: 'US',
      name: 'Estados Unidos',
      currency: 'USD',
      locale: 'en-US',
      timezone: 'America/New_York',
      minimumWage: 7.25,
      workingHours: 40,
      taxSystem: {
        federal: { rates: [10, 12, 22, 24, 32, 35, 37] },
        fica: { employee: 0.0765, employer: 0.0765 },
        medicare: { employee: 0.0145, employer: 0.0145 }
      },
      laborLaws: {
        vacationDays: 10,
        sickLeave: 5,
        overtime: 1.5
      },
      holidayCalendar: {
        "2024": ["2024-01-01", "2024-01-15", "2024-02-19", "2024-05-27", "2024-06-19", "2024-07-04", "2024-09-02", "2024-10-14", "2024-11-11", "2024-11-28", "2024-12-25"]
      },
      overtimeRules: {
        weeklyLimit: 40,
        dailyLimit: 8,
        multiplier: 1.5
      },
      socialSecurity: {
        social_security: true,
        medicare: true,
        unemployment: true
      }
    }
  })

  const canadaConfig = await prisma.countryConfiguration.upsert({
    where: { country: 'CA' },
    update: {},
    create: {
      country: 'CA',
      name: 'Canadá',
      currency: 'CAD',
      locale: 'en-CA',
      timezone: 'America/Toronto',
      minimumWage: 17.20,
      workingHours: 40,
      taxSystem: {
        federal: { rates: [15, 20.5, 26, 29, 33] },
        cpp: { employee: 0.0595, employer: 0.0595 },
        ei: { employee: 0.0163, employer: 0.0228 }
      },
      laborLaws: {
        vacationDays: 10,
        sickLeave: 3,
        overtime: 1.5
      },
      holidayCalendar: {
        "2024": ["2024-01-01", "2024-02-19", "2024-03-29", "2024-05-20", "2024-07-01", "2024-08-05", "2024-09-02", "2024-09-30", "2024-10-14", "2024-11-11", "2024-12-25", "2024-12-26"]
      },
      overtimeRules: {
        weeklyLimit: 44,
        dailyLimit: 8,
        multiplier: 1.5
      },
      socialSecurity: {
        cpp: true,
        ei: true,
        health: true
      }
    }
  })

  const peruConfig = await prisma.countryConfiguration.upsert({
    where: { country: 'PE' },
    update: {},
    create: {
      country: 'PE',
      name: 'Perú',
      currency: 'PEN',
      locale: 'es-PE',
      timezone: 'America/Lima',
      minimumWage: 1025.00,
      workingHours: 48,
      taxSystem: {
        renta: { rates: [8, 14, 17, 20, 30] },
        essalud: { employee: 0, employer: 0.09 },
        sctr: { employee: 0, employer: 0.012 }
      },
      laborLaws: {
        vacationDays: 25,
        gratificacion: true,
        cts: true,
        overtime: 1.25
      },
      holidayCalendar: {
        "2024": ["2024-01-01", "2024-03-28", "2024-03-29", "2024-05-01", "2024-06-07", "2024-06-29", "2024-07-23", "2024-07-28", "2024-07-29", "2024-08-30", "2024-10-08", "2024-11-01", "2024-12-08", "2024-12-09", "2024-12-25"]
      },
      overtimeRules: {
        weeklyLimit: 8,
        dailyLimit: 3,
        multiplier: 1.25
      },
      socialSecurity: {
        essalud: true,
        onp_spp: true,
        sctr: true
      }
    }
  })

  // 2. Crear organizaciones
  console.log('🏢 Creando organizaciones...')
  
  const panxeaOrg = await prisma.organization.create({
    data: {
      name: 'Panxea Corporation',
      code: 'PANXEA',
      type: 'CORPORATION',
      countryId: mexicoConfig.id,
      taxId: 'RFC123456789',
      address: {
        street: 'Av. Revolución 1500',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '01020',
        country: 'México'
      },
      configuration: {
        fiscalYear: 'calendar',
        payrollFrequency: 'biweekly',
        benefits: {
          healthInsurance: true,
          lifeInsurance: true,
          voucherRestaurant: 200
        }
      }
    }
  })

  const techStartOrg = await prisma.organization.create({
    data: {
      name: 'TechStart Solutions',
      code: 'TECHSTART',
      type: 'STARTUP',
      countryId: mexicoConfig.id,
      taxId: 'RFC987654321',
      address: {
        street: 'Polanco Business Center',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '11560',
        country: 'México'  
      },
      configuration: {
        fiscalYear: 'calendar',
        payrollFrequency: 'monthly',
        benefits: {
          healthInsurance: true,
          stockOptions: true
        }
      }
    }
  })

  const globalCorpBr = await prisma.organization.create({
    data: {
      name: 'GlobalCorp Brasil',
      code: 'GLOBAL_BR',
      type: 'CORPORATION',
      countryId: brazilConfig.id,
      taxId: 'CNPJ12345678000195',
      address: {
        street: 'Av. Paulista, 1000',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100',
        country: 'Brasil'
      },
      configuration: {
        fiscalYear: 'calendar',
        payrollFrequency: 'monthly',
        benefits: {
          healthInsurance: true,
          dentalInsurance: true,
          valeRefeicao: 30,
          valeTransporte: 220
        }
      }
    }
  })

  // Organizaciones para Estados Unidos
  const techCorpUSA = await prisma.organization.create({
    data: {
      name: 'TechCorp USA',
      code: 'TECHCORP_US',
      type: 'CORPORATION',
      countryId: usaConfig.id,
      taxId: 'EIN12-3456789',
      address: {
        street: '123 Tech Street',
        city: 'Austin',
        state: 'TX',
        zipCode: '78701',
        country: 'United States'
      },
      configuration: {
        fiscalYear: 'calendar',
        payrollFrequency: 'biweekly',
        benefits: {
          healthInsurance: true,
          dentalInsurance: true,
          visionInsurance: true,
          retirement401k: true
        }
      }
    }
  })

  // Organizaciones para Canadá
  const greenTechCanada = await prisma.organization.create({
    data: {
      name: 'GreenTech Canada',
      code: 'GREENTECH_CA',
      type: 'CORPORATION',
      countryId: canadaConfig.id,
      taxId: 'BN123456789RT0001',
      address: {
        street: '456 Maple Avenue',
        city: 'Toronto',
        state: 'ON',
        zipCode: 'M5V 3A8',
        country: 'Canada'
      },
      configuration: {
        fiscalYear: 'calendar',
        payrollFrequency: 'biweekly',
        benefits: {
          healthInsurance: true,
          dentalInsurance: true,
          rrsp: true,
          extendedHealth: true
        }
      }
    }
  })

  // Organizaciones para Argentina
  const consultingArgentina = await prisma.organization.create({
    data: {
      name: 'Consulting Argentina',
      code: 'CONSULT_AR',
      type: 'CORPORATION',
      countryId: argentiniaConfig.id,
      taxId: 'CUIT30-12345678-9',
      address: {
        street: 'Av. Corrientes 1500',
        city: 'Buenos Aires',
        state: 'CABA',
        zipCode: 'C1042AAO',
        country: 'Argentina'
      },
      configuration: {
        fiscalYear: 'calendar',
        payrollFrequency: 'monthly',
        benefits: {
          obraSocial: true,
          valesAlimentarios: 15000,
          adicionalPorHijo: true
        }
      }
    }
  })

  // Organizaciones para Colombia
  const finTechColombia = await prisma.organization.create({
    data: {
      name: 'FinTech Colombia',
      code: 'FINTECH_CO',
      type: 'STARTUP',
      countryId: colombiaConfig.id,
      taxId: 'NIT123456789-1',
      address: {
        street: 'Carrera 7 # 123-45',
        city: 'Bogotá',
        state: 'DC',
        zipCode: '110111',
        country: 'Colombia'
      },
      configuration: {
        fiscalYear: 'calendar',
        payrollFrequency: 'monthly',
        benefits: {
          eps: true,
          afp: true,
          auxilioTransporte: true,
          primaServicios: true
        }
      }
    }
  })

  // Organizaciones para Chile
  const miningTechChile = await prisma.organization.create({
    data: {
      name: 'MiningTech Chile',
      code: 'MINING_CL',
      type: 'CORPORATION',
      countryId: chileConfig.id,
      taxId: 'RUT12.345.678-9',
      address: {
        street: 'Av. Providencia 1500',
        city: 'Santiago',
        state: 'RM',
        zipCode: '7500000',
        country: 'Chile'
      },
      configuration: {
        fiscalYear: 'calendar',
        payrollFrequency: 'monthly',
        benefits: {
          isapre: true,
          afp: true,
          bonoColacion: 25000,
          bonoMovilizacion: 30000
        }
      }
    }
  })

  // Organizaciones para Perú
  const eCommercePeru = await prisma.organization.create({
    data: {
      name: 'E-Commerce Perú',
      code: 'ECOMM_PE',
      type: 'CORPORATION',
      countryId: peruConfig.id,
      taxId: 'RUC12345678901',
      address: {
        street: 'Av. Javier Prado Este 1500',
        city: 'Lima',
        state: 'Lima',
        zipCode: '15036',
        country: 'Perú'
      },
      configuration: {
        fiscalYear: 'calendar',
        payrollFrequency: 'monthly',
        benefits: {
          essalud: true,
          gratificacion: true,
          cts: true,
          asignacionFamiliar: true
        }
      }
    }
  })

  // 3. Crear empleadores
  console.log('👥 Creando empleadores...')
  
  const panxeaMx = await prisma.employer.create({
    data: {
      name: 'Panxea México',
      code: 'PANXEA_MX',
      organizationId: panxeaOrg.id,
      legalName: 'Panxea México S.A. de C.V.',
      taxId: 'RFC123456789MX',
      configuration: {
        payrollSettings: {
          payDates: [15, 30],
          currency: 'MXN',
          roundingRules: 'round_to_peso'
        },
        benefits: {
          voucherRestaurant: 250,
          transportAllowance: 150,
          performanceBonus: true
        }
      }
    }
  })

  const panxeaServices = await prisma.employer.create({
    data: {
      name: 'Panxea Services',
      code: 'PANXEA_SVC',
      organizationId: panxeaOrg.id,
      legalName: 'Panxea Services S.A. de C.V.',
      taxId: 'RFC123456789SVC',
      configuration: {
        payrollSettings: {
          payDates: [15, 30],
          currency: 'MXN',
          roundingRules: 'round_to_peso'
        },
        benefits: {
          voucherRestaurant: 200,
          remoteWorkAllowance: 300
        }
      }
    }
  })

  const techStartMain = await prisma.employer.create({
    data: {
      name: 'TechStart Principal',
      code: 'TECH_MAIN',
      organizationId: techStartOrg.id,
      legalName: 'TechStart Solutions S.A.P.I. de C.V.',
      taxId: 'RFC987654321TECH',
      configuration: {
        payrollSettings: {
          payDates: [30],
          currency: 'MXN',
          roundingRules: 'round_to_peso'
        },
        benefits: {
          stockOptions: true,
          equipmentAllowance: 500,
          learningBudget: 1000
        }
      }
    }
  })

  const globalBrMain = await prisma.employer.create({
    data: {
      name: 'GlobalCorp Brasil Matriz',
      code: 'GLOBAL_MAIN',
      organizationId: globalCorpBr.id,
      legalName: 'GlobalCorp Brasil Ltda.',
      taxId: 'CNPJ12345678000195',
      configuration: {
        payrollSettings: {
          payDates: [5],
          currency: 'BRL',
          roundingRules: 'round_to_centavo'
        },
        benefits: {
          valeRefeicao: 35,
          valeTransporte: 250,
          planoSaude: true,
          planoOdontologico: true
        }
      }
    }
  })

  // Empleadores para Estados Unidos
  const techCorpAustin = await prisma.employer.create({
    data: {
      name: 'TechCorp Austin',
      code: 'TECH_AUSTIN',
      organizationId: techCorpUSA.id,
      legalName: 'TechCorp USA Inc.',
      taxId: 'EIN12-3456789',
      configuration: {
        payrollSettings: {
          payDates: [15, 30],
          currency: 'USD',
          roundingRules: 'round_to_cent'
        },
        benefits: {
          healthInsurance: true,
          dentalInsurance: true,
          retirement401k: 0.06,
          paidTimeOff: 15
        }
      }
    }
  })

  // Empleadores para Canadá
  const greenTechToronto = await prisma.employer.create({
    data: {
      name: 'GreenTech Toronto',
      code: 'GREEN_TOR',
      organizationId: greenTechCanada.id,
      legalName: 'GreenTech Canada Corp.',
      taxId: 'BN123456789RT0001',
      configuration: {
        payrollSettings: {
          payDates: [15, 30],
          currency: 'CAD',
          roundingRules: 'round_to_cent'
        },
        benefits: {
          healthInsurance: true,
          dentalInsurance: true,
          rrsp: 0.05,
          vacationDays: 15
        }
      }
    }
  })

  // Empleadores para Argentina
  const consultingBuenosAires = await prisma.employer.create({
    data: {
      name: 'Consulting Buenos Aires',
      code: 'CONSULT_BA',
      organizationId: consultingArgentina.id,
      legalName: 'Consulting Argentina S.A.',
      taxId: 'CUIT30-12345678-9',
      configuration: {
        payrollSettings: {
          payDates: [31],
          currency: 'ARS',
          roundingRules: 'round_to_peso'
        },
        benefits: {
          obraSocial: true,
          valesAlimentarios: 18000,
          aguinaldo: true,
          vacaciones: 14
        }
      }
    }
  })

  // Empleadores para Colombia
  const finTechBogota = await prisma.employer.create({
    data: {
      name: 'FinTech Bogotá',
      code: 'FINTECH_BOG',
      organizationId: finTechColombia.id,
      legalName: 'FinTech Colombia S.A.S.',
      taxId: 'NIT123456789-1',
      configuration: {
        payrollSettings: {
          payDates: [30],
          currency: 'COP',
          roundingRules: 'round_to_peso'
        },
        benefits: {
          eps: true,
          afp: true,
          auxilioTransporte: true,
          prima: true,
          cesantias: true
        }
      }
    }
  })

  // Empleadores para Chile
  const miningSantiago = await prisma.employer.create({
    data: {
      name: 'MiningTech Santiago',
      code: 'MINING_STG',
      organizationId: miningTechChile.id,
      legalName: 'MiningTech Chile S.A.',
      taxId: 'RUT12.345.678-9',
      configuration: {
        payrollSettings: {
          payDates: [31],
          currency: 'CLP',
          roundingRules: 'round_to_peso'
        },
        benefits: {
          isapre: true,
          afp: true,
          bonoColacion: 30000,
          bonoMovilizacion: 35000,
          gratificacion: true
        }
      }
    }
  })

  // Empleadores para Perú
  const eCommerceLima = await prisma.employer.create({
    data: {
      name: 'E-Commerce Lima',
      code: 'ECOMM_LIMA',
      organizationId: eCommercePeru.id,
      legalName: 'E-Commerce Perú S.A.C.',
      taxId: 'RUC12345678901',
      configuration: {
        payrollSettings: {
          payDates: [30],
          currency: 'PEN',
          roundingRules: 'round_to_sol'
        },
        benefits: {
          essalud: true,
          gratificacion: true,
          cts: true,
          vacaciones: 25,
          asignacionFamiliar: true
        }
      }
    }
  })

  // 4. Crear departamentos
  console.log('🏗️ Creando departamentos...')
  
  const departments = await Promise.all([
    // Panxea México
    prisma.department.create({
      data: { name: 'Desarrollo', code: 'DEV', employerId: panxeaMx.id, description: 'Equipo de desarrollo de software' }
    }),
    prisma.department.create({
      data: { name: 'Marketing', code: 'MKT', employerId: panxeaMx.id, description: 'Marketing digital y contenidos' }
    }),
    prisma.department.create({
      data: { name: 'Ventas', code: 'SALES', employerId: panxeaMx.id, description: 'Equipo comercial' }
    }),
    // Panxea Services
    prisma.department.create({
      data: { name: 'Consultoría', code: 'CONS', employerId: panxeaServices.id, description: 'Servicios de consultoría' }
    }),
    prisma.department.create({
      data: { name: 'Soporte', code: 'SUP', employerId: panxeaServices.id, description: 'Soporte técnico' }
    }),
    // TechStart
    prisma.department.create({
      data: { name: 'Ingeniería', code: 'ENG', employerId: techStartMain.id, description: 'Desarrollo de producto' }
    }),
    prisma.department.create({
      data: { name: 'QA', code: 'QA', employerId: techStartMain.id, description: 'Aseguramiento de calidad' }
    }),
    // GlobalCorp Brasil
    prisma.department.create({
      data: { name: 'Tecnologia', code: 'TI', employerId: globalBrMain.id, description: 'Departamento de TI' }
    }),
    prisma.department.create({
      data: { name: 'Recursos Humanos', code: 'RH', employerId: globalBrMain.id, description: 'Gestión de personas' }
    }),
    // TechCorp USA
    prisma.department.create({
      data: { name: 'Engineering', code: 'ENG', employerId: techCorpAustin.id, description: 'Software Engineering Department' }
    }),
    prisma.department.create({
      data: { name: 'Product', code: 'PROD', employerId: techCorpAustin.id, description: 'Product Management' }
    }),
    prisma.department.create({
      data: { name: 'Sales', code: 'SALES_US', employerId: techCorpAustin.id, description: 'Sales Department' }
    }),
    // GreenTech Canada
    prisma.department.create({
      data: { name: 'R&D', code: 'RND', employerId: greenTechToronto.id, description: 'Research and Development' }
    }),
    prisma.department.create({
      data: { name: 'Operations', code: 'OPS', employerId: greenTechToronto.id, description: 'Operations Department' }
    }),
    // Consulting Argentina
    prisma.department.create({
      data: { name: 'Consultoría IT', code: 'CONSULT_IT', employerId: consultingBuenosAires.id, description: 'Consultoría en Tecnología' }
    }),
    prisma.department.create({
      data: { name: 'Transformación Digital', code: 'TRANSF_DIG', employerId: consultingBuenosAires.id, description: 'Transformación Digital' }
    }),
    // FinTech Colombia
    prisma.department.create({
      data: { name: 'Desarrollo', code: 'DEV_CO', employerId: finTechBogota.id, description: 'Desarrollo de Software' }
    }),
    // MiningTech Chile
    prisma.department.create({
      data: { name: 'Ingeniería', code: 'ING_CL', employerId: miningSantiago.id, description: 'Ingeniería de Soluciones' }
    }),
    prisma.department.create({
      data: { name: 'Operaciones Mineras', code: 'OPS_MIN', employerId: miningSantiago.id, description: 'Operaciones Mineras' }
    }),
    // E-Commerce Perú
    prisma.department.create({
      data: { name: 'E-Commerce', code: 'ECOMM', employerId: eCommerceLima.id, description: 'Comercio Electrónico' }
    }),
    prisma.department.create({
      data: { name: 'Logística', code: 'LOG', employerId: eCommerceLima.id, description: 'Logística y Distribución' }
    }),
    prisma.department.create({
      data: { name: 'Marketing Digital', code: 'MKT_PE', employerId: eCommerceLima.id, description: 'Marketing Digital' }
    })
  ])

  // 5. Crear órdenes de trabajo
  console.log('📋 Creando órdenes de trabajo...')
  
  const workOrders = await Promise.all([
    // Panxea México
    prisma.workOrder.create({
      data: {
        code: 'WO_DEV_2024',
        name: 'Equipo de Desarrollo 2024',
        description: 'Desarrollo de plataforma principal',
        employerId: panxeaMx.id,
        payrollPeriod: 'BIWEEKLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: true, rate: 2.0 },
          benefits: { voucherRestaurant: 250, transport: 150 },
          workingDays: 22
        }
      }
    }),
    prisma.workOrder.create({
      data: {
        code: 'WO_MKT_2024',
        name: 'Marketing Digital 2024',
        description: 'Campañas y contenido digital',
        employerId: panxeaMx.id,
        payrollPeriod: 'BIWEEKLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: false },
          benefits: { voucherRestaurant: 200, marketing: 300 },
          workingDays: 22
        }
      }
    }),
    prisma.workOrder.create({
      data: {
        code: 'WO_SALES_2024',
        name: 'Ventas Corporativas 2024',
        description: 'Equipo de ventas B2B',
        employerId: panxeaMx.id,
        payrollPeriod: 'BIWEEKLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          commissions: { enabled: true, rate: 0.05 },
          benefits: { voucherRestaurant: 200, car: 800 },
          workingDays: 22
        }
      }
    }),
    // TechStart
    prisma.workOrder.create({
      data: {
        code: 'WO_TECH_2024',
        name: 'Desarrollo de Producto 2024',
        description: 'Desarrollo del MVP',
        employerId: techStartMain.id,
        payrollPeriod: 'MONTHLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          stockOptions: { enabled: true, vesting: 4 },
          benefits: { equipment: 500, learning: 1000 },
          workingDays: 22
        }
      }
    }),
    // GlobalCorp Brasil
    prisma.workOrder.create({
      data: {
        code: 'WO_GLOBAL_2024',
        name: 'Operações Brasil 2024',
        description: 'Operações gerais Brasil',
        employerId: globalBrMain.id,
        payrollPeriod: 'MONTHLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: true, rate: 1.5 },
          benefits: { valeRefeicao: 35, valeTransporte: 250, planoSaude: true },
          workingDays: 22
        }
      }
    }),
    // TechCorp USA
    prisma.workOrder.create({
      data: {
        code: 'WO_TECH_US_2024',
        name: 'TechCorp Development 2024',
        description: 'Software development operations USA',
        employerId: techCorpAustin.id,
        payrollPeriod: 'BIWEEKLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: true, rate: 1.5 },
          benefits: { healthInsurance: true, retirement401k: 0.06 },
          workingDays: 21
        }
      }
    }),
    prisma.workOrder.create({
      data: {
        code: 'WO_PRODUCT_US_2024',
        name: 'Product Management 2024',
        description: 'Product development and management',
        employerId: techCorpAustin.id,
        payrollPeriod: 'BIWEEKLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: false },
          benefits: { healthInsurance: true, stockOptions: true },
          workingDays: 21
        }
      }
    }),
    prisma.workOrder.create({
      data: {
        code: 'WO_SALES_US_2024',
        name: 'Sales Team USA 2024',
        description: 'Sales operations USA',
        employerId: techCorpAustin.id,
        payrollPeriod: 'BIWEEKLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          commissions: { enabled: true, rate: 0.08 },
          benefits: { healthInsurance: true, carAllowance: 500 },
          workingDays: 21
        }
      }
    }),
    // GreenTech Canada
    prisma.workOrder.create({
      data: {
        code: 'WO_RND_CA_2024',
        name: 'R&D Operations 2024',
        description: 'Research and development projects',
        employerId: greenTechToronto.id,
        payrollPeriod: 'BIWEEKLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: true, rate: 1.5 },
          benefits: { healthInsurance: true, rrsp: 0.05, research: 1000 },
          workingDays: 21
        }
      }
    }),
    prisma.workOrder.create({
      data: {
        code: 'WO_OPS_CA_2024',
        name: 'Operations Canada 2024',
        description: 'Operations Canada',
        employerId: greenTechToronto.id,
        payrollPeriod: 'BIWEEKLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: true, rate: 1.5 },
          benefits: { healthInsurance: true, rrsp: 0.05 },
          workingDays: 21
        }
      }
    }),
    // Consulting Argentina
    prisma.workOrder.create({
      data: {
        code: 'WO_CONSULT_AR_2024',
        name: 'Consultoría IT 2024',
        description: 'Proyectos de consultoría en tecnología',
        employerId: consultingBuenosAires.id,
        payrollPeriod: 'MONTHLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: true, rate: 1.5 },
          benefits: { obraSocial: true, valesAlimentarios: 20000, aguinaldo: true },
          workingDays: 22
        }
      }
    }),
    prisma.workOrder.create({
      data: {
        code: 'WO_TRANSF_AR_2024',
        name: 'Transformación Digital 2024',
        description: 'Proyectos de transformación digital',
        employerId: consultingBuenosAires.id,
        payrollPeriod: 'MONTHLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: false },
          benefits: { obraSocial: true, valesAlimentarios: 18000, capacitacion: 5000 },
          workingDays: 22
        }
      }
    }),
    // FinTech Colombia
    prisma.workOrder.create({
      data: {
        code: 'WO_FINTECH_CO_2024',
        name: 'Desarrollo FinTech 2024',
        description: 'Desarrollo de plataforma fintech',
        employerId: finTechBogota.id,
        payrollPeriod: 'MONTHLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: true, rate: 1.25 },
          benefits: { eps: true, afp: true, auxilioTransporte: true, prima: true },
          workingDays: 22
        }
      }
    }),
    // MiningTech Chile
    prisma.workOrder.create({
      data: {
        code: 'WO_MINING_CL_2024',
        name: 'Ingeniería Minera 2024',
        description: 'Desarrollo de soluciones para minería',
        employerId: miningSantiago.id,
        payrollPeriod: 'MONTHLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: true, rate: 1.5 },
          benefits: { isapre: true, afp: true, bonoColacion: 35000, gratificacion: true },
          workingDays: 22
        }
      }
    }),
    prisma.workOrder.create({
      data: {
        code: 'WO_OPS_MIN_CL_2024',
        name: 'Operaciones Mineras 2024',
        description: 'Operaciones y mantenimiento minero',
        employerId: miningSantiago.id,
        payrollPeriod: 'MONTHLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: true, rate: 1.5 },
          benefits: { isapre: true, afp: true, bonoColacion: 30000, bonoRiesgo: 50000 },
          workingDays: 22
        }
      }
    }),
    // E-Commerce Perú
    prisma.workOrder.create({
      data: {
        code: 'WO_ECOMM_PE_2024',
        name: 'E-Commerce Perú 2024',
        description: 'Operaciones de comercio electrónico',
        employerId: eCommerceLima.id,
        payrollPeriod: 'MONTHLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: true, rate: 1.25 },
          benefits: { essalud: true, gratificacion: true, cts: true },
          workingDays: 22
        }
      }
    }),
    prisma.workOrder.create({
      data: {
        code: 'WO_LOG_PE_2024',
        name: 'Logística Perú 2024',
        description: 'Operaciones logísticas y distribución',
        employerId: eCommerceLima.id,
        payrollPeriod: 'MONTHLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: true, rate: 1.25 },
          benefits: { essalud: true, movilidad: 300, almuerzo: 15 },
          workingDays: 22
        }
      }
    }),
    prisma.workOrder.create({
      data: {
        code: 'WO_MKT_PE_2024',
        name: 'Marketing Digital Perú 2024',
        description: 'Marketing digital y crecimiento',
        employerId: eCommerceLima.id,
        payrollPeriod: 'MONTHLY',
        startDate: new Date('2024-01-01'),
        configuration: {
          overtime: { enabled: false },
          benefits: { essalud: true, capacitacion: 500, herramientas: 200 },
          workingDays: 22
        }
      }
    })
  ])

  // 6. Crear usuarios
  console.log('👤 Creando usuarios...')
  
  const hashedPassword = await bcrypt.hash('12345678', 10)
  
  await prisma.user.createMany({
    data: [
      // Super Admin - Puede ver todos los países y jerarquías
      {
        email: 'superadmin@harweb.com',
        password: hashedPassword,
        name: '🌍 Super Administrador',
        role: 'SUPER_ADMIN',
        organizationId: null,
        permissions: { 
          canViewAllCountries: true,
          canViewAllOrganizations: true,
          canViewAllEmployers: true,
          canManagePayroll: true,
          canManageEmployees: true,
          canManageSystem: true
        }
      },
      {
        email: 'admin@panxea.com',
        password: hashedPassword,
        name: 'Oscar Rivera',
        role: 'ORG_ADMIN',
        organizationId: panxeaOrg.id,
        permissions: { 
          canViewAllEmployers: true,
          canManagePayroll: true,
          canManageEmployees: true 
        }
      },
      {
        email: 'hr@techstart.com',
        password: hashedPassword,
        name: 'María González',
        role: 'EMPLOYER_ADMIN',
        organizationId: techStartOrg.id,
        permissions: { 
          canManagePayroll: true,
          canManageEmployees: true 
        }
      },
      {
        email: 'admin@global.com.br',
        password: hashedPassword,
        name: 'João Silva',
        role: 'ORG_ADMIN',
        organizationId: globalCorpBr.id,
        permissions: { 
          canViewAllEmployers: true,
          canManagePayroll: true,
          canManageEmployees: true 
        }
      },
      // Usuarios para países adicionales
      {
        email: 'admin@techcorp.com',
        password: hashedPassword,
        name: 'Sarah Johnson',
        role: 'ORG_ADMIN',
        organizationId: techCorpUSA.id,
        permissions: { 
          canViewAllEmployers: true,
          canManagePayroll: true,
          canManageEmployees: true 
        }
      },
      {
        email: 'admin@greentech.ca',
        password: hashedPassword,
        name: 'David Thompson',
        role: 'ORG_ADMIN',
        organizationId: greenTechCanada.id,
        permissions: { 
          canViewAllEmployers: true,
          canManagePayroll: true,
          canManageEmployees: true 
        }
      },
      {
        email: 'admin@consulting.com.ar',
        password: hashedPassword,
        name: 'Diego Martín Rodríguez',
        role: 'ORG_ADMIN',
        organizationId: consultingArgentina.id,
        permissions: { 
          canViewAllEmployers: true,
          canManagePayroll: true,
          canManageEmployees: true 
        }
      },
      {
        email: 'admin@fintech.com.co',
        password: hashedPassword,
        name: 'María Fernanda Gómez',
        role: 'ORG_ADMIN',
        organizationId: finTechColombia.id,
        permissions: { 
          canViewAllEmployers: true,
          canManagePayroll: true,
          canManageEmployees: true 
        }
      },
      {
        email: 'admin@mining.cl',
        password: hashedPassword,
        name: 'Cristián Eduardo Silva',
        role: 'ORG_ADMIN',
        organizationId: miningTechChile.id,
        permissions: { 
          canViewAllEmployers: true,
          canManagePayroll: true,
          canManageEmployees: true 
        }
      },
      {
        email: 'admin@ecommerce.pe',
        password: hashedPassword,
        name: 'Rosa Elena Quispe',
        role: 'ORG_ADMIN',
        organizationId: eCommercePeru.id,
        permissions: { 
          canViewAllEmployers: true,
          canManagePayroll: true,
          canManageEmployees: true 
        }
      }
    ]
  })

  // 7. Crear empleados de muestra (opcional - se pueden agregar más tarde)
  console.log('👥 Creando empleados de muestra...')
  
  await Promise.all([
    // Empleados de Desarrollo - México
    prisma.employee.create({
      data: {
        employeeCode: 'DEV001',
        firstName: 'Carlos',
        lastName: 'Mendoza',
        email: 'carlos.mendoza@panxea.com',
        documentType: 'CURP',
        documentNumber: 'MEMC850101HDFNDR01',
        type: 'FULL_TIME',
        hireDate: new Date('2023-06-01'),
        salary: 45000,
        currency: 'MXN',
        position: 'Senior Developer',
        departmentId: departments[0].id,
        workOrderId: workOrders[0].id,
        benefits: {
          healthInsurance: true,
          lifeInsurance: true,
          stockOptions: 100
        }
      }
    }),
    // Empleados de Brasil
    prisma.employee.create({
      data: {
        employeeCode: 'BR001',
        firstName: 'Pedro',
        lastName: 'Santos',
        email: 'pedro.santos@global.com.br',
        documentType: 'CPF',
        documentNumber: '12345678901',
        type: 'FULL_TIME',
        hireDate: new Date('2023-03-01'),
        salary: 8500,
        currency: 'BRL',
        position: 'Analista de Sistemas',
        departmentId: departments[7].id,
        workOrderId: workOrders[4].id,
        benefits: {
          planoSaude: true,
          valeRefeicao: 35,
          valeTransporte: 250
        }
      }
    })
  ])

  // 8. Crear cuentas bancarias
  console.log('🏦 Creando cuentas bancarias...')
  
  await prisma.bankAccount.createMany({
    data: [
      {
        bankCode: '012',
        bankName: 'BBVA México',
        accountType: 'CHECKING',
        accountNumber: '0123456789',
        clabe: '012345678901234567',
        workOrderId: workOrders[0].id
      },
      {
        bankCode: '001',
        bankName: 'Banco do Brasil',
        accountType: 'CHECKING',
        accountNumber: '12345-6',
        agency: '1234',
        workOrderId: workOrders[4].id
      }
    ]
  })

  console.log('✅ Seed completado exitosamente!')
  console.log('\n📊 Datos creados:')
  console.log('- 8 Configuraciones de países (México, Brasil, Argentina, Colombia, Chile, Estados Unidos, Canadá, Perú)')
  console.log('- 9 Organizaciones')
  console.log('- 10 Empleadores')
  console.log('- 22 Departamentos')
  console.log('- 18 Órdenes de trabajo')
  console.log('- 10 Usuarios de prueba (1 Super Admin + 9 Admins de países)')
  console.log('- 2 Empleados de muestra')
  console.log('- 2 Cuentas bancarias')
  
  console.log('\n🔑 Credenciales de acceso:')
  console.log('🌍 SUPER ADMIN - Ve TODOS los países:')
  console.log('- superadmin@harweb.com / 12345678 (Super Administrador)')
  console.log('\n🇲🇽 MÉXICO:')
  console.log('- admin@panxea.com / 12345678 (Admin Panxea)')
  console.log('- hr@techstart.com / 12345678 (Admin TechStart)')
  console.log('\n🇧🇷 BRASIL:')
  console.log('- admin@global.com.br / 12345678 (Admin GlobalCorp)')
  console.log('\n🇺🇸 ESTADOS UNIDOS:')
  console.log('- admin@techcorp.com / 12345678 (Admin TechCorp USA)')
  console.log('\n🇨🇦 CANADÁ:')
  console.log('- admin@greentech.ca / 12345678 (Admin GreenTech Canada)')
  console.log('\n🇦🇷 ARGENTINA:')
  console.log('- admin@consulting.com.ar / 12345678 (Admin Consulting Argentina)')
  console.log('\n🇨🇴 COLOMBIA:')
  console.log('- admin@fintech.com.co / 12345678 (Admin FinTech Colombia)')
  console.log('\n🇨🇱 CHILE:')
  console.log('- admin@mining.cl / 12345678 (Admin MiningTech Chile)')
  console.log('\n🇵🇪 PERÚ:')
  console.log('- admin@ecommerce.pe / 12345678 (Admin E-Commerce Perú)')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })