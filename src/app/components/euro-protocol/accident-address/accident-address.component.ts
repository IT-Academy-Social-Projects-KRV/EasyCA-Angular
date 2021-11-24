import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EuroProtocol } from 'src/app/models/EuroProtocol';

@Component({
  selector: 'app-accident-address',
  templateUrl: './accident-address.component.html',
  styleUrls: ['./accident-address.component.css']
})
export class AccidentAddressComponent implements OnInit {

  public isInCity = false;
  public isIntersection = false;
  public euroProtocol: EuroProtocol;

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void { }

  @Input() set euroProtocolInput(euroProtocol: EuroProtocol) {
    this.euroProtocol = euroProtocol;
    this.setForm(this.euroProtocol);
  }

  @Output() indexChangedEvent = new EventEmitter<number>();
  @Output() euroProtocolEvent = new EventEmitter<EuroProtocol>();

  public outsideAddressForm = this.fb.group({
    coordinatesOfLatitude: [''],
    coordinatesOfLongitude: [''],
    IsInCity: false,
    IsIntersection: false,
  })

  public cityAddressForm = this.fb.group({
    city: [''],
    district: [''],
    street: [''],
    CrossStreet: [''],
    IsInCity: true,
    IsIntersection: false,
  })

  public damageForm = this.fb.group({
    damage: ['']
  })

  changePage(index: number) {
    this.setAddress();
    this.indexChangedEvent.emit(index);
  }

  onChangeIsInCity($event: any) {
    this.isInCity = $event.target.checked;
  }

  onChangeIsIntersection($event: any) {
    this.isIntersection = $event.target.checked;
  }

  setAddress() {
    if (this.isInCity) {
      this.euroProtocol.address = this.cityAddressForm.value;
    }
    else {
      this.euroProtocol.address = this.outsideAddressForm.value;
    }

    this.euroProtocol.sideA.damage = this.damageForm.value.damage;
    this.changeEuroProtocol(this.euroProtocol);
  }

  changeEuroProtocol($event: EuroProtocol) {
    this.euroProtocolEvent.emit($event);
  }

  setForm(protocol: any) {
    let address = protocol.address;
    let isAddress = Object.keys(address).length != 0 ? true : false;

    if (isAddress) {
      if (address.IsInCity) {
        this.cityAddressForm.setValue({
          city: address.city,
          district: address.district,
          street: address.street,
          CrossStreet: address.crossStreet,
          IsInCity: true,
          IsIntersection: false,
        })

        if (address.IsIntersection) {
          this.cityAddressForm.setValue({
            city: address.city,
            district: address.district,
            street: address.street,
            CrossStreet: address.crossStreet,
            IsInCity: true,
            IsIntersection: true,
          })
        }
      }
      else {
        this.outsideAddressForm.setValue({
          coordinatesOfLatitude: address.coordinatesOfLatitude,
          coordinatesOfLongitude: address.coordinatesOfLongitude,
          IsInCity: false,
          IsIntersection: false
        })
      }

      this.damageForm.setValue({
        damage: protocol.sideA.damage
      })
    }
  }
}
