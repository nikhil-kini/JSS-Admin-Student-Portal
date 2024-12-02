import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




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
    semesters = [1, 2, 3, 4, 5, 6];
    days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    timeSlots = [
      '9.00 TO 10.00 am', '10.00 TO 11.00 am', '11.00 TO 12.00 pm',
      '12.00 Tpm TO 1.00 pm', '1.00 to 2.00 PM', '2.00 to 3.00 PM', '3.00 tp 4.00 PM'
    ];
    selectedSemester: string = 'all';
    filteredTimetable: any = {};
    
    // Load timetable from localStorage
    loadTimetableFromLocalStorage() {
      const storedTimetable = localStorage.getItem('semesterTimetable');
      if (storedTimetable) {
        this.filteredTimetable = JSON.parse(storedTimetable);
      }
    }
  
    // Handle semester selection change
    onSemesterChange() {
      if (this.selectedSemester === 'all') {
        this.filteredTimetable = JSON.parse(localStorage.getItem('semesterTimetable') || '{}');
      } else {
        this.filteredTimetable = this.filteredTimetable[this.selectedSemester] || {};
      }
    }
  
    ngOnInit() {
      // Initially load the timetable from localStorage
      this.loadTimetableFromLocalStorage();
      this.onSemesterChange(); // Set the initial timetable based on the default selectedSemester
    }


    onFileSelect(event: any): void {
        //   this.selectedFile = event.target.files[0];
        //   if (this.selectedFile && !this.selectedFile.name.endsWith('.xlsx')) {
        //     alert('Please upload a valid Excel file');
        //     this.selectedFile = null;
        //   }
        // }
  }
}

  //   semesters = [1, 2, 3, 4, 5, 6];
  //   days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  //   timeSlots = [
  //     '9.00 TO 10.00 am', '10.00 TO 11.00 am', '11.00 TO 12.00 pm',
  //     '12.00 Tpm TO 1.00 pm', '1.00 to 2.00 PM', '2.00 to 3.00 PM', '3.00 tp 4.00 PM'
  //   ];
    
  //   selectedSemester: string = 'all';
  //   isTimetableVisible: boolean = true;
  //   selectedFile: File | null = null;
  //   filteredTimetable: any;
  //   semesterTimetable: any = {
  //     1: {
  //             MONDAY: { '11.00 TO 12.00 pm': 'EM', '12.00 Tpm TO 1.00 pm': 'FOC', '2.00 to 3.00 PM': 'ES', '3.00 tp 4.00 PM': 'FEEE (THEORY)' },
  //             TUESDAY: { '11.00 TO 12.00 pm': 'FEEE Lab B1 / IT skill Lab B2', '3.00 tp 4.00 PM': 'FEEE Lab B2 / IT skill Lab B1' },
  //             WEDNESDAY: { '11.00 TO 12.00 pm': 'EM', '12.00 Tpm TO 1.00 pm': 'EM', '3.00 tp 4.00 PM': 'FEEE Lab B2 / IT skill Lab B1' },
  //             THURSDAY: { '11.00 TO 12.00 pm': 'EM', '12.00 Tpm TO 1.00 pm': 'FOC', '3.00 tp 4.00 PM': 'NSS / NCC / REDCROSS' },
  //             FRIDAY: { '9.00 TO 10.00 am': 'FEEE Lab B1 / IT skill Lab B2', '11.00 TO 12.00 pm': 'ITSKILLS (THEORY)', '12.00 Tpm TO 1.00 pm': 'FEEE (THEORY)', '2.00 to 3.00 PM': 'ES', '3.00 tp 4.00 PM': 'FOC' },
  //             SATURDAY: { '11.00 TO 12.00 pm': 'ITSKILLS (THEORY)', '12.00 Tpm TO 1.00 pm': 'FOC' }
  //           },
  //           3: {
  //             MONDAY: { '9.00 TO 10.00 am': 'DBMS', '10.00 TO 11.00 am': 'PYTHON', '11.00 TO 12.00 pm': 'DBMS LAB', '12.00 Tpm TO 1.00 pm': 'DBMS LAB', '2.00 to 3.00 PM': 'CHMA LAB', '3.00 tp 4.00 PM': 'CHMA LAB' },
  //             TUESDAY: { '9.00 TO 10.00 am': 'KANNADA', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'CN', '12.00 Tpm TO 1.00 pm': 'PYTHON', '2.00 to 3.00 PM': 'CHMA LAB', '3.00 tp 4.00 PM': 'CHMA LAB' },
  //             WEDNESDAY: { '9.00 TO 10.00 am': 'DBMS', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'PYTHON LAB', '12.00 Tpm TO 1.00 pm': 'PYTHON LAB', '2.00 to 3.00 PM': 'CN', '3.00 tp 4.00 PM': 'PYTHON' },
  //             THURSDAY: { '9.00 TO 10.00 am': 'KANNADA', '10.00 TO 11.00 am': 'PYTHON', '11.00 TO 12.00 pm': 'CN LAB', '12.00 Tpm TO 1.00 pm': 'CN LAB', '2.00 to 3.00 PM': 'NSS/ NCC/ REDCROSS' },
  //             FRIDAY: { '9.00 TO 10.00 am': 'CN', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'PYTHON LAB', '12.00 Tpm TO 1.00 pm': 'PYTHON LAB', '2.00 to 3.00 PM': 'CN', '3.00 tp 4.00 PM': 'DBMS' },
  //             SATURDAY: { '9.00 TO 10.00 am': 'DBMS', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'CN LAB' },
  //           },
            
  //             5: {
  //               MONDAY: {
  //                 "9.00 TO 10.00 am": "FSD (P)",
  //                 "10.00 TO 11.00 am": "FSD (P)",
  //                 "11.00 TO 12.00 pm": "FSD (L)",
  //                 "12.00 Tpm TO 1.00 pm": "FSD (L)",
  //                 "1.00 to 2.00 PM": "LUNCH BREAK",
  //                 "2.00 to 3.00 PM": "FSD (L+P)",
  //                 "3.00 tp 4.00 PM": "FSD (L+P)"
  //               },
  //               TUESDAY: {
  //                 "9.00 TO 10.00 am": "FSD (P)",
  //                 "10.00 TO 11.00 am": "FSD (P)",
  //                 "11.00 TO 12.00 pm": "FSD (L)",
  //                 "12.00 Tpm TO 1.00 pm": "FSD (L)",
  //                 "1.00 to 2.00 PM": "",
  //                 "2.00 to 3.00 PM": "FSD (L+P)",
  //                 "3.00 tp 4.00 PM": "FSD (L+P)"
  //               },
  //               WEDNESDAY: {
  //                 "9.00 TO 10.00 am": "FSD (P)",
  //                 "10.00 TO 11.00 am": "FSD (P)",
  //                 "11.00 TO 12.00 pm": "FSD (L)",
  //                 "12.00 Tpm TO 1.00 pm": "FSD (L)",
  //                 "1.00 to 2.00 PM": "",
  //                 "2.00 to 3.00 PM": "FSD (L+P)",
  //                 "3.00 tp 4.00 PM": "FSD (L+P)"
  //               },
  //               THURSDAY: {
  //                 "9.00 TO 10.00 am": "FSD (P)",
  //                 "10.00 TO 11.00 am": "FSD (P)",
  //                 "11.00 TO 12.00 pm": "FSD (L)",
  //                 "12.00 Tpm TO 1.00 pm": "FSD (L)",
  //                 "1.00 to 2.00 PM": "",
  //                 "2.00 to 3.00 PM": "NSS/ NCC/ REDCROSS"
  //               },
  //               FRIDAY: {
  //                 "9.00 TO 10.00 am": "Assessment / CIE",
  //                 "10.00 TO 11.00 am": "",
  //                 "11.00 TO 12.00 pm": "Assessment / CIE",
  //                 "12.00 Tpm TO 1.00 pm": "",
  //                 "1.00 to 2.00 PM": "Assessment / CIE"
  //               },
  //               SATURDAY: {
  //                 "9.00 TO 10.00 am": "Industry / Seminar",
  //                 "10.00 TO 11.00 am": "",
  //                 "11.00 TO 12.00 pm": "Industry / Seminar"
  //               }
  //             }
            
       
  //   };
    
  //   constructor(private http: HttpClient, private router: Router) {}
  //   ngOnInit(): void {
  //     const semesterFromStorage = localStorage.getItem('semester');
  //     if (semesterFromStorage) {
  //       this.selectedSemester = semesterFromStorage;
  //     } else {
  //       this.selectedSemester = 'all'; // Default to 'all' if no semester is found
  //     }
  //     this.onSemesterChange(); // Call the method to fetch the timetable based on semester
  //   }
    

  //   onSemesterChange(): void {
  //     console.log('Selected Semester:', this.selectedSemester);
    
  //     if (this.selectedSemester === 'all') {
  //       this.filteredTimetable = this.semesterTimetable;
  //     } else {
  //       this.filteredTimetable = this.semesterTimetable[this.selectedSemester] || {};
  //     }
  //   }
    
    
    
  //   // onSemesterChange(): void {
  //   //   console.log('Selected Semester:', this.selectedSemester);
  //   //   this.filteredTimetable = this.semesterTimetable[this.selectedSemester] || {};
  //   // }
    
  //   onFileSelect(event: any): void {
  //     this.selectedFile = event.target.files[0];
  //     if (this.selectedFile && !this.selectedFile.name.endsWith('.xlsx')) {
  //       alert('Please upload a valid Excel file');
  //       this.selectedFile = null;
  //     }
  //   }
    
  //   uploadTimetable(): void {
  //     if (this.selectedFile) {
       
    
  //       const formData = new FormData();
  //   formData.append('file', this.selectedFile, this.selectedFile.name);
    
  //   // this.http.post('http://localhost:8080/api/timetables/upload-timetable', formData).subscribe(response => {
  //   //   console.log('Upload successful:', response);
  //   // }, error => {
  //   //   console.error('Upload error:', error);
  //   // });

  //   this.http.get(`http://localhost:8080/api/timetables/category/Time-Table/${this.selectedSemester}`)
  // .subscribe(response => {
  //   console.log('Fetched documents:', response);
  // }, error => {
  //   console.error('Error fetching documents:', error);
  // });
        
  //     } else {
  //       console.error('No file selected');
  //     }
  //   }
    
    
    
    
  // }