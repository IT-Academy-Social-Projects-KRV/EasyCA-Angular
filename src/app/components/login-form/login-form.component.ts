import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private accountService: AccountService, private router: Router) { }
  ngOnInit() { }

  onSubmit() {
    this.accountService.login(this.form)
    .subscribe((data: any) => {
      localStorage.setItem('access_token', data.token)
      this.router.navigate(['/home']);
    },
    err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    });
  }
}
