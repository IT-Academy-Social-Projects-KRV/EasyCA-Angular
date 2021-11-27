import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViolationListService } from "./violation-list.service";
import { EuroProtocolSimpleModel } from "../models/EuroProtocolSimpleModel";
import { EuroProtocolFullModel } from "../models/EuroProtocolFullModel";

describe('ViolationListService', () => {
   let violationService: ViolationListService;
   let backend: HttpTestingController;
   
   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [HttpClientTestingModule,
            RouterTestingModule
         ],
         providers: [ViolationListService]
      });

      violationService = TestBed.inject(ViolationListService);
      backend = TestBed.inject(HttpTestingController);
   });

   afterEach(() => {
      backend.verify();
   });

   it('should be created', () => {
      expect(violationService).toBeTruthy();
   });

   it('should get all EP by email', () => {
      const mockListOfEP: EuroProtocolSimpleModel[] =  [{ serialNumber: '00000001', registrationDateTime: new Date(), 
                                address: { city: 'rivne', district: 'rivne',
                                           street: 'rivne', crossStreet: 'rivne',
                                           coordinatesOfLatitude: 'rivne', coordinatesOfLongitude: 'rivne',
                                           isInCity: false, isIntersection: false}, isClosed: false,
                            }];

      violationService.getAllEuroProtocolsByEmail('pinkevych@gmail.com').subscribe( res => {
         expect(res).toEqual(mockListOfEP);
      }); 
      
      backend.expectOne({
         method: 'GET',
         url: 'http://localhost:5500/api/EuroProtocol/FindAllEuroProtocolsByEmail?email=pinkevych@gmail.com'
      }).flush(mockListOfEP);
   });

   it('should get all EP by serialNumber', () => {
    const mockListOfEP: EuroProtocolFullModel = {
        euroProtocol: {
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
        },
        euroProtocolFullAddress: 'Rivne',
        sideACircumstances: ['qwe','qwe'],
        sideBCircumstances: ['qwe','qwe'],
        userDataSideA: {
            email: 'qwerty',
            firstName: 'qwerty',
            lastName: 'qwerty',
            personalData: {
                address:{
                    country:'qwert',
                    region:'qwert',
                    city:'qwert',
                    district:'qwert',
                    street:'qwert',
                    building:'qwert',
                    appartament:4,
                    postalCode:'qwert',
                },
                ipn:'1234',
                serviceNumber: '123',
                birthDay: new Date(),
                jobPosition: '',
                userDriverLicense:{
                    licenseSerialNumber: '123',  
                    issuedBy: '123',  
                    expirationDate: new Date(),  
                    userCategories: ['A', 'B'],  
                },
                userCars: ['bwm', 'mazda']
            }
        },
        userDataSideB: {
                email: 'qwerty',
                firstName: 'qwerty',
                lastName: 'qwerty',
                personalData: {
                    address:{
                        country:'qwert',
                        region:'qwert',
                        city:'qwert',
                        district:'qwert',
                        street:'qwert',
                        building:'qwert',
                        appartament:4,
                        postalCode:'qwert',
                    },
                    ipn:'1234',
                    serviceNumber: '123',
                    birthDay: new Date(),
                    jobPosition: '',
                    userDriverLicense:{
                        licenseSerialNumber: '123',  
                        issuedBy: '123',  
                        expirationDate: new Date(),  
                        userCategories: ['A', 'B'],  
                    },
                    userCars: ['bwm', 'mazda']
                },
        },
        transportSideA: {
            id: '213456',
            producedBy: '213456',
            model: '213456',
            categoryName: '213456',
            vinCode: '213456',
            carPlate: '213456',
            color: '213456',
            yearOfProduction: 2012,
            insuaranceNumber: {
                companyName: 'uniqa',
                serialNumber: '1234567',
            },
        },
        transportSideB: {
            id: '213456',
            producedBy: '213456',
            model: '213456',
            categoryName: '213456',
            vinCode: '213456',
            carPlate: '213456',
            color: '213456',
            yearOfProduction: 2012,
            insuaranceNumber: {
                companyName: 'uniqa',
                serialNumber: '1234567',
            },
        },
    };

    violationService.getEuroProtocolBySerialNumber('00000001').subscribe( res => {
       expect(res).toEqual(mockListOfEP);
    }); 
    
    backend.expectOne({
       method: 'GET',
       url: 'http://localhost:5500/api/EuroProtocol/GetEuroProtocolBySerialNumber?serialNumber=00000001'
    }).flush(mockListOfEP);
   });
});
