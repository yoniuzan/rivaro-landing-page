# 🍞 Toast Notification Guide

Complete guide for using the Toast notification system in the Arrival Confirmations Landing Page.

---

## 📦 What's Included

- **Toast** - Individual toast notification component
- **ToastProvider** - Context provider for toast management
- **ToastContainer** - Container for displaying toasts
- **useToast** - Hook for showing toasts

---

## 🚀 Quick Start

### 1. Wrap Your App with ToastProvider

```typescript
import { ToastProvider } from '@components/base';

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}
```

### 2. Use the useToast Hook

```typescript
import { useToast } from '@components/base';

function MyComponent() {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleSuccess = () => {
    showSuccess('Operation completed successfully!');
  };

  const handleError = () => {
    showError('Something went wrong!');
  };

  return (
    <>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </>
  );
}
```

---

## 🎨 Toast Variants

### Success Toast
```typescript
const { showSuccess } = useToast();

showSuccess('User created successfully!');
showSuccess('File uploaded!', { duration: 5000 });
```

### Error Toast
```typescript
const { showError } = useToast();

showError('Failed to save data');
showError('Network error occurred', { duration: 0 }); // No auto-dismiss
```

### Warning Toast
```typescript
const { showWarning } = useToast();

showWarning('This action cannot be undone');
showWarning('Low disk space', { position: 'bottom-center' });
```

### Info Toast
```typescript
const { showInfo } = useToast();

showInfo('New update available');
showInfo('Tip: Use Ctrl+S to save', { duration: 10000 });
```

---

## ⚙️ Configuration Options

### Toast Options

```typescript
interface ToastOptions {
  variant?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;  // milliseconds, 0 = no auto-dismiss
  position?: 'top-left' | 'top-center' | 'top-right' | 
             'bottom-left' | 'bottom-center' | 'bottom-right';
}
```

### Custom Toast

```typescript
const { showToast } = useToast();

showToast('Custom message', {
  variant: 'warning',
  duration: 5000,
  position: 'bottom-center'
});
```

---

## 📍 Position Options

### Top Positions
```typescript
showSuccess('Top Left', { position: 'top-left' });
showSuccess('Top Center', { position: 'top-center' });
showSuccess('Top Right', { position: 'top-right' });
```

### Bottom Positions
```typescript
showSuccess('Bottom Left', { position: 'bottom-left' });
showSuccess('Bottom Center', { position: 'bottom-center' });
showSuccess('Bottom Right', { position: 'bottom-right' });
```

---

## 🎯 Common Use Cases

### Form Submission

