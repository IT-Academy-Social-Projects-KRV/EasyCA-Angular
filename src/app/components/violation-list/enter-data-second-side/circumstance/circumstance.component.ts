import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Circumstance } from 'src/app/models/Circumstance';
import { Side } from 'src/app/models/Side';
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
  constructor(public euroProtocolService: EuroProtocolService, public toastr: ToastrService) { }

  ngOnInit(): void {
     this.euroProtocolService.getAllCircumstances()
     .subscribe(data =>  this.circumstancesList = data,
      err=>{ 
        this.toastr.warning(err, "Warning");
      });
  }

  @Input() set sideInput(side: Side) {
    this.side = side;
  }

  @Output() createSideEvent = new EventEmitter();
  @Output() sideEvent = new EventEmitter<Side>();
  
  onChange(id:Circumstance, event: any) {
    if(event.target.checked) {
      this.checkedCircumstancesId.push(id.circumstanceId);
    } 
    else {
      let index = this.checkedCircumstancesId.findIndex(x => x == id.circumstanceId);
      this.checkedCircumstancesId.splice(index,1);
    }

    this.side.circumstances=this.checkedCircumstancesId;
    this.sideEvent.emit(this.side);
  }
  
  createSide(){  
    this.sideEvent.emit(this.side); this.createSideEvent.emit();
  }
}
