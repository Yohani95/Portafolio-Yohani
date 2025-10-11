import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache.service';
import { PLATFORM_ID } from '@angular/core';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CacheService, { provide: PLATFORM_ID, useValue: 'browser' }],
    });
    service = TestBed.inject(CacheService);
  });

  afterEach(() => {
    service.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('set and get', () => {
    it('should store and retrieve data', () => {
      const testData = { name: 'test', value: 123 };
      service.set('test-key', testData);

      const retrieved = service.get<typeof testData>('test-key');
      expect(retrieved).toEqual(testData);
    });

    it('should return null for non-existent key', () => {
      const result = service.get('non-existent');
      expect(result).toBeNull();
    });

    it('should store different types of data', () => {
      service.set('string', 'test');
      service.set('number', 42);
      service.set('boolean', true);
      service.set('array', [1, 2, 3]);
      service.set('object', { a: 1, b: 2 });

      expect(service.get('string')).toBe('test');
      expect(service.get('number')).toBe(42);
      expect(service.get('boolean')).toBe(true);
      expect(service.get('array')).toEqual([1, 2, 3]);
      expect(service.get('object')).toEqual({ a: 1, b: 2 });
    });
  });

  describe('TTL (Time To Live)', () => {
    it('should expire data after TTL', () => {
      jest.useFakeTimers();

      service.set('test-key', 'test-value');

      // Inmediatamente debe estar disponible
      expect(service.get('test-key', 1000)).toBe('test-value');

      // Avanzar 1001ms (más que el TTL)
      jest.advanceTimersByTime(1001);

      // Debe haber expirado
      expect(service.get('test-key', 1000)).toBeNull();

      jest.useRealTimers();
    });

    it('should not expire data before TTL', () => {
      jest.useFakeTimers();

      service.set('test-key', 'test-value');

      // Avanzar 500ms (menos que el TTL de 1000ms)
      jest.advanceTimersByTime(500);

      // No debe haber expirado
      expect(service.get('test-key', 1000)).toBe('test-value');

      jest.useRealTimers();
    });

    it('should use default TTL of 15 minutes', () => {
      jest.useFakeTimers();

      service.set('test-key', 'test-value');

      // Avanzar 14 minutos y 59 segundos
      jest.advanceTimersByTime(14 * 60 * 1000 + 59 * 1000);

      // No debe haber expirado
      expect(service.get('test-key')).toBe('test-value');

      // Avanzar 2 segundos más (total 15 min 1 seg)
      jest.advanceTimersByTime(2000);

      // Debe haber expirado
      expect(service.get('test-key')).toBeNull();

      jest.useRealTimers();
    });
  });

  describe('delete', () => {
    it('should delete a specific entry', () => {
      service.set('key1', 'value1');
      service.set('key2', 'value2');

      service.delete('key1');

      expect(service.get('key1')).toBeNull();
      expect(service.get('key2')).toBe('value2');
    });

    it('should not throw error when deleting non-existent key', () => {
      expect(() => service.delete('non-existent')).not.toThrow();
    });
  });

  describe('clear', () => {
    it('should clear all cached data', () => {
      service.set('key1', 'value1');
      service.set('key2', 'value2');
      service.set('key3', 'value3');

      expect(service.size).toBe(3);

      service.clear();

      expect(service.size).toBe(0);
      expect(service.get('key1')).toBeNull();
      expect(service.get('key2')).toBeNull();
      expect(service.get('key3')).toBeNull();
    });
  });

  describe('size', () => {
    it('should return the number of cached entries', () => {
      expect(service.size).toBe(0);

      service.set('key1', 'value1');
      expect(service.size).toBe(1);

      service.set('key2', 'value2');
      expect(service.size).toBe(2);

      service.delete('key1');
      expect(service.size).toBe(1);

      service.clear();
      expect(service.size).toBe(0);
    });
  });

  describe('cache replacement', () => {
    it('should replace existing value when setting same key', () => {
      service.set('test-key', 'old-value');
      expect(service.get('test-key')).toBe('old-value');

      service.set('test-key', 'new-value');
      expect(service.get('test-key')).toBe('new-value');

      // Size should still be 1
      expect(service.size).toBe(1);
    });
  });
});
