import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-system',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './feedback-system.component.html',
  styleUrl: './feedback-system.component.css'
})
export class FeedbackSystemComponent {
  constructor(private router: Router,private http: HttpClient) {}

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
    personaldocuments(){
      this.router.navigate(['/sidemenu/personal-documents'])
    }
    logout() {
      localStorage.removeItem('isAuthenticated'); 
    localStorage.removeItem('loginUser');
      this.router.navigate(['/auth/login']);
    }

   

    feedbacks: any[] = [];
    feedbackQuestions: any[] = [];
    paginatedFeedbacks: any[] = [];
    searchTerm: string = '';
    currentPage: number = 1;
    pageSize: number = 10; 
    totalPages: number = 0; 
    selectedQuestion: string = '';
    feedbackText: string = '';
    newFeedbackQuestion: string = '';
    user: any = JSON.parse(localStorage.getItem('user') || '{}');
    showTable: boolean = true;
    showAddForm: boolean = false;
    username: string | null = localStorage.getItem('username'); 
    highlightedFeedbacks: any[] = [];
    
    
  
    ngOnInit(): void {
      this.fetchFeedback();
      this.fetchFeedbackQuestions();
    }


    isUserRole(roleId: number): boolean {
      return this.user.roleId === roleId;
    }
  
    fetchFeedback(): void {
      this.http.get<any[]>('http://localhost:8080/feedback/all').subscribe(
        (data) => {
          this.feedbacks = data;
          this.totalPages = Math.ceil(this.feedbacks.length / this.pageSize);
          this.updatePagination();
        },
        (error) => {
          console.error('Error fetching feedback:', error);
        }
      );
    }
    
  
    fetchFeedbackQuestions(): void {
      this.http.get<any[]>('http://localhost:8080/feedback/all').subscribe(
        (data) => {
          this.feedbackQuestions = data.filter((q) => q.addedBy === 'Admin');
        },
        (error) => {
          console.error('Error fetching feedback questions:', error);
        }
      );
    }
  
    submitFeedback(): void {
      const feedback = {
        question: this.selectedQuestion,
        answer: this.feedbackText,
        addedBy: 'Student',
        username: this.username ,
        type:'Response'
      };
  
      this.http.post('http://localhost:8080/feedback/addFeedback', feedback).subscribe(
        (response) => {
          alert('Feedback submitted successfully');
          this.feedbackText = '';
          this.selectedQuestion = '';
          this.displayManageFeedbacks();
        },
        (error) => {
          console.error('Error submitting feedback:', error);
          alert('There was a problem submitting your feedback');
        }
      );
    }

    
    addFeedbackQuestion(): void {
      const feedback = {
        question: this.newFeedbackQuestion,
        answer: 'Not Applicable for Admin',
         addedBy: this.user.roleName,
        
        username: this.user.student
      };
  
      this.http.post('http://localhost:8080/feedback/addFeedback', feedback).subscribe(
        (response) => {
          alert('Feedback question added successfully');
          this.newFeedbackQuestion = '';
          this.fetchFeedback();
        },
        (error) => {
          console.error('Error adding feedback question:', error);
          alert('There was a problem adding the feedback question');
        }
      );
    }
  
    displayManageFeedbacks(): void {
      this.showAddForm = false;
      this.showTable = true;
      this.fetchFeedback();
    }
  
    displayAddFeedbackForm(): void {
      this.showAddForm = true;
      this.showTable = false;
    }
    

    // updatePagination(): void {
    //   const startIndex = (this.currentPage - 1) * this.pageSize;
    //   const endIndex = startIndex + this.pageSize;
    //   this.paginatedFeedbacks = this.feedbacks.slice(startIndex, endIndex);
    // }
    
    goToPage(page: number): void {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePagination();
      }
    }
  
    
    // nextPage(): void {
    //   if (this.currentPage < this.totalPages) {
    //     this.currentPage++;
    //     this.updatePagination();
    //   }
    // }
    
    // previousPage(): void {
    //   if (this.currentPage > 1) {
    //     this.currentPage--;
    //     this.updatePagination();
    //   }
    // }
    
    performSearch(): void {
      const searchTermLower = this.searchTerm.trim().toLowerCase();
    
      if (searchTermLower === '') {
        
        this.highlightedFeedbacks = [];
        this.updatePagination(); 
        return;
      }
    
      
      this.highlightedFeedbacks = this.feedbacks.filter(feedback =>
        feedback.question.toLowerCase().includes(searchTermLower)
      );
    
      
      this.currentPage = 1; 
      this.paginatedFeedbacks = this.highlightedFeedbacks.slice(0, this.pageSize);
      this.totalPages = Math.ceil(this.highlightedFeedbacks.length / this.pageSize);
    }
    
    
  
    updatePagination(): void {
      const source = this.highlightedFeedbacks.length > 0 ? this.highlightedFeedbacks : this.feedbacks;
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedFeedbacks = source.slice(startIndex, endIndex);
    }
    
  
    nextPage(): void {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePagination();
      }
    }
    
    previousPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePagination();
      }
    }
    
  }
  
  
  
  
  
  
  



