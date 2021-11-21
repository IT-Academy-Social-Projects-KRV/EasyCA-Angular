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
  public evidencesList: string[] = [];
  public protocolCAEdited: CarAccident;
  public protocolCAAdded: CarAccident;
  public evidencesListNormal: EvidenceCA[] = [];

  constructor(public fb: FormBuilder,public CAservice: CAService, public transportService: TransportService, private toastr: ToastrService) { }

  @Input() set setVisible(isVisible: boolean) {
    this.isVisible = isVisible;
    
    if(this.isAdd){
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
        this.evidencesListNormal = this.protocolCA.evidences;
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

      this.protocolCA.evidences.forEach(item => {
        this.evidencesList.push(item.photoSchema);
      });

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
    this.protocolCAAdded = this.DataForm.value;

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
        this.protocolCAAdded.sideOfAccident.transportId = this.transportForm.value.id;
        this.protocolCAAdded.address.isInCity = true;
        this.protocolCAAdded.serialNumber = "123";
        this.protocolCAAdded.address.isIntersection = false;
        this.protocolCAAdded.inspectorId = "";
        this.protocolCAAdded.isClosed = false;
        this.protocolCAAdded.isDocumentTakenOff = true;
        this.protocolCAAdded.courtDTG = new Date();
        this.protocolCAAdded.registrationDateTime = new Date();
        this.protocolCAAdded.witnesses = this.witnessesList;
        this.protocolCAAdded.evidences = this.evidencesListNormal;
        this.addCA(this.protocolCAAdded);
        this.clearLocalEvidence();
      });
    }
    else{
      this.protocolCAEdited = this.DataForm.value;
      this.protocolCAEdited.witnesses = this.witnessesList;
      this.protocolCAEdited.evidences = this.evidencesListNormal;
      this.editCA(this.protocolCAEdited);
      this.clearLocalEvidence();
    } 
    this.isVisibleEvent.emit(false);
  }

  addEvidence($event: Array<string>){
    let arrayEvidence: EvidenceCA[]=[];
    this.evidencesList = $event;

    this.evidencesList.forEach(item => {
      arrayEvidence.push({photoSchema: item});
    });

    this.evidencesListNormal = arrayEvidence;
  }

  addCA(ca: CarAccident){
    this.protocolCAAddedEvent.emit(ca);
  }

  editCA(ca: CarAccident){
    this.protocolCAEditedEvent.emit(ca);
  }

  clearLocalEvidence(){
    this.evidencesList = [];
    console.log(this.evidencesList);
  }

  handleCancel(): void {
    this.clearLocalEvidence();
    this.isVisibleEvent.emit(false);
  }
}