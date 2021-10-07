import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HOST_URL} from '../configs/config';
import { RefreshToken } from '../models/RefreshToken';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  refreshTokenRequest:RefreshToken;
  constructor(private http:HttpClient,private cookieService: CookieService) {
    this.refreshTokenRequest = {} as RefreshToken;
  }

  getToken() {
    return window.localStorage.getItem('access_token');
  }

  checkRefreshToken(): Observable<RefreshToken> {
    let token=this.cookieService.get('refresh-token')
    this.refreshTokenRequest.refreshToken = (token !== null) ? token: "empty";
    return this.http.post<any>(`${HOST_URL}Auth/RefreshToken`,this.refreshTokenRequest, httpOptions);
  } 
}
