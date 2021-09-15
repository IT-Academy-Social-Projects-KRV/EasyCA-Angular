import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';
import { TransportService } from 'src/app/services/transport.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {  
  constructor(public accountService:AccountService) { }
  ngOnInit(): void {}

  logout(){
    this.accountService.logout();
  }
}
