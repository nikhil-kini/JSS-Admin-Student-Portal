import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  

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

  

//   constructor(private http: HttpClient, private router: Router) {}
   
//   isTimetableVisible: boolean = true;
//   selectedSemester: string = 'all';
//   filteredTimetable: any;

// updateTimetable(): void {
//   this.http.put('http://localhost:8080/api/timetables/upload-timetable', this.semesterTimetable)
//     .subscribe(
//       response => {
//         console.log('Timetable updated successfully:', response);
//         alert('Timetable updated successfully!');
//       },
//       error => {
//         console.error('Error updating timetable:', error);
//         alert('Failed to update timetable.');
//       }
//     );
// }

//   semesters = [1, 2, 3, 4, 5, 6];
//   days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
//   timeSlots = [
//     '9.00 TO 10.00 am', '10.00 TO 11.00 am', '11.00 TO 12.00 pm',
//     '12.00 Tpm TO 1.00 pm', '1.00 to 2.00 PM', '2.00 to 3.00 PM', '3.00 tp 4.00 PM'
//   ];

//   semesterTimetable: any = {
//     1: {
//       MONDAY: { '11.00 TO 12.00 pm': 'EM', '12.00 Tpm TO 1.00 pm': 'FOC', '2.00 to 3.00 PM': 'ES', '3.00 tp 4.00 PM': 'FEEE (THEORY)' },
//       TUESDAY: { '11.00 TO 12.00 pm': 'FEEE Lab B1 / IT skill Lab B2', '3.00 tp 4.00 PM': 'FEEE Lab B2 / IT skill Lab B1' },
//       WEDNESDAY: { '11.00 TO 12.00 pm': 'EM', '12.00 Tpm TO 1.00 pm': 'EM', '3.00 tp 4.00 PM': 'FEEE Lab B2 / IT skill Lab B1' },
//       THURSDAY: { '11.00 TO 12.00 pm': 'EM', '12.00 Tpm TO 1.00 pm': 'FOC', '3.00 tp 4.00 PM': 'NSS / NCC / REDCROSS' },
//       FRIDAY: { '9.00 TO 10.00 am': 'FEEE Lab B1 / IT skill Lab B2', '11.00 TO 12.00 pm': 'ITSKILLS (THEORY)', '12.00 Tpm TO 1.00 pm': 'FEEE (THEORY)', '2.00 to 3.00 PM': 'ES', '3.00 tp 4.00 PM': 'FOC' },
//       SATURDAY: { '11.00 TO 12.00 pm': 'ITSKILLS (THEORY)', '12.00 Tpm TO 1.00 pm': 'FOC' }
//     },
//     3: {
//       MONDAY: { '9.00 TO 10.00 am': 'DBMS', '10.00 TO 11.00 am': 'PYTHON', '11.00 TO 12.00 pm': 'DBMS LAB', '12.00 Tpm TO 1.00 pm': 'DBMS LAB', '2.00 to 3.00 PM': 'CHMA LAB', '3.00 tp 4.00 PM': 'CHMA LAB' },
//       TUESDAY: { '9.00 TO 10.00 am': 'KANNADA', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'CN', '12.00 Tpm TO 1.00 pm': 'PYTHON', '2.00 to 3.00 PM': 'CHMA LAB', '3.00 tp 4.00 PM': 'CHMA LAB' },
//       WEDNESDAY: { '9.00 TO 10.00 am': 'DBMS', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'PYTHON LAB', '12.00 Tpm TO 1.00 pm': 'PYTHON LAB', '2.00 to 3.00 PM': 'CN', '3.00 tp 4.00 PM': 'PYTHON' },
//       THURSDAY: { '9.00 TO 10.00 am': 'KANNADA', '10.00 TO 11.00 am': 'PYTHON', '11.00 TO 12.00 pm': 'CN LAB', '12.00 Tpm TO 1.00 pm': 'CN LAB', '2.00 to 3.00 PM': 'NSS/ NCC/ REDCROSS' },
//       FRIDAY: { '9.00 TO 10.00 am': 'CN', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'PYTHON LAB', '12.00 Tpm TO 1.00 pm': 'PYTHON LAB', '2.00 to 3.00 PM': 'CN', '3.00 tp 4.00 PM': 'DBMS' },
//       SATURDAY: { '9.00 TO 10.00 am': 'DBMS', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'CN LAB' },
//     },
    
