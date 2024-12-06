import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { offhomescreen, onhomescreen } from '../../shared/store/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  constructor(private store:Store<{isloggedin:{isloggedin:boolean,userpopup:boolean}}>){
  }
  showLoginButton:boolean = true;
  showUserDetail:boolean=false;
  ngOnInit(): void {
    this.store.select('isloggedin').subscribe(data =>{
      this.showLoginButton = data.isloggedin??true;
      this.showUserDetail = data.userpopup??false;
    })
    console.log(this.showLoginButton)
  }
  onNavchange(){
    this.store.dispatch(offhomescreen())
    console.log(this.showLoginButton)
  }
  logout(){
    this.store.dispatch(onhomescreen())
  }
}
