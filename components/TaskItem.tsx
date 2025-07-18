'use client';

import { useState } from 'react';
import { Task } from '../types/task';
import { useTasks } from '../hooks/useTasks';
import LoadingSpinner from './LoadingSpinner';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { completeTask, deleteTask, updateTask, state } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isHovered, setIsHovered] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = async () => {
    if (editTitle.trim() && editTitle !== task.title) {
      setIsUpdating(true);
      try {
        await updateTask(task.id, { title: editTitle.trim() });
        setIsEditing(false);
      } finally {
        setIsUpdating(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await completeTask(task.id);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      
      // Verificar si la fecha es válida
      if (isNaN(dateObj.getTime())) {
        return 'Fecha inválida';
      }
      
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(dateObj);
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return 'Fecha inválida';
    }
  };

  return (
    <>
      <div 
        className={`group rounded-2xl p-6 transition-all duration-300 animate-slide-up hover-lift ${
          task.completed 
            ? 'glass border border-slate-200/80 dark:border-slate-700/50 shadow-md' 
            : 'glass-primary shadow-lg hover:shadow-xl neon-glow'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-4">
          {/* Checkbox mejorado */}
          <button
            onClick={handleComplete}
            disabled={isCompleting || isDeleting || isUpdating}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-300 focus-ring disabled:opacity-50 disabled:cursor-not-allowed ${
              task.completed
                ? 'bg-gradient-success border-success-500 text-white shadow-glow'
                : 'border-slate-400 dark:border-slate-600 hover:border-success-400 dark:hover:border-success-500 hover:scale-110 hover:shadow-glow'
            }`}
          >
            {isCompleting ? (
              <LoadingSpinner size="sm" color="white" />
            ) : task.completed ? (
              <svg className="w-4 h-4 mx-auto animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : null}
          </button>

          {/* Contenido de la tarea */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleEdit}
                  onKeyDown={handleKeyPress}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-primary-300 dark:border-primary-600 rounded-xl focus-ring text-slate-900 dark:text-white transition-all duration-300"
                  autoFocus
                  disabled={isUpdating}
                />
                {isUpdating && (
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <LoadingSpinner size="sm" color="primary" />
                    <span>Actualizando...</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <h3 className={`text-lg font-semibold transition-all duration-300 ${
                  task.completed 
                    ? 'line-through text-slate-600 dark:text-slate-400' 
                    : 'text-slate-900 dark:text-white'
                }`}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Creada: {formatDate(task.createdAt)}
                  </span>
                  {task.updatedAt !== task.createdAt && (
                    <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Actualizada: {formatDate(task.updatedAt)}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className={`flex items-center gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                disabled={isCompleting || isDeleting || isUpdating}
                className="p-2 text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200 hover:scale-110 focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                title="Editar tarea"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            
            <button
              onClick={handleDeleteClick}
              disabled={isCompleting || isDeleting || isUpdating}
              className="p-2 text-slate-500 hover:text-danger-600 dark:hover:text-danger-400 hover:bg-danger-100 dark:hover:bg-danger-900/20 rounded-lg transition-all duration-200 hover:scale-110 focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
              title="Eliminar tarea"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Indicador de estado */}
        {task.completed && (
          <div className="mt-4 pt-4 border-t border-slate-200/80 dark:border-slate-700/50">
            <div className="flex items-center gap-2 text-success-600 dark:text-success-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Completada</span>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        taskTitle={task.title}
        isLoading={isDeleting}
      />
    </>
  );
} 