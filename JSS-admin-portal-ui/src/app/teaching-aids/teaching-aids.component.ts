import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teaching-aids',
  standalone: true,
  imports: [],
  templateUrl: './teaching-aids.component.html',
  styleUrl: './teaching-aids.component.css'
})
export class TeachingAidsComponent {
  constructor(private router: Router) {}

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
      this.router.navigate(['/login']);
    }
    personaldocuments(){
      this.router.navigate(['/personal-documents'])
    }
  }
