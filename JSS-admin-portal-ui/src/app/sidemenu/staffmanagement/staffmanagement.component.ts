import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StaffService } from '../staff.service';
import { NgxPaginationModule } from 'ngx-pagination';




@Component({
  selector: 'app-staffmanagement',
  standalone: true,
  imports: [FormsModule,CommonModule,
    TableModule,
    ButtonModule,NgxPaginationModule],
  templateUrl: './staffmanagement.component.html',
  styleUrl: './staffmanagement.component.css'
})
export class StaffmanagementComponent implements OnInit{
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
      this.router.navigate(['/sidemenu/staff-registration']);
    }

   
  //   currentPage: number = 1;  
  //   itemsPerPage: number = 10; 
  //   totalItems: number = 0;   
  //   pagedStaffList: any[] = [];  
  
  //   selectedUser: any;
  
    
   
  //   updatePagedList(): void {
  //     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //     const endIndex = startIndex + this.itemsPerPage;
  //     this.pagedStaffList = this.staffList.slice(startIndex, endIndex);
  //   }
  
   
  //   nextPage(): void {
  //     if (this.currentPage < this.getTotalPages()) {
  //       this.currentPage++;
  //       this.updatePagedList();
  //     }
  //   }
  
   
  //   prevPage(): void {
  //     if (this.currentPage > 1) {
  //       this.currentPage--;
  //       this.updatePagedList();
  //     }
  //   }
  
    
  //   goToPage(page: number): void {
  //     this.currentPage = page;
  //     this.updatePagedList();
  //   }
  
   
  //   getTotalPages(): number {
  //     return Math.ceil(this.totalItems / this.itemsPerPage);
  //   }
  
   
  
  //   updateUser(): void {
  //     if (this.selectedUser) {
  //       this.staffService.updateStaff(this.selectedUser).subscribe(
  //         response => {
  //           console.log('Update response:', response);
  //           alert('Staff updated successfully!');
  //           const index = this.staffList.findIndex(staff => staff.id === this.selectedUser.id);
  //           if (index !== -1) {
  //             this.staffList[index] = { ...this.selectedUser };
  //           }
  //           this.selectedUser = null;
  //           this.updatePagedList();  
  //         },
  //         error => {
  //           console.error('Error updating staff:', error);
  //           alert(`Error updating staff: ${error.message || 'Unknown error occurred'}`);
  //         }
  //       );
  //     }
  //   }
  
  //   cancelEdit(): void {
  //     this.selectedUser = null;
  //   }


  //   staffList: any[] = [];
  //   filteredStaffList: any[] = [];
  //   searchTerm: string = ''; 
  
   
  
  //   ngOnInit(): void {
  //     this.loadStaffData();
  //   }
  
    
  //   loadStaffData(): void {
  //     this.staffService.getStaffData().subscribe(
  //       (data) => {
         
  //         this.staffList = data;
  //         this.filteredStaffList = [...this.staffList];
         
  //         console.log(this.filteredStaffList); 
  //       },
  //       (error) => {
  //         console.error('Error loading staff data', error);
  //       }
  //     );
  //   }
  
    
  //   filterStaffList(): void {
  //     this.filteredStaffList = this.staffList.filter(staff => 
  //       staff.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //     this.totalItems = this.filteredStaffList.length; 
  //     this.updatePagedList(); 
  //   }
    

      
    
  
    
  //   highlightText(text: string): string {
  //     if (!this.searchTerm) return text;
  //     const escapedSearchTerm = this.searchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
  //     const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
  //     return text.replace(regex, '<mark>$1</mark>');
  //   }
    
  
  //   editUser(user: any): void {
  //     this.selectedUser = { ...user };
  //   }
  
  //   deleteUser(staff: any): void {
  //     if (confirm(`Are you sure you want to delete ${staff.userName}?`)) {
  //       this.staffService.deleteStaff(staff.id).subscribe(
  //         (response) => {
  //           this.staffList = this.staffList.filter((item) => item.id !== staff.id);
  //           this.filterStaffList(); 
  //         },
  //         (error) => {
  //           console.error('Error deleting staff:', error);
  //         }
  //       );
  //     }
  //   }
  // }


  // constructor(private router: Router, private http: HttpClient, private staffService: StaffService) {}

  currentPage: number = 1;  
  itemsPerPage: number = 8; 
  totalItems: number = 0;   
  pagedStaffList: any[] = [];  
  staffList: any[] = [];
  filteredStaffList: any[] = [];
  searchTerm: string = ''; 
  selectedUser: any;

  ngOnInit(): void {
    this.loadStaffData();
  }

  loadStaffData(): void {
    this.staffService.getStaffData().subscribe(
      (data) => {
        this.staffList = data;
        this.filteredStaffList = [...this.staffList];
        this.totalItems = this.filteredStaffList.length;
        this.updatePagedList(); 
      },
      (error) => {
        console.error('Error loading staff data', error);
      }
    );
  }
  

  filterStaffList(): void {
    this.filteredStaffList = this.staffList.filter(staff => 
      staff.userName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalItems = this.filteredStaffList.length; 
    this.updatePagedList(); 
  }
  
  updatePagedList(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedStaffList = this.filteredStaffList.slice(startIndex, endIndex);
  }
  

  // Navigate to the next page
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
        (response) => {
          alert('Staff updated successfully!');
          const index = this.staffList.findIndex(staff => staff.id === this.selectedUser.id);
          if (index !== -1) {
            this.staffList[index] = { ...this.selectedUser };
          }
          this.selectedUser = null;
          this.filterStaffList(); // Refresh filtered list
        },
        (error) => {
          console.error('Error updating staff:', error);
          alert('Error updating staff');
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
      

  
  deleteUser(staff: any): void {
    if (confirm(`Are you sure you want to delete ${staff.userName}?`)) {
      this.staffService.deleteStaff(staff.id).subscribe(
        () => {
          this.staffList = this.staffList.filter(item => item.id !== staff.id);
          this.filterStaffList(); 
        },
        (error) => {
          console.error('Error deleting staff:', error);
        }
      );
    }
  }
}