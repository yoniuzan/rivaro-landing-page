# 🛡️ Type Safety Guidelines

## Overview

This template enforces **strict TypeScript** with zero tolerance for `any` types. All code must be fully typed and pass `npm run type-check` before committing.

---

## ⚠️ Critical Rules

### 1. Never Use `any`

```typescript
// ❌ WRONG - Never do this
function handleData(data: any) {
  return data.value;
}

// ✅ CORRECT - Use proper types
interface Data {
  value: string;
}

function handleData(data: Data) {
  return data.value;
}

// ✅ CORRECT - Use unknown if type is truly unknown
function handleData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value;
  }
}
```

### 2. Always Type Function Parameters

```typescript
// ❌ WRONG - Implicit any
const onClick = (event) => {
  console.log(event.target);
};

// ✅ CORRECT - Explicit types
const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log(event.currentTarget);
};

// ✅ CORRECT - For callbacks
const onSubmit = (data: FormData) => {
  // handle submit
};
```

### 3. Type All Component Props

```typescript
// ❌ WRONG - No types
export const Button = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

// ✅ CORRECT - Full typing
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  return <button onClick={onClick}>{children}</button>;
};
```

### 4. Use Type Imports

```typescript
// ✅ CORRECT - Type-only imports
import type { User } from './types';
import type { GetUsersResponse } from './api';

// ✅ CORRECT - Mixed imports
import { useState, type FC } from 'react';

// ❌ AVOID - Regular imports for types (works but not optimal)
import { User } from './types';
```

---

## 🔍 Common Patterns

### Event Handlers

```typescript
// Mouse events
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
};

// Form events
const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
};

// Input events
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};

// Keyboard events
const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === 'Enter') {
    // handle enter
  }
};
```

### Redux/RTK Query

```typescript
// ✅ CORRECT - Typed endpoints
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResponse, GetUsersParams>({
      query: (params: GetUsersParams) => ({
        url: '/users',
        params,
      }),
    }),
  }),
});

// ✅ CORRECT - Typed selectors
export const selectUsers = createSelector(
  [selectUserState],
  (userState: UserState) => userState.users
);
```

### API Responses

```typescript
// ✅ CORRECT - Define response types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

type GetUsersResponse = ApiResponse<User[]>;

// Usage
const fetchUsers = async (): Promise<GetUsersResponse> => {
  const response = await fetch('/api/users');
  return response.json();
};
```

### Generic Components

```typescript
// ✅ CORRECT - Generic types
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <div>
      {items.map((item) => (
        <div key={keyExtractor(item)}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

// Usage
<List<User>
  items={users}
  renderItem={(user) => <div>{user.name}</div>}
  keyExtractor={(user) => user.id}
/>
```

---

## 🧪 Type Checking Workflow

### Before Writing Code

1. Understand the data structures you'll work with
2. Define interfaces/types first
3. Write code with types in mind

### While Writing Code

```bash
# Run type check in watch mode (if available)
npm run type-check -- --watch
```

### Before Committing

```bash
# Must pass with zero errors
npm run type-check

# Also run linting
npm run lint
```

### Example Workflow

```bash
# 1. Create new component
touch src/components/MyComponent.tsx

# 2. Write code with types

# 3. Check types
npm run type-check

# 4. Fix any errors

# 5. Commit
git add .
git commit -m "Add MyComponent"
```

---

## 🚫 Common Mistakes to Avoid

### 1. Implicit Any in Callbacks

```typescript
// ❌ WRONG
array.map((item) => item.name); // item is any

// ✅ CORRECT
array.map((item: User) => item.name);

// ✅ BETTER - Type the array
const users: User[] = [];
users.map((item) => item.name); // item is User
```

### 2. Untyped Object Destructuring

```typescript
// ❌ WRONG
const { name, email } = user; // user is any

// ✅ CORRECT
interface User {
  name: string;
  email: string;
}

const { name, email } = user as User;

// ✅ BETTER - Type the parameter
function processUser(user: User) {
  const { name, email } = user;
}
```

### 3. Missing Return Types

```typescript
// ❌ WRONG - Implicit return type
const getUser = (id: string) => {
  return fetch(`/api/users/${id}`).then(r => r.json());
};

// ✅ CORRECT - Explicit return type
const getUser = (id: string): Promise<User> => {
  return fetch(`/api/users/${id}`).then(r => r.json());
};
```

### 4. Type Assertions Without Validation

```typescript
// ❌ WRONG - Unsafe assertion
const data = response as User;

// ✅ CORRECT - Validate before asserting
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'email' in data
  );
}

const data = response;
if (isUser(data)) {
  // data is User here
  console.log(data.name);
}
```

---

## 📋 Type Checking Checklist

Before committing code, ensure:

- [ ] All function parameters are typed
- [ ] All component props have interfaces
- [ ] No `any` types in the code
- [ ] All callbacks are typed
- [ ] Return types are explicit for complex functions
- [ ] `npm run type-check` passes with zero errors
- [ ] No TypeScript errors in IDE
- [ ] All imports use `type` keyword where applicable

---

## 🛠️ Fixing Type Errors

### Error: "Parameter implicitly has an 'any' type"

```typescript
// Error
const handler = (event) => { }

// Fix
const handler = (event: React.MouseEvent) => { }
```

### Error: "Cannot find module or its corresponding type declarations"

```bash
# Install type definitions
npm install --save-dev @types/package-name

# Or if it's a local module, check import path
```

### Error: "Type 'X' is not assignable to type 'Y'"

```typescript
// Understand the mismatch
interface Expected {
  id: string;
  name: string;
}

interface Actual {
  id: number; // Wrong type
  name: string;
}

// Fix the type
interface Actual {
  id: string; // Correct type
  name: string;
}
```

---

## 📚 Resources

### TypeScript Documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Internal Documentation
- [README.md](./README.md) - Main documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture details
- [USAGE_GUIDE.md](./USAGE_GUIDE.md) - Usage examples

---

## ✅ Summary

**Golden Rules:**
1. ❌ Never use `any`
2. ✅ Always type function parameters
3. ✅ Use `type` imports
4. ✅ Run `npm run type-check` before committing
5. ✅ Fix all type errors immediately

**Remember:** Type safety is not optional in this template. It's a core feature that ensures code quality and prevents runtime errors.

---

Last Updated: November 2025

