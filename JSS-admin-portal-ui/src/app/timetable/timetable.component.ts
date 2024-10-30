import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface DaySchedule {
  time: string;    
  subject: string; 
}


interface Timetable {
  [semester: string]: DaySchedule[]; 
}


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
    logout() {
      localStorage.removeItem('isAuthenticated'); 
    localStorage.removeItem('loginUser');
      this.router.navigate(['/login']);
    }
    personaldocuments(){
      this.router.navigate(['/personal-documents'])
    }



selectedFile: File | null = null;

// constructor(private http: HttpClient) {}

onFileChange(event: any) {
  this.selectedFile = event.target.files[0];
}

onSubmit() {
  if (this.selectedFile) {
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('/api/timetable/upload', formData).subscribe(
      response => {
        console.log(response);
        alert('File uploaded successfully!');
      },
      error => {
        console.error(error);
        alert('File upload failed!');
      }
    );
  }
}
}


// selectedSemester = 'Sem 1';
//   isMasterTimetableVisible = false;
//   isTheoryTimetableVisible = false;
//   isLabTimetableVisible = false;

//   // Define theory timetable
//   theoryTimetable: DaySchedule[] = [];
//   labTimetable: DaySchedule[] = []; // Declare lab timetable here

//   // Updated timetableData to include theory schedules
//   timetableData: Timetable = {
//     'Sem 1': [
//       { time: '9:00 AM - 10:00 AM', subject: 'Theory: Engineering Mathematics I' },
//       { time: '10:00 AM - 11:00 AM', subject: 'Theory: Applied Physics' },
//       { time: '11:00 AM - 12:00 PM', subject: 'Theory: Applied Chemistry' },
//       { time: '12:00 PM - 1:00 PM', subject: 'Theory: Engineering Drawing' },
//       { time: '1:00 PM - 2:00 PM', subject: 'Lunch Break' },
//       { time: '2:00 PM - 3:00 PM', subject: 'Theory: Basics of Computer Science' },
//       { time: '3:00 PM - 4:00 PM', subject: 'Theory: Environmental Studies' },
//       { time: '4:00 PM - 5:00 PM', subject: 'Physical Education' },
//     ],
//     'Sem 2': [
//       { time: '9:00 AM - 10:00 AM', subject: 'Theory: Engineering Mathematics II' },
//       { time: '10:00 AM - 11:00 AM', subject: 'Theory: Electrical Engineering' },
//       { time: '11:00 AM - 12:00 PM', subject: 'Theory: Engineering Mechanics' },
//       { time: '12:00 PM - 1:00 PM', subject: 'Theory: Material Science' },
//       { time: '1:00 PM - 2:00 PM', subject: 'Lunch Break' },
//       { time: '2:00 PM - 3:00 PM', subject: 'Theory: Computer Programming' },
//       { time: '3:00 PM - 4:00 PM', subject: 'Theory: Manufacturing Process' },
//       { time: '4:00 PM - 5:00 PM', subject: 'Workshop Practice' },
//     ],
//     'Sem 3': [
//       { time: '9:00 AM - 10:00 AM', subject: 'Theory: Software Engineering' },
//       { time: '10:00 AM - 11:00 AM', subject: 'Theory: Database Management Systems' },
//       { time: '11:00 AM - 12:00 PM', subject: 'Theory: Operating Systems' },
//       { time: '12:00 PM - 1:00 PM', subject: 'Theory: Computer Networks' },
//       { time: '1:00 PM - 2:00 PM', subject: 'Lunch Break' },
//       { time: '2:00 PM - 3:00 PM', subject: 'Theory: Web Technologies' },
//       { time: '3:00 PM - 4:00 PM', subject: 'Theory: Computer Architecture' },
//       { time: '4:00 PM - 5:00 PM', subject: 'Lab: Software Lab' },
//     ],
//     'Sem 4': [
//       { time: '9:00 AM - 10:00 AM', subject: 'Theory: Computer Graphics' },
//       { time: '10:00 AM - 11:00 AM', subject: 'Theory: Mobile Application Development' },
//       { time: '11:00 AM - 12:00 PM', subject: 'Theory: Cloud Computing' },
//       { time: '12:00 PM - 1:00 PM', subject: 'Theory: Cyber Security' },
//       { time: '1:00 PM - 2:00 PM', subject: 'Lunch Break' },
//       { time: '2:00 PM - 3:00 PM', subject: 'Theory: Data Science' },
//       { time: '3:00 PM - 4:00 PM', subject: 'Theory: Agile Methodologies' },
//       { time: '4:00 PM - 5:00 PM', subject: 'Lab: Database Lab' },
//     ],
//     'Sem 5': [
//       { time: '9:00 AM - 10:00 AM', subject: 'Theory: Advanced Programming' },
//       { time: '10:00 AM - 11:00 AM', subject: 'Theory: Human-Computer Interaction' },
//       { time: '11:00 AM - 12:00 PM', subject: 'Theory: Software Testing' },
//       { time: '12:00 PM - 1:00 PM', subject: 'Theory: Big Data' },
//       { time: '1:00 PM - 2:00 PM', subject: 'Lunch Break' },
//       { time: '2:00 PM - 3:00 PM', subject: 'Theory: Digital Marketing' },
//       { time: '3:00 PM - 4:00 PM', subject: 'Theory: Internet of Things' },
//       { time: '4:00 PM - 5:00 PM', subject: 'Lab: Advanced Programming Lab' },
//     ],
//     'Sem 6': [
//       { time: '9:00 AM - 10:00 AM', subject: 'Theory: Project Management' },
//       { time: '10:00 AM - 11:00 AM', subject: 'Theory: Ethical Hacking' },
//       { time: '11:00 AM - 12:00 PM', subject: 'Theory: Blockchain Technology' },
//       { time: '12:00 PM - 1:00 PM', subject: 'Theory: Data Analytics' },
//       { time: '1:00 PM - 2:00 PM', subject: 'Lunch Break' },
//       { time: '2:00 PM - 3:00 PM', subject: 'Theory: UI/UX Design' },
//       { time: '3:00 PM - 4:00 PM', subject: 'Theory: DevOps' },
//       { time: '4:00 PM - 5:00 PM', subject: 'Lab: Project Development Lab' },
//     ],
//   };

