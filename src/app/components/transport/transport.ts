import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Transport } from 'src/app/models/Transport';
import { TransportService } from 'src/app/services/transport.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})

export class TransportComponent implements OnInit {
  transportForm: FormGroup;

  constructor(private transportService: TransportService, private router: Router, public fb: FormBuilder) { 
    this.transportForm = this.fb.group({
      producedBy:[''],
      model:[''],
      vinCode: [''],
      categoryName: [''],
      carPlate: [''],
      color: [''],
      yearOfProduction: [''],
      insuarenceNumber: ['']
    })
  }

  ngOnInit(): void { }

  onSubmit(){
    this.transportService.addTransport(this.transportForm.value)
    .subscribe((data:any)=>{
      console.log(data);
    });
  }
}
