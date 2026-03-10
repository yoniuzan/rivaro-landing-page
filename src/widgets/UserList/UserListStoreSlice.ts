/**
 * UserList Widget Store Slice
 * Redux slice for local widget state
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserListState } from './types';

const initialState: UserListState = {
  selectedUserId: null,
  filters: {
    search: '',
    role: '',
  },
  sortBy: 'name',
  sortOrder: 'asc',
};

export const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<string | null>) => {
      state.selectedUserId = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setRoleFilter: (state, action: PayloadAction<string>) => {
      state.filters.role = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'name' | 'email' | 'createdAt'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.sortBy = initialState.sortBy;
      state.sortOrder = initialState.sortOrder;
    },
  },
});

export const {
  setSelectedUser,
  setSearchFilter,
  setRoleFilter,
  setSortBy,
  setSortOrder,
  resetFilters,
} = userListSlice.actions;

export default userListSlice.reducer;