//       5: {
//         MONDAY: {
//           "9.00 TO 10.00 am": "FSD (P)",
//           "10.00 TO 11.00 am": "FSD (P)",
//           "11.00 TO 12.00 pm": "FSD (L)",
//           "12.00 Tpm TO 1.00 pm": "FSD (L)",
//           "1.00 to 2.00 PM": "LUNCH BREAK",
//           "2.00 to 3.00 PM": "FSD (L+P)",
//           "3.00 tp 4.00 PM": "FSD (L+P)"
//         },
//         TUESDAY: {
//           "9.00 TO 10.00 am": "FSD (P)",
//           "10.00 TO 11.00 am": "FSD (P)",
//           "11.00 TO 12.00 pm": "FSD (L)",
//           "12.00 Tpm TO 1.00 pm": "FSD (L)",
//           "1.00 to 2.00 PM": "",
//           "2.00 to 3.00 PM": "FSD (L+P)",
//           "3.00 tp 4.00 PM": "FSD (L+P)"
//         },
//         WEDNESDAY: {
//           "9.00 TO 10.00 am": "FSD (P)",
//           "10.00 TO 11.00 am": "FSD (P)",
//           "11.00 TO 12.00 pm": "FSD (L)",
//           "12.00 Tpm TO 1.00 pm": "FSD (L)",
//           "1.00 to 2.00 PM": "",
//           "2.00 to 3.00 PM": "FSD (L+P)",
//           "3.00 tp 4.00 PM": "FSD (L+P)"
//         },
//         THURSDAY: {
//           "9.00 TO 10.00 am": "FSD (P)",
//           "10.00 TO 11.00 am": "FSD (P)",
//           "11.00 TO 12.00 pm": "FSD (L)",
//           "12.00 Tpm TO 1.00 pm": "FSD (L)",
//           "1.00 to 2.00 PM": "",
//           "2.00 to 3.00 PM": "NSS/ NCC/ REDCROSS"
//         },
//         FRIDAY: {
//           "9.00 TO 10.00 am": "Assessment / CIE",
//           "10.00 TO 11.00 am": "",
//           "11.00 TO 12.00 pm": "Assessment / CIE",
//           "12.00 Tpm TO 1.00 pm": "",
//           "1.00 to 2.00 PM": "Assessment / CIE"
//         },
//         SATURDAY: {
//           "9.00 TO 10.00 am": "Industry / Seminar",
//           "10.00 TO 11.00 am": "",
//           "11.00 TO 12.00 pm": "Industry / Seminar"
//         }
//       }
    
//   };

//   ngOnInit(): void {
//     this.loadTimetable();
//   }

//   loadTimetable(): void {
//     this.http.get<any>('http://localhost:8080/api/timetables/upload-timetable')
//       .subscribe(
//         data => {
//           this.semesterTimetable = data;
//           console.log('Timetable loaded:', this.semesterTimetable);
//         },
//         error => {
//           console.error('Error loading timetable:', error);
//         }
//       );
//   }

  
//   onSemesterChange() {
//     console.log('Selected Semester:', this.selectedSemester);
//     this.filteredTimetable = this.semesterTimetable[this.selectedSemester] || {};
//   }
//   selectedFile: File | null = null;

// onFileSelect(event: any): void {
//   this.selectedFile = event.target.files[0];
// }
  
// uploadTimetable(): void {
//   if (this.selectedFile) {
//     const formData = new FormData();
//     formData.append('file', this.selectedFile);
//     this.http.post('http://localhost:8080/api/timetables/upload-timetable', formData).subscribe({
//       next: (response) => {
//         console.log('File uploaded successfully', response);
//       },
//       error: (error) => {
//         console.error('Error uploading file', error);
//       }
//     });
//   } else {
//     console.error('No file selected');
//   }
// }
  
  
// }

semesters = [1, 2, 3, 4, 5, 6];
days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
timeSlots = [
  '9.00 TO 10.00 am', '10.00 TO 11.00 am', '11.00 TO 12.00 pm',
  '12.00 Tpm TO 1.00 pm', '1.00 to 2.00 PM', '2.00 to 3.00 PM', '3.00 tp 4.00 PM'
];

