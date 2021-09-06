import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { HOST_URL} from '../config';
import { User } from '../models/User';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class AccountService {
  constructor(private http: HttpClient,  public router: Router, private tokenStorageService: TokenStorageService) { }

  login(user:User) {
    return this.http.post<any>(`${HOST_URL}Account/Login`, user, httpOptions);
  }
  register(user:User): Observable<any> {
    return this.http.post<any>(`${HOST_URL}Account/Register`, user, httpOptions)   
  }

  get isLoggedIn(): boolean {
    const authToken = this.tokenStorageService.getToken();
    return (authToken !== null) ? true : false;
  }

  get userRole(){
     return localStorage.getItem('role');
  }

  getPersonalData() {
    return this.http.get<any>(`${HOST_URL}Account/GetPersonalData`);
  } 
  
  getUserById(){
    return this.http.get<any>(`${HOST_URL}Account/GetUserById`);
  }
  
  logout() {
    const removeToken = localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    if (removeToken == null) {
      this.router.navigate(['/signin']);
    }
  }
}