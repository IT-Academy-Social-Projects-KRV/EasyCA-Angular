import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangePassword } from 'src/app/models/changePassword';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {

  constructor(public fb: FormBuilder) { }
  
  public isVisible=false;
  
  @Input() set setVisible(visible:boolean)
  {
    this.isVisible=visible;
  }
 
  @Output() changePasswordEvent=new EventEmitter<ChangePassword>();
  @Output() isVisibleEvent=new EventEmitter<boolean>();

  public DataForm=this.fb.group({
    oldPassword:[''],
    Password:['']
  });


  ngOnInit(): void {
  }

  onSubmit(data:FormGroup){
    if(!data.invalid)
    {
      this.changePasswordEvent.emit(data.value);
    }
  }

  handleCancel()
  {
    this.isVisibleEvent.emit(false);
  }
}
