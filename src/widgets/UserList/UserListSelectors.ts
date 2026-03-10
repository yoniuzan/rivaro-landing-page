/**
 * UserList Widget Selectors
 * Memoized selectors for accessing widget state
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@store/store';

// Base selectors
export const selectUserListState = (state: RootState) => state.userList;

// Memoized selectors
export const selectSelectedUserId = createSelector(
  [selectUserListState],
  (userList) => userList.selectedUserId
);

export const selectFilters = createSelector(
  [selectUserListState],
  (userList) => userList.filters
);

export const selectSearchFilter = createSelector(
  [selectFilters],
  (filters) => filters.search
);

export const selectRoleFilter = createSelector(
  [selectFilters],
  (filters) => filters.role
);

export const selectSortBy = createSelector(
  [selectUserListState],
  (userList) => userList.sortBy
);

export const selectSortOrder = createSelector(
  [selectUserListState],
  (userList) => userList.sortOrder
);

export const selectSortConfig = createSelector(
  [selectSortBy, selectSortOrder],
  (sortBy, sortOrder) => ({ sortBy, sortOrder })
);

