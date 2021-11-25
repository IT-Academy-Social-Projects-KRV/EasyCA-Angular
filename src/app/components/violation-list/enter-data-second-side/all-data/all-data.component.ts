import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Data } from 'src/app/models/data';
import { Transport } from 'src/app/models/Transport';
import { AccountService } from 'src/app/services/account.service';
import { TransportService } from 'src/app/services/transport.service';
import { Side } from 'src/app/models/side';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-data',
  templateUrl: './all-data.component.html',
  styleUrls: ['./all-data.component.css']
})
export class AllDataComponent implements OnInit {
  
  public data: Data;
  public transport: Transport; 
  public carPlate: string;
  public carDamage: string;
  private side:Side;
  public index: number;

  public personalDataForm = this.fb.group({
    email: [''],
    firstName: [''],
    lastName: [''],
    birthDay: null,
    licenseSerialNumber: [''],
    issuedBy: [''],
    expirationDate: null   
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
    insuaranceNumber:['']
  });

  @Input() set sideInput(side: Side) {
    this.side = side;
  }

  @Input() set carPlateInput(carPlate: string) {
    this.carPlate = carPlate;
    this.setTransport();
  }

  @Output() sideEvent = new EventEmitter<Side>();

  @Output() demageCarEvent = new EventEmitter<string>();
  
  constructor(public fb: FormBuilder,
    public accountService: AccountService, 
    public transportService: TransportService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.accountService.getPersonalData()
      .subscribe (
      res=> {
        this.data=res,
        this.populatepersonalDataForm(), 
        this.side.email=res.email,
        this.side.driverLicenseSerial=res.personalData.userDriverLicense.licenseSerialNumber;
      },
      err =>{ 
        this.toastr.warning(err, "Warning");
      });
  }

  onChange( event: any) {
    console.log(this.carDamage);
      this.demageCarEvent.emit(this.carDamage); 
  }
  
  setTransport(){
    this.transportService.getTransportByCarPlate(this.carPlate)
      .subscribe(
      res=>{this.transport=res,
         this.populatetransportForm(),
         this.side.transportId=res.id
        },
      err=>{         
        this.toastr.warning(err, "Warning");
    });     
    this.sideEvent.emit(this.side); 
  }

  populatepersonalDataForm(){
    if (this.data.personalData) {
    let personalData = this.data.personalData;
    let driverLicense = personalData.userDriverLicense;
    this.personalDataForm.setValue(
      {
      email: this.data.email,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      birthDay: personalData.birthDay,
      licenseSerialNumber: driverLicense.licenseSerialNumber,
      issuedBy: driverLicense.issuedBy,
      expirationDate: driverLicense.expirationDate
      });
    }
  }
  
  populatetransportForm(){
    if (this.transport) { 
      this.transportForm.setValue(
        {
          id: this.transport.id,
          producedBy: this.transport.producedBy,
          model: this.transport.model,
          categoryName: this.transport.categoryName,
          vinCode: this.transport.vinCode,
          carPlate: this.transport.carPlate,
          color: this.transport.color,
          yearOfProduction: this.transport.yearOfProduction,
          insuaranceNumber:this.transport.insuaranceNumber
        });
      }
  }
}
