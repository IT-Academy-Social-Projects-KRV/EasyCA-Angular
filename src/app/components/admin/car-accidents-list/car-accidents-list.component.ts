import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarAccident } from 'src/app/models/carAccident';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-car-accidents-list',
  templateUrl: './car-accidents-list.component.html',
  styleUrls: ['./car-accidents-list.component.css']
})
export class CarAccidentsListComponent implements OnInit {

  list: CarAccident[] = [];

  constructor(public service: AdminService,private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.service.getAllCAProtocols()
    .subscribe((data: any)=>{
      this.list = data;
    },
    err=>{
      this.toastr.warning(err);
    })
  }

}
