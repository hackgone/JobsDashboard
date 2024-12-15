import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { offhomescreen, onhomescreen } from '../../shared/store/user.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  showLoginButton$!: Observable<boolean>;
  showUserDetail$!: Observable<boolean>;

  constructor(private store: Store<{ userState: { onHomeScreen: boolean; userpopup: boolean } }>,private router:Router) {}

  ngOnInit(): void {
    this.showLoginButton$ = this.store.select((state) => state.userState.onHomeScreen);
    this.showUserDetail$ = this.store.select((state) => state.userState.userpopup);
  }

  onNavchange(): void {
    this.store.dispatch(offhomescreen());
  }

  logout(): void {
    this.router.navigate(['/'])
  }
  postjob(){
    this.router.navigate(['/jobs-page/post-job'])
  }
}
