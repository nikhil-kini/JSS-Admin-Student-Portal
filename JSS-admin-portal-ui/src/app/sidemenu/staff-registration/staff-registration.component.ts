import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-registration',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule ],
  templateUrl: './staff-registration.component.html',
  styleUrl: './staff-registration.component.css'
})
export class StaffRegistrationComponent {

  // constructor(private router: Router,private http: HttpClient,private fb: FormBuilder) {}

  home(){
    this.router.navigate(['/sidemenu/home']);

  }
  timetable(){
    this.router.navigate(['/sidemenu/time-table']);

  }
  studentsmanagement(){
    this.router.navigate(['/sidemenu/students-management']);
  }
  attendancemanagement(){
    this.router.navigate(['/sidemenu/attendance-management']);
  }
  questionbank(){
    this.router.navigate(['/sidemenu/question-bank']);
  }
    iamodule(){
      this.router.navigate(['/sidemenu/ia-module']);
    }
    feedbacksystem(){
      this.router.navigate(['/sidemenu/feedback-system']);
    }
    lessonplan(){
      this.router.navigate(['/sidemenu/lesson-plan']);
    }
    teachingaids(){
      this.router.navigate(['/sidemenu/teaching-aids']);
    }
    logout() {
      localStorage.removeItem('isAuthenticated'); 
      localStorage.removeItem('loginUser');
        this.router.navigate(['/auth/login']);
    }
    personaldocuments(){
      
      this.router.navigate(['/sidemenu/personal-documents'])
    }
    staffmanagement(){
      this.router.navigate(['/sidemenu/staff-management'])
    }


  registrationForm: FormGroup;
  uploadedFiles: { [key: string]: File } = {};

  constructor(private router: Router,private http: HttpClient,private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      staffName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
      address: ['', Validators.required],
      adharNo: ['', [Validators.required, Validators.pattern('^\\d{12}$')]],
      sslcMarksCard: [null, Validators.required],
      beMarksCard: [null, Validators.required],
      degreeCertificate: [null, Validators.required],
      photo: [null, Validators.required]
    });
  }

  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFiles[controlName] = input.files[0];
      this.registrationForm.patchValue({ [controlName]: input.files[0] });
    }
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      // Handle form submission logic (e.g., form data submission)
      console.log('Form submitted:', this.registrationForm.value);
      console.log('Uploaded files:', this.uploadedFiles);
    }
  }
}