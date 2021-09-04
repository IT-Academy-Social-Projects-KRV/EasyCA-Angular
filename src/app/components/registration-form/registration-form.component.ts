import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})

export class RegistrationFormComponent implements OnInit {
  signupForm: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  isRegistered=false;
  errorMessage = '';

  constructor(private accountService: AccountService, private router: Router, public fb: FormBuilder) { 
    this.signupForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      email: [''],
      password: [''],
      confirmPassword: [''],
    })
  }
  ngOnInit()  { }

  onSubmit(){
    this.accountService.register(this.signupForm.value)
    .subscribe((data:any)=>{
      this.isRegistered=true;
      this.isSignUpFailed = false;
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSignUpFailed = true;
    });
  }
  
}
