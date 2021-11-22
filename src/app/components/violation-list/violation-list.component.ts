import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EuroProtocolSimpleModel } from 'src/app/models/euroProtocolSimpleModel';
import { ViolationListService } from 'src/app/services/violation-list.service';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup, FormArray, FormControl}from "@angular/forms";
import { TransportService } from 'src/app/services/transport.service';
import { Data } from 'src/app/models/data';
import { Transport } from 'src/app/models/Transport';
import { EuroProtocolService } from 'src/app/services/euroProtocolService';
import { Circumstance } from 'src/app/models/circumstance';
import { Side } from 'src/app/models/side';
import { ToastrService } from 'ngx-toastr';
import { Evidence } from 'src/app/models/evidence';

@Component({
  selector: 'app-violation-list',
  templateUrl: './violation-list.component.html',
  styleUrls: ['./violation-list.component.css']
})

export class ViolationListComponent implements OnInit {
  public data: Data;
  public transport: Transport;
  public circumstancesList: Circumstance[];
  private side:Side;
  public protocolList: EuroProtocolSimpleModel[];  
  public checkedCircumstancesId:number[]=[];
  public selectedEuroProtocolNumber: string;
  public isEuroProtocolModalVisible = false;
  public condition:boolean;
  public isSecondSideForm = false;
  private carPlateSideB: string;

  constructor(public fb: FormBuilder,
    public http: HttpClient, 
    public violationListService: ViolationListService, 
    public accountService: AccountService, 
    public transportService: TransportService,
    public euroProtocolService: EuroProtocolService,
    private toastr: ToastrService) {      this.side = {
      email:<string>{},
      transportId:<string>{},
      evidences:Array<Evidence>(),
      circumstances: Array<number>(),
      driverLicenseSerial:<string>{},
      damage:<string>{},      
      isGulty: <boolean>{},
      protocolSerial: <string>{}
    }}

  ngOnInit(): void {
    this.violationListService.getAllEuroProtocolsByEmail()
      .subscribe(
      data => this.protocolList = data,
      () => { }
    );
  }
  setInfo($event:string){
    this.carPlateSideB=$event;
    this.accountService.getPersonalData()
      .subscribe (
      res=> this.data=res,
      err =>{ console.log(err);
    });
    this.transportService.getTransportByCarPlate(this.carPlateSideB)
      .subscribe(
      res=>this.transport=res,
      err=>{ console.log(err);
    });
    this.euroProtocolService.getAllCircumstances()
    .subscribe(data =>  this.circumstancesList = data,
      err=>{ console.log(err);
      });

     console.log(this.data);
    // console.log(this.transport);
    // console.log(this.carPlateSideB);
  }
  visibleSecondSideForm($event: boolean) {
    this.isSecondSideForm = $event;
  }
  registr($event:number[]){
  this.side.email=this.data.email;
  this.side.transportId=this.transport.id;
  this.side.circumstances=$event;
  this.side.driverLicenseSerial=this.data.personalData.userDriverLicense.licenseSerialNumber;
  this.side.protocolSerial=this.selectedEuroProtocolNumber;
  this.side.damage="No";
  this.side.isGulty=false;
  console.log(this.data);
  console.log(this.side);
  
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
  ContinueFill(){
    this.isSecondSideForm=true;
    this.isEuroProtocolModalVisible=false;
  }
  loadEuroProtocol(id: number) : void {
    this.condition=this.protocolList[id].isClosed;
    this.selectedEuroProtocolNumber = this.protocolList[id].serialNumber;
    console.log( this.selectedEuroProtocolNumber);
  }
  
  showEuroProtocolModal() : void {
    this.isEuroProtocolModalVisible = true;
  }

  cancelEuroProtocolModal() : void {
    this.isEuroProtocolModalVisible = false;
  } 
}
