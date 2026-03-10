# ⚡ Quick Start Guide

Get up and running with the Arrival Confirmations Landing Page in 5 minutes!

## 🚀 Installation

```bash
# Clone the repository
git clone <repo-url>
cd universal-react-template

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your app!

## 📦 Using as a Package

```bash
# Install in your project
npm install @universal/react-template
```

```tsx
// Import and use
import { Button, Grid, ThemeProvider } from '@universal/react-template';

function App() {
  return (
    <ThemeProvider>
      <Grid columns={{ mobile: 1, desktop: 3 }} gap={16}>
        <Button variant="primary">Click Me</Button>
      </Grid>
    </ThemeProvider>
  );
}
```

## 🎯 Key Features in 30 Seconds

### 1. Responsive Components
```tsx
<Grid columns={{ mobile: 1, tablet: 2, desktop: 4 }} gap={16}>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
</Grid>
```

### 2. Themed Components
```tsx
const theme = useTheme();
<div style={{ color: theme.colors.primary[600] }}>
  Themed content
</div>
```

### 3. i18n & RTL
```tsx
const { t } = useTranslation();
<Typography>{t('app.title')}</Typography>
```

### 4. State Management
```tsx
const { data, isLoading } = useGetUsersQuery();
const dispatch = useAppDispatch();
```

## 📂 Project Structure

```
src/
├── components/base/     # Reusable components
├── constants/           # Theme & constants
├── hooks/              # Custom hooks
├── locales/            # Translations
├── store/              # Redux store
├── widgets/            # Feature modules
├── pages/              # Pages
└── mocks/              # Mock API
```

## 🎨 Available Components

- **Button** - Multiple variants (primary, secondary, link, danger)
- **Input/Textarea** - Form inputs with validation
- **Select** - Searchable dropdown
- **Modal** - Accessible dialog
- **Card** - Container component
- **Grid/Flex** - Layout components
- **Typography** - Text component
- **FormField** - Form wrapper
- **LoadingSpinner** - Loading indicator
- **ErrorBoundary** - Error handling

## 🔧 Common Tasks

### Add a New Page
```tsx
// src/pages/NewPage.tsx
export const NewPage = () => {
  return <div>New Page</div>;
};
```

### Create a Widget
```bash
src/widgets/MyWidget/
├── components/
├── hooks/
├── types/
├── MyWidgetApi.ts
├── MyWidgetStoreSlice.ts
└── MyWidget.tsx
```

### Customize Theme
```tsx
<ThemeProvider theme={{
  colors: {
    primary: { 600: '#your-color' }
  }
}}>
  <App />
</ThemeProvider>
```

### Add Translation
```json
// locales/he/common.json
{
  "myKey": "ערך בעברית"
}

// locales/en/common.json
{
  "myKey": "Value in English"
}
```

## 🧪 Development

```bash
# Development
npm run dev

# With mock API
npm run dev:mock

# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

## 📱 Responsive Hooks

```tsx
const isMobile = useIsMobile();      // < 768px
const isTablet = useIsTablet();      // 768px - 991px
const isDesktop = useIsDesktop();    // >= 992px
const breakpoint = useBreakpoint();  // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

## 🌐 i18n

```tsx
const { t, i18n } = useTranslation();

// Use translation
<h1>{t('app.title')}</h1>

// Change language
i18n.changeLanguage('en');
i18n.changeLanguage('he');
```

## 🔌 API Integration

```tsx
// Define endpoint
export const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
  }),
});

// Use in component
const { data, isLoading } = useGetUsersQuery();
```

## 🎭 Mock Server

```bash
# Enable in .env
VITE_USE_MOCK=true

# Start dev server
npm run dev:mock
```

## 📚 Learn More

- [README.md](./README.md) - Full documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture details
- [USAGE_GUIDE.md](./USAGE_GUIDE.md) - Detailed usage guide

## 🆘 Need Help?

Common issues:

**Port already in use?**
```bash
# Change port in vite.config.ts or
PORT=3001 npm run dev
```

**Types not found?**
```bash
npm install --save-dev @types/react @types/react-dom
```

**Theme not applying?**
```tsx
// Wrap app in ThemeProvider
<ThemeProvider><App /></ThemeProvider>
```

## 🎉 You're Ready!

Start building amazing applications with:
- ✅ Full TypeScript support
- ✅ Responsive design
- ✅ RTL support
- ✅ State management
- ✅ API integration
- ✅ Mock server
- ✅ i18n

Happy coding! 🚀

