# 🌊 Portafolio Profesional - Yohani Espinoza Duarte

<div align="center">

![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Nx](https://img.shields.io/badge/Nx-Monorepo-143055?style=for-the-badge&logo=nx&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**Portafolio profesional de Full Stack Developer con +4 años de experiencia.**  
**Construido con Angular 20, Nx Monorepo, SSR, Tests y CI/CD.**

[🚀 Ver Demo](https://portfolio-yohani-espinoza.vercel.app) • [📧 Contacto](mailto:yohani95301@gmail.com) • [💼 LinkedIn](https://linkedin.com/in/yohani-espinoza-a14276240)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características-principales)
- [Tecnologías](#️-tecnologías-y-stack)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Scripts](#-scripts-disponibles)
- [Configuración](#️-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [SEO y Performance](#-seo-y-performance)
- [Testing](#-testing)
- [CI/CD](#-cicd)
- [Deployment](#-deployment)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 📖 Descripción

Portafolio profesional diseñado para mostrar mis proyectos de GitHub, experiencia laboral y habilidades técnicas. Desarrollado con las últimas tecnologías web y mejores prácticas de desarrollo.

### 🎯 Objetivo

Crear un portafolio profesional que destaque en búsquedas de Google, sea fácil de compartir en redes sociales y ofrezca una experiencia de usuario excepcional tanto en desktop como en móvil.

---

## ✨ Características Principales

### 🎨 Diseño y UX

- ✅ **Tema Marino Moderno** - Paleta de colores azules (marine, ocean, deep)
- ✅ **Modo Oscuro** - Toggle entre light/dark mode con persistencia
- ✅ **Responsive Design** - Optimizado para todos los dispositivos
- ✅ **Animaciones Fluidas** - Transiciones suaves y micro-interacciones
- ✅ **Navegación Intuitiva** - Header fijo con menú móvil hamburguesa

### 🚀 Performance

- ✅ **SSR/Prerender** - Server-Side Rendering con Angular Universal
- ✅ **Lazy Loading** - Carga perezosa de rutas
- ✅ **Tree Shaking** - Bundle optimizado
- ✅ **Code Splitting** - Chunks separados por ruta
- ✅ **Cache Strategy** - Estrategia de caché para assets

### 🔍 SEO Avanzado

- ✅ **Meta Tags Dinámicos** - Títulos y descripciones por página
- ✅ **Open Graph** - Optimizado para redes sociales (Facebook, LinkedIn)
- ✅ **Twitter Cards** - Preview cards para Twitter
- ✅ **JSON-LD** - Schema.org markup (Person, SoftwareSourceCode, Breadcrumbs)
- ✅ **Sitemap.xml** - Mapa del sitio para motores de búsqueda
- ✅ **Robots.txt** - Configurado para indexación óptima
- ✅ **Canonical URLs** - URLs canónicas en cada página

### 🛠️ Funcionalidades

- ✅ **Integración GitHub GraphQL** - Proyectos en tiempo real desde GitHub
- ✅ **Markdown Rendering** - README de proyectos renderizados con sintaxis highlight
- ✅ **Filtros y Búsqueda** - Buscar proyectos por nombre, tecnología o topic
- ✅ **Formulario de Contacto** - Validación reactiva con Angular Forms
- ✅ **Perfil Dinámico** - Información personal y profesional actualizable

---

## 🛠️ Tecnologías y Stack

### Core

| Tecnología     | Versión | Descripción           |
| -------------- | ------- | --------------------- |
| **Angular**    | 20.0    | Framework principal   |
| **TypeScript** | 5.5     | Lenguaje tipado       |
| **Nx**         | 20.3    | Monorepo tooling      |
| **RxJS**       | 7.8     | Programación reactiva |

### UI/UX

| Tecnología                | Descripción                          |
| ------------------------- | ------------------------------------ |
| **Tailwind CSS**          | v3.x - Utility-first CSS             |
| **Angular Material**      | Componentes Material Design (futuro) |
| **@tabler/icons-angular** | Iconografía moderna                  |
| **Google Fonts**          | Inter font family                    |

### State Management & Data

| Tecnología             | Descripción             |
| ---------------------- | ----------------------- |
| **Angular Signals**    | State management nativo |
| **Apollo Client**      | Cliente GraphQL         |
| **GitHub GraphQL API** | Datos de repositorios   |

### Markdown & Content

| Tecnología       | Descripción             |
| ---------------- | ----------------------- |
| **ngx-markdown** | Renderizado de Markdown |
| **marked**       | Parser de Markdown      |

### Code Quality

| Tecnología      | Descripción                      |
| --------------- | -------------------------------- |
| **ESLint**      | Linting de TypeScript/JavaScript |
| **Prettier**    | Formateo de código               |
| **Husky**       | Git hooks                        |
| **lint-staged** | Lint en staged files             |
| **Commitlint**  | Conventional Commits             |

### Testing

| Tecnología          | Descripción                |
| ------------------- | -------------------------- |
| **Jest**            | Unit & Integration testing |
| **Playwright**      | E2E testing                |
| **Testing Library** | Testing utilities          |

### DevOps & CI/CD

| Tecnología         | Descripción                 |
| ------------------ | --------------------------- |
| **GitHub Actions** | CI/CD pipeline              |
| **Vercel**         | Hosting y deployment        |
| **Docker**         | Containerización (opcional) |

---

## 🏗️ Arquitectura

### Nx Monorepo Structure

```
portfolio-nx/
├── apps/
│   ├── portfolio-web/          # Aplicación Angular SSR
│   └── portfolio-web-e2e/      # Tests E2E con Playwright
├── libs/
│   ├── ui/                     # Componentes reutilizables
│   │   ├── header/
│   │   ├── footer/
│   │   ├── button/
│   │   └── card/
│   ├── data-access/            # Servicios y state
│   │   ├── services/           # ThemeService, GitHubService, SEOService
│   │   ├── models/             # Interfaces y types
│   │   └── providers/          # Apollo, etc.
│   └── feature/                # Feature modules
│       ├── home/               # Página de inicio
│       ├── projects/           # Listado de proyectos
│       ├── about/              # Acerca de mí
│       └── contact/            # Contacto
└── ...
```

### Principios de Arquitectura

- **Clean Architecture** - Separación clara de responsabilidades
- **SOLID Principles** - Código mantenible y escalable
- **DRY (Don't Repeat Yourself)** - Componentes reutilizables
- **Feature-based Structure** - Módulos por funcionalidad
- **Lazy Loading** - Carga bajo demanda

---

## 🚀 Quick Start

```bash
# 1. Clonar el repositorio
git clone https://github.com/Yohani95/portfolio-nx.git
cd portfolio-nx

# 2. Instalar dependencias
npm install

# 3. Configurar tu GitHub token (REQUERIDO)
# Copia el archivo de ejemplo:
cp libs/data-access/src/lib/config/environment.example.ts libs/data-access/src/lib/config/environment.development.ts

# Edita environment.development.ts y pega tu GitHub token en la línea 16

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir en navegador
# http://localhost:4200
```

⚠️ **IMPORTANTE**:

- Necesitas un GitHub Personal Access Token
- El archivo `environment.development.ts` está en `.gitignore` (seguro)
- Ver [docs/GITHUB_TOKEN_SETUP.md](./docs/GITHUB_TOKEN_SETUP.md) para crear el token

---

## 📦 Instalación Detallada

### Prerrequisitos

- **Node.js** >= 20.19.x (⚠️ NO v21.x - usar v20 o v22+)
- **npm** >= 10.x
- **Git**

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/Yohani95/portfolio-nx.git
cd portfolio-nx
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar GitHub Token** ⚠️ **REQUERIDO**

```bash
# Copia el archivo de ejemplo a environment.development.ts
cp libs/data-access/src/lib/config/environment.example.ts libs/data-access/src/lib/config/environment.development.ts
```

Edita `libs/data-access/src/lib/config/environment.development.ts` y agrega tu token en la línea 16:

```typescript
githubToken: 'ghp_tu_token_real_aqui', // 👈 Pega tu token aquí
```

🔒 **Seguridad**:

- `environment.development.ts` está en `.gitignore` - NUNCA se sube a GitHub
- Es 100% seguro poner tu token ahí

📖 **Instrucciones detalladas**:

- [docs/GITHUB_TOKEN_SETUP.md](./docs/GITHUB_TOKEN_SETUP.md) - Cómo crear el token
- [docs/ENVIRONMENT_SETUP.md](./docs/ENVIRONMENT_SETUP.md) - Configurar variables

4. **Iniciar desarrollo**

```bash
npm run dev
```

Abre http://localhost:4200 en tu navegador.

---

## 🎯 Scripts Disponibles

### Desarrollo

```bash
npm run dev              # Servidor de desarrollo (puerto 4200)
npm run build            # Build de producción con SSR
npm run serve:ssr        # Servir build SSR
npm run serve-static     # Servir build estático
```

### Code Quality

```bash
npm run lint             # Ejecutar ESLint
npm run format           # Formatear código con Prettier
npm run format:check     # Verificar formato
```

### Testing

```bash
npm run test             # Ejecutar tests unitarios
npm run test:coverage    # Coverage de tests
npm run e2e              # Ejecutar tests E2E
```

### Nx Commands

```bash
npx nx graph             # Ver gráfico de dependencias
npx nx affected:test     # Ejecutar tests afectados
npx nx affected:build    # Build de proyectos afectados
npx nx reset             # Limpiar cache de Nx
```

---

## ⚙️ Configuración

### Environment Variables

**Configuración rápida:**

```bash
# 1. Copia el archivo de ejemplo
cp .env.local.example .env.local

# 2. Edita .env.local y agrega tu GitHub token
# GITHUB_TOKEN=ghp_tu_token_real_aqui
```

**Variables disponibles:**

| Variable          | Descripción          | Requerida |
| ----------------- | -------------------- | --------- |
| `GITHUB_TOKEN`    | Token de GitHub API  | ⚠️ Sí     |
| `GITHUB_USERNAME` | Tu usuario de GitHub | ✅ Sí     |
| `BASE_URL`        | URL de la aplicación | Opcional  |
| `GA_TRACKING_ID`  | Google Analytics ID  | Opcional  |

📖 Ver guías completas:

- [GITHUB_TOKEN_SETUP.md](./GITHUB_TOKEN_SETUP.md) - Crear token de GitHub
- [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) - Configurar variables

### Actualizar Información Personal

1. **SEOService** (`libs/data-access/src/lib/services/seo.service.ts`)

   - Actualiza `defaultConfig` con tu información

2. **GitHubService** (`libs/data-access/src/lib/services/github.service.ts`)

   - Cambia `username = 'Yohani95'` por tu usuario

3. **Componentes de Páginas**
   - Home: `libs/feature/home/src/lib/home.component.ts`
   - About: `libs/feature/about/src/lib/about.component.ts`
   - Contact: `libs/feature/contact/src/lib/contact.component.ts`

### Sitemap & Robots

Actualiza las URLs en:

- `apps/portfolio-web/public/sitemap.xml`
- `apps/portfolio-web/public/robots.txt`

---

## 📁 Estructura del Proyecto

```
portfolio-nx/
├── apps/
│   ├── portfolio-web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── app.ts              # Componente raíz
│   │   │   │   ├── app.config.ts       # Configuración app
│   │   │   │   ├── app.routes.ts       # Rutas
│   │   │   │   └── app.routes.server.ts # Rutas SSR
│   │   │   ├── index.html              # HTML base
│   │   │   ├── styles.scss             # Estilos globales
│   │   │   └── server.ts               # Express server SSR
│   │   ├── public/
│   │   │   ├── sitemap.xml
│   │   │   ├── robots.txt
│   │   │   └── favicon.ico
│   │   └── project.json
│   └── portfolio-web-e2e/
├── libs/
│   ├── ui/
│   │   └── src/lib/
│   │       ├── header/
│   │       ├── footer/
│   │       ├── button/
│   │       └── card/
│   ├── data-access/
│   │   └── src/lib/
│   │       ├── services/
│   │       │   ├── theme.service.ts
│   │       │   ├── github.service.ts
│   │       │   └── seo.service.ts
│   │       ├── models/
│   │       ├── graphql/
│   │       └── providers/
│   └── feature/
│       ├── home/
│       ├── projects/
│       ├── about/
│       └── contact/
├── .github/
│   └── workflows/                      # GitHub Actions
├── tailwind.config.js                  # Config Tailwind
├── nx.json                             # Config Nx
├── tsconfig.base.json                  # Config TypeScript
├── .prettierrc                         # Config Prettier
├── .eslintrc.json                      # Config ESLint
├── commitlint.config.js                # Config Commitlint
└── README.md
```

---

## 🔍 SEO y Performance

### SEO Implementado

- ✅ **Meta tags dinámicos** por página
- ✅ **Open Graph** para redes sociales
- ✅ **Twitter Cards**
- ✅ **JSON-LD Schema.org** (Person, SoftwareSourceCode, Breadcrumbs)
- ✅ **Sitemap.xml** y **robots.txt**
- ✅ **Canonical URLs**
- ✅ **SSR/Prerender** para indexación inmediata

Ver detalles en: [docs/SEO_CHECKLIST.md](./docs/SEO_CHECKLIST.md)

### Performance Optimizations

- ✅ **SSR/Prerender** - Páginas prerenderizadas
- ✅ **Code splitting** - Bundles por ruta
- ✅ **Lazy loading** - Carga bajo demanda
- ✅ **Tree shaking** - Eliminación de código no usado
- ✅ **Minificación** - CSS y JS minificados
- ✅ **Caching** - Estrategia de caché de Apollo

### Core Web Vitals

Target:

- **LCP** (Largest Contentful Paint) < 2.5s
- **FID** (First Input Delay) < 100ms
- **CLS** (Cumulative Layout Shift) < 0.1

---

## 🧪 Testing

### Unit Tests (Jest)

```bash
npm run test                 # Todos los tests
npm run test:coverage        # Con coverage
npx nx test ui               # Tests de una lib específica
```

Target: **≥ 85% coverage**

### E2E Tests (Playwright)

```bash
npm run e2e                  # Ejecutar E2E
npx playwright show-report   # Ver reporte
```

### Test Strategy

- **Unit**: Servicios, pipes, utilities
- **Integration**: Componentes con dependencias
- **E2E**: Flujos críticos de usuario

---

## 🔄 CI/CD

### GitHub Actions

Pipeline automático en cada push/PR:

1. **Lint** - ESLint + Prettier check
2. **Test** - Unit tests con coverage
3. **Build** - Build de producción
4. **E2E** - Tests end-to-end
5. **Deploy** - A Vercel automáticamente

Ver: `.github/workflows/ci.yml` (próximamente)

### Conventional Commits

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formato, punto y coma, etc
refactor: refactorización de código
test: añadir o actualizar tests
chore: tareas de mantenimiento
```

---

## 🚀 Deployment

### Vercel (Recomendado)

1. **Conectar repositorio a Vercel**

   - Importa el proyecto desde GitHub
   - Vercel detectará Nx automáticamente

2. **Configurar variables de entorno**

   ```
   GITHUB_TOKEN=tu_token
   BASE_URL=https://tu-dominio.vercel.app
   ```

3. **Deploy automático**
   - Cada push a `main` despliega automáticamente
   - Preview deployments en PRs

### Build Manual

```bash
npm run build
# Output en: dist/apps/portfolio-web
```

---

## 📚 Documentación Adicional

### **Guías de Setup**

- [docs/GITHUB_TOKEN_SETUP.md](./docs/GITHUB_TOKEN_SETUP.md) - Configurar token de GitHub
- [docs/ENVIRONMENT_SETUP.md](./docs/ENVIRONMENT_SETUP.md) - Variables de entorno
- [docs/DEPLOYMENT_GUIDE.md](./docs/DEPLOYMENT_GUIDE.md) - Deploy a Vercel

### **Documentación Técnica**

- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Arquitectura del sistema
- [docs/TECHNICAL_DECISIONS.md](./docs/TECHNICAL_DECISIONS.md) - Decisiones técnicas (ADRs)

### **Reportes y Análisis**

- [docs/OPTIMIZATION_REPORT.md](./docs/OPTIMIZATION_REPORT.md) - Optimizaciones de performance
- [docs/TESTING_REPORT.md](./docs/TESTING_REPORT.md) - Reporte de testing
- [docs/SEO_CHECKLIST.md](./docs/SEO_CHECKLIST.md) - Checklist de SEO

### **Project Management**

- [docs/PLAN_COMPLETO.md](./docs/PLAN_COMPLETO.md) - Plan de desarrollo (24 pasos)
- [docs/FINAL_SUMMARY.md](./docs/FINAL_SUMMARY.md) - Resumen ejecutivo del proyecto
- [CHANGELOG.md](./CHANGELOG.md) - Historial de cambios
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guía de contribución

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE](./LICENSE) para más detalles.

---

## 📬 Contacto

<div align="center">

**Yohani Espinoza Duarte**  
_Ingeniero en Informática | Full Stack Developer_

[![Email](https://img.shields.io/badge/Email-yohani95301%40gmail.com-red?style=for-the-badge&logo=gmail&logoColor=white)](mailto:yohani95301@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yohani%20Espinoza-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yohani-espinoza-a14276240)
[![GitHub](https://img.shields.io/badge/GitHub-Yohani95-black?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Yohani95)

📍 **Santiago, Chile**  
📞 **+56 9 65208072**

</div>

---

## 🙏 Agradecimientos

- **Angular Team** - Por el increíble framework
- **Nx Team** - Por las herramientas de monorepo
- **Tailwind CSS** - Por el sistema de diseño
- **Vercel** - Por el hosting gratuito

---

<div align="center">

**Hecho con ❤️ y ⚓ por Yohani Espinoza**

_Conectando tecnología con el mar_ 🌊

</div>
