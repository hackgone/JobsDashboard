export interface UserState {
    onHomeScreen: boolean;
    userpopup: boolean;
    isLoggedin:boolean
  }

export const initialState: UserState = {
    onHomeScreen: true,
    userpopup: false,
    isLoggedin: false
};