# 🧪 Guía Completa de Testing - Harweb DBO System

## 📋 Índice de Funcionalidades a Verificar

### 1. **🏗️ Estructura Jerárquica**
### 2. **👤 Sistema de Usuarios y Autenticación**
### 3. **📊 Dashboard y Métricas**
### 4. **👥 Gestión de Empleados**
### 5. **💰 Sistema de Nómina**
### 6. **🏦 Configuraciones Bancarias**
### 7. **🌍 Configuraciones por País**
### 8. **🔗 APIs y Endpoints**

---

## 🚀 Preparación Inicial

### Datos de Prueba Creados:
- **2 Países**: México (MX), Brasil (BR)
- **3 Organizaciones**: Panxea Corporation, TechStart Solutions, GlobalCorp Brasil
- **4 Empleadores**: Panxea México, Panxea Services, TechStart Principal, GlobalCorp Brasil Matriz
- **5 Órdenes de Trabajo**: Desarrollo, Marketing, Ventas, TechStart, GlobalCorp
- **4 Empleados**: Carlos (Dev), Ana (Dev), Luis (Marketing), Pedro (Brasil)

### 🔑 Credenciales de Acceso:
```
🌍 SUPER ADMIN - Ve TODOS los países:
- superadmin@harweb.com / 12345678 (Super Administrador Global)

🇲🇽 MÉXICO:
- admin@panxea.com / 12345678 (Admin Panxea - Multi-empleador)
- hr@techstart.com / 12345678 (Admin TechStart - Un empleador)

🇧🇷 BRASIL:
- admin@global.com.br / 12345678 (Admin GlobalCorp)
```

---

## 1. 🏗️ **VERIFICACIÓN DE ESTRUCTURA JERÁRQUICA**

### ✅ Paso 1: Acceso al Dashboard
1. Ve a: `http://localhost:3000/dashboard`
2. **Verifica**: Dashboard se carga sin autenticación (temporalmente deshabilitada)
3. **Resultado esperado**: Vista jerárquica completa con estructura expandible

### ✅ Paso 2: Navegación Jerárquica
1. **Expandir México**: Click en "México"
2. **Verifica**: Se muestran 2 organizaciones (Panxea Corporation, TechStart Solutions)
3. **Expandir Panxea**: Click en "Panxea Corporation"
4. **Verifica**: Se muestran 2 empleadores (Panxea México, Panxea Services)
5. **Expandir Empleador**: Click en "Panxea México"
6. **Verifica**: Se muestran 3 órdenes de trabajo (Desarrollo, Marketing, Ventas)

### ✅ Paso 3: Validación de Contadores
- **México**: 3 organizaciones
- **Panxea Corporation**: 2 empleadores
- **Panxea México**: 3 órdenes de trabajo
- **Desarrollo**: 45 empleados (mock data)

---

## 2. 👤 **SISTEMA DE USUARIOS** (Temporalmente Deshabilitado)

### ✅ Estado Actual:
- ✅ Middleware deshabilitado para testing
- ✅ Layout muestra usuario de prueba
- ✅ Datos reales en base de datos listos para activar

### 🔄 Para Reactivar Autenticación:
```bash
# Descomentar en src/middleware.ts líneas 9-67
# Descomentar en src/app/dashboard/layout.tsx líneas 41-67
```

---

## 3. 📊 **DASHBOARD Y MÉTRICAS**

### ✅ Paso 1: Verificar Header
1. **Ubicación**: Top del dashboard
2. **Verifica**:
   - ✅ Título: "Dashboard Ejecutivo"
   - ✅ Subtítulo jerárquico
   - ✅ Contadores: 1 País, 2 Organizaciones, 3 Empleadores, 15 Órdenes

### ✅ Paso 2: Métricas Principales
1. **Tarjetas de Métricas**:
   - ✅ **Total Empleados**: 1,245 (con tendencia +12%)
   - ✅ **Órdenes Activas**: 15 (con tendencia +5)
   - ✅ **Costo Nómina**: $8.8M (con tendencia -2.1%)
   - ✅ **Crecimiento**: +8.2% (con tendencia +3.2%)

