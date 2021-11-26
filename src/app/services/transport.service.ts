import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Transport } from '../models/Transport';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class TransportService {
  constructor(private http: HttpClient,  public router: Router, private configuration: AppConfigService) { }  

  getTransportById(id: string): Observable<Transport>{
    return this.http.get<Transport>(`${this.configuration.backendUrl}Transport/GetTransport?transportId=${id}`);
  }

  postTransport(transport: Transport){
    return this.http.post<Transport>(`${this.configuration.backendUrl}Transport/AddTransport`, transport, httpOptions);
  }
  
  putTransport(transport: Transport){
    return this.http.put<Transport>(`${this.configuration.backendUrl}Transport/UpdateTransport`, transport, httpOptions);

  }

  deleteTransport(id:string){
    return this.http.delete(`${this.configuration.backendUrl}Transport/DeleteTransport?transportId=${id}`);
  }


  getAllTransports(): Observable<Transport[]>{    
    return this.http.get<Transport[]>(`${this.configuration.backendUrl}Transport/GetAllTransports`);
  }

  getTransportByCarPlate(carPlate: string): Observable<Transport>{
    return this.http.get<Transport>(`${this.configuration.backendUrl}Transport/GetTransportByCarPlate?carPlate=${carPlate}`);
  }
}
