import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';

@Injectable({
    providedIn: 'root'
})

export class SearchService {

    constructor(private http: HttpClient, private configuration: AppConfigService) { }

    search(text: string): Observable<any> {
        return this.http.get<any>(`${this.configuration.backendUrl}Search/SearchTransport?search=${text}`);
    }
}
