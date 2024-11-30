import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './component/login-signup/login-signup.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { LoginComponent } from './component/login-signup/login/login.component';
import { SignupComponent } from './component/login-signup/signup/signup.component';
import { ForgetpasswordComponent } from './component/login-signup/forgetpassword/forgetpassword.component';
import { JobsPageComponent } from './component/jobs-page/jobs-page.component';
// import {LoginSignupComponent} from '/component'

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'login-signup',component:LoginSignupComponent,children:[
    {path:'login',title:'Login',component:LoginComponent},
    {path:'signup',title:'Login',component:SignupComponent},
    {path:'forgetpassword',title:'Forget Password',component:ForgetpasswordComponent}
  ]},
  {path:'jobs-page',component:JobsPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
