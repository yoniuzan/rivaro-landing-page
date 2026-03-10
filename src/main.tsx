import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './locales/i18n';
import { startMockServer } from './mocks';

// Initialize app
const initApp = async () => {
  // Start mock server if enabled
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    console.log('🔧 Initializing Mock Service Worker...');
    await startMockServer();
  }

  // Render app
  const root = document.getElementById('root');
  if (!root) {
    throw new Error('Root element not found');
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Start the app
initApp().catch((error) => {
  console.error('Failed to initialize app:', error);
});

