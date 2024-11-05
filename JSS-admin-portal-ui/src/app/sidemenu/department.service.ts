import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'http://localhost:8080/api/department';  // Example API endpoint

  constructor(private http: HttpClient) {}

  // Fetches all department details
  getDepartmentDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Fetch department by its ID
  getDepartmentById(departmentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${departmentId}`);
  }

}
