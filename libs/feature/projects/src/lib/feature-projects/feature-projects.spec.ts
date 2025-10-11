import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureProjects } from './feature-projects';

describe('FeatureProjects', () => {
  let component: FeatureProjects;
  let fixture: ComponentFixture<FeatureProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureProjects],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureProjects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
