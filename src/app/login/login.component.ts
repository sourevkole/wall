import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit{

  signUpFormGroup: FormGroup;
  signUpSubmitted:boolean = false;

  constructor(private authService:AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signUpFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls(){
    return this.signUpFormGroup.controls;
  }

  signUp() {
    this.signUpSubmitted = true;
    if(this.signUpFormGroup.invalid){
      return;
    }else{
      alert('Success');
    }
  }

  googleSignIn() {
    this.authService.googleAuth();
  }

}
