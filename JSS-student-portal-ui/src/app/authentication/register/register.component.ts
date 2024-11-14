import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// import * as CryptoJS from 'crypto-js'; 

interface Student {
  userName: string;
  email: string;
  password: string;
  phoneno: string;
  address: string;
  adharno: string;
  role:string;
  sslcMarksCard: File | null;
  beMarksCard: File | null;
  degreeCertificate: File | null;
  photo: File | null;
 dept: string;
 semester:string;
 momphoneno:string;
 dadphoneno:string;
 regno:string;

}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

student: Student = {
  userName: '',
  email: '',
  password: '',
  phoneno: '',
  address: '',
  adharno: 'null',
  sslcMarksCard: null,
  beMarksCard: null,
  degreeCertificate: null,
  photo: null,
  role:'Student',
  dept:'',
  semester:'',
  momphoneno:'',
  dadphoneno:'',
  regno:''

};

private http = inject(HttpClient);
private router = inject(Router);
students: Student[] = [];




onSubmit() {
  
  if (
    !this.student.userName ||
    !this.student.regno ||
    !this.student.phoneno ||
    !this.student.address ||
    !this.student.email ||
    !this.student.password ||
    !this.student.dept ||
    !this.student.semester ||
    !this.student.momphoneno ||
    !this.student.dadphoneno
  ) {
    alert("Please fill all the fields");
    return; // Prevent form submission if any field is empty
  }

  console.log("Submitting form with data:", this.student);

  // const formData = new FormData();
  // formData.append('userName', this.student.userName);
  // formData.append('email', this.student.email);
  // formData.append('password', this.student.password);
  // formData.append('phoneno', this.student.phoneno);
  // formData.append('address', this.student.address);
  // formData.append('adharno', this.student.adharno);
  // formData.append('role',this.student.role);
  // formData.append('dept', this.student.dept);
  // formData.append('semester', this.student.semester);
  // formData.append('momphoneno', this.student.momphoneno);
  // formData.append('dadphoneno', this.student.dadphoneno);
  // formData.append('regno', this.student.regno);

 
  // if (this.student.sslcMarksCard) formData.append('sslcMarksCard', this.student.sslcMarksCard as Blob);
  // if (this.student.beMarksCard) formData.append('beMarksCard', this.student.beMarksCard as Blob);
  // if (this.student.degreeCertificate) formData.append('degreeCertificate', this.student.degreeCertificate as Blob);
  // if (this.student.photo) formData.append('photo', this.student.photo as Blob);

  // const headers = new HttpHeaders();


  this.http.post('http://localhost:8080/users/register1', this.student,{ responseType: 'text' })
    .subscribe({
      next: (response) => {
        console.log('Success:', response);
        localStorage.setItem('loginUser', this.student.userName);
        this.router.navigate(['/auth/login']);
        alert("Registration Successful");
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error:', error);
        alert("Registration Unsuccessful");
      }
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

this.http.post('http://localhost:8080/users/upload-marksCard', formData, { responseType: 'text' })
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

this.http.post('http://localhost:8080/users/upload-photo', formData, { responseType: 'text' })
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