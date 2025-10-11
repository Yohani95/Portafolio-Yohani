import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureAbout } from './feature-about';

describe('FeatureAbout', () => {
  let component: FeatureAbout;
  let fixture: ComponentFixture<FeatureAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureAbout],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureAbout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
