import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { ToastrService } from 'ngx-toastr';
import { AddressOfAccident } from 'src/app/models/addressOfAccident';
import { EuroProtocol } from 'src/app/models/euroProtocol';
import { Evidence } from 'src/app/models/evidence';
import { side } from 'src/app/models/side';
import { Witness } from 'src/app/models/witness';
import { EuroProtocolService } from 'src/app/services/euroProtocolService';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(public service: EuroProtocolService, public fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.sideA = {
      circumstances: Array<number>(),
      damage:'',
      email:'',
      driverLicenseSerial:'',
      evidences:Array<Evidence>(),
      isGulty: false,
      transportId:'',
    }
    this.sideB = {
     circumstances: Array<number>(),
     damage:'',
     email:'',
     driverLicenseSerial:'',
     evidences:Array<Evidence>(),
     isGulty: false,
     transportId:'',
   },
    this.euroProtocol={
     registrationDateTime: new Date('2021-10-04'),
     serialNumber:'',
     address: <AddressOfAccident>{
       coordinatesOfLatitude:'',
       coordinatesOfLongitude:'',
       crossStreet:'',
       isInCity:true,
       isIntersection:true,
       city:'',
       district:'',
       street:''
     },
     sideA: this.sideA,
     sideB: this.sideB,
     isClosed: false,
     witnesses: Array<Witness>(),
   }
  }
  @Output() indexChanged = new EventEmitter<number>();

  changePage(index:number){
    this.indexChanged.emit(index);
  }
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
  
  public addressOfAccident = this.fb.group({
    city: [''],
    district: [''],
    street: [''],
    CrossStreet: [''],
    CoordinatesOfLatitude:[''],
    CoordinatesOfLongitude: [''],
    IsInCity: true,
    IsIntersection: true,
    damage: [''],
  });
  
  public emailSideB = this.fb.group({
    email: '',
  });

  public euroProtocol: EuroProtocol;
  public sideA: side;
  public sideB: side;
  
  size: NzButtonSize = 'large';

  checkedCircumstancesId: number[]=[];

  ngOnInit(): void {
  }

  stepBackToSeventh(): void{
  }

  clickToNinth(): void{

    this.sideA.circumstances = this.checkedCircumstancesId;
    this.sideA.transportId=this.transportForm.value.id;
    this.sideA.email = this.personalDataForm.value.email;
    this.sideA.driverLicenseSerial = this.personalDataForm.value.licenseSerialNumber;
    this.sideA.damage = this.addressOfAccident.value.damage;

    this.sideB.email = this.emailSideB.value.email;
    this.sideB.circumstances = [];
    this.sideB.damage = '';
    this.sideB.driverLicenseSerial = '';
    this.sideB.evidences = [];
    this.sideB.isGulty = false;
    this.sideB.transportId = '';

    this.euroProtocol.address = this.addressOfAccident.value;
    this.euroProtocol.isClosed = false;
    this.euroProtocol.sideA = this.sideA;
    this.euroProtocol.sideB = this.sideB;
    this.euroProtocol.serialNumber="00000012";

    this.euroProtocol.sideA.email= this.personalDataForm.value.email;
    this.euroProtocol.sideB.email = this.emailSideB.value.email;

    this.service.createEuroProtocol(this.euroProtocol)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
          console.log(err);
      });
    this.toastr.success("The European Protocol has been successfully established", "Success");
    this.router.navigate(['/home']);
  } 
}
