import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  constructor(public authService:AuthenticationService) { }

  googleSignIn() {
    this.authService.googleAuth();
  }

}
