import { TestBed } from "@angular/core/testing";
import { TransportService } from "./transport.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Transport } from "../models/Transport";

describe('TransportService', () => {
    let transportService: TransportService;
    let backend: HttpTestingController;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [TransportService]
        });
        transportService = TestBed.inject(TransportService);
        backend = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        backend.verify();
    });

    it('should be created', () => {
        expect(transportService).toBeTruthy();
    });

    it('should get transport by id', () => {
        const mockListOfTransports: Transport = {
            id: '1',
            producedBy:'honda',
            model: 'civic',
            categoryName: 'light car',
            vinCode: '12345678901234567',
            carPlate: 'ВК8895РВ',
            color: 'black',
            yearOfProduction: 2021,
            insuaranceNumber: {
                companyName: 'kniaga',
                serialNumber: '12'
            } 
        };

        transportService.getTransportById('1').subscribe(res => {
            expect(res).toEqual(mockListOfTransports);
        });

        backend.expectOne({
            method: 'GET',
            url: 'http://localhost:5500/api/Transport/GetTransportById?transportId=1'
        }).flush(mockListOfTransports);
    });

    it('should add transport', () =>  {
        const transport: Transport = {
            id: '1',
            producedBy:'honda',
            model: 'civic',
            categoryName: 'light car',
            vinCode: '12345678901234567',
            carPlate: 'ВК8895РВ',
            color: 'black',
            yearOfProduction: 2021,
            insuaranceNumber: {
                companyName: 'kniaga',
                serialNumber: '12'
            } 
        }; 
        transportService.postTransport(transport).subscribe(
            (data: any) => {
                expect(data.success).toBe(true);
                expect(data.message).toBe('the transport has been added');
            },
            (error: any) => { }            
        );

        backend.expectOne({
            method: 'POST',
            url: `http://localhost:5500/api/Transport/AddTransport`
        }).flush({
            success: true,
            message: 'the transport has been added'
        });
    });

    it('should failed add transport', () =>  {
        const transport: Transport = {
            id: '1',
            producedBy:'honda',
            model: 'civic',
            categoryName: 'light car',
            vinCode: '12345678901234567',
            carPlate: 'ВК8895РВ',
            color: 'black',
            yearOfProduction: 2021,
            insuaranceNumber: {
                companyName: 'kniaga',
                serialNumber: '12'
            } 
        }; 
        transportService.postTransport(transport).subscribe(
            (data: any) => {
                expect(data.success).toBe(false);
                expect(data.message).toBe('the transport has not been added');
            },
            (error: any) => { }            
        );

        backend.expectOne({
            method: 'POST',
            url: `http://localhost:5500/api/Transport/AddTransport`
        }).flush({
            success: false,
            message: 'the transport has not been added'
        });
    });

    it('should success update transport', () => {
        const mockListOfTransports: Transport = {
            id: '1',
            producedBy:'honda',
            model: 'civic',
            categoryName: 'light car',
            vinCode: '12345678901234567',
            carPlate: 'ВК8895РВ',
            color: 'black',
            yearOfProduction: 2021,
            insuaranceNumber: {
                companyName: 'kniaga',
                serialNumber: '12'
            } 
        };

        transportService.putTransport(mockListOfTransports).subscribe(
            (data: any) => {
                expect(data.success).toBe(true);
                expect(data.message).toBe('the transport has been updated corrently');
            },
            (error: any) => { }  
        );

        backend.expectOne({
            method: 'PUT',
            url: `http://localhost:5500/api/Transport/UpdateTransport`
        }).flush({
            success: true,
            message: 'the transport has been updated corrently'
        });
    });

    it('should failed update transport', () => {
        const mockListOfTransports: Transport = {
            id: '1',
            producedBy:'honda',
            model: 'civic',
            categoryName: 'light car',
            vinCode: '12345678901234567',
            carPlate: 'ВК8895РВ',
            color: 'black',
            yearOfProduction: 2021,
            insuaranceNumber: {
                companyName: 'kniaga',
                serialNumber: '12'
            } 
        };

        transportService.putTransport(mockListOfTransports).subscribe(
            (data: any) => {
                expect(data.success).toBe(false);
                expect(data.message).toBe('transport is not updated correctly');
            },
            (error: any) => { }  
        );

        backend.expectOne({
            method: 'PUT',
            url: `http://localhost:5500/api/Transport/UpdateTransport`
        }).flush({
            success: false,
            message: 'transport is not updated correctly'
        });
    });

    it('transport delete correctly', () => {
        
        transportService.deleteTransport('1').subscribe(
            (data: any) => {
                expect(data.success).toBe(true);
                expect(data.message).toBe('the transport deleted successfully');
            },
            (error: any) => { }            
        );
        backend.expectOne({
            method: 'DELETE',
            url: `http://localhost:5500/api/Transport/DeleteTransport?transportId=1`
        }).flush({
            success: true,
            message: 'the transport deleted successfully'
        });
    });

    it('transport delete not correctly', () => {
         
        transportService.deleteTransport('1').subscribe(
            (data: any) => {
                expect(data.success).toBe(false);
                expect(data.message).toBe('transport not deleted');
            },
            (error: any) => { }            
        );
        backend.expectOne({
            method: 'DELETE',
            url: `http://localhost:5500/api/Transport/DeleteTransport?transportId=1`
        }).flush({
            success: false,
            message: 'transport not deleted'
        });
    });    

    it('should get all transport', () => {
        const mockAllTransports: Transport[] = [{
            id: '1',
            producedBy:'honda',
            model: 'civic',
            categoryName: 'light car',
            vinCode: '12345678901234567',
            carPlate: 'ВК8895РВ',
            color: 'black',
            yearOfProduction: 2021,
            insuaranceNumber: {
                companyName: 'kniaga',
                serialNumber: '12'
            } 
        }];

        transportService.getAllTransports().subscribe(res => {
            expect(res).toEqual(mockAllTransports);
        });

        backend.expectOne({
            method: 'GET',
            url: 'http://localhost:5500/api/Transport/GetAllTransports'
        }).flush(mockAllTransports);
    });

    it('should get transport by car plate', () => {
        const mockAllTransports: Transport = {
            id: '1',
            producedBy:'honda',
            model: 'civic',
            categoryName: 'light car',
            vinCode: '12345678901234567',
            carPlate: 'ВК8895РВ',
            color: 'black',
            yearOfProduction: 2021,
            insuaranceNumber: {
                companyName: 'kniaga',
                serialNumber: '12'
            } 
        };

        transportService.getTransportByCarPlate('ВК8895РВ').subscribe(res => {
            expect(res).toEqual(mockAllTransports);
        });

        backend.expectOne({
            method: 'GET',
            url: 'http://localhost:5500/api/Transport/GetTransportByCarPlate?carPlate=ВК8895РВ'
        }).flush(mockAllTransports);
    });
})