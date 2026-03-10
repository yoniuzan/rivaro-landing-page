# 📦 Import & Integration Guide

Complete guide for importing and using this template as a package in your projects.

---

## 🚀 Installation

### Option 1: NPM Package (Recommended)

```bash
npm install @universal/react-template
```

### Option 2: Local Development

```bash
# In the template directory
npm run build:lib

# In your project
npm install /path/to/universal-react-template
```

### Option 3: Git Submodule

```bash
git submodule add <repo-url> packages/universal-template
```

---

## 🔧 Setup in Your Project

### 1. Basic Setup

```tsx
// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@universal/react-template';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <YourApp />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
```

### 2. Configure Redux Store

```typescript
// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@universal/react-template';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    // Your other reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 3. Setup i18n (Optional)

```typescript
// src/i18n.ts
import { i18n } from '@universal/react-template';

// Use the template's i18n or extend it
export default i18n;
```

---

## 🎨 Using Components

### Basic Components

```tsx
import { 
  Button, 
  Input, 
  Card, 
  Grid,
  Typography,
  Modal,
  LoadingSpinner
} from '@universal/react-template';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card variant="elevated" padding="lg">
      <Typography variant="h2">Welcome</Typography>
      
      <Grid columns={{ mobile: 1, desktop: 3 }} gap={16}>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Open Modal
        </Button>
        <Input placeholder="Enter text" />
        <LoadingSpinner size="md" />
      </Grid>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Typography>Modal Content</Typography>
      </Modal>
    </Card>
  );
}
```

### Layout Components

```tsx
import { Grid, Flex, Card } from '@universal/react-template';

function Dashboard() {
  return (
    <div>
      {/* Responsive Grid */}
      <Grid 
        columns={{ mobile: 1, tablet: 2, desktop: 4 }} 
        gap={24}
      >
        <Card>Widget 1</Card>
        <Card>Widget 2</Card>
        <Card>Widget 3</Card>
        <Card>Widget 4</Card>
      </Grid>

      {/* Flexible Layout */}
      <Flex 
        direction={{ mobile: 'column', desktop: 'row' }}
        justify="between"
        align="center"
        gap={16}
      >
        <div>Left Content</div>
        <div>Right Content</div>
      </Flex>
    </div>
  );
}
```

---

## 🎯 Using Widgets

### Import Complete Widget

```tsx
import { UserList, userListStoreConfig } from '@universal/react-template';

// 1. Add to store
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    ...userListStoreConfig.reducer,
    // Your reducers
  },
  middleware: (getDefault) =>
    getDefault().concat(userListStoreConfig.middleware),
});

// 2. Use in component
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <UserList />
      </ThemeProvider>
    </Provider>
  );
}
```

### Use Widget Hook Only

```tsx
import { useUserList } from '@universal/react-template';

function CustomUserList() {
  const { users, isLoading, actions } = useUserList();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id} onClick={() => actions.selectUser(user.id)}>
          {user.name}
        </div>
      ))}
    </div>
  );
}
```

---

## 🎨 Customizing Theme

### Override Theme Values

```tsx
import { ThemeProvider } from '@universal/react-template';

const customTheme = {
  colors: {
    primary: {
      500: '#9c27b0',
      600: '#8e24aa',
      700: '#7b1fa2',
    },
    secondary: {
      500: '#ff5722',
      600: '#f4511e',
      700: '#e64a19',
    },
  },
  typography: {
    fontFamily: {
      primary: 'Roboto, sans-serif',
    },
  },
  spacing: {
    4: '2rem', // Override default 1rem
  },
};

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Use Theme in Components

```tsx
import { useTheme } from '@universal/react-template';

function ThemedComponent() {
  const theme = useTheme();

  return (
    <div style={{
      backgroundColor: theme.colors.primary[600],
      padding: theme.spacing[4],
      borderRadius: theme.borderRadius.lg,
      color: theme.colors.neutral[0],
    }}>
      Themed Content
    </div>
  );
}
```

---

## 📱 Using Responsive Hooks

```tsx
import { 
  useBreakpoint,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useWindowSize
} from '@universal/react-template';

function ResponsiveComponent() {
  const breakpoint = useBreakpoint();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isDesktop = useIsDesktop();
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Current breakpoint: {breakpoint}</p>
      <p>Window size: {width}x{height}</p>
      
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

---

## 🌐 Using i18n

### Basic Usage

```tsx
import { useTranslation } from 'react-i18next';

function TranslatedComponent() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p>{t('common.loading')}</p>
      
      <button onClick={() => i18n.changeLanguage('he')}>
        עברית
      </button>
      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
    </div>
  );
}
```

### Add Custom Translations

```typescript
// src/i18n/customTranslations.ts
import { i18n } from '@universal/react-template';

i18n.addResourceBundle('he', 'custom', {
  myFeature: {
    title: 'כותרת שלי',
    description: 'תיאור שלי',
  },
});

i18n.addResourceBundle('en', 'custom', {
  myFeature: {
    title: 'My Title',
    description: 'My Description',
  },
});
```

---

## 🔌 API Integration

### Extend Base API

```typescript
// src/api/myApi.ts
import { baseApi } from '@universal/react-template';

export const myApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } = myApi;
```

### Use in Component

```tsx
import { useGetProductsQuery } from './api/myApi';
import { LoadingSpinner } from '@universal/react-template';

