import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EuroProtocol } from 'src/app/models/euroProtocol';
import { AccountService } from 'src/app/services/account.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-participant-info',
  templateUrl: './participant-info.component.html',
  styleUrls: ['./participant-info.component.css']
})
export class ParticipantInfoComponent implements OnInit {

  public euroProtocol: EuroProtocol;
  public carPlate: string;
  public dateFormat = 'yyyy/MM/dd';
  public isPersonalData=false;
  constructor(public fb: FormBuilder, public accountService: AccountService, public transportService: TransportService, private toastr: ToastrService) { }

  ngOnInit(): void { }

  @Input() set euroProtocolInput(euroProtocol: EuroProtocol) {
    this.euroProtocol = euroProtocol;
  }

  @Input() set carPlateInput(carPlate: string) {
    this.carPlate = carPlate;
    this.getTransport();
    this.getPersonalData();
  }

  @Output() indexChangedEvent = new EventEmitter<number>();
  @Output() euroProtocolEvent = new EventEmitter<EuroProtocol>();

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
    birthDay: new Date(),
    expirationDate: new Date(),
    issuedBy: [''],
    licenseSerialNumber: [''],
    userCategories: [],
  });

  getTransport() {
    this.transportService.getTransportByCarPlate(this.carPlate)
      .subscribe((data: any) => {
        this.transportForm.setValue({
          id: data.id,
          producedBy: data.producedBy,
          model: data.model,
          vinCode: data.vinCode,
          carPlate: data.carPlate,
          color: data.color,
          yearOfProduction: new Date(data.yearOfProduction),
          categoryName: data.categoryName,
        })
        this.euroProtocol.sideA.transportId = data.id;
      },
        err => {
          this.toastr.warning("Warning", err.error.message);
        });
  }

  getPersonalData() {
    this.accountService.getPersonalData()
      .subscribe((data: any) => {
        if (data.personalData) {
          let personalData = data.personalData;
          this.isPersonalData=true;
          this.personalDataForm.setValue({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            birthDay: personalData.birthDay,
            expirationDate: new Date(personalData.userDriverLicense.expirationDate),
            issuedBy: personalData.userDriverLicense.issuedBy,
            licenseSerialNumber: personalData.userDriverLicense.licenseSerialNumber,
            userCategories: personalData.userDriverLicense.userCategories,
          });
          this.euroProtocol.sideA.driverLicenseSerial = personalData.userDriverLicense.licenseSerialNumber;
        }
        else {
          this.toastr.warning("Warning", "Personal data is empty");
          this.isPersonalData=false;

        }
      },
        err => {
          this.toastr.warning("Warning", err);
        });
  }

  changePage(index: number) {
    this.changeEuroProtocol(this.euroProtocol);
    this.indexChangedEvent.emit(index);
  }

  changeEuroProtocol($event: EuroProtocol) {
    this.euroProtocolEvent.emit($event);
  }
}
