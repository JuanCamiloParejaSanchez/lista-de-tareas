# 📝 Lista de Tareas - Aplicación Web Moderna

Una aplicación web moderna y elegante para gestionar tareas personales, construida con Next.js, TypeScript, Prisma y Tailwind CSS. Incluye funcionalidades avanzadas como persistencia de datos, notificaciones, modo oscuro y una interfaz de usuario intuitiva.

## ✨ Características Principales

### 🎯 Funcionalidades Core
- ✅ **Gestión completa de tareas**: Crear, editar, completar y eliminar tareas
- 📊 **Estadísticas en tiempo real**: Contador de tareas totales, pendientes y completadas
- 📈 **Barra de progreso**: Visualización del progreso de completado
- 🔄 **Ordenamiento inteligente**: Tareas pendientes primero, completadas después
- 💾 **Persistencia de datos**: Base de datos MySQL con Prisma ORM
- 🔍 **Validaciones robustas**: Validación tanto en cliente como servidor

### 🎨 Interfaz de Usuario
- 🌙 **Modo oscuro/claro**: Toggle automático con persistencia de preferencias
- 📱 **Diseño responsive**: Optimizado para móviles, tablets y desktop
- ✨ **Animaciones fluidas**: Transiciones y efectos visuales modernos
- 🎨 **Gradientes y efectos**: Diseño visual atractivo con efectos glassmorphism
- 🔔 **Sistema de notificaciones**: Feedback visual para todas las acciones

### 🛠️ Características Técnicas
- ⚡ **Rendimiento optimizado**: Carga rápida y experiencia fluida
- 🔒 **TypeScript**: Seguridad de tipos en todo el proyecto
- 🧪 **Testing**: Configuración completa con Jest y React Testing Library
- 📦 **Arquitectura modular**: Componentes reutilizables y hooks personalizados
- 🔄 **Context API**: Manejo de estado global eficiente

## 🚀 Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework de React con App Router
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework CSS utility-first
- **Context API** - Manejo de estado global

### Backend
- **Next.js API Routes** - API REST integrada
- **Prisma ORM** - Cliente de base de datos type-safe
- **MySQL** - Base de datos relacional

### Herramientas de Desarrollo
- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **MySQL** (versión 8.0 o superior)
- **Git**

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd lista-de-tareas
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/lista_de_tareas"
```

**Nota**: Reemplaza `usuario`, `contraseña` y `lista_de_tareas` con tus credenciales de MySQL.

### 4. Configurar la Base de Datos

#### Opción A: Usar la base de datos existente
Si ya tienes una base de datos MySQL configurada, puedes usar el archivo SQL proporcionado:

```bash
mysql -u usuario -p lista_de_tareas < listaDeTareasDB.sql
```

#### Opción B: Usar Prisma Migrations (Recomendado)
```bash
# Generar el cliente de Prisma
npx prisma generate

# Ejecutar las migraciones
npx prisma migrate dev

# (Opcional) Ver la base de datos en Prisma Studio
npx prisma studio
```

### 5. Ejecutar el Proyecto

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm run build
npm start
```

El proyecto estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
lista-de-tareas/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── DeleteConfirmationModal.tsx
│   ├── LoadingSpinner.tsx
│   ├── Notification.tsx
│   ├── NotificationContainer.tsx
│   ├── ProgressBar.tsx
│   ├── TaskItem.tsx
│   └── ThemeToggle.tsx
├── contexts/              # Contextos de React
│   └── NotificationContext.tsx
├── hooks/                 # Custom hooks
│   ├── useNotification.ts
│   ├── useTasks.test.tsx
│   └── useTasks.ts
├── lib/                   # Utilidades y configuraciones
│   ├── db.ts             # Configuración de Prisma
│   ├── storage.ts        # Funciones de persistencia
│   └── utils.ts          # Utilidades generales
├── pages/                 # API Routes
│   └── api/
│       └── tasks/
│           ├── [id].ts   # Operaciones CRUD por ID
│           └── index.ts  # Listar y crear tareas
├── prisma/               # Configuración de Prisma
│   ├── migrations/       # Migraciones de base de datos
│   └── schema.prisma     # Esquema de la base de datos
├── types/                # Definiciones de tipos TypeScript
│   └── task.ts
└── generated/            # Archivos generados por Prisma
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm start           # Inicia el servidor de producción

# Testing
npm test            # Ejecuta los tests
npm run test:watch  # Ejecuta tests en modo watch

# Linting
npm run lint        # Ejecuta ESLint

# Base de datos
npx prisma generate # Genera el cliente de Prisma
npx prisma migrate dev # Ejecuta migraciones
npx prisma studio   # Abre Prisma Studio
```

## 🧪 Testing

El proyecto incluye una configuración completa de testing:

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:coverage
```

### Estructura de Tests
- **useTasks.test.tsx**: Tests para el hook principal de tareas
- **Componentes**: Tests unitarios para componentes individuales
- **API Routes**: Tests de integración para endpoints

## 🎨 Personalización

### Colores y Temas
Los colores y estilos se pueden personalizar en:
- `tailwind.config.js` - Configuración de Tailwind CSS
- `app/globals.css` - Variables CSS personalizadas

### Componentes
Todos los componentes están diseñados para ser reutilizables y personalizables:
- Props tipadas con TypeScript
- Estilos modulares con Tailwind CSS
- Hooks personalizados para lógica reutilizable

## 📊 API Endpoints

### GET /api/tasks
Obtiene todas las tareas ordenadas (pendientes primero, completadas después)

**Respuesta:**
```json
[
  {
    "id": 1,
    "title": "Completar proyecto",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

### POST /api/tasks
Crea una nueva tarea

**Body:**
```json
{
  "title": "Nueva tarea"
}
```

**Respuesta:**
```json
{
  "id": 2,
  "title": "Nueva tarea",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### PATCH /api/tasks/[id]
Actualiza una tarea existente

**Body:**
```json
{
  "title": "Tarea actualizada",
  "completed": true
}
```

### DELETE /api/tasks/[id]
Elimina una tarea

**Respuesta:** 204 No Content

## 🔒 Validaciones

### Cliente-side
- Título mínimo 3 caracteres
- Campos requeridos
- Validación de tipos TypeScript

### Servidor-side
- Validación de entrada en todos los endpoints
- Manejo de errores robusto
- Respuestas HTTP apropiadas

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Otros Proveedores
- **Netlify**: Compatible con Next.js
- **Railway**: Soporte nativo para MySQL
- **Heroku**: Requiere configuración adicional

### Variables de Entorno para Producción
```env
DATABASE_URL="mysql://usuario:contraseña@host:puerto/base_de_datos"
NODE_ENV="production"
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa la documentación en `ARCHITECTURE.md`
2. Abre un issue en el repositorio
3. Contacta al equipo de desarrollo

## 🔮 Roadmap

### Próximas Características
- [ ] Categorías de tareas
- [ ] Fechas de vencimiento
- [ ] Búsqueda y filtros
- [ ] Exportación de datos
- [ ] Sincronización entre dispositivos
- [ ] Notificaciones push
- [ ] Modo offline

### Mejoras Técnicas
- [ ] Optimización de rendimiento
- [ ] Mejoras en accesibilidad
- [ ] Tests de integración
- [ ] CI/CD pipeline
- [ ] Monitoreo y analytics

---

**¡Disfruta organizando tus tareas de manera eficiente! 🎉** 