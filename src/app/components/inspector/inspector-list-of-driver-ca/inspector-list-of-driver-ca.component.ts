import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressOfAccident } from 'src/app/models/addressOfAccident';
import { CarAccident } from 'src/app/models/carAccident';
import { EvidenceCA } from 'src/app/models/evidenceCA';
import { sideCA } from 'src/app/models/sideCA';
import { Witness } from 'src/app/models/witness';
import { CAService } from 'src/app/services/ca.service';

@Component({
  selector: 'app-inspector-list-of-driver-ca',
  templateUrl: './inspector-list-of-driver-ca.component.html',
  styleUrls: ['./inspector-list-of-driver-ca.component.css']
})
export class InspectorListOfDriverCaComponent implements OnInit {
  public accidentList: CarAccident[];
  public isAccidentListEmpty = true;
  public isListRequested = false;
  public isVisible = false;

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

  constructor(private caService: CAService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  requestListOfCA(driverLicenseId: string) {
    this.caService.getAllCAByDriverLicenseId(driverLicenseId).subscribe(
      data => {
        this.isListRequested = true;
        this.accidentList = data;
        if (this.accidentList.length > 0) {
          this.isAccidentListEmpty = false;
        }
        else {
          this.toastr.warning("There are no CA protocols registered for this driver", "Warning");
          this.isAccidentListEmpty = true;
        }
      },
      err => {
        this.toastr.error(err, "Error");
        this.isListRequested = false;
        this.isAccidentListEmpty = true;
      }
    );
  }

  showModal() {
    this.isVisible = true;
  }

  setSelectedCA(selectedCA: CarAccident) {
    this.selectedCA = selectedCA;
  } 

  handleCancel($event: boolean) {
    this.isVisible = $event;
  }
}
