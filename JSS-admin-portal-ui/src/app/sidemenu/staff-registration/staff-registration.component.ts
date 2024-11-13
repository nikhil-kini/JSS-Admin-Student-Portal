import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffService } from '../staff.service';


interface Staff {
  staffName: string;
  email: string;
  password: string;
  phoneno: string;
  address: string;
  adharno: string;
  sslcMarksCard: File | null;
  beMarksCard: File | null;
  degreeCertificate: File | null;
  photo: File | null;
}
@Component({
  selector: 'app-staff-registration',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './staff-registration.component.html',
  styleUrl: './staff-registration.component.css'
})
export class StaffRegistrationComponent {

  constructor(private router: Router,private http: HttpClient,private staffService: StaffService) {}

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


staff: Staff = {
  staffName: '',
  email: '',
  password: '',
  phoneno: '',
  address: '',
  adharno: '',
  sslcMarksCard: null,
  beMarksCard: null,
  degreeCertificate: null,
  photo: null
};

onSubmit() {
  
  const formData = new FormData();
  formData.append('staffName', this.staff.staffName);
  formData.append('email', this.staff.email);
  formData.append('password', this.staff.password);
  formData.append('phoneno', this.staff.phoneno);
  formData.append('address', this.staff.address);
  formData.append('adharno', this.staff.adharno);

 
  if (this.staff.sslcMarksCard) formData.append('sslcMarksCard', this.staff.sslcMarksCard as Blob);
  if (this.staff.beMarksCard) formData.append('beMarksCard', this.staff.beMarksCard as Blob);
  if (this.staff.degreeCertificate) formData.append('degreeCertificate', this.staff.degreeCertificate as Blob);
  if (this.staff.photo) formData.append('photo', this.staff.photo as Blob);

  const headers = new HttpHeaders();

  
  this.http.post('http://localhost:8080/api/staff/register', formData,{ headers, responseType: 'text' })
    .subscribe({
      next: (response) => {
        console.log('Staff registered successfully:', response);
        alert('Registration successful!');
        this.router.navigate(['/sidemenu/staff-management']);
      },
      error: (error) => {
        console.error('Error during registration:', error);
        alert('Registration failed!');
      }
    });
}


onFileSelectSSLC(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.staff.sslcMarksCard = file;
    console.log('SSLC Marks Card selected:', file);
  }
}


onFileSelectBE(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.staff.beMarksCard = file;
    console.log('BE Marks Card selected:', file);
  }
}


onFileSelectDegree(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.staff.degreeCertificate = file;
    console.log('Degree Certificate selected:', file);
  }
}


onFileSelectPhoto(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.staff.photo = file;
    console.log('Photo selected:', file);
  }
}
}