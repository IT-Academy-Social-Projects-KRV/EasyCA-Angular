import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-after-restore-password',
  templateUrl: './after-restore-password.component.html',
  styleUrls: ['./after-restore-password.component.css']
})
export class AfterRestorePasswordComponent implements OnInit {

  errorMessage = '';

  constructor(private accountService: AccountService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.restorePassword();
  }

  restorePassword = () => {
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];
    const password = this.route.snapshot.queryParams['password'];

    this.accountService.restorePassword('Auth/RestorePassword', token, email, password)
      .subscribe(() => {
        this.toastr.success('Password successfully changed', 'Congratulations');
      },
        err => {
          this.errorMessage = err;
        });
  }
}
