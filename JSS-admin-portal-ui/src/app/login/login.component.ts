import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { Base64 } from 'js-base64';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
//   private authService=inject(AuthService); 
//   private router = inject(Router);
  
//   ngOnInit() {
//     this.resetForm();
//   }

//   resetForm(form?: NgForm) {
//     if (form) {
//       form.reset();
//     }
//   }

// onSubmit(form: NgForm) {
//   console.log('inside on submit', form.value);
//   form.value.password = Base64.encode(form.value.password);
//     this.authService.login(form.value).subscribe(
//       {
//         next: (response) => {
//           if(response) {
//             alert('Login successful');
//             localStorage.setItem('isAuthenticated', 'true');
//             this.router.navigate(['/home']);
//           } else {
//             alert('Login Failed');
            
//           }
//         }

      
// });
 

// }
// }

loginData = {
  email: '',
  password: ''
};

constructor(private http: HttpClient, private router: Router) {}

onLoginSubmit() {
  console.log('Logging in with:', this.loginData);
  this.http.post('http://localhost:8080/users/login', this.loginData).subscribe(
      (response: any) => {
          console.log('Login successful:', response);
          localStorage.setItem('isAuthenticated', 'true');
          this.router.navigate(['/home']);
      },
      (error) => {
          console.error('Login failed:', error);
          if (error.status === 401) {
              alert('Invalid credentials'); // Only alert for 401 errors
          } else {
              alert('An error occurred. Please try again later.');
          }
      }
  );
}
}

