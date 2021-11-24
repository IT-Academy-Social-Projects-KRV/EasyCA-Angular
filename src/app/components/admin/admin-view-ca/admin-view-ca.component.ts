import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CarAccident } from 'src/app/models/CarAccident';
import { Evidence } from 'src/app/models/Evidence';
import { Transport } from 'src/app/models/Transport';
import { User } from 'src/app/models/User';
import { Witness } from 'src/app/models/Witness';
import { AccountService } from 'src/app/services/account.service';
import { CAService } from 'src/app/services/ca.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-admin-view-ca',
  templateUrl: './admin-view-ca.component.html',
  styleUrls: ['./admin-view-ca.component.css']
})
export class AdminViewCAComponent implements OnInit {

  public isVisible = false;
  public protocolCA: CarAccident;
  public evidencesList: string[] = [];
  public witnessesList: Witness[] = [];
  public evidencesListNormal: Evidence[] = [];

  constructor(public accountService: AccountService, public fb: FormBuilder, public CAservice: CAService, public transportService: TransportService) { }

  @Input() set setVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }

  @Input() set setData(protocol: CarAccident) {
    this.protocolCA = protocol;

    if (this.protocolCA.evidences.length > 0) {
      this.evidencesListNormal = this.protocolCA.evidences;
    }

    if (this.protocolCA.witnesses.length > 0) {
      this.witnessesList = this.protocolCA.witnesses;
    }

    if (this.protocolCA) {
      this.populateForm(protocol);
    }
  }

  @Output() isVisibleEvent = new EventEmitter<boolean>();

  public transportForm = this.fb.group({
    id: [''],
    producedBy: [''],
    model: [''],
    carPlate: [''],
    color: [''],
    yearOfProduction: [''],
    insuaranceNumber: this.fb.group({
      companyName: [''],
    }),
  });

  public inspectorEmail = this.fb.group({
    email: [''],
  });

  public witnessForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    phoneNumber: [''],
    witnessAddress: [''],
  });

  public dataForm = this.fb.group({
    serialNumber: [''],
    inspectorId: [''],
    registrationDateTime: [''],
    address: this.fb.group({
      city: [''],
      district: [''],
      street: [''],
      crossStreet: [''],
      coordinatesOfLatitude: [''],
      coordinatesOfLongitude: [''],
      isInCity: false,
      isIntersection: false
    }),
    sideOfAccident: this.fb.group({
      email: [''],
      transportId: [''],
      driverLicenseSerial: ['']
    }),
    accidentCircumstances: [''],
    trafficRuleId: [''],
    driverExplanation: [''],
    evidences: [''],
    courtDTG: null,
    isDocumentTakenOff: null
  });

  ngOnInit(): void {
  }

  showModal() {
    this.isVisible = true;
  }

  populateForm(selectedRecord: CarAccident) {
    let isAddress = Object.keys(selectedRecord.address).length != 0 ? true : false;

    if (isAddress) {
      let address = selectedRecord.address;
      let sideOfAccident = selectedRecord.sideOfAccident;

      this.accountService.getUserById(selectedRecord.inspectorId)
      .subscribe((data: User) => {
        console.log(data.email);
        this.inspectorEmail.setValue({
          email: data.email
        })
      }, 
      err=>{}
      )

      this.protocolCA.evidences.forEach(item => {
        this.evidencesList.push(item.photoSchema);
      });

      this.dataForm.setValue({
        serialNumber: selectedRecord.serialNumber,
        inspectorId: selectedRecord.inspectorId,
        registrationDateTime: selectedRecord.registrationDateTime,
        address: {
          city: address.city,
          district: address.district,
          street: address.street,
          crossStreet: address.crossStreet,
          coordinatesOfLatitude: address.coordinatesOfLatitude,
          coordinatesOfLongitude: address.coordinatesOfLongitude,
          isInCity: address.isInCity,
          isIntersection: address.isIntersection,
        },
        sideOfAccident: {
          email: sideOfAccident.email,
          transportId: sideOfAccident.transportId,
          driverLicenseSerial: sideOfAccident.driverLicenseSerial,
        },
        accidentCircumstances: selectedRecord.accidentCircumstances,
        trafficRuleId: selectedRecord.trafficRuleId,
        driverExplanation: selectedRecord.driverExplanation,
        evidences: selectedRecord.evidences,
        courtDTG: selectedRecord.courtDTG,
        isDocumentTakenOff: selectedRecord.isDocumentTakenOff,
      });
    }

    this.transportService.getTransportById(this.dataForm.value.sideOfAccident.transportId)
      .subscribe((data: Transport) => {
        this.transportForm.setValue({
          carPlate: data.carPlate,
          color: data.color,
          model: data.model,
          producedBy: data.producedBy,
          id: data.id,
          yearOfProduction: data.yearOfProduction,
          insuaranceNumber: {
            companyName: data.insuaranceNumber.companyName,
          }
        })
      },
      error => { }
      )
  }

  handleCancel(): void {
    this.isVisibleEvent.emit(false);
  }
}
