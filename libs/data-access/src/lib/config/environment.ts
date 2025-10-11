/**
 * ⚠️  IMPORTANTE: Este archivo será reemplazado durante el build en Vercel
 *
 * El script build-vercel.js inyectará las variables de entorno aquí.
 * Este es solo un placeholder para desarrollo.
 */

export const environment = {
  production: true,
  githubToken: '', // Será inyectado por build-vercel.js
  githubUsername: 'Yohani95',
  baseUrl: 'https://portafolio-yohani.vercel.app',
  gaTrackingId: '',
};

export function validateEnvironment(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!environment.githubToken) {
    errors.push('⚠️  GITHUB_TOKEN no configurado. Rate limit básico (60 req/hora) aplicado.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function logEnvironmentWarnings(): void {
  if (typeof window === 'undefined') return;

  const validation = validateEnvironment();

  if (!validation.valid) {
    validation.errors.forEach((error) => console.warn(error));
  }
}
