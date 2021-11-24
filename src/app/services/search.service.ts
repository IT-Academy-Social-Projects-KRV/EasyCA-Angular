import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transport } from '../models/Transport';
import { AppConfigService } from './app-config.service';

@Injectable({
    providedIn: 'root'
})

export class SearchService {

    constructor(private http: HttpClient, private configuration: AppConfigService) { }

    search(text: string): Observable<Transport> {
        return this.http.get<Transport>(`${this.configuration.backendUrl}Search/SearchTransport?search=${text}`);
    }
}
