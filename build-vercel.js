#!/usr/bin/env node

/**
 * Script de build para Vercel
 * Inyecta variables de entorno en el código antes del build
 */

const fs = require('fs');
const path = require('path');

// Leer variables de entorno de Vercel
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Yohani95';
const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.BASE_URL || 'https://portafolio-yohani.vercel.app';
const GA_TRACKING_ID = process.env.GA_TRACKING_ID || '';

console.log('🔧 Configurando environment para Vercel...');
console.log(`   Token presente: ${GITHUB_TOKEN ? '✅ Sí' : '❌ No'}`);
console.log(`   GitHub Username: ${GITHUB_USERNAME}`);
console.log(`   Base URL: ${BASE_URL}`);

// Generar environment.ts con las variables de Vercel
const environmentContent = `/**
 * Este archivo es generado automáticamente durante el build en Vercel
 * NO lo edites manualmente
 */

export const environment = {
  production: true,
  githubToken: '${GITHUB_TOKEN}',
  githubUsername: '${GITHUB_USERNAME}',
  baseUrl: '${BASE_URL}',
  gaTrackingId: '${GA_TRACKING_ID}',
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
`;

const envPath = path.join(__dirname, 'libs/data-access/src/lib/config/environment.ts');

fs.writeFileSync(envPath, environmentContent, 'utf-8');

console.log('✅ Environment configurado correctamente');
console.log('🚀 Iniciando build de Nx...\n');

// Ejecutar el build de Nx
const { execSync } = require('child_process');
execSync('npx nx build portfolio-web --configuration=production', {
  stdio: 'inherit',
});
