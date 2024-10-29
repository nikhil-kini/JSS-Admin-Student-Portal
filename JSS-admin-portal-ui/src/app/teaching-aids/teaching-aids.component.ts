import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';

interface Document {
  fileData: string;
  fileName: string;
  documentType: string;
}
@Component({
  selector: 'app-teaching-aids',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './teaching-aids.component.html',
  styleUrl: './teaching-aids.component.css'
})
export class TeachingAidsComponent {
  // constructor(private router: Router) {}
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
    uploadedFileName = '';
  fileList: string[] = [];
  selectedFileName = '';

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