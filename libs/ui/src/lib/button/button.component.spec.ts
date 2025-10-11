import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Variants', () => {
    it('should render primary variant by default', () => {
      const button = compiled.querySelector('button');
      expect(button?.className).toContain('bg-marine-600');
    });

    it('should render secondary variant', () => {
      component.variant = 'secondary';
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.className).toContain('bg-ocean-600');
    });

    it('should render outline variant', () => {
      component.variant = 'outline';
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.className).toContain('border-2');
      expect(button?.className).toContain('border-marine-600');
    });

    it('should render ghost variant', () => {
      component.variant = 'ghost';
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.className).toContain('text-marine-600');
      expect(button?.className).toContain('bg-transparent');
    });
  });

  describe('Sizes', () => {
    it('should render medium size by default', () => {
      const button = compiled.querySelector('button');
      expect(button?.className).toContain('px-6');
      expect(button?.className).toContain('py-2');
    });

    it('should render small size', () => {
      component.size = 'sm';
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.className).toContain('px-3');
      expect(button?.className).toContain('py-1.5');
    });

    it('should render large size', () => {
      component.size = 'lg';
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.className).toContain('px-8');
      expect(button?.className).toContain('py-3');
    });
  });

  describe('Disabled state', () => {
    it('should not be disabled by default', () => {
      const button = compiled.querySelector('button');
      expect(button?.disabled).toBe(false);
    });

    it('should be disabled when disabled prop is true', () => {
      component.disabled = true;
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.disabled).toBe(true);
    });

    it('should have opacity-50 class when disabled', () => {
      component.disabled = true;
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.className).toContain('opacity-50');
    });
  });

  describe('Full width', () => {
    it('should not be full width by default', () => {
      const button = compiled.querySelector('button');
      expect(button?.className).not.toContain('w-full');
    });

    it('should be full width when fullWidth prop is true', () => {
      component.fullWidth = true;
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.className).toContain('w-full');
    });
  });

  describe('Button type', () => {
    it('should be type="button" by default', () => {
      const button = compiled.querySelector('button');
      expect(button?.type).toBe('button');
    });

    it('should render as submit type', () => {
      component.type = 'submit';
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.type).toBe('submit');
    });

    it('should render as reset type', () => {
      component.type = 'reset';
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.type).toBe('reset');
    });
  });

  describe('Router link', () => {
    it('should render as anchor when routerLink is provided', () => {
      component.routerLink = '/test';
      fixture.detectChanges();

      const anchor = compiled.querySelector('a');
      const button = compiled.querySelector('button');

      expect(anchor).toBeTruthy();
      expect(button).toBeFalsy();
    });

    it('should not render anchor when routerLink is not provided', () => {
      const anchor = compiled.querySelector('a[routerLink]');
      expect(anchor).toBeFalsy();
    });

    it('should handle array routerLink', () => {
      component.routerLink = ['/test', '123'];
      fixture.detectChanges();

      const anchor = compiled.querySelector('a');
      expect(anchor).toBeTruthy();
    });
  });

  describe('External link', () => {
    it('should render as anchor when href is provided', () => {
      component.href = 'https://example.com';
      fixture.detectChanges();

      const anchor = compiled.querySelector('a[href]');
      const button = compiled.querySelector('button');

      expect(anchor).toBeTruthy();
      expect(button).toBeFalsy();
    });

    it('should have target="_blank" for external links', () => {
      component.href = 'https://example.com';
      fixture.detectChanges();

      const anchor = compiled.querySelector('a[href]');
      expect(anchor?.getAttribute('target')).toBe('_blank');
    });

    it('should have rel="noopener noreferrer" for external links', () => {
      component.href = 'https://example.com';
      fixture.detectChanges();

      const anchor = compiled.querySelector('a[href]');
      expect(anchor?.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  describe('Content projection', () => {
    it('should project content', () => {
      const testContent = 'Click me';
      fixture = TestBed.createComponent(ButtonComponent);
      component = fixture.componentInstance;
      const nativeElement = fixture.nativeElement as HTMLElement;
      nativeElement.innerHTML = testContent;
      fixture.detectChanges();

      expect(nativeElement.textContent).toContain(testContent);
    });
  });

  describe('Classes', () => {
    it('should have base classes', () => {
      const button = compiled.querySelector('button');
      expect(button?.className).toContain('rounded-lg');
      expect(button?.className).toContain('font-medium');
      expect(button?.className).toContain('transition-all');
    });

    it('should combine variant, size, and fullWidth classes', () => {
      component.variant = 'secondary';
      component.size = 'lg';
      component.fullWidth = true;
      fixture.detectChanges();

      const button = compiled.querySelector('button');
      expect(button?.className).toContain('bg-ocean-600');
      expect(button?.className).toContain('px-8');
      expect(button?.className).toContain('w-full');
    });
  });

  describe('Disabled button with links', () => {
    it('should not render anchor when disabled and routerLink is provided', () => {
      component.routerLink = '/test';
      component.disabled = true;
      fixture.detectChanges();

      const anchor = compiled.querySelector('a');
      const button = compiled.querySelector('button');

      // When disabled and routerLink is set, nothing is rendered
      expect(anchor).toBeFalsy();
      expect(button).toBeFalsy();
    });

    it('should not render anchor when disabled and href is provided', () => {
      component.href = 'https://example.com';
      component.disabled = true;
      fixture.detectChanges();

      const anchor = compiled.querySelector('a');
      const button = compiled.querySelector('button');

      // When disabled and href is set, nothing is rendered
      expect(anchor).toBeFalsy();
      expect(button).toBeFalsy();
    });
  });
});
