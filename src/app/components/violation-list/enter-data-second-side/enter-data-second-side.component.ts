import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, EventEmitter,  Input, OnInit, Output, ViewChild, ViewContainerRef, } from '@angular/core';
import { Side } from 'src/app/models/side';
import { Evidence } from 'src/app/models/evidence';
import { EuroProtocolService } from 'src/app/services/euroProtocolService';
import { ToastrService } from 'ngx-toastr';
import { AllDataComponent } from './all-data/all-data.component';
import { CircumstanceComponent } from './circumstance/circumstance.component';
import { SucessComponent } from './sucess/sucess.component';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-enter-data-second-side',
  templateUrl: './enter-data-second-side.component.html',
  styleUrls: ['./enter-data-second-side.component.css']
})
export class EnterDataSecondSideComponent implements OnInit {

  public isVisible = false;
  private side:Side= {
    email:<string>{},
    transportId:<string>{},
    evidences:Array<Evidence>(),
    circumstances: Array<number>(),
    driverLicenseSerial:<string>{},
    damage:<string>{},      
    isGulty: <boolean>{},
    protocolSerial: <string>{}
  }; 
  
  public euroProtocolNumber:string;
  public carPlate: string;
  public effect = 'fade';

  private components:Array<any> = [AllDataComponent, CircumstanceComponent, SucessComponent];
  private componentRef: ComponentRef<any>;
  public index = -1;

  @ViewChild('mainComponent', { read: ViewContainerRef }) container: any;
  
  @Input() set setVisible(isVisible: boolean) {
    this.isVisible = isVisible;    
  } 
  @Input() set setEuroProtocolNumber(euroProtocolNumber: string) {
    this.euroProtocolNumber = euroProtocolNumber;
  } 
  @Output() isVisibleEvent = new EventEmitter<boolean>();

  constructor(public euroProtocolService: EuroProtocolService,
    private toastr: ToastrService,
    public renderer: Renderer2,
    private resolver: ComponentFactoryResolver) { }

  generatePage(): void {
    let component = this.components[this.index];

    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.container.createComponent(factory);
    switch (component) {

      case AllDataComponent: {
        this.setCommunication();
        this.componentRef.instance.carPlateInput = this.carPlate;
        this.componentRef.instance.demageCarEvent.subscribe((demage:string)=>this.setCarDemage(demage));
        break;
      }
      case CircumstanceComponent: {
        this.setCommunication();
        break;
      }
      case SucessComponent: {     
        this.registr();
        break;
      }
      default:
        {
          this.setCommunication();
        }
    };
  }
  changeIndex($event: number) {
    if($event==-1){this.container.clear(); this.index = $event;}
    else{    
      this.index = $event;
      this.generatePage();}
  }
  setCommunication() {
    this.componentRef.instance.sideInput = this.side;
    this.componentRef.instance.sideEvent.subscribe((val: Side) => this.setSide(val));
  }

  registr(){    
    this.side.protocolSerial=this.euroProtocolNumber;
  
    this.side.isGulty=false;     
    this.euroProtocolService.registerSideBEuroProtocol(this.side)
    .subscribe(
      res => {
        this.toastr.info("Great", "Success");
        console.log(res);
      },
      err => {
        this.toastr.warning('Data not added', err.error.message);
          console.log(err);
      });
      console.log(this.side);
    }

  setCarPlate($event: string) {
    this.carPlate = $event;
  }

  setCarDemage($event: string) {
    this.side.damage=$event;
    console.log(this.side.damage);
  }    

  setSide($event: Side) {
    this.side = $event;
  }

  handleCancel(): void {
    this.isVisibleEvent.emit(false);   
  }

  ngOnInit(): void {  }
}
