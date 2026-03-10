# 🏗️ Architecture Documentation

## Overview

This template follows a modular, widget-based architecture designed for maximum reusability and maintainability.

## Core Principles

### 1. Modularity
Every feature is encapsulated as a "widget" - a self-contained module with its own:
- Components
- State management
- API endpoints
- Business logic
- Types

### 2. Type Safety
- TypeScript strict mode enabled
- No `any` types allowed
- Full type inference
- Exported types for external usage

### 3. Separation of Concerns
- **Components**: Presentation logic only
- **Hooks**: Reusable logic
- **Store**: State management
- **API**: Data fetching
- **Utils**: Pure functions

## Layer Architecture

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (Components, Pages, UI)            │
├─────────────────────────────────────┤
│         Business Logic Layer        │
│  (Hooks, Helpers, Selectors)        │
├─────────────────────────────────────┤
│         State Management Layer      │
│  (Redux Slices, RTK Query)          │
├─────────────────────────────────────┤
│         Data Layer                  │
│  (API, Mock Server, Types)          │
└─────────────────────────────────────┘
```

## Widget Structure

Each widget follows this exact structure:

```
WidgetName/
├── components/              # Widget-specific components
│   ├── ComponentA.tsx
│   ├── ComponentA.module.css
│   └── index.ts
├── hooks/                   # Custom hooks
│   ├── useWidgetName.ts
│   └── index.ts
├── types/                   # TypeScript types
│   └── index.ts
├── WidgetNameApi.ts         # RTK Query endpoints
├── WidgetNameStoreSlice.ts  # Redux slice
├── WidgetNameSelectors.ts   # Memoized selectors
├── WidgetName.helper.ts     # Pure helper functions
├── WidgetName.constant.ts   # Constants
├── WidgetNameStoreConfig.ts # Store integration config
├── WidgetName.tsx           # Main component
├── WidgetName.module.css    # Styles
└── index.ts                 # Public exports
```

### File Responsibilities

#### `WidgetNameApi.ts`
RTK Query endpoints for data fetching:
```typescript
export const widgetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query<DataType, ParamsType>({
      query: (params) => ({ url: '/data', params }),
      providesTags: ['Data'],
    }),
  }),
});
```

#### `WidgetNameStoreSlice.ts`
Redux slice for local state:
```typescript
export const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});
```

#### `WidgetNameSelectors.ts`
Memoized selectors using Reselect:
```typescript
export const selectWidgetData = createSelector(
  [selectWidgetState],
  (widget) => widget.data
);
```

#### `WidgetName.helper.ts`
Pure utility functions:
```typescript
export const formatData = (data: Data): FormattedData => {
  // Pure transformation logic
  return formatted;
};
```

#### `WidgetNameStoreConfig.ts`
Store integration configuration:
```typescript
export const widgetStoreConfig = {
  reducer: {
    [widgetSlice.name]: widgetSlice.reducer,
    [widgetApi.reducerPath]: widgetApi.reducer,
  },
  middleware: [widgetApi.middleware],
};
```

## State Management

### Redux Store Structure
```typescript
{
  api: {
    queries: {},
    mutations: {},
  },
  widget1: {
    filters: {},
    selectedId: null,
  },
  widget2: {
    // widget-specific state
  },
}
```

### Data Flow

```
User Action
    ↓
Component dispatches action
    ↓
Redux Slice updates state
    ↓
Selector computes derived state
    ↓
Component re-renders
```

### API Data Flow

```
Component calls hook
    ↓
Hook uses RTK Query
    ↓
RTK Query fetches data
    ↓
Data cached in Redux
    ↓
Component receives data
```

## Component Architecture

### Base Components
Reusable, theme-aware components:
- Accept theme via `useTheme()` hook
- Support responsive props
- RTL-aware
- Fully typed

### Widget Components
Feature-specific components:
- Use base components
- Connect to widget state
- Handle business logic via hooks

### Component Patterns

#### Container/Presenter Pattern
```typescript
// Container (hooks, logic)
const useUserList = () => {
  const data = useGetUsersQuery();
  const dispatch = useAppDispatch();
  // Logic here
  return { data, actions };
};

// Presenter (UI only)
const UserList = () => {
  const { data, actions } = useUserList();
  return <UI data={data} actions={actions} />;
};
```

## Responsive Design

### Breakpoint System
```typescript
breakpoints = {
  xs: 0,      // Mobile portrait
  sm: 576,    // Mobile landscape
  md: 768,    // Tablet portrait
  lg: 992,    // Tablet landscape / Desktop
  xl: 1200,   // Desktop
  xxl: 1400,  // Large desktop
}
```

### Responsive Props Pattern
```typescript
type ResponsiveValue<T> = T | {
  mobile?: T;
  tablet?: T;
  desktop?: T;
};

