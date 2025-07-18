'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

type TasksAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: UpdateTaskInput } }
  | { type: 'DELETE_TASK'; payload: string }
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
            ? { ...task, ...action.payload.updates, updatedAt: new Date() }
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
  addTask: (input: CreateTaskInput) => void;
  updateTask: (id: string, updates: UpdateTaskInput) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  getSortedTasks: () => Task[];
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const addTask = (input: CreateTaskInput) => {
    if (!input.title.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'El título de la tarea no puede estar vacío' });
      return;
    }

    if (input.title.length < 3) {
      dispatch({ type: 'SET_ERROR', payload: 'El título debe tener al menos 3 caracteres' });
      return;
    }

    const newTask: Task = {
      id: generateId(),
      title: input.title.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (id: string, updates: UpdateTaskInput) => {
    if (updates.title !== undefined && !updates.title.trim()) {
      dispatch({ type: 'SET_ERROR', payload: 'El título de la tarea no puede estar vacío' });
      return;
    }

    if (updates.title !== undefined && updates.title.length < 3) {
      dispatch({ type: 'SET_ERROR', payload: 'El título debe tener al menos 3 caracteres' });
      return;
    }

    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleTask = (id: string) => {
    const task = state.tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
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
    updateTask,
    deleteTask,
    toggleTask,
    getSortedTasks,
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