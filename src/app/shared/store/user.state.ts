export interface UserState {
    isloggedin: boolean;
    userpopup: boolean;
  }

export const initialState: UserState = {
    isloggedin: true,
    userpopup: false,
  };