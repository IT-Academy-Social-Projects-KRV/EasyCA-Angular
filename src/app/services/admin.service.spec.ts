import { TestBed } from "@angular/core/testing";
import { AdminService } from "./admin.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Inspector } from '../models/Inspector';
import { EuroProtocol } from "../models/EuroProtocol";
import { CarAccident } from "../models/CarAccident";

describe('AdminService', () => {
    let adminService: AdminService;
    let backend: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [AdminService]
        });

        adminService = TestBed.inject(AdminService);
        backend = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        backend.verify();
    });

    it('should create admin service', () => {
        expect(adminService).toBeTruthy();
    });

    it('should register inspector with correct data', () => {
        const mockInspector: Inspector = {
            email: 'insp@gmail.com',
            firstName: 'John',
            lastName: 'McClaine',
            password: '123456',
            confirmPassword: '123456'
        };

        adminService.registerInspector(mockInspector).subscribe(
            (data: any) => {
                expect(data.success).toBe(true);
                expect(data.message).toBe('You have successfully registered a new account');
            },
            (error: any) => { }
        );

        backend.expectOne({
            method: 'POST',
            url: 'http://localhost:5500/api/Admin/AddInspectors'
        }).flush({
            success: true,
            message: 'You have successfully registered a new account'
        });
    });

    it('should fail to register inspector with incorrect data', () => {
        const mockInspector: Inspector = {
            email: '@gmail.com',
            firstName: 'John',
            lastName: 'McClaine',
            password: '123456',
            confirmPassword: '654321'
        };

        adminService.registerInspector(mockInspector).subscribe(
            (data: any) => {
                expect(data.success).toBe(false);
                expect(data.message).toBe('Couldn\'t register a new account');
            },
            (error: any) => { }
        );

        backend.expectOne({
            method: 'POST',
            url: 'http://localhost:5500/api/Admin/AddInspectors'
        }).flush({
            success: false,
            message: 'Couldn\'t register a new account'
        });
    });

    it('should get all inspectors', () => {
        const mockListOfInspectors: Inspector[] = [{
            email: 'insp@gmail.com',
            firstName: 'John',
            lastName: 'McClaine',
            password: '123456',
            confirmPassword: '123456'
        }];

        adminService.getListInspectors().subscribe(
            (data: any) => {
                expect(data).toEqual(mockListOfInspectors);
            },
            (error: any) => { }
        );

        backend.expectOne({
            method: 'GET',
            url: 'http://localhost:5500/api/Admin/GetAllInspectors'
        }).flush(mockListOfInspectors);
    });

    it('should delete inspector with existing email', () => {
        const email = 'insp@gmail.com';

        adminService.deleteInspector(email).subscribe(
            (data: any) => {
                expect(data.success).toEqual(true);
                expect(data.message).toEqual('Inspector has been successfully deleted');
            },
            (error: any) => { }
        );

        backend.expectOne({
            method: 'PUT',
            url: 'http://localhost:5500/api/Admin/DeleteInspectorRole'
        }).flush({
            success: true,
            message: 'Inspector has been successfully deleted'
        });
    });

    it('should fail to delete inspector with non-existing email', () => {
        const email = '@gmail.com';

        adminService.deleteInspector(email).subscribe(
            (data: any) => {
                expect(data.success).toEqual(false);
                expect(data.message).toEqual('Couldn\'t find such user');
            },
            (error: any) => { }
        );

        backend.expectOne({
            method: 'PUT',
            url: 'http://localhost:5500/api/Admin/DeleteInspectorRole'
        }).flush({
            success: false,
            message: 'Couldn\'t find such user'
        });
    });

    it('should get all europrotocols', () => {
        const mockListOfEuroProtocols: EuroProtocol[] = [{
            registrationDateTime: new Date(),
            serialNumber: '1234567890',
            address: {
                city: 'Rivne',
                district: 'Center',
                street: 'Chornovola',
                crossStreet: '',
                coordinatesOfLatitude: '',
                coordinatesOfLongitude: '',
                isInCity: true,
                isIntersection: false
            },
            sideA: {
                email: 'sideA@gmail.com',
                transportId: '4521452',
                circumstances: [5],
                evidences: [{photoSchema: ''}],
                driverLicenseSerial: '236365256426',
                damage: 'left side',
                isGulty: true,
                protocolSerial: ''
            },
            sideB: {
                email: 'sideB@gmail.com',
                transportId: '626324623',
                circumstances: [5],
                evidences: [{photoSchema: ''}],
                driverLicenseSerial: '314517641364',
                damage: 'front side',
                isGulty: false,
                protocolSerial: ''
            },
            isClosed: true,
            witnesses: [{
                firstName: 'Bruce', 
                lastName: 'Lee',
                witnessAddress: 'Chornovola 25',
                phoneNumber: '154798437598',
                isVictim: false
            }],
        }];

        adminService.getAllEuroProtocols().subscribe(
            (data: any) => {
                expect(data).toEqual(mockListOfEuroProtocols);
            },
            (error: any) => { }
        );

        backend.expectOne({
            method: 'GET',
            url: 'http://localhost:5500/api/Admin/GetAllEuroProtocols'
        }).flush(mockListOfEuroProtocols);
    });

    it('should get all CA protocols', () => {
        const mockListOfCAProtocols: CarAccident[] = [{
            id: '1514616136',
            serialNumber: '2146531631',
            inspectorId: '1361364136',
            registrationDateTime: new Date(),
            address: {
                city: 'Rivne',
                district: 'Center',
                street: 'Chornovola',
                crossStreet: '',
                coordinatesOfLatitude: '',
                coordinatesOfLongitude: '',
                isInCity: true,
                isIntersection: false
            },
            sideOfAccident: {
                email: 'side@gmail.com',
                transportId: '13478317643',
                driverLicenseSerial: '346136136'
            },
            accidentCircumstances: 'idk',
            trafficRuleId: '33223311',
            driverExplanation: 'sorry',
            witnesses: [{
                firstName: 'Bruce', 
                lastName: 'Lee',
                witnessAddress: 'Chornovola 25',
                phoneNumber: '154798437598',
                isVictim: false
            }],
            evidences: [{photoSchema: ''}],
            courtDTG: new Date(),
            isDocumentTakenOff: false,
        }];

        adminService.getAllCAProtocols().subscribe(
            (data: any) => {
                expect(data).toEqual(mockListOfCAProtocols);
            },
            (error: any) => { }
        );

        backend.expectOne({
            method: 'GET',
            url: 'http://localhost:5500/api/Admin/GetAllCAProtocols'
        }).flush(mockListOfCAProtocols);
    });
});
