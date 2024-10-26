import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  // constructor(private authService: AuthService, private router: Router) {}
  // onLogout() {
  //   localStorage.removeItem('isAuthenticated');
  //   this.router.navigate(['/login']);
  // }

  loginData = {
    email: '',
    password: ''
  };
  
  changePasswordData = {
    email: '',
    password: ''
  };
  
  showChangePasswordForm = true; // Flag to show/hide change password form
  
  constructor(private http: HttpClient, private router: Router) {}
  
  onLoginSubmit() {
    this.http.post('http://localhost:8080/api/auth/login', this.loginData).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Invalid credentials');
      }
    );
  }
  
  onChangePasswordSubmit() {
   
    this.http.put('http://localhost:8080/api/auth/change-password', this.changePasswordData).subscribe(
      (response: any) => {
        console.log('Password change successful:', response);
        alert('Password updated successfully');
        this.showChangePasswordForm = false; // Hide the form after successful change
      },
      (error) => {
        console.error('Password change failed:', error);
        alert('Failed to change password');
      }
    );
  }
  
  toggleChangePasswordForm() {
    this.showChangePasswordForm = !this.showChangePasswordForm; // Toggle the visibility
  }
  } 
