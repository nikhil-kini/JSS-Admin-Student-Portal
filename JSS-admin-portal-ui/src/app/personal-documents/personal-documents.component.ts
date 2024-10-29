import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-personal-documents',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './personal-documents.component.html',
  styleUrl: './personal-documents.component.css'
})
export class PersonalDocumentsComponent implements OnInit{

  constructor(private router: Router,private http: HttpClient,private fb: FormBuilder) {}
 
  

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