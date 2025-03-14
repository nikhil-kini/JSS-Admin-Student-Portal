import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
    role: 'Admin'
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLoginSubmit() {
    console.log('Logging in with:', this.loginData);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post('http://localhost:8080/users/login', this.loginData, { headers })
      .subscribe(
        (response: any) => {
          console.log('Login successful:', response);

          if (response.id) {  // Ensure response contains userId
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('loginUser', this.loginData.email);
            localStorage.setItem('userId', response.id.toString());

            this.router.navigate(['/sidemenu/home']);
          } else {
            console.error('Login response missing user ID');
            alert('Login failed. Please try again.');
          }
        },
        (error) => {
          console.error('Login failed:', error);
          if (error.status === 401) {
            alert('Invalid credentials');
          } else if (error.status === 0) {
            alert('Cannot connect to server. Please check if the backend is running.');
          } else {
            alert('An error occurred. Please try again later.');
          }
        }
      );
  }
}
