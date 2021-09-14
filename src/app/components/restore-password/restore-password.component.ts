import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {
  restorePassword : FormGroup;
  errorMessage = '';
  isRestorePasswordFailed = false;

  constructor(private accountService: AccountService, public fb: FormBuilder, private router: Router) {
    this.restorePassword = this.fb.group({
      email: [''],
      password: [''],
      confirmPassword: ['']
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {
    
    this.accountService.forgotPassword(this.restorePassword.value)
    .subscribe((data: any) => {
      this.router.navigate(['/home']);
    },
    err => {
      this.errorMessage = err.error.message;
      this.isRestorePasswordFailed = true;
    });
  }

}
