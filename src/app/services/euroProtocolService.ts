import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST_URL} from '../configs/config';
import { EuroProtocol } from '../models/euroProtocol';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class EuroProtocolService {
  constructor(private http: HttpClient,  public router: Router) { }

  getAllCircumstances(){
    return this.http.get<any>(`${HOST_URL}EuroProtocol/GetAllCircumstances`);
  }

  createEuroProtocol(protocol: EuroProtocol){
    return this.http.post<any>(`${HOST_URL}EuroProtocol/CreateEuroProtocol`, protocol, httpOptions);
  }
}
