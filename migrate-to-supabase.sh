#\!/bin/bash
set -e

echo "🚀 Configurando base de datos de producción en Supabase..."

# Cargar variables de producción
export $(cat .env.production | grep -v "^#" | xargs)

echo "📦 Generando cliente de Prisma..."
npx prisma generate

echo "🔄 Aplicando migraciones a Supabase..."
npx prisma migrate deploy

echo "🌱 Ejecutando seed con datos iniciales..."
npx prisma db seed

echo "✅ Base de datos configurada exitosamente\!"