selectedSemester: string = 'all';
isTimetableVisible: boolean = true;
selectedFile: File | null = null;
filteredTimetable: any;
semesterTimetable: any = {
  1: {
          MONDAY: { '11.00 TO 12.00 pm': 'EM', '12.00 Tpm TO 1.00 pm': 'FOC', '2.00 to 3.00 PM': 'ES', '3.00 tp 4.00 PM': 'FEEE (THEORY)' },
          TUESDAY: { '11.00 TO 12.00 pm': 'FEEE Lab B1 / IT skill Lab B2', '3.00 tp 4.00 PM': 'FEEE Lab B2 / IT skill Lab B1' },
          WEDNESDAY: { '11.00 TO 12.00 pm': 'EM', '12.00 Tpm TO 1.00 pm': 'EM', '3.00 tp 4.00 PM': 'FEEE Lab B2 / IT skill Lab B1' },
          THURSDAY: { '11.00 TO 12.00 pm': 'EM', '12.00 Tpm TO 1.00 pm': 'FOC', '3.00 tp 4.00 PM': 'NSS / NCC / REDCROSS' },
          FRIDAY: { '9.00 TO 10.00 am': 'FEEE Lab B1 / IT skill Lab B2', '11.00 TO 12.00 pm': 'ITSKILLS (THEORY)', '12.00 Tpm TO 1.00 pm': 'FEEE (THEORY)', '2.00 to 3.00 PM': 'ES', '3.00 tp 4.00 PM': 'FOC' },
          SATURDAY: { '11.00 TO 12.00 pm': 'ITSKILLS (THEORY)', '12.00 Tpm TO 1.00 pm': 'FOC' }
        },
        3: {
          MONDAY: { '9.00 TO 10.00 am': 'DBMS', '10.00 TO 11.00 am': 'PYTHON', '11.00 TO 12.00 pm': 'DBMS LAB', '12.00 Tpm TO 1.00 pm': 'DBMS LAB', '2.00 to 3.00 PM': 'CHMA LAB', '3.00 tp 4.00 PM': 'CHMA LAB' },
          TUESDAY: { '9.00 TO 10.00 am': 'KANNADA', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'CN', '12.00 Tpm TO 1.00 pm': 'PYTHON', '2.00 to 3.00 PM': 'CHMA LAB', '3.00 tp 4.00 PM': 'CHMA LAB' },
          WEDNESDAY: { '9.00 TO 10.00 am': 'DBMS', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'PYTHON LAB', '12.00 Tpm TO 1.00 pm': 'PYTHON LAB', '2.00 to 3.00 PM': 'CN', '3.00 tp 4.00 PM': 'PYTHON' },
          THURSDAY: { '9.00 TO 10.00 am': 'KANNADA', '10.00 TO 11.00 am': 'PYTHON', '11.00 TO 12.00 pm': 'CN LAB', '12.00 Tpm TO 1.00 pm': 'CN LAB', '2.00 to 3.00 PM': 'NSS/ NCC/ REDCROSS' },
          FRIDAY: { '9.00 TO 10.00 am': 'CN', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'PYTHON LAB', '12.00 Tpm TO 1.00 pm': 'PYTHON LAB', '2.00 to 3.00 PM': 'CN', '3.00 tp 4.00 PM': 'DBMS' },
          SATURDAY: { '9.00 TO 10.00 am': 'DBMS', '10.00 TO 11.00 am': 'CHMA', '11.00 TO 12.00 pm': 'CN LAB' },
        },
        
          5: {
            MONDAY: {
              "9.00 TO 10.00 am": "FSD (P)",
              "10.00 TO 11.00 am": "FSD (P)",
              "11.00 TO 12.00 pm": "FSD (L)",
              "12.00 Tpm TO 1.00 pm": "FSD (L)",
              "1.00 to 2.00 PM": "LUNCH BREAK",
              "2.00 to 3.00 PM": "FSD (L+P)",
              "3.00 tp 4.00 PM": "FSD (L+P)"
            },
            TUESDAY: {
              "9.00 TO 10.00 am": "FSD (P)",
              "10.00 TO 11.00 am": "FSD (P)",
              "11.00 TO 12.00 pm": "FSD (L)",
              "12.00 Tpm TO 1.00 pm": "FSD (L)",
              "1.00 to 2.00 PM": "",
              "2.00 to 3.00 PM": "FSD (L+P)",
              "3.00 tp 4.00 PM": "FSD (L+P)"
            },
            WEDNESDAY: {
              "9.00 TO 10.00 am": "FSD (P)",
              "10.00 TO 11.00 am": "FSD (P)",
              "11.00 TO 12.00 pm": "FSD (L)",
              "12.00 Tpm TO 1.00 pm": "FSD (L)",
              "1.00 to 2.00 PM": "",
              "2.00 to 3.00 PM": "FSD (L+P)",
              "3.00 tp 4.00 PM": "FSD (L+P)"
            },
            THURSDAY: {
              "9.00 TO 10.00 am": "FSD (P)",
              "10.00 TO 11.00 am": "FSD (P)",
              "11.00 TO 12.00 pm": "FSD (L)",
              "12.00 Tpm TO 1.00 pm": "FSD (L)",
              "1.00 to 2.00 PM": "",
              "2.00 to 3.00 PM": "NSS/ NCC/ REDCROSS"
            },
            FRIDAY: {
              "9.00 TO 10.00 am": "Assessment / CIE",
              "10.00 TO 11.00 am": "",
              "11.00 TO 12.00 pm": "Assessment / CIE",
              "12.00 Tpm TO 1.00 pm": "",
              "1.00 to 2.00 PM": "Assessment / CIE"
            },
            SATURDAY: {
              "9.00 TO 10.00 am": "Industry / Seminar",
              "10.00 TO 11.00 am": "",
              "11.00 TO 12.00 pm": "Industry / Seminar"
            }
          }
        
   
};

