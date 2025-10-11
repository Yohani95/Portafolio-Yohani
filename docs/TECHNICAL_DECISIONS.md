# 🧠 Decisiones Técnicas - Portafolio Yohani Espinoza

## 📋 Registro de Decisiones Arquitectónicas (ADR)

### ADR-001: Nx Monorepo

**Decisión**: Usar Nx como herramienta de monorepo

**Contexto**: Necesitamos una estructura escalable que permita crecer el proyecto con múltiples apps/libs.

**Razones**:

- ✅ Excelente tooling y DX (Developer Experience)
- ✅ Code generation y scaffolding
- ✅ Dependency graph visualization
- ✅ Affected commands para CI optimization
- ✅ Integración nativa con Angular

**Alternativas Consideradas**:

- Lerna (más simple pero menos features)
- Yarn Workspaces (básico, sin tooling)
- pnpm Workspaces (buena opción, menos maduro)

**Consecuencias**:

- ➕ Mejor organización del código
- ➕ Reutilización de librerías
- ➖ Curva de aprendizaje inicial
- ➖ Configuración más compleja

---

### ADR-002: Angular Signals vs NgRx

**Decisión**: Usar Angular Signals para state management

**Contexto**: Necesitamos gestionar estado (theme, proyectos, filtros)

**Razones**:

- ✅ Nativo de Angular (no dependencia externa)
- ✅ Más simple que NgRx
- ✅ Mejor performance (fine-grained reactivity)
- ✅ Menor bundle size

**Alternativas Consideradas**:

- NgRx (demasiado complejo para este proyecto)
- Akita (no tan popular)
- RxJS Subject/BehaviorSubject (menos ergonómico)

**Consecuencias**:

- ➕ Código más simple y legible
- ➕ Mejor performance
- ➕ Menos boilerplate
- ➖ No hay DevTools como NgRx

---

### ADR-003: Tailwind CSS vs Angular Material

**Decisión**: Usar Tailwind CSS como sistema principal de estilos

**Contexto**: Necesitamos un sistema de diseño flexible y personalizable

**Razones**:

- ✅ Utility-first approach
- ✅ Dark mode nativo
- ✅ Customización total
- ✅ Mejor control de bundle size

**Alternativas Consideradas**:

- Angular Material (demasiado opinionado)
- Bootstrap (menos moderno)
- CSS puro (menos productivo)

**Consecuencias**:

- ➕ Diseño único y personalizado
- ➕ Bundle CSS optimizado
- ➕ Dark mode fácil
- ➖ Más clases en templates

---

### ADR-004: GitHub GraphQL vs REST API

**Decisión**: Usar GitHub GraphQL API con Apollo Client

**Contexto**: Necesitamos obtener datos de repositorios de GitHub

**Razones**:

- ✅ Obtener exactamente los datos necesarios
- ✅ Menos requests (single query)
- ✅ Mejor tipado con TypeScript
- ✅ Cache automático con Apollo

**Alternativas Consideradas**:

- GitHub REST API (múltiples requests)
- Octokit SDK (wrapper de REST)

**Consecuencias**:

- ➕ Menos over-fetching
- ➕ Mejor performance
- ➕ Cache strategy incluida
- ➖ Curva de aprendizaje de GraphQL

---

### ADR-005: SSR con Prerender vs CSR

**Decisión**: Usar SSR/Prerender híbrido

**Contexto**: Balance entre SEO, performance y complejidad

**Estrategia**:

- **Prerender**: Rutas estáticas (`/`, `/projects`, `/about`, `/contact`)
- **SSR**: Rutas dinámicas (`/projects/:name`)
- **CSR**: Fallback para rutas no definidas

**Razones**:

- ✅ SEO optimizado
- ✅ Better First Contentful Paint
- ✅ Contenido indexable
- ✅ Mejor UX

**Alternativas Consideradas**:

- CSR puro (peor SEO)
- SSR completo (más complejo)
- Static Site Generation (menos flexible)

**Consecuencias**:

- ➕ Excelente SEO
- ➕ Performance mejorado
- ➖ Build más complejo
- ➖ Compatibilidad SSR requerida

---

### ADR-006: Non-buildable Libraries

**Decisión**: Usar librerías non-buildable en Nx

**Contexto**: Errores de compilación con ng-packagr

**Razones**:

- ✅ Librerías solo para uso interno
- ✅ Evita complejidad de ng-packagr
- ✅ Build más rápido
- ✅ Menos configuración

**Alternativas Consideradas**:

- Buildable libraries (más complejo)
- Publishable libraries (innecesario)

**Consecuencias**:

- ➕ Setup más simple
- ➕ Build más rápido
- ➖ No publicables a npm
- ➖ No versionables independientemente

---

### ADR-007: Cache Strategy

**Decisión**: Cache en memoria con TTL de 15 minutos

**Contexto**: Evitar rate limiting de GitHub API

**Implementación**:

- CacheService con Map
- TTL configurable
- Invalidación automática

**Razones**:

