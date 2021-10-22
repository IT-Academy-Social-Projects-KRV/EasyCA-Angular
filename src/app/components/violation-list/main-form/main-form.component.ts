import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Transport } from 'src/app/models/Transport';
import { Data } from 'src/app/models/data';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent implements OnInit {
  constructor(public fb: FormBuilder) { }
  
  public data: Data;
  public transport: Transport; 
  @Input() set setData(data: Data) {
    this.data = data;
    console.log(this.data);
    this.populatepersonalDataForm();
  }
  
  @Input() set setTransport(transport: Transport) {
    this.transport = transport;
    this.populatetransportForm();
  }

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

  ngOnInit(): void {

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
