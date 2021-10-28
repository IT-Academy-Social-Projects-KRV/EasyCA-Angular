import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { ToastrService } from 'ngx-toastr';
import { EuroProtocol } from 'src/app/models/euroProtocol';
import { Witness } from 'src/app/models/witness';

@Component({
  selector: 'app-witnesses',
  templateUrl: './witnesses.component.html',
  styleUrls: ['./witnesses.component.css']
})
export class WitnessesComponent implements OnInit {

  public witnessesList: Witness[] = [];
  public euroProtocol: EuroProtocol;

  constructor(public fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void { }

  public witness = this.fb.group({
    lastName: [''],
    firstName: [''],
    phoneNumber: [''],
    witnessAddress: [''],
  });

  @Input() set euroProtocolInput(euroProtocol: EuroProtocol) {
    this.euroProtocol = euroProtocol;

    if (this.euroProtocol.witnesses.length > 0) {
      this.witnessesList = this.euroProtocol.witnesses;
    }
  }

  @Output() indexChangedEvent = new EventEmitter<number>();
  @Output() euroProtocolEvent = new EventEmitter<EuroProtocol>();

  changePage(index: number) {
    this.euroProtocol.witnesses = this.witnessesList;
    this.euroProtocolEvent.emit(this.euroProtocol);
    this.indexChangedEvent.emit(index);
  }

  addWitness(data: any) {
    if (!data.invalid) {
      this.witnessesList.push(data.value);
      this.witness.reset();
    }
    else {
      this.toastr.warning("Wrong witness")
    }
  }

  deleteWitness(item: Witness) {
    let index = this.witnessesList.findIndex(x => x == item);
    this.witnessesList.splice(index, 1);
    this.toastr.success("Witness was delete");
  }
}
