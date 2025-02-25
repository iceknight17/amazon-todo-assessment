import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types';
import api from '../api/axios';

interface TodosState {
  items: Todo[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const response = await api.get<any[]>('/todos');
    return response.data;
  }
);

export const addTodoAsync = createAsyncThunk(
  'todos/addTodo',
  async (todo: Omit<Todo, 'id'>) => {
    const response = await api.post<any>('/todos', todo);
    return response.data;
  }
);

export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodo',
  async (todo: Todo) => {
    const response = await api.put<any>(`/todos/${todo.id}`, todo);
    return response.data;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodo',
  async (id: string) => {
    await api.delete(`/todos/${id}`);
    return id;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  'todos/toggleTodo',
  async (todo: Todo) => {
    const response = await api.patch<any>(`/todos/${todo.id}`, {
      completed: !todo.completed,
    });
    return response.data;
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload.map(todo => ({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          dueDate: todo.due_date,
          completed: todo.completed,
          categoryId: todo.category_id,
          createdAt: todo.created_at,
        }));
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch todos';
      })
      // Add Todo
      .addCase(addTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push({
          id: action.payload.id,
          title: action.payload.title,
          description: action.payload.description,
          dueDate: action.payload.due_date,
          completed: action.payload.completed,
          categoryId: action.payload.category_id,
          createdAt: action.payload.created_at,
        });
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add todo';
      })
      // Update Todo
      .addCase(updateTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            dueDate: action.payload.due_date,
            completed: action.payload.completed,
            categoryId: action.payload.category_id,
            createdAt: action.payload.created_at,
          };
        }
      })
      .addCase(updateTodoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update todo';
      })
      // Delete Todo
      .addCase(deleteTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = state.items.filter(todo => todo.id !== action.payload);
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete todo';
      })
      // Toggle Todo
      .addCase(toggleTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            dueDate: action.payload.due_date,
            completed: action.payload.completed,
            categoryId: action.payload.category_id,
            createdAt: action.payload.created_at,
          };
        }
      })
      .addCase(toggleTodoAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to toggle todo';
      });
  },
});

export default todosSlice.reducer;