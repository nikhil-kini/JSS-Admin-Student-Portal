import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadfileService } from '../uploadfile.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router,private http: HttpClient,private uploadService: UploadfileService) {}
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


  // days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  // timings: string[] = [
  //   '9 AM',
  //   '10 AM',
  //   '11 AM',
  //   '12 PM',
  //   '1 PM',
  //   '2 PM',
  //   '3 PM',
  //   '4 PM',
  //   '5 PM'
  // ];
  // timetable: { [key: string]: string[] } = {
  //   Monday: ['Math', 'Science', 'English', '', 'History', ''],
  //   Tuesday: ['History', '', 'Geography', 'Art', '', ''],
  //   Wednesday: ['PE', '', 'Music', '', 'Chemistry', ''],
  //   Thursday: ['Art', '', 'Physics', 'Biology', '', ''],
  //   Friday: ['Literature', 'Math', '', '', 'Chemistry', ''],
  //   Saturday: ['Computer Science', '', 'History', '', 'Physics', '']
  // };


  baseUrl = 'http://localhost:8080/api/files';
    uploadedFileName = '';
    fileList: string[] = [];
    selectedFileName = '';
  
    // constructor(private http: HttpClient) {}
  
    ngOnInit() {
        this.getFileList();
    }
  
    onFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.uploadFile(file).subscribe(
                response => {
                    alert('File uploaded successfully');
                    this.uploadedFileName = response.downloadUrl;
                    this.getFileList(); // Refresh file list after upload
                },
                error => {
                    if (error.status === 409) { // Conflict
                        alert('File already exists with the same name');
                    } else {
                        console.error('Error uploading file:', error);
                    }
                }
            );
        }
    }
  
    uploadFile(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.baseUrl}/upload`, formData);
    }
  
   
  
    onFileSelect() {
        this.uploadedFileName = `${this.baseUrl}/download/${this.selectedFileName}`;
    }
  
    getFileList() {
      this.http.get<string[]>(`${this.baseUrl}/list`).subscribe(
          fileList => {
              this.fileList = fileList;
          },
          error => {
              console.error('Error fetching file list:', error);
              if (error.status === 0) {
                  alert('Network error or server not reachable');
              } else {
                  alert('Error fetching file list: ' + error.message);
              }
          }
      );
  }
  
    downloadSelectedFile() {
      if (this.selectedFileName) {
          const downloadUrl = `${this.baseUrl}/download/${this.selectedFileName}`;
          this.http.get(downloadUrl, { responseType: 'blob' })
              .subscribe(blob => {
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = this.selectedFileName;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
              }, error => {
                  console.error('Error downloading file:', error);
              });
      } else {
          alert('Please select a file to download');
      }
  }
  }