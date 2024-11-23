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

    studentList: any[] = [];
    currentPage: number = 1;  // Current page
    itemsPerPage: number = 10; // Items per page
    totalItems: number = 0;   // Total items to calculate total pages
    pagedStudentList: any[] = [];  // Paginated list of students
  
    selectedUser: any;
  
    
    ngOnInit(): void {
      this.loadStaffData();
    }
  
    loadStaffData(): void {
      this.staffService.getStaffData().subscribe(
        (data) => {
          this.studentList = data;
          this.totalItems = data.length;
          this.updatePagedList();
          console.log(this.studentList);
        },
        (error) => {
          console.error('Error loading staff data', error);
        }
      );
    }
  
    // Method to update the paginated list
    updatePagedList(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.pagedStudentList = this.studentList.slice(startIndex, endIndex);
    }
  
    // Pagination control: Move to the next page
    nextPage(): void {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
        this.updatePagedList();
      }
    }
  
    // Pagination control: Move to the previous page
    prevPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePagedList();
      }
    }
  
    // Update page based on selected page number
    goToPage(page: number): void {
      this.currentPage = page;
      this.updatePagedList();
    }
  
    // Calculate total number of pages
    getTotalPages(): number {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    }
  
    editUser(user: any): void {
      console.log('Editing user:', user);
      this.selectedUser = { ...user };
    }
  
    deleteUser(staff: any): void {
      if (confirm(`Are you sure you want to delete ${staff.staffName}?`)) {
        this.staffService.deleteStaff(staff.id).subscribe(
          response => {
            console.log('Delete response:', response);
            this.studentList = this.studentList.filter(item => item.id !== staff.id);
            alert('Staff deleted successfully!');
            this.updatePagedList();  // Update pagination list after deletion
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
            const index = this.studentList.findIndex(student => student.id === this.selectedUser.id);
            if (index !== -1) {
              this.studentList[index] = { ...this.selectedUser };
            }
            this.selectedUser = null;
            this.updatePagedList();  // Update pagination list after update
          },
          error => {
            console.error('Error updating staff:', error);
            alert(`Error updating staff: ${error.message || 'Unknown error occurred'}`);
          }
        );
      }
    }
  
    cancelEdit(): void {
      this.selectedUser = null;
    }
  }
    
//     ngOnInit(): void {
      
//       this.loadStaffData();
      
//     }
  
//     loadStaffData(): void {
//       this.staffService.getStaffData().subscribe(
//         (data) => {
//           this.studentList = data;
//           // this.filteredStudents = data;  
//           console.log(this.studentList);
//         },
//         (error) => {
//           console.error('Error loading staff data', error);
//         }
//       );
//     }
  
    
    
    

//     selectedUser: any; 
//     editUser(user: any): void {
//       console.log('Editing user:', user);
//       // Example: Populate an edit form with the user data
//       this.selectedUser = { ...user }; // Use a separate variable to hold the data to be edited
//     }
    
    
//     deleteUser(staff: any): void {
//       if (confirm(`Are you sure you want to delete ${staff.staffName}?`)) {
//         this.staffService.deleteStaff(staff.id).subscribe(
//           response => {
//             // Check for a successful response status
//             console.log('Delete response:', response);
            
//             // Update staffList by filtering out the deleted staff
//             this.studentList = this.studentList.filter(item => item.id !== staff.id);
            
//             // Display a success message
//             alert('Staff deleted successfully!');
//           },
//           (error: HttpErrorResponse) => {
//             console.error('Error deleting staff:', error);
//             alert(`Error deleting staff: ${error.message || 'Unknown error occurred'}`);
//           }
//         );
//       }
//     }
    
//     updateUser(): void {
//       if (this.selectedUser) {
//         this.staffService.updateStaff(this.selectedUser).subscribe(
//           response => {
//             console.log('Update response:', response);
//             alert('Staff updated successfully!');
    
//             // Update the frontend list
//             const index = this.studentList.findIndex(student => student.id === this.selectedUser.id);
//             if (index !== -1) {
//               this.studentList[index] = { ...this.selectedUser };
//             }
    
//             this.selectedUser = null; // Clear the edit form
//           },
//           error => {
//             console.error('Error updating staff:', error);
//             alert(`Error updating staff: ${error.message || 'Unknown error occurred'}`);
//           }
//         );
//       }
//     }
    
//     cancelEdit(): void {
//       this.selectedUser = null; // Clear the edit form
//     }

    
    
  
// }
