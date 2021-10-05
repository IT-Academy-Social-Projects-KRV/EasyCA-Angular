import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Data } from 'src/app/models/data';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-personal-data-modal',
  templateUrl: './personal-data-modal.component.html',
  styleUrls: ['./personal-data-modal.component.css']
})
export class PersonalDataModalComponent implements OnInit {

  public isVisible = false;
  public data:Data;

  @Input() set setData(data: Data){
    this.data=data;
  }

  @Input() set setVisible(isVisible: boolean) {
    this.isVisible = isVisible;
      this.populateForm(); 
  }
  
  @Output() isVisibleEvent = new EventEmitter<boolean>();
  @Output() submittedEvent=new EventEmitter<Data>();

  checkedCategoriesList: string[] = [];

  constructor(public fb: FormBuilder, public accountService: AccountService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

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
      userDriverLicense: this.fb.group({
        licenseSerialNumber: [''],
        issuedBy: [''],
        expirationDate: Date,
        
      }),
      userCars: [],
    })
  });

  categoriesSeed = [
    { value: "A1", checked: false },
    { value: "A", checked: false },
    { value: "B1", checked: false },
    { value: "B", checked: false },
    { value: "C1", checked: false },
    { value: "C", checked: false },
    { value: "D1", checked: false },
    { value: "D", checked: false },
    { value: "T", checked: false },
    { value: "BE", checked: false },
    { value: "C1E", checked: false },
    { value: "CE", checked: false },
    { value: "D1E", checked: false },
    { value: "DE", checked: false }];

  handleCancel(): void {
    this.isVisibleEvent.emit(false);
  }

  onSubmit(DataForm: FormGroup) {
  
    if (this.DataForm.invalid) {
      this.toastr.warning('Data not updated');
      return;
    }

    this.data=DataForm.value;
    this.data.personalData.userDriverLicense.userCategories = this.checkedCategoriesList;
    this.submittedEvent.emit(this.data);
  }
  onChange(event: any) {
    this.checkedCategoriesList = event;
    console.log(this.checkedCategoriesList);
  }

  populateForm() {
    if(this.data.personalData!=null)
    {
      let personalData = this.data.personalData;
      let address = personalData.address;
      let driverLicense = personalData.userDriverLicense;
      
      console.log(this.data);
      if(driverLicense.userCategories!=null)
      {
        this.categoriesSeed.forEach(x => {
          x.checked = driverLicense.userCategories.some(y => y === x.value);
        });
      }
      
      this.checkedCategoriesList = driverLicense.userCategories;
      let userCars = personalData.userCars;
      
      this.DataForm.setValue(
        {
          email: this.data.email,
          firstName: this.data.firstName,
          lastName: this.data.lastName,
          personalData: {
            address: {
              country: address.country,
              region: address.region,
              city: address.city,
              district: address.district,
              street: address.street,
              building: address.building,
              appartament: address.appartament,
              postalCode: address.postalCode
            },
            ipn: personalData.ipn,
            serviceNumber: personalData.serviceNumber,
            birthDay: personalData.birthDay,
            jobPosition: personalData.jobPosition,
            userDriverLicense: {
              licenseSerialNumber: driverLicense.licenseSerialNumber,
              issuedBy: driverLicense.issuedBy,
              expirationDate: driverLicense.expirationDate
            },
            userCars: userCars
          }
        });
      }
    }
    }
    