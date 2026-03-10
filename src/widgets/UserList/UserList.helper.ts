/**
 * UserList Widget Helpers
 * Utility functions for the UserList widget
 */

import type { User } from './types';

/**
 * Format user role for display
 */
export const formatUserRole = (role: User['role']): string => {
  const roleMap: Record<User['role'], string> = {
    admin: 'Administrator',
    user: 'User',
    guest: 'Guest',
  };
  return roleMap[role];
};

/**
 * Get initials from user name
 */
export const getUserInitials = (name: string): string => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('he-IL', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Filter users by search term
 */
export const filterUsersBySearch = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm) return users;
  
  const term = searchTerm.toLowerCase();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
  );
};

/**
 * Sort users by field
 */
export const sortUsers = (
  users: User[],
  sortBy: 'name' | 'email' | 'createdAt',
  sortOrder: 'asc' | 'desc'
): User[] => {
  const sorted = [...users].sort((a, b) => {
    let aValue: string | number = a[sortBy];
    let bValue: string | number = b[sortBy];

    if (sortBy === 'createdAt') {
      aValue = new Date(aValue).getTime();
      bValue = new Date(bValue).getTime();
    } else {
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

/**
 * Get role badge color
 */
export const getRoleBadgeColor = (role: User['role']): string => {
  const colorMap: Record<User['role'], string> = {
    admin: '#f44336',
    user: '#2196f3',
    guest: '#9e9e9e',
  };
  return colorMap[role];
};