// Usage
<Grid columns={{ mobile: 1, tablet: 2, desktop: 4 }} />
```

### Responsive Hooks
```typescript
const breakpoint = useBreakpoint();  // 'xs' | 'sm' | 'md' | ...
const isMobile = useIsMobile();      // boolean
const { width, height } = useWindowSize();
```

## Theme System

### Theme Structure
```typescript
theme = {
  breakpoints: {},
  colors: {
    primary: { 50-900 },
    secondary: { 50-900 },
    neutral: { 0-1000 },
    semantic: { success, error, warning, info },
  },
  typography: {
    fontFamily: {},
    fontSize: {},
    fontWeight: {},
  },
  spacing: { 0-64 },
  borderRadius: {},
  shadows: {},
  zIndex: {},
  transitions: {},
}
```

### Theme Usage
```typescript
const theme = useTheme();

<div style={{ 
  color: theme.colors.primary[600],
  padding: theme.spacing[4],
  borderRadius: theme.borderRadius.md,
}} />
```

### Theme Customization
```typescript
<ThemeProvider theme={{
  colors: {
    primary: { 600: '#custom-color' }
  }
}}>
  <App />
</ThemeProvider>
```

## i18n Architecture

### Translation Structure
```
locales/
├── he/
│   ├── common.json
│   ├── widget1.json
│   └── widget2.json
└── en/
    ├── common.json
    ├── widget1.json
    └── widget2.json
```

### RTL Support
- Automatic direction switching
- CSS logical properties
- Mirror-aware components

## API Architecture

### Base API Configuration
```typescript
baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: env.API_URL,
    prepareHeaders: (headers) => {
      // Add auth token
      return headers;
    },
  }),
  tagTypes: ['User', 'Product'],
  endpoints: () => ({}),
});
```

### Endpoint Pattern
```typescript
getUsers: builder.query<Response, Params>({
  query: (params) => ({ url: '/users', params }),
  providesTags: (result) => [
    ...result.map(({ id }) => ({ type: 'User', id })),
    { type: 'User', id: 'LIST' },
  ],
}),
```

### Cache Invalidation
```typescript
createUser: builder.mutation<User, NewUser>({
  query: (user) => ({
    url: '/users',
    method: 'POST',
    body: user,
  }),
  invalidatesTags: [{ type: 'User', id: 'LIST' }],
}),
```

## Testing Strategy

### Unit Tests
- Pure functions (helpers)
- Selectors
- Reducers

### Integration Tests
- Hooks with mock store
- Components with providers

### E2E Tests
- User flows
- Widget interactions

## Performance Optimization

### Memoization
```typescript
// Selectors
const selectData = createSelector([...], (...) => {});

// Components
const Component = React.memo(({ data }) => {});

// Values
const value = useMemo(() => compute(), [deps]);
```

### Code Splitting
```typescript
const Widget = lazy(() => import('./Widget'));
```

### Bundle Optimization
- Tree shaking
- Dead code elimination
- CSS modules

## Security Considerations

### API Security
- Token-based authentication
- CSRF protection
- Input validation

### XSS Prevention
- React's built-in escaping
- DOMPurify for HTML content
- CSP headers

## Deployment

### Build Process
```bash
npm run build        # Production build
npm run build:lib    # Library build
```

### Environment Configuration
```env
VITE_API_BASE_URL=https://api.example.com
VITE_USE_MOCK=false
```

## Best Practices

### 1. Component Design
- Single responsibility
- Composable
- Reusable
- Typed props

### 2. State Management
- Keep state minimal
- Derive when possible
- Normalize data
- Use selectors

### 3. Performance
- Memoize expensive computations
- Use React.memo for pure components
- Lazy load routes
- Optimize images

### 4. Code Quality
- ESLint + TypeScript
- Consistent naming
- Clear comments
- Type everything

### 5. Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management

## Migration Guide

### Adding to Existing Project

1. Install package:
```bash
npm install @universal/react-template
```

2. Setup store:
```typescript
import { configureStore } from '@reduxjs/toolkit';
import { widgetStoreConfig } from '@universal/react-template';

const store = configureStore({
  reducer: {
    ...widgetStoreConfig.reducer,
    // your reducers
  },
  middleware: (getDefault) =>
    getDefault().concat(widgetStoreConfig.middleware),
});
```

3. Add providers:
```typescript
import { ThemeProvider } from '@universal/react-template';

<Provider store={store}>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</Provider>
```

4. Use components:
```typescript
import { Button, Grid } from '@universal/react-template';
```

## Troubleshooting

### Common Issues

**Issue**: Types not found
**Solution**: Ensure `@types` packages are installed

**Issue**: Theme not applied
**Solution**: Wrap app in `<ThemeProvider>`

**Issue**: RTL not working
**Solution**: Check `dir` attribute on `<html>`

**Issue**: Mock server not starting
**Solution**: Set `VITE_USE_MOCK=true` in `.env`

## Future Enhancements

- [ ] Server-side rendering (SSR)
- [ ] Progressive Web App (PWA)
- [ ] Advanced caching strategies
- [ ] WebSocket support
- [ ] GraphQL integration
- [ ] Micro-frontend support

---

For questions or contributions, please refer to the main README.

