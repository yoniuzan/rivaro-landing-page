# 📖 Usage Guide

Complete guide for using the Arrival Confirmations Landing Page in your projects.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Components](#components)
3. [Responsive Design](#responsive-design)
4. [Theming](#theming)
5. [State Management](#state-management)
6. [Creating Widgets](#creating-widgets)
7. [i18n and RTL](#i18n-and-rtl)
8. [API Integration](#api-integration)
9. [Best Practices](#best-practices)

## Quick Start

### Installation

```bash
# Clone or install the template
npm install @universal/react-template

# Or use as a starting point
git clone <repo-url>
cd universal-react-template
npm install
```

### Running the Project

```bash
# Development mode
npm run dev

# Development with mock API
npm run dev:mock

# Build for production
npm run build

# Build as library
npm run build:lib
```

## Components

### Button

```tsx
import { Button } from '@universal/react-template';

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="link">Link</Button>
<Button variant="danger">Danger</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>
```

### Input

```tsx
import { Input } from '@universal/react-template';

// Basic
<Input 
  type="text"
  placeholder="Enter text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// With error
<Input 
  type="email"
  error={true}
  helperText="Invalid email"
/>

// Types
<Input type="text" />
<Input type="email" />
<Input type="password" />
<Input type="number" />
<Input type="search" />
```

### Select

```tsx
import { Select } from '@universal/react-template';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true },
];

// Basic select
<Select 
  options={options}
  value={selected}
  onChange={setSelected}
/>

// Searchable select
<Select 
  options={options}
  value={selected}
  onChange={setSelected}
  searchable
  placeholder="Search..."
/>
```

### Modal

```tsx
import { Modal, Button } from '@universal/react-template';

const [isOpen, setIsOpen] = useState(false);

<>
  <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
  
  <Modal
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="My Modal"
    size="md"
  >
    <p>Modal content goes here</p>
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </Modal>
</>
```

### Card

```tsx
import { Card } from '@universal/react-template';

// Variants
<Card variant="elevated">Elevated Card</Card>
<Card variant="outlined">Outlined Card</Card>
<Card variant="filled">Filled Card</Card>

// Padding
<Card padding="none">No Padding</Card>
<Card padding="sm">Small Padding</Card>
<Card padding="md">Medium Padding</Card>
<Card padding="lg">Large Padding</Card>

// Clickable
<Card onClick={() => console.log('clicked')}>
  Clickable Card
</Card>
```

### Grid

```tsx
import { Grid } from '@universal/react-template';

// Responsive columns
<Grid columns={{ mobile: 1, tablet: 2, desktop: 4 }} gap={16}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>

// Custom gaps
<Grid 
  columns={3} 
  rowGap={20} 
  columnGap={10}
>
  {/* items */}
</Grid>
```

### Flex

```tsx
import { Flex } from '@universal/react-template';

// Direction
<Flex direction="row">Horizontal</Flex>
<Flex direction="column">Vertical</Flex>

// Responsive direction
<Flex direction={{ mobile: 'column', desktop: 'row' }}>
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>

// Alignment
<Flex align="center" justify="between" gap={16}>
  <div>Left</div>
  <div>Right</div>
</Flex>
```

### Typography

```tsx
import { Typography } from '@universal/react-template';

// Variants
<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="body1">Body text</Typography>
<Typography variant="caption">Caption</Typography>

// Responsive variant
<Typography variant={{ mobile: 'h4', desktop: 'h2' }}>
  Responsive Heading
</Typography>

// Colors
<Typography color="primary">Primary</Typography>
<Typography color="error">Error</Typography>
<Typography color="text-secondary">Secondary Text</Typography>

// Alignment
<Typography align="center">Centered</Typography>
<Typography align="right">Right aligned</Typography>
```

### FormField

```tsx
import { FormField, Input } from '@universal/react-template';

<FormField 
  label="Email Address"
  error={errors.email}
  required
  htmlFor="email"
>
  <Input 
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={!!errors.email}
  />
</FormField>
```

### LoadingSpinner

```tsx
import { LoadingSpinner } from '@universal/react-template';

// Sizes
<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />

// Colors
<LoadingSpinner color="primary" />
<LoadingSpinner color="secondary" />
<LoadingSpinner color="white" />

// Centered
<LoadingSpinner centered />
```

### ErrorBoundary

```tsx
import { ErrorBoundary } from '@universal/react-template';

<ErrorBoundary 
  fallback={<div>Custom error UI</div>}
  onError={(error, errorInfo) => {
    console.error('Error caught:', error, errorInfo);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

## Responsive Design

### Using Responsive Hooks

```tsx
import { 
  useBreakpoint, 
  useIsMobile, 
  useIsTablet, 
  useIsDesktop,
  useWindowSize 
} from '@universal/react-template';

function MyComponent() {
  const breakpoint = useBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  const isMobile = useIsMobile();     // boolean
  const isTablet = useIsTablet();     // boolean
  const isDesktop = useIsDesktop();   // boolean
  const { width, height } = useWindowSize();

  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

### Responsive Props

```tsx
// Grid columns
<Grid columns={{ mobile: 1, tablet: 2, desktop: 4 }} />

// Flex direction
<Flex direction={{ mobile: 'column', desktop: 'row' }} />

// Typography variant
<Typography variant={{ mobile: 'h4', desktop: 'h2' }} />

// Gap
<Flex gap={{ mobile: 8, tablet: 16, desktop: 24 }} />
```

## Theming

### Using Theme

```tsx
import { useTheme } from '@universal/react-template';

function MyComponent() {
  const theme = useTheme();

  return (
    <div style={{
      color: theme.colors.primary[600],
      padding: theme.spacing[4],
      borderRadius: theme.borderRadius.md,
      boxShadow: theme.shadows.md,
    }}>
      Themed content
    </div>
  );
}
```

### Custom Theme

```tsx
import { ThemeProvider } from '@universal/react-template';

const customTheme = {
  colors: {
    primary: {
      500: '#9c27b0',
      600: '#8e24aa',
      700: '#7b1fa2',
    },
  },
  spacing: {
    4: '2rem', // Override default
  },
};

<ThemeProvider theme={customTheme}>
  <App />
</ThemeProvider>
```

### Accessing Theme Values

```tsx
const theme = useTheme();

// Colors
theme.colors.primary[600]
theme.colors.neutral[500]
theme.colors.success.main

// Spacing
theme.spacing[4]  // 1rem
theme.spacing[8]  // 2rem

// Typography
theme.typography.fontSize.lg
theme.typography.fontWeight.bold

// Border Radius
theme.borderRadius.md
theme.borderRadius.full

// Shadows
theme.shadows.md
theme.shadows.xl

// Breakpoints
theme.breakpoints.md  // 768
```

## State Management

### Using Redux Hooks

```tsx
import { useAppDispatch, useAppSelector } from '@universal/react-template';

function MyComponent() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.myData);

  const handleClick = () => {
    dispatch(myAction());
  };

  return <button onClick={handleClick}>Click</button>;
}
```

### Using RTK Query

```tsx
import { useGetUsersQuery } from './api';

function UserList() {
  const { data, isLoading, error } = useGetUsersQuery({
    page: 1,
    pageSize: 10,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error!</div>;

  return (
    <div>
      {data?.users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

## Creating Widgets

### Widget Structure

```
MyWidget/
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
├── MyWidget.tsx
└── index.ts
```

### Example Widget

```typescript
// types/index.ts
export interface MyData {
  id: string;
  name: string;
}

// MyWidgetApi.ts
import { baseApi } from '@store/baseApi';

export const myWidgetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getData: builder.query<MyData[], void>({
      query: () => '/data',
      providesTags: ['Data'],
    }),
  }),
});

export const { useGetDataQuery } = myWidgetApi;

// MyWidgetStoreSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedId: null as string | null,
};

export const myWidgetSlice = createSlice({
  name: 'myWidget',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const { setSelected } = myWidgetSlice.actions;
export default myWidgetSlice.reducer;

// MyWidget.tsx
import React from 'react';
import { useGetDataQuery } from './MyWidgetApi';

export const MyWidget: React.FC = () => {
  const { data, isLoading } = useGetDataQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data?.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
```

## i18n and RTL

### Using Translations

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
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

### Adding Translations

```json
// locales/he/common.json
{
  "myFeature": {
    "title": "כותרת",
    "description": "תיאור"
  }
}

// locales/en/common.json
{
  "myFeature": {
    "title": "Title",
    "description": "Description"
  }
}
```

### RTL Support

Components automatically support RTL when language is Hebrew:

```tsx
// Automatically RTL-aware
<Flex direction="row">
  <div>Start</div>
  <div>End</div>
</Flex>

// Use logical properties in custom styles
<div style={{
  marginInlineStart: '1rem',  // margin-left in LTR, margin-right in RTL
  paddingInlineEnd: '1rem',   // padding-right in LTR, padding-left in RTL
}}>
```

## API Integration

### Setting Up API

```typescript
// .env
VITE_API_BASE_URL=https://api.example.com

// Create API slice
import { baseApi } from '@store/baseApi';

export const myApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => '/items',
    }),
    createItem: builder.mutation({
      query: (item) => ({
        url: '/items',
        method: 'POST',
        body: item,
      }),
    }),
  }),
});
```

### Using Mock Server

```bash
# Start with mocks
npm run dev:mock
```

```typescript
// src/mocks/handlers/myHandlers.ts
import { http, HttpResponse } from 'msw';

export const myHandlers = [
  http.get('/api/items', () => {
    return HttpResponse.json([
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ]);
  }),
];
```

## Best Practices

### 1. Component Organization

```tsx
// ✅ Good: Small, focused components
const UserCard = ({ user }) => (
  <Card>
    <Typography>{user.name}</Typography>
  </Card>
);

// ❌ Bad: Large, monolithic components
const UserPage = () => {
  // 500 lines of code...
};
```

### 2. Type Safety

```tsx
// ✅ Good: Fully typed
interface Props {
  name: string;
  age: number;
}

const Component: React.FC<Props> = ({ name, age }) => {
  // ...
};

// ❌ Bad: Using any
const Component = ({ data }: { data: any }) => {
  // ...
};
```

### 3. State Management

```tsx
// ✅ Good: Minimal state
const [userId, setUserId] = useState<string | null>(null);

// ❌ Bad: Duplicating server data
const [users, setUsers] = useState([]);
// Use RTK Query instead
```

### 4. Performance

```tsx
// ✅ Good: Memoization
const expensiveValue = useMemo(() => {
  return computeExpensive(data);
}, [data]);

// ✅ Good: Callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### 5. Accessibility

```tsx
// ✅ Good: Accessible
<button 
  aria-label="Close modal"
  onClick={onClose}
>
  ×
</button>

// ✅ Good: Semantic HTML
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>
```

## Troubleshooting

### Common Issues

**Types not found**
```bash
npm install --save-dev @types/react @types/react-dom
```

**Theme not applying**
```tsx
// Make sure ThemeProvider wraps your app
<ThemeProvider>
  <App />
</ThemeProvider>
```

**RTL not working**
```tsx
// Check i18n is initialized
import './locales/i18n';
```

**Mock server not starting**
```bash
# Check .env file
VITE_USE_MOCK=true

# Initialize MSW
npx msw init public/ --save
```

## Next Steps

- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture
- Explore example widgets in `src/widgets/`
- Check component demos in `src/pages/HomePage.tsx`
- Join our community for support

---

Happy coding! 🚀

