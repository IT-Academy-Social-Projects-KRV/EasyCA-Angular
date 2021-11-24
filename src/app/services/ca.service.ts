import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CarAccident } from '../models/CarAccident';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class CAService {
  constructor(private http: HttpClient, public router: Router, private configuration: AppConfigService) { }

  getAllCarAccidentsByInspectorId(): Observable<CarAccident[]> {
    return this.http.get<CarAccident[]>(`${this.configuration.backendUrl}CarAccident/GetAllCAByInspector`);
  }

  updateCAProtocol(protocol: CarAccident){
    return this.http.put<any>(`${this.configuration.backendUrl}CarAccident/UpdateCA`,protocol, httpOptions);
  }

  addCAProtocol(protocol: CarAccident){
    return this.http.post<any>(`${this.configuration.backendUrl}CarAccident/CreateCA`, protocol, httpOptions);
  }

  getAllCAByDriverLicenseId(driverLicenseId: string): Observable<CarAccident[]> {
    return this.http.get<CarAccident[]>(`${this.configuration.backendUrl}CarAccident/GetAllPersonsCAByInspector?personDriverId=${driverLicenseId}`);
  }

  getAllCAForParticipant(): Observable<CarAccident[]>{
    return this.http.get<CarAccident[]>(`${this.configuration.backendUrl}CarAccident/GetAllCAProtocolsByPerson`);
  }
}
