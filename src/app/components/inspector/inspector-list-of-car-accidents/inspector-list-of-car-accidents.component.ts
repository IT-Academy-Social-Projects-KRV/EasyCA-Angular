import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressOfAccident } from 'src/app/models/addressOfAccident';
import { CarAccident } from 'src/app/models/carAccident';
import { EvidenceCA } from 'src/app/models/evidenceCA';
import { sideCA } from 'src/app/models/sideCA';
import { Witness } from 'src/app/models/witness';
import { InspectorService } from 'src/app/services/inspector.service';

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
  
  constructor(private inspectorService: InspectorService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.inspectorService.getAllCarAccidentsByInspectorId().subscribe(
      data => {
        if (data.length == 0) {
          this.isAccidentListEmpty = true; 
          this.toastr.warning("CA protocols is empty", "Warning");
        }
        else {
          this.accidentList = data;
        }
      },
      error => { }
      )
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
