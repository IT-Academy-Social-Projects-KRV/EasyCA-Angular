import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { PersonalData } from 'src/app/models/personalData';

@Component({
  selector: 'app-personal-cabinet',
  templateUrl: './personal-cabinet.component.html',
  styleUrls: ['./personal-cabinet.component.css']
})

export class PersonalCabinetComponent implements OnInit {
  isActivInfo = true;
  isActivetead = false;
  isActivTransport = false;
  isActivViolation = false;
  
  public personalData: PersonalData;
  public userName: string;

  constructor(private router: Router, public accountService: AccountService) { 
    this.personalData = {} as PersonalData;
    this.userName = ""; 
  }

  clickPersonalData(){
    this.isActivTransport = false;
    this.isActivViolation = false;
    this.isActivetead = false;
    this.isActivInfo = true;
  }
  clickProfile(){
    this.isActivInfo = false;
    this.isActivTransport = false;
    this.isActivViolation = false;
    this.isActivetead = true;
  }
  clickTransport(){
    this.isActivInfo = false;
    this.isActivetead = false;
    this.isActivViolation = false;
    this.isActivTransport = true;
  }
  clickViolation(){
    this.isActivInfo = false;
    this.isActivetead = false;
    this.isActivTransport = false;
    this.isActivViolation = true;
  }
  ngOnInit(): void { 
    this.accountService.getPersonalData()
    .subscribe((data: any) => {
      this.personalData = data;
    });

    this.accountService.getUserById()
    .subscribe((data: any)=>{
      this.userName = data.firstName[0]+data.lastName[0];
    });
  }
}
