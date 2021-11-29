import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { EuroProtocolFullModel } from '../../models/EuroProtocolFullModel';
import { EuroProtocolService } from '../../services/euroProtocolService';
import { ViolationListService } from '../../services/violation-list.service';
import { Circumstance } from '../../models/Circumstance';
import { Witness } from 'src/app/models/Witness';

@Component({
  selector: 'app-euro-protocol-view-form',
  templateUrl: './euro-protocol-view-form.component.html',
  styleUrls: ['./euro-protocol-view-form.component.css']
})

export class EuroProtocolViewFormComponent implements OnInit {
  @Input() public protocolNumber: string;
  public protocol: EuroProtocolFullModel;
  public witnessesList: Witness[] = [];
  public errorMessage: string;
  public isAnyErrors = false;

  constructor(
    public fb: FormBuilder,
    public http: HttpClient,
    public violationListService: ViolationListService,
    public euroProtocolService: EuroProtocolService) { }
    
    ngOnInit(): void {
    this.violationListService.getEuroProtocolBySerialNumber(this.protocolNumber).subscribe(
      data => {
        this.protocol = data;
        {
          let address = this.protocol.euroProtocol.address;
          this.witnessesList = this.protocol.euroProtocol.witnesses;
          let fullAddress: string;
          if (address.isInCity) {
            fullAddress = address.city + ', ' + address.district + ' district';
            if (address.isIntersection) {
              fullAddress += ', crossstreet between' + address.street + ' and ' + address.crossStreet;
            }
            else {
              fullAddress += ', ' + address.street;
            }
          }
          else {
            fullAddress = "Latitude: " + address.coordinatesOfLatitude + ', longitude: ' + address.coordinatesOfLongitude;
          }
          this.protocol.euroProtocolFullAddress = fullAddress;
        }
        this.protocol.sideACircumstances = [];
        this.protocol.sideBCircumstances = [];
    
        this.euroProtocolService.getAllCircumstances().subscribe(
          (datas: Array<Circumstance>) => {
            for (let id of this.protocol.euroProtocol.sideA.circumstances) {
              this.protocol.sideACircumstances.push(datas.filter(x => x.circumstanceId == id).map(x => x.circumstanceName)[0]);
            };
            for (let id of this.protocol.euroProtocol.sideB.circumstances) {
              this.protocol.sideBCircumstances.push(datas.filter(x => x.circumstanceId == id).map(x => x.circumstanceName)[0]);
            };
          }
        );
      },
      err => {
        this.isAnyErrors = true;
        this.errorMessage = "Couldn't to load protocol's data";
      }
    );
  }
}
