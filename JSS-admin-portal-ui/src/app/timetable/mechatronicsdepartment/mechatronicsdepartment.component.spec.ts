import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechatronicsdepartmentComponent } from './mechatronicsdepartment.component';

describe('MechatronicsdepartmentComponent', () => {
  let component: MechatronicsdepartmentComponent;
  let fixture: ComponentFixture<MechatronicsdepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechatronicsdepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MechatronicsdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
