import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';


interface Document {
  docId?: number;
  documentType: string;
  fileName: string;
  fileType: string;
  uploadDate?: Date;
  semester: string;
}

interface UploadResponse {
  message?: string;
  error?: string;
}
@Component({
  selector: 'app-studentreg',
  standalone: true,
  imports: [FormsModule,RouterModule,RouterOutlet,CommonModule],
  templateUrl: './studentreg.component.html',
  styleUrl: './studentreg.component.css'
})
export class StudentregComponent {
 

  home(){
    this.router.navigate(['/sidemenu/home']);

  }
  timetable(){
    this.router.navigate(['/sidemenu/time-table']);

  }
  studentsmanagement(){
    this.router.navigate(['/sidemenu/students-management']);
  }
  attendancemanagement(){
    this.router.navigate(['/sidemenu/attendance-management']);
  }
  questionbank(){
    this.router.navigate(['/sidemenu/question-bank']);
  }
    iamodule(){
      this.router.navigate(['/sidemenu/ia-module']);
    }
    feedbacksystem(){
      this.router.navigate(['/sidemenu/feedback-system']);
    }
    lessonplan(){
      this.router.navigate(['/sidemenu/lesson-plan']);
    }
    teachingaids(){
      this.router.navigate(['/sidemenu/teaching-aids']);
    }
    logout() {
      localStorage.removeItem('isAuthenticated'); 
    localStorage.removeItem('loginUser');
      this.router.navigate(['/auth/login']);
    }
    personaldocuments(){
      
      this.router.navigate(['/sidemenu/personal-documents'])
    }



    baseUrl = 'http://localhost:8080/api/files';
  fileList: string[] = []; // Just filenames for display
  selectedFileName = '';
  selectedDocumentType = '';
  selectedSemester: 'sem1' | 'sem2' | 'sem3' | 'sem4' | 'sem5' | 'sem6' = 'sem1';  // Restrict to valid semester values

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getFileList();
  }
  getFileList() {
    // Assuming selectedSemester is the variable where the selected semester is stored
    const semester = this.selectedSemester ;  // Use 'sem1' as default if no semester is selected

    // Call the backend to get the list of files for the selected semester
    this.http.get<string[]>(`${this.baseUrl}/list?semester=${semester}`).subscribe(
      (fileList: string[]) => {
        this.fileList = fileList;  // Set the file list from the response
      },
      error => {
        console.error('Error fetching file list:', error);
        alert('Error fetching file list: ' + error.message);  // Show error if the list fetch fails
      }
    );
}

