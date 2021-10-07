import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanel implements OnInit {
    
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
