import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-changed-password',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './changed-password.component.html',
  styleUrl: './changed-password.component.css'
})
export class ChangedPasswordComponent {
//   changePasswordData = {
//     email: '',
//     password: ''
//   };

//   constructor(private http: HttpClient, private router: Router) {}
//   navigateToLogin() {
//     this.router.navigate(['/login']);
//   }
//   onChangePasswordSubmit() {
//     console.log('Changing password for:', this.changePasswordData);
//     this.http.put('http://localhost:8080/users/forgot-password', this.changePasswordData, { responseType: 'text' }).subscribe(
//       (response: any) => {
//         console.log('Password change successful:', response);
//         alert('Password updated successfully');
//         this.router.navigate(['/login']);
//       },
//       (error) => {
//         console.error('Password change failed:', error);
//         alert('Failed to change password');
//       }
//     );
//   }
  
// }




changePasswordData = {
  email: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
};

constructor(private http: HttpClient, private router: Router) {}

navigateToLogin() {
  this.router.navigate(['/login']);
}

onChangePasswordSubmit() {
  // Validate that newPassword and confirmPassword match
  if (this.changePasswordData.newPassword !== this.changePasswordData.confirmPassword) {
      alert("New passwords do not match.");
      return;
  }

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