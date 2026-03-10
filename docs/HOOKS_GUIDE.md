# 🎣 Hooks Guide

Complete guide for all custom hooks in the Arrival Confirmations Landing Page.

---

## 📱 Responsive Hooks

### `useBreakpoint()`
Get current breakpoint based on window width.

```typescript
import { useBreakpoint } from '@hooks';

function MyComponent() {
  const breakpoint = useBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  
  return <div>Current breakpoint: {breakpoint}</div>;
}
```

### `useIsMobile()` / `useIsTablet()` / `useIsDesktop()`
Check current device type.

```typescript
import { useIsMobile, useIsTablet, useIsDesktop } from '@hooks';

function ResponsiveComponent() {
  const isMobile = useIsMobile();    // < 768px
  const isTablet = useIsTablet();    // 768px - 991px
  const isDesktop = useIsDesktop();  // >= 992px
  
  if (isMobile) return <MobileView />;
  if (isTablet) return <TabletView />;
  return <DesktopView />;
}
```

### `useWindowSize()`
Get current window dimensions.

```typescript
import { useWindowSize } from '@hooks';

function MyComponent() {
  const { width, height } = useWindowSize();
  
  return <div>Window: {width}x{height}</div>;
}
```

### `useMediaQuery()`
Match custom media queries.

```typescript
import { useMediaQuery } from '@hooks';

function MyComponent() {
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const isPrint = useMediaQuery('print');
  
  return <div>{isLandscape ? 'Landscape' : 'Portrait'}</div>;
}
```

---

## ⚡ Utility Hooks

### `useDebounce()`
Delay updating a value until after a specified delay.

```typescript
import { useState } from 'react';
import { useDebounce } from '@hooks';

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  // API call only triggers after user stops typing for 500ms
  useEffect(() => {
    if (debouncedSearch) {
      searchAPI(debouncedSearch);
    }
  }, [debouncedSearch]);
  
  return (
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

**Use Cases:**
- Search inputs
- Auto-save functionality
- API calls on user input
- Window resize handlers

### `useToggle()`
Manage boolean state with helper functions.

```typescript
import { useToggle } from '@hooks';

function ModalExample() {
  const [isOpen, { toggle, setTrue, setFalse, reset }] = useToggle(false);
  
  return (
    <>
      <button onClick={toggle}>Toggle Modal</button>
      <button onClick={setTrue}>Open Modal</button>
      <button onClick={setFalse}>Close Modal</button>
      
      {isOpen && <Modal onClose={setFalse}>Content</Modal>}
    </>
  );
}
```

**Use Cases:**
- Modals/Dialogs
- Dropdowns
- Accordions
- Any boolean state

### `usePrevious()`
Get the previous value of a variable.

```typescript
import { useState } from 'react';
import { usePrevious } from '@hooks';

function Counter() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Use Cases:**
- Comparing values
- Animations based on changes
- Undo functionality
- Tracking state history

---

## 💾 Storage Hooks

### `useLocalStorage()`
Sync state with localStorage (persists across sessions).

```typescript
import { useLocalStorage } from '@hooks';

function UserPreferences() {
  const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
  const [user, setUser] = useLocalStorage('user', { name: 'Guest' });
  
  return (
    <>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={removeTheme}>Reset Theme</button>
      
      <p>Current theme: {theme}</p>
      <p>User: {user.name}</p>
    </>
  );
}
```

**Features:**
- ✅ Syncs across tabs/windows
- ✅ Type-safe
- ✅ SSR-safe
- ✅ Includes remove function

**Use Cases:**
- User preferences
- Shopping cart
- Form drafts
- Authentication tokens

### `useSessionStorage()`
Sync state with sessionStorage (cleared when tab closes).

```typescript
import { useSessionStorage } from '@hooks';

function WizardForm() {
  const [step, setStep] = useSessionStorage('wizardStep', 1);
  const [formData, setFormData] = useSessionStorage('formData', {});
  
  return (
    <div>
      <p>Step {step} of 3</p>
      <button onClick={() => setStep(step + 1)}>Next</button>
    </div>
  );
}
```

