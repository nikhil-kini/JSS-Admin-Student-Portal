import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface Document {
  docId?: number;
  documentType: string;
  fileName: string;
  fileType: string;
  uploadDate?: Date;
  semester: string;
  documentCategory: string; // Add this if required
}


@Component({
  selector: 'app-lesson-plan',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './lesson-plan.component.html',
  styleUrl: './lesson-plan.component.css'
})
export class LessonPlanComponent {
  constructor(private router: Router,private http:HttpClient) {}

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

//     selectedSemester: string = '';
//     semesters: string[] = ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6'];
//     fileToUpload: File | null = null;
  
    
  
//     onFileChange(event: any) {
//       this.fileToUpload = event.target.files[0];
//     }
  
//     uploadFile() {
//       if (this.fileToUpload && this.selectedSemester) {
//         const formData = new FormData();
//         formData.append('file', this.fileToUpload);
//         formData.append('semester', this.selectedSemester);
    
//         this.http.post<any>('http://localhost:8080/api/alldocuments/upload', formData)
//           .subscribe({
//             next: (response) => {
//               console.log('Upload response:', response);
//               alert(response?.message || 'File uploaded successfully!');
//             },
//             error: (error) => {
//               console.error('Error uploading file:', error);
//               alert('Failed to upload file: ' + (error.error?.message || error.message));
//             }
//           });
//       } else {
//         alert('Please select a file and a semester.');
//       }
//     }
  
// }


selectedSemester: string = '';
  selectedDocumentType: string = '';
  selectedDocumentCategory: string = 'LessonPlan';  
  fileToUpload: File | null = null;
  uploadDate: Date = new Date();  

  semesters: string[] = ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6'];
  documentTypes: string[] = ['LessonPlan', 'TeachingAids', 'QuestionBank']; 

  // constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.fileToUpload = event.target.files[0];
  }

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

  uploadFile() {
    if (this.fileToUpload && this.selectedSemester && this.selectedDocumentType) {
      const formData = new FormData();
  
      // Ensure uploadDate is always defined (use current date if undefined)
      const uploadDate = this.uploadDate || new Date();  // Default to current date if undefined
  
      const documentData: Document = {
        documentType: this.selectedDocumentType,
        fileName: this.fileToUpload.name,
        fileType: this.fileToUpload.type,
        uploadDate: uploadDate,  // Ensures uploadDate is defined
        semester: this.selectedSemester,
        documentCategory: this.selectedDocumentCategory,
      };
  
      // Send the user's email instead of userId
      const userEmail = localStorage.getItem('loginUser');  // Get userEmail from localStorage
  
      // Check if userEmail is available
      if (!userEmail) {
        alert('User email is missing. Please log in again.');
        return;
      }
  
      // Append the file and document data to the form data
      formData.append('file', this.fileToUpload);
      formData.append('semester', this.selectedSemester);
      formData.append('documentType', documentData.documentType);
      formData.append('fileName', documentData.fileName);
      formData.append('fileType', documentData.fileType);
      formData.append('uploadDate', uploadDate.toISOString());  // Convert to ISO string for safe transmission
      formData.append('documentCategory', documentData.documentCategory);
      formData.append('userEmail', userEmail);  // Add userEmail to the FormData
  
      // Post the form data to the backend API
      this.http.post<any>('http://localhost:8080/api/alldocuments/upload', formData)
        .subscribe({
          next: (response) => {
            console.log('Upload response:', response);
            alert(response?.message || 'File uploaded successfully!');
          },
          error: (error) => {
            console.error('Error uploading file:', error);
            alert('Failed to upload file: ' + (error.error?.message || error.message));
          }
        });
    } else {
      alert('Please select a file, semester, and document type.');
    }
  }
}  