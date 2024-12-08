import { createReducer, on } from '@ngrx/store';
import { jobPost, offhomescreen, onhomescreen, resetState } from './user.actions';
import { initialState, UserState } from './user.state';



const _navbarReducer = createReducer(
    initialState,  // Initialize state with the default values from the state file
    on(offhomescreen, (state) => ({ ...state, isloggedin: false })),
    on(onhomescreen, (state) => ({ ...state, isloggedin: true })),
    on(jobPost, (state) => ({ ...state, userpopup: true })),
    on(resetState, () => ({ ...initialState }))  // Reset to initial state
  );
  

export function navbarReducer(state: any, action: any) {
    return _navbarReducer(state, action);
}
