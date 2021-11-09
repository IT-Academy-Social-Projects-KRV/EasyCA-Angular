import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Transport } from 'src/app/models/Transport';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-transport-data-modal',
  templateUrl: './transport-data-modal.component.html',
  styleUrls: ['./transport-data-modal.component.css']
})
export class TransportDataModalComponent implements OnInit {

  public isVisible = false;
  public isAdd = true;
  public transport: Transport;

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
  
  constructor(public fb: FormBuilder, public transportService: TransportService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }  

  populateForm(selectedRecord:Transport){   
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
          companyName:selectedRecord.insuaranceNumber.companyName,
          serialNumber: selectedRecord.insuaranceNumber.serialNumber
        }
      });      
  }

  resetForm(TransportForm: FormGroup) {
    TransportForm.reset();
  }

  onSubmit() {
    if(this.isAdd){
      this.AddedTransport.emit(this.transportForm.value);
    }
    else this.EditedTransport.emit(this.transportForm.value);
  }

  @Input() set setVisible(isVisible: boolean){
    this.isVisible=isVisible;
  }

  @Input() set setAdd(isAdd: boolean){
    this.isAdd = isAdd;
    if(isAdd){
      this.resetForm(this.transportForm);
    }
  }

  @Input() set setTransport(transport: Transport){
    this.transport = transport;
    if(this.transport && !this.isAdd){
      this.populateForm(this.transport);
    }
  }

  @Output() isVisibleEvent = new EventEmitter<boolean>();
  @Output() AddedTransport = new EventEmitter<Transport>();
  @Output() EditedTransport = new EventEmitter<Transport>();
  @Output() DeletedTransport = new EventEmitter<Transport>();

  handleCancel(): void {
    this.isVisibleEvent.emit(false);
  } 

  confirm():void{
    this.DeletedTransport.emit(this.transportForm.value);
  }

  cancel():void{
    this.toastr.warning("You must to confirm delete car!");
  }
}
