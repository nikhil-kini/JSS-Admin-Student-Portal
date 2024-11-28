import { CommonModule, formatDate } from '@angular/common';
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { Observable } from 'rxjs';





@Component({
  selector: 'app-studentreg',
  standalone: true,
  imports: [FormsModule,RouterModule,RouterOutlet,CommonModule,OrganizationChartModule
  ],
  templateUrl: './studentreg.component.html',
  styleUrl: './studentreg.component.css'
})
export class StudentregComponent  implements OnInit {
 
//     // API URL
//   baseApiUrl = "https://file.io";
  
//   // Variables to store the short link and file
//   shortLink: string = "";
//   loading: boolean = false; // Flag variable
//   file: File | null = null;

//   constructor(private http: HttpClient) {}

//   ngOnInit(): void {}

//   // On file select
//   onChange(event: any) {
//     this.file = event.target.files[0];
//   }

//   // Upload logic
//   upload(file: File): Observable<any> {
//     // Create form data
//     const formData = new FormData();
//     formData.append("file", file, file.name);

//     // Make HTTP POST request
//     return this.http.post(this.baseApiUrl, formData);
//   }

//   // OnClick of the upload button
//   onUpload() {
//     this.loading = true;
//     console.log(this.file);

//     if (this.file) {
//       this.upload(this.file).subscribe(
//         (response: any) => {
//           // Short link from API response
//           this.shortLink = response.link;

//           this.loading = false; // Stop loading
//         },
//         (error) => {
//           console.error('Upload failed', error);
//           this.loading = false; // Stop loading in case of error
//         }
//       );
//     } else {
//       console.error('No file selected!');
//       this.loading = false; // Stop loading if no file selected
//     }
//   }
// }





// private baseUrl = 'http://localhost:8080/updown'; // Ensure correct URL here
// currentFile?: File;
// message = '';
// fileInfos: string[] = []; // Store file names

// constructor(private http: HttpClient) {}

// ngOnInit(): void {
//   this.getFiles();  // Fetch the file list on component initialization
// }

// // File selection handler
// selectFile(event: any): void {
//   this.message = '';
//   this.currentFile = event.target.files.item(0);
// }

// // File upload handler
// upload(): void {
//   if (this.currentFile) {
//     const formData: FormData = new FormData();
//     formData.append('file', this.currentFile);

//     this.http.post(`${this.baseUrl}/upload`, formData).subscribe({
//       next: (response: any) => {
//         this.message = response.message;  // Assuming the backend sends a message field in the response
//         this.getFiles();  // Refresh file list after upload
//       },
//       error: (err: any) => {
//         console.error(err);
//         this.message = err.error?.message || 'Could not upload the file!';
//       },
//       complete: () => {
//         this.currentFile = undefined;
//       }
//     });
//   }
// }

// // Fetching files after upload
// getFiles(): void {
//   this.http.get<string[]>(`${this.baseUrl}/files`).subscribe({
//     next: (data) => {
//       this.fileInfos = data; // Set the file names from the backend
//     },
//     error: (err) => {
//       console.error(err);
//       this.message = 'Could not fetch file list!';
//     }
//   });
// }
// }



selectedFiles?: FileList;
currentFile?: File;
progress = 0;
message = '';
fileInfos?: Observable<any>;

private baseUrl = 'http://localhost:8080/updown';

constructor(private http: HttpClient) {}

ngOnInit(): void {
  this.fileInfos = this.getFiles();
}

selectFile(event: any): void {
  this.selectedFiles = event.target.files;
}

upload(): void {
  this.progress = 0;

  if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);

    if (file) {
      this.currentFile = file;

      const formData: FormData = new FormData();
      formData.append('file', file);

      this.http.post(`${this.baseUrl}/upload`, formData, {
        reportProgress: true,
        observe: 'events'
      }).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.getFiles();
          }
        },
        error: (err: any) => {
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
        },
      });
    }

    this.selectedFiles = undefined;
  }
}

getFiles(): Observable<any> {
  return this.http.get(`${this.baseUrl}/files`);
}
}
