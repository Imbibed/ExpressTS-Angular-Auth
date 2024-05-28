import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  public username: string = '';
  public password: string = '';
  constructor(private authService: AuthenticationService) {
  }

  public sendData = () => {
    this.authService.login(this.username, this.password).subscribe({
      next: (token: string) => {
        localStorage.setItem('access_token', token);
      },
      error: err => {
        console.error(err);
        localStorage.removeItem('access_token');
      }
    });
  }

}
