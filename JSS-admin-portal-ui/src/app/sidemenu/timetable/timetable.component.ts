import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentService } from '../department.service';
import { SubjectService } from '../subject.service';
import { ToastrService } from '../toastr.service';
import { LoaderService } from '../loader.service';




@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css'
})
export class TimetableComponent {
 
  constructor(private router: Router,private http: HttpClient) {}
   

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

  }

//     timeTableDetails: FormGroup;
//     departments: any[] = [];
//     sectionList: any[] = [];
//     subjectsList: any[] = [];
  
//     private apiUrl = 'http://localhost:8080/api/timetable';
  
//     constructor(
//       private fb: FormBuilder,
//       private departmentServe: DepartmentService,
//       private subjectsServe: SubjectService,
//       private toast: ToastrService,
//       private loader: LoaderService,
//       private router: Router,
//       private http: HttpClient
//     ) {
//       this.timeTableDetails = this.fb.group({
//         departmentName: ['', Validators.required],
//         year: ['', Validators.required],
//         section: ['', Validators.required],
//         timeTable: this.fb.group({
//           monday: this.fb.group({
//             1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []
//           }),
//           tuesday: this.fb.group({
//             1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []
//           }),
//           wednesday: this.fb.group({
//             1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []
//           }),
//           thursday: this.fb.group({
//             1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []
//           }),
//           friday: this.fb.group({
//             1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: []
//           }),
//         })
//       });
//     }
  
//     ngOnInit(): void {
//       this.getDepartment();
//       this.getSubjects();
//     }
  
//     // Get departments and sections
//     async getDepartment(): Promise<void> {
//   this.departmentServe.getDepartmentDetails().subscribe(
//     (departments) => {
//       this.departments = departments;  // Now the data is available as an array
//     },
//     (error) => {
//       console.error(error);  // Handle any errors
//     }
//   );
// }

  
//     async getDepartmentDetails(): Promise<void> {
//       const selectedDepartmentId = this.timeTableDetails.value.departmentName;
//       const data = await this.departmentServe.getDepartmentById(selectedDepartmentId);
//       this.sectionList = data.years[this.timeTableDetails.value.year];
//     }
  
//     async getSubjects(): Promise<void> {
//       this.subjectsList = await this.subjectsServe.getSubjects();
//     }
  
//     // Handle form submission
//     async handleSubmit(): Promise<void> {
//       try {
//         this.loader.show();
//         const data = this.timeTableDetails.value;
//         const result = await this.createTimeTable(data).toPromise();
//         this.toast.success(result.message);
//         this.router.navigate(['/timetable']);
//       } catch (error: any) {
//         this.toast.error(error.message || 'Error occurred');
//       } finally {
//         this.loader.hide();
//       }
//     }
  
//     // Create TimeTable using HTTP POST request
//     createTimeTable(data: any): Observable<any> {
//       return this.http.post<any>(`${this.apiUrl}/create`, data);
//     }
  
//     // Get all TimeTables using HTTP GET request
//     getTimeTables(): Observable<any[]> {
//       return this.http.get<any[]>(`${this.apiUrl}/all`);
//     }
//   }