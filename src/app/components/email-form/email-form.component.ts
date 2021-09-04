import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  errorMessage = '';
  constructor(private accountService: AccountService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.confirmEmail();
  }
  confirmEmail=()=>
  {
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];
     
    this.accountService.confirmEmail('Account/ConfirmEmail',token,email) 
    .subscribe(() => {
      this.router.navigate(['/emaiVerify']);
    },
    err => {
      this.errorMessage = err.error.message;
    });
  }
}
