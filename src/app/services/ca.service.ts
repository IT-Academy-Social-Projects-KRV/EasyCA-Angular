import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST_URL } from '../configs/config';
import { CarAccident } from '../models/carAccident';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class CAService {
  constructor(private http: HttpClient, public router: Router) { }

  getCAProtocol() {
    return this.http.get<any>(`${HOST_URL}CarAccident/CarAccident`);
  }

  updateCAProtocol(protocol: CarAccident){
    return this.http.put<any>(`${HOST_URL}CarAccident/CarAccident`,protocol, httpOptions);
  }

  addCAProtocol(protocol: CarAccident){
    return this.http.post<any>(`${HOST_URL}CarAccident/CarAccident`, protocol, httpOptions);
  }
}
