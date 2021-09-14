import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { HOST_URL} from '../config';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class AccountService {
  constructor(private http: HttpClient,  public router: Router, private tokenStorageService: TokenStorageService, private cookieService: CookieService) { }

  login(user:User) {
    return this.http.post<any>(`${HOST_URL}Account/Login`, user, httpOptions);
  }
  register(user:User): Observable<any> {
    user.clientURI="http://localhost:4200/emailVerify";
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    this.cookieService.delete('refresh-token');
    this.router.navigate(['/signin']);
  }
  confirmEmail(route:string,token:string,email:string){
    return this.http.get<any>(`${HOST_URL}${route}/${token}/${email}`);
  }
}
