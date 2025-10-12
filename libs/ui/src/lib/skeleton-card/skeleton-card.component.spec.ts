import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkeletonCardComponent } from './skeleton-card.component';

describe('SkeletonCardComponent', () => {
  let component: SkeletonCardComponent;
  let fixture: ComponentFixture<SkeletonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render skeleton structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const skeletonElements = compiled.querySelectorAll('.animate-pulse');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('should have placeholder elements for image, title, description and metadata', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Image placeholder
    const imagePlaceholder = compiled.querySelector('.h-48');
    expect(imagePlaceholder).toBeTruthy();

    // Title placeholder
    const titlePlaceholder = compiled.querySelector('.h-6');
    expect(titlePlaceholder).toBeTruthy();

    // Description placeholders
    const descriptionPlaceholders = compiled.querySelectorAll('.h-4');
    expect(descriptionPlaceholders.length).toBeGreaterThan(0);
  });

  it('should apply dark mode styles', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const darkModeElements = compiled.querySelectorAll('.dark\\:bg-gray-700');
    expect(darkModeElements.length).toBeGreaterThan(0);
  });
});
