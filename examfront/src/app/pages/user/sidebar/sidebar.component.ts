import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  //user sidebar

  categories:any;

  constructor(
    public signin:SigninService,
    private _cat:CategoryService,
    private _snack:MatSnackBar
    ){}


  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>  {
        this.categories=data;
        console.log(data);
      },
      (error)=>{
        this._snack.open('Error in Uploading Categories..!!','',{
          duration:3000
        })
      }
    );
  }
  public signOut(){
    this.signin.signout();
    window.location.reload(); 
    // this.signin.signInStatusSubject.next(false);
  }
}
