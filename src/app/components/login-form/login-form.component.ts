import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

  pwdPattern = "^^(?!/\.\?,\$%&\^!~`$)([A-Z]{1}[a-z]{3}[A-Za-z]{1}[0-9a-z]{2}[0-9@]{1,2}([@]{0,1})?)$";

  constructor(private accountService: AccountService, private router: Router, public fb: FormBuilder, private cookieService: CookieService) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.pwdPattern)]]
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.accountService.login(this.signinForm.value)
      .subscribe((data: any) => {
        localStorage.setItem('access_token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('email', data.email);
        this.cookieService.set('refresh-token', data.refreshToken);
        this.router.navigate(['/home']);
      },
        err => {
          this.errorMessage = err;
          this.isLoginFailed = true;
        });

  }
}
