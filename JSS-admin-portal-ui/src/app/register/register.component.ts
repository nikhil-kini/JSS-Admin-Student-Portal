// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, inject } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { Router, RouterModule, RouterOutlet } from '@angular/router';
// import { AuthService } from '../authentication/auth.service';
// import { Base64 } from 'js-base64';


// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [RouterOutlet,FormsModule,CommonModule,RouterModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {
//   private authService=inject(AuthService); 
//   private router = inject(Router);
  
//   onRegister(form: NgForm) {
//     if (form.valid) {
//       // Encode the password in Base64 before sending it
//       form.value.password = Base64.encode(form.value.password);
//       console.log('Registration Details:', form.value);

//       this.authService.registerUser(form.value).subscribe({
//         next: (response) => {
//           console.log('Registration successful:', response);
//           alert('Registration successful');
//           this.router.navigate(['/login']);
//         },
//         error: (error) => {
//           console.error('Registration failed:', error);
//           alert('Registration failed. Please try again.');
//         },
//         complete: () => {
//           console.log('Registration process completed.');
//         }
//       });
//     }
//   }
// }