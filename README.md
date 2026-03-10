# Arrival Confirmations Landing Page

A production-ready landing page project, built with a reusable React component architecture.

## 🚀 Key Features

*   **Zero UI Dependencies:** Custom-built components using HTML/CSS Modules (No MUI/Chakra).
*   **Theming:** CSS Variable-based theming system (`ThemeProvider`).
*   **i18n:** Native support for English & Hebrew (RTL/LTR).
*   **State Management:** Redux Toolkit & RTK Query.
*   **Testing:** Vitest & React Testing Library.
*   **Storybook:** Component development environment.

## 📚 Documentation

We have organized the documentation to help you (and AI assistants) navigate the project:

### 🤖 For AI / Cursor
*   **[.cursorrules](./.cursorrules)**: The most important file for AI context. Contains strict coding rules and architectural decisions.

### 📖 Guides
*   **[Quick Start](./docs/QUICK_START.md)**: Installation and basic usage.
*   **[Usage Guide](./docs/USAGE_GUIDE.md)**: How to consume the library in other apps.
*   **[Architecture](./docs/ARCHITECTURE.md)**: Project structure and design choices.
*   **[AI Context](./docs/AI_CONTEXT.md)**: Context for LLMs.
*   **[Hooks Guide](./docs/HOOKS_GUIDE.md)**: Custom hooks documentation.
*   **[Toast Guide](./docs/TOAST_GUIDE.md)**: How to use the Toast notification system.
*   **[Testing Guide](./docs/TESTING_GUIDE.md)**: Running and writing tests.
*   **[Troubleshooting](./docs/TROUBLESHOOTING.md)**: Common issues and fixes.
*   **[Type Safety](./docs/TYPE_SAFETY_GUIDELINES.md)**: TypeScript best practices.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run Storybook
npm run storybook

# Build library
npm run build
```

## 📦 Project Structure

```
src/
├── components/     # UI Components
│   ├── base/       # Atomic components (Button, Input, etc.)
│   └── ThemeProvider.tsx
├── constants/      # Design tokens (colors, spacing)
├── hooks/          # Custom React hooks
├── locales/        # i18n translation files
├── store/          # Redux setup
├── utils/          # Helper functions
└── widgets/        # Complex composed components
```
