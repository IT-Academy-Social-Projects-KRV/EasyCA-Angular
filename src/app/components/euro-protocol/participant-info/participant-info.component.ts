import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { EuroProtocol } from 'src/app/models/euroProtocol';

@Component({
  selector: 'app-participant-info',
  templateUrl: './participant-info.component.html',
  styleUrls: ['./participant-info.component.css']
})
export class ParticipantInfoComponent implements OnInit {

  public protocol:EuroProtocol;

  @Input() set setProtocol(euroProtocol:EuroProtocol)
  {
    this.protocol=euroProtocol;
    console.log(this.protocol);
  }
  constructor(public fb: FormBuilder) { }
  
  size: NzButtonSize = 'large';
  dateFormat = 'yyyy/MM/dd';

  public transportForm = this.fb.group({
    id: [''],
    producedBy: [''],
    model: [''],
    categoryName: [''],
    vinCode: [''],
    carPlate: [''],
    color: [''],
    yearOfProduction: [''],
  }); 

  public personalDataForm = this.fb.group({
    email: [''],
    firstName: [''],
    lastName: [''],
    birthDay: Date,
    expirationDate: Date,
    issuedBy: [''],
    licenseSerialNumber: [''],
    userCategories: [],
  });

  ngOnInit(): void {
  }

  @Output() indexChanged = new EventEmitter<number>();

  changePage(index:number){
    this.indexChanged.emit(index);
  }
}
