# 🏗️ Arquitectura del Portafolio

## 📐 Visión General

Este portafolio sigue principios de **Clean Architecture** y **SOLID**, con una estructura de **Nx Monorepo** que facilita la escalabilidad y mantenibilidad.

## 🎯 Principios de Diseño

### 1. **Separation of Concerns**

- **UI Layer** (`libs/ui`): Componentes visuales reutilizables
- **Data Layer** (`libs/data-access`): Servicios, state, API
- **Feature Layer** (`libs/feature`): Páginas y lógica de negocio
- **App Layer** (`apps/portfolio-web`): Configuración y orquestación

### 2. **Dependency Injection**

- Todos los servicios son `providedIn: 'root'`
- Componentes standalone con imports explícitos
- Providers configurados en `app.config.ts`

### 3. **Reactive Programming**

- **Signals** para state local
- **RxJS Observables** para async operations
- **Apollo Client** para GraphQL

### 4. **SSR Compatibility**

- `PLATFORM_ID` injection
- `isPlatformBrowser` guards
- No acceso directo a `window` o `document`

---

## 📦 Estructura de Librerías

### **libs/ui** - Componentes UI Reutilizables

```typescript
libs/ui/
├── header/               # Header con navegación
├── footer/               # Footer con enlaces
├── button/               # Botón reutilizable
└── card/                 # Card container
```

**Características**:

- Standalone components
- Props tipadas con TypeScript
- Variantes configurables
- Dark mode support
- Accesibilidad (ARIA labels)

### **libs/data-access** - Servicios y State

```typescript
libs/data-access/
├── services/
│   ├── theme.service.ts      # Gestión de dark mode
│   ├── github.service.ts     # GitHub GraphQL API
│   ├── seo.service.ts        # SEO meta tags
│   └── cache.service.ts      # Cache en memoria
├── models/
│   └── repository.model.ts   # Interfaces GitHub
├── graphql/
│   └── github.graphql.ts     # Queries GraphQL
├── providers/
│   └── apollo.provider.ts    # Configuración Apollo
└── config/
    └── environment.ts        # Variables de entorno
```

**Patrones**:

- Service Layer Pattern
- Repository Pattern (para datos)
- Singleton Services
- Cache Strategy

### **libs/feature** - Feature Modules

```typescript
libs/feature/
├── home/                 # Página de inicio
│   ├── home.component.ts
│   ├── home.component.html
│   └── home.component.scss
├── projects/             # Listado y detalle de proyectos
│   ├── projects.component.ts
│   └── project-detail.component.ts
├── about/                # Acerca de mí
└── contact/              # Formulario de contacto
```

**Características**:

- One component per file
- Smart components con lógica de negocio
- Lazy-loaded
- SEO optimizado

---

## 🔄 Flujo de Datos

### GitHub API Integration

```
User → ProjectsComponent
         ↓
     GitHubService.getUserRepositories()
         ↓
     CacheService.get() → ¿Existe en caché?
         ↓ (No)           ↓ (Sí)
     Apollo Client    Return cached
         ↓
     GitHub GraphQL API
         ↓
     Transform Response
         ↓
     CacheService.set()
         ↓
     Update Signal
         ↓
     View Updates (Reactive)
```

### Theme Management

```
User clicks toggle
         ↓
     HeaderComponent.toggleTheme()
         ↓
     ThemeService.toggleTheme()
         ↓
     Update Signal
         ↓
     Effect triggers
         ↓
     Apply to document.documentElement
         ↓
     Save to localStorage
         ↓
     CSS classes update (dark/light)
```

---

## 🎨 Estrategia de Styling

### Tailwind CSS Utility-First

```scss
// Component styles (minimal)
:host {
  display: block;
}

// Most styles in template
<div class="bg-marine-600 dark:bg-deep-800 hover:shadow-lg">
```

