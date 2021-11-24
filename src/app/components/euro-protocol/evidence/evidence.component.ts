import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EuroProtocol } from 'src/app/models/EuroProtocol';
import { Evidence } from 'src/app/models/Evidence';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {
  public euroProtocol: EuroProtocol;
  public fileIdList: Array<string> = [];
  public evidenceList: Evidence[] = [];
  
  constructor() { }

  ngOnInit(): void {}

  @Input() set euroProtocolInput(euroProtocol: EuroProtocol) {
    this.euroProtocol = euroProtocol;
  }

  @Output() euroProtocolEvent = new EventEmitter<EuroProtocol>();

  @Output() indexChangedEvent = new EventEmitter<number>();

  changeEuroProtocol($event: EuroProtocol) {
    this.fileIdList.forEach(x => this.evidenceList.push({photoSchema: x}));
    $event.sideA.evidences = this.evidenceList;
    this.euroProtocolEvent.emit($event);
    this.evidenceList = [];
  }
  
  changePage(index:number) {
    this.changeEuroProtocol(this.euroProtocol);
    this.indexChangedEvent.emit(index);
  }
}
