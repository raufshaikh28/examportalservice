import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { SigninService } from './signin.service';

@Injectable({
  providedIn:'root'
})
export class NormalGuard implements CanActivate {

  constructor(private signin:SigninService,private router:Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
      if(this.signin.isSignin() && this.signin.getUserRole()=='Normal'){
        return true;
      }

      this.router.navigate(['signin']);
      return false;
  }
}