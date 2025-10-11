# 🚀 Instrucciones de Deployment - IMPORTANTE

## ⚠️ **ANTES DE HACER PUSH A GITHUB**

Tu archivo `environment.development.ts` contiene tu token real de GitHub. Aunque está en `.gitignore`, sigue estos pasos para asegurar un deployment exitoso:

---

## 📝 **Pasos para Deployment Seguro**

### **1. Verificar .gitignore** ✅

```bash
# Ejecuta:
git status

# Verifica que NO aparezca:
# libs/data-access/src/lib/config/environment.development.ts

# Si NO aparece: ✅ Estás seguro
# Si aparece: ⚠️  Agrega la línea a .gitignore
```

### **2. Crear archivo para producción**

Antes del primer deployment a Vercel, necesitas crear una versión de producción del environment:

**Opción A - Archivo production separado** (Recomendado para equipos):

1. Crea `environment.production.ts`:

   ```bash
   cp libs/data-access/src/lib/config/environment.example.ts libs/data-access/src/lib/config/environment.production.ts
   ```

2. Edita `environment.production.ts` con tu token de producción

3. Agrégalo a `.gitignore`:
   ```bash
   echo "libs/data-access/src/lib/config/environment.production.ts" >> .gitignore
   ```

**Opción B - Mismo archivo** (Recomendado para proyectos personales):

Usa el mismo `environment.development.ts` tanto en desarrollo como producción. Como está en `.gitignore`, nunca se subirá.

### **3. Primer commit y push**

```bash
# Agregar archivos
git add .

# Verificar que environment.development.ts NO está incluido
git status

# Commit
git commit -m "feat: portafolio profesional completo v1.0.0"

# Push a GitHub
git push -u origin main
```

### **4. Deploy en Vercel**

#### **Importante**: Como `environment.development.ts` NO se sube a GitHub, Vercel no lo tendrá.

**Solución**: Antes de hacer el primer deploy:

1. **Renombra temporalmente** el archivo en tu máquina local:

   ```bash
   # Backup local
   cp libs/data-access/src/lib/config/environment.development.ts ~/mi-token-github-backup.ts
   ```

2. **Crea una versión "dummy" para Git** (solo para el primer deploy):

   Edita `libs/data-access/src/lib/config/environment.ts` línea 13:

   ```typescript
   // Cambiar:
   import { environment as devEnvironment } from './environment.development';

   // Por (temporalmente):
   export const environment = {
     production: false,
     githubToken: 'GITHUB_TOKEN_PLACEHOLDER',
     githubUsername: 'Yohani95',
     baseUrl: 'http://localhost:4200',
     gaTrackingId: '',
   };
   ```

3. **Commit este cambio**:

   ```bash
   git add libs/data-access/src/lib/config/environment.ts
   git commit -m "chore: preparar environment para deployment"
   git push
   ```

4. **Deploy en Vercel**:

   - Importa el repositorio
   - El build usará el placeholder
   - La app funcionará (GitHub API tiene rate limit pero funcionará)

5. **Revertir el cambio localmente**:

   ```bash
   # Volver a la versión con import
   git checkout libs/data-access/src/lib/config/environment.ts

   # Restaurar tu archivo de desarrollo
   cp ~/mi-token-github-backup.ts libs/data-access/src/lib/config/environment.development.ts
   ```

---

## 🎯 **Alternativa Más Simple (Recomendada)**

### **Usar el token directamente en environment.ts para GitHub**

Como este es tu portafolio personal y el token solo da acceso de **lectura pública**, puedes:

1. Poner el token directamente en `environment.ts` (línea 17)
2. Hacer commit
3. GitHub escaneará y **revocará automáticamente** el token
4. Generar un nuevo token en GitHub
5. Usar el nuevo token solo localmente en `environment.development.ts`

**Por qué esto funciona**:

- GitHub revoca tokens expuestos automáticamente (protección)
- Generas uno nuevo para uso local
- El del repositorio queda inválido (seguro)

---

## 💡 **Mejor Solución: No usar GitHub API en Prerender**

La solución más profesional es:

1. **Deshabilitar** la carga de datos de GitHub durante el prerender
2. **Cargar** los datos solo en el cliente (browser)
3. **Ventaja**: No necesitas token en el servidor de build

¿Quieres que implemente esta solución? Es más limpia y no requiere manejar tokens en múltiples lugares.

---

## 🌐 **Variables de Entorno en Vercel (Futuro)**

Para una solución enterprise, configurar en Vercel:

1. Settings → Environment Variables
2. Agregar (sin `NG_APP_` prefix):

   - `GITHUB_TOKEN`
   - `GITHUB_USERNAME`
   - `BASE_URL`

3. Modificar `environment.ts` para leer de `process.env` en producción

---

## 📞 **¿Necesitas Ayuda?**

Si esto te parece complicado, puedo simplificarlo. Hay varias formas de hacerlo más fácil.

**Contacto**: yohani95301@gmail.com
