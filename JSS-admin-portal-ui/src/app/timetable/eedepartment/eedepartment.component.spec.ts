import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EEdepartmentComponent } from './eedepartment.component';

describe('EEdepartmentComponent', () => {
  let component: EEdepartmentComponent;
  let fixture: ComponentFixture<EEdepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EEdepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EEdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
