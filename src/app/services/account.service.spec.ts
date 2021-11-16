import { inject, TestBed } from "@angular/core/testing";
import { AccountService } from "./account.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from "../models/User";
import { HOST_URL } from "../configs/config";

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
         url: `${HOST_URL}Auth/Login`
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
         url: `${HOST_URL}Auth/Login`
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
         url: `${HOST_URL}Auth/Register`
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
         url: `${HOST_URL}Auth/Register`
      }).flush({
         success: false,
         message: 'the user has not been registered'
      });
   })
});