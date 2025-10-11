/**
 * Configuración de variables de entorno
 *
 * DESARROLLO LOCAL:
 * - Usa los valores de environment.development.ts
 *
 * PRODUCCIÓN (Vercel):
 * - Comentar las líneas 10-15
 * - Descomentar las líneas 18-24
 * - Commit y push
 *
 * Es manual pero SEGURO y SIMPLE
 */

// DESARROLLO: Configuración para desarrollo local
import { environment as devEnvironment } from './environment.development';
export const environment = devEnvironment;

// PRODUCCIÓN: Configuración para Vercel (comentada para desarrollo)
/*
export const environment = {
  production: true,
  githubToken: '',
  githubUsername: 'Yohani95',
  baseUrl: 'https://portafolio-yohani.vercel.app',
  gaTrackingId: '',
};
*/

/**
 * Validar configuración crítica
 */
export function validateEnvironment(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!environment.githubToken) {
    errors.push('⚠️  GITHUB_TOKEN no configurado. ' + 'Rate limit básico (60 req/hora) aplicado.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Imprimir advertencias de configuración
 */
export function logEnvironmentWarnings(): void {
  if (typeof window === 'undefined') return;

  const validation = validateEnvironment();

  if (!validation.valid) {
    validation.errors.forEach((error) => console.warn(error));
  }
}
