import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECdepartmentComponent } from './ecdepartment.component';

describe('ECdepartmentComponent', () => {
  let component: ECdepartmentComponent;
  let fixture: ComponentFixture<ECdepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ECdepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ECdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
