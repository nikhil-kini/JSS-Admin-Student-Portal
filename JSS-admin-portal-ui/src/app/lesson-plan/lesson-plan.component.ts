import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-plan',
  standalone: true,
  imports: [],
  templateUrl: './lesson-plan.component.html',
  styleUrl: './lesson-plan.component.css'
})
export class LessonPlanComponent {
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
      localStorage.removeItem('isAuthenticated'); 
    localStorage.removeItem('loginUser');
      this.router.navigate(['/auth/login']);
    }
    personaldocuments(){
      
      this.router.navigate(['/personal-documents'])
    }
}
