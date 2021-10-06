import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Data } from 'src/app/models/data';
import { FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-cabinet',
  templateUrl: './personal-cabinet.component.html',
  styleUrls: ['./personal-cabinet.component.css']
})

export class PersonalCabinetComponent implements OnInit {
  public userName: string;
  public data: Data;
  public isVisible = false;
  public isPersonalData = false;
  public isAddPersonalData = true;
  public errorMessage = '';

  public Icon = this.fb.group({
    name: ['']
  });

  constructor(public accountService: AccountService, private toastr: ToastrService, public fb: FormBuilder) {
    this.userName = "";
  }

  ngOnInit(): void {
    this.accountService.getPersonalData()
      .subscribe(
        res => {
          this.data = res;
          this.userName = res.firstName[0] + res.lastName[0];

          if (this.data.personalData != null) {
            this.isPersonalData = true;
          }
        },
        err => {
          this.isPersonalData = false;
          this.errorMessage = err.error.message;
        });
  }

  receiveVisible($event: boolean) {
    this.isVisible = $event;
    this.isAddPersonalData = true;
  }

  editModal() {
    this.isVisible = true;
    this.isAddPersonalData = false;
  }

  update($event: Data) {
    this.accountService.putPersonalData($event).
      subscribe(
        res => {
          this.toastr.info(res.message, "Success");
          this.isVisible = false;
          this.data = $event;
          this.userName = $event.firstName[0] + $event.lastName[0];
        },
        err => {
          this.toastr.warning('Data not updated', err.error.message);
        }
      );
  }

  add($event: Data) {
    this.accountService.addPersonalData($event.personalData).
      subscribe(
        res => {
          this.toastr.info(res.message, "Success");
          this.isVisible = false;
          this.data = $event;
          this.isPersonalData = true;
          this.isAddPersonalData = false;
        },
        err => {
          this.toastr.warning('Data not added', err.error.message);
        }
      );
  }
}
