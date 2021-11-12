import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarAccident } from 'src/app/models/carAccident';
import { AccountService } from 'src/app/services/account.service';
import { CAService } from 'src/app/services/ca.service';

@Component({
  selector: 'app-participant-ca-protocols',
  templateUrl: './participant-ca-protocols.component.html',
  styleUrls: ['./participant-ca-protocols.component.css']
})
export class ParticipantCAProtocolsComponent implements OnInit {

  public accidentList: CarAccident[];
  public isAccidentListEmpty = true;

  constructor(private accountService: AccountService, private caService: CAService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCaProtocols();
  }

  getCaProtocols() {
    this.caService.getAllCAForParticipant()
      .subscribe((data: any) => {
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
        })
  }
}
