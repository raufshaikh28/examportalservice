import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{

  isSignedin=false;
  user=null;

  constructor(public signin:SigninService){}
  ngOnInit(): void {
    this.isSignedin=this.signin.isSignin();
    this.user=this.signin.getUser();
    this.signin.signInStatusSubject.asObservable().subscribe(data=>{
      this.isSignedin=this.signin.isSignin();
      this.user=this.signin.getUser();  
    })
  }

  public signOut(){
    this.signin.signout();
    window.location.reload(); 
    // this.signin.signInStatusSubject.next(false);
  }
}
