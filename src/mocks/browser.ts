/**
 * MSW Browser Setup
 * Setup MSW for browser environment
 */

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// Start the worker
export const startMockServer = async () => {
  try {
    console.log('🔧 Starting Mock Service Worker...');
    console.log('📝 Handlers count:', handlers.length);
    
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
    
    console.log('✅ Mock Service Worker started successfully');
    console.log('🌐 Mocking API calls to:', import.meta.env.VITE_API_BASE_URL);
  } catch (error) {
    console.error('❌ Failed to start Mock Service Worker:', error);
    throw error;
  }
};

