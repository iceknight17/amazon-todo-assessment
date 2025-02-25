import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../types';
import api from '../api/axios';

interface CategoriesState {
  items: Category[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  }
);

export const addCategoryAsync = createAsyncThunk(
  'categories/addCategory',
  async (category: Omit<Category, 'id'>) => {
    const response = await api.post<Category>('/categories', category);
    return response.data;
  }
);

export const updateCategoryAsync = createAsyncThunk(
  'categories/updateCategory',
  async (category: Category) => {
    const response = await api.put<Category>(`/categories/${category.id}`, category);
    return response.data;
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  'categories/deleteCategory',
  async (id: string) => {
    await api.delete(`/categories/${id}`);
    return id;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      })
      // Add Category
      .addCase(addCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(addCategoryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add category';
      })
      // Update Category
      .addCase(updateCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(category => category.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCategoryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update category';
      })
      // Delete Category
      .addCase(deleteCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = state.items.filter(category => category.id !== action.payload);
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete category';
      });
  },
});

export default categoriesSlice.reducer;