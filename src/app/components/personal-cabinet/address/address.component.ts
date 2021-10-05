import { Component, Input, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  
  public address:Address;

  @Input() set setAddress(info:Address){
    this.address=info;
  };

  constructor() { }

  ngOnInit(): void {
  }

}
