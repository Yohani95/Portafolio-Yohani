import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, CacheEntry<any>>();
  private readonly DEFAULT_TTL = 15 * 60 * 1000; // 15 minutos en milisegundos
  private platformId = inject(PLATFORM_ID);

  /**
   * Obtiene un valor del caché
   * @param key Clave del caché
   * @param ttl Tiempo de vida en milisegundos (por defecto 15 minutos)
   * @returns El valor cacheado o null si no existe o expiró
   */
  get<T>(key: string, ttl: number = this.DEFAULT_TTL): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    const now = Date.now();
    const isExpired = now - entry.timestamp > ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Guarda un valor en el caché
   * @param key Clave del caché
   * @param data Datos a cachear
   */
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  /**
   * Elimina un valor del caché
   * @param key Clave del caché
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Limpia todo el caché
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Obtiene el tamaño actual del caché
   */
  get size(): number {
    return this.cache.size;
  }
}
