import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  
  public disabled = true;
  public optionGroup = [
    { label: 'No one was injured or killed', checked: false },
    { label: 'The drivers did not drink alcohol or drugs', checked: false },
    { label: 'Drivers have insurance policies', checked: false },
    { label: 'The drivers agreed on the circumstances of the accident', checked: false },
    { label: 'Cars without trailers', checked: false }
  ];
  
  constructor() { }
  
  ngOnInit(): void { }
  
  @Output() indexChangedEvent = new EventEmitter<number>();

  allChecked(): void {
    if (this.optionGroup.every(item => item.checked)) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  changePage(index: number) {
    this.indexChangedEvent.emit(index);
  }
}
