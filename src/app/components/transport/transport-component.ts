import { Component, OnInit } from '@angular/core';
import { Transport } from 'src/app/models/Transport';
import { TransportService } from 'src/app/services/transport.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from "@angular/forms";
import { Insuarance } from 'src/app/models/Insuarance';
import { AccountService } from 'src/app/services/account.service';
import { Data } from 'src/app/models/data';

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
  public personalData: Data;

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
  
  constructor(public accountService: AccountService, public transportService:TransportService, private toastr:ToastrService,public fb: FormBuilder ) { }
  
  ngOnInit(){    
    this.getAllTransport();

    this.accountService.getPersonalData()
      .subscribe(
        res => {
          this.personalData = res;
        },
        err => {
          this.toastr.warning("Personal data is empty", "Warning")
        });
  }  

  getAllTransport(){
    this.transportService.getAllTransports().subscribe(
      (res: any) => {
        this.list = res as Transport[];    
      },
      err => {
        this.toastr.warning(err, "Error");
      });
  }

  addCar($event: Transport)  {
    if(this.personalData.personalData!=null){
      this.transportService.postTransport($event).subscribe(
        res =>{ 
          this.toastr.success("Transport added","Congratulation");
          this.isVisible = false;
          this.getAllTransport();
        },
        err => {
          this.toastr.warning(err, "Error");
        });
    }
    else this.toastr.warning("At first you must create a personal data, and after you can add transport","Warning");
  }

  updateCar($event: Transport){
  this.transportService.putTransport($event).subscribe(
    res =>{     
      this.toastr.success("Transport update","Congratulation")
      this.isVisible = false;
      this.getAllTransport();
    },
    err => {
      this.toastr.warning(err, "Error");
    });
  }  

  setCurrentTransport(car:Transport){
    this.currentTransport = car;
  }

  onDelete($event: Transport){    
    this.transportService.deleteTransport($event.id)
    .subscribe(
      res=>{      
        this.toastr.success("Car Deleted ", "Congratulation");
        let index = this.list.findIndex(x => x.id == $event.id);
        this.list.splice(index, 1);
        this.isVisible = false;
      },
      err=>{
        this.toastr.warning(err, "Error");
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