### ✅ Paso 3: Panel de Actividades
1. **Actividad Reciente**:
   - ✅ Nómina procesada - Desarrollo
   - ✅ Nuevo empleado - Ana García
   - ✅ Configuración actualizada - Beneficios

2. **Próximas Acciones**:
   - ✅ Procesar nómina quincenal (Alta prioridad)
   - ✅ Revisión contratos (Media prioridad)
   - ✅ Actualización beneficios (Baja prioridad)

---

## 4. 👥 **GESTIÓN DE EMPLEADOS**

### ✅ Paso 1: Navegación a Empleados
1. **Ir a**: `http://localhost:3000/dashboard/employees`
2. **Verifica**: Página de empleados se carga
3. **Resultado esperado**: Lista de empleados por orden de trabajo

### ✅ Paso 2: Empleados Creados
**Verifica estos empleados en la base de datos**:

1. **Carlos Mendoza** (DEV001)
   - ✅ Puesto: Senior Developer
   - ✅ Salario: $45,000 MXN
   - ✅ Departamento: Desarrollo
   - ✅ Orden de Trabajo: Equipo de Desarrollo 2024

2. **Ana García** (DEV002)
   - ✅ Puesto: Frontend Developer
   - ✅ Salario: $38,000 MXN
   - ✅ Departamento: Desarrollo

3. **Luis Rodríguez** (MKT001)
   - ✅ Puesto: Marketing Manager
   - ✅ Salario: $32,000 MXN
   - ✅ Departamento: Marketing

4. **Pedro Santos** (BR001)
   - ✅ Puesto: Analista de Sistemas
   - ✅ Salario: R$8,500 BRL
   - ✅ País: Brasil

---

## 5. 💰 **SISTEMA DE NÓMINA**

### ✅ Paso 1: Configuraciones por País
**México (MX)**:
- ✅ Salario mínimo: $207.44 MXN
- ✅ Horas semanales: 48
- ✅ ISR configurado (10 niveles)
- ✅ IMSS: Empleado 3.75%, Empleador 17.75%
- ✅ INFONAVIT: 5%

**Brasil (BR)**:
- ✅ Salario mínimo: R$1,320.00 BRL
- ✅ Horas semanales: 44
- ✅ IRRF configurado (5 niveles)
- ✅ INSS: Empleado 11%, Empleador 20%
- ✅ FGTS: 8%

### ✅ Paso 2: Órdenes de Trabajo
1. **WO_DEV_2024** (Quincenal)
   - ✅ Periodicidad: BIWEEKLY
   - ✅ Horas extra habilitadas (2.0x)
   - ✅ Beneficios: Vales $250, Transporte $150

2. **WO_MKT_2024** (Quincenal)
   - ✅ Sin horas extra
   - ✅ Beneficios: Vales $200, Marketing $300

3. **WO_GLOBAL_2024** (Mensual - Brasil)
   - ✅ Periodicidad: MONTHLY
   - ✅ Horas extra: 1.5x
   - ✅ Beneficios brasileños: Vale refeição, Vale transporte

---

## 6. 🏦 **CONFIGURACIONES BANCARIAS**

### ✅ Verificar Cuentas Creadas:
1. **México - BBVA**:
   - ✅ Código: 012
   - ✅ Cuenta: 0123456789
   - ✅ CLABE: 012345678901234567

2. **Brasil - Banco do Brasil**:
   - ✅ Código: 001
   - ✅ Cuenta: 12345-6
   - ✅ Agencia: 1234

---

## 7. 🌍 **CONFIGURACIONES POR PAÍS**

### ✅ Paso 1: Verificar Base de Datos
```sql
-- Ejecutar en PostgreSQL
SELECT country, name, currency, minimum_wage FROM country_configurations;
```

