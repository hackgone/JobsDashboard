import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { resetState } from '../../shared/store/user.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit{
  constructor(private store: Store<{ isloggedin: { isloggedin: boolean; userpopup: boolean } }>) {}

  ngOnInit(): void{
    this.store.dispatch(resetState());
  }
  
}
