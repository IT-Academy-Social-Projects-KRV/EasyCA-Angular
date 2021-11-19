import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { RefreshToken } from '../models/RefreshToken';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AppConfigService } from './app-config.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  refreshTokenRequest:RefreshToken;
  constructor(private http:HttpClient, private cookieService: CookieService, private configuration: AppConfigService) {
    this.refreshTokenRequest = {} as RefreshToken;
  }

  getToken() {
    return window.localStorage.getItem('access_token');
  }

  checkRefreshToken(): Observable<RefreshToken> {
    let token=this.cookieService.get('refresh-token')
    this.refreshTokenRequest.refreshToken = (token !== null) ? token: "empty";
    return this.http.post<any>(`${this.configuration.backendUrl}Auth/RefreshToken`,this.refreshTokenRequest, httpOptions);
  } 
}
