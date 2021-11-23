import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Circumstance } from 'src/app/models/circumstance';
import { Side } from 'src/app/models/side';
import { EuroProtocolService } from 'src/app/services/euroProtocolService';

@Component({
  selector: 'app-circumstance',
  templateUrl: './circumstance.component.html',
  styleUrls: ['./circumstance.component.css']
})
export class CircumstanceComponent implements OnInit {
  private side:Side;
    
  public circumstancesList: Circumstance[];
  public checkedCircumstancesId: number[]=[];
  public index: number;
  constructor(public euroProtocolService: EuroProtocolService) { }
  ngOnInit(): void {
     this.euroProtocolService.getAllCircumstances()
     .subscribe(data =>  this.circumstancesList = data,
      err=>{ console.log(err);
      });
  }
  @Input() set sideInput(side: Side) {
    this.side = side;
  }
  @Input() set indexInput($event: number) {
    this.index = $event;
  }
  @Output() createSideEvent = new EventEmitter();
  @Output() sideEvent = new EventEmitter<Side>();
  @Output() indexChangedEvent = new EventEmitter<number>();
  
  onChange(id:Circumstance, event: any) {
    if(event.target.checked) {
      this.checkedCircumstancesId.push(id.circumstanceId);
    } else {
      let index = this.checkedCircumstancesId.findIndex(x => x == id.circumstanceId);
      this.checkedCircumstancesId.splice(index,1);
    }
    console.log(this.checkedCircumstancesId);

    this.side.circumstances=this.checkedCircumstancesId;
    this.sideEvent.emit(this.side);
  }
  // changePage(index: number) {   
  //   this.indexChangedEvent.emit(index);  
  // }
  createSide(){   this.sideEvent.emit(this.side); this.createSideEvent.emit();}
}
