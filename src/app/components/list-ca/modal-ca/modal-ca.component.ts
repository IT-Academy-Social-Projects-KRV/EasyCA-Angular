import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-ca',
  templateUrl: './modal-ca.component.html',
  styleUrls: ['./modal-ca.component.css']
})

export class ModalCAComponent implements OnInit {
  constructor() { }

  public isVisible = false;
  public isAdd = false;

  ngOnInit(): void {
  }

  @Input() set setVisible(isVisible: boolean) {
      this.isVisible = isVisible;
  }

  @Input() set setAdd(isAdd: boolean) {
      this.isAdd = isAdd;
  }

  @Output() isVisibleEvent = new EventEmitter<boolean>();

  handleCancel(): void {
      this.isVisibleEvent.emit(false);
  }

}
