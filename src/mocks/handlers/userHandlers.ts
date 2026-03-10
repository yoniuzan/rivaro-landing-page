/**
 * MSW Handlers for User API
 */

import { http, HttpResponse, type HttpResponseResolver } from 'msw';
import { mockUsers, getUserById, filterUsers } from '../data/users';
import type { User, GetUsersResponse } from '@widgets/UserList/types';

const baseUrl = 'http://localhost:3000/api';

export const userHandlers = [
  // GET /users - Get all users with filters
  http.get(`${baseUrl}/users`, (({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || undefined;
    const role = url.searchParams.get('role') || undefined;
    const sortBy = url.searchParams.get('sortBy') || undefined;
    const sortOrder = (url.searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc';
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10');

    const filtered = filterUsers({ search, role, sortBy, sortOrder });
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedUsers = filtered.slice(start, end);

    const response: GetUsersResponse = {
      users: paginatedUsers,
      total: filtered.length,
      page,
      pageSize,
    };

    return HttpResponse.json(response, { status: 200 });
  }) as HttpResponseResolver),

  // GET /users/:id - Get user by ID
  http.get(`${baseUrl}/users/:id`, (({ params }) => {
    const { id } = params;
    const user = getUserById(id as string);

    if (!user) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json(user, { status: 200 });
  }) as HttpResponseResolver),

  // POST /users - Create new user
  http.post(`${baseUrl}/users`, (async ({ request }) => {
    const userData = await request.json() as Partial<User>;
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'user',
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    return HttpResponse.json(newUser, { status: 201 });
  }) as HttpResponseResolver),

  // PUT /users/:id - Update user
  http.put(`${baseUrl}/users/:id`, (async ({ params, request }) => {
    const { id } = params;
    const userData = await request.json() as Partial<User>;
    const userIndex = mockUsers.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    mockUsers[userIndex] = {
      ...mockUsers[userIndex],
      ...userData,
    };

    return HttpResponse.json(mockUsers[userIndex], { status: 200 });
  }) as HttpResponseResolver),

  // DELETE /users/:id - Delete user
  http.delete(`${baseUrl}/users/:id`, (({ params }) => {
    const { id } = params;
    const userIndex = mockUsers.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    mockUsers.splice(userIndex, 1);

    return HttpResponse.json(null, { status: 204 });
  }) as HttpResponseResolver),
];

