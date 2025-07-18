// Función para combinar clases de Tailwind CSS
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Función para formatear fechas
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

// Función para generar IDs únicos
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función para validar título de tarea
export function validateTaskTitle(title: string): { isValid: boolean; error?: string } {
  if (!title.trim()) {
    return { isValid: false, error: 'El título de la tarea no puede estar vacío' };
  }
  
  if (title.length < 3) {
    return { isValid: false, error: 'El título debe tener al menos 3 caracteres' };
  }
  
  return { isValid: true };
} 