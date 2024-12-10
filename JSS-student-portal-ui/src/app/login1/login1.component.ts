import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login1',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login1.component.html',
  styleUrl: './login1.component.css'
})
export class Login1Component {
  email: string = '';
  password: string = '';
  
  onLogin() {
    if (this.email && this.password) {
      console.log('Login details:', { email: this.email, password: this.password });
      alert(`Email: ${this.email}\nPassword: ${this.password}`);
      
    } else {
      console.error('Please fill in both email and password');
      alert('Please fill in both email and password');
    }
  }
}
