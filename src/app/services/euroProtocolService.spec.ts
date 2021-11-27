import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EuroProtocolService } from "./euroProtocolService";
import { Circumstance } from "../models/Circumstance";
import { EuroProtocol } from "../models/EuroProtocol";

describe('EuroProtocolService', () => {
   let euroProtocolService: EuroProtocolService;
   let backend: HttpTestingController;
   
   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [HttpClientTestingModule,
            RouterTestingModule
         ],
         providers: [EuroProtocolService]
      });

      euroProtocolService = TestBed.inject(EuroProtocolService);
      backend = TestBed.inject(HttpTestingController);
   });

   afterEach(() => {
      backend.verify();
   });

   it('should be created', () => {
      expect(euroProtocolService).toBeTruthy();
   });

   it('should get all circumstances', () => {
      const mockListOfEP: Circumstance[] =  [{ 
        circumstanceId: 1, 
        circumstanceName: 'qwerty'
      }];

      euroProtocolService.getAllCircumstances().subscribe( res => {
         expect(res).toEqual(mockListOfEP);
      }); 
      
      backend.expectOne({
         method: 'GET',
         url: 'http://localhost:5500/api/EuroProtocol/GetAllCircumstances'
      }).flush(mockListOfEP);
   });

   it('should create EuroProtocol work correctly', () => {
    const mockEuroProtocol: EuroProtocol= {
        registrationDateTime: new Date(),
        serialNumber: '00000001',
        address: { 
            city: 'rivne', 
            district: 'rivne',
            street: 'rivne', 
            crossStreet: 'rivne',
            coordinatesOfLatitude: 'rivne', 
            coordinatesOfLongitude: 'rivne',
            isInCity: false, 
            isIntersection: false 
        },
        sideA: {
            email: 'pinkevych@gmail.com',
            transportId: '6189521bd065286dcfcd4cb5',
            circumstances: [1,3],
            evidences: [{photoSchema: 'string'}],
            driverLicenseSerial: 'QWE123456',
            damage: 'front',
            isGulty: false,
            protocolSerial: '123'
        },
        sideB: {
            email: 'kosminfeed@gmail.com',
            transportId: '6539532bd065126dcfcd4cb5',
            circumstances: [2,4],
            evidences: [{photoSchema: 'string'}],
            driverLicenseSerial: 'QWE333711',
            damage: 'side',
            isGulty: false,
            protocolSerial: '123'
        },
        isClosed: false,
        witnesses: [{
            firstName: 'Dmytro', 
            lastName: 'Pinkevych',
            witnessAddress: 'Rivne',
            phoneNumber: '0954165091',
            isVictim: false}],
    };
    euroProtocolService.createEuroProtocol(mockEuroProtocol).subscribe(
       (data: any) => {
          expect(data.success).toBe(true);
          expect(data.message).toBe('the euroProtocol has been created');
       },
       (error: any) => { }
    );

    backend.expectOne({
       method: 'POST',
       url: `http://localhost:5500/api/EuroProtocol/CreateEuroProtocol`
    }).flush({
       success: true,
       message: 'the euroProtocol has been created'
    });
   });

   it('should failed create EuroProtocol work correctly', () => {
        const mockEuroProtocol: EuroProtocol= {
            registrationDateTime: new Date(),
            serialNumber: 'wrong data',
            address: { 
                city: 'wrong data', 
                district: 'wrong data',
                street: 'wrong data', 
                crossStreet: 'wrong data',
                coordinatesOfLatitude: 'wrong data', 
                coordinatesOfLongitude: 'wrong data',
                isInCity: false, 
                isIntersection: false,
            },
            sideA: {
                email: 'wrong data@gmail.com',
                transportId: 'wrong data',
                circumstances: [1,3],
                evidences: [{photoSchema: 'wrong data'}],
                driverLicenseSerial: 'wrong data',
                damage: 'wrong data',
                isGulty: false, 
                protocolSerial: 'string'
            },
            sideB: {
                email: 'wrong data@gmail.com',
                transportId: 'wrong data',
                circumstances: [2,4],
                evidences: [{photoSchema: 'wrong data'}],
                driverLicenseSerial: 'wrong data',
                damage: 'wrong data',
                isGulty: false,
                protocolSerial: '123'
            },
            isClosed: false,
            witnesses: [{
                firstName: 'wrong data', 
                lastName: 'wrong data',
                witnessAddress: 'wrong data',
                phoneNumber: 'wrong data',
                isVictim: false}],
        };
        euroProtocolService.createEuroProtocol(mockEuroProtocol).subscribe(
        (data: any) => {
            expect(data.success).toBe(false);
            expect(data.message).toBe('the euroProtocol has not been created');
        },
        (error: any) => { }
        );

        backend.expectOne({
            method: 'POST',
            url: `http://localhost:5500/api/EuroProtocol/CreateEuroProtocol`
        }).flush({
            success: false,
            message: 'the euroProtocol has not been created'
        });
    });
});
