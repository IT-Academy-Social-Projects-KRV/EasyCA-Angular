import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Side } from '../models/side';
import { EuroProtocol } from '../models/EuroProtocol';
import { AppConfigService } from './app-config.service';
import { Circumstance } from '../models/Circumstance';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class EuroProtocolService {

  constructor(private http: HttpClient,  public router: Router, private configuration: AppConfigService) { }

  registerSideBEuroProtocol(side:Side):Observable<Side>{
    return this.http.post<Side>(`${this.configuration.backendUrl}EuroProtocol/RegisterSideBEuroProtocol`, side, httpOptions);
  } 
  
  getAllCircumstances(): Observable<Circumstance[]>{
    return this.http.get<Circumstance[]>(`${this.configuration.backendUrl}EuroProtocol/GetAllCircumstances`);
  }
  
  createEuroProtocol(protocol: EuroProtocol){
    return this.http.post<any>(`${this.configuration.backendUrl}EuroProtocol/CreateEuroProtocol`, protocol, httpOptions);
  }
}
