# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al portafolio! Aunque este es un proyecto personal, las contribuciones son bienvenidas.

## 📋 Código de Conducta

- Sé respetuoso y profesional
- Acepta feedback constructivo
- Enfócate en mejorar el proyecto

## 🚀 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub, luego:
git clone https://github.com/TU_USUARIO/portfolio-nx.git
cd portfolio-nx
npm install
```

### 2. Crear una Rama

```bash
git checkout -b feature/tu-funcionalidad
# o
git checkout -b fix/tu-correccion
```

### 3. Hacer Cambios

```bash
# Asegúrate de seguir las convenciones:
npm run format          # Formatear código
npm run lint            # Verificar linting
npm run test            # Ejecutar tests
```

### 4. Commit

Usamos **Conventional Commits**:

```bash
git add .
git commit -m "feat: agregar nueva funcionalidad"
# o
git commit -m "fix: corregir bug en componente"
```

**Tipos de commits**:

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Cambios en documentación
- `style`: Formato, espacios en blanco, etc
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Tareas de mantenimiento

### 5. Push y Pull Request

```bash
git push origin feature/tu-funcionalidad
```

Luego crea un Pull Request en GitHub.

## ✅ Checklist antes de PR

- [ ] Código formateado (`npm run format`)
- [ ] Sin errores de lint (`npm run lint`)
- [ ] Tests pasando (`npm run test`)
- [ ] Build exitoso (`npm run build`)
- [ ] Commits siguen Conventional Commits
- [ ] Documentación actualizada (si aplica)

## 🧪 Testing

Todos los cambios deben incluir tests:

```bash
# Unit tests
npx nx test [nombre-del-modulo]

# Tests con coverage
npx nx test [nombre-del-modulo] --coverage

# E2E tests
npm run e2e
```

## 📝 Estilo de Código

- **TypeScript**: Tipado estricto
- **Componentes**: Standalone components
- **State**: Angular Signals
- **RxJS**: Para async operations
- **CSS**: Tailwind utility classes

## 🏗️ Estructura de Archivos

```
libs/
├── ui/                  # Componentes reutilizables
├── data-access/         # Servicios, state, API
└── feature/             # Feature modules (páginas)
```

## 🐛 Reportar Bugs

Si encuentras un bug, por favor abre un [Issue](https://github.com/Yohani95/portfolio-nx/issues) con:

- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Entorno (browser, OS, versión de Node)

## 💡 Sugerencias

¿Tienes ideas para mejorar el portafolio?

1. Abre un [Issue](https://github.com/Yohani95/portfolio-nx/issues)
2. Describe la mejora propuesta
3. Explica por qué sería útil

## 📞 Contacto

Si tienes preguntas:

- 📧 Email: yohani95301@gmail.com
- 💼 LinkedIn: [Yohani Espinoza](https://linkedin.com/in/yohani-espinoza-a14276240)

---

**¡Gracias por contribuir!** 🙌
