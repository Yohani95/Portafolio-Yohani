import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureContact } from './feature-contact';

describe('FeatureContact', () => {
  let component: FeatureContact;
  let fixture: ComponentFixture<FeatureContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureContact],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
