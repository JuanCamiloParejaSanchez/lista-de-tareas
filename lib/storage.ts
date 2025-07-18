import { Task } from '../types/task';

const STORAGE_KEY = 'todo-tasks';

// Función para guardar tareas en localStorage
export const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error al guardar tareas en localStorage:', error);
  }
};

// Función para cargar tareas desde localStorage
export const loadTasksFromStorage = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      // Convertir las fechas de string a Date
      return tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));
    }
  } catch (error) {
    console.error('Error al cargar tareas desde localStorage:', error);
  }
  return [];
};

// Función para limpiar todas las tareas del storage
export const clearTasksFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error al limpiar tareas del localStorage:', error);
  }
}; 