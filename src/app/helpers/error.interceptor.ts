import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private tokenStorageService: TokenStorageService,private accountService:AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
          if([401].includes(err.status)){
                this.tokenStorageService.checkRefreshToken()
                .subscribe((data: any)=>{
                    window.localStorage.setItem('access_token',data.token);
                },
                err => {
                    throwError(err);
                    this.accountService.logout();
                });
            }
             const error = (err && err.error && err.error.message) || err.statusText;
             return throwError(error);
        }))
    }
}

export const errorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
  

