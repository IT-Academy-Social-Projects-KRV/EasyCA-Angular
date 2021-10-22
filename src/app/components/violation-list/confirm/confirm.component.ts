import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Circumstance } from 'src/app/models/circumstance';
import { EuroProtocolFullModel } from 'src/app/models/euroProtocolFullModel';
import { EuroProtocolService } from 'src/app/services/euroProtocolService';
import { ViolationListService } from 'src/app/services/violation-list.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  public isVisible = false;
  @Input() public protocolNumber: string;
  public protocol: EuroProtocolFullModel

  errorMessage: string;
  isAnyErrors = false;

  constructor(
    public fb: FormBuilder,
    public http: HttpClient,
    public violationListService: ViolationListService,
    public euroProtocolService: EuroProtocolService, 
    private toastr: ToastrService) { }



  ngOnInit(): void {
    this.violationListService.getEuroProtocolBySerialNumber(this.protocolNumber).subscribe(
      data => {
        this.protocol = data;
        {
          let address = this.protocol.euroProtocol.address;
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
