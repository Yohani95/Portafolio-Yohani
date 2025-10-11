import { test, expect } from '@playwright/test';

test.describe('Portafolio - Navegación Principal', () => {
  test('debe cargar la página de inicio correctamente', async ({ page }) => {
    await page.goto('/');

    // Verificar que el título contiene el nombre
    await expect(page).toHaveTitle(/Yohani Espinoza/);

    // Verificar que el header está presente
    await expect(page.locator('app-header')).toBeVisible();

    // Verificar que el hero section está visible
    await expect(page.locator('h1')).toContainText('Yohani Espinoza');
  });

  test('debe navegar a la página de proyectos', async ({ page }) => {
    await page.goto('/');

    // Click en el link de proyectos en el header
    await page.click('text=Proyectos');

    // Verificar que estamos en /projects
    await expect(page).toHaveURL(/.*projects/);

    // Verificar que el título de la página cambió
    await expect(page.locator('h1')).toContainText('Proyectos');
  });

  test('debe navegar a la página About', async ({ page }) => {
    await page.goto('/');

    await page.click('text=Acerca de');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('h1')).toContainText('Acerca de');
  });

  test('debe navegar a la página de contacto', async ({ page }) => {
    await page.goto('/');

    await page.click('text=Contacto');
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.locator('h1')).toContainText('Contacto');
  });
});

test.describe('Portafolio - Dark Mode', () => {
  test('debe cambiar entre modo claro y oscuro', async ({ page }) => {
    await page.goto('/');

    // Verificar que inicia en modo claro
    const html = page.locator('html');
    await expect(html).not.toHaveClass(/dark/);

    // Click en el botón de dark mode
    await page.click('button[aria-label*="modo oscuro"]');

    // Verificar que cambió a dark mode
    await expect(html).toHaveClass(/dark/);

    // Click de nuevo para volver a light mode
    await page.click('button[aria-label*="modo claro"]');

    // Verificar que volvió a light mode
    await expect(html).not.toHaveClass(/dark/);
  });
});

test.describe('Portafolio - Proyectos', () => {
  test('debe mostrar el listado de proyectos', async ({ page }) => {
    await page.goto('/projects');

    // Esperar a que carguen los proyectos
    await page.waitForSelector('app-card', { timeout: 10000 });

    // Verificar que hay al menos un proyecto
    const projects = page.locator('app-card');
    await expect(projects).toHaveCount.greaterThan(0);
  });

  test('debe filtrar proyectos con el buscador', async ({ page }) => {
    await page.goto('/projects');

    // Esperar a que carguen los proyectos
    await page.waitForSelector('app-card', { timeout: 10000 });

    // Obtener el número inicial de proyectos
    const initialCount = await page.locator('app-card').count();

    // Escribir en el buscador
    await page.fill('input[type="search"]', 'test');

    // Esperar un momento para que se filtre
    await page.waitForTimeout(500);

    // El número de proyectos puede cambiar o quedar igual
    // dependiendo de si hay proyectos con "test" en el nombre
    const filteredCount = await page.locator('app-card').count();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('debe ordenar proyectos por stars', async ({ page }) => {
    await page.goto('/projects');

    // Esperar a que carguen los proyectos
    await page.waitForSelector('app-card', { timeout: 10000 });

    // Click en el botón de Stars
    await page.click('text=⭐ Stars');

    // Verificar que el botón está activo (tiene bg-marine-600)
    const starsButton = page.locator('button:has-text("⭐ Stars")');
    await expect(starsButton).toHaveClass(/bg-marine-600/);
  });

  test('debe ordenar proyectos por recientes', async ({ page }) => {
    await page.goto('/projects');

    // Esperar a que carguen los proyectos
    await page.waitForSelector('app-card', { timeout: 10000 });

    // Click en el botón de Recientes
    await page.click('text=📅 Recientes');

    // Verificar que el botón está activo
    const recentButton = page.locator('button:has-text("📅 Recientes")');
    await expect(recentButton).toHaveClass(/bg-marine-600/);
  });
});

test.describe('Portafolio - Responsive', () => {
  test('debe ser responsive en mobile', async ({ page }) => {
    // Configurar viewport móvil
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Verificar que el menú móvil está presente
    await expect(page.locator('button[aria-label*="menú"]')).toBeVisible();

    // El menú desktop no debe estar visible
    await expect(page.locator('nav ul.hidden.md\\:flex')).not.toBeVisible();
  });

  test('debe mostrar menú desktop en pantallas grandes', async ({ page }) => {
    // Configurar viewport desktop
    await page.setViewportSize({ width: 1920, height: 1080 });

    await page.goto('/');

    // El menú desktop debe estar visible
    await expect(page.locator('nav ul').first()).toBeVisible();
  });
});

test.describe('Portafolio - Formulario de Contacto', () => {
  test('debe validar el formulario de contacto', async ({ page }) => {
    await page.goto('/contact');

    // Intentar enviar formulario vacío
    await page.click('button[type="submit"]');

    // Verificar que aparecen mensajes de error
    // (Los mensajes se muestran después de submit)
    await expect(page.locator('text=requerido')).toHaveCount.greaterThan(0);
  });

  test('debe permitir llenar el formulario', async ({ page }) => {
    await page.goto('/contact');

    // Llenar el formulario
    await page.fill('input[formControlName="name"]', 'Juan Pérez');
    await page.fill('input[formControlName="email"]', 'juan@example.com');
    await page.fill('input[formControlName="subject"]', 'Consulta');
    await page.fill('textarea[formControlName="message"]', 'Este es un mensaje de prueba');

    // Verificar que los valores se llenaron
    await expect(page.locator('input[formControlName="name"]')).toHaveValue('Juan Pérez');
    await expect(page.locator('input[formControlName="email"]')).toHaveValue('juan@example.com');
  });
});
