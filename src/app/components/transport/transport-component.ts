import { Component, Input, OnInit } from '@angular/core';
import { Transport } from 'src/app/models/Transport';
import { TransportService } from 'src/app/services/transport.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  list: Transport[] = []; 
  isVisible = false;  
  isUpdate=false;
  errorMessage = ''; 
  isAdd = false; 
  currentTransport: Transport; 
  
  constructor(public transportService:TransportService, private router: Router, private toastr:ToastrService,public fb: FormBuilder ) { }
  
  ngOnInit(){    
    this.transportService.getAllTransports().subscribe(
      (res:any) => {
        this.list = res as Transport[];        
      },
      err => {
        throwError(err);
    });
  }  

  addCar($event: Transport)  {
    
    this.transportService.postTransport($event).subscribe(
      res =>{     
        this.toastr.success("Transport added","congratulation");
        this.isVisible = false;
        this.list.push($event);
      },
      err => {
        throwError(err);
      });
  }

  updateCar($event: Transport){
  this.transportService.putTransport($event).subscribe(
    res =>{     
      this.toastr.info("Transport update","congratulation")
      this.isVisible = false;
    },
    err => {
      throwError(err);
    });
  }  

  setCurrentTransport(id:string){
    let index = this.list.findIndex(x => x.id == id);
    this.currentTransport = this.list[index];
  }

  onDelete(id:string){    
    this.transportService.deleteTransport(id)
    .subscribe(
      res=>{        
        this.toastr.error("Car Deleted ", "congratulation");
        let index = this.list.findIndex(x => x.id == id);
        this.list.splice(index, 1);
        
      },
      err=>{
        throwError(err);
      }
    )
  }

  showModal(isAdd: boolean): void {
    this.isVisible = true;
    this.isAdd = isAdd;
  }  

  handleCancel($event: boolean): void {
    this.isVisible = $event;
  }

 
}
