# 🚀 Guía de Deployment - Portafolio Yohani Espinoza

## **Paso 23: Deployment en Vercel**

### **📋 Pre-requisitos**

1. ✅ Cuenta en [Vercel](https://vercel.com)
2. ✅ Cuenta en [GitHub](https://github.com)
3. ✅ Repositorio del proyecto en GitHub
4. ✅ Token de GitHub con acceso a la API

---

## **🔧 Configuración Inicial**

### **1. Crear Repositorio en GitHub**

```bash
# Inicializar Git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "feat: portafolio profesional completo con Angular 20, Nx, SSR, tests y CI/CD"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/Yohani95/portfolio-nx.git
git branch -M main
git push -u origin main
```

### **2. Configurar Variables de Entorno Locales**

Asegúrate de que tu configuración de desarrollo esté lista:

```bash
# 1. Copia el archivo de ejemplo
cp libs/data-access/src/lib/config/environment.example.ts libs/data-access/src/lib/config/environment.development.ts

# 2. Edita environment.development.ts y agrega tu token
# Línea 16: githubToken: 'ghp_tu_token_aqui',
```

**🔒 SEGURO**: `environment.development.ts` está en `.gitignore` y NUNCA se sube a GitHub.

---

## **🌐 Deployment en Vercel**

### **Opción A: Deploy desde Vercel Dashboard (Recomendado)**

#### **Paso 1: Importar Proyecto**

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en **"Add New..."** → **"Project"**
3. Importa tu repositorio de GitHub
4. Selecciona el repositorio `portfolio-nx`

#### **Paso 2: Configurar el Proyecto**

**Framework Preset**: Selecciona **"Other"** (Nx no está en la lista predeterminada)

**Build Settings**:

```
Build Command: npx nx build portfolio-web --configuration=production
Output Directory: dist/apps/portfolio-web/browser
Install Command: npm install
```

**Root Directory**: Leave as `.` (raíz del proyecto)

#### **Paso 3: Configurar Variables de Entorno**

En la sección **"Environment Variables"**, agrega:

| Name              | Value                            | Environments        |
| ----------------- | -------------------------------- | ------------------- |
| `GITHUB_TOKEN`    | `ghp_tu_token_aqui`              | Production, Preview |
| `GITHUB_USERNAME` | `Yohani95`                       | Production, Preview |
| `BASE_URL`        | `https://tu-dominio.vercel.app`  | Production          |
| `BASE_URL`        | `https://preview-url.vercel.app` | Preview             |

**Nota**: En Vercel NO usan el prefijo `NG_APP_`, solo el nombre de la variable.

**⚠️ Nota**: El `BASE_URL` se puede configurar después del primer deploy cuando sepas tu URL de Vercel.

#### **Paso 4: Deploy**

1. Click en **"Deploy"**
2. Espera 2-3 minutos mientras Vercel construye y despliega
3. ✅ Tu sitio estará disponible en `https://[proyecto-name].vercel.app`

---

### **Opción B: Deploy desde CLI**

#### **Paso 1: Instalar Vercel CLI**

```bash
npm install -g vercel
```

#### **Paso 2: Login en Vercel**

```bash
vercel login
```

#### **Paso 3: Deploy**

```bash
# Deploy a preview
vercel

# Deploy a production
vercel --prod
```

#### **Paso 4: Configurar Variables de Entorno**

```bash
# Agregar variables de entorno desde CLI
vercel env add NG_APP_GITHUB_TOKEN production
vercel env add NG_APP_GITHUB_USERNAME production
vercel env add NG_APP_BASE_URL production
```

---

## **🔗 Configurar Dominio Personalizado (Opcional)**

### **Paso 1: Agregar Dominio**

1. Ve a tu proyecto en Vercel Dashboard
2. Click en **"Settings"** → **"Domains"**
3. Agrega tu dominio (ej: `yohani-espinoza.com`)

### **Paso 2: Configurar DNS**

Si compraste un dominio (ej: en Namecheap, GoDaddy, etc.):

**Tipo A Record**:

```
Host: @
Value: 76.76.19.19 (IP de Vercel)
```

**Tipo CNAME**:

```
Host: www
Value: cname.vercel-dns.com
```

### **Paso 3: Esperar Propagación**

- DNS puede tomar 24-48 horas en propagarse
- Vercel emitirá automáticamente certificado SSL (HTTPS)

---

## **🔄 CI/CD Automático**

### **GitHub Actions ya configurado** ✅

Una vez que hagas push a tu repositorio, GitHub Actions automáticamente:

1. ✅ **Lint**: Verifica calidad de código
2. ✅ **Format**: Verifica formato
3. ✅ **Test**: Ejecuta tests unitarios
4. ✅ **Build**: Construye la aplicación
5. ✅ **Deploy**: Despliega a Vercel (solo en main/master)

### **Workflow de Desarrollo**

```bash
# 1. Crear nueva rama
git checkout -b feature/nueva-funcionalidad

# 2. Hacer cambios
git add .
git commit -m "feat: nueva funcionalidad"

# 3. Push a GitHub
git push origin feature/nueva-funcionalidad

# 4. Crear Pull Request en GitHub
# → GitHub Actions ejecutará CI automáticamente
# → Vercel creará un Preview Deployment

# 5. Merge a main
# → GitHub Actions ejecutará CI + Deploy
# → Vercel desplegará a Production
```

---

## **📊 Configurar Secrets de GitHub**

Para que GitHub Actions funcione, configura estos secrets:

### **Paso 1: Obtener Tokens**

#### **Vercel Token**:

1. Ve a [Vercel Account Settings](https://vercel.com/account/tokens)
2. Click en **"Create Token"**
3. Copia el token

#### **Vercel Organization ID**:

```bash
# Desde CLI
vercel whoami
# O ve a: Settings → General → Organization ID
```

#### **Vercel Project ID**:

```bash
# Desde CLI (en el directorio del proyecto)
vercel inspect
# O ve a: Project Settings → General → Project ID
```

### **Paso 2: Agregar Secrets a GitHub**

1. Ve a tu repositorio en GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Click en **"New repository secret"**

Agrega estos secrets:

| Name                | Value                           |
| ------------------- | ------------------------------- |
| `VERCEL_TOKEN`      | Token de Vercel                 |
| `VERCEL_ORG_ID`     | Organization ID                 |
| `VERCEL_PROJECT_ID` | Project ID                      |
| `GITHUB_USERNAME`   | `Yohani95`                      |
| `BASE_URL`          | `https://tu-dominio.vercel.app` |

**⚠️ GITHUB_TOKEN**: Ya está disponible automáticamente en GitHub Actions, no necesitas agregarlo.

---

## **🔍 Verificar Deployment**

### **Checklist Post-Deployment** ✅

- [ ] Sitio accesible en `https://[proyecto].vercel.app`
- [ ] Home page carga correctamente
- [ ] Proyectos de GitHub se muestran
- [ ] Navegación funciona (Home, Projects, About, Contact)
- [ ] Dark mode funciona
- [ ] Búsqueda y filtros en Projects funcionan
- [ ] Detalles de proyecto muestran README
- [ ] Formulario de contacto funciona
- [ ] SEO meta tags están presentes (ver source)
- [ ] Performance es bueno (Lighthouse > 90)
- [ ] Responsive funciona en móvil

### **Comandos de Verificación**

```bash
# Ver logs de Vercel
vercel logs

# Ver estado del deployment
vercel inspect

# Ver lista de deployments
vercel ls
```

---

## **🐛 Troubleshooting**

### **Build falla en Vercel**

**Error**: `Command "npx nx build..." failed`

**Solución**:

```bash
# Verificar que funciona localmente
npx nx build portfolio-web --configuration=production

# Verificar package-lock.json está actualizado
npm install
git add package-lock.json
git commit -m "chore: update package-lock.json"
git push
```

### **Variables de entorno no funcionan**

**Síntoma**: Repositorios no se cargan

**Solución**:

1. Verificar que las variables están configuradas en Vercel
2. Verificar que el nombre es exactamente `NG_APP_GITHUB_TOKEN`
3. Re-deploy después de agregar variables

```bash
# Forzar re-deploy
vercel --prod --force
```

### **404 al navegar directamente**

**Síntoma**: URLs como `/projects/repo-name` dan 404

**Solución**: Verificar que `vercel.json` tiene el rewrite configurado:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## **📈 Monitoreo y Analytics**

### **Vercel Analytics** (Gratuito)

1. Ve a tu proyecto en Vercel
2. **Analytics** → **Enable Analytics**
3. Métricas disponibles:
   - Visitors
   - Page views
   - Top pages
   - Web Vitals

### **Google Analytics** (Opcional)

Agregar en `src/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## **✅ Checklist Final**

- [x] GitHub Actions configurado (`.github/workflows/ci.yml`, `deploy.yml`)
- [x] `vercel.json` configurado
- [x] `.vercelignore` configurado
- [ ] Repositorio en GitHub creado y pusheado
- [ ] Proyecto importado en Vercel
- [ ] Variables de entorno configuradas en Vercel
- [ ] First deployment exitoso
- [ ] GitHub Secrets configurados
- [ ] Dominio personalizado configurado (opcional)
- [ ] SSL/HTTPS funcionando
- [ ] CI/CD automático funcionando

---

## **🎉 ¡Listo!**

Tu portafolio ahora está desplegado en producción con:

✅ **Deploy automático** desde GitHub  
✅ **Preview deployments** en Pull Requests  
✅ **SSL/HTTPS** gratuito  
✅ **CDN global** para máxima velocidad  
✅ **CI/CD** completo con tests  
✅ **Monitoreo** y analytics

**URL de Producción**: `https://[tu-proyecto].vercel.app`

---

**Fecha**: 2025-10-11  
**Versión**: 1.0.0  
**Autor**: Yohani Espinoza
