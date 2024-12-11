import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { LoginUser } from '../../../interfcae/user';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../../../interfcae/user';
import { Store } from '@ngrx/store';
import { jobPost, userLoggedIn } from '../../../shared/store/user.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  wrongCreds:boolean = false;
  responsedata:User[] = [];
  
  userDetails!:FormGroup;
  constructor(private readonly formBuilder:FormBuilder,private readonly userService:UserService,private route:ActivatedRoute,private router:Router,private store:Store<{userState:{onHomeScreen:boolean,userpopup:boolean,isLoggedin:boolean}}>){
    this.userDetails=formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]
      ],
      password:['',Validators.required]
    })

    
  }
  checkCreds(): void {
    const loginUser = this.userDetails.value as LoginUser;
  
    this.userService.checkUser(loginUser.email, loginUser.password).subscribe({
      next: (isValid) => {
        if (isValid) {
          this.wrongCreds = false; // Credentials are correct
          // this.store.dispatch(jobPost())
          this.store.dispatch(userLoggedIn())
          this.router.navigate(['/jobs-page/showall']); // Navigate to the jobs page
        } else {
          this.wrongCreds = true; // Credentials are incorrect
        }
      },
      error: (err) => {
        console.error('Error during authentication:', err);
        this.wrongCreds = true; // Show error as wrong credentials
      },
    });
  }

}
