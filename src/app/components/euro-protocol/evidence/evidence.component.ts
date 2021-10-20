import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {

  constructor() { }
  
  size: NzButtonSize = 'large';

  ngOnInit(): void {
  }
  @Output() indexChanged = new EventEmitter<number>();

  changePage(index:number){
    this.indexChanged.emit(index);
  }

}
