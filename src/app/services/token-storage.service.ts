import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HOST_URL} from '../config';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private http:HttpClient) { }

  getToken() {
    return window.localStorage.getItem('access_token');
  }
  checkRefreshToken(){
    return this.http.post<any>(`${HOST_URL}Account/RefreshToken`, httpOptions, { withCredentials: true });
  }

}
