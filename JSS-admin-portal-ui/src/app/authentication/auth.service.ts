// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, tap } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

  
 

//   private baseUrl = 'http://localhost:8080/register-user';
//   private loggedIn = false; 

//   constructor(private http: HttpClient) {}

//   login(userData: any): Observable<any> {
//     console.log('Calling backend API');
//     return this.http.post<any>(`${this.baseUrl}/login`, userData).pipe(
//       tap(response => {
//         this.loggedIn = true; 
//       })
//     );
//   }

//   registerUser(userData: any): Observable<any> {
//     console.log("Making registerUser http call", userData);
//     return this.http.post(this.baseUrl, userData);
//   }

//   isAuthenticated(): boolean {
//     return this.loggedIn; 
//   }

//   logout() {
//     this.loggedIn = false; 
//   }

// }
