import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  
  private apiUrl = 'http://localhost:8080/users';  

  constructor(private http: HttpClient) {}

  
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  getStudentData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student`);
  }

  // Method to register a new staff member with multipart form data
  registerStaff(staffData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, staffData, { responseType: 'text' });
  }

  // Method to login a user
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Method to update staff details
  updateStaff(staff: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${staff.id}`, staff, { responseType: 'text' });
  }

  // Method to change password
  changePassword(passwordData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/change-password`, passwordData, { responseType: 'text' });
  }

  // Method to delete a staff member
  deleteStaff(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }

}
