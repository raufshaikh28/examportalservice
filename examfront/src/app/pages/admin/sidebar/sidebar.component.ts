import { Component } from '@angular/core';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(public signin:SigninService){}
  public signOut(){
    this.signin.signout();
    window.location.reload(); 
    // this.signin.signInStatusSubject.next(false);
  }
}
