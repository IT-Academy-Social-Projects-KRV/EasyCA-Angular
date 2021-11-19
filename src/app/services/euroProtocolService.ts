import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { EuroProtocol } from '../models/euroProtocol';
import { AppConfigService } from './app-config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class EuroProtocolService {
  constructor(private http: HttpClient,  public router: Router, private configuration: AppConfigService) { }

  getAllCircumstances(){
    return this.http.get<any>(`${this.configuration.backendUrl}EuroProtocol/GetAllCircumstances`);
  }

  createEuroProtocol(protocol: EuroProtocol){
    return this.http.post<any>(`${this.configuration.backendUrl}EuroProtocol/CreateEuroProtocol`, protocol, httpOptions);
  }
}
