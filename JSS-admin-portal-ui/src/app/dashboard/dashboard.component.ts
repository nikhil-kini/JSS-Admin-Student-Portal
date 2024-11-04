import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';


interface Document {
  docId?: number;
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
export class DashboardComponent implements OnInit{
  

  sidebarLinks = [
    { name: 'Home', route: '/home', icon: 'bi bi-house', action: () => this.home() },
    { name: 'Time Table', route: '/time-table', icon: 'bi bi-calendar3', action: () => this.timetable() },
    { name: 'Students Management', route: '/students-management', icon: 'bi bi-person-workspace', action: () => this.studentsmanagement() },
    { name: 'Attendance Management', route: '/attendance-management', icon: 'bi bi-check-square', action: () => this.attendancemanagement() },
    { name: 'Question Bank', route: '/question-bank', icon: 'bi bi-book', action: () => this.questionbank() },
    { name: 'IA Module', route: '/ia-module', icon: 'bi bi-card-list', action: () => this.iamodule() },
    { name: 'Feedback System', route: '/feedback-system', icon: 'bi bi-chat-dots', action: () => this.feedbacksystem() },
    { name: 'Lesson Plan', route: '/lesson-plan', icon: 'bi bi-file-earmark-text', action: () => this.lessonplan() },
    { name: 'Teaching Aids', route: '/teaching-aids', icon: 'bi bi-easel', action: () => this.teachingaids() },
    { name: 'Personal Documents', route: '/personal-documents', icon: 'bi bi-folder', action: () => this.personaldocuments() },
    { name: 'Logout', route: '/login', icon: 'bi bi-box-arrow-right', action: () => this.logout() }
  ];

  baseUrl = 'http://localhost:8080/api/pdocu';
  fileList: Document[] = [];
  selectedFileName = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getFileList();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
        const fileName = file.name; // Use the name of the uploaded file
        const fileType = file.type; // Use the type of the uploaded file
        
        this.uploadFile(file, fileName, fileType).subscribe(
            (response: any) => {
                alert(response.message || 'File uploaded successfully');
                this.getFileList();
            },
            error => {
                console.error('Error uploading file:', error);
                alert('Error uploading file: ' + (error.error?.message || error.message));
            }
        );
    } else {
        alert('Please select a file to upload.');
    }
}

  uploadFile(file: File, fileName: string, fileType: string): Observable<Object> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('fileType', fileType);
    formData.append('uploadDate', new Date().toISOString());

    const loginUser = localStorage.getItem('loginUser');
    if (loginUser) {
        formData.append('userId', loginUser);
        console.log('Uploading with:', {
            file,
            fileName,
            fileType,
            uploadDate: new Date().toISOString(),
            userId: loginUser
        });
        return this.http.post(`${this.baseUrl}/upload`, formData);
    } else {
        console.error('No logged-in user found.');
        return of({ error: 'No logged-in user found.' });
    }
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

  downloadSelectedFile() {
    if (this.selectedFileName) {
      const downloadUrl = `${this.baseUrl}/download/${this.selectedFileName}`;
      this.http.get(downloadUrl, { responseType: 'blob' }).subscribe(blob => {
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

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return of(null);
  }

  // Sidebar navigation methods
  home() { this.router.navigate(['/sidemenu/home']); }
  timetable() { this.router.navigate(['/sidemenu/time-table']); }
  studentsmanagement() { this.router.navigate(['/sidemenu/students-management']); }
  attendancemanagement() { this.router.navigate(['/sidemenu/attendance-management']); }
  questionbank() { this.router.navigate(['/sidemenu/question-bank']); }
  iamodule() { this.router.navigate(['/sidemenu/ia-module']); }
  feedbacksystem() { this.router.navigate(['/sidemenu/feedback-system']); }
  lessonplan() { this.router.navigate(['/sidemenu/lesson-plan']); }
  teachingaids() { this.router.navigate(['/sidemenu/teaching-aids']); }
  personaldocuments() { this.router.navigate(['/sidemenu/personal-documents']); }
  logout() { localStorage.clear(); this.router.navigate(['/auth/login']); }
}
