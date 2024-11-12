import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// import * as CryptoJS from 'crypto-js'; 

interface Student {
  username: string;
  phoneno: string;
  email: string;
  address: string,
  momphoneno: string,
  dadphoneno: string,
  regno: string
  password: string;
  semester: string;
  dept: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit  {
  student: Student = {
    username: '',
    phoneno: '91+',
    email: '',
    address: '',
    momphoneno: '91+',
    dadphoneno: '91+',
    regno: '',
    password: '',
    semester: '',
    dept: ''
  };

  private http = inject(HttpClient);
  private router = inject(Router);
  students: Student[] = [];
onSubmit() {
  console.log("Welcome to jupiterking");
  console.log("Submitting form with data:", this.student);
   
  
  
  this.http.post('http://localhost:8080/register-user', this.student)
    .subscribe({
      next: (response) => { 
        console.log('Success:', response);
        localStorage.setItem('loginUser', this.student.username)
        this.router.navigate(['/auth/login']);
        alert("Registration Successful");
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error:', error);
        alert("Registration Unsuccessful");
      }
    });
}

// onFileSelect(event: Event, type: string): void {
//   const input = event.target as HTMLInputElement;
//   if (input.files && input.files.length > 0) {
//     const file = input.files[0];
//     console.log(`${type} file selected:`, file);

//     // Prepare form data to send to the backend
//     const formData = new FormData();
//     if (type === 'marksCard') {
//       formData.append('marksCard', file, file.name);
//     } else if (type === 'photo') {
//       formData.append('photo', file, file.name);
//     }

//     // Send the files to the backend
//     this.http.post('http://localhost:8080/upload-marksCard', formData)
//       .subscribe({
//         next: (response) => {
//           console.log('Success:', response);
//           alert('Files uploaded successfully');
//         },
//         error: (error) => {
//           console.error('Error:', error);
//           alert('File upload failed');
//         }
//       });
//   }
// }


// uploadFile(file: File, type: string) {
//   const formData = new FormData();
//   formData.append(type, file, file.name);  

  
//   const uploadUrl = type === 'marksCard' ? 'http://localhost:8080/upload-marksCard' : 'http://localhost:8080/upload-photo';

//   this.http.post(uploadUrl, formData)
//     .subscribe({
//       next: (response) => {
//         console.log(`${type} uploaded successfully`, response);
//       },
//       error: (error) => {
//         console.error(`${type} upload failed`, error);
//       }
//     });
// }

// onFileSelect(event: Event, type: string): void {
//   const input = event.target as HTMLInputElement;
//   if (input.files && input.files.length > 0) {
//     const file = input.files[0];
//     console.log(`${type} file selected:`, file);

//     // Call the appropriate method for each file type
//     if (type === 'marksCard') {
//       this.uploadMarksCard(file);
//     } else if (type === 'photo') {
//       this.uploadPhoto(file);
//     }
//   }
// }
ngAfterViewInit(): void {
  window.addEventListener('load', function() {
    setTimeout(function() {
      // Your time-consuming task here
      console.log('Time-consuming task started after page load');
    }, 0);
  });
}

onFileSelect(event: Event, type: string): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    // Check file size (e.g., 5MB max)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_SIZE) {
      alert('File size exceeds the maximum limit of 5MB');
      return;
    }

    console.log(`${type} file selected:`, file);

    // Call the appropriate method for each file type
    if (type === 'marksCard') {
      this.uploadMarksCard(file);
    } else if (type === 'photo') {
      this.uploadPhoto(file);
    }
  }
}


uploadMarksCard(file: File): void {
  const formData = new FormData();
  formData.append('marksCard', file, file.name);

  this.http.post('http://localhost:8080/upload-marksCard', formData)
    .subscribe({
      next: (response) => {
        console.log('Marks Card uploaded successfully:', response);
        alert('Marks Card uploaded successfully');
      },
      error: (error) => {
        console.error('Marks Card upload failed:', error);
        alert('Marks Card upload failed');
      }
    });
}

uploadPhoto(file: File): void {
  const formData = new FormData();
  formData.append('photo', file, file.name);

  this.http.post('http://localhost:8080/upload-photo', formData)
    .subscribe({
      next: (response) => {
        console.log('Photo uploaded successfully:', response);
        alert('Photo uploaded successfully');
      },
      error: (error) => {
        console.error('Photo upload failed:', error);
        alert('Photo upload failed');
      }
    });
}

}