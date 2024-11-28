import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangedPasswordComponent } from './changed-password/changed-password.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'changedpassword', component: ChangedPasswordComponent ,canActivate: [authGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LoginComponent,ChangedPasswordComponent
  ],
  exports: [RouterModule]
})
export class AuthenticationModule { }
