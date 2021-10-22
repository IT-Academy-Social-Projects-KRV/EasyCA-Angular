import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Data } from 'src/app/models/data';
import { Transport } from 'src/app/models/Transport';
import { ThrowStmt } from '@angular/compiler';
import { Circumstance } from 'src/app/models/circumstance';

@Component({
  selector: 'app-enter-data-second-side',
  templateUrl: './enter-data-second-side.component.html',
  styleUrls: ['./enter-data-second-side.component.css']
})
export class EnterDataSecondSideComponent implements OnInit {

  public circumstancesList: Circumstance[];
  public checkedCircumstancesId: number[]=[]; 
  public isVisible = false;
  public array = ["EnterCarPlate","AllData","Circumstance","Sucess"];
  public effect = 'fade';
  @HostBinding('style.height.px') height: number;
  public carPlate: string;
  @Input() set setVisible(isVisible: boolean) {
    this.isVisible = isVisible;    
  }
  @Input() set setCircumstance(circumstancesList: Circumstance[]) {
    this.circumstancesList = circumstancesList;
  }

  @Output() circumstanceOutput = new EventEmitter<{circumstancesList: Circumstance[]}>();
  @Output() carPlateOutput = new EventEmitter<string>();
  @Output() isVisibleEvent = new EventEmitter<boolean>();
  @Output() checkedCircumstancesIdOutput =new EventEmitter<number[]>();
  @Output() populateOutput = new EventEmitter();

  @ViewChild(NzCarouselComponent, { static: false })
  myCarousel: NzCarouselComponent; 
  public personalDataForm = this.fb.group({
    email: [''],
    firstName: [''],
    lastName: [''],
    birthDay: null,
    licenseSerialNumber: [''],
    issuedBy: [''],
    expirationDate: null
   
  });  
  public transportForm = this.fb.group({
    id: [''],
    producedBy: [''],
    model: [''],
    categoryName: [''],
    vinCode: [''],
    carPlate: [''],
    color: [''],
    yearOfProduction: [''],
    insuaranceNumber:['']
  });
 
  onChange(id:Circumstance, event: any) {
    if(event.target.checked) {
      this.checkedCircumstancesId.push(id.circumstanceId);
    } else {
      let index = this.checkedCircumstancesId.findIndex(x => x == id.circumstanceId);
      this.checkedCircumstancesId.splice(index,1);
    }
    console.log(this.checkedCircumstancesId);
  }
  constructor(public fb: FormBuilder) { }

  next(array:string) {
    this.myCarousel.next();            
    if(this.array[0]===array){ 
      this.carPlateOutput.emit(this.carPlate);
      this.height=1000;    

    }
    if(this.array[1]===array){
      this.height=1220;
    }
    if(this.array[2]===array){ 
      this.checkedCircumstancesIdOutput.emit(this.checkedCircumstancesId);
      this.height=450;
    }  
  console.log(array);
  }
  previous(array:string) {
    this.myCarousel.pre();
    if(this.array[1]===array){ 
      this.height=200;
    }
    if(this.array[2]===array){ 
      this.height=1000;
    }
    if(this.array[3]===array){ 
      this.height=1220;
    }
    console.log(array);
  }
  // populatepersonalDataForm(){
  //   if (this.data.personalData) {
  //   let personalData = this.data.personalData;
  //   let driverLicense = personalData.userDriverLicense;
  //   this.personalDataForm.setValue(
  //     {
  //     email: this.data.email,
  //     firstName: this.data.firstName,
  //     lastName: this.data.lastName,
  //     birthDay: personalData.birthDay,
  //     expirationDate: driverLicense.expirationDate,
  //     issuedBy: driverLicense.issuedBy,
  //     licenseSerialNumber: driverLicense.licenseSerialNumber
  //     });
  //   }
  // }
  // populatetransportForm(){
  //   if (this.transport) { 
  //     this.transportForm.setValue(
  //       {
  //         id: this.transport.id,
  //         producedBy: this.transport.producedBy,
  //         model: this.transport.model,
  //         categoryName: this.transport.categoryName,
  //         vinCode: this.transport.vinCode,
  //         carPlate: this.transport.carPlate,
  //         color: this.transport.color,
  //         yearOfProduction: this.transport.yearOfProduction,
  //         insuaranceNumber:this.transport.insuaranceNumber
  //       });
  //     }
  // }
  sendCarPlate():void{
    this.carPlateOutput.emit(this.carPlate);
  }
  handleCancel(): void {
    this.isVisibleEvent.emit(false);
    this.height=270;
  }
  ngOnInit(): void {
  }

}
