import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private apiUrl = 'http://localhost:8080/api/staff';  // Adjust the URL based on your backend

  constructor(private http: HttpClient) {}

 

  updateStaff(staff: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${staff.id}`, staff, { responseType: 'text' });
  }
  

  deleteStaff(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' }); // Ensure proper response type
  }
  
  // Method to get all staff details
  getStaffData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }
}

  

