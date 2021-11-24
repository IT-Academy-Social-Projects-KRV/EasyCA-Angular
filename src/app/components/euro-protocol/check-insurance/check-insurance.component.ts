import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EuroProtocol } from 'src/app/models/EuroProtocol';
import { AccountService } from 'src/app/services/account.service';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-check-insurance',
  templateUrl: './check-insurance.component.html',
  styleUrls: ['./check-insurance.component.css']
})
export class CheckInsuranceComponent implements OnInit {

  public euroProtocol: EuroProtocol;

  constructor(public accountService: AccountService, public fb: FormBuilder) { }

  ngOnInit(): void { }

  public carPlateForm = this.fb.group({
    carPlate: ['']
  });

  @Input() set euroProtocolInput(euroProtocol: EuroProtocol) {
    this.euroProtocol = euroProtocol;
  }

  @Output() indexChangedEvent = new EventEmitter<number>();
  @Output() carPlateEvent = new EventEmitter<string>();

  changePage(index: number) {
    this.carPlateEvent.emit(this.carPlateForm.value.carPlate);
    this.indexChangedEvent.emit(index);
  }
}
