import { Component, OnInit } from '@angular/core';
import { EuroProtocol } from 'src/app/models/euroProtocol';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-list-ep',
  templateUrl: './list-ep.component.html',
  styleUrls: ['./list-ep.component.css']
})

export class ListEPComponent implements OnInit {

  list: EuroProtocol[] = [];

  constructor(public service: AdminService) { }
  
  ngOnInit(): void {
    this.service.getAllEuroProtocols()
    .subscribe((data: any)=>{
      this.list = data;
    })
  }

}
