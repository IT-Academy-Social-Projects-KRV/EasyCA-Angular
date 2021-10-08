import { Component, OnInit } from '@angular/core';
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
  
  stepBackToFifth(): void{
  }

  clickToSeventh(): void{
  }

}
