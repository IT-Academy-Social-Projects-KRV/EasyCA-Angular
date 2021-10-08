import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-accident-address',
  templateUrl: './accident-address.component.html',
  styleUrls: ['./accident-address.component.css']
})
export class AccidentAddressComponent implements OnInit {

  constructor(public fb: FormBuilder) { }
  
  size: NzButtonSize = 'large';
  
  public addressOfAccident = this.fb.group({
    city: [''],
    district: [''],
    street: [''],
    CrossStreet: [''],
    CoordinatesOfLatitude:[''],
    CoordinatesOfLongitude: [''],
    IsInCity: true,
    IsIntersection: true,
    damage: [''],
  });

  ngOnInit(): void {
  }
  
  stepBackToThird(): void{
  }

  clickToFifth(): void{
  } 

}
