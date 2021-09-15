import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST_URL} from '../config';
import { Transport } from '../models/transport';
import { Insuarance } from '../models/insuarance';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class TransportService {
  constructor(private http: HttpClient,  public router: Router) { }

  formData: Transport ;
  list: Transport[] = [];
  isEmpty=true;

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
    this.http.get<any>(`${HOST_URL}Transport/GetAllTransports`) 
    .toPromise()
    .then(res => this.list = res as Transport[] )
    console.log(this.formData)    
    if(this.list.length>0){
      this.isEmpty = false;}    
  }  
}
