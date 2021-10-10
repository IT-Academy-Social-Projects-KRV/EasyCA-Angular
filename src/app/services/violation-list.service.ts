import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST_URL } from '../config';
import { EuroProtocolFullModel } from '../models/euroProtocolFullModel';
import { EuroProtocolSimpleModel } from '../models/euroProtocolSimpleModel';

@Injectable({
  providedIn: 'root'
})
export class ViolationListService {

  constructor(public http: HttpClient) { }

  getAllEuroProtocolsByEmail(): Observable<EuroProtocolSimpleModel[]> {
    const email = localStorage.getItem('email');
    return this.http.get<EuroProtocolSimpleModel[]>(`${HOST_URL}EuroProtocol/FindAllEuroProtocolsByEmail?email=${email}`);
  }

  getEuroProtocolBySerialNumber(serialNumber: string): Observable<EuroProtocolFullModel> {
    return this.http.get<EuroProtocolFullModel>(`${HOST_URL}EuroProtocol/GetEuroProtocolBySerialNumber?serialNumber=${serialNumber}`);
  }
}
