import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';

interface Document {
  docId?: number; 
  documentType: string;
  fileName: string;
  fileType: string;
  uploadDate?: Date;
 
}
interface UploadResponse {
  message?: string; // Optional message for success
  error?: string;   // Optional error message
}
@Component({
  selector: 'app-teaching-aids',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './teaching-aids.component.html',
  styleUrl: './teaching-aids.component.css'
})
export class TeachingAidsComponent {
 
  constructor(private http: HttpClient, private fb: FormBuilder,private router: Router) {
    
  }

  home(){
    this.router.navigate(['/home']);

  }
  timetable(){
    this.router.navigate(['/time-table']);

  }
  studentsmanagement(){
    this.router.navigate(['/students-management']);
  }
  attendancemanagement(){
    this.router.navigate(['/attendance-management']);
  }
  questionbank(){
    this.router.navigate(['/question-bank']);
  }
    iamodule(){
      this.router.navigate(['/ia-module']);
    }
    feedbacksystem(){
      this.router.navigate(['/feedback-system']);
    }
    lessonplan(){
      this.router.navigate(['/lesson-plan']);
    }
    teachingaids(){
      this.router.navigate(['/teaching-aids']);
    }
    personaldocuments(){
      this.router.navigate(['/personal-documents'])
    }
    logout() {
      localStorage.removeItem('isAuthenticated'); 
    localStorage.removeItem('loginUser');
      this.router.navigate(['/login']);
    }
  
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
    
