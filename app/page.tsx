'use client';

import { useState } from 'react';
import { TasksProvider, useTasks } from '@/hooks/useTasks';
import TaskItem from '@/components/TaskItem';

function TodoApp() {
  const { state, addTask, getSortedTasks } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask({ title: newTaskTitle });
      setNewTaskTitle('');
    }
  };

  const sortedTasks = getSortedTasks();
  const pendingTasks = sortedTasks.filter(task => !task.completed);
  const completedTasks = sortedTasks.filter(task => task.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📝 Mi Lista de Tareas
          </h1>
          <p className="text-gray-600">
            Organiza tus tareas de manera eficiente
          </p>
        </div>

        {/* Formulario para agregar tareas */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="¿Qué necesitas hacer?"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              minLength={3}
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Agregar
            </button>
          </form>
          
          {/* Mostrar errores */}
          {state.error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{state.error}</p>
            </div>
          )}
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{state.tasks.length}</div>
            <div className="text-sm text-gray-600">Total de tareas</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{pendingTasks.length}</div>
            <div className="text-sm text-gray-600">Pendientes</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
            <div className="text-sm text-gray-600">Completadas</div>
          </div>
        </div>

        {/* Lista de tareas */}
        <div className="space-y-6">
          {/* Tareas pendientes */}
          {pendingTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Tareas Pendientes ({pendingTasks.length})
              </h2>
              <div className="space-y-3">
                {pendingTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* Tareas completadas */}
          {completedTasks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Tareas Completadas ({completedTasks.length})
              </h2>
              <div className="space-y-3">
                {completedTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* Estado vacío */}
          {state.tasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No hay tareas aún
              </h3>
              <p className="text-gray-600">
                ¡Agrega tu primera tarea para comenzar!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <TasksProvider>
      <TodoApp />
    </TasksProvider>
  );
} 