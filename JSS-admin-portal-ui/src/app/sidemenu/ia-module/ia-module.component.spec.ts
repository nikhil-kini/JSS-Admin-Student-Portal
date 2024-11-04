import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IAModuleComponent } from './ia-module.component';

describe('IAModuleComponent', () => {
  let component: IAModuleComponent;
  let fixture: ComponentFixture<IAModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IAModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IAModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
