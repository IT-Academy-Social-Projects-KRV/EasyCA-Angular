import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-witnesses',
  templateUrl: './witnesses.component.html',
  styleUrls: ['./witnesses.component.css']
})
export class WitnessesComponent implements OnInit {

  constructor(public fb: FormBuilder) { }
  
  size: NzButtonSize = 'large';
  
  public witness = this.fb.group({
    lastName: [''],
    firstName: [''],
    phone:[''],
    adress:[''],
  });

  ngOnInit(): void {
  }
  
  stepBackToSixth(): void{
  }

  clickToEighth(): void{
  } 
}
