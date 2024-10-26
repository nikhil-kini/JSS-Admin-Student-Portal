import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivildepartmentComponent } from './civildepartment.component';

describe('CivildepartmentComponent', () => {
  let component: CivildepartmentComponent;
  let fixture: ComponentFixture<CivildepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CivildepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CivildepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
