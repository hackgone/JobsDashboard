import { createReducer, on } from '@ngrx/store';
import { jobPost, offhomescreen, onhomescreen, onPostJob, resetState, userLoggedIn } from './user.actions';
import { initialState, UserState } from './user.state';
import { state } from '@angular/animations';



const _navbarReducer = createReducer(
    initialState,  // Initialize state with the default values from the state file
    on(offhomescreen, (state) => ({ ...state, onHomeScreen: false })),
    on(onhomescreen, (state) => ({ ...state, onHomeScreen: true })),
    on(jobPost, (state) => ({ ...state, userpopup: true })),  //not using this
    on(resetState, () => ({ ...initialState })),  // Reset to initial state
    on(userLoggedIn,(state) => ({...state,isLoggedin:true,userpopup:true,onHomeScreen:false,onPostJob:false})),
    on(onPostJob,(state) =>  ({...state,isLoggedin:true,userpopup:true,onHomeScreen:false,onPostJob:true})))

  

export function navbarReducer(state: any, action: any) {
    return _navbarReducer(state, action);
}
