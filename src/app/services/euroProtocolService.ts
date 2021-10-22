import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST_URL} from '../configs/config';
import { EuroProtocol } from '../models/euroProtocol';
import { Circumstance } from '../models/circumstance';
import { Observable } from 'rxjs';
import { Side } from '../models/side';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class EuroProtocolService {
  constructor(private http: HttpClient,  public router: Router) { }
  
  registerSideBEuroProtocol(side:Side):Observable<Side>{
    return this.http.post<Side>(`${HOST_URL}EuroProtocol/RegisterSideBEuroProtocol`, side, httpOptions);
  }
  getAllCircumstances(): Observable<Circumstance[]> {
    return this.http.get<Circumstance[]>(`${HOST_URL}EuroProtocol/GetAllCircumstances`);
  }
  createEuroProtocol(protocol: EuroProtocol){
    return this.http.post<any>(`${HOST_URL}EuroProtocol/CreateEuroProtocol`, protocol, httpOptions);
  }
}
