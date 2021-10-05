import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Data } from 'src/app/models/data';
import { FormBuilder, FormGroup, Validators}from "@angular/forms";
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
    submitted = false;
    firstNamePattern = "(^[A-Z]{1}[a-z]{1,17}$)|(^[А-Я]{1}[а-я]{1,16}$)";
    lastNamePattern = "(^[A-Z]{1}[a-z]{1,17}$)|(^[А-Я]{1}[а-я]{1,16}$)";
    countryPattern = "^[A-Z]{1}[a-z]{2}[-a-z]{1}([A-Za-z]{0,1})?([a-z]{0,11})?([-a-z]{0,1})?([A-Za-z]{0,1})?([a-z]{0,18})?$";
    regionPattern = "(^[A-Z]{1}[a-z]{1,14}( [a-z]{2,15})?$)|(^[А-Я]{1}[а-я]{1,14}( [а-я]{0,2})?( [а-я]{14})?$)";
    cityPattern = "(^[A-Z]{1}[a-z]{1,14}( [a-z]{2,15})?$)|(^[А-Я]{1}[а-я]{1,14}( [а-я]{0,2})?( [а-я]{14})?$)";
    districtPattern = "(^[A-Z]{1}[a-z]{1,17}([-]{0,1})?([A-Z]{0,1})?([a-z]{0,17})?( [A-Z]{1})?([a-z]{1})?$)|(^[А-Я]{1}[а-я]{1,16}([-]{0,1})?([А-Я]{0,1})?([а-я]{0,16})?( [А-Я]{1})?([а-я]{1})?$)";
    streetPattern = "^[A-ZА-Я]{1}[a-zа-яі]{1}[a-zа-я]{1}([-a-zа-я]{0,1})?([A-Za-zа-яі]{0,1})?([-a-zа-я]{0,1})?([a-zА-Яа-я]{0,1})?([a-zа-я]{0,1})?([і]{0,1})?([а-я]{0,2})?( [A-ZА-Я]{1})?([a-zа-я]{1})?([a-zі]{1})?([a-zа-я]{1})?([а-я]{0,1})?,[0-9]{1}([0-9a-zа-я]{0,1})?([0-9]{0,3})?([0-9a-z]{0,1})?([а-я]{0,1})?$";
    buildingPattern = "^[0-9]{1}([0-9a-z]{0,3})?([0-9]{0,2})?([a-z]{0,1})?$";
    postalCodePattern = "^[0-9]{5}$";
    ipnPattern = "^[0-9]{10}$";
    serviceNumberPattern = "^[0-9]{10}$";
    jobPositionPattern = "(^[A-Z]{1}[a-z]{1,17}( [a-z]{17})?$)|(^[А-Я]{1}[а-я]{1,16}( [а-я]{16})?$)";
    licenseSerialNumberPattern = "^[A-ZА-Я]{3}[0-9]{6}$";
    userCategoriesPattern = "^[A-Z]{1}([0-9A-Z]{0,1})?([A-Z]{0,1})?$";
    issuedByPattern = "^[0-9]{4}$";
  
  public DataForm = this.fb.group({
    email: ['', [Validators.email]],
    firstName: ['', [Validators.pattern(this.firstNamePattern)]],
    lastName: ['', [Validators.pattern(this.lastNamePattern)]],
    personalData: this.fb.group({
      address: this.fb.group({
        country: ['', [Validators.pattern(this.lastNamePattern)]],
        region: ['', [Validators.pattern(this.regionPattern)]],
        city: ['', [Validators.pattern(this.cityPattern)]],
        district: ['', [Validators.pattern(this.districtPattern)]],
        street: ['', [Validators.pattern(this.streetPattern)]],
        building: ['', [Validators.pattern(this.buildingPattern)]],
        appartament: 0,
        postalCode: ['', [Validators.pattern(this.postalCodePattern)]]
      }),
      ipn: ['', [Validators.pattern(this.ipnPattern)]],
      serviceNumber: ['', [Validators.pattern(this.serviceNumberPattern)]],
      birthDay: Date,
      jobPosition: ['', [Validators.pattern(this.jobPositionPattern)]],
      userDriverLicense:  this.fb.group({
        licenseSerialNumber: ['', [Validators.pattern(this.licenseSerialNumberPattern)]],
        issuedBy:['', [Validators.pattern(this.issuedByPattern)]],
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
  }
  
  ngOnInit(): void { 
    this.accountService.getPersonalData() 
      .subscribe(
      res => {
        this.accountService.Data = res as Data;
        this.userName= res.firstName[0]+res.lastName[0];
      },
      err => {
          this.isPersonalData=false;
          this.errorMessage = err.error.message;
      });
    }   
    
    onSubmit(DataForm:FormGroup) {
     this.submitted = true;
     if (this.DataForm.invalid) {
      this.toastr.warning('Data not updated');
      return;
     }
    this.accountService.Data=this.DataForm.value;
    this.accountService.Data.personalData.userDriverLicense.userCategories=this.changedCategoriesList;
    this.accountService.putPersonalData().subscribe(
      res=> this.toastr.info("Data update","Success")
      );
    }  
  
  populateForm(selectedRecord:Data){
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
      });
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
