import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST_URL} from '../config';
import { Observable } from 'rxjs';
import { Transport } from '../models/Transport';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class TransportService {
  constructor(private http: HttpClient,  public router: Router) { }
 
  addTransport(transport: Transport): Observable<any>{
    return this.http.post<any>(`${HOST_URL}Transport/AddTransport`, transport, httpOptions)
  }
}
