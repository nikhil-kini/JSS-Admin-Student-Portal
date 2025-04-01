import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from '../subject-management/subject-management.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-attendence-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-attendence-management.component.html',
  styleUrl: './new-attendence-management.component.css',
})
export class NewAttendenceManagementComponent {
  updateAttendence() {
    let body = this.semStudents.map(({ studentId, attendenceStatus }) => ({
      studentId,
      attendenceStatus,
      semester: this.selectedSemester,
      subjectId: this.selectedSubject,
      attendenceTime: this.selectedDate,
    }));
    this.http.post('http://localhost:8080/api/attendence', body).subscribe({
      next: () => {},
      error: (error) => {
        alert('Error uploading attendence');
      },
    });
  }
  subjects: Subject[] = [];
  loadingSubjects: boolean = false;
  selectedSubject: number = 0;
  errorMessage: string = ``;
  selectedMonth: string = ``;
  selectedMonthInModal: string = ``;
  selectedSubjectInModal: string = ``;
  subjectsInModal: Subject[] = [];
  loadingSubjectsInModal: boolean = false;
  selectedDate: any;
  selectedStartDate: any;
  selectedEndDate: any;
  semStudents: {
    studentId: Number;
    userName: String;
    attendenceStatus: AttendanceStatus;
  }[] = [];
  semStudentsInModal: { studentId: Number; userName: String }[] = [];
  constructor(private router: Router, private http: HttpClient) {}

