/**
 * useUserList Hook
 * Custom hook for UserList widget functionality
 */

import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { useGetUsersQuery } from '../UserListApi';
import {
  setSearchFilter,
  setRoleFilter,
  setSortBy,
  setSortOrder,
  setSelectedUser,
  resetFilters,
} from '../UserListStoreSlice';
import {
  selectFilters,
  selectSortBy,
  selectSortOrder,
  selectSelectedUserId,
} from '../UserListSelectors';

export const useUserList = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const sortBy = useAppSelector(selectSortBy);
  const sortOrder = useAppSelector(selectSortOrder);
  const selectedUserId = useAppSelector(selectSelectedUserId);

  // Fetch users with current filters
  const { data, isLoading, error, refetch } = useGetUsersQuery({
    search: filters.search,
    role: filters.role,
    sortBy,
    sortOrder,
  });

  // Actions
  const actions = useMemo(
    () => ({
      setSearch: (search: string) => dispatch(setSearchFilter(search)),
      setRole: (role: string) => dispatch(setRoleFilter(role)),
      setSortBy: (field: 'name' | 'email' | 'createdAt') => dispatch(setSortBy(field)),
      setSortOrder: (order: 'asc' | 'desc') => dispatch(setSortOrder(order)),
      selectUser: (userId: string | null) => dispatch(setSelectedUser(userId)),
      resetFilters: () => dispatch(resetFilters()),
      refetch,
    }),
    [dispatch, refetch]
  );

  return {
    users: data?.users || [],
    total: data?.total || 0,
    isLoading,
    error,
    filters,
    sortBy,
    sortOrder,
    selectedUserId,
    actions,
  };
};

