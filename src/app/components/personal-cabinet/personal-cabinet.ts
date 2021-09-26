import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Data } from 'src/app/models/data';
import { FormBuilder, FormGroup}from "@angular/forms";
import { NzButtonSize } from 'ng-zorro-antd/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-cabinet',
  templateUrl: './personal-cabinet.component.html',
  styleUrls: ['./personal-cabinet.component.css']
})

export class PersonalCabinetComponent implements OnInit {
  public userName: string;

  constructor(private router: Router, public accountService: AccountService,
    private toastr:ToastrService, public fb: FormBuilder) { 
      this.userName = ""; 
    }
    size: NzButtonSize = 'large';
    isVisible = false;
    isConfirmLoading = false;
    errorMessage = '';
    isPersonalData=true;
    changedCategoriesList=[''];
    categoriesSeed=[
      {value:"A1",checked: false},
      {value:"A",checked: false}, 
      {value:"B1",checked: false},
      {value:"B",checked: false},
      {value:"C1",checked: false},
      {value:"C",checked: false},
      {value:"D1",checked: false},
      {value:"D",checked: false},
      {value:"T",checked: false},
      {value:"BE",checked: false},
      {value:"C1E",checked: false},
      {value:"CE",checked: false},
      {value:"D1E",checked: false},
      {value:"DE",checked: false}
    ];

  public DataForm = this.fb.group({
    email: [''],
    firstName: [''],
    lastName: [''],
    personalData: this.fb.group({
      address: this.fb.group({
        country: [''],
        region: [''],
        city: [''],
        district: [''],
        street: [''], 
        building: [''], 
        appartament: 0, 
        postalCode: ['']
      }),
      ipn: [''],
      serviceNumber: [''],
      birthDay: Date,
      jobPosition: [''],
      userDriverLicense:  this.fb.group({
        licenseSerialNumber: [''],
        issuedBy:[''],
        expirationDate: Date,
      }),
      userCars: [],
    })
   });

   
  public Icon = this.fb.group({
    name: ['']
  });

  log(value: string[]): void {
      this.changedCategoriesList=value;
      console.log(value);
      console.log(this.changedCategoriesList);
    }
  
  ngOnInit(): void { 
    this.accountService.getPersonalData() 
      .subscribe(
      res => {
        this.accountService.Data = res as Data;
        this.userName= res.firstName[0]+res.lastName[0];
        console.log(this.userName);
      },
      err => {
          this.isPersonalData=false;
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
      });;
  }   

   onSubmit(DataForm:FormGroup) {
    this.accountService.Data=this.DataForm.value;
    this.accountService.Data.personalData.userDriverLicense.userCategories=this.changedCategoriesList;
    this.accountService.putPersonalData().subscribe(
      res=> this.toastr.info("Data update","congratulation"),
    );
  }
  
  populateForm(selectedRecord:Data){
     console.log("work");

     this.categoriesSeed.forEach(x => {
      x.checked = selectedRecord.personalData.userDriverLicense.userCategories.some(y => y === x.value);
     });

       this.DataForm.setValue(
      {
          email: selectedRecord.email,
          firstName: selectedRecord.firstName,
          lastName: selectedRecord.lastName,
          personalData: {
            address: {
              country: selectedRecord.personalData.address.country,
              region: selectedRecord.personalData.address.region,
              city: selectedRecord.personalData.address.city,
              district: selectedRecord.personalData.address.district,
              street: selectedRecord.personalData.address.street, 
              building: selectedRecord.personalData.address.building, 
              appartament: selectedRecord.personalData.address.appartament, 
              postalCode: selectedRecord.personalData.address.postalCode
            },
            ipn: selectedRecord.personalData.ipn,
            serviceNumber:  selectedRecord.personalData.serviceNumber,
            birthDay:  selectedRecord.personalData.birthDay,
            jobPosition:  selectedRecord.personalData.jobPosition,
            userDriverLicense: {
              licenseSerialNumber:  selectedRecord.personalData.userDriverLicense.licenseSerialNumber,
              issuedBy: selectedRecord.personalData.userDriverLicense.issuedBy,
              expirationDate: selectedRecord.personalData.userDriverLicense.expirationDate   
            },
            userCars: selectedRecord.personalData.userCars
          }
      }
    );
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
