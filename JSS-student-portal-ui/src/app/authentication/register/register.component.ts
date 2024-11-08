import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// import * as CryptoJS from 'crypto-js'; 

interface Student {
  username: string;
  password: string;
  email: string;
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
export class RegisterComponent {
  student: Student = {
    username: '',
    password: '',
    email: '',
    semester: '',
    dept: ''
  };

  private http = inject(HttpClient);
  private router = inject(Router);

onSubmit() {
  console.log("Welcome to jupiterking");
  console.log("Submitting form with data:", this.student);
   
  
  
  this.http.post('http://localhost:8080/register-user', this.student)
    .subscribe({
      next: (response) => { 
        console.log('Success:', response);
        this.router.navigate(['/auth/login']);
        alert("Registration Successful");
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error:', error);
        alert("Registration Unsuccessful");
      }
    });
}
}