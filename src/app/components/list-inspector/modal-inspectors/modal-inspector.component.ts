import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Inspector } from 'src/app/models/inspector';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-modal-inspector',
  templateUrl: './modal-inspector.component.html',
  styleUrls: ['./modal-inspector.component.css']
})

export class ModalInspectors implements OnInit {
    constructor(public fb: FormBuilder, public adminService: AdminService,private toastr:ToastrService) { }
    
    public inspectorForm = this.fb.group({
        email: [''],
        firstName: [''],
        lastName: [''],
        password: [''],
        confirmPassword: ['']
    });

    public isVisible = false;
    public isAdd = false;

    ngOnInit(): void {
    }

    onSubmit(){
        this.addInspector(this.inspectorForm.value);
    }

    addInspector(inspector: Inspector){
        this.adminService.registerInspector(inspector)
            .subscribe((data: any) => {
                this.toastr.success("Inspector added","Congratulation");
                this.isVisible = false;
            });
    };

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
