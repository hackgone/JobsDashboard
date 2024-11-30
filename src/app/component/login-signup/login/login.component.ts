import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { LoginUser } from '../../../interfcae/user';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  wrongCreds:boolean = false;

  userDetails!:FormGroup;
  constructor(private readonly formBuilder:FormBuilder,private readonly userService:UserService,private route:ActivatedRoute,private router:Router){
    this.userDetails=formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]
      ],
      password:['',Validators.required]
    })

    console.log(this.userService.getUserData());
  }
  checkCreds(){
    const loginUser = this.userDetails.value as LoginUser;
    if(!this.userService.checkUser(loginUser.email,loginUser.password)) {
      this.wrongCreds = true
    }else{
      this.wrongCreds = false
      this.router.navigate(['/jobs-page'])
    }
    
  }

}