  home() {
    this.router.navigate(['/sidemenu/home']);
  }
  timetable() {
    this.router.navigate(['/sidemenu/time-table']);
  }
  studentsmanagement() {
    this.router.navigate(['/sidemenu/students-management']);
  }
  attendancemanagement() {
    this.router.navigate(['/sidemenu/attendance-management']);
  }
  newAttendancemanagement() {
    this.router.navigate(['/sidemenu/new-attendance-management']);
  }
  questionbank() {
    this.router.navigate(['/sidemenu/question-bank']);
  }
  iamodule() {
    this.router.navigate(['/sidemenu/ia-module']);
  }
  feedbacksystem() {
    this.router.navigate(['/sidemenu/feedback-system']);
  }
  lessonplan() {
    this.router.navigate(['/sidemenu/lesson-plan']);
  }
  teachingaids() {
    this.router.navigate(['/sidemenu/teaching-aids']);
  }
  logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('loginUser');
    localStorage.removeItem('userId');
    this.router.navigate(['/auth/login']);
  }
  personaldocuments() {
    this.router.navigate(['/sidemenu/personal-documents']);
  }
  staffmanagement() {
    this.router.navigate(['/sidemenu/staff-management']);
  }

  subjectmanagement() {
    this.router.navigate(['/sidemenu/subject-management']);
  }

  selectedSemester: string = '';
  selectedDocumentCategory: string = 'QuestionBank';
  selectedSemesterInModal: string = '';
  fileToUpload: File | null = null;
  showModal: boolean = false;
  questionBankDocuments: any[] = [];
  semesters: string[] = ['Sem1', 'Sem2', 'Sem3', 'Sem4', 'Sem5', 'Sem6'];
  selectedDocumentType = 'pdf';
  uploadDate: Date = new Date();
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  viewQuestionBank() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getDocumentsBySemester() {
    if (this.selectedSemesterInModal) {
      this.http
        .get<any[]>(
          `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.selectedSemesterInModal}`
        )
        .subscribe({
          next: (documents) => {
            this.onSemesterChangeInModal();
            this.questionBankDocuments = documents;
          },
          error: (error) => {
            alert('Error fetching documents');
          },
        });
    }
  }

  viewTextFile(doc: any) {
    this.http
      .get(doc.downloadUrl, { responseType: 'text' })
      .subscribe((content) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      });
  }

  viewPdf(doc: any) {
    window.open(doc.downloadUrl, '_blank');
  }

  viewImage(doc: any) {
    window.open(doc.downloadUrl, '_blank');
  }
  statuses = ['Absent', 'Present'];
  // downloadFile(filename: string) {
  //   const url = `http://localhost:8080/viewFile/sem1/${filename}`;
  //   const fileType = filename.split('.').pop()?.toLowerCase(); // Get file type
  //   const headers = {
  //     Accept:
  //       fileType === 'pdf' ? 'application/pdf' : 'application/octet-stream',
  //   };

  //   this.http.get(url, { responseType: 'blob', headers: headers }).subscribe(
  //     (response) => {
  //       const blob = new Blob([response], { type: `application/${fileType}` });
  //       const link = document.createElement('a');
  //       link.href = URL.createObjectURL(blob);
  //       link.download = filename;
  //       link.click();
  //     },
  //     (error) => {
  //       console.error('Download failed', error);
  //     }
  //   );
  // }

  deleteFile(semester: string, fileName: string): void {
    const url = `http://localhost:8080/api/alldocuments/download/${semester}/${fileName}`;

    this.http.delete(url).subscribe({
      next: (response) => {
        this.getFileQuery();
        alert('File deleted successfully');
      },
      error: (error) => {
        alert('Error deletings file');
      },
    });
  }
  getDownloadLink(semester: string, fileName: string): string {
    return `http://localhost:8080/api/alldocuments/download/${semester}/${fileName}`;
  }

  getFileQuery() {
    let params = new HttpParams();
    if (
      this.selectedSemesterInModal &&
      this.selectedMonthInModal &&
      this.selectedSubjectInModal
    ) {
      params = params.append('month', this.selectedMonthInModal);
      params = params.append('subject', this.selectedSubjectInModal);
      this.http
        .get<any[]>(
          `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.selectedSemesterInModal}`,
          { params: params }
        )
        .subscribe({
          next: (documents) => {
            this.onSemesterChangeInModal();
            this.questionBankDocuments = documents;
          },
          error: (error) => {
            alert('Error fetching documents');
          },
        });
    } else if (this.selectedSemesterInModal && this.selectedMonthInModal) {
      params = params.append('month', this.selectedMonthInModal);
      this.http
        .get<any[]>(
          `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.selectedSemesterInModal}`,
          { params: params }
        )
        .subscribe({
          next: (documents) => {
            this.onSemesterChangeInModal();
            this.questionBankDocuments = documents;
          },
          error: (error) => {
            alert('Error fetching documents');
          },
        });
    } else if (this.selectedSemesterInModal && this.selectedSubjectInModal) {
      params = params.append('subject', this.selectedSubjectInModal);

      this.http
        .get<any[]>(
          `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.selectedSemesterInModal}`,
          { params: params }
        )
        .subscribe({
          next: (documents) => {
            this.onSemesterChangeInModal();
            this.questionBankDocuments = documents;
          },
          error: (error) => {
            alert('Error fetching documents');
          },
        });
    } else if (this.selectedSemesterInModal) {
      this.http
        .get<any[]>(
          `http://localhost:8080/api/alldocuments/category/${this.selectedDocumentCategory}/${this.selectedSemesterInModal}`
        )
        .subscribe({
          next: (documents) => {
            this.onSemesterChangeInModal();
            this.questionBankDocuments = documents;
          },
          error: (error) => {
            alert('Error fetching documents');
          },
        });
    }
  }

  onSemesterChange() {
    if (!this.selectedSemester) {
      this.subjects = [];
      return;
    }

    this.loadingSubjects = true;
    this.selectedSubject = 0;
    this.subjects = [];

    this.http
      .get<Subject[]>(
        `http://localhost:8080/api/subjects/semester/${this.selectedSemester.charAt(
          this.selectedSemester.length - 1
        )}`
      )
      .subscribe({
        next: (data) => {
          this.subjects = data;
          this.loadingSubjects = false;
        },
        error: (error) => {
          this.errorMessage = 'Error loading subjects';
          this.loadingSubjects = false;
        },
      });

    this.semStudents = [];

    this.http
      .get<{ studentId: Number; userName: String }[]>(
        `http://localhost:8080/users/studentnew/${this.selectedSemester}`
      )
      .subscribe({
        next: (data) => {
          let tmp = data.map(({ studentId, userName }) => ({
            studentId,
            userName,
          }));
          this.semStudents = tmp.map((users) => ({
            ...users,
            attendenceStatus: AttendanceStatus.ABSENT,
          }));
        },
        error: (error) => {},
      });
  }

  onSemesterChangeInModal() {
    if (!this.selectedSemesterInModal) {
      this.subjectsInModal = [];
      return;
    }

    this.loadingSubjectsInModal = true;
    this.selectedSubjectInModal = '';
    this.subjectsInModal = [];

    this.http
      .get<Subject[]>(
        `http://localhost:8080/api/subjects/semester/${this.selectedSemesterInModal.charAt(
          this.selectedSemester.length - 1
        )}`
      )
      .subscribe({
        next: (data) => {
          this.subjectsInModal = data;
          this.loadingSubjectsInModal = false;
        },
        error: (error) => {
          this.errorMessage = 'Error loading subjects';
          this.loadingSubjects = false;
        },
      });

    this.semStudentsInModal = [];
    this.http
      .get<{ studentId: Number; userName: String }[]>(
        `http://localhost:8080/users/studentnew/${this.selectedSemester}`
      )
      .subscribe({
        next: (data) => {
          this.semStudentsInModal = data.map(({ studentId, userName }) => ({
            studentId,
            userName,
          }));
        },
        error: (error) => {},
      });
  }
}
export enum AttendanceStatus {
  ABSENT = 'ABSENT',
  PRESENT = 'PRESENT',
}

interface MappedUser {
  id: number;
  userName: string;
  status: AttendanceStatus;
}
