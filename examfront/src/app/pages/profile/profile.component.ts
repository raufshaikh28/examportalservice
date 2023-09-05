import { Component, OnInit } from '@angular/core';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  
  constructor(public signin:SigninService){}
  ngOnInit(): void {
    this.user =   this.signin.getUser();
    // this.signin.getCurrentUser().subscribe(
    //   (user:any)=>{
    //     this.user=user;
    //   },
    //   (error)=>{
    //     alert('error')
    //   }
    //   )
  }
  }
