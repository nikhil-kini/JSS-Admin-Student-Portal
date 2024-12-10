import { Routes } from '@angular/router';

// import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './sidemenu/home/home.component';
import { TimetableComponent } from './sidemenu/timetable/timetable.component';
import { StudentManagementComponent } from './sidemenu/student-management/student-management.component';
import { AttendanceManagementComponent } from './sidemenu/attendance-management/attendance-management.component';
import { QuestionBankComponent } from './sidemenu/question-bank/question-bank.component';
import { IAModuleComponent } from './sidemenu/ia-module/ia-module.component';
import { FeedbackSystemComponent } from './sidemenu/feedback-system/feedback-system.component';
import { LessonPlanComponent } from './sidemenu/lesson-plan/lesson-plan.component';
import { TeachingAidsComponent } from './sidemenu/teaching-aids/teaching-aids.component';

// import { StudentregComponent } from './studentreg/studentreg.component';
import { PersonalDocumentsComponent } from './sidemenu/personal-documents/personal-documents.component';
import { Login1Component } from './login1/login1.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
// import { ChangedPasswordComponent } from './changed-password/changed-password.component';






export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { 
    path: 'auth', 
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) 
  },
  { 
    path: 'sidemenu', 
    loadChildren: () => import('./sidemenu/sidemenu.module').then(m => m.SidemenuModule) 
  },

  // lazyloading
  {
    path: 'lazyload', 
    loadChildren: () => import('./lazyloadmodule/lazyloadmodule.module').then(m => m.LazyloadmoduleModule) 
  },
 
  // child routes
  {
    path:"dashboard",
    component:DashboardComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'login1', component: Login1Component },
    ],
  
    
  },

  {
    path:"login1",
    component:Login1Component,
   
  },
  
  
  
  
 
  
 
  
 
  
  
  
    
      
  
];
