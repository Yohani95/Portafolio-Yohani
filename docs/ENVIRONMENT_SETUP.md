# 🔧 Configuración de Variables de Entorno - Sistema SEGURO

## 📋 Nuevo Sistema de Configuración

Este portafolio usa archivos TypeScript para manejar variables sensibles de forma **100% SEGURA**. Tu token de GitHub **NUNCA** se subirá a Git.

---

## 🚀 Quick Setup (3 pasos)

### **Paso 1: Copiar archivo de ejemplo**

```bash
# Ejecuta desde la raíz del proyecto:
cp libs/data-access/src/lib/config/environment.example.ts libs/data-access/src/lib/config/environment.development.ts
```

### **Paso 2: Editar con tu token**

Abre `libs/data-access/src/lib/config/environment.development.ts` y edita la línea 16:

```typescript
githubToken: 'ghp_tu_token_real_aqui', // 👈 PEGA TU TOKEN AQUÍ
```

### **Paso 3: Listo!**

```bash
# Construir y ejecutar
npm run dev
```

---

## 🔒 **¿Por qué esto es SEGURO?**

### ✅ **Ventajas del nuevo sistema:**

1. **`.gitignore` configurado**:

   ```
   # En .gitignore (línea 48):
   libs/data-access/src/lib/config/environment.development.ts
   ```

   ➡️ Este archivo **NUNCA** se sube a GitHub

2. **Archivos separados**:

   - `environment.ts` - Base (sin secrets, se sube a Git) ✅
   - `environment.development.ts` - Con tu token (NO se sube) 🔒
   - `environment.example.ts` - Template (se sube a Git) ✅

3. **TypeScript nativo**:

   - No necesita librerías externas
   - Tipado completo
   - Autocomplete en tu IDE

4. **Git-safe por defecto**:
   - Si intentas hacer commit, Git ignorará tu token automáticamente
   - No necesitas recordar borrar el token antes de commit

---

## 📁 **Estructura de Archivos**

```
libs/data-access/src/lib/config/
├── environment.ts                    # Base (se sube a Git) ✅
├── environment.example.ts            # Template (se sube a Git) ✅
└── environment.development.ts        # TU TOKEN (NO se sube) 🔒
```

---

## ⚙️ **Variables Disponibles**

| Variable         | Descripción          | Requerida | Ejemplo                 |
| ---------------- | -------------------- | --------- | ----------------------- |
| `githubToken`    | Token de GitHub API  | ⚠️ Sí     | `ghp_xxxxx...`          |
| `githubUsername` | Tu usuario de GitHub | ✅ Sí     | `Yohani95`              |
| `baseUrl`        | URL de la aplicación | No        | `http://localhost:4200` |
| `gaTrackingId`   | Google Analytics ID  | No        | `G-XXXXXXXXXX`          |

---

## 🔑 **Cómo Obtener GitHub Token**

Ver guía completa: [GITHUB_TOKEN_SETUP.md](./GITHUB_TOKEN_SETUP.md)

**Resumen rápido**:

1. Ve a https://github.com/settings/tokens
2. Click en **"Generate new token (classic)"**
3. Selecciona estos scopes:
   - ✅ `public_repo`
   - ✅ `read:user`
4. Click en **"Generate token"**
5. **Copia el token** (solo se muestra una vez)
6. Pégalo en `environment.development.ts`

---

## 🌍 **Configuración por Entorno**

### **Desarrollo Local** 💻

Usa `environment.development.ts`:

```typescript
export const environment = {
  production: false,
  githubToken: 'ghp_tu_token_aqui', // 🔑 Token real
  githubUsername: 'Yohani95',
  baseUrl: 'http://localhost:4200',
  gaTrackingId: '',
};
```

✅ Archivo en `.gitignore`  
✅ Seguro para poner tokens reales

### **Producción (Vercel)** 🌐

Configura en **Vercel Dashboard** → **Settings** → **Environment Variables**:

| Name              | Value                           |
| ----------------- | ------------------------------- |
| `GITHUB_TOKEN`    | `ghp_tu_token_aqui`             |
| `GITHUB_USERNAME` | `Yohani95`                      |
| `BASE_URL`        | `https://tu-dominio.vercel.app` |

➡️ Vercel inyectará las variables durante el build

---

## ⚠️ **Qué NO Hacer**

❌ **NO** pongas tu token en `environment.ts` (se sube a Git)  
❌ **NO** hagas commit de `environment.development.ts`  
❌ **NO** compartas tu token públicamente  
❌ **NO** uses el mismo token para múltiples proyectos

---

## ✅ **Qué SÍ Hacer**

✅ **SÍ** usa `environment.development.ts` para desarrollo  
✅ **SÍ** verifica que está en `.gitignore`  
✅ **SÍ** usa variables de Vercel para producción  
✅ **SÍ** regenera el token si se expone

---

## 🔍 **Verificar Configuración**

### **Verificar que tu token funciona:**

```bash
# Construir la aplicación
npm run build

# Si ves este error durante el build:
# "Error loading repositories: rate limit exceeded"
# ➡️ El token NO está configurado o es inválido

# Si el build es exitoso SIN errores de rate limit:
# ➡️ El token está funcionando correctamente ✅
```

### **Verificar que está en .gitignore:**

```bash
# Ejecutar desde la raíz del proyecto:
git status

# Si NO ves "environment.development.ts" en la lista:
# ➡️ Está correctamente ignorado ✅

# Si SÍ lo ves en "Untracked files":
# ➡️ Verifica que .gitignore tiene esta línea:
# libs/data-access/src/lib/config/environment.development.ts
```

---

## 🆘 **Troubleshooting**

### **Problema 1: "rate limit exceeded"**

**Síntoma**: Error 403 de GitHub API

**Solución**:

1. Verifica que `environment.development.ts` existe
2. Verifica que el token esté correctamente pegado
3. Verifica que el token tenga los permisos correctos
4. Rebuild: `npx nx reset && npx nx build portfolio-web`

### **Problema 2: "Token no configurado"**

**Síntoma**: Advertencia en consola del navegador

**Solución**:

1. Crea `environment.development.ts` si no existe
2. Agrega tu token
3. Rebuild y reinicia el servidor

### **Problema 3: "File not found - environment.development.ts"**

**Síntoma**: Error de TypeScript al compilar

**Solución**:

```bash
# Verifica que el archivo existe:
ls libs/data-access/src/lib/config/environment.development.ts

# Si no existe, créalo:
cp libs/data-access/src/lib/config/environment.example.ts libs/data-access/src/lib/config/environment.development.ts
```

---

## 📚 **Guías Relacionadas**

- [GITHUB_TOKEN_SETUP.md](./GITHUB_TOKEN_SETUP.md) - Crear token de GitHub paso a paso
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy a Vercel con variables de entorno
- [README.md](./README.md) - Documentación principal

---

## 🎯 **Checklist Final**

Antes de hacer tu primer commit, verifica:

- [ ] `environment.development.ts` creado con tu token
- [ ] `environment.development.ts` está en `.gitignore`
- [ ] Build funciona sin errores: `npm run build`
- [ ] Servidor funciona: `npm run dev`
- [ ] Proyectos de GitHub se cargan correctamente
- [ ] `git status` NO muestra `environment.development.ts`
- [ ] Solo archivos seguros están staged para commit

---

**✨ ¡Configuración segura completada!** Ahora puedes desarrollar tranquilo sabiendo que tu token está protegido.

---

**Última actualización**: 2025-10-11  
**Versión**: 2.0 (Sistema TypeScript)  
**Autor**: Yohani Espinoza
