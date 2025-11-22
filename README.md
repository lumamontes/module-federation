<img width="992" height="751" alt="image" src="https://github.com/user-attachments/assets/4d40cb4f-a7b4-45ea-9e3d-8dd020e9303e" />


# Module Federation

A **microfrontend architecture** demonstration: an Admin Dashboard where the host application provides the shell (navigation, layout) and remote microfrontends provide independent feature modules (Analytics, User Management, Notifications, Settings).

## 🎯 Real-World Use Case

This project demonstrates a real-world microfrontend scenario where:
- **Host App**: Owns the shell, navigation, and routing (Mission Control Dashboard)
- **Remote App**: Owns independent feature modules that fetch real API data
- **Different Teams**: Can work on different modules independently (NEO Analytics, Personnel, Alerts, Settings)
- **Independent Deployments**: Each module can be updated without redeploying the entire application
- **Real Data**: All modules use NASA's public APIs with React Query for data management

## 🏗️ Architecture Overview

This project demonstrates a modern microfrontend architecture with:

- **Module Federation 2.0** - Runtime module sharing between applications
- **Feature-Sliced Design** - Scalable and maintainable code organization
- **TypeScript** - Full type safety across microfrontends
- **Modern.js** - Modern build tooling with Rspack
- **React 18** - Latest React features with Suspense

### Project Structure

```
studies/
├── microfrontends-host/     # Host application (Dashboard Shell)
│   ├── src/
│   │   ├── routes/          # Dashboard pages
│   │   │   ├── page.tsx     # Dashboard overview
│   │   │   ├── analytics/   # Analytics page (loads remote)
│   │   │   ├── users/       # Users page (loads remote)
│   │   │   ├── notifications/ # Notifications page (loads remote)
│   │   │   └── settings/    # Settings page (loads remote)
│   │   └── shared/          # Shared utilities (FSD)
│   │       └── ui/
│   │           └── error-boundary/ # Error handling
│   └── module-federation.config.ts
│
└── microfrontends-remote/    # Remote application (Feature Modules)
    ├── src/
    │   └── features/        # Feature modules (FSD)
    │       ├── analytics/   # Analytics feature
    │       │   ├── components/  # UI components
    │       │   ├── model/       # Hooks, state management
    │       │   ├── lib/         # Utilities
    │       │   ├── api/         # API calls
    │       │   └── index.ts     # Public API
    │       ├── user-management/ # User CRUD operations
    │       ├── notifications/ # Notification center
    │       └── settings/    # Application settings
    └── module-federation.config.ts
```

## 🎯 Feature-Sliced Design Structure

Following FSD principles, each feature is organized with proper separation of concerns.


## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.18.1
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies for both apps
cd microfrontends-remote && pnpm install
cd ../microfrontends-host && pnpm install
```

### Development

**Terminal 1 - Start Remote App (Producer):**
```bash
cd microfrontends-remote
pnpm dev
# Runs on http://localhost:3051
```

**Terminal 2 - Start Host App (Consumer):**
```bash
cd microfrontends-host
pnpm dev
# Runs on http://localhost:8080 (or 8081 if 8080 is in use)
```

### Access the Dashboard

- **Host App**: http://localhost:8080
- **Dashboard Overview** (Hosted): http://localhost:8080/
- **Analytics** (Remote): http://localhost:8080/analytics
- **User Management** (Remote): http://localhost:8080/users
- **Notifications** (Remote): http://localhost:8080/notifications
- **Settings** (Remote): http://localhost:8080/settings

**Note**: The Dashboard Overview page is hosted locally, while Analytics, Users, Notifications, and Settings are loaded from the remote microfrontend.

## 📦 Module Federation Configuration

### Remote App (Producer)

Exposes components via Module Federation:

```typescript
// microfrontends-remote/module-federation.config.ts
exposes: {
  './button': './src/shared/ui/button',
  './card': './src/shared/ui/card',
  './user-profile': './src/features/user-profile',
  './counter': './src/features/counter',
}
```

### Host App (Consumer)

Consumes remote modules:

```typescript
// microfrontends-host/module-federation.config.ts
remotes: {
  remote: 'remote@http://localhost:3051/static/mf-manifest.json',
}
```

### Usage in Host App

```typescript
import { Analytics } from 'remote/analytics';
import { UserManagement } from 'remote/user-management';
import { Notifications } from 'remote/notifications';
import { Settings } from 'remote/settings';
```

**Note**: All modules fetch real data from NASA's public APIs using React Query for data fetching, caching, and state management.

## 🎨 Remote Modules

### Feature-Sliced Design Structure

Each feature follows FSD principles with proper separation of concerns:

```
features/[feature-name]/
├── components/   # UI components (presentation layer)
├── model/        # Business logic, hooks, state management
├── lib/          # Utilities and helpers
├── api/          # API calls (if needed)
└── index.ts      # Public API exports
```
## 🛡️ Error Handling

The host app includes an `ErrorBoundary` component to gracefully handle remote module loading failures:

```typescript
import { ErrorBoundary } from 'shared/ui/error-boundary';

<ErrorBoundary>
  <Suspense fallback={<div>Loading...</div>}>
    <Button />
  </Suspense>
</ErrorBoundary>
```

## 🔧 TypeScript Support

Module Federation 2.0 automatically generates type definitions:

1. **Remote app** generates types during build
2. **Host app** downloads types from remote
3. Types are stored in `@mf-types/` directory
4. TypeScript path mapping configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "*": ["./@mf-types/*"]
    }
  }
}
```

## 📚 Key Features

✅ **Feature-Sliced Design** - Scalable architecture with proper separation  
✅ **Kebab-case Naming** - Consistent component naming  
✅ **Type Safety** - Full TypeScript support across microfrontends  
✅ **React Query Integration** - Data fetching, caching, and state management  
✅ **NASA API Data** - All modules use live data from NASA's public APIs  
✅ **Error Boundaries** - Graceful error handling  
✅ **Suspense Support** - Loading states for remote modules  
✅ **Modern Build** - Rspack for fast builds  
✅ **Production Ready** - Optimized for deployment  

## 🏭 Production Build

```bash
# Build remote app
cd microfrontends-remote
pnpm build

# Build host app
cd ../microfrontends-host
pnpm build

# Serve production builds
cd microfrontends-remote && pnpm serve
cd ../microfrontends-host && pnpm serve
```

## 📖 Learn More

- [Module Federation Documentation](https://module-federation.io/)
- [Modern.js Documentation](https://modernjs.dev/)

---

Built with ❤️ using Module Federation and Modern.js

