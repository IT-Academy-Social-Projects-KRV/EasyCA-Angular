import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EuroProtocol } from 'src/app/models/euroProtocol';
import { ViolationListService } from 'src/app/services/violation-list.service';

@Component({
  selector: 'app-violation-list',
  templateUrl: './violation-list.component.html',
  styleUrls: ['./violation-list.component.css']
})

export class ViolationListComponent implements OnInit {
  selectedEuroProtocol: EuroProtocol;
  isEuroProtocolModalVisible = false;

  constructor(public fb: FormBuilder, public http: HttpClient, public violationListService: ViolationListService) { }
  protocolList: EuroProtocol[] = [];

  ngOnInit(): void {
    this.violationListService.getEuroProtocolsByEmail()
    .subscribe(
      data => this.protocolList = data,
      () => { }
    );
  }

  loadEuroProtocol(id: number) : void {
    this.selectedEuroProtocol = this.protocolList[id];
  }

  showEuroProtocolModal() : void {
    this.isEuroProtocolModalVisible = true;
  }
  cancelEuroProtocolModal() : void {
    this.isEuroProtocolModalVisible = false;
  }
}
