import { Component, OnInit } from '@angular/core';
import { EuroProtocolSimpleModel } from 'src/app/models/euroProtocolSimpleModel';
import { ViolationListService } from 'src/app/services/violation-list.service';

@Component({
  selector: 'app-violation-list',
  templateUrl: './violation-list.component.html',
  styleUrls: ['./violation-list.component.css']
})

export class ViolationListComponent implements OnInit {

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
    this.violationListService.getAllEuroProtocolsByEmail()
    .subscribe(
    data => this.protocolList = data,
    () => { }
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
    console.log( this.selectedEuroProtocolNumber);
  }
  
  showEuroProtocolModal() : void {
    this.isEuroProtocolModalVisible = true;
  }

  cancelEuroProtocolModal() : void {
    this.isEuroProtocolModalVisible = false;
  } 
}