```typescript
function MyForm() {
  const { showSuccess, showError } = useToast();

  const handleSubmit = async (data: FormData) => {
    try {
      await api.submitForm(data);
      showSuccess('Form submitted successfully!');
    } catch (error) {
      showError('Failed to submit form. Please try again.');
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### API Calls

```typescript
function DataFetcher() {
  const { showError, showInfo } = useToast();

  const fetchData = async () => {
    showInfo('Loading data...');
    
    try {
      const data = await api.getData();
      // Process data
    } catch (error) {
      showError('Failed to load data');
    }
  };

  return <button onClick={fetchData}>Fetch Data</button>;
}
```

### File Upload

```typescript
function FileUploader() {
  const { showSuccess, showError, showInfo } = useToast();

  const handleUpload = async (file: File) => {
    showInfo('Uploading file...');

    try {
      await uploadFile(file);
      showSuccess(`${file.name} uploaded successfully!`);
    } catch (error) {
      showError(`Failed to upload ${file.name}`);
    }
  };

  return <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />;
}
```

### Copy to Clipboard

```typescript
function CopyButton({ text }: { text: string }) {
  const { showSuccess } = useToast();
  const { copy } = useCopyToClipboard();

  const handleCopy = async () => {
    await copy(text);
    showSuccess('Copied to clipboard!');
  };

  return <button onClick={handleCopy}>Copy</button>;
}
```

### Delete Confirmation

```typescript
function DeleteButton({ itemId }: { itemId: string }) {
  const { showSuccess, showWarning } = useToast();

  const handleDelete = async () => {
    showWarning('Deleting item...');
    
    try {
      await api.deleteItem(itemId);
      showSuccess('Item deleted successfully');
    } catch (error) {
      showError('Failed to delete item');
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

---

## 🔧 Advanced Usage

### Provider Configuration

```typescript
<ToastProvider 
  defaultPosition="top-right"
  defaultDuration={3000}
>
  <App />
</ToastProvider>
```

### Manual Toast Management

```typescript
const { closeToast, clearAll } = useToast();

// Close specific toast
closeToast('toast-id');

// Clear all toasts
clearAll();
```

### No Auto-Dismiss

```typescript
// Toast stays until manually closed
showError('Critical error!', { duration: 0 });
```

### Long Duration

```typescript
// Show for 10 seconds
showInfo('Read this carefully', { duration: 10000 });
```

---

## 🎨 Styling

### Theme Integration

Toasts automatically use your theme colors:

```typescript
// Uses theme.colors.success.main
showSuccess('Success!');

// Uses theme.colors.error.main
showError('Error!');

// Uses theme.colors.warning.main
showWarning('Warning!');

// Uses theme.colors.info.main
showInfo('Info!');
```

### Custom Styling

Toasts use CSS Modules. To customize:

1. Override CSS variables in your theme
2. Or create custom toast variants

---

## 📱 Responsive Behavior

Toasts are automatically responsive:

- **Desktop**: Positioned according to `position` prop
- **Mobile**: Full width at top or bottom (ignores left/right)

---

## ♿ Accessibility

Toasts are built with accessibility in mind:

- `role="alert"` for screen readers
- `aria-live="polite"` for non-intrusive announcements
- Keyboard accessible close button
- Proper ARIA labels

---

## 🧪 Testing

### Testing Components that Use Toasts

```typescript
import { render, screen } from '@test';
import { ToastProvider } from '@components/base';
import { MyComponent } from './MyComponent';

test('shows success toast', async () => {
  render(
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  );

  const button = screen.getByRole('button', { name: /submit/i });
  await userEvent.click(button);

  // Toast appears
  expect(await screen.findByRole('alert')).toBeInTheDocument();
  expect(screen.getByText('Success!')).toBeInTheDocument();
});
```

---

## 💡 Best Practices

### 1. Use Appropriate Variants

```typescript
// ✅ Good
showSuccess('User created');
showError('Failed to save');
showWarning('Unsaved changes');
showInfo('New feature available');

// ❌ Bad
showInfo('Critical error!'); // Should be error
showSuccess('Something might be wrong'); // Should be warning
```

### 2. Keep Messages Short

```typescript
// ✅ Good
showSuccess('Saved!');
showError('Failed to save');

// ❌ Bad
showSuccess('Your data has been successfully saved to the database and you can now continue with your work');
```

### 3. Provide Context

```typescript
// ✅ Good
showSuccess('Profile updated');
showError('Failed to update profile');

// ❌ Bad
showSuccess('Success!');
showError('Error!');
```

### 4. Use Appropriate Durations

```typescript
// ✅ Good
showSuccess('Saved', { duration: 2000 });        // Quick confirmation
showError('Error', { duration: 5000 });          // More time to read
showWarning('Warning', { duration: 0 });         // Critical, no auto-dismiss

// ❌ Bad
showError('Critical error', { duration: 1000 }); // Too fast
showInfo('Tip', { duration: 20000 });            // Too long
```

### 5. Don't Spam Toasts

```typescript
// ✅ Good
const handleMultipleActions = async () => {
  await action1();
  await action2();
  await action3();
  showSuccess('All actions completed!'); // One toast at the end
};

// ❌ Bad
const handleMultipleActions = async () => {
  await action1();
  showSuccess('Action 1 done');
  await action2();
  showSuccess('Action 2 done');
  await action3();
  showSuccess('Action 3 done');
  // Too many toasts!
};
```

---

## 🔗 Integration with Other Hooks

### With useAsync

```typescript
function DataLoader() {
  const { showSuccess, showError } = useToast();
  const { execute, loading } = useAsync(fetchData);

  const handleLoad = async () => {
    try {
      await execute();
      showSuccess('Data loaded!');
    } catch (error) {
      showError('Failed to load data');
    }
  };

  return <button onClick={handleLoad} disabled={loading}>Load</button>;
}
```

### With useLocalStorage

```typescript
function SettingsSaver() {
  const { showSuccess } = useToast();
  const [settings, setSettings] = useLocalStorage('settings', {});

  const handleSave = (newSettings: Settings) => {
    setSettings(newSettings);
    showSuccess('Settings saved!');
  };

  return <SettingsForm onSave={handleSave} />;
}
```

### With RTK Query

```typescript
function UserCreator() {
  const { showSuccess, showError } = useToast();
  const [createUser] = useCreateUserMutation();

  const handleCreate = async (userData: UserData) => {
    try {
      await createUser(userData).unwrap();
      showSuccess('User created successfully!');
    } catch (error) {
      showError('Failed to create user');
    }
  };

  return <UserForm onSubmit={handleCreate} />;
}
```

---

## 📊 API Reference

### useToast()

Returns an object with the following methods:

```typescript
interface ToastContextValue {
  showToast: (message: string, options?: ToastOptions) => void;
  showSuccess: (message: string, options?: Omit<ToastOptions, 'variant'>) => void;
  showError: (message: string, options?: Omit<ToastOptions, 'variant'>) => void;
  showWarning: (message: string, options?: Omit<ToastOptions, 'variant'>) => void;
  showInfo: (message: string, options?: Omit<ToastOptions, 'variant'>) => void;
  closeToast: (id: string) => void;
  clearAll: () => void;
}
```

---

## ✅ Summary

**Toast System Features:**
- ✅ 4 variants (success, error, warning, info)
- ✅ 6 position options
- ✅ Auto-dismiss with configurable duration
- ✅ Manual close button
- ✅ Responsive design
- ✅ RTL support
- ✅ Accessible
- ✅ Theme integrated
- ✅ Easy to use
- ✅ Fully typed

---

**Last Updated**: November 2025

