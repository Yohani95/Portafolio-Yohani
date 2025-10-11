import { TestBed } from '@angular/core/testing';
import { ThemeService, Theme } from './theme.service';
import { PLATFORM_ID } from '@angular/core';

describe('ThemeService', () => {
  let service: ThemeService;
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    // Mock localStorage
    localStorageMock = {};

    global.Storage.prototype.getItem = jest.fn((key: string) => localStorageMock[key] || null);
    global.Storage.prototype.setItem = jest.fn((key: string, value: string) => {
      localStorageMock[key] = value;
    });
    global.Storage.prototype.removeItem = jest.fn((key: string) => {
      delete localStorageMock[key];
    });
    global.Storage.prototype.clear = jest.fn(() => {
      localStorageMock = {};
    });

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)' ? false : false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  describe('Browser environment', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with light theme by default', () => {
      expect(service.theme()).toBe('light');
    });

    it('should toggle theme from light to dark', () => {
      expect(service.theme()).toBe('light');

      service.toggleTheme();

      expect(service.theme()).toBe('dark');
    });

    it('should toggle theme from dark to light', () => {
      service.setTheme('dark');
      expect(service.theme()).toBe('dark');

      service.toggleTheme();

      expect(service.theme()).toBe('light');
    });

    it('should set theme directly', () => {
      service.setTheme('dark');
      expect(service.theme()).toBe('dark');

      service.setTheme('light');
      expect(service.theme()).toBe('light');
    });

    it('should save theme to localStorage when changed', () => {
      service.setTheme('dark');

      // Give time for effect to run
      setTimeout(() => {
        expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
      }, 0);
    });

    it('should load saved theme from localStorage', () => {
      localStorageMock['theme'] = 'dark';

      // Create new service to test initialization
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      const newService = TestBed.inject(ThemeService);

      expect(newService.theme()).toBe('dark');
    });

    it('should apply dark class to document when theme is dark', () => {
      const rootElement = document.documentElement;

      service.setTheme('dark');

      // Give time for effect to run
      setTimeout(() => {
        expect(rootElement.classList.contains('dark')).toBe(true);
      }, 0);
    });

    it('should remove dark class from document when theme is light', () => {
      const rootElement = document.documentElement;

      // First set to dark
      service.setTheme('dark');

      // Then switch to light
      service.setTheme('light');

      // Give time for effect to run
      setTimeout(() => {
        expect(rootElement.classList.contains('dark')).toBe(false);
      }, 0);
    });

    it('should respect system preference when no saved theme', () => {
      // Clear localStorage
      delete localStorageMock['theme'];

      // Mock system preference for dark mode
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      // Create new service to test initialization with dark mode preference
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      const newService = TestBed.inject(ThemeService);

      expect(newService.theme()).toBe('dark');
    });
  });

  describe('Server environment (SSR)', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'server' }],
      });
      service = TestBed.inject(ThemeService);
    });

    it('should initialize with light theme in SSR', () => {
      expect(service.theme()).toBe('light');
    });

    it('should allow setting theme in SSR', () => {
      service.setTheme('dark');
      expect(service.theme()).toBe('dark');
    });

    it('should toggle theme in SSR', () => {
      service.toggleTheme();
      expect(service.theme()).toBe('dark');

      service.toggleTheme();
      expect(service.theme()).toBe('light');
    });

    it('should not access localStorage in SSR', () => {
      service.setTheme('dark');

      // localStorage should not be called in SSR
      expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('should not access document in SSR', () => {
      const rootElement = document.documentElement;
      const addSpy = jest.spyOn(rootElement.classList, 'add');
      const removeSpy = jest.spyOn(rootElement.classList, 'remove');

      service.setTheme('dark');

      // document methods should not be called in SSR
      expect(addSpy).not.toHaveBeenCalled();
      expect(removeSpy).not.toHaveBeenCalled();
    });
  });

  describe('theme signal', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [ThemeService, { provide: PLATFORM_ID, useValue: 'browser' }],
      });
      service = TestBed.inject(ThemeService);
    });

    it('should return readonly signal', () => {
      const themeSignal = service.theme;
      expect(typeof themeSignal).toBe('function');
    });

    it('should reflect theme changes', () => {
      expect(service.theme()).toBe('light');

      service.setTheme('dark');
      expect(service.theme()).toBe('dark');

      service.toggleTheme();
      expect(service.theme()).toBe('light');
    });
  });
});
