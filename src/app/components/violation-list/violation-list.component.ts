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

  constructor(public fb: FormBuilder, public http: HttpClient, public violationListService: ViolationListService) { }
  protocolList: EuroProtocol[] = [];

  ngOnInit(): void {
    this.violationListService.getEuroProtocolsByEmail()
    .subscribe(
      data => {
        this.protocolList = data;
        console.log(data);
      },
      err => {
        console.log(err.error.message);
      }
    );
  }
}