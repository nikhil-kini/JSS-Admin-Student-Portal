import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staffmanagement',
  standalone: true,
  imports: [],
  templateUrl: './staffmanagement.component.html',
  styleUrl: './staffmanagement.component.css'
})
export class StaffmanagementComponent {
  constructor(private router: Router,private http: HttpClient) {}

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

    openregister() {
      this.router.navigate(['/sidemenu/staff-registration']);
    }

  //   staff: { 
  //     [key: string]: string | null | File;  // Allow any string key with value types: string, null, or File
  //   } = {
  //     name: '',
  //     email: '',
  //     phone: '',
  //     address: '',
  //     aadhar: '',
  //     sslcMarks: null,
  //     beMarks: null,
  //     degreeCert: null,
  //     photo: null,
  //   };
  
  //   isModalOpen = false;
  
  //   // constructor(private http: HttpClient) {}
  
  //   openStaffRegistrationModal() {
  //     this.isModalOpen = true;
  //   }
  
  //   closeModal() {
  //     this.isModalOpen = false;
  //   }
  
  //   onFileChange(event: any, field: string) {
  //     this.staff[field] = event.target.files[0];
  //   }
  
  //   submitStaffForm() {
  //     const formData = new FormData();
    
  //     formData.append('name', this.staff['name'] as string);
  //     formData.append('email', this.staff['email'] as string);
  //     formData.append('phone', this.staff['phone'] as string);
  //     formData.append('address', this.staff['address'] as string);
  //     formData.append('aadhar', this.staff['aadhar'] as string);
    
  //     // Check if the fields are not null before appending
  //     if (this.staff['sslcMarks']) {
  //       formData.append('sslcMarks', this.staff['sslcMarks'] as Blob);
  //     }
  //     if (this.staff['beMarks']) {
  //       formData.append('beMarks', this.staff['beMarks'] as Blob);
  //     }
  //     if (this.staff['degreeCert']) {
  //       formData.append('degreeCert', this.staff['degreeCert'] as Blob);
  //     }
  //     if (this.staff['photo']) {
  //       formData.append('photo', this.staff['photo'] as Blob);
  //     }
    
  //     this.http.post('http://localhost:8080/api/staff/register', formData).subscribe(response => {
  //       alert('Staff registered successfully!');
  //       this.closeModal(); // Close the modal after submission
  //     });
  //   }
  // }    
}