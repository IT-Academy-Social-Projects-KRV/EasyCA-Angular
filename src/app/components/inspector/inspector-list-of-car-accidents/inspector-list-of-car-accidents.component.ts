import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressOfAccident } from 'src/app/models/addressOfAccident';
import { CarAccident } from 'src/app/models/carAccident';
import { EvidenceCA } from 'src/app/models/evidenceCA';
import { sideCA } from 'src/app/models/sideCA';
import { Witness } from 'src/app/models/witness';
import { CAService } from 'src/app/services/ca.service';

@Component({
  selector: 'app-inspector-list-of-car-accidents',
  templateUrl: './inspector-list-of-car-accidents.component.html',
  styleUrls: ['./inspector-list-of-car-accidents.component.css']
})

export class InspectorListOfCarAccidentsComponent implements OnInit {
  
  public accidentList: CarAccident[];
  public isAccidentListEmpty = false;
  public isVisible = false;
  public isAdd = false;

  public selectedCA: CarAccident = {
    id: <string>{},
    serialNumber: <string>{},
    inspectorId: <string>{},
    registrationDateTime: <Date>{},
    address: <AddressOfAccident>{},
    sideOfAccident: <sideCA>{},
    accidentCircumstances: <string>{},
    trafficRuleId:  <string>{},
    driverExplanation: <string>{},
    witnesses: <Array<Witness>>[],
    evidences:<Array<EvidenceCA>>[],
    isDocumentTakenOff: <boolean>{},
    isClosed: <boolean>{},
    courtDTG: <Date>{}
  };

  constructor(private service: CAService, private toastr: ToastrService) { }

  editCA($event: CarAccident){
    this.service.updateCAProtocol($event)
    .subscribe((data: any) => {
      this.toastr.success("CA was updated", "Congratulations");
      let index = this.accidentList.findIndex(x=>x.serialNumber === $event.serialNumber);
      this.accidentList[index] = $event;
      this.getAllCAByInspector();
    },
    err => {
      this.toastr.warning(err, "Warning");
    }
    );
  }

  addCA($event: CarAccident){
    this.service.addCAProtocol($event)
    .subscribe((data: any) => {
      this.toastr.success("CA was added", "Congratulations");
      this.accidentList.push($event);
      this.getAllCAByInspector();
    },
    err => {
      this.toastr.warning(err, "Warning");
    }
    );
  }

  ngOnInit(): void {
   this.getAllCAByInspector();
  }

  getAllCAByInspector(){
    this.service.getAllCarAccidentsByInspectorId().subscribe(
      data => {
        if (data.length == 0) {
          this.isAccidentListEmpty = true; 
          this.toastr.warning("CA protocols is empty", "Warning");
        }
        else {
          this.accidentList = data;
        }
      },
      error => { 
        this.toastr.warning(error, "Warning");
      })
  }

  showModal(isAdd: boolean) {
    this.isVisible = true;
    this.isAdd = isAdd;
  }

  setSelectedCA(selectedCA: CarAccident) {
    this.selectedCA = selectedCA;
  } 

  handleCancel($event: boolean) {
    this.isVisible = $event;
  }
}
