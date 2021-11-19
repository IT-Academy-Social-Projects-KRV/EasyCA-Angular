import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ViewFile } from '../models/viewFile';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})

export class FileService {
  constructor(private http: HttpClient, private configuration: AppConfigService) { }

  uploadFile(formData: FormData) {
    return this.http.post<any>(`${this.configuration.backendUrl}File/UploadFiles`, formData);
  }

  downloadFiles(id: string[]) {
    return this.http.get<ViewFile[]>(`${this.configuration.backendUrl}File/DownloadFiles?ids=${id.join('&ids=')}`);
  }

  deleteFile(fileId: string) {
    return this.http.delete<any>(`${this.configuration.backendUrl}File/DeleteFile/${fileId}`);
  }

  getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
