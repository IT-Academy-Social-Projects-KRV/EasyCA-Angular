import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST_URL } from '../configs/config';
import { ViewFile } from '../models/viewFile';

@Injectable({
  providedIn: 'root'
})

export class FileService {
  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData) {
    return this.http.post<any>(`${HOST_URL}File/UploadFiles`, formData);
  }

  downloadFiles(id: string[]) {
    return this.http.get<ViewFile[]>(`${HOST_URL}File/DownloadFiles?ids=${id.join('&ids=')}`);
  }

  deleteFile(fileId: string) {
    return this.http.delete<any>(`${HOST_URL}File/DeleteFile/${fileId}`);
  }

  getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
