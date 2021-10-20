import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HOST_URL } from '../configs/config';
import { CarAccident } from '../models/carAccident';

@Injectable({
  providedIn: 'root'
})
export class InspectorService {

  constructor(private http: HttpClient) { }
  getAllCarAccidentsByInspectorId(): Observable<CarAccident[]> {
    return this.http.get<CarAccident[]>(`${HOST_URL}CarAccident`);
  }
}
