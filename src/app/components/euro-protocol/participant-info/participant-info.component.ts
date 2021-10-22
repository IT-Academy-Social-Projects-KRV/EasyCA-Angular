import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { EuroProtocol } from 'src/app/models/euroProtocol';
import { AccountService } from 'src/app/services/account.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-participant-info',
  templateUrl: './participant-info.component.html',
  styleUrls: ['./participant-info.component.css']
})
export class ParticipantInfoComponent implements OnInit {

  public protocol: EuroProtocol;
  public carPlate: string;

  @Input() set setProtocol(euroProtocol: EuroProtocol) {
    this.protocol = euroProtocol;
    console.log(this.protocol);
  }

  @Input() set carPlateInput(carPlate: string) {
    this.carPlate = carPlate;
    console.log(this.carPlate);
  }


  constructor(public fb: FormBuilder, public accountService: AccountService, public transportService: TransportService) { }

  size: NzButtonSize = 'large';
  dateFormat = 'yyyy/MM/dd';

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
    birthDay:new Date(),
    expirationDate:new Date(),
    issuedBy: [''],
    licenseSerialNumber: [''],
    userCategories: [],
  });

  ngOnInit(): void {


    this.accountService.getPersonalData()
      .subscribe((data: any) => {

        this.personalDataForm.setValue({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          birthDay: data.personalData.birthDay,
          expirationDate: new Date(data.personalData.userDriverLicense.expirationDate),
          issuedBy: data.personalData.userDriverLicense.issuedBy,
          licenseSerialNumber: data.personalData.userDriverLicense.licenseSerialNumber,
          userCategories: data.personalData.userDriverLicense.userCategories,
        })
        console.log(data.personalData.userDriverLicense.expirationDate)
      });
    this.transportService.getTransportByCarPlate(this.carPlate)
      .subscribe((data: any) => {

        this.transportForm.setValue({
          id: data.id,
          producedBy: data.producedBy,
          model: data.model,
          vinCode: data.vinCode,
          carPlate: data.carPlate,
          color: data.color,
          yearOfProduction:new Date(data.yearOfProduction),
          categoryName: data.categoryName,
        })
      })
  }

  @Output() indexChanged = new EventEmitter<number>();

  changePage(index: number) {
    this.indexChanged.emit(index);
  }
}
