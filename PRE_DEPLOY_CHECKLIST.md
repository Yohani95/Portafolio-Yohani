# ✅ Checklist Pre-Deployment

## 🚀 Antes de Subir a GitHub y Desplegar en Vercel

### **Paso 1: Verificar que environment.development.ts NO se subirá**

```bash
git status
```

✅ **NO debe aparecer**: `environment.development.ts`  
✅ **Debe aparecer**: Otros archivos modificados

---

### **Paso 2: Hacer el deployment**

```bash
# 1. Agregar archivos
git add .

# 2. Commit
git commit -m "feat: portafolio profesional completo v1.0.0"

# 3. Push
git push -u origin main
```

---

### **Paso 3: Deploy en Vercel**

1. Ve a https://vercel.com/new
2. Importa tu repositorio
3. Config:
   - Build: `npx nx build portfolio-web --configuration=production`
   - Output: `dist/apps/portfolio-web/browser`
4. **Deploy**

⚠️ **El build en Vercel FALLARÁ** porque `environment.development.ts` no existe

---

### **Paso 4: Arreglar para Vercel**

En tu máquina local, haz este cambio en `environment.ts` línea 20:

**Comentar**:

```typescript
// import { environment as devEnvironment } from './environment.development';
```

**Descomentar** (líneas 28-34):

```typescript
export const environment = {
  production: true,
  githubToken: '',
  githubUsername: 'Yohani95',
  baseUrl: 'https://portfolio-yohani-espinoza.vercel.app',
  gaTrackingId: '',
};
```

Luego:

```bash
git add libs/data-access/src/lib/config/environment.ts
git commit -m "fix: usar config por defecto para Vercel"
git push
```

Vercel re-desplegará automáticamente y funcionará.

---

## 💡 **Explicación:**

- **Desarrollo**: Usa `environment.development.ts` con tu token ✅
- **Producción**: Usa valores por defecto sin token ✅
- **GitHub**: Solo recibe archivos seguros sin tokens ✅
- **Vercel**: Funciona con rate limit básico (60/hora) ✅

---

**Total**: 2 commits, 5 minutos, portafolio desplegado ✅
