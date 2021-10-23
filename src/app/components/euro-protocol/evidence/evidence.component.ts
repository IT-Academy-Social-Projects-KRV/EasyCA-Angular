import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  @Output() indexChangedEvent = new EventEmitter<number>();

  changePage(index:number){
    this.indexChangedEvent.emit(index);
  }
}
