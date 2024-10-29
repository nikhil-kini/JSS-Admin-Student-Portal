import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Document {
    docId?: number; 
    documentType: string;
    fileName: string;
    fileType: string;
    uploadDate?: Date; 
  }
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
  fileList: Document[] = [];
  selectedFileName = '';
  selectedDocumentType = '';
  uploadedFileName = '';

  ngOnInit() {
    this.getFileList();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const documentType = this.selectedDocumentType; // Get selected document type
      const documentName = file.name; // Get the file name
      const documentTypeMapping = this.getFileType(file); // Get the file type

      if (documentTypeMapping) {
        this.uploadFile(file, documentType, documentName, documentTypeMapping).subscribe(
          response => {
            alert('File uploaded successfully');

            // Update the local file list
            const newDocument: Document = {
              documentType,
              fileName: documentName,
              fileType: documentTypeMapping,
              uploadDate: new Date()
            };
            this.fileList.push(newDocument); // Add new file to list
            this.selectedFileName = documentName; // Set the selected file name

            this.getFileList();
          },
          error => {
            if (error.status === 409) {
              alert('File already exists with the same name');
            } else {
              console.error('Error uploading file:', error);
            }
          }
        );
      } else {
        alert('Invalid file type. Please upload a valid file.');
      }
    } else {
      alert('Please select a document type and file to upload');
    }
  }

  uploadFile(file: File, documentType: string, fileName: string, fileType: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    formData.append('fileName', fileName);
    formData.append('fileType', fileType);
    formData.append('uploadDate', new Date().toISOString()); // Add the upload date

    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getFileType(file: File): string | null {
    // Determine the file type based on the file's MIME type or extension
    if (file.type.includes('pdf')) {
      return 'application/pdf';
    } else if (file.type.includes('image')) {
      return 'image/jpeg'; // Adjust according to your requirements
    } else if (file.type.includes('excel')) {
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (file.type.includes('word')) {
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (file.type.includes('ppt')) {
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    }
    return null; // Invalid file type
  }

  getFileList() {
    this.http.get<Document[]>(`${this.baseUrl}/list`).subscribe(
      fileList => {
        this.fileList = fileList;
      },
      error => {
        console.error('Error fetching file list:', error);
        alert('Error fetching file list: ' + error.message);
      }
    );
  }

  onFileSelect() {
    console.log('Selected file:', this.selectedFileName);
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

  deleteFile(fileName: string) {
    if (confirm(`Are you sure you want to delete ${fileName}?`)) {
      this.http.delete(`${this.baseUrl}/delete/${fileName}`).subscribe(
        () => {
          alert(`${fileName} deleted successfully`);
          this.getFileList(); // Refresh the file list after deletion
        },
        error => {
          console.error('Error deleting file:', error);
          alert('Error deleting file: ' + error.message);
        }
      );
    }
  }
}