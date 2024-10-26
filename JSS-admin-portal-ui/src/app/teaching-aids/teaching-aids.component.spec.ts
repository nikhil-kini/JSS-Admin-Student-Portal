import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingAidsComponent } from './teaching-aids.component';

describe('TeachingAidsComponent', () => {
  let component: TeachingAidsComponent;
  let fixture: ComponentFixture<TeachingAidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachingAidsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachingAidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
