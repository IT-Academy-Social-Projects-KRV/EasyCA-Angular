import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AddressOfAccident } from 'src/app/models/AddressOfAccident';
import { CarAccident } from 'src/app/models/CarAccident';
import { Evidence } from 'src/app/models/Evidence';
import { SideCA } from 'src/app/models/SideCA';
import { Witness } from 'src/app/models/Witness';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-car-accidents-list',
  templateUrl: './car-accidents-list.component.html',
  styleUrls: ['./car-accidents-list.component.css']
})
export class CarAccidentsListComponent implements OnInit {

  public accidentList: CarAccident[];
  public isAccidentListEmpty = false;
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

  constructor(public service: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getAllCAProtocols()
      .subscribe((data: any) => {
        this.accidentList = data;
      },
        err => {
          this.toastr.warning(err);
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
