import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Transport } from 'src/app/models/Transport';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})

export class TransportComponent implements OnInit {
  transportForm: FormGroup;
  insuaranceForm: FormGroup;
  transportModel: Transport;
  isActivNotification = false;

  constructor(private transportService: TransportService, private router: Router, public fb: FormBuilder) { 
    this.transportModel = {} as Transport;
    this.insuaranceForm = this.fb.group({
      companyName: [''],
      serialNumber: ['']
    })
    this.transportForm = this.fb.group({
      producedBy:[''],
      model:[''],
      vinCode: [''],
      categoryName: [''],
      carPlate: [''],
      color: [''],
      yearOfProduction: [''],
      insuarence: this.insuaranceForm
    })
  }

  ngOnInit(): void { }

  onSubmit(){
    this.transportModel= this.transportForm.value;
    this.transportModel.insuaranceNumber = this.insuaranceForm.value;
    this.transportService.addTransport(this.transportModel)
    .subscribe((data:any)=>{
      this.transportForm.reset();
      this.isActivNotification = true;
    setTimeout(() => {
      this.isActivNotification = false;
    }, 2000);      
     });
  }
}
