import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EuroProtocol } from '../models/euroProtocol';
import { Circumstance } from '../models/circumstance';
import { Observable } from 'rxjs';
import { Side } from '../models/side';
import { AppConfigService } from './app-config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class EuroProtocolService {

  constructor(private http: HttpClient,  public router: Router, private configuration: AppConfigService) { }

  registerSideBEuroProtocol(side:Side):Observable<Side>{
    return this.http.post<Side>(`${HOST_URL}EuroProtocol/RegisterSideBEuroProtocol`, side, httpOptions);
  } 

  getAllCircumstances(){
    return this.http.get<any>(`${this.configuration.backendUrl}EuroProtocol/GetAllCircumstances`);
  }
  
  createEuroProtocol(protocol: EuroProtocol){
    return this.http.post<any>(`${this.configuration.backendUrl}EuroProtocol/CreateEuroProtocol`, protocol, httpOptions);
  }
}
