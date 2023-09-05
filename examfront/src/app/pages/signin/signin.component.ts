import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinData = {
    username:"",
    password:""
  }
  constructor(private snack:MatSnackBar,private signin:SigninService,private router:Router){}
  ngOnInit(): void {}
 
  formSubmit(){
    console.log("signin button clicked");
    // username
    if(this.signinData.username.trim()=='' || this.signinData.username==null){
      this.snack.open("Username is Required","",{
        duration:3000
      })
      return;
    }
    // password
    if(this.signinData.password=='' || this.signinData.password==null){
      this.snack.open("Password is Required","",{
        duration:3000
      })
      return;
    }

    //request to server to generate Token
    this.signin.generateToken(this.signinData).subscribe(
      (data:any)=>{
        console.log("Success Token!!");
        console.log(data);

        //signin...
        this.signin.signinUser(data.token);

        this.signin.getCurrentUser().subscribe(
          (user:any)=>{
            this.signin.setUser(user);
            console.log(user);

            if(this.signin.getUserRole()=="Admin"){
            //redirect admin-dashboard 

              // window.location.href='/admin';
              this.router.navigate(['admin']);
              this.signin.signInStatusSubject.next(true);

            }else if(this.signin.getUserRole()=="Normal"){
            //redirect normal-dashboard
              // window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard/0']);
              this.signin.signInStatusSubject.next(true); 
            }else{
              this.signin.signout();
              // location.reload
            }
          }
        );
      },
      (error)=>{
        console.log("Error Token!!");
        console.log(error);
        this.snack.open("Invalid Details!! Try Again","",{
          duration:2000
        });
      }
      );
  }
}
