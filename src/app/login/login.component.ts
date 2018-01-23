import { Component, OnInit } from '@angular/core';
import { IAuthService } from '../models/abstractions/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: IAuthService) { }

  login(): void {
    this.auth.login();
  }
}
