'use client';

import { useState } from 'react';
import { TasksProvider, useTasks } from '../hooks/useTasks';
import TaskItem from '../components/TaskItem';
import ThemeToggle from '../components/ThemeToggle';
import { NotificationProvider } from '../contexts/NotificationContext';
import NotificationContainer from '../components/NotificationContainer';
import ProgressBar from '../components/ProgressBar';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 py-8 px-4 relative overflow-hidden">
      {/* Fondo decorativo con partículas */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-primary rounded-full opacity-10 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-secondary rounded-full opacity-10 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-accent rounded-full opacity-5 animate-pulse-slow"></div>
        
        {/* Partículas flotantes adicionales */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary-400 rounded-full opacity-60 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-secondary-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-accent-400 rounded-full opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header mejorado */}
        <div className="text-center mb-12 animate-slide-down">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-6 shadow-glow animate-bounce-in neon-glow">
            <span className="text-3xl">📝</span>
          </div>
          <h1 className="text-5xl font-bold text-gradient mb-4 text-shadow">
            Mi Lista de Tareas
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-md mx-auto">
            Organiza tus tareas de manera eficiente y mantén el control de tu productividad
          </p>
        </div>

        {/* Formulario mejorado */}
        <div className="glass-primary rounded-2xl shadow-xl p-8 mb-8 animate-scale-in hover-glow">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="¿Qué necesitas hacer hoy?"
                className="w-full px-6 py-4 bg-white/90 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-600 rounded-xl focus-ring text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 shadow-inner-glow transition-all duration-300"
                minLength={3}
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-primary text-white rounded-xl hover-lift focus-ring font-semibold transition-all duration-300 shadow-lg hover:shadow-xl neon-glow"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Agregar
              </span>
            </button>
          </form>
          
          {/* Mostrar errores */}
          {state.error && (
            <div className="mt-4 p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-xl animate-slide-down">
              <p className="text-danger-600 dark:text-danger-400 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {state.error}
              </p>
            </div>
          )}
        </div>

        {/* Estadísticas mejoradas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-2xl shadow-xl p-6 text-center hover-lift transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{state.tasks.length}</div>
            <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">Total de tareas</div>
          </div>
          
          <div className="glass rounded-2xl shadow-xl p-6 text-center hover-lift transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-gradient-warning rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{pendingTasks.length}</div>
            <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">Pendientes</div>
          </div>
          
          <div className="glass rounded-2xl shadow-xl p-6 text-center hover-lift transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{completedTasks.length}</div>
            <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">Completadas</div>
          </div>
        </div>

        {/* Barra de progreso */}
        {state.tasks.length > 0 && (
          <div className="glass rounded-2xl shadow-xl p-6 mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <ProgressBar 
              completed={completedTasks.length} 
              total={state.tasks.length} 
              className="max-w-md mx-auto"
            />
          </div>
        )}

        {/* Lista de tareas */}
        <div className="space-y-8">
          {/* Tareas pendientes */}
          {pendingTasks.length > 0 && (
            <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-warning rounded-full animate-pulse"></div>
                Tareas Pendientes
                <span className="text-sm bg-warning-100 dark:bg-warning-900/30 text-warning-800 dark:text-warning-200 px-3 py-1 rounded-full font-medium">
                  {pendingTasks.length}
                </span>
              </h2>
              <div className="space-y-4">
                {pendingTasks.map((task, index) => (
                  <div key={task.id} style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                    <TaskItem task={task} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tareas completadas */}
          {completedTasks.length > 0 && (
            <div className="animate-slide-up" style={{ animationDelay: '0.7s' }}>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-success rounded-full"></div>
                Tareas Completadas
                <span className="text-sm bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-200 px-3 py-1 rounded-full font-medium">
                  {completedTasks.length}
                </span>
              </h2>
              <div className="space-y-4">
                {completedTasks.map((task, index) => (
                  <div key={task.id} style={{ animationDelay: `${0.8 + index * 0.1}s` }}>
                    <TaskItem task={task} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Estado vacío mejorado */}
          {state.tasks.length === 0 && (
            <div className="text-center py-16 animate-bounce-in">
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow neon-glow">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                ¡Comienza tu jornada productiva!
              </h3>
              <p className="text-slate-700 dark:text-slate-300 max-w-md mx-auto text-lg">
                Agrega tu primera tarea para comenzar a organizar tu día de manera eficiente
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
    <NotificationProvider>
      <TasksProvider>
        <ThemeToggle />
        <NotificationContainer />
        <TodoApp />
      </TasksProvider>
    </NotificationProvider>
  );
} 