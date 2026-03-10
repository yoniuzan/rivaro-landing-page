/// <reference types="vite/client" />
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Base API configuration for RTK Query
 * All API endpoints should extend this base API
 */

// Get base URL from environment or use default
const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers: Headers) => {
      // Add auth token if available
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Product', 'Order'], // Add your tag types here
  endpoints: () => ({}), // Endpoints are injected in specific API slices
});

// Export hooks for usage in functional components
export const { middleware: apiMiddleware } = baseApi;

