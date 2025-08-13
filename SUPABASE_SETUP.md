# 🚀 Configuración de Supabase para Producción

## 1. Obtener el Connection String Correcto

1. Ve a [app.supabase.com](https://app.supabase.com)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Database**
4. Busca la sección **Connection string**
5. **IMPORTANTE**: Hay 3 tipos de connection strings:
   - **URI** (Direct connection) - Para migraciones
   - **Pooling** (Transaction mode) - Para la aplicación en producción
   - **Pooling** (Session mode) - Alternativa

## 2. Para Migraciones (usa Direct Connection)

```bash
# Formato Direct Connection:
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres

# O formato alternativo:
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

## 3. Verifica tu conexión primero

```bash
# Test de conexión con psql
psql "postgresql://postgres:g01xP1MzHGPjNySy@db.dmkxbilkfmvnkursomrt.supabase.co:5432/postgres"
```

## 4. Si el puerto 5432 está bloqueado, usa el puerto 6543

```bash
# Connection string con puerto alternativo
postgresql://postgres.dmkxbilkfmvnkursomrt:g01xP1MzHGPjNySy@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

## 5. Para tu aplicación en Vercel

Usa el **Pooling connection** en modo Transaction:
```
postgresql://postgres.dmkxbilkfmvnkursomrt:[PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

## Solución de Problemas

- **Error P1001**: Problema de red, verifica el connection string
- **FATAL: Tenant or user not found**: El formato del connection string es incorrecto
- **Timeout**: Puede ser un firewall bloqueando el puerto

## Alternativa: Usar Supabase CLI

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Link tu proyecto
supabase link --project-ref dmkxbilkfmvnkursomrt

# Push schema
supabase db push
```