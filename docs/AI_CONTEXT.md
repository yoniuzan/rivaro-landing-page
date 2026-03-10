# 🤖 AI Context - Read This First!

> **Important**: This file is a comprehensive guide for AI assistants working on this project. Read this before making any changes!

---

## 📋 Project Overview

**Arrival Confirmations Landing Page** - A production-ready, fully modular React + TypeScript project.

### Key Stats
- **Components**: 14 base components (including Toast)
- **Hooks**: 16 custom hooks + useToast
- **Languages**: Hebrew (default, RTL), English
- **State Management**: Redux Toolkit + RTK Query
- **Type Safety**: TypeScript strict mode, NO `any` types
- **Tests**: 39 tests, all passing
- **Lines of Code**: ~8000+

---

## 🎯 Before Writing ANY Code

### 1. ✅ Check Available Hooks First!

**ALWAYS check if a hook exists before writing custom logic!**

See full documentation: [HOOKS_GUIDE.md](./HOOKS_GUIDE.md)

#### Quick Hook Reference

| Need | Use This Hook | Import |
|------|---------------|--------|
| Debounce input/search | `useDebounce(value, delay)` | `@hooks` |
| Toggle boolean state | `useToggle(initial)` | `@hooks` |
| Previous value | `usePrevious(value)` | `@hooks` |
| Persist data (cross-session) | `useLocalStorage(key, initial)` | `@hooks` |
| Persist data (session only) | `useSessionStorage(key, initial)` | `@hooks` |
| Click outside detection | `useClickOutside(handler)` | `@hooks` |
| Copy to clipboard | `useCopyToClipboard()` | `@hooks` |
| Element visibility | `useOnScreen(options)` | `@hooks` |
| Key press detection | `useKeyPress(key)` | `@hooks` |
| Async operations | `useAsync(asyncFn)` | `@hooks` |
| Current breakpoint | `useBreakpoint()` | `@hooks` |
| Is mobile? | `useIsMobile()` | `@hooks` |
| Is tablet? | `useIsTablet()` | `@hooks` |
| Is desktop? | `useIsDesktop()` | `@hooks` |
| Window size | `useWindowSize()` | `@hooks` |
| Custom media query | `useMediaQuery(query)` | `@hooks` |

### 2. ✅ Use Existing Base Components

**NEVER recreate these components!** They already exist and are fully typed.

```typescript
import { 
  Button,      // variants: primary, secondary, link, danger
  Input,       // with error states
  Textarea,    // with resize options
  Select,      // native or searchable
  Modal,       // with backdrop, escape key, click outside
  Card,        // variants: elevated, outlined, filled
  Flex,        // responsive layout
  Grid,        // responsive columns
  Stack,       // vertical/horizontal with dividers
  Typography,  // responsive text variants
  FormField,   // wrapper with label + error
  LoadingSpinner,
  ErrorBoundary,
  Toast,       // notification system
  ToastProvider, // toast context provider
  useToast     // toast hook
} from '@components/base';
```

### 3. ✅ Use Theme Constants

**NEVER hard-code colors, spacing, or breakpoints!**

```typescript
import { theme } from '@constants/theme';

// ✅ Good
backgroundColor: theme.colors.primary[600]
padding: theme.spacing[4]
borderRadius: theme.borderRadius.md

// ❌ Bad
backgroundColor: '#2196f3'
padding: '16px'
borderRadius: '6px'
```

### 4. ✅ Use Responsive Utilities

```typescript
import { getResponsiveValue, type ResponsiveValue } from '@utils/responsive';

// Responsive props
interface MyProps {
  columns?: ResponsiveValue<number>;
  gap?: ResponsiveValue<number>;
}

// Get current value
const columns = getResponsiveValue(props.columns, width);
```

---

## 🏗️ Architecture Patterns

### Component Structure

```typescript
// ✅ Correct pattern for base components
import React from 'react';
import { useTheme } from '@components/useTheme';
import styles from './Component.module.css';

export interface ComponentProps {
  // Props with types
}

export const Component: React.FC<ComponentProps> = (props) => {
  const theme = useTheme();
  
  return (
    <div 
      className={styles.component}
      style={{
        '--custom-var': theme.colors.primary[500],
      } as React.CSSProperties}
    >
      {/* Content */}
    </div>
  );
};
```

### Widget Structure

When creating a new widget, follow this exact structure:

```
WidgetName/
├── components/          # Widget-specific components
│   ├── WidgetCard.tsx
│   └── index.ts
├── hooks/              # Widget-specific hooks
│   ├── useWidget.ts
│   └── index.ts
├── types/              # TypeScript types
│   └── index.ts
├── WidgetApi.ts        # RTK Query endpoints
├── WidgetStoreSlice.ts # Redux slice
├── WidgetSelectors.ts  # Memoized selectors
├── Widget.helper.ts    # Pure helper functions
├── Widget.constant.ts  # Constants
├── WidgetStoreConfig.ts # Store integration
├── Widget.tsx          # Main component
├── Widget.module.css   # Styles
└── index.ts            # Exports
```

