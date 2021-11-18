import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Inspector } from '../models/inspector';
import { AppConfigService } from './app-config.service';

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

  getListInspectors() {
    return this.http.get<any>(`${this.configuration.backendUrl}Admin/GetAllInspectors`);
  }
  
  deleteInspector(email: string) {
    return this.http.put<any>(`${this.configuration.backendUrl}Admin/DeleteInspectorRole`, { email });
  }
  
  getAllEuroProtocols() {
   return this.http.get<any>(`${this.configuration.backendUrl}Admin/GetAllEuroProtocols`);
  }
  
  getAllCAProtocols() {
    return this.http.get<any>(`${this.configuration.backendUrl}Admin/GetAllCAProtocols`);
   }
}
