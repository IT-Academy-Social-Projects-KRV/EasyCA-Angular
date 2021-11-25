import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchService } from "./search.service";
import { Transport } from "../models/Transport";

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

   it('should get transport by car plate', () => {
      const mockTransport: Transport =  {
        id: '123456', 
        producedBy: 'BMW', 
        model: '320i', 
        categoryName: 'B', 
        vinCode: '12345678901234567', 
        carPlate: 'ВК1212ВК', 
        color: 'Black', 
        yearOfProduction: 2013, 
        insuaranceNumber: {
            companyName: 'Uniqa',
            serialNumber: '12345678',
        } 
      };

      searchService.search('ВК1212ВК').subscribe( res => {
         expect(res).toEqual(mockTransport);
      }); 
      
      backend.expectOne({
         method: 'GET',
         url: 'http://localhost:5500/api/Search/SearchTransport?search=ВК1212ВК'
      }).flush(mockTransport);
   });
});
