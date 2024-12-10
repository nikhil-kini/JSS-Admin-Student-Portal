import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,RouterModule,ProfileComponent,SettingsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

//   home(){
//     this.router.navigate(['/sidemenu/home']);

//   }
//   timetable1(){
//     this.router.navigate(['/sidemenu/time-table']);

//   }
//   studentsmanagement(){
//     this.router.navigate(['/sidemenu/students-management']);
//   }
//   attendancemanagement(){
//     this.router.navigate(['/sidemenu/attendance-management']);
//   }
//   questionbank(){
//     this.router.navigate(['/sidemenu/question-bank']);
//   }
//     iamodule(){
//       this.router.navigate(['/sidemenu/ia-module']);
//     }

//     feedbacksystem(){
//       this.router.navigate(['/sidemenu/feedback-system']);
//     }
//     lessonplan(){
//       this.router.navigate(['/sidemenu/lesson-plan']);
//     }
//     teachingaids(){
//       this.router.navigate(['/sidemenu/teaching-aids']);
//     }
//     logout() {
//       localStorage.removeItem('isAuthenticated'); 
//     localStorage.removeItem('loginUser');
//       this.router.navigate(['/auth/login']);
//     }
//     personaldocuments(){
//       this.router.navigate(['/sidemenu/personal-documents'])
//     }
  
//   lessonplandocuments: any[] = []; 
//   semester: string | null = null;
//   timetable: any[] = [];
//   selectedDocumentCategory: string = 'Time-Table';

//   // Static timetables for all semesters
//   staticTimetables: { [key: string]: any[] } = {
//     Sem1: [
//       { day: 'Monday', period1: 'Maths', period2: 'Physics', period3: 'Chemistry', period4: 'Break', period5: 'English', period6: 'CS Basics' },
//       { day: 'Tuesday', period1: 'Physics', period2: 'Chemistry', period3: 'Maths', period4: 'Break', period5: 'CS Basics', period6: 'English' },
//       { day: 'Wednesday', period1: 'Chemistry', period2: 'Maths', period3: 'English', period4: 'Break', period5: 'Physics', period6: 'CS Basics' }
//     ],
//     Sem2: [
//       { day: 'Monday', period1: 'Biology', period2: 'Maths', period3: 'Physics', period4: 'Break', period5: 'Data Struct', period6: 'Chemistry' },
//       { day: 'Tuesday', period1: 'Maths', period2: 'Physics', period3: 'Data Struct', period4: 'Break', period5: 'Biology', period6: 'Chemistry' }
//     ],
//     Sem3: [
//       { day: 'Monday', period1: 'DBMS', period2: 'OS', period3: 'Python', period4: 'Break', period5: 'DBMS Lab', period6: 'Python Lab' },
//       { day: 'Tuesday', period1: 'OS', period2: 'Python', period3: 'DBMS', period4: 'Break', period5: 'Python Lab', period6: 'OS Lab' }
//     ],
//     Sem4: [
//       { day: 'Monday', period1: 'Automata', period2: 'Networks', period3: 'Compiler', period4: 'Break', period5: 'DBMS', period6: 'Maths' },
//       { day: 'Tuesday', period1: 'Compiler', period2: 'Automata', period3: 'Networks', period4: 'Break', period5: 'Maths', period6: 'DBMS' }
//     ],
//     Sem5: [
//       { day: 'Monday', period1: 'FSD', period2: 'Cloud', period3: 'AI', period4: 'Break', period5: 'FSD Lab', period6: 'Industry Seminar' },
//       { day: 'Tuesday', period1: 'AI', period2: 'FSD', period3: 'Cloud', period4: 'Break', period5: 'Cloud Lab', period6: 'Assessment' }
//     ],
//     Sem6: [
//       { day: 'Monday', period1: 'ML', period2: 'Cloud Native', period3: 'CyberSec', period4: 'Break', period5: 'Research', period6: 'Major Project' },
//       { day: 'Tuesday', period1: 'CyberSec', period2: 'ML', period3: 'Cloud Native', period4: 'Break', period5: 'Major Project', period6: 'Research' }
//     ]
//   };

//   constructor(private http:HttpClient,private router:Router) {}

  

//   loadTimetable(): void {
    
//     if (this.semester && this.staticTimetables[this.semester]) {
//       this.timetable = this.staticTimetables[this.semester];
//     } else {
//       this.timetable = []; 
//     }
//   }

//   downloadTimetable(): void {
//     const downloadUrl = `http://localhost:8080/api/timetable/download/${this.semester}`;
//     window.location.href = downloadUrl;
//   }


// ngOnInit(): void {
//   this.semester = localStorage.getItem('Semester');
//     this.loadTimetable();
//   this.semester = localStorage.getItem('Semester') || null;
  
//   console.log('Selected Semester from Local Storage:', this.semester);

//   if (this.semester) {
//     this.getDocumentsBySemester();
//   } else {
//     alert('Semester not found in local storage!');
//   }
// }


// getDocumentsBySemester() {
//   if (this.semester) {
    
//     const url = `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.semester}`;
    
    
//     this.http.get<any[]>(url)
//       .subscribe({
//         next: (documents) => {
//           console.log('Fetched Documents:', documents);
//           this.lessonplandocuments = documents; 
//         },
//         error: (error) => {
//           console.error('Error fetching documents:', error);
//           alert('Error fetching documents'); 
//         }
//       });
//   }
// }
// }


// onLogin() {
//   alert("user loggedin");
//   console.log("user loggedin")
// }

//  Interpolation 
name: string = 'Hello, Angular!';
num:number=124;

// Property binding 
imageSrc: string = 'https://example.com/image.jpg';

// Event binding
count: number = 0;
increment() {
  this.count++;
}

userName: string = '';

// email: string = '';
// password: string = '';

// onLogin() {
//   if (this.email && this.password) {
//     console.log('Login details:', { email: this.email, password: this.password });
//     alert(`Email: ${this.email}\nPassword: ${this.password}`);
    
//   } else {
//     console.error('Please fill in both email and password');
//     alert('Please fill in both email and password');
//   }
// }
}