import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder}from "@angular/forms";
import { Circumstance } from 'src/app/models/circumstance';
import { EuroProtocolService } from 'src/app/services/euroProtocolService';
import { TransportService } from 'src/app/services/transport.service';
import { EuroProtocol } from 'src/app/models/euroProtocol';
import { side } from 'src/app/models/side';
import { Evidence } from 'src/app/models/evidence';
import { AddressOfAccident } from 'src/app/models/addressOfAccident';
import { Witness } from 'src/app/models/witness';
import { Renderer2 } from '@angular/core';
import { CheckInsuranceComponent } from './check-insurance/check-insurance.component';
import { TermsComponent } from './terms/terms.component';
import { ParticipantInfoComponent } from './participant-info/participant-info.component';
import { AccidentAddressComponent } from './accident-address/accident-address.component';
import { CircumstancesComponent } from './circumstances/circumstances.component';
import { EvidenceComponent } from './evidence/evidence.component';
import { WitnessesComponent } from './witnesses/witnesses.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

@Component({
  selector: 'app-euro-protocol',
  templateUrl: './euro-protocol.component.html',
  styleUrls: ['./euro-protocol.component.css']
})

export class EuroProtocolComponent implements OnInit {

  public euroProtocol:EuroProtocol;

  constructor(private router: Router , public accountService:AccountService, public fb: FormBuilder,
     public service: EuroProtocolService, public transportService: TransportService, 
     public renderer: Renderer2, private resolver: ComponentFactoryResolver
     ) { }

  public sideA: side;
  public sideB: side;

  circumstancesList: Circumstance[] = [];
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

  components: Array<any> = [TermsComponent, CheckInsuranceComponent, ParticipantInfoComponent, 
              AccidentAddressComponent, CircumstancesComponent, EvidenceComponent,
              WitnessesComponent, ConfirmationComponent];

  index = 0;  

  @ViewChild('mainComponent', { read: ViewContainerRef })container: any;

  componentRef: ComponentRef<any>;

  onChange(id:Circumstance, event: any) {
    if(event.target.checked) {
      this.checkedCircumstancesId.push(id.circumstanceId);
    } else {
      let index = this.checkedCircumstancesId.findIndex(x => x == id.circumstanceId);
      this.checkedCircumstancesId.slice(index);
    }
  }

  ngOnInit(): void {    
    this.service.getAllCircumstances()
      .subscribe(data => {
        this.circumstancesList = data;
      })
  }
  
  ngAfterViewInit():void{
    setTimeout(() => {
      this.generatePage();
    });
  }

  generatePage(): void {
    let component=this.components[this.index];
    this.container.clear(); 
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.indexChanged.subscribe((val:any) => this.changeIndex(val));
    this.componentRef.instance.setProtocol=this.euroProtocol; 
    if(component!=TermsComponent)
    {
      this.componentRef.instance.euroProtocolEvent.subscribe((val:any)=>this.setEuroProtocol(val));
    }
  }

  changeIndex($event:number) {
    this.index=$event;
    console.log(this.index);
    this.generatePage();
  }

  setEuroProtocol($event:EuroProtocol)
  {
    this.euroProtocol=$event;
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
  } 

  onSubmit(): void{
    this.router.navigate(['/home']);
  }
}
