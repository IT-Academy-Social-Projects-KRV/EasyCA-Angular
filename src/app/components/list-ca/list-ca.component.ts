import { Component, OnInit } from '@angular/core';
import { EuroProtocol } from 'src/app/models/euroProtocol';

@Component({
  selector: 'app-list-ca',
  templateUrl: './list-ca.component.html',
  styleUrls: ['./list-ca.component.css']
})
export class ListCAComponent implements OnInit {

  list: EuroProtocol[] = [];
  public isAdd = true;
  public isVisible = false;
  constructor() { }
  
  ngOnInit(): void {
  }

  showModal() {
      this.isAdd = true;
      this.isVisible = true;
  }

  showModalEdit(){
      this.isAdd = false;
      this.isVisible = true;
  }

  handleCancel($event: boolean){
      this.isVisible = $event;
  }

}
