import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { RestorePassword } from '../models/restorePassword';
import { Data } from '../models/data';
import { CookieService } from 'ngx-cookie-service';
import { ResendConfirmation } from '../models/resendConfirmation';
import { PersonalData } from '../models/personalData';
import { ChangePassword } from '../models/changePassword';
import { AppConfigService } from './app-config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class AccountService {
  constructor(private http: HttpClient, public router: Router, private tokenStorageService: TokenStorageService, private cookieService: CookieService, private configuration: AppConfigService) { }
  errorMessage = '';

  login(user: User) {
    return this.http.post<any>(`${this.configuration.backendUrl}Auth/Login`, user, httpOptions);
  }

  register(user: User): Observable<any> {
    user.clientURI = this.configuration.emailConfirmationUrl;
    return this.http.post<any>(`${this.configuration.backendUrl}Auth/Register`, user, httpOptions)
  }

  get isLoggedIn(): boolean {
    const authToken = this.tokenStorageService.getToken();
    return (authToken !== null) ? true : false;
  }

  get userRole() {
    return localStorage.getItem('role');
  }

  putPersonalData(data: Data) {
    return this.http.put<any>(`${this.configuration.backendUrl}Account/UpdateData`, data, httpOptions);
  }

  getPersonalData() {
    return this.http.get<any>(`${this.configuration.backendUrl}Account/GetUserById`);
  }

  addPersonalData(data: PersonalData) {
    return this.http.post<any>(`${this.configuration.backendUrl}Account/CreatePersonalData`, data, httpOptions);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    this.cookieService.delete('refresh-token');
    this.router.navigate(['/signin']);
  }

  confirmEmail(route: string, token: string, email: string) {
    return this.http.get<any>(`${this.configuration.backendUrl}${route}/${token}/${email}`);
  }

  forgotPassword(data: RestorePassword) {
    data.passwordURI = this.configuration.restorePasswordUrl;
    return this.http.post<any>(`${this.configuration.backendUrl}Auth/ForgotPassword`, data, httpOptions);
  }

  restorePassword(route: string, token: string, email: string, password: string) {
    return this.http.get<any>(`${this.configuration.backendUrl}${route}/${password}/${token}/${email}`);
  }

  resendConfirmation(data: ResendConfirmation) {
    data.resendConfirmationURI = this.configuration.emailConfirmationUrl;
    return this.http.post<any>(`${this.configuration.backendUrl}Auth/ResendConfirmation`, data, httpOptions);
  }
  
  changePassword(data:ChangePassword) {
    return this.http.post<any>(`${this.configuration.backendUrl}Account/ChangePassword`,data,httpOptions);
  }
}
