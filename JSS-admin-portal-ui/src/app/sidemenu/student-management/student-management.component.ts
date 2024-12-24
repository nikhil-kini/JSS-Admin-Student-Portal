import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from '../staff.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';  
import { ButtonModule } from 'primeng/button';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [FormsModule,CommonModule,
    TableModule,
    ButtonModule],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent implements OnInit{
  constructor(private router: Router,private http: HttpClient,private staffService: StaffService) {}

  home(){
    this.router.navigate(['/sidemenu/home']);

  }
  timetable(){
    this.router.navigate(['/sidemenu/time-table']);

  }
  studentsmanagement(){
    this.router.navigate(['/sidemenu/students-management']);
  }
  attendancemanagement(){
    this.router.navigate(['/sidemenu/attendance-management']);
  }
  questionbank(){
    this.router.navigate(['/sidemenu/question-bank']);
  }
    iamodule(){
      this.router.navigate(['/sidemenu/ia-module']);
    }
    feedbacksystem(){
      this.router.navigate(['/sidemenu/feedback-system']);
    }
    lessonplan(){
      this.router.navigate(['/sidemenu/lesson-plan']);
    }
    teachingaids(){
      this.router.navigate(['/sidemenu/teaching-aids']);
    }
    logout() {
      localStorage.removeItem('isAuthenticated'); 
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userId');
      this.router.navigate(['/auth/login']);
    }
    personaldocuments(){
      this.router.navigate(['/sidemenu/personal-documents'])
    }
    staffmanagement(){
      this.router.navigate(['/sidemenu/staff-management'])
    }

    subjectmanagement(){
      this.router.navigate(['/sidemenu/subject-management'])
    }
    openregister() {
      this.router.navigate(['/sidemenu/students-registration']);
    }

    studentList: any[] = [];
    currentPage: number = 1;  
    itemsPerPage: number = 10; 
    totalItems: number = 0;   
    pagedStudentList: any[] = [];  
    filteredStudentList: any[] = [];
    searchTerm: string = ''; 
    selectedUser: any;

    ngOnInit(): void {
      this.loadStaffData();
    }
  
    loadStaffData(): void {
      this.staffService.getStudentData().subscribe(
        (data) => {
         
          this.studentList = data;
          this.filteredStudentList = [...this.studentList];
          this.totalItems = this.filteredStudentList.length;
          this.updatePagedList(); 
        },
        (error) => {
          console.error('Error loading staff data', error);
        }
      );
    }
   
    filterStudentList(): void {
      this.filteredStudentList = this.studentList.filter(student => 
        student.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.totalItems = this.filteredStudentList.length; 
      this.updatePagedList(); 
    }
   
    updatePagedList(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.pagedStudentList = this.filteredStudentList.slice(startIndex, endIndex);
    }

    nextPage(): void {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.updatePagedList();
      }
    }
  
    prevPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePagedList();
      }
    }
  
    goToPage(page: number): void {
      this.currentPage = page;
      this.updatePagedList();
    }
  
    getTotalPages(): number {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    editUser(user: any): void {
      this.selectedUser = { ...user };
    }
  
    updateUser(): void {
      if (this.selectedUser) {
        this.staffService.updateStaff(this.selectedUser).subscribe(
          response => {
            console.log('Update response:', response);
            alert('Student updated successfully!');
            const index = this.studentList.findIndex(student => student.id === this.selectedUser.id);
            if (index !== -1) {
              this.studentList[index] = { ...this.selectedUser };
            }
            this.selectedUser = null;
            this.filterStudentList();  
          },
          error => {
            console.error('Error updating student:', error);
            alert(`Error updating student: ${error.message || 'Unknown error occurred'}`);
          }
        );
      }
    }

   
  
    cancelEdit(): void {
      this.selectedUser = null;
    }
    
    highlightText(text: string): string {
      if (!this.searchTerm) return text;
      const escapedSearchTerm = this.searchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
      return text.replace(regex, '<mark>$1</mark>');
    }
  
  
    deleteUser(student: any): void {
      if (confirm(`Are you sure you want to delete ${student.userName}?`)) {
        this.staffService.deleteStaff(student.id).subscribe(
          (response) => {
            this.studentList = this.studentList.filter((item) => item.id !== student.id);
            this.filterStudentList(); 
          },
          (error) => {
            console.error('Error deleting staff:', error);
          }
        );
      }
    }
  
  }
    
