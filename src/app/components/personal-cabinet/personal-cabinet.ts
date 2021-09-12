import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { PersonalData } from 'src/app/models/personalData';
import { FormBuilder, FormGroup, FormArray, FormControl}from "@angular/forms";
import { NzButtonSize } from 'ng-zorro-antd/button';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-cabinet',
  templateUrl: './personal-cabinet.component.html',
  styleUrls: ['./personal-cabinet.component.css']
})

export class PersonalCabinetComponent implements OnInit {
  constructor(private router: Router, public accountService: AccountService,
    private toastr:ToastrService, public fb: FormBuilder ) { }
    size: NzButtonSize = 'large';
    isVisible = false;
    isConfirmLoading = false;
    isPersonalData=true;
  
  public personalDataForm = this.fb.group({
    email: [''],
    firstName: [''],
    lastName: [''],
    userData: this.fb.group({
      userAddress: this.fb.group({
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
        expirationDate: Date,
        userCategories: [],
      }),
      userCars: [],
    })
   });
    
  log(value: string[]): void {
      console.log(value);
    }
  
  ngOnInit(): void { 
    this.accountService.getPersonalData();
    if(this.accountService.personalData.userData==null)
   this.isPersonalData=false;
  }   

   onSubmit(personalDataForm:FormGroup) {
    this.accountService.personalData=this.personalDataForm.value;
    this.accountService.putPersonalData().subscribe(
      res=> this.toastr.info("Data update","congratulation"),
      err=>  console.log(err)
    );
  }

  populateForm(selectedRecord:PersonalData){
     console.log("work");
       this.personalDataForm.setValue(
      {
          email: selectedRecord.email,
          firstName: selectedRecord.firstName,
          lastName: selectedRecord.lastName,
          userData: {
            userAddress: {
              country: selectedRecord.userData.userAddress.country,
              region: selectedRecord.userData.userAddress.region,
              city: selectedRecord.userData.userAddress.city,
              district: selectedRecord.userData.userAddress.district,
              street: selectedRecord.userData.userAddress.street, 
              building: selectedRecord.userData.userAddress.building, 
              appartament: selectedRecord.userData.userAddress.appartament, 
              postalCode: selectedRecord.userData.userAddress.postalCode
            },
            ipn: selectedRecord.userData.ipn,
            serviceNumber:  selectedRecord.userData.serviceNumber,
            birthDay:  selectedRecord.userData.birthDay,
            jobPosition:  selectedRecord.userData.jobPosition,
            userDriverLicense: {
              licenseSerialNumber:  selectedRecord.userData.userDriverLicense.licenseSerialNumber,
              expirationDate: selectedRecord.userData.userDriverLicense.expirationDate,
              userCategories: selectedRecord.userData.userDriverLicense.userCategories,
            },
            userCars: selectedRecord.userData.userCars
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
