import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router,private http: HttpClient) {}
  // constructor(private authService: AuthService, private router: Router) {}
  // onLogout() {
  //   localStorage.removeItem('isAuthenticated');
  //   this.router.navigate(['/login']);
  // }

  // loginData = {
  //   email: '',
  //   password: ''
  // };
  
  // changePasswordData = {
  //   email: '',
  //   password: ''
  // };
  
  // showChangePasswordForm = true; // Flag to show/hide change password form
  
  // constructor(private http: HttpClient, private router: Router) {}
  
  // onLoginSubmit() {
  //   this.http.post('http://localhost:8080/api/auth/login', this.loginData).subscribe(
  //     (response: any) => {
  //       console.log('Login successful:', response);
  //       this.router.navigate(['/home']);
  //     },
  //     (error) => {
  //       console.error('Login failed:', error);
  //       alert('Invalid credentials');
  //     }
  //   );
  // }
  
  // onChangePasswordSubmit() {
   
  //   this.http.put('http://localhost:8080/api/auth/change-password', this.changePasswordData).subscribe(
  //     (response: any) => {
  //       console.log('Password change successful:', response);
  //       alert('Password updated successfully');
  //       this.showChangePasswordForm = false; // Hide the form after successful change
  //     },
  //     (error) => {
  //       console.error('Password change failed:', error);
  //       alert('Failed to change password');
  //     }
  //   );
  // }
  
  // toggleChangePasswordForm() {
  //   this.showChangePasswordForm = !this.showChangePasswordForm; // Toggle the visibility
  // }
  // } 


  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  timings: string[] = [
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM'
  ];
  timetable: { [key: string]: string[] } = {
    Monday: ['Math', 'Science', 'English', '', 'History', ''],
    Tuesday: ['History', '', 'Geography', 'Art', '', ''],
    Wednesday: ['PE', '', 'Music', '', 'Chemistry', ''],
    Thursday: ['Art', '', 'Physics', 'Biology', '', ''],
    Friday: ['Literature', 'Math', '', '', 'Chemistry', ''],
    Saturday: ['Computer Science', '', 'History', '', 'Physics', '']
  };


  private baseUrl = 'http://localhost:8080/api/files';

    onFileChange(event: any) {
      const file = event.target.files[0]; // Get the selected file
      if (file) {
        this.uploadFile(file).subscribe(
          response => {
            console.log('File uploaded successfully:', response);
          },
          error => {
            console.error('Error uploading file:', error);
          }
        );
      }
    }
  
    // Method to upload the file
    uploadFile(file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file); // Append the file to FormData
  
      return this.http.post(`${this.baseUrl}/upload`, formData); // Make the POST request
    }
  
    // Method to download the file
    downloadFile(fileName: string) {
      this.http.get(`${this.baseUrl}/download/${fileName}`, { responseType: 'blob' }).subscribe(
        blob => {
          const url = window.URL.createObjectURL(blob); // Create a URL for the blob
          const a = document.createElement('a'); // Create an anchor element
          a.href = url;
          a.download = fileName; // Set the file name for download
          a.click(); // Programmatically click the anchor to trigger download
          window.URL.revokeObjectURL(url); // Clean up the URL object
        },
        error => {
          console.error('Error downloading file:', error);
        }
      );
    }
  
}