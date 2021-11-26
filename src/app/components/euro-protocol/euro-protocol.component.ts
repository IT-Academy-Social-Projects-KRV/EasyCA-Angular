import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder } from "@angular/forms";
import { EuroProtocolService } from 'src/app/services/euroProtocolService';
import { TransportService } from 'src/app/services/transport.service';
import { Side } from '../../models/Side';
import { EuroProtocol } from '../../models/EuroProtocol';

import { AddressOfAccident } from 'src/app/models/AddressOfAccident';
import { Witness } from 'src/app/models/Witness';

import { Renderer2 } from '@angular/core';
import { CheckInsuranceComponent } from './check-insurance/check-insurance.component';
import { TermsComponent } from './terms/terms.component';
import { ParticipantInfoComponent } from './participant-info/participant-info.component';
import { AccidentAddressComponent } from './accident-address/accident-address.component';
import { CircumstancesComponent } from './circumstances/circumstances.component';
import { EvidenceComponent } from './evidence/evidence.component';
import { WitnessesComponent } from './witnesses/witnesses.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-euro-protocol',
  templateUrl: './euro-protocol.component.html',
  styleUrls: ['./euro-protocol.component.css']
})

export class EuroProtocolComponent implements OnInit {

  private euroProtocol: EuroProtocol = {
    registrationDateTime: <Date>{},
    serialNumber: <string>{},
    sideA: <Side>{},
    sideB: <Side>{},
    address: <AddressOfAccident>{},
    isClosed: <boolean>{},
    witnesses: <Array<Witness>>{}
  };
  private components: Array<any> = [TermsComponent, CheckInsuranceComponent, ParticipantInfoComponent,
    AccidentAddressComponent, CircumstancesComponent, EvidenceComponent, WitnessesComponent, ConfirmationComponent
  ];
  private componentRef: ComponentRef<any>;
  private index = 0;
  private carPlate: string;
  
  @ViewChild('mainComponent', { read: ViewContainerRef }) container: any;


  constructor(private router: Router, public accountService: AccountService, public fb: FormBuilder,
    public service: EuroProtocolService, public transportService: TransportService,
    public renderer: Renderer2, private resolver: ComponentFactoryResolver, private toastr: ToastrService
  ) { }


  ngOnInit(): void { }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.generatePage();
    });
  }

  generatePage(): void {
    let component = this.components[this.index];

    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.indexChangedEvent.subscribe((val: number) => this.changeIndex(val));

    switch (component) {
      case TermsComponent: {
        break;
      }
      case EvidenceComponent: {
        this.setCommunication();
        break;
      }
      case CheckInsuranceComponent: {
        this.componentRef.instance.carPlateEvent.subscribe((val: string) => this.setCarPlate(val));
        break;
      }
      case ParticipantInfoComponent: {
        this.setCommunication();
        this.componentRef.instance.carPlateInput = this.carPlate;
        break;
      }
      case ConfirmationComponent: {
        this.setCommunication();
        this.componentRef.instance.createEuroProtocolEvent.subscribe(() => this.createEuroProtocol());
        break;
      }
      default:
        {
          this.setCommunication();
        }
    };
  }

  setCommunication() {
    this.componentRef.instance.euroProtocolInput = this.euroProtocol;
    this.componentRef.instance.euroProtocolEvent.subscribe((val: EuroProtocol) => this.setEuroProtocol(val));
  }


  createEuroProtocol() {


    this.euroProtocol.registrationDateTime = new Date();
    this.euroProtocol.serialNumber = "000013";
    this.euroProtocol.isClosed = false;


    this.service.createEuroProtocol(this.euroProtocol)
      .subscribe(
        res => {
          this.toastr.success(res.message, "Success");
          this.router.navigate(['/home']);
        },
        err => {
          this.toastr.warning("Warning", err.error.message);
        });
  }


  changeIndex($event: number) {
    this.index = $event;
    this.generatePage();
  }

  setEuroProtocol($event: EuroProtocol) {
    this.euroProtocol = $event;
  }

  setCarPlate($event: string) {
    this.carPlate = $event;
  }
}
