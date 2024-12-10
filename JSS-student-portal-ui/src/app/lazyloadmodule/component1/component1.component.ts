import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component1.component.html',
  styleUrl: './component1.component.css'
})
export class Component1Component {
  constructor(private route: Router) {}
  move2comp2(){
    localStorage.setItem('isAuthenticated', 'true');
    this.route.navigate(['/lazyload/comp2']);
  }
}