**Use Cases:**
- Multi-step forms
- Temporary session data
- Tab-specific state
- Draft data

---

## 🎨 UI Hooks

### `useClickOutside()`
Detect clicks outside of an element.

```typescript
import { useClickOutside } from '@hooks';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });
  
  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && (
        <div className="dropdown-menu">
          <div>Option 1</div>
          <div>Option 2</div>
        </div>
      )}
    </div>
  );
}
```

**Use Cases:**
- Dropdowns
- Modals
- Popovers
- Context menus

### `useCopyToClipboard()`
Copy text to clipboard with success state.

```typescript
import { useCopyToClipboard } from '@hooks';

function CodeBlock({ code }: { code: string }) {
  const { copy, success } = useCopyToClipboard();
  
  return (
    <div>
      <pre>{code}</pre>
      <button onClick={() => copy(code)}>
        {success ? '✓ Copied!' : 'Copy'}
      </button>
    </div>
  );
}
```

**Use Cases:**
- Code snippets
- Share links
- Copy tokens/keys
- Copy formatted text

### `useOnScreen()`
Detect if element is visible on screen (Intersection Observer).

```typescript
import { useOnScreen } from '@hooks';

function LazyImage({ src }: { src: string }) {
  const { ref, isIntersecting } = useOnScreen<HTMLDivElement>({
    threshold: 0.5,
    freezeOnceVisible: true,
  });
  
  return (
    <div ref={ref}>
      {isIntersecting ? (
        <img src={src} alt="Lazy loaded" />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
```

**Options:**
- `threshold`: 0-1, how much of element must be visible
- `root`: Container element (default: viewport)
- `rootMargin`: Margin around root
- `freezeOnceVisible`: Stop observing once visible

**Use Cases:**
- Lazy loading images
- Infinite scroll
- Animations on scroll
- Analytics tracking

### `useKeyPress()`
Detect when a specific key is pressed.

```typescript
import { useKeyPress } from '@hooks';

function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const escapePressed = useKeyPress('Escape');
  const enterPressed = useKeyPress('Enter');
  
  useEffect(() => {
    if (escapePressed) setIsOpen(false);
  }, [escapePressed]);
  
  useEffect(() => {
    if (enterPressed && isOpen) handleSearch();
  }, [enterPressed, isOpen]);
  
  return <Modal isOpen={isOpen}>...</Modal>;
}
```

**Common Keys:**
- `'Enter'`
- `'Escape'`
- `'ArrowUp'` / `'ArrowDown'` / `'ArrowLeft'` / `'ArrowRight'`
- `'Tab'`
- `' '` (Space)

**Use Cases:**
- Keyboard shortcuts
- Modal close on Escape
- Form submit on Enter
- Navigation with arrows

---

## 🔄 Async Hooks

### `useAsync()`
Handle async operations with loading and error states.

```typescript
import { useAsync } from '@hooks';

function UserProfile({ userId }: { userId: string }) {
  const { data, loading, error, execute } = useAsync(
    async (id: string) => {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    }
  );
  
  useEffect(() => {
    execute(userId);
  }, [userId]);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;
  
  return <div>{data.name}</div>;
}
```

**Features:**
- ✅ Loading state
- ✅ Error handling
- ✅ Manual execution
- ✅ Reset function

**Use Cases:**
- API calls
- File uploads
- Form submissions
- Any async operation

---

## 🎯 Best Practices

### 1. Combine Hooks for Complex Logic

```typescript
function SearchWithDebounce() {
  const [search, setSearch] = useLocalStorage('search', '');
  const debouncedSearch = useDebounce(search, 500);
  const { data, loading } = useAsync(
    async (term: string) => searchAPI(term)
  );
  
  useEffect(() => {
    if (debouncedSearch) {
      execute(debouncedSearch);
    }
  }, [debouncedSearch]);
  
  return <SearchResults data={data} loading={loading} />;
}
```

