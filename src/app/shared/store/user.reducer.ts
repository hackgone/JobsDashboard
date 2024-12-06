import { createReducer, INITIAL_STATE, on } from "@ngrx/store";
import {jobPost, offhomescreen, onhomescreen} from  "./user.actions"

const _navbarReducer = createReducer(INITIAL_STATE,on(offhomescreen,(state: any)=>{
    return{
        ...state,
        isloggedin:false
    }
}),on(jobPost,(state: any)=>{
    return{
        ...state,
        userpopup:true
    }
}),on(onhomescreen,(state: any)=>{
    return{
        ...state,
        isloggedin:true
    }
})
)

export function navbarReducer(state:any,action:any){
    return _navbarReducer(state,action);
}