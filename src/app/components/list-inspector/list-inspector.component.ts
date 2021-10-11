import { Component, OnInit } from '@angular/core';
import { Inspector } from 'src/app/models/inspector';

@Component({
  selector: 'list-inspector',
  templateUrl: './list-inspector.component.html',
  styleUrls: ['./list-inspector.component.css']
})

export class ListInspectors implements OnInit {
    
    list: Inspector[] = [];
    public isAdd = true;
    public isVisible = false;
    constructor() { }

    ngOnInit(): void {
    }

    showModal(isAdd: boolean) {
        this.isAdd = isAdd;
        this.isVisible = true;
    }

    handleCancel($event: boolean){
        this.isVisible = $event;
    }

}
