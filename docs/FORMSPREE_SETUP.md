# 📧 Configuración de Formspree para Formulario de Contacto

## 🎯 ¿Qué es Formspree?

Formspree es un servicio que permite manejar formularios de contacto sin necesidad de un backend propio. Perfecto para portafolios estáticos.

**Plan Gratuito:**

- ✅ 50 envíos por mes
- ✅ Protección anti-spam
- ✅ Notificaciones por email
- ✅ Sin tarjeta de crédito necesaria

---

## 🚀 Setup Paso a Paso

### **1. Crear Cuenta en Formspree**

1. Ve a: https://formspree.io
2. Haz clic en **"Get Started Free"**
3. Regístrate con tu email (yohani95301@gmail.com)
4. Verifica tu email

### **2. Crear un Nuevo Formulario**

1. En el dashboard, haz clic en **"+ New Form"**
2. Dale un nombre: "Portafolio - Contacto"
3. **Copia el Form ID** (formato: `xyzabc123`)
   - Lo encontrarás en la URL: `https://formspree.io/forms/[FORM_ID]/integration`
   - O en la sección de integración

### **3. Configurar el Form ID**

#### **Para Desarrollo Local:**

1. Abre: `libs/data-access/src/lib/config/environment.development.ts`
2. Reemplaza `'PENDING_SETUP'` con tu Form ID real:

```typescript
formspreeFormId: 'xyzabc123', // Tu Form ID real aquí
```

#### **Para Producción (Vercel):**

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Ve a **Settings → Environment Variables**
3. Agrega una nueva variable:
   - **Name**: `FORMSPREE_FORM_ID`
   - **Value**: `xyzabc123` (tu Form ID)
   - **Environments**: Marca **Production**, **Preview**, y **Development**
4. Haz clic en **Save**
5. Redeploy tu proyecto para aplicar los cambios

---

## 🧪 Probar el Formulario

### **En Local:**

1. Asegúrate de tener el Form ID configurado en `environment.development.ts`
2. Ejecuta: `npm run dev`
3. Ve a: `http://localhost:4200/contact`
4. Llena el formulario y envía
5. Revisa tu email (yohani95301@gmail.com) - deberías recibir el mensaje

### **En Producción:**

1. Asegúrate de tener la variable `FORMSPREE_FORM_ID` en Vercel
2. Deploy tu proyecto
3. Ve a: `https://tu-portafolio.vercel.app/contact`
4. Envía un mensaje de prueba
5. Verifica tu email

---

## 📊 Dashboard de Formspree

En el dashboard de Formspree puedes:

- Ver todos los mensajes recibidos
- Descargar como CSV
- Ver estadísticas de envíos
- Configurar auto-respuestas
- Ver IPs bloqueadas por spam

**URL**: https://formspree.io/forms/[TU_FORM_ID]

---

## 🛡️ Seguridad y Anti-Spam

Formspree incluye protección automática contra spam:

- ✅ Rate limiting por IP
- ✅ Honeypot fields
- ✅ reCAPTCHA (opcional, plan pago)
- ✅ Lista negra de IPs

---

## 💰 Límites del Plan Gratuito

| Feature               | Plan Gratuito |
| --------------------- | ------------- |
| Envíos/mes            | 50            |
| Formularios           | Ilimitados    |
| Email notifications   | ✅            |
| Dashboard             | ✅            |
| Anti-spam             | ✅            |
| File uploads          | ❌            |
| Custom thank you page | ❌            |

**Upgrade:** Si necesitas más de 50 envíos/mes, considera el plan Gold ($10/mes).

---

## 🐛 Troubleshooting

### **Problema: "Form ID no configurado"**

**Solución:**

1. Verifica que `formspreeFormId` esté en `environment.development.ts`
2. Reinicia el servidor: `npm run dev`

### **Problema: "Error 403 - Forbidden"**

**Solución:**

1. Verifica que tu Form ID sea correcto
2. Asegúrate de que tu email esté verificado en Formspree

### **Problema: "No recibo los emails"**

**Solución:**

1. Revisa la carpeta de spam
2. Verifica tu email en el dashboard de Formspree
3. Asegúrate de que las notificaciones estén activadas

### **Problema: "En producción no funciona"**

**Solución:**

1. Verifica que `FORMSPREE_FORM_ID` esté en Vercel
2. Redeploy después de agregar la variable
3. Revisa los logs de Vercel

---

## 📝 Ejemplos de Mensajes

Cuando alguien envíe un mensaje, recibirás un email con:

```
From: [Nombre del remitente]
Reply-To: [Email del remitente]
Subject: Nuevo mensaje de [Nombre]: [Asunto]

[Mensaje completo aquí]

---
Enviado desde: https://tu-portafolio.vercel.app/contact
```

---

## 🔗 Enlaces Útiles

- **Dashboard**: https://formspree.io/forms
- **Documentación**: https://help.formspree.io
- **Pricing**: https://formspree.io/plans
- **Status**: https://status.formspree.io

---

## ✅ Checklist de Configuración

- [ ] Cuenta creada en Formspree
- [ ] Form ID obtenido
- [ ] Form ID configurado en `environment.development.ts`
- [ ] Variable `FORMSPREE_FORM_ID` agregada en Vercel
- [ ] Probado en local exitosamente
- [ ] Desplegado a producción
- [ ] Probado en producción exitosamente
- [ ] Email de prueba recibido

---

**Última actualización**: 2025-10-12  
**Mantenido por**: Yohani Espinoza
