# 🧪 Testing Guide

Complete guide for testing in the Arrival Confirmations Landing Page.

---

## 📦 Testing Stack

- **Vitest** - Fast unit test framework
- **React Testing Library** - Test React components
- **@testing-library/user-event** - Simulate user interactions
- **@testing-library/jest-dom** - Custom matchers
- **jsdom** - DOM implementation

---

## 🚀 Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

---

## 📁 Test File Structure

```
src/
├── hooks/
│   ├── useDebounce.ts
│   └── __tests__/
│       └── useDebounce.test.ts
├── components/
│   └── base/
│       └── Button/
│           ├── Button.tsx
│           └── __tests__/
│               └── Button.test.tsx
└── test/
    ├── setup.ts          # Test setup
    ├── test-utils.tsx    # Custom render utilities
    └── index.ts          # Exports
```

---

## 🎯 Writing Tests

### Testing Hooks

```typescript
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });

    // Value should not change immediately
    expect(result.current).toBe('initial');

    // Wait for debounce
    await waitFor(
      () => {
        expect(result.current).toBe('updated');
      },
      { timeout: 600 }
    );
  });
});
```

### Testing Components

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@test';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Testing with Providers

Use the custom `render` function from `@test`:

```typescript
import { render, screen } from '@test';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('should render with providers', () => {
    render(<MyComponent />);
    // Component has access to Redux, Theme, i18n
  });
});
```

### Testing with Custom Store

```typescript
import { render, createTestStore } from '@test';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('should render with custom store state', () => {
    const store = createTestStore({
      // preloaded state
    });

    render(<MyComponent />, { store });
  });
});
```

---

## 🎭 Common Testing Patterns

### User Interactions

```typescript
import userEvent from '@testing-library/user-event';

it('should handle user input', async () => {
  const user = userEvent.setup();
  render(<Input />);

  await user.type(screen.getByRole('textbox'), 'Hello');
  expect(screen.getByRole('textbox')).toHaveValue('Hello');
});
```

### Async Operations

```typescript
import { waitFor } from '@testing-library/react';

it('should load data', async () => {
  render(<DataComponent />);

  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

### Mocking Functions

```typescript
import { vi } from 'vitest';

it('should call callback', () => {
  const callback = vi.fn();
  render(<Button onClick={callback}>Click</Button>);

  fireEvent.click(screen.getByRole('button'));
  expect(callback).toHaveBeenCalled();
});
```

### Testing Errors

```typescript
it('should show error message', () => {
  render(<Input error helperText="Error message" />);
  expect(screen.getByText('Error message')).toBeInTheDocument();
});
```

---

## 🔍 Queries

### Recommended Query Priority

1. **getByRole** - Most accessible
2. **getByLabelText** - For form fields
3. **getByPlaceholderText** - For inputs
4. **getByText** - For non-interactive elements
5. **getByTestId** - Last resort

```typescript
// ✅ Good
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText('Email');
screen.getByText('Welcome');

// ❌ Avoid
screen.getByTestId('submit-button');
```

---

## 🎯 Testing Best Practices

### 1. Test User Behavior, Not Implementation

```typescript
// ❌ Bad - testing implementation
expect(component.state.isOpen).toBe(true);

// ✅ Good - testing behavior
expect(screen.getByRole('dialog')).toBeVisible();
```

### 2. Use Accessible Queries

```typescript
// ❌ Bad
screen.getByTestId('button');

// ✅ Good
screen.getByRole('button', { name: /submit/i });
```

### 3. Async Tests

```typescript
// ✅ Use waitFor for async operations
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});

// ✅ Use findBy queries (built-in waitFor)
expect(await screen.findByText('Loaded')).toBeInTheDocument();
```

### 4. Clean Up

```typescript
// Cleanup is automatic with @testing-library/react
// But if you need manual cleanup:
afterEach(() => {
  cleanup();
});
```

---

## 📊 Coverage

### Running Coverage

```bash
npm run test:coverage
```

### Coverage Reports

Coverage reports are generated in `coverage/` directory:
- `coverage/index.html` - HTML report
- `coverage/coverage-final.json` - JSON report

### Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

---

## 🧩 Testing Utilities

### Custom Render

Located in `src/test/test-utils.tsx`:

```typescript
import { render } from '@test';

// Automatically wraps with:
// - Redux Provider
// - ThemeProvider
// - I18nextProvider
```

### Test Setup

Located in `src/test/setup.ts`:

- Extends Vitest matchers with jest-dom
- Mocks window.matchMedia
- Mocks IntersectionObserver
- Mocks localStorage/sessionStorage

---

## 🎨 Testing Components

### Button Component

```typescript
describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles variants', () => {
    render(<Button variant="primary">Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--primary');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Input Component

```typescript
describe('Input', () => {
  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input />);

    await user.type(screen.getByRole('textbox'), 'test');
    expect(screen.getByRole('textbox')).toHaveValue('test');
  });

  it('shows error state', () => {
    render(<Input error helperText="Error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
```

### Modal Component

```typescript
describe('Modal', () => {
  it('renders when open', () => {
    render(
      <Modal isOpen onClose={() => {}}>
        Content
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on escape key', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal isOpen onClose={onClose}>
        Content
      </Modal>
    );

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});
```

---

## 🎣 Testing Hooks

### useDebounce

```typescript
describe('useDebounce', () => {
  it('debounces value', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });

    await waitFor(() => {
      expect(result.current).toBe('updated');
    }, { timeout: 600 });
  });
});
```

### useToggle

```typescript
describe('useToggle', () => {
  it('toggles value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1].toggle();
    });

    expect(result.current[0]).toBe(true);
  });
});
```

### useLocalStorage

```typescript
describe('useLocalStorage', () => {
  it('stores value', () => {
    const { result } = renderHook(() => 
      useLocalStorage('key', 'initial')
    );

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
  });
});
```

---

## 🚨 Common Issues

### Issue: "Cannot find module '@test'"

**Solution**: Make sure tsconfig.json includes test path alias:

```json
{
  "paths": {
    "@test": ["./src/test"]
  }
}
```

### Issue: "window.matchMedia is not a function"

**Solution**: Already mocked in `src/test/setup.ts`

### Issue: "IntersectionObserver is not defined"

**Solution**: Already mocked in `src/test/setup.ts`

### Issue: "localStorage is not defined"

**Solution**: Already mocked in `src/test/setup.ts`

---

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## ✅ Testing Checklist

- [ ] Test renders correctly
- [ ] Test user interactions
- [ ] Test error states
- [ ] Test loading states
- [ ] Test edge cases
- [ ] Test accessibility
- [ ] Achieve > 80% coverage
- [ ] Tests are fast (< 100ms each)
- [ ] Tests are isolated
- [ ] Tests are readable

---

**Last Updated**: November 2025

