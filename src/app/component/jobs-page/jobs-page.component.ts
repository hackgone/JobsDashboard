import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jobs-page',
  templateUrl: './jobs-page.component.html',
  styleUrl: './jobs-page.component.scss'
})
export class JobsPageComponent implements OnInit{
  IsAllowed!: boolean;

  constructor(private store: Store<{ userState: { onHomeScreen: boolean; userpopup: boolean ;isLoggedin:boolean} }>,private router:Router){
    this.store.select((state) => state.userState.isLoggedin).subscribe((isLoggedIn) => {
      console.log('Logged In Status:', isLoggedIn);
      this.IsAllowed = isLoggedIn; // Assign to a variable
    });
    ;
    console.log(this.IsAllowed)
    if (!this.IsAllowed){
      alert("Not allowed");
      console.log("Not allowed");
      this.router.navigate(['/login-signup/login'])
    }
  }
  ngOnInit(): void {
    
  }

}
