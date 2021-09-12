import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  isCollapsed = false;

  constructor(public accountService:AccountService) { }
  ngOnInit(): void {}

  logout(){
    this.accountService.logout();
  }
}
