# Harweb DBO System

Sistema de Órdenes de Trabajo Multi-Empleador para Latinoamérica

## Descripción

Harweb DBO es una plataforma de gestión de nómina multi-tenant diseñada específicamente para empresas en Latinoamérica. Soporta múltiples países con sus regulaciones específicas, cálculos automáticos de impuestos y deducciones, e integración con sistemas bancarios locales.

## Características Principales

- 🌎 **Multi-País**: Soporte para Brasil, México, Argentina, Colombia y Chile
- 💰 **Cálculo Automático**: Motor de cálculo con reglas específicas por país
- 🏦 **Integración Bancaria**: Preparado para PIX, SPEI y otros sistemas locales
- 👥 **Multi-Tenant**: Cada empresa opera con aislamiento total de datos
- 📊 **Dashboard Ejecutivo**: Visualización de métricas clave en tiempo real
- 🔐 **Seguridad**: Autenticación JWT y aislamiento por tenant

## Tecnologías Utilizadas

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Autenticación**: JWT
- **UI Components**: Radix UI, Lucide Icons

## Requisitos Previos

- Node.js 18+ 
- PostgreSQL 14+
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone [repository-url]
cd harweb-dbo-system
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.local.example .env.local
```

Editar `.env.local` con tus configuraciones:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/harweb_dbo"
JWT_SECRET="your-super-secret-jwt-key"
```

4. Crear base de datos y ejecutar migraciones:
```bash
npx prisma generate
npx prisma db push
```

5. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

El sistema estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
harweb-dbo-system/
├── src/
│   ├── app/                    # Páginas y rutas de Next.js
│   │   ├── api/               # API endpoints
│   │   ├── dashboard/         # Páginas del dashboard
│   │   └── (auth)/           # Páginas de autenticación
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes UI base
│   │   └── dashboard/        # Componentes del dashboard
│   ├── config/               # Configuraciones (países, etc)
│   ├── lib/                  # Utilidades y conexiones
│   ├── services/             # Lógica de negocio
│   ├── types/                # TypeScript types
│   └── utils/                # Funciones auxiliares
├── prisma/
│   └── schema.prisma         # Esquema de base de datos
└── public/                   # Archivos estáticos
```

## Uso

### Registro de Empresa

1. Navegar a `/register`
2. Completar el formulario con:
   - Nombre de la empresa
   - País de operación
   - Datos del administrador
3. Al registrarse, se crea automáticamente:
   - Orden de trabajo (tenant)
   - Usuario administrador
   - Departamento general

### Gestión de Empleados

1. Acceder a Dashboard > Empleados
2. Agregar empleados con información completa
3. Asignar a departamentos
4. Configurar salarios y tipo de contrato

### Procesamiento de Nómina

1. Ir a Dashboard > Nómina
2. Seleccionar período a procesar
3. Click en "Calcular Nómina" para preview
4. Revisar cálculos
5. Click en "Procesar Nómina" para finalizar

## Cálculos por País

### Brasil (BR)
- INSS: Tablas progresivas hasta techo
- IRRF: Tablas con deducciones
- FGTS: 8% del salario bruto

### México (MX)
- ISR: Tablas mensuales SAT
- IMSS: 2.25% empleado
- INFONAVIT: 5%

### Argentina (AR)
- Jubilación: 11%
- Obra Social: 3%
- PAMI: 3%
- Ganancias: Tablas anuales

## API Endpoints

### Autenticación
- `POST /api/auth/login` - Login de usuario
- `POST /api/auth/register` - Registro de empresa

### Empleados
- `GET /api/employees` - Listar empleados
- `POST /api/employees` - Crear empleado

### Nómina
- `POST /api/payroll/calculate` - Calcular nómina
- `POST /api/payroll/process` - Procesar nómina

## Desarrollo

### Comandos útiles

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Iniciar producción
npm start

# Linting
npm run lint

# Prisma Studio
npx prisma studio

# Generar cliente Prisma
npx prisma generate
```

## Seguridad

- Autenticación JWT en todas las rutas protegidas
- Aislamiento de datos por tenant (work order)
- Validación de inputs con Zod
- Encriptación de contraseñas con bcrypt

## Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## Licencia

Este proyecto es parte del Sistema Harweb DBO y está protegido por derechos de autor.

## Contacto

Oscar Rivera - [email]

Proyecto Link: [repository-url]