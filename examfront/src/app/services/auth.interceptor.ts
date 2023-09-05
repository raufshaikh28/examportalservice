import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SigninService } from "./signin.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private signin: SigninService){}

    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
        //add the jwt token (localstorage) request
        let authReq=req;
        const token = this.signin.getToken();
        console.log("Inside interceptor");
        if(token!=null){
            authReq=authReq.clone({setHeaders:{Authorization:`Bearer ${token}`}})
        }
        return next.handle(authReq);
    }
    
}
export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true
    }
];