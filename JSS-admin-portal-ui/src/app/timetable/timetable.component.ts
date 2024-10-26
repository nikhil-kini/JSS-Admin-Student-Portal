import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ECdepartmentComponent } from './ecdepartment/ecdepartment.component';
import { EEdepartmentComponent } from './eedepartment/eedepartment.component';
import { MechanicaldepartmentComponent } from './mechanicaldepartment/mechanicaldepartment.component';
import { MechatronicsdepartmentComponent } from './mechatronicsdepartment/mechatronicsdepartment.component';
import { CivildepartmentComponent } from './civildepartment/civildepartment.component';
import { CSdepartmentComponent } from './csdepartment/csdepartment.component';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [ECdepartmentComponent,EEdepartmentComponent,MechanicaldepartmentComponent,MechatronicsdepartmentComponent,CivildepartmentComponent,CSdepartmentComponent],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.css'
})
export class TimetableComponent {
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
ecdepartment(){
  this.router.navigate(['/ecdepartment'])
}

}
