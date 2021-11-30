import { TestBed } from "@angular/core/testing";
import { AccountService } from "./account.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from "../models/User";
import { Data } from "../models/Data";
import { PersonalData } from "../models/PersonalData";
import { RestorePassword } from "../models/RestorePassword";
import { ResendConfirmation } from "../models/ResendConfirmation";
import { ChangePassword } from "../models/ChangePassword";

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

   it('should put personal data', () => {
      const mockUser: Data = { 
         email:'qwe',
         firstName:'qwe',
         lastName:'qwe',
         personalData: {
            address: {
               country:'qwer',
               region:'qwer',
               city:'qwer',
               district:'qwer',
               street:'qwer',
               building:'qwer',
               appartament:12,
               postalCode:'12',
            }, 
            ipn: '123456789', 
            serviceNumber: '987654321', 
            birthDay: new Date(), 
            jobPosition: 'programmer', 
            userDriverLicense: {
               licenseSerialNumber:'qwer',
               issuedBy:'new Date()',
               expirationDate:new Date(),
               userCategories:['qwer', 'qwer'],
            }, 
            userCars: ['car', 'car']
         }
      };

      accountService.putPersonalData(mockUser).subscribe( 
         (data: any) => {
            expect(data.success).toBe(true);
            expect(data.message).toBe('personal data has been updated');
         },
         (error: any) => { }
      ); 
      
      backend.expectOne({
         method: 'PUT',
         url: 'http://localhost:5500/api/Account/UpdateData'
      }).flush({
         success: true,
         message: 'personal data has been updated'
      });
   });

   it('should failed personal data', () => {
      const mockUser: Data = { 
         email:'qwe',
         firstName:'qwe',
         lastName:'qwe',
         personalData: {
            address: {
               country:'qwer',
               region:'qwer',
               city:'qwer',
               district:'qwer',
               street:'qwer',
               building:'qwer',
               appartament:12,
               postalCode:'12',
            }, 
            ipn: '123456789', 
            serviceNumber: '987654321', 
            birthDay: new Date(), 
            jobPosition: 'programmer', 
            userDriverLicense: {
               licenseSerialNumber:'qwer',
               issuedBy:'new Date()',
               expirationDate:new Date(),
               userCategories:['qwer', 'qwer'],
            }, 
            userCars: ['car', 'car']
         }
      };

      accountService.putPersonalData(mockUser).subscribe( 
         (data: any) => {
            expect(data.success).toBe(false);
            expect(data.message).toBe('personal data has not been updated');
         },
         (error: any) => { }
      ); 
      
      backend.expectOne({
         method: 'PUT',
         url: 'http://localhost:5500/api/Account/UpdateData'
      }).flush({
         success: false,
         message: 'personal data has not been updated'
      });
   });

   it('should get user by id', () => {
      const mockUser = new User('qwe','qwe','qwe','qwe','qwe','qwe','qwe');

      accountService.getUserById('qwerty').subscribe( user => {
         expect(user).toEqual(mockUser);
      }); 
      
      backend.expectOne({
         method: 'GET',
         url: 'http://localhost:5500/api/Account/GetUserById/qwerty'
      }).flush(mockUser);
   });

   it('should add personal data', () => {
      const mockUser: PersonalData = { 
            address: {
               country:'qwer',
               region:'qwer',
               city:'qwer',
               district:'qwer',
               street:'qwer',
               building:'qwer',
               appartament:12,
               postalCode:'12',
            }, 
            ipn: '123456789', 
            serviceNumber: '987654321', 
            birthDay: new Date(), 
            jobPosition: 'programmer', 
            userDriverLicense: {
               licenseSerialNumber:'qwer',
               issuedBy:'new Date()',
               expirationDate:new Date(),
               userCategories:['qwer', 'qwer'],
            }, 
            userCars: ['car', 'car']
      };

      accountService.addPersonalData(mockUser).subscribe( 
         (data: any) => {
            expect(data.success).toBe(true);
            expect(data.message).toBe('personal data has been added');
         },
         (error: any) => { }
      ); 
      
      backend.expectOne({
         method: 'POST',
         url: 'http://localhost:5500/api/Account/CreatePersonalData'
      }).flush({
         success: true,
         message: 'personal data has been added'
      });
   });

   it('should failed add personal data', () => {
      const mockUser: PersonalData = { 
            address: {
               country:'qwer',
               region:'qwer',
               city:'qwer',
               district:'qwer',
               street:'qwer',
               building:'qwer',
               appartament:12,
               postalCode:'12',
            }, 
            ipn: '123456789', 
            serviceNumber: '987654321', 
            birthDay: new Date(), 
            jobPosition: 'programmer', 
            userDriverLicense: {
               licenseSerialNumber:'qwer',
               issuedBy:'new Date()',
               expirationDate:new Date(),
               userCategories:['qwer', 'qwer'],
            }, 
            userCars: ['car', 'car']
      };

      accountService.addPersonalData(mockUser).subscribe( 
         (data: any) => {
            expect(data.success).toBe(false);
            expect(data.message).toBe('personal data has not been added');
         },
         (error: any) => { }
      ); 
      
      backend.expectOne({
         method: 'POST',
         url: 'http://localhost:5500/api/Account/CreatePersonalData'
      }).flush({
         success: false,
         message: 'personal data has not been added'
      });
   });

   it('should forgot password work correctly', () => {
      const mockUser: RestorePassword = {
         email: '',
         newPassword: '',
         confirmPassword: '',
         passwordURI: '',
      };

      accountService.forgotPassword(mockUser).subscribe(
         (data: any) => {
            expect(data.success).toBe(true);
            expect(data.message).toBe('forgot password was successful');
         },
         (error: any) => { }
      );

      backend.expectOne({
         method: 'POST',
         url: `http://localhost:5500/api/Auth/ForgotPassword`
      }).flush({
         success: true,
         message: 'forgot password was successful'
      });
   }
   )

   it('should failed forgot password work correctly', () => {
      const mockUser: RestorePassword = {
         email: '',
         newPassword: '',
         confirmPassword: '',
         passwordURI: '',
      };

      accountService.forgotPassword(mockUser).subscribe(
         (data: any) => {
            expect(data.success).toBe(false);
            expect(data.message).toBe('forgot password was not successful');
         },
         (error: any) => { }
      );

      backend.expectOne({
         method: 'POST',
         url: `http://localhost:5500/api/Auth/ForgotPassword`
      }).flush({
         success: false,
         message: 'forgot password was not successful'
      });
   }
   )

   it('should restore password work correctly', () => {
      accountService.restorePassword('qwe','qwe','qwe','qwe').subscribe(
         (data: any) => {
            expect(data.success).toBe(true);
            expect(data.message).toBe('restore password was successful');
         },
         (error: any) => { }
      );

      backend.expectOne({
         method: 'GET',
         url: `http://localhost:5500/api/qwe/qwe/qwe/qwe`
      }).flush({
         success: true,
         message: 'restore password was successful'
      });
   }
   )

   it('should confirm email work correctly', () => {
      accountService.confirmEmail('qwe','qwe','qwe').subscribe(
         (data: any) => {
            expect(data.success).toBe(true);
            expect(data.message).toBe('confirm email was successful');
         },
         (error: any) => { }
      );

      backend.expectOne({
         method: 'GET',
         url: `http://localhost:5500/api/qwe/qwe/qwe`
      }).flush({
         success: true,
         message: 'confirm email was successful'
      });
   }
   )

   it('should failed resend confirmation email', () => {
      const mockUser: ResendConfirmation = { 
           email: 'qwe',
           resendConfirmationURI: 'qwe'
      };

      accountService.resendConfirmation(mockUser).subscribe( 
         (data: any) => {
            expect(data.success).toBe(true);
            expect(data.message).toBe('resend confirmation email has been send');
         },
         (error: any) => { }
      ); 
      
      backend.expectOne({
         method: 'POST',
         url: 'http://localhost:5500/api/Auth/ResendConfirmation'
      }).flush({
         success: true,
         message: 'resend confirmation email has been send'
      });
   });

   it('should resend confirmation email', () => {
      const mockUser: ResendConfirmation = { 
           email: 'qwe',
           resendConfirmationURI: 'qwe'
      };

      accountService.resendConfirmation(mockUser).subscribe( 
         (data: any) => {
            expect(data.success).toBe(false);
            expect(data.message).toBe('resend confirmation email has not been send');
         },
         (error: any) => { }
      ); 
      
      backend.expectOne({
         method: 'POST',
         url: 'http://localhost:5500/api/Auth/ResendConfirmation'
      }).flush({
         success: false,
         message: 'resend confirmation email has not been send'
      });
   });

   it('should change password', () => {
      const mockUser: ChangePassword = { 
           oldPassword: 'qwe',
           Password: 'qwe'
      };

      accountService.changePassword(mockUser).subscribe( 
         (data: any) => {
            expect(data.success).toBe(true);
            expect(data.message).toBe('password has been updated');
         },
         (error: any) => { }
      ); 
      
      backend.expectOne({
         method: 'POST',
         url: 'http://localhost:5500/api/Account/ChangePassword'
      }).flush({
         success: true,
         message: 'password has been updated'
      });
   });

   it('should failed change password', () => {
      const mockUser: ChangePassword = { 
           oldPassword: 'qwe',
           Password: 'qwe'
      };

      accountService.changePassword(mockUser).subscribe( 
         (data: any) => {
            expect(data.success).toBe(false);
            expect(data.message).toBe('password has not been updated');
         },
         (error: any) => { }
      ); 
      
      backend.expectOne({
         method: 'POST',
         url: 'http://localhost:5500/api/Account/ChangePassword'
      }).flush({
         success: false,
         message: 'password has not been updated'
      });
   });
});
