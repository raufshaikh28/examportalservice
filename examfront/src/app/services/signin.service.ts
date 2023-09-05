import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  public signInStatusSubject=new Subject<boolean>();
    

  constructor(private http:HttpClient) { }

  //current user who is signin
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
  }


  //generate token
  public generateToken(signinData:any){
    return this.http.post(`${baseUrl}/generate-token`,signinData);
  }

  //signin User :set token into local storage
  public signinUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }

  //isSignin : user is logged in or not
  public isSignin(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr==''||tokenStr==null){
      return false;
    }else{
      return true;  
    }
  }

  //logout = remove token from local storage
  public signout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //getToken which 
  public getToken(){
    return localStorage.getItem('token');
  }

  //set userdetails
  public setUser(user: any){
    localStorage.setItem('user',JSON.stringify(user));  
  }


//getUser
  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.signout();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
