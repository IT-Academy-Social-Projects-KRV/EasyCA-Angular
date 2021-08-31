import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  getToken() {
    return window.localStorage.getItem('access_token');
  }
}
