import { Component, Input, OnInit } from '@angular/core';
import { UserDriverLicense } from 'src/app/models/userDriverLicense';

@Component({
  selector: 'app-driver-license',
  templateUrl: './driver-license.component.html',
  styleUrls: ['./driver-license.component.css']
})
export class DriverLicenseComponent implements OnInit {

  public license: UserDriverLicense;

  @Input() set setLicense(info: UserDriverLicense) {
    this.license = info;
  };

  constructor() { }

  ngOnInit(): void {
  }

}
