import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  isActivDriverLicense = false;
  constructor(private router: Router) { }

  clickProfile(){
    this.isActivInfo = false;
    this.isActivTransport = false;
    this.isActivViolation = false;
    this.isActivDriverLicense = false;
    this.isActivetead = true;
  }
  clickTransport(){
    this.isActivInfo = false;
    this.isActivetead = false;
    this.isActivViolation = false;
    this.isActivDriverLicense = false;
    this.isActivTransport = true;
  }
  clickViolation(){
    this.isActivInfo = false;
    this.isActivetead = false;
    this.isActivTransport = false;
    this.isActivDriverLicense = false;
    this.isActivViolation = true;
  }
  clickDriverLicense(){
    this.isActivInfo = false;
    this.isActivetead = false;
    this.isActivTransport = false;
    this.isActivViolation = false;
    this.isActivDriverLicense = true;
  }
  ngOnInit(): void { }
}