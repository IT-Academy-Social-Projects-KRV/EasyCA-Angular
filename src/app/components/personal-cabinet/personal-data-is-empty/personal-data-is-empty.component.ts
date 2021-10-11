import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-personal-data-is-empty',
  templateUrl: './personal-data-is-empty.component.html',
  styleUrls: ['./personal-data-is-empty.component.css']
})
export class PersonalDataIsEmptyComponent implements OnInit {

  @Output() isVisibleEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  showModal() {
    this.isVisibleEvent.emit(true);
  }
}
