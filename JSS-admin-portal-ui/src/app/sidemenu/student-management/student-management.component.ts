import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from '../staff.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';  
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [FormsModule,CommonModule,
    TableModule,
    ButtonModule],
  templateUrl: './student-management.component.html',
  styleUrl: './student-management.component.css'
})
export class StudentManagementComponent {
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
      this.router.navigate(['/auth/login']);
    }
    personaldocuments(){
      this.router.navigate(['/sidemenu/personal-documents'])
    }
    staffmanagement(){
      this.router.navigate(['/sidemenu/staff-management'])
    }

    openregister() {
      this.router.navigate(['/sidemenu/students-registration']);
    }

  //   filteredStudents: any[] = []; 
  // searchText: string = ''; 
    studentList: any[] = [];
    

    
    ngOnInit(): void {
      
      this.loadStaffData();
      
    }
  
    loadStaffData(): void {
      this.staffService.getStaffData().subscribe(
        (data) => {
          this.studentList = data;
          // this.filteredStudents = data;  
          console.log(this.studentList);
        },
        (error) => {
          console.error('Error loading staff data', error);
        }
      );
    }
  
    
    // search() {
    //   if (this.searchText.trim() === '') {
    //     this.filteredStudents = this.studentList;  
    //   } else {
    //     this.filteredStudents = this.studentList.filter(student =>
    //       student.userName.toLowerCase().includes(this.searchText.toLowerCase())
    //     );
    //   }
    // }
  
    

    selectedUser: any; 
    editUser(user: any): void {
      console.log('Editing user:', user);
      // Example: Populate an edit form with the user data
      this.selectedUser = { ...user }; // Use a separate variable to hold the data to be edited
    }
    
    
    deleteUser(staff: any): void {
      if (confirm(`Are you sure you want to delete ${staff.staffName}?`)) {
        this.staffService.deleteStaff(staff.id).subscribe(
          response => {
            // Check for a successful response status
            console.log('Delete response:', response);
            
            // Update staffList by filtering out the deleted staff
            this.studentList = this.studentList.filter(item => item.id !== staff.id);
            
            // Display a success message
            alert('Staff deleted successfully!');
          },
          (error: HttpErrorResponse) => {
            console.error('Error deleting staff:', error);
            alert(`Error deleting staff: ${error.message || 'Unknown error occurred'}`);
          }
        );
      }
    }
    
    updateUser(): void {
      if (this.selectedUser) {
        this.staffService.updateStaff(this.selectedUser).subscribe(
          response => {
            console.log('Update response:', response);
            alert('Staff updated successfully!');
    
            // Update the frontend list
            const index = this.studentList.findIndex(student => student.id === this.selectedUser.id);
            if (index !== -1) {
              this.studentList[index] = { ...this.selectedUser };
            }
    
            this.selectedUser = null; // Clear the edit form
          },
          error => {
            console.error('Error updating staff:', error);
            alert(`Error updating staff: ${error.message || 'Unknown error occurred'}`);
          }
        );
      }
    }
    
    cancelEdit(): void {
      this.selectedUser = null; // Clear the edit form
    }

    
    
  
}