### Custom Theme Configuration

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      marine: { /* 50-950 */ },
      ocean: { /* 50-950 */ },
      deep: { /* 50-950 */ },
    },
  },
}
```

### Dark Mode Strategy

- **Class-based**: `class="dark"`
- **Applied to**: `<html>` element
- **Managed by**: ThemeService
- **Persisted in**: localStorage

---

## 🔐 Security

### Environment Variables

- **Client-side**: Solo variables con `NG_APP_` prefix
- **Server-side**: Todas las variables (en SSR)
- **Never commit**: `.env.local` en `.gitignore`

### GitHub Token

- **Scope**: `public_repo`, `read:user`
- **Storage**: Solo en variables de entorno
- **Never**: En código fuente o commits

### External Links

- **target="\_blank"**: Para links externos
- **rel="noopener noreferrer"**: Prevenir vulnerabilidades

---

## ⚡ Performance Strategy

### Code Splitting

```typescript
// Lazy loading de rutas
{
  path: 'projects',
  loadComponent: () => import('@portfolio-nx/feature/projects')
}
```

### Caching

- **GitHub API**: 15 minutos TTL
- **Apollo Client**: InMemoryCache
- **Browser**: Cache-Control headers (en Vercel)

### Bundle Optimization

- **Tree shaking**: Eliminación de código no usado
- **Minification**: UglifyJS en producción
- **Compression**: Gzip/Brotli en Vercel

---

## 🧪 Testing Strategy

### Unit Tests (Jest)

- **Services**: Lógica de negocio, state management
- **Components**: Props, events, rendering
- **Utilities**: Pure functions

### Integration Tests

- **Component + Service**: Flujos completos
- **Router**: Navegación entre páginas

### E2E Tests (Playwright)

- **Critical paths**: Home → Projects → Detail
- **Forms**: Contacto, búsqueda
- **Responsive**: Mobile, tablet, desktop

---

## 📊 State Management

### Signals (Angular 18+)

```typescript
// Estado local
searchTerm = signal('');

// Computed
filteredProjects = computed(() => {
  return this.projects().filter(/* ... */);
});

// Effects
effect(() => {
  console.log('Theme changed:', this.theme());
});
```

### When to use:

- **Signals**: State local de componentes
- **RxJS**: Operaciones async, HTTP requests
- **Services**: State compartido entre componentes

---

## 🔍 SEO Architecture

### Meta Tags Strategy

```typescript
// Por página
ngOnInit() {
  this.seoService.updateSEO({
    title: 'Título único',
    description: '...',
    keywords: '...',
    type: 'website',
  });
}
```

### JSON-LD Schemas

- **Person**: Información del desarrollador
- **SoftwareSourceCode**: Detalles de proyectos
- **Breadcrumb**: Navegación estructurada

### Prerendering

- **Static routes**: `/`, `/projects`, `/about`, `/contact`
- **Dynamic routes**: `/projects/:name` (SSR)

---

## 🚀 Deployment Architecture

### Build Process

```
Source Code
    ↓
TypeScript Compilation
    ↓
Nx Build (Vite)
    ↓
Angular Compiler
    ↓
Bundle Optimization
    ↓
SSR Prerendering
    ↓
dist/apps/portfolio-web/
    ├── browser/          # Client bundle
    └── server/           # Server bundle
```

### Vercel Deployment

```
GitHub Push
    ↓
GitHub Actions CI
    ↓
Vercel Build
    ↓
Deploy to CDN
    ↓
https://tu-dominio.vercel.app
```

---

## 📚 Dependencias Clave

### Runtime Dependencies

- **@angular/core**: Framework base
- **@apollo/client**: GraphQL client
- **apollo-angular**: Apollo + Angular
- **ngx-markdown**: Markdown rendering
- **graphql**: Query language

### Dev Dependencies

- **@nx/angular**: Nx tooling
- **tailwindcss**: Styling
- **jest**: Testing
- **playwright**: E2E
- **eslint, prettier**: Code quality

---

## 🔮 Future Improvements

### Planned Features

1. **Backend API (NestJS)**

   - GitHub data caching
   - Contact form endpoint
   - Analytics tracking

2. **Database (Supabase)**

   - Contact messages
   - View counters
   - Comments system

3. **PWA**

   - Service worker
   - Offline support
   - Install prompt

4. **Advanced Features**
   - Blog system
   - Multi-language (i18n)
   - Advanced search (Algolia)

---

## 🤝 Contributing

Ver [CONTRIBUTING.md](../CONTRIBUTING.md) para guías de contribución.

---

**Última actualización**: 2025-10-11  
**Versión**: 1.0.0  
**Autor**: Yohani Espinoza
