import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangedPasswordComponent } from './changed-password/changed-password.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'changedpassword', component: ChangedPasswordComponent }
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
