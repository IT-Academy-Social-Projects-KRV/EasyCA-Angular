import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { EuroProtocol } from 'src/app/models/euroProtocol';
import { AccountService } from 'src/app/services/account.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-check-insurance',
  templateUrl: './check-insurance.component.html',
  styleUrls: ['./check-insurance.component.css']
})
export class CheckInsuranceComponent implements OnInit {

  constructor(public accountService:AccountService, public fb: FormBuilder, public transportService: TransportService) {
  }
  
  size: NzButtonSize = 'large';

  public personalDataForm = this.fb.group({
    email: [''],
    firstName: [''],
    lastName: [''],
    birthDay: Date,
    expirationDate: Date,
    issuedBy: [''],
    licenseSerialNumber: [''],
    userCategories: [],
  });

  public carPlateForm = this.fb.group({
    CarPlate: ['']
  });

  public transportForm = this.fb.group({
    id: [''],
    producedBy: [''],
    model: [''],
    categoryName: [''],
    vinCode: [''],
    carPlate: [''],
    color: [''],
    yearOfProduction: [''],
  });

  ngOnInit(): void {
  }

  public protocol:EuroProtocol;

  @Input() set setProtocol(euroProtocol:EuroProtocol)
  {
    this.protocol=euroProtocol;
    console.log(this.protocol);
  } 

  @Output() indexChanged = new EventEmitter<number>();
  @Output() euroProtocolEvent=new EventEmitter<EuroProtocol>();

  changePage(index:number){
    this.indexChanged.emit(index);
    //this.protocol.sideA.
    this.euroProtocolEvent.emit(this.protocol);
  }

  clickToThird(): void{
    this.accountService.getPersonalData()
      .subscribe((data: any)=>{
        this.personalDataForm.value.email = data.email;
        this.personalDataForm.value.firstName = data.firstName;
        this.personalDataForm.value.lastName = data.lastName;
        this.personalDataForm.value.birthDay = data.personalData.birthDay;
        this.personalDataForm.value.expirationDate = data.personalData.userDriverLicense.expirationDate;
        this.personalDataForm.value.issuedBy = data.personalData.userDriverLicense.issuedBy;
        this.personalDataForm.value.licenseSerialNumber = data.personalData.userDriverLicense.licenseSerialNumber;
        this.personalDataForm.value.userCategories = data.personalData.userDriverLicense.userCategories;
      });
      this.transportService.getTransportByCarPlate(this.carPlateForm.value.CarPlate)
      .subscribe((data: any) =>{
        this.transportForm.value.id = data.id
        this.transportForm.value.producedBy = data.producedBy;
        this.transportForm.value.model = data.model;
        this.transportForm.value.vinCode = data.vinCode;   
        this.transportForm.value.carPlate = data.carPlate;
        this.transportForm.value.color = data.color;
        this.transportForm.value.yearOfProduction = data.yearOfProduction as number;
        this.transportForm.value.categoryName = data.categoryName;
      })
      console.log(this.transportForm);
  } 
}
