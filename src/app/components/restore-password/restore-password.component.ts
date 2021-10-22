import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {
  restorePassword: FormGroup;
  errorMessage = '';
  isRestorePasswordFailed = false;

  constructor(private accountService: AccountService, public fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.restorePassword = this.fb.group({
      email: [''],
      newPassword: [''],
      confirmPassword: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.accountService.forgotPassword(this.restorePassword.value)
      .subscribe((data: any) => {
        this.router.navigate(['/home']);
        this.toastr.warning('Please confirm changing', 'Warning');
      },
        err => {
          this.errorMessage = err;
          this.isRestorePasswordFailed = true;
        });
  }
}
