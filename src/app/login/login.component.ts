import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(public authService:AuthenticationService) { }

  ngOnInit() {
  }

}
