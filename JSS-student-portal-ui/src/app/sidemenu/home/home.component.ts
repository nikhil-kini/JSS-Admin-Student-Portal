import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  

  // ngOnInit(): void {
   
  //   console.log('Username:', this.username);
  // }

  

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
    staffmanagement(){
      this.router.navigate(['/sidemenu/staff-management'])
    }
    logout() {
      localStorage.removeItem('isAuthenticated');  
    localStorage.removeItem('loginUser'); 
    localStorage.removeItem('userId'); 
      this.router.navigate(['/auth/login']);
    }
    constructor(private router: Router,private http:HttpClient) {}
    username: string | null = localStorage.getItem('username');
    loggedInStudent: any;
    // studentPhotoPath: string = ''; 

    
  
   
      ngOnInit(): void {
        console.log('Username:', this.username);
    
        
        this.http.get<any>(`http://localhost:8080/users/student1?userName=${this.username}`)

        .subscribe(
          (data) => {
            console.log('Logged-in student data:', data);
            this.loggedInStudent = data;
    
            // Assuming 'studphotoPath' is part of the response data
            // this.studentPhotoPath = data.studphotoPath;
          },
          (error) => {
            console.error('Error fetching logged-in student:', error); // Handle errors
          }
        );
    }
   
    
  }
  