import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanel implements OnInit {
    constructor(private router:Router) { }
    isFirstVisible = false;
    isSecondVisible = false;
    size: NzButtonSize = 'large';

    ngOnInit(): void {
    }

    showModal1(): void {
        this.isFirstVisible = true;
    }

    showModal2(): void {
        this.isSecondVisible = true;
    }

    handleCancel1(): void {
        this.isFirstVisible = false;
    }

    handleCancel2(): void {
        this.isSecondVisible = false;
    }
}
