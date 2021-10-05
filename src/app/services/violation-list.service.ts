import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST_URL } from '../configs/config';
import { EuroProtocol } from '../models/euroProtocol';

@Injectable({
  providedIn: 'root'
})
export class ViolationListService {

  constructor(public http: HttpClient) { }

  getEuroProtocolsByEmail(): Observable<EuroProtocol[]> {
    const email = localStorage.getItem('email');
    return this.http.get<EuroProtocol[]>(`${HOST_URL}EuroProtocol/FindAllEuroProtocolsByEmail?email=${email}`);
  }
}
