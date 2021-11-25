import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchTransport } from '../models/SearchTransport';
import { AppConfigService } from './app-config.service';

@Injectable({
    providedIn: 'root'
})

export class SearchService {

    constructor(private http: HttpClient, private configuration: AppConfigService) { }

    search(text: string): Observable<SearchTransport> {
        return this.http.get<SearchTransport>(`${this.configuration.backendUrl}Search/SearchTransport?search=${text}`);
    }
}
