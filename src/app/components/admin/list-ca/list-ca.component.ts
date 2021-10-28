import { Component, OnInit } from '@angular/core';
import { EuroProtocol } from 'src/app/models/euroProtocol';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-ca',
  templateUrl: './list-ca.component.html',
  styleUrls: ['./list-ca.component.css']
})

export class ListCAComponent implements OnInit {

  list: EuroProtocol[] = [];

  constructor(public service: AdminService) { }
  
  ngOnInit(): void {
    this.service.getAllEuroProtocols()
    .subscribe((data: any)=>{
      this.list = data;
    })
  }

}