constructor(private http: HttpClient, private router: Router) {}



onSemesterChange(): void {
  console.log('Selected Semester:', this.selectedSemester);
  this.filteredTimetable = this.semesterTimetable[this.selectedSemester] || {};
}

onFileSelect(event: any): void {
  this.selectedFile = event.target.files[0];
  if (this.selectedFile && !this.selectedFile.name.endsWith('.xlsx')) {
    alert('Please upload a valid Excel file');
    this.selectedFile = null;
  }
}

uploadTimetable(): void {
  if (this.selectedFile) {
    // const formData = new FormData();
    // formData.append('file', this.selectedFile);
    // this.http.post('http://localhost:8080/api/timetables/upload-timetable', formData).subscribe({
    //   next: response => {
    //     console.log('File uploaded successfully', response);
    //     alert('File uploaded successfully!');
    //   },
    //   error: error => {
    //     console.error('Error uploading file', error);
    //     alert('Failed to upload file.');
    //   }
  // });

    const formData = new FormData();
formData.append('file', this.selectedFile, this.selectedFile.name);

this.http.post('http://localhost:8080/api/timetables/upload-timetable', formData).subscribe(response => {
  console.log('Upload successful:', response);
}, error => {
  console.error('Upload error:', error);
});
    
  } else {
    console.error('No file selected');
  }
}



fetchTimetableData(): void {
  this.http.get<any>('http://localhost:8080/api/timetables').subscribe({
    next: (data) => {
      this.semesterTimetable = data;
      this.onSemesterChange();  // Refilter data if necessary
    },
    error: (error) => {
      console.error('Error fetching timetables', error);
    }
  });
}

ngOnInit() {
  
  this.fetchTimetableData();
}

// uploadTimetable(formData: FormData) {
//   const url = 'http://localhost:8080/api/timetables/upload-timetable';
//   return this.http.post(url, formData);
// }

// updateTimetable(): void {
//   this.http.put('http://localhost:8080/api/timetables/upload-timetable', this.semesterTimetable)
//     .subscribe(
//       response => {
//         console.log('Timetable updated successfully:', response);
//         alert('Timetable updated successfully!');
//       },
//       error => {
//         console.error('Error updating timetable:', error);
//         alert('Failed to update timetable.');
//       }
//     );
// }



// loadTimetable(): void {
//   this.http.get<any>('http://localhost:8080/api/timetables/upload-timetable')
//     .subscribe(
//       data => {
//         this.semesterTimetable = data;
//         console.log('Timetable loaded:', this.semesterTimetable);
//       },
//       error => {
//         console.error('Error loading timetable:', error);
//       }
//     );
// }

// uploadTimetable(): void {
//   if (this.selectedFile) {
//     const formData = new FormData();
//     formData.append('file', this.selectedFile);
    
//     // Ensure the request headers are set correctly
//     this.http.post('http://localhost:8080/api/timetables/upload-timetable', formData).subscribe({
//       next: response => {
//         console.log('File uploaded successfully', response);
//         alert('File uploaded successfully!');
//       },
//       error: error => {
//         console.error('Error uploading file', error);
//         alert('Failed to upload file.');
//       }
//     });
//   } else {
//     console.error('No file selected');
//   }
// }
}