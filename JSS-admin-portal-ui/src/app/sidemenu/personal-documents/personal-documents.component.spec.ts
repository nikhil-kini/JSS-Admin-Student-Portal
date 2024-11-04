import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDocumentsComponent } from './personal-documents.component';

describe('PersonalDocumentsComponent', () => {
  let component: PersonalDocumentsComponent;
  let fixture: ComponentFixture<PersonalDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
