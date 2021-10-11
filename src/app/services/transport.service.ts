import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST_URL} from '../configs/config';
import { Transport } from '../models/Transport';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class TransportService {
  constructor(private http: HttpClient,  public router: Router) { }
  formData: Transport;

  postTransport(){
    return this.http.post<any>(`${HOST_URL}Transport/AddTransport`, this.formData, httpOptions);
  }
  
  putTransport(){
    return this.http.put<any>(`${HOST_URL}Transport/UpdateTransport`, this.formData, httpOptions);
  }

  deleteTransport(id:string){
    return this.http.delete(`${HOST_URL}Transport/DeleteTransport?transportId=${id}`);
  }

  refreshList(){    
    return this.http.get(`${HOST_URL}Transport/GetAllTransports`);
  }

  getTransportByCarPlate(carPlate: string){
    return this.http.get(`${HOST_URL}Transport/GetTransportByCarPlate?carPlate=${carPlate}`);
  }
}
