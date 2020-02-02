import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {

  public userSessionAlive: boolean;

  constructor(private router: Router,private authenticationService:AuthenticationService) { 
    this.authenticationService.isUserSessionAlive().subscribe((userSessionAlive)=>{
      this.userSessionAlive = userSessionAlive;
    });
  }

  logout() {
    this.authenticationService.authLogout().then(()=>{
      this.router.navigate(['']);
    });
  }

}