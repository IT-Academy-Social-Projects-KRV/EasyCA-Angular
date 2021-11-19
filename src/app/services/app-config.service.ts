import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor(private http: HttpClient) { }

  async loadAppConfig() {
    const data = await this.http.get('/assets/appsettings.json')
      .toPromise();
    this.appConfig = data;
  }

  get backendUrl() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.backendUrl;
  }

  get restorePasswordUrl() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    
    return this.appConfig.restorePasswordUrl;
  }

  get emailConfirmationUrl() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }
    
    return this.appConfig.emailConfirmationUrl;
  }
}