import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EuroProtocol } from 'src/app/models/euroProtocol';
import { EuroProtocolService } from 'src/app/services/euroProtocolService';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  public euroProtocol: EuroProtocol;

  constructor(public service: EuroProtocolService, public fb: FormBuilder) { }

  ngOnInit(): void { }

  @Input() set euroProtocolInput(euroProtocol: EuroProtocol) {
    this.euroProtocol = euroProtocol;
    this.setEmail();
  }

  @Output() euroProtocolEvent = new EventEmitter<EuroProtocol>();
  @Output() indexChangedEvent = new EventEmitter<number>();
  @Output() createEuroProtocolEvent = new EventEmitter();

  public emailForm = this.fb.group({
    myEmail: [''],
    secondEmail: ['']
  })

  setEmail() {
    let emailB = this.euroProtocol.sideB.email;
    this.emailForm.setValue({
      myEmail: localStorage.getItem('email'),
      secondEmail: emailB ? emailB : ''
    });
  }

  changePage(index: number) {
    this.setEmailInSide();
    this.indexChangedEvent.emit(index);
  }

  createEuroProtocol() {
    this.setEmailInSide();
    this.euroProtocolEvent.emit(this.euroProtocol);
    this.createEuroProtocolEvent.emit();
  }

  setEmailInSide() {
    this.euroProtocol.sideA.email = this.emailForm.value.myEmail;
    this.euroProtocol.sideB.email = this.emailForm.value.secondEmail;
  }

}
