import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EuroProtocolFullModel } from '../models/EuroProtocolFullModel';
import { EuroProtocolSimpleModel } from '../models/EuroProtocolSimpleModel';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ViolationListService {

  constructor(public http: HttpClient, private configuration: AppConfigService) { }

  getAllEuroProtocolsByEmail(email:string): Observable<EuroProtocolSimpleModel[]> {
    return this.http.get<EuroProtocolSimpleModel[]>(`${this.configuration.backendUrl}EuroProtocol/FindAllEuroProtocolsByEmail?email=${email}`);
  }

  getEuroProtocolBySerialNumber(serialNumber: string): Observable<EuroProtocolFullModel> {
    return this.http.get<EuroProtocolFullModel>(`${this.configuration.backendUrl}EuroProtocol/GetEuroProtocolBySerialNumber?serialNumber=${serialNumber}`);
  }
}
