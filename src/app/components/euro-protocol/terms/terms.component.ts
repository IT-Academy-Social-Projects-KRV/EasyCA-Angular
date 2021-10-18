import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor() { }
  
  size: NzButtonSize = 'large';
  disabled = true;

  optionGroup = [
    { label: 'No one was injured or killed', checked: false },
    { label: 'The drivers did not drink alcohol or drugs', checked: false },
    { label: 'Drivers have insurance policies', checked: false },
    { label: 'The drivers agreed on the circumstances of the accident', checked: false },
    { label: 'Cars without trailers', checked: false }
  ];  
  
  allChecked(): void {
    if (this.optionGroup.every(item => item.checked)) {
      this.disabled = false;
    }else {
      this.disabled = true;
    }
  }

  @Output() indexChanged = new EventEmitter<number>();

  clickToSecond(): void {
    this.indexChanged.emit();
  }
  
  ngOnInit(): void {
  }

}
