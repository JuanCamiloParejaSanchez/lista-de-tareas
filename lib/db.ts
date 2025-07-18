// Configuración de base de datos (Opcional)
// Este archivo está preparado para futuras implementaciones con Prisma ORM

export interface DatabaseConfig {
  url: string;
  provider: 'sqlite' | 'postgresql' | 'mysql';
}

// Configuración por defecto (SQLite para desarrollo)
export const defaultConfig: DatabaseConfig = {
  url: 'file:./dev.db',
  provider: 'sqlite',
};

// Función para obtener configuración de base de datos
export function getDatabaseConfig(): DatabaseConfig {
  return defaultConfig;
}

// Nota: Para implementar persistencia con Prisma, necesitarías:
// 1. Instalar Prisma: npm install prisma @prisma/client
// 2. Inicializar: npx prisma init
// 3. Definir el schema en prisma/schema.prisma
// 4. Generar el cliente: npx prisma generate
// 5. Ejecutar migraciones: npx prisma migrate dev 