// getFileList() {
//   this.http.get<Document[]>(`${this.baseUrl}/list`).subscribe(
//     fileList => {
//       this.fileList = fileList;
//     },
//     error => {
//       console.error('Error fetching file list:', error);
//       alert('Error fetching file list: ' + error.message);
//     }
//   );
// }
  
  // Handle file selection and upload
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file && this.selectedDocumentType && this.selectedSemester) {
      const documentType = this.selectedDocumentType;
      const documentName = file.name;
      const documentTypeMapping = this.getFileType(file);

      // Determine the upload directory based on selected semester
      const uploadDirectory = this.getUploadDirectory(this.selectedSemester);

      if (this.isFileTypeValid(documentType, documentTypeMapping)) {
        if (documentTypeMapping) {
          this.uploadFile(file, documentType, documentName, documentTypeMapping, uploadDirectory).subscribe(
            (response: UploadResponse) => {
              if (response && response.error) {
                alert(response.error);
                return;
              }
              alert('File uploaded successfully');

              // Reset the semester and document type dropdowns
              this.selectedSemester = 'sem1';  // Reset to null to show "Select Semester"
              this.selectedDocumentType = '';  // Reset to no document type

              // Refresh the file list
              this.getFileList(); // Refresh the file list
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
          alert('Invalid file type. Please select a valid file.');
        }
      } else {
        alert(`Invalid file type for ${documentType}. Please select a valid ${documentType} file.`);
      }
    } else {
      alert('Please select a document type, semester, and file to upload.');
    }
  }

  // Determine the upload directory based on the selected semester
  getUploadDirectory(semester: 'sem1' | 'sem2' | 'sem3' | 'sem4' | 'sem5' | 'sem6'): string {
    const semesterDirectories: { [key in 'sem1' | 'sem2' | 'sem3' | 'sem4' | 'sem5' | 'sem6']: string } = {
      'sem1': 'C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem1/',
      'sem2': 'C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem2/',
      'sem3': 'C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem3/',
      'sem4': 'C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem4/',
      'sem5': 'C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem5/',
      'sem6': 'C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem6/',
    };
    return semesterDirectories[semester];  // TypeScript will infer that this is always valid
  }

  // Validate file type based on document type
  isFileTypeValid(selectedType: string, fileType: string | null): boolean {
    if (!fileType) return false;
    const validTypes: { [key: string]: string[] } = {
      pdf: ['application/pdf'],
      excel: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
      word: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      image: ['image/jpeg', 'image/png'],
      ppt: ['application/vnd.openxmlformats-officedocument.presentationml.presentation']
    };
    return validTypes[selectedType]?.includes(fileType) ?? false;
  }

  // Handle file upload
  uploadFile(file: File, documentType: string, fileName: string, fileType: string, uploadDir: string): Observable<Object> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    formData.append('fileName', fileName);
    formData.append('fileType', fileType);
    formData.append('uploadDate', new Date().toISOString());
    formData.append('uploadDir', uploadDir);  // Include the upload directory in the request
    
    // Ensure selectedSemester is a valid string (empty string if null)
    formData.append('semester', this.selectedSemester || '');  // Default to an empty string if null
  
    const loginUser = localStorage.getItem('loginUser');
    if (loginUser) {
      formData.append('userId', loginUser);
      return this.http.post(`${this.baseUrl}/upload`, formData);
    } else {
      return of({ error: 'No logged-in user found.' });
    }
  }
  
  // Get file type (mimicking the backend's file detection)
  getFileType(file: File): string {
    if (file.type.includes('pdf')) {
      return 'application/pdf';
    } else if (file.type.includes('image')) {
      return 'image/jpeg';
    } else if (file.type.includes('excel')) {
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (file.type.includes('word')) {
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (file.type.includes('ppt')) {
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    }
    return '';
  }

  // Handle file selection for download
  downloadSelectedFile() {
    if (this.selectedFileName) {
      const downloadUrl = `${this.baseUrl}/download/Fall2024/${this.selectedFileName}`; // Adjust for the correct semester and filename
      this.http.get(downloadUrl, { responseType: 'blob' }).subscribe(
        (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.selectedFileName;
          a.click();
          window.URL.revokeObjectURL(url); // Clean up after download
        },
        (error) => {
          console.error('Download failed:', error);
          alert('Error downloading file');
        }
      );
    } else {
      alert('Please select a file to download');
    }
  }

  fetchFileList() {
    // Replace 'semester' with the actual semester you're interested in
    const semester = 'Fall2024';
    this.http.get<string[]>(`${this.baseUrl}/list?semester=${semester}`).subscribe(
      (files) => {
        this.fileList = files;
      },
      (error) => {
        console.error('Error fetching file list:', error);
      }
    );
  }

  onFileSelect() {
    console.log('Selected file:', this.selectedFileName);
  }
  // Get download URL for the file
  getFileDownloadUrl(fileName: string): string {
    return `${this.baseUrl}/download/${fileName}`;
  }
}
   // changePasswordData = {
  //   email: '',
  //   oldPassword: '',
  //   newPassword: ''
  // };
  
  // constructor(private http: HttpClient, private router: Router) {}
  
  // navigateToLogin() {
  //   this.router.navigate(['/login']);
  // }
  
  // onChangePasswordSubmit() {
  //   this.http.put('http://localhost:8080/users/change-password', this.changePasswordData, { responseType: 'text' })
  //     .subscribe(
  //       (response: any) => {
  //         alert('Password updated successfully');
  //         this.router.navigate(['/login']);
  //       },
  //       (error) => {
  //         alert('Failed to change password. Please check the old password and try again.');
  //       }
  //     );
  // }
  // }
  

 