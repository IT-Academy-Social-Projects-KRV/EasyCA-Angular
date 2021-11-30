import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { ViewFile } from '../models/ViewFile';
import { AppConfigService } from './app-config.service';
import { FileService } from './file.service';


describe('FileService', () => {
let fileService: FileService;
let backend: HttpTestingController;

beforeEach(() => {
  TestBed.configureTestingModule({
     imports: [HttpClientTestingModule,
        RouterTestingModule
     ],
     providers: [FileService]
  });

  fileService = TestBed.inject(FileService);
  backend = TestBed.inject(HttpTestingController);
});

afterEach(() => {
  backend.verify();
});

it('should be created', () => {
  expect(fileService).toBeTruthy();
});

it('should upload the file', () => {
  const mockFile = new FormData();
  mockFile.append("qwerty", "test" as any);

  fileService.uploadFile(mockFile).subscribe(
    (data: any) => {
      expect(data.success).toBe(true);
      expect(data.message).toBe('file upload');
    },
    (error: any) => { }); 
  
  backend.expectOne({
     method: 'POST',
     url: 'http://localhost:5500/api/File/UploadFiles'
  }).flush({
    message: 'file upload',
    success: true
  });
});

it('should failed upload the file', () => {
  const mockFile = new FormData();
  mockFile.append("qwerty", "test" as any);

  fileService.uploadFile(mockFile).subscribe(
    (data: any) => {
      expect(data.success).toBe(false);
      expect(data.message).toBe('file has not been upload');
    },
    (error: any) => { }); 
  
  backend.expectOne({
     method: 'POST',
     url: 'http://localhost:5500/api/File/UploadFiles'
  }).flush({
    message: 'file has not been upload',
    success: false
  });
});

it('should download the file', () => {
  const mockFile : ViewFile = {
    file: 'myimg.png',
    filename: 'test',
    contentType: 'animal'
  };


  fileService.downloadFiles(['1']).subscribe(
    res => {
    expect(res).toEqual([mockFile]);
    },
    (error: any) => { }); 
  
  backend.expectOne({
     method: 'GET',
     url: 'http://localhost:5500/api/File/DownloadFiles?ids=1'
  }).flush([mockFile]);
});

it('file delete correctly', () => {
        
  fileService.deleteFile('1').subscribe(
      (data: any) => {
          expect(data.success).toBe(true);
          expect(data.message).toBe('the File deleted successfully');
      },
      (error: any) => { }            
  );
  backend.expectOne({
      method: 'DELETE',
      url: `http://localhost:5500/api/File/DeleteFile/1`
  }).flush({
      success: true,
      message: 'the File deleted successfully'
  });
});

it('file delete not correctly', () => {
  fileService.deleteFile('1').subscribe(
    (data: any) => {
        expect(data.success).toBe(false);
        expect(data.message).toBe('The file cannot be removed');
    },
    (error: any) => { }            
);
  backend.expectOne({
      method: 'DELETE',
      url: `http://localhost:5500/api/File/DeleteFile/1`
  }).flush({
      success: false,
      message: 'The file cannot be removed'
  });
});    

});
