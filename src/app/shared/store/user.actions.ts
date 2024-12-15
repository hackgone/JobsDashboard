import { createAction } from '@ngrx/store';

export const offhomescreen = createAction('[Navbar] Off Home Screen');
export const onhomescreen = createAction('[Navbar] On Home Screen');
export const jobPost = createAction('[Navbar] Job Post');
export const resetState = createAction('[Navbar] Reset State');
export const userLoggedIn = createAction('User loggedin')
export const onPostJob = createAction('onPostPage')