### RTK Query Pattern

```typescript
import { baseApi } from '@store/baseApi';

export const widgetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<ItemResponse, ItemParams>({
      query: (params) => ({
        url: '/items',
        params,
      }),
      providesTags: ['Item'],
    }),
    createItem: builder.mutation<Item, CreateItemDto>({
      query: (body) => ({
        url: '/items',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Item'],
    }),
  }),
});

export const { useGetItemsQuery, useCreateItemMutation } = widgetApi;
```

---

## 🚨 Critical Rules

### Type Safety

1. **NO `any` types** - Use proper types or `unknown`
2. **Explicit parameter types** - Always type function parameters
3. **Type imports** - Use `import type { }` for types
4. **Run type-check** - After ANY change: `npm run type-check`

```typescript
// ❌ Bad
function handler(event) { }
const data: any = response;

// ✅ Good
function handler(event: React.MouseEvent<HTMLButtonElement>) { }
const data: User = response;
```

### Imports

```typescript
// ✅ Use path aliases
import { Button } from '@components/base';
import { useDebounce } from '@hooks';
import { theme } from '@constants/theme';
import { getResponsiveValue } from '@utils/responsive';

// ❌ Don't use relative paths for cross-directory imports
import { Button } from '../../../components/base/Button';
```

### i18n

```typescript
// ✅ All visible text via translations
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
return <h1>{t('app.title')}</h1>;

// ❌ No hard-coded strings
return <h1>Welcome</h1>;
```

### RTL Support

```css
/* ✅ Use logical properties */
margin-inline-start: 16px;
padding-inline-end: 8px;

/* ❌ Avoid directional properties */
margin-left: 16px;
padding-right: 8px;
```

---

## 💡 Common Patterns & Examples

### Search with Debounce

```typescript
import { useState, useEffect } from 'react';
import { useDebounce } from '@hooks';

const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 500);

useEffect(() => {
  if (debouncedSearch) {
    // API call
  }
}, [debouncedSearch]);
```

### Modal with Hooks

```typescript
import { useToggle, useKeyPress } from '@hooks';
import { Modal } from '@components/base';

const [isOpen, { setTrue, setFalse }] = useToggle(false);
const escapePressed = useKeyPress('Escape');

useEffect(() => {
  if (escapePressed && isOpen) setFalse();
}, [escapePressed, isOpen]);

return (
  <>
    <Button onClick={setTrue}>Open</Button>
    <Modal isOpen={isOpen} onClose={setFalse}>
      Content
    </Modal>
  </>
);
```

### Form with Persistence

```typescript
import { useLocalStorage } from '@hooks';
import { Input, FormField } from '@components/base';

const [formData, setFormData] = useLocalStorage('formDraft', {
  name: '',
  email: '',
});

return (
  <FormField label="Name">
    <Input 
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    />
  </FormField>
);
```

### Lazy Loading

```typescript
import { useOnScreen } from '@hooks';

const { ref, isIntersecting } = useOnScreen<HTMLDivElement>({
  threshold: 0.5,
  freezeOnceVisible: true,
});

return (
  <div ref={ref}>
    {isIntersecting ? <HeavyComponent /> : <Placeholder />}
  </div>
);
```

### Responsive Layout

```typescript
import { Grid, Stack } from '@components/base';

<Grid 
  columns={{ mobile: 1, tablet: 2, desktop: 4 }}
  gap={{ mobile: 8, desktop: 16 }}
>
  <Card>Item 1</Card>
  <Card>Item 2</Card>
</Grid>

<Stack 
  direction={{ mobile: 'vertical', desktop: 'horizontal' }}
  spacing={16}
  align="center"
>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Stack>
```

---

## 📁 File Locations

### Quick Reference

| What | Where |
|------|-------|
| Base components | `src/components/base/` |
| Custom hooks | `src/hooks/` |
| Theme constants | `src/constants/theme.ts` |
| Responsive utils | `src/utils/responsive.ts` |
| Redux store | `src/store/` |
| RTK Query base | `src/store/baseApi.ts` |
| Widgets | `src/widgets/` |
| i18n translations | `src/locales/he/`, `src/locales/en/` |
| Mock handlers | `src/mocks/handlers/` |
| Type declarations | `src/types/` |

### Path Aliases

```typescript
@components/* → src/components/*
@hooks/*      → src/hooks/*
@utils/*      → src/utils/*
@constants/*  → src/constants/*
@store/*      → src/store/*
@widgets/*    → src/widgets/*
@pages/*      → src/pages/*
@locales/*    → src/locales/*
@mocks/*      → src/mocks/*
```

---

## 🔧 Development Workflow

### Before Committing

```bash
# 1. Type check (MUST pass with 0 errors)
npm run type-check

# 2. Lint
npm run lint

# 3. Test with mock server
npm run dev:mock
```

