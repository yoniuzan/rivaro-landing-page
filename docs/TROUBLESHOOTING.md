# 🔧 Troubleshooting Guide

## Common Issues and Solutions

---

## 🔶 Mock Server Issues

### Issue: Mock Server Not Starting / White Screen After Refresh

**Symptoms:**
- Page loads initially but shows white screen after refresh
- No API calls visible in Network tab
- No console errors

**Solutions:**

#### 1. Verify `.env` File Exists

Create `.env` file in project root:

```bash
# .env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK=true
NODE_ENV=development
```

#### 2. Initialize MSW Service Worker

Run this command once:

```bash
npx msw init public/ --save
```

This creates `public/mockServiceWorker.js` which is required for MSW to work.

#### 3. Restart Dev Server

After creating `.env` or running MSW init:

```bash
# Stop the dev server (Ctrl+C)
# Then restart:
npm run dev:mock
```

#### 4. Check Console Logs

You should see these messages:

```
🔧 Initializing Mock Service Worker...
🔧 Starting Mock Service Worker...
📝 Handlers count: 5
✅ Mock Service Worker started successfully
🌐 Mocking API calls to: http://localhost:3000/api
```

If you don't see these, check:
- `.env` file has `VITE_USE_MOCK=true`
- `public/mockServiceWorker.js` exists
- No browser extensions blocking service workers

#### 5. Clear Browser Cache

Sometimes service workers get cached:

1. Open DevTools (F12)
2. Go to Application tab
3. Click "Service Workers"
4. Click "Unregister" for any old workers
5. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

## 📦 Package Installation Issues

### Issue: `Cannot find module` Errors

**Solution:**

```bash
# Delete node_modules and package-lock
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Or with legacy peer deps if needed
npm install --legacy-peer-deps
```

---

## 🎨 Type Errors

### Issue: TypeScript Errors After Changes

**Solution:**

```bash
# Run type check
npm run type-check

# Fix all errors before committing
# See TYPE_SAFETY_GUIDELINES.md for help
```

Common fixes:
- Add explicit types to all parameters
- Use `type` imports: `import type { User } from './types'`
- Never use `any` - use proper types or `unknown`

---

## 🔍 Development Server Issues

### Issue: Port Already in Use

**Solution:**

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Issue: Hot Reload Not Working

**Solution:**

1. Check if using WSL/Docker - may need polling:

```javascript
// vite.config.ts
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
  },
});
```

2. Restart dev server

---

## 🌐 API/Network Issues

### Issue: API Calls Failing

**Checklist:**

1. ✅ Mock server enabled: `VITE_USE_MOCK=true` in `.env`
2. ✅ Service worker registered (check DevTools > Application)
3. ✅ Handlers defined in `src/mocks/handlers/`
4. ✅ Base URL correct in `.env`

**Debug:**

```typescript
// Add to userHandlers.ts
console.log('Handler registered for:', `${baseUrl}/users`);
```

### Issue: CORS Errors

If using real API (not mock):

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://your-api-server.com',
        changeOrigin: true,
      },
    },
  },
});
```

---

## 🎭 Redux/State Issues

### Issue: State Not Updating

**Checklist:**

1. ✅ Store configured with middleware
2. ✅ Provider wraps app
3. ✅ Using typed hooks (`useAppDispatch`, `useAppSelector`)

**Debug:**

```typescript
// Add Redux DevTools
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  devTools: true, // Enable Redux DevTools
});
```

---

## 🌍 i18n/Translation Issues

### Issue: Translations Not Loading

**Solution:**

1. Check i18n initialized:

```typescript
// src/main.tsx should import
import './locales/i18n';
```

2. Check translation files exist:
   - `src/locales/he/common.json`
   - `src/locales/en/common.json`

3. Use correct namespace:

```typescript
const { t } = useTranslation('common');
// Not just useTranslation()
```

---

## 🎨 Styling Issues

### Issue: CSS Modules Not Working

**Solution:**

1. Check file named correctly: `*.module.css`
2. Check import:

```typescript
import styles from './Component.module.css';
// Use: className={styles.myClass}
```

3. Check `src/types/css-modules.d.ts` exists

---

## 🚀 Build Issues

### Issue: Build Fails

**Solution:**

```bash
# Clean build
rm -rf dist

# Type check first
npm run type-check

# Then build
npm run build
```

### Issue: Build Size Too Large

**Solution:**

```bash
# Analyze bundle
npm run build
npx vite-bundle-visualizer
```

---

## 🔧 Quick Fixes

### Reset Everything

```bash
# 1. Clean install
rm -rf node_modules package-lock.json
npm install

# 2. Reinit MSW
npx msw init public/ --save

# 3. Create .env
cat > .env << 'EOF'
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK=true
NODE_ENV=development
EOF

# 4. Type check
npm run type-check

# 5. Start dev server
npm run dev:mock
```

### Check Everything Is Working

```bash
# All these should pass:
npm run type-check  # No errors
npm run lint        # No errors
npm run dev:mock    # Server starts, console shows MSW logs
```

---

## 📞 Still Having Issues?

1. Check console for errors (F12 > Console)
2. Check Network tab for failed requests
3. Check Application > Service Workers
4. Review recent changes in git
5. Compare with working commit

---

## 🐛 Debugging Tips

### Enable Verbose Logging

```typescript
// src/mocks/browser.ts
await worker.start({
  onUnhandledRequest: 'warn', // Show unhandled requests
  serviceWorker: {
    url: '/mockServiceWorker.js',
  },
});
```

### Check Service Worker Status

```javascript
// In browser console:
navigator.serviceWorker.getRegistrations().then(registrations => {
  console.log('Service Workers:', registrations);
});
```

### Monitor API Calls

```typescript
// Add to baseApi.ts
baseQuery: fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    console.log('🌐 API Call:', baseUrl);
    return headers;
  },
}),
```

---

## ✅ Verification Checklist

Before asking for help, verify:

- [ ] `.env` file exists with correct values
- [ ] `public/mockServiceWorker.js` exists
- [ ] `npm install` completed successfully
- [ ] `npm run type-check` passes
- [ ] Dev server starts without errors
- [ ] Console shows MSW initialization logs
- [ ] No browser extensions blocking service workers
- [ ] Tried hard refresh (Ctrl+Shift+R)
- [ ] Tried in incognito/private mode

---

Last Updated: November 2025


