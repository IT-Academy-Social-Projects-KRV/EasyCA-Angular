import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchService } from './search.service';
import { SearchTransport } from "../models/SearchTransport";

describe('SearchService', () => {
   let searchService: SearchService;
   let backend: HttpTestingController;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [HttpClientTestingModule,
            RouterTestingModule
         ],
         providers: [SearchService]
      });

      searchService = TestBed.inject(SearchService);
      backend = TestBed.inject(HttpTestingController);
   });

   afterEach(() => {
      backend.verify();
   });

   it('should be created', () => {
      expect(searchService).toBeTruthy();
   });

   it('should get transport', () => {
      const mockTransport: SearchTransport = { 
        id: 'qwerty',
        producedBy: 'qwerty',
        model: 'qwerty',
        categoryName: 'qwerty',
        vinCode: 'qwerty',
        carPlate: 'qwerty',
        color: 'qwerty',
        yearOfProduction: 2013,
        carAccidentsRegistered: 3,
      };

      searchService.search('qwerty').subscribe( data => {
         expect(data).toEqual(mockTransport);
      }); 
      
      backend.expectOne({
         method: 'GET',
         url: 'http://localhost:5500/api/Search/SearchTransport?search=qwerty'
      }).flush(mockTransport);
   });
});
