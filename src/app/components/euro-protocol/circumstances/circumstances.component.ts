import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Circumstance } from 'src/app/models/Circumstance';
import { EuroProtocol } from 'src/app/models/EuroProtocol';
import { EuroProtocolService } from 'src/app/services/euroProtocolService';

@Component({
  selector: 'app-circumstances',
  templateUrl: './circumstances.component.html',
  styleUrls: ['./circumstances.component.css']
})
export class CircumstancesComponent implements OnInit {

  public checkedCircumstancesId: number[] = [];
  public list: Array<{ id: number, value: string, checked: boolean }> = [];
  public euroProtocol: EuroProtocol;
  public isCircumstances = false;

  constructor(public service: EuroProtocolService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCircumstances();
  }

  @Input() set euroProtocolInput(euroProtocol: EuroProtocol) {
    this.euroProtocol = euroProtocol;
  }

  @Output() indexChangedEvent = new EventEmitter<number>();
  @Output() euroProtocolEvent = new EventEmitter<EuroProtocol>();

  onChange(id: number) {
    let index = this.list.findIndex(x => x.id == id);
    this.list[index].checked = !this.list[index].checked;

    this.isCircumstances = this.list.filter(x => x.checked == true).length > 0 ? true : false;
  }

  changePage(index: number) {
    this.setEuroProtocol();
    this.indexChangedEvent.emit(index);
  }

  setEuroProtocol() {
    this.list.forEach(element => {
      if (element.checked) {
        this.checkedCircumstancesId.push(element.id);
      }
    });

    this.euroProtocol.sideA.circumstances = this.checkedCircumstancesId;
    this.euroProtocolEvent.emit(this.euroProtocol);
  }

  getCircumstances() {
    this.service.getAllCircumstances()
      .subscribe((data: Circumstance[]) => {

        data.forEach(element => {
          this.list.push({ id: element.circumstanceId, value: element.circumstanceName, checked: false });
        });

        if (this.euroProtocol.sideA.circumstances) {
          for (let i = 0; i < this.euroProtocol.sideA.circumstances.length; i++) {
            this.list[this.euroProtocol.sideA.circumstances[i] - 1].checked = true;
          }
          this.isCircumstances = this.list.filter(x => x.checked == true).length > 0 ? true : false;
        }
      },
        err => {
          this.toastr.warning("Warning", err.error.message);
        });
  }
}
