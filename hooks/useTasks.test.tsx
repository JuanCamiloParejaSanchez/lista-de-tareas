import { renderHook, act, waitFor } from '@testing-library/react';
import { useTasks, TasksProvider } from './useTasks';
import { NotificationProvider } from '../contexts/NotificationContext';

// Mock de fetch
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('useTasks', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <NotificationProvider>
      <TasksProvider>{children}</TasksProvider>
    </NotificationProvider>
  );

  test('carga tareas al inicializar', async () => {
    const mockTasks = [
      { id: 1, title: 'Tarea 1', completed: false, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, title: 'Tarea 2', completed: true, createdAt: new Date(), updatedAt: new Date() }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTasks,
    } as Response);

    const { result } = renderHook(() => useTasks(), { wrapper });

    await waitFor(() => {
      expect(result.current.state.tasks).toHaveLength(2);
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/tasks');
  });

  test('agrega una nueva tarea', async () => {
    const newTask = { id: 3, title: 'Nueva tarea', completed: false, createdAt: new Date(), updatedAt: new Date() };

    // Mock para cargar tareas iniciales
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    // Mock para agregar tarea
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => newTask,
    } as Response);

    const { result } = renderHook(() => useTasks(), { wrapper });

    await waitFor(() => {
      expect(result.current.state.tasks).toHaveLength(0);
    });

    await act(async () => {
      await result.current.addTask({ title: 'Nueva tarea' });
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Nueva tarea' }),
    });

    expect(result.current.state.tasks).toHaveLength(1);
    expect(result.current.state.tasks[0].title).toBe('Nueva tarea');
  });

  test('completa una tarea', async () => {
    const mockTasks = [
      { id: 1, title: 'Tarea 1', completed: false, createdAt: new Date(), updatedAt: new Date() }
    ];

    // Mock para cargar tareas iniciales
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTasks,
    } as Response);

    // Mock para completar tarea
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...mockTasks[0], completed: true }),
    } as Response);

    const { result } = renderHook(() => useTasks(), { wrapper });

    await waitFor(() => {
      expect(result.current.state.tasks).toHaveLength(1);
    });

    await act(async () => {
      await result.current.completeTask(1);
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/tasks/1', {
      method: 'PATCH',
    });

    expect(result.current.state.tasks[0].completed).toBe(true);
  });

  test('elimina una tarea', async () => {
    const mockTasks = [
      { id: 1, title: 'Tarea 1', completed: false, createdAt: new Date(), updatedAt: new Date() }
    ];

    // Mock para cargar tareas iniciales
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTasks,
    } as Response);

    // Mock para eliminar tarea
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    } as Response);

    const { result } = renderHook(() => useTasks(), { wrapper });

    await waitFor(() => {
      expect(result.current.state.tasks).toHaveLength(1);
    });

    await act(async () => {
      await result.current.deleteTask(1);
    });

    expect(mockFetch).toHaveBeenCalledWith('/api/tasks/1', {
      method: 'DELETE',
    });

    expect(result.current.state.tasks).toHaveLength(0);
  });

  test('ordena tareas correctamente (pendientes arriba, completadas abajo)', async () => {
    const mockTasks = [
      { id: 1, title: 'Tarea completada', completed: true, createdAt: new Date('2023-01-01'), updatedAt: new Date() },
      { id: 2, title: 'Tarea pendiente', completed: false, createdAt: new Date('2023-01-02'), updatedAt: new Date() }
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTasks,
    } as Response);

    const { result } = renderHook(() => useTasks(), { wrapper });

    await waitFor(() => {
      expect(result.current.state.tasks).toHaveLength(2);
    });

    const sortedTasks = result.current.getSortedTasks();
    
    // La primera tarea debe ser la pendiente
    expect(sortedTasks[0].completed).toBe(false);
    expect(sortedTasks[0].title).toBe('Tarea pendiente');
    
    // La segunda tarea debe ser la completada
    expect(sortedTasks[1].completed).toBe(true);
    expect(sortedTasks[1].title).toBe('Tarea completada');
  });
}); 