        // Check if the selected document type matches the file type
        if (this.isFileTypeValid(documentType, documentTypeMapping)) {
          if (documentTypeMapping) {
            this.uploadFile(file, documentType, documentName, documentTypeMapping).subscribe(
              (response: UploadResponse) => { // Specify the response type here
                if (response && response.error) {
                  alert(response.error); // Handle the error message from the observable
                  return; // Exit if there's an error
                }
                alert('File uploaded successfully');
    
                // Add the newly uploaded file to the fileList
                this.fileList.push({ 
                  documentType, 
                  fileName: documentName, 
                  fileType: documentTypeMapping, 
                  uploadDate: new Date(),
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
          } else {
            alert('File type mapping is invalid.');
          }
        } else {
          alert(`Invalid file type for ${documentType}. Please select a valid ${documentType} file.`);
        }
      } else {
        alert('Please select a document type and file to upload.');
      }
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
    
    uploadFile(file: File, documentType: string, fileName: string, fileType: string): Observable<Object> {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);
      formData.append('fileName', fileName);
      formData.append('fileType', fileType);
      formData.append('uploadDate', new Date().toISOString()); // Add the upload date
    
      // Get the logged-in user's email from local storage
      const loginUser = localStorage.getItem('loginUser');
      if (loginUser) {
        formData.append('userId', loginUser); // Append userId to formData
        return this.http.post(`${this.baseUrl}/upload`, formData); // Return the HTTP request
      } else {
        console.error('No logged-in user found.');
        return of({ error: 'No logged-in user found.' }); // Return an Observable with an error message
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

    resetFileInput(fileInput: HTMLInputElement): void {
      fileInput.value = ''; // Clears the file input field
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


  // constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  // baseUrl = 'http://localhost:8080/api/files';
  // fileList: Document[] = [];
  // selectedFileName = '';
  // selectedDocumentType = '';
  // uploadedFileName = '';

  // ngOnInit() {
  //   this.getFileList();
  // }

//   home() {
//     this.router.navigate(['/home']);
//   }

//   timetable() {
//     this.router.navigate(['/time-table']);
//   }

//   studentsmanagement() {
//     this.router.navigate(['/students-management']);
//   }

//   attendancemanagement() {
//     this.router.navigate(['/attendance-management']);
//   }

//   questionbank() {
//     this.router.navigate(['/question-bank']);
//   }

//   iamodule() {
//     this.router.navigate(['/ia-module']);
//   }

//   feedbacksystem() {
//     this.router.navigate(['/feedback-system']);
//   }

//   lessonplan() {
//     this.router.navigate(['/lesson-plan']);
//   }

//   teachingaids() {
//     this.router.navigate(['/teaching-aids']);
//   }

//   personaldocuments() {
//     this.router.navigate(['/personal-documents']);
//   }

//   logout() {
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('loginUser');
//     this.router.navigate(['/login']);
//   }

//   baseUrl = 'http://localhost:8080/api/files';
//   fileList: Document[] = [];
//   selectedFile: File | null = null;
//   selectedFileName = '';
//   selectedDocumentType = '';
//   documentTypes = ['pdf', 'excel', 'word', 'image', 'ppt'];

//   constructor(private http: HttpClient,private router: Router) {}

//   ngOnInit() {
//     this.getFileList();
//   }

//   onFileChange(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;
//       this.selectedFileName = file.name;
//     }
//   }

//   isFileTypeValid(selectedType: string, fileType: string | null): boolean {
//     if (!fileType) return false;
//     switch (selectedType) {
//       case 'pdf': return fileType === 'application/pdf';
//       case 'excel': return fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//       case 'word': return fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
//       case 'image': return fileType === 'image/jpeg' || fileType === 'image/png';
//       case 'ppt': return fileType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
//       default: return false;
//     }
//   }

//   getFileType(file: File): string | null {
//     if (file.type.includes('pdf')) return 'application/pdf';
//     if (file.type.includes('image')) return 'image/jpeg';
//     if (file.type.includes('excel')) return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//     if (file.type.includes('word')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
//     if (file.type.includes('ppt')) return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
//     return null;
//   }

//   triggerUpload() {
//     if (this.selectedFile && this.selectedDocumentType) {
//       const documentTypeMapping = this.getFileType(this.selectedFile) || ''; // Ensure it's a string
//       if (this.isFileTypeValid(this.selectedDocumentType, documentTypeMapping)) {
//         this.uploadFile(this.selectedFile, this.selectedDocumentType, this.selectedFileName, documentTypeMapping).subscribe(
//           (response: UploadResponse) => {
//             if (response && response.error) {
//               alert(response.error);
//               return;
//             }
//             alert('File uploaded successfully');
//             this.getFileList();
//             this.resetFileInput();
//           },
//           error => {
//             if (error.status === 409) {
//               alert('File already exists with the same name');
//             } else {
//               console.error('Error uploading file:', error);
//             }
//           }
//         );
//       } else {
//         alert(`Invalid file type for ${this.selectedDocumentType}. Please select a valid file.`);
//       }
//     } else {
//       alert('Please select a document type and file to upload.');
//     }
//   }

//   uploadFile(file: File, documentType: string, fileName: string, fileType: string): Observable<Object> {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('documentType', documentType);
//     formData.append('fileName', fileName);
//     formData.append('fileType', fileType);
//     formData.append('uploadDate', new Date().toISOString());
//     const loginUser = localStorage.getItem('loginUser');
//     if (loginUser) {
//       formData.append('userId', loginUser);
//       return this.http.post(`${this.baseUrl}/upload`, formData);
//     } else {
//       console.error('No logged-in user found.');
//       return of({ error: 'No logged-in user found.' });
//     }
//   }

//   getFileList() {
//     this.http.get<Document[]>(`${this.baseUrl}/list`).subscribe(
//       fileList => {
//         this.fileList = fileList;
//       },
//       error => {
//         console.error('Error fetching file list:', error);
//       }
//     );
//   }

//   resetFileInput() {
//     this.selectedFile = null;
//     this.selectedFileName = '';
//   }

//   deleteFile(fileName: string) {
//     if (confirm(`Are you sure you want to delete ${fileName}?`)) {
//       this.http.delete(`${this.baseUrl}/delete/${fileName}`).subscribe(
//         () => {
//           alert(`${fileName} deleted successfully`);
//           this.getFileList();
//         },
//         error => {
//           console.error('Error deleting file:', error);
//         }
//       );
//     }
//   }

// }