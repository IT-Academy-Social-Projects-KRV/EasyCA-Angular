import { inject, TestBed } from "@angular/core/testing";
import { AccountService } from "./account.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from "../models/User";

describe('AccountService', () => {
   let accountService: AccountService;
   let backend: HttpTestingController;

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [HttpClientTestingModule,
            RouterTestingModule
         ],
         providers: [AccountService]
      });

      accountService = TestBed.inject(AccountService);
      backend = TestBed.inject(HttpTestingController);
   });

   afterEach(() => {
      backend.verify();
  });

   it('should be created', () => {
      expect(accountService).toBeTruthy();
   });

   it('should perform login correctly', () => {
      const user = new User('1', 'test@example.com', 'Alex', 'Zharan', 'testpassword', 'testpassword', 'clientURI');
      accountService.login(user).subscribe(
         (data: any) => {
            expect(data.success).toBe(true);
            expect(data.message).toBe('login was successful');
         },
         (error: any) => { }
      );
      backend.expectOne({
         method: 'POST',
         url: `http://localhost:5500/api/Auth/Login`
      }).flush({
         success: true,
         message: 'login was successful'
      });
   }
   )

   it('should fail loggin correctly', () => {
      const user = new User('1', 'test@example.com', 'Alex', 'Zharan', 'wrongtestpassword', 'wrongtestpassword', 'clientURI');
      accountService.login(user).subscribe(
         (data: any) => {
            expect(data.success).toBe(false);
            expect(data.message).toBe('email and password combination is wrong');
         },
         (error: any) => { }
      );

      backend.expectOne({
         method: 'POST',
         url: `http://localhost:5500/api/Auth/Login`
      }).flush({
         success: false,
         message: 'email and password combination is wrong'
      });
   })

   it('should register the user correctly', () => {
      const user = new User('1', 'test@example.com', 'Alex', 'Zharan', 'testpassword', 'testpassword', 'clientURI');
      accountService.register(user).subscribe(
         (data: any) => {
            expect(data.success).toBe(true);
            expect(data.message).toBe('the user has been registered');
         },
         (error: any) => { }
      );

      backend.expectOne({
         method: 'POST',
         url: `http://localhost:5500/api/Auth/Register`
      }).flush({
         success: true,
         message: 'the user has been registered'
      });
   })
   
   it('should failed register the user correctly', () => {
      const user = new User('1', 'test@example.com', 'Alex', 'Zharan', 'testpassword', 'testpassword', 'clientURI');
      accountService.register(user).subscribe(
         (data: any) => {
            expect(data.success).toBe(false);
            expect(data.message).toBe('the user has not been registered');
         },
         (error: any) => { }
      );

      backend.expectOne({
         method: 'POST',
         url: `http://localhost:5500/api/Auth/Register`
      }).flush({
         success: false,
         message: 'the user has not been registered'
      });
   })

   it('should get personal data', () => {
      const mockUser = { address: 'Rivne', ipn: '123456789', serviceNumber: '987654321', 
                         birthDay: '02.02.1996', jobPosition: 'programmer', userDriverLicense: '1', userCars: 'car'};

      accountService.getPersonalData().subscribe( user => {
         expect(user).toEqual(mockUser);
      }); 
      
      backend.expectOne({
         method: 'GET',
         url: 'http://localhost:5500/api/Account/GetUserById'
      }).flush(mockUser);
   });
});
