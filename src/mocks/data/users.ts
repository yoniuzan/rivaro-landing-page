/**
 * Mock User Data
 */

import type { User } from '@widgets/UserList/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'יוסי כהן',
    email: 'yossi.cohen@example.com',
    role: 'admin',
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'שרה לevi',
    email: 'sarah.levi@example.com',
    role: 'user',
    createdAt: '2023-02-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'דוד מזרחי',
    email: 'david.mizrahi@example.com',
    role: 'user',
    createdAt: '2023-03-10T09:15:00Z',
  },
  {
    id: '4',
    name: 'רחל אברהם',
    email: 'rachel.abraham@example.com',
    role: 'guest',
    createdAt: '2023-04-05T16:45:00Z',
  },
  {
    id: '5',
    name: 'משה ישראלי',
    email: 'moshe.israeli@example.com',
    role: 'admin',
    createdAt: '2023-05-12T11:20:00Z',
  },
  {
    id: '6',
    name: 'מרים כץ',
    email: 'miriam.katz@example.com',
    role: 'user',
    createdAt: '2023-06-18T13:00:00Z',
  },
  {
    id: '7',
    name: 'אברהם שלום',
    email: 'avraham.shalom@example.com',
    role: 'user',
    createdAt: '2023-07-22T15:30:00Z',
  },
  {
    id: '8',
    name: 'דינה גולן',
    email: 'dina.golan@example.com',
    role: 'guest',
    createdAt: '2023-08-30T10:45:00Z',
  },
];

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};

export const filterUsers = (params: {
  search?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}): User[] => {
  let filtered = [...mockUsers];

  // Filter by search
  if (params.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
    );
  }

  // Filter by role
  if (params.role) {
    filtered = filtered.filter((user) => user.role === params.role);
  }

  // Sort
  if (params.sortBy) {
    filtered.sort((a, b) => {
      const aValue = a[params.sortBy as keyof User];
      const bValue = b[params.sortBy as keyof User];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return params.sortOrder === 'desc' ? -comparison : comparison;
      }

      return 0;
    });
  }

  return filtered;
};

