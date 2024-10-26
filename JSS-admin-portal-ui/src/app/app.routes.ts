import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { TimetableComponent } from './timetable/timetable.component';
import { StudentManagementComponent } from './student-management/student-management.component';
import { AttendanceManagementComponent } from './attendance-management/attendance-management.component';
import { QuestionBankComponent } from './question-bank/question-bank.component';
import { IAModuleComponent } from './ia-module/ia-module.component';
import { FeedbackSystemComponent } from './feedback-system/feedback-system.component';
import { LessonPlanComponent } from './lesson-plan/lesson-plan.component';
import { TeachingAidsComponent } from './teaching-aids/teaching-aids.component';
import { Sidemenu1Component } from './sidemenu1/sidemenu1.component';
import { StudentregComponent } from './studentreg/studentreg.component';
import { PersonalDocumentsComponent } from './personal-documents/personal-documents.component';
import { ChangedPasswordComponent } from './changed-password/changed-password.component';
import { ECdepartmentComponent } from './timetable/ecdepartment/ecdepartment.component';
import { CivildepartmentComponent } from './timetable/civildepartment/civildepartment.component';
import { EEdepartmentComponent } from './timetable/eedepartment/eedepartment.component';
import { MechanicaldepartmentComponent } from './timetable/mechanicaldepartment/mechanicaldepartment.component';
import { MechatronicsdepartmentComponent } from './timetable/mechatronicsdepartment/mechatronicsdepartment.component';





export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path:"home",
    component: HomeComponent,
    // canActivate: [authGuard]
  },
  {
    path:"time-table",
    component:TimetableComponent,
    // canActivate: [authGuard]
  },
  {
    path:"students-management",
    component:StudentManagementComponent,
    // canActivate: [authGuard],
    children: [
      { path: 'ecdepartment', component: ECdepartmentComponent },
      { path: 'ecdepartment', component: CivildepartmentComponent },
      { path: 'ecdepartment', component: EEdepartmentComponent },
      { path: 'ecdepartment', component: MechanicaldepartmentComponent },
      { path: 'ecdepartment', component: MechatronicsdepartmentComponent }
    ]
  },
  {
    path:"attendance-management",
    component:AttendanceManagementComponent,
    // canActivate: [authGuard]
  },
  {
    path:"question-bank",
    component:QuestionBankComponent,
    // canActivate: [authGuard]
  },
  {
    path:"ia-module",
    component:IAModuleComponent,
    // canActivate: [authGuard]
  },
  {
    path:"feedback-system",
    component:FeedbackSystemComponent,
    // canActivate: [authGuard]
  },
  {
    path:"lesson-plan",
    component:LessonPlanComponent,
    // canActivate: [authGuard]
  },
  {
    path:"teaching-aids",
    component:TeachingAidsComponent,
    // canActivate: [authGuard]
  },
  {
    path:"sidemenu",
    component:Sidemenu1Component,
    // canActivate: [authGuard]
  },
  {
    path:"studentreg",
    component:StudentregComponent,
    // canActivate: [authGuard]
  },
  {
    path:"personal-documents",
    component:PersonalDocumentsComponent,
    // canActivate: [authGuard]
  },
  {
    path:"changed-password",
    component:ChangedPasswordComponent,
    // canActivate: [authGuard]
  }
    
      
  
];
