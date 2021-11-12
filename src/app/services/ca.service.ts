import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST_URL } from '../configs/config';
import { CarAccident } from '../models/carAccident';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class CAService {
  constructor(private http: HttpClient, public router: Router) { }

  getAllCarAccidentsByInspectorId(): Observable<CarAccident[]> {
    return this.http.get<CarAccident[]>(`${HOST_URL}CarAccident/GetAllCAByInspector`);
  }

  updateCAProtocol(protocol: CarAccident){
    return this.http.put<any>(`${HOST_URL}CarAccident/UpdateCA`,protocol, httpOptions);
  }

  addCAProtocol(protocol: CarAccident){
    return this.http.post<any>(`${HOST_URL}CarAccident/CreateCA`, protocol, httpOptions);
  }

  getAllCAByDriverLicenseId(driverLicenseId: string): Observable<CarAccident[]> {
    return this.http.get<CarAccident[]>(`${HOST_URL}CarAccident/GetAllPersonsCAByInspector?personDriverId=${driverLicenseId}`);
  }

  getAllCAForParticipant(){
    return this.http.get<CarAccident[]>(`${HOST_URL}CarAccident/GetAllCAProtocolsByPerson`);
  }
}
