import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

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

//   constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getFileList();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const documentType = this.selectedDocumentType; // Get selected document type
      const documentName = file.name; // Get the file name
      const documentTypeMapping = this.getFileType(file); // Get the file type
  
      // Check if the selected document type matches the file type
      if (this.isFileTypeValid(documentType, documentTypeMapping)) {
        // Ensure documentTypeMapping is a string before uploading
        if (documentTypeMapping) {
          const uploadDate = new Date(); // Get current date
          this.uploadFile(file, documentType, documentName, documentTypeMapping, uploadDate).subscribe(
            response => {
              alert('File uploaded successfully');
              // Add the newly uploaded file to the fileList
              this.fileList.push({
                documentType,
                fileName: documentName,
                fileType: documentTypeMapping,
                uploadDate: uploadDate // Set the upload date
              });
              this.selectedFileName = documentName; // Set the selected file name
              this.getFileList(); // Optionally refresh file list from server
            },
            error => {
              if (error.status === 409) {
                alert('File already exists with the same name');
              } else {
                console.error('Error uploading file:', error);
              }
            }
          );
        }
      } else {
        alert(`Invalid file type for ${documentType}. Please select a valid ${documentType} file.`);
      }
    } else {
      alert('Please select a document type and file to upload');
    }
  }

  uploadFile(file: File, documentType: string, fileName: string, fileType: string, uploadDate: Date): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    formData.append('fileName', fileName);
    formData.append('fileType', fileType);
    formData.append('uploadDate', uploadDate.toISOString()); // Add the upload date in ISO format
  
    return this.http.post<any>(`${this.baseUrl}/upload`, formData).pipe(
      tap(response => {
        console.log('Upload successful. Server response:', response); // Log server response on success
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error uploading file. Full error details:', error); // Log full error details
        console.error('Error message:', error.message);
        console.error('Error status:', error.status);
        console.error('Error status text:', error.statusText);
        return throwError(() => new Error('Error uploading file'));
      })
    );
  }

  isFileTypeValid(selectedType: string, fileType: string | null): boolean {
    // Return false if fileType is null
    if (!fileType) {
      return false;
    }

    // Validate the file type against the selected document type
    switch (selectedType) {
      case 'pdf':
        return fileType === 'application/pdf';
      case 'excel':
        return fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      case 'word':
        return fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'image':
        return fileType === 'image/jpeg' || fileType === 'image/png'; // Add more types if needed
      case 'ppt':
        return fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
      default:
        return false; // Invalid type
    }
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