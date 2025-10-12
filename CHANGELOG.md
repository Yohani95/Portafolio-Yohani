# 📝 Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.3.0] - 2025-10-12

### ✨ Agregado

**Formulario de Contacto Funcional**

- ✅ **Integración con Formspree**: Envío real de emails sin backend
- ✅ **Validaciones completas**: Nombre, email, asunto, mensaje
- ✅ **Estados de UI**: Loading, success, error con mensajes claros
- ✅ **Analytics integrado**: Tracking de envíos exitosos y fallidos
- ✅ **Variables de entorno**: Configuración para desarrollo y producción
- ✅ **Documentación**: Guía completa en `FORMSPREE_SETUP.md`

**Mejoras Técnicas**

- ✅ HttpClient configurado en ContactComponent
- ✅ Build script actualizado para inyectar `FORMSPREE_FORM_ID`
- ✅ Export de `environment` desde data-access
- ✅ Protección SSR con `isPlatformBrowser`

---

## [1.2.0] - 2025-10-12

### ✨ Agregado

**Características Nuevas**

- ✅ **CV Descargable**: Botón prominente en About page y enlace en Footer
- ✅ **Sistema de Analytics**: Tracking de descargas CV, page views, interacciones
- ✅ **Componente OptimizedImage**: Lazy loading, WebP support, skeleton loader
- ✅ **Almacenamiento de Analytics**: LocalStorage con límite de 100 eventos
- ✅ **Build Script para Vercel**: Inyección automática de variables de entorno

**Mejoras Técnicas**

- ✅ Versión actualizada a 1.2.0
- ✅ Linting mejorado (sin errores de TypeScript)
- ✅ Sistema de analytics extensible (ready para Google Analytics)

**Componentes Nuevos**

- `OptimizedImageComponent`: Lazy loading + WebP + error handling
- `AnalyticsService`: Tracking completo con localStorage

---

## [1.1.1] - 2025-10-12

### 🔧 Mejoras

**Infraestructura**

- ✅ Sistema de variables de entorno mejorado
- ✅ Archivo `environment.example.ts` para desarrollo
- ✅ Script `build-vercel.js` para deployment
- ✅ Configuración dinámica de `GITHUB_TOKEN`, `GITHUB_USERNAME`, `BASE_URL`

**CI/CD**

- ✅ GitHub Actions actualizado (v4 de artifacts y codecov)
- ✅ Tests y linting integrados en Vercel build
- ✅ Estrategia de branches: `main` (producción) y `development` (desarrollo)

---

## [1.1.0] - 2025-10-12

### ✨ Agregado

**UX Improvements**

- ✅ **Iconos SVG en Footer**: GitHub, LinkedIn, Email con animaciones
- ✅ **Skeleton Loaders**: Componente reutilizable con animación pulse
- ✅ **Animaciones Mejoradas**: Fade-in, slide-up, stagger effect
- ✅ **Error Boundary**: Componente ErrorState con botón reintentar
- ✅ **Versioning**: Número de versión visible en footer

**Componentes Nuevos**

- `SkeletonCardComponent`: Placeholder durante carga de repos
- `ErrorStateComponent`: Manejo elegante de errores

**Features**

- Animación stagger en project cards (efecto cascada)
- Smooth scroll global
- Hover effects mejorados en cards y botones
- Dark mode en skeleton loaders

---

## [1.0.0] - 2025-10-11

### 🎉 Lanzamiento Inicial

#### ✨ Agregado

**Core Features**

- Portafolio profesional completo con Angular 20
- Integración con GitHub GraphQL API
- Sistema de routing con lazy loading
- SSR (Server-Side Rendering) con Angular Universal
- Prerendering de rutas estáticas

**Páginas**

- Home: Presentación, proyectos destacados, tech stack
- Projects: Listado de repositorios con búsqueda y filtros
- Project Detail: Detalle de proyecto con README renderizado
- About: Bio, experiencia, educación, skills
- Contact: Formulario de contacto con validaciones

**Componentes UI**

- Header con navegación responsive
- Footer con enlaces sociales
- Button component con variantes y tamaños
- Card component con hover effects

**Servicios**

- ThemeService: Gestión de dark mode
- GitHubService: Integración con GitHub API
- SEOService: Meta tags, Open Graph, JSON-LD
- CacheService: Sistema de caché en memoria (TTL 15 min)

