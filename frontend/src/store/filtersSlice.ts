import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterStatus, SortBy } from '../types';

interface FiltersState {
  status: FilterStatus;
  sortBy: SortBy;
  searchQuery: string;
}

const initialState: FiltersState = {
  status: 'all',
  sortBy: 'dueDate',
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.status = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setStatusFilter, setSortBy, setSearchQuery } = filtersSlice.actions;
export default filtersSlice.reducer;