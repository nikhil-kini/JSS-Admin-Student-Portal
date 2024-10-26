import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Timetable {
  [key: string]: { day: string; subjects: string[] }[];
}
@Component({
  selector: 'app-ecdepartment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ecdepartment.component.html',
  styleUrl: './ecdepartment.component.css'
})
export class ECdepartmentComponent {
  semesters = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'];

  timetableData: Timetable = {
    'Sem 1': [
      { day: 'Monday', subjects: ['Math', 'Physics', 'Chemistry'] },
      { day: 'Tuesday', subjects: ['Engineering Drawing', 'Computer Basics'] },
    ],
    'Sem 2': [
      { day: 'Monday', subjects: ['Circuit Theory', 'Signal Processing'] },
      { day: 'Tuesday', subjects: ['Data Structures', 'Analog Electronics'] },
    ],
    'Sem 3': [
      { day: 'Monday', subjects: ['Digital Electronics', 'Microprocessors'] },
      { day: 'Tuesday', subjects: ['Control Systems', 'Communication Systems'] },
    ],
    'Sem 4': [
      { day: 'Monday', subjects: ['Embedded Systems', 'VLSI Design'] },
      { day: 'Tuesday', subjects: ['Software Engineering', 'Database Systems'] },
    ],
    'Sem 5': [
      { day: 'Monday', subjects: ['Computer Networks', 'Data Mining'] },
      { day: 'Tuesday', subjects: ['Web Technologies', 'Artificial Intelligence'] },
    ],
    'Sem 6': [
      { day: 'Monday', subjects: ['Machine Learning', 'Cloud Computing'] },
      { day: 'Tuesday', subjects: ['Mobile App Development', 'Cyber Security'] },
    ],
  };

  selectedSemester = 'Sem 1'; // Default semester

  get timetable() {
    return this.timetableData[this.selectedSemester];
  }

  onSemesterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSemester = selectElement.value;
  }
}