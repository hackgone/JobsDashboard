import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  IsUserFound:boolean = true;
  resetpassword:boolean = false;
  email:string = '';
  password:string = '';
  cpassword:string = '';

  constructor(private readonly userService:UserService,private router:Router){
    console.log(this.userService.getUserData());
  }
  getUser(){
    if(this.userService.checkEmail(this.email)){
      this.resetpassword = true;
      this.IsUserFound = true;
      console.log("t")
    }else{
      this.IsUserFound = false;
      console.log("f")
    }
  }
  restPassword(){
    if(this.userService.updateUserPassword(this.email,this.password)){
      this.router.navigate(['/login-signup/login'])
    }
    console.log("Error Occured")
  }
}