**Features**

- 🌓 Dark mode con persistencia en localStorage
- 🔍 Búsqueda en tiempo real de proyectos
- 🏷️ Filtrado por topics/tecnologías
- 📊 Ordenamiento por stars o fecha de actualización
- 📱 Diseño 100% responsive
- ♿ Accesibilidad (WCAG AA)

**SEO & Performance**

- Meta tags dinámicos por página
- Open Graph y Twitter Cards
- JSON-LD structured data (Person, SoftwareSourceCode, Breadcrumb)
- Sitemap.xml y robots.txt
- Bundle optimization (<700KB)
- Lazy loading de rutas
- Code splitting
- Cache strategy para GitHub API

**Testing**

- 53 unit tests implementados
- Coverage: CacheService (100%), ThemeService (95%), ButtonComponent (90%)
- Jest configurado con coverage thresholds
- Playwright configurado para E2E

**Code Quality**

- ESLint con reglas estrictas
- Prettier para formateo consistente
- Husky con pre-commit hooks
- Commitlint para Conventional Commits
- lint-staged para staged files

**CI/CD**

- GitHub Actions workflow para CI
- GitHub Actions workflow para deployment
- Deploy automático a Vercel
- Preview deployments en PRs

**Documentación**

- README completo con badges
- GITHUB_TOKEN_SETUP.md - Guía de configuración de token
- ENVIRONMENT_SETUP.md - Guía de variables de entorno
- DEPLOYMENT_GUIDE.md - Guía de deployment
- OPTIMIZATION_REPORT.md - Reporte de optimizaciones
- TESTING_REPORT.md - Reporte de testing
- PLAN_COMPLETO.md - Plan de desarrollo completo
- SEO_CHECKLIST.md - Checklist de SEO
- CONTRIBUTING.md - Guía para contribuidores
- LICENSE - Licencia MIT

#### 🔧 Tecnologías Utilizadas

**Frontend**

- Angular 20.3
- TypeScript 5.5
- Tailwind CSS 3.x
- Angular Material 20.2
- ngx-markdown
- Apollo Client + GraphQL

**Build Tools**

- Nx 20.3
- Vite 7.x
- PostCSS
- Autoprefixer

**Testing**

- Jest 30.x
- Playwright 1.x
- Testing Library

**DevOps**

- GitHub Actions
- Vercel
- Node.js 20.x

#### 🎨 Diseño

- Paleta de colores marina personalizada
- Tema oscuro/claro
- Gradientes personalizados
- Sombras personalizadas
- Transiciones y animaciones fluidas
- Diseño mobile-first

#### 📱 Responsive

- Desktop (≥ 1280px)
- Tablet (768px - 1279px)
- Mobile (< 768px)
- Menú hamburguesa en móvil
- Grid adaptativo
- Imágenes responsive

---

## [Próximas Versiones]

### 🔮 Roadmap

#### [1.1.0] - Mejoras de Features

- [ ] Blog integrado
- [ ] Sistema de comentarios
- [ ] Newsletter subscription
- [ ] Búsqueda avanzada con Algolia
- [ ] Filtros por tecnología múltiple

#### [1.2.0] - Backend

- [ ] NestJS API para caché de GitHub
- [ ] Supabase para formulario de contacto
- [ ] Rate limiting
- [ ] API de estadísticas

#### [1.3.0] - PWA

- [ ] Service Worker
- [ ] Offline support
- [ ] Install prompt
- [ ] Push notifications

#### [2.0.0] - Internacionalización

- [ ] Soporte multi-idioma (ES/EN)
- [ ] i18n con Angular
- [ ] Detección automática de idioma
- [ ] Selector de idioma en header

---

## 🐛 Fixes Conocidos

Ninguno en este momento.

---

## 📊 Métricas del Proyecto

- **Líneas de código**: ~5,000+
- **Componentes**: 15+
- **Servicios**: 4
- **Tests unitarios**: 53
- **Coverage**: ~90%
- **Lighthouse Score**: 90+ (estimado)
- **Bundle size**: 642 KB (170 KB comprimido)

---

## 🙏 Agradecimientos

Ver [README.md](./README.md#-agradecimientos)

---

**Mantenido por**: [Yohani Espinoza](https://github.com/Yohani95)  
**Licencia**: MIT  
**Última actualización**: 2025-10-11
