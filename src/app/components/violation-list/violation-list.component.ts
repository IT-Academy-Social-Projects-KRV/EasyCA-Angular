import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EuroProtocolSimpleModel } from 'src/app/models/euroProtocolSimpleModel';
import { ViolationListService } from 'src/app/services/violation-list.service';

@Component({
  selector: 'app-violation-list',
  templateUrl: './violation-list.component.html',
  styleUrls: ['./violation-list.component.css']
})

export class ViolationListComponent implements OnInit {
  selectedEuroProtocolNumber: string;
  isEuroProtocolModalVisible = false;

  constructor(public fb: FormBuilder, public http: HttpClient, public violationListService: ViolationListService) { }
  protocolList: EuroProtocolSimpleModel[];

  ngOnInit(): void {
    this.violationListService.getAllEuroProtocolsByEmail()
    .subscribe(
      data => this.protocolList = data,
      () => { }
    );
  }

  loadEuroProtocol(id: number) : void {
    this.selectedEuroProtocolNumber = this.protocolList[id].serialNumber;
  }

  showEuroProtocolModal() : void {
    this.isEuroProtocolModalVisible = true;
  }
  cancelEuroProtocolModal() : void {
    this.isEuroProtocolModalVisible = false;
  }
}
