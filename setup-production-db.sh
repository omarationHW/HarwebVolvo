#!/bin/bash

echo "🚀 Configurando base de datos de producción..."
echo ""
echo "Asegúrate de tener el DATABASE_URL de Supabase en tu .env.production"
echo ""

# Cargar variables de producción
if [ -f .env.production ]; then
    export $(cat .env.production | grep -v '^#' | xargs)
    
    echo "📦 Generando cliente de Prisma..."
    npx prisma generate
    
    echo "🔄 Ejecutando migraciones..."
    npx prisma migrate deploy
    
    echo "🌱 Ejecutando seed inicial..."
    npx prisma db seed
    
    echo "✅ Base de datos de producción configurada!"
else
    echo "❌ Error: Crea el archivo .env.production con tu DATABASE_URL de Supabase"
    echo ""
    echo "Ejemplo:"
    echo "DATABASE_URL=\"postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres\""
fi