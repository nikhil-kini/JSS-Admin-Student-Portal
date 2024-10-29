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
          // Ensure documentTypeMapping is a string before uploading
          if (documentTypeMapping) {
            this.uploadFile(file, documentType, documentName, documentTypeMapping).subscribe(
              response => {
                alert('File uploaded successfully');
                // Add the newly uploaded file to the fileList
                this.fileList.push({ 
                  documentType, 
                  fileName: documentName, 
                  fileType: documentTypeMapping, 
                  uploadDate: new Date() 
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