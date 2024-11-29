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


loginData = {
  email: '',
  password: '',
  role:'Admin'
};

constructor(private http: HttpClient, private router: Router) {}

// onLoginSubmit() {
//   console.log('Logging in with:', this.loginData);
//   this.http.post('http://localhost:8080/users/login', this.loginData).subscribe(
//     (response: any) => {
//       console.log('Login successful:', response);

//       // Extract the userId from the response (id is the userId in your User entity)
//       const userId = response.id;  // The userId is the 'id' field in the response

//       localStorage.setItem('isAuthenticated', 'true');
//       localStorage.setItem('loginUser', this.loginData.email);
//       localStorage.setItem('userId', userId.toString());  // Store userId in localStorage

//       this.router.navigate(['/sidemenu/home']);
//     },
//     (error) => {
//       console.error('Login failed:', error);
//       if (error.status === 401) {
//         alert('Invalid credentials');
//       } else {
//         alert('An error occurred. Please try again later.');
//       }
//     }
//   );
// }
// }

onLoginSubmit() {
  console.log('Logging in with:', this.loginData);
  this.http.post('http://localhost:8080/users/login1', this.loginData).subscribe(
    (response: any) => {
      console.log('Login successful:', response);

      // Extract the userId from the response (id is the userId in your User entity)
      const userId = response.id;  // The userId is the 'id' field in the response

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('loginUser', this.loginData.email);
      localStorage.setItem('userId', userId.toString());  // Store userId in localStorage

      this.router.navigate(['/sidemenu/home']);
    },
    (error) => {
      console.error('Login failed:', error);
      if (error.status === 401) {
        alert('Invalid credentials');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  );
}
}