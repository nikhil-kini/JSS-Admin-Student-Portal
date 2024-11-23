import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceManagementComponent } from './attendance-management/attendance-management.component';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackSystemComponent } from './feedback-system/feedback-system.component';
import { HomeComponent } from './home/home.component';
import { IAModuleComponent } from './ia-module/ia-module.component';
import { LessonPlanComponent } from './lesson-plan/lesson-plan.component';
import { PersonalDocumentsComponent } from './personal-documents/personal-documents.component';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { TeachingAidsComponent } from './teaching-aids/teaching-aids.component';
import { TimetableComponent } from './timetable/timetable.component';
import { authGuard } from '../auth.guard';
import { StaffmanagementComponent } from './staffmanagement/staffmanagement.component';
import { StaffRegistrationComponent } from './staff-registration/staff-registration.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import { StaffRegistrationComponent } from './staffmanagement/staff-registration/staff-registration.component';

const routes: Routes = [
  {path:'home',component: HomeComponent},
  { path: 'attendance-management', component: AttendanceManagementComponent },
  { path: 'feedback-system', component: FeedbackSystemComponent,canActivate: [authGuard], },
  {path:'ia-module',component: IAModuleComponent},
  {path:'lesson-plan',component: LessonPlanComponent},
  {path:'personal-documents',component: PersonalDocumentsComponent},
  {path:'question-bank',component: QuestionBankComponent},
  {path:'students-management',component: StudentManagementComponent},
  {path:'students-registration',component: StudentRegistrationComponent},
  {path:'teaching-aids',component: TeachingAidsComponent},
  {path:'time-table',component: TimetableComponent},
  {path:'staff-management',component: StaffmanagementComponent},
    { path: 'staff-registration', component: StaffRegistrationComponent }
  
  
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AttendanceManagementComponent,FeedbackSystemComponent,
    HomeComponent,IAModuleComponent,
    LessonPlanComponent,PersonalDocumentsComponent,
    QuestionBankComponent,StudentManagementComponent,
    TeachingAidsComponent,TimetableComponent,StaffmanagementComponent,NgxPaginationModule 
  ],
  exports: [RouterModule]
})
export class SidemenuModule { }
