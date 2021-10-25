import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST_URL } from '../configs/config';

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
}
