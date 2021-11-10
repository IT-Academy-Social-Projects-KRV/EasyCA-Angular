import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ToastrService } from 'ngx-toastr';
import { CarAccident } from 'src/app/models/carAccident';
import { CAService } from 'src/app/services/ca.service';

@Component({
  selector: 'app-inspector-list-of-driver-ca',
  templateUrl: './inspector-list-of-driver-ca.component.html',
  styleUrls: ['./inspector-list-of-driver-ca.component.css']
})
export class InspectorListOfDriverCaComponent implements OnInit {
  public accidentList: CarAccident[];
  public isAccidentListEmpty = true;
  public isListRequested = false;

  constructor(private caService: CAService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  requestListOfCA(driverLicenseId: string) {
    this.caService.getAllCAByDriverLicenseId(driverLicenseId).subscribe(
      data => {
        this.isListRequested = true;
        this.accidentList = data;
        if (this.accidentList.length > 0) {
          this.isAccidentListEmpty = false;
        }
        else {
          this.toastr.warning("There are no CA protocols registered for this driver", "Warning");
          this.isAccidentListEmpty = true;
        }
      },
      err => {
        this.toastr.error(err, "Error");
        this.isListRequested = false;
        this.isAccidentListEmpty = true;
      }
    );
  }
}
