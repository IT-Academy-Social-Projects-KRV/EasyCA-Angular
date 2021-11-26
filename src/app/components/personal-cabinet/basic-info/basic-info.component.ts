import { Component, Input, OnInit } from '@angular/core';
import { Data } from 'src/app/models/Data';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  public userInfo: Data;

  @Input('basicInfo') set basicInfo(info: Data) {
    this.userInfo = info;
  };

  constructor() { }

  ngOnInit(): void {
  }
}
