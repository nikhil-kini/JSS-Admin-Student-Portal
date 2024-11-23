import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

// interface Document {
//   docId?: number;
//   documentType: string;
//   fileName: string;
//   fileType: string;
//   uploadDate?: Date;
// }

// interface UploadResponse {
//   message?: string;
//   error?: string;
// }

export interface Document {
  docId?: number;
  documentType: string;
  fileName: string;
  fileType: string;
  uploadDate?: Date;
  semester: string;
  documentCategory: string; 
}

@Component({
  selector: 'app-teaching-aids',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './teaching-aids.component.html',
  styleUrl: './teaching-aids.component.css'
})
export class TeachingAidsComponent  {
  constructor(private http: HttpClient, private router: Router) {}
 
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
    staffmanagement(){
      this.router.navigate(['/sidemenu/staff-management'])
    }


    selectedSemester: string = '';
    selectedDocumentCategory: string = 'TeachingAids';
    selectedSemesterInModal: string = '';
    fileToUpload: File | null = null;
    showModal: boolean = false;
    teachingAidsDocuments: any[] = [];
    semesters: string[] = ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6'];
    selectedDocumentType = '';
    uploadDate: Date = new Date();  
    
    onFileChange(event: any) {
      this.fileToUpload = event.target.files[0];
    }
  
    uploadFile() {
      if (this.fileToUpload && this.selectedSemester && this.selectedDocumentCategory && this.selectedDocumentType) {
        const formData = new FormData();
        const fileType = this.fileToUpload.name.split('.').pop()?.toLowerCase(); 
        formData.append('file', this.fileToUpload);
        formData.append('fileName', this.fileToUpload.name);
        formData.append('semester', this.selectedSemester);
        formData.append('documentCategory', this.selectedDocumentCategory);
        formData.append('documentType', this.selectedDocumentType);
        formData.append('fileType',  fileType || 'unknown');
        formData.append('uploadDate', this.uploadDate.toISOString());
        formData.append('userEmail', 'admin@example.com'); 
        this.http.post<any>('http://localhost:8080/api/alldocuments/upload', formData)
          .subscribe({
            next: (response) => {
              alert('File uploaded successfully');
            },
            error: (error) => {
              alert('Error uploading file');
            }
          });
      } else {
        alert('Please select a file, semester, and document type');
      }
    }
    
  
    // openFile(doc: any) {
    //   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    //   if (isAuthenticated) {
    //     const fileType = doc.fileName.split('.').pop()?.toLowerCase();
    //     const viewUrl = `http://localhost:8080/api/alldocuments/viewFile/${doc.semester}/${doc.fileName}`;
    
    //     if (fileType === 'txt' || fileType === 'json' || fileType === 'pdf' || ['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
    //       // Open the file in a new tab without downloading
    //       window.open(viewUrl, '_blank');
    //     } else {
    //       // Handle unsupported file types (this might be handled differently)
    //       alert("This file type is not supported for viewing.");
    //     }
    //   } else {
    //     this.router.navigate(['/login']);
    //   }
    // }
    
    openFile(doc: any) {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const fileType = doc.fileName.split('.').pop()?.toLowerCase();
      const viewUrl = `http://localhost:8080/api/alldocuments/viewFile/${doc.semester}/${doc.fileName}`;
    
      // Check authentication only if the user is not authenticated
      if (!isAuthenticated) {
        // Optionally, you can show a message or alert to inform the user they need to be logged in
        // but we will not redirect to the login page
        alert("You are not logged in. Please log in to access your files.");
        return;
      }
    
      // For supported file types, open in a new browser tab
      if (fileType === 'txt' || fileType === 'json' || fileType === 'pdf' || 
          ['jpg', 'jpeg', 'png', 'gif'].includes(fileType)) {
        window.open(viewUrl, '_blank');
      } else if (['doc', 'docx'].includes(fileType)) {
        // For Word files, open in Office Online or Google Docs
        const officeOnlineUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(viewUrl)}`;
        window.open(officeOnlineUrl, '_blank');
      } else if (['xls', 'xlsx'].includes(fileType)) {
        // For Excel files, open in Office Online or Google Sheets
        const officeOnlineUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(viewUrl)}`;
        window.open(officeOnlineUrl, '_blank');
      } else if (['ppt', 'pptx'].includes(fileType)) {
        // For PowerPoint files, open in Office Online or Google Slides
        const officeOnlineUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(viewUrl)}`;
        window.open(officeOnlineUrl, '_blank');
      } else {
        // Handle unsupported file types
        alert("This file type is not supported for viewing.");
      }
    }
    
    

    viewTeachingAids() {
      this.showModal = true;
    }
  
    closeModal() {
      this.showModal = false;
      
    }
  
    getDocumentsBySemester() {
      if (this.selectedSemesterInModal) {
        this.http.get<any[]>(`http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.selectedSemesterInModal}`)
          .subscribe({
            next: (documents) => {
              this.teachingAidsDocuments = documents;
            },
            error: (error) => {
              alert('Error fetching documents');
            }
          });
      }
    }
  
  
  


  viewTextFile(doc: any) {
      this.http.get(doc.downloadUrl, { responseType: 'text' })
          .subscribe(content => {
              const blob = new Blob([content], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              window.open(url, '_blank');
          });
  }
  
 
  viewPdf(doc: any) {
      window.open(doc.downloadUrl, '_blank');
  }
  
  
  viewImage(doc: any) {
      window.open(doc.downloadUrl, '_blank');
  }

//   downloadFile(filename: string) {
//     const url = `http://localhost:8080/viewFile/sem1/${filename}`;  
//     this.http.get(url, { responseType: 'blob' }).subscribe(response => {
//         const blob = new Blob([response], { type: 'application/octet-stream' });
//         const link = document.createElement('a');
//         link.href = URL.createObjectURL(blob);
//         link.download = filename;
//         link.click();

       
//         this.router.navigate(['/sidemenu/teaching-aids']);
//     }, error => {
//         console.error('Download failed', error);
//     });
// }


