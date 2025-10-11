/**
 * Archivo de ejemplo para configuración de desarrollo
 *
 * INSTRUCCIONES:
 * 1. Copia este archivo a environment.development.ts:
 *    cp environment.example.ts environment.development.ts
 *
 * 2. Edita environment.development.ts y agrega tu token real
 *
 * 3. environment.development.ts está en .gitignore y NO se subirá a GitHub
 */

export const environment = {
  production: false,

  /**
   * Token de GitHub para GraphQL API
   * Obtener en: https://github.com/settings/tokens
   * Permisos necesarios: public_repo, read:user
   */
  githubToken: 'ghp_tu_token_real_aqui',

  /**
   * Tu usuario de GitHub
   */
  githubUsername: 'Yohani95',

  /**
   * URL base de la aplicación
   */
  baseUrl: 'http://localhost:4200',

  /**
   * Google Analytics ID (opcional)
   */
  gaTrackingId: '',
};