### When Adding New Features

1. **Check existing hooks** - Don't reinvent the wheel
2. **Use base components** - Don't create duplicates
3. **Follow widget structure** - If creating a widget
4. **Type everything** - No `any` types
5. **Use theme constants** - No hard-coded values
6. **Add translations** - No hard-coded strings
7. **Test responsive** - Mobile, tablet, desktop
8. **Run type-check** - Before committing

---

## 🎨 Component Enhancement Opportunities

When working with existing components, consider using these hooks:

### Button Component
- ✅ Already uses `useTheme`
- 💡 Could add `useKeyPress` for keyboard shortcuts
- 💡 Could add `useCopyToClipboard` for copy buttons

### Modal Component
- ✅ Already handles Escape key manually
- 💡 **Should use** `useKeyPress('Escape')` instead
- 💡 **Should use** `useClickOutside` instead of manual event listener
- 💡 Could add `useToggle` for internal state

### Select Component
- ✅ Already uses `useTheme`
- ✅ Already handles click outside manually
- 💡 **Should use** `useClickOutside` instead
- 💡 **Should use** `useDebounce` for search input
- 💡 Could add `useKeyPress` for arrow navigation

### Input Component
- ✅ Already uses `useTheme`
- 💡 Could add `useDebounce` prop for debounced onChange
- 💡 Could add `useCopyToClipboard` for copy functionality

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main documentation |
| `ARCHITECTURE.md` | Architecture deep dive |
| `USAGE_GUIDE.md` | Detailed usage examples |
| `QUICK_START.md` | 5-minute getting started |
| `HOOKS_GUIDE.md` | **Complete hooks documentation** ⭐ |
| `TYPE_SAFETY_GUIDELINES.md` | Type safety rules |
| `TROUBLESHOOTING.md` | Common issues & solutions |
| `IMPORT_EXAMPLE.md` | How to use as package |
| `PROJECT_SUMMARY.md` | Project statistics |
| `AI_CONTEXT.md` | **This file** - AI assistant guide |

---

## 🎯 Decision Tree

### When Adding New Logic

```
Need to add functionality?
│
├─ Is it a UI component?
│  ├─ Does base component exist? → Use it!
│  └─ No? → Create in src/components/base/
│
├─ Is it reusable logic?
│  ├─ Check hooks list → Hook exists? → Use it!
│  └─ No? → Create custom hook in src/hooks/
│
├─ Is it a feature/module?
│  └─ Create widget in src/widgets/
│
├─ Is it styling?
│  ├─ Color/spacing/etc? → Use theme constants!
│  └─ Responsive? → Use ResponsiveValue<T>
│
└─ Is it data fetching?
   └─ Use RTK Query with baseApi
```

---

## ⚡ Performance Tips

1. **Use memoization** - `useMemo`, `useCallback` for expensive operations
2. **Lazy load** - Use `useOnScreen` for heavy components
3. **Debounce inputs** - Use `useDebounce` for search/filters
4. **Optimize images** - Use `useOnScreen` for lazy loading
5. **Split code** - Use dynamic imports for large widgets

---

## 🚀 Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run dev:mock         # Start with mock server

# Type Safety
npm run type-check       # MUST pass before commit

# Build
npm run build            # Production build
npm run build:lib        # Library build

# Code Quality
npm run lint             # ESLint check
```

---

## 🎓 Learning Resources

- **Hooks**: Read `HOOKS_GUIDE.md` - 590 lines of examples!
- **Architecture**: Read `ARCHITECTURE.md`
- **Examples**: Check `src/widgets/UserList/` - complete widget example
- **Components**: Check `src/pages/HomePage.tsx` - component showcase

---

## ✅ Checklist for New Code

- [ ] Checked if hook exists before writing custom logic
- [ ] Used existing base components instead of creating new ones
- [ ] Used theme constants (no hard-coded values)
- [ ] Used path aliases (@hooks, @components, etc.)
- [ ] All parameters are typed (no `any`)
- [ ] All visible text uses translations
- [ ] Responsive design considered
- [ ] RTL support considered
- [ ] `npm run type-check` passes
- [ ] Tested on mobile/tablet/desktop

---

## 🎯 Summary

**The Golden Rules:**

1. 🎣 **Check hooks first** - 16 hooks available, use them!
2. 🧩 **Use base components** - 13 components ready to use
3. 🎨 **Use theme constants** - No hard-coded values
4. 📱 **Think responsive** - Mobile-first approach
5. 🔒 **Type everything** - Strict TypeScript, no `any`
6. 🌐 **Use translations** - No hard-coded strings
7. ✅ **Run type-check** - Before every commit

---

**Last Updated**: November 2025

**Version**: 1.0.0

**Maintained by**: AI Assistant & Development Team

---

> 💡 **Tip**: Keep this file open while coding. It will save you time and prevent mistakes!

