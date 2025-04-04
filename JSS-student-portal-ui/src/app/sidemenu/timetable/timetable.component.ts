import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterModule],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css',
})
export class TimetableComponent {
  home() {
    this.router.navigate(['/sidemenu/home']);
  }
  timetable1() {
    this.router.navigate(['/sidemenu/time-table']);
  }
  newAttendancemanagement() {
    this.router.navigate(['/sidemenu/new-attendance-management']);
  }
  // studentsmanagement(){
  //   this.router.navigate(['/sidemenu/students-management']);
  // }
  attendancemanagement() {
    this.router.navigate(['/sidemenu/attendance-management']);
  }
  questionbank() {
    this.router.navigate(['/sidemenu/question-bank']);
  }
  iamodule() {
    this.router.navigate(['/sidemenu/ia-module']);
  }

  feedbacksystem() {
    this.router.navigate(['/sidemenu/feedback-system']);
  }
  lessonplan() {
    this.router.navigate(['/sidemenu/lesson-plan']);
  }
  teachingaids() {
    this.router.navigate(['/sidemenu/teaching-aids']);
  }
  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('Semester');
    this.router.navigate(['/auth/login']);
  }
  // personaldocuments(){
  //   this.router.navigate(['/sidemenu/personal-documents'])
  // }

  lessonplandocuments: any[] = [];
  semester: string | null = null;
  timetable: any[] = [];
  selectedDocumentCategory: string = 'Time-Table';

  // Static timetables for all semesters
  staticTimetables: { [key: string]: any[] } = {
    Sem1: [
      {
        day: 'Monday',
        period1: 'Maths',
        period2: 'Physics',
        period3: 'Chemistry',
        period4: 'Break',
        period5: 'English',
        period6: 'CS Basics',
      },
      {
        day: 'Tuesday',
        period1: 'Physics',
        period2: 'Chemistry',
        period3: 'Maths',
        period4: 'Break',
        period5: 'CS Basics',
        period6: 'English',
      },
      {
        day: 'Wednesday',
        period1: 'Chemistry',
        period2: 'Maths',
        period3: 'English',
        period4: 'Break',
        period5: 'Physics',
        period6: 'CS Basics',
      },
    ],
    Sem2: [
      {
        day: 'Monday',
        period1: 'Biology',
        period2: 'Maths',
        period3: 'Physics',
        period4: 'Break',
        period5: 'Data Struct',
        period6: 'Chemistry',
      },
      {
        day: 'Tuesday',
        period1: 'Maths',
        period2: 'Physics',
        period3: 'Data Struct',
        period4: 'Break',
        period5: 'Biology',
        period6: 'Chemistry',
      },
    ],
    Sem3: [
      {
        day: 'Monday',
        period1: 'DBMS',
        period2: 'OS',
        period3: 'Python',
        period4: 'Break',
        period5: 'DBMS Lab',
        period6: 'Python Lab',
      },
      {
        day: 'Tuesday',
        period1: 'OS',
        period2: 'Python',
        period3: 'DBMS',
        period4: 'Break',
        period5: 'Python Lab',
        period6: 'OS Lab',
      },
    ],
    Sem4: [
      {
        day: 'Monday',
        period1: 'Automata',
        period2: 'Networks',
        period3: 'Compiler',
        period4: 'Break',
        period5: 'DBMS',
        period6: 'Maths',
      },
      {
        day: 'Tuesday',
        period1: 'Compiler',
        period2: 'Automata',
        period3: 'Networks',
        period4: 'Break',
        period5: 'Maths',
        period6: 'DBMS',
      },
    ],
    Sem5: [
      {
        day: 'Monday',
        period1: 'FSD',
        period2: 'Cloud',
        period3: 'AI',
        period4: 'Break',
        period5: 'FSD Lab',
        period6: 'Industry Seminar',
      },
      {
        day: 'Tuesday',
        period1: 'AI',
        period2: 'FSD',
        period3: 'Cloud',
        period4: 'Break',
        period5: 'Cloud Lab',
        period6: 'Assessment',
      },
    ],
    Sem6: [
      {
        day: 'Monday',
        period1: 'ML',
        period2: 'Cloud Native',
        period3: 'CyberSec',
        period4: 'Break',
        period5: 'Research',
        period6: 'Major Project',
      },
      {
        day: 'Tuesday',
        period1: 'CyberSec',
        period2: 'ML',
        period3: 'Cloud Native',
        period4: 'Break',
        period5: 'Major Project',
        period6: 'Research',
      },
    ],
  };

  constructor(private http: HttpClient, private router: Router) {}

  loadTimetable(): void {
    if (this.semester && this.staticTimetables[this.semester]) {
      this.timetable = this.staticTimetables[this.semester];
    } else {
      this.timetable = [];
    }
  }

  downloadTimetable(): void {
    const downloadUrl = `http://localhost:8080/api/timetable/download/${this.semester}`;
    window.location.href = downloadUrl;
  }

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

  ngOnInit(): void {
    // Handle sidebar toggle
    // const toggleButton = document.getElementById('toggleSidebar');
    // toggleButton?.addEventListener('click', () => {
    //   const sidebar = document.getElementById('sidebarMenu');
    //   sidebar?.classList.toggle('collapsed');
    // });

    const toggleButton = document.getElementById('toggleSidebar');
    toggleButton?.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        // Check if screen size is small
        const sidebar = document.getElementById('sidebarMenu');
        sidebar?.classList.toggle('collapsed');
      }
    });

    window.addEventListener('resize', () => {
      const sidebar = document.getElementById('sidebarMenu');
      if (window.innerWidth > 768) {
        sidebar?.classList.remove('collapsed'); // Ensure expanded view for larger screens
      }
    });

    // Load semester from local storage
    this.semester = localStorage.getItem('Semester');
    console.log('Selected Semester from Local Storage:', this.semester);

    if (this.semester) {
      this.loadTimetable();
      this.getDocumentsBySemester();
    } else {
      alert('Semester not found in local storage!');
    }
  }

  getDocumentsBySemester() {
    if (this.semester) {
      const url = `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.semester}`;

      this.http.get<any[]>(url).subscribe({
        next: (documents) => {
          console.log('Fetched Documents:', documents);
          this.lessonplandocuments = documents;
        },
        error: (error) => {
          console.error('Error fetching documents:', error);
          alert('Error fetching documents');
        },
      });
    }
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
