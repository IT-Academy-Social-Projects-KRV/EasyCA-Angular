import { Component, OnInit } from '@angular/core';
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
  
  accidentList: CarAccident[];
  isAccidentListEmpty = false;
  isVisible = false;
  isAdd = false;

  selectedCA: CarAccident = {
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
  
  constructor(private inspectorService: InspectorService) { }

  ngOnInit(): void {
    this.inspectorService.getAllCarAccidentsByInspectorId().subscribe(
      data => {
        if (data.length == 0) {
          this.isAccidentListEmpty = true;                    
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
