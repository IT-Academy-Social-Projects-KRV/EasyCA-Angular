import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST_URL } from '../configs/config';

@Injectable({
    providedIn: 'root'
})

export class SearchService {

    constructor(private http: HttpClient) { }

    search(text: string): Observable<any> {
        return this.http.get<any>(`${HOST_URL}Search/SearchTransport/${text}`);
    }
}
