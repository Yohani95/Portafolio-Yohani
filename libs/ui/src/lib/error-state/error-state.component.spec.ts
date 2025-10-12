import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorStateComponent } from './error-state.component';

describe('ErrorStateComponent', () => {
  let component: ErrorStateComponent;
  let fixture: ComponentFixture<ErrorStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display default title and message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h3');
    const message = compiled.querySelector('p');

    expect(title?.textContent).toContain('¡Oops! Algo salió mal');
    expect(message?.textContent).toContain('No pudimos cargar los datos');
  });

  it('should display custom title and message', () => {
    component.title = 'Error personalizado';
    component.message = 'Mensaje personalizado';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h3');
    const message = compiled.querySelector('p');

    expect(title?.textContent).toContain('Error personalizado');
    expect(message?.textContent).toContain('Mensaje personalizado');
  });

  it('should show retry button by default', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.textContent).toContain('Reintentar');
  });

  it('should hide retry button when showRetry is false', () => {
    component.showRetry = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).toBeFalsy();
  });

  it('should emit retry event when button is clicked', () => {
    let retryEmitted = false;
    component.retry.subscribe(() => {
      retryEmitted = true;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(retryEmitted).toBe(true);
  });

  it('should render error icon', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icon = compiled.querySelector('svg');
    expect(icon).toBeTruthy();
  });

  it('should apply correct styling classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.flex-col');
    expect(container).toBeTruthy();
    expect(container?.classList.contains('items-center')).toBe(true);
  });
});
