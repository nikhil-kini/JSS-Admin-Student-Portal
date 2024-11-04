import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-system',
  standalone: true,
  imports: [],
  templateUrl: './feedback-system.component.html',
  styleUrl: './feedback-system.component.css'
})
export class FeedbackSystemComponent {
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
    personaldocuments(){
      this.router.navigate(['/personal-documents'])
    }
    logout() {
      localStorage.removeItem('isAuthenticated'); 
    localStorage.removeItem('loginUser');
      this.router.navigate(['/auth/login']);
    }
}
