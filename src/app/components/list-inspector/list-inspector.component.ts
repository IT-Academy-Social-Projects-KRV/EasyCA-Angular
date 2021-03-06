import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Inspector } from 'src/app/models/Inspector';
import { AdminService } from 'src/app/services/admin.service';

@Component({
    selector: 'list-inspector',
    templateUrl: './list-inspector.component.html',
    styleUrls: ['./list-inspector.component.css']
})

export class ListInspectors implements OnInit {

    listInspectors: Inspector[] = [];
    public isVisible = false;
    
    constructor(private adminService: AdminService, private toastr: ToastrService) { }

    ngOnInit(): void {
        this.adminService.getListInspectors()
            .subscribe(data => {
                this.listInspectors = data;
            },
                err => {
                })
    }

    delete(email: any) {
        this.adminService.deleteInspector(email).
            subscribe(() => {
                this.toastr.success("Inspector was deleted", "Success");
                let index = this.listInspectors.findIndex(x => x.email == email);
                this.listInspectors.splice(index, 1);
            },
                err => {
                    this.toastr.warning(err, "Warning");
                })
    }

    addInspector($event: Inspector){
        this.adminService.registerInspector($event)
            .subscribe(res => {
                this.toastr.success("Inspector added","Congratulation");
                this.isVisible = false;
                this.listInspectors.push($event);
            },
            err => {
            });
    };

    showModal() {
        this.isVisible = true;
    }

    handleCancel($event: boolean) {
        this.isVisible = $event;
    }
}
