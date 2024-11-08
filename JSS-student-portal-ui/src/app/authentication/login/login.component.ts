import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  student = {
    
    password: '',
    email: '',
    
  };

  private http = inject(HttpClient);
  private router = inject(Router);
registrationForm: any;

 

onSubmit() {
  console.log("Attempting to log in with:", this.student);
 
  this.http.post('http://localhost:8080/register-user/login', this.student, { responseType: 'text' })
    .subscribe({
      next: (response) => { 
        console.log('Login Success:', response);
        localStorage.setItem('isAuthenticated', 'true'); // Set authentication status
        console.log('Navigating to dashboard...');
        this.router.navigate(['/dashboard']);
        alert("Login Successful");
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login Error:', error);
        alert("Login Unsuccessful");
      }
    });
}

}
