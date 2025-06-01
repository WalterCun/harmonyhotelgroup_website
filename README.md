# Harmony Hotel Group Website

Este proyecto utiliza Astro.js y TinaCMS para el sitio web de Harmony Hotel Group.

## Configuración de desarrollo

1. Clona el repositorio
2. Instala las dependencias: `pnpm install`
3. Copia `.env.example` a `.env` y configura las variables de entorno
4. Inicia el servidor de desarrollo: `pnpm run dev`

## Procesos de CI/CD

Este proyecto utiliza GitHub Actions para la integración y despliegue continuos:

### Ramas principales

- **main**: Rama de producción. Los cambios se despliegan automáticamente al entorno de producción.
- **dev**: Rama de desarrollo. Los cambios se despliegan automáticamente al entorno de staging.

### Flujos de trabajo

1. **Production Deployment**: Se ejecuta cuando se realizan cambios en la rama `main`.
    - Ejecuta linting, compilación y pruebas
    - Despliega a producción en Vercel

2. **Staging Deployment**: Se ejecuta cuando se realizan cambios en la rama `dev`.
    - Ejecuta linting, compilación y pruebas
    - Despliega a un entorno de staging en Vercel

3. **Pull Request CI**: Se ejecuta en pull requests hacia `main` o `dev`, y en ramas de issues.
    - Ejecuta linting, compilación y pruebas
    - Para pull requests, crea un despliegue de vista previa

4. **Integration Tests**: Se ejecuta semanalmente y bajo demanda.
    - Ejecuta pruebas de integración en múltiples navegadores

### Convenciones de ramas

- `feature/nombre-de-la-característica`: Para nuevas características
- `bugfix/nombre-del-bug`: Para correcciones de errores
- `issue/numero-de-issue`: Para trabajar en issues específicos

## Pruebas

Este proyecto utiliza Playwright para pruebas de integración:

- `npm test`: Ejecuta todas las pruebas
- `npm run test:e2e`: Ejecuta pruebas end-to-end
- `npm run test:ci`: Ejecuta pruebas en modo CI (solo Chromium)

## Despliegue manual

Si necesitas desplegar manualmente:

1. Construye TinaCMS: `npm run tina-build`
2. Construye el proyecto: `npm run build`
3. Vista previa: `npm run preview`
4. Despliega a Vercel: `vercel --prod` (requiere CLI de Vercel)