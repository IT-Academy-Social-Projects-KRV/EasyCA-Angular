import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  signinForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';


  constructor(private accountService: AccountService, private router: Router, public fb: FormBuilder,private cookieService: CookieService) { 
    this.signinForm = this.fb.group({
      email: [''],
      password: ['']
    })
  }
  ngOnInit() { }

  onSubmit() {
    this.accountService.login(this.signinForm.value)
    .subscribe((data: any) => {
      localStorage.setItem('access_token', data.token);
      localStorage.setItem('role', data.role);
      this.cookieService.set('refresh-token', data.refreshToken);
      this.router.navigate(['/home']);
    },
    err => {
      this.errorMessage = err.error.message;
      this.isLoginFailed = true;
    });
  }
}
