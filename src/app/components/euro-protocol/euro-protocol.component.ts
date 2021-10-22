import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup, FormArray, FormControl}from "@angular/forms";
import { Circumstance } from 'src/app/models/circumstance';
import { EuroProtocolService } from 'src/app/services/euroProtocolService';
import { TransportService } from 'src/app/services/transport.service';
import { EuroProtocol } from 'src/app/models/euroProtocol';
import { Side } from 'src/app/models/side';
import { Evidence } from 'src/app/models/evidence';
import { AddressOfAccident } from 'src/app/models/addressOfAccident';
import { Witness } from 'src/app/models/witness';

@Component({
  selector: 'app-euro-protocol',
  templateUrl: './euro-protocol.component.html',
  styleUrls: ['./euro-protocol.component.css']
})

export class EuroProtocolComponent implements OnInit {
  constructor(private router: Router , public accountService:AccountService, public fb: FormBuilder,
     public euroProtocolService: EuroProtocolService, public transportService: TransportService ) { 
       this.sideA = {
         circumstances: Array<number>(),
         damage:'',
         email:'',
         driverLicenseSerial:'',
         evidences:Array<Evidence>(),
         isGulty: false,
         transportId:'',
         protocolSerial:''
       }
       this.sideB = {
        circumstances: Array<number>(),
        damage:'',
        email:'',
        driverLicenseSerial:'',
        evidences:Array<Evidence>(),
        isGulty: false,
        transportId:'',
        protocolSerial:''
      },
       this.euroProtocol={
        id:'',
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

  public euroProtocol: EuroProtocol;
  public sideA: Side;
  public sideB: Side;

  circumstancesList: Circumstance[];
  checkedCircumstancesId: number[]=[];

  dateFormat = 'yyyy/MM/dd';
  size: NzButtonSize = 'large';
  disabled = true;

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

  public emailSideB = this.fb.group({
    email: '',
  });

  public firstFormSideA = this.fb.group({
    firstInsuaranceNumber: [''],
    firstCarPlate: ['']
  });

  public secondFormSideB = this.fb.group({
    secondInsuaranceNumber: [''],
    secondCarPlate: ['']
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

  public witness = this.fb.group({
    lastName: [''],
    firstName: [''],
    phone:[''],
    adress:[''],
  });
  
  optionGroup = [
    { label: 'No one was injured or killed', checked: false },
    { label: 'The drivers did not drink alcohol or drugs', checked: false },
    { label: 'Drivers have insurance policies', checked: false },
    { label: 'The drivers agreed on the circumstances of the accident', checked: false },
    { label: 'Cars without trailers', checked: false }
  ];
  
  isActivFirst = true; 
  isActivSecond = false;
  isActivThird = false; 
  isActivFourth = false;
  isActivFifth = false;
  isActiveSixth = false;
  isActiveSeventh = false;
  isActiveEighth = false;
  isActiveNinth = false;

  onChange(id:Circumstance, event: any) {
    if(event.target.checked) {
      this.checkedCircumstancesId.push(id.circumstanceId);
    } else {
      let index = this.checkedCircumstancesId.findIndex(x => x == id.circumstanceId);
      this.checkedCircumstancesId.slice(index);
    }
  }
  ngOnInit(): void {
    this.euroProtocolService.getAllCircumstances()
      .subscribe(data => {
        this.circumstancesList = data;
      })
  }
  
  allChecked(): void {
    if (this.optionGroup.every(item => item.checked)) {
      this.disabled = false;
    }else {
      this.disabled = true;
    }
  }

  clickToSecond(): void{
    this.isActivFirst = false;
    this.isActivSecond = true;
  }

  stepBackToFirst(): void{
    this.isActivFirst = true;
    this.isActivSecond = false;
  }

  clickToThird(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = true;
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
      this.transportService.getTransportByCarPlate(this.firstFormSideA.value.firstCarPlate)
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
  } 
  
  stepBackToSecond(): void{
    this.isActivFirst = false;
    this.isActivSecond = true;
    this.isActivThird = false;
  }

  clickToFourth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = true;
  } 

  stepBackToThird(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = true;
    this.isActivFourth = false;
  }

  clickToFifth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = true;
  } 

  stepBackToFourth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = true;
    this.isActivFifth = false;
  }

  clickToSixth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = true;
  } 

  stepBackToFifth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = true;
    this.isActiveSixth = false;
  }

  clickToSeventh(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = false;
    this.isActiveSeventh = true;
  } 

  stepBackToSixth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = true;
    this.isActiveSeventh = false;
  }

  clickToEighth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = false;
    this.isActiveSeventh = false;
    this.isActiveEighth = true;
  } 

  stepBackToSeventh(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = false;
    this.isActiveSeventh = true;
    this.isActiveEighth = false;
  }

  clickToNinth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = false;
    this.isActiveSeventh = false;
    this.isActiveEighth = false;
    this.isActiveNinth = true;

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
    this.sideB.protocolSerial='';

    this.euroProtocol.address = this.addressOfAccident.value;
    this.euroProtocol.isClosed = false;
    this.euroProtocol.sideA = this.sideA;
    this.euroProtocol.sideB = this.sideB;
    this.euroProtocol.serialNumber="00000012";

    this.euroProtocol.sideA.email= this.personalDataForm.value.email;
    this.euroProtocol.sideB.email = this.emailSideB.value.email;

    this.euroProtocolService.createEuroProtocol(this.euroProtocol)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
          console.log(err);
      });
  } 

  stepBackToEighth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = false;
    this.isActiveSeventh = false;
    this.isActiveEighth = true;
    this.isActiveNinth = false;
  }

  onSubmit(): void{
    this.router.navigate(['/home']);
  }
}
