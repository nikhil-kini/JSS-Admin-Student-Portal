import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
interface Student {
  userName: string;
  email: string;
  password: string;
  phoneno: string;
  address: string;
  adharno: string;
  role:string;

  sslcMarksCard: File | null;
  beMarksCard: File | null;
  degreeCertificate: File | null;
  photo: File | null;
  staffProfile: File | null;

  

 dept: string;
 semester:string;
 momphoneno:string;
 dadphoneno:string;
 regno:string;
 panCardNumber:string;

 sslcMarksCardPath:string;
 beMarksCardPath:string;
 degreeCertificatePath:string;
 photoPath:string;
 staffProfilePath:string;

 adharCard:File | null;
 studyCertificate:File | null;
 transferCertificate:File | null;
 physicalFitness:File | null;
 migrationCertificate:File | null;
 incomeCertificate:File | null;
 casteCertificate:File | null;
 studsslcmarksCard:File | null;
 studphoto:File | null;

}


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  constructor(private router: Router,private http: HttpClient,private authservice: AuthService) {}


  student: Student = {
    userName: '',
    email: '',
    password: '',
    phoneno: '',
    address: '',
    adharno: '',
  
    
  
    role:'Student',
    dept:'',
    semester:'',
    momphoneno:'',
    dadphoneno:'',
    regno:'',
  
    sslcMarksCardPath:'null',
   beMarksCardPath:'null',
   degreeCertificatePath:'null',
   photoPath:'null',
   panCardNumber:'null',
   staffProfilePath:'null',
  sslcMarksCard: null,
  beMarksCard: null,
  degreeCertificate: null,
  photo: null,
  
  staffProfile: null,
   adharCard:null,
   studyCertificate:null,
   transferCertificate:null,
   physicalFitness:null,
   migrationCertificate:null,
   incomeCertificate:null,
   casteCertificate:null,
   studsslcmarksCard:null,
   studphoto:null,
  
  };
  
  onSubmit() {
    
    const formData = new FormData();
    formData.append('userName', this.student.userName);
    formData.append('email', this.student.email);
    formData.append('password', this.student.password);
    formData.append('phoneno', this.student.phoneno);
    formData.append('address', this.student.address);
    formData.append('adharno', this.student.adharno);
    formData.append('role',this.student.role);
    formData.append('dept', this.student.dept);
    formData.append('semester', this.student.semester);
    formData.append('momphoneno', this.student.momphoneno);
    formData.append('dadphoneno', this.student.dadphoneno);
    formData.append('regno', this.student.regno);
    formData.append('panCardNumber', this.student.panCardNumber);
   
  
  
  
   
    if (this.student.sslcMarksCard) formData.append('sslcMarksCard', this.student.sslcMarksCard as Blob);
    if (this.student.beMarksCard) formData.append('beMarksCard', this.student.beMarksCard as Blob);
    if (this.student.degreeCertificate) formData.append('degreeCertificate', this.student.degreeCertificate as Blob);
    if (this.student.photo) formData.append('photo', this.student.photo as Blob);
    if (this.student.staffProfile) formData.append('staffProfile', this.student.staffProfile as Blob);
    if (this.student.adharCard) formData.append('adharCard', this.student.adharCard as Blob);
    if (this.student.studyCertificate) formData.append('studyCertificate', this.student.studyCertificate as Blob);
    if (this.student.transferCertificate) formData.append('transferCertificate', this.student.transferCertificate as Blob);
    if (this.student.physicalFitness) formData.append('physicalFitness', this.student.physicalFitness as Blob);
    if (this.student.migrationCertificate) formData.append('migrationCertificate', this.student.migrationCertificate as Blob);
    if (this.student.incomeCertificate) formData.append('incomeCertificate', this.student.incomeCertificate as Blob);
    if (this.student.casteCertificate) formData.append('casteCertificate', this.student.casteCertificate as Blob);
    if (this.student.studsslcmarksCard) formData.append('studsslcmarksCard', this.student.studsslcmarksCard as Blob);
    if (this.student.studphoto) formData.append('studphoto', this.student.studphoto as Blob);
    
  
    const headers = new HttpHeaders();
  
    
    this.http.post('http://localhost:8080/users/register', formData,{ headers, responseType: 'text' })
      .subscribe({
        next: (response) => {
          console.log('Student registered successfully:', response);
          alert('Registration successful!');
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.error('Error during registration:', error);
          alert('Registration failed!');
        }
      });
  }
  
  
  onFileSelectadharCard(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.adharCard = file;
      console.log('Adhar card selected:', file);
      
    } else {
      console.log('No file selected for Adhar card');
    }
  }
  
  
  
  
  
  onFileSelectSC(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.studyCertificate = file;
      console.log('Study Certificate selected:', file);
     
    }
  }
  
  
  onFileSelectTC(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.transferCertificate = file;
      console.log('Transfer Certificate selected:', file);
     
    }
  }
  
  
  onFileSelectPF(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.physicalFitness = file;
      console.log('Physical Fitness certificate selected:', file);
     
    }
  }
  
  onFileSelectMC(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.migrationCertificate = file;
      console.log('Migration Certificate selected:', file);
      
    }
  }
  
  
  onFileSelectIC(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.incomeCertificate = file;
      console.log('Income Certificate selected:', file);
     
    }
  }
  
  onFileSelectCC(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.casteCertificate = file;
      console.log('Caste Certificate selected:', file);
      
    }
  }
  
  onFileSelectstudMarkscard(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.studsslcmarksCard = file;
      console.log('Student SSLC Marks Card selected:', file);
      
    }
  }
  
  onFileSelectstudphoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.student.studphoto = file;
      console.log('Student Photo selected:', file);
     
    }
  }
  }
  
  
  
  
  