import { CommonModule, formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import * as XLSX from 'xlsx';

// interface Document {
//   docId?: number;
//   documentType: string;
//   fileName: string;
//   fileType: string;
//   uploadDate?: Date;
//   semester: string;
// }

// interface UploadResponse {
//   message?: string;
//   error?: string;
// }

// interface Timetable {
//   time_id?:number;
//   day: string;
//   semester: string;
//   subject: string;
//   timeSlot: string;
// }


@Component({
  selector: 'app-studentreg',
  standalone: true,
  imports: [FormsModule,RouterModule,RouterOutlet,CommonModule],
  templateUrl: './studentreg.component.html',
  styleUrl: './studentreg.component.css'
})
export class StudentregComponent {

//   title = 'angular-file-upload-download';

//   userName!: string;
//   selectedFile!:File;

//   userList: User[] = [];

//   constructor(private httpClient: HttpClient) { }
//   ngOnInit(): void {

//     this.getUserList();

//   }
//   private getUserList() {
//     this.httpClient.get<User[]>("http://localhost:8080/user").subscribe(response => {
//       this.userList = response;


//     }, error => {
//       console.log("error occured while fetching user list");
//     });
//   }

//   onFileSelected(event:any){
//     this.selectedFile=event.target.files[0];
//   }
//   save():void{
 
//    const formData=new FormData();
//    formData.append("name",this.userName);
//    formData.append("file",this.selectedFile);
   
//     this.httpClient.post("http://localhost:8080/user",formData).subscribe(response=>{
//       console.log(response);
//       this.getUserList();
//     },error=>{
//       console.log(error);
//     });
//     console.log("saved");

//   }
// }


   constructor(private http: HttpClient, private router: Router) {}
// fileuploadurl=""
// file:any;

// selectFile(event){
//   this.file=event.target.files[0];
//   console.log(this.file)
  
// }


// uploadFile(){
//   let formData=new FormData();
//   formData.append('file',this.file);
//   this.http.post(this.fileuploadurl,formData).subscribe(
//     (data)=> {
//       console.log(data);
//     },
//     (error)=> {
// console.log(error);
//     }
//   );
    
// }
// }


  excelData: any[] | undefined;

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      this.excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log('Excel data:', this.excelData);

      // Send the file to the backend
      const formData = new FormData();
      formData.append('file', file);
      this.http.post('http://localhost:8080/uploadExcel', formData).subscribe(
        response => {
          console.log('File uploaded successfully:', response);
        },
        error => {
          console.error('File upload failed:', error);
        }
      );
    };
    reader.readAsBinaryString(file);
  }
}



//   home(){
//     this.router.navigate(['/sidemenu/home']);

//   }
//   timetable(){
//     this.router.navigate(['/sidemenu/time-table']);

//   }
//   studentsmanagement(){
//     this.router.navigate(['/sidemenu/students-management']);
//   }
//   attendancemanagement(){
//     this.router.navigate(['/sidemenu/attendance-management']);
//   }
//   questionbank(){
//     this.router.navigate(['/sidemenu/question-bank']);
//   }
//     iamodule(){
//       this.router.navigate(['/sidemenu/ia-module']);
//     }
//     feedbacksystem(){
//       this.router.navigate(['/sidemenu/feedback-system']);
//     }
//     lessonplan(){
//       this.router.navigate(['/sidemenu/lesson-plan']);
//     }
//     teachingaids(){
//       this.router.navigate(['/sidemenu/teaching-aids']);
//     }
//     logout() {
//       localStorage.removeItem('isAuthenticated'); 
//     localStorage.removeItem('loginUser');
//       this.router.navigate(['/auth/login']);
//     }
//     personaldocuments(){
      
//       this.router.navigate(['/sidemenu/personal-documents'])
//     }



//     baseUrl = 'http://localhost:8080/api/files';
//   fileList: string[] = []; 
//   selectedFileName = '';
//   selectedDocumentType = '';
//   selectedSemester: 'sem1' | 'sem2' | 'sem3' | 'sem4' | 'sem5' | 'sem6' = 'sem1';  
//   uploadedFiles: string[] = [];
//   textContent: string | null = null;

//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit() {
//     this.getFileList();
//   }
//   getFileList() {
//     const semester = this.selectedSemester;  
//     this.http.get<string[]>(`${this.baseUrl}/list?semester=${semester}`).subscribe(
//       (fileList: string[]) => {
//         this.fileList = fileList; 
//       },
//       error => {
//         console.error('Error fetching file list:', error);
//         alert('Error fetching file list: ' + error.message); 
//       }
//     );
//   }
 


  
 
//   onFileChange(event: any) {
//     const file = event.target.files[0];
//     if (file && this.selectedDocumentType && this.selectedSemester) {
//       const documentType = this.selectedDocumentType;
//       const documentName = file.name;
//       const documentTypeMapping = this.getFileType(file);

      
//       const uploadDirectory = this.getUploadDirectory(this.selectedSemester);

