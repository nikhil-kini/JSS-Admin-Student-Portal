import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicaldepartmentComponent } from './mechanicaldepartment.component';

describe('MechanicaldepartmentComponent', () => {
  let component: MechanicaldepartmentComponent;
  let fixture: ComponentFixture<MechanicaldepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicaldepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechanicaldepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
