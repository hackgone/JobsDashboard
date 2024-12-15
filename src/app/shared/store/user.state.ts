export interface UserState {
    onHomeScreen: boolean;
    userpopup: boolean;
    isLoggedin:boolean;
    onPostJob:boolean
  }

export const initialState: UserState = {
    onHomeScreen: true,
    userpopup: false,
    isLoggedin: false,
    onPostJob: false
};