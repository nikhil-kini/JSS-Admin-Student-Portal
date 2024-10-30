import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-studentreg',
  standalone: true,
  imports: [FormsModule,RouterModule,RouterOutlet,CommonModule],
  templateUrl: './studentreg.component.html',
  styleUrl: './studentreg.component.css'
})
export class StudentregComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLoginSubmit() {
    console.log('Logging in with:', this.loginData);
    this.http.post('http://localhost:8080/users/login', this.loginData).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('loginUser', this.loginData.email);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed:', error);
        if (error.status === 401) {
          alert('Invalid credentials'); // Only alert for 401 errors
        } else {
          alert('An error occurred. Please try again later.');
        }
      }
    );
  }

}
