# 📝 Lista de Tareas - To-Do App

Una aplicación web moderna para gestionar tareas diarias, desarrollada con Next.js, TypeScript y Tailwind CSS.

## ✨ Características

- ✅ **Registrar tareas** - Agregar nuevas tareas con validación
- 📋 **Ver lista de tareas** - Interfaz clara y organizada
- ☑️ **Marcar como completadas** - Toggle del estado de las tareas
- 🗑️ **Eliminar tareas** - Eliminación con confirmación visual
- 📊 **Ordenamiento inteligente** - Pendientes arriba, completadas abajo
- 📱 **Diseño responsive** - Funciona en móviles y desktop
- 🎨 **UI moderna** - Interfaz atractiva con Tailwind CSS
- ⚡ **Rendimiento optimizado** - Next.js App Router

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Manejo de Estado**: React Context API
- **Validaciones**: Cliente-side con TypeScript
- **Iconos**: Heroicons (SVG)

## 📁 Estructura del Proyecto

```
lista-de-tareas/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales
├── components/
│   └── TaskItem.tsx        # Componente de tarea individual
├── hooks/
│   └── useTasks.ts         # Hook personalizado para manejo de tareas
├── types/
│   └── task.ts             # Tipos TypeScript
├── lib/                    # Utilidades (futura expansión)
└── README.md
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd lista-de-tareas
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

### Scripts disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter de código

## 🎯 Funcionalidades Implementadas

### 1. Gestión de Tareas
- **Crear**: Formulario con validación (mínimo 3 caracteres)
- **Leer**: Lista organizada con estadísticas
- **Actualizar**: Edición inline con doble clic
- **Eliminar**: Botón de eliminación con confirmación visual

### 2. Organización Inteligente
- Tareas pendientes aparecen primero
- Tareas completadas se muestran al final
- Ordenamiento por fecha de creación (más recientes primero)

### 3. Validaciones
- Campos vacíos no permitidos
- Longitud mínima de 3 caracteres
- Mensajes de error claros

### 4. Experiencia de Usuario
- Interfaz intuitiva y moderna
- Animaciones suaves
- Diseño responsive
- Estados de carga y error

## 🔧 Arquitectura Técnica

### Manejo de Estado
Utilizamos **React Context API** con un reducer para manejar el estado global de las tareas:

```typescript
// Estructura del estado
interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}
```

### Tipado TypeScript
Definimos interfaces claras para todas las entidades:

```typescript
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Componentes
- **TaskItem**: Componente reutilizable para cada tarea
- **TodoApp**: Componente principal con lógica de negocio
- **TasksProvider**: Provider del contexto de estado

## 🎨 Diseño y UX

### Paleta de Colores
- **Azul**: Color principal (#3b82f6)
- **Verde**: Tareas completadas (#10b981)
- **Amarillo**: Tareas pendientes (#f59e0b)
- **Gris**: Estados neutrales y texto secundario

### Responsive Design
- Mobile-first approach
- Breakpoints optimizados para diferentes dispositivos
- Navegación táctil amigable

## 🔮 Próximas Mejoras (Opcional)

- [ ] **Persistencia de datos** con localStorage
- [ ] **Base de datos** con Prisma ORM
- [ ] **Filtros avanzados** (por fecha, estado)
- [ ] **Categorías** para organizar tareas
- [ ] **Notificaciones** push
- [ ] **Modo oscuro**
- [ ] **Exportar/Importar** tareas

## 📝 Notas de Desarrollo

### Decisiones Técnicas
1. **Context API vs Zustand**: Elegimos Context API por simplicidad y requisitos del proyecto
2. **TypeScript**: Implementado completamente para type safety
3. **Tailwind CSS**: Para desarrollo rápido y consistencia visual
4. **Next.js App Router**: Para aprovechar las últimas características

### Patrones Utilizados
- **Custom Hooks**: Para lógica reutilizable
- **Context Pattern**: Para estado global
- **Reducer Pattern**: Para manejo de estado complejo
- **Component Composition**: Para reutilización de componentes

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**Desarrollado con ❤️ usando Next.js, TypeScript y Tailwind CSS** 