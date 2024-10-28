import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
export class PersonalDocumentsComponent {

  constructor(private router: Router,private http: HttpClient) {}
  

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
  

    private baseUrl = 'http://localhost:8080/api/files';
    uploadedFileName: string = '';

    
    uploadFile(file: File): Observable<any> {
      const formData = new FormData();
      formData.append('file', file); // Append the file to FormData
  
      return this.http.post(`${this.baseUrl}/upload`, formData); // Make the POST request
    }
    

    onFileChange(event: any) {
      const file = event.target.files[0];
      if (file) {
          this.uploadFile(file).subscribe(
              response => {
                alert('File uploaded successfully')
                  console.log('File uploaded successfully:', response);
                  this.uploadedFileName = response.downloadUrl; // Store the download URL
              },
              error => {
                  console.error('Error uploading file:', error);
              }
          );
      }
  }
  
  downloadFile() {
    if (this.uploadedFileName) {
        // Assuming uploadedFileName contains the full URL path
        this.http.get(this.uploadedFileName, { responseType: 'blob' })
            .subscribe(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = this.uploadedFileName.split('/').pop()!; // Use the filename
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }, error => {
                console.error('Error downloading file:', error);
            });
    } else {
        console.error('No file uploaded to download');
    }
}
}