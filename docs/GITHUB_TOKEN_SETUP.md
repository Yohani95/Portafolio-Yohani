# 🔑 Configuración del Token de GitHub - Guía Completa

## 📋 ¿Qué es y por qué lo necesitas?

El **GitHub Personal Access Token** es una clave que te permite acceder a la API de GitHub para obtener información de tus repositorios públicos sin límites restrictivos.

**Sin token**: 60 requests por hora ❌  
**Con token**: 5,000 requests por hora ✅

---

## 🚀 Configuración Rápida (5 minutos)

### **Paso 1: Crear el Token en GitHub** (2 min)

1. Ve a https://github.com/settings/tokens
2. Click en **"Generate new token (classic)"**
3. Configurar:

   - **Note**: `Portfolio Yohani Espinoza`
   - **Expiration**: `No expiration` (o 90 días)
   - **Scopes**: Selecciona:
     - ✅ `public_repo` (acceso a repos públicos)
     - ✅ `read:user` (leer info de usuario)

4. Click en **"Generate token"**
5. **COPIA el token** (empieza con `ghp_...`)
   - ⚠️ Solo se muestra UNA VEZ
   - Guárdalo en lugar seguro

### **Paso 2: Configurar en tu Proyecto** (2 min)

```bash
# 1. Copia el archivo de ejemplo
cp libs/data-access/src/lib/config/environment.example.ts libs/data-access/src/lib/config/environment.development.ts

# 2. Edita el archivo
# Abre: libs/data-access/src/lib/config/environment.development.ts
# Línea 16: Pega tu token

# 3. Guardar y cerrar
```

**Contenido del archivo** (`environment.development.ts`):

```typescript
export const environment = {
  production: false,
  githubToken: 'ghp_TU_TOKEN_REAL_DE_GITHUB_AQUI', // 👈 TU TOKEN AQUÍ
  githubUsername: 'Yohani95',
  baseUrl: 'http://localhost:4200',
  gaTrackingId: '',
};
```

### **Paso 3: Verificar** (1 min)

```bash
# Limpiar caché y construir
npx nx reset
npx nx build portfolio-web

# Si NO ves errores de "rate limit exceeded":
# ✅ Token configurado correctamente

# Si VES errores de rate limit:
# ❌ Token no configurado o inválido
```

---

## 🔒 **Seguridad Garantizada**

### **¿Es seguro poner mi token ahí?**

✅ **SÍ, es 100% SEGURO** porque:

1. **`.gitignore` configurado**:

   ```bash
   # .gitignore contiene:
   libs/data-access/src/lib/config/environment.development.ts
   ```

2. **Git lo ignora automáticamente**:

   ```bash
   # Verifica con:
   git status

   # environment.development.ts NO debe aparecer
   ```

3. **Nunca se sube a GitHub**:
   - Incluso si intentas `git add .`
   - Git lo ignorará automáticamente

### **¿Qué archivos SÍ se suben a GitHub?**

✅ `environment.ts` - Base (sin secrets)  
✅ `environment.example.ts` - Template  
❌ `environment.development.ts` - TU TOKEN (en .gitignore)

---

## 🌐 **Configuración para Producción (Vercel)**

Cuando despliegues a Vercel, NO uses este archivo. En su lugar:

1. Ve a **Vercel Dashboard** → tu proyecto
2. **Settings** → **Environment Variables**
3. Agrega:
   - `GITHUB_TOKEN` = tu token
   - `GITHUB_USERNAME` = `Yohani95`
   - `BASE_URL` = tu URL de Vercel

---

## 🆘 **Troubleshooting**

### **Problema 1: "rate limit exceeded"**

**Síntoma**:

```
Error: Http failure response for https://api.github.com/graphql: 403
```

**Soluciones**:

1. **Verifica que el archivo existe**:

   ```bash
   ls libs/data-access/src/lib/config/environment.development.ts
   ```

2. **Verifica el contenido**:

   - Abre el archivo
   - Verifica que `githubToken` tiene tu token (empieza con `ghp_`)
   - Sin espacios extras
   - Entre comillas simples

3. **Rebuild completo**:
   ```bash
   npx nx reset
   npx nx build portfolio-web
   ```

### **Problema 2: "Token no configurado"**

**Síntoma**: Advertencia en consola del navegador

**Solución**:

- Crea `environment.development.ts` si no existe
- Copia desde `environment.example.ts`
- Agrega tu token

### **Problema 3: "Git quiere subir mi token"**

**Síntoma**: `git status` muestra `environment.development.ts`

**Solución**:

```bash
# Verifica .gitignore:
cat .gitignore | grep environment.development

# Debería mostrar la línea. Si no:
echo "libs/data-access/src/lib/config/environment.development.ts" >> .gitignore

# Luego:
git rm --cached libs/data-access/src/lib/config/environment.development.ts
```

### **Problema 4: "Token inválido"**

**Síntoma**: Error de autenticación

**Solución**:

1. Verifica que el token no haya expirado
2. Verifica los scopes (`public_repo`, `read:user`)
3. Regenera el token si es necesario

---

## 🔄 **Regenerar Token**

Si tu token se expone o expira:

1. Ve a https://github.com/settings/tokens
2. Click en el token existente
3. **Delete** o **Regenerate**
4. Copia el nuevo token
5. Actualiza `environment.development.ts`
6. Rebuild

---

## ✅ **Checklist de Seguridad**

Antes de hacer commit a GitHub:

- [ ] `environment.development.ts` tiene tu token
- [ ] `environment.development.ts` está en `.gitignore`
- [ ] `git status` NO muestra `environment.development.ts`
- [ ] Build funciona sin rate limit errors
- [ ] Aplicación carga tus repos correctamente
- [ ] Solo archivos seguros están staged

---

## 📞 **¿Necesitas Ayuda?**

Si tienes problemas:

1. Lee esta guía completa
2. Verifica [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
3. Contacta: yohani95301@gmail.com

---

**🔐 Tu token está seguro. Git nunca lo subirá. Desarrolla tranquilo.** ✅

---

**Última actualización**: 2025-10-11  
**Versión**: 2.0 (Sistema TypeScript)  
**Autor**: Yohani Espinoza
