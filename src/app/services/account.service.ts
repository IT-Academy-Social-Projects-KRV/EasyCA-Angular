import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { HOST_URL, RESEND_CONFIRMATION_URI} from '../config';
import { RESTORE_PASSWORD_URI } from '../config';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { RestorePassword } from '../models/restorePassword';
import { Data } from '../models/data';
import { CookieService } from 'ngx-cookie-service';
import { ResendConfirmation } from '../models/resendConfirmation';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class AccountService {
  constructor(private http: HttpClient,  public router: Router, private tokenStorageService: TokenStorageService, private cookieService: CookieService) { }
  Data: Data;
  errorMessage = '';
   
  login(user:User) {
    return this.http.post<any>(`${HOST_URL}Auth/Login`, user, httpOptions);
  }

  register(user:User): Observable<any> {
    user.clientURI="http://localhost:4200/emailVerify";
    return this.http.post<any>(`${HOST_URL}Auth/Register`, user, httpOptions)   
  }

  get isLoggedIn(): boolean {
    const authToken = this.tokenStorageService.getToken();
    return (authToken !== null) ? true : false;
  }

  get userRole(){
     return localStorage.getItem('role');
  }

  putPersonalData(){
    return this.http.put<any>(`${HOST_URL}Account/UpdateData`, this.Data, httpOptions);
  }

  getPersonalData() {
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

  forgotPassword(data: RestorePassword ) {
    console.log(data);
    data.passwordURI = RESTORE_PASSWORD_URI;
    return this.http.post<any>(`${HOST_URL}Auth/ForgotPassword`, data, httpOptions);
  }

  restorePassword(route:string,token:string,email:string,password:string) {
    return this.http.get<any>(`${HOST_URL}${route}/${password}/${token}/${email}`);
  }

  resendConfirmation(data:ResendConfirmation) {
    data.resendConfirmationURI = RESEND_CONFIRMATION_URI;
    return this.http.post<any>(`${HOST_URL}Auth/ResendConfirmation`, data, httpOptions);
  }
}
