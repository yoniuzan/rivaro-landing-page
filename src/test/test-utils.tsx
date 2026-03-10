import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from '@components/ThemeProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from '@locales/i18n';
import { baseApi } from '@store/baseApi';

// Create a test store
export function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    preloadedState,
  });
}

interface AllTheProvidersProps {
  children: React.ReactNode;
  store?: ReturnType<typeof createTestStore>;
}

// Wrapper with all providers
function AllTheProviders({ children, store }: AllTheProvidersProps) {
  const testStore = store || createTestStore();

  return (
    <Provider store={testStore}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  );
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  store?: ReturnType<typeof createTestStore>;
}

// Custom render with providers
export function renderWithProviders(
  ui: ReactElement,
  { store, ...renderOptions }: CustomRenderOptions = {}
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders store={store}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
}

// Re-export everything from testing-library
export * from '@testing-library/react';
export { renderWithProviders as render };

