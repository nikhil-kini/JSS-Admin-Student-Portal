import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import * as mammoth from 'mammoth';

interface Document {
  docId?: number;
  fileName: string;
  fileType: string;
  uploadDate?: Date;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  

  sidebarLinks = [
    { name: 'Home', route: '/home', icon: 'bi bi-house', action: () => this.home() },
    { name: 'Time Table', route: '/time-table', icon: 'bi bi-calendar3', action: () => this.timetable() },
    { name: 'Students Management', route: '/students-management', icon: 'bi bi-person-workspace', action: () => this.studentsmanagement() },
    { name: 'Attendance Management', route: '/attendance-management', icon: 'bi bi-check-square', action: () => this.attendancemanagement() },
    { name: 'Question Bank', route: '/question-bank', icon: 'bi bi-book', action: () => this.questionbank() },
    { name: 'IA Module', route: '/ia-module', icon: 'bi bi-card-list', action: () => this.iamodule() },
    { name: 'Feedback System', route: '/feedback-system', icon: 'bi bi-chat-dots', action: () => this.feedbacksystem() },
    { name: 'Lesson Plan', route: '/lesson-plan', icon: 'bi bi-file-earmark-text', action: () => this.lessonplan() },
    { name: 'Teaching Aids', route: '/teaching-aids', icon: 'bi bi-easel', action: () => this.teachingaids() },
    { name: 'Personal Documents', route: '/personal-documents', icon: 'bi bi-folder', action: () => this.personaldocuments() },
    { name: 'Logout', route: '/login', icon: 'bi bi-box-arrow-right', action: () => this.logout() }
  ];

  // Sidebar navigation methods
  home() { this.router.navigate(['/sidemenu/home']); }
  timetable() { this.router.navigate(['/sidemenu/time-table']); }
  studentsmanagement() { this.router.navigate(['/sidemenu/students-management']); }
  attendancemanagement() { this.router.navigate(['/sidemenu/attendance-management']); }
  questionbank() { this.router.navigate(['/sidemenu/question-bank']); }
  iamodule() { this.router.navigate(['/sidemenu/ia-module']); }
  feedbacksystem() { this.router.navigate(['/sidemenu/feedback-system']); }
  lessonplan() { this.router.navigate(['/sidemenu/lesson-plan']); }
  teachingaids() { this.router.navigate(['/sidemenu/teaching-aids']); }
  personaldocuments() { this.router.navigate(['/sidemenu/personal-documents']); }
  logout() { localStorage.clear(); this.router.navigate(['/auth/login']); }

  

  constructor(private http: HttpClient, private router: Router) {}

}