### 2. Extract Custom Hooks

```typescript
// Custom hook combining multiple hooks
function useModal() {
  const [isOpen, { setTrue, setFalse }] = useToggle(false);
  const escapePressed = useKeyPress('Escape');
  
  useEffect(() => {
    if (escapePressed) setFalse();
  }, [escapePressed]);
  
  return { isOpen, open: setTrue, close: setFalse };
}

// Usage
function MyComponent() {
  const modal = useModal();
  
  return (
    <>
      <button onClick={modal.open}>Open</button>
      <Modal isOpen={modal.isOpen} onClose={modal.close} />
    </>
  );
}
```

### 3. Type Safety

```typescript
// Always provide types for better IntelliSense
interface User {
  id: string;
  name: string;
}

const [user, setUser] = useLocalStorage<User>('user', { id: '', name: '' });
const debouncedValue = useDebounce<string>(searchTerm, 500);
```

### 4. Cleanup

Most hooks handle cleanup automatically, but be aware:

```typescript
// ✅ Good - cleanup handled
const debouncedValue = useDebounce(value, 500);

// ✅ Good - cleanup in useEffect
useEffect(() => {
  const { data } = execute();
  return () => {
    // cleanup if needed
  };
}, []);
```

---

## 📊 Performance Tips

### 1. Use Debounce for Expensive Operations

```typescript
// ❌ Bad - API call on every keystroke
onChange={(e) => searchAPI(e.target.value)}

// ✅ Good - Debounced API call
const debouncedSearch = useDebounce(searchTerm, 500);
useEffect(() => searchAPI(debouncedSearch), [debouncedSearch]);
```

### 2. Freeze Intersection Observer

```typescript
// ✅ Good - Stop observing once visible
const { ref, isIntersecting } = useOnScreen({
  freezeOnceVisible: true, // Performance optimization
});
```

### 3. Memoize Async Functions

```typescript
const fetchUser = useCallback(
  async (id: string) => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  },
  []
);

const { data, loading } = useAsync(fetchUser);
```

---

## 🔗 Hook Combinations

### Search with Debounce + LocalStorage

```typescript
function SmartSearch() {
  const [search, setSearch] = useLocalStorage('searchHistory', '');
  const debouncedSearch = useDebounce(search, 500);
  
  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
}
```

### Modal with Click Outside + Escape Key

```typescript
function SmartModal() {
  const [isOpen, { setTrue, setFalse }] = useToggle();
  const ref = useClickOutside<HTMLDivElement>(setFalse, isOpen);
  const escapePressed = useKeyPress('Escape');
  
  useEffect(() => {
    if (escapePressed && isOpen) setFalse();
  }, [escapePressed, isOpen]);
  
  return <div ref={ref}>Modal content</div>;
}
```

### Lazy Load with Intersection Observer

```typescript
function LazyComponent() {
  const { ref, isIntersecting } = useOnScreen({ threshold: 0.1 });
  const { data, loading, execute } = useAsync(fetchData);
  
  useEffect(() => {
    if (isIntersecting && !data) {
      execute();
    }
  }, [isIntersecting]);
  
  return <div ref={ref}>{loading ? 'Loading...' : data}</div>;
}
```

---

## ✅ Summary

**Total Hooks: 16**

- **Responsive (6)**: useBreakpoint, useWindowSize, useIsMobile, useIsTablet, useIsDesktop, useMediaQuery
- **Utility (3)**: useDebounce, useToggle, usePrevious
- **Storage (2)**: useLocalStorage, useSessionStorage
- **UI (4)**: useClickOutside, useCopyToClipboard, useOnScreen, useKeyPress
- **Async (1)**: useAsync

All hooks are:
- ✅ Fully typed with TypeScript
- ✅ SSR-safe
- ✅ Handle cleanup automatically
- ✅ Follow React best practices
- ✅ Production-ready

---

Last Updated: November 2025

