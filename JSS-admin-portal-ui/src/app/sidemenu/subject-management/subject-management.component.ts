import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// interface Subject {
//   id?: number;
//   semester: string;
//   subject: string;
//   subjectCode: string;
// }


export interface Subject {
  id?: number;
  semester: number;
  subject: string;
  subjectCode: string;
}

@Component({
  selector: 'app-subject-management',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './subject-management.component.html',
  styleUrl: './subject-management.component.css'
})
export class SubjectManagementComponent {
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

  //   isModalOpen = false;
  //   isEditing = false;
  //   subjects: Subject[] = [];
  //   semesters = [1, 2, 3, 4, 5, 6];
  //   subject: Subject = {
  //     semester: '',
  //     subject: '',
  //     subjectCode: ''
  //   };
  
  //   // constructor(private http: HttpClient) {}
  
  //   ngOnInit() {
  //     this.loadSubjects();
  //   }
  
  //   loadSubjects() {
  //     this.http.get<Subject[]>('http://localhost:8080/api/subjects')
  //       .subscribe({
  //         next: (data) => {
  //           this.subjects = data;
  //         },
  //         error: (error) => {
  //           console.error('Error loading subjects:', error);
  //         }
  //       });
  //   }
  
  //   openModal() {
  //     this.isModalOpen = true;
  //     this.isEditing = false;
  //     this.resetForm();
  //   }
  
  //   closeModal() {
  //     this.isModalOpen = false;
  //     this.resetForm();
  //   }
  
  //   resetForm() {
  //     this.subject = {
  //       semester: '',
  //       subject: '',
  //       subjectCode: ''
  //     };
  //   }
  
  //   editSubject(subject: Subject) {
  //     this.isEditing = true;
  //     this.subject = {...subject};
  //     this.isModalOpen = true;
  //   }
  
  //   deleteSubject(id: number | undefined) {
  //     if (confirm('Are you sure you want to delete this subject?')) {
  //       this.http.delete(`http://localhost:8080/api/subjects/${id}`)
  //         .subscribe({
  //           next: () => {
  //             this.loadSubjects();
  //             alert('Subject deleted successfully');
  //           },
  //           error: (error) => {
  //             console.error('Error:', error);
  //             alert('Error deleting subject');
  //           }
  //         });
  //     }
  //   }
  
