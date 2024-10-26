import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
interface Document {
  fileData: string;
  fileName: string;
  documentType: string;
}

@Component({
  selector: 'app-personal-documents',
  standalone: true,
  imports: [RouterOutlet,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './personal-documents.component.html',
  styleUrl: './personal-documents.component.css'
})
export class PersonalDocumentsComponent {

  // constructor(private router: Router) {}
  constructor(private http: HttpClient, private fb: FormBuilder,private router: Router) {
    this.documentUploadForm = this.fb.group({
      documentType: ['', Validators.required],
      documentFile: [null, Validators.required]
    });
  }

  home(){
    this.router.navigate(['/home']);

  }
  timetable(){
    this.router.navigate(['/time-table']);

  }
  studentsmanagement(){
    this.router.navigate(['/students-management']);
  }
  attendancemanagement(){
    this.router.navigate(['/attendance-management']);
  }
  questionbank(){
    this.router.navigate(['/question-bank']);
  }
    iamodule(){
      this.router.navigate(['/ia-module']);
    }
    feedbacksystem(){
      this.router.navigate(['/feedback-system']);
    }
    lessonplan(){
      this.router.navigate(['/lesson-plan']);
    }
    teachingaids(){
      this.router.navigate(['/teaching-aids']);
    }
    personaldocuments(){
      this.router.navigate(['/personal-documents'])
    }
    logout() {
      this.router.navigate(['/login']);
    }
  
  documentUploadForm: FormGroup;
  uploadedDocuments: Document[] = [];
  adminid: string | null = null;

 

  ngOnInit() {
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.adminid = currentUser?.employeeId || null; 

    
    if (!this.adminid) {
        console.error('No employee ID found in localStorage.');
        alert('Please log in to access document management features.'); 
        return; 
    }

    // Fetch uploaded documents if employeeId is found
    this.fetchUploadedDocuments();
}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.documentUploadForm.patchValue({ documentFile: file });
    }
  }

  submitForm() {
    if (this.documentUploadForm.valid && this.adminid) {
      const formData = new FormData();
      formData.append('file', this.documentUploadForm.get('documentFile')?.value);
      formData.append('documentType', this.documentUploadForm.get('documentType')?.value);
      formData.append('employeeId', this.adminid);

      this.http.post('http://localhost:8080/documents/upload', formData)
        .subscribe({
          next: () => {
            alert('Document uploaded successfully!');
            this.fetchUploadedDocuments();
            this.documentUploadForm.reset();
          },
          error: (error) => {
            console.error('Error uploading document:', error);
            alert('Failed to upload document. Please check the console for details.');
          }
        });
    } else {
      alert('Please select a document type and file.');
    }
  }

  fetchUploadedDocuments() {
    if (!this.adminid) {
      console.error('No employee ID found in localStorage.');
      return;
    }

    this.http.get<Document[]>(`http://localhost:8080/documents/files/${this.adminid}`)
      .subscribe({
        next: (documents) => {
          this.uploadedDocuments = documents;
        },
        error: (error) => {
          console.error('Error fetching documents:', error);
        }
      });
  }

  viewDocument(base64Data: string, documentType: string) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const blob = new Blob([byteNumbers], { type: documentType });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  }
}