downloadFile(filename: string) {
  const url = `http://localhost:8080/viewFile/sem1/${filename}`;  
  const fileType = filename.split('.').pop()?.toLowerCase();  // Get file type
  const headers = { 'Accept': fileType === 'pdf' ? 'application/pdf' : 'application/octet-stream' };

  this.http.get(url, { responseType: 'blob', headers: headers }).subscribe(response => {
      const blob = new Blob([response], { type: `application/${fileType}` });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
  }, error => {
      console.error('Download failed', error);
  });
}



  
    getDownloadLink(semester: string, fileName: string): string {
      
      return `http://localhost:8080/api/alldocuments/download/${semester}/${fileName}`;
      
    }
  }















  //   baseUrl = 'http://localhost:8080/api/alldocuments';
  //   fileList: string[] = []; 
  //   selectedFileName = '';
  //   selectedDocumentType = '';
  //   selectedSemester: 'Sem1' | 'Sem2' | 'Sem3' | 'Sem4' | 'Sem5' | 'Sem6' = 'Sem1';  
  //   // selectedSemester: 'sem1' | 'sem2' | 'sem3' | 'sem4' | 'sem5' | 'sem6' = 'sem1';
  //   uploadedFiles: string[] = [];
  //   textContent: string | null = null;
  
  //  
  
  //   ngOnInit() {
  //     this.getFileList();
  //   }
  //   getFileList() {
  //     const semester = this.selectedSemester;  
    
  //     this.http.get<string[]>(`${this.baseUrl}/list?semester=${semester}`).subscribe(
  //       (fileList: string[]) => {
  //         this.fileList = fileList;  
  //       },
  //       error => {
  //         console.error('Error fetching file list:', error);
  //         alert('Error fetching file list: ' + error.message);  
  //       }
  //     );
  //   }
   
  
  
    
   
  //   onFileChange(event: any) {
  //     const file = event.target.files[0];
  //     if (file && this.selectedDocumentType && this.selectedSemester) {
  //       const documentType = this.selectedDocumentType;
  //       const documentName = file.name;
  //       const documentTypeMapping = this.getFileType(file);
  
        
  //       const uploadDirectory = this.getUploadDirectory(this.selectedSemester);
  
  //       if (this.isFileTypeValid(documentType, documentTypeMapping)) {
  //         if (documentTypeMapping) {
  //           this.uploadFile(file, documentType, documentName, documentTypeMapping, uploadDirectory).subscribe(
  //             (response: UploadResponse) => {
  //               if (response && response.error) {
  //                 alert(response.error);
  //                 return;
  //               }
  //               alert('File uploaded successfully');
  
                
  //               this.selectedSemester = 'Sem1';  
  //               this.selectedDocumentType = '';  
  
                
  //               // this.getFileList(); 
  //             },
  //             error => {
  //               if (error.status === 409) {
  //                 alert('File already exists with the same name');
  //               } else {
  //                 console.error('Error uploading file:', error);
  //               }
  //             }
  //           );
  //         } else {
  //           alert('Invalid file type. Please select a valid file.');
  //         }
  //       } else {
  //         alert(`Invalid file type for ${documentType}. Please select a valid ${documentType} file.`);
  //       }
  //     } else {
  //       alert('Please select a document type, semester, and file to upload.');
  //     }
  //   }
  
   
  //   getUploadDirectory(semester: 'Sem1' | 'Sem2' | 'Sem3' | 'Sem4' | 'Sem5' | 'Sem6'): string {
  //     const semesterDirectories: { [key in 'Sem1' | 'Sem2' | 'Sem3' | 'Sem4' | 'Sem5' | 'Sem6']: string } = {
  //       'Sem1': 'C:/Users/nithya prashanth/Desktop/images/alldocuments/sem1/',
  //       'Sem2': 'C:/Users/nithya prashanth/Desktop/images/alldocuments/sem2/',
  //       'Sem3': 'C:/Users/nithya prashanth/Desktop/images/alldocuments/sem3/',
  //       'Sem4': 'C:/Users/nithya prashanth/Desktop/images/alldocuments/sem4/',
  //       'Sem5': 'C:/Users/nithya prashanth/Desktop/images/alldocuments/sem5/',
  //       'Sem6': 'C:/Users/nithya prashanth/Desktop/images/alldocuments/sem6/',
  //     };
  //     return semesterDirectories[semester];  // TypeScript will infer that this is always valid
  //   }

   
  
  //   // Validate file type based on document type
  //   isFileTypeValid(selectedType: string, fileType: string | null): boolean {
  //     if (!fileType) return false;
  //     const validTypes: { [key: string]: string[] } = {
  //       pdf: ['application/pdf'],
  //       excel: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  //       word: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  //       image: ['image/jpeg', 'image/png'],
  //       ppt: ['application/vnd.openxmlformats-officedocument.presentationml.presentation']
  //     };
  //     return validTypes[selectedType]?.includes(fileType) ?? false;
  //   }
  
  //   // Handle file upload
  //   uploadFile(file: File, documentType: string, fileName: string, fileType: string, uploadDir: string): Observable<Object> {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('documentType', documentType);
  //     formData.append('fileName', fileName);
  //     formData.append('fileType', fileType);
  //     formData.append('uploadDate', new Date().toISOString());
  //     formData.append('uploadDir', uploadDir);
  //     formData.append('semester', this.selectedSemester || '');
      
  //     const loginUser = localStorage.getItem('loginUser');
  //     if (loginUser) {
  //       formData.append('userId', loginUser);
  //       return this.http.post(`${this.baseUrl}/upload`, formData).pipe(
  //         tap(() => {
  //           // Update uploaded files list after upload
  //           // this.getFileList(); // Refresh the list of uploaded files
  //         })
  //       );
  //     } else {
  //       return of({ error: 'No logged-in user found.' });
  //     }
  //   }
  
    
    
  //   // Get file type (mimicking the backend's file detection)
  //   getFileType(file: File): string {
  //     if (file.type.includes('pdf')) {
  //       return 'application/pdf';
  //     } else if (file.type.includes('image')) {
  //       return 'image/jpeg';
  //     } else if (file.type.includes('excel')) {
  //       return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  //     } else if (file.type.includes('word')) {
  //       return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  //     } else if (file.type.includes('ppt')) {
  //       return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
  //     }
  //     return '';
  //   }
  
  //   downloadSelectedFile() {
  //     if (this.selectedFileName) {
  //       const downloadUrl = `${this.baseUrl}/download/${this.selectedSemester}/${this.selectedFileName}`;
  //       this.http.get(downloadUrl, { responseType: 'blob' }).subscribe(
  //         (blob) => {
  //           const url = window.URL.createObjectURL(blob);
  //           const a = document.createElement('a');
  //           a.href = url;
  //           a.download = this.selectedFileName;
  //           a.click();
  //           window.URL.revokeObjectURL(url); // Clean up after download
  //         },
  //         (error) => {
  //           console.error('Download failed:', error);
  //           alert('Error downloading file');
  //         }
  //       );
  //     } else {
  //       alert('Please select a file to download');
  //     }
  //   }
    
  //   // fetchFileList() {
      
  //   //   const semester = 'Fall2024';
  //   //   this.http.get<string[]>(`${this.baseUrl}/list?semester=${semester}`).subscribe(
  //   //     (files) => {
  //   //       this.fileList = files;
  //   //     },
  //   //     (error) => {
  //   //       console.error('Error fetching file list:', error);
  //   //     }
  //   //   );
  //   // }
  
  //   onFileSelect() {
  //     console.log('Selected file:', this.selectedFileName);
  //   }
  //   // Get download URL for the file
  //   getFileDownloadUrl(fileName: string): string {
  //     return `${this.baseUrl}/download/${fileName}`;
  //   }
  
  
  // onSemesterChange() {
  //   // this.getFileList(); 
  // }
  
  
  // viewDocument(fileName: string): void {
  //   const fileExtension = this.getFileExtension(fileName);
  
  //   // If it's a PDF or image, open it in a new window (or inline viewer for supported file types)
  //   if (fileExtension === 'pdf' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
  //     const semester = this.selectedSemester;
  //     const fileUrl = `${this.baseUrl}/download/${semester}/${fileName}`;
  //     this.openFileInViewer(fileUrl);
  //   } else {
  //     // For other file types, trigger a download instead
  //     this.downloadFile(fileName);
  //   }
  // }
  
  // // Get the file extension to check the type
  // getFileExtension(fileName: string): string {
  //   return fileName.split('.').pop() || '';
  // }
  
  // // Open the file in a new window (viewer)
  // openFileInViewer(fileUrl: string): void {
  //   const viewerWindow = window.open(fileUrl, '_blank');
  //   if (viewerWindow) {
  //     viewerWindow.focus();
  //   }
  // }
  
  // // Trigger the download of the selected file
  // downloadFile(fileName: string): void {
  //   const semester = this.selectedSemester;
  //   const fileUrl = `${this.baseUrl}/download/${semester}/${fileName}`;
  //   const a = document.createElement('a');
  //   a.href = fileUrl;
  //   a.download = fileName;
  //   a.click();
  // }
  // }
  
  
  
  
  
  






  