function ProductList() {
  const { data, isLoading, error } = useGetProductsQuery();

  if (isLoading) return <LoadingSpinner centered />;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      {data?.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

---

## 🏗️ Creating Custom Widgets

### Widget Structure

```
src/widgets/MyWidget/
├── components/
│   ├── WidgetCard.tsx
│   └── index.ts
├── hooks/
│   ├── useMyWidget.ts
│   └── index.ts
├── types/
│   └── index.ts
├── MyWidgetApi.ts
├── MyWidgetStoreSlice.ts
├── MyWidgetSelectors.ts
├── MyWidget.helper.ts
├── MyWidget.constant.ts
├── MyWidgetStoreConfig.ts
└── MyWidget.tsx
```

### Example Widget Implementation

```typescript
// types/index.ts
export interface MyData {
  id: string;
  title: string;
  description: string;
}

// MyWidgetApi.ts
import { baseApi } from '@universal/react-template';

export const myWidgetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyData: builder.query<MyData[], void>({
      query: () => '/my-data',
      providesTags: ['MyData'],
    }),
  }),
});

export const { useGetMyDataQuery } = myWidgetApi;

// MyWidgetStoreSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyWidgetState {
  selectedId: string | null;
  filter: string;
}

const initialState: MyWidgetState = {
  selectedId: null,
  filter: '',
};

export const myWidgetSlice = createSlice({
  name: 'myWidget',
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { setSelected, setFilter } = myWidgetSlice.actions;
export default myWidgetSlice.reducer;

// MyWidget.tsx
import React from 'react';
import { useGetMyDataQuery } from './MyWidgetApi';
import { Card, Grid, LoadingSpinner } from '@universal/react-template';

export const MyWidget: React.FC = () => {
  const { data, isLoading } = useGetMyDataQuery();

  if (isLoading) return <LoadingSpinner centered />;

  return (
    <Grid columns={{ mobile: 1, tablet: 2, desktop: 3 }} gap={16}>
      {data?.map(item => (
        <Card key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </Card>
      ))}
    </Grid>
  );
};
```

---

## 🎨 Styling Integration

### Using with Existing Styles

```tsx
import { Button } from '@universal/react-template';
import styles from './MyComponent.module.css';

function MyComponent() {
  return (
    <div className={styles.container}>
      <Button className={styles.customButton}>
        Custom Styled Button
      </Button>
    </div>
  );
}
```

### CSS Variables

```css
/* Your global CSS */
:root {
  /* Override template CSS variables */
  --button-primary-bg: #your-color;
  --spacing-4: 2rem;
}
```

---

## 🧪 Testing

### Testing Components with Template

```tsx
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@universal/react-template';
import { store } from './store';
import MyComponent from './MyComponent';

test('renders component', () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <MyComponent />
      </ThemeProvider>
    </Provider>
  );
});
```

---

## 📦 Build Configuration

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@universal/react-template": ["./node_modules/@universal/react-template/dist"]
    }
  }
}
```

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@universal/react-template'],
  },
});
```

---

## 🚀 Production Deployment

### Environment Variables

```env
# .env.production
VITE_API_BASE_URL=https://api.production.com
VITE_USE_MOCK=false
```

### Build Command

```bash
npm run build
```

---

## 💡 Best Practices

### 1. Import Only What You Need

```tsx
// ✅ Good - Tree shaking friendly
import { Button, Input } from '@universal/react-template';

// ❌ Avoid - Imports everything
import * as Template from '@universal/react-template';
```

### 2. Use Theme Provider Once

```tsx
// ✅ Good - Single provider at root
<ThemeProvider>
  <App />
</ThemeProvider>

// ❌ Avoid - Multiple providers
<ThemeProvider>
  <ComponentA />
</ThemeProvider>
<ThemeProvider>
  <ComponentB />
</ThemeProvider>
```

### 3. Extend, Don't Modify

```tsx
// ✅ Good - Extend base components
const MyButton = styled(Button)`
  custom-styles
`;

// ❌ Avoid - Modifying template files
```

---

## 🆘 Troubleshooting

### Issue: Module not found

```bash
# Solution
npm install @universal/react-template
npm install --save-dev @types/react @types/react-dom
```

### Issue: Theme not applying

```tsx
// Solution: Wrap app in ThemeProvider
<ThemeProvider>
  <App />
</ThemeProvider>
```

### Issue: Types not working

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "esModuleInterop": true
  }
}
```

---

## 📚 Examples

### Complete Example App

```tsx
// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { 
  ThemeProvider,
  Button,
  Grid,
  Card,
  Typography,
  useIsMobile
} from '@universal/react-template';
import { store } from './store';

function Dashboard() {
  const isMobile = useIsMobile();

  return (
    <Grid columns={{ mobile: 1, desktop: 3 }} gap={24}>
      <Card padding="lg">
        <Typography variant="h3">Welcome</Typography>
        <Typography variant="body1">
          This is a complete example using the template.
        </Typography>
        <Button variant="primary" fullWidth={isMobile}>
          Get Started
        </Button>
      </Card>
    </Grid>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
```

---

## 🎉 You're Ready!

You now have everything you need to integrate the Universal React Template into your projects. Happy coding! 🚀

For more details, check:
- [README.md](./README.md)
- [USAGE_GUIDE.md](./USAGE_GUIDE.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)

