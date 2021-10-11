import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST_URL } from '../configs/config';
import { User } from '../models/User';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  constructor(private http: HttpClient,  public router: Router) { }
   
  registerInspector(user:User): Observable<any> {
    return this.http.post<any>(`${HOST_URL}Auth/AddInspector`, user, httpOptions)   
  }

  getListInspectors() {
   return this.http.get<any>(`${HOST_URL}Admin/GetAllInspectors`);
  }
 
  getAllEuroProtocols() {
   return this.http.get<any>(`http://localhost:5001/api/Admin/GetAllEuroProtocols`);
  }
}
