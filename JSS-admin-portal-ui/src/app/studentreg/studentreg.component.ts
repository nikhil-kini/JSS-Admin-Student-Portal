import { CommonModule, formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
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





@Component({
  selector: 'app-studentreg',
  standalone: true,
  imports: [FormsModule,RouterModule,RouterOutlet,CommonModule,OrganizationChartModule
  ],
  templateUrl: './studentreg.component.html',
  styleUrl: './studentreg.component.css'
})
export class StudentregComponent {
 // Array with 6 staff members
 staff = [
  'Staff 1', 
  'Staff 2', 
  'Staff 3', 
  'Staff 4', 
  'Staff 5', 
  'Staff 6'
];}