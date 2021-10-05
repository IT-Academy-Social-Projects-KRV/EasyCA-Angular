import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Data } from 'src/app/models/data';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { PersonalData } from 'src/app/models/personalData';

@Component({
  selector: 'app-personal-cabinet',
  templateUrl: './personal-cabinet.component.html',
  styleUrls: ['./personal-cabinet.component.css']
})

export class PersonalCabinetComponent implements OnInit {
  public userName: string;

  public data:Data={ 
  email: 'OKorniichuk03@gmail.com',
  firstName: '',
  lastName: '',
  personalData: <PersonalData>{
    address:{
      country: '',
      region: '',
      city: '',
      district: '',
      street: '',
      building: '',
      appartament: 0,
      postalCode: ''
    },
    ipn: '',
    serviceNumber: '',
    birthDay:new Date(),
    jobPosition: '',
    userDriverLicense:{
      licenseSerialNumber:'',
      issuedBy:'',
      expirationDate:new Date(),
    },
    userCars:<Array<string>>{}
  }};

  public isVisible = false;
  public isPersonalData = false;
  public errorMessage = '';
  public Icon = this.fb.group({
    name: ['']
  });

  constructor(public accountService: AccountService, private toastr: ToastrService, public fb: FormBuilder) {
    this.userName = "";
  }

  ngOnInit(): void {
    console.log(this.data);
    this.accountService.getPersonalData()
      .subscribe(
        res => {
          this.data = res;
          console.log(this.data);
          this.userName = res.firstName[0] + res.lastName[0];         
          
          if(this.data.personalData!=null)
          {
            this.isPersonalData = true;
          }

        },
        err => {
          this.isPersonalData = false;
          this.errorMessage = err.error.message;
        });
  }

  receiveVisible($event: boolean) {
    this.isVisible = $event;
  }

  update($event:Data)
  {
     this.accountService.putPersonalData($event).subscribe(
      res => {
       this.toastr.info(res.message,"Success") ;   
       this.isVisible=false;
       this.data=$event;
      },
      err=>
      {
        this.toastr.warning('Data not updated',err.error.message);    
      }    
    );
  }
}
