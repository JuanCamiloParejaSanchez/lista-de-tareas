'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

type TasksAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: { id: number; updates: UpdateTaskInput } }
  | { type: 'DELETE_TASK'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOAD_TASKS'; payload: Task[] };

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

function tasksReducer(state: TasksState, action: TasksAction): TasksState {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        error: null,
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        ),
        error: null,
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload,
        error: null,
      };
    default:
      return state;
  }
}

interface TasksContextType {
  state: TasksState;
  addTask: (input: CreateTaskInput) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  completeTask: (id: number) => Promise<void>;
  getSortedTasks: () => Task[];
  reloadTasks: () => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  // Cargar tareas al iniciar
  useEffect(() => {
    reloadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reloadTasks = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      dispatch({ type: 'LOAD_TASKS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al cargar las tareas' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addTask = async (input: CreateTaskInput) => {
    if (!input.title.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'El título de la tarea no puede estar vacío' });
      return;
    }
    if (input.title.length < 3) {
      dispatch({ type: 'SET_ERROR', payload: 'El título debe tener al menos 3 caracteres' });
      return;
    }
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.title }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al crear la tarea');
      }
      const newTask = await res.json();
      dispatch({ type: 'ADD_TASK', payload: newTask });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteTask = async (id: number) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Error al eliminar la tarea');
      }
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const completeTask = async (id: number) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
      });
      if (!res.ok) {
        throw new Error('Error al completar la tarea');
      }
      const updatedTask = await res.json();
      dispatch({ type: 'UPDATE_TASK', payload: { id, updates: { completed: true } } });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getSortedTasks = (): Task[] => {
    return [...state.tasks].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  const value: TasksContextType = {
    state,
    addTask,
    deleteTask,
    completeTask,
    getSortedTasks,
    reloadTasks,
  };

  return React.createElement(TasksContext.Provider, { value }, children);
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks debe ser usado dentro de un TasksProvider');
  }
  return context;
} 