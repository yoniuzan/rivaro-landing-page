/**
 * Main App Component
 */

import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@components/ThemeProvider';
import { ErrorBoundary, ToastProvider } from '@components/base';
import { store } from '@store/store';
import { HomePage } from '@pages/HomePage';
import './App.css';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <ToastProvider>
            <div className="app">
              <HomePage />
            </div>
          </ToastProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};
