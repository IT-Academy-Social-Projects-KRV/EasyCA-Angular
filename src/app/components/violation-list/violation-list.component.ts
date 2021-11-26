import { Component, OnInit } from '@angular/core';
import { ViolationListService } from 'src/app/services/violation-list.service';
import { EuroProtocolSimpleModel } from '../../models/EuroProtocolSimpleModel';

@Component({
  selector: 'app-violation-list',
  templateUrl: './violation-list.component.html',
  styleUrls: ['./violation-list.component.css']
})

export class ViolationListComponent implements OnInit {

  public email = localStorage.getItem('email');
  public protocolList: EuroProtocolSimpleModel[];  
  public selectedEuroProtocolNumber: string;
  public isEuroProtocolModalVisible = false;
  public condition:boolean;
  public isSecondSideForm = false;

  constructor(public violationListService: ViolationListService ) {   }

  ngOnInit(): void {
    this.fillViolationList();
  }

  fillViolationList():void{
    this.violationListService.getAllEuroProtocolsByEmail(this.email!)
    .subscribe(
      data => this.protocolList = data,
      err => { }
    );
  }

  visibleSecondSideForm($event: boolean) {
    this.isSecondSideForm = $event;
    this.fillViolationList();
  } 

  ContinueFill(){
    this.isSecondSideForm=true;
    this.isEuroProtocolModalVisible=false;
  }

  loadEuroProtocol(id: number) : void {
    this.condition=this.protocolList[id].isClosed;
    this.selectedEuroProtocolNumber = this.protocolList[id].serialNumber;
  }
  
  showEuroProtocolModal() : void {
    this.isEuroProtocolModalVisible = true;
  }

  cancelEuroProtocolModal() : void {
    this.isEuroProtocolModalVisible = false;
  } 
}