### ✅ Paso 2: Validar Configuraciones
**México**:
- ✅ Moneda: MXN
- ✅ Zona horaria: America/Mexico_City
- ✅ Días festivos 2024 configurados
- ✅ Reglas de horas extra

**Brasil**:
- ✅ Moneda: BRL
- ✅ Zona horaria: America/Sao_Paulo
- ✅ Decimotercer salario habilitado
- ✅ 30 días de vacaciones

---

## 8. 🔗 **APIS Y ENDPOINTS**

### ✅ Testing de APIs Principales

#### A. **Work Orders API**
```bash
# Listar órdenes de trabajo
curl http://localhost:3000/api/work-orders

# Esperado: Array con 5 órdenes de trabajo
```

#### B. **Employees API**
```bash
# Listar empleados
curl http://localhost:3000/api/employees

# Esperado: Array con 4 empleados
```

#### C. **Payroll API**
```bash
# Calcular nómina
curl -X POST http://localhost:3000/api/payroll/calculate \
  -H "Content-Type: application/json" \
  -d '{"workOrderId": "ID_ORDER", "period": "2024-01"}'
```

---

## 🧪 **CASOS DE PRUEBA ESPECÍFICOS**

### Test Case 1: **Cálculo de Nómina México**
1. **Empleado**: Carlos Mendoza ($45,000 MXN)
2. **Cálculos esperados**:
   - ISR: ~$7,200 (16%)
   - IMSS: ~$1,687 (3.75%)
   - Neto: ~$36,113

### Test Case 2: **Cálculo de Nómina Brasil**
1. **Empleado**: Pedro Santos (R$8,500 BRL)
2. **Cálculos esperados**:
   - IRRF: ~$637 (7.5%)
   - INSS: ~$935 (11%)
   - Neto: ~R$6,928

### Test Case 3: **Jerarquía Completa**
1. **Ruta**: País → Organización → Empleador → Orden de Trabajo
2. **Verificar**: Cada nivel muestra correctamente sus hijos
3. **Contar**: Totales coinciden en cada nivel

---

## 🚨 **CHECKLIST DE FUNCIONALIDADES**

### ✅ **Completadas**:
- [x] Estructura jerárquica (País → Org → Empleador → WO)
- [x] Dashboard con métricas y tendencias
- [x] Base de datos poblada con datos reales
- [x] Configuraciones por país (MX, BR)
- [x] Empleados con diferentes tipos de contrato
- [x] Órdenes de trabajo con configuraciones específicas
- [x] Cuentas bancarias por país
- [x] Diseño moderno y responsivo

### 🔄 **Pendientes de Activar**:
- [ ] Sistema de autenticación (comentado para testing)
- [ ] APIs de cálculo de nómina (estructura lista)
- [ ] Reportes y exportación
- [ ] Notificaciones y alertas

### 🏗️ **Por Desarrollar**:
- [ ] Interfaz de gestión de empleados
- [ ] Calculadora de nómina interactiva
- [ ] Reportes por período
- [ ] Configuración de beneficios por empleado
- [ ] Historial de cambios y auditoría

---

## 🎯 **PRÓXIMOS PASOS RECOMENDADOS**

1. **Reactivar Autenticación**: Descomentar middleware y layout
2. **Crear Interfaces CRUD**: Empleados, órdenes de trabajo, nómina
3. **Implementar Cálculos**: Lógica de nómina por país
4. **Desarrollar Reportes**: Exportación PDF/Excel
5. **Añadir Validaciones**: Reglas de negocio por país
6. **Testing Automatizado**: Unit tests y E2E tests

---

## 📞 **Soporte**

Si encuentras algún problema durante las pruebas:
1. Verificar que el servidor esté ejecutándose en puerto 3000
2. Confirmar que PostgreSQL esté activo
3. Revisar logs en la consola del navegador
4. Validar que el seed data se ejecutó correctamente

**Base de datos**: Ejecutar `psql -U postgres -d harweb_dbo -c "\dt"` para ver tablas
**Logs del servidor**: Revisar terminal donde ejecutas `npm run dev`