  //   onSubmit() {
  //     if (this.isEditing) {
  //       this.http.put(`http://localhost:8080/api/subjects/${this.subject.id}`, this.subject)
  //         .subscribe({
  //           next: () => {
  //             this.loadSubjects();
  //             this.closeModal();
  //             alert('Subject updated successfully');
  //           },
  //           error: (error) => {
  //             console.error('Error:', error);
  //             alert('Error updating subject');
  //           }
  //         });
  //     } else {
  //       this.http.post('http://localhost:8080/api/subjects', this.subject)
  //         .subscribe({
  //           next: () => {
  //             this.loadSubjects();
  //             this.closeModal();
  //             alert('Subject added successfully');
  //           },
  //           error: (error) => {
  //             console.error('Error:', error);
  //             alert('Error adding subject');
  //           }
  //         });
  //     }
  //   }
  // }






//   isModalOpen = false;
//   isEditing = false;
//   subjects: Subject[] = [];
//   allSubjects: Subject[] = []; 
//   semesters = [1, 2, 3, 4, 5, 6];
//   subject: Subject = {
//     semester: '',
//     subject: '',
//     subjectCode: ''
//   };
//   searchTerm = '';
//   page = 1;
//   pageSize = 5;
//   totalSubjects = 0;

//   // constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.loadSubjects();
//   }

//   loadSubjects() {
//     this.http.get<Subject[]>('http://localhost:8080/api/subjects').subscribe({
//       next: (data) => {
//         this.allSubjects = data; // Store all subjects
//         this.subjects = data; // Display all subjects by default
//         this.totalSubjects = data.length;
//       },
//       error: (error) => {
//         console.error('Error loading subjects:', error);
//       }
//     });
//   }

//   openModal() {
//     this.isModalOpen = true;
//     this.isEditing = false;
//     this.resetForm();
//   }

//   closeModal() {
//     this.isModalOpen = false;
//     this.resetForm();
//   }

//   resetForm() {
//     this.subject = {
//       semester: '',
//       subject: '',
//       subjectCode: ''
//     };
//   }

//   editSubject(subject: Subject) {
//     this.isEditing = true;
//     this.subject = { ...subject };
//     this.isModalOpen = true;
//   }

//   deleteSubject(id: number | undefined) {
//     if (confirm('Are you sure you want to delete this subject?')) {
//       this.http.delete(`http://localhost:8080/api/subjects/${id}`).subscribe({
//         next: () => {
//           this.loadSubjects();
//           alert('Subject deleted successfully');
//         },
//         error: (error) => {
//           console.error('Error:', error);
//           alert('Error deleting subject');
//         }
//       });
//     }
//   }

//   onSubmit() {
//     if (this.isEditing) {
//       this.http.put(`http://localhost:8080/api/subjects/${this.subject.id}`, this.subject).subscribe({
//         next: () => {
//           this.loadSubjects();
//           this.closeModal();
//           alert('Subject updated successfully');
//         },
//         error: (error) => {
//           console.error('Error:', error);
//           alert('Error updating subject');
//         }
//       });
//     } else {
//       this.http.post('http://localhost:8080/api/subjects', this.subject).subscribe({
//         next: () => {
//           this.loadSubjects();
//           this.closeModal();
//           alert('Subject added successfully');
//         },
//         error: (error) => {
//           console.error('Error:', error);
//           alert('Error adding subject');
//         }
//       });
//     }
//   }

//   // Filter subjects based on selected semester
//   filterSubjectsBySemester() {
//     this.subjects = this.allSubjects.filter(subject => subject.semester === this.subject.semester);
//   }

//   get filteredSubjects() {
//     return this.subjects
//       .filter(subject =>
//         subject.subject.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         subject.semester.toString().includes(this.searchTerm)
//       )
//       .slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
//   }

//   changePage(page: number) {
//     this.page = page;
//   }
// }



subjects: Subject[] = [];
semesters = [1, 2, 3, 4, 5, 6];
isModalOpen = false;
isEditing = false;
searchSubject = '';
searchSemester = '';
currentPage = 1;
itemsPerPage = 8;

subject: Subject = {
  semester: 0,
  subject: '',
  subjectCode: ''
};

// constructor(private http: HttpClient) {}

ngOnInit() {
  this.loadSubjects();
}

loadSubjects() {
  this.http.get<Subject[]>('http://localhost:8080/api/subjects')
    .subscribe({
      next: (data) => {
        this.subjects = data;
      },
      error: (error) => {
        console.error('Error loading subjects:', error);
      }
    });
}

get filteredSubjects() {
  return this.subjects.filter(sub => {
    const semesterMatch = !this.searchSemester || sub.semester.toString() === this.searchSemester;
    const subjectMatch = sub.subject.toLowerCase().includes(this.searchSubject.toLowerCase());
    return semesterMatch && subjectMatch;
  });
}

get paginatedSubjects() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.filteredSubjects.slice(startIndex, startIndex + this.itemsPerPage);
}

get totalPages() {
  return Math.ceil(this.filteredSubjects.length / this.itemsPerPage);
}

openModal() {
  this.isModalOpen = true;
  this.isEditing = false;
  this.resetForm();
}

closeModal() {
  this.isModalOpen = false;
  this.resetForm();
}

resetForm() {
  this.subject = {
    semester: 0,
    subject: '',
    subjectCode: ''
  };
}

editSubject(subject: Subject) {
  this.isEditing = true;
  this.subject = {...subject};
  this.isModalOpen = true;
}

deleteSubject(id: number | undefined) {
  if (confirm('Are you sure you want to delete this subject?')) {
    this.http.delete(`http://localhost:8080/api/subjects/${id}`)
      .subscribe({
        next: () => {
          this.loadSubjects();
          alert('Subject deleted successfully');
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error deleting subject');
        }
      });
  }
}

onSubmit() {
  if (this.isEditing) {
    this.http.put(`http://localhost:8080/api/subjects/${this.subject.id}`, this.subject)
      .subscribe({
        next: () => {
          this.loadSubjects();
          this.closeModal();
          alert('Subject updated successfully');
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error updating subject');
        }
      });
  } else {
    this.http.post('http://localhost:8080/api/subjects', this.subject)
      .subscribe({
        next: () => {
          this.loadSubjects();
          this.closeModal();
          alert('Subject added successfully');
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Error adding subject');
        }
      });
  }
}

onPageChange(page: number) {
  this.currentPage = page;
}
}