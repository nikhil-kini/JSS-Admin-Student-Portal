import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CSdepartmentComponent } from './csdepartment.component';

describe('CSdepartmentComponent', () => {
  let component: CSdepartmentComponent;
  let fixture: ComponentFixture<CSdepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CSdepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CSdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
