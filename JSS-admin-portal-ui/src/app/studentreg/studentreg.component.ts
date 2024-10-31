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
  changePasswordData = {
    email: '',
    oldPassword: '',
    newPassword: ''
  };
  
  constructor(private http: HttpClient, private router: Router) {}
  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  
  onChangePasswordSubmit() {
    this.http.put('http://localhost:8080/users/change-password', this.changePasswordData, { responseType: 'text' })
      .subscribe(
        (response: any) => {
          alert('Password updated successfully');
          this.router.navigate(['/login']);
        },
        (error) => {
          alert('Failed to change password. Please check the old password and try again.');
        }
      );
  }
  }
  