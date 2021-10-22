import { Component, OnInit } from '@angular/core';
import { CarAccident } from 'src/app/models/carAccident';
import { InspectorService } from 'src/app/services/inspector.service';

@Component({
  selector: 'app-inspector-list-of-car-accidents',
  templateUrl: './inspector-list-of-car-accidents.component.html',
  styleUrls: ['./inspector-list-of-car-accidents.component.css']
})

export class InspectorListOfCarAccidentsComponent implements OnInit {
  accidentList: CarAccident[];
  isAccidentListEmpty = false;
  isVisible = false;

  constructor(private inspectorService: InspectorService) { }

  ngOnInit(): void {
    this.inspectorService.getAllCarAccidentsByInspectorId().subscribe(
      data => {
        if (data.length == 0) {
          this.isAccidentListEmpty = true;
        }
        else {
          this.accidentList = data;
        }
      },
      error => { }
    )
  }

  showModal() {
    this.isVisible = true;
  }

  handleCancel($event: boolean) {
      this.isVisible = $event;
  }
}
