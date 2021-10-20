import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Circumstance } from 'src/app/models/circumstance';
import { EuroProtocolService } from 'src/app/services/euroProtocolService';

@Component({
  selector: 'app-circumstances',
  templateUrl: './circumstances.component.html',
  styleUrls: ['./circumstances.component.css']
})
export class CircumstancesComponent implements OnInit {

  constructor(public service: EuroProtocolService) {
  }

  size: NzButtonSize = 'large';
  circumstancesList: Circumstance[] = [];
  checkedCircumstancesId: number[] = [];

  ngOnInit(): void {
    this.service.getAllCircumstances()
      .subscribe(data => {
        this.circumstancesList = data;
      })
  }

  onChange(id: Circumstance, event: any) {
    if (event.target.checked) {
      this.checkedCircumstancesId.push(id.circumstanceId);
    } else {
      let index = this.checkedCircumstancesId.findIndex(x => x == id.circumstanceId);
      this.checkedCircumstancesId.slice(index);
    }
  }

  @Output() indexChanged = new EventEmitter<number>();

  changePage(index: number) {
    this.indexChanged.emit(index);
  }

}
