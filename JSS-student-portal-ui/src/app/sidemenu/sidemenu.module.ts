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
import { NewAttendenceManagementComponent } from './new-attendence-management/new-attendence-management.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'attendance-management', component: AttendanceManagementComponent },
  {
    path: 'new-attendance-management',
    component: NewAttendenceManagementComponent,
  },
  { path: 'feedback-system', component: FeedbackSystemComponent },
  { path: 'ia-module', component: IAModuleComponent },
  { path: 'lesson-plan', component: LessonPlanComponent },
  { path: 'personal-documents', component: PersonalDocumentsComponent },
  { path: 'question-bank', component: QuestionBankComponent },
  { path: 'students-management', component: StudentManagementComponent },
  { path: 'teaching-aids', component: TeachingAidsComponent },
  { path: 'time-table', component: TimetableComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AttendanceManagementComponent,
    FeedbackSystemComponent,
    HomeComponent,
    IAModuleComponent,
    LessonPlanComponent,
    PersonalDocumentsComponent,
    QuestionBankComponent,
    StudentManagementComponent,
    TeachingAidsComponent,
    TimetableComponent,
  ],
  exports: [RouterModule],
})
export class SidemenuModule {}
