import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-inspector',
  templateUrl: './modal-inspector.component.html',
  styleUrls: ['./modal-inspector.component.css']
})

export class ModalInspectors implements OnInit {
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
