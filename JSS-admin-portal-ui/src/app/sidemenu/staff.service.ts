import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private apiUrl = 'http://localhost:8080/users';  // Adjust the URL based on your backend

  constructor(private http: HttpClient) {}

  // // Method to get all staff details
  // getStaffData(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  // }
  getStaffData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/staff`);
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

  // Method to upload marks card
  // uploadMarksCard(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('marksCard', file);
  //   return this.http.post(`${this.apiUrl}/upload-marksCard`, formData, { responseType: 'text' });
  // }

  // // Method to upload a photo
  // uploadPhoto(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('photo', file);
  //   return this.http.post(`${this.apiUrl}/upload-photo`, formData, { responseType: 'text' });
  // }

  // getDocumentsByCategory(category: string): Observable<Document[]> {
  //   return this.http.get<Document[]>(`${this.apiUrl}/category/${category}`);
}
