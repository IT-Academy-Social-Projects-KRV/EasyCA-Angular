import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EuroProtocol } from '../models/euroProtocol';
import { ViolationListService } from '../services/violation-list.service';

@Component({
  selector: 'app-euro-protocol-confirmation-form',
  templateUrl: './euro-protocol-confirmation-form.component.html',
  styleUrls: ['./euro-protocol-confirmation-form.component.css']
})
export class EuroProtocolConfirmationFormComponent implements OnInit {

  @Input() public euroProtocol: EuroProtocol;
  constructor(public fb: FormBuilder, public http: HttpClient, public violationListService: ViolationListService) { }
  
  public EuroProtocolDataForm = this.fb.group({
    serialNumber:[''],
    registrationDateTime: Date,

    address: this.fb.group({
      city: [''],
      district: [''],
      street: [''],
      crossStreet: [''],
      coordinatesOfLatitude: [''],
      coordinatesOfLongitude: [''],
      isInCity: null,
      isIntersection: null
    }),

    sideA: this.fb.group({
      email: [''],
      trasportId: [''],
      circumstances: [],

      evidences: this.fb.array([]),

      driverLicenseSerial: [''],
      damage: [''],
      isGulty: null
    }),

    sideB: this.fb.group({
      email: [''],
      trasportId: [''],
      circumstances: [],

      evidences: this.fb.array([]),

      driverLicenseSerial: [''],
      damage: [''],
      isGulty: null
    }),

    isClosed: null,

    witnesses: this.fb.array([])
  });

  ngOnInit(): void {
  }

  onOkButtonClick(DataForm:FormGroup) {
    
  }

}
