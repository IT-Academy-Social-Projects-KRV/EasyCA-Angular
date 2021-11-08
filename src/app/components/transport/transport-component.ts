import { Component, OnInit } from '@angular/core';
import { Transport } from 'src/app/models/Transport';
import { TransportService } from 'src/app/services/transport.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from "@angular/forms";
import { throwError } from 'rxjs';
import { Insuarance } from 'src/app/models/Insuarance';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})

export class TransportComponent implements OnInit {
  public list: Transport[] = []; 
  public isVisible = false;  
  public errorMessage = ''; 
  public isAdd = false; 

  public currentTransport: Transport = {
    id: <string>{},
    producedBy: <string>{},
    model: <string>{},
    categoryName: <string>{},
    vinCode: <string>{},
    carPlate: <string>{},
    color: <string>{},
    yearOfProduction: <number>{},
    insuaranceNumber: <Insuarance>{},
  }
  
  constructor(public transportService:TransportService, private toastr:ToastrService,public fb: FormBuilder ) { }
  
  ngOnInit(){    
    this.getAllTransport();
  }  

  getAllTransport(){
    this.transportService.getAllTransports().subscribe(
      (res: any) => {
        this.list = res as Transport[];        
      },
      err => {
        throwError(err);
    });
  }

  addCar($event: Transport)  {
    this.transportService.postTransport($event).subscribe(
      res =>{ 
        this.toastr.success("Transport added","Congratulation");
        this.isVisible = false;
        this.getAllTransport();
      },
      err => {
        throwError(err);
      });
  }

  updateCar($event: Transport){
  this.transportService.putTransport($event).subscribe(
    res =>{     
      this.toastr.success("Transport update","Congratulation")
      this.isVisible = false;
      this.getAllTransport();
    },
    err => {
      throwError(err);
    });
  }  

  setCurrentTransport(car:Transport){
    this.currentTransport = car;
  }

  onDelete(id:string){    
    this.transportService.deleteTransport(id)
    .subscribe(
      res=>{      
        console.log(id);  
        this.toastr.error("Car Deleted ", "Congratulation");
        let index = this.list.findIndex(x => x.id == id);
        this.list.splice(index, 1);
        this.isVisible = false;
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
    this.isAdd=false;
    this.isVisible = $event;
  }
}
