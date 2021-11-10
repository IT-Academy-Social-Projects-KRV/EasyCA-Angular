import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarAccident } from 'src/app/models/carAccident';
import { EvidenceCA } from 'src/app/models/evidenceCA';
import { Transport } from 'src/app/models/Transport';
import { Witness } from 'src/app/models/witness';
import { CAService } from 'src/app/services/ca.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-view-ca',
  templateUrl: './view-ca.component.html',
  styleUrls: ['./view-ca.component.css']
})
export class ViewCAComponent implements OnInit {

  public isVisible = false;
  public isAdd = true;
  public protocolCA: CarAccident;
  public witnessesList: Witness[] = [];
  public evidencesList: EvidenceCA[] = [];
  public protocolCAEdited: CarAccident;
  public protocolCAAdded: CarAccident;

  constructor(public fb: FormBuilder,public CAservice: CAService, public transportService: TransportService, private toastr: ToastrService) { }

  @Input() set setVisible(isVisible: boolean) {
    this.isVisible = isVisible;
    
    if(!this.isAdd){
      this.transportForm.reset();
      this.DataForm.reset();
    }
  }

  @Input() set setAdd(isAdd: boolean) {
    this.isAdd = isAdd;
  }

  @Input() set setData(protocol: CarAccident){
      this.protocolCA = protocol;

      if (this.protocolCA.evidences.length > 0) {
        this.evidencesList = this.protocolCA.evidences;
      }

      if (this.protocolCA.witnesses.length > 0) {
        this.witnessesList = this.protocolCA.witnesses;
      }

      if(this.isAdd === false && this.protocolCA){
        this.populateForm(protocol);
      }
  }
  
  @Output() isVisibleEvent = new EventEmitter<boolean>();
  @Output() protocolCAEditedEvent = new EventEmitter<CarAccident>();
  @Output() protocolCAAddedEvent = new EventEmitter<CarAccident>();
 
  public inspectorEmail = this.fb.group({
    email: localStorage.getItem('email'),
  });
  
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

  public witnessForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    phoneNumber: [''],
    witnessAddress: [''],
  });

  public evidenceForm = this.fb.group({
    evidence: [''],
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
        isInCity: true,
        isIntersection: true
        }),
    sideOfAccident: this.fb.group({
        email: [''],
        transportId: [''],
        driverLicenseSerial: ['']
      }),
    accidentCircumstances: [''],
    trafficRuleId: [''],
    driverExplanation: [''],
    courtDTG: new Date(),
    isDocumentTakenOff:false,
    isClosed: false
  });

  ngOnInit(): void {
  }

  populateForm(selectedRecord: CarAccident) {
    let isAddress = Object.keys(selectedRecord.address).length != 0 ? true : false;

    if(isAddress){
      let address = selectedRecord.address;
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
        courtDTG: selectedRecord.courtDTG,
        isDocumentTakenOff: selectedRecord.isDocumentTakenOff,
        isClosed: selectedRecord.isClosed
      });
    }

    this.transportService.getTransportById(this.DataForm.value.sideOfAccident.transportId)
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
    );
  }

  addWitness(data: any) {
    if (!data.invalid) {
      this.witnessesList.push(data.value);
      this.witnessForm.reset();
    }
    else {
      this.toastr.warning("Wrong witness")
    }
  }

  deleteWitness(item: Witness) {
    let index = this.witnessesList.findIndex(x => x == item);
    this.witnessesList.splice(index, 1);
    this.toastr.success("Witness was delete");
  }

  handleOk(){
    if(this.isAdd){
      this.transportService.getTransportByCarPlate(this.transportForm.value.carPlate)
      .subscribe((data: any)=>{
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
        });
        this.DataForm.value.sideOfAccident.transportId = this.transportForm.value.id;
        this.DataForm.value.address.isInCity = true;
        this.DataForm.value.serialNumber = "123";
        this.DataForm.value.address.isIntersection = false;
        this.protocolCAAdded = this.DataForm.value;
        this.protocolCAAdded.inspectorId = "";
        this.protocolCAAdded.isClosed = false;
        this.protocolCAAdded.isDocumentTakenOff = true;
        this.protocolCAAdded.courtDTG = new Date();
        this.protocolCAAdded.registrationDateTime = new Date();
        this.protocolCAAdded.witnesses = this.witnessesList;
        this.protocolCAAdded.evidences = this.evidencesList;
        this.protocolCAAddedEvent.emit(this.protocolCAAdded);
      });
    }
    else{
      this.protocolCAEdited = this.DataForm.value;
      this.protocolCAEdited.witnesses = this.witnessesList;
      this.protocolCAEditedEvent.emit(this.protocolCAEdited);
    } 
    this.isVisibleEvent.emit(false);
  }

  handleCancel(): void {
    this.isVisibleEvent.emit(false);
  }
}