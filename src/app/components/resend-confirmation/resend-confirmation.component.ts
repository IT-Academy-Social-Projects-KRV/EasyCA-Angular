import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-resend-confirmation',
  templateUrl: './resend-confirmation.component.html',
  styleUrls: ['./resend-confirmation.component.css']
})
export class ResendConfirmationComponent implements OnInit {
  resendConfirmation : FormGroup;
  errorMessage = '';
  isResendConfirmationFailed = false;

  constructor(private accountService: AccountService, public fb: FormBuilder, private router: Router, private toastr:ToastrService) {
    this.resendConfirmation = this.fb.group({
      email: ['']
    })
   }

  ngOnInit(): void {
  }
  
  onSubmit() {
    this.accountService.resendConfirmation(this.resendConfirmation.value)
    .subscribe((data: any) => {
      this.router.navigate(['/signin']);
      this.toastr.success('The confirmation link has been resent to your email');
    },
    err => {
      this.errorMessage = err.error.message;
      this.isResendConfirmationFailed = true;
    });
  }
}
