import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarAccident } from 'src/app/models/carAccident';
import { Transport } from 'src/app/models/Transport';
import { CAService } from 'src/app/services/ca.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-view-ca',
  templateUrl: './view-ca.component.html',
  styleUrls: ['./view-ca.component.css']
})
export class ViewCAComponent implements OnInit {

  public isVisible = false;
  public isAdd = false;
  public protocolCA: CarAccident;


  constructor(public fb: FormBuilder,public CAservice: CAService, public transportService: TransportService, private toastr: ToastrService) { }

  @Input() set setVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }

  @Input() set setAdd(isAdd: boolean) {
    this.isAdd = isAdd;
  }

  @Input() set setData(protocol: CarAccident){
      this.protocolCA = protocol;
      if(this.isAdd === false && this.protocolCA){
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

  public DataForm = this.fb.group({
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
    witnesses: this.fb.group({
        lastName: [''],
        firstName: [''],
        phoneNumber: [''],
        witnessAddress: [''],
      }),
    evidences: [''],
    courtDTG: null,
    isDocumentTakenOff:null,
    isClosed: null
  });

  ngOnInit(): void {
  }

  showModal() {
    this.isVisible = true;
  }

  async populateForm(selectedRecord: CarAccident) {
    let address = selectedRecord.address;
    let witnesses = selectedRecord.witnesses;
    let sideOfAccident = selectedRecord.sideOfAccident;

    this.DataForm.setValue({
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
      witnesses: {
        lastName: witnesses[0].lastName,
        firstName: witnesses[0].firstName,
        phoneNumber: witnesses[0].phoneNumber,
        witnessAddress: witnesses[0].witnessAddress,
      },
      evidences: selectedRecord.evidences,
      courtDTG: selectedRecord.courtDTG,
      isDocumentTakenOff: selectedRecord.isDocumentTakenOff,
      isClosed: selectedRecord.isClosed
    });

    await this.transportService.getTransportById(this.DataForm.value.sideOfAccident.transportId)
    .subscribe((data: Transport)=>{
        this.transportForm.setValue({
          carPlate: data.carPlate,
          color: data.color,
          model: data.model,
          producedBy: data.producedBy,
          id: data.id,
          yearOfProduction: data.yearOfProduction,
          insuaranceNumber:{
            companyName: data.insuaranceNumber.companyName,
          }
        })},
        error => { }
      )
  }

  handleCancel(): void {
      this.isVisibleEvent.emit(false);
  }
}
