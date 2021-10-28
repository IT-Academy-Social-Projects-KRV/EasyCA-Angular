import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})

export class RegistrationFormComponent implements OnInit {
  signupForm: FormGroup;
  isSuccessful = false;

  isSignUpFailed = false;
  isRegistered = false;

  submitted = false;

  firstNamePattern = "^([A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14})$";
  lastNamePattern = "^([A-Z]{1}[a-z]{1,14}$)|(^[А-Я]{1}[а-я]{1,14})$";
  pwdPattern = "^^(?!/\.\?,\$%&\^!~`$)([A-Z]{1}[a-z]{3}[A-Za-z]{1}[0-9a-z]{2}[0-9@]{1,2}([@]{0,1})?)$";

  errorMessage = '';

  constructor(private accountService: AccountService, private router: Router, public fb: FormBuilder, private toastr: ToastrService) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.pattern(this.firstNamePattern)]],
      lastName: ['', [Validators.pattern(this.lastNamePattern)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(8), Validators.pattern(this.pwdPattern)]],
      confirmPassword: ['', [Validators.required]],
    })
  }

  get getControls() {
    return this.signupForm.controls;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.accountService.register(this.signupForm.value)
      .subscribe((data: any) => {
        this.isRegistered = true;
        this.isSignUpFailed = false;
      },
        err => {
          this.errorMessage = err;
          this.isSignUpFailed = true;
        });
  }
}