//   // Sample lab timetable
//   labTimetableData: Timetable = {
//     'Sem 1': [
//       { time: '9:00 AM - 10:00 AM', subject: 'Lab: Physics Lab' },
//       { time: '10:00 AM - 11:00 AM', subject: 'Lab: Chemistry Lab' },
//       { time: '11:00 AM - 12:00 PM', subject: 'Lab: Computer Lab' },
//       { time: '2:00 PM - 3:00 PM', subject: 'Lab: Electrical Engineering Lab' },
//       { time: '3:00 PM - 4:00 PM', subject: 'Lab: Workshop Practice' },
//     ],
//     'Sem 2': [
//       { time: '9:00 AM - 10:00 AM', subject: 'Lab: Electrical Lab' },
//       { time: '10:00 AM - 11:00 AM', subject: 'Lab: Electronics Lab' },
//       { time: '11:00 AM - 12:00 PM', subject: 'Lab: Mechanics Lab' },
//       { time: '2:00 PM - 3:00 PM', subject: 'Lab: Material Testing Lab' },
//       { time: '3:00 PM - 4:00 PM', subject: 'Lab: Production Lab' },
//     ],
//     'Sem 3': [
//       { time: '9:00 AM - 10:00 AM', subject: 'Lab: Networking Lab' },
//       { time: '10:00 AM - 11:00 AM', subject: 'Lab: Software Lab' },
//       { time: '11:00 AM - 12:00 PM', subject: 'Lab: Database Lab' },
//       { time: '2:00 PM - 3:00 PM', subject: 'Lab: Web Development Lab' },
//       { time: '3:00 PM - 4:00 PM', subject: 'Lab: Cloud Lab' },
//     ],
//     'Sem 4': [
//       { time: '9:00 AM - 10:00 AM', subject: 'Lab: Computer Graphics Lab' },
//       { time: '10:00 AM - 11:00 AM', subject: 'Lab: Cyber Security Lab' },
//       { time: '11:00 AM - 12:00 PM', subject: 'Lab: Mobile Lab' },
//       { time: '2:00 PM - 3:00 PM', subject: 'Lab: Software Testing Lab' },
//       { time: '3:00 PM - 4:00 PM', subject: 'Lab: Data Science Lab' },
//     ],
//     'Sem 5': [
//       { time: '9:00 AM - 10:00 AM', subject: 'Lab: Advanced Programming Lab' },
//       { time: '10:00 AM - 11:00 AM', subject: 'Lab: Human-Computer Interaction Lab' },
//       { time: '11:00 AM - 12:00 PM', subject: 'Lab: Big Data Lab' },
//       { time: '2:00 PM - 3:00 PM', subject: 'Lab: Internet of Things Lab' },
//       { time: '3:00 PM - 4:00 PM', subject: 'Lab: Digital Marketing Lab' },
//     ],
//     'Sem 6': [
//       { time: '9:00 AM - 10:00 AM', subject: 'Lab: Ethical Hacking Lab' },
//       { time: '10:00 AM - 11:00 AM', subject: 'Lab: Data Analytics Lab' },
//       { time: '11:00 AM - 12:00 PM', subject: 'Lab: UI/UX Design Lab' },
//       { time: '2:00 PM - 3:00 PM', subject: 'Lab: DevOps Lab' },
//       { time: '3:00 PM - 4:00 PM', subject: 'Lab: Blockchain Lab' },
//     ],
//   };

//   showMasterTimetable() {
//     this.isMasterTimetableVisible = true;
//     this.isTheoryTimetableVisible = false; // Hide theory timetable
//     this.isLabTimetableVisible = false;    // Hide lab timetable
//     this.theoryTimetable = this.timetableData[this.selectedSemester]; // Get theory timetable for the selected semester
//     this.labTimetable = this.labTimetableData[this.selectedSemester]; // Get lab timetable for the selected semester
//   }

//   // Functions to show theory and lab timetables
//   showTheoryTimetable() {
//     this.isMasterTimetableVisible = false; // Hide master timetable
//     this.isTheoryTimetableVisible = true;  // Show theory timetable
//     this.isLabTimetableVisible = false;     // Hide lab timetable
//     this.theoryTimetable = this.timetableData[this.selectedSemester]; // Get all theory subjects
//   }

//   showLabTimetable() {
//     this.isMasterTimetableVisible = false; // Hide master timetable
//     this.isTheoryTimetableVisible = false;  // Hide theory timetable
//     this.isLabTimetableVisible = true;      // Show lab timetable
//     this.labTimetable = this.labTimetableData[this.selectedSemester]; // Get all lab subjects
//   }

//   // Additional functions for handling semester change
//   availableSemesters = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'];

//   onSemesterChange(event: any) {
//     this.selectedSemester = event.target.value;
    
//     // Reset visibility flags
//     this.isMasterTimetableVisible = false;
//     this.isTheoryTimetableVisible = false;
//     this.isLabTimetableVisible = false;

//     // Clear the current timetables
//     this.theoryTimetable = [];
//     this.labTimetable = [];
//   }
  
// }