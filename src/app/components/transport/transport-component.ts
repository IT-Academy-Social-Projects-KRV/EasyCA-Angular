import { Component, OnInit } from '@angular/core';
import { Transport } from 'src/app/models/Transport';
import { TransportService } from 'src/app/services/transport.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
  list: Transport[] = [];
  isEmpty = true;
  size: NzButtonSize = 'large';
  isVisible = false;
  isConfirmLoading = false;
  isUpdate = false;
  errorMessage = ''
  isTransportListEmpty = true;

  public transportForm = this.fb.group({
    id: [''],
    producedBy: [''],
    model: [''],
    categoryName: [''],
    vinCode: [''],
    carPlate: [''],
    color: [''],
    yearOfProduction: [''],
    insuaranceNumber: this.fb.group({
      companyName: [''],
      serialNumber: ['']
    }),
  });
  constructor(public transportService: TransportService, private router: Router, private toastr: ToastrService, public fb: FormBuilder) { }

  ngOnInit() {
    this.getTransports();
  }

  getTransports() {
    this.transportService.refreshList().subscribe(
      (res: any) => {
        this.list = res as Transport[];
        if (this.list.length > 0) {
          this.isEmpty = false;
        }
      },
      err => {
      });
  }

  onSubmit(transportForm: FormGroup) {
    this.transportService.formData = this.transportForm.value;
    if (this.isUpdate)
      this.updateCar(transportForm);
    else
      this.addCar(transportForm);
  }

  resetForm(transportForm: FormGroup) {
    this.isUpdate = false;
    transportForm.reset();
  }

  populateForm(selectedRecord: Transport) {
    this.isUpdate = true;
    this.transportForm.setValue({
      id: selectedRecord.id,
      producedBy: selectedRecord.producedBy,
      model: selectedRecord.model,
      categoryName: selectedRecord.categoryName,
      vinCode: selectedRecord.vinCode,
      carPlate: selectedRecord.carPlate,
      color: selectedRecord.color,
      yearOfProduction: selectedRecord.yearOfProduction,
      insuaranceNumber: {
        companyName: selectedRecord.insuaranceNumber.companyName,
        serialNumber: selectedRecord.insuaranceNumber.serialNumber
      }
    });
  }

  addCar(transportForm: FormGroup) {
    this.transportService.postTransport().subscribe(
      res => {
        this.resetForm(transportForm);
        this.getTransports();
        this.toastr.success("Transport added", "congratulation")
      },
      err => {
      });
  }

  updateCar(transportForm: FormGroup) {
    this.transportService.putTransport().subscribe(
      res => {
        this.resetForm(transportForm);
        this.getTransports();
        this.toastr.info("Transport update", "congratulation")
      },
      err => {
      });
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this Transport")) {
      this.transportService.deleteTransport(id)
        .subscribe(
          res => {
            this.getTransports();
            this.toastr.error("Car Deleted ", "congratulation")
          },
          err => {
          }
        )
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
