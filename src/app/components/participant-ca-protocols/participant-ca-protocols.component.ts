import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressOfAccident } from 'src/app/models/AddressOfAccident';
import { CarAccident } from 'src/app/models/CarAccident';
import { Evidence } from 'src/app/models/Evidence';
import { SideCA } from 'src/app/models/SideCA';
import { Witness } from 'src/app/models/Witness';
import { CAService } from 'src/app/services/ca.service';

@Component({
  selector: 'app-participant-ca-protocols',
  templateUrl: './participant-ca-protocols.component.html',
  styleUrls: ['./participant-ca-protocols.component.css']
})
export class ParticipantCAProtocolsComponent implements OnInit {

  public accidentList: CarAccident[];
  public isAccidentListEmpty = true;
  public isVisible = false;

  public selectedCA: CarAccident = {
    id: <string>{},
    serialNumber: <string>{},
    inspectorId: <string>{},
    registrationDateTime: <Date>{},
    address: <AddressOfAccident>{},
    sideOfAccident: <SideCA>{},
    accidentCircumstances: <string>{},
    trafficRuleId: <string>{},
    driverExplanation: <string>{},
    witnesses: <Array<Witness>>[],
    evidences: <Array<Evidence>>[],
    isDocumentTakenOff: <boolean>{},
    courtDTG: <Date>{}
  };

  constructor(private caService: CAService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCaProtocols();
  }

  getCaProtocols() {
    this.caService.getAllCAForParticipant()
      .subscribe((data: any) => {
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
        })
  }

  setSelectedCA(selectedCA: CarAccident) {
    this.selectedCA = selectedCA;
  }

  showModal() {
    this.isVisible = true;
  }

  handleCancel($event: boolean) {
    this.isVisible = $event;
  }
}
