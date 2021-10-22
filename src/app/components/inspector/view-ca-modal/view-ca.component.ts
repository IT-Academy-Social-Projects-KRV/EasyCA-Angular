import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-ca',
  templateUrl: './view-ca.component.html',
  styleUrls: ['./view-ca.component.css']
})
export class ViewCAComponent implements OnInit {

  isVisible = false;
  constructor() { }

  ngOnInit(): void {
  }

  @Input() set setVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }

  showModal() {
    this.isVisible = true;
  }
  
  @Output() isVisibleEvent = new EventEmitter<boolean>();

  handleCancel(): void {
      this.isVisibleEvent.emit(false);
  }
}
