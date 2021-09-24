import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup, FormArray, FormControl}from "@angular/forms";

@Component({
  selector: 'app-euro-protocol',
  templateUrl: './euro-protocol.component.html',
  styleUrls: ['./euro-protocol.component.css']
})

export class EuroProtocolComponent implements OnInit {
  constructor(private router: Router , public accountService:AccountService, public fb: FormBuilder ) { }
  dateFormat = 'yyyy/MM/dd';
  size: NzButtonSize = 'large';
  disabled = true;
  public personalDataForm = this.fb.group({
    email: [''],
    firstName: [''],
    lastName: [''],
    userData: this.fb.group({
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
  optionGroup = [
    { label: 'No one was injured or killed', checked: false },
    { label: 'The drivers did not drink alcohol or drugs', checked: false },
    { label: 'Drivers have insurance policies', checked: false },
    { label: 'The drivers agreed on the circumstances of the accident', checked: false },
    { label: 'Cars without trailers', checked: false }
  ];
  
  isActivFirst = true; 
  isActivSecond = false;
  isActivThird = false; 
  isActivFourth = false;
  isActivFifth = false;
  isActiveSixth = false;
  isActiveSeventh = false;
  isActiveEighth = false;
  isActiveNinth = false;

  

  ngOnInit(): void {
  }
  
  allChecked(): void {
    if (this.optionGroup.every(item => item.checked)) {
      this.disabled = false;
    }else {
      this.disabled = true;
    }
  }

  clickToSecond(): void{
    this.isActivFirst = false;
    this.isActivSecond = true;
  }

  stepBackToFirst(): void{
    this.isActivFirst = true;
    this.isActivSecond = false;
  }

  clickToThird(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = true;
  } 
  
  stepBackToSecond(): void{
    this.isActivFirst = false;
    this.isActivSecond = true;
    this.isActivThird = false;
  }

  clickToFourth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = true;
  } 

  stepBackToThird(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = true;
    this.isActivFourth = false;
  }

  clickToFifth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = true;
  } 

  stepBackToFourth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = true;
    this.isActivFifth = false;
  }

  clickToSixth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = true;
  } 

  stepBackToFifth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = true;
    this.isActiveSixth = false;
  }

  clickToSeventh(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = false;
    this.isActiveSeventh = true;
  } 

  stepBackToSixth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = true;
    this.isActiveSeventh = false;
  }

  clickToEighth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = false;
    this.isActiveSeventh = false;
    this.isActiveEighth = true;
  } 

  stepBackToSeventh(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = false;
    this.isActiveSeventh = true;
    this.isActiveEighth = false;
  }

  clickToNinth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = false;
    this.isActiveSeventh = false;
    this.isActiveEighth = false;
    this.isActiveNinth = true;
  } 

  stepBackToEighth(): void{
    this.isActivFirst = false;
    this.isActivSecond = false;
    this.isActivThird = false;
    this.isActivFourth = false;
    this.isActivFifth = false;
    this.isActiveSixth = false;
    this.isActiveSeventh = false;
    this.isActiveEighth = true;
    this.isActiveNinth = false;
  }

  onSubmit(): void{
    this.router.navigate(['/home']);
  }
}
