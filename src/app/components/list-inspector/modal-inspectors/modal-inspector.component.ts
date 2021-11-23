import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Inspector } from 'src/app/models/Inspector';
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

    ngOnInit(): void {
    }

    onSubmit(){
        if(this.inspectorForm.value.confirmPassword != this.inspectorForm.value.password){
            this.toastr.warning("Please, confirm password","Failed");
        }
        else this.AddedInspector.emit(this.inspectorForm.value);
    }

    @Input() set setVisible(isVisible: boolean) {
        this.isVisible = isVisible;
    }

    @Output() isVisibleEvent = new EventEmitter<boolean>();
    @Output() AddedInspector = new EventEmitter<Inspector>();

    handleCancel(): void {
        this.isVisibleEvent.emit(false);
    }
}
