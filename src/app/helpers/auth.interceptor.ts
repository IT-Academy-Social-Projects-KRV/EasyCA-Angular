import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { TokenStorageService } from '../services/token-storage.service';
import { RefreshToken } from '../models/RefreshToken';
import { UserRefreshTokenNotFound,UserRefreshTokenNotActive } from '../models/RefreshTokenMessage'; 
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    refreshToken: RefreshToken = { refreshToken: '' };
    private isTokenRefreshing: boolean = false;
    constructor(private tokenStorageService: TokenStorageService,private accountService:AccountService, private cookieService:CookieService) {}
   
    intercept(request:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.attachTokenToRequest(request)).pipe(
           catchError((err): Observable<any> => {
                    const errorResponse= (<HttpErrorResponse>err);
                    if(errorResponse.status == 401){
                        return this.handleHttpResponseError(request,next);
                    }
                    if(errorResponse.status == 400){
                        if(errorResponse.error.message == UserRefreshTokenNotFound || errorResponse.error.message == UserRefreshTokenNotActive){
                            return <any>this.accountService.logout();
                        }
                        else{
                            return throwError(this.handleError(err));
                        }
                    }  
                    else {
                        return throwError(this.handleError(err));
                    }
               }
           ) 
        )
    }
    
    private handleHttpResponseError(request:HttpRequest<any>, next:HttpHandler){
        if(!this.isTokenRefreshing){
            this.isTokenRefreshing = true;
        
            return this.tokenStorageService.checkRefreshToken().pipe(
            switchMap((tokenResponse: any) => {
                if(tokenResponse) {
                    localStorage.setItem('access_token', tokenResponse.token);
                    this.cookieService.set('refresh-token',tokenResponse.refreshToken);

                    return next.handle(this.attachTokenToRequest(request));
                }

                return <any>this.accountService.logout();
            }));
        }
        else{
            this.isTokenRefreshing=false;
            return next.handle(this.attachTokenToRequest(request));
        }
    }  

    private attachTokenToRequest(request: HttpRequest<any>) {
        const token = this.tokenStorageService.getToken();
    
            if (token != null) {
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token}`,
                  }
                });
            }

            return request;
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMsg: string;
        errorMsg = `Backend returned code ${errorResponse.error.statusCode}, body was: ${errorResponse.error.message}`;
        
        return throwError(errorMsg);
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
  