//       if (this.isFileTypeValid(documentType, documentTypeMapping)) {
//         if (documentTypeMapping) {
//           this.uploadFile(file, documentType, documentName, documentTypeMapping, uploadDirectory).subscribe(
//             (response: UploadResponse) => {
//               if (response && response.error) {
//                 alert(response.error);
//                 return;
//               }
//               alert('File uploaded successfully');

             
//               this.selectedSemester = 'sem1'; 
//               this.selectedDocumentType = '';  

              
//               this.getFileList(); 
//             },
//             error => {
//               if (error.status === 409) {
//                 alert('File already exists with the same name');
//               } else {
//                 console.error('Error uploading file:', error);
//               }
//             }
//           );
//         } else {
//           alert('Invalid file type. Please select a valid file.');
//         }
//       } else {
//         alert(`Invalid file type for ${documentType}. Please select a valid ${documentType} file.`);
//       }
//     } else {
//       alert('Please select a document type, semester, and file to upload.');
//     }
//   }

 
//   getUploadDirectory(semester: 'sem1' | 'sem2' | 'sem3' | 'sem4' | 'sem5' | 'sem6'): string {
//     const semesterDirectories: { [key in 'sem1' | 'sem2' | 'sem3' | 'sem4' | 'sem5' | 'sem6']: string } = {
//       'sem1': 'C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem1/',
//       'sem2': 'C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem2/',
//       'sem3': 'C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem3/',
//       'sem4': 'C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem4/',
//       'sem5': 'C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem5/',
//       'sem6': 'C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem6/',
//     };
//     return semesterDirectories[semester]; 
//   }

 
//   isFileTypeValid(selectedType: string, fileType: string | null): boolean {
//     if (!fileType) return false;
//     const validTypes: { [key: string]: string[] } = {
//       pdf: ['application/pdf'],
//       excel: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
//       word: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
//       image: ['image/jpeg', 'image/png'],
//       ppt: ['application/vnd.openxmlformats-officedocument.presentationml.presentation']
//     };
//     return validTypes[selectedType]?.includes(fileType) ?? false;
//   }

  
//   uploadFile(file: File, documentType: string, fileName: string, fileType: string, uploadDir: string): Observable<Object> {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('documentType', documentType);
//     formData.append('fileName', fileName);
//     formData.append('fileType', fileType);
//     formData.append('uploadDate', new Date().toISOString());
//     formData.append('uploadDir', uploadDir);
//     formData.append('semester', this.selectedSemester || '');
    
//     const loginUser = localStorage.getItem('loginUser');
//     if (loginUser) {
//       formData.append('userId', loginUser);
//       return this.http.post(`${this.baseUrl}/upload`, formData).pipe(
//         tap(() => {
          
//           this.getFileList(); 
//         })
//       );
//     } else {
//       return of({ error: 'No logged-in user found.' });
//     }
//   }

  
  
  
//   getFileType(file: File): string {
//     if (file.type.includes('pdf')) {
//       return 'application/pdf';
//     } else if (file.type.includes('image')) {
//       return 'image/jpeg';
//     } else if (file.type.includes('excel')) {
//       return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//     } else if (file.type.includes('word')) {
//       return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
//     } else if (file.type.includes('ppt')) {
//       return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
//     }
//     return '';
//   }

//   downloadSelectedFile() {
//     if (this.selectedFileName) {
//       const downloadUrl = `${this.baseUrl}/download/${this.selectedSemester}/${this.selectedFileName}`;
//       this.http.get(downloadUrl, { responseType: 'blob' }).subscribe(
//         (blob) => {
//           const url = window.URL.createObjectURL(blob);
//           const a = document.createElement('a');
//           a.href = url;
//           a.download = this.selectedFileName;
//           a.click();
//           window.URL.revokeObjectURL(url); 
//         },
//         (error) => {
//           console.error('Download failed:', error);
//           alert('Error downloading file');
//         }
//       );
//     } else {
//       alert('Please select a file to download');
//     }
//   }
  
//   fetchFileList() {
   
//     const semester = 'Fall2024';
//     this.http.get<string[]>(`${this.baseUrl}/list?semester=${semester}`).subscribe(
//       (files) => {
//         this.fileList = files;
//       },
//       (error) => {
//         console.error('Error fetching file list:', error);
//       }
//     );
//   }

//   onFileSelect() {
//     console.log('Selected file:', this.selectedFileName);
//   }
  
//   getFileDownloadUrl(fileName: string): string {
//     return `${this.baseUrl}/download/${fileName}`;
//   }


// onSemesterChange() {
//   this.getFileList();  
// }


// viewDocument(fileName: string): void {
//   const fileExtension = this.getFileExtension(fileName);

  
//   if (fileExtension === 'pdf' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png') {
//     const semester = this.selectedSemester;
//     const fileUrl = `${this.baseUrl}/download/${semester}/${fileName}`;
//     this.openFileInViewer(fileUrl);
//   } else {
   
//     this.downloadFile(fileName);
//   }
// }


// getFileExtension(fileName: string): string {
//   return fileName.split('.').pop() || '';
// }


// openFileInViewer(fileUrl: string): void {
//   const viewerWindow = window.open(fileUrl, '_blank');
//   if (viewerWindow) {
//     viewerWindow.focus();
//   }
// }


// downloadFile(fileName: string): void {
//   const semester = this.selectedSemester;
//   const fileUrl = `${this.baseUrl}/download/${semester}/${fileName}`;
//   const a = document.createElement('a');
//   a.href = fileUrl;
//   a.download = fileName;
//   a.click();
// }
// }






   // changePasswordData = {
  //   email: '',
  //   oldPassword: '',
  //   newPassword: ''
  // };
  
  // constructor(private http: HttpClient, private router: Router) {}
  
  // navigateToLogin() {
  //   this.router.navigate(['/login']);
  // }
  
  // onChangePasswordSubmit() {
  //   this.http.put('http://localhost:8080/users/change-password', this.changePasswordData, { responseType: 'text' })
  //     .subscribe(
  //       (response: any) => {
  //         alert('Password updated successfully');
  //         this.router.navigate(['/login']);
  //       },
  //       (error) => {
  //         alert('Failed to change password. Please check the old password and try again.');
  //       }
  //     );
  // }
  // }
  

 