- ✅ Simple de implementar
- ✅ Sin dependencias externas
- ✅ Compatible con SSR
- ✅ Previene rate limiting

**Alternativas Consideradas**:

- localStorage (no funciona en SSR)
- IndexedDB (complejo)
- Backend con Redis (over-engineering)

**Consecuencias**:

- ➕ Reduce llamadas a API
- ➕ Mejor performance
- ➖ Se pierde en refresh (aceptable)
- ➖ No compartido entre pestañas

---

### ADR-008: Standalone Components

**Decisión**: Usar standalone components (sin NgModules)

**Contexto**: Angular 14+ recomienda standalone

**Razones**:

- ✅ Recomendación oficial de Angular
- ✅ Menos boilerplate
- ✅ Imports más explícitos
- ✅ Mejor tree-shaking

**Alternativas Consideradas**:

- NgModules tradicionales (deprecated path)

**Consecuencias**:

- ➕ Código más simple
- ➕ Mejor bundle size
- ➕ Future-proof
- ➖ Cambio de paradigma

---

### ADR-009: Husky + Commitlint

**Decisión**: Enforcer Conventional Commits con Husky

**Contexto**: Mantener calidad y consistencia en commits

**Implementación**:

- Husky para git hooks
- Commitlint para validar mensajes
- lint-staged para lint automático

**Razones**:

- ✅ Commits consistentes
- ✅ Changelog automático (futuro)
- ✅ Semantic versioning posible
- ✅ Mejor colaboración

**Consecuencias**:

- ➕ Mejor historial de Git
- ➕ Releases automáticas (futuro)
- ➖ Fricción inicial para devs

---

### ADR-010: Vercel vs Netlify vs AWS

**Decisión**: Usar Vercel para deployment

**Contexto**: Necesitamos hosting gratuito con buen DX

**Razones**:

- ✅ Soporte nativo de Angular SSR
- ✅ Deploy automático desde GitHub
- ✅ Preview deployments
- ✅ Edge Functions (futuro)
- ✅ Analytics integrado
- ✅ Free tier generoso

**Alternativas Consideradas**:

- Netlify (no tan bueno con SSR)
- AWS Amplify (más complejo)
- Firebase Hosting (limitado)

**Consecuencias**:

- ➕ Deploy automático
- ➕ HTTPS gratuito
- ➕ CDN global
- ➖ Vendor lock-in

---

## 🔄 Patrones de Diseño Implementados

### 1. **Service Layer Pattern**

- Lógica de negocio en servicios
- Componentes delgados (presentational)
- Separación de concerns

### 2. **Repository Pattern**

- GitHubService como repository
- Abstracción de fuente de datos
- Fácil de mockear en tests

### 3. **Singleton Pattern**

- Servicios `providedIn: 'root'`
- Una instancia por aplicación
- State compartido

### 4. **Observer Pattern**

- RxJS Observables
- Event-driven architecture
- Reactive programming

### 5. **Factory Pattern**

- Apollo provider factory
- Configuración dinámica

### 6. **Strategy Pattern**

- Diferentes render modes (Prerender/SSR/Client)
- Cache strategy

---

## 📈 Decisiones de Performance

### 1. **Lazy Loading**

- Todas las rutas lazy-loaded
- Componentes cargados bajo demanda
- Bundle inicial mínimo

### 2. **Code Splitting**

- Un chunk por ruta
- Shared chunks automáticos (Vite)
- Vendor chunk separado

### 3. **Tree Shaking**

- Imports específicos (no wildcards)
- Side-effects marcados en package.json
- Dead code elimination

### 4. **Minification**

- JavaScript minificado
- CSS minificado
- HTML comprimido

---

## 🔐 Decisiones de Seguridad

### 1. **Environment Variables**

- Nunca en código fuente
- Solo en .env.local (gitignored)
- Prefijo NG*APP* para client-side

### 2. **External Links**

- target="\_blank"
- rel="noopener noreferrer"
- Prevenir window.opener vulnerabilities

### 3. **Input Sanitization**

- Angular sanitiza automáticamente
- No uso de innerHTML sin sanitizar
- Markdown sanitizado por ngx-markdown

---

## 📊 Métricas de Decisiones

| Decisión              | Complejidad | Beneficio | Mantenibilidad |
| --------------------- | ----------- | --------- | -------------- |
| Nx Monorepo           | Alta        | Alto      | Alto           |
| Signals               | Baja        | Alto      | Alto           |
| Tailwind              | Media       | Alto      | Medio          |
| GraphQL               | Media       | Alto      | Alto           |
| SSR/Prerender         | Alta        | Alto      | Medio          |
| Non-buildable libs    | Baja        | Medio     | Alto           |
| Cache Service         | Baja        | Alto      | Alto           |
| Standalone Components | Baja        | Alto      | Alto           |
| Vercel                | Baja        | Alto      | Alto           |

---

**Autor**: Yohani Espinoza  
**Fecha**: 2025-10-11  
**Versión**: 1.0.0
