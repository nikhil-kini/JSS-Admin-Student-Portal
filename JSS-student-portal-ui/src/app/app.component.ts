import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Login1Component } from './login1/login1.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
}
