import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Inspector } from '../models/Inspector';
import { AppConfigService } from './app-config.service';
import { CarAccident } from '../models/CarAccident';
import { EuroProtocol } from '../models/EuroProtocol';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private http: HttpClient,  public router: Router, private configuration: AppConfigService) { }
   
  registerInspector(inspector: Inspector): Observable<any> {
    return this.http.post<any>(`${this.configuration.backendUrl}Admin/AddInspectors`, inspector, httpOptions)  
  }

  getListInspectors(): Observable<Inspector[]> {
    return this.http.get<Inspector[]>(`${this.configuration.backendUrl}Admin/GetAllInspectors`);
  }
  
  deleteInspector(email: string) {
    return this.http.put<any>(`${this.configuration.backendUrl}Admin/DeleteInspectorRole`, { email });
  }
  
  getAllEuroProtocols(): Observable<EuroProtocol[]> {
   return this.http.get<EuroProtocol[]>(`${this.configuration.backendUrl}Admin/GetAllEuroProtocols`);
  }
  
  getAllCAProtocols(): Observable<CarAccident[]> {
    return this.http.get<CarAccident[]>(`${this.configuration.backendUrl}Admin/GetAllCAProtocols`);
   }
}
