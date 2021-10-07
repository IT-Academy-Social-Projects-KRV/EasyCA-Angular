import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'list-inspector',
  templateUrl: './list-inspector.component.html',
  styleUrls: ['./list-inspector.component.css']
})

export class ListInspectors implements OnInit {
    
    public isAdd = true;
    public isVisible = false;
    constructor() { }

    ngOnInit(): void {
    }

    showModal() {
        this.isAdd = true;
        this.isVisible = true;
    }

    showModalEdit(){
        this.isAdd = false;
        this.isVisible = true;
    }

    handleCancel($event: boolean){
        this.isVisible = $event;
    }

}
