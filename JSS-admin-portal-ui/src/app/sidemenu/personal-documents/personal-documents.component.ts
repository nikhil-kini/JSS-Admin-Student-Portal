import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';

interface Document {
  docId?: number;
  fileName: string;
  fileType: string;
  uploadDate?: Date;
}

@Component({
  selector: 'app-personal-documents',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './personal-documents.component.html',
  styleUrl: './personal-documents.component.css'
})
export class PersonalDocumentsComponent implements OnInit{

  

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
    localStorage.removeItem('userId');
      this.router.navigate(['/auth/login']);
    }
    personaldocuments(){
      
      this.router.navigate(['/sidemenu/personal-documents'])
    }

    staffmanagement(){
      this.router.navigate(['/sidemenu/staff-management'])
    }
    subjectmanagement(){
      this.router.navigate(['/sidemenu/subject-management'])
    }


    baseUrl = 'http://localhost:8080/api/pdocu';
    fileList: string[] = [];  // List of file names (strings)
    selectedFileName: string = '';
  
    constructor(private http: HttpClient, private router: Router) {}
  
    ngOnInit() {
      this.getFileList();
    }
  
    onFileChange(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.uploadFile(file).subscribe(
          (response: any) => {
            alert(response.message || 'File uploaded successfully');
            this.getFileList();
          },
          (error) => {
            console.error('Error uploading file:', error);
            alert('Error uploading file: ' + (error.error?.message || error.message));
          }
        );
      } else {
        alert('Please select a file to upload.');
      }
    }
  
    uploadFile(file: File): Observable<Object> {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', file.name);
      formData.append('fileType', file.type);
      formData.append('uploadDate', new Date().toISOString());
      formData.append('userId', localStorage.getItem('loginUser') || '');
  
      return this.http.post(`${this.baseUrl}/upload`, formData);
    }
  
    getFileList() {
      this.http.get<string[]>(`${this.baseUrl}/list`).subscribe(
        (fileList) => {
          this.fileList = fileList;
        },
        (error) => {
          console.error('Error fetching file list:', error);
          alert('Error fetching file list: ' + error.message);
        }
      );
    }
  
    downloadSelectedFile() {
      if (this.selectedFileName) {
        const downloadUrl = `${this.baseUrl}/download/${this.selectedFileName}`;
        this.http.get(downloadUrl, { responseType: 'blob' }).subscribe((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.selectedFileName;
          a.click();
        });
      } else {
        alert('Please select a file to download');
      }
    }
  
    openFile(fileName: string) {
      if (!fileName) {
        alert('File not found!');
        return;
      }
    
      // Construct the file URL for download
      const fileUrl = `${this.baseUrl}/download/${fileName}`;
    
      // URL encode the file URL (for spaces and special characters in filenames)
      const encodedFileUrl = encodeURIComponent(fileUrl);
    
      // Get the file extension to determine if it's a file that can be viewed inline
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
    
      // Handle specific file types like .doc and .docx
      if (['docx', 'doc'].includes(fileExtension || '')) {
        // For Word files (.doc, .docx), open them in Google Docs Viewer
        const viewerUrl = `https://docs.google.com/viewer?url=${encodedFileUrl}`;
    
        // Open the file in a new tab with the Google Docs viewer
        window.open(viewerUrl, '_blank');
      } else if (['xlsx', 'pptx'].includes(fileExtension || '')) {
        // For Excel or PowerPoint files, use the Google Docs Viewer as well
        const viewerUrl = `https://docs.google.com/viewer?url=${encodedFileUrl}`;
        window.open(viewerUrl, '_blank');
      } else {
        // For PDF, image files, or other inline-viewable files, open them directly
        window.open(fileUrl, '_blank');
      }
    }
    
    
  }  