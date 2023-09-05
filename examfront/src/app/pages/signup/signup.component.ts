import { style } from '@angular/animations';
import { Component ,OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService,private snack:MatSnackBar){}

  public user={
    username : '',
    password : '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''

  }
  ngOnInit():void {}

  formSubmit(){
    console.log(this.user);
    if(this.user.username=="" || this.user.username==null){
      this.snack.open("Username is required!!","",{
        duration:3000
      })
      return;
    }

    //calling add user userservice
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        Swal.fire('Register Successfully','User id is '+data.id+' with Username '+data.username,'success')
      },
      (error:any)=>{
        //error
        console.log(error);
        Swal.fire('Oops,Something Went Wrong!!',this.user.username+' Username is already present.\n Use Alternet username','error')
      }
      )

  }

}
